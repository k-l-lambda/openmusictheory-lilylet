/**
 * Post-processing of musicXmlDecoder output. The lilylet repo is not modified; every
 * systematic decoder/serializer issue we work around lives here, and each function
 * returns a short note of what it changed (recorded in the .check.json / manifest).
 */
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import type { LilyletDoc } from "../../../../lilylet/source/lilylet";

// Template leftovers seen in the OMT workbook files: a title copied from another
// worksheet, or MuseScore's defaults.
const JUNK_TITLES = [/^WK blues scales$/i, /Graded Homework #1: Scales/i, /\.pdf$/i, /^WK The Phrase, Archetypes/i, /^Untitled score$/i, /^Title$/i,
	/\.(musicxml|mxl|xml)$/i, /^Diatonic Modes, Pentatonic, an/i];
const JUNK_COMPOSERS = [/^Composer \/ arranger$/i, /^Name:/i, /^N$/, /^Music21$/i, /^Composer$/i];

/** Hand-checked titles/composers for files whose embedded metadata is missing or wrong. */
export const METADATA: Record<string, { title?: string; composer?: string }> = {
	"2022/08/I-Exercises": { title: "Fux, Gradus ad Parnassum: two-voice exercises (cantus firmi)", composer: "Johann Joseph Fux" },
	"2022/08/I-Solutions": { title: "Fux, Gradus ad Parnassum: two-voice solutions", composer: "Johann Joseph Fux" },
	"2022/08/I-Distinct": { title: "Fux, Gradus ad Parnassum: two-voice examples, distinct passages", composer: "Johann Joseph Fux" },
	"2022/08/II-Exercises": { title: "Fux, Gradus ad Parnassum: three-voice exercises (cantus firmi)", composer: "Johann Joseph Fux" },
	"2022/08/II-Solutions": { title: "Fux, Gradus ad Parnassum: three-voice solutions", composer: "Johann Joseph Fux" },
	"2022/08/II-Distinct": { title: "Fux, Gradus ad Parnassum: three-voice examples, distinct passages", composer: "Johann Joseph Fux" },
	"2022/08/III-Exercises": { title: "Fux, Gradus ad Parnassum: four-voice exercises (cantus firmi)", composer: "Johann Joseph Fux" },
	"2022/08/III-Solutions": { title: "Fux, Gradus ad Parnassum: four-voice solutions", composer: "Johann Joseph Fux" },
	"2022/08/III-Distinct": { title: "Fux, Gradus ad Parnassum: four-voice examples, distinct passages", composer: "Johann Joseph Fux" },
};

const titleFromFile = (rel: string) => rel.split("/").pop()!.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();

const fixMetadata = (doc: LilyletDoc, rel: string): string[] => {
	const notes: string[] = [];
	const md = (doc.metadata ||= {});
	const over = METADATA[rel];
	if (md.title) md.title = md.title.replace(/\s*\n\s*/g, " ").trim();
	if (md.composer) md.composer = md.composer.replace(/\s*\n\s*/g, " ").trim();
	if (md.title && JUNK_TITLES.some(re => re.test(md.title!))) {
		notes.push(`dropped template title "${md.title}"`);
		delete md.title;
	}
	if (md.composer && JUNK_COMPOSERS.some(re => re.test(md.composer!))) {
		notes.push(`dropped placeholder composer "${md.composer}"`);
		delete md.composer;
	}
	if (over?.title) md.title = over.title;
	if (over?.composer) md.composer = over.composer;
	if (!md.title) md.title = titleFromFile(rel);
	// Subtitles in these files are worksheet instructions ("Name: ____"), not titles.
	if (md.subtitle && /_{3,}|^Name\b/i.test(md.subtitle)) delete md.subtitle;
	return notes;
};

/**
 * [staves] header from the MusicXML <part-list>: <part-group> brackets/braces and
 * the number of staves of each part (multi-staff parts become a brace group).
 * Anonymous leaves; "-" when barlines run through the group, "," otherwise.
 */
export const stavesFromXml = (xml: string): { layout: string; total: number; instruments: Record<string, { name: string; shortName?: string }> } | null => {
	const dom = new DOMParser().parseFromString(xml, "application/xml");
	const pl = dom.getElementsByTagName("part-list")[0];
	if (!pl) return null;
	const stavesOf: Record<string, number> = {};
	const parts = dom.getElementsByTagName("part");
	for (let i = 0; i < parts.length; i++) {
		const st = parts[i].getElementsByTagName("staves")[0];
		stavesOf[parts[i].getAttribute("id")!] = st ? parseInt(st.textContent || "1") : 1;
	}
	type Node = { kind: "group"; symbol: string; bar: boolean; items: Node[] } | { kind: "part"; n: number; first: number };
	const instruments: Record<string, { name: string; shortName?: string }> = {};
	const root: Node = { kind: "group", symbol: "", bar: false, items: [] };
	const open: Record<string, Node & { kind: "group" }> = {};
	const stack: (Node & { kind: "group" })[] = [root as any];
	let total = 0;
	for (let c = pl.firstChild; c; c = c.nextSibling) {
		if (c.nodeType !== 1) continue;
		const el = c as any as Element;
		if (el.tagName === "part-group") {
			const num = el.getAttribute("number") || "1";
			if (el.getAttribute("type") === "start") {
				const sym = el.getElementsByTagName("group-symbol")[0]?.textContent?.trim() || "";
				const bar = el.getElementsByTagName("group-barline")[0]?.textContent?.trim() === "yes";
				const g = { kind: "group" as const, symbol: sym, bar, items: [] as Node[] };
				stack[stack.length - 1].items.push(g);
				stack.push(g);
				open[num] = g;
			} else if (open[num]) {
				const i = stack.indexOf(open[num]);
				if (i > 0) stack.length = i;
				delete open[num];
			}
		} else if (el.tagName === "score-part") {
			const n = stavesOf[el.getAttribute("id")!] ?? 1;
			const first = total + 1;
			total += n;
			stack[stack.length - 1].items.push({ kind: "part", n, first });
			// Part names (skip MuseScore's hidden/blank ones). Leaves are named s1, s2, ...
			const nameEl = el.getElementsByTagName("part-name")[0];
			const name = (nameEl?.getAttribute("print-object") === "no" ? "" : nameEl?.textContent || "").replace(/\s+/g, " ").trim();
			const abbrEl = el.getElementsByTagName("part-abbreviation")[0];
			const abbr = (abbrEl?.getAttribute("print-object") === "no" ? "" : abbrEl?.textContent || "").replace(/\s+/g, " ").trim();
			if (name) instruments[n > 1 ? `s${first}-s${first + n - 1}` : `s${first}`] = abbr ? { name, shortName: abbr } : { name };
		}
	}
	const BR: Record<string, [string, string]> = { bracket: ["<", ">"], brace: ["{", "}"], square: ["[", "]"] };
	const emit = (node: Node, bar: boolean): string => {
		if (node.kind === "part") {
			const ids = Array.from({ length: node.n }, (_, i) => `s${node.first + i}`);
			return node.n > 1 ? "{" + ids.join("-") + "}" : ids[0];
		}
		const inner = node.items.map(x => emit(x, node.bar)).join(node.bar ? "-" : ",");
		const br = BR[node.symbol];
		return br ? br[0] + inner + br[1] : inner;
	};
	const layout = emit(root, false);
	// Single plain staff: no header needed.
	if (total <= 1) return null;
	return { layout, total, instruments };
};

type Fig = { part: number; staff: number; measure: number; onset: [number, number]; duration: [number, number]; lines: { number?: number; accidental?: string }[] };

/**
 * Figured bass: the decoder ignores <figured-bass> (harmonies.py reads it into figs/).
 * Each bar's figures become a `\figures { … }` lane on the voice of that staff that has
 * a note at the first figure's onset (else the staff's first voice); gaps are spacers.
 */
export const addFigures = (doc: LilyletDoc, figs: Fig[]): string[] => {
	if (!figs.length) return [];
	let placed = 0, lost = 0;
	const groups = new Map<string, Fig[]>();
	for (const f of figs) { const k = `${f.measure}|${f.part}|${f.staff}`; (groups.get(k) || groups.set(k, []).get(k)!).push(f); }
	for (const [k, fs] of groups) {
		const [mi, pi, st] = k.split("|").map(Number);
		const part: any = doc.measures[mi]?.parts[pi];
		if (!part) { lost += fs.length; continue; }
		fs.sort((a, b) => a.onset[0] / a.onset[1] - b.onset[0] / b.onset[1]);
		// voices on staff st, and the onsets of their notes
		const cands = part.voices.map((v: any) => {
			let staff = v.staff || 1, off: Fr = [0, 1], first: number | null = null;
			const ons = new Set<string>();
			const walk = (evs: any[], ratio: Fr) => evs.forEach(e => {
				if (e.type === "context" && e.staff) staff = e.staff;
				else if (e.type === "tuplet") walk(e.events, fmul(ratio, [e.ratio.numerator, e.ratio.denominator]));
				else if ((e.type === "note" || e.type === "rest") && !e.grace) {
					if (first === null) first = staff;
					if (e.type === "note" && (e.staff || staff) === st) ons.add(fstr(off));
					off = fadd(off, e.fullMeasure ? [1e6, 1] : fmul(fql(e.duration), ratio));
				}
			});
			walk(v.events, [1, 1]);
			return { v, first, ons };
		});
		const on0 = fstr(fnorm(fs[0].onset));
		const pick = cands.find((c: any) => c.ons.has(on0)) || cands.find((c: any) => c.first === st);
		if (!pick) { lost += fs.length; continue; }
		const lane: any = { placement: "below", groups: [] };
		let t: Fr = [0, 1];
		for (const f of fs) {
			const on = fnorm(f.onset);
			const gap = fadd(on, [-t[0], t[1]]);
			if (gap[0] > 0) for (const d of spacerDurations(gap)) lane.groups.push({ duration: d });
			const ds = spacerDurations(fnorm(f.duration));
			lane.groups.push({ duration: ds[0], lines: f.lines.map(l => ({ ...l })) });
			for (const d of ds.slice(1)) lane.groups.push({ duration: d });
			t = fadd(on, fnorm(f.duration));
			placed++;
		}
		(pick.v.figures ||= []).push(lane);
	}
	const notes = [`${placed} figured-bass groups added as \\figures (the decoder drops <figured-bass>)`];
	if (lost) notes.push(`FIGURES LOST: ${lost} figured-bass groups had no voice to attach to`);
	return notes;
};

/**
 * MuseScore 4.6.5's MusicXML export drops clef changes at the start of a bar (header
 * clefs and plain ones alike: only clefs with a courtesy clef before the barline
 * survive). Pitches are absolute, so the notes are right, but they are drawn in the old
 * clef. harmonies.py reads the clef at every bar start from the mscx; insert a clef
 * wherever the decoded score has another one in force.
 */
export const applyBarClefs = (doc: LilyletDoc, src: { parts: number[]; bars: (string | null)[][] } | null): string[] => {
	if (!src) return [];
	let n = 0;
	const cur: Record<string, string> = {};
	doc.measures.forEach((m: any, mi) => {
		let flat = 0;
		src.parts.forEach((ns, pi) => {
			const part = m.parts[pi];
			for (let s = 1; s <= ns; s++, flat++) {
				const k = `${pi}:${s}`;
				const want = src.bars[flat]?.[mi];
				if (!part) continue;
				// clef in force at the bar start in the decoded doc: a clef before the first note/rest of this staff
				let atStart: string | undefined, host: any = null, hostIdx = 0;
				for (const v of part.voices) {
					let st = v.staff || 1, seenEvent = false;
					v.events.forEach((e: any, i: number) => {
						if (e.type === "context" && e.staff) st = e.staff;
						if (st !== s) return;
						if (!host && !seenEvent && !(e.type === "context")) { host = v; hostIdx = i; }
						if (e.type === "context" && e.clef && !seenEvent) atStart = e.clef;
						if (e.type === "note" || e.type === "rest" || e.type === "tuplet" || e.type === "tremolo") seenEvent = true;
					});
				}
				if (atStart) cur[k] = atStart;
				if (want && cur[k] !== want && host) {
					host.events.splice(hostIdx, 0, { type: "context", clef: want });
					cur[k] = want;
					n++;
				}
				// mid-bar clefs carry into the next bar
				for (const v of part.voices) {
					let st = v.staff || 1, seenEvent = false;
					for (const e of v.events as any[]) {
						if (e.type === "context" && e.staff) st = e.staff;
						if (st !== s) continue;
						if (e.type === "note" || e.type === "rest" || e.type === "tuplet" || e.type === "tremolo") seenEvent = true;
						else if (e.type === "context" && e.clef && seenEvent) cur[k] = e.clef;
					}
				}
			}
		});
	});
	return n ? [`${n} clef changes at bar starts restored from the MuseScore source (its MusicXML export drops them)`] : [];
};

export const postprocessDoc = (doc: LilyletDoc, ctx: { xml: string; m21: any; file: any; harms?: Harm[]; figs?: Fig[]; clefs?: any }): string[] => {
	const rel = ctx.file.local.slice("media/".length).replace(/\.[^.]+$/, "");
	const notes = fixMetadata(doc, rel);
	notes.push(...hideInvisible(doc, ctx.m21));
	notes.push(...cleanMarks(doc));
	notes.push(...placeHarmonies(doc, ctx.harms || []));
	notes.push(...addFigures(doc, ctx.figs || []));
	notes.push(...applyBarClefs(doc, ctx.clefs || null));
	const st = stavesFromXml(ctx.xml);
	if (st) {
		doc.metadata!.staves = st.layout;
		// Only when parts have distinct names (MuseScore's default "Piano" on every part is noise).
		const names = Object.values(st.instruments).map(x => x.name);
		if (names.length > 1 && new Set(names).size === names.length) doc.metadata!.instruments = st.instruments;
	}
	return notes;
};

/**
 * serializeLilyletDoc restates `\key` and `\time` at the head of every measure.
 * Keep them only where they change (the parser carries them across bar lines).
 * Works on the serializer's own layout: measures end in " | %N", the first voice
 * of a measure starts with optional `\staff "N"` then `\key ...` / `\numericTimeSignature`
 * / `\time n/d`.
 */
export const stripRestatedContext = (code: string): string => {
	const lines = code.split("\n");
	let key: string | null = null, time: string | null = null;
	let measureStart = true;
	const KEY = /\\key [a-g](?:s|f|ss|ff|x)? \\(?:major|minor) ?/;
	const TIME = /(?:\\numericTimeSignature )?\\time \d+\/\d+ ?/;
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		if (line.startsWith("[") || line.trim() === "") { if (line.trim() === "") measureStart = true; continue; }
		if (measureStart) {
			const k = line.match(KEY)?.[0] ?? null;
			if (k) {
				if (k.trim() === key) line = line.replace(KEY, "");
				else key = k.trim();
			}
			const t = line.match(TIME)?.[0] ?? null;
			if (t) {
				if (t.trim() === time) line = line.replace(TIME, "");
				else time = t.trim();
			}
			lines[i] = line;
			measureStart = false;
		}
		if (/\| %\d+\s*$/.test(line)) measureStart = true;
	}
	return lines.join("\n");
};

/**
 * lilylet has no unpitched notes, and musicXmlDecoder silently DROPS every
 * <unpitched> note (lyrics survive, notes vanish; an all-percussion score yields an
 * empty doc whose MEI crashes Verovio). Rewrite them as pitched notes at their staff
 * position (display-step/octave) and the percussion clef as a treble clef, which puts
 * every notehead where MuseScore draws it. Noteheads (x, etc.) and 1-line staves are
 * not representable and are lost; the manifest says so.
 */
export const preprocessXml = (xml: string): { xml: string; notes: string[] } => {
	const notes: string[] = [];
	if (/<staff-lines>1<\/staff-lines>/.test(xml)) notes.push("source uses a 1-line staff; lilylet draws 5 lines");
	if (/<notehead[^>]*>(x|cross|circle-x|slash|diamond|triangle)/.test(xml)) notes.push("special noteheads (x/slash/diamond) not kept");
	if (/<unpitched\b/.test(xml)) notes.push("percussion notes are drawn at their staff position (lilylet has no unpitched notes)");
	// The decoder only cancels the FIRST <forward> after a <backup>; MuseScore splits
	// one repositioning into several (<backup 6 / fwd 3 / direction / fwd 3>) and the
	// rest would turn into phantom spacer rests.
	const bf = cancelBackupForward(xml);
	if (bf.n) notes.push(`${bf.n} zero-net <backup>/<forward> pairs around directions removed`);
	return { xml: bf.xml, notes };
};

/**
 * MuseScore anchors a mid-note direction (bracket, text) with
 *   <backup>N</backup> <direction/> <forward>N</forward>
 * which nets to zero time. musicXmlDecoder ignores the backup's position but turns
 * the forward into invisible spacer rests (when a note follows), so the bar is
 * overfilled by N (and N may be approximated by s8 s32 s128 ...). Drop such pairs
 * when the forwards sum exactly to the backup; the directions then attach to the
 * next note, which is where the decoder put them anyway.
 */
export const cancelBackupForward = (xml: string): { xml: string; n: number } => {
	let n = 0;
	const re = /<backup>\s*<duration>(\d+)<\/duration>\s*<\/backup>((?:\s*(?:<(direction|harmony|figured-bass)\b[\s\S]*?<\/\3>|<forward>\s*<duration>\d+<\/duration>(?:\s*<voice>\d+<\/voice>)?(?:\s*<staff>\d+<\/staff>)?\s*<\/forward>))+)/g;
	const out = xml.replace(re, (all, back, body) => {
		const fwd = [...body.matchAll(/<forward>\s*<duration>(\d+)<\/duration>/g)].reduce((a, m) => a + parseInt(m[1]), 0);
		if (fwd !== parseInt(back)) return all;
		n++;
		return body.replace(/<forward>[\s\S]*?<\/forward>/g, "");
	});
	return { xml: out, n };
};

/**
 * One AST clean-up before serializing: a full-bar rest in a bar longer than a whole
 * note (4/2, 12/8 …). lilylet writes those as `R\\breve` now, so nothing is rewritten;
 * the pass is kept because a rest that lost its fullMeasure flag would otherwise be
 * written with a duration no meter can hold.
 */
export const cleanMarks = (doc: LilyletDoc): string[] => {
	let rests = 0;
	const fix = (e: any) => {
		if (e.type === "rest" && e.fullMeasure && e.duration && e.duration.division > 0 && e.duration.division < 0.5) {
			// Below a breve there is no duration to write; such a rest fills the bar.
			e.duration = { division: 1, dots: 0 };
			rests++;
		}
		if (e.events) e.events.forEach(fix);
	};
	for (const m of doc.measures) for (const p of m.parts) for (const v of p.voices) (v.events as any[]).forEach(fix);
	return rests ? [`${rests} full-bar rests given a writable duration`] : [];
};

// ---------------------------------------------------------------------------
// Fraction helpers (durations in quarters), used by the placement passes below.

type Fr = [number, number];
const fgcd = (a: number, b: number): number => (b ? fgcd(b, a % b) : Math.abs(a));
const fnorm = ([n, d]: Fr): Fr => { const g = fgcd(n, d) || 1; return [n / g, d / g]; };
const fadd = (a: Fr, b: Fr): Fr => fnorm([a[0] * b[1] + b[0] * a[1], a[1] * b[1]]);
const fmul = (a: Fr, b: Fr): Fr => fnorm([a[0] * b[0], a[1] * b[1]]);
const fstr = ([n, d]: Fr) => (d === 1 ? String(n) : `${n}/${d}`);
const fql = (d: any): Fr => {
	let base: Fr = fnorm([4, d.division]), dot: Fr = base;
	for (let i = 0; i < (d.dots || 0); i++) { dot = fmul(dot, [1, 2]); base = fadd(base, dot); }
	if (d.tuplet) base = fmul(base, [d.tuplet.numerator, d.tuplet.denominator]);
	return base;
};
const PALTER: Record<string, number> = { sharp: 1, flat: -1, natural: 0, doubleSharp: 2, doubleFlat: -2 };
const pname = (p: any) => `${p.phonet.toUpperCase()}${(PALTER[p.accidental] ?? 0) >= 0 ? "+" : ""}${PALTER[p.accidental] ?? 0}${p.octave + 4}`;

/** Split a length in quarters into representable spacer durations (greedy, dotted allowed). */
const spacerDurations = (len: Fr): { division: number; dots: number }[] => {
	const out: { division: number; dots: number }[] = [];
	let rest = len[0] / len[1];
	const cands: [number, number, number][] = [];   // [ql, division, dots]
	for (const div of [1, 2, 4, 8, 16, 32, 64, 128]) for (const dots of [2, 1, 0])
		cands.push([(4 / div) * (2 - Math.pow(0.5, dots)), div, dots]);
	cands.sort((a, b) => b[0] - a[0]);
	while (rest > 1e-9) {
		const c = cands.find(x => x[0] <= rest + 1e-9);
		if (!c) break;
		out.push({ division: c[1], dots: c[2] });
		rest -= c[0];
	}
	return out;
};

/**
 * MuseScore's MusicXML export keeps invisible notes as <notehead>none</notehead> and
 * invisible rests as print-object="no"; the decoder draws both. extract_m21.py lists
 * them per staff (`hidden`); here the matching events become spacers `s` of the same
 * length (a hidden pitch inside a visible chord is just removed; a hidden grace note is
 * dropped), so the timing is unchanged. lilylet's parser drops every mark on a rest, and
 * moving a text to another note misplaces it (answer blanks "___:" piled up on the
 * previous exercise), so texts / dynamics of a hidden note are dropped and counted; ties,
 * slurs and beams that lose an end are dropped; a lyric syllable on a hidden note is
 * removed with it.
 */
export const hideInvisible = (doc: LilyletDoc, m21: any): string[] => {
	const want = new Map<string, { pitches: string[] | null }[]>();
	let total = 0;
	(m21?.staves || []).forEach((st: any, si: number) => {
		for (const h of st.hidden || []) {
			const k = [si, h[0], h[1], h[3], h[4] ? 1 : 0].join("|");
			(want.get(k) || want.set(k, []).get(k)!).push({ pitches: h[2] });
			total++;
		}
	});
	if (!total) return [];
	const nParts = Math.max(...doc.measures.map(m => m.parts.length));
	const partStaves: number[] = new Array(nParts).fill(1);
	const walkStaff = (evs: any[], cb: (s: number) => void) => evs.forEach(e => {
		if (e.type === "context" && e.staff) cb(e.staff);
		if (e.type === "tuplet") walkStaff(e.events, cb);
	});
	doc.measures.forEach(m => m.parts.forEach((p, pi) => p.voices.forEach((v: any) => {
		partStaves[pi] = Math.max(partStaves[pi], v.staff || 1);
		walkStaff(v.events, s => { partStaves[pi] = Math.max(partStaves[pi], s); });
	})));
	const base: number[] = [];
	partStaves.reduce((acc, n, i) => { base[i] = acc; return acc + n; }, 0);

	let notesHidden = 0, chordNotes = 0, graces = 0, rests = 0, lyricsLost = 0, unmatchedNotes = 0, marksKept = 0;
	const KEEP = new Set(["dynamic", "hairpin", "markup"]);
	const touched = new Set<any>();
	let time: Fr = [4, 1];
	doc.measures.forEach((m: any, mi) => {
		if (m.timeSig) time = fnorm([m.timeSig.numerator * 4, m.timeSig.denominator]);
		m.parts.forEach((p: any, pi: number) => p.voices.forEach((v: any) => {
			let staff = v.staff || 1;
			let off: Fr = [0, 1];
			const take = (k: string, pred: (x: { pitches: string[] | null }) => boolean) => {
				const l = want.get(k);
				if (!l) return null;
				const i = l.findIndex(pred);
				return i < 0 ? null : l.splice(i, 1)[0];
			};
			const walk = (evs: any[], ratio: Fr) => {
				for (let i = 0; i < evs.length; i++) {
					const e = evs[i];
					if (e.type === "context") {
						if (e.staff) staff = e.staff;
						if (e.time) time = fnorm([e.time.numerator * 4, e.time.denominator]);
						continue;
					}
					if (e.type === "tuplet") { walk(e.events, fmul(ratio, [e.ratio.numerator, e.ratio.denominator])); continue; }
					if (e.type === "tremolo") { off = fadd(off, fmul(fnorm([4 * e.count, e.division]), [2, 1])); continue; }
					if (e.type !== "note" && e.type !== "rest") continue;
					const len: Fr = e.type === "rest" && e.fullMeasure ? time : fmul(fql(e.duration), ratio);
					const s = base[pi] + (e.staff || staff) - 1;
					const k = [s, mi, fstr(off), e.grace ? "0" : fstr(len), e.grace ? 1 : 0].join("|");
					if (e.type === "note") {
						const ps: string[] = e.pitches.map(pname);
						const hit = take(k, x => !!x.pitches && x.pitches.every(q => ps.includes(q)));
						if (hit) {
							touched.add(v);
							const left = e.pitches.filter((_: any, j: number) => !hit.pitches!.includes(ps[j]));
							if (left.length) { e.pitches = left; chordNotes += hit.pitches!.length; }
							else if (e.grace) { e._drop = true; graces += hit.pitches!.length; }
							else {
								notesHidden += hit.pitches!.length - 1;
								// The spacer keeps the text/dynamics of the hidden note: a rest can
								// host marks now, so an answer-blank prompt stays where it was written.
								const marks = (e.marks || []).filter((mk: any) => KEEP.has(mk.markType));
								evs[i] = { type: "rest", invisible: true, duration: { ...e.duration }, ...(marks.length ? { marks } : {}), _wasNote: true };
								if (marks.length) marksKept += marks.length;
								notesHidden++;
							}
						}
					} else if (!e.invisible) {
						const hit = take(k, x => x.pitches === null);
						if (hit) {
							touched.add(v);
							rests++;
							if (e.fullMeasure) {
								const ds = spacerDurations(time);
								const sp = ds.map((d, j) => ({ type: "rest", invisible: true, duration: d, ...(j === 0 && e.marks ? { marks: e.marks } : {}) }));
								evs.splice(i, 1, ...sp);
								i += sp.length - 1;
							} else {
								e.invisible = true;
								delete e.pitch;
							}
						}
					}
					if (!e.grace) off = fadd(off, len);
				}
			};
			walk(v.events, [1, 1]);
		}));
	});
	for (const l of want.values()) for (const x of l) if (x.pitches) unmatchedNotes += x.pitches.length;

	// Lyrics, dropped grace notes, and spanners that lost an end, per touched voice.
	for (const m of doc.measures as any[]) for (const p of m.parts) for (const v of p.voices) {
		if (!touched.has(v)) continue;
		let noteIdx = 0;
		const removeIdx: number[] = [];
		const scan = (evs: any[]) => {
			for (const e of evs) {
				if (e.type === "tuplet") { scan(e.events); continue; }
				if (e.type === "rest" && e._wasNote) { removeIdx.push(noteIdx); delete e._wasNote; continue; }
				if (e.type === "note" && !e.grace && !e._drop) noteIdx++;
			}
		};
		scan(v.events);
		if (removeIdx.length && v.lyrics) for (const lane of v.lyrics)
			for (const idx of [...removeIdx].sort((a, b) => b - a)) if (idx < lane.syllables.length) {
				if (lane.syllables[idx]?.text) lyricsLost++;
				lane.syllables.splice(idx, 1);
			}
		const prune = (evs: any[]): any[] => evs.filter(e => !e._drop).map(e => (e.type === "tuplet" ? { ...e, events: prune(e.events) } : e));
		v.events = prune(v.events);
	}
	// A tie needs a following note in the same voice; slurs / beams must stay paired.
	const voicesByKey = new Map<string, any[]>();
	doc.measures.forEach((m: any) => m.parts.forEach((p: any, pi: number) => p.voices.forEach((v: any, vi: number) => {
		const k = pi + ":" + vi;
		(voicesByKey.get(k) || voicesByKey.set(k, []).get(k)!).push(v);
	})));
	for (const vs of voicesByKey.values()) {
		if (!vs.some(v => touched.has(v))) continue;
		const flat: any[] = [];
		const f = (evs: any[]) => evs.forEach(e => (e.type === "tuplet" ? f(e.events) : (e.type === "note" || e.type === "rest") && flat.push(e)));
		vs.forEach(v => f(v.events));
		for (let i = 0; i < flat.length; i++) {
			const e = flat[i];
			if (e.type !== "note" || !e.marks) continue;
			if (e.marks.some((mk: any) => mk.markType === "tie" && mk.start)) {
				const nx = flat.slice(i + 1).find(x => !x.grace);
				if (!nx || nx.type !== "note") e.marks = e.marks.filter((mk: any) => mk.markType !== "tie");
			}
		}
		for (const kind of ["slur", "beam"]) {
			const open: any[] = [];
			for (const e of flat) for (const mk of [...(e.marks || [])]) {
				if (mk.markType !== kind) continue;
				if (mk.start) open.push([e, mk]);
				else if (open.length) open.pop();
				else e.marks = e.marks.filter((x: any) => x !== mk);
			}
			for (const [e, mk] of open) e.marks = e.marks.filter((x: any) => x !== mk);
		}
		for (const e of flat) if (e.marks && !e.marks.length) delete e.marks;
	}
	const notes: string[] = [];
	const n = notesHidden + chordNotes + graces;
	if (n) notes.push(`${n} invisible notes of the source (hidden answers / playback) written as spacers` +
		(chordNotes ? ` (${chordNotes} removed from chords)` : "") + (graces ? ` (${graces} grace notes dropped)` : ""));
	if (rests) notes.push(`${rests} invisible rests written as spacers`);
	if (marksKept) notes.push(`${marksKept} texts/dynamics kept on the spacer of an invisible note`);
	if (lyricsLost) notes.push(`${lyricsLost} lyric syllables on invisible notes dropped`);
	if (unmatchedNotes) notes.push(`HIDDEN NOT MATCHED: ${unmatchedNotes} invisible notes could not be located in the decoded score`);
	return notes;
};

// Sentinel fingerings that mark a tuplet's first/last event across the decoder.
// ---------------------------------------------------------------------------
// Chord symbols / Roman numerals (positions and text from harmonies.py)

type Harm = { part: number; staff: number; measure: number; onset: [number, number]; text: string; src: string };

const qlOf = (d: any): number => {
	let q = 4 / d.division, add = q;
	for (let i = 0; i < (d.dots || 0); i++) { add /= 2; q += add; }
	return q;
};

/**
 * Replace the decoder's harmony events (all piled at the end of the first voice)
 * with the ones from harmonies.py, each placed right after the note/rest that starts
 * at its onset on its staff (lilylet's `\chords "X"` attaches to the PRECEDING note).
 * If no event starts exactly there (onset inside a note or inside a \tuplet group),
 * the symbol goes after the event sounding at that onset; that shift is reported.
 */
export const placeHarmonies = (doc: LilyletDoc, harms: Harm[]): string[] => {
	for (const m of doc.measures) for (const p of m.parts) for (const v of p.voices)
		v.events = (v.events as any[]).filter(e => e.type !== "harmony");
	if (!harms.length) return [];
	let shifted = 0, lost = 0;
	const byMeasure = new Map<number, Harm[]>();
	for (const h of harms) (byMeasure.get(h.measure) || byMeasure.set(h.measure, []).get(h.measure)!).push(h);
	for (const [mi, hs] of byMeasure) {
		const m = doc.measures[mi];
		if (!m) { lost += hs.length; continue; }
		// Per (part, staff): candidate anchors [voiceIdx, eventIdx, onset].
		const inserts: Map<any, { idx: number; ev: any }[]> = new Map();
		for (const h of hs) {
			const part = m.parts[h.part];
			if (!part) { lost++; continue; }
			const target = h.onset[0] / h.onset[1];
			let best: { v: any; idx: number; on: number; exact: boolean } | null = null;
			for (const v of part.voices) {
				let staff = v.staff || 1, on = 0;
				(v.events as any[]).forEach((e, idx) => {
					if (e.type === "context" && e.staff) staff = e.staff;
					const musical = e.type === "note" || e.type === "rest" || e.type === "tuplet" || e.type === "tremolo";
					if (!musical) return;
					const len = e.type === "tuplet"
						? e.events.reduce((a: number, x: any) => a + (x.duration && !x.grace ? qlOf(x.duration) : 0), 0) * e.ratio.numerator / e.ratio.denominator
						: e.type === "rest" && e.fullMeasure ? (m.timeSig ? 4 * m.timeSig.numerator / m.timeSig.denominator : 1e9)
						: e.grace ? 0 : e.duration ? qlOf(e.duration) : 0;
					if (e.grace) return;
					const s = (e.staff || staff);
					if (s === h.staff) {
						const exact = Math.abs(on - target) < 1e-6;
						const covers = on <= target + 1e-6 && target < on + len - 1e-6;
						if ((exact && (!best || !best.exact)) || (!best && covers))
							best = { v, idx, on, exact };
					}
					on += len;
				});
				if (best && (best as any).exact) break;
			}
			if (!best) {
				// Staff has no event in this bar (or the onset is past the end): first voice end.
				const v = part.voices[0];
				best = { v, idx: v.events.length - 1, on: target, exact: false };
				lost++;
			} else if (!(best as any).exact) shifted++;
			const list = inserts.get(best.v) || inserts.set(best.v, []).get(best.v)!;
			list.push({ idx: best.idx, ev: { type: "harmony", text: h.text } });
		}
		for (const [v, list] of inserts) {
			// Stable: same anchor keeps source order; insert from the back.
			const sorted = list.map((x, i) => ({ ...x, i })).sort((a, b) => b.idx - a.idx || b.i - a.i);
			for (const x of sorted) (v.events as any[]).splice(x.idx + 1, 0, x.ev);
		}
	}
	const notes = [`${harms.length} chord symbols / Roman numerals placed from the MuseScore source (${harms.filter(h => h.src === "xml").length} with text rebuilt from MusicXML)`];
	if (shifted) notes.push(`${shifted} chord symbols moved to the start of the note/tuplet they fall inside`);
	if (lost) notes.push(`${lost} chord symbols on a staff with no event in that bar, attached at the end of the first voice`);
	return notes;
};

// ---------------------------------------------------------------------------
// Serialization

/** Serialize a doc (mutates a deep copy), with the restated \\key / \\time dropped. */
export const serialize = (doc: LilyletDoc, serializeLilyletDoc: (d: LilyletDoc) => string, strip = true): string => {
	const code = serializeLilyletDoc(JSON.parse(JSON.stringify(doc)));
	return strip ? stripRestatedContext(code) : code;
};

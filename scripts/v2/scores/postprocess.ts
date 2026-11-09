/**
 * Post-processing of musicXmlDecoder output. The lilylet repo is not modified; every
 * systematic decoder/serializer issue we work around lives here, and each function
 * returns a short note of what it changed (recorded in the .check.json / manifest).
 */
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import type { LilyletDoc } from "../../../../lilylet/source/lilylet";

// Template leftovers seen in the OMT workbook files: a title copied from another
// worksheet, or MuseScore's defaults.
const JUNK_TITLES = [/^WK blues scales$/i, /^WK The Phrase, Archetypes/i, /^Untitled score$/i, /^Title$/i,
	/\.(musicxml|mxl|xml)$/i, /^Diatonic Modes, Pentatonic, an/i];
const JUNK_COMPOSERS = [/^Composer \/ arranger$/i, /^Name:/i, /^Music21$/i, /^Composer$/i];

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

export const postprocessDoc = (doc: LilyletDoc, ctx: { xml: string; m21: any; file: any; harms?: Harm[] }): string[] => {
	const rel = ctx.file.local.slice("media/".length).replace(/\.[^.]+$/, "");
	const notes = fixMetadata(doc, rel);
	takeBareTupletCount();
	notes.push(...regroupTuplets(doc).map(x => "TUPLET REGROUP PROBLEM: " + x));
	const bare = takeBareTupletCount();
	if (bare) notes.push(`${bare} tuplet group(s) without a <tuplet> bracket in the source wrapped in \\tuplet`);
	notes.push(...splitBreves(doc));
	notes.push(...cleanMarks(doc));
	notes.push(...placeHarmonies(doc, ctx.harms || []));
	notes.push(...restoreTimeSymbols(doc, ctx.xml));
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
	let n = 0;
	let out = xml.replace(/<unpitched>\s*<display-step>([A-G])<\/display-step>\s*<display-octave>(\d)<\/display-octave>\s*<\/unpitched>/g,
		(_m, step, oct) => { n++; return `<pitch><step>${step}</step><octave>${oct}</octave></pitch>`; });
	// Bare <unpitched/> (no position): middle line of a treble staff.
	out = out.replace(/<unpitched\s*\/>/g, () => { n++; return "<pitch><step>B</step><octave>4</octave></pitch>"; });
	let c = 0;
	out = out.replace(/<clef([^>]*)>\s*<sign>percussion<\/sign>(\s*<line>\d<\/line>)?\s*<\/clef>/g,
		(_m, attrs) => { c++; return `<clef${attrs}><sign>G</sign><line>2</line></clef>`; });
	if (n) notes.push(`${n} unpitched (percussion) notes written as pitches at their staff position; percussion clef -> treble`);
	if (/<staff-lines>1<\/staff-lines>/.test(out)) notes.push("source uses a 1-line staff; lilylet draws 5 lines");
	if (/<notehead[^>]*>(x|cross|circle-x|slash|diamond|triangle)/.test(xml)) notes.push("special noteheads (x/slash/diamond) not kept");
	const ct = unwrapChordTuplets(out);
	out = ct.xml;
	if (ct.n) notes.push(`${ct.n} tuplets containing chords regrouped after decoding (decoder splits chords inside tuplets)`);
	const bf = cancelBackupForward(out);
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
 * The decoder writes a breve as division 0.5 (serialized `g0.5`), which the parser
 * reads back as a dotted quarter with fingering 5. lilylet has no breve, so split
 * notes/rests longer than a whole note into tied whole notes (rests: whole rests),
 * adding a lyric skip for each extra note so syllables stay aligned.
 */
export const splitBreves = (doc: LilyletDoc): string[] => {
	let n = 0;
	for (const m of doc.measures) for (const p of m.parts) for (const v of p.voices) {
		const out: any[] = [];
		let noteIdx = 0;
		const skipsAfter: number[] = [];   // note indices that get a lyric skip (`_`)
		for (const e of v.events as any[]) {
			const d = e.duration;
			if ((e.type === "note" || e.type === "rest") && d && d.division > 0 && d.division < 1 && !e.fullMeasure) {
				let wholes = 1 / d.division;
				let add = wholes / 2;
				for (let i = 0; i < (d.dots || 0); i++, add /= 2) wholes += add;
				if (Number.isInteger(wholes)) {
					n++;
					for (let i = 0; i < wholes; i++) {
						const copy: any = { ...e, duration: { division: 1, dots: 0 } };
						if (e.type === "note") {
							const last = i === wholes - 1;
							// Fermata and slur ends go on the last note, everything else on the first.
							const atEnd = (mk: any) => (mk.markType === "ornament" && /fermata/i.test(mk.type)) || (mk.markType === "slur" && !mk.start);
							const marks = (e.marks || []).filter((mk: any) => mk.markType !== "tie" && (atEnd(mk) ? last : i === 0));
							const keepTie = (e.marks || []).some((mk: any) => mk.markType === "tie" && mk.start);
							if (!last || keepTie) marks.push({ markType: "tie", start: true });
							copy.marks = marks.length ? marks : undefined;
							if (i > 0) skipsAfter.push(noteIdx + i);
						}
						out.push(copy);
					}
					if (e.type === "note" && !e.grace) noteIdx += wholes;
					continue;
				}
			}
			out.push(e);
			if (e.type === "note" && !e.grace) noteIdx++;
		}
		v.events = out;
		if (skipsAfter.length && v.lyrics) for (const lane of v.lyrics) {
			for (const idx of [...skipsAfter].sort((a, b) => b - a))
				if (idx <= lane.syllables.length) lane.syllables.splice(idx, 0, { skip: true });
		}
	}
	return n ? [`${n} breve(s) written as tied whole notes / two whole rests (lilylet has no breve)`] : [];
};

// Sentinel fingerings that mark a tuplet's first/last event across the decoder.
const TUP_START = 0, TUP_STOP = 9;

/**
 * musicXmlDecoder bug: inside an open <tuplet>, a <chord/> note is merged with the
 * voice's last event OUTSIDE the tuplet (notes in the tuplet sit in the tuplet
 * tracker), so chords come out as consecutive notes and the bar overflows.
 * Workaround: for each tuplet that contains chord notes, remove its <tuplet>
 * start/stop (the notes keep <time-modification>, so their durations stay
 * tuplet-scaled and chords merge normally), and mark its first and last chord heads
 * with sentinel fingerings 0 / 9. regroupTuplets() rebuilds the TupletEvents.
 */
export const unwrapChordTuplets = (xml: string): { xml: string; n: number } => {
	if (!/<chord\s*\/>/.test(xml) || !/<tuplet\b/.test(xml)) return { xml, n: 0 };
	const dom = new DOMParser().parseFromString(xml, "application/xml");
	let n = 0;
	const parts = dom.getElementsByTagName("part");
	const addFinger = (note: Element, val: number) => {
		let notations = note.getElementsByTagName("notations")[0];
		if (!notations) { notations = dom.createElement("notations"); note.appendChild(notations); }
		let tech = notations.getElementsByTagName("technical")[0];
		if (!tech) { tech = dom.createElement("technical"); notations.appendChild(tech); }
		const f = dom.createElement("fingering");
		f.appendChild(dom.createTextNode(String(val)));
		tech.appendChild(f);
	};
	for (let pi = 0; pi < parts.length; pi++) {
		const notes = Array.from(parts[pi].getElementsByTagName("note")) as Element[];
		const open: Record<string, Element[]> = {};
		for (const note of notes) {
			const v = note.getElementsByTagName("voice")[0]?.textContent || "1";
			const tups = Array.from(note.getElementsByTagName("tuplet")) as Element[];
			if (tups.some(t => t.getAttribute("type") === "start")) open[v] = [];
			if (open[v]) open[v].push(note);
			if (open[v] && tups.some(t => t.getAttribute("type") === "stop")) {
				const group = open[v];
				delete open[v];
				const isChord = (e: Element) => e.getElementsByTagName("chord").length > 0;
				if (!group.some(isChord)) continue;
				for (const e of group) for (const t of Array.from(e.getElementsByTagName("tuplet")))
					t.parentNode!.removeChild(t);
				// Rests cannot carry a fingering: mark the first/last pitched head;
				// regroupTuplets() pulls in the leading rests (a trailing one is reported).
				const isRest = (e: Element) => e.getElementsByTagName("rest").length > 0;
				const heads = group.filter(e => !isChord(e) && !isRest(e));
				if (!heads.length) continue;
				addFinger(heads[0], TUP_START);
				addFinger(heads[heads.length - 1], TUP_STOP);
				n++;
			}
		}
	}
	return { xml: n ? new XMLSerializer().serializeToString(dom) : xml, n };
};

/** Rebuild TupletEvents from the sentinel fingerings set by unwrapChordTuplets. */
export const regroupTuplets = (doc: LilyletDoc): string[] => {
	const problems: string[] = [];
	const isSentinel = (e: any, val: number) => (e.marks || []).some((m: any) => m.markType === "fingering" && m.finger === val);
	const strip = (e: any) => {
		e.marks = (e.marks || []).filter((m: any) => !(m.markType === "fingering" && (m.finger === TUP_START || m.finger === TUP_STOP)));
		if (!e.marks.length) delete e.marks;
		const ratio = e.duration?.tuplet;
		if (e.duration) delete e.duration.tuplet;
		return ratio;
	};
	doc.measures.forEach((m, mi) => m.parts.forEach(p => p.voices.forEach(v => {
		const out: any[] = [];
		let group: any = null;
		for (const e of v.events as any[]) {
			const start = e.type === "note" && isSentinel(e, TUP_START);
			const stop = e.type === "note" && isSentinel(e, TUP_STOP);
			if (start) {
				group = { type: "tuplet", ratio: { ...e.duration.tuplet }, events: [] };
				// Leading rests of this tuplet (still tuplet-scaled, not in any group).
				const lead: any[] = [];
				while (out.length && out[out.length - 1].type === "rest" && out[out.length - 1].duration?.tuplet
					&& out[out.length - 1].duration.tuplet.numerator === group.ratio.numerator
					&& out[out.length - 1].duration.tuplet.denominator === group.ratio.denominator)
					lead.unshift(out.pop());
				for (const r of lead) { strip(r); group.events.push(r); }
			}
			if (group && (e.type === "note" || e.type === "rest" || e.type === "context")) {
				if (e.type !== "context") strip(e);
				group.events.push(e);
				if (stop) { out.push(group); group = null; }
				continue;
			}
			if (group) problems.push(`measure ${mi + 1}: ${e.type} inside a regrouped tuplet`);
			out.push(e);
		}
		if (group) { problems.push(`measure ${mi + 1}: unterminated regrouped tuplet`); out.push(group); }
		v.events = wrapBareTuplets(out);
	})));
	return problems;
};

/**
 * Notes with <time-modification> but no <tuplet> bracket keep duration.tuplet in
 * the decoded doc, but the serializer writes ratios only via `\tuplet {}` blocks,
 * so they come out at full length (bar overflows). Wrap each run of consecutive
 * events with the same ratio into tuplets of `denominator` notes' worth of time
 * (e.g. 3 eighths for 2/3, 2 quarters for 1/2).
 */
let bareTupletCount = 0;
const wrapBareTuplets = (events: any[]): any[] => {
	const out: any[] = [];
	let i = 0;
	const r = (e: any) => (e.type === "note" || e.type === "rest") && !e.grace && e.duration?.tuplet;
	while (i < events.length) {
		const e = events[i];
		const t = r(e);
		if (!t) { out.push(e); i++; continue; }
		const same = (x: any) => { const u = r(x); return u && u.numerator === t.numerator && u.denominator === t.denominator; };
		// One group = events whose plain length adds up to `denominator` x the first note.
		const unit = 1 / e.duration.division;
		const len = (x: any) => { let q = 1 / x.duration.division, d = q; for (let k = 0; k < (x.duration.dots || 0); k++) { d /= 2; q += d; } return q; };
		const group: any = { type: "tuplet", ratio: { ...t }, events: [] };
		let acc = 0;
		while (i < events.length && same(events[i]) && acc < unit * t.denominator - 1e-9) {
			const x = events[i++];
			acc += len(x);
			delete x.duration.tuplet;
			group.events.push(x);
		}
		bareTupletCount++;
		out.push(group);
	}
	return out;
};
export const takeBareTupletCount = () => { const n = bareTupletCount; bareTupletCount = 0; return n; };

/**
 * Small AST clean-ups before serializing:
 *  - a full-bar rest in a bar longer than a whole note (4/2, 12/8 ...) gets
 *    division 0.5 (`R0.5`), which the parser reads as division 0 with a dot; any
 *    `R` fills the bar, so write `R1`;
 *  - fingerings outside 1..5 serialize as `-N` but the grammar turns them into a
 *    null mark that crashes the serializer on the next pass: drop them;
 *  - a chord tied in every member gets one tie mark per member (`~~`): keep one.
 */
export const cleanMarks = (doc: LilyletDoc): string[] => {
	let rests = 0, fing = 0, ties = 0;
	const fix = (e: any) => {
		if (e.type === "rest" && e.fullMeasure && e.duration && e.duration.division < 1) {
			e.duration = { division: 1, dots: 0 };
			rests++;
		}
		if (e.marks) {
			const before = e.marks.length;
			e.marks = e.marks.filter((m: any) => {
				if (m.markType === "fingering" && !(m.finger >= 1 && m.finger <= 5)) { fing++; return false; }
				return true;
			});
			let seenTie = false;
			e.marks = e.marks.filter((m: any) => {
				if (m.markType !== "tie") return true;
				if (seenTie) { ties++; return false; }
				seenTie = true;
				return true;
			});
			if (!e.marks.length) delete e.marks;
		}
		if (e.events) e.events.forEach(fix);
	};
	for (const m of doc.measures) for (const p of m.parts) for (const v of p.voices) (v.events as any[]).forEach(fix);
	const notes: string[] = [];
	if (rests) notes.push(`${rests} full-bar rests in bars longer than a whole note written as R1`);
	if (fing) notes.push(`${fing} fingerings outside 1-5 dropped`);
	if (ties) notes.push(`${ties} duplicate chord ties merged`);
	return notes;
};

/**
 * Lexer quirk: a dynamic glued to a below-placement mark (`\pp_\markup "x"`,
 * `\mf_\markup`) loses the dynamic (`\mf_` even yields an extra note F). A space
 * (`\pp _\markup`) parses correctly. Applied to the serialized text.
 */
export const spaceDynamics = (code: string): string =>
	code.replace(/(\\(?:fffff|ffff|fff|ff|f|mf|mp|p|pp|ppp|pppp|ppppp|sffz|sfpp|sfzp|sfz|sff|sfp|sf|spp|sp|fz|fp|mfp|pf|rf|rfz|n))_/g, "$1 _");

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
// Serialization with work-arounds

const S_TEN = "@@ten@@", S_CHORD = "@@chord@@";

/**
 * Serializer bugs worked around here: tenuto is written `-_` (= portato when read
 * back) and harmony events are not written at all. Before serializing, tenuto marks
 * and harmony events become sentinel markups; finishText() turns them into `--`
 * (`^-`, `_-`) and `\chords "X"`.
 */
export const prepareForSerialize = (doc: LilyletDoc): void => {
	const fix = (e: any) => {
		if (e.events) e.events.forEach(fix);
		if (e.marks) e.marks = e.marks.map((m: any) => m.markType === "articulation" && m.type === "tenuto"
			? { markType: "markup", content: S_TEN, placement: m.placement } : m);
	};
	for (const m of doc.measures) for (const p of m.parts) for (const v of p.voices) {
		(v.events as any[]).forEach(fix);
		v.events = (v.events as any[]).map(e => e.type === "harmony" ? { type: "markup", content: S_CHORD + e.text } : e);
	}
};

export const finishText = (code: string, strip = true): string => {
	code = code.replace(/([-^_])\\markup "@@ten@@"/g, (_m, p) => (p === "-" ? "--" : p + "-"));
	code = code.replace(/\\markup "@@chord@@((?:[^"\\]|\\.)*)"/g, (_m, t) => `\\chords "${t}"`);
	return spaceDynamics(strip ? stripRestatedContext(code) : code);
};

/** Serialize a doc (mutates a deep copy) with all text work-arounds applied. */
export const serialize = (doc: LilyletDoc, serializeLilyletDoc: (d: LilyletDoc) => string, strip = true): string => {
	const copy = JSON.parse(JSON.stringify(doc));
	prepareForSerialize(copy);
	return finishText(serializeLilyletDoc(copy), strip);
};

/**
 * musicXmlDecoder ignores <time symbol="common|cut">, so the serializer writes
 * `\numericTimeSignature \time 4/4` and the C / cut-C glyph is lost. Restore the
 * symbol from the first part's <time> elements (measure index -> symbol).
 */
export const restoreTimeSymbols = (doc: LilyletDoc, xml: string): string[] => {
	const dom = new DOMParser().parseFromString(xml, "application/xml");
	const part = dom.getElementsByTagName("part")[0];
	if (!part) return [];
	let n = 0;
	const measures = Array.from(part.getElementsByTagName("measure"));
	measures.forEach((m: any, mi) => {
		const t = m.getElementsByTagName("time")[0];
		const sym = t?.getAttribute("symbol");
		const dm: any = doc.measures[mi];
		if (!dm || !t) return;
		if ((sym === "common" || sym === "cut") && dm.timeSig) {
			dm.timeSig.symbol = sym;
			for (const p of dm.parts) for (const v of p.voices) for (const e of v.events as any[])
				if (e.type === "context" && e.time) e.time.symbol = sym;
			n++;
		}
	});
	return n ? [`${n} common/cut time signatures restored (decoder drops <time symbol>)`] : [];
};

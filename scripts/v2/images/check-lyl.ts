/**
 * Static check of hand/OMR lilylet transcriptions (v2 images).
 *
 *   npx tsx scripts/v2/images/check-lyl.ts [--pitches] <file.lyl|file.md> [...]
 *
 * For each score (a .lyl, or each ```lyl block of a .md) it reports:
 *   - parse errors and parse warnings;
 *   - backslash commands the lexer does not know (they are NOT errors in lilylet:
 *     `\caesura` lexes as the notes c a e ..., `\foo` as `\f` + o o);
 *   - `\times` (skips relative-pitch resolution), `*N` after a duration (ignored);
 *   - per measure/part/voice tick totals vs the time signature (480 = quarter),
 *     honouring `\partial`;
 *   - MEI encode errors;
 *   - with --pitches: every voice's pitches in scientific notation, per bar.
 * Exit code 1 if any score has a problem.
 */
import fs from "fs";
import * as L from "../../../../lilylet/source/lilylet/index.ts";

// Commands the lexer knows (lilylet.jison, lexer section). Keep in sync.
const KNOWN = new Set([
	"clef", "key", "time", "partial", "numericTimeSignature", "defaultTimeSignature", "tempo", "staff",
	"grace", "times", "tuplet", "repeat", "ottava", "stemUp", "stemDown", "stemNeutral", "major", "minor",
	"sustainOn", "sustainOff", "bar", "coda", "segno", "chords", "markup", "addlyrics", "figures",
	"staccato", "staccatissimo", "tenuto", "marcato", "accent", "portato", "trill", "turn", "mordent",
	"prall", "fermata", "shortfermata", "arpeggio", "breathe", "glissando", "rest", "omit", "undo",
	// 0.1.96: breves, multi-bar rests, caesura, noteheads, extended dynamics, clefs
	"breve", "caesura", "xNote", "improvisationOn", "improvisationOff",
	// dynamics
	"ppp", "pp", "p", "mp", "mf", "f", "ff", "fff", "sfz", "rfz", "sf", "fp", "fffff", "ppppp", "ffff",
	"pppp", "sffz", "sfpp", "sfzp", "mfp", "sff", "sfp", "spp", "fz", "pf", "rf", "sp", "n",
]);

// `\cmd_` lexes as \cmd + notes for most commands (lilylet lexer); these few are safe (tested 0.1.94)
const SAFE_UNDERSCORE = new Set(["sf", "p", "f", "trill", "turn", "pp", "fp"]);

const pitches = process.argv.includes("--pitches");
const files = process.argv.slice(2).filter(a => !a.startsWith("--"));

const ALTER: Record<string, string> = { sharp: "#", flat: "b", natural: "", doubleSharp: "##", doubleFlat: "bb" };
const sci = (p: any) => `${p.phonet.toUpperCase()}${ALTER[p.accidental] ?? ""}${p.octave + 4}`;

const ticksOf = (d: any) => {
	if (!d || !d.division) return 0;
	let t = 1920 / d.division, dot = t / 2;
	for (let i = 0; i < (d.dots || 0); i++) { t += dot; dot /= 2; }
	return t;
};

const scoresOf = (file: string): { name: string; code: string }[] => {
	const text = fs.readFileSync(file, "utf-8");
	if (!file.endsWith(".md")) return [{ name: file, code: text }];
	const out: { name: string; code: string }[] = [];
	const re = /```lyl\n([\s\S]*?)```/g;
	let m, i = 0;
	while ((m = re.exec(text))) out.push({ name: `${file}#${++i}`, code: m[1] });
	return out;
};

let bad = 0;
for (const file of files) {
	for (const { name, code } of scoresOf(file)) {
		const problems: string[] = [];
		const stripped = code.split("\n").map(l => l.replace(/%.*$/, "")).join("\n")
			.replace(/"(?:[^"\\]|\\.)*"/g, '""');
		for (const m of stripped.matchAll(/\\([a-zA-Z]+)/g)) {
			if (!KNOWN.has(m[1])) problems.push(`unknown command \\${m[1]} (lexes as notes/rests!)`);
		}
		if (/\\times\b/.test(stripped)) problems.push("uses \\times (use \\tuplet)");
		for (const m of stripped.matchAll(/\\([a-zA-Z]+)_/g)) if (!SAFE_UNDERSCORE.has(m[1])) problems.push(`\\${m[1]} directly followed by _ (lexes as notes; add a space)`);
		if (/[0-9.]\s*\*\s*[0-9]/.test(stripped)) problems.push("`*N` duration multiplier is ignored by lilylet");
		let doc: any;
		try {
			doc = L.parseCode(code);
		} catch (e: any) {
			problems.push("PARSE ERROR: " + String(e.message).split("\n").slice(0, 3).join(" / "));
		}
		if (doc) {
			for (const w of L.getParseWarnings()) problems.push("warning: " + JSON.stringify(w));
			try { L.meiEncoder.encode(doc); } catch (e: any) { problems.push("MEI ERROR: " + e.message); }
			let timeTicks = 1920, timeShown = true;
			const lines: string[] = [];
			doc.measures.forEach((m: any, mi: number) => {
				if (m.timeSig) timeTicks = (1920 * m.timeSig.numerator) / m.timeSig.denominator;
				// a \partial in any voice applies to the whole measure (as in LilyPond)
				let measurePartial = 0;
				const findPartial = (evs: any[]) => evs.forEach((e: any) => {
					if (e && e.type === "context" && e.partial) measurePartial = ticksOf(e.partial);
				});
				m.parts.forEach((p: any) => p.voices.forEach((v: any) => findPartial(v.events)));
				m.parts.forEach((p: any, pi: number) => p.voices.forEach((v: any, vi: number) => {
					let total = 0, partial = measurePartial, hasR = false;
					const ps: string[] = [];
					const walk = (evs: any[], f: number) => {
						for (const e of evs) {
							if (!e) continue;
							if (e.type === "context" && e.partial) partial = ticksOf(e.partial);
							if (e.type === "context" && e.time) timeShown = true;
							if ((e.type === "note" || e.type === "rest") && !e.grace) {
								if (e.fullMeasure) hasR = true;
								total += ticksOf(e.duration) * f;
							}
							if (e.type === "note" && e.duration?.division === 0) problems.push(`m${mi + 1}: duration 0 (no breve support)`);
							if (e.type === "note" && pitches) ps.push((e.grace ? "g:" : "") + e.pitches.map(sci).join("+") + "/" + e.duration.division + ".".repeat(e.duration.dots || 0));
							if (e.type === "rest" && pitches) ps.push((e.invisible ? "s" : e.fullMeasure ? "R" : "r") + "/" + e.duration.division);
							if (e.type === "tuplet" || e.type === "times") walk(e.events, f * e.ratio.numerator / e.ratio.denominator);
							if (e.type === "tremolo") total += ticksOf({ division: e.division, dots: 0 }) * e.count * 2 * f;
						}
					};
					walk(v.events, 1);
					total = Math.round(total);
					const want = partial || timeTicks;
					if (m.timeSig || doc.measures.some((x: any) => x.timeSig)) {
						if (total !== want && !(hasR && total > 0)) problems.push(`m${mi + 1} part${pi + 1} voice${vi + 1}: ${total} ticks, expected ${want}${partial ? " (\\partial)" : ""}`);
					}
					if (pitches) lines.push(`  m${mi + 1} p${pi + 1} v${vi + 1} s${v.staff}: ${ps.join(" ")}`);
				}));
			});
			if (pitches) console.log(`${name}: ${doc.measures.length} measures\n` + lines.join("\n"));
		}
		if (problems.length) { bad++; console.log(`FAIL ${name}`); for (const p of problems) console.log("   " + p); }
		else console.log(`OK   ${name}`);
	}
}
process.exit(bad ? 1 : 0);

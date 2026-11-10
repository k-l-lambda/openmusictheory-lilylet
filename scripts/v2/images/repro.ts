/**
 * Minimal repros of the lilylet bugs/gaps found while transcribing the v2 images (lilylet HEAD 0.1.94).
 *
 *   npx tsx scripts/v2/images/repro.ts
 *
 * Each case parses a tiny score, encodes MEI, and tests the MEI/AST for the expected result.
 * Prints BUG (still reproduces) or fixed per case. Verovio-only issues are listed at the end.
 */
import * as L from "../../../../lilylet/source/lilylet/index.ts";

type Case = { id: string; what: string; code: string; bug: (mei: string, doc: any) => boolean };
const notes = (doc: any) => doc.measures[0].parts[0].voices[0].events.filter((e: any) => e.type === "note").length;
const count = (mei: string, re: RegExp) => (mei.match(re) || []).length;

const cases: Case[] = [
	{ id: "breve", what: "c'0 (breve) silently becomes a quarter note; \\breve is the written form",
		// \\breve parses and encodes as dur="breve"; a numeric c'0 still reads division 0.
		code: `\\time 4/2 c'\\breve | %1`, bug: mei => !/dur="breve"/.test(mei) },
	{ id: "caesura", what: "\\caesura is not a command: lexes as the notes c a e ...",
		code: `\\time 4/4 c'4 \\caesura c c c | %1`, bug: (_, d) => notes(d) > 4 },
	{ id: "mmrest", what: "R1*4: the *4 multiplier is ignored (drawn as one bar of rest)",
		// Correct today: one measure carrying <multiRest num="4">, not four measures.
		code: `\\time 4/4 R1*4 | %1`, bug: (mei, d) => d.measures.length === 1 && !/<multiRest\b[^>]*\bnum="4"/.test(mei) },
	{ id: "slashhead", what: "\\improvisationOn / \\xNote lex as notes (no slash or x noteheads)",
		code: `\\time 4/4 \\xNote c'4 c c c | %1`, bug: (_, d) => notes(d) > 4 },
	{ id: "cmd-underscore", what: "\\cmd_ without a space lexes as notes for most commands (\\coda_ \\fermata_ \\mf_ \\staccato_ \\ff_ ...)",
		code: `\\time 4/4 g'1\\coda_\\markup "x" | %1`, bug: (_, d) => notes(d) > 1 },
	{ id: "markup-on-rest", what: "markup attached to a rest/spacer is dropped (meiEncoder case 'rest' ignores rest marks)",
		code: `\\time 4/4 r1^\\markup "B" | %1`, bug: mei => !/>B</.test(mei) },
	{ id: "accid-repeat", what: "an accidental already shown earlier in the bar is drawn again",
		code: `\\key c \\major \\time 4/4 bf'4 a bf c | %1`, bug: mei => count(mei, /accid="f"/g) > 1 },
	{ id: "accid-tie", what: "tie continuation in the next bar redraws the accidental (accid on tie=\"t\")",
		code: `\\time 3/4 ef'2.~ | %1\n\\time 3/4 ef'8 d c4 r | %2`, bug: mei => /accid="f"[^>]*tie="t"|tie="t"[^>]*accid="f"/.test(mei) },
	{ id: "key-global", what: "one key signature for all staves: key.sig only on scoreDef (transposing instruments wrong)",
		code: `[staves "<a> <b>"]\n\\key c \\major \\time 4/4 c'1 \\\\\\\\\n\\key a \\major \\time 4/4 a1 | %1`, bug: mei => !/<staffDef[^>]*key\.sig/.test(mei) && !/<keySig/.test(mei) },
	{ id: "dyn-before-markup", what: "a dynamic written before _\\markup on the same note is dropped",
		code: `\\time 4/4 <a' cs>2\\p_\\markup "Viol." r2 | %1`, bug: mei => !/<dynam/.test(mei) },
	{ id: "dyn-place", what: "^/_ on dynamics is ignored (no place attribute)",
		code: `\\time 4/4 c'1^\\p | %1`, bug: mei => !/<dynam[^>]*place="above"/.test(mei) },
	{ id: "slur-in-tuplet", what: "a slur wholly inside a \\tuplet is dropped",
		code: `\\time 2/4 \\tuplet 3/2 { c'8([ e g)] } c4 | %1`, bug: mei => count(mei, /<slur /g) === 0 },
	{ id: "hairpin-in-tuplet", what: "a hairpin starting inside a \\tuplet is dropped",
		code: `\\time 2/4 \\tuplet 3/2 { b'2 c4\\< } | %1\n\\time 2/4 d2\\! | %2`, bug: mei => !/<hairpin/.test(mei) },
	{ id: "hairpin-state", what: "a hairpin crossing a barline is never cleared (pendingHairpin): later hairpins end wrong and a ghost hairpin appears",
		code: `\\time 2/8 c'8\\< d | %1\n\\time 2/8 e'8 f\\! | %2\n\\time 2/8 g'8\\> a | %3\n\\time 2/8 b'8 c\\! | %4`, bug: mei => count(mei, /<hairpin /g) !== 2 },
	{ id: "tie-from-tuplet", what: "a tie from the last note of a \\tuplet loses its end",
		code: `\\time 2/2 \\tuplet 3/2 { c''4 c8~ } c4 r2 | %1`, bug: mei => !/tie="t"/.test(mei) },
	{ id: "staff-in-tuplet", what: "a \\staff switch inside a \\tuplet is lost",
		code: `[staves "{-}"]\n\\time 2/4 \\staff "1" \\tuplet 3/2 { c''8[ c \\staff "2" c,] } r4 \\\\ \\staff "2" \\clef "bass" s2 | %1`,
		bug: mei => !/staff="2"/.test(mei) },
	{ id: "stem-in-tuplet", what: "\\stemUp does not reach notes inside a \\tuplet",
		code: `\\time 4/4 \\stemUp b'4 b \\tuplet 3/2 { b4 b b } | %1`, bug: mei => count(mei, /stem\.dir="up"/g) < 5 },
	{ id: "crossstaff-later-part", what: "cross-staff \\staff \"2\" inside a non-first part is not offset (lands on the wrong staff)",
		code: `[staves "<voice> {pr-pl}"]\n\\time 4/4 c'1 \\\\\\\\\n\\time 4/4 \\staff "1" e'4 \\staff "2" g,4 c2 \\\\ \\staff "2" \\clef "bass" c,1 | %1`,
		bug: mei => /<staff[^>]*n="2"[\s\S]*?staff="2"/.test(mei) && !/staff="3"/.test(mei) },
	{ id: "slur-across-staves", what: "a slur whose ends are on different staves of one voice is dropped",
		code: `[staves "{-}"]\n\\time 4/4 \\staff "1" c'4( d e f | %1\n\\time 4/4 \\staff "1" e'4 \\staff "2" c,2. | %2\n\\time 4/4 \\staff "2" c4) r r2 | %3`,
		bug: mei => count(mei, /<slur /g) === 0 },
	{ id: "nested-tuplet", what: "a \\tuplet nested in a \\tuplet is dropped",
		code: `\\time 2/4 \\tuplet 3/2 { c'8 \\tuplet 3/2 { d16 e f } g8 } r4 | %1`, bug: mei => !/pname="e"/.test(mei) },
	{ id: "tremolo-postevent", what: "a post-event inside \\repeat tremolo is a parse error",
		code: `\\time 4/4 \\repeat tremolo 4 { b,16\\sustainOn b' } r2 | %1`, bug: () => false },
	{ id: "segno", what: "\\segno is emitted as a <dir> with no place/staff and doesn't render",
		code: `\\time 4/4 a'1\\segno | %1`, bug: mei => /<dir[^>]*>[^<]*\u{1D10B}/u.test(mei) && !/<dir[^>]*place=[^>]*>[^<]*\u{1D10B}/u.test(mei) },
	{ id: "coda-place", what: "\\coda has no place: Verovio draws it below the staff",
		code: `\\time 4/4 a'1\\coda | %1`, bug: mei => /<dir(?![^>]*place)[^>]*>[^<]*\u{1D10C}/u.test(mei) },
	{ id: "fpp", what: "no \\fpp dynamic",
		code: `\\time 4/4 c'1\\fpp | %1`, bug: mei => !/>fpp</.test(mei) },
	{ id: "unknown-clef", what: "no soprano/mezzosoprano/baritone/percussion clef (falls back to treble)",
		code: `\\time 4/4 \\clef "soprano" c'1 | %1`, bug: mei => /clef\.shape="G"/.test(mei) },
	{ id: "courtesy-prev-bar", what: "courtesy ! cancelling an accidental from a previous bar draws nothing",
		code: `\\time 4/4 as'1 | %1\n\\time 4/4 a'!1 | %2`, bug: mei => count(mei, /accid="n"/g) === 0 },
];

for (const c of cases) {
	let state = "";
	try {
		const doc = L.parseCode(c.code);
		const mei = L.meiEncoder.encode(doc);
		state = c.bug(mei, doc) ? "BUG  " : "fixed";
	} catch (e: any) {
		state = c.id === "tremolo-postevent" ? "BUG  " : "ERROR";
		if (state === "ERROR") console.log("   ", String(e.message).split("\n")[0]);
	}
	console.log(`${state} ${c.id.padEnd(22)} ${c.what}`);
}
console.log(`
Verovio-side / not checkable from MEI (see MANIFEST.md):
- [staves "x"] on a single-staff score: Verovio RuntimeError "null function or function signature mismatch".
- half-note tempo mark (\\tempo "X" 2=120) is written as U+1D157 U+1D165 and renders as a flat-like glyph.
- key change back to C major prints cancellation naturals; no way to suppress.
- repeated \\key after a mid-staff \\clef change isn't redrawn (encoder only writes a changed key).
- stacked markups on one note: the first written is drawn nearest the staff.
- no way to hide a clef, stems (stemless noteheads), or tuplet numbers; no parenthesised cautionary accidental; no volta brackets; no measure-repeat sign; grace notes always slashed; no centred label between two notes.`);

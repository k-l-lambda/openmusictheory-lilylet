/**
 * Minimal repros of the lilylet bugs worked around in postprocess.ts.
 *
 *   npx tsx scripts/v2/scores/repro.ts
 *
 * Prints BUG or fixed for each. When one says fixed, its work-around can go.
 */
import * as l from "../../../../lilylet/source/lilylet";

const xml = (attrs: string, body: string, parts = 1) => `<?xml version="1.0"?><score-partwise version="4.0"><part-list>${
	Array.from({ length: parts }, (_, i) => `<score-part id="P${i + 1}"><part-name>P</part-name></score-part>`).join("")}</part-list>
<part id="P1"><measure number="1"><attributes><divisions>6</divisions>${attrs}</attributes>${body}</measure></part></score-partwise>`;
const time = (b: number, t: number, sym = "") => `<time${sym}><beats>${b}</beats><beat-type>${t}</beat-type></time><clef><sign>G</sign><line>2</line></clef>`;
const n = (step: string, o: number, dur: number, type: string, extra = "", pre = "") =>
	`<note>${pre}<pitch><step>${step}</step><octave>${o}</octave></pitch><duration>${dur}</duration><voice>1</voice><type>${type}</type>${extra}</note>`;
const tm = `<time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification>`;
const ser = (x: string) => l.serializeLilyletDoc(l.musicXmlDecoder.decode(x)).trim();
const marks = (code: string) => (l.parseCode(code).measures[0].parts[0].voices[0].events as any[])
	.filter(e => e.type === "note").map(e => (e.marks || []).map((m: any) => m ? m.markType + ":" + (m.type ?? m.finger ?? "") : "NULL"));

const cases: [string, () => string, (out: string) => boolean][] = [
	["decoder: <unpitched> notes are dropped",
		() => ser(xml(`<time><beats>2</beats><beat-type>4</beat-type></time><clef><sign>percussion</sign></clef>`,
			`<note><unpitched><display-step>C</display-step><display-octave>5</display-octave></unpitched><duration>6</duration><voice>1</voice><type>quarter</type></note>`.repeat(2))),
		o => !/c/.test(o.replace(/\\[a-z]+|"[^"]*"/g, ""))],
	["decoder: <chord/> inside a <tuplet> is split off / merged outside the tuplet",
		() => ser(xml(time(2, 4), n("F", 4, 2, "eighth", tm + `<notations><tuplet type="start"/></notations>`) + n("A", 4, 2, "eighth", tm, "<chord/>")
			+ n("G", 4, 2, "eighth", tm) + n("B", 4, 2, "eighth", tm, "<chord/>") + n("A", 4, 2, "eighth", tm + `<notations><tuplet type="stop"/></notations>`)
			+ n("C", 5, 2, "eighth", tm, "<chord/>") + n("C", 5, 6, "quarter"))),
		o => !/<f a>/.test(o)],
	["serializer: <time-modification> without a <tuplet> bracket loses its ratio",
		() => ser(xml(time(2, 4), n("C", 4, 3, "quarter", `<time-modification><actual-notes>2</actual-notes><normal-notes>1</normal-notes></time-modification>`).repeat(4))),
		o => !/\\tuplet/.test(o)],
	["decoder: zero-net <backup>/<forward> around a direction adds spacer rests",
		() => ser(xml(time(2, 4), n("C", 4, 6, "quarter") + `<backup><duration>3</duration></backup><direction><direction-type><words>x</words></direction-type></direction><forward><duration>3</duration></forward>` + n("D", 4, 6, "quarter"))),
		o => /\bs\d/.test(o)],
	["decoder/parser: breve serializes as `0.5`, read back as a dotted quarter + fingering 5",
		() => JSON.stringify(marks(ser(xml(time(4, 2), n("C", 5, 48, "breve"))))),
		o => /fingering:5/.test(o)],
	["parser: full-bar rest `R0.5` (bars longer than a whole note) reads as division 0",
		() => JSON.stringify((l.parseCode(String.raw`\time 4/2 R0.5 | %1`).measures[0].parts[0].voices[0].events as any[]).find(e => e.type === "rest").duration),
		o => /"division":0/.test(o)],
	["decoder: <time symbol=common|cut> ignored (numeric 4/4, 2/2 drawn)",
		() => ser(xml(time(2, 2, ` symbol="cut"`), n("C", 5, 24, "whole"))),
		o => /numericTimeSignature/.test(o)],
	["decoder: Roman numeral <harmony> (<numeral>, no <root>) dropped",
		() => JSON.stringify((l.musicXmlDecoder.decode(xml(time(2, 4), `<harmony><numeral><numeral-root text="V">5</numeral-root></numeral><kind>major</kind></harmony>` + n("C", 4, 12, "half")))
			.measures[0].parts[0].voices[0].events as any[]).map(e => e.type)),
		o => !/harmony/.test(o)],
	["decoder: harmony events after all notes (should precede/attach to their note)",
		() => JSON.stringify((l.musicXmlDecoder.decode(xml(time(2, 4), `<harmony><root><root-step>C</root-step></root><kind>major</kind></harmony>` + n("C", 4, 6, "quarter")
			+ `<harmony><root><root-step>G</root-step></root><kind>major</kind></harmony>` + n("D", 4, 6, "quarter"))).measures[0].parts[0].voices[0].events as any[]).map(e => e.type)),
		o => /"note","note","harmony","harmony"/.test(o)],
	["serializer: harmony events not written",
		() => l.serializeLilyletDoc(l.parseCode(String.raw`c4 \chords "C7" d | %1`)).trim(),
		o => !/chords/.test(o)],
	["serializer: tenuto written `-_` (= portato), portato `-_.` (= portato + staccato)",
		() => l.serializeLilyletDoc(l.parseCode(String.raw`c4-- d-_ | %1`)).trim(),
		o => /c4-_ d-_\./.test(o)],
	["lexer: dynamic glued to `_` (`\\pp_\\markup`) is dropped; `\\mf_` adds a note F",
		() => JSON.stringify(marks(String.raw`e8\pp_\markup "x" | %1`)) + " " + JSON.stringify(marks(String.raw`e8\mf_\markup "x" | %1`)),
		o => !/dynamic:pp/.test(o) || /\],\[/.test(o)],
	["grammar: fingering outside 1-5 (`-9`) becomes a null mark; serializer then crashes",
		() => JSON.stringify(marks(String.raw`c4-9 d | %1`)),
		o => /NULL/.test(o)],
	["parser: every `\\!` reads back as crescendoEnd (MEI is right, AST is not)",
		() => JSON.stringify(marks(String.raw`c4\> d e\! f | %1`)),
		o => /crescendoEnd/.test(o)],
	["meiEncoder: double sharp written accid.ges=\"x\" (Verovio: unsupported, wants \"ss\")",
		() => (l.meiEncoder.encode(l.parseCode(String.raw`\key gs \minor fss'4 | %1`)).match(/accid(\.ges)?="[^"]*"/g) || []).join(" "),
		o => /accid\.ges="x"/.test(o)],
	["meiEncoder: slur across a barline encoded in the end measure (Verovio warning)",
		() => (l.meiEncoder.encode(l.parseCode(String.raw`c2( d | %1

e2) f | %2`)).split(/<measure\b/).findIndex(m => /<slur /.test(m))).toString(),
		o => o === "2"],
];

for (const [name, run, isBug] of cases) {
	let out: string;
	try { out = run(); } catch (e: any) { out = "THROWS " + e.message; }
	console.log(`${isBug(out) ? "BUG  " : "fixed"} ${name}\n        ${out.replace(/\n/g, " ").slice(0, 160)}`);
}

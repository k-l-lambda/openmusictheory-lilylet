/**
 * Step 3b: split a converted multi-example score into one .lyl per example, at its
 * final barlines (`\bar "|."`). Used for the 48 WTC fugue subjects.
 *
 *   npx tsx scripts/v2/scores/split.ts <whole.lyl> <outDir> [--names "a|b|..." | --wtc]
 *
 * --wtc titles the 48 pieces as the fugue subjects of the Well-Tempered Clavier I/II.
 *
 * Each piece gets the key, time signature and clefs in force at its first bar, and a
 * [title] from --names (or "<title> (n)"). Every piece is checked: its parsed notes must
 * equal the corresponding bars of the whole file. Prints one line per piece; exit 1 on
 * any mismatch.
 */
import fs from "fs";
import path from "path";
import * as lilylet from "../../../../lilylet/source/lilylet";
import { serialize } from "./postprocess";
import { dumpNotes } from "./dump-notes";

const [wholePath, outDir] = process.argv.slice(2);
const ni = process.argv.indexOf("--names");
const WTC_KEYS = ["C major", "C minor", "C# major", "C# minor", "D major", "D minor", "Eb major", "D# minor", "E major", "E minor",
	"F major", "F minor", "F# major", "F# minor", "G major", "G minor", "Ab major", "G# minor", "A major", "A minor",
	"Bb major", "Bb minor", "B major", "B minor"];
const names = ni > 0 ? process.argv[ni + 1].split("|")
	: process.argv.includes("--wtc") ? [1, 2].flatMap(book => WTC_KEYS.map((k, i) =>
		`Bach, Well-Tempered Clavier ${book === 1 ? "I" : "II"}, Fugue ${i + 1} in ${k}, BWV ${(book === 1 ? 846 : 870) + i}: subject`))
	: [];
const whole = lilylet.parseCode(fs.readFileSync(wholePath, "utf-8"));
const wholeNotes = dumpNotes(whole);

// Piece boundaries: a measure whose voices end with a final barline closes a piece.
const ends: number[] = [];
whole.measures.forEach((m, i) => {
	if (m.parts.some(p => p.voices.some(v => (v.events as any[]).some(e => e.type === "barline" && e.style === "|."))))
		ends.push(i);
});
if (ends[ends.length - 1] !== whole.measures.length - 1) ends.push(whole.measures.length - 1);

// Running key/time/clef state at the start of each measure.
let key: any, time: any;
const clefs: Record<string, any> = {};   // "part:staff" -> clef
const stateAt: { key: any; time: any; clefs: Record<string, any> }[] = [];
whole.measures.forEach(m => {
	stateAt.push({ key, time, clefs: { ...clefs } });
	if (m.key) key = m.key;
	if (m.timeSig) time = m.timeSig;
	m.parts.forEach((p, pi) => p.voices.forEach(v => {
		let staff = v.staff || 1;
		for (const e of v.events as any[]) if (e.type === "context") {
			if (e.staff) staff = e.staff;
			if (e.clef) clefs[`${pi}:${staff}`] = e.clef;
		}
	}));
});

fs.mkdirSync(outDir, { recursive: true });
let start = 0, bad = 0;
ends.forEach((end, k) => {
	const measures = JSON.parse(JSON.stringify(whole.measures.slice(start, end + 1)));
	const st = stateAt[start];
	const first = measures[0];
	if (!first.key && st.key) first.key = st.key;
	if (!first.timeSig && st.time) first.timeSig = st.time;
	// Clefs: give the first voice on each staff its clef if the bar does not set one.
	first.parts.forEach((p: any, pi: number) => {
		const seen = new Set<number>();
		for (const v of p.voices) {
			const s = v.staff || 1;
			if (seen.has(s)) continue;
			seen.add(s);
			const hasClef = (v.events as any[]).some(e => e.type === "context" && e.clef);
			const c = st.clefs[`${pi}:${s}`];
			if (!hasClef && c) v.events.unshift({ type: "context", clef: c });
		}
	});
	const title = names[k] || `${whole.metadata?.title || "Example"} (${k + 1})`;
	const doc = { metadata: { ...whole.metadata, title }, measures };
	const code = serialize(doc as any, lilylet.serializeLilyletDoc);
	// Check against the whole file.
	const got = dumpNotes(lilylet.parseCode(code));
	const want = wholeNotes.map(s => ({ notes: s.notes.filter((n: any) => n[0] >= start && n[0] <= end).map((n: any) => [n[0] - start, ...n.slice(1)]) }));
	const ok = JSON.stringify(got) === JSON.stringify(want);
	if (!ok) bad++;
	const file = path.join(outDir, `${String(k + 1).padStart(2, "0")}.lyl`);
	fs.writeFileSync(file, code);
	console.log(`${ok ? "ok  " : "DIFF"} ${file} bars ${start + 1}-${end + 1} ${title}`);
	start = end + 1;
});
process.exit(bad ? 1 : 0);

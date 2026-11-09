/**
 * Clef check: the clef in force at the start of every bar, per staff, in the MuseScore
 * source (all <Clef> elements, header clefs included) vs the parsed .lyl.
 *
 *   npx tsx scripts/v2/scores/check_clefs.ts [--work /tmp/omt-v2-scores]
 *
 * Uses <work>/patched/<rel>.mscx when present (what was exported), else the source.
 * Prints one line per file with a mismatch; writes <work>/clefs.json {rel: [mismatch…]}.
 */
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import * as lilylet from "../../../../lilylet/source/lilylet";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const i = process.argv.indexOf("--work");
const WORK = i > 0 ? process.argv[i + 1] : "/tmp/omt-v2-scores";
const MS: Record<string, string> = { G: "treble", F: "bass", C3: "alto", C4: "tenor", G8vb: "treble_8", C1: "soprano", C2: "mezzosoprano", F3B: "baritone", G15ma: "treble^15", G8va: "treble^8", F8vb: "bass_8", PERC: "percussion" };
const rows: any[] = JSON.parse(fs.readFileSync(path.join(ROOT, "v2/lilylet/MANIFEST.json"), "utf-8")).files;
const out: Record<string, string[]> = {};
for (const r of rows) {
	if (!r.lyl || !/\.msc[zx]$/.test(r.source)) continue;
	const rel = r.source.replace(/^v2\/media\//, "").replace(/\.[^.]+$/, "");
	const pat = path.join(WORK, "patched", rel + ".mscx");
	const x = fs.existsSync(pat) ? fs.readFileSync(pat, "utf-8") : r.source.endsWith(".mscx") ? fs.readFileSync(path.join(ROOT, r.source), "utf-8")
		: execFileSync("unzip", ["-p", path.join(ROOT, r.source), "*.mscx"], { maxBuffer: 1 << 28 }).toString("utf-8");
	// source: clef at the start of each bar per staff (Score-level <Staff id> blocks)
	const src: string[][] = [];
	const part = (x.match(/<Part\b[\s\S]*?<\/Part>/g) || []).map(p => (p.match(/<Staff id="\d+"/g) || []).length);
	const defaults: string[] = (x.match(/<Part\b[\s\S]*?<\/Part>/g) || []).flatMap(p =>
		(p.match(/<Staff id="\d+">[\s\S]*?<\/Staff>/g) || []).map(s => (s.match(/<defaultClef>([^<]+)/) || s.match(/<defaultConcertClef>([^<]+)/) || [])[1] || "G"));
	const staves = x.match(/<Staff id="\d+">(?:(?!<\/Staff>)[\s\S])*?<Measure\b[\s\S]*?<\/Staff>/g) || [];
	staves.forEach((st, si) => {
		let cur = defaults[si] || "G";
		const bars: string[] = [];
		for (const m of st.match(/<Measure\b[\s\S]*?<\/Measure>/g) || []) {
			// clef(s) at the very start of the bar (before the first Chord/Rest) set this bar
			const head = m.split(/<(Chord|Rest)\b/)[0];
			for (const c of head.match(/<concertClefType>([^<]+)/g) || []) cur = c.replace(/.*>/, "");
			bars.push(cur);
			for (const c of m.slice(head.length).match(/<concertClefType>([^<]+)/g) || []) cur = c.replace(/.*>/, "");
		}
		src.push(bars.map(c => MS[c] || c));
	});
	// lilylet: clef at the start of each bar per (part, staff), flattened in score order
	const doc = lilylet.parseCode(fs.readFileSync(path.join(ROOT, r.lyl), "utf-8"));
	const lyl: string[][] = [];
	const cur: Record<string, string> = {};
	doc.measures.forEach((m: any, mi) => {
		const atStart: Record<string, string> = {};
		m.parts.forEach((p: any, pi: number) => p.voices.forEach((v: any) => {
			let s = v.staff || 1, first = true;
			for (const e of v.events) {
				if (e.type === "context" && e.staff) s = e.staff;
				if (e.type === "context" && e.clef && first) atStart[`${pi}:${s}`] = e.clef;
				if (e.type === "note" || e.type === "rest" || e.type === "tuplet") { if (first) first = false; }
				if (e.type === "context" && e.clef && !first) cur[`${pi}:${s}:mid`] = e.clef;
			}
		}));
		let flat = 0;
		part.forEach((n, pi) => { for (let s = 1; s <= n; s++, flat++) {
			const k = `${pi}:${s}`;
			if (atStart[k]) cur[k] = atStart[k];
			else if (cur[k + ":mid"]) { cur[k] = cur[k + ":mid"]; }
			delete cur[k + ":mid"];
			(lyl[flat] ||= [])[mi] = cur[k] || "treble";
		} });
	});
	const bad: string[] = [];
	src.forEach((bars, si) => bars.forEach((c, mi) => {
		const l = lyl[si]?.[mi];
		if (l !== undefined && l !== c && !(c === "percussion")) bad.push(`staff ${si + 1} bar ${mi + 1}: source ${c}, lyl ${l}`);
	}));
	if (bad.length) { out[rel] = bad; console.log(`${rel}: ${bad.length} bars — ${bad.slice(0, 3).join("; ")}`); }
}
fs.writeFileSync(path.join(WORK, "clefs.json"), JSON.stringify(out, null, 1));
console.log(Object.keys(out).length, "files with clef mismatches");

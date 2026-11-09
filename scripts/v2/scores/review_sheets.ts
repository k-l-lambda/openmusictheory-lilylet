/**
 * Visual review sheets: each MuseScore page of a source file next to Verovio's rendering
 * of the same bars of its .lyl, one PNG per page (headless Chrome screenshot).
 *
 *   npx tsx scripts/v2/scores/review_sheets.ts --out DIR [--renders omr-review/v2-renders]
 *        [--pages all|sample] [--only SUBSTR] [REL ...]
 *
 * REL is YYYY/MM/<base> (default: every row of v2/lilylet/MANIFEST.json with a .lyl).
 * Needs render_pages.py output (page PNGs + bars per page). --pages sample (default)
 * takes pages 1, 2, the middle one and the last; --pages all takes every page.
 * The slice of the .lyl carries the key, time signature and clefs in force at its first
 * bar (as split.ts does) and Verovio prints every bar number, so bars line up by number.
 * Writes DIR/<YYYY-MM-base>-pN.png and prints one line per sheet.
 */
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
// @ts-ignore
import createVerovioModule from "verovio/wasm";
// @ts-ignore
import { VerovioToolkit, enableLog, LOG_OFF } from "verovio/esm";
import * as lilylet from "../../../../lilylet/source/lilylet";
import { serialize } from "./postprocess";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const args = process.argv.slice(2);
const opt = (n: string, d?: string) => { const i = args.indexOf("--" + n); return i >= 0 ? args.splice(i, 2)[1] : d; };
const OUT = opt("out", "/tmp/omt-v2-review")!;
const RENDERS = opt("renders", path.join(ROOT, "omr-review/v2-renders"))!;
const PAGES = opt("pages", "sample")!;
const ONLY = opt("only");
const rels = args.filter(a => !a.startsWith("--"));

const rows: any[] = JSON.parse(fs.readFileSync(path.join(ROOT, "v2/lilylet/MANIFEST.json"), "utf-8")).files;
const relOf = (src: string) => src.replace(/^v2\/media\//, "").replace(/\.[^.]+$/, "");
const todo = rows.filter(r => r.lyl && (!rels.length || rels.includes(relOf(r.source))) && (!ONLY || r.source.includes(ONLY)));

const VerovioModule = await createVerovioModule();
enableLog(LOG_OFF, VerovioModule);
const vrv = new VerovioToolkit(VerovioModule);
fs.mkdirSync(OUT, { recursive: true });

/** Bars [a, b] (1-based) of a doc, with the key/time/clefs in force at bar a. */
const slice = (whole: any, a: number, b: number) => {
	let key: any, time: any;
	const clefs: Record<string, any> = {};
	for (let i = 0; i < a - 1; i++) {
		const m = whole.measures[i];
		if (m.key) key = m.key;
		if (m.timeSig) time = m.timeSig;
		m.parts.forEach((p: any, pi: number) => p.voices.forEach((v: any) => {
			let staff = v.staff || 1;
			for (const e of v.events) if (e.type === "context") {
				if (e.staff) staff = e.staff;
				if (e.clef) clefs[`${pi}:${staff}`] = e.clef;
			}
		}));
	}
	const measures = JSON.parse(JSON.stringify(whole.measures.slice(a - 1, b)));
	const first = measures[0];
	if (!first) return null;
	if (!first.key && key) first.key = key;
	if (!first.timeSig && time) first.timeSig = time;
	first.parts.forEach((p: any, pi: number) => {
		const seen = new Set<number>();
		for (const v of p.voices) {
			const s = v.staff || 1;
			if (seen.has(s)) continue;
			seen.add(s);
			if (!v.events.some((e: any) => e.type === "context" && e.clef) && clefs[`${pi}:${s}`]) v.events.unshift({ type: "context", clef: clefs[`${pi}:${s}`] });
		}
	});
	// [measures] (repeat layout) refers to the whole file's bars: not valid for a slice
	const { measureLayout, ...md } = whole.metadata || {};
	return { metadata: a === 1 ? md : { staves: md.staves }, measures };
};

let n = 0;
for (const r of todo) {
	const rel = relOf(r.source);
	const idxPath = path.join(RENDERS, rel + ".json");
	if (!fs.existsSync(idxPath)) { console.log("no render  " + rel); continue; }
	const idx = JSON.parse(fs.readFileSync(idxPath, "utf-8"));
	const whole = lilylet.parseCode(fs.readFileSync(path.join(ROOT, r.lyl), "utf-8"));
	const np = idx.pages.length;
	const pick = PAGES === "all" || np <= 4 ? idx.pages.map((_: any, i: number) => i)
		: [...new Set([0, 1, Math.floor(np / 2), np - 1])];
	for (const pi of pick) {
		const pg = idx.pages[pi];
		const bars: [number, number] = pg.bars || [1, whole.measures.length];
		const doc = slice(whole, bars[0], bars[1]);
		if (!doc) { console.log(`no bars    ${rel} p${pi + 1}`); continue; }
		const mei = lilylet.meiEncoder.encode(lilylet.parseCode(serialize(doc as any, lilylet.serializeLilyletDoc)));
		// Shift Verovio's bar numbers to the source's (the slice starts at bar 1).
		const mei2 = bars[0] > 1 ? mei.replace(/<measure\b([^>]*?)\sn="(\d+)"/g, (_m, at, num) => `<measure${at} n="${Number(num) + bars[0] - 1}"`) : mei;
		vrv.setOptions({ scale: 40, pageWidth: 2100, pageHeight: 2970, adjustPageHeight: true, breaks: "auto", header: "none", footer: "none", mnumInterval: 1 });
		vrv.loadData(mei2);
		const svgs: string[] = [];
		for (let p = 1; p <= vrv.getPageCount(); p++) svgs.push(vrv.renderToSVG(p));
		const png = path.join(RENDERS, path.dirname(rel), pg.png);
		const b64 = fs.readFileSync(png).toString("base64");
		// heights at 880 px column width
		const [pw, ph] = (() => { const buf = fs.readFileSync(png); return [buf.readUInt32BE(16), buf.readUInt32BE(20)]; })();
		const leftH = ph * 880 / pw;
		const rightH = svgs.reduce((acc, s) => {
			const m = s.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
			return acc + (m ? Number(m[2]) * 880 / Number(m[1]) : 1000) + 8;
		}, 0);
		const H = Math.ceil(Math.max(leftH, rightH) + 40);
		const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;background:#fff;font:13px sans-serif}.row{display:flex;gap:16px;padding:0 8px}.col{width:880px}
.col img,.col svg{width:880px;height:auto;display:block}.col svg{margin-bottom:8px}h3{margin:4px 8px;font-size:13px}</style>
<h3>${rel} · page ${pi + 1}/${np} · bars ${bars[0]}-${bars[1]} · MuseScore (left) | lilylet/Verovio (right)</h3>
<div class="row"><div class="col"><img src="data:image/png;base64,${b64}"></div><div class="col">${svgs.join("")}</div></div>`;
		const base = rel.replace(/\//g, "-") + `-p${pi + 1}`;
		const hp = path.join(OUT, base + ".html");
		fs.writeFileSync(hp, html);
		const out = path.join(OUT, base + ".png");
		try {
			execFileSync("google-chrome", ["--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
				`--window-size=1800,${H}`, `--screenshot=${out}`, "file://" + hp], { stdio: "ignore", timeout: 120000 });
		} catch { /* reported below */ }
		fs.unlinkSync(hp);
		console.log(`${fs.existsSync(out) ? "ok        " : "FAILED    "}${out}`);
		n++;
	}
}
console.log(`${n} sheets`);

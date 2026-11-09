/**
 * Step 3: MusicXML -> lilylet, then self-check.
 *
 *   npx tsx scripts/v2/scores/convert.ts [--work /tmp/omt-v2-scores] [--only SUBSTR] [--svg]
 *
 * For every <work>/xml/YYYY/MM/<base>.musicxml (listed in <work>/inventory.json):
 *   1. lilylet musicXmlDecoder.decode -> LilyletDoc
 *   2. post-process the doc (postprocess.ts: metadata, staves header, decoder fixes)
 *   3. serializeLilyletDoc, then drop key/time restated in every measure (text pass)
 *   4. parseCode(lyl) + getParseWarnings, meiEncoder.encode, Verovio loadData (+ log)
 *   5. dump the reparsed doc's notes per staff, in the same shape as extract_m21.py
 * Writes <work>/lyl/<rel>.lyl, <work>/lyl/<rel>.check.json and, with --svg,
 * <work>/svg/<rel>.svg (first page). compare.py turns these into the manifest.
 */
import fs from "fs";
import path from "path";
// @ts-ignore
import createVerovioModule from "verovio/wasm";
// @ts-ignore
import { VerovioToolkit, enableLog, enableLogToBuffer, LOG_WARNING } from "verovio/esm";
import * as lilylet from "../../../../lilylet/source/lilylet";
import { postprocessDoc, preprocessXml, serialize } from "./postprocess";
import { dumpHarmonies, dumpNotes } from "./dump-notes";

const args = process.argv.slice(2);
const opt = (name: string, def?: string) => {
	const i = args.indexOf("--" + name);
	return i >= 0 ? args[i + 1] : def;
};
const WORK = opt("work", "/tmp/omt-v2-scores")!;
const ONLY = opt("only");
const SVG = args.includes("--svg");

const inventory: any[] = JSON.parse(fs.readFileSync(path.join(WORK, "inventory.json"), "utf-8"));

const VerovioModule = await createVerovioModule();
enableLogToBuffer(1, VerovioModule);
enableLog(LOG_WARNING, VerovioModule);
const vrv = new VerovioToolkit(VerovioModule);
vrv.setOptions({ scale: 40, adjustPageHeight: true, pageWidth: 2100, pageHeight: 6000, breaks: "auto" });

const rel = (local: string) => local.slice("media/".length).replace(/\.[^.]+$/, "");

let n = 0;
for (const f of inventory) {
	if (ONLY && !f.local.includes(ONLY)) continue;
	const r = rel(f.local);
	const xmlPath = path.join(WORK, "xml", r + ".musicxml");
	if (!fs.existsSync(xmlPath)) continue;
	const lylPath = path.join(WORK, "lyl", r + ".lyl");
	const checkPath = path.join(WORK, "lyl", r + ".check.json");
	fs.mkdirSync(path.dirname(lylPath), { recursive: true });

	const check: any = { source: f.local, errors: [], warnings: [], fixes: [] };
	try {
		const pre = preprocessXml(lilylet.musicXmlDecoder.readXmlString(fs.readFileSync(xmlPath)));
		check.fixes.push(...pre.notes);
		const xml = pre.xml;
		const doc = lilylet.musicXmlDecoder.decode(xml);
		const m21Path = path.join(WORK, "m21", r + ".json");
		const m21 = fs.existsSync(m21Path) ? JSON.parse(fs.readFileSync(m21Path, "utf-8")) : {};
		const harmPath = path.join(WORK, "harm", r + ".json");
		const harms = fs.existsSync(harmPath) ? JSON.parse(fs.readFileSync(harmPath, "utf-8")) : [];
		check.fixes.push(...postprocessDoc(doc, { xml, m21, file: f, harms }));

		// Histogram of marks / non-note events, compared after the reparse: catches
		// marks the serializer writes but the parser drops (the note dump ignores them).
		const hist = (d: any) => {
			const h: Record<string, number> = {};
			const walk = (evs: any[]) => evs.forEach(e => {
				if (e.events) walk(e.events);
				for (const m of e.marks || []) {
					// `\\!` always reads back as crescendoEnd; the MEI pairs it with whatever
					// hairpin is open, so the end's type does not matter.
					const t = m.markType === "hairpin" && /End$/.test(m.type) ? "end" : m.type;
					const k = m.markType + ":" + (t ?? (m.markType === "tie" || m.markType === "slur" || m.markType === "beam" ? m.start : ""));
					h[k] = (h[k] || 0) + 1;
				}
				if (e.type === "harmony" || e.type === "markup" || e.type === "dynamic") h["ev:" + e.type] = (h["ev:" + e.type] || 0) + 1;
				if (e.type === "context") for (const k of ["key", "time", "clef", "ottava", "tempo"]) if (e[k] !== undefined) h["ctx:" + k] = (h["ctx:" + k] || 0) + 1;
			});
			d.measures.forEach((m: any) => m.parts.forEach((p: any) => p.voices.forEach((v: any) => {
				walk(v.events);
				for (const lane of v.lyrics || []) h["lyric"] = (h["lyric"] || 0) + lane.syllables.filter((x: any) => x.text).length;
			})));
			return h;
		};
		const histDoc = hist(doc);
		const code = serialize(doc, lilylet.serializeLilyletDoc);
		fs.writeFileSync(lylPath, code);

		// The text without the key/time stripping must mean the same.
		const docRaw = lilylet.parseCode(serialize(doc, lilylet.serializeLilyletDoc, false));
		const parsed = lilylet.parseCode(code);
		check.warnings.push(...lilylet.getParseWarnings().map((w: any) => `${w.type}: ${w.message}`));
		const notes = dumpNotes(parsed);
		const histLyl = hist(parsed);
		const markDiff: Record<string, [number, number]> = {};
		for (const k of new Set([...Object.keys(histDoc), ...Object.keys(histLyl)]))
			if (!k.startsWith("ctx:") && (histDoc[k] || 0) !== (histLyl[k] || 0)) markDiff[k] = [histDoc[k] || 0, histLyl[k] || 0];
		if (Object.keys(markDiff).length) check.markDiff = markDiff;
		const notesRaw = dumpNotes(docRaw);
		if (JSON.stringify(notes) !== JSON.stringify(notesRaw))
			check.errors.push("key/time stripping changed the parsed notes");
		// Round-trip: serializing the parsed doc again should give the same text.
		check.fixedPoint = serialize(parsed, lilylet.serializeLilyletDoc) === code;
		check.harmonies = dumpHarmonies(parsed);

		const mei = lilylet.meiEncoder.encode(parsed);
		// Same check at MEI level (covers key/time signatures, which the note dump ignores).
		const noIds = (x: string) => x.replace(/\s(xml:id|startid|endid|plist|corresp)="[^"]*"/g, "");
		if (noIds(mei) !== noIds(lilylet.meiEncoder.encode(docRaw)))
			check.errors.push("key/time stripping changed the MEI");
		check.meiStaves = (mei.match(/<staffDef\b/g) || []).length;
		check.meiMeasures = (mei.match(/<measure\b/g) || []).length;
		const ok = vrv.loadData(mei);
		const log = String(vrv.getLog() || "").trim();
		if (!ok) check.errors.push("verovio loadData failed");
		if (log) check.verovioLog = log.split("\n").filter(Boolean).slice(0, 20);
		check.pages = ok ? vrv.getPageCount() : 0;
		if (ok && SVG) {
			const svgPath = path.join(WORK, "svg", r + ".svg");
			fs.mkdirSync(path.dirname(svgPath), { recursive: true });
			fs.writeFileSync(svgPath, vrv.renderToSVG(1));
		}
		check.lylMeasures = parsed.measures.length;
		check.staves = notes;
	} catch (e: any) {
		check.errors.push(`${e?.name || "Error"}: ${String(e?.message || e).slice(0, 500)}`);
		if (process.env.DEBUG) console.error(e?.stack);
	}
	fs.writeFileSync(checkPath, JSON.stringify(check));
	n++;
	const flag = check.errors.length ? "ERR " + check.errors[0].slice(0, 80) : check.warnings.length ? "WARN" : "ok";
	console.log(`${flag.padEnd(6)} ${r}`);
}
console.log(`${n} files`);

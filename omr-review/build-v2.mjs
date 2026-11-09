// Data for the v2 review page (omr-review/v2.html): every OMT 2nd-edition score file and
// image transcription, its MuseScore / original rendering next to the lilylet rendering.
//
//   node omr-review/build.mjs --v2
//
// Reads v2/lilylet/MANIFEST.json (score files), v2/lilylet/images/MANIFEST.json (image
// transcriptions, optional) and scripts/v2/scores/review.json (visual-review records).
// MuseScore page renders come from scripts/v2/scores/render_pages.py into
// omr-review/v2-renders/ (git-ignored); it is run for files not rendered yet.
// Writes omr-review/v2-data.js (git-ignored): window.OMR_REVIEW_V2 = { items, ... }.
// The vendored renderers are the V1 ones (build.mjs builds them first).

import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

export const buildV2 = ({ ROOT, HERE, lilylet, verovio }) => {
	const RENDERS = path.join(HERE, "v2-renders");
	const readJson = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
	const manifest = readJson(path.join(ROOT, "v2/lilylet/MANIFEST.json"));
	if (!manifest) throw new Error("v2/lilylet/MANIFEST.json missing (scripts/v2/scores/build_manifest.py)");
	const review = readJson(path.join(ROOT, "scripts/v2/scores/review.json")) || {};
	const rel = (src) => src.replace(/^v2\/media\//, "").replace(/\.[^.]+$/, "");

	// MuseScore renders: run render_pages.py when some source has none yet.
	const missing = manifest.files.filter((r) => r.status !== "failed" && fs.existsSync(path.join(ROOT, r.source)) && !fs.existsSync(path.join(RENDERS, rel(r.source) + ".json")));
	if (missing.length && !process.env.V2_NO_RENDER) {
		console.log(`omr-review v2: rendering ${missing.length} source files with MuseScore …`);
		try {
			execFileSync("python3", [path.join(ROOT, "scripts/v2/scores/render_pages.py"), "--out", RENDERS], { stdio: "inherit" });
		} catch (e) {
			console.warn("omr-review v2: render_pages.py failed; cards without a MuseScore render show a placeholder");
		}
	}

	const items = [];
	for (const r of manifest.files) {
		const k = rel(r.source);
		const idx = readJson(path.join(RENDERS, k + ".json"));
		items.push({
			id: "s-" + k.replace(/[^A-Za-z0-9_-]+/g, "-"),
			type: "score",
			name: path.posix.basename(r.source),
			rel: k,
			source: r.source,
			category: r.category,
			kind: r.kind,
			status: r.status,
			bars: r.bars ?? null,
			chapters: r.chapters || [],
			notes: r.notes || [],
			review: review[k] || null,
			lyl: r.lyl || null,
			code: r.lyl && fs.existsSync(path.join(ROOT, r.lyl)) ? fs.readFileSync(path.join(ROOT, r.lyl), "utf8") : null,
			left: idx ? idx.pages.map((p) => ({ src: "omr-review/v2-renders/" + path.posix.dirname(k) + "/" + p.png, bars: p.bars })) : [],
			restamped: idx ? !!idx.restamped : false,
		});
	}

	// Image transcriptions (written by another pipeline; optional).
	const img = readJson(path.join(ROOT, "v2/lilylet/images/MANIFEST.json"));
	const imgRows = img ? (Array.isArray(img) ? img : img.images || img.files || []) : [];
	const mats = readJson(path.join(ROOT, "v2/materials.json"));
	const chapterOf = new Map();
	for (const m of mats?.materials || []) if (m.type === "image" && m.local && m.chapter && !chapterOf.has("v2/" + m.local)) chapterOf.set("v2/" + m.local, m.chapter);
	for (const r of imgRows) {
		if (!r.image || (!r.lyl && /^skip/.test(String(r.status)))) continue;   // not transcribed (yet)
		const k = r.image.replace(/^v2\/media\//, "");
		const lylOk = r.lyl && fs.existsSync(path.join(ROOT, r.lyl));
		items.push({
			id: "i-" + k.replace(/[^A-Za-z0-9_-]+/g, "-"),
			type: "image",
			name: path.posix.basename(r.image),
			rel: k,
			source: r.image,
			category: r.category || "image",
			kind: r.method ? "image/" + r.method : "image",
			status: String(r.status || ""),
			bars: null,
			chapters: r.chapter ? [r.chapter] : chapterOf.has(r.image) ? [chapterOf.get(r.image)] : [],
			notes: r.notes ? [].concat(r.notes) : [],
			review: review["image:" + k] || null,
			lyl: lylOk ? r.lyl : null,
			code: lylOk ? fs.readFileSync(path.join(ROOT, r.lyl), "utf8") : null,
			format: lylOk && r.lyl.endsWith(".md") ? "md" : "lyl",
			left: [{ src: r.image, bars: null }],
		});
	}

	const data = { generated: new Date().toISOString(), root: ROOT, lilylet, verovio, items };
	fs.writeFileSync(path.join(HERE, "v2-data.js"), "window.OMR_REVIEW_V2 = " + JSON.stringify(data) + ";\n");
	const n = (f) => items.filter(f).length;
	console.log(`omr-review v2: ${n((i) => i.type === "score")} score files (${n((i) => i.type === "score" && i.lyl)} with lilylet, ` +
		`${n((i) => i.type === "score" && i.left.length)} with a MuseScore render), ${n((i) => i.type === "image")} image transcriptions; ` +
		`${n((i) => i.review)} reviewed → omr-review/v2.html`);
};

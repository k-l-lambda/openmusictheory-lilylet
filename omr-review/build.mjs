// Build the OMR review page data + vendored renderers.
//
//   node omr-review/build.mjs        (or: npm run omr-review)
//
// Outputs (gitignored, regenerate after editing any .lyl):
//   omr-review/data.js                     window.OMR_REVIEW = { items, orphans, ... }
//   omr-review/vendor/lilylet.bundle.js    window.LilyletLib (lilylet's browser bundle)
//   omr-review/vendor/verovio-toolkit-wasm.js  window.verovio (Verovio UMD, wasm inlined)
//
// Every score image under Graphics/ is listed, with or without a .lyl, so pages
// that still lack a conversion show up with an empty render slot.

import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const GRAPHICS = path.join(ROOT, "Graphics");
const LYL_ROOT = path.join(GRAPHICS, "lilylet");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg"]);

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

const walk = (dir, out = []) => {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) walk(p, out);
		else out.push(p);
	}
	return out;
};

// --- images (everything under Graphics/ except the lilylet output dir) ---
const images = walk(GRAPHICS)
	.filter((p) => !p.startsWith(LYL_ROOT + path.sep))
	.filter((p) => IMAGE_EXT.has(path.extname(p).toLowerCase()))
	.map(rel)
	// skip previews inside Apple Pages packages (*.pages/...), not score resources
	.filter((p) => !/\.pages\//.test(p))
	.sort((a, b) => a.localeCompare(b));

// --- lilylet sources: .lyl (one score) or .md (text + several ```lyl blocks) ---
// comparison.md is a generated overview document, not a per-image source.
const SKIP_SOURCES = new Set(["Graphics/lilylet/comparison.md"]);
const lylFiles = fs.existsSync(LYL_ROOT)
	? walk(LYL_ROOT).filter((p) => p.endsWith(".lyl") || p.endsWith(".md")).map(rel).filter((p) => !SKIP_SOURCES.has(p))
	: [];
const lylSet = new Set(lylFiles);

// OMR manifest: image -> lyl, produced by the STARRY pipeline.
const manifestPath = path.join(ROOT, "scripts", "omr-manifest.csv");
const omrMap = new Map();
if (fs.existsSync(manifestPath)) {
	for (const line of fs.readFileSync(manifestPath, "utf8").split(/\r?\n/).slice(1)) {
		const [img, out] = line.split(",").map((s) => s && s.trim());
		if (img && out) omrMap.set(img, out);
	}
}

// Default mapping for hand-written files: Graphics/<dir>/<name>.png ->
// Graphics/lilylet/<dir>/<name>.lyl (Graphics/<name>.png -> Graphics/lilylet/<name>.lyl).
const defaultLyl = (img, ext = ".lyl") => {
	const sub = path.posix.relative("Graphics", path.posix.dirname(img));
	const base = path.posix.basename(img, path.posix.extname(img));
	return path.posix.join("Graphics/lilylet", sub, base + ext);
};

// --- which site pages reference each image ---
const mdFiles = walk(ROOT)
	.filter((p) => p.endsWith(".md"))
	.filter((p) => !/[\\/](node_modules|\.git|_site|dist)[\\/]/.test(p))
	.filter((p) => !p.startsWith(LYL_ROOT + path.sep));
const refs = new Map();
const refRe = /Graphics\/[^\s)"'<>]+?\.(?:png|jpe?g|gif|svg)/gi;
for (const md of mdFiles) {
	const text = fs.readFileSync(md, "utf8");
	for (const m of text.matchAll(refRe)) {
		const key = m[0];
		if (!refs.has(key)) refs.set(key, new Set());
		refs.get(key).add(rel(md));
	}
}

const usedLyl = new Set();
const items = images.map((img) => {
	let lyl = null;
	let source = null;
	if (omrMap.has(img) && lylSet.has(omrMap.get(img))) {
		lyl = omrMap.get(img);
		source = "omr";
	} else if (lylSet.has(defaultLyl(img, ".md"))) {
		// a markdown source (multi-score / annotated image) wins over a plain .lyl
		lyl = defaultLyl(img, ".md");
		source = "hand";
	} else if (lylSet.has(defaultLyl(img))) {
		lyl = defaultLyl(img);
		source = "hand";
	}
	if (lyl) usedLyl.add(lyl);
	return {
		image: img,
		dir: path.posix.dirname(img),
		name: path.posix.basename(img),
		kind: path.posix.extname(img).toLowerCase() === ".svg" ? "diagram" : "raster",
		lyl,
		source,
		format: lyl ? (lyl.endsWith(".md") ? "md" : "lyl") : null,
		code: lyl ? fs.readFileSync(path.join(ROOT, lyl), "utf8") : null,
		pages: [...(refs.get(img) || [])].sort(),
	};
});

const orphans = lylFiles.filter((f) => !usedLyl.has(f)).sort();

const pkg = (name) => JSON.parse(fs.readFileSync(path.join(ROOT, "node_modules", name, "package.json"), "utf8")).version;

// lilylet source for the browser bundle: LILYLET_SRC (a lilylet checkout) if set;
// else the sibling ../lilylet checkout if its version is newer than the npm pin
// (new syntax lands there before it is published); else the npm package.
const semverGt = (a, b) => {
	const pa = a.split(".").map(Number), pb = b.split(".").map(Number);
	for (let i = 0; i < 3; i++) if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0);
	return false;
};
const npmLilylet = { dir: path.join(ROOT, "node_modules/@k-l-lambda/lilylet"), version: pkg("@k-l-lambda/lilylet") };
const pickLilylet = () => {
	const cand = process.env.LILYLET_SRC ? path.resolve(process.env.LILYLET_SRC) : path.resolve(ROOT, "../lilylet");
	const pj = path.join(cand, "package.json");
	if (fs.existsSync(pj) && fs.existsSync(path.join(cand, "source/lilylet/parser.ts"))) {
		const v = JSON.parse(fs.readFileSync(pj, "utf8")).version;
		if (process.env.LILYLET_SRC || semverGt(v, npmLilylet.version)) return { dir: cand, version: v, from: "checkout" };
	}
	return { ...npmLilylet, from: "npm" };
};
const lilyletSrc = pickLilylet();
const data = {
	generated: new Date().toISOString(),
	root: ROOT,  // absolute repo path, for the "copy local path" links
	lilylet: lilyletSrc.version + (lilyletSrc.from === "checkout" ? " (checkout)" : ""),
	verovio: pkg("verovio"),
	items,
	orphans,
};
fs.writeFileSync(path.join(HERE, "data.js"), "window.OMR_REVIEW = " + JSON.stringify(data) + ";\n");

// --- vendored renderers ---
const vendor = path.join(HERE, "vendor");
fs.mkdirSync(vendor, { recursive: true });
fs.copyFileSync(path.join(ROOT, "node_modules/verovio/dist/verovio-toolkit-wasm.js"), path.join(vendor, "verovio-toolkit-wasm.js"));
execFileSync(path.join(ROOT, "node_modules/.bin/esbuild"), [
	path.join(HERE, "lilylet-entry.ts"),
	"--bundle", "--format=iife", "--platform=browser", "--minify", "--log-level=warning",
	"--alias:lilylet-src=" + path.join(lilyletSrc.dir, "source/lilylet"),
	"--outfile=" + path.join(vendor, "lilylet.bundle.js"),
], { stdio: "inherit" });

const withLyl = items.filter((i) => i.lyl);
console.log(`omr-review: ${items.length} images, ${withLyl.length} with lilylet ` +
	`(${withLyl.filter((i) => i.source === "omr").length} OMR, ${withLyl.filter((i) => i.source === "hand").length} hand), ` +
	`${orphans.length} orphan .lyl; lilylet ${data.lilylet}, verovio ${data.verovio}`);
if (orphans.length) console.log("  orphan .lyl (no matching image):", orphans.join(", "));

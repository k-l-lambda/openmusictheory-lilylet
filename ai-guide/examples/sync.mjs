// Keep the score blocks in ai-guide/examples/**.md in sync with their lilylet sources.
//
//   npx tsx ai-guide/examples/sync.mjs           rewrite the score blocks from source
//   npx tsx ai-guide/examples/sync.mjs --check   exit 1 if any block is stale or fails to parse
// (tsx is needed to load lilylet's TypeScript source for the parse check; plain node skips it)
//
// An example file declares its source in the YAML frontmatter:
//   lilylet: Graphics/lilylet/form/k283.lyl      (repo-relative; .lyl or .md)
// and marks where the score goes:
//   <!-- score:begin -->
//   ```lyl
//   …                                            (generated — do not edit by hand)
//   ```
//   <!-- score:end -->
// A .md source contributes each of its ```lyl blocks in order.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const check = process.argv.includes("--check");

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
	const p = path.join(d, e.name);
	return e.isDirectory() ? walk(p) : e.name.endsWith(".md") && e.name !== "README.md" && !e.name.startsWith("_") && e.name !== "lilylet-primer.md" ? [p] : [];
});

const BLOCK = /^```[ \t]*(?:lyl|lilylet)[^\n]*\n([\s\S]*?)^```[ \t]*$/gm;
const sourceBlocks = (src) => {
	const text = fs.readFileSync(path.join(ROOT, src), "utf8");
	return src.endsWith(".md") ? [...text.matchAll(BLOCK)].map((m) => m[1].replace(/\n+$/, "")) : [text.replace(/\n+$/, "")];
};

// lilylet parser (checkout if newer syntax is needed; else npm package)
const libCandidates = [process.env.LILYLET_SRC && path.join(process.env.LILYLET_SRC, "source/lilylet/index.ts"),
	path.resolve(ROOT, "../lilylet/source/lilylet/index.ts"),
	path.join(ROOT, "node_modules/@k-l-lambda/lilylet/source/lilylet/index.ts")].filter(Boolean);
let L = null;
for (const c of libCandidates) if (fs.existsSync(c)) { try { L = await import(c); break; } catch { /* try next */ } }

let stale = 0, bad = 0, n = 0;
for (const f of walk(HERE)) {
	const text = fs.readFileSync(f, "utf8");
	const fm = /^---\n([\s\S]*?)\n---/.exec(text);
	const src = fm && /^lilylet:\s*(\S+)\s*$/m.exec(fm[1]);
	if (!src) continue;
	n++;
	const rel = path.relative(ROOT, f);
	if (!fs.existsSync(path.join(ROOT, src[1]))) { console.log(`MISSING source ${src[1]}  (${rel})`); bad++; continue; }
	const blocks = sourceBlocks(src[1]);
	const body = `<!-- score:begin -->\n<!-- generated from ${src[1]} by ai-guide/examples/sync.mjs; edit the source, not this block -->\n` +
		blocks.map((b) => "```lyl\n" + b + "\n```").join("\n\n") + "\n<!-- score:end -->";
	const re = /<!-- score:begin -->[\s\S]*?<!-- score:end -->/;
	if (!re.test(text)) { console.log(`NO MARKERS  ${rel}`); bad++; continue; }
	const next = text.replace(re, body);
	if (next !== text) {
		stale++;
		if (check) console.log(`STALE  ${rel}`); else fs.writeFileSync(f, next);
	}
	if (L) for (const [i, b] of blocks.entries()) {
		try { L.parseCode(b); const w = L.getParseWarnings(); if (w.length) { bad++; console.log(`WARN   ${rel} block ${i + 1}: ${w.length} parse warning(s)`); } }
		catch (e) { bad++; console.log(`FAIL   ${rel} block ${i + 1}: ${String(e.message).split("\n")[0]}`); }
	}
}
console.log(`${n} examples, ${stale} ${check ? "stale" : "updated"}, ${bad} problem(s)${L ? "" : " (lilylet not found: parse check skipped)"}`);
if (check && (stale || bad)) process.exit(1);

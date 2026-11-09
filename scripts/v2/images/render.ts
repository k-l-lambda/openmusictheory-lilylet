/**
 * Render a .lyl to ONE SVG holding every page (scripts/render-lyl.ts renders page 1 only).
 *
 *   npx tsx scripts/v2/images/render.ts <file.lyl> <out.svg>
 *
 * Pages are stacked vertically in a wrapper <svg>. Same Verovio options as render-lyl.ts.
 */
import fs from "fs";
// @ts-ignore
import createVerovioModule from "verovio/wasm";
// @ts-ignore
import { VerovioToolkit } from "verovio/esm";
import * as lilylet from "../../../../lilylet/source/lilylet/index.ts";

const [lylPath, svgPath] = process.argv.slice(2);
if (!lylPath || !svgPath) { console.error("Usage: tsx scripts/v2/images/render.ts <file.lyl> <out.svg>"); process.exit(1); }

const doc = lilylet.parseCode(fs.readFileSync(lylPath, "utf-8"));
const mei = lilylet.meiEncoder.encode(doc);
const vrv = new VerovioToolkit(await createVerovioModule());
vrv.setOptions({ scale: 40, adjustPageHeight: true, pageHeight: 6000, pageWidth: 2100 });
if (!vrv.loadData(mei)) { console.error("Verovio failed to load MEI\n" + vrv.getLog()); process.exit(1); }
const n = vrv.getPageCount();
const pages: { svg: string; w: number; h: number }[] = [];
for (let i = 1; i <= n; i++) {
	const svg: string = vrv.renderToSVG(i);
	const m = svg.match(/<svg[^>]*width="([\d.]+)px"[^>]*height="([\d.]+)px"/);
	pages.push({ svg: svg.replace(/^<\?xml[^>]*>\s*/, ""), w: m ? +m[1] : 2100, h: m ? +m[2] : 3000 });
}
if (n === 1) fs.writeFileSync(svgPath, pages[0].svg);
else {
	const W = Math.max(...pages.map(p => p.w)), H = pages.reduce((s, p) => s + p.h, 0);
	let y = 0;
	const body = pages.map(p => { const s = p.svg.replace(/^<svg/, `<svg y="${y}"`); y += p.h; return s; }).join("\n");
	fs.writeFileSync(svgPath, `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}px" height="${H}px" viewBox="0 0 ${W} ${H}">\n${body}\n</svg>`);
}
console.log(`Rendered ${n} page(s): ${svgPath}`);

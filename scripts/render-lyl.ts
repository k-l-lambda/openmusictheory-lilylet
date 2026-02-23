import fs from "fs";
// @ts-ignore
import createVerovioModule from "verovio/wasm";
// @ts-ignore
import { VerovioToolkit } from "verovio/esm";
import * as lilylet from "../../lilylet/source/lilylet";

const lylPath = process.argv[2];
if (!lylPath) {
	console.error("Usage: tsx scripts/render-lyl.ts <file.lyl> [output.svg]");
	process.exit(1);
}

const svgPath = process.argv[3] || lylPath.replace(/\.lyl$/, ".svg");

const code = fs.readFileSync(lylPath, "utf-8");
const doc = lilylet.parseCode(code);

const mei = lilylet.meiEncoder.encode(doc);

// Calculate page height
const measureCount = doc.measures?.length || 1;
let staffCount = 1;
if (doc.measures.length > 0) {
	const firstMeasure = doc.measures[0];
	staffCount = firstMeasure.parts.reduce((total, part) => {
		const maxStaff = part.voices.reduce((max, voice) => Math.max(max, voice.staff || 1), 1);
		return total + maxStaff;
	}, 0) || 1;
}
const pageHeight = Math.max(2000, Math.ceil(measureCount / 20) * 2000) * 2 * staffCount;

const VerovioModule = await createVerovioModule();
const vrvToolkit = new VerovioToolkit(VerovioModule);

vrvToolkit.setOptions({
	scale: 40,
	adjustPageHeight: true,
	pageHeight,
	pageWidth: 2100,
});

const success = vrvToolkit.loadData(mei);
if (!success) {
	console.error("Verovio failed to load MEI data");
	console.error(vrvToolkit.getLog());
	process.exit(1);
}

const svg = vrvToolkit.renderToSVG(1);
fs.writeFileSync(svgPath, svg);
console.log(`Rendered: ${svgPath}`);

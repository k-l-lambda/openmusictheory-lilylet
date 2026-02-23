import * as fs from 'fs';
import { createRequire } from 'module';
import { encode } from '../../starry/src/utils/lilyletEncoder';

const require = createRequire(import.meta.url);
const starry = require('../../starry/src/starry/index');

const raw = JSON.parse(fs.readFileSync('/tmp/k283-score.json', 'utf-8'));
const score = starry.recoverJSON(JSON.stringify(raw.data), starry);
score.assemble(score.settings?.semanticConfidenceThreshold ?? 1);
const sheet = score.makeMusicSheet();

// Dump clef context changes per voice/measure
for (let si = 0; si < sheet.voiceStaves.length; si++) {
	const staff = sheet.voiceStaves[si];
	console.log(`\nstaff ${si} context=${staff.context}`);
	for (let vi = 0; vi < staff.voices.length; vi++) {
		const voice = staff.voices[vi];
		for (let mi = 0; mi < voice.measures.length; mi++) {
			const m = voice.measures[mi];
			if (!m) continue;
			const clefCtx = m.contextedTerms?.filter((t: any) => t.type === 0) || [];
			if (clefCtx.length > 0) {
				for (const c of clefCtx) {
					console.log(`  voice${vi} m${mi}: clef tokenType=${c.tokenType} tick=${c.tick} x=${c.x?.toFixed?.(1)} staff=${c.staff}`);
				}
			}
		}
	}
}

// Check measure widths and context x positions relative to measure
console.log('\n--- Measure widths vs clef x ---');
const spartito = score.spartito;
if (spartito?.measures) {
	for (let mi = 0; mi < spartito.measures.length; mi++) {
		const m = spartito.measures[mi];
		const width = m.width;
		for (let ci = 0; ci < (m.contexts?.length || 0); ci++) {
			const ctxList = m.contexts[ci];
			if (!ctxList) continue;
			for (const c of ctxList) {
				if (c.type === 0) { // Clef
					console.log(`  spartito m${mi} staff${ci}: clef x=${c.x?.toFixed(1)} width=${width?.toFixed(1)} ratio=${(c.x/width*100).toFixed(0)}% tick=${c.tick} tokenType=${c.tokenType}`);
				}
			}
		}
	}
}

// Check event x coordinates to understand coordinate system
console.log('\n--- Event x coordinates for m3-m5 ---');
const sp = score.spartito;
if (sp?.measures) {
	for (let mi = 3; mi <= 7; mi++) {
		const m = sp.measures[mi];
		const evXs = m.events?.map((e: any) => e.x?.toFixed(1)).join(', ');
		console.log(`  m${mi}: width=${m.width?.toFixed(1)} events x=[${evXs}]`);
		for (let ci = 0; ci < (m.contexts?.length || 0); ci++) {
			const ctxList = m.contexts[ci];
			if (!ctxList) continue;
			for (const c of ctxList) {
				if (c.type === 0) console.log(`    ctx staff${ci}: x=${c.x?.toFixed(1)} tokenType=${c.tokenType}`);
			}
		}
	}
}

// Check absolute x vs measure bounds
console.log('\n--- Measure bounds ---');
const spartito2 = score.spartito;
if (spartito2?.measures) {
	for (let mi = 3; mi <= 6; mi++) {
		const m = spartito2.measures[mi];
		console.log(`  m${mi}: left=${m.left?.toFixed(1)} width=${m.width?.toFixed(1)} right=${((m.left||0)+(m.width||0)).toFixed(1)}`);
		for (let ci = 0; ci < (m.contexts?.length || 0); ci++) {
			const ctxList = m.contexts[ci];
			if (!ctxList) continue;
			for (const c of ctxList) {
				if (c.type === 0) console.log(`    staff${ci}: x=${c.x?.toFixed(1)} tokenType=${c.tokenType}`);
			}
		}
	}
}

// Also check the LilyletDoc
const doc = encode(sheet);
for (let mi = 0; mi < doc.measures.length; mi++) {
	const m = doc.measures[mi];
	for (let pi = 0; pi < m.parts.length; pi++) {
		const part = m.parts[pi];
		for (let vi = 0; vi < part.voices.length; vi++) {
			const voice = part.voices[vi];
			const clefEvents = voice.events.filter((e: any) => e.type === 'context' && e.clef);
			if (clefEvents.length > 0) {
				for (const e of clefEvents) {
					console.log(`  LilyletDoc m${mi} part${pi} voice${vi}: clef=${(e as any).clef}`);
				}
			}
		}
	}
}

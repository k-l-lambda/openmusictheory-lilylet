import * as fs from 'fs';
import { createRequire } from 'module';
import { encode } from '../../starry/src/utils/lilyletEncoder';
import { serializeLilyletDoc } from '../../starry/src/utils/lilyletSerializer';

// Use CJS require for starry (avoids ESM barrel re-export issues)
const require = createRequire(import.meta.url);
const starry = require('../../starry/src/starry/index');

const jsonPath = process.argv[2];
if (!jsonPath) {
	console.error('Usage: tsx scripts/score-to-lilylet.ts <score.json>');
	process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
// API response wraps score in {code, data}; accept both wrapped and unwrapped
const scoreData = raw.data && raw.data.__prototype ? raw.data : raw;

const score = starry.recoverJSON(JSON.stringify(scoreData), starry);

score.assemble(score.settings?.semanticConfidenceThreshold ?? 1);

// Suppress console output during makeMusicSheet (it logs warnings to stdout)
const _log = console.log, _warn = console.warn;
console.log = console.warn = () => {};
const sheet = score.makeMusicSheet();
console.log = _log; console.warn = _warn;
const doc = encode(sheet);
const code = serializeLilyletDoc(doc);

process.stdout.write(code);

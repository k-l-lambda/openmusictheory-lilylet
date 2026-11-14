import fs from 'node:fs';
import { createRequire } from 'node:module';
import { musescoreSvgToStarry } from './musescoreToStarry.js';

const input = process.argv[2];
if (!input) {
  console.error('Usage: tsx scripts/svg/svg-to-lilylet.ts <score.svg> [--json]');
  process.exit(1);
}

const require = createRequire(import.meta.url);
const starry = require('../../../starry/src/starry/index');
const { encode } = require('../../../starry/src/utils/lilyletEncoder');
const { serializeLilyletDoc } = require('../../../starry/src/utils/lilyletSerializer');

const { scoreData, diagnostics } = musescoreSvgToStarry(fs.readFileSync(input, 'utf8'));
for (const diagnostic of diagnostics) console.error(`[${diagnostic.severity}] ${diagnostic.code}: ${diagnostic.message}`);

if (process.argv.includes('--json')) {
  process.stdout.write(JSON.stringify(scoreData, null, 2) + '\n');
  process.exit(0);
}

const score = starry.recoverJSON(JSON.stringify(scoreData), starry);
score.assemble(score.settings?.semanticConfidenceThreshold ?? 1);
const spartito = score.makeSpartito();
spartito.regulate();
if (!spartito.regulated) throw new Error('Starry Spartito regulation failed');
for (const measure of spartito.measures) {
  const voiced = new Set(measure.voices.flat());
  const omitted = measure.events.filter((event: { id: number }) => !voiced.has(event.id));
  if (omitted.length) console.error(`[warning] omitted-events: measure ${measure.measureIndex + 1}: Starry regulation excluded ${omitted.length}/${measure.events.length} assembled events from all voices`);
}
const sheet = score.makeMusicSheet();
const code = serializeLilyletDoc(encode(sheet));
process.stdout.write(code);

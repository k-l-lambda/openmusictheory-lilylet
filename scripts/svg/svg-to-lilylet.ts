// MuseScore SVG → Lilylet draft.
//
//   node --import tsx scripts/svg/svg-to-lilylet.ts <score.svg> [--report report.json] [--engine graph|starry] [--json]
//
// `graph` (default): explicit event graph → voices/onsets → Lilylet, with a
// quality report (scripts/svg/convert.ts). `starry`: the first adapter, which
// hands drawing semantics to Starry's generic OMR regulator (kept for comparison).
// Every output is an automatic draft; a clean report is not a fidelity approval.
import fs from 'node:fs';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const input = args.find(a => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--report' && args[args.indexOf(a) - 1] !== '--engine');
const opt = (name: string) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
if (!input) {
  console.error('Usage: tsx scripts/svg/svg-to-lilylet.ts <score.svg> [--report report.json] [--engine graph|starry] [--json]');
  process.exit(1);
}
const engine = opt('--engine') || 'graph';
const xml = fs.readFileSync(input, 'utf8');

if (engine === 'graph') {
  const { convertSvg } = await import('./convert.js');
  const { code, report, diagnostics } = convertSvg(xml);
  for (const d of diagnostics.filter(d => d.severity !== 'info')) console.error(`[${d.severity}] ${d.code}: ${d.message}`);
  const reportPath = opt('--report');
  if (reportPath) fs.writeFileSync(reportPath, JSON.stringify(report, null, 1) + '\n');
  console.error(`[info] quality: ${report.grade}; ${report.fineMeasures}/${report.measures} measures consistent; round-trip ${report.check.ok ? 'ok' : 'FAILED'}`);
  if (!report.check.ok) process.exitCode = 2;
  process.stdout.write(code);
} else if (engine === 'starry') {
  const { musescoreSvgToStarry } = await import('./musescoreToStarry.js');
  const require = createRequire(import.meta.url);
  const starry = require('../../../starry/src/starry/index');
  const { encode } = require('../../../starry/src/utils/lilyletEncoder');
  const { serializeLilyletDoc } = require('../../../starry/src/utils/lilyletSerializer');
  const { scoreData, diagnostics } = musescoreSvgToStarry(xml);
  for (const diagnostic of diagnostics) console.error(`[${diagnostic.severity}] ${diagnostic.code}: ${diagnostic.message}`);
  if (args.includes('--json')) {
    fs.writeSync(1, JSON.stringify(scoreData, null, 2) + '\n');
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
  process.stdout.write(serializeLilyletDoc(encode(score.makeMusicSheet())));
} else {
  console.error(`Unknown engine ${engine}`);
  process.exit(1);
}

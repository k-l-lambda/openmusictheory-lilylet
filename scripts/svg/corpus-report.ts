// Corpus quality gate for the event-graph engine: convert every first page in
// musescore-svg/, write drafts + per-file reports to a scratch directory, print
// the aggregate (grades, consistent measures, flags, diagnostics).
//
//   node --import tsx scripts/svg/corpus-report.ts [/tmp/omt-svg-corpus]
//
// "consistent" = every measure adds up and the Lilylet round-trips. It is a
// triage signal, not fidelity: compare renders with the source before trusting.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convertSvg } from './convert.js';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../musescore-svg');
const out = path.resolve(process.argv[2] || '/tmp/omt-svg-corpus');
fs.mkdirSync(out, { recursive: true });
const rows: any[] = [];
for (const f of fs.readdirSync(dir).filter(f => /^\d+_\d+_p0\.svg$/.test(f)).sort()) {
  const t = Date.now();
  try {
    const r = convertSvg(fs.readFileSync(path.join(dir, f), 'utf8'));
    fs.writeFileSync(path.join(out, f.replace(/\.svg$/, '.lyl')), r.code);
    const { check, ...rep } = r.report;
    rows.push({ f, ms: Date.now() - t, ...rep, checkOk: check.ok, mismatches: check.mismatches.length, firstMismatch: check.mismatches[0] });
  } catch (e: any) {
    rows.push({ f, ms: Date.now() - t, error: String(e?.message || e).slice(0, 300) });
  }
}
fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(rows, null, 1));
const sum = (k: string) => rows.reduce((n, r) => n + (r[k] || 0), 0);
const agg = (k: string) => {
  const o: Record<string, number> = {};
  for (const r of rows) for (const [a, b] of Object.entries(r[k] || {})) o[a] = (o[a] || 0) + (b as number);
  return Object.fromEntries(Object.entries(o).sort((a, b) => b[1] - a[1]));
};
const grades: Record<string, number> = {};
for (const r of rows) grades[r.grade || 'error'] = (grades[r.grade || 'error'] || 0) + 1;
console.log(JSON.stringify({ files: rows.length, errors: rows.filter(r => r.error).length, grades, measures: sum('measures'),
  consistentMeasures: sum('fineMeasures'), events: sum('events'), roundTripFailures: rows.filter(r => r.checkOk === false).length,
  slowestMs: Math.max(...rows.map(r => r.ms)), flags: agg('flags'), diagnostics: agg('diagnostics'), report: path.join(out, 'report.json') }, null, 1));

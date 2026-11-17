// Batch MuseScore SVG conversion. Outputs are drafts, never verified transcriptions.
//
//   node --import tsx scripts/svg/batch-to-lilylet.ts [output-directory] [--limit 20] [--force] [--engine graph|starry]
//
// Default engine `graph` writes to /tmp/omt-musescore-svg-v2; the legacy `starry`
// engine keeps its old staging directory /tmp/omt-musescore-svg. The ledger
// (manifest.json) records per row the engine, an importer hash over the engine's
// source files, the draft, the quality report summary and the review state. A
// changed source, importer or draft invalidates an earlier review.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ENGINE_FILES, ENGINE_VERSION } from './convert.js';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const opt = (name: string) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const engine = opt('--engine') || 'graph';
if (!['graph', 'starry'].includes(engine)) throw new Error(`Unknown engine ${engine}`);
const positional = args.filter((a, i) => !a.startsWith('--') && !['--limit', '--engine'].includes(args[i - 1]));
const output = path.resolve(positional[0] || (engine === 'graph' ? '/tmp/omt-musescore-svg-v2' : '/tmp/omt-musescore-svg'));
const force = args.includes('--force');
const limit = opt('--limit') === undefined ? 20 : Number(opt('--limit'));
if (!Number.isSafeInteger(limit) || limit < 1) throw new Error('--limit requires a positive integer');
const manifest = path.join(repo, 'musescore-svg/manifest.csv');
const sha = (bytes: Buffer | string) => createHash('sha256').update(bytes).digest('hex');
const LEGACY_FILES = ['geometry.ts', 'parser.ts', 'layout.ts', 'musescoreToStarry.ts', 'svg-to-lilylet.ts'];
const files = engine === 'graph' ? [...ENGINE_FILES, 'time-digits.json', 'tempo-glyphs.json'] : LEGACY_FILES;
const converterHash = sha(files.map(name => fs.readFileSync(path.join(repo, 'scripts/svg', name))).map(sha).join(':'));
const lines = fs.readFileSync(manifest, 'utf8').trim().split(/\r?\n/);
if (lines.shift() !== 'user_id,score_id,page,filename,bytes') throw new Error('Unexpected MuseScore manifest header');
const selected = lines.slice(0, limit);
for (const dir of ['lyl', 'logs', 'reports']) fs.mkdirSync(path.join(output, dir), { recursive: true });
const ledger = path.join(output, 'manifest.json');

type Quality = { grade: string; measures: number; fineMeasures: number; flags: Record<string, number>; roundTrip: boolean; unrepresented: string[] };
type Row = {
  source: string; sourceHash?: string; engine: string; converterHash: string; converterFiles: string[]; draft?: string; report?: string;
  conversion: 'missing' | 'failed' | 'draft'; error?: string; quality?: Quality;
  review: 'pending' | 'failed' | 'ok' | 'ok-with-notes' | 'skipped'; reviewNotes?: string; reviewedDraftHash?: string;
  checker?: 'pass' | 'fail' | 'not-run'; rendered?: boolean;
};
const prior: Record<string, Row> = {};
if (fs.existsSync(ledger)) for (const row of JSON.parse(fs.readFileSync(ledger, 'utf8')) as Row[]) prior[row.source] = row;
const rows: Row[] = [];
const selectedNames = new Set(selected.map(line => line.split(',')[3]));
const untouched = Object.values(prior).filter(row => !selectedNames.has(row.source));
const save = () => {
  const temporary = ledger + `.tmp-${process.pid}`;
  fs.writeFileSync(temporary, JSON.stringify([...rows, ...untouched], null, 2) + '\n');
  fs.renameSync(temporary, ledger);
};
const base = { engine: engine === 'graph' ? ENGINE_VERSION : 'starry-legacy', converterHash, converterFiles: files };
for (const line of selected) {
  const parts = line.split(',');
  if (parts.length !== 5) throw new Error(`Malformed manifest row: ${line}`);
  const [user, score, page, filename] = parts;
  if (filename !== `${user}_${score}_p${page}.svg` || !/^\d+$/.test(user + score + page)) throw new Error(`Invalid manifest filename: ${line}`);
  const source = path.join(repo, 'musescore-svg', filename);
  const stem = filename.replace(/\.svg$/, '');
  const draft = path.join(output, 'lyl', `${stem}.lyl`);
  const report = path.join(output, 'reports', `${stem}.json`);
  if (!fs.existsSync(source)) { rows.push({ source: filename, ...base, conversion: 'missing', review: 'pending' }); save(); continue; }
  const sourceHash = sha(fs.readFileSync(source));
  const old = prior[filename];
  if (!force && old?.sourceHash === sourceHash && old.converterHash === converterHash && old.conversion === 'draft' && fs.existsSync(draft)) {
    const draftHash = sha(fs.readFileSync(draft));
    rows.push(old.reviewedDraftHash && old.reviewedDraftHash !== draftHash
      ? { ...old, review: 'pending', reviewNotes: undefined, reviewedDraftHash: undefined, rendered: false }
      : { ...old, review: old.review || 'pending' });
    save();
    continue;
  }
  const log = path.join(output, 'logs', `${stem}.conversion.log`);
  // One Node process per file: a timeout then kills the converter itself.
  const child = spawnSync(process.execPath, ['--import', 'tsx', 'scripts/svg/svg-to-lilylet.ts', source, '--engine', engine,
    ...(engine === 'graph' ? ['--report', report] : [])], { cwd: repo, encoding: 'utf8', timeout: 120_000, maxBuffer: 8 * 1024 * 1024 });
  fs.writeFileSync(log, (child.stderr || '') + (child.error ? `\n${child.error}\n` : ''));
  // exit 2 = draft written but the round-trip check failed: keep it, mark the checker
  if ((child.status === 0 || child.status === 2) && child.stdout.trim()) {
    fs.writeFileSync(draft, child.stdout);
    let quality: Quality | undefined;
    if (engine === 'graph' && fs.existsSync(report)) {
      const r = JSON.parse(fs.readFileSync(report, 'utf8'));
      quality = { grade: r.grade, measures: r.measures, fineMeasures: r.fineMeasures, flags: r.flags, roundTrip: r.check.ok, unrepresented: Object.keys(r.unrepresented) };
    }
    rows.push({ source: filename, sourceHash, ...base, draft: path.relative(output, draft), report: engine === 'graph' ? path.relative(output, report) : undefined,
      conversion: 'draft', quality, review: 'pending', checker: quality ? (quality.roundTrip ? 'pass' : 'fail') : 'not-run', rendered: false });
  } else {
    for (const f of [draft, report]) if (fs.existsSync(f)) fs.unlinkSync(f);
    rows.push({ source: filename, sourceHash, ...base, conversion: 'failed', error: child.error?.message || `exit ${child.status ?? child.signal}`, review: 'pending' });
  }
  save();
  const r = rows[rows.length - 1];
  process.stderr.write(`${rows.length}/${selected.length} ${filename}: ${r.conversion}${r.quality ? ` ${r.quality.grade} ${r.quality.fineMeasures}/${r.quality.measures}` : ''}${os.EOL}`);
}
const grades: Record<string, number> = {};
for (const r of rows) if (r.quality) grades[r.quality.grade] = (grades[r.quality.grade] || 0) + 1;
console.log(JSON.stringify({ engine: base.engine, total: rows.length, drafts: rows.filter(r => r.conversion === 'draft').length,
  failed: rows.filter(r => r.conversion === 'failed').length, missing: rows.filter(r => r.conversion === 'missing').length, grades, ledger }));

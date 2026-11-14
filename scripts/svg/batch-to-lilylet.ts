// Batch experimental MuseScore SVG conversion. Outputs are drafts, never verified transcriptions.
// npx tsx scripts/svg/batch-to-lilylet.ts [output-directory] [--limit 20] [--force]
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const manifest = path.join(repo, 'musescore-svg/manifest.csv');
const output = path.resolve(process.argv[2]?.startsWith('--') ? '/tmp/omt-musescore-svg' : process.argv[2] || '/tmp/omt-musescore-svg');
const force = process.argv.includes('--force');
const limitArg = process.argv.indexOf('--limit');
const limit = limitArg === -1 ? 20 : Number(process.argv[limitArg + 1]);
if (!Number.isSafeInteger(limit) || limit < 1) throw new Error('--limit requires a positive integer');
const sha = (bytes: Buffer | string) => createHash('sha256').update(bytes).digest('hex');
const converterHash = sha(['geometry.ts', 'parser.ts', 'layout.ts', 'musescoreToStarry.ts', 'svg-to-lilylet.ts']
  .map(name => fs.readFileSync(path.join(repo, 'scripts/svg', name))).map(sha).join(':'));
const lines = fs.readFileSync(manifest, 'utf8').trim().split(/\r?\n/);
if (lines.shift() !== 'user_id,score_id,page,filename,bytes') throw new Error('Unexpected MuseScore manifest header');
const selected = lines.slice(0, limit);
if (!fs.existsSync(output)) fs.mkdirSync(output, { recursive: true });
for (const dir of ['lyl', 'logs']) fs.mkdirSync(path.join(output, dir), { recursive: true });
const ledger = path.join(output, 'manifest.json');
type Row = { source: string; sourceHash?: string; converterHash: string; draft?: string; conversion: 'missing' | 'failed' | 'draft'; error?: string; review: 'pending' | 'failed' | 'ok' | 'ok-with-notes' | 'skipped'; reviewNotes?: string; reviewedDraftHash?: string; checker?: 'pass' | 'fail' | 'not-run'; rendered?: boolean };
let prior: Record<string, Row> = {};
if (fs.existsSync(ledger)) {
  for (const row of JSON.parse(fs.readFileSync(ledger, 'utf8')) as Row[]) prior[row.source] = row;
}
const rows: Row[] = [];
const selectedNames = new Set(selected.map(line => line.split(',')[3]));
const untouched = Object.values(prior).filter(row => !selectedNames.has(row.source));
const save = () => {
  const temporary = ledger + `.tmp-${process.pid}`;
  fs.writeFileSync(temporary, JSON.stringify([...rows, ...untouched], null, 2) + '\n');
  fs.renameSync(temporary, ledger);
};
for (const line of selected) {
  const parts = line.split(',');
  if (parts.length !== 5) throw new Error(`Malformed manifest row: ${line}`);
  const [user, score, page, filename] = parts;
  if (filename !== `${user}_${score}_p${page}.svg` || !/^\d+$/.test(user + score + page)) throw new Error(`Invalid manifest filename: ${line}`);
  const source = path.join(repo, 'musescore-svg', filename);
  const draft = path.join(output, 'lyl', filename.replace(/\.svg$/, '.lyl'));
  if (!fs.existsSync(source)) {
    rows.push({ source: filename, converterHash, conversion: 'missing', review: 'pending' });
    save();
    continue;
  }
  const sourceHash = sha(fs.readFileSync(source));
  const old = prior[filename];
  if (!force && old?.sourceHash === sourceHash && old.converterHash === converterHash && old.conversion === 'draft' && fs.existsSync(draft)) {
    const draftHash = sha(fs.readFileSync(draft));
    rows.push(old.reviewedDraftHash && old.reviewedDraftHash !== draftHash
      ? { ...old, review: 'pending', reviewNotes: undefined, reviewedDraftHash: undefined, checker: 'not-run', rendered: false }
      : { ...old, review: old.review || 'pending' });
    save();
    continue;
  }
  const log = path.join(output, 'logs', filename.replace(/\.svg$/, '.conversion.log'));
  const child = spawnSync('npx', ['tsx', 'scripts/svg/svg-to-lilylet.ts', source], {
    cwd: repo, encoding: 'utf8', timeout: 120_000, maxBuffer: 8 * 1024 * 1024,
  });
  fs.writeFileSync(log, (child.stderr || '') + (child.error ? `\n${child.error}\n` : ''));
  if (child.status === 0 && child.stdout.trim()) {
    fs.writeFileSync(draft, child.stdout);
    rows.push({ source: filename, sourceHash, converterHash, draft: path.relative(output, draft), conversion: 'draft', review: 'pending', checker: 'not-run', rendered: false });
  } else {
    if (fs.existsSync(draft)) fs.unlinkSync(draft);
    rows.push({ source: filename, sourceHash, converterHash, conversion: 'failed', error: child.error?.message || `exit ${child.status ?? child.signal}`, review: 'pending' });
  }
  save();
  process.stderr.write(`${rows.length}/${selected.length} ${filename}: ${rows[rows.length - 1].conversion}${os.EOL}`);
}
console.log(JSON.stringify({ total: rows.length, available: rows.filter(r => r.conversion !== 'missing').length,
  drafts: rows.filter(r => r.conversion === 'draft').length, failed: rows.filter(r => r.conversion === 'failed').length,
  missing: rows.filter(r => r.conversion === 'missing').length, ledger }));

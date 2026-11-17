// Publish the automatic MuseScore SVG drafts into the repository.
//
//   node --import tsx scripts/svg/publish-drafts.ts [/tmp/omt-musescore-svg-v2]
//
// Copies every draft of the staging ledger (scripts/svg/batch-to-lilylet.ts) to
// v2/lilylet/musescore/<user>_<score>_p<page>.lyl and writes MANIFEST.json and
// MANIFEST.md beside them. Each row keeps the source and draft hashes, the
// importer version/hash, the quality summary, and the review state. Every file
// here is an automatic draft, NOT a verified transcription; the review state
// stays `pending` until someone compares the render with the source.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const staging = path.resolve(process.argv[2] || '/tmp/omt-musescore-svg-v2');
const out = path.join(repo, 'v2/lilylet/musescore');
const sha = (p: string) => createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const ledger: any[] = JSON.parse(fs.readFileSync(path.join(staging, 'manifest.json'), 'utf8'));

// chapters that link each MuseScore score (🎼 [MuseScore score](https://musescore.com/user/U/scores/S))
const chaptersOf = new Map<string, Set<string>>();
const walk = (dir: string) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { if (!['media', 'lilylet'].includes(f.name)) walk(p); }
    else if (f.name.endsWith('.md')) {
      for (const m of fs.readFileSync(p, 'utf8').matchAll(/musescore\.com\/user\/(\d+)\/scores\/(\d+)/g)) {
        const key = `${m[1]}_${m[2]}`;
        chaptersOf.set(key, (chaptersOf.get(key) || new Set()).add(path.relative(path.join(repo, 'v2'), p)));
      }
    }
  }
};
walk(path.join(repo, 'v2'));

fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) if (f.endsWith('.lyl')) fs.unlinkSync(path.join(out, f));
const rows = [];
for (const row of [...ledger].sort((a, b) => a.source.localeCompare(b.source))) {
  const [user, score, page] = row.source.replace(/\.svg$/, '').split('_');
  const base = {
    source: `musescore-svg/${row.source}`,
    url: `https://musescore.com/user/${user}/scores/${score}`,
    page: Number(page.replace(/^p/, '')),
    chapters: [...(chaptersOf.get(`${user}_${score}`) || [])].sort(),
    sourceHash: row.sourceHash,
    engine: row.engine,
    converterHash: row.converterHash,
  };
  if (row.conversion !== 'draft') { rows.push({ ...base, lyl: null, status: 'failed', error: row.error || row.conversion }); continue; }
  const lyl = `v2/lilylet/musescore/${row.source.replace(/\.svg$/, '.lyl')}`;
  fs.copyFileSync(path.join(staging, row.draft), path.join(repo, lyl));
  const report = row.report ? JSON.parse(fs.readFileSync(path.join(staging, row.report), 'utf8')) : undefined;
  rows.push({
    ...base, lyl, draftHash: sha(path.join(repo, lyl)), status: 'draft',
    quality: row.quality, tempos: report?.tempos || [], marks: report?.marks || {},
    review: row.review === 'pending' ? { state: 'pending' } : { state: row.review, notes: row.reviewNotes || '' },
  });
}
fs.writeFileSync(path.join(out, 'MANIFEST.json'), JSON.stringify({
  generated_by: 'scripts/svg/publish-drafts.ts (see scripts/svg/README.md)',
  note: 'Automatic drafts from MuseScore page SVGs (first pages only). Not verified transcriptions: review state is pending until compared with the source.',
  files: rows,
}, null, 1) + '\n');

const count = (f: (r: any) => boolean) => rows.filter(f).length;
const grade = (g: string) => count(r => r.quality?.grade === g);
const md = [
  '# MuseScore page drafts',
  '',
  'Automatic Lilylet drafts of the first pages of the MuseScore scores linked from the book (`musescore-svg/*_p0.svg`),',
  'made by the event-graph importer in `scripts/svg/` (see `scripts/svg/README.md`). **These are drafts, not verified',
  'transcriptions.** `consistent` only means every measure adds up and the Lilylet round-trips to the same notes, tempos',
  'and marks; it does not mean the draft matches the source. Text other than tempo (lyrics, chord symbols, Roman numerals),',
  'dynamics, slurs and ottava lines are not transcribed (per-file `quality.unrepresented`).',
  '',
  `- files: ${rows.length}, drafts: ${count(r => r.status === 'draft')}, failed: ${count(r => r.status === 'failed')}`,
  `- quality: consistent ${grade('consistent')}, flagged ${grade('flagged')}, broken ${grade('broken')}`,
  `- review: pending ${count(r => r.review?.state === 'pending')}`,
  `- linked from a chapter: ${count(r => r.chapters.length > 0)}`,
  '',
  'Regenerate: `node --import tsx scripts/svg/batch-to-lilylet.ts --limit 453`, then `node --import tsx scripts/svg/publish-drafts.ts`.',
  '',
  '| draft | quality | consistent measures | flags | chapters |',
  '|---|---|---|---|---|',
  ...rows.map(r => `| ${r.lyl ? `[${path.basename(r.lyl)}](${path.basename(r.lyl)})` : r.source} | ${r.quality?.grade ?? r.status} | ${r.quality ? `${r.quality.fineMeasures}/${r.quality.measures}` : ''} | ${Object.entries(r.quality?.flags || {}).map(([k, v]) => `${k}×${v}`).join(', ')} | ${r.chapters.map((c: string) => c.replace(/\.md$/, '')).join('<br>')} |`),
  '',
];
fs.writeFileSync(path.join(out, 'MANIFEST.md'), md.join('\n'));
console.log(`published ${count(r => r.status === 'draft')} drafts to ${path.relative(repo, out)} (consistent ${grade('consistent')}, flagged ${grade('flagged')}); ${count(r => r.chapters.length > 0)} linked from chapters`);

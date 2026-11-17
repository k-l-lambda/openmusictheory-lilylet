// Learn time-signature digit fingerprints from the corpus by self-consistency.
//
//   node --import tsx scripts/svg/learn-time-digits.ts [--write]
//
// MuseScore SVG draws digits as outlines in several fonts, so digits are
// identified by fingerprint (scripts/svg/notation.ts `digitFingerprint`).
// Labels come from the music itself: for each drawn signature, the modal
// content duration of the measures it governs must equal num/den. The most
// plausible denominator per glyph (prior 4 > 8 > 2 > 16) and the numerators
// are re-estimated until stable; a glyph keeps a label only with >= 2
// observations and >= 60% agreement (labels were checked by eye as ASCII rasters). With --write the table replaces
// scripts/svg/time-digits.json; review the printed evidence first.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildScoreGraph } from './notation.js';
import { solveTiming } from './timing.js';
import { add, cmp, frac, mul, str, ZERO, type Frac } from './frac.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const corpus = path.join(here, '../../musescore-svg');
type Obs = { file: string; num: string[]; den: string[]; d: Frac };
const obs: Obs[] = [];
for (const f of fs.readdirSync(corpus).filter(f => /^\d+_\d+_p0\.svg$/.test(f)).sort()) {
  let graph, solution;
  try { graph = buildScoreGraph(fs.readFileSync(path.join(corpus, f), 'utf8')); solution = solveTiming(graph); } catch { continue; }
  for (const system of graph.systems) {
    const sigs = system.staves[0]?.times || [];
    for (const [k, sig] of sigs.entries()) {
      if (!sig.value.numFp?.length || !sig.value.denFp?.length) continue;
      const until = sigs[k + 1]?.x ?? Infinity;
      const counts = new Map<string, { d: Frac; n: number }>();
      for (const m of solution.measures.filter(m => m.system === system.index && !m.partial)) {
        const bounds = system.measures[m.systemMeasure];
        if (bounds.right <= sig.x || bounds.left >= until) continue;
        let end: Frac = ZERO;
        for (const v of m.voices) for (const it of v.items) {
          if (!it.event || it.event.fullMeasure) continue;
          const e = add(it.onset, it.duration);
          if (cmp(e, end) > 0) end = e;
        }
        if (cmp(end, ZERO) <= 0 || m.flags.includes('surplusTime')) continue;
        const c = counts.get(str(end)) || { d: end, n: 0 };
        c.n++; counts.set(str(end), c);
      }
      const best = [...counts.values()].sort((a, b) => b.n - a.n)[0];
      if (best) obs.push({ file: f, num: sig.value.numFp, den: sig.value.denFp, d: best.d });
    }
  }
}

const DEN_PRIOR = [4, 8, 2, 16];
const denOf = new Map<string, number>(); // keyed by the joined denominator fingerprints
const numOf = new Map<string, number>(); // numerator digit per fingerprint
const denKey = (o: Obs) => o.den.join('+');
const digitsOf = (n: number, len: number) => { const d = String(n).split('').map(Number); return d.length === len ? d : undefined; };
for (let round = 0; round < 8; round++) {
  const votes = new Map<string, Map<number, number>>();
  for (const o of obs) {
    const den = denOf.get(denKey(o)) ?? (o.den.length === 1 ? 4 : 16);
    const n = mul(o.d, frac(den));
    const digits = n[1] === 1 ? digitsOf(n[0], o.num.length) : undefined;
    if (!digits) continue;
    o.num.forEach((fp, i) => { const m = votes.get(fp) || new Map(); m.set(digits[i], (m.get(digits[i]) || 0) + 1); votes.set(fp, m); });
  }
  numOf.clear();
  for (const [fp, m] of votes) numOf.set(fp, [...m].sort((a, b) => b[1] - a[1])[0][0]);
  let changed = false;
  for (const key of new Set(obs.map(denKey))) {
    const mine = obs.filter(o => denKey(o) === key);
    const score = (den: number) => mine.filter(o => {
      const n = o.num.map(x => numOf.get(x));
      return n.every(x => x !== undefined) && cmp(frac(Number(n.join('')), den), o.d) === 0;
    }).length;
    const len = mine[0].den.length;
    const best = DEN_PRIOR.filter(d => String(d).length === len).map(den => ({ den, s: score(den) }))
      .sort((a, b) => b.s - a.s || DEN_PRIOR.indexOf(a.den) - DEN_PRIOR.indexOf(b.den))[0];
    if (best && denOf.get(key) !== best.den) { denOf.set(key, best.den); changed = true; }
  }
  if (!changed && round > 0) break;
}

// Per-glyph digit votes from numerators and denominators of signatures that add up.
const votes = new Map<string, Map<number, number>>();
const vote = (fp: string, d: number) => { const m = votes.get(fp) || new Map(); m.set(d, (m.get(d) || 0) + 1); votes.set(fp, m); };
const files = new Map<string, Set<string>>();
for (const o of obs) {
  const n = o.num.map(x => numOf.get(x));
  const den = denOf.get(denKey(o));
  if (!den || n.some(x => x === undefined) || cmp(frac(Number(n.join('')), den), o.d) !== 0) continue;
  o.num.forEach((fp, i) => vote(fp, n[i]!));
  digitsOf(den, o.den.length)!.forEach((d, i) => vote(o.den[i], d));
  for (const fp of [...o.num, ...o.den]) files.set(fp, (files.get(fp) || new Set()).add(o.file));
}
const seen = new Map<string, number>();
for (const o of obs) for (const fp of [...o.num, ...o.den]) seen.set(fp, (seen.get(fp) || 0) + 1);
const table: Record<string, number> = {};
for (const [fp, total] of [...seen].sort((a, b) => b[1] - a[1])) {
  const m = votes.get(fp);
  const [value, agree] = m ? [...m].sort((a, b) => b[1] - a[1])[0] : [NaN, 0];
  const keep = agree >= 2 && agree / total >= 0.6;
  if (keep) table[fp] = value;
  const ex = obs.find(o => o.num.includes(fp) || o.den.includes(fp))!.file;
  console.log(`${keep ? 'keep' : 'drop'} ${value} agree ${agree}/${total} files ${files.get(fp)?.size || 0} ${ex} ${fp}`);
}
console.log(`${obs.length} signatures, ${Object.keys(table).length} fingerprints kept`);
if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(here, 'time-digits.json'), JSON.stringify(Object.fromEntries(Object.entries(table).sort()), null, 1) + '\n');
  console.log('wrote scripts/svg/time-digits.json');
}

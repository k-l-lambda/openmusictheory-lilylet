// Inspect one measure of a MuseScore SVG conversion, in the spirit of the
// regulation-annotation skill's inspect-measure.ts: event graph, solved voices
// with ticks, evaluation flags, the emitted Lilylet line, and a tick validation
// of the reparsed Lilylet against the solved model.
//
//   node --import tsx scripts/svg/inspect-measure.ts <score.svg> --mi <measureIndex 0-based>
//
// Lilylet `%N` comments are 1-based (lyl %N = mi N-1). Ticks: 480 per quarter.
import fs from 'node:fs';
import { buildScoreGraph } from './notation.js';
import { solveTiming } from './timing.js';
import { writeLilylet, pitchLabel } from './lilyletWriter.js';
import { checkLilylet } from './checkLilylet.js';
import { mul, frac, toNumber, type Frac } from './frac.js';
import * as lilylet from '../../../lilylet/source/lilylet/index.ts';
import { dumpNotes } from '../v2/scores/dump-notes.ts';

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--mi');
const mi = Number(args[args.indexOf('--mi') + 1]);
if (!file || !args.includes('--mi') || !Number.isInteger(mi) || mi < 0) {
  console.error('Usage: tsx scripts/svg/inspect-measure.ts <score.svg> --mi <measureIndex>');
  process.exit(1);
}
const ticks = (f: Frac) => Math.round(toNumber(mul(f, frac(1920))));
const graph = buildScoreGraph(fs.readFileSync(file, 'utf8'));
const solution = solveTiming(graph);
const m = solution.measures[mi];
if (!m) throw new Error(`Measure ${mi} not found (${solution.measures.length} measures)`);
const system = graph.systems[m.system];

console.log(`═══ Measure ${mi} (lyl %${mi + 1}) · system ${m.system} measure ${m.systemMeasure}`);
console.log(`time ${m.time.num}/${m.time.den}${m.time.inferred ? ' (inferred from content)' : ''}${m.time.hidden ? ' (hidden)' : ''}${m.partial ? ' partial' : ''} · duration ${ticks(m.duration)} ticks · key ${m.key} · clefs ${m.clefs.join(', ')}`);
console.log(`fine=${m.fine}  flags: ${m.flags.join(' ') || '-'}${m.notes.length ? '  notes: ' + m.notes.join('; ') : ''}`);

console.log('\n═══ Event graph ═════════════════════════════');
for (const e of system.events.filter(e => e.measure === m.systemMeasure)) {
  const what = e.kind === 'rest' ? `rest y=${e.restY?.toFixed(1)}` : e.heads.map(h => (h.dn === undefined ? '?' : pitchLabel(h))).join(' ');
  console.log(`  #${e.id} staff ${e.staff + 1} x=${((e.x - system.layout.left) / system.layout.spacing).toFixed(1)}sp ${what} div=${e.division} dots=${e.dots}` +
    `${e.stem ? ` stem=${e.stem.dir} beams=${e.stem.levels} flags=${e.stem.flags}` : ''}${e.beamGroup !== undefined ? ` beam#${e.beamGroup}` : ''}` +
    `${e.tuplet !== undefined ? ` tuplet#${e.tuplet}` : ''}${e.tremolo ? ` tremolo→#${e.tremolo.partner.id}/${e.tremolo.bars}` : ''}${e.absorbed ? ' (tremolo partner)' : ''}` +
    `${e.grace ? ' GRACE' : ''}${e.stemless ? ' stemless' : ''}${e.fullMeasure ? ' full-measure' : ''} src=${e.sourceIndices.join(',')}`);
}

console.log('\n═══ Solved voices ═══════════════════════════');
m.voices.forEach((v, vi) => {
  console.log(`Voice ${vi} (staff ${v.staff + 1}${v.stem ? ', stem ' + v.stem : ''}):`);
  for (const it of v.items) {
    const e = it.event;
    const label = !e ? 'spacer' : e.kind === 'rest' ? 'rest' : e.heads.map(h => pitchLabel(h)).join(' ');
    console.log(`  tick=${ticks(it.onset)} dur=${ticks(it.duration)} ${label}${e ? ` #${e.id}` : ''}${it.graces.length ? ` graces=${it.graces.map(g => '#' + g.id).join(',')}` : ''}`);
  }
});

const written = writeLilylet(graph, solution);
const blocks = written.code.split(/\n\n/);
const line = blocks.find(b => b.trimEnd().endsWith(`| %${mi + 1}`));
console.log('\n═══ Lilylet ═════════════════════════════════');
console.log(line || '(measure line not found)');

console.log('\n═══ Tick validation (reparsed Lilylet vs model) ═');
const doc = lilylet.parseCode(written.code);
const parsed = dumpNotes(doc).map(s => s.notes.filter((n: any[]) => n[0] === mi));
const model = written.notes.map(s => s.notes.filter(n => n[0] === mi));
const q = (s: string) => { const [a, b = '1'] = s.split('/'); return Math.round((Number(a) / Number(b)) * 480); };
for (let s = 0; s < Math.max(parsed.length, model.length); s++) {
  const lt = (parsed[s] || []).map((n: any[]) => q(n[1])).sort((a: number, b: number) => a - b);
  const mt = (model[s] || []).map(n => q(n[1])).sort((a, b) => a - b);
  const ok = lt.length === mt.length && lt.every((t: number, i: number) => t === mt[i]);
  console.log(`staff ${s + 1}: lyl [${lt.join(', ')}] model [${mt.join(', ')}] ${ok ? '✓' : '✗'}`);
}
const check = checkLilylet(written.code, written.notes);
console.log(`whole-score round trip: ${check.ok ? '✓ PASS' : '✗ FAIL'}${check.mismatches.length ? ' — ' + check.mismatches.slice(0, 5).join('; ') : ''}`);

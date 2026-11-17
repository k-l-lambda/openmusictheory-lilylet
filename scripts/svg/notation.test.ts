import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { convertSvg } from './convert.js';
import { buildScoreGraph } from './notation.js';
import { solveTiming } from './timing.js';
import { frac, eq } from './frac.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const fixture = (name: string) => fs.readFileSync(path.join(root, 'musescore-svg', name), 'utf8');
const measureLine = (code: string, n: number) => code.split(/\n\n/).find(b => b.trimEnd().endsWith(`| %${n}`)) || '';

test('golden piano sample: every measure consistent and the draft round-trips', () => {
  const { code, report } = convertSvg(fixture('27638568_4985985_p0.svg'));
  assert.equal(report.measures, 17);
  assert.equal(report.fineMeasures, 17);
  assert.ok(report.check.ok, report.check.mismatches.slice(0, 3).join('; '));
  assert.equal(report.grade, 'consistent');
  // 24 beamed 32nds in the first piano bar, not half notes
  const m1 = measureLine(code, 1).split('\n')[1];
  assert.equal((m1.match(/32/g) || []).length, 24);
  // two-note tremolo between the half-note chord and D
  assert.match(measureLine(code, 2), /\\repeat tremolo 8 \{ <g, bf>32 d'32 \}/);
  // left hand: two quarters, dotted-eighth rest, sixteenth
  assert.match(measureLine(code, 1), /\\staff "2" \\clef "bass" <g,, g'>4 <g g'>4 r8\. <bf bf'>16/);
});

test('circled noteheads are filled heads inside a ring, not half notes', () => {
  const graph = buildScoreGraph(fixture('32728834_8391225_p0.svg'));
  const circled = graph.systems.flatMap(s => s.events).flatMap(e => e.heads.map(h => ({ h, e }))).filter(x => x.h.circled);
  assert.ok(circled.length >= 8);
  assert.ok(circled.every(x => x.h.filled && x.e.division === 2), 'circled black heads with stems are quarters');
});

test('highlighted heads: colour does not decide note values', () => {
  // red filled heads on half-note stems in a chorale of half notes
  const { code, report } = convertSvg(fixture('32728834_20911636_p0.svg'));
  assert.match(code, /\\stemUp e'2 ef2 \\\\\n\\staff "1" \\stemDown <bf' c>2 <a c>2/);
  assert.equal(report.fineMeasures, report.measures);
});

test('accidentals are attached to their noteheads (minor scale)', () => {
  const { code } = convertSvg(fixture('32728834_6223743_p0.svg'));
  for (const n of [11, 14, 15]) assert.match(measureLine(code, n), /^(ef|af|bf)'?1/m);
});

test('percussion clef from two thin bars; rhythm staff keeps two voices', () => {
  const { code, report } = convertSvg(fixture('32728834_11302186_p0.svg'));
  assert.match(code, /\\clef "percussion"/);
  assert.match(code, /\\stemUp .* \\\\\n\\stemDown /);
  assert.equal(report.grade, 'consistent');
});

test('learned time digits read 2/4 (the legacy width rule read 3/4 and invented pickups)', () => {
  const { code, report } = convertSvg(fixture('32728834_12523876_p0.svg'));
  assert.match(code, /\\time 2\/4/);
  assert.doesNotMatch(code, /\\partial/);
  assert.equal(report.fineMeasures, report.measures);
});

test('tuplet bracket takes the events of its own voice only', () => {
  const { code, report } = convertSvg(fixture('32728834_8674494_p0.svg'));
  assert.match(measureLine(code, 3), /\\tuplet 3\/2 \{ \\clef "treble" <a' cs>4~ <a b>4 <fs a>4 \}/);
  assert.match(measureLine(code, 4), /\\stemDown a1/);
  assert.ok(report.check.ok);
});

test('ledger notes between close staves belong to the staff of their stem', () => {
  const graph = buildScoreGraph(fixture('32728834_8451335_p0.svg'));
  const rh = graph.systems[0].events.filter(e => e.measure === 0 && e.staff === 1 && e.kind === 'chord');
  assert.equal(rh.length, 4, 'four right-hand chords in the first bar');
});

test('columns align voices: incomplete voices are padded at the onset of their column', () => {
  const graph = buildScoreGraph(fixture('32728834_12523876_p0.svg'));
  const solution = solveTiming(graph);
  for (const m of solution.measures) {
    for (const v of m.voices) {
      const end = v.items.reduce((t, it) => (eq(it.onset, t) ? [it.onset[0] * it.duration[1] + it.duration[0] * it.onset[1], it.onset[1] * it.duration[1]] as [number, number] : t), frac(0));
      assert.ok(eq(end, m.duration), `measure ${m.index + 1}: voice ends at the bar line`);
    }
  }
});

test('staves joined by a system barline form one system even across a wide gap (two pianos)', () => {
  const { code, report } = convertSvg(fixture('32728834_12259201_p0.svg'));
  assert.equal(report.systems, 1);
  assert.equal(report.staves, 4);
  assert.equal(report.measures, 3);
  assert.match(code, /^\[staves "\{-\},\{-\}"\]/);
  // the right-hand triplet whose number sits between the staves
  assert.match(measureLine(code, 3), /\\tuplet 3\/2 \{ <d d'>8\[ <fs fs'>8 <a a'>8\] \}/);
  assert.equal(report.fineMeasures, 3);
});

test('articulations on notes: accent on the dotted chord, round-trip counts them', () => {
  const { code, report } = convertSvg(fixture('32728834_12523291_p0.svg'));
  assert.match(measureLine(code, 1), /<e' e'>4\.->/);
  assert.match(measureLine(code, 3), /<e' e'>4\.->/);
  assert.equal(report.marks.accent, 2);
  assert.ok(report.check.ok);
});

test('chord heads are measured against the chord staff (no stray low A)', () => {
  const { code } = convertSvg(fixture('32728834_12523291_p0.svg'));
  assert.match(measureLine(code, 1), /\\staff "2" \\clef "bass" fs,4 <c' d a'>4 <c d a'>4/);
});

test('tempo marks: words, metronome with half-note beat, stacked words + dotted metronome', () => {
  assert.match(convertSvg(fixture('27638568_5879039_p0.svg')).code, /\\tempo "Allegro maestoso" 2 = 54/);
  assert.match(convertSvg(fixture('32728834_11374390_p0.svg')).code, /\\tempo "Swing 16ths" 4\. = 31/);
  assert.match(convertSvg(fixture('8641586_8920656_p0.svg')).code, /\\tempo "Prestissimo" 4\. = 66/);
  const { report } = convertSvg(fixture('32728834_7370744_p0.svg'));
  assert.deepEqual(report.tempos, ['4.=90', '4=180', '4.=180', '4=270'], 'metric equations are not turned into tempos');
  assert.ok(report.check.ok);
});

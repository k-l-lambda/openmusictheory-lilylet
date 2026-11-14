import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { parseMuseScoreSvg } from './parser.js';
import { musescoreSvgToStarry } from './musescoreToStarry.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const fixture = (name: string) => fs.readFileSync(path.join(root, 'musescore-svg', name), 'utf8');

type StaffData = { semantics: { semantic: string; x: number; y: number }[] };
type SystemData = { staves: StaffData[]; measureBars: number[] };
const systemsOf = (xml: string): { systems: SystemData[]; diagnostics: { code: string }[] } => {
  const result = musescoreSvgToStarry(xml);
  return { systems: (result.scoreData.pages as { systems: SystemData[] }[])[0].systems, diagnostics: result.diagnostics };
};

test('reject non-SVG payload rather than treating PNG as XML', () => {
  assert.throws(() => parseMuseScoreSvg('\x89PNG\r\n\x1a\n'), /not an SVG XML document/);
});

test('pilot preserves four whole-note measures and emits two digits per staff', () => {
  const { systems, diagnostics } = systemsOf(fixture('32728834_5769529_p0.svg'));
  assert.equal(systems.length, 1);
  assert.equal(systems[0].staves.length, 2);
  assert.equal(systems[0].measureBars.length, 4);
  for (const staff of systems[0].staves) {
    const digits = staff.semantics.filter(p => p.semantic === 'TimesigFour');
    assert.equal(digits.length, 2);
    assert.ok(digits.some(p => Math.abs(p.y + 1) < 0.1));
    assert.ok(digits.some(p => Math.abs(p.y - 1) < 0.1));
    assert.ok(staff.semantics.some(p => p.semantic === 'NoteheadS0'));
  }
  assert.ok(diagnostics.some(d => d.code === 'svg-timing'));
});

test('multi-system fixture recognizes 3/4, rests, dots, stems, and marks', () => {
  const { systems } = systemsOf(fixture('27638568_4985985_p0.svg'));
  assert.equal(systems.length, 4);
  assert.equal(systems.reduce((n, s) => n + s.measureBars.length, 0), 17);
  for (const staff of systems[0].staves) {
    assert.equal(staff.semantics.filter(p => p.semantic === 'TimesigThree').length, 1);
    assert.equal(staff.semantics.filter(p => p.semantic === 'TimesigFour').length, 1);
  }
  const semantics = systems.flatMap(s => s.staves.flatMap(st => st.semantics.map(p => p.semantic)));
  for (const semantic of ['Rest0', 'Rest2', 'Rest3', 'Dot', 'vline_Stem', 'AccSharp', 'AccFlat', 'BeamLeft', 'BeamRight', 'Flag3', 'TremoloMiddle']) {
    assert.ok(semantics.includes(semantic), `missing ${semantic}`);
  }
});

test('three-staff vocal and piano score keeps treble plus two bass clefs and piano brace', () => {
  const { systems } = systemsOf(fixture('27638568_4985985_p0.svg'));
  assert.deepEqual(systems[0].staves.map(staff => staff.semantics.filter(p => p.semantic.startsWith('Clef')).map(p => p.semantic)),
    [['ClefG'], ['ClefF'], ['ClefF']]);
  const score = musescoreSvgToStarry(fixture('27638568_4985985_p0.svg')).scoreData;
  assert.equal(score.staffLayoutCode, ',{-}');
});

test('barline continuity separates adjacent two-staff systems', () => {
  for (const [name, count] of [
    ['30425053_5350123_p0.svg', 5],
    ['30425053_5350126_p0.svg', 6],
  ] as const) {
    const { systems } = systemsOf(fixture(name));
    assert.equal(systems.length, count, `${name}: system count`);
    assert.ok(systems.every(system => system.staves.length === 2), `${name}: paired staves`);
    assert.ok(systems.every(system => system.measureBars.length > 0), `${name}: local barlines`);
  }
});

test('stemless examples retain all staves with distinct paired and single-system layouts', () => {
  for (const [name, expected] of [
    ['30425053_403299860346169_p0.svg', [2, 2, 2, 2]],
    ['30425053_727981229895898_p0.svg', [1, 1, 1, 1, 1, 1, 1]],
  ] as const) {
    const { systems } = systemsOf(fixture(name));
    assert.deepEqual(systems.map(system => system.staves.length), expected, name);
  }
});

test('filled heads without stems become provisional whole-note candidates instead of disappearing', () => {
  for (const name of ['30425053_403299860346169_p0.svg', '30425053_727981229895898_p0.svg']) {
    const { systems, diagnostics } = systemsOf(fixture(name));
    const heads = systems.flatMap(s => s.staves.flatMap(st => st.semantics.filter(p => p.semantic.startsWith('Notehead'))));
    assert.ok(heads.length >= 12, `${name}: expected noteheads`);
    assert.ok(heads.every(head => head.semantic === 'NoteheadS0'), `${name}: no orphan filled heads`);
    assert.ok(diagnostics.some(d => d.code === 'stemless-notes'), `${name}: explicit timing caveat`);
  }
});

test('beam levels attach to stems, with one group and separate duration flags', () => {
  const xml = `<svg width="220" height="100" xmlns="http://www.w3.org/2000/svg">
    <path class="StaffLines" d="M0 20H220 M0 30H220 M0 40H220 M0 50H220 M0 60H220"/>
    <path class="BarLine" d="M200 20V60"/>
    <path class="Stem" d="M55 8V40 M95 8V40 M135 8V40"/>
    <path class="Beam" d="M55 5H135V9H55Z M125 13H135V17H125Z"/>
  </svg>`;
  const { systems } = systemsOf(xml);
  const points = systems[0].staves[0].semantics;
  const beams = points.filter(p => p.semantic.startsWith('Beam'));
  assert.deepEqual(beams.map(p => p.semantic), ['BeamLeft', 'BeamContinue', 'BeamRight']);
  assert.deepEqual(beams.map(p => p.x), [5.5, 9.5, 13.5]);
  assert.equal(points.filter(p => p.semantic === 'Flag3').length, 4);
});

test('9/16 time signature recognizes composite denominator glyphs without duplicate counters', () => {
  const { systems, diagnostics } = systemsOf(fixture('32728834_11019235_p0.svg'));
  for (const staff of systems[0].staves) {
    const digits = staff.semantics.filter(p => p.semantic.startsWith('Timesig'));
    assert.deepEqual(digits.map(p => p.semantic), ['TimesigNine', 'TimesigOne', 'TimesigSix']);
    assert.deepEqual(digits.map(p => Math.round(p.y)), [-1, 1, 1]);
  }
  assert.ok(!diagnostics.some(d => d.code === 'unknown-time-digit'));
});

test('unrecognized time glyph remains diagnostic rather than a fabricated 4', () => {
  const xml = `<svg width="220" height="100" xmlns="http://www.w3.org/2000/svg">
    <path class="StaffLines" d="M0 20H220 M0 30H220 M0 40H220 M0 50H220 M0 60H220"/>
    <path class="BarLine" d="M200 20V60"/>
    <path class="TimeSig" d="M15 20H23V40H15Z M15 40H23V60H15Z"/>
  </svg>`;
  const { systems, diagnostics } = systemsOf(xml);
  assert.ok(diagnostics.some(d => d.code === 'unknown-time-digit'));
  assert.equal(systems[0].staves[0].semantics.filter(p => p.semantic.startsWith('Timesig')).length, 0);
});

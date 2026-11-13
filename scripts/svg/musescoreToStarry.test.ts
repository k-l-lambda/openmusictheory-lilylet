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

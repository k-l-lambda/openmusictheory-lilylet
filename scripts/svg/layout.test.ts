import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { parseMuseScoreSvg } from './parser.js';
import { recoverLayout } from './layout.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('recovers two horizontally separated systems from middle-only staff lines and barline extents', () => {
  const xml = fs.readFileSync(path.join(root, 'musescore-svg/32728834_11556445_p0.svg'), 'utf8');
  const systems = recoverLayout(parseMuseScoreSvg(xml));
  assert.equal(systems.length, 2);
  for (const [index, system] of systems.entries()) {
    assert.equal(system.staves.length, 2);
    assert.ok(Math.abs(system.spacing - 25.48525) < 0.01);
    assert.ok(Math.abs(system.top - 373.786) < 0.1);
    assert.ok(Math.abs(system.bottom - 636.947) < 0.1);
    assert.ok(system.barXs.length > 0);
    assert.ok(system.barXs[0] > (index === 0 ? 796 : 2161) - 1, 'exclude header bars before first local note');
    const expectedLeft = index === 0 ? 228.079 : 1591.33;
    const expectedRight = index === 0 ? 1195.9 : 2847.4;
    assert.ok(Math.abs(system.left - expectedLeft) < 0.1);
    assert.ok(Math.abs(system.right - expectedRight) < 0.1);
    assert.ok(Math.abs(system.staves[0].middle - 424.756) < 0.01);
    assert.ok(Math.abs(system.staves[1].middle - 585.977) < 0.01);
  }
});

test('keeps genuine three-line percussion staves instead of inventing five-line geometry', () => {
  for (const [name, middles] of [
    ['32728834_5846453_p0.svg', [358.20, 664.87, 1086.53, 1380.59]],
    ['32728834_8515040_p0.svg', [483.48, 908.85]],
    ['32728834_8674701_p0.svg', [411.02, 680.32]],
  ] as const) {
    const xml = fs.readFileSync(path.join(root, 'musescore-svg', name), 'utf8');
    const staves = recoverLayout(parseMuseScoreSvg(xml)).flatMap(system => system.staves);
    assert.equal(staves.length, middles.length, name);
    for (const [index, staff] of staves.entries()) {
      assert.equal(staff.lines.length, 3, name);
      assert.ok(Math.abs(staff.middle - middles[index]) < 0.15, name);
    }
  }
});

test('reconstructs isolated five-line middle rows only with matching local full-height barlines', () => {
  for (const [name, middles] of [
    ['32728834_7244349_p0.svg', [389.506, 1254.19, 2118.88, 3000.56]],
    ['32728834_7365281_p0.svg', [2363.5]],
    ['32728834_7370069_p0.svg', [321.516]],
    ['32728834_7370258_p0.svg', [322.372]],
  ] as const) {
    const xml = fs.readFileSync(path.join(root, 'musescore-svg', name), 'utf8');
    const staves = recoverLayout(parseMuseScoreSvg(xml)).flatMap(system => system.staves);
    for (const middle of middles) {
      const matches = staves.filter(staff => Math.abs(staff.middle - middle) < 0.15);
      assert.equal(matches.length, 1, `${name}: reconstructed staff near ${middle}`);
      assert.equal(matches[0].lines.length, 5);
      assert.ok(Math.abs(matches[0].lines[0] - (middle - 2 * matches[0].spacing)) < 0.15);
    }
  }
});

test('parses large-spaced five-line staff despite shorter inter-staff barlines', () => {
  const xml = fs.readFileSync(path.join(root, 'musescore-svg/32728834_38246030_p0.svg'), 'utf8');
  const systems = recoverLayout(parseMuseScoreSvg(xml));
  assert.equal(systems.reduce((count, system) => count + system.staves.length, 0), 3);
  assert.ok(systems.every(system => system.staves.every(staff => staff.lines.length === 5)));
  assert.ok(Math.abs(systems[0].spacing - 82.7) < 0.2);
});

test('does not invent staff lines without matching full-height barlines', () => {
  const xml = `<svg width="220" height="100" xmlns="http://www.w3.org/2000/svg">
    <path class="StaffLines" d="M0 40H220"/>
    <path class="BarLine" d="M200 20V30"/>
  </svg>`;
  assert.throws(() => recoverLayout(parseMuseScoreSvg(xml)), /Missing five-line staff|Unmatched staff lines/);
});

import { center, type Subpath } from './geometry.js';
import type { SvgPage } from './parser.js';

export type StaffGeometry = { lines: number[]; middle: number; spacing: number; left: number; right: number };
export type SystemGeometry = { staves: StaffGeometry[]; left: number; right: number; top: number; bottom: number; spacing: number; barXs: number[] };
const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const near = (a: number, b: number, tolerance: number) => Math.abs(a - b) <= tolerance;
function horizontal(s: Subpath): boolean {
  const b = s.bounds;
  return b.right - b.left > 1 && b.bottom - b.top < Math.max(0.05, (b.right - b.left) * 0.002);
}
function vertical(s: Subpath): boolean {
  const b = s.bounds;
  return b.bottom - b.top > 1 && b.right - b.left < Math.max(0.05, (b.bottom - b.top) * 0.002);
}
export function recoverLayout(page: SvgPage): SystemGeometry[] {
  const rawLines = page.elements.filter(e => e.cls === 'StaffLines').flatMap(e => e.subpaths)
    .filter(horizontal).map(p => ({ y: center(p.bounds).y, left: p.bounds.left, right: p.bounds.right }))
    .sort((a, b) => a.y - b.y || a.left - b.left);
  if (!rawLines.length) throw new Error('Missing five-line staff');
  const barSegments = page.elements.filter(e => e.cls === 'BarLine').flatMap(e => e.subpaths).filter(vertical);
  const rows: typeof rawLines[] = [];
  for (const line of rawLines) {
    const row = rows.find(r => near(r[0].y, line.y, 0.1));
    if (row) row.push(line); else rows.push([line]);
  }
  const gaps = rows.slice(1).map((r, i) => r[0].y - rows[i][0].y).filter(g => g > 0);
  // A score with only each staff's middle line has no visible interline gap.
  // In that case a full-height local barline supplies four spaces instead.
  const barSpacings = barSegments.map(b => (b.bounds.bottom - b.bounds.top) / 4)
    .filter(v => v > 2 && Number.isFinite(v));
  const visibleGap = Math.min(...gaps);
  const barGap = Math.min(...barSpacings);
  // Several consecutive equal visible gaps establish real staff spacing,
  // regardless of shorter auxiliary bars. Two isolated middle lines do not.
  const hasVisibleStaff = gaps.some((gap, i) => i > 0 &&
    near(gap, gaps[i - 1], gap * 0.1) && near(gap, visibleGap, visibleGap * 0.1));
  const spacing = hasVisibleStaff ? visibleGap : barGap;
  if (!Number.isFinite(spacing) || spacing <= 0) throw new Error('Invalid staff spacing');

  // The same y may hold two horizontally adjacent systems. Join measure-width
  // fragments, but never join lines across an empty gap many staff spaces wide.
  const pieces = rows.flatMap(row => {
    const groups: typeof rawLines[] = [];
    for (const line of row) {
      const last = groups[groups.length - 1];
      if (last && line.left - Math.max(...last.map(l => l.right)) <= spacing * 8) last.push(line);
      else groups.push([line]);
    }
    return groups.map(group => ({ y: row[0].y, left: Math.min(...group.map(l => l.left)), right: Math.max(...group.map(l => l.right)) }));
  }).sort((a, b) => a.y - b.y || a.left - b.left);
  const staves: StaffGeometry[] = [];
  const unused = new Set(pieces);
  const isLine = (line: typeof pieces[number], left: number, right: number) =>
    Math.min(line.right, right) - Math.max(line.left, left) > spacing * 5;
  for (const line of pieces) {
    if (!unused.has(line)) continue;
    const group = [line];
    for (let step = 1; step < 5; step++) {
      const next = pieces.find(p => unused.has(p) && p !== line &&
        near(p.y, line.y + step * spacing, spacing * 0.1) && isLine(p, line.left, line.right));
      if (!next) break;
      group.push(next);
    }
    if (group.length === 5) {
      group.forEach(p => unused.delete(p));
      staves.push({ lines: group.map(p => p.y), middle: group[2].y, spacing,
        left: Math.min(...group.map(p => p.left)), right: Math.max(...group.map(p => p.right)) });
      continue;
    }
    // Three-line percussion staves are real; their barlines stop just beyond
    // those three lines. Do not synthesize two invisible outer lines.
    const three = group.length === 3 && barSegments.some(bar => {
      const b = bar.bounds;
      return b.left >= line.left - spacing && b.left <= line.right + spacing &&
        near(b.top, group[0].y, spacing * 0.15) && near(b.bottom, group[2].y, spacing * 0.15);
    });
    if (three) {
      group.forEach(p => unused.delete(p));
      staves.push({ lines: group.map(p => p.y), middle: group[1].y, spacing,
        left: Math.min(...group.map(p => p.left)), right: Math.max(...group.map(p => p.right)) });
      continue;
    }
    // A single retained middle line is reconstructible only when a local
    // barline proves the full four-space extent around this particular row.
    const fullHeight = group.length === 1 && barSegments.some(bar => {
      const b = bar.bounds;
      return b.left >= line.left - spacing && b.left <= line.right + spacing &&
        b.top <= line.y - 2 * spacing + spacing * 0.16 &&
        b.bottom >= line.y + 2 * spacing - spacing * 0.16 &&
        (near(b.top, line.y - 2 * spacing, spacing * 0.16) ||
          near(b.bottom, line.y + 2 * spacing, spacing * 0.16));
    });
    if (fullHeight) {
      unused.delete(line);
      staves.push({ lines: [-2, -1, 0, 1, 2].map(i => line.y + i * spacing), middle: line.y,
        spacing, left: line.left, right: line.right });
      continue;
    }
    throw new Error(`Unmatched staff lines around y=${line.y}`);
  }
  staves.sort((a, b) => a.lines[0] - b.lines[0] || a.left - b.left);
  const systems: SystemGeometry[] = [];
  for (const staff of staves) {
    const upperSystem = [...systems].reverse().find(s => {
      const upper = s.staves[s.staves.length - 1];
      const distance = staff.lines[0] - upper.lines[upper.lines.length - 1];
      if (distance < -spacing || distance >= 12 * spacing ||
        Math.min(s.right, staff.right) - Math.max(s.left, staff.left) <= 10 * spacing) return false;
      return barSegments.some(bar => bar.bounds.top <= upper.lines[upper.lines.length - 1] + spacing &&
        bar.bounds.bottom >= staff.lines[0] - spacing &&
        bar.bounds.left >= Math.max(upper.left, staff.left) - spacing &&
        bar.bounds.left <= Math.min(upper.right, staff.right) + spacing);
    });
    if (upperSystem) {
      upperSystem.staves.push(staff);
      upperSystem.bottom = staff.lines[staff.lines.length - 1];
      upperSystem.left = Math.min(upperSystem.left, staff.left);
      upperSystem.right = Math.max(upperSystem.right, staff.right);
    } else systems.push({ staves: [staff], left: staff.left, right: staff.right,
      top: staff.lines[0], bottom: staff.lines[staff.lines.length - 1], spacing, barXs: [] });
  }
  systems.sort((a, b) => a.top - b.top || a.left - b.left);
  for (const system of systems) {
    const usable = barSegments.filter(b => b.bounds.bottom >= system.top - spacing && b.bounds.top <= system.bottom + spacing)
      .filter(b => b.bounds.bottom - b.bounds.top >= (system.staves.some(staff => staff.lines.length === 3) ? 1.8 : 3) * spacing)
      .map(b => center(b.bounds).x).filter(x => x > system.left - spacing && x < system.right + spacing).sort((a, b) => a - b);
    const clusters: number[][] = [];
    for (const x of usable) {
      const last = clusters[clusters.length - 1];
      if (last && x - last[last.length - 1] < spacing * 0.65) last.push(x); else clusters.push([x]);
    }
    const firstNote = Math.min(...page.elements.filter(e => e.cls === 'Note')
      .flatMap(e => e.subpaths.map(p => center(p.bounds)))
      .filter(p => p.y >= system.top - 2 * spacing && p.y <= system.bottom + 2 * spacing &&
        p.x >= system.left - spacing && p.x <= system.right + spacing).map(p => p.x));
    const boundaries = clusters.map(c => median(c)).filter(x => x > firstNote + spacing && x < system.right + spacing);
    const merged: number[] = [];
    for (const x of boundaries) {
      if (merged.length && x - merged[merged.length - 1] < 1.1 * spacing) merged[merged.length - 1] = x;
      else merged.push(x);
    }
    if (!merged.length || system.right - merged[merged.length - 1] > 2 * spacing) merged.push(system.right);
    system.barXs = merged;
  }
  return systems;
}

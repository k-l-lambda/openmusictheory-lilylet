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
  if (rawLines.length < 5) throw new Error('Missing five-line staff');
  // Same staff line may be drawn as several measure-width segments.
  const rows: typeof rawLines[] = [];
  for (const line of rawLines) {
    const row = rows.find(r => near(r[0].y, line.y, 0.1));
    if (row) row.push(line); else rows.push([line]);
  }
  const ys = rows.map(r => r[0].y);
  const gaps = ys.slice(1).map((y, i) => y - ys[i]).filter(g => g > 0);
  const spacing = Math.min(...gaps);
  if (!Number.isFinite(spacing) || spacing <= 0) throw new Error('Invalid staff spacing');
  const staves: StaffGeometry[] = [];
  for (let i = 0; i < rows.length;) {
    const group = rows.slice(i, i + 5);
    if (group.length < 5 || group.some((r, j) => j && !near(r[0].y - group[j - 1][0].y, spacing, spacing * 0.1))) {
      throw new Error(`Unmatched staff lines around y=${rows[i][0].y}`);
    }
    staves.push({ lines: group.map(r => r[0].y), middle: group[2][0].y, spacing,
      left: Math.min(...group.flatMap(r => r.map(l => l.left))), right: Math.max(...group.flatMap(r => r.map(l => l.right))) });
    i += 5;
  }
  const systems: SystemGeometry[] = [];
  for (const staff of staves) {
    const previous = systems[systems.length - 1];
    // Large inter-system gaps and nonoverlapping horizontal ranges break the group.
    // Bracket class paths can aggregate brackets spanning a whole page, so their overall bounds are not grouping evidence.
    const distance = previous ? staff.lines[0] - previous.staves[previous.staves.length - 1].lines[4] : Infinity;
    if (previous && distance < 12 * spacing && Math.min(previous.right, staff.right) - Math.max(previous.left, staff.left) > 10 * spacing) {
      previous.staves.push(staff); previous.bottom = staff.lines[4]; previous.left = Math.min(previous.left, staff.left); previous.right = Math.max(previous.right, staff.right);
    } else systems.push({ staves: [staff], left: staff.left, right: staff.right, top: staff.lines[0], bottom: staff.lines[4], spacing, barXs: [] });
  }
  const bars = page.elements.filter(e => e.cls === 'BarLine').flatMap(e => e.subpaths).filter(vertical);
  for (const system of systems) {
    const usable = bars.filter(b => b.bounds.bottom >= system.top - spacing && b.bounds.top <= system.bottom + spacing)
      .filter(b => b.bounds.bottom - b.bounds.top >= 3 * spacing)
      .map(b => center(b.bounds).x).filter(x => x > system.left - spacing && x < system.right + spacing).sort((a, b) => a - b);
    const clusters: number[][] = [];
    for (const x of usable) {
      const last = clusters[clusters.length - 1];
      if (last && x - last[last.length - 1] < spacing * 0.65) last.push(x); else clusters.push([x]);
    }
    const firstNote = Math.min(...page.elements.filter(e => e.cls === 'Note')
      .flatMap(e => e.subpaths.map(p => center(p.bounds)))
      .filter(p => p.y >= system.top - 2 * spacing && p.y <= system.bottom + 2 * spacing).map(p => p.x));
    // Initial bars and repeat signs before the first symbol are system headers, not empty measures.
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

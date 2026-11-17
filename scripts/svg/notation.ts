// Event graph: explicit musical events reconstructed from MuseScore SVG glyphs.
//
// This replaces "emit drawing points and let a generic OMR regulator guess":
// every chord/rest is built from attached glyphs (heads ↔ stem ↔ beams/hooks,
// dots, accidentals, tuplet numbers, ties), keeps the SVG source indices that
// produced it, and records what could not be resolved as diagnostics. Timing
// (voices/onsets) is solved separately in timing.ts.
import { center, type Bounds, type Subpath } from './geometry.js';
import { parseMuseScoreSvg, type SvgElement, type SvgPage } from './parser.js';
import { recoverLayout, type StaffGeometry, type SystemGeometry } from './layout.js';
import TIME_DIGITS from './time-digits.json' with { type: 'json' };
import TEMPO_GLYPHS from './tempo-glyphs.json' with { type: 'json' };
import { parseTempo, readMark, textMarks, type GlyphExample } from './text.js';
import {
  ALTER, CLEF_MIDDLE, bh, bw, classifyAccidental, classifyClef, classifyHead, classifyRest, glyphsOf, hookFlags,
  type AccidentalKind, type ClefKind, type Glyph,
} from './glyphs.js';

export type Diagnostic = {
  severity: 'info' | 'warning' | 'error';
  code: string;
  message: string;
  system?: number;
  measure?: number; // score-global measure index (0-based)
  staff?: number;
  sourceIndex?: number;
};

export type Head = {
  x: number; y: number; bounds: Bounds;
  /** Staff steps above the middle line (line or space), integer. */
  pos: number;
  /** Diatonic number of the written pitch (C4 = 28) and its alteration in semitones. */
  dn?: number; alter?: number;
  accidental?: AccidentalKind;
  filled: boolean; wide: boolean; breve: boolean; circled: boolean; small: boolean;
  /** Explicit fill colour of the glyph (analysis highlighting), if any. */
  color?: string;
  tieStart?: boolean;
  sourceIndex: number;
};
export type Stem = { x: number; top: number; bottom: number; staff: number; dir?: 'up' | 'down'; levels: number; flags: number; group?: number; sourceIndex: number };
export type EventNode = {
  id: number;
  kind: 'chord' | 'rest';
  system: number; staff: number;
  /** System-local measure index. */
  measure: number;
  /** Horizontal anchor used for column alignment (segment position). */
  x: number; left: number; right: number;
  heads: Head[];
  stem?: Stem;
  /** −1 breve, 0 whole, 1 half, 2 quarter, 3 eighth… */
  division: number;
  dots: number;
  grace: boolean;
  stemless: boolean;
  fullMeasure: boolean;
  restY?: number; // rest center, spaces below middle line
  beamGroup?: number;
  tuplet?: number;
  /** Two-note tremolo: this event alternates with `partner` (drawn with `bars` strokes between stems). */
  tremolo?: { partner: EventNode; bars: number };
  /** Single-note tremolo: number of strokes on the stem (1 = eighths, 2 = sixteenths, 3 = 32nds). */
  strokes?: number;
  /** Second event of a two-note tremolo; timed through its partner. */
  absorbed?: boolean;
  /** Articulations and ornaments drawn on the event (staccato, accent, tenuto, marcato, staccatissimo, fermata, trill). */
  marks?: Mark[];
  sourceIndices: number[];
};
export type Mark = 'staccato' | 'accent' | 'tenuto' | 'marcato' | 'staccatissimo' | 'fermata' | 'trill';
/** A tempo mark: recognized words and/or metronome (beat "4", "2." …, bpm). */
export type TempoNode = { system: number; x: number; text?: string; beat?: string; bpm?: number; raw: string; sourceIndex: number };
export type TupletNode = { id: number; system: number; staff: number; x: number; y: number; left: number; right: number; events: number[]; number?: number; sourceIndex: number };
export type ContextChange<T> = { x: number; value: T };
export type TimeGlyphs = { num?: number; den?: number; symbol?: 'common' | 'cut'; numFp?: string[]; denFp?: string[] };
export type StaffContext = { clefs: ContextChange<ClefKind>[]; keys: ContextChange<number>[]; times: ContextChange<TimeGlyphs>[] };
export type SystemNode = {
  index: number;
  layout: SystemGeometry;
  /** Measure x intervals, in page units. */
  measures: { left: number; right: number }[];
  staves: StaffContext[];
  events: EventNode[];
  tuplets: TupletNode[];
};
export type ScoreGraph = {
  page: SvgPage;
  systems: SystemNode[];
  staffCount: number;
  staffLayoutCode: string;
  tempos: TempoNode[];
  diagnostics: Diagnostic[];
  /** Counts of drawn classes not represented in the graph (dynamics, text…). */
  unrepresented: Record<string, number>;
};

const SHARP_ORDER = [3, 0, 4, 1, 5, 2, 6]; // F C G D A E B as step indices (C=0)
const FLAT_ORDER = [6, 2, 5, 1, 4, 0, 3]; // B E A D G C F
export const keyAlteration = (fifths: number, step: number): number => {
  if (fifths > 0) return SHARP_ORDER.slice(0, fifths).includes(step) ? 1 : 0;
  if (fifths < 0) return FLAT_ORDER.slice(0, -fifths).includes(step) ? -1 : 0;
  return 0;
};

const REPRESENTED = new Set(['Articulation', 'Fermata', 'Tempo', 'TrillSegment', 'Tremolo', 'StaffLines', 'BarLine', 'Clef', 'KeySig', 'TimeSig', 'Note', 'Stem', 'Beam', 'Hook', 'NoteDot',
  'Rest', 'Accidental', 'Tuplet', 'TieSegment', 'LedgerLine', 'Bracket', '']);

type Located = { system: SystemGeometry; systemIndex: number; staff: StaffGeometry; staffIndex: number };

/** Nearest staff (over all systems) whose system spans x; ledger notes reach ~6 spaces out. */
function locate(systems: SystemGeometry[], x: number, y: number, reach = 7): Located | undefined {
  let best: (Located & { d: number }) | undefined;
  systems.forEach((system, systemIndex) => {
    const sp = system.spacing;
    if (x < system.left - 2 * sp || x > system.right + sp) return;
    system.staves.forEach((staff, staffIndex) => {
      const d = Math.abs(y - staff.middle);
      if (d <= reach * sp && (!best || d < best.d)) best = { system, systemIndex, staff, staffIndex, d };
    });
  });
  return best;
}

/** Restrict an element to the subpaths a predicate accepts, keeping element identity. */
const allSubpaths = (e: SvgElement): Subpath[] => e.subpaths;

function verticalStrokes(e: SvgElement, sp: number): Subpath[] {
  return e.subpaths.filter(s => bh(s.bounds) >= sp * 1.0 && bw(s.bounds) <= sp * 0.3);
}

/** Beam centerline from polygon vertices: mean y of the left-most and right-most vertices. */
function beamLine(s: Subpath, sp: number): { left: number; right: number; yAt: (x: number) => number; thickness: number } {
  const pts = s.points.length ? s.points : [s.start, s.end];
  const left = s.bounds.left, right = s.bounds.right;
  const near = (x: number) => pts.filter(p => Math.abs(p.x - x) < sp * 0.08);
  const avg = (ps: { y: number }[], fallback: number) => (ps.length ? ps.reduce((a, p) => a + p.y, 0) / ps.length : fallback);
  const mid = (s.bounds.top + s.bounds.bottom) / 2;
  const yl = avg(near(left), mid), yr = avg(near(right), mid);
  const thickness = Math.max(...near(left).map(p => p.y), mid) - Math.min(...near(left).map(p => p.y), mid);
  return { left, right, thickness, yAt: (x: number) => (right - left > 1e-6 ? yl + ((x - left) / (right - left)) * (yr - yl) : mid) };
}

class UnionFind {
  parent = new Map<number, number>();
  find(a: number): number { const p = this.parent.get(a) ?? a; if (p === a) return a; const r = this.find(p); this.parent.set(a, r); return r; }
  union(a: number, b: number) { this.parent.set(this.find(a), this.find(b)); }
}

/**
 * Digit fingerprint: even-odd raster (8 columns x 10 rows) of the outline
 * vertices normalized to the glyph box, as hex. Robust to path-encoding
 * differences (C/S/A segments) that make command strings unstable.
 */
export function digitFingerprint(g: Glyph, _spacing: number): string {
  const b = g.bounds, W = 8, H = 10;
  const polys = g.contours.map(c => c.subpath.points);
  let bits = '';
  for (let r = 0; r < H; r++) for (let q = 0; q < W; q++) {
    const x = b.left + ((q + 0.5) / W) * bw(b), y = b.top + ((r + 0.5) / H) * bh(b);
    let inside = false;
    for (const pts of polys) for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const pi = pts[i], pj = pts[j];
      if ((pi.y > y) !== (pj.y > y) && x < ((pj.x - pi.x) * (y - pi.y)) / (pj.y - pi.y) + pi.x) inside = !inside;
    }
    bits += inside ? '1' : '0';
  }
  let hex = '';
  for (let i = 0; i < bits.length; i += 4) hex += parseInt(bits.slice(i, i + 4), 2).toString(16);
  return hex;
}
const hamming = (a: string, b: string) => {
  let d = 0;
  for (let i = 0; i < a.length; i++) { let x = parseInt(a[i], 16) ^ parseInt(b[i], 16); while (x) { d += x & 1; x >>= 1; } }
  return d;
};
/** Nearest learned digit within `max` differing cells (of 80). */
export function lookupDigit(fp: string, table: Record<string, number>, max = 6): number | undefined {
  if (table[fp] !== undefined) return table[fp];
  let best: { v: number; d: number; tie: boolean } | undefined;
  for (const [k, v] of Object.entries(table)) {
    if (k.length !== fp.length) continue;
    const d = hamming(fp, k);
    if (d > max) continue;
    if (!best || d < best.d) best = { v, d, tie: false };
    else if (d === best.d && v !== best.v) best.tie = true;
  }
  return best && !best.tie ? best.v : undefined;
}

function timeDigit(g: Glyph, spacing: number): number | undefined {
  const learned = lookupDigit(digitFingerprint(g, spacing), TIME_DIGITS as Record<string, number>);
  if (learned !== undefined) return learned;
  // Fallback fingerprints from the first adapter (9 vs 6 by counter position).
  const commands = g.contours[0].commands;
  const counter = g.contours.find((c, i) => i > 0 && c.depth === 1);
  if (commands === 'MHVCHCLLCCLCCLVHCVCHCVC') return 1;
  if (commands === 'MCCCCCCCCVCCCCCCCC' && counter) return center(counter.bounds).y < center(g.contours[0].bounds).y ? 9 : 6;
  return undefined;
}

export function buildScoreGraph(xml: string): ScoreGraph {
  const page = parseMuseScoreSvg(xml);
  const layouts = recoverLayout(page);
  if (!layouts.length) throw new Error('No systems recovered from SVG');
  const diagnostics: Diagnostic[] = [];
  const unrepresented: Record<string, number> = {};
  for (const e of page.elements) if (!REPRESENTED.has(e.cls)) unrepresented[e.cls] = (unrepresented[e.cls] || 0) + 1;

  const systems: SystemNode[] = layouts.map((layout, index) => {
    const measures: { left: number; right: number }[] = [];
    let left = layout.left;
    for (const x of layout.barXs) { measures.push({ left, right: x }); left = x; }
    return { index, layout, measures, staves: layout.staves.map(() => ({ clefs: [], keys: [], times: [] })), events: [], tuplets: [] };
  });
  const sp = layouts[0].spacing;
  const byClass = (cls: string) => page.elements.filter(e => e.cls === cls);
  const measureOf = (system: SystemNode, x: number) => {
    const i = system.measures.findIndex(m => x < m.right);
    return i < 0 ? system.measures.length - 1 : i;
  };
  const relY = (staff: StaffGeometry, y: number) => (y - staff.middle) / staff.spacing;

  // ---- clefs
  for (const e of byClass('Clef')) {
    const glyphs = glyphsOf(e, allSubpaths(e), sp, 'overlap');
    const bars = glyphs.filter(g => bw(g.bounds) < 0.75 * sp && bh(g.bounds) >= 1.6 * sp);
    // percussion clef: two short thin bars side by side (a C clef's bar is ~4 spaces tall)
    const shortBars = bars.filter(b => bh(b.bounds) < 3 * sp);
    const used = new Set<Glyph>();
    for (const a of shortBars) {
      if (used.has(a)) continue;
      const b = shortBars.find(o => o !== a && !used.has(o) && o.bounds.left > a.bounds.left &&
        o.bounds.left - a.bounds.right < 1.2 * sp && Math.abs(center(a.bounds).y - center(o.bounds).y) < 0.5 * sp);
      if (!b) continue;
      used.add(a); used.add(b);
      const c = center(a.bounds);
      const at = locate(layouts, c.x, c.y, 3);
      if (at) systems[at.systemIndex].staves[at.staffIndex].clefs.push({ x: a.bounds.left, value: 'percussion' });
    }
    for (const g of glyphs) {
      if (bars.includes(g) || bh(g.bounds) < 1.8 * sp) continue;
      const c = center(g.bounds);
      const at = locate(layouts, c.x, c.y, 4);
      if (!at) continue;
      const barLeft = bars.some(b => b.bounds.right <= g.bounds.left + 0.2 * sp && g.bounds.left - b.bounds.right < 0.8 * sp &&
        Math.abs(center(b.bounds).y - c.y) < sp);
      const kind = classifyClef(g, sp, relY(at.staff, c.y), barLeft);
      if (!kind) { diagnostics.push({ severity: 'warning', code: 'unknown-clef', message: 'Clef glyph not classified', system: at.systemIndex, staff: at.staffIndex, sourceIndex: e.sourceIndex }); continue; }
      systems[at.systemIndex].staves[at.staffIndex].clefs.push({ x: g.bounds.left, value: kind });
    }
  }

  // ---- key signatures: runs of accidentals per staff
  for (const e of byClass('KeySig')) {
    const items: { x: number; staff: number; system: number; kind: AccidentalKind }[] = [];
    for (const g of glyphsOf(e, allSubpaths(e), sp)) {
      const c = center(g.bounds);
      const at = locate(layouts, c.x, c.y, 5);
      const kind = classifyAccidental(g, sp);
      if (!at || !kind || kind === 'paren') {
        diagnostics.push({ severity: 'warning', code: 'unknown-key-accidental', message: 'Key-signature glyph not classified', sourceIndex: e.sourceIndex });
        continue;
      }
      items.push({ x: g.bounds.left, staff: at.staffIndex, system: at.systemIndex, kind });
    }
    items.sort((a, b) => a.system - b.system || a.staff - b.staff || a.x - b.x);
    let run: typeof items = [];
    const flush = () => {
      if (!run.length) return;
      const sharps = run.filter(i => i.kind === 'sharp').length, flats = run.filter(i => i.kind === 'flat').length;
      const fifths = sharps && flats ? 0 : sharps ? sharps : -flats; // naturals-only = cancellation to C
      if (sharps && flats) diagnostics.push({ severity: 'warning', code: 'mixed-key', message: 'Key signature mixes sharps and flats', system: run[0].system, staff: run[0].staff });
      systems[run[0].system].staves[run[0].staff].keys.push({ x: run[0].x, value: fifths });
      run = [];
    };
    for (const it of items) {
      const last = run[run.length - 1];
      if (last && (last.system !== it.system || last.staff !== it.staff || it.x - last.x > 2.2 * sp)) flush();
      run.push(it);
    }
    flush();
  }

  // ---- time signatures
  for (const e of byClass('TimeSig')) {
    const glyphs = glyphsOf(e, allSubpaths(e), sp).filter(g => bh(g.bounds) > 1.2 * sp);
    const groups = new Map<string, { at: Located; glyphs: Glyph[] }>();
    for (const g of glyphs) {
      const c = center(g.bounds);
      const at = locate(layouts, c.x, c.y, 4);
      if (!at) continue;
      // one signature = glyphs on a staff within ~2.5 spaces horizontally
      const key = `${at.systemIndex}:${at.staffIndex}:${Math.round(g.bounds.left / (3 * sp))}`;
      const entry = groups.get(key) || { at, glyphs: [] };
      entry.glyphs.push(g);
      groups.set(key, entry);
    }
    for (const { at, glyphs: gs } of groups.values()) {
      const x = Math.min(...gs.map(g => g.bounds.left));
      const ys = gs.map(g => relY(at.staff, center(g.bounds).y));
      let value: TimeGlyphs;
      if (gs.length === 1 && Math.abs(ys[0]) < 0.5) {
        value = bh(gs[0].bounds) > 3 * sp ? { num: 2, den: 2, symbol: 'cut' } : { num: 4, den: 4, symbol: 'common' };
      } else {
        // MuseScore composite signatures (6/4 = 3/2) put several pairs side by side: read the first pair.
        const firstX = Math.min(...gs.map(g => center(g.bounds).x));
        const pair = gs.filter(g => center(g.bounds).x - firstX < 2.2 * sp);
        const digits = (upper: boolean) => pair.filter(g => (relY(at.staff, center(g.bounds).y) < 0) === upper)
          .sort((a, b) => a.bounds.left - b.bounds.left).map(g => timeDigit(g, sp));
        const asNumber = (ds: (number | undefined)[]) => ds.length && ds.every(d => d !== undefined) ? Number(ds.join('')) : undefined;
        const fps = (upper: boolean) => pair.filter(g => (relY(at.staff, center(g.bounds).y) < 0) === upper)
          .sort((a, b) => a.bounds.left - b.bounds.left).map(g => digitFingerprint(g, sp));
        value = { num: asNumber(digits(true)), den: asNumber(digits(false)), numFp: fps(true), denFp: fps(false) };
      }
      systems[at.systemIndex].staves[at.staffIndex].times.push({ x, value });
    }
  }
  for (const system of systems) for (const staff of system.staves) {
    staff.clefs.sort((a, b) => a.x - b.x); staff.keys.sort((a, b) => a.x - b.x); staff.times.sort((a, b) => a.x - b.x);
  }

  // ---- stems
  const stems: (Stem & { systemIndex: number })[] = [];
  for (const e of byClass('Stem')) {
    for (const s of verticalStrokes(e, sp)) {
      const c = center(s.bounds);
      const at = locate(layouts, c.x, c.y, 9);
      if (!at) continue;
      stems.push({ x: c.x, top: s.bounds.top, bottom: s.bounds.bottom, staff: at.staffIndex, levels: 0, flags: 0, sourceIndex: e.sourceIndex, systemIndex: at.systemIndex });
    }
  }

  // ---- noteheads
  type RawHead = Head & { systemIndex: number; staffIndex: number; width: number };
  const heads: RawHead[] = [];
  for (const e of byClass('Note')) {
    for (const g of glyphsOf(e, allSubpaths(e), sp)) {
      const shape = classifyHead(g, sp);
      if (!shape) {
        diagnostics.push({ severity: 'warning', code: 'unknown-notehead', message: `Note glyph ${(bw(g.bounds) / sp).toFixed(2)}x${(bh(g.bounds) / sp).toFixed(2)} not classified`, sourceIndex: e.sourceIndex });
        continue;
      }
      const c = center(shape.head);
      const at = locate(layouts, c.x, c.y);
      if (!at) continue;
      const pos = Math.round(-(c.y - at.staff.middle) / (at.staff.spacing / 2));
      heads.push({ x: c.x, y: c.y, bounds: shape.head, pos, filled: shape.filled, wide: shape.wide, breve: shape.breve, circled: shape.circled,
        small: shape.small, color: g.fill && !/^(#000(000)?|black)$/i.test(g.fill) ? g.fill : undefined, sourceIndex: e.sourceIndex, systemIndex: at.systemIndex, staffIndex: at.staffIndex, width: bw(shape.head) });
    }
  }

  // ---- heads ↔ stems: a stem touches a head's left or right edge and spans its center
  const stemHeads = new Map<number, RawHead[]>();
  const stemless: RawHead[] = [];
  for (const h of heads) {
    const list: { i: number; d: number }[] = [];
    stems.forEach((s, i) => {
      if (s.systemIndex !== h.systemIndex) return;
      const dx = Math.min(Math.abs(s.x - h.bounds.right), Math.abs(s.x - h.bounds.left));
      if (dx > 0.22 * sp || h.y < s.top - 0.6 * sp || h.y > s.bottom + 0.6 * sp) return;
      list.push({ i, d: dx });
    });
    list.sort((a, b) => a.d - b.d);
    if (list.length) stemHeads.set(list[0].i, [...(stemHeads.get(list[0].i) || []), h]);
    else stemless.push(h);
  }
  // Mixed hollow/filled heads on one stem do occur (highlighted heads, unisons); the
  // majority type decides the value and a `mixed-noteheads` diagnostic keeps it visible.
  for (const [i, hs] of stemHeads) {
    const s = stems[i];
    const top = Math.min(...hs.map(h => h.y)), bottom = Math.max(...hs.map(h => h.y));
    s.dir = top - s.top > s.bottom - bottom ? 'up' : 'down';
    // a cross-staff chord belongs to the staff of its heads (majority)
    s.staff = hs[0].staffIndex;
  }

  // ---- beams: each polygon crossing a stem adds a level; polygons join stems into groups
  const groups = new UnionFind();
  for (const e of byClass('Beam')) {
    for (const s of e.subpaths) {
      if (bw(s.bounds) < 0.4 * sp) continue;
      const line = beamLine(s, sp);
      const crossed: number[] = [];
      stems.forEach((stem, i) => {
        if (!stemHeads.has(i)) return;
        if (stem.x < line.left - 0.2 * sp || stem.x > line.right + 0.2 * sp) return;
        const y = line.yAt(Math.min(Math.max(stem.x, line.left), line.right));
        if (y < stem.top - 0.45 * sp || y > stem.bottom + 0.45 * sp) return;
        crossed.push(i);
      });
      for (const i of crossed) stems[i].levels++;
      for (let k = 1; k < crossed.length; k++) groups.union(crossed[0], crossed[k]);
      if (!crossed.length) diagnostics.push({ severity: 'warning', code: 'orphan-beam', message: 'Beam polygon touches no stem', sourceIndex: e.sourceIndex });
    }
  }
  for (const [i] of stemHeads) if (stems[i].levels) stems[i].group = groups.find(i);

  // ---- hooks (flags) attach at the stem tip
  for (const e of byClass('Hook')) {
    for (const g of glyphsOf(e, allSubpaths(e), sp)) {
      let best: { i: number; d: number } | undefined;
      stemHeads.forEach((_, i) => {
        const s = stems[i];
        const dx = Math.abs(g.bounds.left - s.x);
        if (dx > 0.35 * sp) return;
        const tipOk = s.dir === 'up' ? g.bounds.top < s.top + 1.2 * sp && g.bounds.bottom > s.top - 0.3 * sp
          : g.bounds.bottom > s.bottom - 1.2 * sp && g.bounds.top < s.bottom + 0.3 * sp;
        if (!tipOk) return;
        if (!best || dx < best.d) best = { i, d: dx };
      });
      if (best) stems[best.i].flags = Math.max(stems[best.i].flags, hookFlags(g, sp));
      else diagnostics.push({ severity: 'warning', code: 'orphan-hook', message: 'Flag glyph attached to no stem', sourceIndex: e.sourceIndex });
    }
  }

  // ---- build chord events
  let nextId = 0;
  const pushEvent = (systemIndex: number, ev: Omit<EventNode, 'id' | 'system' | 'measure'>) => {
    const system = systems[systemIndex];
    const node: EventNode = { ...ev, id: nextId++, system: systemIndex, measure: measureOf(system, ev.x) };
    system.events.push(node);
    return node;
  };
  const chordDivision = (hs: RawHead[], stem?: Stem): { division: number; mixed: boolean } => {
    // Highlight colour is analysis markup: uncoloured heads, when present, decide the value.
    const plain = hs.filter(h => !h.color);
    const voters = plain.length ? plain : hs;
    const filled = voters.filter(h => h.filled).length;
    const mixed = filled > 0 && filled < voters.length;
    const isFilled = filled * 2 >= voters.length;
    if (!isFilled) return { division: stem ? 1 : hs.some(h => h.breve) ? -1 : 0, mixed };
    return { division: 2 + (stem ? Math.max(stem.levels, stem.flags) : 0), mixed };
  };
  for (const [i, hs] of stemHeads) {
    const s = stems[i];
    const { division, mixed } = chordDivision(hs, s);
    const w = Math.max(...hs.map(h => h.width));
    const x = s.dir === 'up' ? s.x - w / 2 : s.x + w / 2;
    const node = pushEvent(hs[0].systemIndex, {
      kind: 'chord', staff: hs[0].staffIndex, x, left: Math.min(...hs.map(h => h.bounds.left)), right: Math.max(...hs.map(h => h.bounds.right)),
      heads: hs.sort((a, b) => b.y - a.y), stem: s, division, dots: 0, grace: hs.every(h => h.small) && !hs.some(h => h.circled),
      stemless: false, fullMeasure: false, beamGroup: s.group, sourceIndices: [...new Set([s.sourceIndex, ...hs.map(h => h.sourceIndex)])],
    });
    if (mixed) diagnostics.push({ severity: 'warning', code: 'mixed-noteheads', message: 'Chord mixes hollow and filled heads', system: node.system, staff: node.staff });
  }
  // stemless heads: cluster heads in the same column (seconds are displaced by one head width)
  const uf = new UnionFind();
  stemless.forEach((a, i) => stemless.forEach((b, j) => {
    if (j <= i || a.systemIndex !== b.systemIndex || a.staffIndex !== b.staffIndex) return;
    const dx = Math.abs(a.x - b.x), dy = Math.abs(a.pos - b.pos);
    if (dx < 0.35 * sp || (dy <= 1 && dx < Math.max(a.width, b.width) * 1.15)) uf.union(i, j);
  }));
  const clusters = new Map<number, RawHead[]>();
  stemless.forEach((h, i) => { const r = uf.find(i); clusters.set(r, [...(clusters.get(r) || []), h]); });
  for (const hs of clusters.values()) {
    const { division } = chordDivision(hs);
    const stemlessFilled = division >= 2;
    const node = pushEvent(hs[0].systemIndex, {
      kind: 'chord', staff: hs[0].staffIndex, x: Math.min(...hs.map(h => h.x)), left: Math.min(...hs.map(h => h.bounds.left)),
      right: Math.max(...hs.map(h => h.bounds.right)), heads: hs.sort((a, b) => b.y - a.y), division, dots: 0,
      grace: false, stemless: stemlessFilled, fullMeasure: false, sourceIndices: [...new Set(hs.map(h => h.sourceIndex))],
    });
    if (stemlessFilled) diagnostics.push({ severity: 'info', code: 'stemless-filled', message: 'Filled notehead without stem written as a quarter note (Lilylet has no stemless notes)', system: node.system, staff: node.staff, sourceIndex: hs[0].sourceIndex });
  }

  // ---- staff of each chord. Nearest-middle is wrong for ledger notes between close staves:
  // a stemmed chord belongs to the staff nearest the middle of its stem+heads extent, and a
  // stemless one to the staff its ledger lines connect to.
  const ledgers = byClass('LedgerLine').flatMap(e => e.subpaths).map(s => s.bounds).filter(b => bw(b) > 0.8 * sp && bh(b) < 0.4 * sp);
  for (const system of systems) {
    const staves = system.layout.staves;
    const nearest = (y: number) => staves.reduce((best, st, i) => (Math.abs(y - st.middle) < Math.abs(y - staves[best].middle) ? i : best), 0);
    for (const ev of system.events) {
      if (ev.kind !== 'chord') continue;
      let staff = ev.staff;
      if (ev.stem) {
        const top = Math.min(ev.stem.top, ...ev.heads.map(h => h.y)), bottom = Math.max(ev.stem.bottom, ...ev.heads.map(h => h.y));
        staff = nearest((top + bottom) / 2);
      } else {
        const outside = ev.heads.filter(h => Math.abs(h.y - staves[ev.staff].middle) > 2.6 * sp);
        if (outside.length) {
          const h = outside[0];
          const votes = staves.map((st, i) => {
            const lo = Math.min(h.y, st.middle), hi = Math.max(h.y, st.middle);
            const between = ledgers.filter(b => b.left < h.bounds.right && b.right > h.bounds.left && center(b).y > lo - 0.3 * sp && center(b).y < hi + 0.3 * sp &&
              Math.abs(center(b).y - st.middle) > 2.5 * sp).length;
            const needed = Math.max(0, Math.floor((Math.abs(h.y - st.middle) / (sp / 2) - 4) / 2));
            return { i, ok: needed > 0 && between >= needed, d: Math.abs(h.y - st.middle) };
          }).filter(v => v.ok).sort((a, b) => a.d - b.d);
          if (votes.length) staff = votes[0].i;
        }
      }
      // heads of one chord may have been located on different staves: measure all against the chord's staff
      ev.staff = staff;
      if (ev.stem) ev.stem.staff = staff;
      for (const h of ev.heads) h.pos = Math.round(-(h.y - staves[staff].middle) / (staves[staff].spacing / 2));
    }
  }

  // ---- rests
  for (const e of byClass('Rest')) {
    for (const g of glyphsOf(e, allSubpaths(e), sp, 'overlap')) {
      const c = center(g.bounds);
      const at = locate(layouts, c.x, c.y, 6);
      if (!at) continue;
      const division = classifyRest(g, sp, relY(at.staff, g.bounds.top), relY(at.staff, g.bounds.bottom));
      if (division === undefined) {
        diagnostics.push({ severity: 'warning', code: 'unknown-rest', message: `Rest glyph ${(bw(g.bounds) / sp).toFixed(2)}x${(bh(g.bounds) / sp).toFixed(2)} not classified`, system: at.systemIndex, staff: at.staffIndex, sourceIndex: e.sourceIndex });
        continue;
      }
      pushEvent(at.systemIndex, {
        kind: 'rest', staff: at.staffIndex, x: c.x, left: g.bounds.left, right: g.bounds.right, heads: [], division, dots: 0,
        grace: false, stemless: false, fullMeasure: false, restY: relY(at.staff, c.y), sourceIndices: [e.sourceIndex],
      });
    }
  }

  // ---- augmentation dots: right of the event, at a head's (or rest's) height
  for (const e of byClass('NoteDot')) {
    for (const s of e.subpaths) {
      if (bw(s.bounds) > 0.8 * sp) continue;
      const c = center(s.bounds);
      const at = locate(layouts, c.x, c.y);
      if (!at) continue;
      const candidates = systems[at.systemIndex].events.filter(ev => ev.staff === at.staffIndex && !ev.grace && ev.right < c.x && c.x - ev.right < 2.6 * sp);
      let best: { ev: EventNode; d: number } | undefined;
      for (const ev of candidates) {
        const ys = ev.kind === 'rest' ? [at.staff.middle + (ev.restY || 0) * sp] : ev.heads.map(h => h.y);
        const dy = Math.min(...ys.map(y => Math.abs(y - c.y)));
        if (dy > 0.9 * sp) continue;
        const d = c.x - ev.right + dy;
        if (!best || d < best.d) best = { ev, d };
      }
      if (!best) { diagnostics.push({ severity: 'warning', code: 'orphan-dot', message: 'Augmentation dot attached to no event', system: at.systemIndex, staff: at.staffIndex, sourceIndex: e.sourceIndex }); continue; }
      const ev = best.ev as EventNode & { dotXs?: number[] };
      ev.dotXs = ev.dotXs || [];
      if (!ev.dotXs.some(x => Math.abs(x - c.x) < 0.25 * sp)) ev.dotXs.push(c.x);
      ev.dots = ev.dotXs.length;
    }
  }

  // ---- accidentals attach to the nearest head on their right at the same height
  for (const e of byClass('Accidental')) {
    for (const g of glyphsOf(e, allSubpaths(e), sp)) {
      const kind = classifyAccidental(g, sp);
      if (kind === 'paren') continue;
      const c = center(g.bounds);
      if (!kind) { diagnostics.push({ severity: 'warning', code: 'unknown-accidental', message: 'Accidental glyph not classified', sourceIndex: e.sourceIndex }); continue; }
      const counter = g.contours.find((k, i) => i > 0 && k.depth === 1);
      const anchorY = (kind === 'flat' || kind === 'doubleFlat') && counter ? center(counter.bounds).y : c.y;
      let best: { h: Head; d: number } | undefined;
      for (const system of systems) for (const ev of system.events) for (const h of ev.heads) {
        const gap = h.bounds.left - g.bounds.right;
        if (gap < -0.3 * sp || gap > 5 * sp || Math.abs(h.y - anchorY) > 0.4 * sp) continue;
        const d = gap + Math.abs(h.y - anchorY) * 2;
        if (!best || d < best.d) best = { h, d };
      }
      if (best) best.h.accidental = kind;
      else diagnostics.push({ severity: 'warning', code: 'orphan-accidental', message: `${kind} attached to no notehead`, sourceIndex: e.sourceIndex });
    }
  }

  // ---- tuplets: number glyphs plus optional bracket strokes
  let tupletId = 0;
  for (const e of byClass('Tuplet')) {
    if (e.style.fill === 'none') continue; // brackets are collected below
    for (const g of glyphsOf(e, allSubpaths(e), sp)) {
      const c = center(g.bounds);
      const at = locate(layouts, c.x, c.y, 9);
      if (!at) continue;
      const system = systems[at.systemIndex];
      const brackets = byClass('Tuplet').filter(b => b.style.fill === 'none').flatMap(b => b.subpaths)
        .filter(b => Math.abs(center(b.bounds).y - c.y) < 1.6 * sp && (Math.abs(b.bounds.right - g.bounds.left) < 1.2 * sp || Math.abs(b.bounds.left - g.bounds.right) < 1.2 * sp));
      let left: number, right: number, members: EventNode[];
      if (brackets.length) {
        left = Math.min(...brackets.map(b => b.bounds.left));
        right = Math.max(...brackets.map(b => b.bounds.right));
        members = system.events.filter(ev => !ev.grace && !ev.absorbed && ev.staff === at.staffIndex && ev.right >= left - 0.2 * sp && ev.left <= right + 0.2 * sp);
        // keep the voice on the bracket's side: stems pointing toward the number; drop stemless notes of another voice
        const above = c.y < at.staff.middle;
        const towards = members.filter(ev => ev.stem && (ev.stem.dir === 'up') === above);
        if (towards.length && towards.length < members.length) {
          const span = [Math.min(...towards.map(ev => ev.x)), Math.max(...towards.map(ev => ev.x))];
          members = members.filter(ev => towards.includes(ev) || (ev.kind === 'rest' && ev.x >= span[0] && ev.x <= span[1] &&
            (above ? (ev.restY ?? 0) <= 0 : (ev.restY ?? 0) >= 0)));
        }
      } else {
        // the beam group whose stem tips are closest to the number
        // numbers between staves are as close to the other staff: judge by stem tips, any staff
        const cands = system.events.filter(ev => ev.beamGroup !== undefined && ev.stem && ev.tuplet === undefined);
        const byGroup = new Map<number, EventNode[]>();
        for (const ev of cands) byGroup.set(ev.beamGroup!, [...(byGroup.get(ev.beamGroup!) || []), ev]);
        let best: { evs: EventNode[]; d: number } | undefined;
        for (const evs of byGroup.values()) {
          const l = Math.min(...evs.map(ev => ev.stem!.x)), r = Math.max(...evs.map(ev => ev.stem!.x));
          if (c.x < l - 0.5 * sp || c.x > r + 0.5 * sp) continue;
          const d = Math.min(...evs.map(ev => Math.abs((ev.stem!.dir === "up" ? ev.stem!.top : ev.stem!.bottom) - c.y)));
          if (d < 4 * sp && (!best || d < best.d)) best = { evs, d };
        }
        members = best?.evs || [];
        left = Math.min(...members.map(ev => ev.left), c.x);
        right = Math.max(...members.map(ev => ev.right), c.x);
      }
      const node: TupletNode = { id: tupletId++, system: at.systemIndex, staff: members[0]?.staff ?? at.staffIndex, x: c.x, y: c.y, left, right, events: members.map(ev => ev.id), sourceIndex: e.sourceIndex };
      if (!members.length) {
        diagnostics.push({ severity: 'warning', code: 'orphan-tuplet', message: 'Tuplet number spans no events', system: at.systemIndex, staff: at.staffIndex, sourceIndex: e.sourceIndex });
        continue;
      }
      for (const ev of members) ev.tuplet = node.id;
      system.tuplets.push(node);
    }
  }

  // ---- two-note tremolos: strokes spanning the gap between two stems of one staff
  for (const e of byClass('Tremolo')) {
    for (const g of glyphsOf(e, allSubpaths(e), sp, 'overlap')) {
      const c = center(g.bounds);
      const at = locate(layouts, c.x, c.y, 8);
      if (!at) continue;
      const stemmed = systems[at.systemIndex].events.filter(ev => ev.staff === at.staffIndex && ev.stem && !ev.grace);
      const leftEv = stemmed.filter(ev => ev.stem!.x <= c.x).sort((a, b) => b.stem!.x - a.stem!.x)[0];
      const rightEv = stemmed.filter(ev => ev.stem!.x > c.x).sort((a, b) => a.stem!.x - b.stem!.x)[0];
      const bars = g.contours.length;
      // single-note tremolo strokes cross their own stem; two-note strokes sit between two stems
      const crossesStem = stemmed.some(ev => ev.stem!.x > g.bounds.left + 0.15 * sp && ev.stem!.x < g.bounds.right - 0.15 * sp);
      if (!crossesStem && leftEv && rightEv && rightEv.stem!.x - leftEv.stem!.x < bw(g.bounds) + 6 * sp &&
        g.bounds.left > leftEv.stem!.x - 0.3 * sp && g.bounds.right < rightEv.stem!.x + 0.3 * sp) {
        leftEv.tremolo = { partner: rightEv, bars };
        rightEv.absorbed = true;
      } else {
        // single-note tremolo: strokes across one stem, or above/below a stemless head
        const all = systems[at.systemIndex].events.filter(ev => !ev.grace && !ev.absorbed && ev.kind === 'chord');
        const onStem = all.find(ev => ev.stem && ev.stem.x > g.bounds.left - 0.2 * sp && ev.stem.x < g.bounds.right + 0.2 * sp &&
          g.bounds.bottom > ev.stem.top - sp && g.bounds.top < ev.stem.bottom + sp);
        const target = onStem || all.filter(ev => !ev.stem && Math.abs(ev.x - c.x) < 0.8 * sp)
          .sort((a, b) => Math.min(...a.heads.map(h => Math.abs(h.y - c.y))) - Math.min(...b.heads.map(h => Math.abs(h.y - c.y))))[0];
        if (target && Math.min(...target.heads.map(h => Math.abs(h.y - c.y))) < 6 * sp) target.strokes = Math.min(bars, 4);
        else diagnostics.push({ severity: 'warning', code: 'orphan-tremolo', message: 'Tremolo strokes attached to no note', system: at.systemIndex, staff: at.staffIndex, sourceIndex: e.sourceIndex });
      }
    }
  }

  // ---- ties: crescent from a head to the next head of the same pitch
  for (const e of byClass('TieSegment')) {
    for (const s of e.subpaths) {
      const c = center(s.bounds);
      const at = locate(layouts, c.x, c.y, 8);
      if (!at) continue;
      let best: { h: Head; d: number } | undefined;
      for (const ev of systems[at.systemIndex].events) for (const h of ev.heads) {
        const dx = s.bounds.left - h.x;
        if (dx < -0.2 * sp || dx > 1.6 * sp || Math.abs(h.y - c.y) > 1.3 * sp) continue;
        const d = Math.abs(dx - 0.6 * sp) + Math.abs(h.y - c.y);
        if (!best || d < best.d) best = { h, d };
      }
      if (best) best.h.tieStart = true; // a segment that only ends at a system start continues an earlier tie
    }
  }

  // ---- articulations, fermatas, trills: nearest event horizontally, close to its heads or stem tip
  const ARTICULATION = (g: Glyph): Mark | undefined => {
    const w = bw(g.bounds) / sp, h = bh(g.bounds) / sp;
    if (w <= 0.5 && h <= 0.5) return 'staccato';
    if (h <= 0.3 && w >= 0.8) return 'tenuto';
    if (w >= 1.2 && h <= 1.15 && w / h >= 1.3) return 'accent';
    if (w <= 0.65 && h >= 0.7 && h <= 1.4) return 'staccatissimo';
    if (w >= 0.85 && w <= 1.35 && h >= 0.85 && h <= 1.3 && g.contours.length === 1) return 'marcato';
    return undefined;
  };
  const attachMark = (mark: Mark, b: Bounds, reach: number, sourceIndex: number, anchorLeft = false) => {
    const c = center(b);
    const ax = anchorLeft ? b.left : c.x;
    let best: { ev: EventNode; d: number } | undefined;
    for (const system of systems) {
      if (ax < system.layout.left - sp || ax > system.layout.right + sp) continue;
      for (const ev of system.events) {
        if (ev.grace || ev.absorbed) continue;
        const ex = ev.kind === 'rest' ? (ev.left + ev.right) / 2 : ev.heads.reduce((s, h) => s + h.x, 0) / ev.heads.length;
        const dx = Math.abs(ex - ax);
        if (dx > (anchorLeft ? 2 : 1.3) * sp) continue;
        const ys = ev.kind === 'rest' ? [system.layout.staves[ev.staff].middle + (ev.restY || 0) * sp] : [...ev.heads.map(h => h.y), ...(ev.stem ? [ev.stem.top, ev.stem.bottom] : [])];
        const dy = Math.min(...ys.map(y => Math.abs(y - c.y)));
        if (dy > reach * sp) continue;
        const d = dx + dy;
        if (!best || d < best.d) best = { ev, d };
      }
    }
    if (!best) { diagnostics.push({ severity: 'warning', code: 'orphan-mark', message: `${mark} attached to no event`, sourceIndex }); return; }
    best.ev.marks = [...new Set([...(best.ev.marks || []), mark])];
  };
  for (const e of byClass('Articulation')) {
    for (const g of glyphsOf(e, allSubpaths(e), sp)) {
      const mark = ARTICULATION(g);
      if (mark) attachMark(mark, g.bounds, 3.5, e.sourceIndex);
      else diagnostics.push({ severity: 'info', code: 'unknown-articulation', message: `Articulation glyph ${(bw(g.bounds) / sp).toFixed(1)}x${(bh(g.bounds) / sp).toFixed(1)} not transcribed`, sourceIndex: e.sourceIndex });
    }
  }
  for (const e of byClass('Fermata')) for (const g of glyphsOf(e, allSubpaths(e), sp, 'overlap')) attachMark('fermata', g.bounds, 7, e.sourceIndex);
  // a trill line starts with its "tr" sign over the trilled note
  // A trill line is drawn in pieces; only the first carries the taller "tr" sign.
  for (const e of byClass('TrillSegment')) if (bh(e.bounds) >= 1.0 * sp) attachMark('trill', e.bounds, 7, e.sourceIndex, true);

  // ---- tempo marks: outlined text read with the labelled glyph table
  const tempos: TempoNode[] = [];
  for (const e of byClass('Tempo')) {
    const read = textMarks(e, sp).map(m => ({ m, ...readMark(m, TEMPO_GLYPHS as GlyphExample[]) }));
    // a word mark and a metronome mark stacked at the same place are one tempo
    const used = new Set<number>();
    read.forEach((r, i) => {
      if (used.has(i)) return;
      used.add(i);
      let raw = r.text, unknown = r.unknown;
      // only words + a metronome mark stacked at one place are joined (never metric equations)
      const kind = (x: string) => { const t = parseTempo(x); return t.equation ? 'eq' : t.bpm && !t.text ? 'metro' : !t.bpm && t.text ? 'words' : 'both'; };
      const partner = read.findIndex((o, j) => !used.has(j) && Math.abs(o.m.bounds.left - r.m.bounds.left) < 3 * sp &&
        o.m.bounds.top - r.m.bounds.bottom < 1.5 * r.m.height && o.m.bounds.top > r.m.bounds.top &&
        ((kind(r.text) === 'words' && kind(o.text) === 'metro') || (kind(r.text) === 'metro' && kind(o.text) === 'words')));
      if (partner >= 0) { used.add(partner); raw += ' ' + read[partner].text; unknown += read[partner].unknown; }
      // the system below the mark whose top staff is nearest
      let sys: { index: number; d: number } | undefined;
      for (const system of systems) {
        if (r.m.bounds.left < system.layout.left - 4 * sp || r.m.bounds.left > system.layout.right) continue;
        const d = system.layout.staves[0].lines[0] - r.m.bounds.bottom;
        if (d > -2 * sp && (!sys || d < sys.d)) sys = { index: system.index, d };
      }
      if (!sys) return;
      const t = parseTempo(raw);
      if (t.equation) {
        diagnostics.push({ severity: 'info', code: 'tempo-equation', message: `Metric equation "${raw}" not transcribed`, system: sys.index, sourceIndex: e.sourceIndex });
        return;
      }
      // words with unread characters are dropped rather than guessed; a readable metronome is kept
      const textOk = t.text && !t.text.includes('?');
      if (unknown) diagnostics.push({ severity: 'warning', code: 'tempo-unread', message: `Tempo text partly unread: "${raw}"`, system: sys.index, sourceIndex: e.sourceIndex });
      if (!textOk && !t.bpm) return;
      tempos.push({ system: sys.index, x: r.m.bounds.left, text: textOk ? t.text : undefined, beat: t.bpm ? t.beat : undefined, bpm: t.bpm, raw, sourceIndex: e.sourceIndex });
    });
  }

  // ---- pitch: clef + key + accidentals with measure-scoped memory, per staff in x order
  const staffCount = Math.max(...layouts.map(l => l.staves.length));
  const anyClef = systems.some(sy => sy.staves.some(st => st.clefs.length));
  const carriedClef: (ClefKind | undefined)[] = Array(staffCount).fill(undefined);
  const carriedKey: number[] = Array(staffCount).fill(0);
  for (const system of systems) {
    system.staves.forEach((ctx, si) => {
      const events = system.events.filter(ev => ev.staff === si && ev.kind === 'chord').sort((a, b) => a.x - b.x);
      const memory = new Map<string, number>();
      let lastMeasure = -1;
      for (const ev of events) {
        if (ev.measure !== lastMeasure) { memory.clear(); lastMeasure = ev.measure; }
        let clef = [...ctx.clefs].reverse().find(c => c.x <= ev.x)?.value ?? carriedClef[si];
        if (!clef && !anyClef) {
          // No clef glyph anywhere: MuseScore hides it on rhythm staves; positions read as treble.
          clef = heads.every(h => h.pos === 0) ? 'percussion' : 'treble';
          ctx.clefs.unshift({ x: -Infinity, value: clef });
          diagnostics.push({ severity: 'info', code: 'no-clef-assumed', message: `No clef drawn; assumed ${clef}`, system: system.index, staff: si });
        }
        const fifths = [...ctx.keys].reverse().find(k => k.x <= ev.x)?.value ?? carriedKey[si];
        if (!clef) {
          diagnostics.push({ severity: 'error', code: 'no-clef', message: 'No clef in force; pitch unknown', system: system.index, staff: si });
          continue;
        }
        for (const h of ev.heads) {
          h.dn = CLEF_MIDDLE[clef] + h.pos;
          const step = ((h.dn % 7) + 7) % 7;
          const key = `${h.dn}`;
          if (h.accidental) { h.alter = ALTER[h.accidental]; memory.set(key, h.alter); }
          else h.alter = memory.get(key) ?? keyAlteration(fifths, step);
        }
      }
      if (ctx.clefs.length) carriedClef[si] = ctx.clefs[ctx.clefs.length - 1].value;
      if (ctx.keys.length) carriedKey[si] = ctx.keys[ctx.keys.length - 1].value;
    });
    system.events.sort((a, b) => a.staff - b.staff || a.x - b.x);
  }

  // ---- staff grouping header from the first system's braces: a curly Bracket glyph spanning
  // staves i..j makes one part `{-…}`; other staves are single parts. Square brackets only
  // group parts visually and are not encoded.
  const first = layouts[0];
  const braces: [number, number][] = [];
  for (const e of byClass('Bracket')) {
    for (const g of glyphsOf(e, allSubpaths(e), sp, 'overlap')) {
      const curly = (g.contours[0].commands.match(/[CSQTA]/g) || []).length >= 4 && bw(g.bounds) < 2 * sp;
      if (!curly) continue;
      const covered = first.staves.map((st, i) => ({ st, i })).filter(({ st }) => st.middle > g.bounds.top && st.middle < g.bounds.bottom).map(x => x.i);
      if (covered.length >= 2 && g.bounds.right <= first.left + 0.5 * sp) braces.push([covered[0], covered[covered.length - 1]]);
    }
  }
  const tokens: string[] = [];
  for (let i = 0; i < first.staves.length;) {
    const brace = braces.find(b => b[0] === i);
    if (brace) { tokens.push(`{${Array(brace[1] - brace[0]).fill('-').join('')}}`); i = brace[1] + 1; }
    else { tokens.push(''); i++; }
  }
  const staffLayoutCode = tokens.join(',');
  if (layouts.some(l => l.staves.length !== staffCount)) diagnostics.push({ severity: 'warning', code: 'staff-count-varies', message: 'Systems have different staff counts; staves are matched top-down' });
  return { page, systems, staffCount, staffLayoutCode, tempos, diagnostics, unrepresented };
}

export const STEP_NAMES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

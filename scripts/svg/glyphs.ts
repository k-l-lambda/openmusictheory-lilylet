// Glyph instances and shape classifiers for MuseScore SVG.
//
// MuseScore writes engraved symbols as filled outlines. One <path> may hold
// several symbols, and one symbol may be several contours (outer outline plus
// counters). Recognizers here first rebuild symbol instances, then classify
// them with size/topology rules measured on the 453-file corpus
// (see scripts/svg/README.md). Classifiers return `undefined` rather than
// guessing; callers turn that into diagnostics.
import { center, type Bounds, type Subpath } from './geometry.js';
import type { SvgElement } from './parser.js';

export type Contour = { bounds: Bounds; commands: string; area: number; depth: number; subpath: Subpath };
export type Glyph = {
  cls: string;
  sourceIndex: number;
  fill?: string;
  bounds: Bounds;
  contours: Contour[]; // outer contour first, then by decreasing area
};

export const bw = (b: Bounds) => b.right - b.left;
export const bh = (b: Bounds) => b.bottom - b.top;
const area = (b: Bounds) => bw(b) * bh(b);
const contains = (outer: Bounds, inner: Bounds, tol: number) =>
  inner.left >= outer.left - tol && inner.right <= outer.right + tol && inner.top >= outer.top - tol && inner.bottom <= outer.bottom + tol;
const intersects = (a: Bounds, b: Bounds, tol: number) =>
  a.left <= b.right + tol && b.left <= a.right + tol && a.top <= b.bottom + tol && b.top <= a.bottom + tol;
const union = (a: Bounds, b: Bounds): Bounds => ({
  left: Math.min(a.left, b.left), top: Math.min(a.top, b.top), right: Math.max(a.right, b.right), bottom: Math.max(a.bottom, b.bottom),
});

/**
 * Split an element into glyph instances. `contain`: a contour belongs to the
 * glyph whose outline encloses it (noteheads, accidentals, hooks). `overlap`:
 * contours whose boxes touch are one glyph (rests and clefs drawn in pieces).
 */
export function glyphsOf(element: SvgElement, subpaths: Subpath[], spacing: number, mode: 'contain' | 'overlap' = 'contain'): Glyph[] {
  const tol = spacing * 0.03;
  const sorted = [...subpaths].sort((a, b) => area(b.bounds) - area(a.bounds));
  const glyphs: Glyph[] = [];
  for (const s of sorted) {
    const contour: Contour = { bounds: s.bounds, commands: s.commands.join(''), area: area(s.bounds), depth: 0, subpath: s };
    const host = glyphs.find(g => mode === 'contain' ? contains(g.contours[0].bounds, s.bounds, tol) : intersects(g.bounds, s.bounds, tol));
    if (host) {
      host.contours.push(contour);
      host.bounds = union(host.bounds, s.bounds);
    } else {
      glyphs.push({ cls: element.cls, sourceIndex: element.sourceIndex, fill: element.style.fill, bounds: s.bounds, contours: [contour] });
    }
  }
  if (mode === 'overlap') {
    // Merging can make earlier glyphs overlap later merged boxes; settle to a fixpoint.
    let merged = true;
    while (merged) {
      merged = false;
      for (let i = 0; i < glyphs.length && !merged; i++) {
        for (let j = i + 1; j < glyphs.length && !merged; j++) {
          if (intersects(glyphs[i].bounds, glyphs[j].bounds, tol)) {
            glyphs[i].contours.push(...glyphs[j].contours);
            glyphs[i].bounds = union(glyphs[i].bounds, glyphs[j].bounds);
            glyphs.splice(j, 1);
            merged = true;
          }
        }
      }
    }
  }
  for (const g of glyphs) {
    g.contours.sort((a, b) => b.area - a.area);
    for (const c of g.contours) c.depth = g.contours.filter(o => o !== c && o.area > c.area && contains(o.bounds, c.bounds, tol)).length;
  }
  return glyphs.filter(g => g.fill !== 'none' && g.fill !== 'transparent');
}

// ---------------------------------------------------------------- noteheads

export type HeadShape = {
  filled: boolean;
  /** Width-class of the head outline: whole-note heads are wider than black/half heads. */
  wide: boolean;
  breve: boolean;
  circled: boolean;
  small: boolean; // cue/grace size
  head: Bounds; // the notehead outline (inside any decoration ring)
};

/**
 * Notehead topology rather than "has any inner contour": a circled head is a
 * ring (outer + hole) around a head, and only a counter inside the head itself
 * makes it hollow. Measured corpus families (in staff spaces):
 *   black 1.3x1.1 (no counter); half 1.3x1.1 / 1.4x1.1 + counter;
 *   whole 1.5x1.1, 2.0x1.1 + counter; breve 1.5x1.4 with side bars;
 *   circled ring 1.6-1.7 square; cue heads <= 1.0 wide.
 */
export function classifyHead(g: Glyph, spacing: number): HeadShape | undefined {
  const cs = g.contours;
  let headIndex = 0;
  let circled = false;
  const outer = cs[0];
  const ow = bw(outer.bounds) / spacing, oh = bh(outer.bounds) / spacing;
  if (oh > 1.3 && Math.abs(ow - oh) < 0.25 * oh && cs.length >= 3) {
    const hole = cs[1];
    if (bw(hole.bounds) > 0.75 * bw(outer.bounds)) {
      // ring: the head is the largest contour inside the hole
      const inside = cs.findIndex((c, i) => i > 1 && contains(hole.bounds, c.bounds, spacing * 0.03));
      if (inside > 1) { headIndex = inside; circled = true; }
    }
  }
  const head = cs[headIndex];
  const w = bw(head.bounds) / spacing, h = bh(head.bounds) / spacing;
  if (w < 0.45 || h < 0.35 || h > 1.6 || w > 2.4) return undefined;
  const counter = cs.some((c, i) => i > headIndex && c.area > head.area * 0.12 && contains(head.bounds, c.bounds, spacing * 0.03));
  const breve = !circled && h >= 1.25 && w >= 1.4;
  return { filled: !counter, wide: w >= 1.45, breve, circled, small: w < 1.05 && h < 0.85, head: head.bounds };
}

// ---------------------------------------------------------------- rests

/**
 * Rest division (0 whole ... 6 sixty-fourth), or undefined. `relTop`/`relBottom`
 * are the glyph edges in staff spaces relative to the middle line. Whole and
 * half rests are the same block: a whole rest hangs from a line (top edge on a
 * line), a half rest sits on one (bottom edge on a line).
 */
export function classifyRest(g: Glyph, spacing: number, relTop: number, relBottom: number): number | undefined {
  const w = bw(g.bounds) / spacing, h = bh(g.bounds) / spacing;
  if (h < 0.8) {
    if (w > 2.0) return undefined; // multi-measure rest bar: needs its number, not handled
    const off = (v: number) => Math.abs(v - Math.round(v));
    return off(relTop) <= off(relBottom) ? 0 : 1;
  }
  if (h >= 1.4 && h < 2.3) return 3;
  if (h >= 2.3 && h < 3.4) return w < 1.2 ? 2 : 4;
  if (h >= 3.4 && h < 4.4) return 5;
  if (h >= 4.4 && h < 5.6) return 6;
  return undefined;
}

// ---------------------------------------------------------------- accidentals

export type AccidentalKind = 'sharp' | 'flat' | 'natural' | 'doubleSharp' | 'doubleFlat';
export const ALTER: Record<AccidentalKind, number> = { sharp: 1, flat: -1, natural: 0, doubleSharp: 2, doubleFlat: -2 };

export function classifyAccidental(g: Glyph, spacing: number): AccidentalKind | 'paren' | undefined {
  const b = g.bounds, w = bw(b) / spacing, h = bh(b) / spacing;
  const counters = g.contours.slice(1).filter(c => c.depth === 1 && c.area > g.contours[0].area * 0.02);
  if (h < 1.4 && w > 0.8 && w < 1.4) return 'doubleSharp';
  if (h < 2.2 && w < 0.55) return 'paren';
  if (h < 2.0) return undefined;
  if (counters.length >= 2 && w >= 1.2) return 'doubleFlat';
  if (w >= 0.95) return 'sharp';
  if (!counters.length) return undefined;
  // A flat's bowl sits in the lower part of a tall stem; a natural's counter is central.
  const c = center(counters[0].bounds);
  const rel = (c.y - b.top) / bh(b);
  return rel > 0.62 ? 'flat' : 'natural';
}

// ---------------------------------------------------------------- clefs

export type ClefKind = 'treble' | 'treble_8' | 'treble^8' | 'bass' | 'alto' | 'tenor' | 'percussion';
/** Diatonic number (octave*7 + step, C4 = 28) of the middle staff line under each clef (written pitch). */
export const CLEF_MIDDLE: Record<ClefKind, number> = { treble: 34, treble_8: 34, 'treble^8': 34, bass: 22, alto: 28, tenor: 26, percussion: 34 };

/**
 * Clef glyphs: G is tall (>= 4.6 spaces, ~7 normal / ~5.7 change size), an
 * octave figure makes it taller still; C has a separate thick bar on its left;
 * F is the remaining 2.5-3.6 space glyph. `barLeft` reports a thin bar glyph.
 */
export function classifyClef(g: Glyph, spacing: number, relativeCenterY: number, barLeft: boolean): ClefKind | undefined {
  const w = bw(g.bounds) / spacing, h = bh(g.bounds) / spacing;
  if (h >= 4.6) {
    const normal = h >= 6.4;
    const octave = normal ? h >= 7.6 : h >= 6.2;
    if (!octave) return 'treble';
    // octave figure below: the glyph's lower part extends further from the middle line
    return relativeCenterY > 0.2 ? 'treble_8' : 'treble^8';
  }
  if (h < 1.8 || w < 0.9) return undefined;
  if (barLeft || h > 3.65) return Math.abs(relativeCenterY + 1) < 0.5 ? 'tenor' : 'alto';
  return 'bass';
}

// ---------------------------------------------------------------- hooks (flags)

/** Number of flags in a hook glyph: one outline per flag stack, counters between flags. */
export function hookFlags(g: Glyph, spacing: number): number {
  const counters = g.contours.slice(1).filter(c => c.area > g.contours[0].area * 0.03).length;
  const h = bh(g.bounds) / spacing;
  // A tall hook without counters (some fonts draw 16th+ flags as one outline) is still rare;
  // fall back to height: ~3 spaces per first flag plus ~0.8 per further flag.
  const byHeight = h > 3.7 ? 1 + Math.round((h - 3.3) / 0.8) : 1;
  return Math.max(1 + counters, byHeight);
}

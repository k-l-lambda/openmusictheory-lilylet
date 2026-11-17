// Outlined text (MuseScore exports text as glyph outlines): segmentation into
// marks and characters, character features, and nearest-neighbour recognition
// against a labelled glyph table (scripts/svg/tempo-glyphs.json, built by
// learn-tempo-glyphs.ts from hand transcriptions of the corpus tempo marks).
import { type Bounds } from './geometry.js';
import type { SvgElement } from './parser.js';
import { bh, bw, glyphsOf, type Glyph } from './glyphs.js';

export type TextChar = { bounds: Bounds; glyphs: Glyph[] };
export type TextMark = { bounds: Bounds; chars: TextChar[]; height: number; baseline: number };
export type CharFeature = { r: string; a: number; h: number; y: number };
export type GlyphExample = CharFeature & { ch: string };

const union = (a: Bounds, b: Bounds): Bounds => ({ left: Math.min(a.left, b.left), top: Math.min(a.top, b.top), right: Math.max(a.right, b.right), bottom: Math.max(a.bottom, b.bottom) });
const overlap = (a0: number, a1: number, b0: number, b1: number) => Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));

/** Characters: glyph outlines (with counters) joined when stacked (i-dots, accents, '=') or when a thin stroke touches (note stems, flags). */
function charsOf(glyphs: Glyph[]): TextChar[] {
  const chars: TextChar[] = glyphs.map(g => ({ bounds: g.bounds, glyphs: [g] }));
  const joins = (a: TextChar, b: TextChar) => {
    const A = a.bounds, B = b.bounds;
    const ox = overlap(A.left, A.right, B.left, B.right), oy = overlap(A.top, A.bottom, B.top, B.bottom);
    const narrow = Math.min(bw(A), bw(B));
    // stacked pieces of one character: i/j dots, accents (one piece small) or the bars of '=' (both flat),
    // separated by a small gap; whole lines of text stacked above each other must stay apart
    const gap = Math.max(A.top, B.top) - Math.min(A.bottom, B.bottom);
    const small = Math.min(bh(A), bh(B)) <= 0.45 * Math.max(bh(A), bh(B));
    const bars = bh(A) < 0.35 * bw(A) && bh(B) < 0.35 * bw(B);
    if (ox >= 0.6 * narrow && oy <= 0.05 * Math.min(bh(A), bh(B)) && ((small && gap <= 0.4 * Math.max(bh(A), bh(B))) || (bars && gap <= 0.6 * narrow))) return true;
    const thin = (X: Bounds) => bw(X) < 0.22 * bh(X) && bh(X) > 0.6 * Math.max(bh(A), bh(B));
    if ((thin(A) || thin(B)) && ox > 0 && oy > 0 && (ox >= 0.5 * narrow || oy >= 0.5 * Math.min(bh(A), bh(B)))) return true; // stem in a head / flag on a stem
    return ox * oy >= 0.5 * Math.min(bw(A) * bh(A), bw(B) * bh(B));
  };
  let merged = true;
  while (merged) {
    merged = false;
    for (let i = 0; i < chars.length && !merged; i++) for (let j = i + 1; j < chars.length && !merged; j++) {
      if (joins(chars[i], chars[j])) {
        chars[i] = { bounds: union(chars[i].bounds, chars[j].bounds), glyphs: [...chars[i].glyphs, ...chars[j].glyphs] };
        chars.splice(j, 1);
        merged = true;
      }
    }
  }
  return chars.sort((a, b) => a.bounds.left - b.bounds.left);
}

/** Split an outlined-text element into marks (lines of characters), in reading order. */
export function textMarks(element: SvgElement, spacing: number): TextMark[] {
  const chars = charsOf(glyphsOf(element, element.subpaths, spacing, 'contain'));
  if (!chars.length) return [];
  // line height: the tallest characters are capitals, digits, note symbols
  const hs = chars.map(c => bh(c.bounds)).sort((a, b) => b - a);
  const lineH = hs[Math.floor(hs.length * 0.2)] || hs[0];
  const marks: TextChar[][] = [];
  for (const c of chars) {
    const cy = (c.bounds.top + c.bounds.bottom) / 2;
    const m = marks.find(m => {
      const last = m[m.length - 1];
      const ly = m.reduce((s, x) => s + (x.bounds.top + x.bounds.bottom) / 2, 0) / m.length;
      return Math.abs(cy - ly) < 0.7 * lineH && c.bounds.left - last.bounds.right < 1.4 * lineH;
    });
    if (m) m.push(c); else marks.push([c]);
  }
  return marks.map(cs => {
    const bounds = cs.reduce((b, c) => union(b, c.bounds), cs[0].bounds);
    const height = Math.max(...cs.map(c => bh(c.bounds)));
    // baseline: the most common bottom among characters (descenders and the comma hang below it)
    const bottoms = cs.map(c => c.bounds.bottom).sort((a, b) => a - b);
    return { bounds, chars: cs, height, baseline: bottoms[Math.floor(bottoms.length / 2)] };
  }).sort((a, b) => (Math.abs(a.bounds.top - b.bounds.top) < 0.5 * Math.min(a.height, b.height) ? a.bounds.left - b.bounds.left : a.bounds.top - b.bounds.top));
}

/** Character features: 8x10 even-odd raster (hex), aspect, height and center relative to the mark. */
export function charFeature(c: TextChar, mark: TextMark): CharFeature {
  const b = c.bounds, W = 8, H = 10;
  let bits = '';
  for (let r = 0; r < H; r++) for (let q = 0; q < W; q++) {
    const x = b.left + ((q + 0.5) / W) * bw(b), y = b.top + ((r + 0.5) / H) * bh(b);
    let inside = false;
    for (const g of c.glyphs) for (const k of g.contours) {
      const pts = k.subpath.points;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const pi = pts[i], pj = pts[j];
        if ((pi.y > y) !== (pj.y > y) && x < ((pj.x - pi.x) * (y - pi.y)) / (pj.y - pi.y) + pi.x) inside = !inside;
      }
    }
    bits += inside ? '1' : '0';
  }
  let r = '';
  for (let i = 0; i < bits.length; i += 4) r += parseInt(bits.slice(i, i + 4), 2).toString(16);
  return { r, a: bw(b) / Math.max(bh(b), 1e-6), h: bh(b) / mark.height, y: (mark.baseline - (b.top + b.bottom) / 2) / mark.height };
}

const hamming = (a: string, b: string) => {
  let d = 0;
  for (let i = 0; i < a.length; i++) { let x = parseInt(a[i], 16) ^ parseInt(b[i], 16); while (x) { d += x & 1; x >>= 1; } }
  return d;
};
export const featureDistance = (a: CharFeature, b: CharFeature) =>
  hamming(a.r, b.r) + 12 * Math.abs(Math.log((a.a + 0.05) / (b.a + 0.05))) + 25 * Math.abs(a.h - b.h) + 25 * Math.abs(a.y - b.y);

/** Recognize a mark: characters by nearest labelled example; spaces from gaps. `?` when nothing is close. */
export function readMark(mark: TextMark, table: GlyphExample[], maxDistance = 14): { text: string; unknown: number } {
  let text = '';
  let unknown = 0;
  mark.chars.forEach((c, i) => {
    if (i > 0 && c.bounds.left - mark.chars[i - 1].bounds.right > 0.26 * mark.height) text += ' ';
    const f = charFeature(c, mark);
    let best: { ch: string; d: number } | undefined;
    for (const ex of table) { const d = featureDistance(f, ex); if (!best || d < best.d) best = { ch: ex.ch, d }; }
    if (best && best.d <= maxDistance) text += best.ch; else { text += '?'; unknown++; }
  });
  // punctuation hugs its word; parentheses hug their content
  return { text: text.replace(/\s+([.,)])/g, '$1').replace(/\(\s+/g, '(').replace(/(\})\s+(\.)/g, '$1$2'), unknown };
}

/** Note-symbol tokens used in transcriptions and recognized text: {1} {2} {4} {8} {16}. */
export const NOTE_TOKEN = /\{(1|2|4|8|16)\}/g;

/**
 * Split recognized tempo text into words and an optional metronome mark:
 * "Allegro maestoso ({2} = 54)" -> { text: "Allegro maestoso", beat: "2", bpm: 54 }.
 * A note = note equation (metric modulation) is returned in `equation` and has no bpm.
 */
export function parseTempo(raw: string): { text?: string; beat?: string; bpm?: number; equation?: string } {
  const metro = raw.match(/\(?\s*\{(1|2|4|8|16)\}\s*(\.?)\s*=\s*(\d+)\s*\)?/);
  const equation = !metro && /\{(1|2|4|8|16)\}\.?\s*=\s*\{(1|2|4|8|16)\}\.?/.test(raw) ? raw.trim() : undefined;
  let text = raw;
  if (metro) text = text.replace(metro[0], '');
  if (equation) text = '';
  text = text.replace(/[\s,]+$/, '').replace(/^\s+/, '').replace(/\s+/g, ' ');
  return { text: text || undefined, beat: metro ? metro[1] + (metro[2] || '') : undefined, bpm: metro ? Number(metro[3]) : undefined, equation };
}

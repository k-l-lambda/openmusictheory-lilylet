// Lilylet text from solved measures. Also returns the note list the text is
// supposed to encode, in the shape of scripts/v2/scores/dump-notes.ts, so the
// checker can parse the text back and prove the serialization is faithful.
import { add, cmp, eq, frac, isPow2, mul, str, sub, ZERO, type Frac } from './frac.js';
import { STEP_NAMES, type EventNode, type Head, type ScoreGraph, type TempoNode } from './notation.js';
import type { MeasureSolution, Placed, Solution, VoiceLine } from './timing.js';

export type ModelNote = [number, string, string[], string, boolean];
export type TempoModel = { text?: string; beat?: string; bpm?: number };
export type WriteResult = { code: string; notes: { notes: ModelNote[] }[]; tempos: TempoModel[]; marks: Record<string, number>; problems: string[] };
const MARK_TOKEN: Record<string, string> = { staccato: '-.', accent: '->', tenuto: '--', marcato: '-^', staccatissimo: '-!', fermata: '\\fermata', trill: '\\trill' };
export const tempoToken = (t: TempoModel) =>
  `\\tempo${t.text ? ` "${t.text.replace(/\\/g, '').replace(/"/g, "'")}"` : ''}${t.bpm ? ` ${t.beat} = ${t.bpm}` : ''}`;

const KEY_NAMES: Record<number, string> = { [-7]: 'cf', [-6]: 'gf', [-5]: 'df', [-4]: 'af', [-3]: 'ef', [-2]: 'bf', [-1]: 'f', 0: 'c', 1: 'g', 2: 'd', 3: 'a', 4: 'e', 5: 'b', 6: 'fs', 7: 'cs' };
const ACC = (alter: number) => (alter > 0 ? 's'.repeat(alter) : 'f'.repeat(-alter));
const STEP_UPPER = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const floorDiv = (a: number, b: number) => Math.floor(a / b);

/** Sounding-pitch label as dumpNotes writes it; octave clefs (treble_8) sound an octave away. */
export const pitchLabel = (h: Head, clef?: string) => {
  const shift = clef === 'treble_8' ? -1 : clef === 'treble^8' ? 1 : 0;
  const dn = h.dn!, alter = h.alter || 0;
  return `${STEP_UPPER[((dn % 7) + 7) % 7]}${alter >= 0 ? '+' : ''}${alter}${floorDiv(dn, 7) + shift}`;
};

/** Written value (division, dots) of a binary duration, if it is a single (≤2-dotted) note. */
function single(d: Frac): string | undefined {
  for (let division = -1; division <= 7; division++) {
    for (let dots = 0; dots <= 2; dots++) {
      let base: Frac = division < 0 ? frac(2) : frac(1, 2 ** division), total = base;
      for (let i = 0; i < dots; i++) { base = mul(base, frac(1, 2)); total = add(total, base); }
      if (eq(total, d)) return (division < 0 ? '\\breve' : String(2 ** division)) + '.'.repeat(dots);
    }
  }
  return undefined;
}
const durationToken = (division: number, dots: number) => (division < 0 ? '\\breve' : String(2 ** division)) + '.'.repeat(dots);

/** Spacer tokens filling `d` (binary parts, triplet-like remainders inside \tuplet). */
function spacers(d: Frac, problems: string[]): string[] {
  const out: string[] = [];
  const binary = (f: Frac) => {
    let rest = f;
    for (let k = -1; k <= 8 && cmp(rest, ZERO) > 0; k++) {
      const unit = k < 0 ? frac(2) : frac(1, 2 ** k);
      while (cmp(rest, unit) >= 0) { out.push(`s${k < 0 ? '\\breve' : 2 ** k}`); rest = sub(rest, unit); }
    }
    if (cmp(rest, ZERO) > 0) problems.push(`unrepresentable spacer remainder ${str(rest)}`);
  };
  if (isPow2(d[1])) { binary(d); return out; }
  let odd = d[1]; while (odd % 2 === 0) odd /= 2;
  let p = 1; while (p * 2 < odd) p *= 2;
  const scaled = mul(d, frac(odd, p));
  if (!isPow2(scaled[1])) { problems.push(`unrepresentable spacer ${str(d)}`); return out; }
  const inner: string[] = [];
  const saved = out.length;
  binary(scaled);
  inner.push(...out.splice(saved));
  out.push(`\\tuplet ${odd}/${p} { ${inner.join(' ')} }`);
  return out;
}

/** Parts from a `[staves]` code: top-level commas separate parts; `{-}`/`<->` groups hold dash+1 staves. */
function partsOf(code: string, staffCount: number): number[][] {
  const parts: number[][] = [];
  let staff = 0;
  for (const token of code.split(',')) {
    const n = /^[{<]/.test(token) ? (token.match(/-/g) || []).length + 1 : 1;
    parts.push(Array.from({ length: n }, () => staff++));
  }
  while (staff < staffCount) parts.push([staff++]);
  return parts.map(p => p.filter(s => s < staffCount)).filter(p => p.length);
}

export function writeLilylet(graph: ScoreGraph, solution: Solution, title = 'MuseScore SVG import'): WriteResult {
  const problems: string[] = [];
  const parts = partsOf(graph.staffLayoutCode, graph.staffCount);
  const notes: { notes: ModelNote[] }[] = Array.from({ length: graph.staffCount }, () => ({ notes: [] }));
  const tempos: TempoModel[] = [];
  const marks: Record<string, number> = {};
  const lines: string[] = [`[staves "${graph.staffLayoutCode}"]`, `[title "${title}"]`, ''];
  let prev: MeasureSolution | undefined;

  for (const m of solution.measures) {
    const blocks: string[] = [];
    let first = true;
    let firstLine = true;
    for (const part of parts) {
      const voiceLines: string[] = [];
      for (const [localIndex, staff] of part.entries()) {
        const mids = m.midClefs.filter(c => c.staff === staff);
        const after = (v: VoiceLine) => mids.length ? v.items.filter(it => it.event && it.event.x > mids[0].x).length : 0;
        // the voice that continues past a mid-measure clef is written last (see below)
        const voices = m.voices.filter(v => v.staff === staff).map((v, i) => ({ v, i })).sort((a, b) => after(a.v) - after(b.v) || a.i - b.i).map(x => x.v);
        voices.forEach((voice, vi) => {
          const tokens: string[] = [];
          if (part.length > 1) tokens.push(`\\staff "${localIndex + 1}"`);
          if (first) {
            if (!prev || prev.key !== m.key) tokens.push(`\\key ${KEY_NAMES[m.key] || 'c'} \\major`);
            if (!prev && m.time.hidden) tokens.push('\\omit Score.TimeSignature');
            if (!prev || prev.time.num !== m.time.num || prev.time.den !== m.time.den || prev.time.symbol !== m.time.symbol) {
              // Verovio draws 4/4 and 2/2 as C and ¢ unless told otherwise; follow the source glyph
              if (m.time.symbol) tokens.push('\\defaultTimeSignature');
              else if (!prev || prev.time.symbol) tokens.push('\\numericTimeSignature');
              tokens.push(`\\time ${m.time.num}/${m.time.den}`);
            }
            if (m.partial) {
              const p = single(m.duration);
              if (p) tokens.push(`\\partial ${p}`); else problems.push(`measure ${m.index + 1}: pickup ${str(m.duration)} not expressible`);
            }
            first = false;
          }
          if (vi === 0 && m.clefs[staff] && (!prev || prev.clefs[staff] !== m.clefs[staff] || prev.midClefs.some(c => c.staff === staff)))
            tokens.push(`\\clef "${m.clefs[staff]}"`);
          if (voices.length > 1) tokens.push(voice.stem === 'down' ? '\\stemDown' : '\\stemUp');
          // a mid-measure clef goes on the staff's last voice: Lilylet carries clef state from one voice
          // into the next, so earlier voices must not see it
          const ts = firstLine ? m.tempos : [];
          firstLine = false;
          for (const t of ts) tempos.push({ text: t.text, beat: t.bpm ? t.beat : undefined, bpm: t.bpm });
          tokens.push(...voiceTokens(voice, vi === voices.length - 1 ? m.midClefs.filter(c => c.staff === staff) : [], m, staff, notes, problems, ts, marks));
          voiceLines.push(tokens.join(' '));
        });
      }
      blocks.push(voiceLines.join(' \\\\\n'));
    }
    lines.push(`${blocks.join(' \\\\\\\n')} | %${m.index + 1}`, '');
    prev = m;
  }
  return { code: lines.join('\n'), notes, tempos, marks, problems };
}

function voiceTokens(voice: VoiceLine, midClefs: { x: number; clef: string }[], m: MeasureSolution, staff: number,
  notes: { notes: ModelNote[] }[], problems: string[], tempos: TempoNode[] = [], markCounts: Record<string, number> = {}): string[] {
  const out: string[] = [];
  const temposLeft = [...tempos];
  let ref = 28; // each source line restarts at middle C
  const clefsLeft = [...midClefs].sort((a, b) => a.x - b.x);
  const staffMid = m.midClefs.filter(c => c.staff === staff).sort((a, b) => a.x - b.x);
  const label = (x: number) => (h: Head) => pitchLabel(h, [...staffMid].reverse().find(c => c.x < x)?.clef ?? m.clefs[staff]);
  const pitch = (h: Head) => {
    const dn = h.dn!;
    const placed = dn - 7 * Math.round((dn - ref) / 7);
    const marks = (dn - placed) / 7;
    ref = dn;
    return STEP_NAMES[((dn % 7) + 7) % 7] + ACC(h.alter || 0) + (marks > 0 ? "'".repeat(marks) : ','.repeat(-marks));
  };
  const chordText = (e: EventNode, duration: string, withMarks = true) => {
    const heads = [...e.heads].sort((a, b) => a.dn! - b.dn!);
    if (heads.some(h => h.dn === undefined)) { problems.push(`measure ${m.index + 1}: unpitched chord`); return `r${duration}`; }
    const first = heads[0].dn!;
    const body = heads.length === 1 ? pitch(heads[0]) : `<${heads.map(pitch).join(' ')}>`;
    ref = first;
    const strokes = e.strokes && !e.grace ? (markCounts['tremolo-single'] = (markCounts['tremolo-single'] || 0) + 1, `:${2 ** (2 + e.strokes)}`) : '';
    return body + duration + strokes + (withMarks ? markText(e) : '') + (e.heads.some(h => h.tieStart) ? '~' : '');
  };
  const markText = (e: EventNode) => (e.marks || []).map(k => { markCounts[k] = (markCounts[k] || 0) + 1; return MARK_TOKEN[k]; }).join('');
  const items = voice.items;
  // beam marks: maximal runs of the same beam group within this voice
  const beamMark = new Map<number, string>();
  for (let i = 0; i < items.length; i++) {
    const g = items[i].event?.beamGroup;
    if (g === undefined || items[i].event?.kind !== 'chord') continue;
    let j = i;
    while (j + 1 < items.length && items[j + 1].event?.beamGroup === g) j++;
    if (j > i) { beamMark.set(i, '['); beamMark.set(j, ']'); }
    i = j;
  }
  let i = 0;
  while (i < items.length) {
    const it = items[i];
    const tuplet = it.event?.tuplet;
    if (tuplet !== undefined && it.event && !eq(it.duration, noteValueOf(it.event))) {
      // wrap the run of this tuplet
      let j = i;
      while (j + 1 < items.length && items[j + 1].event?.tuplet === tuplet) j++;
      const ratio = frac(it.duration[0] * noteValueOf(it.event)[1], it.duration[1] * noteValueOf(it.event)[0]);
      const inner: string[] = [];
      for (let k = i; k <= j; k++) inner.push(...itemTokens(items[k], k));
      out.push(`\\tuplet ${ratio[1]}/${ratio[0]} { ${inner.join(' ')} }`);
      i = j + 1;
      continue;
    }
    out.push(...itemTokens(it, i));
    i++;
  }
  for (const t of temposLeft.splice(0)) out.push(tempoToken(t));
  return out;

  function itemTokens(it: Placed, index: number): string[] {
    const tokens: string[] = [];
    const e = it.event;
    while (clefsLeft.length && e && clefsLeft[0].x < e.x) tokens.push(`\\clef "${clefsLeft.shift()!.clef}"`);
    // a tempo mark starts slightly left of its note: it precedes the first event that is not clearly before it
    while (temposLeft.length && (index === 0 || (e && e.right >= temposLeft[0].x))) tokens.push(tempoToken(temposLeft.shift()!));
    const onsetQ = mul(it.onset, frac(4));
    if (it.graces.length) {
      const graceTokens = it.graces.map(g => {
        for (const h of g.heads) if (h.dn !== undefined) notes[staff].notes.push([m.index, str(onsetQ), [label(g.x)(h)], '0', true]);
        return chordText(g, durationToken(Math.max(g.division, 3), 0)).replace(/~$/, '');
      });
      // the dump records grace pitches per chord; keep chords together
      fixGraceNotes(notes[staff].notes, it.graces, m.index, str(onsetQ), label);
      tokens.push(`\\grace { ${graceTokens.join(' ')} }`);
    }
    if (!e) { tokens.push(...spacers(it.duration, problems)); return tokens; }
    if (e.tremolo) {
      // each written note shows the whole value; they alternate in notes of 2+bars flags
      const division = 2 + e.tremolo.bars;
      const unit = frac(1, 2 ** division);
      const count = mul(it.duration, frac(unit[1], 2 * unit[0]));
      if (count[1] === 1 && count[0] >= 1) {
        const half = str(mul(it.duration, frac(2)));
        const a = chordText(e, String(2 ** division)), b = chordText(e.tremolo.partner, String(2 ** division));
        tokens.push(`\\repeat tremolo ${count[0]} { ${a.replace(/~$/, '')} ${b.replace(/~$/, '')} }`);
        notes[staff].notes.push([m.index, str(onsetQ), e.heads.map(label(e.x)).sort(), half, false]);
        notes[staff].notes.push([m.index, str(add(onsetQ, mul(it.duration, frac(2)))), e.tremolo.partner.heads.map(label(e.x)).sort(), half, false]);
        return tokens;
      }
      problems.push(`measure ${m.index + 1}: tremolo count ${str(count)} not integral`);
    }
    const written = e.fullMeasure ? (single(m.duration) || '1') : durationToken(e.division, e.dots);
    if (e.kind === 'rest') {
      const fermata = e.marks?.includes('fermata') ? (markCounts.fermata = (markCounts.fermata || 0) + 1, '\\fermata') : '';
      tokens.push((e.fullMeasure ? 'R' : 'r') + written + fermata);
    }
    else {
      tokens.push(chordText(e, written) + (beamMark.get(index) || ''));
      notes[staff].notes.push([m.index, str(onsetQ), e.heads.map(label(e.x)).sort(), str(mul(it.duration, frac(4))), false]);
    }
    return tokens;
  }
}

/** Replace per-head grace entries by one entry per grace chord (dumpNotes groups chord pitches). */
function fixGraceNotes(list: ModelNote[], graces: EventNode[], mi: number, onset: string, label: (x: number) => (h: Head) => string) {
  const count = graces.reduce((n, g) => n + g.heads.filter(h => h.dn !== undefined).length, 0);
  list.splice(list.length - count, count, ...graces.map(g => [mi, onset, g.heads.map(label(g.x)).sort(), '0', true] as ModelNote));
}

function noteValueOf(e: EventNode): Frac {
  let base: Frac = e.division < 0 ? frac(2) : frac(1, 2 ** e.division), total = base;
  for (let i = 0; i < e.dots; i++) { base = mul(base, frac(1, 2)); total = add(total, base); }
  return total;
}

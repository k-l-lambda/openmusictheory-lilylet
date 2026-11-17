// Voices and onsets per measure, with the regulation-annotation discipline:
// prefer the simplest voicing the glyphs allow, align simultaneous events by
// their engraved columns (MuseScore places one onset at one x per system), and
// report what does not add up instead of forcing a fit.
import { add, cmp, div, eq, frac, isPow2, mul, noteValue, str, sub, ZERO, type Frac } from './frac.js';
import type { Diagnostic, EventNode, ScoreGraph, SystemNode, TempoNode, TupletNode } from './notation.js';
import type { ClefKind } from './glyphs.js';

export type Placed = { event?: EventNode; onset: Frac; duration: Frac; graces: EventNode[] };
export type VoiceLine = { staff: number; stem?: 'up' | 'down'; items: Placed[] };
export type TimeSig = { num: number; den: number; inferred: boolean; hidden: boolean; symbol?: 'common' | 'cut' };
export type MeasureFlag =
  | 'surplusTime' | 'tickOverlapped' | 'columnConflict' | 'columnTwist' | 'tupletUncertain' | 'tooManyVoices'
  | 'shortMeasure' | 'unknownDuration' | 'irregularTuplet' | 'voiceGap';
export type MeasureSolution = {
  index: number; system: number; systemMeasure: number;
  duration: Frac; time: TimeSig; partial: boolean;
  key: number;
  clefs: (ClefKind | undefined)[]; // in force at measure start, per staff
  midClefs: { staff: number; x: number; clef: ClefKind }[];
  tempos: TempoNode[];
  voices: VoiceLine[];
  flags: MeasureFlag[];
  notes: string[];
  fine: boolean;
};
export type Solution = { measures: MeasureSolution[]; diagnostics: Diagnostic[] };

const COLUMN_TOLERANCE = 0.6; // staff spaces

function cluster<T>(items: T[], x: (t: T) => number, tol: number): T[][] {
  const sorted = [...items].sort((a, b) => x(a) - x(b));
  const out: T[][] = [];
  for (const it of sorted) {
    const last = out[out.length - 1];
    if (last && x(it) - x(last[last.length - 1]) <= tol) last.push(it); else out.push([it]);
  }
  return out;
}

/** Tuplet ratio (actual/written) from the printed number, or inferred from member values. */
function tupletRatio(t: TupletNode, members: EventNode[]): { ratio: Frac; certain: boolean } {
  let n = t.number;
  let certain = n !== undefined;
  if (n === undefined) {
    const values = members.map(e => noteValue(e.division, e.dots));
    const unit = values.reduce((m, v) => (cmp(v, m) < 0 ? v : m), values[0]);
    const total = values.reduce((s, v) => add(s, v), ZERO);
    const k = div(total, unit);
    n = k[1] === 1 && k[0] >= 3 && !isPow2(k[0]) ? k[0] : 3;
    certain = k[1] === 1 && k[0] === n;
  }
  let m = 1;
  while (m * 2 < n) m *= 2;
  if (n === 2) m = 3; // duplet in compound time
  return { ratio: frac(m, n), certain };
}

const timeFromDuration = (d: Frac): { num: number; den: number } => {
  for (const den of [4, 8, 16, 32]) {
    const num = mul(d, frac(den));
    if (num[1] === 1) return { num: num[0], den };
  }
  return { num: 4, den: 4 };
};

export function solveTiming(graph: ScoreGraph): Solution {
  const diagnostics: Diagnostic[] = [];
  const measures: MeasureSolution[] = [];
  const sp = graph.systems[0].layout.spacing;
  let time: TimeSig | undefined;
  let key = 0;
  const clefs: (ClefKind | undefined)[] = Array(graph.staffCount).fill(undefined);
  const pendingClefs: { staff: number; clef: ClefKind }[] = [];
  const sourceHasTime = graph.systems.some(s => s.staves.some(st => st.times.length));

  for (const system of graph.systems) {
    const tuplets = new Map(system.tuplets.map(t => [t.id, t]));
    system.measures.forEach((bounds, mi) => {
      const index = measures.length;
      const flags = new Set<MeasureFlag>();
      const notes: string[] = [];
      // ---- contexts in force at the measure start
      const midClefs: MeasureSolution['midClefs'] = [];
      system.staves.forEach((ctx, si) => {
        const staffEvents = system.events.filter(e => e.staff === si && e.measure === mi && !e.grace).sort((a, b) => a.x - b.x);
        const first = staffEvents[0]?.x ?? bounds.right, last = staffEvents[staffEvents.length - 1]?.x ?? -Infinity;
        for (const c of ctx.clefs) {
          const inMeasure = c.x < bounds.right && (mi === 0 || c.x >= bounds.left);
          if (!inMeasure) continue;
          if (c.x < first) clefs[si] = c.value;
          else if (c.x < last) midClefs.push({ staff: si, x: c.x, clef: c.value });
          else pendingClefs.push({ staff: si, clef: c.value }); // courtesy clef before the barline: next measure
        }
      });
      const startClefs = [...clefs];
      for (const m of midClefs) clefs[m.staff] = m.clef;
      for (const p of pendingClefs.splice(0)) clefs[p.staff] = p.clef;
      const keyHere = system.staves[0]?.keys.filter(k => k.x < bounds.right && (mi === 0 || k.x >= bounds.left));
      if (keyHere?.length) key = keyHere[keyHere.length - 1].value;
      const timeHere = system.staves.map(s => s.times.find(t => t.x < bounds.right && (mi === 0 ? true : t.x >= bounds.left))).find(Boolean);
      let timeFromGlyph: { num?: number; den?: number } | undefined;
      if (timeHere && (mi === 0 ? true : timeHere.x >= bounds.left)) timeFromGlyph = timeHere.value;

      // ---- events and durations
      const events = system.events.filter(e => e.measure === mi);
      const main = events.filter(e => !e.grace && !e.absorbed);
      const ratioOf = new Map<number, Frac>();
      for (const t of system.tuplets) {
        const members = main.filter(e => e.tuplet === t.id);
        if (!members.length) continue;
        const { ratio, certain } = tupletRatio(t, members);
        if (!certain) flags.add('tupletUncertain');
        for (const e of members) ratioOf.set(e.id, ratio);
      }
      const value = (e: EventNode) => {
        const v = noteValue(e.division, e.dots);
        return ratioOf.has(e.id) ? mul(v, ratioOf.get(e.id)!) : v;
      };

      // ---- voices per staff
      type Draft = { staff: number; stem?: 'up' | 'down'; events: EventNode[] };
      const drafts: Draft[] = [];
      for (let si = 0; si < graph.staffCount; si++) {
        const staffEvents = main.filter(e => e.staff === si);
        // a lone whole rest in a staff is a full-measure rest
        if (staffEvents.length === 1 && staffEvents[0].kind === 'rest' && staffEvents[0].division === 0) staffEvents[0].fullMeasure = true;
        const columns = cluster(staffEvents, e => e.x, COLUMN_TOLERANCE * sp);
        const poly = columns.some(c => c.length > 1);
        if (!poly) { drafts.push({ staff: si, events: staffEvents }); continue; }
        const upper: EventNode[] = [], lower: EventNode[] = [];
        const centerPos = (e: EventNode) => e.kind === 'rest' ? -(e.restY || 0) * 2 : e.heads.reduce((s, h) => s + h.pos, 0) / e.heads.length;
        for (const column of columns) {
          if (column.length > 2) flags.add('tooManyVoices');
          for (const e of column) {
            const others = column.filter(o => o !== e);
            if (e.stem && others.length && others.every(o => !o.stem || o.stem.dir !== e.stem!.dir)) {
              (e.stem.dir === 'up' ? upper : lower).push(e);
            } else if (others.length) {
              (others.every(o => centerPos(o) <= centerPos(e)) ? upper : lower).push(e);
            } else if (e.stem) {
              (e.stem.dir === 'up' ? upper : lower).push(e);
            } else if (e.kind === 'rest' && Math.abs(e.restY || 0) > 0.6) {
              ((e.restY || 0) < 0 ? upper : lower).push(e);
            } else {
              // fill the voice that is behind at this point
              const sum = (vs: EventNode[]) => vs.filter(v => v.x < e.x).reduce((s, v) => add(s, value(v)), ZERO);
              (cmp(sum(upper), sum(lower)) <= 0 ? upper : lower).push(e);
            }
          }
        }
        upper.sort((a, b) => a.x - b.x); lower.sort((a, b) => a.x - b.x);
        drafts.push({ staff: si, stem: 'up', events: upper }, { staff: si, stem: 'down', events: lower });
      }

      // ---- measure duration
      const sums = drafts.map(d => d.events.filter(e => !e.fullMeasure).reduce((s, e) => add(s, value(e)), ZERO));
      const maxSum = sums.reduce((m, s) => (cmp(s, m) > 0 ? s : m), ZERO);
      let duration: Frac;
      let partial = false;
      if (timeFromGlyph?.num && timeFromGlyph?.den) time = { num: timeFromGlyph.num, den: timeFromGlyph.den, inferred: false, hidden: false, symbol: (timeFromGlyph as { symbol?: 'common' | 'cut' }).symbol };
      else if (timeFromGlyph) {
        // signature drawn but digits (partly) unknown: complete it from the content
        const content = eq(maxSum, ZERO) ? frac(1) : maxSum;
        let t = timeFromDuration(content);
        if (timeFromGlyph.den) { const n = mul(content, frac(timeFromGlyph.den)); if (n[1] === 1) t = { num: n[0], den: timeFromGlyph.den }; }
        else if (timeFromGlyph.num) { const d = mul(frac(1), frac(timeFromGlyph.num * content[1], content[0])); if (d[1] === 1 && isPow2(d[0])) t = { num: timeFromGlyph.num, den: d[0] }; }
        time = { ...t, inferred: true, hidden: false };
        notes.push(`time signature digits not recognized; ${t.num}/${t.den} inferred from content`);
      }
      if (!time || (time.inferred && !timeFromGlyph && time.hidden)) {
        const t = timeFromDuration(eq(maxSum, ZERO) ? frac(1) : maxSum);
        time = { ...t, inferred: true, hidden: !sourceHasTime };
      }
      const sig = frac(time.num, time.den);
      duration = sig;
      if (cmp(maxSum, sig) > 0) {
        if (time.inferred && time.hidden) { time = { ...timeFromDuration(maxSum), inferred: true, hidden: true }; duration = maxSum; }
        else flags.add('surplusTime');
      } else if (cmp(maxSum, sig) < 0 && cmp(maxSum, ZERO) > 0) {
        if (index === 0) { partial = true; duration = maxSum; }
        else if (time.hidden) { time = { ...timeFromDuration(maxSum), inferred: true, hidden: true }; duration = maxSum; }
        else flags.add('shortMeasure');
      }

      // ---- column onsets from complete voices, then place incomplete voices on them
      const columnOf = new Map<number, number>();
      cluster(main.filter(e => !e.fullMeasure), e => e.x, COLUMN_TOLERANCE * sp).forEach((c, ci) => c.forEach(e => columnOf.set(e.id, ci)));
      const columnOnset = new Map<number, Frac>();
      const sequential = (evs: EventNode[]) => {
        let t = ZERO;
        return evs.map(e => { const p = { e, onset: t }; t = add(t, value(e)); return p; });
      };
      drafts.forEach((d, di) => {
        if (!eq(sums[di], duration) || d.events.some(e => e.fullMeasure)) return;
        for (const { e, onset } of sequential(d.events)) {
          const c = columnOf.get(e.id)!;
          const known = columnOnset.get(c);
          if (known && !eq(known, onset)) flags.add('columnConflict');
          else columnOnset.set(c, onset);
        }
      });
      const voices: VoiceLine[] = drafts.map(d => {
        const items: Placed[] = [];
        let cursor = ZERO;
        const push = (onset: Frac, dur: Frac, event?: EventNode) => { items.push({ event, onset, duration: dur, graces: [] }); };
        if (d.events.length === 1 && d.events[0].fullMeasure) {
          push(ZERO, duration, d.events[0]);
          return { staff: d.staff, stem: d.stem, items };
        }
        for (const [k, e] of d.events.entries()) {
          const target = columnOnset.get(columnOf.get(e.id)!);
          if (target && cmp(target, cursor) > 0) {
            const gap = sub(target, cursor);
            const prev = k > 0 ? items[items.length - 1] : undefined;
            const p = prev?.event;
            if (p && p.kind === 'chord' && p.stem && p.division === 2 && p.heads.some(h => h.color && h.filled) && eq(gap, prev!.duration)) {
              // highlighted (coloured) heads drawn filled on a half-note stem: the gap is the missing half
              p.division = 1;
              prev!.duration = add(prev!.duration, gap);
              notes.push(`coloured filled head read as a half note (${str(gap)} gap)`);
            } else {
              // a gap after a note inside a voice usually means that note's value was misread
              if (k > 0) flags.add('voiceGap');
              push(cursor, gap);
            }
            cursor = target;
          }
          else if (target && cmp(target, cursor) < 0) flags.add('tickOverlapped');
          push(cursor, value(e), e);
          cursor = add(cursor, value(e));
        }
        if (cmp(cursor, duration) < 0) push(cursor, sub(duration, cursor));
        else if (cmp(cursor, duration) > 0) flags.add('surplusTime');
        return { staff: d.staff, stem: d.stem, items };
      });
      // column twist: an event not at its column's onset
      for (const v of voices) for (const it of v.items) {
        if (!it.event || it.event.fullMeasure) continue;
        const known = columnOnset.get(columnOf.get(it.event.id)!);
        if (known && !eq(known, it.onset)) flags.add('columnTwist');
      }
      // grace notes go before the next main event of their staff (by x)
      for (const g of events.filter(e => e.grace)) {
        const v = voices.filter(v => v.staff === g.staff).flatMap(v => v.items).filter(it => it.event && it.event.x > g.x)
          .sort((a, b) => a.event!.x - b.event!.x)[0];
        if (v) v.graces.push(g);
        else notes.push('grace note without a following main note dropped');
      }
      for (const e of main) if (e.kind === 'chord' && e.heads.some(h => h.dn === undefined)) flags.add('unknownDuration');
      if (graph.staffCount && voices.length === 0) notes.push('empty measure');

      const fine = ![...flags].some(f => f !== 'columnTwist');
      const tempos = graph.tempos.filter(t => t.system === system.index && t.x < bounds.right && (mi === 0 || t.x >= bounds.left)).sort((a, b) => a.x - b.x);
      measures.push({ index, system: system.index, systemMeasure: mi, duration, time: { ...time }, partial, key, clefs: startClefs, midClefs, tempos,
        voices, flags: [...flags], notes, fine });
      for (const f of flags) diagnostics.push({ severity: 'warning', code: `measure-${f}`, message: `measure ${index + 1}: ${f}`, system: system.index, measure: index });
      void str;
    });
  }
  return { measures, diagnostics };
}

export type { SystemNode };

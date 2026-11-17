// Deterministic checks of a generated Lilylet draft (cf. scripts/v2/scores/convert.ts and
// the regulation skill's tick validation): parse without warnings, encode MEI, and
// parse the text back into notes that must equal the event model it was written from.
// A pass proves faithful serialization of the model, NOT fidelity to the source image.
import * as lilylet from '../../../lilylet/source/lilylet/index.ts';
import { dumpNotes } from '../v2/scores/dump-notes.ts';
import type { ModelNote, TempoModel } from './lilyletWriter.js';

export type CheckResult = {
  ok: boolean;
  parseError?: string;
  warnings: string[];
  meiError?: string;
  /** Per-staff note mismatches between the written model and the reparsed text. */
  mismatches: string[];
  measures: number;
};

const key = (n: ModelNote | any[]) => JSON.stringify([n[0], n[1], [...n[2]].sort(), n[3], !!n[4]]);

const DIV: Record<string, number> = { '1': 1, '2': 2, '4': 4, '8': 8, '16': 16 };

/** Tempo contexts and articulation/ornament marks of a parsed doc, in document order / as counts. */
function marksOf(doc: any): { tempos: string[]; marks: Record<string, number> } {
  const tempos: string[] = [];
  const marks: Record<string, number> = {};
  const walk = (events: any[]) => events.forEach(e => {
    if (e.events) walk(e.events);
    if (e.type === 'context' && e.tempo) {
      const t = e.tempo;
      tempos.push(JSON.stringify([t.text ?? null, t.bpm ? `${t.beat.division}${'.'.repeat(t.beat.dots || 0)}` : null, t.bpm ?? null]));
    }
    for (const m of [...(e.marks || []), ...(e.marksA || []), ...(e.marksB || [])]) if (m.markType === 'articulation' || m.markType === 'ornament') marks[m.type] = (marks[m.type] || 0) + 1;
    if (e.type === 'note' && e.tremolo) marks['tremolo-single'] = (marks['tremolo-single'] || 0) + 1;
  });
  doc.measures.forEach((m: any) => m.parts.forEach((p: any) => p.voices.forEach((v: any) => walk(v.events))));
  return { tempos, marks };
}

export function checkLilylet(code: string, model: { notes: ModelNote[] }[], expected: { tempos?: TempoModel[]; marks?: Record<string, number> } = {}): CheckResult {
  const result: CheckResult = { ok: false, warnings: [], mismatches: [], measures: 0 };
  let doc: any;
  try {
    doc = lilylet.parseCode(code);
  } catch (e: any) {
    result.parseError = String(e?.message || e).split('\n').slice(0, 3).join(' / ');
    return result;
  }
  result.warnings = (lilylet.getParseWarnings?.() || []).map((w: any) => `${w.type}: ${w.message}`);
  result.measures = doc.measures.length;
  try { lilylet.meiEncoder.encode(doc); } catch (e: any) { result.meiError = String(e?.message || e); }
  const parsed = dumpNotes(doc);
  const staves = Math.max(parsed.length, model.length);
  for (let s = 0; s < staves; s++) {
    const want = new Map<string, number>();
    for (const n of model[s]?.notes || []) want.set(key(n), (want.get(key(n)) || 0) + 1);
    for (const n of parsed[s]?.notes || []) {
      const k = key(n);
      const c = want.get(k) || 0;
      if (c) want.set(k, c - 1); else result.mismatches.push(`staff ${s + 1}: unexpected ${k}`);
    }
    for (const [k, c] of want) if (c > 0) result.mismatches.push(`staff ${s + 1}: missing ${k}${c > 1 ? ` x${c}` : ''}`);
  }
  const got = marksOf(doc);
  const wantTempos = (expected.tempos || []).map(t => JSON.stringify([t.text ?? null, t.bpm ? String(DIV[t.beat!.replace('.', '')]) + (t.beat!.endsWith('.') ? '.' : '') : null, t.bpm ?? null]));
  if (JSON.stringify(got.tempos) !== JSON.stringify(wantTempos)) result.mismatches.push(`tempos: wrote ${wantTempos.join(' ')} parsed ${got.tempos.join(' ')}`);
  for (const k of new Set([...Object.keys(got.marks), ...Object.keys(expected.marks || {})]))
    if ((got.marks[k] || 0) !== ((expected.marks || {})[k] || 0)) result.mismatches.push(`marks: ${k} wrote ${(expected.marks || {})[k] || 0} parsed ${got.marks[k] || 0}`);
  result.ok = !result.parseError && !result.meiError && !result.warnings.length && !result.mismatches.length;
  return result;
}

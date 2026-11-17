// MuseScore SVG → Lilylet through the explicit event graph (default engine).
// Output is an automatic draft plus a quality report; neither proves fidelity.
import { buildScoreGraph, type Diagnostic } from './notation.js';
import { solveTiming, type MeasureFlag } from './timing.js';
import { writeLilylet } from './lilyletWriter.js';
import { checkLilylet, type CheckResult } from './checkLilylet.js';

export const ENGINE_VERSION = 'event-graph/2';
export const ENGINE_FILES = ['geometry.ts', 'parser.ts', 'layout.ts', 'glyphs.ts', 'frac.ts', 'notation.ts', 'timing.ts', 'lilyletWriter.ts', 'checkLilylet.ts', 'convert.ts', 'svg-to-lilylet.ts', 'text.ts'];

export type QualityReport = {
  engine: string;
  systems: number;
  staves: number;
  measures: number;
  fineMeasures: number;
  events: number;
  marks: Record<string, number>;
  tempos: string[];
  graceEvents: number;
  flags: Partial<Record<MeasureFlag, number>>;
  diagnostics: Record<string, number>;
  unrepresented: Record<string, number>;
  check: CheckResult;
  /** draft-quality: all measures fine and round-trip clean; still requires visual review. */
  grade: 'consistent' | 'flagged' | 'broken';
};

export type Conversion = { code: string; report: QualityReport; diagnostics: Diagnostic[] };

export function convertSvg(xml: string): Conversion {
  const graph = buildScoreGraph(xml);
  const solution = solveTiming(graph);
  const written = writeLilylet(graph, solution);
  const check = checkLilylet(written.code, written.notes, { tempos: written.tempos, marks: written.marks });
  const diagnostics = [...graph.diagnostics, ...solution.diagnostics,
    ...written.problems.map(message => ({ severity: 'warning' as const, code: 'writer', message }))];
  const flags: QualityReport['flags'] = {};
  for (const m of solution.measures) for (const f of m.flags) flags[f] = (flags[f] || 0) + 1;
  const codes: Record<string, number> = {};
  for (const d of diagnostics) codes[d.code] = (codes[d.code] || 0) + 1;
  const events = graph.systems.flatMap(s => s.events);
  const fineMeasures = solution.measures.filter(m => m.fine).length;
  const report: QualityReport = {
    engine: ENGINE_VERSION,
    systems: graph.systems.length,
    staves: graph.staffCount,
    measures: solution.measures.length,
    fineMeasures,
    events: events.filter(e => !e.grace).length,
    marks: written.marks,
    tempos: written.tempos.map(t => [t.text, t.bpm ? `${t.beat}=${t.bpm}` : ''].filter(Boolean).join(' ')),
    graceEvents: events.filter(e => e.grace).length,
    flags,
    diagnostics: codes,
    unrepresented: graph.unrepresented,
    check,
    grade: !check.ok ? 'broken' : fineMeasures === solution.measures.length && !codes['unknown-notehead'] && !codes['unknown-rest'] ? 'consistent' : 'flagged',
  };
  return { code: written.code, report, diagnostics };
}

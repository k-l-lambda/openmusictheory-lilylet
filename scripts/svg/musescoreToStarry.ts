import { parseMuseScoreSvg, type SvgElement, type SvgPage } from './parser.js';
import { recoverLayout, type StaffGeometry, type SystemGeometry } from './layout.js';
import { center, type Bounds } from './geometry.js';

export type SvgDiagnostic = {
  severity: 'info' | 'warning' | 'error';
  code: string;
  message: string;
  sourceIndex?: number;
};

export type SvgStarryResult = {
  scoreData: Record<string, unknown>;
  diagnostics: SvgDiagnostic[];
};

type Point = {
  x: number;
  y: number;
  semantic: string;
  confidence?: number;
  extension?: { y1?: number; y2?: number };
  id?: string;
};

const SEM = {
  bar: 'vline_BarMeasure',
  clefG: 'ClefG',
  clefF: 'ClefF',
  clefC: 'ClefC',
  timeFour: 'TimesigFour',
  note0: 'NoteheadS0',
  note1: 'NoteheadS1',
  note2: 'NoteheadS2',
  stem: 'vline_Stem',
  rest1: 'Rest1',
  dot: 'Dot',
  sharp: 'AccSharp',
  flat: 'AccFlat',
  natural: 'AccNatural',
} as const;

const finite = (n: number): boolean => Number.isFinite(n);
const bWidth = (b: Bounds) => b.right - b.left;
const bHeight = (b: Bounds) => b.bottom - b.top;
const bArea = (b: Bounds) => bWidth(b) * bHeight(b);
const near = (a: number, b: number, tolerance: number) => Math.abs(a - b) <= tolerance;

function systemForY(systems: SystemGeometry[], y: number, spacing: number): SystemGeometry | undefined {
  return systems.find((s) => y >= s.top - 2 * spacing && y <= s.bottom + 2 * spacing);
}

function staffForY(system: SystemGeometry, y: number, spacing: number): { staff: StaffGeometry; index: number } | undefined {
  let best: { staff: StaffGeometry; index: number; distance: number } | undefined;
  system.staves.forEach((staff, index) => {
    const distance = Math.abs(y - staff.middle);
    if (!best || distance < best.distance) best = { staff, index, distance };
  });
  return best && best.distance <= 3.5 * spacing ? best : undefined;
}

function pointForStaff(
  semantic: string,
  bounds: Bounds,
  system: SystemGeometry,
  staff: StaffGeometry,
  spacing: number,
  extra: Partial<Point> = {}
): Point {
  const c = center(bounds);
  return {
    semantic,
    x: (c.x - system.left) / spacing,
    y: (c.y - staff.middle) / spacing,
    ...extra,
  };
}

/**
 * Return one representative contour per notehead. MuseScore commonly emits a
 * filled outer contour and an inner counter for the same notehead; neither the
 * counter nor every `M` command is an independent musical event.
 */
function noteheadBounds(element: SvgElement, spacing: number): Bounds[] {
  const candidates = element.subpaths
    .map((subpath) => subpath.bounds)
    .filter((b) => bWidth(b) >= spacing * 0.65 && bHeight(b) >= spacing * 0.35)
    .sort((a, b) => bArea(b) - bArea(a));
  const selected: Bounds[] = [];
  for (const candidate of candidates) {
    const c = center(candidate);
    if (
      selected.some((chosen) => {
        const cc = center(chosen);
        return Math.abs(c.x - cc.x) < spacing * 0.72 && Math.abs(c.y - cc.y) < spacing * 0.55;
      })
    ) continue;
    selected.push(candidate);
  }
  return selected.sort((a, b) => center(a).x - center(b).x || center(a).y - center(b).y);
}

function verticalComponents(element: SvgElement, spacing: number): Bounds[] {
  return element.subpaths
    .map((s) => s.bounds)
    .filter((b) => bHeight(b) >= spacing * 1.3 && bWidth(b) <= spacing * 0.25)
    .sort((a, b) => center(a).x - center(b).x || center(a).y - center(b).y);
}

function largestContourInStaff(element: SvgElement, staff: StaffGeometry, spacing: number): Bounds | undefined {
  return element.subpaths
    .map((s) => s.bounds)
    .filter((b) => {
      const c = center(b);
      return Math.abs(c.y - staff.middle) < 3.5 * spacing;
    })
    .sort((a, b) => bArea(b) - bArea(a))[0];
}

function clefSemantic(bounds: Bounds, spacing: number): string {
  // MuseScore's G clef is substantially taller than its F/C clefs. This is
  // deliberately a conservative subtype heuristic; ambiguous glyphs remain
  // diagnostics rather than being silently treated as G.
  const h = bHeight(bounds) / spacing;
  if (h >= 5.2) return SEM.clefG;
  if (h >= 2.5) return SEM.clefF;
  return SEM.clefC;
}

function addId(point: Point, source: string, n: number): Point {
  return { ...point, id: `svg-${source}-${n}` };
}

/**
 * Convert the deterministic part of a MuseScore SVG into Starry's score JSON.
 * This intentionally does not claim to recover durations, voices, text, or
 * exact pitch spelling from SVG geometry; those fields are reported as
 * diagnostics and can be filled by source notation or semantic OMR later.
 */
export function musescoreSvgToStarry(xml: string): SvgStarryResult {
  const page = parseMuseScoreSvg(xml);
  const systems = recoverLayout(page);
  const diagnostics: SvgDiagnostic[] = [];
  const scoreSystems: Record<string, unknown>[] = [];
  let pointId = 0;

  if (systems.length === 0) throw new Error('No systems recovered from SVG');

  systems.forEach((layout, systemIndex) => {
    const spacing = layout.spacing;
    const width = (layout.right - layout.left) / spacing;
    const systemSemantics: Point[] = [];
    const staffSemantics: Point[][] = layout.staves.map(() => []);

    // System-level bars must be present before Starry's System.assemble(); it
    // intentionally rebuilds measureBars from these points.
    layout.barXs.forEach((x, i) => {
      systemSemantics.push(
        addId(
          {
            semantic: SEM.bar,
            x: (x - layout.left) / spacing,
            y: (layout.top + layout.bottom) / 2 / spacing - layout.top / spacing,
            confidence: 1,
            extension: {
              y1: 0,
              y2: (layout.bottom - layout.top) / spacing,
            },
          },
          `bar-${systemIndex}`,
          i
        )
      );
    });

    const addStaffPoint = (staffIndex: number, point: Point, source: string) => {
      staffSemantics[staffIndex].push(addId(point, source, pointId++));
    };

    // Clefs: choose the largest contour near each staff. One MuseScore path
    // often contains all clefs on the page and several counter contours.
    const clefElements = page.elements.filter((e) => e.cls === 'Clef');
    for (const element of clefElements) {
      for (let staffIndex = 0; staffIndex < layout.staves.length; staffIndex++) {
        const staff = layout.staves[staffIndex];
        const contour = largestContourInStaff(element, staff, spacing);
        if (!contour) continue;
        addStaffPoint(staffIndex, pointForStaff(clefSemantic(contour, spacing), contour, layout, staff, spacing), 'clef');
      }
    }

    // TimeSig paths may have inner contours. Group contours by staff and emit
    // one numeric `4` point per staff; do not treat every contour as a digit.
    for (const element of page.elements.filter((e) => e.cls === 'TimeSig')) {
      const byStaff = new Map<number, Bounds[]>();
      for (const subpath of element.subpaths) {
        const info = staffForY(layout, center(subpath.bounds).y, spacing);
        if (!info) continue;
        const list = byStaff.get(info.index) || [];
        list.push(subpath.bounds);
        byStaff.set(info.index, list);
      }
      for (const [staffIndex, bounds] of byStaff) {
        const info = { staff: layout.staves[staffIndex], index: staffIndex };
        const box = bounds.reduce((acc, b) => ({
          left: Math.min(acc.left, b.left), top: Math.min(acc.top, b.top),
          right: Math.max(acc.right, b.right), bottom: Math.max(acc.bottom, b.bottom),
        }));
        addStaffPoint(staffIndex, pointForStaff(SEM.timeFour, box, layout, info.staff, spacing), 'timesig');
      }
    }

    const hasExplicitStem = page.elements.some((e) => e.cls === 'Stem');
    for (const element of page.elements.filter((e) => e.cls === 'Note')) {
      for (const bounds of noteheadBounds(element, spacing)) {
        const staffInfo = staffForY(layout, center(bounds).y, spacing);
        if (!staffInfo) continue;
        // An SVG note with explicit stems is normally a filled short notehead;
        // stemless hollow contours in the pilot are whole notes.
        const semantic = hasExplicitStem ? SEM.note1 : SEM.note0;
        addStaffPoint(staffInfo.index, pointForStaff(semantic, bounds, layout, staffInfo.staff, spacing), 'note');
      }
    }

    for (const element of page.elements.filter((e) => e.cls === 'Stem')) {
      for (const bounds of verticalComponents(element, spacing)) {
        const info = staffForY(layout, center(bounds).y, spacing);
        if (!info) continue;
        const c = center(bounds);
        addStaffPoint(info.index, {
          semantic: SEM.stem,
          x: (c.x - layout.left) / spacing,
          y: (c.y - info.staff.middle) / spacing,
          extension: {
            y1: (bounds.top - info.staff.middle) / spacing,
            y2: (bounds.bottom - info.staff.middle) / spacing,
          },
        }, 'stem');
      }
    }

    // These classes are deterministic but subtype/event identity is not yet
    // robust enough in SVG-only mode. Keep a visible audit trail.
    for (const element of page.elements) {
      if (['Harmony', 'Lyrics', 'StaffText', 'Text', 'InstrumentName'].includes(element.cls)) {
        diagnostics.push({ severity: 'warning', code: 'outlined-text', message: `${element.cls} text is outlined; content was not guessed`, sourceIndex: element.sourceIndex });
      }
    }
    if (page.elements.some((e) => e.cls === 'Note') && !page.elements.some((e) => e.cls === 'Stem')) {
      diagnostics.push({ severity: 'info', code: 'stemless-notes', message: 'No Stem class was exported; Note contours were emitted as whole-note candidates' });
    }
    diagnostics.push({ severity: 'warning', code: 'svg-timing', message: 'SVG geometry does not provide authoritative duration, onset, or voice information' });

    const staffData = layout.staves.map((staff, staffIndex) => ({
      __prototype: 'Staff',
      top: (staff.middle - layout.top) / spacing - 5,
      height: 10,
      staffY: 5,
      index: staffIndex,
      measureBars: layout.barXs.map((x) => (x - layout.left) / spacing),
      semantics: staffSemantics[staffIndex],
    }));

    scoreSystems.push({
      __prototype: 'System',
      left: (layout.left - page.viewBox.left) / spacing,
      top: (layout.top - page.viewBox.top) / spacing,
      width,
      measureCount: layout.barXs.length,
      measureBars: layout.barXs.map((x) => (x - layout.left) / spacing),
      semantics: systemSemantics,
      staves: staffData,
      headMeasureIndex: 0,
    });
  });

  const scoreData = {
    __prototype: 'Score',
    version: 14,
    title: 'MuseScore SVG import',
    pageSize: { width: page.width, height: page.height },
    unitSize: systems[0].spacing,
    staffLayoutCode: systems[0].staves.length === 2 ? '{-}' : Array(systems[0].staves.length).fill('').join(','),
    pages: [
      {
        __prototype: 'Page',
        width: page.width / systems[0].spacing,
        height: page.height / systems[0].spacing,
        systems: scoreSystems,
      },
    ],
    settings: {
      enabledGauge: false,
      pageLayoutMethod: 'ByLines',
      semanticConfidenceThreshold: 1,
    },
  };
  return { scoreData, diagnostics };
}
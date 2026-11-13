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
  timeZero: 'TimesigZero',
  timeOne: 'TimesigOne',
  timeTwo: 'TimesigTwo',
  timeThree: 'TimesigThree',
  timeFour: 'TimesigFour',
  timeFive: 'TimesigFive',
  timeSix: 'TimesigSix',
  timeSeven: 'TimesigSeven',
  timeEight: 'TimesigEight',
  timeNine: 'TimesigNine',
  note0: 'NoteheadS0',
  note1: 'NoteheadS1',
  note2: 'NoteheadS2',
  note1Up: 'NoteheadS1stemU',
  note1Down: 'NoteheadS1stemD',
  note2Up: 'NoteheadS2stemU',
  note2Down: 'NoteheadS2stemD',
  stem: 'vline_Stem',
  rest0: 'Rest0',
  rest1: 'Rest1',
  rest2: 'Rest2',
  rest3: 'Rest3',
  rest4: 'Rest4',
  rest5: 'Rest5',
  rest6: 'Rest6',
  dot: 'Dot',
  beamLeft: 'BeamLeft',
  beamContinue: 'BeamContinue',
  beamRight: 'BeamRight',
  flag3: 'Flag3',
  tremoloLeft: 'TremoloLeft',
  tremoloMiddle: 'TremoloMiddle',
  tremoloRight: 'TremoloRight',
  sharp: 'AccSharp',
  flat: 'AccFlat',
  natural: 'AccNatural',
  keyAcc: 'KeyAcc',
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

function timeDigit(bounds: Bounds, spacing: number): string | undefined {
  // These are the two MuseScore digit families observed in the corpus: the
  // narrow glyph is 3 and the wider glyph is 4. Refuse other widths rather
  // than silently turning an unknown time signature into 4/4.
  const width = bWidth(bounds) / spacing;
  const height = bHeight(bounds) / spacing;
  if (height < 1.5 || height > 2.5) return undefined;
  if (near(width, 1.40, 0.16)) return SEM.timeThree;
  if (near(width, 1.71, 0.16)) return SEM.timeFour;
  return undefined;
}

function restSemantic(bounds: Bounds, spacing: number, relativeY: number): string | undefined {
  const width = bWidth(bounds) / spacing;
  const height = bHeight(bounds) / spacing;
  // Whole/half rests are horizontal glyphs. Their vertical position is the
  // only reliable distinction available from a flattened SVG.
  if (height < 0.9 && width > 0.7) return relativeY < -0.45 ? SEM.rest0 : SEM.rest1;
  // Vertical rests are matched conservatively by normalized glyph height.
  if (height < 2.4 && width < 1.5) return SEM.rest2;
  if (height < 3.45 && width < 1.25) return SEM.rest3;
  if (height < 4.0 && width < 1.8) return SEM.rest4;
  if (height < 4.9 && width < 2.2) return SEM.rest5;
  if (height < 6.0 && width < 2.2) return SEM.rest6;
  return undefined;
}

function accidentalSemantic(commands: string, bounds: Bounds, spacing: number): string | undefined {
  const width = bWidth(bounds) / spacing;
  const height = bHeight(bounds) / spacing;
  if ((commands === 'MCVCHLVHVLVHVLCVVCHLVLCVCHLVHVLVHVLCVCHLVL' || commands === 'MCVAHLVHVLVHVLCVVCHLVLCVCHLVHVLVHVLCVCHLVL') && width > 0.8 && height > 2) return SEM.sharp;
  if ((commands === 'MCCLVHVCHLVHVC' || commands === 'MCCLCHCLCCCCC') && width < 0.95 && height > 2) return SEM.flat;
  return undefined;
}

function largestUniqueContours(element: SvgElement, spacing: number): { bounds: Bounds; commands: string }[] {
  const selected: { bounds: Bounds; commands: string }[] = [];
  for (const subpath of [...element.subpaths].sort((a, b) => bArea(b.bounds) - bArea(a.bounds))) {
    const c = center(subpath.bounds);
    if (selected.some((other) => {
      const oc = center(other.bounds);
      return Math.abs(c.x - oc.x) < spacing * 0.25 && Math.abs(c.y - oc.y) < spacing * 0.25;
    })) continue;
    selected.push({ bounds: subpath.bounds, commands: subpath.commands.join('') });
  }
  return selected;
}

function uniqueBounds(bounds: Bounds[], spacing: number): Bounds[] {
  const selected: Bounds[] = [];
  for (const bound of [...bounds].sort((a, b) => bArea(b) - bArea(a))) {
    const c = center(bound);
    if (selected.some((other) => {
      const oc = center(other);
      return Math.abs(c.x - oc.x) < spacing * 0.25 && Math.abs(c.y - oc.y) < spacing * 0.25;
    })) continue;
    selected.push(bound);
  }
  return selected;
}
function noteheadIsHollow(element: SvgElement, bounds: Bounds, spacing: number): boolean {
  const c = center(bounds);
  return element.subpaths.some((subpath) => {
    const other = subpath.bounds;
    const oc = center(other);
    const area = bArea(other);
    return area < bArea(bounds) * 0.9 && area > bArea(bounds) * 0.2 &&
      Math.abs(oc.x - c.x) < spacing * 0.18 && Math.abs(oc.y - c.y) < spacing * 0.18;
  });
}


function stemDirection(note: Bounds, stems: Bounds[], spacing: number): 'U' | 'D' | undefined {
  const n = center(note);
  let best: { direction: 'U' | 'D'; distance: number } | undefined;
  for (const stem of stems) {
    const x = center(stem).x;
    const dx = x - n.x;
    if (Math.abs(dx) > spacing * 1.2 || Math.abs(dx) < spacing * 0.08) continue;
    const direction = dx > 0 ? 'U' : 'D';
    const distance = Math.abs(dx);
    if (!best || distance < best.distance) best = { direction, distance };
  }
  return best?.direction;
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

    // Emit each time-signature digit separately. Starry recognizes numeric
    // signatures by staff-relative y: numerator at -1, denominator at +1.
    for (const element of page.elements.filter((e) => e.cls === 'TimeSig')) {
      const byStaff = new Map<number, Bounds[]>();
      for (const subpath of element.subpaths) {
        const info = staffForY(layout, center(subpath.bounds).y, spacing);
        if (!info) continue;
        const list = byStaff.get(info.index) || [];
        list.push(subpath.bounds);
        byStaff.set(info.index, list);
      }
      for (const [staffIndex, rawBounds] of byStaff) {
        const staff = layout.staves[staffIndex];
        const bounds = uniqueBounds(rawBounds, spacing).sort((a, b) => center(a).y - center(b).y);
        for (const bound of bounds) {
          const digit = timeDigit(bound, spacing);
          const relativeY = (center(bound).y - staff.middle) / spacing;
          if (!digit || Math.abs(Math.abs(relativeY) - 1) > 0.35) {
            diagnostics.push({ severity: 'warning', code: 'unknown-time-digit', message: 'TimeSig contour could not be classified as a supported numeric digit', sourceIndex: element.sourceIndex });
            continue;
          }
          addStaffPoint(staffIndex, pointForStaff(digit, bound, layout, staff, spacing), 'timesig');
        }
      }
    }

    for (const element of page.elements.filter((e) => e.cls === 'Accidental' || e.cls === 'KeySig')) {
      for (const item of largestUniqueContours(element, spacing)) {
        const info = staffForY(layout, center(item.bounds).y, spacing);
        if (!info) continue;
        const semantic = accidentalSemantic(item.commands, item.bounds, spacing);
        if (!semantic) {
          diagnostics.push({ severity: 'warning', code: 'unknown-accidental', message: 'Accidental contour fingerprint is not in the supported MuseScore table', sourceIndex: element.sourceIndex });
          continue;
        }
        const point = pointForStaff(semantic, item.bounds, layout, info.staff, spacing);
        addStaffPoint(info.index, point, element.cls === 'KeySig' ? 'key-signature' : 'accidental');
        if (element.cls === 'KeySig') {
          addStaffPoint(info.index, { ...point, semantic: SEM.keyAcc }, 'key-signature-marker');
        }
      }
    }
    const stemBoundsByStaff = layout.staves.map(() => [] as Bounds[]);
    for (const element of page.elements.filter((e) => e.cls === 'Stem')) {
      for (const bounds of verticalComponents(element, spacing)) {
        const info = staffForY(layout, center(bounds).y, spacing);
        if (info) stemBoundsByStaff[info.index].push(bounds);
      }
    }

    for (const element of page.elements.filter((e) => e.cls === 'Note')) {
      for (const bounds of noteheadBounds(element, spacing)) {
        const staffInfo = staffForY(layout, center(bounds).y, spacing);
        if (!staffInfo) continue;
        const filled = !noteheadIsHollow(element, bounds, spacing);
        const direction = stemDirection(bounds, stemBoundsByStaff[staffInfo.index], spacing);
        let semantic: string = filled ? SEM.note1 : SEM.note0;
        if (filled && direction === 'U') semantic = SEM.note1Up;
        if (filled && direction === 'D') semantic = SEM.note1Down;
        addStaffPoint(staffInfo.index, pointForStaff(semantic, bounds, layout, staffInfo.staff, spacing), 'note');
      }
    }

    // Beam paths are usually flattened into one rectangle per beam level. The
    // rectangle endpoints are not semantic-event coordinates: a long beam can
    // span several stems, while a secondary level may only touch one endpoint.
    // Reattach each level to the stems whose x coordinate it covers and emit
    // Starry's Open/Continue/Close points at those stem positions, as the
    // native semantic graph does. This also avoids creating phantom beam events
    // at the raw path endpoints.
    for (const element of page.elements.filter((e) => e.cls === 'Beam')) {
      for (const subpath of element.subpaths) {
        const beam = subpath.bounds;
        // Only the principal (stem-adjacent) level opens/closes a beam
        // group. Other levels contribute duration flags, not additional
        // groups. Short beams touching one stem are beamlets, not groups.
        const sameSpan = element.subpaths.filter((other) =>
          Math.abs(other.bounds.left - beam.left) < spacing * 0.25 &&
          Math.abs(other.bounds.right - beam.right) < spacing * 0.25 &&
          Math.abs(center(other.bounds).y - center(beam).y) < spacing * 2.5
        );
        const beamCenter = center(beam);
        const info = staffForY(layout, beamCenter.y, spacing);
        if (!info) continue;
        const candidates = stemBoundsByStaff[info.index]
          .map((stem) => ({ stem, x: center(stem).x }))
          .filter(({ stem, x }) => {
            if (x < beam.left - spacing * 0.12 || x > beam.right + spacing * 0.12) return false;
            // A stem meets the beam at its upper or lower endpoint. Testing
            // overlap rather than the stem centre handles sloped beams.
            return beam.bottom >= stem.top - spacing * 0.25 && beam.top <= stem.bottom + spacing * 0.25;
          })
          .sort((a, b) => a.x - b.x);
        if (!candidates.length) continue;

        const points = candidates.map(({ stem, x }) => {
          const t = bWidth(beam) > 1e-6 ? (x - beam.left) / bWidth(beam) : 0.5;
          const y = beam.top + t * bHeight(beam);
          return { stem, x, y };
        });
        const endpointDistance = (candidate: Bounds) => Math.min(
          ...candidates.map(({ stem }) => Math.min(
            Math.abs(center(candidate).y - stem.top),
            Math.abs(center(candidate).y - stem.bottom)
          ))
        );
        const principal = sameSpan.every((other) =>
          endpointDistance(beam) <= endpointDistance(other.bounds) + 1e-6
        );
        const semanticFor = (index: number): string =>
          index === 0 ? SEM.beamLeft : index === points.length - 1 ? SEM.beamRight : SEM.beamContinue;
        points.forEach((point, index) => {
          const bounds = {
            left: point.x,
            right: point.x,
            top: point.y,
            bottom: point.y,
          };
          if (principal && points.length > 1)
            addStaffPoint(info.index, pointForStaff(semanticFor(index), bounds, layout, info.staff, spacing), 'beam');
          // Starry counts beam levels through Flag3 divisions. A beam level
          // attached to a stem is therefore also a flag candidate at that stem.
          addStaffPoint(info.index, pointForStaff(SEM.flag3, bounds, layout, info.staff, spacing), 'beam-flag');
        });
      }
    }

    for (const element of page.elements.filter((e) => e.cls === 'Tremolo')) {
      const items = element.subpaths.map((subpath) => subpath.bounds).sort((a, b) => center(a).y - center(b).y);
      for (let i = 0; i < items.length; i++) {
        const info = staffForY(layout, center(items[i]).y, spacing);
        if (!info) continue;
        const semantic = items.length === 1 ? SEM.tremoloMiddle : i === 0 ? SEM.tremoloLeft : i === items.length - 1 ? SEM.tremoloRight : SEM.tremoloMiddle;
        addStaffPoint(info.index, pointForStaff(semantic, items[i], layout, info.staff, spacing), 'tremolo');
      }
    }
    for (const element of page.elements.filter((e) => e.cls === 'Hook')) {
      for (const item of largestUniqueContours(element, spacing)) {
        if (bHeight(item.bounds) / spacing < 2.5) continue;
        const info = staffForY(layout, center(item.bounds).y, spacing);
        if (info) addStaffPoint(info.index, pointForStaff(SEM.flag3, item.bounds, layout, info.staff, spacing), 'flag');
      }
    }

    for (const element of page.elements.filter((e) => e.cls === 'NoteDot')) {
      for (const bounds of element.subpaths.map((subpath) => subpath.bounds)) {
        const info = staffForY(layout, center(bounds).y, spacing);
        if (info) addStaffPoint(info.index, pointForStaff(SEM.dot, bounds, layout, info.staff, spacing), 'dot');
      }
    }


    for (const element of page.elements.filter((e) => e.cls === 'Rest')) {
      for (const bounds of uniqueBounds(element.subpaths.map((subpath) => subpath.bounds), spacing)) {
        const info = staffForY(layout, center(bounds).y, spacing);
        if (!info) continue;
        const relativeY = (center(bounds).y - info.staff.middle) / spacing;
        const semantic = restSemantic(bounds, spacing, relativeY);
        if (!semantic) {
          diagnostics.push({ severity: 'warning', code: 'unknown-rest', message: 'Rest contour could not be classified by normalized geometry', sourceIndex: element.sourceIndex });
          continue;
        }
        addStaffPoint(info.index, pointForStaff(semantic, bounds, layout, info.staff, spacing), 'rest');
      }
    }

    // Stems are emitted after notes but their association is resolved by
    // Starry's Staff.assemble() using the explicit extensions.
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
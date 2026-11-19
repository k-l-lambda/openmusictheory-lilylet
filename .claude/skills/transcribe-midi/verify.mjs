#!/usr/bin/env node
/**
 * Verify a Lilylet transcription against its audit contract and independent MIDI source.
 *
 * Usage: node verify.mjs INPUT.mid SCORE.lyl AUDIT.json OUTDIR
 * OUTDIR is created when absent, or must already be empty.  The verifier writes
 * report.json, score.mei, and rendered.mid there; it never writes an input file.
 */
import fs from 'node:fs';
import path from 'node:path';
import { readMidi } from './smf.mjs';
import * as lilylet from '@k-l-lambda/lilylet';
import createVerovioModule from 'verovio/wasm';
import { VerovioToolkit } from 'verovio/esm';

const [sourcePath, scorePath, auditPath, outDir] = process.argv.slice(2);
const usage = 'usage: node verify.mjs INPUT.mid SCORE.lyl AUDIT.json OUTDIR';
if (!sourcePath || !scorePath || !auditPath || !outDir) {
  console.error(usage); process.exit(2);
}

function fail(message) { throw new Error(message); }
function finite(x) { return typeof x === 'number' && Number.isFinite(x); }
function integer(x) { return Number.isInteger(x); }
function add(list, value) { list.push(value); }
function countMap(values) {
  const m = new Map();
  for (const v of values) m.set(v, (m.get(v) || 0) + 1);
  return m;
}
function mapDiff(expected, actual) {
  const e = countMap(expected), a = countMap(actual), missing = [], extra = [];
  for (const [k, n] of e) for (let i = 0; i < n - (a.get(k) || 0); i++) missing.push(k);
  for (const [k, n] of a) for (let i = 0; i < n - (e.get(k) || 0); i++) extra.push(k);
  return { missing, extra };
}
function normalizePitches(xs) { return [...xs].sort((a, b) => a - b); }
function partIndex(parts, value) {
  if (integer(value) && value >= 1 && value <= parts.length) return value - 1;
  return parts.findIndex(p => p && p.id === value);
}
function keyPartStaffVoice(part, staff, voice) { return `${part}\u0000${staff}\u0000${voice}`; }

function prepareOutput(dir) {
  const abs = path.resolve(dir);
  if (fs.existsSync(abs)) {
    if (!fs.statSync(abs).isDirectory()) fail(`output is not a directory: ${abs}`);
    if (fs.readdirSync(abs).length) fail(`output directory must be new or empty: ${abs}`);
  } else fs.mkdirSync(abs, { recursive: true });
  for (const input of [sourcePath, scorePath, auditPath]) {
    if (path.resolve(input) === abs || path.dirname(path.resolve(input)) === abs)
      fail(`output must not overwrite an input: ${input}`);
  }
  return abs;
}

function validateAudit(audit, source, diagnostics) {
  if (!audit || typeof audit !== 'object') fail('audit is not an object');
  if (audit.sourceHash !== source.sha256) {
    add(diagnostics.structural, { type: 'sourceHash', expected: source.sha256, actual: audit.sourceHash ?? null });
    fail(`audit sourceHash does not match input MIDI (${audit.sourceHash ?? 'missing'})`);
  }
  if (!integer(audit.unit) || audit.unit <= 0) fail('audit.unit must be a positive integer');
  if (!Array.isArray(audit.parts) || !audit.parts.length) fail('audit.parts must be a non-empty array');
  if (!Array.isArray(audit.bars) || !audit.bars.length) fail('audit.bars must be a non-empty array');
  if (!Array.isArray(audit.notes)) fail('audit.notes must be an array');
  if (!Array.isArray(audit.printed)) fail('audit.printed must be an array');
  for (const [i, p] of audit.parts.entries()) {
    if (!p || typeof p.id !== 'string' || !p.id) fail(`parts[${i}] needs id`);
    if (p.staves !== 1 && p.staves !== 2) fail(`parts[${i}].staves must be 1 or 2`);
  }
  const ids = new Set(audit.parts.map(p => p.id));
  if (ids.size !== audit.parts.length) fail('part IDs must be unique');
  let scoreStart = 0;
  const preparedBars = [];
  let lastEnd = -Infinity;
  for (let i = 0; i < audit.bars.length; i++) {
    const b = audit.bars[i];
    const start = b?.start ?? b?.startTick, end = b?.end ?? b?.endTick;
    if (!integer(start) || !integer(end) || end <= start) fail(`bars[${i}] needs integer start < end`);
    if (start < lastEnd) fail(`bars are not ordered/non-overlapping at bar ${i + 1}`);
    const units = b.units;
    if (!finite(units) || units <= 0) fail(`bars[${i}].units must be positive`);
    if (b.n != null && (!integer(b.n) || b.n <= 0)) fail(`bars[${i}].n must be positive`);
    if (b.d != null && (!integer(b.d) || b.d <= 0)) fail(`bars[${i}].d must be positive`);
    const rawLandmarks = [];
    if (b.landmarks != null) {
      if (!Array.isArray(b.landmarks)) fail(`bars[${i}].landmarks must be an array`);
      for (const lm of b.landmarks) {
        if (!Array.isArray(lm) || lm.length !== 2 || !integer(lm[0]) || !finite(lm[1])) fail(`invalid landmark in bar ${i + 1}`);
        if (lm[0] < start || lm[0] > end || lm[1] < 0 || lm[1] > units) fail(`landmark outside bar ${i + 1}`);
        rawLandmarks.push([lm[0], lm[1]]);
      }
    }
    // Endpoint landmarks are accepted in the audit as well as implicit endpoints.
    // Collapse exact duplicates so canonical interpolation remains strictly ordered.
    const landmarks = [[start, 0], ...rawLandmarks, [end, units]]
      .sort((a, z) => a[0] - z[0])
      .filter((lm, j, xs) => j === 0 || lm[0] !== xs[j - 1][0]);
    if (landmarks[0][0] !== start || landmarks[0][1] !== 0 || landmarks.at(-1)[0] !== end || landmarks.at(-1)[1] !== units)
      fail(`landmarks must include the bar endpoints in bar ${i + 1}`);
    for (let j = 1; j < landmarks.length; j++) {
      if (landmarks[j][1] < landmarks[j - 1][1]) fail(`landmarks must increase in bar ${i + 1}`);
    }
    preparedBars.push({ start, end, units, scoreStart, landmarks });
    scoreStart += units; lastEnd = end;
  }
  const sourceIds = source.notes.map(n => n.id);
  if (source.notes.some(n => n.start < preparedBars[0].start || n.start >= preparedBars.at(-1).end))
    fail('bars do not cover every source note onset');
  const auditIds = audit.notes.map(n => n.id);
  const idDiff = mapDiff(sourceIds, auditIds);
  if (idDiff.missing.length || idDiff.extra.length || new Set(auditIds).size !== auditIds.length) {
    add(diagnostics.source, { type: 'sourceIdConservation', ...idDiff, duplicateAuditIds: auditIds.filter((id, i) => auditIds.indexOf(id) !== i).slice(0, 20) });
    fail(`audit note IDs do not conserve source notes (missing ${idDiff.missing.length}, extra ${idDiff.extra.length})`);
  }
  const sourceById = new Map(source.notes.map(n => [n.id, n]));
  for (const [i, n] of audit.notes.entries()) {
    if (!sourceIds.includes(n.id)) fail(`audit.notes[${i}] references unknown source ID ${n.id}`);
    const raw = sourceById.get(n.id);
    for (const k of ['track', 'channel', 'program', 'pitch']) {
      if (n[k] != null && raw[k] != null && n[k] !== raw[k]) add(diagnostics.source, { type: 'sourceNoteMismatch', id: n.id, field: k, expected: raw[k], actual: n[k] });
    }
    if (partIndex(audit.parts, n.part) < 0) fail(`audit.notes[${i}] has unknown part ${n.part}`);
    for (const k of ['staff', 'voice']) if (!integer(n[k]) || n[k] < 1) fail(`audit.notes[${i}].${k} must be 1-based integer`);
    for (const k of ['startUnit', 'endUnit']) if (!finite(n[k])) fail(`audit.notes[${i}].${k} must be numeric`);
    if (n.endUnit < n.startUnit) fail(`audit.notes[${i}] has end before start`);
  }
  for (const [i, p] of audit.printed.entries()) {
    if (!integer(p.bar) || p.bar < 1 || p.bar > audit.bars.length) fail(`printed[${i}] has invalid bar`);
    if (partIndex(audit.parts, p.part) < 0) fail(`printed[${i}] has unknown part`);
    if (!integer(p.staff) || p.staff < 1 || !integer(p.voice) || p.voice < 1) fail(`printed[${i}] needs staff/voice`);
    if (!finite(p.slot) || !finite(p.duration) || p.duration <= 0) fail(`printed[${i}] needs positive slot/duration`);
    if (!Array.isArray(p.pitches) || p.pitches.some(x => !integer(x) || x < 0 || x > 127)) fail(`printed[${i}] has invalid pitches`);
    if (!Array.isArray(p.ids)) fail(`printed[${i}].ids must be an array`);
    for (const id of p.ids) if (!sourceIds.includes(id)) fail(`printed[${i}] has unknown source ID ${id}`);
  }
  return { bars: preparedBars, scoreUnits: scoreStart, sourceById: new Map(source.notes.map(n => [n.id, n])), auditById: new Map(audit.notes.map(n => [n.id, n])) };
}

function sourceToScore(tick, bars) {
  for (const b of bars) {
    if (tick >= b.start && tick < b.end) {
      const lm = b.landmarks;
      for (let i = 1; i < lm.length; i++) if (tick <= lm[i][0]) {
        const [x0, y0] = lm[i - 1], [x1, y1] = lm[i];
        return b.scoreStart + y0 + (tick - x0) * (y1 - y0) / (x1 - x0);
      }
    }
  }
  if (tick === bars.at(-1).end) return bars.at(-1).scoreStart + bars.at(-1).units;
  return null;
}

function durationUnits(d, unit, scale = 1) {
  if (!d || !finite(d.division) || d.division <= 0) return 0;
  let value = unit * 4 / d.division * (2 - 2 ** -(d.dots || 0));
  if (d.tuplet) value *= (d.tuplet.numerator || 1) / (d.tuplet.denominator || 1);
  return value * scale;
}

function collectScoreNotes(doc, audit, bars) {
  const result = [], states = new Map();
  function walk(events, part, staffVoice, cursor, state, scale, barIndex) {
    for (const ev of events || []) {
      if (ev.type === 'context') {
        if (typeof ev.clef === 'string') state.clef = lilylet.clefShift(ev.clef);
      } else if (ev.type === 'note') {
        const dur = durationUnits(ev.duration, audit.unit, scale);
        const staff = ev.staff ?? staffVoice.staff;
        result.push({ part, staff, voice: staffVoice.voice, bar: barIndex + 1, startUnit: bars[barIndex].scoreStart + cursor, endUnit: bars[barIndex].scoreStart + cursor + dur, duration: dur, pitches: normalizePitches((ev.pitches || []).map(p => lilylet.pitchToMidi(p, state.clef))) });
        cursor += dur;
      } else if (ev.type === 'rest') cursor += durationUnits(ev.duration, audit.unit, scale);
      else if (ev.type === 'tuplet' || ev.type === 'times') {
        const r = ev.ratio || { numerator: 1, denominator: 1 };
        cursor = walk(ev.events, part, staffVoice, cursor, state, scale * r.numerator / r.denominator, barIndex);
      } else if (ev.type === 'tremolo') {
        const dur = audit.unit * 4 / ev.division * scale;
        for (const pitches of [ev.pitchA, ev.pitchB]) {
          result.push({ part, staff: staffVoice.staff, voice: staffVoice.voice, bar: barIndex + 1, startUnit: bars[barIndex].scoreStart + cursor, endUnit: bars[barIndex].scoreStart + cursor + dur, duration: dur, pitches: normalizePitches((pitches || []).map(p => lilylet.pitchToMidi(p, state.clef))) });
          cursor += dur;
        }
      }
    }
    return cursor;
  }
  for (let bi = 0; bi < doc.measures.length; bi++) {
    const measure = doc.measures[bi];
    for (let pi = 0; pi < measure.parts.length; pi++) {
      const part = audit.parts[pi]?.id;
      const voices = measure.parts[pi].voices || [];
      for (let vi = 0; vi < voices.length; vi++) {
        const v = voices[vi], staff = v.staff || 1;
        const staffVoices = voices.slice(0, vi).filter(x => (x.staff || 1) === staff).length + 1;
        const stateKey = `${pi}:${staff}:${staffVoices}`;
        const state = states.get(stateKey) || { clef: 0 };
        walk(v.events, part, { staff, voice: staffVoices }, 0, state, 1, bi);
        states.set(stateKey, state);
      }
    }
  }
  return result;
}

function checkStructure(doc, audit, bars, diagnostics) {
  if (doc.measures.length !== bars.length) add(diagnostics.structural, { type: 'barCount', expected: bars.length, actual: doc.measures.length });
  const expectedVoices = new Map();
  for (const p of audit.printed) {
    const pi = partIndex(audit.parts, p.part), id = audit.parts[pi]?.id;
    if (id) expectedVoices.set(`${id}:${p.staff}`, Math.max(expectedVoices.get(`${id}:${p.staff}`) || 0, p.voice));
  }
  for (const p of audit.parts) for (let s = 1; s <= p.staves; s++) if (!expectedVoices.has(`${p.id}:${s}`)) expectedVoices.set(`${p.id}:${s}`, 1);
  const count = Math.min(doc.measures.length, bars.length);
  for (let bi = 0; bi < count; bi++) {
    const m = doc.measures[bi];
    if (m.parts.length !== audit.parts.length) add(diagnostics.structural, { type: 'partCount', bar: bi + 1, expected: audit.parts.length, actual: m.parts.length });
    for (let pi = 0; pi < audit.parts.length; pi++) {
      const p = m.parts[pi]; if (!p) continue;
      const wanted = audit.parts[pi].staves;
      const actualStaves = new Set((p.voices || []).map(v => v.staff || 1));
      const bad = [...actualStaves].some(s => s < 1 || s > wanted) || actualStaves.size > wanted;
      if (bad || !p.voices?.length) add(diagnostics.structural, { type: 'staffLayout', bar: bi + 1, part: audit.parts[pi].id, expectedStaves: wanted, actualStaffs: [...actualStaves] });
      for (let s = 1; s <= wanted; s++) {
        const staffVoices = (p.voices || []).filter(v => (v.staff || 1) === s).length;
        if (!actualStaves.has(s)) add(diagnostics.structural, { type: 'missingStaff', bar: bi + 1, part: audit.parts[pi].id, staff: s });
        const expected = expectedVoices.get(`${audit.parts[pi].id}:${s}`) || 1;
        if (staffVoices !== expected) add(diagnostics.structural, { type: 'voiceLayout', bar: bi + 1, part: audit.parts[pi].id, staff: s, expected, actual: staffVoices });
      }
    }
  }
}

function comparePrinted(actual, printed, audit, diagnostics) {
  const expected = new Map();
  for (const p of printed) {
    const pi = partIndex(audit.parts, p.part), k = keyPartStaffVoice(audit.parts[pi].id, p.staff, p.voice);
    if (!expected.has(k)) expected.set(k, []);
    expected.get(k).push({ ...p, part: audit.parts[pi].id });
  }
  for (const xs of expected.values()) xs.sort((a, b) => a.bar - b.bar || a.slot - b.slot);
  const actualByKey = new Map();
  for (const n of actual) { const k = keyPartStaffVoice(n.part, n.staff, n.voice); if (!actualByKey.has(k)) actualByKey.set(k, []); actualByKey.get(k).push(n); }
  for (const [k, xs] of expected) {
    const ys = actualByKey.get(k) || [];
    let yi = 0;
    for (let i = 0; i < xs.length; i++) {
      const x = xs[i], y = ys[yi++]; if (!y) { add(diagnostics.printed, { type: 'missingNotehead', key: k, index: i, expected: x }); continue; }
      const xp = normalizePitches(x.pitches), yp = y.pitches;
      const wantStart = audit.bars[x.bar - 1]?.scoreStart + x.slot;
      let total = y.duration, last = y;
      // The writer may decompose one audited printed chunk into several adjacent
      // Lilylet duration tokens. They are one audited attack: consume only exact,
      // contiguous, same-pitch pieces, while preserving adjacent repeated attacks.
      while (total < x.duration - 1e-7 && ys[yi] && mapDiff(xp, ys[yi].pitches).missing.length === 0 && mapDiff(xp, ys[yi].pitches).extra.length === 0 && Math.abs(ys[yi].startUnit - last.endUnit) < 1e-7) {
        last = ys[yi++]; total += last.duration;
      }
      const wantEnd = wantStart + x.duration;
      if (x.bar !== y.bar || mapDiff(xp, yp).missing.length || mapDiff(xp, yp).extra.length || Math.abs(wantStart - y.startUnit) > 1e-7 || Math.abs(total - x.duration) > 1e-7)
        add(diagnostics.printed, { type: 'notehead', key: k, index: i, expected: { bar: x.bar, startUnit: wantStart, duration: x.duration, pitches: xp, ids: x.ids }, actual: { bar: y.bar, startUnit: y.startUnit, duration: total, pitches: yp } });
      for (const id of x.ids) {
        const n = audit.notes.find(z => z.id === id);
        if (n && n.part !== x.part) add(diagnostics.printed, { type: 'wrongPartId', id, printedPart: x.part, auditPart: n.part });
        if (n && finite(n.pitch) && !xp.includes(n.pitch)) add(diagnostics.printed, { type: 'wrongPitchId', id, pitch: n.pitch, printedPitches: xp });
      }
    }
    if (yi !== ys.length) add(diagnostics.printed, { type: 'extraNoteheads', key: k, count: ys.length - yi });
  }
  const allPrintedIds = printed.flatMap(p => p.ids);
  const idCounts = countMap(allPrintedIds);
  for (const n of audit.notes) if (!idCounts.has(n.id)) add(diagnostics.source, { type: 'sourceIdNotPrinted', id: n.id });
}

function matchRows(expected, actual, tolerance, compareEnd = false) {
  const used = new Set(), missing = [], matched = [];
  for (const x of expected) {
    let best = -1, distance = Infinity;
    for (let i = 0; i < actual.length; i++) {
      const y = actual[i]; if (used.has(i) || x.pitch !== y.pitch || x.part !== y.part) continue;
      const d = Math.abs(x.start - y.start); if (d < distance) { distance = d; best = i; }
    }
    if (best < 0 || distance > tolerance) missing.push({ ...x, nearest: best < 0 ? null : actual[best], distance: Number.isFinite(distance) ? distance : null });
    else { used.add(best); matched.push({ expected: x, actual: actual[best], distance }); }
  }
  return { missing, extra: actual.filter((_, i) => !used.has(i)), matched };
}

function renderCompare(source, generated, audit, prep, diagnostics) {
  const tol = finite(audit.toleranceQuarter) ? audit.toleranceQuarter : 0.0625;
  const sourceRows = [], renderedRows = [], modelRows = [];
  for (const n of audit.notes) {
    const s = prep.sourceById.get(n.id), pi = partIndex(audit.parts, n.part);
    if (!s || pi < 0) continue;
    const start = sourceToScore(s.start, prep.bars), end = sourceToScore(s.end, prep.bars);
    if (start == null) { add(diagnostics.source, { type: 'unmappedSourceOnset', id: n.id, tick: s.start }); continue; }
    sourceRows.push({ id: n.id, part: n.part, pitch: s.pitch, start, end });
    if (finite(n.startUnit)) add(diagnostics.source, { type: 'sourceOnset', id: n.id, errorUnits: n.startUnit - start, errorQuarter: (n.startUnit - start) / audit.unit, withinTolerance: Math.abs(n.startUnit - start) / audit.unit <= tol });
    if (end != null && finite(n.endUnit)) add(diagnostics.source, { type: 'sourceRelease', id: n.id, errorUnits: n.endUnit - end, errorQuarter: (n.endUnit - end) / audit.unit, withinTolerance: Math.abs(n.endUnit - end) / audit.unit <= tol });
  }
  for (const n of audit.notes) {
    const pi = partIndex(audit.parts, n.part), part = audit.parts[pi]?.id;
    if (pi < 0 || !finite(n.startUnit) || !finite(n.endUnit)) continue;
    modelRows.push({ part, staff: n.staff, pitch: n.pitch, start: n.startUnit, end: n.endUnit });
  }
  const expectedStaffTracks = audit.parts.reduce((n, p) => n + p.staves, 0);
  const noteTracks = generated.tracks.filter(t => t.noteCount > 0);
  const hasTempoTrack = generated.tracks.length === expectedStaffTracks + 1 && generated.tracks[0]?.noteCount === 0;
  const layoutTrackCount = (generated.tracks.length === expectedStaffTracks || hasTempoTrack) && noteTracks.length === expectedStaffTracks;
  diagnostics.renderer.layoutTrackCount = { expectedStaffTracks, actualTracks: generated.tracks.length, noteTracks: noteTracks.length, tempoTrack: hasTempoTrack, verified: layoutTrackCount };
  if (!layoutTrackCount) {
    diagnostics.limitations.push('Source-to-render comparison was skipped because Verovio track count/layout could not be matched to the audit part/staff order.');
    return;
  }
  // Verovio emits tracks in score staff order. It may prepend one empty tempo
  // track, but otherwise has no stable track index for logical parts.
  const staffTracks = hasTempoTrack ? generated.tracks.slice(1) : generated.tracks;
  const trackByPart = new Map();
  let ti = 0;
  for (const p of audit.parts) {
    const xs = [];
    for (let s = 1; s <= p.staves; s++) xs.push(staffTracks[ti++]);
    trackByPart.set(p.id, xs);
  }
  for (const [part, tracks] of trackByPart) for (const tr of tracks) {
    if (!tr) continue;
    for (const n of generated.notes.filter(x => x.track === tr.index)) renderedRows.push({ part, pitch: n.pitch, start: n.start / generated.ppq * audit.unit, end: n.end / generated.ppq * audit.unit, tickStart: n.start, tickEnd: n.end });
  }
  const byPart = part => xs => xs.filter(x => x.part === part);
  for (const p of audit.parts) {
    const m = byPart(p.id)(modelRows), r = byPart(p.id)(renderedRows);
    const onset = matchRows(m, r, audit.unit / generated.ppq + 1e-9);
    if (onset.missing.length || onset.extra.length) add(diagnostics.renderer.modelToExport, { part: p.id, missing: onset.missing.slice(0, 20), extra: onset.extra.slice(0, 20) });
    for (const z of onset.matched) {
      const exactTick = z.expected.start / audit.unit * generated.ppq, actualTick = z.actual.tickStart;
      if (Math.abs(actualTick - exactTick) > 1) add(diagnostics.renderer.modelToExport, { type: 'onset', part: p.id, pitch: z.expected.pitch, expectedTick: exactTick, actualTick });
      const expectedEndTick = z.expected.end / audit.unit * generated.ppq;
      if (Math.abs(z.actual.tickEnd - expectedEndTick) > 1) add(diagnostics.renderer.releases, { type: 'modelToExport', part: p.id, pitch: z.expected.pitch, expectedTick: expectedEndTick, actualTick: z.actual.tickEnd, differenceTicks: z.actual.tickEnd - expectedEndTick });
    }
    const sr = matchRows(byPart(p.id)(sourceRows), r, tol * audit.unit);
    diagnostics.sourceToRender.push({ part: p.id, source: byPart(p.id)(sourceRows).length, rendered: r.length, missing: sr.missing.slice(0, 20), extra: sr.extra.slice(0, 20), matched: sr.matched.length, toleranceQuarter: tol });
  }
}

function timbreDiagnostics(source, generated, audit, prep, diagnostics) {
  const expectedStaffTracks = audit.parts.reduce((n, p) => n + p.staves, 0);
  const hasTempoTrack = generated.tracks.length === expectedStaffTracks + 1 && generated.tracks[0]?.noteCount === 0;
  const staffTracks = hasTempoTrack ? generated.tracks.slice(1) : generated.tracks;
  let cursor = 0;
  for (const p of audit.parts) {
    const ids = audit.notes.filter(n => n.part === p.id).map(n => n.id), src = ids.map(id => prep.sourceById.get(id)).filter(Boolean);
    const channels = [...new Set(src.map(n => n.channel))], programs = [...new Set(src.map(n => n.program))];
    const rendered = staffTracks.slice(cursor, cursor + p.staves).filter(Boolean).map(tr => ({ channels: tr.channels, programs: tr.programs }));
    cursor += p.staves;
    diagnostics.timbre.push({ part: p.id, source: { channels, programs }, rendered, note: 'Program/channel differences are metadata diagnostics, not notation failures.' });
  }
}

async function main() {
  const output = prepareOutput(outDir);
  const diagnostics = { structural: [], parse: [], printed: [], source: [], renderer: { modelToExport: [], releases: [], layoutTrackCount: null }, sourceToRender: [], timbre: [], limitations: [] };
  const source = readMidi(sourcePath);
  const audit = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
  const prep = validateAudit(audit, source, diagnostics);
  const code = fs.readFileSync(scorePath, 'utf8');
  let doc, mei = null, generated = null;
  try { doc = lilylet.parseCode(code); } catch (e) { add(diagnostics.parse, { type: 'parseError', message: String(e?.message || e) }); }
  if (doc) {
    const warnings = lilylet.getParseWarnings?.() || [];
    for (const w of warnings) add(diagnostics.parse, { type: 'warning', warning: w });
    try { mei = lilylet.meiEncoder.encode(doc); fs.writeFileSync(path.join(output, 'score.mei'), mei); } catch (e) { add(diagnostics.parse, { type: 'meiError', message: String(e?.message || e) }); }
    checkStructure(doc, audit, prep.bars, diagnostics);
    if (mei) {
      try {
        const mod = await createVerovioModule();
        const compatibleMei = mei.replace(/<staffDef\b([^>]*)>\s*<label>[\s\S]*?<\/label>\s*<\/staffDef>/g, '<staffDef$1/>');
        const candidates = [compatibleMei];
        let lastError = null;
        for (let ci = 0; ci < candidates.length && !generated; ci++) {
          const toolkit = new VerovioToolkit(mod);
          try {
            if (!toolkit.loadData(candidates[ci])) { lastError = new Error(toolkit.getLog()); continue; }
            const b64 = toolkit.renderToMIDI();
            fs.writeFileSync(path.join(output, 'rendered.mid'), Buffer.from(b64, 'base64'));
            generated = readMidi(path.join(output, 'rendered.mid'));
            if (ci) add(diagnostics.limitations, 'Verovio required removal of unsupported staffDef labels from its in-memory MEI input; score.mei is unchanged.');
          } catch (e) { lastError = e; }
        }
        if (!generated) add(diagnostics.parse, { type: 'verovioError', message: String(lastError?.message || lastError || 'unable to render MEI') });
      } catch (e) { add(diagnostics.parse, { type: 'verovioError', message: String(e?.message || e) }); }
    }
    if (doc.measures.length === prep.bars.length) {
      const actual = collectScoreNotes(doc, audit, prep.bars);
      comparePrinted(actual, audit.printed, audit, diagnostics);
    }
  }
  if (generated) { renderCompare(source, generated, audit, prep, diagnostics); timbreDiagnostics(source, generated, audit, prep, diagnostics); }
  else diagnostics.limitations.push('No rendered MIDI was available; renderer comparisons and timbre diagnostics are incomplete.');
  const strictFailures = diagnostics.structural.length + diagnostics.parse.length + diagnostics.printed.length + diagnostics.renderer.modelToExport.length;
  const report = {
    ok: strictFailures === 0,
    source: { file: path.resolve(sourcePath), sha256: source.sha256, ppq: source.ppq, notes: source.notes.length, tracks: source.tracks.length },
    score: { file: path.resolve(scorePath), bars: doc?.measures?.length ?? null, mei: mei != null, renderedMidi: generated ? path.join(output, 'rendered.mid') : null },
    audit: { file: path.resolve(auditPath), unit: audit.unit, toleranceQuarter: finite(audit.toleranceQuarter) ? audit.toleranceQuarter : 0.0625, parts: audit.parts.map(p => ({ id: p.id, name: p.name, staves: p.staves })), bars: audit.bars.length },
    diagnostics,
    semantics: {
      sourceOnsets: 'Source ticks are mapped through each bar and optional absolute-tick/local-unit landmarks; bar 1 starts at score unit 0 even when bars[0].start is nonzero.',
      sourceReleases: 'Release/end errors are reported separately from onset quantization and do not make the strict result fail.',
      modelToExport: 'Printed score units are compared with Verovio MIDI ticks; pitch and onset deviations over one renderer tick are strict failures.',
      sourceToRender: 'Independent source notes are matched by logical part, pitch, and mapped onset as a multiset, preserving duplicates; this is diagnostic and reports quantization error separately.',
      timbre: 'Program/channel differences are reported only; notation verification does not identify or prove instrument timbre.'
    }
  };
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  if (!report.ok) process.exitCode = 1;
}

main().catch(e => { console.error(`${e?.message || e}`); process.exitCode = 1; });

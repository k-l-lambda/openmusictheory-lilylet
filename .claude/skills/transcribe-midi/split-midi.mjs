#!/usr/bin/env node
// Build a source-preserving, explicitly routed SMF from a transcribe-midi audit.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { readMidi } from './smf.mjs';

function fail(message) { throw new Error(message); }
function vlq(value) {
  if (!Number.isInteger(value) || value < 0 || value > 0x0fffffff) fail(`invalid VLQ value ${value}`);
  const bytes = [value & 127];
  for (value >>>= 7; value; value >>>= 7) bytes.push((value & 127) | 128);
  return Buffer.from(bytes.reverse());
}
function meta(type, payload) {
  return Buffer.concat([Buffer.from([0xff, type]), vlq(payload.length), Buffer.from(payload)]);
}
function track(events, endTick) {
  let previous = 0; const chunks = [];
  for (const e of events.sort((a, b) => a.tick - b.tick || a.order - b.order)) {
    chunks.push(vlq(e.tick - previous), Buffer.from(e.bytes)); previous = e.tick;
  }
  chunks.push(vlq(endTick - previous), Buffer.from([0xff, 0x2f, 0]));
  return Buffer.concat(chunks);
}
function requireInteger(value, name, min = 0, max = Number.MAX_SAFE_INTEGER) {
  if (!Number.isInteger(value) || value < min || value > max) fail(`${name} must be an integer in [${min}, ${max}]`);
}

export function splitMidi(input, auditPath, output) {
  if (existsSync(output)) fail(`refusing to overwrite existing output: ${output}`);
  if (input === output) fail('output must differ from source input');
  const source = readMidi(input), audit = JSON.parse(readFileSync(auditPath, 'utf8'));
  if (!audit || typeof audit !== 'object') fail('audit must be an object');
  if (audit.sourceHash !== source.sha256) fail(`audit sourceHash does not match input (${source.sha256})`);
  if (!Array.isArray(audit.parts) || !audit.parts.length) fail('audit.parts must be a non-empty array');
  if (!Array.isArray(audit.notes)) fail('audit.notes must be an array');
  const sourceById = new Map(source.notes.map(n => [n.id, n])), assignments = new Map(), channels = new Set();
  const parts = audit.parts.map((part, i) => {
    if (!part || typeof part.id !== 'string' || !part.id) fail(`parts[${i}].id is required`);
    if (channels.has(part.channel)) fail(`duplicate output channel ${part.channel}`);
    requireInteger(part.channel, `parts[${i}].channel`, 0, 15); channels.add(part.channel);
    requireInteger(part.program ?? 0, `parts[${i}].program`, 0, 127);
    return { id: part.id, name: String(part.name ?? part.id), program: part.program ?? 0, channel: part.channel };
  });
  const partById = new Map(parts.map(p => [p.id, p]));
  if (partById.size !== parts.length) fail('duplicate part id in audit');
  for (const assignment of audit.notes) {
    if (!assignment || typeof assignment.id !== 'string') fail('every audit note needs an id');
    if (assignments.has(assignment.id)) fail(`duplicate audit note id ${assignment.id}`);
    const note = sourceById.get(assignment.id); if (!note) fail(`audit note ${assignment.id} is not in source`);
    const part = partById.get(assignment.part); if (!part) fail(`note ${assignment.id} references unknown part ${assignment.part}`);
    assignments.set(assignment.id, part);
    for (const field of ['start', 'end', 'pitch', 'velocity']) {
      if (assignment[field] !== undefined && assignment[field] !== note[field]) fail(`audit note ${assignment.id} changes source ${field}`);
    }
  }
  for (const note of source.notes) if (!assignments.has(note.id)) fail(`source note ${note.id} has no audit assignment`);
  // The output format has no faithful representation for source controllers,
  // pitch bends, pressure, or SysEx. Refuse instead of dropping them.
  const unsupported = source.unsupported;
  if (unsupported.length) fail(`unsupported source events would be dropped: ${unsupported.map(x => `${x.kind} (${x.count})`).join(', ')}`);
  const metadata = [];
  for (const tempo of source.tempos) {
    const p = Buffer.alloc(3); p.writeUIntBE(tempo.us, 0, 3); metadata.push({ tick: tempo.tick, order: 1, bytes: meta(0x51, p) });
  }
  for (const meter of source.meters) {
    const dd = Math.round(Math.log2(meter.d));
    if (2 ** dd !== meter.d || dd < 0 || dd > 255) fail(`unsupported meter denominator ${meter.d}`);
    metadata.push({ tick: meter.tick, order: 2, bytes: meta(0x58, [meter.n, dd, meter.clocks ?? 24, meter.thirtySeconds ?? 8]) });
  }
  for (const key of source.keys) {
    metadata.push({ tick: key.tick, order: 3, bytes: meta(0x59, [key.sf & 255, key.minor ? 1 : 0]) });
  }
  const sourceEnd = Math.max(...source.tracks.map(t => t.endTick), 0);
  const tracks = [track([{ tick: 0, order: 0, bytes: meta(3, Buffer.from('Split')) }, ...metadata], sourceEnd)];
  for (const part of parts) {
    const partNotes = source.notes.filter(n => assignments.get(n.id) === part);
    const byPitch = new Map(), pairingEvents = [];
    for (const note of partNotes.sort((a, b) => a.start - b.start || a.end - b.end)) {
      // Simulate the SMF receiver's FIFO pairing on each output channel/key.
      pairingEvents.push({ tick: note.start, order: 3, type: 'on', note });
      pairingEvents.push({ tick: note.end, order: note.end === note.start ? 4 : 2, type: 'off', note });
    }
    const active = new Map();
    for (const e of pairingEvents.sort((a, b) => a.tick - b.tick || a.order - b.order)) {
      const queue = active.get(e.note.pitch) || [];
      if (e.type === 'on') queue.push(e.note);
      else {
        const paired = queue.shift();
        if (paired !== e.note) fail(`same-pitch notes ${paired?.id ?? '(none)'} and ${e.note.id} would reorder FIFO pairing on output channel ${part.channel}`);
      }
      if (queue.length) active.set(e.note.pitch, queue); else active.delete(e.note.pitch);
    }
    const events = [{ tick: 0, order: 0, bytes: meta(3, Buffer.from(part.name)) }, { tick: 0, order: 1, bytes: [0xc0 | part.channel, part.program] }];
    for (const note of partNotes) {
      const zero = note.end === note.start;
      events.push({ tick: note.start, order: 3, bytes: [0x90 | part.channel, note.pitch, note.velocity] });
      events.push({ tick: note.end, order: zero ? 4 : 2, bytes: [0x80 | part.channel, note.pitch, note.releaseVelocity ?? 0] });
    }
    tracks.push(track(events, sourceEnd));
  }
  const header = Buffer.alloc(14); header.write('MThd', 0, 'ascii'); header.writeUInt32BE(6, 4); header.writeUInt16BE(1, 8); header.writeUInt16BE(tracks.length, 10); header.writeUInt16BE(source.ppq, 12);
  writeFileSync(output, Buffer.concat([header, ...tracks.flatMap(t => { const h = Buffer.alloc(8); h.write('MTrk', 0, 'ascii'); h.writeUInt32BE(t.length, 4); return [h, t]; })]), { flag: 'wx' });
  return { sourceHash: source.sha256, output, ppq: source.ppq, parts: parts.map(p => ({ id: p.id, name: p.name, program: p.program, channel: p.channel, noteCount: source.notes.filter(n => assignments.get(n.id) === p).length })) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 5) throw new Error('usage: node split-midi.mjs INPUT AUDIT OUTPUT');
    console.log(JSON.stringify(splitMidi(process.argv[2], process.argv[3], process.argv[4]), null, 2));
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}

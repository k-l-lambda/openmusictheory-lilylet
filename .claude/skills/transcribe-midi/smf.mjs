// Standard MIDI File inspector. Times are absolute ticks; all indices are zero-based.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

class Cursor {
  constructor(bytes, label) { this.bytes = bytes; this.label = label; this.pos = 0; }
  fail(message) { throw new Error(`${this.label} at byte ${this.pos}: ${message}`); }
  take(n) {
    if (n > this.bytes.length - this.pos) this.fail(`truncated (need ${n} bytes)`);
    const data = this.bytes.subarray(this.pos, this.pos + n);
    this.pos += n;
    return data;
  }
  byte() { if (this.pos === this.bytes.length) this.fail('truncated event'); return this.bytes[this.pos++]; }
  dataByte() { const b = this.byte(); if (b >= 128) this.fail('expected MIDI data byte'); return b; }
  vlq() {
    let v = 0;
    for (let i = 0; i < 4; i++) {
      const b = this.byte(); v = v * 128 + (b & 127);
      if (b < 128) return v;
    }
    this.fail('VLQ exceeds four bytes');
  }
}

function timeline(entries, initial) {
  // Stable sort: latest event at a tick wins (track index then file order).
  const result = [initial];
  for (const event of entries.sort((a, b) => a.tick - b.tick)) {
    if (result.at(-1).tick === event.tick) result.pop();
    result.push(event);
  }
  return result;
}

export function readMidi(file) {
  const bytes = readFileSync(file);
  const c = new Cursor(bytes, String(file));
  const chunk = () => {
    const tag = c.take(4).toString('latin1');
    const data = c.take(c.take(4).readUInt32BE());
    return { tag, data };
  };
  const header = chunk();
  if (header.tag !== 'MThd' || header.data.length < 6) c.fail('invalid SMF header');
  const format = header.data.readUInt16BE(0), count = header.data.readUInt16BE(2), ppq = header.data.readUInt16BE(4);
  if (format !== 0 && format !== 1) c.fail(`unsupported SMF format ${format}; expected format 0 or 1`);
  if (!count || (format === 0 && count !== 1)) c.fail('invalid track count');
  if (ppq & 0x8000) c.fail('SMPTE timing is unsupported; PPQ required');
  if (!ppq) c.fail('zero PPQ');
  const tracks = [], notes = [], programChanges = [], tempos = [], meters = [], keys = [];
  const unsupported = [], stateEvents = [];
  const recordOther = (kind, track, tick) => {
    const row = unsupported.find(x => x.kind === kind);
    if (row) row.count++; else unsupported.push({ kind, count: 1, firstTrack: track, firstTick: tick });
  };
  if (header.data.length > 6) recordOther('header extension', null, 0);
  while (c.pos < bytes.length) {
    const { tag, data } = chunk();
    if (tag !== 'MTrk') { recordOther(`chunk ${tag}`, null, 0); continue; }
    const index = tracks.length;
    if (index >= count) c.fail('more tracks than declared');
    const tr = new Cursor(data, `track ${index}`), active = new Map(), channels = new Set();
    let tick = 0, running = 0, name = '', noteCount = 0, ended = false, port = 0;
    while (tr.pos < data.length) {
      tick += tr.vlq();
      if (!Number.isSafeInteger(tick)) tr.fail('tick exceeds safe integer range');
      let status = tr.byte();
      if (status < 128) {
        if (!running) tr.fail('missing running status');
        status = running; tr.pos--;
      }
      running = status < 0xf0 ? status : 0;
      if (status === 0xff) {
        const type = tr.dataByte(), payload = tr.take(tr.vlq());
        const length = n => { if (payload.length !== n) tr.fail(`bad length for meta event 0x${type.toString(16)}`); };
        switch (type) {
          case 3: name = payload.toString('utf8'); break;
          case 0x2f:
            length(0); ended = true;
            if (tr.pos !== data.length) tr.fail('bytes after end-of-track');
            break;
          case 0x51: {
            length(3); const us = payload.readUIntBE(0, 3);
            if (!us) tr.fail('zero tempo');
            tempos.push({ tick, us }); break;
          }
          case 0x58:
            length(4); if (!payload[0]) tr.fail('zero meter numerator');
            meters.push({ tick, n: payload[0], d: 2 ** payload[1], clocks: payload[2], thirtySeconds: payload[3] }); break;
          case 0x59: {
            length(2); const sf = payload.readInt8(0);
            if (Math.abs(sf) > 7 || payload[1] > 1) tr.fail('invalid key signature');
            keys.push({ tick, sf, minor: !!payload[1] }); break;
          }
          default:
            if (type === 0x21) { length(1); port = payload[0]; }
            recordOther(`meta 0x${type.toString(16)}`, index, tick);
        }
        continue;
      }
      if (status === 0xf0 || status === 0xf7) { tr.take(tr.vlq()); recordOther('SysEx', index, tick); continue; }
      if (status >= 0xf0) tr.fail(`invalid SMF status 0x${status.toString(16)}`);
      const kind = status >> 4, channel = status & 15, a = tr.dataByte();
      const b = kind === 12 || kind === 13 ? undefined : tr.dataByte();
      channels.add(channel);
      const key = (port * 16 + channel) * 128 + a;
      if (kind === 12) {
        const change = { tick, track: index, channel, port, program: a };
        programChanges.push(change); stateEvents.push({ tick, port, channel, change });
      } else if (kind === 9 && b !== 0) {
        const note = { id: `t${index}n${noteCount++}`, track: index, channel, program: 0, pitch: a, start: tick, end: null, velocity: b };
        notes.push(note); stateEvents.push({ tick, port, channel, note });
        // Multiple note-ons of the same key are paired in source order (FIFO).
        if (!active.has(key)) active.set(key, { list: [], next: 0 });
        active.get(key).list.push(note);
      } else if (kind === 8 || kind === 9) {
        const queue = active.get(key);
        if (!queue) tr.fail(`unmatched note-off at tick ${tick}, channel ${channel}, pitch ${a}`);
        const note = queue.list[queue.next++];
        note.end = tick; note.releaseVelocity = b; note.zeroVelocityOff = kind === 9;
        if (queue.next === queue.list.length) active.delete(key);
      } else {
        const label = { 10: 'polyphonic pressure', 11: `controller ${a}`, 13: 'channel pressure', 14: 'pitch bend' }[kind];
        recordOther(label, index, tick);
      }
    }
    if (!ended) tr.fail('missing end-of-track');
    if (active.size) {
      const { list, next } = active.values().next().value;
      tr.fail(`unmatched note-on ${list[next].id}`);
    }
    tracks.push({ index, name, noteCount, channels: [...channels].sort((a, b) => a - b), programs: [], endTick: tick });
  }
  if (tracks.length !== count) c.fail('fewer tracks than declared');
  // Programs belong to the port/channel, not the track. Resolve across type-1
  // tracks after parsing; stable sort preserves file order at equal ticks.
  const programs = new Map(), seen = tracks.map(() => new Set());
  for (const e of stateEvents.sort((a, b) => a.tick - b.tick)) {
    const key = e.port * 16 + e.channel;
    if (e.change) { programs.set(key, e.change.program); seen[e.change.track].add(e.change.program); }
    else { e.note.program = programs.get(key) ?? 0; seen[e.note.track].add(e.note.program); }
  }
  for (const t of tracks) t.programs = [...seen[t.index]].sort((a, b) => a - b);
  notes.sort((a, b) => a.start - b.start);
  programChanges.sort((a, b) => a.tick - b.tick);
  return { sha256: createHash('sha256').update(bytes).digest('hex'), format, ppq, tracks, notes, programChanges,
    tempos: timeline(tempos, { tick: 0, us: 500000 }),
    meters: timeline(meters, { tick: 0, n: 4, d: 4, clocks: 24, thirtySeconds: 8 }),
    keys: timeline(keys, { tick: 0, sf: 0, minor: false }), unsupported };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2), paths = args.filter(a => a !== '--notes');
    if (paths.length !== 1 || args.length > 2) throw new Error('usage: node smf.mjs INPUT [--notes]');
    const { notes, ...summary } = readMidi(paths[0]);
    console.log(JSON.stringify({ ...summary, noteCount: notes.length, ...(args.includes('--notes') && { notes }) }, null, 2));
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}

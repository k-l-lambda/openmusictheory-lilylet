---
name: transcribe-midi
description: Convert MIDI note events into auditable Lilylet notation and optional split MIDI, with configurable bars, parts, routing, quantization, clefs, relative-pitch checks, and a Lilylet/MEI/Verovio round trip. Use for MIDI cleanup, notation drafts, or instrument-part reconstruction; do not treat a renderable result as a verified transcription.
---

# Transcribe MIDI to Lilylet

Use this skill when the input is already MIDI and the goal is readable, editable Lilylet notation, a source-preserving part split, or a measured round-trip check. The workflow is intentionally conservative: MIDI supplies note events and timing evidence; the profile supplies musical interpretation.

## Quick start

From the repository root:

```sh
node .claude/skills/transcribe-midi/smf.mjs input.mid
node .claude/skills/transcribe-midi/transcribe.mjs input.mid --config profile.json --out-dir out
node .claude/skills/transcribe-midi/verify.mjs input.mid out/score.lyl out/audit.json out/verify
node .claude/skills/transcribe-midi/split-midi.mjs input.mid out/audit.json out/parts.mid
```

The helpers use only the Node standard library plus this checkout's installed `@k-l-lambda/lilylet` and `verovio` packages. No Python MIDI package is required. Run all commands with paths passed as arguments; never overwrite the source MIDI.

The output directory must be new or empty. It normally contains:

- `score.lyl`: notation draft;
- `bars.json`: the resolved bar map and provenance;
- `audit.json`: source-note IDs, routing, quantization, printed events, and warnings;
- `verify/report.json`: structural, pitch, onset, duration/tie, and timbre diagnostics;
- optionally `parts.mid`: a MIDI split generated from the same audit assignments.

## Decide the interpretation before writing notes

MIDI tracks and channels are evidence, not automatically Lilylet parts. Before transcription, establish:

1. **Bar boundaries.** Prefer independently marked audio/score downbeats. A fitted constant grid is only an `inferred` fallback. Bars are half-open `[startTick, endTick)` and must be ordered, non-overlapping, and cover every note you claim to transcribe.
2. **Parts and staves.** Declare part IDs, visible order, staff IDs, clefs, optional ottava, programs, and output channels.
3. **Routing.** Use ordered, non-overlapping rules matching source track, channel, active program, tick region, pitch range, or explicit note IDs. Route by note onset; a held note stays in its assigned part unless the profile explicitly requests another policy.
4. **Quantization.** Choose a local grid per part/region. Preserve performed timing in the audit. Simplify timing only when the profile asks for it.
5. **Polyphony.** Decide whether simultaneous attacks become chords and how overlaps become voices. Do not merge adjacent rapid attacks merely because their releases overlap.

### Default part order

If the profile explicitly lists `parts`, that order is authoritative. If it does not, order pitched parts by descending observed register (highest sounding median/max pitch first), then lower pitched parts, with drums/percussion last. This is why a vibraphone commonly appears before piano, strings, or bass in Lilylet. Treat this as a heuristic and record it in `audit.json`; users may override it with an explicit order.

## Profile format

See `schemas/profile.schema.json` and `examples/arii.json`. The useful shape is:

```json
{
  "source": {"track": 1, "channel": 0},
  "bars": {"bars": [{"bar": 1, "startTick": 0, "endTick": 880, "confidence": "manual", "reason": "audio downbeat"}]},
  "parts": [
    {"id": "vib", "name": "Vibraphone", "staffs": [{"id": "vib", "clef": "treble"}], "program": 11, "channel": 0},
    {"id": "piano", "name": "Piano", "staffs": [{"id": "pr", "clef": "treble"}, {"id": "pl", "clef": "bass"}], "program": 0, "channel": 1}
  ],
  "routes": [{"part": "vib", "track": 2}, {"part": "piano", "track": 1}],
  "notation": {"unit": 16, "grid": 2, "simultaneityTicks": 8, "voicePolicy": "explicit", "tiePolicy": "same-note-only"},
  "verification": {"onsetToleranceQuarter": 0.0625}
}
```

- `notation.unit` is integer score units per quarter; `grid` is the smallest snap unit. For example, 16 units/quarter and grid 2 gives 32nd-note positions (grid 4 gives 16ths).
- Use `bars.bars[].unit` or `landmarks` for a bar with rubato or an internal timing landmark. The same map is used by transcription and verification.
- `parts[].staffs` may contain one staff or a two-staff grand staff. `routes` are first-match rules; ambiguous or unassigned notes must be reported or rejected.
- Program/channel values affect generated MIDI metadata; instrument labels affect score labels and MEI definitions. They are not proof that the source timbre was identified correctly.

## Lilylet writing rules

The generated writer follows the local Lilylet tutorial (`static/docs/lilylet-tutorial.md` in a Lilylet Live Editor checkout, or `ai-guide/examples/lilylet-primer.md` here):

- `\\` separates voices inside a part; the part separator is the literal triple backslash `\\\`.
- `[staves "{pr-pl} strings"]` controls braces/brackets; `\staff "1"` selects a staff within the current part.
- Write each voice on its own physical line and leave a blank line between measures.
- Lilylet is relative-pitch notation. Newlines reset the pitch reference to middle C. Verify sounding pitches after serialization with the parser's `pitchToMidi`; do not guess octave marks from semitones alone. Chord-internal references and tie fragments need their own checks.
- Emit `\clef` only on first use or when it changes. Pure-rest voices do not need `\stemUp`/`\stemDown`. Use `\ottava #1`, `\ottava #-1`, and `\ottava #0` as scoped contexts. Use `\clef "percussion"` for drum display parts when supported by the installed version.
- A chord means genuinely simultaneous attacks within the configured tolerance. A rapid sequence is not a chord because note releases overlap.
- A cross-bar source note becomes tied segments only when the same source ID continues into the immediately following bar. Never use a tie to connect repeated attacks or to hide a quantization collision.

## Inspect, transcribe, verify

### Inspect

`smf.mjs INPUT.mid` reports format, PPQ, track names, channels, programs, note counts, tempo/meter/key changes, and end ticks. Use `--notes` when checking individual event identity. It handles notes in track 0 and format-1 multi-track files; do not assume the first musical track is index 1.

### Transcribe

`transcribe.mjs` reads the MIDI and profile, resolves routing once, splits crossing notes, quantizes locally, writes Lilylet, and records every source note and printed event in the audit. The audit is the contract consumed by `split-midi.mjs` and `verify.mjs`; do not reimplement routing separately in a downstream script.

If no profile is supplied, the helper may produce a clearly labeled inferred draft for simple MIDI, but a nontrivial expressive/polyphonic piece should fail or require an explicit bar map. Never present inferred bars as manually verified.

### Verify

`verify.mjs` reads the **written** Lilylet file back; it does not merely compare the transcriber's in-memory model. It reparses Lilylet, encodes MEI, loads Verovio, renders MIDI, and checks separately:

- structure: parts, staff counts, voices, clefs, ottava;
- source-note IDs and multiplicity;
- printed pitch/chord content;
- source/model and model/rendered onset matches by logical part;
- duration/release and tie differences;
- output program/channel/timbre diagnostics.

It compares logical parts, not raw Verovio track indexes. MIDI PPQ and tempo are normalized; duplicates remain duplicates. Exact, near, missing, extra, wrong-part, wrong-pitch, and duplicate categories are reported independently. A successful parse, MEI encoding, SVG render, or playback is not a fidelity pass.

### Split MIDI

`split-midi.mjs` consumes resolved audit assignments. It preserves source note pitch/start/end/velocity and reports what happened to controllers, pedals, bends, sysex, and other non-note events. Do not call the result lossless unless the report confirms that all relevant event classes were preserved. A split track's part order follows the audit/profile order; otherwise the highest-register heuristic applies and Vibraphone may be first.

## Validation checklist

- Keep source path/hash and generated paths in the report.
- Confirm every source note has one routing decision and one stable ID.
- Confirm bars are half-open, ordered, cover the claimed note range, and have confidence/provenance.
- Parse with no warnings; encode MEI; load Verovio.
- Check pitch/chord multiplicities before judging rhythm.
- Compare onset and release separately, with source PPQ/output PPQ and tolerance recorded.
- Check program/channel/timbre changes separately from notation fidelity.
- Render stacked SVG for visual review after structural checks; rendering is not proof.
- Listen to representative sections and inspect piano roll/score around all low-confidence bars.

## Common failures

- Treating `\\` as a part separator instead of an internal voice separator.
- Letting `[staves]` and `\staff` drift out of sync.
- Repeating octave marks after a tie or across a newline.
- Applying one global grid to rubato MIDI.
- Turning every overlap into a chord or every adjacent event into a tie.
- Comparing raw source ticks to regularized score ticks without a bar/landmark map.
- Dropping track-0 notes, channel-9 drums, program changes, or non-note events silently.
- Calling a self-consistent round trip a verified transcription.

## Provenance

Keep raw MIDI, profile, bar map, audit, reports, and tool versions together. Do not put credentials or private audio in the skill. Any audio-derived/manual bar map must say who/what established it and whether it is inferred, manually marked, or source-verified.

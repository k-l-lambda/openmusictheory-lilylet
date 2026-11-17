# MuseScore SVG → Lilylet

Converts MuseScore-exported page SVGs (`musescore-svg/*_p0.svg`) to Lilylet **drafts**.
A draft is never a verified transcription: SVG is drawing geometry, and the
importer can only be as faithful as the glyphs are unambiguous.

## Why the redesign

The first adapter (`musescoreToStarry.ts`, engine `starry`) turned drawing
geometry into Starry semantic points and let Starry's generic OMR regulator
guess onsets and voices. On this corpus it dropped about 17% of the events from
all voices (3,824 of 22,413). It timed out on 3 files, and it produced
renderable but wrong rhythms: half notes for beamed 32nds, `s64 s256` spacers,
and spurious 5:3 tuplets. MuseScore SVG is not a scan, though. Symbols are exact
outlines at exact positions, so the importer can reconstruct notation explicitly
and check itself, following the discipline of Starry's
`regulation-annotation-with-lilylet` skill:
- Lilylet and the event model must agree, and ticks are validated.
- Evaluation flags are triage, not verdicts.
- Automatic output stays separate from reviewed annotation.

## Pipeline (engine `graph`, default)

| Stage | File | What it does |
|---|---|---|
| SVG IR | `parser.ts`, `geometry.ts` | Paths with transforms, all attributes, ids, group ancestry, inherited style, vertex lists. Images and text are kept as non-path nodes. |
| Layout | `layout.ts` | Staves, systems and measure barlines (geometry only). |
| Glyphs | `glyphs.ts` | Rebuilds symbol instances from contours (outline plus counters) and classifies them by topology and size: noteheads (black, half, whole, breve, circled, cue), rests, accidentals, clefs, hook flags. |
| Event graph | `notation.ts` | Heads ↔ stems, beams (one level per polygon crossing a stem; polygons join groups), hooks, dots, accidentals (with measure memory and key), tuplet numbers and brackets, two-note tremolos, ties, clef/key/time contexts. Articulations are attached to the nearest event: staccato, accent, tenuto, marcato, staccatissimo, plus fermatas and trills. Tempo marks are recognized too. Each event keeps its SVG source indices. |
| Outlined text | `text.ts` | Segments text outlines into marks and characters. Characters are recognized by nearest neighbour against `tempo-glyphs.json`, which is built by `learn-tempo-glyphs.ts` from hand transcriptions of all 47 corpus tempo elements (`tempo-transcriptions.json`). Metronome note symbols are parsed into `\tempo "text" 4. = 66`. |
| Timing | `timing.ts` | Voices per staff (stem direction, column collisions, rest height), onsets aligned to engraved columns across staves, measure flags. |
| Writer | `lilyletWriter.ts` | Lilylet text, plus the note list it must encode. |
| Check | `checkLilylet.ts` | Parse without warnings and encode MEI. Reparse into notes (`scripts/v2/scores/dump-notes.ts`) that must equal the model, and compare tempo contexts and articulation/ornament counts with what was written. |
| Report | `convert.ts` | Quality report: grade, consistent measures, flags, diagnostics, unrepresented classes. |

Time-signature digits are recognized by an 8×10 raster fingerprint learned
from the corpus (`learn-time-digits.ts` → `time-digits.json`). Each signature
must agree with the content of the measures it governs. The labels were also
checked by eye. Unknown digits are completed from the content and reported.

### Measure flags (cf. `evaluateMeasure`)

- `surplusTime`: a voice exceeds the measure.
- `shortMeasure`: a voice falls short.
- `tickOverlapped`: an event cannot start at its column's onset.
- `columnTwist`: an event sits off its column.
- `columnConflict`: complete voices disagree on a column.
- `voiceGap`: padding inside a voice, which usually means a misread value.
- `tooManyVoices`: three or more events share a column in one staff.
- `tupletUncertain`: the ratio was inferred.
- `unknownDuration`: a pitch or value is unknown.

**Grades:**
- `consistent`: every measure is fine and the round-trip check passes.
- `flagged`: some measures are not fine.
- `broken`: the round-trip check failed.

`consistent` means internally consistent, **not** faithful; compare the render with the source.

### Known limits (reported, not guessed)

These are not transcribed. They are counted in `unrepresented`:
- Outlined text other than tempo: lyrics, chord symbols, Roman numerals, staff text.
- Dynamics, hairpins, slurs, ottava lines, colours and analysis boxes.
- Ornaments other than trills.

Tempo-text recognition reads all 47 corpus marks. Leave-one-file-out accuracy is 94% of characters, so on unseen files any tempo text with an unread character is dropped (`tempo-unread`); a readable metronome is kept. Metric equations (♪ = ♪) are reported, not written. Two-note tremolos (`\repeat tremolo`) and single-note tremolos (`c2:32`) need lilylet 0.1.97 or later for correct MEI and kept marks.

Filled heads without stems are written as quarter notes (`stemless-filled`), because Lilylet has no stemless notes.
Single-note tremolo strokes are ignored. Triplets printed without a number cannot be distinguished from overfull measures; they are flagged.

## Tools

```sh
node --import tsx scripts/svg/svg-to-lilylet.ts musescore-svg/X_p0.svg [--report r.json] [--engine starry]
node --import tsx scripts/svg/inspect-measure.ts musescore-svg/X_p0.svg --mi 3   # events, voices+ticks, flags, lyl, tick validation
node --import tsx scripts/svg/corpus-report.ts /tmp/omt-svg-corpus                # quality gate over all 453 first pages
node --import tsx scripts/svg/batch-to-lilylet.ts --limit 453                    # ledger + drafts in /tmp/omt-musescore-svg-v2
node --import tsx scripts/svg/learn-time-digits.ts [--write]                      # relearn digit fingerprints
node --import tsx --test scripts/svg/*.test.ts
```

The batch ledger records, per row:
- the engine, and an importer hash over the engine's files;
- source and draft paths, plus the quality summary;
- `checker` (the round-trip check result) and the review state.

A changed source, importer or draft invalidates an earlier review. The review
page (`npm run omr-review-musescore`, see `omr-review/README-musescore.md`)
shows the quality grade and flags, with the legacy draft alongside for comparison.

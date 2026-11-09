# Brief: transcribe OMT 2e (v2) notation images into lilylet — one batch

Repo: /home/camus/work/openmusictheory-lilylet, branch `v2` (already checked out). Today is 2026-11-09.

## Hard rules
- **No git**: don't commit, stage, stash, switch branches or touch the index. Other agents work in this tree at the same time.
- **Write only**: the `.lyl`/`.md` outputs listed in your batch file, your batch result JSON, and your temp dir `/tmp/omt-v2-img/<BATCH>/`. Don't edit anything else (not `scripts/`, not `v2/` chapter files, not `Graphics/`, not other batches' outputs). Delete temp files you don't need at the end, but keep the `cmp/` PNGs (see below).
- Don't spawn sub-agents. Do the work yourself.
- Never print big binaries or long HTML/SVG to stdout. Images: view them with the Read tool (crops, not huge full pages, to save context).
- For non-China URLs use `curl -x http://localhost:1091`. You shouldn't need the network.

## Read first (quickly)
1. `/home/camus/work/starry/.claude/skills/lilylet-annotation/SKILL.md` — conventions, OMR error classes, verification. Follow it.
2. `/home/camus/work/starry/.claude/skills/lilylet-annotation/references/omt-batch-2026-11.md` — patterns and the per-file checklist.
3. `/tmp/omt-v2-img/lilylet-tutorial.md` — syntax reference (local copy). Grammar: `/home/camus/work/lilylet/source/lilylet/lilylet.jison`; unit cases with syntax examples: `/home/camus/work/lilylet/tests/assets/unit-cases/*.lyl` (grep them for a feature before using it).
4. Look at 2–3 finished V1 examples in `Graphics/lilylet/` similar to your images (e.g. `cadences/`, `counterpoint/`, `harmony/`, `form/`, `postTonal/*.md`, `N-AugSixths.lyl`, `defaultFigures.lyl`, `beethoven_18_2.lyl`, `DMUDB.lyl`).

## Your inputs
`/tmp/omt-v2-img/batches/<BATCH>.json`: a list of items `{index, image, source_png, lyl, chapter, recommendation, caption, flags, reason, bars, staves}`.
- `source_png` is the file to read (it may differ from `image`: full-size versions of 150px thumbnails, the rasterized bebop PDF).
- `lyl` is the output path. Use exactly that path; if you write a `.md` instead (several examples + text, see below), use the same path with `.md`.
- `chapter` is the v2 chapter file under `v2/` that shows the image; read the paragraph around the image (grep its filename) when you need context (what's being illustrated, composer, piece, bar numbers).

## Tools (already written; use them)
- **Check**: `npx tsx scripts/v2/images/check-lyl.ts [--pitches] <file.lyl|file.md>` (run from the repo root). Reports parse errors and warnings, unknown backslash commands, `\times`, ignored `*N` multipliers, duration 0, MEI errors, and every voice whose bar doesn't sum to the time signature (or its `\partial`). `--pitches` prints every voice's pitches per bar in scientific notation (C4 = middle C). It must print `OK` for every score before you finish.
- **Compare**: `python3 scripts/v2/images/compare.py <source_png> <lyl|md> /tmp/omt-v2-img/<BATCH>/cmp/<basename>.png [--crop x0,y0,x1,y1] [--block N]` renders with Verovio (`scripts/render-lyl.ts`) and stacks the original (top) over the render (bottom). Use `--crop` to compare one example of a multi-example image and `--block N` for the Nth ```lyl block of a .md. Then **look at the PNG** (Read tool) and compare bar by bar.
  - It renders every page (`scripts/v2/images/render.ts`) at full height; crop the PNG to compare system by system.
- **OMR**: `scripts/v2/images/omr.sh <image> /tmp/omt-v2-img/<BATCH>/<name>.raw.lyl [--upscale 2]`. It wraps `scripts/omr-convert.sh` against the local STARRY service (http://localhost:3080, processes gauge/semantic/mask; ocr and brackets predictors are NOT running, so no text, tempo, lyrics or braces). It holds a global lock, so requests from all agents run one at a time: expect queueing. It prints regulation quality and solved/issue/fatal; record them. ~15–60 s per image. Crop multi-example or annotated images into separate PNGs (PIL, with a white margin) before OMR; upscale small/low-res crops (staff < ~60 px tall) 2–3×.

## Method
**Hand** (`recommendation: hand`): view the image (enlarge crops with PIL, NEAREST 3–6× for small images; for pitches, find staff-line y's by row darkness and overlay a labelled grid for the clef). Write the .lyl. Check, compare, fix, repeat until the render matches note for note.

**OMR** (`omr` / `omr+hand`): run OMR, then treat the raw output as a draft: fix it bar by bar against the image (see the SKILL's OMR error table: fake tuplets, key-relative spelling, merged/dropped bars, 2/4 read as 4/4, missing graces/dynamics/staccatos/ties, voices on the wrong staff, no braces → merge piano into one `[staves "{-}"]` part). Add all analysis annotations by hand (brackets, phrase labels, Roman numerals, figures, text). If OMR fails or is wildly wrong (quality < ~50% or garbage), write it by hand instead and set `method: hand` with a note. Use `method: omr` when the OMR draft needed only notation fixes and no added annotation; `omr+hand` when you also added annotations or rewrote substantial parts.

**Bar for "done"**: the render matches the original — pitches, rhythms, clefs, key and time signatures, accidentals, ties, slurs, voices, staves, figures, Roman numerals and labels — bar by bar. `check-lyl.ts` prints OK. You looked at the compare PNG after your last edit.

## Conventions (summary; the SKILL has details)
- Header: `[title "..."]` (descriptive, from the caption/content), `[composer "..."]` when a real piece is shown. Grand staff: `[staves "{-}"]`, ONE part, `\staff "1"`/`"2"`, voices separated by `\\`. Ensembles: one part per instrument, parts separated by the 4-backslash separator (see `Graphics/lilylet/beethoven_18_2.lyl`), `[staves "<v1-v2-va-vc>"]`, `[instrument-*]`. Voice + piano: `Graphics/lilylet/DMUDB.lyl`.
- Write measure by measure, one source line per staff/part per bar, ending `| %N`.
- **Relative pitch restarts at middle C on every source line.** Spelling is key-independent (`fs` in G major; plain `f` is F♮). Never `\times`; use `\tuplet 3/2 { }`. Courtesy `!` only draws after an in-bar accidental.
- Unmetered examples: `\omit Score.TimeSignature` (drop `\time` or keep it for bar-length checking — both are fine; `\omit` hides it), `\omit Score.BarLine` when there are no barlines, `\undo \omit Score.BarLine \bar "||"` (or `"|."`) to show a final barline. Don't split one barless bar into many to space notes.
- Labels: rows of figures → `\figures { <6 4>4 ... }` (see `figures-*.lyl` unit cases; slashed figure → raised: `<6+>`); Roman numerals, function labels, interval names, scale degrees, chord names → `\addlyrics { }` lanes (one lane per stacked row; `_` skips a note, tie continuations included; `\bar` before `\addlyrics`). Single marks → `^\markup "..."` / `_\markup "..."`. Jazz chord symbols → `\chords "Dm7"` (attaches to the PRECEDING note/rest/spacer).
- Form/phrase brackets ("bi", "c.i.", "presentation", "continuation", "PAC", "HC", "antecedent", ...): put the label text as `^\markup "..."` (or `_\markup`) on the note where the bracket starts; a lane is fine if there are many. Note in `notes` that the bracket line itself isn't drawn.
- Things lilylet can't draw (boxes, circles, arrows, colour, highlighting, brackets, clock faces, greyed notes): approximate with markup text if it carries meaning, otherwise omit; always list them in `notes`.
- Several separate examples in one image: if they share one staff layout, one .lyl with `\bar "||"` between examples and a `^\markup "(a)"` label is fine. If they differ (different staves/clefs/instruments) or there's substantial text between them, write ONE `.md` at the `lyl` path with `.md`: text as paragraphs, each example in its own ```lyl fenced block. Never write both a .md and a .lyl for one image.

## Feature status (checked 2026-11-09 against lilylet HEAD 0.1.94)
- **Breve**: NOT supported. `c'0` silently becomes a quarter note in MEI; `\breve` lexes as notes. Write two tied whole notes in a `\time 4/2`-style bar (or a whole note) and note "breve not expressible". **Breve rest**: likewise; use two whole rests and note it.
- **Caesura**: NOT supported (`\caesura` silently lexes as notes c a e ...). Use `^\markup "//"` and note it.
- **Breath mark**: `\breathe` works (post-event: `c'2\breathe`).
- **Multi-measure rest**: `R1` works for ONE bar; `R1*4` silently ignores `*4`. A numbered multi-bar rest can't be drawn: write the bars out (`R1` per bar) and note it, or one `R1` with `^\markup "4"` if the image shows one symbol with a number (note which).
- **Fermata** `\fermata`, **coda** `\coda`, **segno** `\segno` (post-events) work. D.C./D.S./Fine/"To Coda" text → `^\markup "D.C. al Fine"` on a note. Repeat barlines: `\bar ".|:"`, `\bar ":|."`, `\bar ":|.|:"`; volta brackets are not supported (markup "1." / "2." and note it).
- **Slash notation / chord symbols over slash bars**: no slash noteheads (`\improvisationOn`, `\xNote` lex as notes!). Use spacers or rests with chord symbols (`s4 \chords "Dm7" s s s` or `s1 \chords "Dm7"`) and note "slash noteheads not expressible". **Measure-repeat sign** (𝄎): not supported; write the repeated content out (or spacer bar + `^\markup "%"`) and note it.
- **`\cmd_` without a space lexes as notes** for most commands (`\coda_\markup`, `\fermata_`, `\mf_`, `\staccato_` …): always put a space before `_`/`^` after a command. `check-lyl.ts` flags it.
- **Unknown commands never error**: `\foo` becomes notes/dynamics. `check-lyl.ts` lists them — none may remain.
- **Markup on a rest/spacer is dropped** (`s1^\markup "A"` draws nothing). Put the markup BEFORE it as a standalone event: `^\markup "A" s1`, or after a `\chords`. Markup on notes works normally.
- **Repeated accidental within a bar is drawn again** (`bf'4 a bf c` prints two flats): a lilylet bug, don't hack around it; just mention it in notes if visible.
- More known bugs (note them, don't hack): `^`/`_` on dynamics is ignored; a dynamic written before a `_\markup` on the same note is dropped (write the markup first); slurs and hairpins that start inside a `\tuplet` are dropped or mis-paired; a `\tuplet` nested in a `\tuplet` is dropped; one key signature per measure for ALL staves (transposing instruments get the concert key signature); `\segno` doesn't render; no parenthesised cautionary accidental; stacked markups on one note print in reverse order; a post-event inside `\repeat tremolo` is a parse error; no `\fpp`; a cross-staff `\staff "2"` inside a piano part that is NOT the first part lands on the wrong staff (the number isn't offset by the earlier parts' staves); a slur whose two ends are on different staves of one voice is dropped; **`[staves "x"]` on a single-staff score crashes Verovio** (`RuntimeError: null function`) — omit `[staves]` for one staff; a `\staff` switch inside a `\tuplet` is lost; a tie from the last note of a `\tuplet` loses its end; `\stemUp` doesn't reach notes inside a `\tuplet`; a repeated `\key` after a clef change isn't redrawn.
- If a passage is too blurry to read with confidence, don't guess: transcribe what's certain and mark `ok-with-notes` naming the uncertain bars, or `failed` if the result wouldn't be a faithful transcription.
- Keep temp scripts in your temp dir, not in `scripts/` (import lilylet by absolute path `/home/camus/work/lilylet/source/lilylet/index.ts`).
- Tenor clef, `\figures`, `\omit`, extended dynamics (`\sfp`, `\mfp`, ...) are supported.
- Known gaps: tie on a single chord note (put the tied note in its own voice); a `\clef` in a non-first voice only reaches layer 1 (put clef changes at the end of the previous bar); no hidden system start line between independent staves.

## Result file (required)
Write `/tmp/omt-v2-img/<BATCH>/result.json` — update it after EACH image, so partial work survives:
```json
[{"index": 221, "image": "v2/media/2019/08/anything-goes-1.png", "lyl": "v2/lilylet/images/2019/08/anything-goes-1.lyl",
  "chapter": "06-jazz/01-swing-rhythms.md", "method": "hand", "status": "ok",
  "omr": null, "notes": "..."}]
```
- `lyl`: the path you actually wrote (.lyl or .md); `null` if nothing was written.
- `method`: `hand` | `omr` | `omr+hand`.
- `status`: `ok` (matches the image, nothing lost) | `ok-with-notes` (matches, but something in the image couldn't be expressed or is uncertain — say what in `notes`) | `failed` (couldn't produce a faithful transcription; say why) | `skipped` (not notation after all, or out of scope; say why).
- `omr`: for OMR items, `"quality 92%, solved 8 / issue 1 / fatal 0"` (per crop if several), else null.
- `notes`: short, concrete: inexpressible features, uncertain readings (bar N), OMR errors fixed (brief), lilylet bugs found.

## Final reply (≤ 20 lines)
Per image one line: index, basename, method, status, key note. Then: lilylet bugs found (with a minimal repro each), OMR quality observations, total line. Don't paste file contents.

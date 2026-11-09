# v2 score files → lilylet

Converts the MuseScore/MusicXML files of OMT 2nd edition (`v2/media/`, listed in
`v2/materials.json`) to `v2/lilylet/<YYYY/MM>/<base>.lyl` and checks every one of them.
`v2/lilylet/MANIFEST.md` / `.json` give the result per file.

Needs `v2/media/` (run `scripts/v2/convert.py`), the lilylet source at
`../lilylet/source/lilylet` (used as is, never modified), MuseScore 4.6 extracted at
`~/bin/squashfs-root` (override with `MSCORE=`), `xvfb-run`, music21, node/tsx, and
google-chrome for the visual check.

```sh
W=/tmp/omt-v2-scores
python3 scripts/v2/scores/inventory.py   --work $W   # unique score files from materials.json
python3 scripts/v2/scores/to_musicxml.py --work $W --png   # MuseScore → MusicXML + page PNGs
python3 scripts/v2/scores/extract_m21.py --work $W   # reference notes per staff (music21)
python3 scripts/v2/scores/harmonies.py   --work $W   # chord symbols (XML position, mscx text), figured bass, bar clefs
python3 scripts/v2/scores/hidden.py      --work $W   # invisible notes in the sources
npx tsx scripts/v2/scores/convert.ts     --work $W --svg   # decode → post-process → .lyl → MEI → Verovio
python3 scripts/v2/scores/compare.py     --work $W   # .lyl vs music21: bars, staves, notes, chords
npx tsx scripts/v2/scores/check_clefs.ts --work $W   # clef at every bar start vs the mscx
npx tsx scripts/v2/scores/split.ts $W/lyl/2019/05/The_48_Fugue_Subjects_of_the_Well-Tempered_Clavier.lyl \
    $W/lyl/2019/05/The_48_Fugue_Subjects_of_the_Well-Tempered_Clavier --wtc   # one file per subject
python3 scripts/v2/scores/build_manifest.py --work $W   # copy to v2/lilylet/, write MANIFEST (+ review.json)
python3 scripts/v2/embed.py              # embed the scores in the chapters (also run by convert.py)
python3 scripts/v2/scores/sidebyside.py --work $W 2022/08/III-Solutions …   # MuseScore | Verovio PNG
npx tsx scripts/v2/scores/repro.ts       # lilylet bugs worked around here: BUG / fixed
```

Visual review (MuseScore's rendering of the source vs the lilylet rendering):

```sh
node omr-review/build.mjs --v2           # omr-review/v2.html; runs render_pages.py for new files
python3 scripts/v2/scores/render_pages.py   # MuseScore page PNGs + bars per page -> omr-review/v2-renders/
npx tsx scripts/v2/scores/review_sheets.ts --out /tmp/sheets [--pages all] [REL …]   # page-by-page PNGs
```

`review.json` records what was checked by eye: `{rel: {checked: date, note?, issue?, minor?}}`.
build_manifest.py copies it into the manifest (column *reviewed*); an issue keeps the file
at ok-with-notes unless it is marked `minor` (cosmetic).

## Invisible elements

Worksheets hide their answer keys: invisible notes, rests and chord symbols. MuseScore
4.6 exports an invisible note as `<notehead>none</notehead>`, an invisible rest or chord
symbol with `print-object="no"`, and leaves invisible staff texts out. The decoder ignores
both marks, so `extract_m21.py` lists the hidden notes/rests per staff, `harmonies.py`
skips hidden chord symbols on both sides, and `postprocess.ts` (`hideInvisible`) writes
the matching events as spacers `s` of the same length (a hidden note inside a visible chord
is removed from the chord). The comparison is then against the visible notes only.
`hidden.py` counts `<visible>0</visible>` in the .mscx independently, and build_manifest.py
requires the two counts to agree.

## What the checks are

- `convert.ts`: the `.lyl` parses with no `getParseWarnings()`; the MEI loads in Verovio
  (its warnings are recorded); dropping the restated `\key`/`\time` changes neither the
  notes nor the MEI; a mark/event histogram (dynamics, articulations, slurs, ties, lyrics,
  chord symbols) is the same before serializing and after parsing back.
- `compare.py`: per staff, the multiset of (bar, onset, pitch spelling, duration, grace)
  equals music21's reading of the MusicXML, bar and staff counts agree, and the chord
  symbols agree by (part, bar, text) and position.

## Work-arounds (`postprocess.ts`)

Each is a lilylet or MuseScore issue; `repro.ts` has a minimal case for every lilylet one.

- unpitched (percussion) notes → pitches at their staff position (decoder drops them)
- chords inside tuplets: tuplet markers removed before decoding, groups rebuilt after
- `<time-modification>` without `<tuplet>`: wrapped in `\tuplet`
- zero-net `<backup>/<forward>` around directions removed (decoder adds spacer rests)
- breves → tied whole notes; full-bar rests in long bars → `R1`
- `<time symbol>` restored; fingerings outside 1–5 and duplicate chord ties dropped
- chord symbols re-placed and re-texted (decoder piles them at the end of voice 1, drops
  Roman numerals, serializer writes none; MuseScore's export flattens their text)
- tenuto passed through the serializer as a sentinel (it writes `-_` = portato)
- space between a dynamic and `_` (`\pp _\markup`), which the lexer otherwise drops
- `\key`/`\time` written only where they change; `[title]`/`[composer]`/`[staves]`/
  `[instrument-…]` from the MusicXML, template titles dropped
- files saved by MuseScore 4.7 are re-stamped as 4.60 so 4.6.5 opens them
- clefs at bar starts: MuseScore 4.6.5's MusicXML export drops a clef change at the start of a
  bar unless a courtesy clef precedes it (header clefs, and many worksheets that change clef
  every bar). Pitches stay right, so compare.py cannot see it. to_musicxml.py turns header
  clefs into ordinary ones before the export; harmonies.py reads the clef at every bar start
  from the mscx (`clefs/`), and `applyBarClefs` inserts the missing ones. `check_clefs.ts`
  compares the clef in force at every bar, per staff, with the source.
- texts / exercise numbers / dynamics whose next note is a rest: lilylet drops every mark on a
  rest or spacer, and the decoder moved such a direction onto the next note (often another
  staff or bar). They are dropped before decoding and listed in the notes; real words make
  the file ok-with-notes ("TEXT ON RESTS LOST"), blank answer lines and numbers do not.
- figured bass from `<figured-bass>` and free-text `<FiguredBass>` in the mscx (`figs/`),
  which the decoder (and MuseScore's export) drop
- invisible notes / rests → spacers (see above); lilylet drops marks on a spacer, so a
  text or dynamic on a hidden note is dropped (counted in the notes)

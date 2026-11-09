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
python3 scripts/v2/scores/harmonies.py   --work $W   # chord symbols: position (XML) + text (mscx)
python3 scripts/v2/scores/hidden.py      --work $W   # invisible notes in the sources
npx tsx scripts/v2/scores/convert.ts     --work $W --svg   # decode → post-process → .lyl → MEI → Verovio
python3 scripts/v2/scores/compare.py     --work $W   # .lyl vs music21: bars, staves, notes, chords
npx tsx scripts/v2/scores/split.ts $W/lyl/2019/05/The_48_Fugue_Subjects_of_the_Well-Tempered_Clavier.lyl \
    $W/lyl/2019/05/The_48_Fugue_Subjects_of_the_Well-Tempered_Clavier --wtc   # one file per subject
python3 scripts/v2/scores/build_manifest.py --work $W   # copy to v2/lilylet/, write MANIFEST
python3 scripts/v2/scores/sidebyside.py --work $W 2022/08/III-Solutions …   # MuseScore | Verovio PNG
npx tsx scripts/v2/scores/repro.ts       # lilylet bugs worked around here: BUG / fixed
```

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

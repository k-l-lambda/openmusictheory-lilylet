---
title: "Fix 1: leave out the fifth of I (tripled bass)"
id: 05-t1dropfifth
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/cadences, 01-harmonic-functions/voice-leading-rules]
tags: [leaving-out-the-fifth, keyboard-schema, incomplete-chord, tripled-root]
source_image: Graphics/harmony/T1dropFifth.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/T1dropFifth.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# Fix 1: leave out the fifth of I (tripled bass)

The first fix for [the problem](d5problem.md): keep V7 complete and leave the fifth out of **I**, tripling the bass.

## What to look for

- D5: `<A4 C5>` + F♯5 over D3 = complete V7, as in the problem case.
- T1: `<G4 B4>` + G5 over G2 = G B G G: **no fifth (D)**, root tripled.
- Now the seventh resolves: C5 → B4 (fa–mi), F♯5 → G5 (ti–do), A4 → G4.
- The page: this works, but the incomplete V7 ([fix 2](d5dropfifth.md)) is preferable.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/T1dropFifth.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "T1 with dropped fifth"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp fs'2 g \\
\staff "1" \stemDown <a' c>2 <g b> \\
\staff "2" \clef "bass" d,2 g, \bar "|."
^\figures { <7>2 s }
\addlyrics { D5 T1 } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

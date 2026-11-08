---
title: "Parallel tenths: T(1 D2p 3)"
id: 05-paralleltenths
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/voice-leading-rules, 01-harmonic-functions/prolongation]
tags: [parallel-tenths, keyboard-schema, four-three, unresolved-seventh, tonic-prolongation]
source_image: Graphics/harmony/ParallelTenths.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/ParallelTenths.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# Parallel tenths: T(1 D2p 3)

*do–re–mi* in the bass against *mi–fa–sol* in the melody: outer voices in **parallel tenths** over a passing **V4/3**.

## What to look for

- Bass G2 → A2 → B2; soprano B4 → C5 → D5. Each pair is a tenth (G2–B4, A2–C5, B2–D5).
- Middle chord: `<D4 F♯4>` + C5 over A2 = D7 with the fifth in the bass = **V4/3**. Figures `4/3` then `6`.
- The page's point: the soprano *fa* (C5) moves **up** to D5 and doesn't resolve. As in the D2 voice exchange, the smooth voice leading overrides the need to resolve it.
- The page says this almost always uses V4/3 for D2, and works in major or minor and in reverse.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/ParallelTenths.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Parallel tenths: T(1 D2p 3)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 c d \\
\staff "1" \stemDown <d g>2 <d fs> <d g> \\
\staff "2" \clef "bass" g,2 a b \bar "|."
^\figures { s2 <4 3> <6> }
\addlyrics { T(1 D2p 3) } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

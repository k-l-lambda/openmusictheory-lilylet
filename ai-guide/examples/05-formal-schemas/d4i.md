---
title: "Voice exchange with D4 substitute: T(1 D4i 3)"
id: 05-d4i
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/voice-leading-rules, 01-harmonic-functions/prolongation]
tags: [voice-exchange, keyboard-schema, four-two, D4, tonic-prolongation]
source_image: Graphics/harmony/D4i.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/D4i.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# Voice exchange with D4 substitute: T(1 D4i 3)

The voice exchange with a **D4 substitute** (V4/2) in the middle. Per the page, the upper voices are exactly those of the V6/4 version.

## What to look for

- Bass G2 → C3 → B2 (do–fa–mi); soprano B4 → A4 → G4 (mi–re–do).
- Middle chord: `<D4 F♯4>` + A4 over C3 = D7 with the seventh in the bass = **V4/2 (D4)**. Figures `4/2` then `6`.
- The bass seventh C3 resolves down to B2, the *fa*–*mi* resolution of the functional dissonance.
- The upper voices are identical to [VE64](ve64.md) (B–A–G over `<D G>`, `<D F♯>`, `<D G>`). Only the bass changes.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/D4i.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "D4i: T(1 D4i 3)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 a g \\
\staff "1" \stemDown <d g>2 <d fs> <d g> \\
\staff "2" \clef "bass" g,2 c b \bar "|."
^\figures { s2 <4 2> <6> }
\addlyrics { T(1 D4i 3) } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

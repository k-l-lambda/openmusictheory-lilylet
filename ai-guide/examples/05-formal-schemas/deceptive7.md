---
title: "Deceptive resolution of V7: D5 Tx6"
id: 05-deceptive7
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/cadences, 01-harmonic-functions/voice-leading-rules]
tags: [deceptive-resolution, keyboard-schema, seventh-chord, doubling, tendency-tone]
source_image: Graphics/harmony/deceptive7.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/deceptive7.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# Deceptive resolution of V7: D5 Tx6

The deceptive resolution with a **V7**. Same voicing rule: *ti* → *do*, and the seventh resolves down.

## What to look for

- D5: `<C4 F♯4>` + A4 over D3 = V7 (the seventh C4 is in the alto). Figure `7`.
- Tx6: `<B3 G4>` + G4 over E3 = VI with *do* doubled, as in [deceptive](deceptive.md).
- Voice leading: F♯4 → G4 (ti–do), C4 → B3 (the seventh, fa → mi), A4 → G4 in the soprano, bass D3 → E3.
- The only difference from the triad version is C4 in place of D4 in the D5 chord.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/deceptive7.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Deceptive progression with seventh: D5 Tx6"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp a'2 g \\
\staff "1" \stemDown <c fs>2 <b g'> \\
\staff "2" \clef "bass" d,2 e \bar "|."
^\figures { <7>2 s }
\addlyrics { D5 Tx6 } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

---
title: "Pink champagne: T(1 S6d 3) with III"
id: 05-pinkchampagne
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/prolongation]
tags: [champagne-progression, pink-champagne, keyboard-schema, tonic-prolongation]
source_image: Graphics/harmony/PinkChampagne.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/PinkChampagne.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# Pink champagne: T(1 S6d 3) with III

Biringer's **pink champagne**, the champagne progression with **III** in place of I6 as the T3 chord. The page says it's especially nice and should be especially rare.

## What to look for

- Identical to [Champagne](champagne.md) up to the last chord. Soprano B4 → C5 → D5, bass G3 → E3 → B2.
- The last chord is `<D4 F♯4>` + D5 over B2 = B minor = **III** (root position, so there is no printed figure). Champagne has `<D4 G4>` here, giving I6.
- The only pitch difference from Champagne is G4 → F♯4 in the alto of the last chord.
- The label is the same, `T(1 S6d 3)`. The functional-bass label names the bass degree, *mi* = T3, so it fits I6 and III alike. The page says the champagne progression should only be used to prolong tonic.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/PinkChampagne.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Pink Champagne: T(1 S6d 3)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 c d \\
\staff "1" \stemDown <d g>2 <e g> <d fs> \\
\staff "2" \clef "bass" g2 e b \bar "|."
^\figures { s2 <6> s }
\addlyrics { T(1 S6d 3) } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

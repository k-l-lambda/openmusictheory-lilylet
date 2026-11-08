---
title: "Roman numerals from thoroughbass figures (7 tables)"
id: 01-roman-numerals-from-figures
category: example
topics: [01-harmonic-functions/harmonic-analysis]
tags: [figured-bass, roman-numerals, inversion, thoroughbass]
source_image: Graphics/Inversions/5-3chords.png
source_page: RNfromFB.md
lilylet: Graphics/lilylet/Inversions/5-3chords.lyl
provenance: hand
composer: null
work: null
key: "C major"
meter: null
---

# Roman numerals from thoroughbass figures (7 tables)

How to get a Roman numeral from a bass note and its figure: in every table the bass climbs C3 → B3 while the figure stays fixed.

## What to look for

- Rules from the page: for chords of the fifth (5/3, 7) the root *is* the bass note; for 6/3 or 6/5 "the root of the chord is the sixth above the bass"; for 6/4 or 4/3 it is the fourth above; for 4/2 it is a step above.
- Shown here: 5/3 chords, numerals I II III IV V VI VII on C3 … B3.
- The other six tables (same bass line, different figures; Roman numerals change accordingly):
- [6/3](../../../Graphics/lilylet/Inversions/6-3chords.lyl): VI VII I II III IV V. [6/5](../../../Graphics/lilylet/Inversions/6-5chords.lyl): same numerals. [6/4](../../../Graphics/lilylet/Inversions/6-4chords.lyl), [4/3](../../../Graphics/lilylet/Inversions/4-3chords.lyl): IV V VI VII I II III. [7](../../../Graphics/lilylet/Inversions/7chords.lyl): I … VII. [4/2](../../../Graphics/lilylet/Inversions/4-2chords.lyl): II III IV V VI VII I.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/Inversions/5-3chords.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Root-position triads (5/3)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <e g c>1 <f a d>1 <g b e>1 <a c f>1 <b d g>1 <c e a>1 <d f b>1 \\
\staff "2" \clef "bass" c,1 d1 e1 f1 g1 a1 b1 \undo \omit Score.BarLine \bar "||"
\addlyrics { I II III IV V VI VII } | %1
```
<!-- score:end -->

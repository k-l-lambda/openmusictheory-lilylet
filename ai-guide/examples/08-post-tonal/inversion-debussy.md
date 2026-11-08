---
title: "Inversion T4I: Debussy, La cathédrale engloutie, mm. 28–30"
id: 08-inversion-debussy
category: example
topics: [08-post-tonal/pitch-class-sets]
tags: [inversion, TnI, pitch-class-set, debussy]
source_image: Graphics/postTonal/inversion.png
source_page: inversion.md
lilylet: Graphics/lilylet/postTonal/inversion.lyl
provenance: omr
composer: Claude Debussy
work: "Préludes I, \"La cathédrale engloutie\", mm. 28–30"
key: none written
meter: 6/4 (not printed)
---

# Inversion T4I: Debussy, La cathédrale engloutie, mm. 28–30

Two gestures with the same interval content but mirrored arrangement, related by TnI. Topic: [Pitch-Class Sets](../../08-post-tonal/pitch-class-sets.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- **m. 28 (file `%1`):** the gesture starts on C, D, G = **{0, 2, 7}** (labelled). Each pc is a four-note chord in both hands over a C pedal (coll'8).
- **m. 30 (file `%3`):** the answering gesture is A, D, E = **{9, 2, 4}** (labelled).
- ***T4I*** {0, 2, 7} = {4−0, 4−2, 4−7} = **{4, 2, 9}**, using the topic's *Inversion (TnI)* formula (n − pc). Equivalently, the corresponding pcs C–E, D–D, G–A all sum to 4.
- **What changes:** the content is the same (both are (027)), but the arrangement is mirrored. The page notes that {A, D, E} has the +5 at the bottom instead of the top.
- **m. 29 (`%2`):** stepwise descending chords (G, F, E, D) connect the two gestures, under the original's T₄I arrow.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/postTonal/inversion.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Debussy, La cathédrale engloutie, mm. 28–30"]
[composer "Claude Debussy"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \time 6/4 \clef "treble" ^\markup "[28]" r2 <c e g c>2\ff^\markup "C, D, G = {0, 2, 7}"( <d f a d>2 \\
\staff "2" \clef "bass" r2 <g, c e g>2( <a d f a>2 \\
\staff "2" c,,1.~_\markup "coll'8" | %1

\staff "1" <g' b d g>2.^\markup "T₄I →" <f a c f>4 <e g b e>4 <d f a d>4 \\
\staff "2" <d, g b d>2. <c f a c>4 <b e g b>4 <a d f a>4 \\
\staff "2" c,,1.~ | %2

\staff "1" <d f a d>2^\markup "A, D, E = {9, 2, 4}" <a c e a>2 <e' g b e>2) \\
\staff "2" <a, d f a>2 <e a c e>2 <b' e g b>2) \\
\staff "2" c,,1. \bar "|" | %3
```
<!-- score:end -->

## Notes

- OMR-assisted transcription.
- twelveToneBasics.md uses this same image (`Graphics/postTonal/inversion.png`) as its "I₀" row example. The image is this Debussy passage, so that reference is a mismatch in the source site.

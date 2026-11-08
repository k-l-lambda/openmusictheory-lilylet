---
title: "Diatonic triads and their functions (C major)"
id: 01-triad-functions
category: example
topics: [01-harmonic-functions/tonic-subdominant-dominant]
tags: [function, triads, T-S-D, scale-degree]
source_image: Graphics/triadFunctions.png
source_page: null
lilylet: Graphics/lilylet/triadFunctions.lyl
provenance: hand
composer: null
work: null
key: "C major"
meter: null
---

# Diatonic triads and their functions (C major)

Every diatonic triad of C major with its Roman numeral and functional-bass label, as a lookup table.

## What to look for

- Bass C3 … B3, root-position triads above.
- Lane 1: I II III IV V VI VII. Lane 2: T1 S2 T3 S4 D5 Tx6 D7.
- Matches the topic's chord-to-function mapping: II and IV are S; V and VII are D; VI is Tx (a tonic substitute).

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/triadFunctions.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Triads on each scale degree and their functions"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <e g c>1 <f a d> <g b e> <a c f> <b d g> <c e a> <d f b> \undo \omit Score.BarLine \bar "||" \\
\staff "2" \clef "bass" c,1 d e f g a b
\addlyrics { I II III IV V VI VII }
\addlyrics { T1 S2 T3 S4 D5 Tx6 D7 } | %1
```
<!-- score:end -->

## Notes

- No OMT page references this image directly; it is the same table at a larger size as triadFunctionsSmall.png.

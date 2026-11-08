---
title: Double neighbor figure (DN)
id: 07-double-neighbor
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [double-neighbor, neighbor-tone, embellishing-tone, non-chord-tone]
source_image: Graphics/embellishingTones/doubleNeighbor.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/doubleNeighbor.lyl
provenance: hand
composer: null
work: null
key: C major
meter: null
---

# Double neighbor figure (DN)

A double neighbor: an upper and a lower neighbor in succession around one chord tone. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Soprano E5 (beat 1) → **F5 D5** (two eighths, beat 2) → E5 (half note) over C3.
- F5 is a step above and D5 a step below the embellished chord tone E5. The figure starts and ends on E5.
- Taken one at a time, each embellishing tone is an incomplete neighbor (F5 is left by leap to D5). Together they balance out, so the whole figure has the stability of a complete neighbor.
- It is unaccented: both tones fall on the weak beat 2.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/doubleNeighbor.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Double neighbor (DN)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e'4 f8[^\markup "DN" d] e2 \\
\staff "2" \clef "bass" c,1 \bar "|." | %1
```
<!-- score:end -->

## Notes

- The original circles both neighbors under one "DN" label; here it is one markup on F5.

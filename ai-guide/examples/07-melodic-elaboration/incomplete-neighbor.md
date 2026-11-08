---
title: Incomplete neighbor tone (INT)
id: 07-incomplete-neighbor
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [incomplete-neighbor, neighbor-tone, embellishing-tone, non-chord-tone]
source_image: Graphics/embellishingTones/INT.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/INT.lyl
provenance: hand
composer: null
work: null
key: C major
meter: null
---

# Incomplete neighbor tone (INT)

An incomplete neighbor approached by leap and resolved by step to an accented chord tone. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Soprano G5 (beat 1) → **D5** (beat 2) → E5 (half note, beat 3) over C3.
- D5 is approached by leap (a fourth down from the chord tone G5) and left by step (up to E5).
- D5 is unaccented, and the chord tone it leads to, E5 on beat 3, is accented. That matches the source's definition of INT.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/INT.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Incomplete neighbor (INT)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" g''4 d^\markup "INT" e2 \\
\staff "2" \clef "bass" c,1 \bar "|." | %1
```
<!-- score:end -->

## Notes

- The circle around the INT is not reproduced; the label is plain markup.

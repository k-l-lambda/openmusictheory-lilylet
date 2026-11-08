---
title: Complete neighbor tone (NT)
id: 07-neighbor-tone
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [neighbor-tone, upper-neighbor, embellishing-tone, non-chord-tone]
source_image: Graphics/embellishingTones/neighborTone.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/neighborTone.lyl
provenance: hand
composer: null
work: null
key: C major
meter: null
---

# Complete neighbor tone (NT)

An upper complete neighbor: the soprano leaves a chord tone by step and returns to the same note. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Soprano E5 (beat 1) → **F5** (beat 2) → E5 (half note) over a whole-note C3: F5 is an upper neighbor to the chord tone E5.
- Approach and departure are both by step, in opposite directions, and the figure begins and ends on the *same* stable tone.
- It falls on beat 2, so it is unaccented, which the source says is the more common case.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/neighborTone.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Neighbor tone (NT)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e'4 f^\markup "NT" e2 \\
\staff "2" \clef "bass" c,1 \bar "|." | %1
```
<!-- score:end -->

## Notes

- The original circles the NT; here the label is plain markup.

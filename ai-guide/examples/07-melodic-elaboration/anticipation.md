---
title: Anticipation (ANT)
id: 07-anticipation
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [anticipation, cadence, embellishing-tone, non-chord-tone]
source_image: Graphics/embellishingTones/anticipation.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/anticipation.lyl
provenance: hand
composer: null
work: null
key: C major
meter: null
---

# Anticipation (ANT)

An anticipation at a cadence: the tonic arrives in the soprano just before the bass changes from V to I. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Bass G3 (half note) → C3 (half note): V → I.
- Soprano B4 (dotted quarter) → **C5** (eighth, the second half of beat 2) → C5 (half note, beat 3).
- The eighth-note C5 sounds over G3, where it is a non-chord tone. It is then *rearticulated*, not tied, as a chord tone when the I harmony arrives on beat 3. That is the ANT.
- Approached by step and followed by the same note just before a change of harmony. This is the typical phrase-ending placement the source describes.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/anticipation.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Anticipation (ANT)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" b'4. c8^\markup "ANT" c2 \\
\staff "2" \clef "bass" g2 c,2 \bar "|." | %1
```
<!-- score:end -->

## Notes

- The circle around the ANT is not reproduced.

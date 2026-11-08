---
title: Passing tone (PT)
id: 07-passing-tone
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [passing-tone, embellishing-tone, non-chord-tone]
source_image: Graphics/embellishingTones/passingTone.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/passingTone.lyl
provenance: hand
composer: null
work: null
key: C major
meter: null
---

# Passing tone (PT)

The textbook passing tone: a step-filled third in the soprano over a sustained C-major bass. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Soprano E5 (beat 1) → **D5** (beat 2) → C5 (half note, beats 3–4) over a whole-note C3: D5 is the PT. It is a non-chord tone of the C-major harmony, approached and left by step in the same direction.
- It fills the third E–C. This is the *chord tone – PT – chord tone* figure the source page describes.
- It falls on beat 2, a weak beat, so it is an unaccented PT. A PT may also be accented.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/passingTone.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Passing tone (PT)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e'4 d^\markup "PT" c2 \\
\staff "2" \clef "bass" c,1 \bar "|." | %1
```
<!-- score:end -->

## Notes

- The original circles the PT and prints "PT" beside it. Here the label is a `^\markup` and the circle is not reproduced.
- The original has no time signature; it is hidden (`\omit Score.TimeSignature`).

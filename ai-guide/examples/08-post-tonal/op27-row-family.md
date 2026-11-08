---
title: "Webern Op. 27 row family: P11 / R11 and I0 / RI0"
id: 08-op27-row-family
category: example
topics: [08-post-tonal/twelve-tone]
tags: [twelve-tone, retrograde, inversion, retrograde-inversion, webern]
source_image: Graphics/postTonal/family.png
source_page: twelveToneBasics.md
lilylet: Graphics/lilylet/postTonal/family.md
provenance: hand
composer: Anton Webern
work: "Variations for Piano, Op. 27 (row forms)"
key: none
meter: none
---

# Webern Op. 27 row family: P11 / R11 and I0 / RI0

Four row forms from two written rows, each read forwards and backwards. Topic: [Twelve-Tone Technique](../../08-post-tonal/twelve-tone.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- **Score 1:** read left to right it is **P11** (11 7 6 10 9 8 2 0 3 1 5 4). Read right to left it is **R11** (4 5 1 3 0 2 8 9 10 6 7 11). An R-form is labelled by its *last* pc, B = 11.
- **Score 2:** read left to right it is **I0** (C E F C♯ D E♭ A B G♯ B♭ F♯ G = 0 4 5 1 2 3 9 11 8 10 6 7). Read right to left it is **RI0**, labelled by its last pc, C = 0.
- **I0 inverts P11:** every pair of corresponding pcs sums to 11 (11+0, 7+4, 6+5 …), so I0 = T11I(P11).
- **OPCIs:** I0's OPCIs (4 1 8 1 1 6 2 9 2 8 1) are P11's (8 11 4 11 11 6 10 3 10 4 11) negated. This is the topic's *Interval Relationships Between Forms*.
- **The two scores are separate rows:** they are not simultaneous, which is why they are two blocks.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/postTonal/family.md by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "P₁₁ / R₁₁"]

\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" b'4^\markup "P₁₁ →" g fs bf a gs d' c ef cs f e^\markup "← R₁₁" | %1
```

```lyl
[title "I₀ / RI₀"]

\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c'4^\markup "I₀ →" e f cs d ef a, b gs bf fs g^\markup "← RI₀" | %1
```
<!-- score:end -->

## Notes

- The circled labels and arrows are markup. Stemless noteheads and natural signs on every natural aren't reproduced.

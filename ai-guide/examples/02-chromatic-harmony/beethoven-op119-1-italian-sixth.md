---
title: "Beethoven, Bagatelle Op. 119 No. 1, mm. 1–4: Italian sixth"
id: 02-beethoven-op119-1-italian-sixth
category: example
topics: [02-chromatic-harmony/augmented-sixths]
tags: [augmented-sixth, italian, half-cadence]
source_image: Graphics/Op119-1.png
source_page: alteredSubdominants.md
lilylet: Graphics/lilylet/Op119-1.lyl
provenance: omr
composer: "Ludwig van Beethoven"
work: "Bagatelle in G minor, Op. 119 No. 1, mm. 1–4"
key: "G minor"
meter: 3/4
---

# Beethoven, Bagatelle Op. 119 No. 1, mm. 1–4: Italian sixth

An Italian augmented-sixth chord placed immediately before the dominant.

## What to look for

- Bar numbers: the file counts the pickup as %1, so printed m. N = file %N+1.
- m. 3 beat 3 (file %4): bass E♭3 (*le*) with C♯4 (*fi*) and G4 (*do*) on top. That is It. (le – do – fi), the augmented sixth E♭–C♯.
- m. 4 (file %5): it resolves outward to D (bass D3 + D4, melody F♯4). The augmented sixth expands to the octave on *sol*: the dominant.
- The page: "In m. 3, the Italian augmented-sixth chord falls on beat 3, immediately before the dominant chord."

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/Op119-1.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Bagatelle in G minor, Op. 119 No. 1"]
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key bf \major \time 3/4 \partial 4 \clef "treble" \ottava #0 \stemDown d'8.(\p[ ef16)] \\
\staff "2" \clef "bass" \ottava #0 ef,4\rest | %1

\staff "1" \stemDown d'4-. c-. bf-. \\
\staff "2" \stemDown <bf ef>4-. <a d>-. <g d'>-. | %2

\staff "1" \stemUp a'4 c\rest a8.[ c16] \\
\staff "2" \stemDown <fs, d'>4 ef\rest ef\rest | %3

\staff "1" \stemUp bf'4 a g \\
\staff "2" \stemDown <g d'>4 <f! d'> <ef cs'> | %4

\staff "1" \partial 2 \stemUp fs4 r4 \\
\staff "2" \stemDown <d, d'>4 r4 | %5
```
<!-- score:end -->

## Notes

- The excerpt cuts off after beat 2 of the dominant bar (`\partial 2`).

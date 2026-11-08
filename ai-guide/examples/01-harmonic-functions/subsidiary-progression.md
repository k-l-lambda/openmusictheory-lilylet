---
title: "Subsidiary harmonic progression"
id: 01-subsidiary-progression
category: example
topics: [01-harmonic-functions/prolongation]
tags: [subsidiary-progression, embedded-phrase-model, tonic-prolongation]
source_image: Graphics/harmony/subsidiaryProgression.png
source_page: harmonicSyntax2.md
lilylet: Graphics/lilylet/harmony/subsidiaryProgression.lyl
provenance: omr
composer: null
work: null
key: "C minor"
meter: 2/2
---

# Subsidiary harmonic progression

A full T–S–D–T cycle that ends weakly (on i⁶) and so only prolongs tonic, followed by the real cadence.

## What to look for

- Roman numerals: i iv | V i | iv V | i. Function lane: T — | — — | S D | T.
- mm. 1–2: i → iv (F3) → V⁴⁄₂ (F3 bass, figure ♯4/2) → i⁶ (E♭3, figure 6). A complete functional cycle, but it returns to tonic on T3 (D4–T3), not with a cadence, so the whole span is labeled T——.
- m. 3: the cadential iv → V (G3 bass; the figure ♮ raises the third to B♮).
- m. 4: i over C3, the PAC that closes the phrase.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/subsidiaryProgression.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Subsidiary progression"]
[staves "{-}"]

\staff "1" \key ef \major \numericTimeSignature \time 2/2 \clef "treble" \stemUp g''2 af \\
\staff "1" \stemDown <c' ef>2 <c f> \\
\staff "2" \clef "bass" c,2 f
\addlyrics { i iv }
\addlyrics { T — } | %1

\staff "1" \stemUp g''2 g \\
\staff "1" \stemDown <b'! d>2 c \\
\staff "2" f,2 ef
^\figures { <4+ 2>2 <6> }
\addlyrics { V i }
\addlyrics { — — } | %2

\staff "1" \stemUp f'4 ef d2 \\
\staff "1" \stemDown <af' c>2 <g b!> \\
\staff "2" f,2 g
^\figures { s2 <!> }
\addlyrics { iv V }
\addlyrics { S D } | %3

\staff "1" <ef g c>1 \bar "|." \\
\staff "2" c,1 \bar "|."
\addlyrics { i }
\addlyrics { T } | %4
```
<!-- score:end -->

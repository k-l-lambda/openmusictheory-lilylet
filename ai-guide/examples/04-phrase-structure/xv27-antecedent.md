---
title: "Antecedent: Haydn, Piano Trio Hob. XV:27, III, mm. 1–4"
id: 04-xv27-antecedent
category: example
topics: [04-phrase-structure/period, 04-phrase-structure/theme-functions]
tags: [antecedent, basic-idea, contrasting-idea, half-cadence, romanesca]
source_image: Graphics/form/antecedent.png
source_page: period.md
lilylet: Graphics/lilylet/form/antecedent.lyl
provenance: omr
composer: "Joseph Haydn"
work: "Piano Trio in C major, Hob. XV:27, III, mm. 1–4"
key: C major
meter: 2/4
---

# Antecedent phrase: a basic idea and a contrasting idea that ends with a weak cadence (HC).

The first half of the period in [xv27-period](xv27-period.md).

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers; the lilylet file counts the pickup as `%1`, so printed m. N = `%N+1`.
- BI (mm. 1–2): the melody ascends by leap through the tonic triad (C5–G5 … C6–E6). The harmony prolongs tonic, I – V6 – vi – iii (bass C4/E, B3/D, A3/C, E3/G), i.e. **T(1 D7p x6 3)**, a variant of the Romanesca.
- CI (mm. 3–4): stepwise descent B5 A5 G5 F5 E5 D5 …, which contrasts with the BI's leaps.
- Cadential progression under the CI: III – IV – V6/5/V – V. Bass F3 (m. 3) → F♯3 (applied V6/5) → G3 (m. 4), i.e. **T3 S(4 [+]) D5**.
- m. 4: weak **I:HC** on G, which ends the antecedent.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/form/antecedent.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Trio in C major, Hob. XV:27, III (antecedent)"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \partial 8 \tempo "Presto" \clef "treble" \ottava #0 \stemDown c'16(\p[ d] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest | %1

\staff "1" \stemDown c'8)-.[ g'16( a] g8)-.[ c16( d] \\
\staff "2" \stemDown <c e>8-. d,\rest <b' d>-. d,\rest | %2

\staff "1" \stemDown c''8)-.[ e-.] b,\rest d'16([ c] \\
\staff "2" \stemDown <a c>8-.[ <e g>-.] d4\rest | %3

\staff "1" \stemDown b''16[ a g f] e[ d e c)] \\
\staff "2" \stemDown <f, a>8-. d\rest <fs a>-. d\rest | %4

\staff "1" \stemDown b'8-.[ d-.] b\rest c16(\p[ d] \\
\staff "2" \stemDown <g b>8-.[ <g b>-.] d\rest d\rest | %5
```
<!-- score:end -->

## Notes

- The source page labels III/vi/iii as written; mm. 1–2 use the Romanesca-like bass C–B–A–E.

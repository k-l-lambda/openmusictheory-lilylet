---
title: "Sub-phrase expansion: Mozart, Rondo K. 494, mm. 1–12"
id: 04-k494-subphrase-expansion
category: example
topics: [04-phrase-structure/phrase-expansion, 04-phrase-structure/period]
tags: [sub-phrase-expansion, internal-expansion, period, basic-idea, motivic-repetition]
source_image: Graphics/form/k494.png
source_page: internalExpansions.md
lilylet: Graphics/lilylet/k494.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Rondo in F major, K. 494, mm. 1–12"
key: F major
meter: 2/2
---

# Sub-phrase expansion: the basic idea grows from 2 to 3 bars because a bar is repeated.

The theme is a period: an HC in m. 6, then a consequent ending with a PAC in m. 12.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers equal the lilylet `%N` (no pickup).
- mm. 1–3: the BI is **expanded**. m. 3 repeats m. 2 exactly (A5 G5 G5 E5 F5. A5 over B♭4 C5 A4 C5). Omitting m. 3 would restore a 2-bar BI.
- mm. 4–6: the CI is also 3 bars, but **without repetition**. It's not clearly an expansion: an irregular length doesn't by itself mean expansion.
- m. 6: **HC**. C5 and a C–C♯–D–E pickup over the C-major dominant.
- mm. 7–9: the consequent repeats the expanded BI (m. 9 = m. 8). mm. 10–12 close with the **PAC in m. 12**, ⟨A4 F5⟩ over F3.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/k494.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Rondo in F major, K. 494"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key f \major \time 2/2 \tempo "Allegretto" \clef "treble" \ottava #0 \stemDown f'2\p a \\
\staff "2" \clef "treble" \ottava #0 \stemUp a'4( \stemDown c \stemUp f, \stemDown c') | %1

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4( c \stemUp a \stemDown c) | %2

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4( c \stemUp a \stemDown c) | %3

\staff "1" \stemDown c''8([ bf) bf( g)] bf([ a) a( f)] \\
\staff "2" c'1 \\
\staff "2" \stemDown g'4 e f a | %4

\staff "1" \stemDown d'4. e8 f4 g4 \\
\staff "2" \stemDown bf'4 \stemUp bf, d f~ \\
\staff "2" s2. \stemDown b4 | %5

\staff "1" \stemDown c'2(~ c8[ cs d e)] \\
\staff "2" \stemUp f4 e8[ d] e4 bf'\rest \\
\staff "2" \stemDown c2. s4 | %6

\staff "1" \ottava #0 \stemDown f'2 a \\
\staff "2" \ottava #0 \stemUp a'4( \stemDown c \stemUp f, \stemDown c' | %7

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4 c \stemUp a \stemDown c | %8

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4 c \stemUp a \stemDown c) | %9

\staff "1" \stemDown c''8([ bf) bf( g)] bf([ a) a( f)] \\
\staff "2" c'1 \\
\staff "2" \stemDown g'4 e f d | %10

\staff "1" \stemDown d'4.( g8) f4-. e-. \\
\staff "2" d'4\rest \stemUp bf a g \\
\staff "2" \stemDown bf2 c | %11

\staff "1" \stemDown <bf' e>2(( <a f'>4)) bf\rest \\
\staff "2" \stemUp f4 c f, bf'\rest | %12
```
<!-- score:end -->

## Notes

- form/subphraseExpansion.lyl is a second, 13-bar engraving of the same theme. It continues into m. 13 and differs slightly in mm. 10–11. This example uses k494.lyl, the image the source page shows.

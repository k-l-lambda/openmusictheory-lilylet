---
title: "Compound period (hybrid 1 + hybrid 1): Mozart, K. 332, I, mm. 41–56"
id: 04-k332-compound-period
category: example
topics: [04-phrase-structure/compound-themes, 04-phrase-structure/hybrid-themes]
tags: [compound-period, hybrid-1, small-antecedent, large-antecedent, large-consequent]
source_image: Graphics/form/k332.png
source_page: compoundPeriod.md
lilylet: Graphics/lilylet/form/k332.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Piano Sonata in F major, K. 332, I, mm. 41–56 (second theme)"
key: C major
meter: 3/4
---

# Compound period whose halves are both hybrid 1. A small antecedent acts as the 'basic idea' of each large phrase.

Second theme in the dominant, C major.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Bar numbers: printed m. 41 = `%1` … m. 56 = `%16`. The last bar is the excerpt's short final bar.
- mm. 41–44: a **small antecedent** that works as the BI of the large antecedent. The repeated E5 and G5–F5–D5 figure, each opening with a grace note, close over the cadential bass C3 E3 G3 | C4.
- mm. 45–48: continuation (grace-note turn in m. 45, F♯5/D♯5 chromatic neighbours, a descending run in m. 48). *Inferred:* it ends on V over ⟨G3 B3⟩, the half cadence of the large antecedent.
- mm. 49–52: the small antecedent returns **varied**. The melody becomes D♯5–E5 / F♯5–G5 neighbour figures over left-hand triplet chords.
- mm. 53–56: the continuation returns with broken-chord left hand and closes on C5 over ⟨C4 E4⟩ in m. 56.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/form/k332.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Sonata in F major, K. 332, I (second theme, bars 41–56)"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key c \major \time 3/4 \clef "treble" \grace g'8( \stemDown e'8)-.\p b\rest e-. b\rest e-. b\rest \\
\staff "2" \clef "bass" \grace { c,16[ g'] } \stemDown c4 d,\rest d\rest | %1

\staff "1" \grace b'8( \stemDown g'4.)( f8 d4) \\
\staff "2" \grace { g16[ d'] } \stemDown f4 d,\rest d\rest | %2

\staff "1" \stemUp d'8[ c] s2 \\
\staff "1" \stemDown e4 \stemUp <g c>4.( \stemDown <b d>8) \\
\staff "2" \stemUp c,4 \stemDown e g | %3

\staff "1" \stemDown <b' d>2( <c e>4) \\
\staff "2" \stemDown c4 \stemUp c, d\rest \clef "treble" | %4

\staff "1" \stemDown f'4. \grace { g16[( f e] } f8)([ g a] \\
\staff "2" \stemUp a4( <c f>) b'\rest | %5

\staff "1" \stemDown a''8[ g fs g fs d)] \\
\staff "2" \stemUp b4( <d g>) b\rest \clef "bass" | %6

\staff "1" \stemDown ds'8([ e f! e g f)] \\
\staff "2" \stemDown c4 <a c>( <f d'>) | %7

\staff "1" \stemDown e'8([ d! c b a g)] \\
\staff "2" \stemDown <g b>4 d\rest d\rest \clef "treble" | %8

\staff "1" \stemDown ds'8([ e)] ds([ e)] ds([ e)]_\markup "cresc." \\
\staff "2" \tuplet 3/2 { c8[ e g] } \tuplet 3/2 { c,8[ e g] } \tuplet 3/2 { c,8[ e g] } | %9

\staff "1" \stemDown fs'8([ g)] fs([ g)] f!([ d)] \\
\staff "2" \tuplet 3/2 { b8[ d g] } \tuplet 3/2 { b,8[ d g] } \tuplet 3/2 { b,8[ d g] } | %10

\staff "1" s4 \stemUp d'8([ c)] e([ d)] \\
\staff "1" \stemDown d'8(\p[ c)] g4 b \\
\staff "2" \stemUp <c e>4 \clef "bass" \stemDown e, g | %11

\staff "1" \stemUp d'4.( ds8) e4 \\
\staff "1" \stemDown b'2 c4 \\
\staff "2" \stemDown c4 g \stemUp c, \clef "treble" | %12

\staff "1" \stemDown f'4. \grace { g16[( f e] } f8)([ g a] \\
\staff "2" \stemUp a8([ c f c a c)]_\markup "cresc." | %13

\staff "1" \stemDown a''8[ g fs g f! d)] \\
\staff "2" \stemUp b8([ d g d b d)] \clef "bass" | %14

\staff "1" \stemDown ds'8(\f[ e g f d! b)] \\
\staff "2" \stemDown c4 <f, d'> <g f'> | %15

\staff "1" \partial 4 \stemDown c'8 s \\
\staff "2" \stemDown <c e>4 \clef "treble" | %16
```
<!-- score:end -->

## Notes

- The grace notes and turns in mm. 41, 42, 45 and 53 were added during review; OMR missed them.

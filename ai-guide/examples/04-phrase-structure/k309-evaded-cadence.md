---
title: "Evaded cadence: Mozart, Piano Sonata K. 309, III, mm. 1–19"
id: 04-k309-evaded-cadence
category: example
topics: [04-phrase-structure/phrase-expansion, 04-phrase-structure/compound-themes]
tags: [evaded-cadence, phrase-expansion, one-more-time, compound-period, PAC]
source_image: Graphics/form/k309.png
source_page: internalExpansions.md
lilylet: Graphics/lilylet/k309.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Piano Sonata in C major, K. 309, III (Rondo), mm. 1–19"
key: C major
meter: 2/4
---

# Evaded cadence: the expected PAC never arrives, and a varied repeat ('one more time') delays it by several bars.

The primary theme is a compound period of two sentences. Its large consequent is extended by the evasion.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers; the lilylet file counts the pickup as `%1`, so printed m. N = `%N+1`.
- mm. 1–8: large antecedent (a sentence). It ends with an **HC in m. 8**: ⟨G3 C4⟩ → ⟨G3 B3⟩ under E5–D5.
- mm. 9–15: the large consequent restates the opening (grace-note groups B4 C5 D5 and E5 F5 G5 in mm. 10 and 12). A PAC is expected in m. 16.
- m. 15: the cadential bar (bass ⟨C4 G4⟩ … F3 G3) reaches the leading tone **B4, which is not resolved**. In m. 16 the right hand leaps up to an E6–C♯6–A5 arpeggio, so the cadence is **evaded**.
- mm. 16–19: a varied repeat of mm. 13–15 ('one more time'). The same bass and the same grace-note figures arrive this time.
- m. 19: **PAC**. C5 over C4, on the final short bar.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/k309.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Sonata in C major, K. 309, III"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \partial 8 \tempo "Allegretto grazioso" \clef "treble" \ottava #0 \stemDown g''8 \\
\staff "2" \clef "bass" \ottava #0 d,8\rest | %1

\staff "1" \grace f'16( \stemDown e8)[ d16 c] c8[ c] \\
\staff "2" \clef "treble" \stemUp c16\p[ e g e] c[ e g e] | %2

\staff "1" \stemDown c'4. c'8 \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %3

\staff "1" \grace b''16( \stemDown a8)[ g16 f] f8[ f] \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %4

\staff "1" \stemDown f'4. a8 \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %5

\staff "1" \grace a''16( \stemDown g8)[ f16 e] e8([ g)] \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %6

\staff "1" \grace g''16( \stemDown f8)[ e16 d] d8[ f] \\
\staff "2" \stemUp b16[ d g d] b[ d g d] | %7

\staff "1" \ottava #0 \grace f'16( \stemDown e8)[ d16 c-.] b8[ c-.] \\
\staff "2" \ottava #0 \stemUp c8 <e g>[ <d f> <c e>] | %8

\staff "1" \stemDown e'4( d8)[ g-.] \\
\staff "2" \stemUp <g c>4~ <g b>8 b'\rest | %9

\staff "1" \grace f'16( \stemDown e8)[ d16 c] c8[ c] \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %10

\staff "1" \grace { b'16[( c d] } \stemDown c4.) c'8 \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %11

\staff "1" \grace b''16( \stemDown a8)[ g16 f] f8[ f] \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %12

\staff "1" \grace { e'16[( f g] } \stemDown f4.) a8 \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %13

\staff "1" \grace a''16( \stemDown g8)[ f16 e] e8([ g)] \\
\staff "2" \stemUp c16[ e g e] cs[ e a e] | %14

\staff "1" \ottava #0 \grace g''16( \stemDown f8)[ e16 d] d8[ f] \\
\staff "2" \ottava #0 \stemUp d16[ f a f] b,[ d g d] | %15

\staff "1" \grace f'16( \stemDown e8)[ f16 d] c8[ b\trill] \\
\staff "2" \stemUp <c g'>8 \clef "bass" d[ e d] \\
\staff "2" s8 \stemDown f, g4 | %16

\staff "1" \grace a''16( \stemDown g8)[ f16 e] e'[ cs a g] \\
\staff "2" \clef "treble" \stemUp c16[ e g e] cs[ e a e] | %17

\staff "1" \grace g''16( \stemDown f8)[ e16 d] d'[ b g f] \\
\staff "2" \stemUp d16[ f a f] b,[ d g d] | %18

\staff "1" \grace f'16( \stemDown e8)[ a16 f] e[ g f d] \\
\staff "2" \stemUp <c g'>8 \clef "bass" d[ e d] \\
\staff "2" s8 \stemDown f, g4 | %19

\staff "1" \partial 8 \stemDown c'8 \\
\staff "2" \stemDown c8 | %20
```
<!-- score:end -->

## Notes

- form/phraseExpansion.lyl is a longer, 29-bar engraving of the same rondo with dynamics and tempo text. This example uses k309.lyl, the image the source page shows.
- The grace notes before many downbeats are single upper neighbours (e.g. F5 → E5); they're written as `\grace` notes slurred into the main note.

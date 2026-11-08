---
title: "Standing on the dominant: Mozart, Symphony No. 40, K. 550, I, mm. 1–20"
id: 04-sym40-standing-on-dominant
category: example
topics: [04-phrase-structure/phrase-expansion, 04-phrase-structure/compound-themes]
tags: [standing-on-the-dominant, suffix, external-expansion, prefix, compound-sentence, half-cadence, augmented-sixth]
source_image: Graphics/form/sym40.png
source_page: externalExpansions.md
lilylet: Graphics/lilylet/sym40.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Symphony No. 40 in G minor, K. 550, I, mm. 1–20 (piano reduction)"
key: G minor
meter: 4/4 (alla breve in the score)
---

# Standing on the dominant: after the HC in m. 16, four bars prolong V with scale degree 5 embellished.

The opening also has a one-bar prefix and a compound sentence ending in an HC that's approached by an augmented sixth.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers equal the lilylet `%N` (no pickup).
- m. 1: **prefix**. Accompaniment only (G3 and the 8th-note figure B♭3 D4 …), with the melody's E♭5–D5 pickup at the end.
- mm. 2–16: the compound sentence. Its presentation (mm. 2–9) is the famous E♭–D–D motive over a G-minor tonic, then over C minor and D. The continuation (mm. 10–15) brings the bass C3 → B♭2 → C3 → ⟨B♭2 D3 G3⟩ → E3.
- m. 15: the **augmented sixth** before the cadence. E♭3 in the bass against C♯4/C♯5, with B♭ and G, resolving outward to D.
- m. 16: **HC** on D major (V of G minor). F♯5 over D5 / ⟨A3 D4⟩ / D3.
- mm. 16–20: **standing on the dominant**. The D-major chord ⟨F♯5 A5 D6⟩ alternates with C♯ neighbours (⟨C♯5 C♯6⟩ over ⟨G3 B♭3⟩). The bass stays on D3, *sf* with a decrescendo on each half-note chord, and scale degree 5 (D) is embellished by its lower neighbour C♯.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/sym40.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Symphony No. 40 in G minor, K. 550, I"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key bf \major \time 4/4 \tempo "Allegro molto" \clef "treble" \ottava #0 bf'2\rest bf4\rest \stemDown ef8(\p[ d] \\
\staff "2" \clef "bass" \ottava #0 \stemDown g4 g,\rest g2\rest \\
\staff "2" \ottava #0 \stemUp bf8[ d bf d] bf[ d bf d] | %1

\staff "1" \stemDown d'4)-. ef8([ d] d4)-. ef8([ d] \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp bf8[ d bf d] bf[ d bf d] | %2

\staff "1" \stemDown d'4() bf') bf,\rest bf'8([ a] \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp bf8[ d bf d] bf[ d bf d] | %3

\staff "1" \stemDown g''4)-. g8([ f] ef4)-. ef8([ d] \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp bf8[ d bf d] bf[ d bf d] | %4

\staff "1" \ottava #0 \stemDown c'4)-. c-. bf\rest d8([ c \\
\staff "2" \ottava #0 \stemDown g4 g,\rest g2\rest \\
\staff "2" \ottava #0 \stemUp a8[ ef' c ef] a,[ ef' c ef] | %5

\staff "1" \stemDown c'4)-. d8([ c)-.] c4 d8([ c \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp a8[ ef' c ef] a,[ ef' c ef] | %6

\staff "1" \stemDown c'4() a') bf,\rest a'8([ g] \\
\staff "2" \stemDown fs,4 g,\rest g2\rest \\
\staff "2" \stemUp a8[ d c d] a[ d c d] | %7

\staff "1" \stemDown fs'4)-. fs8([ ef] d4)-. d8([ c] \\
\staff "2" \stemDown d,4 g,\rest g2\rest \\
\staff "2" \stemUp a8[ d c d] fs,[ d' a d] | %8

\staff "1" \stemDown bf'4)-. bf-. bf\rest bf'8([ a] \\
\staff "2" \stemDown g2 \stemUp g8[ d' bf d] \\
\staff "2" \stemUp g8[ d' bf d] \stemDown g,2 | %9

\staff "1" \stemDown a''4() c fs, a \\
\staff "2" c,1 \\
\staff "2" \stemUp ef,8[ a fs a] ef[ a fs a] | %10

\staff "1" \ottava #0 \stemDown g''4 d) bf\rest bf'8([ a] \\
\staff "2" \ottava #0 bf,1 \\
\staff "2" \ottava #0 \stemUp d,8([ bf' g bf] d,[ bf' g bf)] | %11

\staff "1" \stemDown a''4() c fs, a \\
\staff "2" c,1 \\
\staff "2" \stemUp ef,8([ a fs a] ef[ a fs a] | %12

\staff "1" \stemDown g''4) s2. \\
\staff "1" s4 \stemDown bf''4( a8[ g f! ef\p] \\
\staff "2" s1 \\
\staff "2" <bf, d g>1) | %13

\staff "1" r4 \stemDown <fs fs'>4(\< <g g'> <a a'>\! \\
\staff "1" d'1) \\
\staff "2" <e, d'>1( \\
\staff "2" \stemDown bf2. a4 | %14

\staff "1" \stemDown <bf' cs bf'>4 c'!8\>[ bf] cs,2\! \\
\staff "1" \stemUp s2 a''4 g \\
\staff "2" \stemDown <ef, cs'>1 \\
\staff "2" \stemDown g2 \stemUp fs4 g | %15

\staff "1" \stemUp fs'4) r4 \stemDown <e g bf cs>2(\sf\> \\
\staff "1" \stemDown d'4 s2. \\
\staff "2" \stemUp <a d>4) s4 <g bf>2( \\
\staff "2" \stemDown d,4 r r d8[ d] | %16

\staff "1" \stemDown <fs' a d>4)-.\! bf,\rest <cs cs'>2(\sf\> \\
\staff "2" \stemUp <fs, a d>4)-. s4 <g bf>2( \\
\staff "2" \stemDown d,4 r r d8[ d] | %17

\staff "1" \ottava #0 \stemDown <fs' a d>4)-.\! bf,\rest <cs cs'>2(\sf\> \\
\staff "2" \stemUp <fs, a d>4)-. s4 <g bf>2( \\
\staff "2" \stemDown d,4 r r d8[ d] | %18

\staff "1" \stemDown <d' d'>4)-.\! <cs cs'>( <d d'>)-. <cs cs'>( \\
\staff "2" \stemUp <fs, a d>4) <g bf>( <fs a d>) <g bf>( \\
\staff "2" \stemDown d,4 d d d | %19

\staff "1" \partial 2 \stemDown <d' d'>2) \\
\staff "2" \stemUp <fs, a d>2) \\
\staff "2" \stemDown d,2 | %20
```
<!-- score:end -->

## Notes

- The time signature here is C (4/4), as written in the reduction. The source score is ¢.
- form/standingonV.lyl is the same passage with fingerings. Its bar 14 bass still has the D4 as a dotted half instead of the whole-note dyad fixed in sym40.lyl; reported, not changed here.

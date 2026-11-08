---
title: "Closing section: Mozart, Piano Sonata K. 330, mm. 1–20"
id: 04-k330-closing-section
category: example
topics: [04-phrase-structure/phrase-expansion, 04-phrase-structure/compound-themes]
tags: [closing-section, codetta, suffix, external-expansion, compound-period, PAC]
source_image: Graphics/form/k330.png
source_page: externalExpansions.md
lilylet: Graphics/lilylet/k330.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Piano Sonata in C major, K. 330 (Allegretto), mm. 1–20"
key: C major
meter: 2/4
---

# Closing section (codetta): after the theme's PAC, a 5-bar suffix that repeats the ii–V–I cadence over a melody centred on scale degree 1.

The theme is a compound period ending with a PAC in m. 16.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers equal the lilylet `%N` (no pickup).
- mm. 1–8: the large antecedent. In mm. 1 and 3 the BI is E5. F5 G5 C5 ⟨B4 D5⟩. It ends on V in m. 8 (bass ⟨G3 B3⟩).
- mm. 9–16: the large consequent, with the BI over left-hand 16ths. m. 15 has the cadential bass F3 G3 (ii6 – V).
- m. 16: **PAC** on C (C5 over ⟨C4 E4⟩). The theme ends here.
- mm. 16–20: **closing section**. Triplet 16ths circle around C (scale degree 1: C5 G4 E5 | C5 G5 E5 | C6 …). The left hand repeats the ii6–V–I of mm. 15–16 (D4 ⟨C4 E4⟩ ⟨D4 F4⟩ / ⟨F3 A3⟩ G3, then C) twice, in mm. 17 and 19.
- m. 20: the final tonic, C5 G4 C4 over ⟨C2 C3⟩. It confirms the PAC; it is not a new cadence.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/k330.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Sonata in C major, K. 330, I"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \tempo "Allegretto" \clef "treble" \ottava #0 \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest \stemDown c[ e g] | %1

\staff "1" \stemDown b'8[ c] b4 \\
\staff "1" \stemUp d'8([ f16 e] d4 \\
\staff "2" \stemDown c8[ c,] \stemUp g'[ g,] | %2

\staff "1" \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" d,8\rest \stemDown c[ e g] | %3

\staff "1" \stemDown <d' f>8([ <c e>)]\trill \stemUp <b d>4 \\
\staff "2" \stemDown c8[ c,] \stemUp g'[ g,] | %4

\staff "1" \stemDown f'8.([ g32 f] e8)[ e-.] \\
\staff "2" \stemDown a8([ c g c] | %5

\staff "1" \stemDown a''8.([ b32 c] g8)[ g-.] \\
\staff "2" \stemDown f,8[ c' e, c')] | %6

\staff "1" \stemDown g''16([ f) f( d)] f([ e) e( c)] \\
\staff "2" \clef "treble" b'8\rest \stemUp <b, g'> b'\rest <c, g'> \clef "bass" | %7

\staff "1" \ottava #0 \stemDown cs'16([ d e d] \stemUp c[ b a g)] \\
\staff "2" \ottava #0 \stemDown <g b>4 d\rest | %8

\staff "1" \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" \stemUp c,,16([ e g c] e,[ e' g, g'] | %9

\staff "1" \stemUp d'8([ f16 e)] d4 \\
\staff "1" \stemDown b'8[ c] b4 \\
\staff "2" \stemDown c,16[ e g c] \stemUp g,[ b d g)] | %10

\staff "1" \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" \stemUp c,,16([ e g c] e,[ e' g, g'] | %11

\staff "1" \stemDown <d' f>8([ <c e>)]\trill \stemUp <b d>4 \\
\staff "2" \stemDown c,16[ e g c] \stemUp g,[ b d g)] | %12

\staff "1" \stemDown f'8.([ g32 f)] e8[ e-.] \\
\staff "2" \stemDown a16([ c a c] g[ c g c)] | %13

\staff "1" \ottava #0 \stemDown a''8.([ b32 c] g8)[ g-.] \\
\staff "2" \ottava #0 \stemDown f,16[ c' f, c'] e,[ c' e, c')] | %14

\staff "1" \stemDown gs''16([ a f d] c8[ b)] \\
\staff "2" s8 \stemUp d e[ d] \\
\staff "2" d,8\rest \stemDown f g4 | %15

\staff "1" ^\markup "legato" \tuplet 3/2 { c'16[ g e'] } \tuplet 3/2 { c[ g' e] } \tuplet 3/2 { c'[ b a] } \tuplet 3/2 { g[ f e] } \\
\staff "2" \stemDown <c e>4 d,\rest | %16

\staff "1" \tuplet 3/2 { cs'16[ d f] } \tuplet 3/2 { a[ f d] } \tuplet 3/2 { g[ e c] } \tuplet 3/2 { f[ d b] } \\
\staff "2" s8 \stemUp d <c e>[( <d f>)] \\
\staff "2" d,8\rest \stemDown <f a> g4 | %17

\staff "1" \ottava #0 \tuplet 3/2 { c'16[ g e'] } \tuplet 3/2 { c[ g' e] } \tuplet 3/2 { c'[ b a] } \tuplet 3/2 { g[ f e] } \\
\staff "2" \ottava #0 \stemDown <c e>4 d,\rest | %18

\staff "1" \tuplet 3/2 { cs'16[ d f] } \tuplet 3/2 { a[ f d] } \tuplet 3/2 { g[ e c] } \tuplet 3/2 { f[ d b] } \\
\staff "2" s8 \stemUp d <c e>[( <d f>)] \\
\staff "2" d,8\rest \stemDown <f a> g4 | %19

\staff "1" \stemUp c'8[ g-.] c,4 \\
\staff "2" \stemDown <c e>8[ g-.] \stemUp <c,, c'>4 | %20
```
<!-- score:end -->

## Notes

- The lilylet file's title says 'K. 330, I', but its tempo is Allegretto and the theme is the third movement's. The first movement is Allegro moderato. Treat the movement label as unverified.

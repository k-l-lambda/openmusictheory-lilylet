---
title: "Hybrid 1 (antecedent + continuation): Mozart, K. 330, II, mm. 1–8"
id: 04-k330-ii-hybrid1
category: example
topics: [04-phrase-structure/hybrid-themes, 04-phrase-structure/theme-functions]
tags: [hybrid, hybrid-1, antecedent, continuation, fragmentation, liquidation]
source_image: Graphics/form/k330-ii.png
source_page: hybridThemes.md
lilylet: Graphics/lilylet/k330-ii.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Piano Sonata in C major, K. 330, II, mm. 1–8"
key: F major
meter: 3/4
---

# Hybrid 1: an antecedent phrase (ending HC) followed by a continuation (ending V:PAC).

OMT calls this the prototypical antecedent + continuation hybrid.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers; the lilylet file counts the pickup as `%1`, so printed m. N = `%N+1`.
- BI (pickup–m. 2): identified by the repeated-note anacrusis C5 C5 C5 (staccato under a slur).
- CI (mm. 2–4): a scalar ascent leading to the **half cadence in m. 4**, ⟨F4 A4⟩ → ⟨E4 G4⟩ over bass C3, i.e. a C-major (V) arrival.
- mm. 5–6: continuation function through fragmentation and faster surface rhythm. Short grace-note figures G4–G5 repeat inside the bar.
- m. 6, middle: the motives are **liquidated** into conventional scale figuration (G5 A5 B5 C6 B5 A5 G5 F5 E5 …).
- m. 8: **V:PAC** in C major. Melody C5 over bass E4 and C3.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/k330-ii.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Sonata in C major, K. 330, II"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key f \major \time 3/4 \partial 4. \tempo "Andante cantabile" \clef "treble" \ottava #0 \markup "dolce" \stemDown c'8(-.[ c-. c)-.] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest d4\rest | %1

\staff "1" \stemDown c'8.[ \grace { \stemUp d16[ c b c] } \stemDown f16] \stemUp c8[ a( c e,)] \\
\staff "2" \stemDown <f, a c>2\p <c g' bf>4 | %2

\staff "1" \stemUp g'4( f8) f\f([ <e g> <f a>)] \\
\staff "1" s4 s8 \stemDown c4 b8 \\
\staff "2" \stemUp bf4 a8[ <a, a'>( <g g'> <f f'>)] \\
\staff "2" \stemDown d,4. s4. | %3

\staff "1" \stemUp bf'8.([ c32 d)] c8[ f,( e f] \\
\staff "1" \stemDown f4. b,8\rest b4 \\
\staff "2" \stemDown <d, d'>8([ <bf bf'>)] <a a'> d8\rest d4\p | %4

\staff "1" \stemUp <f a>4( <e g>8) g[ g g] \\
\staff "1" \stemDown c2 <c e>4\f \\
\staff "2" \stemUp c,2 s4 | %5

\staff "1" \ottava #0 \stemUp \grace g'16( g'8.[ d32 b)] g8[ g(-. g-. g)-.] \\
\staff "1" \ottava #0 \stemDown <b d f>2 <c e>4 | %6

\staff "1"  \stemUp \grace g'16(  \stemDown g'4)~ g16.[ a64( b c16) b-.] a-.[ g-. f-. e-.] \\
\staff "2" \stemDown <d, f b>4( <e g c>) d\rest | %7

\staff "1" \stemDown cs'16([ d f a)] c,4.( b8 \\
\staff "1" s4 s4 s8 \stemUp e'16[ d)] \\
\staff "2" s8 \stemUp d  <c e>4( <d f>) \\
\staff "2" d,8\rest \stemDown <f a>\p g2 | %8

\staff "1" \stemUp c'4 d4\rest s4 \\
\staff "1" \stemDown c'4 s4 s4 \\
\staff "2" \stemUp e4 c,8 d8\rest s4 \\
\staff "2" \stemDown c4 s4 s4 | %9
```
<!-- score:end -->

## Notes

- The 8 grace groups (turns) are written with `\stemUp` inside `\grace { }`; the tempo is Adagio, ♪ = 84.

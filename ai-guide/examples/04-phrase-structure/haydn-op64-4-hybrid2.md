---
title: "Hybrid 2 (antecedent + cadential): Haydn, String Quartet Hob. III:66, II, mm. 1–8"
id: 04-haydn-op64-4-hybrid2
category: example
topics: [04-phrase-structure/hybrid-themes, 04-phrase-structure/theme-functions]
tags: [hybrid, hybrid-2, antecedent, cadential-function, expanded-cadential-progression]
source_image: Graphics/form/haydn-III-66-ii.png
source_page: hybridThemes.md
lilylet: Graphics/lilylet/haydn-III-66-ii.lyl
provenance: omr
composer: "Joseph Haydn"
work: "String Quartet in G major, Op. 64 No. 4 (Hob. III:66), II, mm. 1–8 (piano reduction)"
key: G major
meter: 3/4
---

# Hybrid 2: an antecedent phrase followed by a four-bar phrase that is a single cadential progression.

In OMT's example, the second phrase has no continuation markers at all.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers; the lilylet file counts the pickup as `%1`, so printed m. N = `%N+1`.
- mm. 1–4: antecedent, BI and then CI, ending with an HC in m. 4 (bass G3 E3 C3 under a stepwise treble).
- mm. 5–8 support **one cadential progression: I6 – ii6/5 – V(7) – I**, one chord per bar. The bass downbeats are B2 (I6), C3 (ii6/5, with A4 in the melody), D3 (V7, with ⟨C4 F♯4⟩) and G2 (I).
- mm. 5–8 show no fragmentation, sequence or acceleration. That's why the phrase is cadential and not a continuation.
- m. 8: PAC, G4 over ⟨B3 G4⟩ and G2. The grace note B4 opens the cadential bar m. 7.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/haydn-III-66-ii.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "String Quartet in G major, Op. 64 No. 4 (Hob. III:66), II"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key g \major \time 3/4 \partial 4 \clef "treble" \ottava #0 \stemDown d'8(\f[ b)] \\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemUp fs8([ g)] d4 \stemDown b''8([ g)] \\
\staff "2" s4 \stemUp <b d>-. <b d>-. \\
\staff "2" d,4\rest \stemDown <g b>-.\f g-. | %2

\staff "2" s4 \stemUp <a fs'>-. <a fs'>-. \\
\staff "1" \stemDown fs'8([ a)] c,4 a8([ c)] \\
\staff "2" d,4\rest \stemDown d-. d-. | %3

\staff "1" \stemUp c'16([ b] b8\rest \stemDown g s \\
\staff "1" s2 \stemUp e'16([ c] b8\rest \\
\staff "1" \stemDown g'8 s \\
\staff "1" s4 \stemUp d'16([ c] b8\rest \stemDown g s \\
\staff "2" \stemDown g8-. d\rest e-. d\rest \stemUp c-. d\rest | %4

\staff "1" \stemUp a'2 d,4\p \\
\staff "1" \stemDown fs2 s4 \\
\staff "2" \stemDown d,4-. d'-. d,\rest | %5

\staff "1" \ottava #0 \stemUp g'2( b8[ gs)] \\
\staff "2" \ottava #0 s4 \stemUp <g d'>-. <d' fs>-. \\
\staff "2" \ottava #0 d,4\rest \stemDown b-.\p b-. | %6

\staff "1" \stemUp b'8([ a)] \stemDown c4-. c8([ b)] \\
\staff "2" \stemUp e4 s4 e8([ d)] \\
\staff "2" \stemDown c,4 d\rest c | %7

\staff "1" \grace b'8( \stemUp a4) a8([ g] a[ d,)] \\
\staff "2" \stemUp <c fs>2.( \\
\staff "2" \stemDown d,4-. d-. d-. | %8

\staff "1" \stemUp g'4 r r \\
\staff "2" \stemUp <b g'>4) s2 \\
\staff "2" \stemDown g,4-. g'-. r | %9
```
<!-- score:end -->

## Notes

- This is a two-staff reduction of the quartet, as printed in OMT.

---
title: "Beethoven, Piano Sonata Op. 109, III, mm. 1–8: German sixth"
id: 02-beethoven-op109-iii-german-sixth
category: example
topics: [02-chromatic-harmony/augmented-sixths]
tags: [augmented-sixth, german, half-cadence]
source_image: Graphics/Op109-iii.png
source_page: alteredSubdominants.md
lilylet: Graphics/lilylet/Op109-iii.lyl
provenance: omr
composer: "Ludwig van Beethoven"
work: "Piano Sonata in E major, Op. 109, III, mm. 1–8"
key: "E major"
meter: 3/4
---

# Beethoven, Piano Sonata Op. 109, III, mm. 1–8: German sixth

A German augmented-sixth chord on the last beat of m. 7 that carries into m. 8 and releases into the half cadence.

## What to look for

- m. 7 beat 3: the bass moves to C♮ (C2 + C3, *le* in E major), against E3 and A♯3 (*fi*) and G♮ (*me*) in m. 8. That is Ger. (le – do – me – fi): C – E – G – A♯.
- m. 8: the German sixth carries over and resolves to V over B1 / B2 (B3 on top): the half cadence at the end of the period's first half.
- The page: "a German augmented-sixth chord occurs on the last beat of m. 7 and carries over into m. 8 before releasing tension into the half cadence at the end of m. 8".

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/Op109-iii.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Sonata in E major, Op. 109, III"]
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key e \major \time 3/4 \tempo "Andante molto cantabile ed espressivo" \clef "treble" \ottava #0 ^\markup "mezza voce" \stemUp gs'4( e4. fs8) \\
\staff "1" \ottava #0 \stemDown b4 b cs \\
\staff "2" \clef "bass" \ottava #0 \stemUp e,,4( gs a | %1

\staff "1" \stemUp <fs, ds'>4 <fs a b>2 \\
\staff "2" \stemUp b,4 cs ds) | %2

\staff "1" \stemUp <gs b gs'>4( e'4. fs8) \\
\staff "1" s4 \stemDown b cs \\
\staff "2" \stemDown e,4( gs as | %3

\staff "1" \stemUp fs4( a b) \\
\staff "1" \stemDown ds4\< <cs e> <ds fs>\! \\
\staff "2" \stemDown b4 fs \stemUp b,8[ a!)] | %4

\staff "1" \grace { b16[( e gs] } \stemUp b4 e,4. gs16[ fs)] \\
\staff "1" b4\rest \stemDown b\> cs\! \\
\staff "2" \stemDown gs,2( s4 \\
\staff "2" \stemUp gs,4( gs') a, | %5

\staff "1" \stemUp ds4( b \grace { a!16[ b a gs] } a4) \\
\staff "2" \stemDown <b, fs'>4 <cs e> <ds fs>) | %6

\staff "1" \markup "crescendo" \stemUp gs4( e'4. as,8) \clef "bass" \\
\staff "2" s4 \stemDown <cs,, cs'> <c c'> \\
\staff "2" \stemDown e,4 \stemUp e2 | %7

\staff "1" \stemUp as2( b4) \\
\staff "1" \stemDown g!4(\p e ds) \\
\staff "2" \stemDown c,,2 b4 \\
\staff "2" \stemUp e,,4( g! b) \bar ":|." | %8
```
<!-- score:end -->

## Notes

- The upper staff switches to bass clef at the end of m. 7, as printed; lilylet applies the clef to both voices of that staff.

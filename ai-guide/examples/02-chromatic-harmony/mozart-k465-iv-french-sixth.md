---
title: "Mozart, String Quartet K. 465, IV, mm. 10–16: French sixth"
id: 02-mozart-k465-iv-french-sixth
category: example
topics: [02-chromatic-harmony/augmented-sixths]
tags: [augmented-sixth, french, cadential-six-four, string-quartet]
source_image: Graphics/K465-iv.png
source_page: alteredSubdominants.md
lilylet: Graphics/lilylet/K465-iv.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "String Quartet in C major, K. 465 (\"Dissonance\"), IV, mm. 10–16"
key: "C major"
meter: 2/4
---

# Mozart, String Quartet K. 465, IV, mm. 10–16: French sixth

A mild subdominant (IV⁶) intensified into a French sixth, which leads into the cadential six-four and V–I.

## What to look for

- Bar numbers: the excerpt's m. 1–7 = mm. 10–16.
- m. 5 (m. 14), first half: IV⁶. Cello A3, viola C4, Vn. II C5, Vn. I F5.
- m. 5 (m. 14), second half: the Fr.⁶. Cello A♭3 (*le*), viola D4 (*re*), Vn. II C5 (*do*), Vn. I F♯5 (*fi*); the augmented sixth is A♭3–F♯5.
- m. 6 (m. 15): cadential 6/4 over G3 (Vn. I G5, Vn. II C5), then V.
- m. 7 (m. 16): I (C5 / C5 / E4 / C3).
- The page: "a 'milder' subdominant chord (IV⁶) progresses to the more intense French sixth, which progresses into the cadential 6/4 before the final V–I".

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/K465-iv.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "String Quartet in C major, K. 465, IV"]
[composer "Wolfgang Amadeus Mozart"]
[staves "<v1-v2-va-vc>"]
[instrument-v1 "Violin I" "Vn. I"]
[instrument-v2 "Violin II" "Vn. II"]
[instrument-va "Viola" "Va."]
[instrument-vc "Violoncello" "Vc."]

\key c \major \time 2/4 \clef "treble" \ottava #0 \stemDown c''4.( f,8) \\\\
\clef "treble" \ottava #0 \stemUp f16([ d f d] f8) b\rest \\\\
\clef "alto" \ottava #0 \stemDown d16([ b d b] d8) c\rest \\\\
\clef "bass" \ottava #0 \stemDown g8[ g] g d\rest | %1

\stemDown e'8([ c a d)] \\\\
b'8\rest \stemUp g([ c, a')] \\\\
R2 \\\\
\stemDown c8[ e,( f fs)] | %2

\stemDown c'8([ b)] c-.[ c-.] \\\\
\stemUp e8([ d)] c-.[ c-.] \\\\
c4\rest \stemUp g8-.[ g-.] \\\\
\stemDown g8([ f)] e-.[ e-.] | %3

\stemDown d'8-.[ d-. e-. e-.] \\\\
\stemUp c8-.[ c-. c-. c-.] \\\\
\stemUp a8-.[ a-. bf-. bf-.] \\\\
\stemDown f,8-.[ f-. g-. g-.] | %4

\stemDown f'8-.[ f-. fs-. fs-.] \\\\
\stemDown c'8-.[ c-. c-. c-.] \\\\
\stemDown c8-.[ c-. d-. d-.] \\\\
\stemDown a8-.[ a-. af-. af-.] | %5

\stemDown g''8([ e)] \grace g16 f!8[ e16 d] \\\\
\stemDown c'4 \grace e16 d8[ c16 b] \\\\
\stemDown e8([ c)] g'[ g] \\\\
\stemDown g8[ g g g] | %6

\partial 8 \stemDown c'8 \bar "" \\\\
\stemDown c'8 \\\\
\stemDown e8 \\\\
\stemUp c,8 | %7
```
<!-- score:end -->

## Notes

- The excerpt ends after the first eighth of m. 16 (`\partial 8`), with no closing barline, as printed.

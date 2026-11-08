---
title: "Sentence: Mozart, K. 283, I, mm. 1–10"
id: 04-k283-sentence
category: example
topics: [04-phrase-structure/sentence, 04-phrase-structure/theme-functions, 04-phrase-structure/phrase-expansion]
tags: [sentence, presentation, continuation, fragmentation, liquidation, cadential-progression, PAC]
source_image: Graphics/form/k283.png
source_page: sentence.md
lilylet: Graphics/lilylet/k283.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Piano Sonata in G major, K. 283, I, mm. 1–10"
key: G major
meter: 3/4
---

# Sentence: 4-bar presentation + 6-bar continuation ending in a PAC.

OMT's main sentence example. It shows all five continuation markers and a continuation expanded to six bars.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers; the lilylet file counts the pickup as `%1`, so printed m. N = `%N+1`.
- mm. 1–4: presentation, the same as [k283-presentation](k283-presentation.md) (BI, varied BI, I–V4/3–V6/5–I).
- From the pickup to m. 5: **fragmentation** into one-bar units (G5–F♯5 | F♯5 E5 E5 …, then E5 D5 D5 …). The second half of each unit is **sequenced** a step lower (E5 → D5).
- m. 7: **accelerated harmonic rhythm**. Bass chords change on every beat: ⟨A3 C4⟩, ⟨G3 B3⟩, ⟨F♯3 A3⟩.
- mm. 8–9: **accelerated surface rhythm**. The right hand switches to 16th-note scales (D5…D6…G5, then F♯5…F♯4). This is **liquidation**: conventional scales replace the BI's characteristic figure. OMT also mentions a left-hand hemiola here.
- mm. 8–10: cadential progression I – IV6 – Cad.6/4 – V7 – I (**T1 S6 D5 — T1**). The PAC arrives on G4 over G2 in m. 10.
- Phrase lengths: 4 (presentation) + 6 (continuation). The continuation, not the presentation, absorbs the expansion; see [phrase-expansion](../../04-phrase-structure/phrase-expansion.md).

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/k283.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Sonata in G major, K. 283, I"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key g \major \time 3/4 \partial 4 \tempo "Allegro" \clef "treble" \ottava #0 \stemDown d'8.(\p[ b16)] \\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemDown d'4 b\rest \stemUp g( \\
\staff "2" \stemDown g8(\p[ b d b d b)] | %2

\staff "1" \stemUp fs4) b\rest \stemDown a'8.([ fs16)] \\
\staff "2" \stemDown a8([ c d c d c)] | %3

\staff "1" \stemDown a''4 b,\rest c( \\
\staff "2" \stemDown fs,8([ a d a d a)] | %4

\staff "1" \stemDown b'4) b\rest g'8.([ fs16)] \\
\staff "2" \stemDown g8([ b d b)] g4 | %5

\staff "1" \stemDown fs'8(\fp[ e)] e4 g8.([ e16)] \\
\staff "2" \clef "treble" \stemUp <c g'>2 _\fp b'4\rest | %6

\staff "1" \ottava #0 \stemDown e'8([_\fp d)] d4 g8.(\f[ d16)] \\
\staff "2" \ottava #0 \stemUp <b g'>2_\fp b'4\rest | %7

\staff "1" \stemDown d'4-! d-! d-! \\
\staff "2" \clef "bass" \stemDown <a c>4(\f <g b> <fs a>) | %8

\staff "1" \stemDown d'16[ e fs g] a[ b c d] c[ b a g] \\
\staff "2" \stemDown <g b>4 d\rest <e g> | %9

\staff "1" \stemDown fs'16[ e d c] b[ d b g] \stemUp a[ c a fs] \\
\staff "2" d,4\rest \stemUp g( c) \\
\staff "2" s4 \stemDown d,2 | %10

\staff "1" g'4 b\rest b\rest \\
\staff "2" \stemUp b4 g, d'\rest \\
\staff "2" \stemDown g4 | %11
```
<!-- score:end -->

## Notes

- Excerpt ends after the PAC in m. 10 (the source image is cut there).
- The original prints fingerings that aren't transcribed.

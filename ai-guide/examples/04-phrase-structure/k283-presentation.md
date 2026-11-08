---
title: "Presentation phrase: Mozart, K. 283, I, mm. 1–4"
id: 04-k283-presentation
category: example
topics: [04-phrase-structure/sentence, 04-phrase-structure/theme-functions]
tags: [presentation, basic-idea, tonic-prolongation, contrapuntal-chords, sentence]
source_image: Graphics/form/k283-presentation.png
source_page: sentence.md
lilylet: Graphics/lilylet/form/k283-presentation.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Piano Sonata in G major, K. 283, I, mm. 1–4"
key: G major
meter: 3/4
---

# Presentation phrase: a basic idea and its varied repetition over a tonic prolongation.

The first four bars of the sentence in [k283-sentence](k283-sentence.md); OMT uses them on their own to illustrate presentation function.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers; the lilylet file counts the pickup as `%1`, so printed m. N = `%N+1`.
- BI 1 runs from the pickup D5–B4 to the downbeat F♯4 of m. 2. BI 2 (pickup A5–F♯5 to the downbeat B4 of m. 4) repeats its rhythm and contour, but not its pitches. A BI is defined by rhythm and contour, so varied repetition is still repetition.
- Bass downbeats G3 (m. 1), A3 (m. 2), F♯3 (m. 3), G3 (m. 4): I – V4/3 – V6/5 – I, i.e. **T(1 D(2 7)n 1)**. The two dominant chords are contrapuntal (neighbour) chords inside the tonic.
- No cadence: the phrase only prolongs tonic. That is the harmonic marker of presentation function, as opposed to an antecedent.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/form/k283-presentation.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Sonata in G major, K. 283, I (presentation phrase)"]
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
\staff "2" \stemDown g8([ b d b)] g4 \clef "treble" | %5
```
<!-- score:end -->

## Notes

- The same notes as mm. 1–4 of the full K. 283 example; the OMR transcription was reviewed bar by bar.

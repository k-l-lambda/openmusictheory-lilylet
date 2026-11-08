---
title: "Transposition T4: Debussy, La cathédrale engloutie, m. 1 → m. 18"
id: 08-transposition-debussy
category: example
topics: [08-post-tonal/pitch-class-sets]
tags: [transposition, Tn, pitch-class-set, debussy]
source_image: Graphics/postTonal/transposition.png
source_page: transposition.md
lilylet: Graphics/lilylet/postTonal/transposition.md
provenance: omr
composer: Claude Debussy
work: "Préludes I, \"La cathédrale engloutie\", mm. 1 and 18"
key: none written
meter: 6/4
---

# Transposition T4: Debussy, La cathédrale engloutie, m. 1 → m. 18

A motive moved by Tn: the intervals and their arrangement are both preserved. Topic: [Pitch-Class Sets](../../08-post-tonal/pitch-class-sets.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- **m. 1 (score 1):** a held open D–G–D chord, with the motive in parallel open fifths and fourths. The labelled set is B, D, E = **{11, 2, 4}**.
- **m. 18 (score 2):** the gesture four semitones higher. The labelled set is D♯, F♯, G♯ = **{3, 6, 8}**.
- ***T4*** {11, 2, 4} = **{3, 6, 8}** (mod 12): add 4 to each pc, the topic's *Transposition (Tn)*. Measuring the other way, 3−11 = 6−2 = 8−4 = 4, so the constant difference identifies Tn.
- **Arrangement:** transposition preserves the *arrangement* of the intervals, not just the content. Compare [inversion-debussy](inversion-debussy.md), where the content is kept and the arrangement mirrored.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/postTonal/transposition.md by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Debussy, La cathédrale engloutie, m. 1"]
[composer "Claude Debussy"]
[staves "{-}"]

\staff "1" \key c \major \time 6/4 \clef "treble" \stemUp <d' g d'>1.^\markup "8va"^\markup "B, D, E = {11, 2, 4}" \\
\staff "1" \stemDown r4 <d g d'>4(\pp <e a e'> <b' e b'> <d g> <e a>) \\
\staff "2" \clef "bass" \stemUp d4\rest <d, g>( <e a> <b' e> <d g> <e a>) \\
\staff "2" \stemDown <g,, d' g>1. \bar "||" | %1
```

```lyl
[title "Debussy, La cathédrale engloutie, m. 18"]
[composer "Claude Debussy"]
[staves "{-}"]

\staff "1" \key c \major \time 6/4 \clef "treble" ^\markup "[18]" \stemUp <fs' gs ds' gs>1._\markup "p marqué"^\markup "D♯, F♯, G♯ = {3, 6, 8}" \\
\staff "1" \stemDown s4 \clef "bass" <ds, b' ds fs>4(\pp <fs cs' ds gs>4 \clef "treble" <ds' fs b ds>4) s2 \\
\staff "2" \clef "bass" \stemUp <fs, gs ds' gs>1. \\
\staff "2" \stemDown r8 b,,,8([ b' fs' b, fs' b, fs'] \stemUp <gs' b>8[ fs)] s4 | %1
```
<!-- score:end -->

## Notes

- OMR-assisted transcription. The m. 18 left-hand sustained chord and the low notes were read at small scale.
- 8va and "p marqué" are markup.

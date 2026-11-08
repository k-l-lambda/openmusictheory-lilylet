---
title: "Bartók, Mikrokosmos No. 141 \"Subject and Reflection\": Tn and TnI between hands and passages"
id: 08-subject-and-reflection
category: example
topics: [08-post-tonal/pitch-class-sets]
tags: [pitch-class-set, transposition, inversion, TnI, set-class, bartok]
source_image: Graphics/postTonal/subjecdtAndReflection.png
source_page: setClassAndPrimeForm1.md
lilylet: Graphics/lilylet/postTonal/subjecdtAndReflection.md
provenance: hand
composer: Béla Bartók
work: "Mikrokosmos No. 141, \"Subject and Reflection\" (two excerpts)"
key: none written
meter: 2/4 then 5/8 (excerpt 1); 2/4 (excerpt 2)
---

# Bartók, Mikrokosmos No. 141 "Subject and Reflection": Tn and TnI between hands and passages

Four pitch-class sets of one set class, related by transposition and inversion, where each hand mirrors the other. Topic: [Pitch-Class Sets](../../08-post-tonal/pitch-class-sets.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- **Excerpt 1 (score 1):** the right hand is B♭ C E♭ D … F = {10, 0, 2, 3, 5}, the left hand B♭ A♭ F G♭ … E♭ = {3, 5, 6, 8, 10}. Every simultaneous pair sums to 8 (mod 12): B♭+B♭, C+A♭, E♭+F, D+G♭, F+E♭. So the hands are related by ***T8I***.
- **Excerpt 2 (score 2):** the right hand is F B♭ A♭ G over a held E♭ = {3, 5, 7, 8, 10}, the left hand D♭ A♭ B♭ C♭ over E♭ = {8, 10, 11, 1, 3}. The pairs sum to 6, so the hands are related by ***T6I***, as the page says.
- **Between the excerpts:** the right hand {10,0,2,3,5} → {3,5,7,8,10} is ***T5***, and so is the left hand {3,5,6,8,10} → {8,10,11,1,3}. This is the page's "T5-related".
- **One set class:** all four sets have the same prime form, **(02357)**. Tn/TnI-related sets share interval content; see [prime-form](prime-form.md) for the walkthrough.
- **Reading the score:** each hand is two voices, a held note plus the moving eighths.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/postTonal/subjecdtAndReflection.md by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Bartók, Mikrokosmos No. 141: excerpt 1"]
[composer "Béla Bartók"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemUp bf'8[(\f_\markup "ben ritmato" c ef d] \\
\staff "1" \stemDown bf'2 \\
\staff "2" \clef "bass" \stemUp bf2( \\
\staff "2" \stemDown bf8[( af f gf)] | %1

\staff "1" \time 5/8 \partial 4 \stemUp f'4) \\
\staff "1" \stemDown bf'4 \\
\staff "2" \stemUp bf4) \\
\staff "2" \stemDown ef,4 | %2
```

```lyl
[title "Bartók, Mikrokosmos No. 141: excerpt 2"]
[composer "Béla Bartók"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \tempo "Vivacissimo" \clef "treble" \stemUp f8[( bf-> af g)] \\
\staff "1" \stemDown ef2\p \\
\staff "2" \clef "bass" \stemUp ef,2^\markup "legato" \\
\staff "2" \stemDown df,8[( af-> bf cf)] | %1
```
<!-- score:end -->

## Notes

- The original's pitch-class circle diagrams are not reproduced. The .md source mentions them in text.

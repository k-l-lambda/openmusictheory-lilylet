---
title: "Finding prime form: the \"Subject and Reflection\" motive → (02357)"
id: 08-prime-form
category: example
topics: [08-post-tonal/pitch-class-sets]
tags: [prime-form, normal-form, set-class, pitch-class-set, bartok]
source_image: Graphics/postTonal/primeForm.png
source_page: setClassAndPrimeForm1.md
lilylet: Graphics/lilylet/postTonal/primeForm.md
provenance: hand
composer: Béla Bartók
work: "Mikrokosmos No. 141, \"Subject and Reflection\", right-hand motive"
key: none written
meter: 2/4, then 5/8
---

# Finding prime form: the "Subject and Reflection" motive → (02357)

The five-step prime-form procedure applied to a real motive. Topic: [Pitch-Class Sets](../../08-post-tonal/pitch-class-sets.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- **Notes:** B♭4 C5 E♭5 D5 → F5 over a held B♭4, i.e. pc {10, 0, 2, 3, 5}.
- **Step 1, normal order:** [10, 0, 2, 3, 5] (outer interval 7).
- **Step 2, transpose to 0:** [0, 2, 4, 5, 7].
- **Step 3, invert and take normal order:** [5, 7, 8, 10, 0].
- **Step 4, transpose to 0:** [0, 2, 3, 5, 7].
- **Step 5, compare:** both have outer interval 7, and the first interval is 4 vs 3, so the more compact one is **(02357)**. That is the prime form. It is the same procedure as the topic's *Normal Form* / *Prime Form* sections and *Analysis Procedure* steps 3–4.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/postTonal/primeForm.md by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Bartók, Mikrokosmos No. 141: right-hand motive"]
[composer "Béla Bartók"]

\key c \major \time 2/4 \clef "treble" \stemUp bf'8[( c ef d] \\
\stemDown bf'2 | %1

\time 5/8 \partial 4 \stemUp f'4) \\
\stemDown bf'4 | %2
```
<!-- score:end -->

## Notes

- The steps appear as text in the .md source; only the motive is a score block.

---
title: "Webern, String Quartet Op. 28: invariant tetrachords under T8 (P7 → P3)"
id: 08-op28-invariance
category: example
topics: [08-post-tonal/twelve-tone]
tags: [twelve-tone, invariance, segmental-invariance, transposition, webern]
source_image: Graphics/postTonal/invariance.png
source_page: twelveToneMusicInvariance.md
lilylet: Graphics/lilylet/postTonal/invariance.lyl
provenance: hand
composer: Anton Webern
work: "String Quartet, Op. 28 (P7 and P3)"
key: none
meter: none
---

# Webern, String Quartet Op. 28: invariant tetrachords under T8 (P7 → P3)

Segmental invariance: the same discrete tetrachords appear in two row forms, because they are related to each other by the same operation that relates the rows. Topic: [Twelve-Tone Technique](../../08-post-tonal/twelve-tone.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- **Bar 1, P7:** G F♯ A G♯ | C D♭ B♭ B | E♭ D F E. Its discrete tetrachords are (6789), [TE01] and [2345], all (0123).
- **Bar 2, P3 = *T8*(P7):** E♭ D F E | G♯ A F♯ G | B B♭ D♭ C, that is P7 with 8 added to every pc. Each tetrachord of P7 maps onto *another* tetrachord of the row: (6789) → [2345], [TE01] → [6789], [2345] → [TE01]. P3's segments are the same three pc sets, in the order [2345] [6789] [TE01].
- **Why they're held invariant:** the tetrachords are related *to each other* by T8, the same relation as between the rows. The original's two T8 arrows show [2345] → [TE01] → (6789). So transposing the whole row by T8 maps the set of tetrachords onto itself.
- **The page's three-step test:** find equivalent set classes within the row, find their Tn/TnI relation, then apply that operation to the row. This is the topic's *Invariants*.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/postTonal/invariance.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Webern, String Quartet Op. 28: invariant tetrachords under T₈ (P₇ → P₃)"]
[composer "Anton Webern"]

\omit Score.TimeSignature \key c \major \clef "treble" g'!8[^\markup "P₇ —T₈→ P₃" fs_\markup "(6789)" a! gs] c![ df_\markup "[TE01]" bf b!] ef,[ d!_\markup "[2345]" f! e!] \bar "||" | %1

ef8[ d!_\markup "[2345]" f! e!] gs[ a!_\markup "[6789]" fs g!] b![ bf_\markup "[TE01]" df c!] \bar "||" | %2
```
<!-- score:end -->

## Notes

- The original's brackets are written as markup labels under the first note of each tetrachord.

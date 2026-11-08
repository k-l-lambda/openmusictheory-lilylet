---
title: "Row operations on the Op. 27 row: T11, T10I, R"
id: 08-op27-row-operations
category: example
topics: [08-post-tonal/twelve-tone]
tags: [twelve-tone, transposition, inversion, retrograde, OPCI, webern]
source_image: Graphics/postTonal/operations.png
source_page: twelveToneOperations.md
lilylet: Graphics/lilylet/postTonal/operations.md
provenance: hand
composer: Anton Webern
work: "Variations for Piano, Op. 27 (row operations)"
key: none
meter: none
---

# Row operations on the Op. 27 row: T11, T10I, R

Operations (italic) versus the row forms they produce (bold), with ordered pc intervals under each row. Topic: [Twelve-Tone Technique](../../08-post-tonal/twelve-tone.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- **Score:** P11 = 11 7 6 10 9 8 2 0 3 1 5 4. Its OPCIs are 8 11 4 11 11 6 10 3 10 4 11.
- **P11 → P10:** *T11* adds 11 to each pc, giving 10 6 5 9 8 7 1 11 2 0 4 3. The OPCIs are identical, because transposition preserves them.
- **P10 → R10:** *R* reads P10 backwards, giving 3 4 0 2 11 1 7 8 9 5 6 10. The row is labelled by its last pc, 10. Its OPCIs (1 8 2 9 2 6 1 1 8 1 4) are P10's reversed and negated.
- **P10 → I0:** *T10I* subtracts each pc of P10 from 10, giving 0 4 5 1 2 3 9 11 8 10 6 7. The OPCIs are negated: 4 1 8 1 1 6 2 9 2 8 1.
- **I0 → RI0:** *R* reads I0 backwards, giving 7 6 10 8 11 9 3 2 1 5 4 0.
- **Where the numbers come from:** these integer rows and arrows are the original's lower diagram. The .md source renders it as a KaTeX array, which is not copied into this file.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/postTonal/operations.md by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" b'4^\markup "P₁₁" g fs bf a gs d' c ef cs f e | %1
```
<!-- score:end -->

## Notes

- **Source-text slip:** twelveToneOperations.md says "T10I of P11", but the diagram and the arithmetic apply T10I to **P10**. T10I(P11) would be 11 3 4 0 1 2 8 10 7 9 5 6, not I0.
- The curved T11/T10I arrows and the circled P11 aren't expressible.

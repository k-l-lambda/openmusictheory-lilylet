---
title: "Fonte: Haydn, Piano Sonata in G major, Hob. XVI:27, III"
id: 05-haydn27fonte
category: example
topics: [05-formal-schemas/continuation-schemas, 06-large-forms/binary-ternary]
tags: [fonte, galant-schema, sequence, model-sequence, contrasting-middle, applied-dominant]
source_image: Graphics/form/Haydn27fonteAnnotated.png
source_page: schemataContinuationPatterns.md
lilylet: Graphics/lilylet/form/Haydn27fonteAnnotated.lyl
provenance: hand
composer: Joseph Haydn
work: "Piano Sonata in G major, Hob. XVI:27, III, start of the second reprise"
key: G major
meter: 2/4
---

# Fonte: Haydn, Hob. XVI:27, III

A textbook Fonte at the start of a contrasting middle, right after the double bar. A two-bar model D7–T1 in A minor (ii) is repeated a step lower as D7–T1 in G (I). OMT uses this exact excerpt, with its functional-bass labels, to define the Fonte.

## What to look for

- Bar numbers: pickup = m. 0 (`%1`), so m. N = `%N+1`. The excerpt starts at the `.|:` repeat, so these are excerpt-relative, not movement bar numbers.
- **Model, mm. 1–2 (A minor = ii):**
  - m. 1: the right hand arpeggiates E7, D5 B4 G♯4 E4: **D7 of Am**.
  - m. 2: the right hand settles D4 C♯4 C4 while the bass enters G♯3 → A3, ti → do of A minor, under the label `Am: D7 T1`.
- **Sequence, mm. 3–4 (G major = I):** the same figure one step lower.
  - m. 3: the right hand plays C5 A4 F♯4 D4 (D7 of G).
  - m. 4: the right hand C4 B3 over bass F♯3 → G3, under the label `G: D7 T1`.

  Model → sequence descends by step: that's the defining Fonte motion.
- The bass moves into the resolving chord by the leading tone: G♯ → A, then F♯ → G. The D7 is a chord of the sixth (3rd in the bass) and T1 is in root position, as the page describes ("D7 being a chord of the sixth and the T1 being a chord of the fifth").
- **Non-cadential D7–T1.** The page stresses that these progressions do not prolong tonic. Analyse the chords individually and label the schema.
- **Formal role** (from the page): the Fonte follows the double bar and leads the music from the dominant key back towards tonic, usually followed by a phrase ending with a I:HC before the recapitulation.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/form/Haydn27fonteAnnotated.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Haydn, Piano Sonata in G major, Hob. XVI:27, III (Fonte, annotated)"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \partial 8 \bar ".|:" \clef "treble" \stemUp d8-.\mp \\
\staff "2" \clef "bass" r8 | %1

\staff "1" \stemUp d'8([ b gs e)] \\
\staff "2" R2 | %2

\staff "1" \stemDown d4(-3 cs8)[ c!-.] \\
\staff "2" r8 gs([_\markup "Am: D7  T1" a) a,-.] | %3

\staff "1" \stemUp c'8([ a fs d)] \\
\staff "2" R2 | %4

\staff "1" \stemDown c4(-3 b8) s \bar "" \\
\staff "2" r8 fs,([_\markup "G: D7  T1" g)] s | %5
```
<!-- score:end -->

## Notes

- `Graphics/lilylet/Schemata/Haydn27fonte.lyl` is the same excerpt without the functional-bass labels, taken from OMR. Here the labels are `_\markup` text under the bass.
- The "3" over beat 1 of mm. 2 and 4 in the original is a fingering, not a triplet.
- The excerpt cuts off inside m. 4, so the last bar is written with spacers and an invisible barline.

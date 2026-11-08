---
title: "Prefix: Haydn, Symphony No. 101 (\"Clock\"), II, mm. 1–5"
id: 04-sym101-prefix
category: example
topics: [04-phrase-structure/phrase-expansion, 04-phrase-structure/theme-functions]
tags: [prefix, external-expansion, before-the-beginning, antecedent, accompaniment]
source_image: Graphics/form/sym101.png
source_page: externalExpansions.md
lilylet: Graphics/lilylet/sym101.lyl
provenance: omr
composer: "Joseph Haydn"
work: "Symphony No. 101 in D major (Hob. I:101), II, mm. 1–5 (reduction)"
key: G major
meter: 2/4
---

# Prefix: one bar of accompaniment before the theme starts.

The prefix sets the texture without a melody or a harmonic progression.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers equal the lilylet `%N` (no pickup).
- m. 1: **prefix**. A whole-bar rest in the treble; the bass repeats the staccato tick ⟨G3 B3⟩ ⟨B3 D4⟩ (G major), with no melody and no harmonic progression.
- m. 2: the four-bar antecedent begins over the same accompaniment pattern. Melody D5 (double-dotted) – B4 – G5 – G5, *dolce*.
- mm. 4–5: the antecedent heads to its weak cadence over the bass ⟨F♯3 A3 D4⟩ ⟨G3 B3 D4⟩ C C♯ → D (F♯4. G4 over ⟨D3 D4⟩).
- Removing m. 1 doesn't disturb the phrase. That is the test for a prefix.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/sym101.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Symphony No. 101 in D major (Hob. I:101), II"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key g \major \time 2/4 \tempo "Andante" R2 \\
\staff "2" \clef "bass" \ottava #0 \stemDown <g b>8-.\p[ <b d>-. <g b>-. <b d>-.] | %1

\staff "1" \markup "dolce" \stemDown d'8..([ b32)] g'8~[ g] \\
\staff "2" \stemDown <g b>8-.[ <b d>-. <g b>-. <b d>-.] | %2

\staff "1" \grace g''8( \stemDown b8)([ a32 g fs e] d8..)[ e32(] \\
\staff "2" \stemDown <g b>8-.[ <b d>-. <g b>-. <b d>-.] | %3

\staff "1" \stemDown c'16.[ d32 b16. c32] \stemUp <e, a>16.[ b'32 <e, g>16. a32] \\
\staff "2" \stemDown <fs, a d>8-.[ <g b d>-.] <c, c'>-.[ <cs cs'>-.] | %4

\staff "1" \stemUp fs8.[ g16)] b4\rest \\
\staff "2" \stemDown <d, d'>8-.[ d,-.] d'4\rest | %5
```
<!-- score:end -->

## Notes

- Two-staff reduction as printed in OMT. The excerpt ends in m. 5.

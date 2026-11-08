---
title: "Period: Haydn, Piano Trio Hob. XV:27, III, mm. 1–8"
id: 04-xv27-period
category: example
topics: [04-phrase-structure/period, 04-phrase-structure/theme-functions]
tags: [period, antecedent, consequent, half-cadence, PAC]
source_image: Graphics/form/xv27.png
source_page: period.md
lilylet: Graphics/lilylet/xv27.lyl
provenance: omr
composer: "Joseph Haydn"
work: "Piano Trio in C major, Hob. XV:27, III, mm. 1–8"
key: C major
meter: 2/4
---

# Period: an antecedent (HC) followed by a consequent that restates the BI exactly and ends with a PAC.

OMT's main period example. Its first four bars are [xv27-antecedent](xv27-antecedent.md).

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers; the lilylet file counts the pickup as `%1`, so printed m. N = `%N+1`.
- Antecedent mm. 1–4: BI, then CI, then I:HC in m. 4 (see the antecedent example).
- Consequent mm. 5–6: the BI returns **exactly**, with the same notes and bass as mm. 1–2.
- mm. 7–8: the CI is varied. In m. 7 the right hand descends further (… D5 C5 B4) and the bass drops the applied chord (F3, then G3 = IV – V), so the cadence moves one beat earlier.
- m. 8: **PAC**, C5 over ⟨C4 E4⟩. That is the strong cadence that closes the period.
- Cadence pairing: weak (HC, m. 4) followed by strong (PAC, m. 8).

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/xv27.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Trio in C major, Hob. XV:27, III"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \partial 8 \tempo "Presto" \clef "treble" \ottava #0 \stemDown c'16(\p[ d] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest | %1

\staff "1" \stemDown c'8)-.[ g'16( a] g8)-.[ c16( d] \\
\staff "2" \stemDown <c e>8-. d,\rest <b' d>-. d,\rest | %2

\staff "1" \stemDown c''8)-.[ e-.] b,\rest d'16([ c] \\
\staff "2" \stemDown <a c>8-.[ <e g>-.] d4\rest | %3

\staff "1" \stemDown b''16[ a g f] e[ d e c)] \\
\staff "2" \stemDown <f, a>8-. d\rest <fs a>-. d\rest | %4

\staff "1" \stemDown b'8-.[ d-.] b\rest c16(\p[ d] \\
\staff "2" \stemDown <g b>8-.[ <g b>-.] d\rest d\rest | %5

\staff "1" \ottava #0 \stemDown c'8)-.[ g'16( a] g8)-.[ c16( d] \\
\staff "2" \ottava #0 \stemDown <c e>8-. d,\rest <b' d>-. d,\rest | %6

\staff "1" \stemDown c''8)-.[ e-.] b,\rest d'16([ c] \\
\staff "2" \stemDown <a c>8-.[ <e g>-.] d4\rest | %7

\staff "1" \stemDown b''16[ a g f] e[ d c b)] \\
\staff "2" \stemDown <f, a>8-. d\rest <g b>-. d\rest | %8

\staff "1" \stemDown c'8-.[ c-.] b4\rest \\
\staff "2" \stemDown <c e>8-.[ <c e>-.] d,4\rest | %9
```
<!-- score:end -->

## Notes

- The comment in OMT period.md also notes that the consequent drops the antecedent's applied chord. That's consistent with the bass in m. 7.

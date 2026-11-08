---
title: "Double cadence (5/3–6/4–5/4–5/3)"
id: 01-double-cadence
category: example
topics: [01-harmonic-functions/cadences]
tags: [cadence, double-cadence, galant, PAC]
source_image: Graphics/cadences/Double.png
source_page: cadenceTypes.md
lilylet: Graphics/lilylet/cadences/Double.lyl
provenance: hand
composer: null
work: null
key: "C major"
meter: null
---

# Double cadence (5/3–6/4–5/4–5/3)

The four-stage double cadence over a held cadential *sol*, a galant PAC formula.

## What to look for

- mm. 1–2: the bass holds G3 for two bars while the upper voices pass through 5/3 → 6/4 → 5/4 → 5/3 (one stage per half note).
- m. 1: soprano D5 → E5 over G4 + B4 → G4 + C5, so 5/3 then 6/4.
- m. 2: G4 + D5 held over C5 → B4, so 5/4 then 5/3 (the 4–3 suspension).
- m. 3: resolution to C3 with C5 on top: PAC. The page notes the pattern is "used almost exclusively in perfect authentic cadences".

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/cadences/Double.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Double cadence: 5/3 – 6/4 – 5/4 – 5/3"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp d'2 e \\
\staff "1" \stemDown <g' b>2 <g c> \\
\staff "2" \clef "bass" g1~
^\figures { <5 3>2 <6 4> } | %1

\staff "1" \stemUp <g' d'>1 \\
\staff "1" \stemDown c'2 b \\
\staff "2" g1
^\figures { <5 4>2 <5 3> } | %2

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %3
```
<!-- score:end -->

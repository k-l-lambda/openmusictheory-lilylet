---
title: "Compound cadence with 4–3 suspension"
id: 01-compound43
category: example
topics: [01-harmonic-functions/cadences]
tags: [cadence, compound-cadence, suspension, 4-3]
source_image: Graphics/cadences/Compound43.png
source_page: cadenceTypes.md
lilylet: Graphics/lilylet/cadences/Compound43.lyl
provenance: hand
composer: null
work: null
key: "C major"
meter: null
---

# Compound cadence with 4–3 suspension

The first type of compound cadence: a 4–3 suspension (*do* → *ti*) over a repeated *sol* in the bass.

## What to look for

- m. 1: bass G3 → G2 (the repeated *sol*).
- Lower upper voice C5 → B4 over it: the 4–3 suspension, figured 4 then 3.
- The other two voices hold D5 and G4 for the whole bar: the fifth and the octave above the bass, which the page says the other voices sustain.
- m. 2: resolution to C3 with C5 on top: PAC.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/cadences/Compound43.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Compound cadence: 4–3 suspension"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp <g' d'>1 \\
\staff "1" \stemDown c'2 b \\
\staff "2" \clef "bass" g2 g,
^\figures { <4>2 <3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- score:end -->

---
title: "Cadential six-four with full figures (8/6/4–8/5/3)"
id: 01-cadential64-full
category: example
topics: [01-harmonic-functions/cadences]
tags: [cadence, cadential-six-four, thoroughbass, figured-bass]
source_image: Graphics/cadences/Cadential64-full.png
source_page: cadenceTypes.md
lilylet: Graphics/lilylet/cadences/Cadential64-full.lyl
provenance: hand
composer: null
work: null
key: "C major"
meter: null
---

# Cadential six-four with full figures (8/6/4–8/5/3)

The same cadential six-four, figured in full: 8/6/4 → 8/5/3, with the octave above the bass shown explicitly.

## What to look for

- m. 1 over G3 → G2: the figures 8/6/4 then 8/5/3; the 8 is G4, the octave doubling of the bass held in the alto.
- Soprano E5 → D5 = 6–5; alto C5 → B4 = 4–3; both resolve down by step, as the page requires for the six-four.
- m. 2: resolution to C (C3 bass, C5 on top): PAC.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/cadences/Cadential64-full.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Cadential 6/4 (full figures)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp e'2 d \\
\staff "1" \stemDown <g' c>2 <g b> \\
\staff "2" \clef "bass" g2 g,
^\figures { <8 6 4>2 <8 5 3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- score:end -->

## Notes

- The original prints the 8/6/4–8/5/3 figures above the bass; here they are a `^\figures` lane.

---
title: "Compound cadence, full figures (8/5/4–8/5/3)"
id: 01-compound43-full
category: example
topics: [01-harmonic-functions/cadences]
tags: [cadence, compound-cadence, thoroughbass, 4-3]
source_image: Graphics/cadences/Compound43-full.png
source_page: cadenceTypes.md
lilylet: Graphics/lilylet/cadences/Compound43-full.lyl
provenance: hand
composer: null
work: null
key: "C major"
meter: null
---

# Compound cadence, full figures (8/5/4–8/5/3)

The 4–3 compound cadence with its complete figure 8/5/4 → 8/5/3, as printed in the source figure.

## What to look for

- m. 1: bass G3 → G2; figures 8/5/4 → 8/5/3 (the page: "the abbreviated 4–3 … stands for 8/5/4–8/5/3").
- Alto dyads G4 + C5 → G4 + B4: C5 → B4 is the 4–3; G4 is the 8.
- m. 2: resolution to C: PAC.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/cadences/Compound43-full.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Compound cadence (full figures): 8/5/4 – 8/5/3"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp e'2 d \\
\staff "1" \stemDown <g' c>2~ <g b> \\
\staff "2" \clef "bass" g2 g,
^\figures { <8 5 4>2 <8 5 3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- score:end -->

## Notes

- **Open question.** The transcription follows the source image, whose soprano reads E5 → D5. Over G, E5–C5–G4 is a 6/4, not the printed 8/5/4, which implies D–C–G. One of the image's top note or its figures is probably in error; it is left as printed.
- The G4 tie inside the dyad cannot be expressed in lilylet (see the primer).

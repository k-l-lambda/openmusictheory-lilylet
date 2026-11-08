---
title: "Cadential six-four resolving to V7 (8/6/4–7/5/3)"
id: 01-cadential64-7th
category: example
topics: [01-harmonic-functions/cadences]
tags: [cadence, cadential-six-four, dominant-seventh, PAC]
source_image: Graphics/cadences/Cadential64-7th.png
source_page: cadenceTypes.md
lilylet: Graphics/lilylet/cadences/Cadential64-7th.lyl
provenance: hand
composer: null
work: null
key: "C major"
meter: null
---

# Cadential six-four resolving to V7 (8/6/4–7/5/3)

The third compound-cadence type: the fourth voice moves to the seventh over the second *sol*, so the six-four resolves to V7.

## What to look for

- m. 1 over G3 → G2: figures 8/6/4 → 7/5/3.
- Alto dyad G4 + C5 → F4 + B4: G4 (the 8) moves to F4 (the 7, *fa*) while C5 → B4 is the 4–3.
- Soprano E5 → D5 is the 6–5.
- m. 2: V7 → I on C; the page notes this type needs four voices and is used mainly in authentic cadences, not half cadences.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/cadences/Cadential64-7th.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Cadential 6/4 resolving to V7"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp e'2 d \\
\staff "1" \stemDown <g' c>2 <f b> \\
\staff "2" \clef "bass" g2 g,
^\figures { <8 6 4>2 <7 5 3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- score:end -->

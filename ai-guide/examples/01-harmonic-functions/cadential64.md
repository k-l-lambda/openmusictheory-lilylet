---
title: "Cadential six-four (compound cadence)"
id: 01-cadential64
category: example
topics: [01-harmonic-functions/cadences]
tags: [cadence, compound-cadence, cadential-six-four, 6-4, PAC]
source_image: Graphics/cadences/Cadential64.png
source_page: cadenceTypes.md
lilylet: Graphics/lilylet/cadences/Cadential64.lyl
provenance: hand
composer: null
work: null
key: "C major"
meter: null
---

# Cadential six-four (compound cadence)

The cadential six-four: the second type of compound cadence, a 6–5 added to the 4–3 suspension over a repeated *sol* in the bass.

## What to look for

- m. 1: the bass is *sol* twice, G3 → G2 (half notes). That is what makes this a compound cadence.
- m. 1 beat 1, figure 6/4: G3 under C5 + E5 (and G4). The 6 (E5, *mi*) and the 4 (C5, *do*) act as suspensions even though the chord is consonant.
- m. 1 beat 3, figure 5/3: they resolve down by step, E5 → D5 (6–5) and C5 → B4 (4–3), giving the plain dominant triad over G2.
- m. 2: C3 under C5 + G4 + E4, so the soprano D5 → C5 lands on *do*: D5–T1 with *do* on top is a PAC.
- Voicing: soprano (stem up) E5–D5; alto (stem down) the dyads G4+C5 → G4+B4; G4 is held (tied in the original) and doubles the bass *sol*.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/cadences/Cadential64.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Cadential 6/4"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp e'2 d \\
\staff "1" \stemDown <g' c>2~ <g b> \\
\staff "2" \clef "bass" g2 g,
^\figures { <6 4>2 <5 3> } | %1

\staff "1" <e g c>1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- score:end -->

## Notes

- The original ties only G4 inside the alto dyad. lilylet cannot tie a single chord note, so the tie is on the whole dyad and is not drawn.

---
title: "Roman numerals with functional prolongation"
id: 01-rns-functional-prolongation
category: example
topics: [01-harmonic-functions/tonic-subdominant-dominant, 01-harmonic-functions/prolongation]
tags: [roman-numerals, function, prolongation, T-S-D]
source_image: Graphics/harmony/RNsFunctionalProlongation.png
source_page: harmonicFunctions.md
lilylet: Graphics/lilylet/harmony/RNsFunctionalProlongation.lyl
provenance: omr
composer: null
work: null
key: "B♭ major"
meter: 2/2
---

# Roman numerals with functional prolongation

The same labeling method, but the function lane shows zones of prolonged function rather than one label per chord.

## What to look for

- Roman numerals: I V | I IV | V — | I. Function lane: T — | — S | D — | T.
- mm. 1–2a: I → V⁴⁄₂ (E♭3 bass, figure 4/2) → I⁶ (D3 bass, figure 6). The V⁴⁄₂ is a contrapuntal chord inside one tonic zone, so the lane reads T with a continuation line, not T D T.
- m. 2b: IV⁶ (G3 bass), the S.
- m. 3: cadential six-four → V⁷ over F3 → F2 (figures 8/6/4 → 7/5/3), one D zone. Then m. 4: I (T).

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/RNsFunctionalProlongation.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Roman numerals: functional prolongation"]
[staves "{-}"]

\staff "1" \key bf \major \numericTimeSignature \time 2/2 \clef "treble" \stemUp d'2 c \\
\staff "1" \stemDown <f bf>2 <f a> \\
\staff "2" \clef "bass" bf,2 ef
^\figures { s2 <4 2> }
\addlyrics { I V }
\addlyrics { T — } | %1

\staff "1" \stemUp bf'2 bf \\
\staff "1" \stemDown <f bf>2 ef \\
\staff "2" d,2 g
^\figures { <6>2 <6> }
\addlyrics { I IV }
\addlyrics { — S } | %2

\staff "1" \stemUp bf'2 a \\
\staff "1" \stemDown <d f>2 <c ef> \\
\staff "2" f,2 f,
^\figures { <8 6 4>2 <7 5 3> }
\addlyrics { V — }
\addlyrics { D — } | %3

\staff "1" <bf d bf'>1 \bar "|." \\
\staff "2" bf,1 \bar "|."
\addlyrics { I }
\addlyrics { T } | %4
```
<!-- score:end -->

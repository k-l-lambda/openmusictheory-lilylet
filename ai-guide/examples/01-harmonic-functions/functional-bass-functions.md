---
title: "Functional bass (T1, D4, S6 …)"
id: 01-functional-bass-functions
category: example
topics: [01-harmonic-functions/tonic-subdominant-dominant]
tags: [functional-bass, function, scale-degree, Quinn]
source_image: Graphics/harmony/FunctionalBassFunctions.png
source_page: harmonicFunctions.md
lilylet: Graphics/lilylet/harmony/FunctionalBassFunctions.lyl
provenance: omr
composer: null
work: null
key: "B♭ major"
meter: 2/2
---

# Functional bass (T1, D4, S6 …)

The same progression as the functional-prolongation example, labeled in Quinn's functional bass: function letter plus bass scale degree.

## What to look for

- Upper lane, functional bass per chord: T1 D4 | T3 S6 | D5 — | T1. Lower lane, the prolonged functions: T — | — S | D — | T.
- D4 = the V⁴⁄₂ with *fa* (E♭3) in the bass; T3 = I⁶ with *mi* (D3) in the bass; S6 = IV⁶ with *la* (G3) in the bass.
- D5 = the cadential dominant over *sol* (F3 → F2, figures 8/6/4 → 7/5/3); T1 = the final tonic.
- Compare with [the Roman-numeral version](rns-functional-prolongation.md): same notes, different labels.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/FunctionalBassFunctions.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Functional bass: functions"]
[staves "{-}"]

\staff "1" \key bf \major \numericTimeSignature \time 2/2 \clef "treble" \stemUp d'2 c \\
\staff "1" \stemDown <f bf>2 <f a> \\
\staff "2" \clef "bass" bf,2 ef
^\figures { s2 <4 2> }
\addlyrics { T1 D4 }
\addlyrics { T — } | %1

\staff "1" \stemUp bf'2 bf \\
\staff "1" \stemDown <f bf>2 ef \\
\staff "2" d,2 g
^\figures { <6>2 <6> }
\addlyrics { T3 S6 }
\addlyrics { — S } | %2

\staff "1" \stemUp bf'2 a \\
\staff "1" \stemDown <d f>2 <c ef> \\
\staff "2" f,2 f,
^\figures { <8 6 4>2 <7 5 3> }
\addlyrics { D5 — }
\addlyrics { D — } | %3

\staff "1" <bf d bf'>1 \bar "|." \\
\staff "2" bf,1 \bar "|."
\addlyrics { T1 }
\addlyrics { T } | %4
```
<!-- score:end -->

---
title: "Interpreted functional bass: T(1 S6d 3) D2p 1) D5 T1"
id: 01-interpreted-functional-bass
category: example
topics: [01-harmonic-functions/tonic-subdominant-dominant, 01-harmonic-functions/prolongation]
tags: [functional-bass, interpreted, contrapuntal-prolongation, divider, passing]
source_image: Graphics/harmony/InterpretedFunctionalBass.png
source_page: harmonicFunctions.md
lilylet: Graphics/lilylet/harmony/InterpretedFunctionalBass.lyl
provenance: omr
composer: null
work: null
key: "B minor"
meter: 2/2
---

# Interpreted functional bass: T(1 S6d 3) D2p 1) D5 T1

Interpreted functional bass: parentheses mark a contrapuntal prolongation, with lower-case postscripts naming the role of each embellishing chord.

## What to look for

- Label: T(1 S6d 3 D2p 1) D5 T1. The tonic is prolonged from m. 1 to the downbeat of m. 3.
- m. 1 beat 3: S6d = IV⁶ (G3 bass, figure 6) as a *divider* (d) between T1 (B3) and T3 (D3).
- m. 2 beat 3: D2p = a *passing* (p) dominant over C♯3 (figure ♯6/4/3 = V⁴⁄₃) between T3 (D3) and T1 (B2).
- m. 3 beat 3 → m. 4: D5 (F♯3, figure 7 with raised third, V⁷) → T1 (B2): the cadential D–T outside the parentheses.
- Same notes as [RNs with individual functions](rns-individual-functions.md), which labels each chord separately.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/InterpretedFunctionalBass.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Interpreted functional bass: T(1 S6d 3) D2p 1) D5 T1"]
[staves "{-}"]

\staff "1" \key d \major \numericTimeSignature \time 2/2 \clef "treble" \stemUp d'2 e \\
\staff "1" \stemDown <fs b>2 <g b> \\
\staff "2" \clef "bass" b2 g
^\figures { s2 <6> }
\addlyrics { T(1 S6d } | %1

\staff "1" \stemUp fs'2 e \\
\staff "1" \stemDown <fs b>2 <fs as> \\
\staff "2" d,2 cs
^\figures { <6>2 <6+ 4 3> }
\addlyrics { 3 D2p } | %2

\staff "1" \stemUp d'2 cs \\
\staff "1" \stemDown <fs b>2 <e as> \\
\staff "2" b,2 fs'
^\figures { s2 <7 _+> }
\addlyrics { 1) D5 } | %3

\staff "1" <d fs b>1 \bar "|." \\
\staff "2" b,1 \bar "|."
\addlyrics { T1 } | %4
```
<!-- score:end -->

## Notes

- In the original the slashed 6 is a raised sixth; lilylet's `\figures` has no slash, so it is written ♯6.

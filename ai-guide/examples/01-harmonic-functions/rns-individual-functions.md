---
title: "Roman numerals with individual chord functions"
id: 01-rns-individual-functions
category: example
topics: [01-harmonic-functions/tonic-subdominant-dominant, 01-harmonic-functions/harmonic-analysis]
tags: [roman-numerals, function, T-S-D, labeling]
source_image: Graphics/harmony/RNsIndividualFunctions.png
source_page: harmonicFunctions.md
lilylet: Graphics/lilylet/harmony/RNsIndividualFunctions.lyl
provenance: omr
composer: null
work: null
key: "B minor"
meter: 2/2
---

# Roman numerals with individual chord functions

The first labeling method: Roman numeral and thoroughbass figure for each chord, with a T/S/D label under every chord individually.

## What to look for

- The two lyric lanes under the bass are the Roman numerals and then the function of each chord: I IV | I V | I V | I, and T S | T D | T D | T.
- m. 1: B3 → G3. I, then IV⁶ (figure 6 above G3; T → S).
- m. 2: D3 → C♯3. I⁶ (6), then V with figure ♯6/4/3 = V⁴⁄₃ (T → D).
- m. 3: B2 → F♯3. I, then V⁷ (7 with a raised 3rd, A♯), then m. 4: I. That is the cadential D → T.
- Placement follows the page: numerals below the bass, figures above it, functions below the numerals.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/RNsIndividualFunctions.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Roman numerals: individual functions"]
[staves "{-}"]

\staff "1" \key d \major \numericTimeSignature \time 2/2 \clef "treble" \stemUp d'2 e \\
\staff "1" \stemDown <fs b>2 <g b> \\
\staff "2" \clef "bass" b2 g
^\figures { s2 <6> }
\addlyrics { I IV }
\addlyrics { T S } | %1

\staff "1" \stemUp fs'2 e \\
\staff "1" \stemDown <fs b>2 <fs as> \\
\staff "2" d,2 cs
^\figures { <6>2 <6+ 4 3> }
\addlyrics { I V }
\addlyrics { T D } | %2

\staff "1" \stemUp d'2 cs \\
\staff "1" \stemDown <fs b>2 <e as> \\
\staff "2" b,2 fs'
^\figures { s2 <7 _+> }
\addlyrics { I V }
\addlyrics { T D } | %3

\staff "1" <d fs b>1 \bar "|." \\
\staff "2" b,1 \bar "|."
\addlyrics { I }
\addlyrics { T } | %4
```
<!-- score:end -->

## Notes

- The key signature is two sharps and the music is in B minor (A♯ is the leading tone). The Roman-numeral lane is copied as printed in the source; it uses upper-case numerals throughout.

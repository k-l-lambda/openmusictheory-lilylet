---
title: "Pivot-chord modulation, F major → C major"
id: 02-pivot-chord-modulation
category: example
topics: [02-chromatic-harmony/modulation]
tags: [modulation, pivot-chord, functional-bass, two-key-analysis]
source_image: Graphics/harmony/modEx.png
source_page: Modulation.md
lilylet: Graphics/lilylet/harmony/modEx.lyl
provenance: hand
composer: null
work: null
key: "F major → C major"
meter: 2/2
---

# Pivot-chord modulation, F major → C major

A five-chord bass line analysed in two keys: the old-key label above, the new-key label below, joined at the pivot.

## What to look for

- Bass: F3 E3 | D3 G3 | C3.
- Upper lane (F major): T(1 D7p x6), a tonic prolongation: F (T1), E3 with figure 6 as a passing D7 (V⁶ of F), and D3 as Tx6 (vi of F).
- Lower lane (C major): S2 D5 T1. The same D3 chord is the pivot, Tx6 in F = S2 (ii) in C. Then G3 (figure 7 with ♯, i.e. B♮: V⁷ of C) → C3, a cadence in the new key.
- This is the two-layer notation the page describes: old-key symbol, then below it "new key: symbol" for the pivot.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/modEx.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Modulation example (F major to C major)"]

\key f \major \numericTimeSignature \time 2/2 \clef "bass" f,2 e^\markup "6"
\addlyrics { "F: T(1" "D7p" }
\addlyrics { _ _ } | %1

d,2 g^\markup "♯"^\markup "7"
\addlyrics { x6) _ }
\addlyrics { "C: S2" D5 } | %2

c,1 \bar "|."
\addlyrics { _ }
\addlyrics { T1 } | %3
```
<!-- score:end -->

## Notes

- The figures (6, and 7 over ♯) are markup above the bass; lilylet cannot draw the bracket joining the two analysis rows.
- The image is linked from Modulation.md but not displayed there.

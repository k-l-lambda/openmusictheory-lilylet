---
title: "Applied chords in a figured bass line (D7/II, D7/III, D5/V)"
id: 02-applied-chord-bass-line
category: example
topics: [02-chromatic-harmony/applied-chords]
tags: [applied-chord, figured-bass, functional-bass, chromatic-bass]
source_image: Graphics/appliedChordBassLine.png
source_page: appliedChords.md
lilylet: Graphics/lilylet/appliedChordBassLine.lyl
provenance: hand
composer: null
work: null
key: "G major"
meter: null
---

# Applied chords in a figured bass line (D7/II, D7/III, D5/V)

A chromatically rising bass in G major where each raised note carries an applied dominant, with two-layer interpreted functional bass.

## What to look for

- Bass: G2 G♯2 | A2 A♯2 | B2 C3 | A2 D3 | G2.
- m. 1 beat 3: G♯2, figure 6, lower lane D7/II, the leading-tone chord of II (A).
- m. 2 beat 3: A♯2, figure 6/5/♯3, D7/III, which leads to B (III).
- m. 4 beat 1: A2, figure 7 + ♯, upper lane [2], lower lane D5/V. This is V⁷ of V (E–C♯ applied to D), then D5 (D3) → T1 (G2).
- The upper lane reads the whole line as T{(1 [+] S2 [D+2] 3} S(4 [2]) D5 T1: a tonic prolongation with chromatic passing applied chords, then a cadence.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/appliedChordBassLine.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Applied chords in a bass line: D7/II, D7/III, D5/V"]

\omit Score.TimeSignature \key g \major \clef "bass" g,2 gs
^\figures { s2 <6> }
\addlyrics { "T{(1" "[+])" }
\addlyrics { _ D7/II } | %1

a,2 as
^\figures { s2 <6 5 3+> }
\addlyrics { S2 [D+2] }
\addlyrics { _ D7/III } | %2

b,2 c
^\figures { s2 <6> }
\addlyrics { "3}" S(4 } | %3

a,2 d
^\figures { <7 _+>2 <7> }
\addlyrics { "[2])" D5 }
\addlyrics { D5/V _ } | %4

g,1 \bar "||"
\addlyrics { T1 } | %5
```
<!-- score:end -->

## Notes

- The original prints a slashed 3 in m. 2. lilylet's `\figures` has no slash, so it is written ♯3. The braces in the label are quoted text.

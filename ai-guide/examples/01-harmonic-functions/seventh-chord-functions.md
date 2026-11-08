---
title: "Diatonic seventh chords and their functions (C major)"
id: 01-seventh-chord-functions
category: example
topics: [01-harmonic-functions/tonic-subdominant-dominant]
tags: [function, seventh-chords, T-S-D]
source_image: Graphics/seventhChordFunctions.png
source_page: null
lilylet: Graphics/lilylet/seventhChordFunctions.lyl
provenance: hand
composer: null
work: null
key: "C major"
meter: null
---

# Diatonic seventh chords and their functions (C major)

The seventh-chord version of the function table: root-position seventh chords on every degree, figured 7.

## What to look for

- Bass C3 … B3, each chord figured 7.
- Lane 1: I II III IV V VI VII. Lane 2: T1 S2 * S4 D5 Tx6 D7.
- The `*` under III⁷ is printed in the original: its degrees do not wholly belong to one function. harmonicFunctions.md: III⁷ "can behave similar to T and D chords, depending on context".

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/seventhChordFunctions.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Seventh chords on each scale degree and their functions"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" <e g b>1 <f a c> <g b d> <a c e> <b d f> <c e g> <d f a> \undo \omit Score.BarLine \bar "||" \\
\staff "2" \clef "bass" c,1 d e f g a b
^\figures { <7>1 <7> <7> <7> <7> <7> <7> }
\addlyrics { I II III IV V VI VII }
\addlyrics { T1 S2 * S4 D5 Tx6 D7 } | %1
```
<!-- score:end -->

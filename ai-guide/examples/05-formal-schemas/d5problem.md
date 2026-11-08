---
title: "V7–I with ti–do in the melody: the problem"
id: 05-d5problem
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/cadences, 01-harmonic-functions/voice-leading-rules]
tags: [leaving-out-the-fifth, keyboard-schema, seventh-chord, voice-leading-problem]
source_image: Graphics/harmony/D5problem.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/D5problem.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# V7–I with ti–do in the melody: the problem

The problem case: with *ti–do* in the soprano of an authentic cadence from **V7**, you can't fully voice both chords *and* resolve the seventh.

## What to look for

- D5: `<A4 C5>` + F♯5 over D3 = complete V7 (root, 3rd, 5th, 7th). Figure `7`.
- T1: `<B4 D5>` + G5 over G2 = complete I.
- The seventh C5 moves **up** to D5 instead of down to B. That's the unresolved functional dissonance the page says is imperative to avoid.
- Two fixes: [T1 with dropped fifth](t1dropfifth.md) and [D5 with dropped fifth](d5dropfifth.md).

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/D5problem.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "D5 problem: D5 T1"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp fs'2 g \\
\staff "1" \stemDown <a' c>2 <b d> \\
\staff "2" \clef "bass" d,2 g, \bar "|."
^\figures { <7>2 s }
\addlyrics { D5 T1 } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

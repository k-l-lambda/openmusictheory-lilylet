---
title: "Fix 2: leave out the fifth of V7 (doubled bass)"
id: 05-d5dropfifth
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/cadences, 01-harmonic-functions/voice-leading-rules]
tags: [leaving-out-the-fifth, keyboard-schema, incomplete-seventh-chord]
source_image: Graphics/harmony/D5dropFifth.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/D5dropFifth.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# Fix 2: leave out the fifth of V7 (doubled bass)

The second, preferred fix for [the problem](d5problem.md): leave the fifth out of **V7** and double the bass, so I can be complete.

## What to look for

- D5: `<C5 D5>` + F♯5 over D3 = D F♯ C D: **no fifth (A)**, root doubled. Figure `7`.
- T1: `<B4 D5>` + G5 over G2 = complete I.
- The seventh C5 → B4 resolves. F♯5 → G5 (ti–do). The doubled D5 is held.
- The page: the incomplete V7 is preferable to the incomplete I, but the voice leading *into* V7 usually decides which one you use.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/D5dropFifth.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "D5 with dropped fifth: D5 T1"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp fs'2 g \\
\staff "1" \stemDown <c' d>2 <b d> \\
\staff "2" \clef "bass" d,2 g, \bar "|."
^\figures { <7>2 s }
\addlyrics { D5 T1 } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

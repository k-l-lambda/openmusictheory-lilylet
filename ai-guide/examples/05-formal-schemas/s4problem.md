---
title: "S4(7)–D5(7): the problem"
id: 05-s4problem
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/voice-leading-rules]
tags: [leaving-out-the-third, keyboard-schema, seventh-chord, preparation, voice-leading-problem]
source_image: Graphics/harmony/S4problem.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/S4problem.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# S4(7)–D5(7): the problem

The problem case for two seventh chords in a row. With **S4** and **D5** both sevenths and fully voiced, you can't prepare and resolve both dissonances.

## What to look for

- S4: `<E4 G4>` + A4 over C3 = C E G A = A minor seventh with C in the bass = **II6/5** (S4). Figures `6/5`.
- D5: `<C4 F♯4>` + A4 over D3 = **V7**. Figure `7`. T1: `<B3 D4>` + G4 over G2.
- The D5 seventh C4 is approached by leap from E4: it's **not prepared**, because the S4 chord's C is only in the bass.
- The fix is [S4 with dropped third](s4dropthird.md).

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/S4problem.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "S4 voice-leading problem"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp a'2 a g \\
\staff "1" \stemDown <e g>2 <c fs> <b d> \\
\staff "2" \clef "bass" c,2 d g, \bar "|."
^\figures { <6 5>2 <7> s }
\addlyrics { S4 D5 T1 } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

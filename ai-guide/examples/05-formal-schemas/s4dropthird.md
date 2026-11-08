---
title: "Fix: leave out the third of S4 (doubled bass)"
id: 05-s4dropthird
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/voice-leading-rules]
tags: [leaving-out-the-third, keyboard-schema, seventh-chord, preparation]
source_image: Graphics/harmony/S4dropThird.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/S4dropThird.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# Fix: leave out the third of S4 (doubled bass)

The fix for [the S4 problem](s4problem.md): leave *la* out of S4 and double the bass. The second *fa* (C4) in an upper voice then prepares the seventh of D5.

## What to look for

- S4: `<C4 G4>` + A4 over C3 = C G A over C: **no E (the third of II)**, C doubled. Figures `6/5`.
- D5: `<C4 F♯4>` + A4 over D3 = V7. The C4 is now **held over** from S4: the seventh is prepared.
- T1: `<B3 D4>` + G4 over G2. C4 → B3 resolves the seventh down.
- The only difference from the problem case is C4 (here) in place of E4 in the first chord.
- Solfège in G major: the S4 bass is C = *fa*, and the omitted note is E = *la*, matching the page ("leave *la*/*le* out").

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/S4dropThird.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "S4 with dropped third (good voice leading)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp a'2 a g \\
\staff "1" \stemDown <c g'>2 <c fs> <b d> \\
\staff "2" \clef "bass" c,2 d g, \bar "|."
^\figures { <6 5>2 <7> s }
\addlyrics { S4 D5 T1 } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

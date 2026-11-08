---
title: "Deceptive resolution: D5 Tx6"
id: 05-deceptive
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/cadences, 01-harmonic-functions/voice-leading-rules]
tags: [deceptive-resolution, keyboard-schema, doubling, tendency-tone]
source_image: Graphics/harmony/deceptive.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/deceptive.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# Deceptive resolution: D5 Tx6

A **deceptive resolution** of V to VI with the voicing the page requires: *ti* still resolves up to *do*.

## What to look for

- D5: `<D4 F♯4>` + A4 over D3 = V.
- Tx6: `<B3 G4>` + G4 over E3 = E minor (VI) with **G doubled** (*do*, not the bass). This is the non-standard doubling the page explains.
- *ti* (F♯4) → *do* (G4), as in an authentic cadence. The page: this keeps the tendency tone, makes the "deception" work, and avoids the augmented second *ti–le* in minor.
- Soprano A4 → G4 (re–do). Bass D3 → E3 (sol–la).

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/deceptive.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Deceptive progression: D5 Tx6"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp a'2 g \\
\staff "1" \stemDown <d fs>2 <b g'> \\
\staff "2" \clef "bass" d,2 e \bar "|."
\addlyrics { D5 Tx6 } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

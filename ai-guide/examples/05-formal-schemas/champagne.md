---
title: "Champagne progression: T(1 S6d 3)"
id: 05-champagne
category: example
topics: [05-formal-schemas/schema-combinations, 01-harmonic-functions/prolongation, 01-harmonic-functions/voice-leading-rules]
tags: [champagne-progression, keyboard-schema, tonic-prolongation, doubling]
source_image: Graphics/harmony/Champagne.png
source_page: KBVLschemata.md
lilylet: Graphics/lilylet/harmony/Champagne.lyl
provenance: hand
composer: null
work: null
key: G major
meter: null
---

# Champagne progression: T(1 S6d 3)

Gene Biringer's **champagne progression**, T1 S6 T3, harmonising *mi–fa–sol* in the melody. It's more interesting than the plain T(1 D2p 3).

## What to look for

- Soprano B4 → C5 → D5 (mi–fa–sol), which the page says is the only melody to use it with.
- Bass G3 → E3 → B2 (do–la–mi in G major).
- Chords: `<D4 G4>` + B4 over G3 = **I (T1)**. Next, `<E4 G4>` + C5 over E3 = C major with *la* (E) in the bass = **S6** (IV6), figure `6`. Last, `<D4 G4>` + D5 over B2 = **I6 (T3)**, figure `6`.
- The page's required doubling: the **bass is doubled** in S6 (E3 and E4: *la* doubled). That's the non-standard doubling it insists on.
- Voice leading: D4 → E4 → D4 and G4 held in the inner voices, so S6 is reached by step and left by step.
- Only for tonic prolongation. Compare [Pink Champagne](pinkchampagne.md).

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/Champagne.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Champagne: T(1 S6d 3)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \major \clef "treble" \stemUp b'2 c d \\
\staff "1" \stemDown <d g>2 <e g> <d g> \\
\staff "2" \clef "bass" g2 e b \bar "|."
^\figures { s2 <6> <6> }
\addlyrics { T(1 S6d 3) } | %1
```
<!-- score:end -->

## Notes

- Keyboard style: soprano alone on the upper staff (stem up), alto and tenor as a stem-down dyad, bass alone on the lower staff. Half notes, no time signature, as printed.
- Figures sit between the staves (`^\figures` on the bass) and the function label is an `\addlyrics` lane, as printed.

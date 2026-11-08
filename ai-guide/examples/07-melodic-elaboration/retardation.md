---
title: Retardation (RET) with a simultaneous suspension
id: 07-retardation
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [retardation, suspension, 7-8, 4-3, figured-bass, embellishing-tone]
source_image: Graphics/embellishingTones/retardation.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/retardation.lyl
provenance: hand
composer: null
work: null
key: C major
meter: null
---

# Retardation (RET) with a simultaneous suspension

A final-chord retardation (7–8) sounding together with a 4–3 suspension, the combination the source describes. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Pickup (file `%1`): F4+B4 over G3, the dominant seventh (figure 7).
- Bar 1 (file `%2`): the bass moves to C3 (dotted half). The upper voices hold **F4+B4** over it (beats 1–2), then move to E4+C5 on beat 3.
- **B4 → C5**: a major 7th above C3 resolving *up* by step to the octave. This is the RET (figure 7–8).
- **F4 → E4**: a 4th above C3 resolving down by step. This is the simultaneous SUS (figure 4–3). The figures read `<7 4>` then `<8 3>`.
- The dissonant arrival is on the downbeat of the final tonic, the typical end-of-section placement the source describes.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/retardation.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Retardation (RET)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \partial 4 \clef "treble" <f b>4
_\figures { <7>4 } \\
\staff "2" \clef "bass" g4 | %1

\staff "1" <f b>2 <e c'>4
_\figures { <7 4>2 <8 3>4 } \\
\staff "2" c,2. \bar "|." | %2
```
<!-- score:end -->

## Notes

- The pickup is counted as bar `%1` in the file, so the printed final bar is `%2`.
- The "RET" label is omitted; the figures carry it (`\figures`).

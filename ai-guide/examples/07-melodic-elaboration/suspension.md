---
title: Suspension 4–3 (SUS)
id: 07-suspension
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [suspension, 4-3, figured-bass, embellishing-tone, accented-non-chord-tone]
source_image: Graphics/embellishingTones/suspension.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/suspension.lyl
provenance: hand
composer: null
work: null
key: C major
meter: null
---

# Suspension 4–3 (SUS)

A 4–3 suspension over a cadential dominant, with the three parts preparation, suspension and resolution. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Bass F3 (half note) → G3 (half note) | C3 (whole note): IV → V → I.
- **Preparation:** soprano C5 (half note) over F3, a consonant chord tone.
- **Suspension:** C5 again on beat 3 over the new bass G3. The same note is now a 4th above the bass: an accented dissonance on the change of harmony.
- **Resolution:** C5 moves *down by step* to B4 on beat 4. B4 is the 3rd above G3. The figures under the staff read 4–3 (`\figures { s2 <4>4 <3> }`).
- Then bar 2 reaches C5 over C3 (I).
- The resolution pitch class B does not sound in another voice against the suspended C, as the source's rule asks for 4–3.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/suspension.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Suspension (SUS)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" c'2 c4 b
_\figures { s2 <4>4 <3> } \\
\staff "2" \clef "bass" f,2 g | %1

\staff "1" c'1 \\
\staff "2" c,1 \bar "|." | %2
```
<!-- score:end -->

## Notes

- The original sounds the suspended C5 again rather than tying it (two noteheads). The figures mark it as a 4–3 suspension.
- The "SUS" label is omitted; the source prefers the figures, and here they are `\figures`.

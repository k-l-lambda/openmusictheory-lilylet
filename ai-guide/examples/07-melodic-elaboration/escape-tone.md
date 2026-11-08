---
title: Escape tone (ESC)
id: 07-escape-tone
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [escape-tone, echappee, incomplete-neighbor, embellishing-tone]
source_image: Graphics/embellishingTones/escapeTone.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/escapeTone.lyl
provenance: hand
composer: null
work: null
key: C major
meter: null
---

# Escape tone (ESC)

Two escape tones (échappées): stepped to, then left by leap in the opposite direction. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Soprano eighths E5 **F5** | D5 **E5** | C5 (half note), over the bass G3 F3 E3 (quarters, then a half note).
- **F5**: reached by step up from E5, left by leap down a third to D5. **E5**: reached by step up from D5, left by leap down a third to C5. These are the two ESCs.
- Each ESC is the second eighth of its beat, so both are unaccented. The source describes this pattern as step (usually up), then leap (usually down).
- This is the mirror image of the appoggiatura (leap, then step): compare [appoggiatura](appoggiatura.md).

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/escapeTone.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Escape tone (ESC)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e'8[ f^\markup "ESC"] d[ e^\markup "ESC"] c2 \\
\staff "2" \clef "bass" g4 f e2 \bar "|." | %1
```
<!-- score:end -->

## Notes

- The circles are not reproduced; each ESC has a markup.

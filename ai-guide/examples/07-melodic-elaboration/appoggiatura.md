---
title: Appoggiatura (APP)
id: 07-appoggiatura
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [appoggiatura, incomplete-neighbor, accented-non-chord-tone, embellishing-tone]
source_image: Graphics/embellishingTones/appoggiatura.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/appoggiatura.lyl
provenance: hand
composer: null
work: null
key: C major
meter: null
---

# Appoggiatura (APP)

Two appoggiaturas over a dominant-to-tonic bass: accented, leapt to and resolved down by step. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Bass B2 → D3 (slurred) then C3 (half note, beat 3). *Inferred, not stated on the page:* a dominant (V6) over the first half, then I from beat 3.
- Beat 3, first eighth: **D5** — approached by leap up (a fifth from G4), resolves down by step to C5 over the C3 bass. D5 is a non-chord tone on the beat where the bass arrives on C: an accented APP.
- Beat 4, first eighth: **F5** — approached by leap up (a fourth from C5), resolves down by step to E5, again over C3: the second APP. Both leaps up, both resolutions down — the usual case the source describes.
- Both APPs fall on the beat (beats 3 and 4), each followed by its resolution on the off-beat eighth — unlike the escape tones in [escape-tone](escape-tone.md), which fall off the beat.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/appoggiatura.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Appoggiatura (APP)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" g'2 d'8[^\markup "APP" c] f[^\markup "APP" e] \\
\staff "2" \clef "bass" b,4( d) c2 \bar "|." | %1
```
<!-- score:end -->

## Notes

- The original circles both appoggiaturas; here each has an "APP" markup.

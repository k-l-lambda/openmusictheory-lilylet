---
title: Passing tone (PT)
id: 07-passing-tone
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [passing-tone, embellishing-tone, non-chord-tone]
source_image: Graphics/embellishingTones/passingTone.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/passingTone.lyl
provenance: hand            # omr = STARRY OMR + bar-by-bar review; hand = hand-written
composer: null              # "Wolfgang Amadeus Mozart" for real pieces
work: null                  # e.g. "Piano Sonata in G major, K. 283, I, mm. 1–8"
key: C major
meter: null                 # e.g. 3/4; null when the original prints none
---

# Passing tone (PT)

One sentence: what this example demonstrates and why it was chosen.

## What to look for

- Bar-by-bar (or note-by-note) pointers tying the concept to concrete notes, e.g.
  "Soprano E5 → D5 → C5 over a sustained C3: D5 is an unaccented passing tone filling the third E–C."
- Use printed bar numbers (say so if the lilylet `%N` count differs, e.g. a pickup counted as %1).
- Only claims supported by the source page text or by the notes themselves; mark anything inferred.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/passingTone.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Passing tone (PT)"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" e'4 d^\markup "PT" c2 \\
\staff "2" \clef "bass" c,1 \bar "|." | %1
```
<!-- score:end -->

## Notes

- Notation limits that matter for reading this example (e.g. "the circled note in the original is plain markup here").

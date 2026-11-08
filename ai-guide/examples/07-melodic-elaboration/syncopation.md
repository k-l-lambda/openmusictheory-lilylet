---
title: Syncopation (SYN)
id: 07-syncopation
category: example
topics: [07-melodic-elaboration/embellishing-tones]
tags: [syncopation, tie, embellishing-tone, rhythm]
source_image: Graphics/embellishingTones/syncopatedNote.png
source_page: embellishingTones.md
lilylet: Graphics/lilylet/embellishingTones/syncopatedNote.lyl
provenance: hand
composer: null
work: null
key: E major
meter: null
---

# Syncopation (SYN)

Syncopated notes in a sung melody: each tie carries an early arrival into the next beat or chord. Topic: [Embellishing Tones](../../07-melodic-elaboration/embellishing-tones.md). Notation: [reading lilylet](../lilylet-primer.md).

## What to look for

- Single treble-8 staff, sounding an octave lower than written. It is E major, with chord symbols C♯m then Bsus4, and the lyric "Ba-by, ba-by, ba-by, light".
- Bar 1: G♯4 quarter, G♯4 G♯4 eighths (tied), G♯4 eighth, G♯4 quarter, then **B4** on the last eighth, tied over the barline into bar 2.
- The labelled SYN is that last B4. It falls on the off-beat before the barline and belongs to the *next* chord (Bsus4). It is tied into the downbeat, not rearticulated, and that is what separates a syncopation from an anticipation (compare [anticipation](anticipation.md)).
- The G♯4 eighths tied across beats 2–3 in bar 1 and the tied B4 eighths at the end of bar 2 are the same kind of tied early arrival.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/embellishingTones/syncopatedNote.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Syncopated note (SYN)"]

\omit Score.TimeSignature \key e \major \clef "treble_8" gs'4 \chords "C#m" gs8[ gs]~ gs gs4 b8~^\markup "SYN"
\addlyrics { Ba -- by, ba -- _ by, ba -- } | %1

b'8 \chords "Bsus4" b4 b8~ b \bar ""
\addlyrics { _ by, light _ } | %2
```
<!-- score:end -->

## Notes

- The original has no barline at its right edge (the excerpt is cut off), so it ends with `\bar ""`.
- Lyrics are an `\addlyrics` lane; `_` skips the tied continuation notes. The source page does not identify the song.

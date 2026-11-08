---
title: Reading lilylet score examples
category: example
tags: [lilylet, notation, format]
---

# Reading lilylet score examples

The score examples in this guide are written in **lilylet**, a compact LilyPond-like text notation. It's here so an AI can read the music itself and not just a picture of it. Every example is a transcription of a figure from Open Music Theory, checked bar by bar against the original image.

For the full language, see the **Lilylet Language Tutorial**:
- plain text, best for agents: <https://raw.githubusercontent.com/k-l-lambda/lilylet-live-editor/refs/heads/main/static/docs/lilylet-tutorial.md>
- rendered on GitHub: <https://github.com/k-l-lambda/lilylet-live-editor/blob/main/static/docs/lilylet-tutorial.md>

The tutorial covers pitches, rhythms, accidentals, key and time, barlines, chords, articulations, fingering, dynamics, slurs, ties and beams, ornaments, grace notes, tuplets, tremolo, multiple voices and staves, plus complete examples. This page only summarises what you need to read the examples in this guide.

## Essentials

| Syntax | Meaning |
|--------|---------|
| `c d e f g a b` | note names; `fs` = F♯, `bf` = B♭, `css`/`bff` = double sharp/flat |
| **spelling is key-independent** | `f` is F♮ even in G major; accidentals are always written out |
| `'` / `,` | octave up / down **relative to the previous note** (LilyPond `\relative`); each source line restarts at middle C |
| `c4 d8. e16 f2 g1` | durations: 4 = quarter, 8. = dotted eighth, 1 = whole |
| `<c e g>2` | chord |
| `r4`, `R1`, `s2`, `d4\rest` | rest, whole-bar rest, invisible spacer, rest at a pitch position |
| `\key g \major \time 3/4 \clef "bass"` | key, meter, clef (`treble`, `bass`, `alto`, `tenor`, `treble_8`) |
| `\partial 8` | pickup or short bar |
| `\tuplet 3/2 { c8 d e }` | triplet |
| `\grace { d16 c }` | grace notes |
| `(` `)`, `~`, `[` `]` | slur, tie, beam |
| `-.` `->` `--` `\trill` `\p` `\sf` `\<` `\>` | articulations, ornaments, dynamics, hairpins |
| `-3`, `^5` | fingering |
| `\\` | next **voice** (within a part) |
| `\staff "1"` / `\staff "2"` | which staff of the part a voice sits on (part-local) |
| 4 backslashes | next **part** (instrument) |
| `\| %5` | end of bar 5 (the comment is the file's bar count; a pickup is counted as %1) |
| `[staves "{-}"]` | staff grouping: `{}` brace (piano), `<>` bracket, `-` connected barlines |
| `\figures { <6 4>4 <5 3> }` | figured bass (`^` above / `_` below), each figure on its own beat; `<6+>` = ♯6 |
| `\addlyrics { I IV V I }` | a text row under the voice: lyrics, Roman numerals, function labels (T1 S4 D5) |
| `^\markup "PT"` / `_\markup "…"` | a text label above / below a note |
| `\chords "Csus2"` | chord symbol (attached to the previous note) |
| `\omit Score.TimeSignature`, `\omit Score.BarLine`, `\bar ""` | the original prints no time signature / barlines |

## Conventions in this guide

- **Voices:** in four-part examples, staff 1 is written as soprano `\stemUp` plus alto `\stemDown`, and staff 2 as tenor plus bass. A note shared by two voices is written in both.
- **Labels:** the label rows printed under the music (Roman numerals, functions, schema names) are `\addlyrics` lanes, one lane per printed row.
- **Limits:** some things in the originals can't be expressed in lilylet. Examples are boxes and circles around notes, stemless noteheads, courtesy naturals across a barline, a tie on one note of a chord, and slashed figures (written as raised figures, `<6+>`). Each example's *Notes* section lists the limits that apply to it.

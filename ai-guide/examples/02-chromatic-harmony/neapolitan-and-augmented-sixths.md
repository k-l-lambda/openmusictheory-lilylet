---
title: "Neapolitan and augmented-sixth chords in G minor (overview)"
id: 02-neapolitan-and-augmented-sixths
category: example
topics: [02-chromatic-harmony/neapolitan, 02-chromatic-harmony/augmented-sixths]
tags: [neapolitan, augmented-sixth, italian, french, german, swiss, figured-bass]
source_image: Graphics/N-AugSixths.png
source_page: alteredSubdominants.md
lilylet: Graphics/lilylet/N-AugSixths.lyl
provenance: hand
composer: null
work: null
key: "G minor"
meter: null
---

# Neapolitan and augmented-sixth chords in G minor (overview)

The five chromatically altered subdominant chords in basso-continuo style, with figures, chord names and functional bass.

## What to look for

- m. 1: N.: bass C3 (*fa*), upper E♭4 A♭4 C5 = *ra fa le*, figure ♭6, [S4].
- m. 2: It.: bass E♭3 (*le*), G4 + C♯5 (*do*, *fi*), figure ♯6 (slashed 6 in the original), [S6].
- m. 3: Fr.: bass E♭3, G4 A4 C♯5 (*do re fi*), figure ♯6/4/3, [S6].
- m. 4: Ger.: bass E♭3, G4 B♭4 C♯5 (*do me fi*), figure ♯6/5, [S6].
- m. 5: Sw. (in G major): bass E♭3, G4 A♯4 C♯5 (*do ri fi*), figure ♯6/♯4/3. It sounds German but is spelled like the French.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/N-AugSixths.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Neapolitan and augmented sixth chords"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key g \minor \clef "treble" <ef af c>2
_\figures { <6->2 } \\
\staff "2" \clef "bass" c,2 \bar "||"
\addlyrics { N. }
\addlyrics { [S4] } | %1

\staff "1" <g' cs>2
_\figures { <6+>2 } \\
\staff "2" ef,2 \bar "||"
\addlyrics { It. }
\addlyrics { [S6] } | %2

\staff "1" <g' a cs>2
_\figures { <6+ 4 3>2 } \\
\staff "2" ef,2 \bar "||"
\addlyrics { Fr. }
\addlyrics { [S6] } | %3

\staff "1" <g' bf cs>2
_\figures { <6+ 5>2 } \\
\staff "2" ef,2 \bar "||"
\addlyrics { Ger. }
\addlyrics { [S6] } | %4

\staff "1" \key g \major <g' as cs>2
_\figures { <6+ 4+ 3>2 } \\
\staff "2" ef,2 \bar "||"
\addlyrics { Sw. }
\addlyrics { [S6] } | %5
```
<!-- score:end -->

## Notes

- The original slashes the 6 (and the 4 in the Swiss chord); `\figures` has no slash, so they are written as raised figures.
- The key change to G major in m. 5 has no cancellation naturals in the render.

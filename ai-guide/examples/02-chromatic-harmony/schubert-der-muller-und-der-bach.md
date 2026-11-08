---
title: "Schubert, \"Der Müller und der Bach\" (D. 795/19), mm. 7–10: Neapolitan"
id: 02-schubert-der-muller-und-der-bach
category: example
topics: [02-chromatic-harmony/neapolitan]
tags: [neapolitan, N6, lied, minor]
source_image: Graphics/DMUDB.png
source_page: alteredSubdominants.md
lilylet: Graphics/lilylet/DMUDB.lyl
provenance: omr
composer: "Franz Schubert"
work: "Die schöne Müllerin, D. 795, No. 19 \"Der Müller und der Bach\", mm. 7–10"
key: "G minor"
meter: 3/8
---

# Schubert, "Der Müller und der Bach" (D. 795/19), mm. 7–10: Neapolitan

A Neapolitan sixth in context: T – S – D – T in G minor, voice and piano.

## What to look for

- Bar numbers: the excerpt's m. 1–4 = song mm. 7–10.
- m. 1 (m. 7): i. Piano G2 + D3 under B♭3 + G4, voice D5 C5 B♭4.
- m. 2 (m. 8): N.⁶. The piano bass is C (C2 + C3, *fa*), right hand A♭3 E♭4 A♭4 (*ra*, *le*), voice A♭4 E♭5 A♭4 G4. That is S.
- m. 3 (m. 9): V⁷. Bass D2 + D3, right hand A3 + F♯4, voice F♯4 A4 D5 C5 B♭4 A4. That is D.
- m. 4 (m. 10): i (G2 + D3 under B♭3 + G4): T. The page: "the tonic triad (G minor) is followed by a Neapolitan, then a dominant-seventh chord, and then tonic: T – S – D – T".

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/DMUDB.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Der Müller und der Bach, D. 795 No. 19"]
[composer "Franz Schubert"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Voice"]
[instrument-pr-pl "Piano"]

\staff "1" \key bf \major \time 3/8 \clef "treble" \stemDown d'4 c16 bf
\addlyrics { wel -- ken die } \\\\
\staff "1" \clef "treble" bf'8\rest \stemUp <bf, g'>4 \\
\staff "2" \clef "bass" \stemUp <g, d'>4. | %1

\staff "1" \stemDown af'16[ ef'] \stemUp af,8. g16
\addlyrics { Li -- _ lien auf } \\\\
\staff "1" bf'8\rest \stemUp <af, ef' af>4 \\
\staff "2" \stemUp <c,, c'>4. | %2

\staff "1" fs16[ a! d c] bf[ a]
\addlyrics { je -- _ _ _ dem _ } \\\\
\staff "1" bf'8\rest \stemUp <a, fs'>4 \\
\staff "2" \stemUp <d,, d'>4. | %3

\staff "1" g'4 b8\rest
\addlyrics { Beet; } \\\\
\staff "1" bf'8\rest \stemUp <bf, g'>4 \\
\staff "2" \stemUp <g, d'>4. \bar "|." | %4
```
<!-- score:end -->

## Notes

- Written in B♭-major key signature (two flats) as printed; the music is in G minor.

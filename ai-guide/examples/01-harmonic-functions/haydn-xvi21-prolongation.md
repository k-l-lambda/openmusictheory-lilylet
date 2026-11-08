---
title: "Haydn, Piano Sonata Hob. XVI:21, I, mm. 1–6: tonic prolongation and cadential progression"
id: 01-haydn-xvi21-prolongation
category: example
topics: [01-harmonic-functions/harmonic-analysis, 01-harmonic-functions/prolongation]
tags: [harmonic-analysis, tonic-prolongation, cadential-progression, PAC]
source_image: Graphics/harmony/XVI-21-prolongation.png
source_page: harmonicAnalysis.md
lilylet: Graphics/lilylet/harmony/XVI-21-prolongation.lyl
provenance: omr
composer: "Joseph Haydn"
work: "Piano Sonata in C major, Hob. XVI:21, I, mm. 1–6"
key: "C major"
meter: 2/4
---

# Haydn, Piano Sonata Hob. XVI:21, I, mm. 1–6: tonic prolongation and cadential progression

A complete phrase analysis: chord-by-chord Roman numerals and functions, a T—— tonic zone, and the cadential progression into a PAC.

## What to look for

- Bar numbers: the file counts the pickup as %1, so printed m. N = file %N+1.
- Lanes: Roman numerals, chord functions, and the zone line (T———).
- mm. 1–4 (printed): I | ii | V | I. Each chord is labeled, but the zone lane is a single tonic prolongation (T———).
- m. 4 → m. 6: the last tonic of m. 4 begins the cadential progression. m. 5 is ii (F3 → F2 bass) then V⁷ (G3 + F4).
- m. 6: I. The page: "the cadential progression is comprised of the last tonic chord (m. 4) through **S D T** to the **PAC** in m. 6".

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/XVI-21-prolongation.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Haydn, Piano Sonata Hob. XVI:21, I, mm. 1–7"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \partial 8 \clef "treble" \stemDown c'16.(-1\mf[ e32] \\
\staff "2" \clef "bass" r8 | %1

\staff "1" \stemDown g''16.)-4[ e32-1( c'8~] c16.[ b32 a16. g32)] \\
\staff "2" r8 c,8([ c')-1 e-.-2]
\addlyrics { _ I }
\addlyrics { _ T }
\addlyrics { _ T } | %2

\staff "1" \stemDown g''4(-3 f16.)-4\prall[ e32( d16.\prall c32)] \\
\staff "2" \stemDown d8(-1[ d, d') f-.-2]
\addlyrics { ii }
\addlyrics { S }
\addlyrics { — } | %3

\staff "1" \stemDown c'4(-1 b16.)-3\prall[ a'32(-5 g16. f32] \\
\staff "2" \stemDown g'8([ g,)] r8 b-2
\addlyrics { V }
\addlyrics { D }
\addlyrics { — } | %4

\staff "1" \stemDown f'4)-3\turn e16.[ g32(-5 c,16. e32-4] \\
\staff "2" \stemDown c8([ c,)] r8 e-.-2
\addlyrics { I }
\addlyrics { T }
\addlyrics { — } | %5

\staff "1" \stemDown a'16.)[ cs32-2 d16.-2\mordent f32] e16.([ g32-5 b,16.-1 d32] \\
\staff "2" \stemUp f,8([ f,)] r8 \stemDown <g' f'>8
\addlyrics { ii _ V }
\addlyrics { S _ D } | %6

\staff "1" \partial 4. \stemDown c'!4)-1-! r8 \\
\staff "2" r16. c,32([ e16. g32] c8)-! \bar ""
\addlyrics { _ _ I }
\addlyrics { _ _ T } | %7
```
<!-- score:end -->

## Notes

- Fingerings in the original are kept; multi-digit fingerings are reduced to single digits.

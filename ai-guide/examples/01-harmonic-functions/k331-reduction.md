---
title: "Mozart K. 331, I, mm. 1–4: score and harmonic reduction"
id: 01-k331-reduction
category: example
topics: [01-harmonic-functions/prolongation, 01-harmonic-functions/harmonic-analysis]
tags: [prolongation, contrapuntal-chord, cadential-chord, reduction, half-cadence]
source_image: Graphics/harmony/k331-reduction.png
source_page: harmonicSyntax1.md
lilylet: Graphics/lilylet/harmony/k331-reduction.md
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Piano Sonata in A major, K. 331, I, mm. 1–4"
key: "A major"
meter: 6/8
---

# Mozart K. 331, I, mm. 1–4: score and harmonic reduction

An interpreted harmonic analysis: the original four bars over a chordal reduction, with Roman numerals, a function lane and the cadence label.

## What to look for

- Top two staves = Mozart; bottom two = the reduction with figures and labels (I | V⁶⁄₅ | vi V⁶ | I ii⁶ V — HC).
- m. 1: T1, a root-position tonic (A3 + C♯4 + E4 under C♯5 + E5) triggers the tonic zone.
- mm. 1–4: the bass A → G♯ (m. 2, V⁶⁄₅) → F♯ (m. 3, vi with a 7) → G♯ (m. 3, V⁶) → A (m. 4) is a passing line. The first-inversion dominants are contrapuntal chords (D7) prolonging T.
- m. 3: the vi is in root position but is still an embellishing chord inside the T zone, as the page points out.
- m. 4: the cadential progression I → ii⁶ (D3 bass, S4) → cadential 6/4 → V (E3), all over fixed bass degrees, ends in an HC.

## Score

Notation: see the [lilylet primer](../lilylet-primer.md).

<!-- score:begin -->
<!-- generated from Graphics/lilylet/harmony/k331-reduction.md by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "K. 331, I, mm. 1–4: theme and reduction"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{o1-o2} {r1-r2}"]
[instrument-o1-o2 "Original"]
[instrument-r1-r2 "Reduction"]

\staff "1" \key a \major \time 6/8 \clef "treble" \stemUp cs'8.(\p\<[ d16) cs8-.]\! e4-.--(\> e8-.)\! \\
\staff "2" \clef "bass" \stemUp e4 e8-. e4 e8 \\
\staff "2" \stemDown a8.([ b16) a8] cs4-.--( cs8-.) \\\\
\staff "1" \key a \major \time 6/8 \clef "treble" <cs' e>2. \\
\staff "2" \clef "bass" <a cs e>2.
\addlyrics { "A: I" }
\addlyrics { T }
\addlyrics { T } | %1

\staff "1" \stemUp b'8.(\<[ cs16) b8-.]\! d4-.--(\> d8-.)\! \\
\staff "2" \stemUp e4 e8-. e4 e8-. \\
\staff "2" \stemDown gs8.([ a16) gs8-.] b4-.--( b8-.) \\\\
\staff "1" <b' d>2. \\
\staff "2" <gs b e>2.
^\figures { <6 5>2. }
\addlyrics { V }
\addlyrics { D } | %2

\staff "1" \stemUp a'4-.--( a8-.)\< b4-.--( b8-.--)\! \\
\staff "2" \stemUp e4-.( e8-.) e4-.( e8-.) \\
\staff "2" \stemDown fs,4 fs8 gs4 gs8 \\\\
\staff "1" a'4. b \\
\staff "2" <fs, e'>4. <gs e'>
^\figures { <7>4. <6> }
\addlyrics { vi V }
\addlyrics { T D } | %3

\staff "1" \stemUp cs'4 e16([ d)] cs4(\> b8-.)\! \\
\staff "1" \stemDown s4 b'8 a4( gs8) \\
\staff "2" \stemUp e4 s8 s4. \\
\staff "2" \stemDown a4 d,8 e4. \bar "|." \\\\
\staff "1" cs'4 <b d>8 <a cs>4 <gs b>8 \\
\staff "2" <a e'>4 d,8 e4.
^\figures { s4 <6>8 <6 4>4 <5 3>8 }
\addlyrics { I ii V }
\addlyrics { T S D }
\addlyrics { _ S D }
\addlyrics { _ _ HC } | %4
```
<!-- score:end -->

## Notes

- The original prints "V——" / "T——" extender lines after the labels; lilylet shows the labels without the lines.

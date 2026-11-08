---
title: "Hybrid 3 (CBI + continuation): Beethoven, Violin Sonata Op. 30 No. 2, III, mm. 1–8"
id: 04-beethoven-op30-2-hybrid3
category: example
topics: [04-phrase-structure/hybrid-themes, 04-phrase-structure/theme-functions]
tags: [hybrid, hybrid-3, compound-basic-idea, CBI, continuation, neighbor-chord]
source_image: Graphics/form/beethoven_op30.png
source_page: hybridThemes.md
lilylet: Graphics/lilylet/beethoven_op30.lyl
provenance: omr
composer: "Ludwig van Beethoven"
work: "Violin Sonata in C minor, Op. 30 No. 2, III (Scherzo), mm. 1–8 (piano part)"
key: C major
meter: 3/4
---

# Hybrid 3: a compound basic idea (BI + CI over a tonic prolongation, with no cadence) followed by a continuation.

The page singles out the V6 in m. 3. It shows why the first phrase is a CBI and not an antecedent.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers; the lilylet file counts the pickup as `%1`, so printed m. N = `%N+1`.
- mm. 1–4: two ideas, each starting with the same dotted figure. Grace D5, then C5. B4 at the pickup and again at the end of m. 2.
- m. 3, last beat: **V6** (⟨B3 G4⟩ under D5) decorates the tonic as a lower-neighbour chord and goes back to I in m. 4. It articulates no cadence, so mm. 1–4 are a **CBI**, not an antecedent.
- mm. 5–7: continuation. The melody fragments (m. 5 E5 C5, then the dotted figure again), the figure is sequenced down a step (m. 6 C5 G4 A4, then m. 7 F♯4 G4 A4), and the harmony changes on every beat (m. 7: ⟨A3 C4⟩, ⟨B3 D4⟩, ⟨C4 E4⟩).
- m. 8: the phrase closes on G4 over ⟨G3 B3⟩ and G2, after D4–F♯4 with a turn in m. 7 (bass ⟨D3 G3 B3⟩, ⟨D3 A3 C4⟩). *Inferred:* this reads as a cadence on G (a tonicised V); the source page just says the continuation 'ends with a cadence'.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/beethoven_op30.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Violin Sonata in C minor, Op. 30 No. 2, III"]
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key c \major \time 3/4 \partial 4 \tempo "Allegro" \clef "treble" \ottava #0 \grace d'8( \stemDown c8.)\p-.[ b16-.] \\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemDown c'4-. \stemUp g-. a-. \\
\staff "2" d,4\rest \stemDown <c' e> <c f> | %2

\staff "1" \stemUp g'2 \grace d'8( \stemDown c8.)-.[ b16-.] \\
\staff "2" \ottava #0 \stemDown <c e>4 \stemUp c, d\rest | %3

\staff "1" \stemDown c'4-. c-. d-. \\
\staff "2" \clef "treble" b'4\rest \stemUp <e, g>-. <b g'>-. | %4

\staff "1" \grace { c'16[( d] } \stemDown e4)\sf( c8) b\rest \grace d8( c8.)-.[ b16-.] \\
\staff "2" \stemUp g'4. s8 \\
\staff "2" \stemDown c4( e8) b'\rest b4\rest | %5

\staff "1" \ottava #0 \stemDown c'4-. \stemUp g-.\sf a-. \\
\staff "2" \ottava #0 b'4\rest \stemUp <b, d>-. <c e>-. | %6

\staff "1" \stemUp fs4-.\sf g-. a-.\sf \\
\staff "2" \stemUp <a c>4-. <b d>-. <c e>-. | %7

\staff "1" \stemUp d2 fs4\trill \grace { e16[( fs]) } \\
\staff "2" \clef "bass" d,4\rest \stemDown <d g b>-. <d a' c>-. | %8

\staff "1" \stemUp g'4 b\rest b\rest \\
\staff "2" \stemDown <g b>4 \stemUp g, d'\rest | %9
```
<!-- score:end -->

## Notes

- The work is in C minor; this Scherzo is in C major.
- Piano part only, as in the OMT image.

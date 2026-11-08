---
title: "Phrase expansion after an IAC: Beethoven, Piano Sonata Op. 2 No. 3, I, mm. 1–13"
id: 04-op2-3-phrase-expansion
category: example
topics: [04-phrase-structure/phrase-expansion, 04-phrase-structure/sentence]
tags: [phrase-expansion, internal-expansion, IAC, PAC, sentence, link, repetition]
source_image: Graphics/form/op2no3.png
source_page: internalExpansions.md
lilylet: Graphics/lilylet/op2no3.lyl
provenance: omr
composer: "Ludwig van Beethoven"
work: "Piano Sonata in C major, Op. 2 No. 3, I, mm. 1–13"
key: C major
meter: 4/4
---

# Phrase expansion: a weak cadence (IAC) where a PAC is expected leads to a repetition of the continuation, which then ends with a PAC.

The basic phrase is an 8-bar sentence. The expansion adds five bars.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers equal the lilylet `%N` (no pickup).
- mm. 1–4: presentation. BI over a tonic pedal (⟨C3 G3⟩), answered on the dominant (m. 3, bass G2/B3).
- mm. 5–8: continuation, with the turning figure B4 C5 B4 C5 D5 B4 and a moving bass C3 D3 G2.
- m. 8: at the expected PAC, the melody lands on **scale degree 3** (E4 over C3), an **IAC**. Under it the bass plays a descending link in triplets (C3 G3 F♯3 | F3 E3 D3) into the repetition.
- mm. 9–12: the continuation is repeated. The bass now carries the turning figure (B2 C3 B2 C3 D3 B2), with *sf* accents.
- m. 13: **PAC**. C4 over ⟨C2 E2 G2 C3⟩, *ff*. The basic phrase has grown from 8 to 13 bars.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/op2no3.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Sonata in C major, Op. 2 No. 3, I"]
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key c \major \time 4/4 \tempo "Allegro con brio" \clef "treble" \ottava #0 \stemUp <c e>2\p <b d>16([ <c e> <b d> <c e>)] <d f>8-.[ <c e>-.] \\
\staff "2" \clef "bass" \ottava #0 <c, g'>1 | %1

\staff "1" \stemUp <b d>4-. <b g'>-. b'2\rest \\
\staff "2" \stemUp <g, g'>4-. <g g'>-. d'2\rest | %2

\staff "1" \stemUp <d f>2 <cs e>16([ <d f> <cs e> <d f>)] <e g>8-.[ <d f>] \\
\staff "2" <g, b'>1 | %3

\staff "1" \stemUp <c e>4-. <g' c>-. b2\rest \\
\staff "2" \stemDown <c, g'>4-. <c g'>-. d2\rest | %4

\staff "1" \stemDown e2\p f \\
\staff "1" \stemUp c'2 b16([ c b c)] d8-.[ b-.] \\
\staff "2" g1~ \\
\staff "2" g,4\rest \stemDown c d g, | %5

\staff "1" a4\rest \stemDown e' f2 \\
\staff "1" \stemUp g'4 c b16([ c b c)] d8-.[ b-.] \\
\staff "2" \stemUp g4 g2.~ \\
\staff "2" g,4\rest \stemDown c d g, | %6

\staff "1" s4 \stemDown c' <c, d>2 \\
\staff "1" \stemUp g'4( s d a') \\
\staff "2" \stemUp g2 a \\
\staff "2" \stemDown e,4 c f d | %7

\staff "1" \stemUp d4( g e) r \\
\staff "1" \stemDown b2 c4 s \\
\staff "2" \stemDown g4 g, \tuplet 3/2 { c8([ g' fs)] } \tuplet 3/2 { f!-.[ e-. d-.] } | %8

\staff "1" b'4\rest \stemDown e,\sf d d \\
\staff "1" s4 \stemUp g'2( f4) \\
\staff "2" \stemDown c,2\sf b16([ c b c)] d8-.[ b-.] | %9

\staff "1" \stemDown c4 e\sf d d \\
\staff "1" \stemUp e4 g2( f4) \\
\staff "2" \stemDown g,4 c\sf b16([ c b c)] d8-.[ b-.] | %10

\staff "1" \stemUp <c e>4 r <c e a> r \\
\staff "2" \stemUp g4 s a s \\
\staff "2" \stemDown g,4 c2\sf fs,4~ | %11

\staff "1" \stemUp <c e g>4 r s r \\
\staff "2" \stemUp g4 s <d f! g b> s \\
\staff "2" \stemDown fs,,4 g2\sf \stemUp <g, g'>4 | %12

\staff "1" \stemUp c16\ff s16 s8 s2. \\
\staff "2" \stemUp <c,, e g c>4 s2. \bar "|" | %13
```
<!-- score:end -->

## Notes

- form/cadentialDeferral.lyl is the same passage with an extra bass upper voice in mm. 9–10. This example uses op2no3.lyl, the image on the source page.
- The excerpt ends right after the first 16th of m. 13.

---
title: "Compound sentence: Mozart, Trio K. 498 (Kegelstatt), I, mm. 1–13"
id: 04-k498-compound-sentence
category: example
topics: [04-phrase-structure/compound-themes, 04-phrase-structure/phrase-expansion]
tags: [compound-sentence, compound-basic-idea, CBI, presentation, phrase-expansion, trio]
source_image: Graphics/form/k498.png
source_page: compoundSentence.md
lilylet: Graphics/lilylet/form/k498.lyl
provenance: omr
composer: "Wolfgang Amadeus Mozart"
work: "Trio in E-flat major for Clarinet, Viola and Piano, K. 498, I, mm. 1–13"
key: E-flat major
meter: 6/8
---

# Compound sentence: a 'presentation' made of two 4-bar compound basic ideas, then a continuation that is expanded by repetition.

Three parts: clarinet, viola, piano. In mm. 1–8 the viola and the piano right hand carry the theme together.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers equal the lilylet `%N` (no pickup).
- mm. 1–4: CBI 1, from **tonic to dominant**. E♭ (m. 1 over bass E♭2/E♭3) → B♭7 (m. 4, bass chord ⟨D3 A♭3 B♭3⟩).
- mm. 5–8: CBI 2, from **dominant back to tonic**. The same idea a step higher over F2/F3 and B♭ chords, ending on E♭ in m. 8.
- m. 9: the clarinet enters with the continuation (E♭5 …). The piano accompanies in 16th-note arpeggios, and the bass moves every half bar.
- m. 12: the clarinet is **missing at the downbeat**: an eighth rest, then the chromatic link E♭4 F4 G♭4 G4 A♭4 A4 B♭4 B4 C5 D♭5 D5. The continuation seemed to close in m. 12, but this link starts a repetition.
- m. 13: the repetition begins. The **piano right hand takes over the clarinet's m. 9 melody** (E♭5 …), and the clarinet holds E♭5. Per the page, it reaches the PAC in m. 16, which is beyond this excerpt.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/form/k498.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Trio in E-flat major, K. 498 (\"Kegelstatt\"), I, mm. 1-13"]
[composer "Wolfgang Amadeus Mozart"]
[staves "<cl-va> {pr-pl}"]
[instrument-cl "Clarinet"]
[instrument-va "Viola"]
[instrument-pr-pl "Piano"]

\key ef \major \time 6/8 \tempo "Andante" \clef "treble" R2. \\\\
\clef "alto" \stemDown <af ef'>4\f~ ef'16\p[ f64( ef d ef] g8[ ef bf)] \\\\
\staff "1" \clef "treble" \stemUp ef4\f~ ef16\p[ f64( ef d ef] g8[ ef bf)] \\
\staff "2" \clef "bass" \stemUp <ef,, ef'>4. \stemDown g'8\p([ ef bf)] | %1

R2. \\\\
\stemUp g8 r r r4. \\\\
\staff "1" \stemUp g8 r r r r \stemDown bf' \\
\staff "2" \stemUp g,8 r r r4. | %2

R2. \\\\
R2. \\\\
\staff "1" \stemUp bf'8([ ef,) ef] \grace f16( ef8)-.[ d-. ef-.] \\
\staff "2" \stemDown <g bf ef>8 r r <g bf ef> r r | %3

R2. \\\\
R2. \\\\
\staff "1" \grace { d16[( ef] } \stemUp f8) r r r4. \\
\staff "2" \stemDown <d, af' bf>8 r r r4. | %4

R2. \\\\
\stemDown f4\f~ f16\p[ g64( f e f] af8[ f d)] \\\\
\staff "1" \stemUp f4\f~ f16\p[ g64( f e f] af8[ f d)] \\
\staff "2" \stemUp <f,, f'>4. \stemDown af'8\p([ f d)] | %5

R2. \\\\
\stemUp bf8 r r r4. \\\\
\staff "1" \stemUp bf8 r r r r \stemDown bf' \\
\staff "2" \stemUp bf,,8 r r r4. | %6

R2. \\\\
R2. \\\\
\staff "1" \stemUp bf'8([ f) f] \grace g16( f8)-.[ ef!-.( f)-.] \\
\staff "2" \stemDown <d, af' bf>8 r r <bf d af' bf> r r | %7

R2. \\\\
R2. \\\\
\staff "1" \grace { ef16[( f] } \stemUp g8) r r r4. \\
\staff "2" \stemDown <ef, g bf>8 r r r4. | %8

\stemDown ef'4\p~ ef16[ f64( ef d ef] g8[ ef bf)] \\\\
R2. \\\\
\staff "1" s2. \\
\staff "2" \clef "bass" \stemUp r16 ef,[( g bf ef bf)] r g[( bf ef g ef)] \\
\staff "2" \stemDown g,8 r r ef r r | %9

\stemDown c'4~ c16[ d64( c b c] ef8[ c af)] \\\\
R2. \\\\
\staff "1" s2. \\
\staff "2" \stemUp r16 f,[( af c ef c)] r af[( c ef f ef)] \\
\staff "2" \stemDown af,8 r r f r r | %10

\stemUp g'4~ g16[ af64( g f g] bf8[ af f)] \\\\
R2. \\\\
\staff "1" \clef "treble" s2. \\
\staff "2" \stemUp r16 ef,[( g bf ef c)] r f,[( af bf d bf)] \\
\staff "2" \stemDown bf,8 r r bf, r r | %11

r16 \stemUp ef[( f gf g! af] \stemDown a![ bf b! c df d!)] \\\\
r4. r \\\\
\staff "1" r4. r \\
\staff "2" \stemUp <g ef'>8 r r r4. \\
\staff "2" \stemDown c,8 s s s4. | %12

\stemDown ef'2.(\p \\\\
r16 \stemUp ef,(\p[ g bf ef bf)] r \stemDown g([ bf ef g ef)] \\\\
\staff "1" \stemDown ef'4~ ef16[ f64( ef d ef] g8[ ef b!)] \\
\staff "2" \stemUp <g, g'>8 r r <ef ef'> r r | %13
```
<!-- score:end -->

## Notes

- The image ends at m. 13; the page's caption covers mm. 1–16.
- The clarinet is written at the printed (concert) pitch, as in the source.
- The page text calls mm. 1–8 'the continuation'. Its own description of two CBIs (T→D, D→T) matches the expanded **presentation** of a compound sentence.

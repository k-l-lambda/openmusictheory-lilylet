---
title: "Sonata transition (TR) and III:HC medial caesura: Beethoven, Piano Sonata in G minor, Op. 49 No. 1, I"
id: 06-tr-transition
category: example
topics: [06-large-forms/sonata-form]
tags: [sonata-form, transition, dissolving-transition, medial-caesura, half-cadence, presentation]
source_image: Graphics/form/TR.png
source_page: sonataThematicModules.md
lilylet: Graphics/lilylet/form/TR.lyl
provenance: omr
composer: Ludwig van Beethoven
work: "Piano Sonata in G minor, Op. 49 No. 1, I, mm. 1–17"
key: G minor
meter: 2/4
---

# Sonata transition (TR): Beethoven, Op. 49 No. 1, I

OMT's example of a **modulating, dissolving transition**. P and TR open with the same presentation, so TR is only recognisable as a transition once its continuation starts. It ends on a **III:HC** that coincides with the **medial caesura**.

## What to look for

- **Bar numbers:** the pickup is m. 0 (`%1`), so m. N = `%N+1`. The key signature is two flats, G minor.
- **P, mm. 1–8.**
  - Presentation: basic idea mm. 1–2 B♭4 G4 F♯4 G4 | `<D4 C5>`, repeated mm. 3–4 with `<G4 E♭5>`.
  - It continues to m. 8, which has bass `<D3 B♭3>` → `<D3 A3>` under G4 A4 G4 F♯4 D4.
  - The P/TR boundary at m. 9 is from the page. The cadence type at m. 8 isn't stated there.
- **TR starts at m. 9 (`%10`) with the same presentation.**
  - mm. 9–11 = `%10`–`%12` repeat mm. 1–3 note for note; m. 12 departs from m. 4.
  - This is why the page calls the transition *dissolving*: you can't hear it as TR yet. Its rule is that a transition always begins at the start of a phrase.
- **Continuation from m. 12 (`%13`).**
  - m. 12: the right hand holds E♭5 over a C–E♭–G–A bass arpeggio. m. 13 (`%14`) runs in sixteenths, E♭5 D5 F5 E5 G5 F5 E♭5 D5, with "cresc.".
  - These continuational traits are what reveal TR, per the page.
- **III:HC = MC, m. 15 (`%16`).**
  - Grace-note turns over bass E♭3 → E3 in m. 14 lead to F: bass F3 in m. 15, with the melody descending to F4.
  - This is V of B♭ (III), a **III:HC**. It coincides with the structural HC, and the following silence marks the MC.
- **S begins, m. 16 (`%17`): "dolce" in B♭ major.** The right hand plays E♭5 A4 A4 A4 over a broken F7 in the bass (A3 F4 C4 F4 E♭4 …). The chord reading is inferred.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/form/TR.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Sonata exposition: transition (TR)"]
[staves "{-}"]

\staff "1" \key bf \major \time 2/4 \partial 8 s8 \\
\staff "1" \clef "treble" \stemUp d8\p \\
\staff "2" \clef "bass" c,8\rest | %1

\staff "1" \stemUp bf'8([ g fs g)] \\
\staff "2" c,8\rest \stemDown <bf' ef>([ <a c> <g bf>)] | %2

\staff "1" \stemUp <d c'>2\mfp \\
\staff "2" \stemDown <fs, a>8[ <d fs> <e g> <fs a>] | %3

\staff "1" \stemUp bf'8([ g fs g)] \\
\staff "2" \stemDown <g bf>8([ <bf d> <a c> <g bf>)] | %4

\staff "1" \stemDown <g' ef'>2\mfp \\
\staff "2" \stemDown c,8[ ef g c] | %5

\staff "1" \stemDown d'8[ fs( g) d(] \\
\staff "2" \stemDown bf4 d,8\rest <bf' d> | %6

\staff "1" \stemDown c'8)[ gs'( a) c,(] \\
\staff "2" \stemDown <fs, d'>4 c8\rest <fs d'> | %7

\staff "1" \clef "treble" \stemDown bf'8)([ g' a, ef')] \\
\staff "2" \clef "bass" \stemDown <g d'>4 <c, c'> | %8

\staff "1" \stemUp g'8.([ a32 g] fs8) d \\
\staff "2" \stemDown <d, bf'>4(~ <d a'>8 d\rest | %9

\staff "1" \stemUp bf'8([ g fs g)] \\
\staff "2" d,8\rest \stemDown <bf' ef>([ <a c> <g bf>)] | %10

\staff "1" \stemUp <d c'>2\mfp \\
\staff "2" \stemDown <fs, a>8([ <d fs> <e g> <fs a>] | %11

\staff "1" \stemUp bf'8([ g fs g)] \\
\staff "2" \stemDown <g bf>8([ <bf ef> <a c> <g bf>)] | %12

\staff "1" \stemDown ef'4.\fp ef8( \\
\staff "2" \stemUp c,8[ ef g a] \\
\staff "2" \stemDown c,4. c8 | %13

\staff "1" \stemDown ef'16[_\markup "cresc." d f e] g[ f ef d)] \\
\staff "2" s4 r8 \stemUp f, \\
\staff "2" \stemDown <d, bf'>4 s8 d | %14

\staff "1" \grace { c'16[( d e] } \stemDown d8\p[ c)] \grace { b16[( c d] } c8[ bf)] \\
\staff "2" \stemUp g8[ c] g[ c] \\
\staff "2" \stemDown ef,4 e | %15

\staff "1" \grace { a'16[( bf c] } \stemUp bf16[ a g f] e[ f g f)] \\
\staff "2" \stemDown f,4 r \\
\staff "2" \stemUp c4 s | %16

\staff "1" \stemUp ef'8(_\markup "dolce"[ a, a-. a)-.] \\
\staff "2" \stemDown a16[ f' c f] ef[ f c f] | %17

\staff "1" \stemDown bf'8.\turn([ d16] f8) f \\
\staff "2" \stemDown d16[ f bf, f'] d[ f bf, f'] | %18

\staff "1" \stemDown ef''8([ a,) a-.( a)-.] \\
\staff "2" \stemDown a16[ f' c f] ef[ f c f] | %19
```
<!-- score:end -->

## Notes

- The original's mfp marks (mm. 2, 4, 10) are written as `\mfp`. lilylet 0.1.93 doesn't support `\mfp` yet; until it does, those bars render with a stray note and no dynamic.
- The bass voicing in mm. 13–16 was reviewed by hand; the original is small there.

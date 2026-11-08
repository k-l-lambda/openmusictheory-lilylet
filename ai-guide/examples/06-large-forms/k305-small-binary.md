---
title: "Small binary: Mozart, Violin Sonata in A major, K. 305, II (theme)"
id: 06-k305-small-binary
category: example
topics: [06-large-forms/binary-ternary]
tags: [small-binary, period, contrasting-middle, standing-on-the-dominant, continuation, fragmentation]
source_image: Graphics/form/k305.png
source_page: smallBinary.md
lilylet: Graphics/lilylet/form/k305.lyl
provenance: omr
composer: Wolfgang Amadeus Mozart
work: "Violin Sonata in A major, K. 305, II, theme"
key: A major
meter: 2/4
---

# Small binary: Mozart, K. 305, II

OMT's model small binary. The first part is a modulating period ending V:PAC. The second part opens with a contrasting middle that *stands on the dominant*. Its last four bars are continuation-like and close I:PAC. The second part doesn't recapitulate the opening, and that's what makes it binary rather than ternary.

## What to look for

- **Bar numbers.** Printed bar numbers have the pickup as m. 0 (`%1`).
  - The file splits the bar that contains the `:..:` repeat into two short bars, `%9` and `%10`.
  - So mm. 1–8 = `%2`–`%9`, and m. 9 onward = `%N−2` (m. 9 = `%11` … m. 18 = `%20`).
- **First part, mm. 1–8: a simple period that modulates to E.**
  - m. 8 (`%9`) closes on E: piano bass E2 under E4 in the right hand.
  - The approach is through D♯, the leading tone of E: D♯3 in the bass at the end of m. 6 (`%7`) and D♯4 in the right-hand lower voice at the end of m. 7 (`%8`). That's a **V:PAC**, as the page says.
- **Contrasting middle, mm. 9–14 (`%11`–`%16`): standing on the dominant.**
  - The piano bass repeats E3–E2 under the dotted-rhythm motive with grace notes, in mm. 9–10 (`%11`–`%12`).
  - The piano states the motive in m. 9 (A4 G♯4 G♯4). In m. 10 (`%12`) the violin joins a third below the piano: violin A4 G♯4 G♯4 against piano C♯5 B4 B4.
  - m. 12 (`%14`) reaches the full dominant seventh: piano chord E5 G♯5 B5 D6 over E-major arpeggios in the bass.
  - The page points out that this motive is close to the first part's material (the grace-note + dotted-sixteenth figure of m. 3), which is typical of a small binary.
- **Last four bars, mm. 15–18 (`%17`–`%20`): a continuation.**
  - The motive is fragmented and sequenced in thirds and sixths: violin B3 A3 A3 | C♯4 B3 B3 against piano dyads `<G♯ B>` `<F♯ A>` | `<A C♯>` `<G♯ B>`, over a stepwise bass D–C♯ | E–D♯.
  - From the pickup to m. 17 it moves into the cadence.
- **Close, mm. 17–18 (`%19`–`%20`): I:PAC in A.**
  - Bass F♯3 D3 E3 E3 (m. 17) → A3 E3 A2 (m. 18). That reads as II6–V–I; the Roman numerals are inferred, not printed.
  - Melody `<C♯ A4>`. A small binary's second part always closes I:PAC.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/form/k305.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Violin Sonata in A major, K. 305, II (theme)"]
[composer "Wolfgang Amadeus Mozart"]
[staves "<vn> {pr-pl}"]
[instrument-vn "Violin"]
[instrument-pr-pl "Piano"]

\key a \major \time 2/4 \partial 8 \tempo "Andante grazioso" \clef "treble" r8 \\\\
\staff "1" \clef "treble" \stemDown cs'16.(\trill\p[ d32] \\
\staff "2" \clef "bass" r8 | %1

<cs e>2\p \\\\
\staff "1" \stemDown e'8[_\markup "dolce" a,) a-.( a-.)] \\
\staff "2" \stemDown a,4-- <cs' e> | %2

<b e>4~ <cs e>8 r \\\\
\staff "1" \stemUp b'8.([ gs16] a8) r \\
\staff "2" \stemDown <d e>4~ <cs e>8 r | %3

\grace { fs16[ b] } d4--\mf cs16.([ a32 cs16. a32)] \\\\
\staff "1" \grace { a'16[ d] } \stemDown fs4--\f e16.([ cs32 a'16. cs,32)] \\
\staff "2" \stemDown <d, d'>4-- <a a'>-- | %4

\grace cs'8 b8(-.[ a)-.] r4 \\\\
\staff "1" \grace e'8 \stemDown d8(-.[ cs)-.] r \stemUp a-.\p \\
\staff "2" \stemDown <e, gs>8(-.[ <a, a'>)-.] r4 | %5

b4(_\markup "mfp" cs8) r \\\\
\staff "1" \stemUp b'8(\fp[ a32 gs fs e] e'8)-.[ a,-.] \\
\staff "2" \stemDown <d, e gs>4(~ <cs e a>8)\< r\! | %6

b4(_\markup "mfp" cs8) r \\\\
\staff "1" \stemUp b'8(\fp[ a32 gs fs e] e'8)-.[ <a, cs>--\f] \\
\staff "2" \stemDown <d, e gs>4(~ <cs e a>8)[ <ds fs>] | %7

r4 b8(--[ b)--] \\\\
\staff "1" \stemUp b'16.([ gs32 fs16. a32] e8[ \grace gs8 fs-.] \\
\staff "1" \stemDown gs'16.[ e32 cs8] b[ ds] \\
\staff "2" \clef "bass" \stemDown <e, gs>8(--[ <a, a'>--] <b gs'>--[ <b a'>)--] | %8

\partial 4. b4 r8 \bar ":..:" \\\\
\staff "1" \stemUp e4--) r8 \\
\staff "2" \stemUp <e, gs>4 s8 \\
\staff "2" \stemDown e,8(-.[ b] e,)-. | %9

\partial 8 r8 \\\\
\staff "1" \grace e8( \stemUp b'16.)\p[ a32-.] \\
\staff "2" r8 | %10

r4 r8 \grace e8( b'16.)\p\<[ a32-.] \\\\
\staff "1" \stemUp a'16([ gs) gs8-.] r \grace b8( \stemDown d!16.)\<[ cs32-.] \\
\staff "2" r8 \stemUp e,(-.\p[ e,)-.] r | %11

a'16(\!\>[ gs) gs8-.]\! r \grace b8( d16.)[ cs32-.] \\\\
\staff "1" \stemDown cs'16([ b) b8-.] r \grace d8( fs16.)[ e32-.]\! \\
\staff "2" r8 \stemUp e,(\!-.[ e,)-.] r | %12

b'8[_\markup "cresc." \grace e,8( d'16.) cs32-.] b8[ \grace b8( gs'16.) a32-.] \\\\
\staff "1" \stemDown d'8[_\markup "cresc." \grace b8( d'16.) b32-.] b8[ \grace b8( d16.) cs32-.] \\
\staff "2" \stemDown e,8 r e r | %13

b''4.\f gs,16(\p[ b)] \\\\
\staff "1" \stemDown <e' gs b d>4.\f b'16(\p[ gs)] \\
\staff "2" \tuplet 3/2 { e,,16([ gs b] } \tuplet 3/2 { e16[ gs b] } \stemDown d4) | %14

e4 e'16([ d cs\< b)] \\\\
\staff "1" \clef "treble" \stemDown a''16([ gs fs e] gs[ fs\> e d)] \\
\staff "2" \clef "bass" \stemDown <cs, cs'>4( <d d'> | %15

a'8([ gs)\!] r cs,16.(->\f[ b32)] \\\\
\staff "1" \stemDown cs'8([ b)\!] r \stemUp <a cs>16.(->\f[ <gs b>32)] \\
\staff "2" \stemDown <e, e'>4 r16. \stemUp a32(\mf[ b16. cs32] | %16

b16([ a)] a4 d16.(->[ cs32)] \\\\
\staff "1" \stemUp <gs' b>16([ <fs a>)] <fs a>4 \stemDown <b d>16.(->[ <a cs>32)] \\
\staff "2" \stemUp d,16.[ cs32 d16. cs32)] d16.[ b32\< cs16.( d32] | %17

cs16([ b)] b4 e16.(\>[ d32)\!] \\\\
\staff "1" \stemUp <a' cs>16([ <gs b>)] <gs b>4 \stemDown <cs e>16.(->[ <b d>32)] \\
\staff "2" \stemDown e,16.[ ds32 e16. ds32] e16.)\![ cs32(\f d16. e32] | %18

d16(\p[ cs fs) d-.] cs8-.[ b-.] \\\\
\staff "1" \stemDown <b' d>16([ <a cs> <d fs> <b d>)\>] \stemUp <a cs>8-.\p\![ <d, e gs b>-.] \\
\staff "2" \stemDown fs,8[ d)-.] e(-.[ e-.] | %19

\partial 4. b8([ a)] r \bar ":|." \\\\
\staff "1" \stemUp <d e gs b>8([ <cs a'>)] r \\
\staff "2" \stemDown a8-.[ e-.] a,--) | %20
```
<!-- score:end -->

## Notes

- Three staves: violin (small, upper) plus the piano grand staff. Transcribed from masked OMR of each staff group and spliced bar by bar.
- The original's `mfp` marks are markup here; the "a)" footnote and the pedal marks are left out.

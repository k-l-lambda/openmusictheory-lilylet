---
title: "Small ternary: Mozart, Piano Sonata in D major, K. 284, III, Tema"
id: 06-k284-small-ternary
category: example
topics: [06-large-forms/binary-ternary, 05-formal-schemas/continuation-schemas]
tags: [small-ternary, rounded-binary, period, contrasting-middle, fonte, recapitulation]
source_image: Graphics/form/k284.png
source_page: smallTernary.md
lilylet: Graphics/lilylet/form/k284.lyl
provenance: omr
composer: Wolfgang Amadeus Mozart
work: "Piano Sonata in D major, K. 284, III, Tema"
key: D major
meter: 4/4
---

# Small ternary: Mozart, K. 284, III, Tema

OMT's prototypical small ternary, also known as a rounded binary.
- **Exposition:** a modulating period ending V:PAC.
- **Contrasting middle:** opens with a compressed **Fonte** and a descending scale, ending I:HC.
- **Recapitulation:** brings back only the consequent phrase, altered to end I:PAC.

## What to look for

- **Bar numbers.** The two-beat pickup is m. 0 (`%1`).
  - Printed m. N = `%N+1` up to m. 8 (`%9`), which ends at the repeat sign.
  - `%10` holds the half-bar pickup into the second reprise, so from m. 9 on, m. N = `%N+2` (m. 9 = `%11` … m. 17 = `%19`).
- **Exposition, mm. 1–8: a simple period.**
  - Antecedent mm. 1–4: the repeated-note pickup A4 A4 → D5 (m. 1: D5 C♯5 D5 E5 F♯5) over broken-chord left-hand figuration.
  - Consequent from m. 5 (`%6`) modulates. m. 6 (`%7`) has G♯5 in the melody and G♯3 in the bass (E3 B3 G♯3 …): V of A.
  - m. 8 (`%9`) closes `<C♯4 A4>` over `<A2 E3 A3>`: **V:PAC** (in A).
- **Contrasting middle, mm. 9–12.**
  - m. 9 (`%11`) is the Fonte: two half-bar units one step apart.
    - Bass B3/D♯4 → E3/E4 with melody A5 B5 G♯5 E5: D7 → T1 on E (ii). The melody's G♯ makes the goal chord major.
    - Bass A3/C♯4 → D3/D4 with melody G5 A5 F♯5 D5: D7 → T1 of D (I).
    - The model descends a step to the sequence, as in [the Fonte definition](../05-formal-schemas/haydn27fonte.md), compressed here into one bar of two half-bar units.
  - m. 10 (`%12`): the descending scale D6 C♯6 B5 A♯5 B5 A5 G5 F♯5 in octaves with the bass. The page links it to the pickup into m. 7.
  - mm. 11–12 (`%13`–`%14`): fragmented thirds `<E5 G5>` `<D5 F♯5>` E5 D5 over the left hand A4 A4 G♯4 / C♯4 D4 C♯4 B3, then `<A3 D4>` → `<A3 C♯4>` under F♯5 → E5. This closes **I:HC**.
- **Recapitulation, from the pickup in m. 13 (`%15`).**
  - The A4 A4 pickup returns, and mm. 14–15 (`%16`–`%17`) restate mm. 1–2 note for note.
  - m. 16 (`%18`) is altered: A5 D6 B5 G5 F♯5 A5 G5 over bass D4/F♯4 → G3/E4 → A3/D4 → A3/C♯4.
  - The final half bar, m. 17 (`%19`), closes `<F♯4 D5>` over `<D3 A3 D4>`: **I:PAC**.
  - The page says the recapitulation "presents only the contrasting phrase", altered to end I:PAC. In the notes, it is a single four-bar phrase that opens like mm. 1–2.
- The repeat signs divide the three functions into two reprises. That's why the page discusses the "rounded binary" label.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/form/k284.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Piano Sonata in D major, K. 284, III: Tema"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key d \major \time 4/4 \partial 2 \tempo "Andante" \clef "treble" a'4-.(\p a-.) \\
\staff "2" \clef "bass" r2 \clef "treble" | %1

\staff "1" d'2( cs8[\< d e fs]\! \\
\staff "2" \stemUp d8([ a' fs a] b,[ fs' d fs)] \\
\staff "2" \stemDown d4 s b s | %2

\staff "1" g''8[ e g e] d[ cs b a)] \\
\staff "2" \stemUp g8([ e' b e] a,[ g' e g)] \\
\staff "2" \stemDown g4 s a s | %3

\staff "1" a''8([ fs a fs] b\>[ g b g] \\
\staff "2" \stemUp d8([ a' fs a] g,[ e' b e)] \\
\staff "2" \stemDown d4 s g, s | %4

\staff "1" fs'4 e)-.\! a,-.(\f a-.) \\
\staff "2" \stemUp d4( cs) r2 \clef "bass" \\
\staff "2" \stemDown a2 s2 | %5

\staff "1" d'2( fs8[ e d cs)] \\
\staff "2" \stemDown fs,8([ d' a d] d,[ b' fs b)] \\
\staff "2" \stemUp fs,4 s d s | %6

\staff "1" b'8([ d b d)] b'->([ a gs fs)] \\
\staff "2" e,8([ b' gs b] gs[ d' b d)] | %7

\staff "1" e'8([ a fs)-. d-.] cs([ e d)-.] <d, b'>-.( \\
\staff "2" <a cs>4(-. <d, b'>-. <e a>-. <e gs>)-. | %8

\staff "1" \partial 2 <d b'>4\> <cs a'>)-.\! \bar ":..:" \\
\staff "2" <a, e' a>2 | %9

\staff "1" \partial 2 a''8(\p[ gs a gs] \\
\staff "2" r2 | %10

\staff "1" a''8[ b gs e)-.] g([ a fs d)-.] \\
\staff "2" <b ds>4(-> <e, e'>)-. <a cs>(-> <d, d'>)-. \clef "treble" | %11

\staff "1" d''8(\f->[ cs b as] b->[ a g fs)] \\
\staff "2" b'8(->[ a g fs] g->[ fs e d)] | %12

\staff "1" <e' g>4(\p\< <d fs> e)-. d-.\! \\
\staff "2" \stemUp a'2~ a4 gs \\
\staff "2" \stemDown cs4( d cs)-. b-. | %13

\staff "1" fs'2(\fp e8) r r4 \\
\staff "2" \stemUp a'2( a8) r r4 \\
\staff "2" \stemDown <a d>2( <a cs>8) s s4 | %14

\staff "1" r2 a'4-.(\f a-.) \\
\staff "2" R1 | %15

\staff "1" d'2( cs8[ d e fs] \\
\staff "2" \stemUp d8([ a' fs a] b,[ fs' d fs)] \\
\staff "2" \stemDown d4 s b s | %16

\staff "1" g''8->[ e g e] d\>[ cs b a)\!] \\
\staff "2" \stemUp g8([ e' b e] a,[ g' e g)] \\
\staff "2" \stemDown g4 s a s | %17

\staff "1" a''8(\f[ d b)-. g-.] fs([ a g)-.] <g, e'>-.( \\
\staff "2" <d fs>4(-. \clef "bass" <g, e'>-. <a d>-. <a cs>)-. | %18

\staff "1" \partial 2 <g' e'>4\> <fs d'>)-.\! \bar ":|." \\
\staff "2" <d, a' d>2 | %19
```
<!-- score:end -->

## Notes

- Fingerings are left out.
- The clef changes in the lower staff are placed at the end of the previous bar, as printed.

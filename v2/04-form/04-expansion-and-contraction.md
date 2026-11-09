---
title: "Expansion and Contraction at the Phrase Level"
slug: "expansion-and-contraction"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/expansion-and-contraction/"
authors: ["John Peterson"]
license: "CC BY-SA 4.0"
modified: "2025-01-13"
---

# Expansion and Contraction at the Phrase Level

> **Key Takeaways**
>
> - Expansions make a phrase last longer than expected. They can be internal (between the beginning and ending of the phrase) or external (before the beginning or after the end).
> 	- Internal expansion techniques include repetition, stretching, one-more-time technique, and alternative path.
> 	- External expansions fall into two categories:
> 		- Prefixes occur before the beginning, such as an introduction.
> 		- Suffixes occur after the cadence, such as post-cadential extensions, codettas, and codas.
> - Contractions make a phrase shorter than expected.

 

[Chapter Playlist](https://open.spotify.com/playlist/6XzDtaE6Qtto0mvrKJvJT6?si=abb6c65eec4a449b)

The terms expansion and contraction refer to ways composers play with the expected length of a phrase.

What does “expected length” mean?

- When a phrase invokes one of the archetypes without following it exactly, we can often identify how long a closer representation of that archetype would have been.
- Sometimes the cadential motion of the phrase allows us to anticipate where a cadence might occur, but the phrase evades the expected cadence.
- Sometimes a piece states two versions of a phrase—one unexpanded and the other expanded—giving us a model to which we can compare the expanded version.

Expansion refers to the process of making a phrase longer than we expect. This lengthening might occur within the phrase (“internal expansion“) or outside of the phrase (“external expansion“). Contraction refers to the process of making a phrase shorter than we expect, and it always occurs within a phrase.

In this chapter, we offer an overview of several techniques for phrase expansion and contraction. This isn’t an exhaustive list, but it covers several of the more common techniques. The terminology concerning expansion and contraction techniques can quickly become overwhelming. What’s most important is to be able to recognize when a phrase is longer or shorter than expected and to be able to describe what’s creating the difference in length.

## Internal Expansions

The four techniques we discuss below—repetition, stretching, one-more-time, and alternative path—all occur *within* a phrase: after the phrase’s beginning, but before its cadence. Often, composers use these techniques in combination; in fact, it’s relatively rare to find a phrase that’s expanded using only one technique.

### Repetition

![Example 1 . Internal expansion via exact repetition in Robert Sheldon’s Bright Lights! ( 0:49–1:03 ).](../media/2019/07/Example_001_Repetition_Sheldon_Bright_Lights.png)*Example 1. Internal expansion via exact repetition in Robert Sheldon’s *Bright Lights!* ([0:49–1:03](https://youtu.be/rQCGWof1_us?t=48)).*

<!-- lilylet-begin: media/2019/07/Example_001_Repetition_Sheldon_Bright_Lights.png -->
Lilylet transcription of the example above ([Example_001_Repetition_Sheldon_Bright_Lights.lyl](../lilylet/images/2019/07/Example_001_Repetition_Sheldon_Bright_Lights.lyl)):

```lyl.play
[title "Internal expansion via exact repetition (Bright Lights!)"]
[composer "Robert Sheldon"]

\numericTimeSignature \key ef \major \time 4/4 \clef "treble" bf'4->(^\markup "b.i."^\markup "antecedent" ef) r8 bf-. r f'-. | %1

r8 bf'-. r g->~( g[ af]) bf4 | %2

ef4->^\markup "c.i." g8-.[ f->~] f[ ef16( f] g[ af bf8)] | %3

c'4-> ef8-.[ d->~] d[^\markup "HC" f16(^\markup "consequent" ef] d[ c bf af)] | %4

bf'4->(^\markup "(b.i.)" ef) r8 bf-. r f'-. | %5

r8 bf'-. r g->~( g[ af]) bf4 | %6

c'4->^\markup "c.i." ef8-.[ d->~] d4 c->_\markup "repeated motive" | %7

ef'8-.[ d->~] d4 c8[( d) ef-. f-.] | %8

g''1->~^\markup "(c.i.)"^\markup "(consequent)" | %9

g''8^\markup "IAC" r r4 r2 \bar "||" | %10
```
<!-- lilylet-end -->
Sometimes when a composer repeats material, the repetition creates extra length.

Example 1 shows an exact repetition of a motive *within a unit* that creates extra length: a four-measure antecedent is followed by an expanded five-measure consequent. The extra length results from a repeated motive within a unit.

![Example 2. Internal expansion via varied repetition in Mozart’s Horn Concerto, K. 447, I, mm. 1–9 ( 0:00–0:18 ).](../media/2021/06/combined-Example_002b_Repetition_Mozart_447-3.png)*Example 2. Internal expansion via varied repetition in Mozart’s Horn Concerto, K. 447, I, mm. 1–9 ([0:00–0:18](https://open.spotify.com/track/29lQckJgUUlqkiGFDIcNfU?si=nJK2FsKrRU-ScM9xR270kg)).*

<!-- lilylet-begin: media/2021/06/combined-Example_002b_Repetition_Mozart_447-3.png -->
Lilylet transcription of the example above ([combined-Example_002b_Repetition_Mozart_447-3.lyl](../lilylet/images/2021/06/combined-Example_002b_Repetition_Mozart_447-3.lyl)):

```lyl.play
[title "Internal expansion via varied repetition (Horn Concerto No. 3, K. 447, I, mm. 1–9)"]
[composer "Wolfgang Amadeus Mozart"]
[staves "cl,bn,hn,<v1-v2-va-vc>"]
[instrument-cl "Clarinetto in B" "Cl."]
[instrument-bn "Fagotto" "Fg."]
[instrument-hn "Corno in Es" "Cor."]
[instrument-v1 "Violino I" "Vl. I"]
[instrument-v2 "Violino II" "Vl. II"]
[instrument-va "Viola" "Va."]
[instrument-vc "Violoncello e Basso" "Vc."]

\key f \major \time 4/4 \partial 4 \clef "treble" r4 \\\
\key ef \major \time 4/4 \partial 4 \clef "bass" r4 \\\
\key c \major \time 4/4 \partial 4 \clef "treble" r4 \\\
\key ef \major \time 4/4 \partial 4 \clef "treble" bf4\p^\markup "b.i."^\markup "compound basic idea" \\\
\key ef \major \time 4/4 \partial 4 \clef "treble" r4 \\\
\key ef \major \time 4/4 \partial 4 \clef "alto" r4 \\\
\key ef \major \time 4/4 \partial 4 \clef "bass" r4 | %0

R1 \\\
R1 \\\
R1 \\\
g'4.( ef8) af([ f ef d)] \\\
r8 bf\p[ bf bf] bf[ bf bf bf] \\\
r8 ef,-.\p[ ef( g)] f([ af g f)] \\\
ef,4\p r bf r | %1

R1 \\\
R1 \\\
R1 \\\
ef4( bf) r8 bf([ ef g)] \\\
r8 bf[ bf bf] bf[ bf bf bf] \\\
r8 g[ g g] g[ g g g] \\\
ef,4 r r ef8 r | %2

R1 \\\
R1 \\\
R1 \\\
bf'2.(^\markup "c.i." bf16[ af g af)] \\\
bf8[ bf d d] ef[ ef f f] \\\
f,8[ f bf bf] bf[ bf bf bf] \\\
d,8 r bf r c r d r | %3

R1 \\\
r8 <ef, ef'>\p[ <ef ef'> <ef ef'>] <ef ef'>4 r \\\
R1 \\\
fs4( g) r8 ef'16\f[ f] g[ af bf g] \\\
d4( ef) r2 \\\
bf8([ ef ef,) ef] ef4 r \\\
ef,4 r r2 | %4

<b' af'>2\f <c g'> \\\
<ef gf>2\f <d f> \\\
c'2 g \\\
c''4.^\markup "model"^\markup "continuation" ef,,8 d4 bf'' \\\
gf''2:16\f f:16 \\\
a'2:16\f bf:16 \\\
ef8\f[ ef ef ef] d[ d d d] | %5

f'8[ bf a gs] a4 g8[ fs] \\
d'4 f e ef \\\
<c ef>2 <b d>4( <bf df> \\\
c2 r \\\
af''4.^\markup "copy" c,,8 b4 g'' \\\
ef'2:16 d4:16 df:16 \\\
c'16[ c af af] g[ g fs fs] g4:16 f16[ f e e] \\\
c8[ c c c] b[ b bf bf] | %6

g''4 f8[ e] f2 \\
d'4 df c2 \\\
<a c>4 <af cf>) <g cf>2 \\\
R1 \\\
f'4.^\markup "(copy)" af,,8 g4 ef'' \\\
c'4:16 cf:16 bf2:16 \\\
f4:16 ef16[ ef d d] ef4:16 g:16 \\\
a8[ a af af] g[ g g g] | %7

<bf' e>8 r <g' bf>4. <g c>8[ <f a> <f a>] \\\
<f, af>8 r <bf f'>4. <bf f'>8[ <g ef'> <g ef'>] \\\
r8 g'[ g g] g[ g e c] \\\
d'8^\markup "cadential" r <bf af'>4. <bf af'>8[ <bf g'> <bf g'>] \\\
bf'8 r <bf f'>4. <bf f'>8[ ef ef] \\\
af'4 r8 bf,16[ c] d[ bf c d] ef[ f g af] \\\
f,4 r8 bf,16[ c] d[ bf c d] ef[ f g af] | %8

<e' g>4 c r2 \\\
<bf d>4 bf, r2 \\\
g'4 g, r2 \\\
<bf' f'>4^\markup "HC" <bf, d bf'> r2 \\\
d'4 <bf, f' d'> r2 \\\
d'4 d, r2 \\\
bf4 bf, r2 | %9
```
<!-- lilylet-end -->
Example 2 shows a varied repetition in which *a whole unit* is repeated to add extra length: a four-measure compound basic idea (c.b.i.) is followed by a five-measure continuation. The continuation begins with a sequence that expands it from the expected four measures to five.

Not all repetitions create expansion! Be careful to differentiate expansion-creating repetitions, which are unexpected, from more predictable repetitions, such as when the basic idea is repeated in a presentation.

### Stretching

![Example 3. Internal expansion via stretching in Schubert’s Piano Sonata D. 459, I, mm. 1–9 ( 0:00–0:17 ).](../media/2019/07/Example_003a_Stretching_Schubert_459.png)*Example 3. Internal expansion via stretching in Schubert’s Piano Sonata D. 459, I, mm. 1–9 ([0:00–0:17](https://open.spotify.com/track/2w7acEUx1nzuh5ADgTvikr?si=7vpt2nHNQDGd8r-tqSj1kQ)).*

<!-- lilylet-begin: media/2019/07/Example_003a_Stretching_Schubert_459.png -->
Lilylet transcription of the example above ([Example_003a_Stretching_Schubert_459.lyl](../lilylet/images/2019/07/Example_003a_Stretching_Schubert_459.lyl)):

```lyl.play
[title "Internal expansion via stretching (Piano Sonata D. 459, I, mm. 1–9)"]
[composer "Franz Schubert"]
[staves "{-}"]

\staff "1" \key e \major \time 4/4 \tempo "Allegro moderato" \clef "treble" e4.(\p\<^\markup "b.i."^\markup "presentation" fs16[ e] ds4 e)\! \\
\staff "2" \key e \major \time 4/4 \clef "bass" b1 \\
\staff "2" <e, gs>2( <fs a>4 <e gs>) | %1

\staff "1" fs4~\> fs16[(\! e ds cs)] b8([ b') b-. b-.] \\
\staff "2" b2. r4 \\
\staff "2" <b, fs' a>2. s4 | %2

\staff "1" b'1^\markup "b.i." \\
\staff "1" fs4.( gs16\<[ fs] e4 fss)\! \\
\staff "2" b1 \\
\staff "2" a2( gs4 ds) | %3

\staff "1" b'4~ b16[( a gs fs)] e8([ e') e-. e-.] \\
\staff "1" gs'4~ gs4 s2 \\
\staff "2" b4..(-> a16 gs4-.) r4 \\
\staff "2" e,2. s4 | %4

\staff "1" e'4->(^\markup "f."^\markup "continuation" ds16[ cs b as)] g'4->( as,8) r \\
\staff "2" cs4( ds e fs8[ g]) \clef "treble" \\
\staff "2" fs,2.-> s4 | %5

\staff "1" a''4->(^\markup "f."^\markup "(continuation)" gs16[ fs e ds)] cs'4( b16[ a gs fs)] \\
\staff "2" fs4(-> gs a ds,) \\
\staff "2" <b ds>2. <a b>4 | %6

\staff "1" \tuplet 3/2 { fss'8([^\markup "cad." gs b)] } \tuplet 3/2 { ds,8([ e gs)] } \tuplet 3/2 { as,8([ b e)] } \tuplet 3/2 { fss,8([ gs b)] } \\
\staff "2" <gs b e>4_\markup "(stretching - - -" r r2 \clef "bass"
\addlyrics { I6 } | %7

\staff "1" e2.\< fs8.([ gs16]) \\
\staff "1" s2. ds4 \\
\staff "2" r4 <g as>( <gs b> a) \\
\staff "2" r4 c,( b2)
\addlyrics { Ger6 V8–7 _ }
\addlyrics { _ 6–5 _ }
\addlyrics { _ 4–3 _ } | %8

\staff "1" <e e'>2\mf^\markup "PAC" s2 \bar "||" \\
\staff "2" <e, gs>2_\markup "- - -)" s2 \bar "||"
\addlyrics { I } | %9
```
<!-- lilylet-end -->
Sometimes composers will lengthen a harmony or melody by increasing its duration so that it lasts longer than expected. When that happens, we say that the unit that contains the harmony or melody has been stretched. In Example 3, a four-measure presentation is followed by a five-measure continuation. The continuation’s cadential idea is stretched when a $\mathrm{I}^6$ chord and the cadential dominant (embellished by a $\mathrm{Ger}^6$ and a cadential $^6_4$) each last for a full measure as opposed to both occurring within a single measure.

 

### One-More-Time Technique (o.m.t.)

Coined by Janet Schmalfeldt (1989), the one-more-time technique involves three steps: 1) the music tries to cadence, 2) the attempted cadence is evaded, and 3) the music retries the cadence. The re-tried cadence often uses the same material, such that it feels like the music is “backing up,” but it may also retry the cadence with different cadential material.

![Example 4. Internal expansion via the one-more-time technique in Mendelssohn, Op. 8, no. 5, “Pilgerspruch” ( 0:00–0:37 ).](../media/2019/07/Slide5-6.png)*Example 4. Internal expansion via the one-more-time technique in Mendelssohn, Op. 8, no. 5, “Pilgerspruch” ([0:00–0:37](https://open.spotify.com/track/31CjWqgQhH2wMHumjyAcnF?si=PelVogCOSdez3BER7aMk0g)).*

<!-- lilylet-begin: media/2019/07/Slide5-6.png -->
Lilylet transcription of the example above ([Slide5-6.lyl](../lilylet/images/2019/07/Slide5-6.lyl)):

```lyl.play
[title "Pilgerspruch, Op. 8 No. 5: internal expansion via the one-more-time technique"]
[composer "Felix Mendelssohn"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Voice"]
[instrument-pr-pl "Piano"]

\staff "1" \key f \major \time 4/4 \clef "treble" R1 \\\\
\staff "1" \clef "treble" \stemUp <c a'>2.(\p <bf g'>4) \\
\staff "2" \clef "bass" \stemUp f,,4( a c e) \\
\staff "2" \stemDown f,,1 \bar ".|:" | %1

\staff "1" r2 r4 c'4^\markup "b.i."
\addlyrics { Laß }
\addlyrics { Was } \\\\
\staff "1" \stemUp <bf g'>2( <a f'>4) r4 \\
\staff "2" \stemUp e,2( f4) r4 \\
\staff "2" \stemDown f,,2. s4 | %2

\staff "1" c'4. bf8 a4 g
\addlyrics { dich nur nichts nicht }
\addlyrics { willst du heu -- te } \\\\
\staff "1" <c a' c>8 r <d g bf> r <c f a> r <bf e g> r \\
\staff "2" f,8 r bf, r c r c r | %3

\staff "1" f2 f4 d'^\markup "c.i."
\addlyrics { dau -- ern, mit }
\addlyrics { sor -- gen auf } \\\\
\staff "1" <e g>2( <d f>4 <d f>) \\
\staff "2" \stemUp bf2 a4 <f a> \\
\staff "2" \stemDown d,2. s4 | %4

\staff "1" c'2 b4 b
\addlyrics { Trau -- ern sei }
\addlyrics { mor -- gen? Der } \\\\
\staff "1" <e g>2. <g, b d f>8 r \\
\staff "2" \stemDown g2. r4 \\
\staff "2" \stemUp s2. g,8 s | %5

\staff "1" c'4^\markup "HC" g r e^\markup "f."
\addlyrics { stil -- le! Wie }
\addlyrics { Ei -- ne steht } \\\\
\staff "1" <g c e>8 r <g c e> r r4 <g c e>4( \\
\staff "2" <c,, c'>8 r <c c'> r r4 bf'4 | %6

\staff "1" f4. g8 a4 a^\markup "f."
\addlyrics { Gott es fügt, so }
\addlyrics { al -- lem für, der } \\\\
\staff "1" <a d f>4.) <bf e g>8 <c f a>4 <c ef a> \\
\staff "2" a,4.( g8 f4) <f f'> | %7

\staff "1" bf'4. c8 d4 d8([^\markup "cad." c)]
\addlyrics { sei ver -- gnügt, so _ }
\addlyrics { giebt auch dir, der _ } \\\\
\staff "1" <bf ef bf'>4. <ef f c'>8 <d f d'>4 <e g> \\
\staff "2" <g, f'>4. <a f'>8 <bf f'>4 bf' | %8

\staff "1" c'4. bf8 a4 g
\addlyrics { sei ver -- gnügt mein }
\addlyrics { giebt auch dir das } \\\\
\staff "1" <c f>8 r <d f bf> r <c f a> r <bf e g> r \\
\staff "2" a,8 r bf r c r c r | %9

\staff "1" g'4^\markup "cad. (evaded)" f r d'8.([^\markup "o.m.t." c16)]
\addlyrics { Wil -- le, so _ }
\addlyrics { Dei -- ne, der _ } \\\\
\staff "1" \stemUp f2( <e g>2) \\
\staff "1" \stemDown c8 c c c c c c c \\
\staff "2" \stemUp c,8 c c c c c c c \\
\staff "2" \stemDown a,2( bf2) | %10

\staff "1" c'4(\p\< ef\! d\> a)\!
\addlyrics { sei _ _ ver -- }
\addlyrics { giebt _ _ auch } \\\\
\staff "1" <c f a>8 <c f a> r <c f c'> r <d f bf> r <d f a> \\
\staff "2" <f,, c'>4( a' bf <d, fs>) | %11

\staff "1" c'2~ c8([ bf)] a([ g)]
\addlyrics { gnügt _ _ mein _ }
\addlyrics { dir _ _ das _ } \\\\
\staff "1" r8 <d fs> <d fs> <d fs> <d fs> <d g> <c d> bf \\
\staff "2" g2 g,4 a8 bf | %12

\staff "1" f2( a4. g8)
\addlyrics { Wil -- _ _ }
\addlyrics { Dei -- _ _ } \\\\
\staff "1" r8 <f, a c> <f a c> <f a c> <g bf c e> <g bf c e> <g bf c e> <g bf c e> \\
\staff "2" c,2 c, | %13

\staff "1" f4^\markup "PAC" r r2
\addlyrics { le. }
\addlyrics { ne. } \\\\
\staff "1" \stemUp <c f a>4 <c a'>2( <bf g'>4) \\
\staff "2" \stemUp f,,4( a c e) \\
\staff "2" \stemDown f,,1 \bar ":|." | %14
```
<!-- lilylet-end -->
In Example 4, a cadence is proposed in m. 10, but it’s evaded ($\mathrm{cad^6_4 – V^4_2 – I^6}$). A one-more-time repetition of the cadential idea ensues. The one-more-time unit is stretched: notice that it takes two measures (compared to one originally) for the melody to descend C–B♭–A–G, and it takes a full measure (compared to a half measure originally) for the cadential $\mathrm{^6_4}$ to resolve to $\mathrm{V}^7$.

### Alternative Paths

An alternative path occurs when unexpected new material either temporarily or permanently causes a phrase to deviate from its expected trajectory toward a cadence. A temporary deviation is called a detour. Detours return to previous material from within the phrase before the phrase achieves a cadence. A permanent deviation is called a reroute. Reroutes achieve cadences without returning to previous material from within the phrase.

![Example 5. Internal expansion via alternative path (detour) in Mendelssohn, Hebrides Overture, mm. 9–26 ( 0:20–0:58 ).](../media/2019/07/Slide8-10.png)*Example 5. Internal expansion via alternative path (detour) in Mendelssohn, *Hebrides* Overture, mm. 9–26 ([0:20–0:58](https://open.spotify.com/track/268QFsnVawnmGdlRhMum3T?si=2KI7fqQiRUyWKeGMsx0N3g)).*

<!-- lilylet-begin: media/2019/07/Slide8-10.png -->
Lilylet transcription of the example above ([Slide8-10.lyl](../lilylet/images/2019/07/Slide8-10.lyl)):

```lyl.play
[title "Hebrides Overture, mm. 7–26: internal expansion via alternative path (detour)"]
[composer "Felix Mendelssohn"]
[staves "{-}"]

\staff "1" \key d \major \time 4/4 \clef "treble" \stemUp <b' ds>1(\pp \\
\staff "1" \stemDown fs1 \\
\staff "1" s2 \stemDown r8 fs8\p[ b a16 b] \\
\staff "2" \clef "bass" \repeat tremolo 4 { b,,16 b' } \repeat tremolo 4 { b, b' } | %7

\staff "1" \stemUp <b' e>2) <b cs> \\
\staff "1" \stemDown g'8[ fs16 g] e4~ e16\<[ fs e fs]\! g\>[ fs g fs]\! \\
\staff "2" \repeat tremolo 4 { e,,16 b' } \repeat tremolo 4 { e, b' } | %8

\staff "1" r8^\markup "presentation"^\markup "b.i." \stemUp fs'( d![ cs16 d] b4 fs) \\
\staff "1" \stemDown fs1 \\
\staff "2" \stemUp d,16[ cs b cs] d[ b e b] \stemDown d[ e fs b] d[ b fs e] | %9

\staff "1" r8 \stemUp fs'( d![ cs16 d] b4 fs) \\
\staff "1" \stemDown fs1 \\
\staff "2" \stemUp d,16[ cs b cs] d[ b e b] \stemDown d[ e fs b] d[ b fs e] | %10

\staff "1" r8^\markup "b.i." \stemUp a''( fs[ e16 fs] d4 a) \\
\staff "1" \stemDown a'1 \\
\staff "2" \stemUp d,16[ a fs a] d[ a e' a,] \stemDown fs'[ a fs e] d[ a' fs e] \\
\staff "2" \stemDown d,,4\sustainOn s2. | %11

\staff "1" r8 \stemUp a''( fs[ e16 fs] d4 a) \\
\staff "1" \stemDown a'1 \\
\staff "2" \stemUp d,16[ a fs a] d[ a e' a,] \stemDown fs'[ a fs e] d[ e d e] \\
\staff "2" \stemDown d,,4 s2.\sustainOff | %12

\staff "1" r8^\markup "continuation"^\markup "u." \stemUp cs'( fs[ e16 fs] d8[ cs16 d] b8[ d)] \\
\staff "1" \stemDown as'2(\p b) \\
\staff "2" fs,16[ cs' as cs] fs[ cs fs cs] b[ d b d] fs[ d fs d] | %13

\staff "1" r8 \stemUp cs'( fs[ e16 fs] d8[ cs16 d] b8[ b')] \\
\staff "1" \stemDown as'2( b) \\
\staff "2" fs,16[ cs' as cs] fs[ cs fs cs] b[ d b d] fs[ d fs d] | %14

\staff "1" \stemUp \grace as'8 <g' b>2\trill\sf^\markup "cad." \grace { g16[ fs] } <d fs>2(\sf_\markup "dim." \\
\staff "2" e,,16([ b' fs b] g[ b a b)] b,([ b' cs, b'] d,[ b' e,) b'] | %15

\staff "1" \stemDown <d' fs>8)\p^\markup "PAC"[ b( cs fs,)] \stemUp <b, b'>[ d( fs b)] \\
\staff "2" <fs,, d'>8 r <fs as e'> r d'16([ cs b cs] d[ cs d b)] | %16

\staff "1" r8^\markup "repetition of continuation"^\markup "u." \stemUp cs'( fs[ e16 fs] d8[ cs16 d] b8[ d)] \\
\staff "1" \stemDown as'2(\p b) \\
\staff "2" fs,,16\sustainOn([ cs'' as cs] fs[ cs fs cs\sustainOff] b,,\sustainOn[ d' b d] fs[ d fs d)\sustainOff] | %17

\staff "1" r8 \stemUp cs'( fs[ e16 fs] d8[ cs16 d] b8[ b'-.)] \\
\staff "1" \stemDown as'2(b) \\
\staff "2" fs,,16\sustainOn([ cs'' as cs] fs[ cs fs cs\sustainOff] b,,\sustainOn[ d' b d] fs[ d fs d)\sustainOff] | %18

\staff "1" \stemUp b''2(^\markup "cad." g4..) e'16\sf \\
\staff "1" \stemDown g''16\sf[ b, g' b,] g'[ b, g' b,] e[ b e b] e8 r \\
\staff "2" e,,8(_\markup "b: iv"[ fs g a] b[ cs ds e)] | %19

\staff "1" \stemUp e''2( b4) r4 \\
\staff "1" \stemDown g''16\sf[ e g e] g[ e g e] cs[ d cs d] e[ fs e fs] \\
\staff "2" fs,8[ g a b] \clef "treble" e[ d c b] | %20

\staff "1" <g'' e'>16(\pp^\markup "detour"[ cs e cs] as[ cs as cs] <g e'>[ cs e cs] as[ cs as cs)] \\
\staff "2" \stemUp e16([ g e g] e[ g e g] e[ g e g] e[ g e g)] \\
\staff "2" \stemDown as1_\markup "vii°7"\sustainOn | %21

\staff "1" <g'' e'>16([ cs <g e'> cs] <e, as>[ cs' <e, as> cs'] <cs, e>[ g' <cs, e> g'] as,[ cs as cs)] \\
\staff "2" \stemUp s2. e'16[ g e g] \\
\staff "2" \stemDown <as cs>2. s4\sustainOff \clef "bass" | %22

\staff "1" \stemUp <b' fs'>8^\markup "cad." r fs''4~(\sf fs8 <fs, b d>[ <fs b d> <fs b d>] \\
\staff "1" \stemDown s1 \\
\staff "2" d,,16\sustainOn[ fs d fs] fs[ b d b] d,[ fs d fs] fs[ b d b] | %23

\staff "1" \stemUp <b'' d>8[ cs b fs] e[ d cs b] \\
\staff "1" \stemDown s2 fs2 \\
\staff "2" fs,,16[ b fs b] fs[ b fs b] d,[ b' d, b'] d,[ b' d, b'] | %24

\staff "1" \stemUp a''8[ g e cs]) <fs, b d>8 r <e as cs> r \\
\staff "1" \stemDown cs2 s2 \\
\staff "2" <e,, g>16\p[ b' <e, g> b'] <e, g>[ b' <e, g> b'] fs8 r fs r | %25

\staff "1" \partial 4 r4^\markup "PAC" \\
\staff "1" \partial 4 s4 \\
\staff "2" \partial 4 b,4 | %26
```
<!-- lilylet-end -->
Example 5 shows a detour: the sentence’s continuation is repeated. We realize the repetition is getting “off track” when the motive in the cadential idea (m. 19) is repeated (m. 20), which did not happen in the analogous place before (m. 15). A highly contrasting two-measure passage emerges (mm. 21–22) that leads to a return of material (mm. 23–26) similar to the cadential idea in mm. 19–20, now stretched.

![Example 6. Internal expansion via alternative path (reroute) in Maria Theresia von Paradis, Sicilienne, mm. 1–10 ( 0:00–0:42 ).](../media/2019/07/Slide10-11.png)*Example 6. Internal expansion via alternative path (reroute) in Maria Theresia von Paradis, Sicilienne, mm. 1–10 ([*0:00–0:42*](https://open.spotify.com/track/55dSAv52AK0DnVj5ZUIDBh?si=1G2p8eSASG-y2QyHp2xhRw)).*

<!-- lilylet-begin: media/2019/07/Slide10-11.png -->
Lilylet transcription of the example above ([Slide10-11.lyl](../lilylet/images/2019/07/Slide10-11.lyl)):

```lyl.play
[title "Sicilienne, mm. 1–10: internal expansion via alternative path (reroute)"]
[composer "Maria Theresia von Paradis"]
[staves "{s1-s2}-s3"]

\staff "1" \key ef \major \time 6/8 \partial 8 \tempo "Andantino" \clef "treble" g'8\p^\markup "b.i."^\markup "antecedent" \\
\staff "2" \partial 8 \clef "treble" r8 \\
\staff "3" \partial 8 \clef "bass" r8 \bar ".|:" | %0

\staff "1" bf'4 bf8 cf8.([ bf16 af8)] \\
\staff "2" <bf ef g>4 <bf ef g>8 <cf ef af>4 <cf ef af>8 \\
\staff "3" ef,,4 ef'8 ef4 ef8 | %1

\staff "1" bf'4 g8^\markup "c.i.¹" af8.(\prall[ g16 f8)] \\
\staff "2" <bf ef g>4 <bf g'>8 <cf ef f>4 <cf ef af>8 \\
\staff "3" ef,,4 ef'8 ef4 ef8 | %2

\staff "1" g'8.[ bf,16 ef g] f4.\trill \\
\staff "2" <bf ef g>4 <bf ef g>8 <af ef' f>4 <af d f>8 \\
\staff "3" ef,,4 ef'8 bf4 bf8 | %3

\staff "1" \grace { ef16[( f] } g4.)^\markup "IAC"~ g4 bf8\mf^\markup "b.i."^\markup "consequent" \\
\staff "2" <g bf ef>4 <g bf ef>8 <g bf ef>4 <bf ef g>8 \\
\staff "3" ef,,4 ef'8 ef4 ef8 | %4

\staff "1" ef'4 bf8 cf8.([ bf16 af8)] \\
\staff "2" <bf ef bf'>4 <bf ef bf'>8 <cf ef af>4 <cf ef af>8 \\
\staff "3" g4 g8 af4 af8 | %5

\staff "1" bf'4 ef16(\<^\markup "c.i.²"^\markup "reroute"[ f)] g4 g8\! \\
\staff "2" <ef bf'>4 <ef bf'>8 <d g d'>4 <d g d'>8 \\
\staff "3" g4 g8 bf4 bf8 | %6

\staff "1" g''4\f\> d8 ef8.([ d16 c8)]\! \\
\staff "2" <f g d'>4 <f g d'>8 <ef g c>4 <ef g c>8 \\
\staff "3" b4 b8 c4 c8 | %7

\staff "1" g''4\p d8 ef4 c8^\markup "cad." \\
\staff "2" <f g d'>4 <f g d'>8 <ef g c>4 <ef g c>8 \\
\staff "3" b4 b8 c4 c8 | %8

\staff "1" df'8.([ c16 bf af] g4) b,8 \\
\staff "2" <f af df>4 <f af df>8 <f g b>4 <b, f' g>8 \\
\staff "3" f,4 f8 g4 g,8 | %9

\staff "1" c'4.^\markup "PAC"^\markup "1."~ c4 g8 \\
\staff "2" <c ef g>4 <c ef g>8 <c ef g>4 r8 \\
\staff "3" c,4 c8 c4 r8 \bar ":|." | %10
```
<!-- lilylet-end -->
Example 6 shows a reroute: a four-measure antecedent is followed by a six-measure expanded consequent. The consequent begins with the same basic idea as the antecedent, but its contrasting idea moves in a markedly different direction, one that doesn’t lead to a cadence. A new cadential idea is needed to bring the phrase to a perfect authentic cadence (PAC). 

Although one-more-time technique and alternative paths both involve cadences, they are very different techniques, as explained below:

| **One-more-time technique** | **Alternative path** |
| --- | --- |
| - Passage has tried and failed to achieve a cadence - Feels as though the phrase backs up to try the failed cadence again | - Passage has not yet tried to cadence - Feels as though the phrase has gone off course |

## External Expansions

When composers add length outside of a phrase, they may add measures before the beginning (prefixes) or after the cadence (suffixes). In diagrams, we indicate external expansions using dashed arcs or brackets.

### The Prefix

![Example 7. External expansion via small prefix in Cécile Chaminade, “L’amour captif,” mm. 1–10 ( 0:00–0:13 ).](../media/2019/07/Slide12-13.png)*Example 7. External expansion via small prefix in Cécile Chaminade, “L’amour captif,” mm. 1–10 ([0:00–0:13](https://open.spotify.com/track/243TaFRW3lZHhNNMIJqacw?si=Hnd3vfj3SFCniqoz2iiiPw)).*

<!-- lilylet-begin: media/2019/07/Slide12-13.png -->
Lilylet transcription of the example above ([Slide12-13.lyl](../lilylet/images/2019/07/Slide12-13.lyl)):

```lyl.play
[title "L'amour captif, mm. 1–11 (external expansion via small prefix)"]
[composer "Cécile Chaminade"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Voice"]
[instrument-pr-pl "Piano"]

\staff "1" \key ef \major \time 3/8 \clef "treble" \partial 8 \tempo "Allegretto." ^\markup "prefix" r8 \\\\
\staff "1" \key ef \major \time 3/8 \clef "treble" \partial 8 r8 \\
\staff "2" \key ef \major \time 3/8 \clef "bass" \partial 8 a16(\p[ bf)] | %1

\staff "1" R4. \\\\
\staff "1" <d af' bf>4 r8 \\
\staff "2" r4 b16([ c)] | %2

\staff "1" r4 bf'8^\markup "dolce"^\markup "b.i."^\markup "c.b.i."
\addlyrics { Sweet -- }
\addlyrics { Mi -- } \\\\
\staff "1" <ef af bf>8 r <f af bf> \\
\staff "2" r8 cs16([ d)] r8 | %3

\staff "1" ef'4.
\addlyrics { heart, }
\addlyrics { gnon -- } \\\\
\staff "1" r4 <ef g bf c>8 \\
\staff "2" <ef,, ef'>8 bf''16[ c] r8 | %4

\staff "1" d'16 f d4
\addlyrics { I have bound }
\addlyrics { "ne, à" l'a -- mour } \\\\
\staff "1" r4 <d af' bf d>8 \\
\staff "2" <f,, f'>8 bf'16[ c] r8 | %5

\staff "1" c'16^\markup "c.i."^\markup "(c.b.i.)" ef d8 c
\addlyrics { way -- ward Love's light }
\addlyrics { j'ai li -- é les } \\\\
\staff "1" r8 <d' bf' d>[ <c af' c>] \\
\staff "2" r8 <c af'>[ <d af'>] \\
\staff "2" bf,4. | %6

\staff "1" g'16([ bf)] bf4
\addlyrics { pin -- _ ions, }
\addlyrics { ai -- _ les; } \\\\
\staff "1" <g' ef' g>8([ <bf g' bf> <bf' g' bf>)] \\
\staff "2" <ef,, ef'>8( <bf'' g'>4) | %7

\staff "1" ^\markup "u." ^\markup "cad." r16 bf' bf c bf c
\addlyrics { He nev -- er -- more can }
\addlyrics { Il ne pour -- ra plus } \\\\
\staff "1" r8 <df g bf>16([ c' <df, g bf> c')] \\
\staff "2" r8 bf16([ c bf c)] \\
\staff "2" <e,, e'>4. | %8

\staff "1" bf'8([ af)] af
\addlyrics { wan -- _ ton }
\addlyrics { pren -- _ dre } \\\\
\staff "1" bf'8([ af)] af \\
\staff "1" <c f>4. \\
\staff "2" bf8([ af)] af \\
\staff "2" f,4. | %9

\staff "1" g'4(^\markup "u." \tuplet 3/2 { f16[ g f] }
\addlyrics { oth -- er -- _ _ }
\addlyrics { son es -- _ _ } \\\\
\staff "1" g'4 \tuplet 3/2 { f16[ g f] } \\
\staff "1" r8 <af d>4 \\
\staff "2" g4 \tuplet 3/2 { f16[ g f] } \\
\staff "2" r8 bf,4 | %10

\staff "1" \partial 4 ef4)
\addlyrics { where, }
\addlyrics { sor } \\\\
\staff "1" \partial 4 ef8[ \staff "2" <g, bf>] \\
\staff "2" \partial 4 ef,8[ ef,] | %11
```
<!-- lilylet-end -->
A prefix occurs before the beginning of a phrase, usually taking the form of an introduction. A prefix can be small, but it may also be large, such as when a composer begins a symphony with a slow introduction. Example 7 shows a small prefix. As is very common with songs, this mélodie opens with an instrumental introduction before the singer enters—that is, before the phrase beginningg. Note also that this phrase includes a variant on the typical core bass cadential pattern. Instead of *mi-fa-sol-do* ($\hat{3}-\hat{4}-\hat{5}-\hat{1}$), Chaminade writes *di-re-sol-do* ($\uparrow\hat{1}-\hat{2}-\hat{5}-\hat{1}$) (mm. 8–11).

### The Suffix

A suffix occurs after a phrase has cadenced. The terms in Example 8 are flexibly used to describe different types of suffix. While Example 8 provides guidelines for their use, what one person calls a post-cadential extension, another might choose to call a codetta. It’s more important to recognize that a given suffix adds length outside the bounds of a phrase than to worry about which term is most appropriate.

| Term | Avg. Length | Characteristics | Typical Location | Example |
| --- | --- | --- | --- | --- |
| Post-cadential extension (p.c.e.) | Short  (1-2 mm.) | - Insubstantial: little or no melodic material - Often repeats the chords of the cadence (e.g. V–I) or the final tonic - Atypical to state an entire phrase | After the end of a phrase within a section | Example 9 |
| Codetta | Medium  (4-8 mm.) | - Often features short motivic material that gets repeated - May cycle through an entire cadential progression - May or may not state an entire phrase | After the end of a section within a piece or movement | Example 10 |
| Coda | Long  (8+ mm.) | - Substantial: may feature a new theme or reprise of a previous theme - Often contains multiple phrases | After the end of a piece or movement | Example 11 |

Example 8. Characteristics that differentiate common suffix types.

Example 9 shows the end of a lengthy period. After the perfect authentic cadence that ends the consequent, a two-measure post-cadential extension prolongs the final tonic via arpeggiation.[^1]

In Example 10, a lengthy phrase ends the exposition of the piano sonata with a PAC in A♭ major at m. 41. The cadence is followed by a codetta: notice that it features a repeated two-measure unit harmonized with the cadential bass line *fi-sol-do* ($\uparrow\hat{4}-\hat{5}-\hat{1}$).

Example 11 features the longest kind of suffix: a coda. After the introduction returns (4:52) and then is varied (5:03), an elided PAC ends the piece proper (5:32). The coda (also at 5:32) presents an energetic celebration of the piece’s closure, featuring a fast version of a previously-heard theme with several phrases.

[![Notation](../media/2019/07/Example_010_Chaminade_Presents-150x150.png)](../media/2019/07/Example_010_Chaminade_Presents-e1623956324859.png)

<!-- lilylet-begin: media/2019/07/Example_010_Chaminade_Presents-150x150.png -->
Lilylet transcription of the example above ([Example_010_Chaminade_Presents-150x150.lyl](../lilylet/images/2019/07/Example_010_Chaminade_Presents-150x150.lyl)):

```lyl.play
[title "Les présents (external expansion via suffix: post-cadential extension)"]
[composer "Cécile Chaminade"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Voice"]
[instrument-pr-pl "Piano"]

\staff "1" \key ef \major \time 3/4 \clef "treble" ef'2(^\markup "(ant.)" g,4
\addlyrics { tâche, a -- } \\\\
\staff "1" \key ef \major \time 3/4 \clef "treble" <c ef g c ef g c>2. \\
\staff "2" \key ef \major \time 3/4 \clef "bass" r4 bf2 \\
\staff "2" s4 <bf,, bf'>2 | %1

\staff "1" bf'4 af8 g bf af
\addlyrics { mi si doux à ché -- } \\\\
\staff "1" <cs e g cs e g cs>2. \\
\staff "2" r4 bf2 \\
\staff "2" s4 <bf,, bf'>2 | %2

\staff "1" g'2^\markup "HC" f8) r8
\addlyrics { rir, __ _ } \\\\
\staff "1" <d f af d af' bf d>2. \\
\staff "2" r4 bf2 \\
\staff "2" s4 <bf,, bf'>2 | %3

\staff "1" ef8(^\markup "dolce"^\markup "b.i."^\markup "cons."\pp ef f4 g)
\addlyrics { Qu'el -- le soit bien } \\\\
\staff "1" <ef g>4(_\markup "dolce"\pp <ef af> <ef bf'> \\
\staff "2" <bf, ef>4( <bf f'> <bf g'> | %4

\staff "1" af'4^\markup "b.i."^\markup "(cons.)" g f8(^\markup "c.i."[ ef)]
\addlyrics { lon -- gue, ta __ _ } \\\\
\staff "1" <ef c'>4 <ef bf'>) af8([ g)] \\
\staff "1" s2 ef4 \\
\staff "2" s2 f,8([ ef)] \\
\staff "2" <bf, af'>4 <bf g'>) bf | %5

\staff "1" g'2 f4
\addlyrics { vi -- _ } \\\\
\staff "1" r4 <bf' bf'>2 \\
\staff "1" <ef bf'>2 af4 \\
\staff "2" <bf, g'>2 bf4 \\
\staff "2" r4 bf,,2 | %6

\staff "1" ef4~^\markup "PAC" ef8 r8 r4
\addlyrics { e! __ _ } \\\\
\staff "1" <g ef' g>4 <c' g' c>\<^\markup "suffix (p.c.e.)" <d g bf d>\! \\
\staff "2" r4 \clef "treble" <c ef g>4 <d ef g> \\
\staff "2" <ef,,, ef'>2. | %7

\staff "1" R2. \\\\
\staff "1" \ottava #1 <ef' g ef'>4_\markup "cresc." <g ef' g> <bf g' bf> \\
\staff "2" <ef g bf>4 <bf ef g> <g bf ef> \clef "bass" | %8

\staff "1" R2. \bar "|." \\\\
\staff "1" <ef' g bf ef>2.\f \ottava #0 \bar "|." \\
\staff "2" <bf, ef g>2. \bar "|." \\
\staff "2" <ef,,, ef'>2. \bar "|." | %9
```
<!-- lilylet-end -->
Example 9. External expansion via suffix (post-cadential extension) in Cécile Chaminade, “Les presents” ([2:31–2:57](https://open.spotify.com/track/1hyX06OrRGiO8AUJWIHrFH?si=efK7Hbc7TfK8kVt8NdvU2w)).

![Notation](../media/2019/07/Example_011_codetta_Beethoven_2_1-e1623956414121.png)

<!-- lilylet-begin: media/2019/07/Example_011_codetta_Beethoven_2_1-e1623956414121.png -->
Lilylet transcription of the example above ([Example_011_codetta_Beethoven_2_1-e1623956414121.lyl](../lilylet/images/2019/07/Example_011_codetta_Beethoven_2_1-e1623956414121.lyl)):

```lyl.play
[title "Piano Sonata in F minor, Op. 2 No. 1, I, mm. 36–48 (codetta)"]
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key af \major \time 4/4 \omit Score.TimeSignature \clef "treble" ^\markup "cad." ^\markup "phrase" d8(-2[ ef-3 f-4 ef] d[ ef f ef)] \\
\staff "2" \key af \major \time 4/4 \clef "bass" df4(-2 bf-3 g-1 df)-3 | %36

\staff "1" r8 af''(-1\f^\markup "cad."[ f'-5 ef-3] df[ c-1 bf-4 af] \\
\staff "2" c,,4-5 ef2-3 af4 | %37

\staff "1" g''8[ f ef-3 df] c[ bf-4 af g] \\
\staff "2" df,4-4 f2-2\sf bf4 | %38

\staff "1" f8\p[ ef-3 df c] \staff "2" bf-4[ af g f] \\
\staff "2" ef,4-4 af2-2\sf c4-1 | %39

\staff "2" ef,8-2[ f-1 g af] bf-4[ c-1 df-5 bf-3] \\
\staff "2" df,4-1 bf-2 g-3 ef-5 | %40

\staff "2" af4)-2^\markup "PAC" \staff "1" r4 \grace d8( cf'4.-4^\markup "u."^\markup "suffix (codetta)" bf8)_\markup "con espress." \\
\staff "2" <af, af'>4-4 af'-.-1 r <d, f af cf>-. | %41

\staff "1" af'2 g4.( ef'8)-4 \\
\staff "2" r4 <ef, a c>-. r <ef bf' df>-. | %42

\staff "1" ef'4(-3\sf af,)-1 \grace d,8( cf'4.^\markup "u." bf8) \\
\staff "2" r4 <af c>-. r <d, f af cf>-. | %43

\staff "1" af'2 g4.( ef'8) \\
\staff "2" r4 <ef, a c>-. r <ef bf' df>-. | %44

\staff "1" ef''4(-3\sf af,)-1 \grace d,8( cf'4.-4^\markup "u." bf8) \\
\staff "2" r4 <af c>-. \clef "treble" r <d f af cf>-. | %45

\staff "1" af''2 g4.( ef'8)-4 \\
\staff "2" r4 <ef a c>-. r <ef bf' df>-. \clef "bass" | %46

\staff "1" <df ef g df' g ef'>1\ff\> \\
\staff "2" <af bf>1 | %47

\staff "1" \partial 2. <c ef af c ef af>4-4\!\p r r \bar ":|." \\
\staff "2" \partial 2. af4 r r \bar ":|." | %48
```
<!-- lilylet-end -->
Example 10. External expansion via suffix (codetta) in Beethoven, Piano Sonata Op. 2, no. 1, mm. 36–48 ([0:45–0:58](https://open.spotify.com/track/2E0Q7KZ2b6wTMsuDA8lRhz?si=0oMmAbdxTYCWfHp2HDeHqw)).

| Timestamp | Event |
| --- | --- |
| 4:52 | Introduction returns in varied form |
| 5:03 | A second variation on the introduction begins |
| 5:32 | Coda begins; its material is drawn from the second theme (from 2:00) |

Example 11. External expansion via suffix (coda) in [Shostakovich, *Festive Overture*](https://open.spotify.com/track/6Mz6UuaghVRC2VEF5Td7SF?si=1XChkFQMRY2WWyTKjriFHA). 

 

## Contraction

[![Example 12. Contraction in Stéphan Elmas, Piano Concerto No. 1, III, mm. 15–21 ( 32:21–32:28 ).](../media/2019/07/Example_013_Contraction_Elmas_PC_1_III-150x150.png)](../media/2019/07/Example_013_Contraction_Elmas_PC_1_III.png)*Example 12. Contraction in Stéphan Elmas, Piano Concerto No. 1, III, mm. 15–21 ([32:21–32:28](https://www.youtube.com/watch?v=O-iFgieitho&t=231s)).*

Contractions occur less frequently than expansions. A contraction occurs when a phrase is shorter than we might expect it to be.

In Example 12, a four-measure compound basic idea is followed by a three-measure continuation. Given the length of the compound basic idea, we might have expected the continuation to be four measures long to create proportional balance. As you listen, notice how the cadence feels abrupt, a feeling that usually accompanies contraction.

 

> Further Reading

- Jarvis, Brian, and John Peterson. 2019. “Alternative Paths, Phrase Expansion, and the Music of Felix Mendelssohn.” *Music Theory Spectrum* 41, no. 2 (Fall): 187–217.
- Schmalfeldt, Janet. 1992. “Cadential Processes: The Evaded Cadence and the ‘One More Time’ Technique.” *Journal of Musicological Research* 12 (1–2): 1–52.

> Assignments

1. Analyzing expansion techniques ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Expansion-and-Contraction-at-the-Phrase-Level-–-Analyzing-Expansion-Techniques.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Expansion-and-Contraction-at-the-Phrase-Level-–-Analyzing-Expansion-Techniques.docx)). Asks students to name, segment, and label the form of excerpts and identify the location of any expansion technique(s). Optional harmonic analysis included. [Worksheet playlist](https://open.spotify.com/playlist/6b7oUNlbuo8RVxIgwikZba)
2. Analyzing multiple expansion techniques ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Expansion-and-Contraction-at-the-Phrase-Level-–-Analyzing-Multiple-Phrase-Expansion-Techniques.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Expansion-and-Contraction-at-the-Phrase-Level-–-Analyzing-Multiple-Phrase-Expansion-Techniques.docx)). More complicated examples than in worksheet 1. Each excerpt is significantly expanded. [Worksheet playlist](https://open.spotify.com/playlist/5ZnYTLqxS8CMMEyfSnWHpx)
3. Recomposing to remove expansions ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Expansion-and-Contraction-at-the-Phrase-Level-–-Recomposing-to-Remove-Expansions.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Expansion-and-Contraction-at-the-Phrase-Level-–-Recomposing-to-Remove-Expansions.docx)). Asks students to recompose excerpts from worksheet 1 to remove the expanded portion of the archetypal form. [Worksheet playlist](https://open.spotify.com/playlist/3y0bMIkzRtZ5ccYRRi70xH)

### Media Attributions

- Example\_001\_Repetition\_Sheldon\_Bright\_Lights © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- combined-Example\_002b\_Repetition\_Mozart\_447-3 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_003a\_Stretching\_Schubert\_459 © EXAMPLE 2. Internal expansion via varied repetition in Mozart's Horn Concerto, K. 447, I, mm. 1–9 (0:00–0:18). is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Slide5-6 © John Peterson and Megan Lavengood
- Slide8-10 © John Peterson and Megan Lavengood
- Slide10-11 © John Peterson and Megan Lavengood
- Slide12-13 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_013\_Contraction\_Elmas\_PC\_1\_III © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license

---

[^1]: The recording linked is the only commercial recording of the piece. We hope more people will record this beautiful work.

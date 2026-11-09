---
title: "Hybrid Phrase-Level Forms"
slug: "hybrid-phrase-level-forms"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/hybrid-phrase-level-forms/"
authors: ["John Peterson"]
license: "CC BY-SA 4.0"
modified: "2025-01-13"
---

# Hybrid Phrase-Level Forms

> **Key Takeaways**
>
> - A hybrid form combines the beginning of one archetype with the ending from another.
> 	- Possible beginnings are antecedents, presentations, or compound basic ideas.
> 	- Possible endings are consequents, continuations, or cadential endings.
> - Although any beginning could be combined with any ending, some pairings are more common than others (see Example 7).

[Chapter Playlist](https://open.spotify.com/playlist/3sig09wZzjmq32smpgnPZ4?si=8fe60af15d4a4980)

## What’s a hybrid form?

In [The Phrase, Archetypes and Unique Forms](02-phrase-archetypes-unique-forms.md), we looked at two phrase-level formal archetypes: the sentence and the period.

We found that these forms divide into two parts. A sentence divides into two subphrases: a presentation and a continuation. A period divides into two phrases: an antecedent and a consequent.

![Example 1. An antecedent + continuation in Beethoven, Piano Sonata Op. 13, II, mm. 1–8 ( 0:00–0:32 ).](../media/2019/07/Example_001_AntCont-e1623950650588.png)*Example 1. An antecedent + continuation in Beethoven, Piano Sonata Op. 13, II, mm. 1–8 ([0:00–0:32](https://open.spotify.com/track/2zSiV8Ze0yyrFtbVzX2Ytg?si=-Zj8tWQQSYSAf1mSPCv-xw)).*

<!-- lilylet-begin: media/2019/07/Example_001_AntCont-e1623950650588.png -->
Lilylet transcription of the example above ([Example_001_AntCont-e1623950650588.lyl](../lilylet/images/2019/07/Example_001_AntCont-e1623950650588.lyl)):

```lyl.play
[title "Antecedent + continuation: Piano Sonata Op. 13, II, mm. 1–8"]
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key af \major \time 2/4 \clef "treble" \tempo "Adagio cantabile" \stemUp c4(\p^\markup "b.i."^\markup "antecedent" bf \\
\staff "2" \clef "bass" \stemUp af16[ ef af ef] g[ ef g ef] \\
\staff "2" \stemDown af,4( df | %1

\staff "1" \stemUp ef4. df8) \\
\staff "2" \stemUp af16[ ef af ef] bf'[ ef, bf' ef,] \\
\staff "2" \stemDown c,4 g) | %2

\staff "1" \stemUp c8([^\markup "c.i." ef af bf)] \\
\staff "2" \stemUp af16[ ef bf' ef,] c'[ af d af] \\
\staff "2" \stemDown af,8([ g f f')] | %3

\staff "1" \stemUp ef4.( e8^\markup "HC" \\
\staff "2" \stemUp g16[ bf g bf] g[ bf g bf] \\
\staff "2" \stemDown ef,4( ef, | %4

\staff "1" \stemUp f4)^\markup "f."^\markup "continuation" bf,8.([ c32 df)] \\
\staff "2" \stemUp g16[ bf g bf] g[ ef g ef] \\
\staff "2" \stemDown df,,4 df') | %5

\staff "1" \stemUp ef4(^\markup "f."^\markup "(continuation)" a, \\
\staff "2" \stemUp af16[ ef af ef] ef[ c ef c] \\
\staff "2" \stemDown c,4( f, | %6

\staff "1" \stemUp df4)^\markup "cad." c16([-. bf-. af-. g-.)] \\
\staff "2" \stemUp f,16[ df f df] df[ df df df] \\
\staff "2" \stemDown bf,,4 ef) | %7

\staff "1" \stemUp <g bf>4(^\markup "PAC" \tuplet 3/2 { <c, af'>16)[-. ef-. af-.] } \tuplet 3/2 { c16[-. ef-. af-.] } \bar "|." \\
\staff "2" \stemUp df,16([ ef df ef)] c8 df\rest \\
\staff "2" \stemDown af,,8[ af'] af, s | %8
```
<!-- lilylet-end -->
A hybrid form occurs when the beginning of one archetype is paired with the ending from another archetype. In Example 1, an antecedent is followed by a continuation.

- How do we know the first part is an antecedent rather than a presentation?
	- It ends with a weaker cadence, whereas presentations don’t end with cadences.
	- It has a basic idea followed by a contrasting idea, whereas presentations have a basic idea followed by a repetition of the basic idea.
- How do we know the second part is a continuation rather than a consequent?
	- Rather than beginning as consequents do with a basic idea, it begins with fragmentation, which is characteristic of continuations.
	- It begins with a feeling of instability created by the dominant that continues after the half cadence, rather than the stability that’s typical of a consequent’s beginning.

So far, we know two beginnings (presentation and antecedent) and two endings (continuation and consequent), but there’s actually one more possible beginning (compound basic idea) and one more possible ending (cadential). Below, we’ll outline these new beginnings and endings and provide ways to help distinguish between them.

## Beginnings

### New: The Compound Basic Idea (c.b.i.)

![Example 2. A compound basic idea in Haydn’s Piano Sonata in C, Hob. XVI:35, I, mm. 1–8 ( 0:00–0:05 ).](../media/2019/07/Example_002a_compound_basic_idea-e1623951301511.png)*Example 2. A compound basic idea in Haydn’s Piano Sonata in C, Hob. XVI:35, I, mm. 1–8 ([0:00–0:05](https://open.spotify.com/track/2MX7ZGLIM4lTBP8rIEbnXU?si=00V9I8XNTGC-7urHU2ovLQ)).*

<!-- lilylet-begin: media/2019/07/Example_002a_compound_basic_idea-e1623951301511.png -->
Lilylet transcription of the example above ([Example_002a_compound_basic_idea-e1623951301511.lyl](../lilylet/images/2019/07/Example_002a_compound_basic_idea-e1623951301511.lyl)):

```lyl.play
[title "Compound basic idea: Piano Sonata Hob. XVI:35, I, mm. 1–4"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/2 \partial 4 \clef "treble" \tempo "Allegro con brio" \stemDown c'8.[^\markup "b.i."^\markup "compound basic idea" e16] \\
\staff "2" \clef "bass" \partial 4 e,4\rest | %0

\staff "1" \stemDown g''4-! g-! g-! \grace b8 c4(\fz \\
\staff "2" \stemDown <c e>4 d,\rest d2\rest | %1

\staff "1" \stemDown g''4)-! g-! g-! e8.[^\markup "c.i." c16] \\
\staff "2" \stemDown <c e>4 e,\rest d2\rest | %2

\staff "1" \stemDown b'4-! b-! c-! c-! \\
\staff "2" \stemDown <g d' f>4 <g d' f> <g c e> <g c e> | %3

\staff "1" \stemDown d'4-! c\rest b\rest s4 \\
\staff "2" \stemDown <g b d>4 d\rest d2\rest | %4
```
<!-- lilylet-end -->
A compound basic idea (c.b.i.) is an antecedent without a cadence, as seen in Example 2.[^1]

- How is Example 2 like an antecedent?
	- It contains a basic idea followed by a contrasting idea.
- How is Example 2 different from an antecedent?
	- It doesn’t end with a cadence. Notice how the bass sits on G across mm. 3–4: although the melody comes to a point of rest, the lack of harmonic motion in the bass evades the half cadence (HC) that might have appeared there.

### Summary: The Three Beginning Types

The three beginnings that appear in hybrid phrase-level forms are antecedent, compound basic idea, and presentation. Example 3 provides a summary of the characteristics that differentiate each of these beginnings.

| Beginning | Ends with cadence? | First idea | Second idea |
| --- | --- | --- | --- |
| antecedent | Yes | b.i. | c.i. |
| compound basic idea | No | b.i. | c.i. |
| presentation | No | b.i. | b.i. |

Example 3. Characteristics that differentiate beginnings.

## Endings

### New: Cadential (cad.)

![Example 4. A cadential ending in Haydn, String Quartet Op. 64, No. 4, II, mm. 1–8 ( 0:05–0:10 ).](../media/2019/07/Example_004a_cadential-e1623951336715.png)*Example 4. A cadential ending in Haydn, String Quartet Op. 64, No. 4, II, mm. 1–8 ([0:05–0:10](https://open.spotify.com/track/2Dyh8LMXHEv4Hxchepyubj?si=1IMP3wmEQ_ut75jSngeJsA)).*

<!-- lilylet-begin: media/2019/07/Example_004a_cadential-e1623951336715.png -->
Lilylet transcription of the example above ([Example_004a_cadential-e1623951336715.lyl](../lilylet/images/2019/07/Example_004a_cadential-e1623951336715.lyl)):

```lyl.play
[title "Cadential ending: String Quartet Op. 64 No. 4, II, mm. 1–8"]
[composer "Joseph Haydn"]
[staves "<v1-v2-va-vc>"]
[instrument-v1 "Violin I" "Vn. I"]
[instrument-v2 "Violin II" "Vn. II"]
[instrument-va "Viola" "Va."]
[instrument-vc "Violoncello" "Vc."]

\key g \major \time 3/4 \partial 4 \tempo "Allegretto" d'8(\f[ b)] \\\\
\partial 4 r4 \\\\
\clef "alto" \partial 4 r4 \\\\
\clef "bass" \partial 4 r4 | %0

fs8([ g)] d4-. b''8([ g)] \\\\
r4 d4-.\f d-. \\\\
r4 b-.\f b-. \\\\
r4 g-.\f g-. | %1

fs'8([ a)] c,4-. a8([ c)] \\\\
r4 fs-. fs-. \\\\
r4 a-. a-. \\\\
r4 d,-. d-. | %2

c'16([ b)] r8 d16([ c)] r8 e16([ c)] r8 \\\\
g'8-. r g-. r g-. r \\\\
g8-. r e-. r c-. r \\\\
g8-. r e-. r c-. r | %3

a'2 d,4\p^\markup "cadential" \\\\
fs2 r4 \\\\
d,4-. r r \\\\
d,4-. d'-._\markup "Bass:" r | %4

g'2( b8[ gs)] \\\\
r4 d-.\p d-. \\\\
r4 g-.\p f'-. \\\\
r4 b,-.\p b-.
\addlyrics { 3̂ _ } | %5

b'8([ a)] c4-. c8([ b)] \\\\
e4 r e8([ d)] \\\\
e4 r r \\\\
c,4 r r
\addlyrics { 4̂ } | %6

\grace b'8( a4) a8([ g a d,)] \\\\
c2.( \\\\
fs2.( \\\\
d,4-. d-. d-.
\addlyrics { 5̂ _ _ } | %7

\partial 2 g'4^\markup "PAC" r \bar "|." \\\\
\partial 2 b4) r \bar "|." \\\\
\partial 2 g4) r \bar "|." \\\\
\partial 2 g,4-. g'-. \bar "|."
\addlyrics { 1̂ _ } | %8
```
<!-- lilylet-end -->
A cadential (cad.) ending harmonizes a particular bass pattern (demonstrated in Example 4).[^2]

The core bass pattern is *mi–fa–sol–do* $(\hat3-\hat4-\hat5-\hat1)$.[^3] The common harmonization of each of these notes is:

- *mi*$(\hat3)$: I<sup>6</sup>
- *fa*$(\hat4)$: ii<sup>6</sup> or IV
- *sol*$(\hat5)$: V<sup>(7)</sup> (often elaborated with cadential $^6_4$)
- *do*$(\hat1)$: I

This core *mi–fa–sol–do*$(\hat3-\hat4-\hat5-\hat1)$ bass line may be embellished. A common embellishment is to tonicize the dominant by adding *fi* before *sol* ($(\uparrow\hat4-\hat5)$, making the bass line *mi–fa–fi–sol–do*$(\hat3-\hat4-\uparrow\hat4-\hat5-\hat1)$.

The clearest cadential endings are four measures long with one bass note per measure.

### Summary: The Three Ending Types

The three endings that appear in hybrid phrase-level forms are consequent, continuation, and cadential. Example 5 provides a summary of the characteristics that differentiate each of these endings.

| Ending | Cadence | Bass | Ideas |
| --- | --- | --- | --- |
| Consequent | PAC/IAC. Not HC. | Varies | b.i. + c.i. |
| Continuation | HC, IAC, or PAC. | Varies | vary, but often divided 1+1+2 or 2+2 |
| Cadential | PAC/IAC. Not HC. | Mi−fa−sol−do $(\hat3−\hat4−\hat5−\hat1)$ or an elaboration of that line. | Either 2+2 or indivisible. Never features fragmentation. |

Example 5. Characteristics that differentiate endings.

## Hybrid Possibilities and Examples

The three possible beginnings and three possible endings are shown in Example 6. While any beginning on the left could be paired with any ending on the right, Example 7 shows that there are some pairings that are more common than others.

Below, we provide examples for all hybrids in the “slightly less common” and “occasional” categories (**Examples 8–12**). We already provided examples of the period and sentence in [The Phrase, Archetypes, and Unique Forms](02-phrase-archetypes-unique-forms.md).

The examples we provide in this chapter are all eight-measure archetypes, but as we show in the next chapter, these forms *can* be any length.

| Beginnings | Endings |
| --- | --- |
| Antecedent Compound basic idea (c.b.i.) Presentation | Consequent Continuation Cadential |

Example 6. Possible beginnings and endings. Any beginning on the left can theoretically pair with any ending on the right.

| Form | Degree of commonality |
| --- | --- |
| pres.+cont. (sentence) ant.+cons. (period) | very common |
| c.b.i.+cons. c.b.i.+cont. ant.+cont. | slightly less common |
| c.b.i.+cad. ant.+cad. | occasional |
| pres.+cad. pres.+cons. | rare or non-existent |

Example 7. Pairings of beginnings and endings sorted by degree of commonality.

![An antecedent + continuation in Beethoven's Piano Sonata Opus 13, movement 2, measures 1-8.](../media/2019/07/Example_008_antcont-e1623950775418.png)

<!-- lilylet-begin: media/2019/07/Example_008_antcont-e1623950775418.png -->
Lilylet transcription of the example above ([Example_008_antcont-e1623950775418.lyl](../lilylet/images/2019/07/Example_008_antcont-e1623950775418.lyl)):

```lyl.play
[title "Antecedent + continuation: Piano Sonata Op. 13, II, mm. 1–8"]
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key af \major \time 2/4 \clef "treble" \tempo "Adagio cantabile" \stemUp c4(\p^\markup "b.i."^\markup "antecedent" bf \\
\staff "2" \clef "bass" \stemUp af16[ ef af ef] g[ ef g ef] \\
\staff "2" \stemDown af,4( df | %1

\staff "1" \stemUp ef4. df8) \\
\staff "2" \stemUp af16[ ef af ef] bf'[ ef, bf' ef,] \\
\staff "2" \stemDown c,4 g) | %2

\staff "1" \stemUp c8([^\markup "c.i." ef af bf)] \\
\staff "2" \stemUp af16[ ef bf' ef,] c'[ af d af] \\
\staff "2" \stemDown af,8([ g f f')] | %3

\staff "1" \stemUp ef4.( e8^\markup "HC" \\
\staff "2" \stemUp g16[ bf g bf] g[ bf g bf] \\
\staff "2" \stemDown ef,4( ef, | %4

\staff "1" \stemUp f4)^\markup "f."^\markup "continuation" bf,8.([ c32 df)] \\
\staff "2" \stemUp g16[ bf g bf] g[ ef g ef] \\
\staff "2" \stemDown df,,4 df') | %5

\staff "1" \stemUp ef4(^\markup "f."^\markup "(continuation)" a, \\
\staff "2" \stemUp af16[ ef af ef] ef[ c ef c] \\
\staff "2" \stemDown c,4( f, | %6

\staff "1" \stemUp df4)^\markup "cad." c16([-. bf-. af-. g-.)] \\
\staff "2" \stemUp f,16[ df f df] df[ df df df] \\
\staff "2" \stemDown bf,,4 ef) | %7

\staff "1" \stemUp <g bf>4(^\markup "PAC" \tuplet 3/2 { <c, af'>16)[-. ef-. af-.] } \tuplet 3/2 { c16[-. ef-. af-.] } \bar "|." \\
\staff "2" \stemUp df,16([ ef df ef)] c8 df\rest \\
\staff "2" \stemDown af,,8[ af'] af, s | %8
```
<!-- lilylet-end -->
Example 8. An antecedent + continuation in Beethoven, Piano Sonata Op. 13, II, mm. 1–8 ([0:00–0:31](https://open.spotify.com/track/2zSiV8Ze0yyrFtbVzX2Ytg?si=-Zj8tWQQSYSAf1mSPCv-xw)).

![A compound basic idea + continuation in Haydn, Piano Sonata Hob. XVI:35, I, mm. 1–8.](../media/2019/07/Example_009a_CBIcont-e1623951374474.png)

<!-- lilylet-begin: media/2019/07/Example_009a_CBIcont-e1623951374474.png -->
Lilylet transcription of the example above ([Example_009a_CBIcont-e1623951374474.lyl](../lilylet/images/2019/07/Example_009a_CBIcont-e1623951374474.lyl)):

```lyl.play
[title "Compound basic idea + continuation: Piano Sonata Hob. XVI:35, I, mm. 1–8"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key c \major \time 2/2 \partial 4 \clef "treble" \tempo "Allegro con brio" \stemDown c'8.[^\markup "b.i."^\markup "compound basic idea" e16] \\
\staff "2" \clef "bass" \partial 4 e,4\rest | %0

\staff "1" \stemDown g''4-! g-! g-! \grace b8 c4(\fz \\
\staff "2" \stemDown <c e>4 d,\rest d2\rest | %1

\staff "1" \stemDown g''4)-! g-! g-! e8.[^\markup "c.i." c16] \\
\staff "2" \stemDown <c e>4 e,\rest d2\rest | %2

\staff "1" \stemDown b'4-! b-! c-! c-! \\
\staff "2" \stemDown <g d' f>4 <g d' f> <g c e> <g c e> | %3

\staff "1" \stemDown d'4-! c\rest b\rest g8.[^\markup "u."^\markup "continuation" d'16] \\
\staff "2" \stemDown <g b d>4 d\rest d2\rest \clef "treble" | %4

\staff "1" \stemDown f'4-! f8.([ g16)] e4-! e8.([ f16)] \\
\staff "2" \stemUp <b g'>4 b'\rest <c, g'> c'\rest | %5

\staff "1" \stemDown d'4-! d8.([ e16)] c4-!^\markup "cad." c-! \\
\staff "2" \stemUp <f g>4 b\rest <e, g> b'\rest | %6

\staff "1" \stemDown d'4-! d-! b-! b-! \\
\staff "2" \stemUp <f, f'>4 <f f'> <g d'> <g d'> | %7

\staff "1" \partial 4 \stemDown c'4-!^\markup "PAC" \bar "|." \\
\staff "2" \partial 4 \tuplet 3/2 { c8([ e g)] } | %8
```
<!-- lilylet-end -->
Example 9. A compound basic idea + continuation in Haydn, Piano Sonata Hob. XVI:35, I, mm. 1–8 ([0:00–0:10](https://open.spotify.com/track/2MX7ZGLIM4lTBP8rIEbnXU?si=00V9I8XNTGC-7urHU2ovLQ)).

![An antecedent + extended cadential ending in Haydn's String Quartet Opus 64, number 4, movement 2, measures 1-8](../media/2019/07/Example_010_antece-e1623951152615.png)

<!-- lilylet-begin: media/2019/07/Example_010_antece-e1623951152615.png -->
Lilylet transcription of the example above ([Example_010_antece-e1623951152615.lyl](../lilylet/images/2019/07/Example_010_antece-e1623951152615.lyl)):

```lyl.play
[title "Antecedent + cadential: String Quartet Op. 64 No. 4, II, mm. 1–8"]
[composer "Joseph Haydn"]
[staves "<v1-v2-va-vc>"]
[instrument-v1 "Violin I" "Vn. I"]
[instrument-v2 "Violin II" "Vn. II"]
[instrument-va "Viola" "Va."]
[instrument-vc "Violoncello" "Vc."]

\key g \major \time 3/4 \partial 4 \tempo "Allegretto" d'8(\f[^\markup "b.i."^\markup "antecedent" b)] \\\\
\partial 4 r4 \\\\
\clef "alto" \partial 4 r4 \\\\
\clef "bass" \partial 4 r4 | %0

fs8([ g)] d4-. b''8([ g)] \\\\
r4 d4-.\f d-. \\\\
r4 b-.\f b-. \\\\
r4 g-.\f g-. | %1

fs'8([ a)] c,4-. a8([^\markup "c.i." c)] \\\\
r4 fs-. fs-. \\\\
r4 a-. a-. \\\\
r4 d,-. d-. | %2

c'16([ b)] r8 d16([ c)] r8 e16([ c)] r8 \\\\
g'8-. r g-. r g-. r \\\\
g8-. r e-. r c-. r \\\\
g8-. r e-. r c-. r | %3

a'2^\markup "HC" d,4\p^\markup "cadential" \\\\
fs2 r4 \\\\
d,4-. r r \\\\
d,4-. d'-. r | %4

g'2( b8[ gs)] \\\\
r4 d-.\p d-. \\\\
r4 g-.\p f'-. \\\\
r4 b,-.\p b-. | %5

b'8([ a)] c4-. c8([ b)] \\\\
e4 r e8([ d)] \\\\
e4 r r \\\\
c,4 r r | %6

\grace b'8( a4) a8([ g a d,)] \\\\
c2.( \\\\
fs2.( \\\\
d,4-. d-. d-. | %7

\partial 2 g'4^\markup "PAC" r \bar "|." \\\\
\partial 2 b4) r \bar "|." \\\\
\partial 2 g4) r \bar "|." \\\\
\partial 2 g,4-. g'-. \bar "|." | %8
```
<!-- lilylet-end -->
Example 10. An antecedent + cadential in Haydn, String Quartet Op. 64, No. 4, II, mm. 1–8 ([0:00–0:10](https://open.spotify.com/track/2Dyh8LMXHEv4Hxchepyubj?si=1IMP3wmEQ_ut75jSngeJsA)).

![A contrasting beginning + extended cadential ending in Haydn's Symphony 95, Movement 3, measures 1-8](../media/2019/07/Example_011_cbece-e1623951115962.png)

<!-- lilylet-begin: media/2019/07/Example_011_cbece-e1623951115962.png -->
Lilylet transcription of the example above ([Example_011_cbece-e1623951115962.lyl](../lilylet/images/2019/07/Example_011_cbece-e1623951115962.lyl)):

```lyl.play
[title "Compound basic idea + cadential (Symphony No. 95, III, mm. 1–8)"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key ef \major \time 3/4 \partial 4 \tempo "Menuetto" \clef "treble" g'4-.\p^\markup "b.i."^\markup "compound basic idea" \\
\staff "2" \key ef \major \time 3/4 \partial 4 \clef "bass" r4 | %0

\staff "1" g'4-. r c-. \\
\staff "2" r4 \clef "treble" <c ef>4-. <c ef>-. | %1

\staff "1" c'4-. r ef-.^\markup "c.i." \\
\staff "2" r4 <c ef g>-. <c ef g>-. | %2

\staff "1" \grace ef'8 d4 d8([ c d b] \\
\staff "2" <c f g>4-. <c f g>-. <c f g>-. | %3

\staff "1" c'4) r g'-.\f^\markup "cadential" \\
\staff "2" <c ef g>4-. <c ef g>-. r4 \clef "bass" | %4

\staff "1" <c' c'>4-. \grace d'8 <c, c'>8([ b'] <c, c'>4)-. \\
\staff "2" <ef, g c>4 <ef g c> <ef g c> | %5

\staff "1" <af' af'>4( f' d \\
\staff "2" \stemUp c2( f4 \\
\staff "2" \stemDown <f, af>2. | %6

\staff "1" b'4)-. g'8([ af) g-. f-.] \\
\staff "2" <g d'>4) <g b d> <g b d> | %7

\staff "1" \partial 2 ef'4( c)^\markup "IAC" \bar "|." \\
\staff "2" \partial 2 <c ef>4 r \bar "|." | %8
```
<!-- lilylet-end -->
Example 11. A compound basic idea + cadential in Haydn, Symphony 95, III, mm. 1–8 ([0:00–0:10](https://open.spotify.com/track/4bfPvsHQMsPOtVbWNukvwd?si=oMQdq9afRB6mqtVlefA36g)).

![A contrasting beginning + consequent in Haydn's Symphony 87, movement 3, measures 1-8](../media/2019/07/Example_012_cbcons-e1623951073372.png)

<!-- lilylet-begin: media/2019/07/Example_012_cbcons-e1623951073372.png -->
Lilylet transcription of the example above ([Example_012_cbcons-e1623951073372.lyl](../lilylet/images/2019/07/Example_012_cbcons-e1623951073372.lyl)):

```lyl.play
[title "Compound basic idea + consequent (Symphony No. 87, III, mm. 1–8)"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key a \major \time 3/4 \tempo "Menuet" \clef "treble" cs'32[(^\markup "b.i."^\markup "compound basic idea" d e8.] cs4 a) \\
\staff "1" e4 s2 \\
\staff "2" \key a \major \time 3/4 \clef "bass" <a, e' cs'>4\f r r | %1

\staff "1" <e a>2( <fs as>4) \\
\staff "1" s2. \\
\staff "2" <a cs>32([ <b d> <cs e>8.] <a cs>4 <fs cs' e>) | %2

\staff "1" \grace cs'8 b8([^\markup "c.i." as b cs d e]) \\
\staff "1" fs2 e4 \\
\staff "2" <d, b' d>2 <cs cs'>4 | %3

\staff "1" d'4-. r r \\
\staff "1" d4-. s2 \\
\staff "2" <b, b'>4 <d d'> <fs fs'> | %4

\staff "1" d'32[(^\markup "b.i."^\markup "consequent" e fs8.] d4 b) \\
\staff "1" fs2( d4) \\
\staff "2" <b d>4 r r | %5

\staff "1" a'2( gs4) \\
\staff "1" b32[ cs d8.] d4 d \\
\staff "2" e,,4 <e' b'> <e b'> | %6

\staff "1" \grace b'8 <cs, e a>8[(^\markup "c.i." gs' a cs <d, e b'>) gs] \\
\staff "1" s2. \\
\staff "2" <a, a'>4 r <e e'> | %7

\staff "1" <cs a'>4^\markup "PAC" r r \bar "|." \\
\staff "1" s2. \bar "|." \\
\staff "2" <a, a'>4 cs e \bar "|." | %8
```
<!-- lilylet-end -->
Example 12. A compound basic idea + consequent in Haydn, Symphony 97, III, mm. 1–8 ([0:00–0:11](https://open.spotify.com/track/07diyTjKL8pcqCnc2kf0om?si=Li_2iG_xShe3eJ9F7Il8ig)).

## Listening to Phrase-level Forms

With so many possibilities, it might seem overwhelming to try to sort through the various possibilities. Example 13 offers a suggested listening strategy that can help determine what kind of beginning and ending you’re hearing.

![Example 13. Suggested process for listening to phrase-level forms: (a) what to listen for in beginnings, and (b) what to listen for in endings.](../media/2019/07/Example_013a_Listening_Diagram_Caplin.png)*Example 13. Suggested process for listening to phrase-level forms: (a) what to listen for in beginnings, and (b) what to listen for in endings.*

> Further Reading

- Caplin, William Earl. 2013. *Analyzing Classical Form: An Approach for the Classroom*. New York: Oxford University Press.

> Assignments

1. Analyzing hybrid forms ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Analyzing-Hybrid-Forms.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Analyzing-Hybrid-Forms.docx)). Provides excerpts and asks students to indicate which term best describes the first and second half of each. Optional harmonic analysis included. [Worksheet playlist](https://open.spotify.com/playlist/0ut3FwqkrR19KLnXuyNTnB)
2. Analyzing forms with multiple possibilities ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Analyzing-Forms-with-Multiple-Interpretive-Possibilities.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Analyzing-Forms-with-Multiple-Interpretive-Possibilities.docx)). Asks students to identify preferred and plausible alternative interpretations for several excerpts. Also includes band music. [Worksheet playlist](https://open.spotify.com/playlist/4Wpo3oxXETkCWnGJitaenv)
3. Composing phrase-level forms ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Composing-Phrase-level-Forms.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-Hybrid-Phrase-level-Forms-–-Composing-Phrase-level-Forms.docx)). Asks students to compose a phrase-level form given a description. Provides a basic idea bank to give students a start.

### Media Attributions

- Example\_001\_Ant+Cont © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_002a\_compound\_basic\_idea © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_004a\_cadential © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_013a\_Listening\_Diagram\_Caplin © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license

---

[^1]: What is "compound" about the compound basic idea? It often functions as the basic idea of a large sentence, one that is sixteen measures in length, where the presentation is eight measures long and comprises two c.b.i. units. It's "compound" in the sense that these large basic ideas are themselves composed of two units: a b.i. and a c.i.
[^2]: What is the difference between a cadential *idea* and cadential *ending*? The cadential idea comes at the end of a continuation, and essentially, the cadential ending is like the cadential idea being expanded to four measures and replacing the continuation. That means that "cadential" can occur at two formal levels: the idea level and the subphrase level.
[^3]: This can also occur in minor, of course, as *me–fa–sol–do* $(\downarrow\hat3-\hat4-\hat5-\hat1)$.

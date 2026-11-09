---
title: "The Phrase, Archetypes, and Unique Forms"
slug: "phrase-archetypes-unique-forms"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/phrase-archetypes-unique-forms/"
authors: ["John Peterson"]
license: "CC BY-SA 4.0"
modified: "2025-01-13"
---

# The Phrase, Archetypes, and Unique Forms

> **Key Takeaways**
>
>  This chapter introduces the phrase, the sentence, the period, the repeated phrase, compound forms, and unique phrase-level forms.
>
> - A phrase is a relatively complete thought that exhibits trajectory toward a goal. In tonal classical music, that goal is almost always one of the traditional cadence types, but in other kinds of music, that goal may be something else.
> 	- A sentence is a special kind of phrase that contains a presentation and a continuation.
> - Sometimes phrases are combined to form larger forms. Two such combinations of phrases are:
> 	- The period: a phrase-level form consisting of an antecedent and a consequent.
> 	- The repeated phrase: two phrases where the second is a written-out repeat of the first.
> - Sometimes two sentences are arranged in an antecedent-consequent relationship to create a compound period.
> - Although the forms discussed in this chapter are all quite common, it’s equally common for a composer to write a unique phrase-level form that isn’t in dialogue with the ones discussed here.

[Chapter Playlist](https://open.spotify.com/playlist/6xz945X5mJLAJepdyoB1Iv?si=582643127f9c48a0)

## The Phrase

![Example 1. A segmentation analysis of a phrase of common length in Schubert, “Du bist die Ruh” (0:21–0:32) .](../media/2019/06/Example_001-e1623944080164.png)*Example 1. A segmentation analysis of a phrase of common length in [Schubert, “Du bist die Ruh” (0:21–0:32)](https://open.spotify.com/track/27K996qPlCcnWSxr3zkDg6).*

<!-- lilylet-begin: media/2019/06/Example_001-e1623944080164.png -->
Lilylet transcription of the example above ([Example_001-e1623944080164.lyl](../lilylet/images/2019/06/Example_001-e1623944080164.lyl)):

```lyl.play
[title "Du bist die Ruh, D. 776 (segmentation of a phrase of common length)"]
[composer "Franz Schubert"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Voice"]
[instrument-pr-pl "Piano"]

\staff "1" \key ef \major \time 3/8 \clef "treble" R4. \\\\
\staff "1" \clef "treble" \stemUp bf''4.~ \\
\staff "1" \stemDown ef'8\>[ d16 c d8\!] \\
\staff "1" \stemDown bf'4. \\
\staff "2" \clef "treble" \stemUp f16[ af f af f af] \\
\staff "2" \stemDown bf4. | %1

\staff "1" R4. \\\\
\staff "1" \stemUp bf''8 s4 \\
\staff "1" \stemDown <bf' ef>8 g16[ bf g bf] \\
\staff "1" s4. \\
\staff "2" \stemUp <ef g>8 r r \clef "bass" \\
\staff "2" s4. | %2

\staff "1" bf'8^\markup "[mm. 3–4" bf8. bf16
\addlyrics { Du bist die } \\\\
\staff "1" g'16\pp[ bf g bf g bf] \\
\staff "2" \stemDown ef8[ ef8. ef16] | %3

\staff "1" c'4 c8^\markup "]"
\addlyrics { Ruh, der } \\\\
\staff "1" g'16[ c g c g c] \\
\staff "2" \stemDown ef4. | %4

\staff "1" ef'4^\markup "[mm. 5–6" d8
\addlyrics { Frie -- de } \\\\
\staff "1" \stemUp ef'4( d8 \\
\staff "1" \stemDown g'16[ bf g bf af bf] \\
\staff "2" <g ef'>4( <bf f'>8 | %5

\staff "1" ef'4.^\markup "PAC ]"
\addlyrics { mild, } \\\\
\staff "1" \stemUp ef'4.) \\
\staff "1" \stemDown g'16[ bf g bf g bf] \\
\staff "2" <g ef'>4.) | %6
```
<!-- lilylet-end -->
![Example 2. A segmentation analysis of a phrase of unique length in Fanny Hensel, “Abendbild” (0:00–0:40).](../media/2019/06/Example_002-e1623944015483.png)*Example 2. A segmentation analysis of a phrase of unique length in [Fanny Hensel, “Abendbild” (0:00–0:40).](https://open.spotify.com/track/6ZHUs1Lg0A1LjIMRZIEepl)*

<!-- lilylet-begin: media/2019/06/Example_002-e1623944015483.png -->
Lilylet transcription of the example above ([Example_002-e1623944015483.lyl](../lilylet/images/2019/06/Example_002-e1623944015483.lyl)):

```lyl.play
[title "Abendbild (segmentation of a phrase of unique length)"]
[composer "Fanny Hensel"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Singstimme" "Sgst."]
[instrument-pr-pl "Pianoforte" "Pfte."]

\staff "1" \key ef \major \time 6/8 \tempo "Andante con moto. (Allegretto.)" \clef "treble" R2. \\\\
\staff "1" \clef "treble" r8 <g bf ef>[ <bf ef g>] <ef g bf>[ <bf ef g> <g bf ef>] \\
\staff "2" \clef "bass" <ef,, ef'>4. r4 r8 | %1

\staff "1" R2. \\\\
\staff "1" r8 <f, af d>[ <af d f>] <d f bf>[ <af d f> <f af d>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %2

\staff "1" bf'8.^\markup "phrase (13 mm., mm. 3–15): b.i. (mm. 3–5)" a16 bf8 ef4 bf8
\addlyrics { Fried -- li -- cher A -- bend } \\\\
\staff "1" r8 <g bf ef>[ <bf ef g>] <ef g bf>[ <bf ef g> <g bf ef>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %3

\staff "1" g'4 g8 f4 ef8
\addlyrics { senkt sich auf's Ge -- } \\\\
\staff "1" r8 <bf df ef>[ <df ef g>] <ef g df'>[ <df ef g> <g, df' ef>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %4

\staff "1" bf'4. af4 r8
\addlyrics { fil -- de; } \\\\
\staff "1" r8 <c ef af>[ <ef af c>] <af c ef>[ <ef af c> <c ef af>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %5

\staff "1" f'4^\markup "c.i. 1 * (mm. 6–8)" af,8 af8. g16 af8
\addlyrics { sanft ent -- schlum -- mert Na -- } \\\\
\staff "1" r8 <bf d af'>[ <d af' bf>] <af' bf f'>[ <d, af' bf> <bf d af'>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %6

\staff "1" bf'4 bf8 a4 bf8
\addlyrics { tur, um ih -- re } \\\\
\staff "1" r8 <bf ef g>[ <ef g bf>] r <af, f'>[ <f' bf>] \\
\staff "2" <ef,, ef'>4 r8 <d d'>4 r8 | %7

\staff "1" ef'4. af,4 r8
\addlyrics { Zü -- ge } \\\\
\staff "1" r8 <bf ef>[ <ef bf'>] <af ef'>[ <ef af> <af, ef'>] \\
\staff "2" <c,, c'>4. r4 r8 | %8

\staff "1" g'4^\markup "c.i. 2 (mm. 9–11)" f8 e8. g16 bf8
\addlyrics { schwebt der Däm -- me -- rung } \\\\
\staff "1" r8 <g df' e>[ <df' e g>] <e g df'>[ <df e g> <g, df' e>] \\
\staff "2" <bf,, bf'>4. r4 r8 | %9

\staff "1" df'4.( c8) af f
\addlyrics { zar -- te Ver -- } \\\\
\staff "1" r8 <g df' e>[ <df' e bf'>] <af c f>[ <c f af> <f af c>] \\
\staff "2" <af,, af'>4. r4 r8 | %10

\staff "1" ef4 d8 r d' bf
\addlyrics { hül -- lung, und sie } \\\\
\staff "1" r8 <f, bf d>[ <af c f>] <d f bf>[ <bf d f> <f bf d>] \\
\staff "2" <af,, af'>4. r4 r8 | %11

\staff "1" ef'4.^\markup "cad. (mm. 12–15)" f,4 f8
\addlyrics { lä -- chelt, die } \\\\
\staff "1" r8 <bf ef>[ <ef bf'>] r <c ef f>[ <ef f c'>] \\
\staff "2" <g,, g'>4 r8 <af af'>4 r8 | %12

\staff "1" gf'4. a4 c8
\addlyrics { Hol -- de, sie } \\\\
\staff "1" r8 <c ef gf>[ <ef gf c>] r <a, ef' gf>[ <ef' gf a>] \\
\staff "2" <a,, a'>4 r8 <c c'>4 r8 | %13

\staff "1" c'4 bf8 r4 d,8
\addlyrics { lä -- chelt, die } \\\\
\staff "1" r8 <g bf ef>[ <bf ef g>] <af d af'>4 r8 \\
\staff "2" <bf,, bf'>4 r8 <bf' f'>4 r8 | %14

\staff "1" f4^\markup "PAC" ef8 r4 r8
\addlyrics { Hol -- de; } \\\\
\staff "1" r8 <g bf ef>[ <bf ef g>] <ef g bf>[ <bf ef g> <g bf ef>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %15

\staff "1" bf'8.[ c16] bf8 bf[( c]) d
\addlyrics { lä -- chelt, ein schlum -- mernd } \\\\
\staff "1" bf'8.[ c16 bf8] bf[ c d] \\
\staff "2" <d,, d'>8[ <f' bf> <bf d>] <d g>[ <bf d> <f bf>] | %16
```
<!-- lilylet-end -->
A phrase is a relatively complete thought that exhibits trajectory toward a goal, arriving at a sense of closure. In tonal classical music, the goal of a phrase is almost always one of the kinds of cadences described in the [Introduction to Harmony, Cadences, and Phrase Endings chapter](../03-diatonic-harmony/01-intro-to-harmony.md): perfect authentic cadences (PACs), imperfect authentic cadences (IACs), and half cadences (HCs).[^1]

A phrase can be any length, but phrases of 4, 8, or 16 measures are particularly common. Example 1 shows a segmentation analysis for a phrase of 4 measures (a common length), while **Example 2** shows a segmentation analysis for a phrase of 13 measures (an unusual length).

Phrases can comprise either ideas or both subphrases and ideas. The diagrams in Example 3 depict both of these scenarios.

When we diagram phrases, we follow two general principles:

1. Square brackets are used for ideas and subphrases (essentially anything that doesn’t have to end with a cadence).
2. Arcs are used for anything at the phrase level or above (essentially anything that must end with a cadence).[^2]

![Example 3. A phrase divided into (a) ideas only, and (b) subphrases and ideas.](../media/2019/06/Example_004-e1623944801914.png)*Example 3. A phrase divided into (a) ideas only, and (b) subphrases and ideas.*

Because closure is so important for phrase identification, it’s crucial to correctly identify cadences. Not every pause or V–I motion is a cadence! Example 4 discusses a passage with multiple locations someone might mistakenly label as cadences.

🧩 Interactive exercise (H5P): Analysis of cadences in Haydn, Piano Trio, H. 3, I, available in the [online edition](02-phrase-archetypes-unique-forms.md).

Example 4. A passage with multiple locations someone might mistakenly label as cadences in [Haydn’s Piano Trio in F Major, Hob. XV:6, I (0:00–0:24).](https://www.youtube.com/embed/wTdAw6IHxCg)

 

## Two Categories: Archetypes vs. Unique Forms

Below, we’ll explore two main ways that phrase-level forms might be organized:

1. They might play with what we’ll call an archetype. These are special ways of organizing phrases, and you’ll read about two kinds: sentences and periods.
2. They might not relate to an archetype at all, in which case we’ll say they’re unique forms, meaning they are not organized as sentences or periods.

Note that this doesn’t mean that archetypes are more common than unique forms. Phrase-level forms belonging to both categories appear frequently in common-practice music. Moreover, these categories might best be viewed as two ends of a spectrum (Example 5) in which a phrase-level form can be understood as “closer” to one category or the other without clearly belonging to either one.

[![A double-headed arrow. At one end if the term "unique forms" at the other end is the term "archetypes"](../media/2019/06/Example_005_Spectrum-e1623945151228.png)](../media/2019/06/Example_005_Spectrum.png)

Example 5. A spectrum of phrase-level formal categories.

## Archetype 1: The Sentence (A Special Kind of Phrase)

### The Basics

[![EXAMPLE 6 . A sentence at the beginning of Louise Farrenc, Cello Sonata, II (0:00–0:28) .](../media/2019/06/Example_005-150x150.png)](../media/2019/06/Example_005-e1623945293487.png)*EXAMPLE 6. A sentence at the beginning of [Louise Farrenc, Cello Sonata, II (0:00–0:28)](https://open.spotify.com/track/49N2pJ7uRcH1hvlZs77KGK).*

Example 6 shows one common way to construct a phrase, called a sentence. A sentence consists of two subphrases: the presentation and the continuation. The presentation is often four measures long, and it consists of a basic idea (b.i.) and its repetition. The continuation is often the same length as the presentation, creating a sense of proportional balance. It’s characterized by four traits that are discussed below.

![Example 7. Common sentence lengths.](../media/2019/06/Example_006-e1659277976559.png)*Example 7. Common sentence lengths.*

![Example 8. A hypothetical sentence with a continuation that’s longer than the presentation.](../media/2019/06/Example_007-e1623945514247.png)*Example 8. A hypothetical sentence with a continuation that’s longer than the presentation.*

Although it’s common for the presentation and continuation to be the same length (several common lengths are shown in Example 7), just as often, the continuation is longer than the presentation (Example 8). However, it’s not common for the continuation to be shorter than the presentation.

### More Detail: The Presentation

The presentation is a subphrase comprised of a basic idea (b.i.) and its repetition (as in the first half of Example 6).

Basic ideas are often two measures long, but one-measure or four-measure basic ideas also occur with some frequency.

The repetition of the basic idea is often varied, which can sometimes make it challenging to determine whether one is dealing with repetition or with a completely different idea. One of the characteristics that usually helps to clarify is **contour**: if the two ideas share the same contour, often we hear the second as a varied repetition of the first. If the two ideas have different contours, then we’re more likely to hear the second section as contrasting with the first, something that will return in our discussion of the period later in this chapter.

Some common transformations of the basic idea are:

- Rhythmic or melodic embellishment
- Transposition
- Change of harmonization
- Change of interval quality or size (or both)

Presentations typically begin on the tonic harmony, and they may do one of several things:

- Prolong tonic via a progression such as $\mathrm{I–V–V–I}$ or $\mathrm{I–ii^4_2–V^6_5–I}$
- Move from tonic to dominant: $\mathrm{I––V––}$
- Move from tonic to a non-dominant harmony, most often a strong pre-dominant such as ii<sup>(6)</sup>

### More Detail: The Continuation

The continuation is a subphrase that typically feels less stable than the presentation.

It’s characterized by four traits:

- Fragmentation (f.): making unit sizes shorter than the previously established unit sizes (e.g., if the basic ideas are each two measures, fragments may be one measure long).
	- Note that *fragmentation refers only to the length of the units*. It does not refer to their melodic content, which may or may not be related to the basic ideas.
- Increased rhythmic activity: the use of faster durations than in previous units.
- Sequences: units are repeated and transposed.
- Increased harmonic rhythm: chord changes occur more often than before. For example, if the basic ideas are each two measures long and each is harmonized with a single chord, the continuation might contain chord changes every measure.

A continuation subphrase is easier to identify if it includes more of the traits listed above, but very often, only some of these traits are present. Perhaps the most obvious one is fragmentation, which usually signals continuation even in the absence of the other traits, but not all continuations exhibit fragmentation.

Continuations may therefore take one of two typical forms: with fragmentation (as in Example 6) and without fragmentation (as in Examples 9 and 10). In Example 9, the continuation doesn’t divide into a smaller idea level. The term unit (u.) denotes a grouping that simply expresses the traits of the next higher grouping to which it belongs; in Example 10, it indicates that the two-measure idea expresses continuation (perhaps through increased harmonic rhythm, for example).

![Example 9. A sentence without fragmentation in Beethoven, Polonaise for Military Band (0:00–0:06) .](../media/2019/06/Example_008-e1623945581474.png)*Example 9. A sentence without fragmentation in [Beethoven, *Polonaise for Military Band* (0:00–0:06)](https://open.spotify.com/track/2iMZvEsrceSmaeE5aJPyW4).*

<!-- lilylet-begin: media/2019/06/Example_008-e1623945581474.png -->
Lilylet transcription of the example above ([Example_008-e1623945581474.lyl](../lilylet/images/2019/06/Example_008-e1623945581474.lyl)):

```lyl.play
[title "Polonaise for Military Band in D major, WoO 21 (sentence)"]
[composer "Ludwig van Beethoven"]
[staves "<picc-ob-cl-hn-tr-gc-tb-tri-pi-fg-cf>"]
[instrument-picc "Flauto piccolo" "Fl. picc."]
[instrument-ob "Oboi" "Ob."]
[instrument-cl "Clarinetti in A" "Cl."]
[instrument-hn "Corni in D" "Cor."]
[instrument-tr "Tromba in D" "Tr."]
[instrument-gc "Tamburo grande" "Tamb. gr."]
[instrument-tb "Tamburo militare" "Tamb. mil."]
[instrument-tri "Triangolo" "Tri."]
[instrument-pi "Cinelli" "Cin."]
[instrument-fg "Fagotti" "Fag."]
[instrument-cf "Contrafagotto" "Cfag."]

\key d \major \time 3/4 \partial 8 \clef "treble" a''8\f^\markup "b.i."^\markup "presentation"^\markup "sentence" \bar ".|:" \\\\
\partial 8 \clef "treble" <fs' a>8\f \\\\
\partial 8 \clef "treble" <a' c>8\f \\\\
\partial 8 \clef "treble" <e' g>8\f \\\\
\partial 8 \clef "treble" g'8\f \\\\
\partial 8 \clef "treble" r8 \\\\
\partial 8 \clef "treble" r8 \\\\
\partial 8 \clef "treble" r8 \\\\
\partial 8 \clef "treble" r8 \\\\
\partial 8 \clef "bass" <fs, a>8\f \\\\
\partial 8 \clef "bass" r8 | %1

a''8[ a] a4. d8^\markup "b.i." \\\\
<fs' a>8[ <fs a>] <fs a>4. <fs d'>8 \\\\
<a' c>8[ <a c>] <a c>4. <a f'>8 \\\\
<c' e>8[ <e g> <c e> <e g> <c e> <e g>] \\\\
g'8[ g] g4. g8 \\\\
d4\f r r \\\\
r4 d\f d \\\\
d'8\f[ d d d d d] \\\\
d'4\f r r \\\\
<d, d'>8 r <d d'> r <d d'> r \\\\
d,8\f r d r d r | %2

cs''8[ cs] cs4. cs8^\markup "continuation" \\\\
<e' cs'>8[ <e cs'>] <e cs'>4. <e cs'>8 \\\\
<g' e'>8[ <g e'>] <g e'>4. <g e'>8 \\\\
<g' d'>8[ <d' f> <g, d'> <d' f> <g, d'> <d' f>] \\\\
g'8[ g] g4. g8 \\\\
d4 r r \\\\
r4 d d \\\\
d'8[ d d d d d] \\\\
d'4 r r \\\\
<a, a'>8 r <a a'> r <a a'> r \\\\
a,8 r a r a r | %3

d''8([ cs b a g fs)] \\\\
<fs' d'>8([ <a cs> <g b> <fs a> <e g> <d fs>)] \\\\
<a' f'>8([ <c e> <bf d> <a c> <g e'> <a f'>)] \\\\
<c' e>4 r8 <e g>8[ <d f> <c e>] \\\\
c'4 r8 c16[ c] c8[ c,] \\\\
d4 d d \\\\
r4 d d8[ d] \\\\
d'8[ d d d d d] \\\\
d'4 d d \\\\
<d, d'>8([ <a' cs> <g b> <fs a> <e g> <d fs>)] \\\\
d,4 d8[ d a' d,] | %4

e'8^\markup "HC" a4 a8 s4 \\\\
<cs' e>8 <a a'>4 <a a'>8 s4 \\\\
<e' g>8[ <e g>16 <f a>] <g bf>8[ <f a>] s4 \\\\
<g' d'>8[ <g d'>16 <c e>] <d f>8[ <c e>] s4 \\\\
g'8 r g r s4 \\\\
d4 d s4 \\\\
d8[ d] d[ d] s4 \\\\
d'8 r d r s4 \\\\
d'4 d s4 \\\\
<a, e'>8[ <a e'>16 <d fs>] <e g>8[ <d fs>] s4 \\\\
a8 r a, r s4 | %5
```
<!-- lilylet-end -->
![Example 10. A sentence whose continuation doesn’t exhibit fragmentation in Beethoven, Piano Sonata no. 4, Op. 7, II (0:00–0:45) .](../media/2019/06/Example_009-e1623945687930.png)*Example 10. A sentence whose continuation doesn’t exhibit fragmentation in [Beethoven, Piano Sonata no. 4, Op. 7, II (0:00–0:45)](https://open.spotify.com/track/35XvZd3hlRtc8iN8HQymUs).*

<!-- lilylet-begin: media/2019/06/Example_009-e1623945687930.png -->
Lilylet transcription of the example above ([Example_009-e1623945687930.lyl](../lilylet/images/2019/06/Example_009-e1623945687930.lyl)):

```lyl.play
[title "Piano Sonata No. 4 in E-flat major, Op. 7, II (sentence)"]
[composer "Ludwig van Beethoven"]
[staves "{-}"]

\staff "1" \key c \major \time 3/4 \tempo "Largo, con gran espressione" \clef "treble" \stemUp <g c e>4(^\markup "b.i."^\markup "presentation"^\markup "sentence" <g d' f>8) r8 r4 \\
\staff "2" \clef "bass" <c,, g' c>4(\p <b g' b>8) r8 r4 | %1

\staff "1" \stemUp g'8.([ d16] e8) r8 r4 \clef "bass" \\
\staff "1" \stemDown g4 g8 s4. \\
\staff "2" <b,, g' b>4( <c g' c>8) r8 r4 | %2

\staff "1" \stemDown <e, g c e>4(^\markup "b.i." <d a' d>8) r8 r4 \\
\staff "2" <c,, c'>4( <fs, fs'>8) r8 r4 | %3

\staff "1" \stemUp d8.[ a16] c4.( b8) \\
\staff "1" \stemDown d,4 <d g>2\sf \\
\staff "2" <fs,,, fs'>4( <f f'>2) | %4

\staff "1" \stemDown <e, g c>4(^\markup "u."^\markup "continuation" <f g b d> <g c e> \\
\staff "2" e,,4 <d d'> <c c'> | %5

\staff "1" \stemUp <g e'>4 <f d'> <e a c>-.) \\
\staff "1" \stemDown a2 s4 \\
\staff "2" <f,,, f'>2. | %6

\staff "1" \stemUp b2~^\markup "cad." b8[ b] \\
\staff "1" \stemUp d,2 s4 \\
\staff "1" \stemDown a4 g8[ af <d, g> <d f>] \\
\staff "2" <g,, g'>2 <g g'>4 | %7

\staff "1" \partial 4. \stemUp <c e>4(^\markup "PAC" c8) \\
\staff "1" \partial 4. \stemDown f,4( e8) \\
\staff "2" \partial 4. \stemUp g,4( b8-.) \\
\staff "2" \partial 4. \stemDown c,,4. | %8
```
<!-- lilylet-end -->
Continuations may therefore take one of two typical forms:

- Example 6 above showed a typical continuation with fragmentation.
- Examples 8 and 9 show continuations without fragmentation.
	- In Example 9, the continuation doesn’t divide into a smaller idea level.
	- The term “unit” (u.) is used in Example 10 to denote a grouping that simply expresses the traits of the next higher grouping to which it belongs. Here, unit would mean that the two-measure idea expresses continuation through its increased harmonic rhythm.

Since continuations are unstable at their beginnings, it’s hard to generalize about how they might begin harmonically. In terms of their endings, however, continuations always drive toward a cadence, and in classical music, that cadence can be any of the three common kinds (perfect authentic, half, or imperfect authentic cadence).

### Summary: The Archetypal Sentence and Its Variants

Sentences come in many forms: the clearest, most obvious sentences are closer to the idealized archetype, and phrases that are less clear may be highly varied while still exhibiting some traits of the sentence (we call such phrases sentential). The archetypal sentence consists of:

- 4 or 8 measures
- A presentation
- A continuation whose length balances that of the presentation
- Fragmentation in the continuation

To be clear, many sentences do not have all of these traits. At a minimum, to be sentential, a phrase needs a presentation and a continuation.

## Archetype 2: The Period (A Combination of Two Phrases)

### The Basics

![Example 11. A period in Mozart’s Clarinet Concerto, III (0:00–0:11) .](../media/2019/06/Example_010-e1623945819436.png)*Example 11. A period in [Mozart’s Clarinet Concerto, III (0:00–0:11)](https://open.spotify.com/track/5johgHZOu21C42oDzKBBS8).*

<!-- lilylet-begin: media/2019/06/Example_010-e1623945819436.png -->
Lilylet transcription of the example above ([Example_010-e1623945819436.lyl](../lilylet/images/2019/06/Example_010-e1623945819436.lyl)):

```lyl.play
[title "Clarinet Concerto in A major, K. 622, III (period)"]
[composer "Wolfgang Amadeus Mozart"]
[staves "<cl> {vn-bs}"]
[instrument-cl "Clarinet in A" "Cl."]
[instrument-vn-bs "Strings" "Str."]

\key c \major \time 6/8 \partial 8 \tempo "Allegro" \clef "treble" e'16(\p^\markup "basic idea"^\markup "antecedent"^\markup "Solo" f) \\\\
\staff "1" \partial 8 \clef "treble" r8 \\
\staff "2" \partial 8 \clef "bass" r8 | %1

g''8-. g-. g-. a16( g fs g a g) \\\\
\staff "1" <a' cs>8_\markup "Viol."\p[ r <a cs>] <a cs>[ <a cs> <a cs>] \\
\staff "2" R2. | %2

f'4.( e8) r c'16(^\markup "contrasting idea" b) \\\\
\staff "1" <d e gs b>4.( <a' cs>8) r r \\
\staff "2" R2. | %3

a''8-. a-. a16( g) f8-. f16( e d c) \\\\
\staff "1" <d a'>8-.[ <d a'>-.] r <fs a>-.[ <fs a>-.] r \\
\staff "2" R2. | %4

b'8([ c cs)] d^\markup "HC" r e16(^\markup "basic idea"^\markup "consequent" f) \\\\
\staff "1" e8-.([ <e fs>-. <e g>-.] <e gs>) r a16( b) \\
\staff "2" R2. | %5

g''8-. g-. g-. a16( g fs g a g) \\\\
\staff "1" <a' cs>8[ r <a cs>] <a cs>[ <a cs> <a cs>] \\
\staff "2" R2. | %6

a''4.(^\markup "(basic idea)"^\markup "(consequent)" c8) r c16(^\markup "contrasting idea" b) \\\\
\staff "1" \stemUp <b' d>4.( <fs a cs>8) r r \\
\staff "1" \stemDown e4( es8) s4. \\
\staff "2" R2. | %7

a''16([ g f e d c)] b([ c d e f b,)] \\\\
\staff "1" <fs a>8 r r <b, d> r r \\
\staff "2" d8 r r e,8 r r | %8

c'4(^\markup "PAC" e8) c4 s8 \\\\
\staff "1" cs4( e8) cs4 s8 \\
\staff "2" a8[ a a] a r s | %9
```
<!-- lilylet-end -->
In addition to the sentence, another common phrase-level form is the period (Example 11). Unlike the sentence, which is a single phrase, the period comprises two phrases, each consisting of a basic idea (b.i.) followed by a contrasting idea (c.i.) (see [below](#more-detail-the-antecedent) on how the treatment of these ideas differs in each phrase). The first phrase, called the antecedent, is often four measures long, and it ends with a weaker cadence, most often a half cadence (HC). The second phrase is called the consequent. It ends with a stronger cadence than the antecedent, most often a perfect authentic cadence (PAC). It may be the same length as or longer than the antecedent; it’s rare for it to be shorter.

### More Detail: The Antecedent

Antecedents are sometimes characterized as “asking a question” to which the consequent “provides the answer.” Another way to think of it is that the antecedent makes an incomplete statement and the consequent completes it. Both of these descriptions stem from the fact that the antecedent always ends with a weaker cadence than the consequent.

Antecedents typically start on tonic harmony, and they most often end on a half cadence. While it’s certainly possible for the antecedent to modulate, it’s more common for the it to be entirely in the tonic key.

### More Detail: The Consequent

Like the antecedent, the consequent also comprises a basic idea and a contrasting idea. Most consequents begin with a basic idea that is similar or identical to that of the antecedent, but it may also be different.[^3] If the two basic ideas are different, it might be useful to label the antecedent’s basic idea as “b.i.<sup>1</sup>” and the consequent’s as “b.i.<sup>2</sup>.”

The consequent’s contrasting idea is almost always different from the antecedent’s due to the fact that it must end with a stronger cadence than the antecedent. The degree of difference varies widely: sometimes the consequent’s c.i. begins like the antecedent’s and only changes near the very end; other times, the c.i. is entirely different.

Consequents most often begin on tonic harmony and end with a PAC.

Periods may either stay in a single key or modulate (i.e., change keys). If the period modulates, the change of key usually happens during the consequent.

## The Repeated Phrase (Another Way to Combine Two Phrases)

Another relatively common phrase-level form—one that sometimes gets confused with the period—is the repeated phrase, which consists of a phrase followed by a written-out repeat (Example 12).

[![Example 12. A repeated phrase in Schubert’s “Du bist die Ruh” (0:22–0:44) .](../media/2019/06/Example_011-150x150.png)](../media/2019/06/Example_011-e1623945999625.png)*Example 12. A repeated phrase in [Schubert’s “Du bist die Ruh” (0:22–0:44)](https://open.spotify.com/track/27K996qPlCcnWSxr3zkDg6).*

<!-- lilylet-begin: media/2019/06/Example_011-150x150.png -->
Lilylet transcription of the example above ([Example_011-150x150.lyl](../lilylet/images/2019/06/Example_011-150x150.lyl)):

```lyl.play
[title "Du bist die Ruh, D. 776 (a repeated phrase)"]
[composer "Franz Schubert"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Voice"]
[instrument-pr-pl "Piano"]

\staff "1" \key ef \major \time 3/8 \clef "treble" R4. \\\\
\staff "1" \clef "treble" \stemUp bf''4.~ \\
\staff "1" \stemDown ef'8\>[ d16 c d8\!] \\
\staff "1" \stemDown bf'4. \\
\staff "2" \clef "treble" \stemUp f16[ af f af f af] \\
\staff "2" \stemDown bf4. | %1

\staff "1" R4. \\\\
\staff "1" \stemUp bf''8 s4 \\
\staff "1" \stemDown <bf' ef>8 g16[ bf g bf] \\
\staff "1" s4. \\
\staff "2" \stemUp <ef g>8 r r \clef "bass" \\
\staff "2" s4. | %2

\staff "1" bf'8^\markup "repeated phrase (8): phrase (4): b.i. (2)" bf8. bf16
\addlyrics { Du bist die } \\\\
\staff "1" g'16\pp[ bf g bf g bf] \\
\staff "2" \stemDown ef8[ ef8. ef16] | %3

\staff "1" c'4 c8
\addlyrics { Ruh, der } \\\\
\staff "1" g'16[ c g c g c] \\
\staff "2" \stemDown ef4. | %4

\staff "1" ef'4^\markup "c.i. (2)" d8
\addlyrics { Frie -- de } \\\\
\staff "1" \stemUp ef'4( d8 \\
\staff "1" \stemDown g'16[ bf g bf af bf] \\
\staff "2" <g ef'>4( <bf f'>8 | %5

\staff "1" ef'4.^\markup "PAC"
\addlyrics { mild, } \\\\
\staff "1" \stemUp ef'4.) \\
\staff "1" \stemDown g'16[ bf g bf g bf] \\
\staff "2" <g ef'>4.) | %6

\staff "1" bf'8^\markup "repetition of phrase (4): b.i. (2)" bf8. bf16
\addlyrics { die Sehn -- sucht } \\\\
\staff "1" g'16[ bf g bf g bf] \\
\staff "2" \stemDown ef8[ ef8. ef16] | %7

\staff "1" c'4 c8
\addlyrics { du, und } \\\\
\staff "1" g'16[ c g c g c] \\
\staff "2" \stemDown ef4. | %8

\staff "1" ef'4^\markup "c.i. (2)" d8
\addlyrics { was sie } \\\\
\staff "1" \stemUp ef'4( d8 \\
\staff "1" \stemDown g'16[ bf g bf af bf] \\
\staff "2" <g ef'>4( <bf f'>8 | %9

\staff "1" ef'4.^\markup "PAC"
\addlyrics { stillt. } \\\\
\staff "1" \stemUp ef'4.) \\
\staff "1" \stemDown g'16[ bf g bf g bf] \\
\staff "2" <g ef'>4.) | %10

\staff "1" c'8 c8. c16
\addlyrics { Ich wei -- he } \\\\
\staff "1" \stemUp <gf' a>16[ c <gf a> c <gf a> c] \\
\staff "2" \stemDown ef8[ ef8. ef16]( | %11

\staff "1" c'4( bf8)
\addlyrics { dir _ } \\\\
\staff "1" \stemUp f16[ c' f, c' f, bf] \\
\staff "2" \stemDown d4.) | %12
```
<!-- lilylet-end -->
A phrase between two repeat signs would typically not be considered a repeated phrase—this term refers to a phrase with a written-out repeat that adds additional measures to the piece. The repetition is often varied (for example, the melody may be embellished during the repeat), which explains why a composer may choose to write out the phrase a second time.

In a repeated phrase, the first phrase can end with any kind of cadence, and the second phrase must therefore end with the same one. This distinguishes a repeated phrase from a period, in which the consequent ends with a stronger cadence than the antecedent.

## Compound Phrase-Level Forms (Combining Archetypes)

[![Example 13. A compound period in Christian Petzold’s Minuet in G Major (0:00–0:25).](../media/2019/06/Example_012-150x150.png)](../media/2019/06/Example_012-e1623946034206.png)*Example 13. A compound period in [Christian Petzold’s Minuet in G Major (0:00–0:25).](https://open.spotify.com/track/31OT71sADyqUXlW7ZKLn8R)*

<!-- lilylet-begin: media/2019/06/Example_012-150x150.png -->
Lilylet transcription of the example above ([Example_012-150x150.lyl](../lilylet/images/2019/06/Example_012-150x150.lyl)):

```lyl.play
[title "Minuet in G major (compound period)"]
[composer "Christian Petzold"]
[staves "{-}"]

\staff "1" \key g \major \time 3/4 \clef "treble" d'4^\markup "b.i."^\markup "presentation"^\markup "antecedent" g,8[ a b c] \\
\staff "2" \clef "bass" <g b d>2 a4 | %1

\staff "1" d'4 g, g \\
\staff "2" b2. | %2

\staff "1" e'4^\markup "b.i." c8\mordent[ d e fs] \\
\staff "2" c2. | %3

\staff "1" g''4 g, g \\
\staff "2" b2. | %4

\staff "1" c'4^\markup "f."^\markup "continuation" d8[ c b a] \\
\staff "2" a2. | %5

\staff "1" b'4^\markup "f." c8[ b a g] \\
\staff "2" g2. | %6

\staff "1" fs4^\markup "cad." g8[ a b g] \\
\staff "2" d4 b g | %7

\staff "1" \grace b'8( a2.)^\markup "HC" \\
\staff "2" d4 d,8[ c' b a] | %8

\staff "1" d'4^\markup "b.i."^\markup "presentation"^\markup "consequent" g,8[ a b c] \\
\staff "2" b2 a4 | %9

\staff "1" d'4 g, g \\
\staff "2" g4 b g | %10

\staff "1" e'4^\markup "b.i."^\markup "(presentation)" c8\mordent[ d e fs] \\
\staff "2" c2. | %11

\staff "1" g''4 g,-. g \\
\staff "2" b4 c8[ b a g] | %12

\staff "1" c'4\mordent^\markup "f."^\markup "continuation" d8[ c b a] \\
\staff "2" a2 fs4 | %13

\staff "1" b'4^\markup "f." c8[ b a g] \\
\staff "2" g2 b4 | %14

\staff "1" a'4^\markup "cad." b8[ a g fs] \\
\staff "2" c4 d d, | %15

\staff "1" g'2.^\markup "PAC" \\
\staff "2" b2 g,4 \bar ":|." | %16
```
<!-- lilylet-end -->
Since the sentence is a single phrase, and since the period is composed of two phrases, it’s possible for a period to be made of two sentences, as in Example 13. When one form contains another kind of form in this way, we call the result a compound form.

![Example 14. A unique phrase-level form in Fanny Hensel’s “Abendbild” (0:00–0:40) .](../media/2019/06/Example_013-e1623946067355.png)*Example 14. A unique phrase-level form in [Fanny Hensel’s “Abendbild” (0:00–0:40)](https://open.spotify.com/track/6ZHUs1Lg0A1LjIMRZIEepl).*

<!-- lilylet-begin: media/2019/06/Example_013-e1623946067355.png -->
Lilylet transcription of the example above ([Example_013-e1623946067355.lyl](../lilylet/images/2019/06/Example_013-e1623946067355.lyl)):

```lyl.play
[title "Abendbild (a unique phrase-level form)"]
[composer "Fanny Hensel"]
[staves "<voice> {pr-pl}"]
[instrument-voice "Singstimme" "Sgst."]
[instrument-pr-pl "Pianoforte" "Pfte."]

\staff "1" \key ef \major \time 6/8 \tempo "Andante con moto. (Allegretto.)" \clef "treble" R2. \\\\
\staff "1" \clef "treble" r8 <g bf ef>[ <bf ef g>] <ef g bf>[ <bf ef g> <g bf ef>] \\
\staff "2" \clef "bass" <ef,, ef'>4. r4 r8 | %1

\staff "1" R2. \\\\
\staff "1" r8 <f, af d>[ <af d f>] <d f bf>[ <af d f> <f af d>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %2

\staff "1" bf'8.^\markup "phrase (13 mm., mm. 3–15): b.i. (mm. 3–5)" a16 bf8 ef4 bf8
\addlyrics { Fried -- li -- cher A -- bend } \\\\
\staff "1" r8 <g bf ef>[ <bf ef g>] <ef g bf>[ <bf ef g> <g bf ef>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %3

\staff "1" g'4 g8 f4 ef8
\addlyrics { senkt sich auf's Ge -- } \\\\
\staff "1" r8 <bf df ef>[ <df ef g>] <ef g df'>[ <df ef g> <g, df' ef>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %4

\staff "1" bf'4. af4 r8
\addlyrics { fil -- de; } \\\\
\staff "1" r8 <c ef af>[ <ef af c>] <af c ef>[ <ef af c> <c ef af>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %5

\staff "1" f'4^\markup "c.i. 1 * (mm. 6–8)" af,8 af8. g16 af8
\addlyrics { sanft ent -- schlum -- mert Na -- } \\\\
\staff "1" r8 <bf d af'>[ <d af' bf>] <af' bf f'>[ <d, af' bf> <bf d af'>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %6

\staff "1" bf'4 bf8 a4 bf8
\addlyrics { tur, um ih -- re } \\\\
\staff "1" r8 <bf ef g>[ <ef g bf>] r <af, f'>[ <f' bf>] \\
\staff "2" <ef,, ef'>4 r8 <d d'>4 r8 | %7

\staff "1" ef'4. af,4 r8
\addlyrics { Zü -- ge } \\\\
\staff "1" r8 <bf ef>[ <ef bf'>] <af ef'>[ <ef af> <af, ef'>] \\
\staff "2" <c,, c'>4. r4 r8 | %8

\staff "1" g'4^\markup "c.i. 2 (mm. 9–11)" f8 e8. g16 bf8
\addlyrics { schwebt der Däm -- me -- rung } \\\\
\staff "1" r8 <g df' e>[ <df' e g>] <e g df'>[ <df e g> <g, df' e>] \\
\staff "2" <bf,, bf'>4. r4 r8 | %9

\staff "1" df'4.( c8) af f
\addlyrics { zar -- te Ver -- } \\\\
\staff "1" r8 <g df' e>[ <df' e bf'>] <af c f>[ <c f af> <f af c>] \\
\staff "2" <af,, af'>4. r4 r8 | %10

\staff "1" ef4 d8 r d' bf
\addlyrics { hül -- lung, und sie } \\\\
\staff "1" r8 <f, bf d>[ <af c f>] <d f bf>[ <bf d f> <f bf d>] \\
\staff "2" <af,, af'>4. r4 r8 | %11

\staff "1" ef'4.^\markup "cad. (mm. 12–15)" f,4 f8
\addlyrics { lä -- chelt, die } \\\\
\staff "1" r8 <bf ef>[ <ef bf'>] r <c ef f>[ <ef f c'>] \\
\staff "2" <g,, g'>4 r8 <af af'>4 r8 | %12

\staff "1" gf'4. a4 c8
\addlyrics { Hol -- de, sie } \\\\
\staff "1" r8 <c ef gf>[ <ef gf c>] r <a, ef' gf>[ <ef' gf a>] \\
\staff "2" <a,, a'>4 r8 <c c'>4 r8 | %13

\staff "1" c'4 bf8 r4 d,8
\addlyrics { lä -- chelt, die } \\\\
\staff "1" r8 <g bf ef>[ <bf ef g>] <af d af'>4 r8 \\
\staff "2" <bf,, bf'>4 r8 <bf' f'>4 r8 | %14

\staff "1" f4^\markup "PAC" ef8 r4 r8
\addlyrics { Hol -- de; } \\\\
\staff "1" r8 <g bf ef>[ <bf ef g>] <ef g bf>[ <bf ef g> <g bf ef>] \\
\staff "2" <ef,, ef'>4. r4 r8 | %15

\staff "1" bf'8.[ c16] bf8 bf[( c]) d
\addlyrics { lä -- chelt, ein schlum -- mernd } \\\\
\staff "1" bf'8.[ c16 bf8] bf[ c d] \\
\staff "2" <d,, d'>8[ <f' bf> <bf d>] <d g>[ <bf d> <f bf>] | %16
```
<!-- lilylet-end -->
How is Example 13 like a period? The first phrase (the antecedent) ends with a half cadence, and the second phrase (the consequent) ends with a stronger cadence: a perfect authentic cadence. This weak-to-strong cadence pattern makes this example retain that sense of “question and answer” or “incomplete thought to completed thought” that is so characteristic of the period.

How does Example 13 use sentences? The antecedent and the consequent are each a sentence: in each phrase, the first four measures are the presentation and the last four measure are the continuation.

## Unique Phrase-Level Forms

The phrase-level forms we’ve looked at in this chapter are all quite common, but just as common are phrases that are unique—that aren’t in dialogue with these archetypes in any obvious way.

When we analyze such passages, we can still perform a segmentation analysis. We can choose to apply labels flexibly, but we can also feel free to abandon labels where they don’t seem to support our interpretation. In Example 2, we showed a segmentation analysis of a phrase of unique length, and we now show how one might apply select labels to those segments in Example 14.

> Assignments

1. Analyzing sentences ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Analyzing-Sentences.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Analyzing-Sentences.docx)). Asks students to compare excerpts to the archetypal sentence, provide form diagrams, and optionally, provide harmonic analysis for any given excerpt. [Worksheet playlist](https://open.spotify.com/playlist/030b7BIJt8oxyJEEgdVc9X)
2. Analyzing archetypes and unique forms ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Analyzing-Archetypes-and-Unique-Forms.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Analyzing-Archetypes-and-Unique-Forms.docx)). Asks students to identify excerpts that are archetypes (periods, sentences, compond periods) or unique forms, and to diagram those that are archetypes. Optionally, students can harmonically analyze the excerpts. [Worksheet playlist](https://open.spotify.com/playlist/67Gz0G81OCGlHyWJ3UqHHg)
3. Composing melody-only sentences ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Brief-Melody-only-Sentences.pdf), [.mscx](../media/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Brief-Melody-only-Sentences.mscx)). Students compose four-measure sentences from a given basic idea (melody only).
   <!-- lilylet-begin: media/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Brief-Melody-only-Sentences.mscx -->
   Lilylet transcription of WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Brief-Melody-only-Sentences.mscx ([WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Brief-Melody-only-Sentences.lyl](../lilylet/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Brief-Melody-only-Sentences.lyl)):

   ```lyl.play
   [title "WK The Phrase Archetypes and Unique Forms – Composing Brief Melody only Sentences"]
   [subtitle "The Phrase, Archetypes, and Unique Forms – Composing brief Melody-only Sentences"]

   \key a \major \numericTimeSignature \time 4/4 \clef "treble" \stemUp a'4.^\markup "1" \stemDown b16[ cs] b4 r | %1

   s1 | %2

   s1 | %3

   s1 \bar "||" | %4

   \key f \major \time 3/4 \stemUp a'8^\markup "2"[ a16 a] \stemDown c8[ a] \stemUp f4 | %5

   s2. | %6

   s2. | %7

   s2. \bar "||" | %8

   \key af \major \time 6/8 \stemDown c'8^\markup "3"[ bf af] df4. | %9

   s2. | %10

   s2. | %11

   s2. \bar "|." | %12
   ```
   <!-- lilylet-end -->
4. Composing fully realized sentences ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Fully-realized-Sentences.pdf), [.mscx](../media/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Fully-realized-Sentences.mscx)). Students select from a bank of basic ideas to compose an 8-measure sentence with full texture (accompaniment and melody).
   <!-- lilylet-begin: media/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Fully-realized-Sentences.mscx -->
   Lilylet transcription of WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Fully-realized-Sentences.mscx ([WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Fully-realized-Sentences.lyl](../lilylet/2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Fully-realized-Sentences.lyl)):

   ```lyl.play
   [title "WK The Phrase Archetypes and Unique Forms – Composing Fully realized Sentences"]
   [subtitle "The Phrase, Archetypes, and Unique Forms – Composing Fully-realized Sentences"]
   [staves "{s1-s2},s3"]
   [instrument-s1-s2 "final texture" "Pno."]
   [instrument-s3 "simplified accompaniment (step 5)" "Pno."]

   \staff "1" \key bf \major \time 2/4 \clef "treble" \tempo "Adagio" \stemUp bf'8.^\markup "1"^\markup "Sample Opening Motives"[ a16^\markup "N"] \stemDown bf8-.[ d-.] \\
   \staff "2" \clef "bass" \stemDown bf16[ f' d f] bf,[ f' d f] \\\
   \staff "1" \clef "bass" \stemDown <bf d f>2 | %1

   \staff "1" \stemDown d'4^\markup "sus."( c) \\
   \staff "2" \stemDown a16[ f' c f] a,[ f' ef f] \\\
   \staff "1" \stemDown <a c f>4 <a ef' f> | %2

   \staff "1" R2 \\
   \staff "2" R2 \\\
   \staff "1" R2 | %3

   \staff "1" \key e \major \tempo "Adagio" \stemDown e'4^\markup "2" gs8-.[ gs-.] \\
   \staff "2" \stemDown e,16[ b' gs b] e,[ b' gs b] \\\
   \staff "1" \stemDown <e, gs b>2 | %4

   \staff "1" \stemDown e'4( b) \\
   \staff "2" \stemDown e,16[ b' gs b] e,[ b' gs b] \\\
   \staff "1" \stemDown <e, gs b>2 | %5

   \staff "1" R2 \\
   \staff "2" R2 \\\
   \staff "1" R2 | %6

   \staff "1" \key bf \major \time 4/4 \tempo "Moderato" \stemUp g'4.^\markup "3"( a8^\markup "P" \stemDown bf4 \stemUp a8^\markup "P"->[ g] \\
   \staff "2" \stemDown g8[ d' bf d] g,[ d' bf d] \\\
   \staff "1" <g bf d>1 | %7

   \staff "1" \stemUp fs2 a) \\
   \staff "2" \stemDown a8[ d c d] a[ d c d] \\\
   \staff "1" <a c d>1 | %8

   \staff "1" R1 \\
   \staff "2" R1 \\\
   \staff "1" R1 | %9

   \staff "1" \key c \major s1 \\
   \staff "2" s1 \\\
   \staff "1" s1 | %10

   \staff "1" s1 \\
   \staff "2" s1 \\\
   \staff "1" s1 | %11

   \staff "1" s1 \\
   \staff "2" s1 \\\
   \staff "1" s1 | %12

   \staff "1" s1 \\
   \staff "2" s1 \\\
   \staff "1" s1 | %13

   \staff "1" s1 \\
   \staff "2" s1 \\\
   \staff "1" s1 | %14

   \staff "1" s1 \\
   \staff "2" s1 \\\
   \staff "1" s1 | %15

   \staff "1" s1 \\
   \staff "2" s1 \\\
   \staff "1" s1 | %16

   \staff "1" s1 \bar "|." \\
   \staff "2" s1 \\\
   \staff "1" s1 \bar "|." | %17
   ```
   <!-- lilylet-end -->

### Media Attributions

- Segmentation of Schubert’s “Du bist die Ruh” © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Hensel, “Abendbild” © John Peterson and Megan Lavengood
- Example\_004
- Example\_005\_Spectrum © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_005 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_006 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_007 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_008 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_009 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_010 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_011 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_012 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Example\_013 © John Peterson and Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license

---

[^1]: In other kinds of music, such as post-tonal music or popular music, closure may be signaled by other kinds of devices.
[^2]: See the discussion of formal hierarchy in [Foundational Concepts for Phrase-Level Forms](01-foundational-concepts.md) for a reminder of what is above the phrase level.
[^3]: Some analysts use the term "parallel period" to describe a period in which the consequent begins the same way as the antecedent, and "contrasting period" to describe a period in which the consequent begins differently than the antecedent. Since contrasting periods are so rare, however, this book simply uses “period” to refer to a parallel period, specifying the type only in the rare instance of a contrasting period.

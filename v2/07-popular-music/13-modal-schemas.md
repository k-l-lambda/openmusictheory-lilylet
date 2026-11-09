---
title: "Modal Schemas"
slug: "modal-schemas"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/modal-schemas/"
authors: ["Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# Modal Schemas

> **Key Takeaways**
>
> - Many pop songs use harmonic progressions that imply modes other than major/minor.
> - A modal schema may be used without the entire song being strictly within that mode.
> - Modes may be compared to major and natural minor to understand what characterizes their sound (their color notes)
> - Mixolydian schemas:
> 	- [**Double plagal**](09-blues-based-schemas.md#plagal-schemas) ♭VII–IV–I
> 	- **Subtonic shuttle** I–♭VII
> - Aeolian schemas:
> 	- **Subtonic shuttle** i–♭VII (same as mixolydian, but with a minor tonic)
> 	- **Aeolian shuttle**i–♭VII–♭VI–♭VII
> 	- **Aeolian cadence** ♭VI–♭VII–i (or I)
> 	- [**Lament**](11-classical-schemas.md#lament) i–♭VII–♭VI–v
> - Dorian schemas:
> 	- **Dorian shuttle** i–IV
> - Lydian schemas:
> 	- **Lydian shuttle**I–II♯
> 	- **Lydian cadence**II♯–IV–I
>
>  *This book covers modes from many different angles. For more information on modes, check [Introduction to Diatonic Modes (general)](../01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale.md), [Chord-Scale Theory (jazz)](../06-jazz/07-chord-scale-theory.md), [Diatonic Modes (20th/21st-c.)](../08-20th-and-21st-century-techniques/08-diatonic-modes.md), and [Analyzing with Modes, Scales, and Collections (20th-/21st-c.)](../08-20th-and-21st-century-techniques/10-analyzing-with-collections-scales-and-modes.md).*

[Chapter Playlist](https://open.spotify.com/playlist/18p8IBLUfyqwrKjGFVhVzv?si=rpdNNqcVSdGbMSgFWvw9mg)

“Mode” is a really complicated term. The article on mode in *Grove Music Online* (Powers et al. 2001), which is the standard academic encyclopedia for musicology, is 238 pages long and has nine authors. This means that, even if you think you already know about modes, you may want to set that knowledge aside before learning how modes are used in pop music.

This chapter discusses modes as they appear in certain schematic chord progressions in pop and rock music. Most of this information is based on the work of Nicole Biamonte (2010) and Philip Tagg (2011). After showing the function of modal harmonies as they compare to diatonic harmonies, common modal schemas will be introduced, grouped by the mode they borrow from.

Grouping modes by whether the tonic is major or minor helps with aural identification of modal passages. This grouping is represented in Example 1. The top line shows modes whose $\hat3$ is a major third above tonic (*mi*): major, mixolydian, and lydian. The bottom line shows modes whose $\hat3$ is a minor third above tonic (*me*): aeolian, dorian, and phrygian. Example 1 also illustrates what differentiates certain modes from major or minor. Each mode has exactly one pitch shown in a lighter color; this pitch is inflected when compared to major/minor. These special pitches are referred to as the color note of each mode.[^1] These relationships are shown with the dotted slurs.

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/5973262)

Example 1. Modes grouped by major vs. minor tonic, with dotted slurs connecting the distinctive color pitch of each mode with its major/minor counterpart.

## Function of Modal Harmonies

You may already have learned about tonic, subdominant, and dominant function in diatonic harmony. Modal harmonies basically align in function with their diatonic counterparts, although the additional modal inflections create greater overlap between these functions. This is summarized in Example 2.

![Example 2. Modal harmony allows many more “flavors” of the same chord to be implemented without changing the function of the chord.](../media/2019/05/modal_harmonic_function.png)*Example 2. Modal harmony allows many more “flavors” of the same chord to be implemented without changing the function of the chord.*

<!-- lilylet-begin: media/2019/05/modal_harmonic_function.png -->
Lilylet transcription of the example above ([modal_harmonic_function.md](../lilylet/images/2019/05/modal_harmonic_function.md)):

Modal harmony allows many more “flavors” of the same chord without changing its function. In each pair of staves, the upper staff shows the diatonic chords of C major and the lower staff the modal alternatives.

**Tonic function**

```lyl.play
[title "Tonic function"]
[staves "d-m"]
[instrument-d "Diatonic harmony"]
[instrument-m "Modal harmony"]

\omit Score.TimeSignature \time 2/1 \clef "treble" <c e g>1 s1
\addlyrics { "C: I" } \\\\
\clef "treble" <c e g>1 <c ef g>
\addlyrics { "C: I" i } | %1

<e g b>1 s1
\addlyrics { iii } \\\\
<e g b>1 <ef g bf>
\addlyrics { iii ♭III } | %2

<a c e>1 s1
\addlyrics { vi } \\\\
<a c e>1 <af c ef> \bar "||"
\addlyrics { vi ♭VI } | %3
```

**Subdominant function**

```lyl.play
[title "Subdominant function"]
[staves "d-m"]
[instrument-d "Diatonic harmony"]
[instrument-m "Modal harmony"]

\omit Score.TimeSignature \time 2/1 \clef "treble" <f a c>1 s1
\addlyrics { "C: IV" } \\\\
\clef "treble" <f a c>1 <f af c>
\addlyrics { "C: IV" iv } | %1

\time 4/1 <d f a>1 s1 s1 s1
\addlyrics { ii } \\\\
<d f a>1 <d f af> <df f af> <d fs a>
\addlyrics { ii ii° ♭II II♯ } | %2

\time 2/1 <a' c e>1 s1
\addlyrics { vi } \\\\
<a' c e>1 <af c ef>
\addlyrics { vi ♭VI } | %3

<b d f>1 s1
\addlyrics { vii° } \\\\
<bf d f>1 <bf df f> \bar "||"
\addlyrics { ♭VII ♭vii } | %4
```

**Dominant function**

```lyl.play
[title "Dominant function"]
[staves "d-m"]
[instrument-d "Diatonic harmony"]
[instrument-m "Modal harmony"]

\omit Score.TimeSignature \time 2/1 \clef "treble" <g' b d>1 s1
\addlyrics { "C: V" } \\\\
\clef "treble" <g' b d>1 <g bf d>
\addlyrics { "C: V" v } | %1

\time 3/1 <b' d f>1 s1 s1
\addlyrics { vii° } \\\\
<b' d f>1 <bf d f> <bf df f>
\addlyrics { vii° ♭VII ♭vii } | %2

\time 2/1 <e g b>1 s1
\addlyrics { iii } \\\\
<e g b>1 <ef g bf>
\addlyrics { iii ♭III } | %3

<d f a>1 s1
\addlyrics { ii } \\\\
<d fs a>1 <df f af> \bar "||"
\addlyrics { II♯ ♭II } | %4
```
<!-- lilylet-end -->
This illustration of harmonic function may help you to understand why certain modal progressions seem as goal-oriented as diatonic progressions.

## Mixolydian: ♭VII

Mixolydian’s color note is *te* ($\downarrow\hat{7}$), as shown in Example 3. In major-mode pop songs, the ♭VII chord is borrowed from the mixolydian mode.♭VII typically has dominant function, and you might think of it as a substitute for the traditional major-mode V chord in both the double plagal and mixolydian cadence schemas (Example 4).

![Illustration in notation.](../media/2019/05/mixolydian-1.png)

<!-- lilylet-begin: media/2019/05/mixolydian-1.png -->
Lilylet transcription of the example above ([mixolydian-1.lyl](../lilylet/images/2019/05/mixolydian-1.lyl)):

```lyl.play
[title "C major and C mixolydian"]
[staves "-"]

\omit Score.TimeSignature \time 8/1 \clef "treble" c1^\markup "C major"^\markup "1̂" d^\markup "2̂" e^\markup "3̂" f^\markup "4̂" g^\markup "5̂" a^\markup "6̂" b^\markup "7̂" c^\markup "1̂" \\\\
\clef "treble" <c e g>1 <d f a> <e g b> <f a c> <g b d> <a c e> <b d f> <c e g> \bar "||"
\addlyrics { I ii iii IV V vi vii° I } | %1

c1^\markup "C mixolydian"^\markup "1̂" d^\markup "2̂" e^\markup "3̂" f^\markup "4̂" g^\markup "5̂" a^\markup "6̂" bf^\markup "↓7̂" c^\markup "1̂" \\\\
<c e g>1 <d f a> <e g bf> <f a c> <g bf d> <a c e> <bf d f> <c e g> \bar "||"
\addlyrics { I ii iii° IV v vi ♭VII I } | %2
```
<!-- lilylet-end -->
Example 3. $\downarrow\hat{7}$ (te) is the color note of the mixolydian mode. Important mixolydian harmonies have that color note in them: v and ♭VII. (iii<sup>o</sup> is not used.)

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8521067)

Example 4. The double plagal schema and the mixolydian cadence schema are two especially common mixolydian chord progressions.

### Double plagal

The double plagal schema, ♭VII–IV–I, which is discussed further in the [blues-based schemas chapter](09-blues-based-schemas.md#double-plagal), is also a mixolydian schema, due to the major tonic and the $\downarrow\hat{7}$ (*te*).

### Subtonic shuttle

![Example 5. “Tired of Waiting for You” by the Kinks uses the subtonic shuttle in its intro and verses. Transcription begins at 0:07.](../media/2019/05/tired_of_waiting.png)*Example 5. “Tired of Waiting for You” by the Kinks uses the subtonic shuttle in its intro and verses. Transcription begins at 0:07.*

<!-- lilylet-begin: media/2019/05/tired_of_waiting.png -->
Lilylet transcription of the example above ([tired_of_waiting.lyl](../lilylet/images/2019/05/tired_of_waiting.lyl)):

```lyl.play
[title "Tired of Waiting for You"]
[composer "The Kinks (Ray Davies)"]
[staves "voice,bass"]
[instrument-voice "Voice"]
[instrument-bass "Bass"]

\key g \major \numericTimeSignature \time 4/4 \clef "treble_8" g'4.^\markup "Melody could be major..." \chords "G" a8~ a4 \chords "F" r4
\addlyrics { So tired, __ _ } \\\\
\key g \major \clef "bass" g,4. g8 f4. f8
\addlyrics { "G: I" _ ♭VII _ } | %1

g'4 \chords "G" a8[ b]~ b[ \chords "F" b] r4
\addlyrics { tired of wai -- _ ting, } \\\\
g,4. g8 f4. f8 | %2

b'4. \chords "G" c8 d \chords "F" d4 e8
\addlyrics { tired of wai -- ting for } \\\\
g,4. g8 f4. f8 | %3

e'4( \chords "G" f8^\markup "...but F♮ here confirms mixolydian"[ e] d4) \chords "F" r4 \bar "||"
\addlyrics { you __ _ _ _ } \\\\
g,4. g8 f4. f8 \bar "||" | %4
```
<!-- lilylet-end -->
The most distinctive chord progression in mixolydian is the subtonic shuttle, ♭VII–I, or B♭–C in C major (Example 4 above). The subtonic shuttle is used continuously throughout the intro and first verse of [“Tired of Waiting for You” by the Kinks](https://open.spotify.com/track/3sFnC76vUu0dtHUM5Z5bLL?si=unEDnpmXTh-ZpwRBESRQQg) (1965), where the instrumental parts shuttle between I and ♭VII throughout, while the melody emphasizes $\downarrow\hat{7}$ (*te*) as an embellishment and melodic goal (Example 5).

## Aeolian: ♭VII and ♭VI

You may think of aeolian as equivalent to the [natural minor scale](https://viva.pressbooks.pub/openmusictheory/chapter/scales-and-scale-degrees-open-music-theory#natural-minor). As a key or collection, though, aeolian and minor are different, because aeolian (as used in pop music) will prominently feature *le*and *te* $(\downarrow\hat6, \downarrow\hat7)$. These color note scale degrees give us the ♭VI and ♭VII chords, which are the signature chords of the aeolian mode. (Note the use of flat signs in label of ♭VI and ♭VII, even though they are diatonic in minor/aeolian—this is to prevent confusion with vii<sup>o</sup>.) Aeolian schemas use one or both of these harmonies (Example 6).  The ♭VI chord has subdominant function, and the ♭VII chord has dominant function.

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8520971)

Example 6. The subtonic shuttle, aeolian shuttle, aeolian cadence, and lament schemas are four common aeolian chord progressions.

![Example 7. “Somebody That I Used to Know” by Gotye features the subtonic shuttle in its intro/verses and the aeolian shuttle in its choruses. The Intro transcription begins at 0:04, and the Chorus transcription begins at 1:32.](../media/2019/05/somebody_that_I_used_to_know-2.png)*Example 7. “Somebody That I Used to Know” by Gotye features the subtonic shuttle in its intro/verses and the aeolian shuttle in its choruses. The Intro transcription begins at 0:04, and the Chorus transcription begins at 1:32.*

<!-- lilylet-begin: media/2019/05/somebody_that_I_used_to_know-2.png -->
Lilylet transcription of the example above ([somebody_that_I_used_to_know-2.md](../lilylet/images/2019/05/somebody_that_I_used_to_know-2.md)):

“Somebody That I Used to Know” by Gotye: the subtonic shuttle in the intro and verses, the aeolian shuttle in the choruses.

**Intro (0:04)**

```lyl.play
[title "Somebody That I Used to Know: Intro"]
[composer "Gotye"]
[staves "x-b"]
[instrument-x "Xylophone"]
[instrument-b "Bass"]

\key f \major \numericTimeSignature \time 4/4 \clef "treble" c4 \chords "Dmi" c g' \chords "C" g \\\\
\key f \major \clef "bass" d4._\markup "subtonic shuttle" d8 c4. c8
\addlyrics { "D mi.: i" _ ♭VII _ } | %1

a'8[ \chords "Dmi" bf c a] g4 \chords "C" g \\\\
d4. d8 c4. c8
\addlyrics { i _ ♭VII _ } | %2

f4 \chords "Dmi" f e \chords "C" e \\\\
d4. d8 c4. c8
\addlyrics { i _ ♭VII _ } | %3

d4 \chords "Dmi" d c \chords "C" r \bar "||" \\\\
d4. d8 c4. c8 \bar "||"
\addlyrics { i _ ♭VII _ } | %4
```

**Chorus (1:32)**

```lyl.play
[title "Somebody That I Used to Know: Chorus"]
[composer "Gotye"]
[staves "v-b"]
[instrument-v "Voice"]
[instrument-b "Bass"]

\key f \major \numericTimeSignature \time 4/4 \clef "treble" r4 \chords "Dmi" a8[ a] d[ \chords "C" f f d]
\addlyrics { But you did -- n't have to } \\\\
\key f \major \clef "bass" d,4._\markup "aeolian shuttle" d8 c4. c8
\addlyrics { "Dm: i" _ ♭VII _ } | %1

bf'4. \chords "Bb" a8 a2 \chords "C"
\addlyrics { cut me off, } \\\\
bf,4. bf8 c4. c8
\addlyrics { ♭VI _ ♭VII _ } | %2

r4 \chords "Dmi" g'8[ a] g[ \chords "C" g g g]
\addlyrics { make out like it ne -- ver } \\\\
d,4. d8 c4. c8
\addlyrics { i _ ♭VII _ } | %3

c'8[ \chords "Bb" c c c] bf[ \chords "C" a( g) g]
\addlyrics { hap -- pened and that we were _ no -- } \\\\
bf,4. bf8 c4. c8
\addlyrics { ♭VI _ ♭VII _ } | %4

\partial 4. f4. \chords "Dmi" \bar "|."
\addlyrics { thing. } \\\\
\partial 4. d,4. \bar "|." | %5
```
<!-- lilylet-end -->
### Subtonic shuttle

The subtonic shuttle was introduced as a [mixolydian](#mixolydian) progression, but the same progression can be used in aeolian. The difference is only in the quality of the tonic chord. If it’s major, then the subtonic shuttle implies mixolydian; if it’s minor, then the subtonic shuttle implies aeolian. In other words, ♭VII–i, or B♭–Cmi in C minor, is the minor version of the subtonic shuttle. This subtonic shuttle is used in the intro and verses of [“Somebody That I Used to Know” by Gotye](https://open.spotify.com/track/4wCmqSrbyCgxEXROQE6vtV?si=Iov4ilv6SF-z11GwVjDyIA) (2011, Example 7).

### Aeolian shuttle

Another common shuttle in aeolian is i–♭VII–♭VI–♭VII. This progression can be understood as a shuttle between i and ♭VI, with a passing ♭VII chord along the way. This progression is featured clearly in the chorus of [“Somebody That I Used to Know” by Gotye](https://open.spotify.com/track/4wCmqSrbyCgxEXROQE6vtV?si=Iov4ilv6SF-z11GwVjDyIA) (2011, Example 7).

![Example 8. The Fellowship Theme from the Lord of the Rings soundtrack by Howard Shore concludes its phrases with an aeolian cadence. Transcription begins at 0:27.](../media/2019/05/lotr.png)*Example 8. The Fellowship Theme from the Lord of the Rings soundtrack by Howard Shore concludes its phrases with an aeolian cadence. Transcription begins at 0:27.*

<!-- lilylet-begin: media/2019/05/lotr.png -->
Lilylet transcription of the example above ([lotr.lyl](../lilylet/images/2019/05/lotr.lyl)):

```lyl.play
[title "The Fellowship Theme (The Lord of the Rings)"]
[composer "Howard Shore"]
[staves "{-}"]

\staff "1" \time 6/8 \clef "treble" <cs e a>4. \chords "A" <c e g>4 \chords "C" <c e g>16[ <c e g>] \\
\staff "2" \clef "bass" a,4. c
\addlyrics { "Am: I" ♭III } | %1

\staff "1" <cs e a>4.~ \chords "A" <cs e a>4 d'16[ e] \\
\staff "2" a,2.
\addlyrics { I } | %2

\staff "1" <a' c f>4 \chords "F" e'16[ d] <e, g c>4 \chords "C/G" d'16[ e] \\
\staff "2" f,,4. g
\addlyrics { ♭VI ♭III⁶₄ } | %3

\staff "1" <e a d>4. \chords "Asus" <f a c>4^\markup "aeolian cadence" \chords "F" <d g b>8 \chords "G" \\
\staff "2" a,4. f4 g8
\addlyrics { Isus ♭VI ♭VII } | %4

\staff "1" <cs e a>2. \chords "A" \bar "||" \\
\staff "2" a,2. \bar "||"
\addlyrics { I } | %5
```
<!-- lilylet-end -->
### Aeolian cadence

In the aeolian shuttle schema, the consistent shuttling back and forth between I and ♭VI makes it difficult for a true cadence to be implied—a cadence means that a goal has been reached, but a circular progression like the aeolian shuttle doesn’t seem to have a goal. The aeolian cadence ♭VI–♭VII–i, or A♭–B♭–Cmi, is similar to the aeolian shuttle, but it’s goal-oriented: it cadences on the tonic chord, and it does not tend to be used as a loop. The aeolian cadence very frequently uses a picardy third, which means all the chords are major: ♭VI–♭VII–I, or A♭–B♭–C.

The aeolian cadence has a lot of cultural associations for many people and is typically associated with success and heroism. This cadence concludes the phrases of the [Fellowship Theme from *Lord of the Rings*](https://open.spotify.com/track/40JHx9UKFZTPKrA9a3ScaG?si=jce6ss3qT_2XV1zKGI9_NQ) (Example 8, begins at 0:27). The aeolian cadence has also been called the [Mario cadence,](http://gamemusictheory.blogspot.com/2011/04/mario-cadence.html) since the well-known fanfare at the end of each level of Super Mario Bros. uses this progression; the progression is often heard as a fanfare in other video games, such as [Final Fantasy](https://open.spotify.com/track/0PLHIAoHiaUq1EpcDvPQ2Q?si=SpKykdm9S5-UDmgaQU3prA). In all of these examples, the cadence concludes with a picardy third.

![Example 9. “I Don’t Like You” by Eva Simons uses a lament schema with ♭VII and minor v.](../media/2019/05/I-dont-like-you.png)*Example 9. “I Don’t Like You” by Eva Simons uses a lament schema with ♭VII and minor v.*

<!-- lilylet-begin: media/2019/05/I-dont-like-you.png -->
Lilylet transcription of the example above ([I-dont-like-you.lyl](../lilylet/images/2019/05/I-dont-like-you.lyl)):

```lyl.play
[title "I Don't Like You"]
[composer "Eva Simons"]
[staves "{-}"]

\staff "1" \key g \minor \numericTimeSignature \time 4/4 \clef "treble" d4 \chords "Eb" r r8 bf[ \chords "Dmi" bf f'(^\markup "Use of F instead of F♯ creates an aeolian sound"]
\addlyrics { Fade to the dark -- } \\
\staff "2" \key g \minor \clef "bass" ef,8.[ ef ef8] r8 d[ d d]
\addlyrics { "Gmi: ♭VI" _ _ v _ _ } | %1

\staff "1" f4) \chords "Gmi" ef d \chords "F" c8[ c](
\addlyrics { ness all the way, __ } \\
\staff "2" g8.[_\markup "lament schema" g g8] r8 f[ f f]
\addlyrics { i _ _ ♭VII _ _ } | %2

\staff "1" d4) \chords "Eb" r r8 bf[ \chords "Dmi" bf f']~
\addlyrics { _ at the start, __ } \\
\staff "2" ef,8.[ ef ef8] r8 d[ d d]
\addlyrics { ♭VI _ _ v _ _ } | %3

\staff "1" f4 \chords "Gmi" g d2 \chords "F" \bar "||"
\addlyrics { _ guess I… } \\
\staff "2" g8.[ g g8] r8 f[ f f] \bar "||"
\addlyrics { i _ _ VII _ _ } | %4
```
<!-- lilylet-end -->
### Lament

The lament schema has many variations, as discussed [in the chapter addressing that schema.](11-classical-schemas.md#lament) One particular flavor, i–♭VII–♭VI–v, strongly implies the aeolian mode due to the absence of a leading tone, which would imply a minor tonality, in favor of *te*$(\downarrow\hat7)$, a color note of aeolian. This variation of the lament schema is heard in [“I Don’t Like You” by Eva Simons](https://open.spotify.com/track/7AmYqCQrdV7czyiMvYKrGs?si=jL89NuYfSECCZaElW8PVAQ) (2012, Example 9).

## Dorian: IV with a Minor Tonic

Dorian is a mode that sounds like minor, but with *la*instead of *le*$(\hat6 \text{ instead of} \downarrow\hat6)$, which produces altered harmonies including a major IV chord (compared to the minor iv in minor), shown in Example 10. Using a major IV chord in songs with a minor tonic is the primary marker of a dorian song, which would otherwise sound like it was minor/aeolian. The major IV chord in dorian usually has a subdominant function.

![notation of natural minor vs dorian, with inflections of 6 highlighted](../media/2019/05/dorian-1.png)

<!-- lilylet-begin: media/2019/05/dorian-1.png -->
Lilylet transcription of the example above ([dorian-1.lyl](../lilylet/images/2019/05/dorian-1.lyl)):

```lyl.play
[title "C natural minor and C dorian"]
[staves "-"]

\omit Score.TimeSignature \time 8/1 \key c \minor \clef "treble" c1^\markup "natural minor"^\markup "1̂" d^\markup "2̂" ef^\markup "3̂" f^\markup "4̂" g^\markup "5̂" af^\markup "6̂" bf^\markup "7̂" c^\markup "1̂" \\\\
\key c \minor \clef "treble" <c ef g>1 <d f af> <ef g bf> <f af c> <g bf d> <af c ef> <bf d f> <c ef g> \bar "||"
\addlyrics { i ii° III iv v VI VII i } | %1

c1^\markup "dorian"^\markup "1̂" d^\markup "2̂" ef^\markup "3̂" f^\markup "4̂" g^\markup "5̂" a^\markup "↑6̂" bf^\markup "7̂" c^\markup "1̂" \\\\
<c ef g>1 <d f a> <ef g bf> <f a! c> <g bf d> <a! c ef> <bf d f> <c ef g> \bar "||"
\addlyrics { i ii III IV v vi° VII i } | %2
```
<!-- lilylet-end -->
Example 10. Dorian is distinguished from the natural minor scale by its $\uparrow\hat{6}$ (la), which alters the quality of the IV and ii chords. (vi° is not used.)

![Example 11. “Get Lucky” is in B dorian and features a characteristic IV–i motion every four bars (shown here by the arrows) to emphasize Bmi as tonic.](../media/2019/05/get_lucky.png)*Example 11. “Get Lucky” is in B dorian and features a characteristic IV–i motion every four bars (shown here by the arrows) to emphasize Bmi as tonic.*

<!-- lilylet-begin: media/2019/05/get_lucky.png -->
Lilylet transcription of the example above ([get_lucky.lyl](../lilylet/images/2019/05/get_lucky.lyl)):

```lyl.play
[title "Get Lucky"]
[composer "Daft Punk"]
[staves "<voice-bass>"]
[instrument-voice "Voice"]
[instrument-bass "Bass"]

\key b \minor \numericTimeSignature \time 4/4 \clef "treble" d2 \chords "Bmi" r8 cs8[ d fs]~
\addlyrics { We've come too far __ }
\addlyrics { Let's raise the bar __ } \\\\
\key b \minor \clef "bass" b,4^\markup "ad lib." b8.[ b'16]~ b8 b,4 cs8
\addlyrics { "Bm: i" _ _ _ _ _ } | %1

fs2 \chords "D" r8 fs8[ gs a]~
\addlyrics { _ to give up __ }
\addlyrics { _ and our cups __ } \\\\
d,4 d8.[ d'16]~ d8 d,4 e8
\addlyrics { III _ _ _ _ _ } | %2

a'2 \chords "F#mi" r8 a8[ b gs]~
\addlyrics { _ who we are __ }
\addlyrics { _ to the stars __ } \\\\
fs,4 fs8.[ fs'16]~ fs8 fs,4 fs8
\addlyrics { v _ _ _ _ _ } | %3

gs'2 \chords "E" r2 \bar ":|."
\addlyrics { _ }
\addlyrics { _ } \\\\
e,4 e8.[ e16]~ e8[ fs] a16[ b b,8] \bar ":|."
\addlyrics { IV _ _ _ _ _ _ _ } | %4
```
<!-- lilylet-end -->
The dorian mode is especially associated with funk, disco, and its derivative genres, where the dorian shuttle is especially pervasive. One example of many is [“Dance, Dance, Dance” by CHIC](https://open.spotify.com/track/0YnjpvsQGmPMgwMutsIT40?si=ZQRdlLrDTAqSrgqM0bF3UQ) (1979). Some people who haven’t listened to much music from these genres have trouble aurally recognizing the dorian shuttle and hear it instead as ii–V. Listening to a lot of funk and disco should help you learn to hear that “ii chord” as a i chord, even in more ambiguously dorian songs like [Daft Punk’s “Get Lucky”](https://open.spotify.com/track/69kOkLUCkxIZYexIgSG8rq?si=f2GJK3fpQIedPN34o_TtYg) (2013, Example 11).

### Dorian shuttle

The dorian shuttle alternates between a major IV chord and a minor i chord (Example 12). The overall effect of this progression is one of tonic prolongation. The upper notes of the IV harmony often form a neighboring motion that emphasizes *la*$(\uparrow\hat6)$. A common variation on the dorian shuttle is expanded to i–IV–i<sup>7</sup>–IV. This further expands the neighboring effect in the upper voices.

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8521022)

Example 12. The dorian shuttle uses minor i and major IV. It can be expanded to arch up to i<sup>7</sup>.

## Lydian: II♯

*Fi*$(\uparrow\hat4)$ is the color note of the lydian mode, which results in a major II chord instead of the minor ii found in major (Example 13). This text refers to this chord as II♯ for clarity, with the sharp sign representing the raised third of the chord.

![Example 13: Lydian is like major with a raised scale-degree 4. This results in a major II chord. (ivº and vii are not used.)](../media/2019/05/lydian-1.png)*Example 13: Lydian is like major with a raised scale-degree 4. This results in a major II chord. (ivº and vii are not used.)*

<!-- lilylet-begin: media/2019/05/lydian-1.png -->
Lilylet transcription of the example above ([lydian-1.lyl](../lilylet/images/2019/05/lydian-1.lyl)):

```lyl.play
[title "C major and C lydian"]
[staves "-"]

\omit Score.TimeSignature \time 8/1 \clef "treble" c1^\markup "major"^\markup "1̂" d^\markup "2̂" e^\markup "3̂" f^\markup "4̂" g^\markup "5̂" a^\markup "6̂" b^\markup "7̂" c^\markup "1̂" \\\\
\clef "treble" <c e g>1 <d f a> <e g b> <f a c> <g b d> <a c e> <b d f> <c e g> \bar "||"
\addlyrics { I ii iii IV V vi vii° I } | %1

c1^\markup "lydian"^\markup "1̂" d^\markup "2̂" e^\markup "3̂" fs^\markup "↑4̂" g^\markup "5̂" a^\markup "6̂" b^\markup "7̂" c^\markup "1̂" \\\\
<c e g>1 <d fs a> <e g b> <fs a c> <g b d> <a c e> <b d fs> <c e g> \bar "||"
\addlyrics { I II♯ iii ♯iv° V vi vii I } | %2
```
<!-- lilylet-end -->
Example 13. Lydian is like major with $\uparrow\hat{4}$ (fi). This results in a major II chord. (iv° and vii are not used.)

If II♯ goes to V, as it typically does in classical music, the chord should be understood as as a secondary dominant V/V instead. But in pop tunes, II♯ often leads elsewhere, necessitating the II♯ label.

Very few pop songs are truly in the lydian mode all the way through the song, but many major-mode pop songs use a major II♯ chord in place of the typical minor ii, giving a brief lydian flavor while remaining overall in the major mode.

II♯ can have either subdominant or dominant function, and each is used in the following two schemas (Example 14).

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8521043)

Example 14. The II♯ chord is the characteristic chord of lydian and is used in both of these schemas.

### Lydian shuttle

The most basic lydian chord progression is a simple shuttle between II♯ and I. Identifying this chord progression correctly can be tricky: because few pop songs are truly in lydian throughout, this II♯ chord is often neutralized later in the chord progression with a IV chord or a ii chord, which means the song is overall in major, but with a brief II♯ chord. This progression can be heard with some alterations in the opening of [“Sara” by Fleetwood Mac](https://open.spotify.com/track/0YuCATlVwxG5Mq8lN2Omro?si=2U73jNWVRU2JrL0Ajn6qWA) (1979). “Sara” expands the lydian shuttle to include a Ima<sup>7</sup> chord to harmonize an arching melody, and it also uses a tonic pedal underneath the II♯ chord. Later on in the song, the II♯ is neutralized by the use of a doo-wop schema. [This is illustrated by Mark Spicer.](http://mtosmt.org/issues/mto.17.23.2/mto.17.23.2.spicer.html)

If the II♯ chord is never neutralized, it’s possible that the chord progression isn’t really I–II♯, but another shuttle that relates roots by step. For example, [Taylor Swift’s “Starlight”](https://open.spotify.com/track/0vqI4ZIMuifeKeItGiWbPj?si=OK9l2l5bQbCUrXhamUXITQ) (2012) has verses that alternate between A and B major chords (begins at 0:26), but they are IV–V in E major, *not* a lydian shuttle. This becomes clear in the chorus (0:56), which is harmonized with a rotation of the doo-wop schema. The subtonic shuttle discussed earlier in this chapter is another chord progression that relates two major chords by step. Remember that lydian is rare in pop music, and be careful when identifying this progression!

In this progression, II♯ functions as a dominant chord, leading back into the tonic with the half step between *fi*and *sol* $(\uparrow\hat4-\hat5)$.

![Example 15: “Forget You” loops a lydian cadence throughout the song. The background vocals always have the characteristic chromatic line.](../media/2019/05/forget-you.png)*Example 15: “Forget You” loops a lydian cadence throughout the song. The background vocals always have the characteristic chromatic line.*

<!-- lilylet-begin: media/2019/05/forget-you.png -->
Lilylet transcription of the example above ([forget-you.lyl](../lilylet/images/2019/05/forget-you.lyl)):

```lyl.play
[title "Forget You"]
[composer "CeeLo Green"]
[staves "<voice-bass>"]
[instrument-voice "Voice"]
[instrument-bass "Bass"]

\numericTimeSignature \time 4/4 \partial 2 \clef "treble" \stemUp r2 \\
\partial 2 \stemDown r8 c8[ e g]
\addlyrics { I see you } \\\\
\partial 2 \clef "bass" r8 g,8[ a c]~
\addlyrics { _ _ "C:" } | %1

\stemUp <e' g>1^\markup "the characteristic chromaticism of the lydian cadence."^\markup "Background vocals (written up one octave for clarity) clearly outline"( \\
\stemDown a'8[ \chords "C" a] g4 e d8[ c]
\addlyrics { dri -- vin' 'round town with the } \\\\
c,2 r8 g8[ a d]~
\addlyrics { I _ _ _ } | %2

\stemUp <fs' a>1 \\
\stemDown c8 \chords "D" d4 a8~ a[ g a c]
\addlyrics { girl I love, _ and I'm like, } \\\\
d,2 r8 d8[ e f]~
\addlyrics { II♯ _ _ _ } | %3

\stemUp <f' a>1 \\
\stemDown r8 \chords "F" c8 g'4 e d8[ c]
\addlyrics { for -- get you. __ _ } \\\\
f,2 r8 f8[ g c,]~
\addlyrics { IV _ _ _ } | %4

\partial 2 \stemUp <e' g>2) \\
\partial 2 \stemDown r2 \chords "C" \bar "||" \\\\
\partial 2 c,2 \bar "||"
\addlyrics { I } | %5
```
<!-- lilylet-end -->
### Lydian cadence

The most popular progression using II♯ is the lydian cadence II♯–IV–I, or D–F–C in C major. Notice that the lydian *fi* $(\uparrow\hat{4})$ is immediately neutralized by the regular IV chord, replacing it with *fa*$(\hat4)$. This schema also features smooth chromatic voice leading, which may partially explain the appeal of this progression. The clearest example of this schema may be [Cee Lo Green’s “Forget You”](https://open.spotify.com/track/7AqISujIaWcY3h5zrOqt5v?si=NY08Kp-mQIqSYogdx37Gmw) (2010, Example 15).[^2]

## Identifying Modes by Ear

If you are not used to playing in and listening to modes, it can be daunting to identify and distinguish modes by ear. Here is a step-by-step process for aurally distinguishing all the modes discussed here, illustrated as a flowchart in Example 16.

### 1. Identify the quality of tonic.

![EXAMPLE 16. Flowchart illustrating the process of identifying modes by ear.](../media/2019/05/mode_flow_chart-3.jpg)*EXAMPLE 16. Flowchart illustrating the process of identifying modes by ear.*

Listen for the tonic pitch. Then, listen for the whole tonic chord. Is the third of that chord major or minor? This distinguishes the major-ish modes (major, mixolydian, lydian) from the minor-ish modes (minor, aeolian, dorian).

### 2. Listen for $\hat{7}$ (*ti* or *te*).

Compare the $\hat{7}$ to the leading tone (*ti*) a half step below tonic that we typically hear in minor and major songs. If $\hat{7}$ is a *whole step*below tonic (*te*), then it’s lowered, which means that the song is (at least temporarily) in a mode.

If you heard a major tonic and $\hat{7}$ is lowered (*te*), then you are in **mixolydian.**

If you heard a minor tonic and $\hat{7}$ is raised (*ti*), then you are in **minor.**

If your mode is not already identified, proceed to step 3.

### 3. Listen for other raised color notes—*fi*$(\uparrow\hat4)$ in major, and *la*$(\uparrow\hat6)$ in minor.

If $\hat7$ did not identify the mode for you, listen for other raised color notes.

If $\hat{4}$ is raised (*fi*) in a major-tonic mode, you are in **lydian.**If it is not, you are in **major.**

If $\hat{6}$ is raised (*la*) in a minor-tonic mode, you are in **dorian.**If not, you are in **aeolian.**

> Further reading

- Biamonte, Nicole. 2010. “Triadic Modal and Pentatonic Patterns in Rock Music.” *Music Theory Spectrum*32 (2): 95–110. <https://doi.org/10.1525/mts.2010.32.2.95>.
- Everett, Walter. 2009. *The Foundations of Rock: From Blue Suede Shoes to Suite: Judy Blue Eyes*. Oxford: Oxford University Press.
- Persichetti, Vincent. 1961. *Twentieth-Century Harmony*. New York: W. W. Norton.
- Powers, Harold S. et al. “Mode.” In *Grove Music Online*. New York: Oxford University Press. <https://www.oxfordmusiconline.com/view/10.1093/gmo/9781561592630.001.0001/omo-9781561592630-e-0000043718>.
- Spicer, Mark. 2017. “Fragile, Emergent, and Absent Tonics in Pop and Rock Songs.” *Music Theory Online*23 (2). <http://mtosmt.org/issues/mto.17.23.2/mto.17.23.2.spicer.html>.
- Tagg, Philip. 2011. *Everyday Tonality: Towards a Tonal Theory of What Most People Hear*. 1.3. New York: The Mass Media Music Scholars’ Press.

> Assignments

1. Identifying Modal Schemas ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-Modal-Schemas.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-Modal-Schemas.docx)). Asks students to aurally identify various modal schemas. [Worksheet playlist](https://open.spotify.com/playlist/1DJhIuYkyY8NLNM768YIKS?si=4feixxxZSUWDe7OD8aoH2Q)
2. Modal reharmonization composition exercise ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/COMP-Modal_Reharmonization_print.pdf), [.mscz](../media/2023/06/WK-modal-schemas_Reharmonization.mscz)). Asks students to reharmonize [Rihanna’s “Desperado”](https://open.spotify.com/track/4mCf3vQf7z0Yseo0RxAi3V?si=G-Iw-MhjSVGQMOSNw-SLvw) (2016) with modal schemas.
   <!-- lilylet-begin: media/2023/06/WK-modal-schemas_Reharmonization.mscz -->
   Lilylet transcription of WK-modal-schemas_Reharmonization.mscz: [WK-modal-schemas_Reharmonization.lyl](../lilylet/2023/06/WK-modal-schemas_Reharmonization.lyl) (49 bars).
   <!-- lilylet-end -->

### Media Attributions

- modal\_harmonic\_function © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- mixolydian © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- tired\_of\_waiting
- somebody\_that\_I\_used\_to\_know 2 © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- LOTR © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- I don’t like you © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- dorian
- get\_lucky © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- lydian © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- forget you © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- mode\_flow\_chart-3 © [Sarah Louden](http://www.sarahlouden.com) is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license

---

[^1]: Vincent Persichetti (1961) referred to these pitches as "characteristic notes."
[^2]: "Forget You" is the classroom-friendly version of the more explicit original.

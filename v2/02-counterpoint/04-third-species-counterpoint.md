---
title: "Third-Species Counterpoint"
slug: "third-species-counterpoint"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/third-species-counterpoint/"
authors: ["Mark Gotham", "Kris Shaffer"]
license: "CC BY-SA 4.0"
modified: "2026-07-24"
---

# Third-Species Counterpoint

> **Key Takeaways**
>
> The third species of species counterpoint sees the counterpoint line move four times as fast as the cantus firmus. This introduces:
>
> - a further metrical level (strong, weak, *medium*, weak)
> - a neighbor tone and other new dissonance types so that the total includes:
> 	- The dissonant passing tone: fills in the space of a melodic third via stepwise motion.
> 	- The dissonant neighbor tone: a step away from and back to the same consonant tone.
> 	- The double neighbor: both the higher and lower neighbour tones together (e.g., C–D–B–C or C–B–D–C).
> 	- The nota cambiata (changing tone) is special five-note figure that highly unusually includes a leap from a dissonance.

In third-species counterpoint, the counterpoint line moves in quarter notes against a cantus firmus in whole notes. This 4:1 rhythmic ratio creates a still greater differentiation between beats than in second species: strong beats (downbeats), moderately strong beats (the third quarter note of each bar), and weak beats (the second and fourth quarter notes of each bar). Third species also introduces the neighbor-tone dissonance and two related figures in which dissonances can participate in leaps.

Example 1 provides the examples of third-species counterpoint from Part I of *Gradus ad Parnassum*, annotated (as before) with the interval that the counterpoint line makes with the cantus firmus. For the complete examples from *Gradus ad Parnassum* as exercises, solutions, and annotations, see [Gradus ad Parnassum Exercises.](07-gradus-ad-parnassum-exercises.md)

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8488217)

Example 1. All third-species exercises from *Gradus ad Parnassum.*

## The Counterpoint Line

As in first and second species, the counterpoint line should be singable and have a good shape, with a single climax that does not coincide with the climax of the cantus firmus, and primarily stepwise motion (with some small leaps and an occasional large leap for variety). Like second species, a third-species counterpoint should be dominated by stepwise motion, more so than in first species, because there are fewer sticky situations that would require a leap. If the counterpoint must leap, it is preferable to do so within the bar rather than across the bar line. Also like second species, there should usually be one or two secondary climaxes—notes lower than the overall climax that serve as “local” climaxes for portions of the line.

## Beginning and Ending

### Beginning a third-species counterpoint

Begin a third-species counterpoint above the cantus firmus with *do* ($\hat1$) or *sol* ($\hat5$). Begin a third-species counterpoint below the cantus firmus with *do* ($\hat1$).

A third-species line can begin with four quarter notes in the first bar, or a quarter rest followed by three quarter notes. Regardless of rhythm, the first pitch in the counterpoint should follow the intervallic rules above.

### Ending a third-species counterpoint

As in other species, end with a clausula vera. The final pitch of the counterpoint must always be *do* ($\hat1$), and it must be a whole note.

The penultimate note of the counterpoint (the last quarter note of the penultimate bar) should be *ti* ($\hat7$) if the cantus is *re* ($\hat2$), and *re* ($\hat2$) if the cantus is *ti* ($\hat7$).

## Strong Beats

Principles for strong beats (downbeats) are generally the same as in second species:

- Strong beats are always consonant, and not unisons.
- Prefer imperfect consonances (thirds and sixths) to perfect consonances (fifths and octaves).

Motion across bar lines (from beat 4 to downbeat) follows the same rules as [first-species counterpoint](02-first-species-counterpoint.md).

Progressions from downbeat to downbeat follow principles of [second-species counterpoint](03-second-species-counterpoint.md) (except that direct fifths/octaves between successive downbeats *are* allowed). The following is a review of some of the most important principles from second species that apply in third species as well:

- No three consecutive bars can begin with the same perfect interval (two in a row are fine).
- No more than three bars in a row should begin with the same imperfect consonance.
- The pitches that begin consecutive downbeats must not make a dissonant melodic interval.

If a downbeat contains a perfect fifth, neither beat 3 nor 4 of the previous bar can be a fifth. If a downbeat contains an octave, neither beat 2, 3, nor 4 of the previous bar can be an octave. Like in second species, the negative effects of parallel fifths and octaves are not mitigated by the addition of a note or two.

## Other Beats

Beats 2–4 should exhibit a mixture of consonant and dissonant intervals to promote variety. Among consonances, unisons are permitted on weak beats when necessary to make good counterpoint between the lines. Any dissonance must follow the pattern of the dissonant passing tone or the dissonant neighbor tone, explained below.

## Consonance

The counterpoint can move in and out of consonant tones freely by step, as well as by leap from another consonance, with the following considerations:

- All melodic leaps, of course, must be melodic consonances.
- A large leap should be followed by a step in the opposite direction.
- Motion from the fourth beat into the following downbeat should follow the constraints above for motion into strong beats.

## Dissonance

Dissonances in third species can occur on beat 2, 3, or 4, and should be preceded and followed by stepwise motion (with the exception of the double neighbor and the *nota cambiata*, explained below). This promotes smoothness, both by keeping the dissonances away from the strongest beat of the bar and by coupling them with the smoothest melodic motion. Dissonance handling in third-species counterpointcentered on the types illustrated in Example 2 and described below:

![Example 2. Third-species dissonance types.](../media/2020/01/Dissonance.png)*Example 2. Third-species dissonance types.*

<!-- lilylet-begin: media/2020/01/Dissonance.png -->
Lilylet transcription of the example above ([Dissonance.lyl](../lilylet/images/2020/01/Dissonance.lyl)):

```lyl.play
[title "Dissonance: third-species dissonance types"]

\omit Score.TimeSignature \time 4/4 \key c \major \clef "treble" d'4^\markup "Passing" c b a
\addlyrics { _ P _ _ } \\
d1 \bar "|." | %1
b'4^\markup "Neighbour" c b a
\addlyrics { _ N _ _ } \\
d1 \bar "|." | %2
c'4^\markup "Double Neighbour" d b c
\addlyrics { _ N N _ } \\
c1 \bar "|." | %3
d'4^\markup "Nota Cambiata" c a b
\addlyrics { _ * _ _ } \\
d1 \bar "|." | %4
```
<!-- lilylet-end -->
- The dissonant passing tone fills in the space of a melodic third via stepwise motion. The notes before and after the passing tone must be consonant with the cantus firmus. However, it is possible to have two dissonant passing tones in a row (P4–d5 or d5–P4). As long as these dissonances do not fall on downbeats and the counterpoint moves in stepwise motion in a single direction, there is no negative effect.
- The dissonant neighbor tone ornaments a consonant tone by stepping away and stepping back to the original consonance (6–7–6 over the cantus, for example). It is melodically identical to the consonant neighbor tone of second species, with the difference being the harmonic dissonance. Employing it on a weak beat (2 or 4) ensures the greatest smoothness.
- The double neighbor occurs when beats 1 and 4 in the counterpoint are the same tone, and beats 2 and 3 include the notes a step higher and a step lower than the original tone: for example, C–D–B–C or C–B–D–C. Both beats 2 and 3 are dissonant, but since both are embellishing the original tone by step, the leap between them does not significantly diminish the smoothness of the line. When using a double neighbor, the direction between beats 3 and 4 should be the same as between beat 4 and the following downbeat. That motion across the bar line should also be stepwise. This further maintains smoothness to temper the effect of the dissonances.
- The nota cambiata (changing tone) is a five-note figure that outlines a step progression from downbeat to downbeat. It follows one of two patterns shown in Example 3). For a *nota cambiata* to be effective, the first, third, and fifth notes must be consonant with the cantus. The second note will be dissonant and will leap to the third tone. However, like the double neighbor, the overall pattern minimizes the negative effect of the leap away from the dissonance. It is surrounded by stepwise motion, the overall progression is a single step, and the dissonant tone and the following downbeat are the same pitch.

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8487176)

Example 3. Two forms of nota cambiata. From downbeat to downbeat, the nota cambiata may fill in (a) a step down or (b) a step up.

> Assignments

1. Third-Species Counterpoint A ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2026/07/WK-Third-species-Counterpoint-A.pdf), [.mscz](../media/2026/07/WK-Third-species-Counterpoint-A.mscz)). Asks students to do error detection on one third-species example and compose one of their own.
   <!-- lilylet-begin: media/2026/07/WK-Third-species-Counterpoint-A.mscz -->
   Lilylet transcription of WK-Third-species-Counterpoint-A.mscz ([WK-Third-species-Counterpoint-A.lyl](../lilylet/2026/07/WK-Third-species-Counterpoint-A.lyl)):

   ```lyl.play
   [title "Third-species Counterpoint"]
   [composer "Kyle Gullings"]
   [staves "s1,s2"]
   [instrument-s1 "Ctpt." "Ctpt."]
   [instrument-s2 "C.F." "C.F."]

   \key d \major \numericTimeSignature \time 2/2 \clef "treble" \stemUp d4_\markup "__ __ __ __" fs e d \\\
   \clef "bass" d,1_\markup "List at least 10 errors in the excerpt above:"^\markup "Intervals:"_\markup "1. ____________________________________      6. ____________________________________ 2. ____________________________________      7. ____________________________________ 3. ____________________________________      8. ____________________________________ 4. ____________________________________      9. ____________________________________ 5. ____________________________________      10. ___________________________________" | %1

   \stemUp cs4_\markup "__ __ __ __" d e fs \\\
   fs,1 | %2

   \stemUp g'4_\markup "__ __ __ __" fs d e \\\
   g1 | %3

   \stemUp fs4_\markup "__ __ __ __" g a \stemDown cs \\\
   fs,1 | %4

   \stemDown b'4_\markup "__ __ __ __" \stemUp g e cs \\\
   b1 | %5

   \stemUp e4_\markup "__ __ __ __" fs d e \\\
   a1 | %6

   \stemUp d4_\markup "__ __ __ __" e fs a \\\
   fs,1 | %7

   \stemDown cs'4_\markup "__ __ __ __" b \stemUp e, d \\\
   g1 | %8

   \stemUp cs4_\markup "__  __  __ __" b cs e \\\
   e,1 | %9

   d1_\markup "__" \bar "|." \\\
   d,1 \bar "|." | %10

   \key f \major s1 \\\
   f,1^\markup "Intervals:" | %11

   s1 \\\
   a1 | %12

   s1 \\\
   c1 | %13

   s1 \\\
   bf1 | %14

   s1 \\\
   g1 | %15

   s1 \\\
   f,1 | %16

   s1 \\\
   e,1 | %17

   s1 \bar "|." \\\
   f,1 \bar "|." | %18
   ```
   <!-- lilylet-end -->
2. Third-Species Counterpoint B ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2026/07/WK-Third-species-Counterpoint-B.pdf), [.mscz](../media/2026/07/WK-Third-species-Counterpoint-B.mscz)). Asks students to do error detection on one third-species example and compose one of their own.
   <!-- lilylet-begin: media/2026/07/WK-Third-species-Counterpoint-B.mscz -->
   Lilylet transcription of WK-Third-species-Counterpoint-B.mscz ([WK-Third-species-Counterpoint-B.lyl](../lilylet/2026/07/WK-Third-species-Counterpoint-B.lyl)):

   ```lyl.play
   [title "Third-species Counterpoint"]
   [composer "Kyle Gullings"]
   [staves "<s1,s2>"]
   [instrument-s1 "Ctpt." "Ctpt."]
   [instrument-s2 "C.F." "C.F."]

   \key bf \major \numericTimeSignature \time 2/2 \clef "treble" r4 \stemUp f_\markup "__  __  __" g a \\\
   \clef "bass" bf1_\markup "List at least 10 errors in the excerpt above:"^\markup "Intervals:"_\markup "1. ____________________________________      6. ____________________________________ 2. ____________________________________      7. ____________________________________ 3. ____________________________________      8. ____________________________________ 4. ____________________________________      9. ____________________________________ 5. ____________________________________      10. ___________________________________" | %1

   \stemDown bf'4_\markup "__  __  __  __" \stemUp a f g \\\
   a1 | %2

   \stemUp g'4_\markup "__  __  __  __" a \stemDown bf c \\\
   g1 | %3

   \stemDown d'4_\markup "__  __  __  __" bf \stemUp f g \\\
   d1 | %4

   \stemUp f4_\markup "__  __  __  __" g a \stemDown bf \\\
   c1 | %5

   \stemDown c'4_\markup "__  __  __  __" d c bf \\\
   bf1 | %6

   \stemDown c'4_\markup "__  __  __  __" d c c \\\
   a1 | %7

   bf'1_\markup "__" \bar "|." \\\
   bf1 \bar "|." | %8

   \key c \major s1 \\\
   \clef "treble" c1^\markup "Intervals:" | %9

   s1 \\\
   d1 | %10

   s1 \\\
   e1 | %11

   s1 \\\
   d1 | %12

   s1 \\\
   g'1 | %13

   s1 \\\
   f1 | %14

   s1 \\\
   d1 | %15

   s1 \bar "|." \\\
   c1 \bar "|." | %16
   ```
   <!-- lilylet-end -->
3. For the complete set of Fux exercises, see the [Gradus ad Parnassum](07-gradus-ad-parnassum-exercises.md) chapter.

### Media Attributions

- Dissonance © Mark Gotham is licensed under a [CC0 (Creative Commons Zero)](https://creativecommons.org/publicdomain/zero/1.0/) license

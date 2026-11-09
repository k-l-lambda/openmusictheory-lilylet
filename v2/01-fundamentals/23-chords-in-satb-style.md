---
title: "Chords in SATB style"
slug: "chords-in-satb-style"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/chords-in-satb-style/"
authors: ["Samuel Brady", "Chelsey Hamm"]
license: "CC BY-SA 4.0"
modified: "2026-06-11"
---

# Chords in SATB style

> **Key Takeaways**
>
> - When constructing a chord in SATB style, there are six rules to keep in mind:
> 	1. Stem direction
> 	2. Chord construction
> 	3. Range
> 	4. Spacing
> 	5. Voice crossing
> 	6. Doubling

Music theorists sometimes simplify compositions into four parts (or voices) in order to make their harmonic content more readily accessible. This practice is called SATB style, abbreviated after the four common voice parts of a choir––soprano (S), alto (A), tenor (T), and bass (B).

When constructing a chord in strict SATB style, there are six rules musicians generally follow:

1. Stem direction
2. Chord construction
3. Range
4. Spacing
5. Voice crossing
6. Doubling

These six parameters form the basis of counterpoint and part writing, explored further in the sections [Counterpoint and Galant Schemas](../02-counterpoint/README.md) and [Diatonic Harmony, Tonicization, and Modulation](../03-diatonic-harmony/README.md).

## Stem Direction

![Example 1. A stemming error.](../media/2022/08/stemming.png)*Example 1. A stemming error.*

<!-- lilylet-begin: media/2022/08/stemming.png -->
Lilylet transcription of the example above ([stemming.lyl](../lilylet/images/2022/08/stemming.lyl)):

```lyl.play
[title "A stemming error"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemDown g'2 ^\markup "Incorrect" \\
\staff "1" \stemUp d2 _\markup "stems in wrong direction!" \\
\staff "2" \clef "bass" \stemUp g2 \\
\staff "2" \stemDown b,2
\addlyrics { "C: V⁶" } | %1

\staff "1" \stemUp g'2 ^\markup "Correct" \\
\staff "1" \stemDown d2 \\
\staff "2" \stemUp g2 \\
\staff "2" \stemDown b,2
\addlyrics { "C: V⁶" } | %2
```
<!-- lilylet-end -->
On a grand staff in SATB style, the soprano and alto are written in the treble clef (upper staff), while the tenor and bass are written in the bass clef (lower staff). The soprano and tenor voices receive up-stems, while the alto and bass parts receive down-stems. If the stem direction is crossed, this is an error. Example 1 shows a chord with incorrect stemming, followed by the corrected version.

## Chord Construction

![Example 2. A chord construction error.](../media/2022/08/wrong-notes.png)*Example 2. A chord construction error.*

<!-- lilylet-begin: media/2022/08/wrong-notes.png -->
Lilylet transcription of the example above ([wrong-notes.lyl](../lilylet/images/2022/08/wrong-notes.lyl)):

```lyl.play
[title "A chord construction error"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemUp b'2 ^\markup "Incorrect" \\
\staff "1" \stemDown ds2 \\
\staff "2" \clef "bass" \stemUp ff,2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: vii°⁶" } | %1

\staff "1" \stemUp b'2 ^\markup "Correct" \\
\staff "1" \stemDown d2 \\
\staff "2" \stemUp f,2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: vii°⁶" } | %2
```
<!-- lilylet-end -->
Be sure to check each chord for correct notes and accidentals, and make sure that your chords are not missing any notes. In Example 2, the first chord has accidentals erroneously added to two of the pitches, which are removed in the second chord to create a correct B diminished triad in first inversion.

The bass voice must always correspond with the inversion that the Roman numeral’s figures indicate. However, the order of the upper notes can be arranged in many ways. In other words, there is not necessarily just one correct way to voice a chord.

## Range

![Example 3. Vocal ranges.](../media/2022/08/range.png)*Example 3. Vocal ranges.*

<!-- lilylet-begin: media/2022/08/range.png -->
Lilylet transcription of the example above ([range.lyl](../lilylet/images/2022/08/range.lyl)):

```lyl.play
[title "Vocal ranges"]
[staves "<s-a-t-b>"]
[instrument-s "Soprano" "S"]
[instrument-a "Alto" "A"]
[instrument-t "Tenor" "T"]
[instrument-b "Bass" "B"]

\omit Score.TimeSignature \key c \major \time 4/4 \clef "treble" \stemUp c2\glissando \stemDown g''2
\addlyrics { C₄ G₅ } \\\\
\clef "treble" \stemUp g2\glissando \stemDown d''2
\addlyrics { G₃ D₅ } \\\\
\clef "bass" \stemUp c,2\glissando \stemDown g''2
\addlyrics { C₃ G₄ } \\\\
\clef "bass" \stemUp f,,2\glissando \stemDown d''2
\addlyrics { F₂ D₄ } | %1
```
<!-- lilylet-end -->
There is a generally accepted range for each voice (Example 3):

- Soprano – C<sub>4</sub> to G<sub>5</sub>
- Alto – G<sub>3</sub> to D<sub>5</sub>
- Tenor – C<sub>3</sub> to G<sub>4</sub>
- Bass – F<sub>2</sub> to D<sub>4</sub>

![Example 4. A range error.](../media/2020/05/too-high.png)*Example 4. A range error.*

<!-- lilylet-begin: media/2020/05/too-high.png -->
Lilylet transcription of the example above ([too-high.lyl](../lilylet/images/2020/05/too-high.lyl)):

```lyl.play
[title "A range error"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp d''2 ^\markup "too high!" ^\markup "Incorrect" \\
\staff "1" \stemDown f2 \\
\staff "2" \clef "bass" \stemUp a2 \\
\staff "2" \stemDown d,,2 _\markup "too low!"
\addlyrics { "C: ii" } | %1

\staff "1" \stemUp d'2 ^\markup "Correct" \\
\staff "1" \stemDown f2 \\
\staff "2" \stemUp a2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: ii" } | %2
```
<!-- lilylet-end -->
In Example 4, the soprano and bass notes are out of range; this is corrected by moving the soprano note down by an octave and the bass note up by an octave.

## Spacing

![Example 15. A spacing error.](../media/2022/08/spacing.png)*Example 15. A spacing error.*

<!-- lilylet-begin: media/2022/08/spacing.png -->
Lilylet transcription of the example above ([spacing.lyl](../lilylet/images/2022/08/spacing.lyl)):

```lyl.play
[title "A spacing error"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \clef "treble" \stemUp a''2 ^\markup "Incorrect" \\
\staff "1" \stemDown e2 _\markup ">8ve!" \\
\staff "2" \clef "bass" \stemUp c,2 ^\markup ">8ve!" \\
\staff "2" \stemDown a,2
\addlyrics { "C: vi" } | %1

\staff "1" \stemUp e'2 ^\markup "Correct" \\
\staff "1" \stemDown a'2 \\
\staff "2" \stemUp c2 \\
\staff "2" \stemDown a,2
\addlyrics { "C: vi" } | %2
```
<!-- lilylet-end -->
There should be no more than an octave between adjacent upper voices (soprano and alto, alto and tenor) and no more than a twelfth between the tenor and bass. The most common spacing error occurs between the alto and tenor because the notes appear in different clefs. Example 15 first shows a chord with incorrect spacing—the soprano and alto are more than an octave apart, as are the alto and tenor—followed by a corrected version:

## Voice Crossing

![Example 6. A voice crossing error.](../media/2022/08/voice-crossing.png)*Example 6. A voice crossing error.*

<!-- lilylet-begin: media/2022/08/voice-crossing.png -->
Lilylet transcription of the example above ([voice-crossing.lyl](../lilylet/images/2022/08/voice-crossing.lyl)):

```lyl.play
[title "A voice-crossing error"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemUp b'2 ^\markup "Incorrect" \\
\staff "1" \stemDown d2 _\markup "alto lower than tenor!" \\
\staff "2" \clef "bass" \stemUp f2 \\
\staff "2" \stemDown g2
\addlyrics { "C: V⁷" } | %1

\staff "1" \stemUp b'2 ^\markup "Correct" \\
\staff "1" \stemDown d2 \\
\staff "2" \stemUp d2 \\
\staff "2" \stemDown g2
\addlyrics { "C: V⁷" } | %2
```
<!-- lilylet-end -->
The ranges of voices should not cross. In other words, the soprano must always be higher than the alto, the alto must always be higher than the tenor, and the tenor must always be higher than the bass. In Example 6, the alto and tenor voices are crossed. This error is also the most common between the alto and tenor voices.

## Doubling

![Example 7. A doubling error.](../media/2022/08/doubled_lt.png)*Example 7. A doubling error.*

<!-- lilylet-begin: media/2022/08/doubled_lt.png -->
Lilylet transcription of the example above ([doubled_lt.lyl](../lilylet/images/2022/08/doubled_lt.lyl)):

```lyl.play
[title "A doubling error"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemUp b'2 ^\markup "Incorrect" \\
\staff "1" \stemDown f2 _\markup "doubled leading tone!" \\
\staff "2" \clef "bass" \stemUp b2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: vii°⁶" } | %1

\staff "1" \stemUp d'2 ^\markup "Correct" \\
\staff "1" \stemDown f2 \\
\staff "2" \stemUp b2 \\
\staff "2" \stemDown d,2
\addlyrics { "C: vii°⁶" } | %2
```
<!-- lilylet-end -->
In a triad, the note in the bass is usually doubled in an upper voice. However, there is an exception to this: the leading tone is never doubled. Other tendency tones, such as chordal sevenths, are also never doubled. Seventh chords don’t have any notes doubled because they contain four notes, one for each voice part. Incorrect doubling is seen in the first measure of Example 7, where the leading tone is doubled, followed by a corrected voicing in the second measure.

> Assignments

Coming soon!

### Media Attributions

- Stemming © Megan Lavengood is licensed under a [CC BY-NC-SA (Attribution NonCommercial ShareAlike)](https://creativecommons.org/licenses/by-nc-sa/4.0/) license
- Wrong-notes © Megan Lavengood is licensed under a [CC BY-NC-SA (Attribution NonCommercial ShareAlike)](https://creativecommons.org/licenses/by-nc-sa/4.0/) license
- Range © Megan Lavengood is licensed under a [CC BY-NC-SA (Attribution NonCommercial ShareAlike)](https://creativecommons.org/licenses/by-nc-sa/4.0/) license
- Too-high © Megan Lavengood is licensed under a [CC BY-NC-SA (Attribution NonCommercial ShareAlike)](https://creativecommons.org/licenses/by-nc-sa/4.0/) license
- Spacing © Megan Lavengood is licensed under a [CC BY-NC-SA (Attribution NonCommercial ShareAlike)](https://creativecommons.org/licenses/by-nc-sa/4.0/) license
- Voice-crossing © Megan Lavengood is licensed under a [CC BY-NC-SA (Attribution NonCommercial ShareAlike)](https://creativecommons.org/licenses/by-nc-sa/4.0/) license
- Doubled\_lt © Megan Lavengood is licensed under a [CC BY-NC-SA (Attribution NonCommercial ShareAlike)](https://creativecommons.org/licenses/by-nc-sa/4.0/) license

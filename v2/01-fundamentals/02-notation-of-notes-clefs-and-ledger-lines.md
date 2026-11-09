---
title: "Notation of Notes, Clefs, and Ledger Lines"
slug: "notation-of-notes-clefs-and-ledger-lines"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/notation-of-notes-clefs-and-ledger-lines/"
authors: ["Chelsey Hamm"]
license: "CC BY-SA 4.0"
modified: "2026-06-17"
---

# Notation of Notes, Clefs, and Ledger Lines

> **Key Takeaways**
>
> - A note indicates both pitch and rhythm.
> - Notes are written on a staff. Notes with a higher frequency (shorter wavelength) are written higher on the staff than notes with a lower frequency (longer wavelength). That is, higher notes are placed above lower ones.
> - A notehead must be written carefully on a staff. A notehead is oval (not round); additionally, it should be neither too large nor too small, and it is tilted slightly upward toward the right.
> - The stems of notes can point either upward (on the right side of a note) or downward (on the left side of a note). For notes above the middle line, the stem points downward, and for notes below the middle line, stems point upward. Notes on the middle line can point in either direction, depending on the surrounding notes.
> - Writing seconds always involves displacing one note to the left or right of a stem. The lower note always goes on the left, regardless of whether the stem points up or down.
> - A clef indicates which pitches are assigned to the lines and spaces on a staff.
> - Extra lines (that are small) called ledger lines extend a staff higher or lower.

Western musical notation privileges two musical features: pitch and rhythm. Pitches are notated vertically (on the *y*-axis), while rhythms are notated horizontally (on the *x*-axis). Western musical notation is read left-to-right and top-to-bottom, like the page of a book in written English.

## Notation of Notes

A note indicates both pitch and rhythm. Each written note consists of a notehead (either empty or filled in) and may also have a stem and a beam or flag (see [Notating Rhythm](https://viva.pressbooks.pub/openmusictheory/chapter/rhythmic-rest-values/)). Example 1 shows an illustration of noteheads, stems, beams, and flags:

![Example 1. Noteheads, stems, beams, and flags.](../media/2019/05/noteillustration-1.png)*Example 1. Noteheads, stems, beams, and flags.*

## Staff Notation

A staff (plural “staves”) is essential for conveying pitch. A staff consists of five horizontal lines, evenly spaced, and each note is placed on the line or space that corresponds to its pitch (see [Clefs](#clefs) below). Example 2 depicts a staff:

![Example 2. A staff.](../media/2019/05/Staff.png)*Example 2. A staff.*

## Placing Notes on a Staff

Noteheads on a line should fill in half of each space above and below. Noteheads in a space should just touch the lines above and below. Example 3 shows examples of correct noteheads, both open and filled in, both on lines and in spaces:

![Example 3. Correct noteheads, open (white) and filled in (black), both on lines and in spaces.](../media/2022/07/Correct-Noteheads.jpg)*Example 3. Correct noteheads, open (white) and filled in (black), both on lines and in spaces.*

<!-- lilylet-begin: media/2022/07/Correct-Noteheads.jpg -->
Lilylet transcription of the example above ([Correct-Noteheads.lyl](../lilylet/images/2022/07/Correct-Noteheads.lyl)):

```lyl.play
[title "Correct noteheads: open and filled, on lines and in spaces"]

\omit Score.TimeSignature \clef "treble" e1 g b d f | %1

e'1 c a f | %2

e4 g b d f | %3

e'4 c a f \bar "||" | %4
```
<!-- lilylet-end -->
Noteheads should be oval (not round), and they are tilted slightly upward toward the right. Example 4 shows incorrect noteheads.[^1] As you can see, noteheads can be drawn too small, too big, or the wrong shape.

![Example 4. Incorrect examples of noteheads.](../media/2019/05/Incorrect-Noteheads.jpeg)*Example 4. Incorrect examples of noteheads.*

## Stems and Beams

The stems of notes can point either upward (on the right side of a note) or downward (on the left side of a note). For notes above the middle line, the stem points downward, and for notes below the middle line, stems point upward. Notes on the middle line can point in either direction, depending on the surrounding notes. This is shown in Example 5:

![Example 5. Correct stemming directions.](../media/2022/07/Stemming-Directions.jpg)*Example 5. Correct stemming directions.*

<!-- lilylet-begin: media/2022/07/Stemming-Directions.jpg -->
Lilylet transcription of the example above ([Stemming-Directions.lyl](../lilylet/images/2022/07/Stemming-Directions.lyl)):

```lyl.play
[title "Correct stemming directions"]

\omit Score.TimeSignature \omit Score.BarLine \clef "treble" f'4 e d c b a g f | %1
```
<!-- lilylet-end -->
Stemming directions and beaming conventions are discussed more in [Simple Meter and Time Signatures](10-simple-meter-and-time-signatures.md) and [Compound Meter and Time Signatures](11-compound-meters-and-time-signatures.md). When hand-drawing stems, their length is equal to four lines of the staff. Beams are about four times thicker than stems.

You can practice stemming directions by dragging and dropping in the following exercise:

> **Practice**
>
> 🧩 Interactive exercise (H5P): Stem Direction Matching, available in the [online edition](02-notation-of-notes-clefs-and-ledger-lines.md).

## Drawing Seconds

When notes at the interval of a second (see the [Generic Intervals](04-the-keyboard-and-grand-staff.md#generic-intervals) section of [The Keyboard and the Grand Staff](04-the-keyboard-and-grand-staff.md)) occur harmonically, they are on an adjacent line and space of the staff, so one note needs to be displaced to the left or right of the stem. The lower note always goes on the left, regardless of whether the stem points up or down. Example 6 shows the correct way to draw seconds:

![Example 6. Three correct seconds.](../media/2022/07/Correct-Seconds-1-e1657554954232.jpg)*Example 6. Three correct seconds.*

<!-- lilylet-begin: media/2022/07/Correct-Seconds-1-e1657554954232.jpg -->
Lilylet transcription of the example above ([Correct-Seconds-1-e1657554954232.lyl](../lilylet/images/2022/07/Correct-Seconds-1-e1657554954232.lyl)):

```lyl.play
[title "Three correct seconds"]

\omit Score.TimeSignature \omit Score.BarLine \clef "treble" <a' b>1 <d e>2 <e, f>2 | %1
```
<!-- lilylet-end -->
Seconds should not be stacked on top of one another, nor should the lower note be on the right, as seen in Example 7:

![Example 7. Three incorrect seconds.](../media/2022/07/Incorrect-Seconds-1-e1657554935562.jpg)*Example 7. Three incorrect seconds.*

Drawing seconds in seventh chords is discussed in [Seventh Chords](19-seventh-chords.md).

## Clefs

The notes drawn on the lines and spaces of a staff represent pitches. Musicians use spatial metaphors to describe notes placed on a staff: notes appearing toward the top of the staff are said to be “higher” than those toward the bottom, which are said to be “lower.” Higher pitches are produced by sound waves with a shorter wavelength (and consequently a higher frequency); sound waves with a longer wavelength (lower frequency) produce lower pitches.

For notes to convey pitch information beyond “higher” and “lower,” the staff on which they appear must include a clef. A clef indicates which pitches are assigned to the lines and spaces on a staff (see also [Reading Clefs](03-clefs.md)). The two most commonly used clefs today are the treble clef and bass clef. Two other clefs that you may encounter are the alto clef and the tenor clef. Example 8 shows the same pitch placed after the treble, bass, alto, and tenor clefs:

![Example 8. The same pitch placed after a treble, bass, alto, and tenor clef.](../media/2019/05/clefs.png)*Example 8. The same pitch placed after a treble, bass, alto, and tenor clef.*

Higher notes, such as those played by a flute or sung by a soprano, are usually written in treble clef, and lower notes, such as those played by a trombone or sung by a bass, are usually written in bass clef. Alto and tenor clefs are relatively rare compared to treble and bass. But in some cases, alto clef is used for medium-high notes, and tenor clef is used for medium-low notes.

## Drawing Clefs

One can draw a treble clef in three simple steps, as demonstrated in Example 9:[^2]

![Example 9. Drawing a treble clef in three steps.](../media/2019/11/DrawTrebleClef.png)*Example 9. Drawing a treble clef in three steps.*

1. Draw a slanted vertical line that extends slightly above and below the staff.
2. Draw a half circle that intersects with your slanted line at the second staff line from the top.
3. Circle around the second staff line from the bottom. Try to keep your circle within the bottom two spaces.

Likewise, one can also draw a bass clef in three steps, as shown in Example 10:

![Example 10. Drawing a bass clef in three steps.](../media/2019/11/DrawBassClef.png)*Example 10. Drawing a bass clef in three steps.*

1. Draw a dot on the second staff line from the top.
2. Draw a backward C that ends in the bottom space of the staff, making sure that the top part of the C does not extend above the staff.
3. Place two dots to the right of the backward C, centered respectively in the top two spaces of the staff.

One can draw an alto clef in four steps, as Example 11 shows:

![Example 11. Drawing an alto clef in four steps.](../media/2019/11/DrawAltoClef.png)*Example 11. Drawing an alto clef in four steps.*

1. Draw a thick vertical line that spans the staff.
2. Draw a thinner vertical line next to it.
3. Draw two backward Cs, the first taking up slightly less than the top half of the staff and the second taking up slightly less than the bottom half of the staff.
4. Connect these backward Cs with a point that rests on the middle line of the staff.

As seen in Example 12, the tenor clef is drawn the same way as the alto clef, just shifted up one line of the staff higher. The vertical lines in steps 1 and 2 begin on the second staff line from the bottom and extend slightly above the staff. The first backward C extends slightly above the top half of the staff, and the second takes up slightly less than the middle two spaces of the staff. The point connecting them rests on the second staff line from the top.

![Example 12. Drawing a tenor clef in four steps.](../media/2019/11/DrawTenorClef.png)*Example 12. Drawing a tenor clef in four steps.*

Sometimes when musicians draw the alto or tenor clef, they do so by writing the letter “K” as a form of shorthand. Example 13 shows this:

![Example 13. Using the letter “K” to draw the alto and tenor clefs.](../media/2022/07/K-Clefs.jpg)*Example 13. Using the letter “K” to draw the alto and tenor clefs.*

## Writing Ledger Lines

When notes are too high or low to be written on a staff, small lines called ledger lines are drawn to extend the staff. Example 14 shows ledger lines written above and below a staff:

![Example 14. Ledger lines, both above and below a staff with a bass clef.](../media/2019/05/ledger-lines-for-chelsey_0006.png)*Example 14. Ledger lines, both above and below a staff with a bass clef.*

Example 15 shows notes (with stems and beams) drawn on ledger lines, above and below a staff.

![Example 15. Notes (with stems and beams) on ledger lines, above and below a staff with a treble clef.](../media/2019/05/LedgerLineswithNotes.png)*Example 15. Notes (with stems and beams) on ledger lines, above and below a staff with a treble clef.*

<!-- lilylet-begin: media/2019/05/LedgerLineswithNotes.png -->
Lilylet transcription of the example above ([LedgerLineswithNotes.lyl](../lilylet/images/2019/05/LedgerLineswithNotes.lyl)):

```lyl.play
[title "Notes on ledger lines above and below the treble staff"]

\omit Score.TimeSignature \time 4/4 \clef "treble" f'8[ g a b] c[ d e f] | %1

e8[ d c b] a[ g f e] \bar "|." | %2
```
<!-- lilylet-end -->
When writing ledger lines, be sure not to put in an extra ledger line above or below the note you are writing. Example 16 first shows the correct way of writing notes on ledger lines, followed by the incorrect way, with extra ledger lines above and below the notes:[^3]

![Example 16. Correct and incorrect notation of ledger lines.](../media/2019/12/ch2-ex13-ledger_lines.jpg)*Example 16. Correct and incorrect notation of ledger lines.*

<!-- lilylet-begin: media/2019/12/ch2-ex13-ledger_lines.jpg -->
Lilylet transcription of the example above ([ch2-ex13-ledger_lines.lyl](../lilylet/images/2019/12/ch2-ex13-ledger_lines.lyl)):

```lyl.play
[title "Correct notation of ledger lines"]

\omit Score.TimeSignature \omit Score.BarLine \clef "treble" b''4^\markup "Correct" e d,, b \undo \omit Score.BarLine \bar "||" | %1
```
<!-- lilylet-end -->
> Further Reading

- 2001. “Ledger line.” *Grove Music Online*. <https://doi.org/10.1093/gmo/9781561592630.article.16296>.
- Gerou, Tom and Linda Lusk. 1996. *Essential Dictionary of Music Notation*. Los Angeles: Alfred.
- Gould, Elaine. 2011. *Behind Bars: the Definitive Guide to Music Notation*. London: Faber Music.
- Hiley, David. 2001. “Clef (i).” *Grove Music Online*.  <https://doi.org/10.1093/gmo/9781561592630.article.05927>.
- ——. 2001. “Staff.” *Grove Music Online*. <https://doi.org/10.1093/gmo/9781561592630.article.26519>.
- McGrain, Mark. 1986. *Music Notation*. Boston: Berklee Press.
- Roemer, Clinton. 1985. *The Art of Music Copying: The Preparation of Music for Performance*, 2nd edition. Sherman Oaks: Roerick Music Company.
- Straus, Joseph. 2022. *Elements of Music*. New York: Oxford.

> Online Resources

- [Pitch and Frequency (the Physics of Sound) (physicsclassroom.com)](https://www.physicsclassroom.com/Class/sound/u11l2a.cfm)
- [The Music Staff (essential-music-theory.com)](https://www.essential-music-theory.com/music-staff.html)
- [Drawing Notes (YouTube)](https://www.youtube.com/watch?v=zMwcJ6fPG-g)
- [Clefs (Music Notes Now)](https://www.musicnotes.com/now/tips/a-complete-guide-to-musical-clefs-what-are-they-and-how-to-use-them/)
- [Drawing Treble and Bass Clefs (YouTube)](https://www.youtube.com/watch?v=ZDGhR6EeKw4&feature=related)
- [Drawing C Clefs (Ultimate Music Theory)](https://ultimatemusictheory.com/draw-c-clef-signs/)
- [The Staff, Clefs, and Ledger Lines (musictheory.net)](https://www.musictheory.net/lessons/10)
- [Music Notation Style Guide (Indiana University)](https://blogs.iu.edu/jsomcomposition/music-notation-style-guide/)

> Assignments from the Internet

1. The Staff ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/11/0001_The_Staff.pdf))
2. Drawing Noteheads on Lines and Spaces, High and Low ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/11/0002_The_Staff_High_Low.pdf))

> Assignments

1. Writing Noteheads, Clefs, and Ledger Lines (with C clefs) ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2024/06/WK-Notation-of-Notes-Clefs-and-Ledger-Lines.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2024/06/WK-Notation-of-Notes-Clefs-and-Ledger-Lines.docx)). Asks students to practice handwriting elements of music notation.
2. Writing Noteheads, Clefs, and Ledger Lines (Treble and Bass clefs only) ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2024/08/WK-Notation-of-Notes-Clefs-and-Ledger-Lines-treble-bass.pdf), [.docx](https://viva.pressbooks.pub/app/uploads/sites/12/2024/08/WK-Notation-of-Notes-Clefs-and-Ledger-Lines-treble-bass.docx)). Asks students to practice handwriting elements of music notation.

### Media Attributions

- Noteheads, Stem, Beam, Flag © Bryn Hughes is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Staff © Chelsey Hamm is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Correct Noteheads © Megan Lavengood (adopted from Straus) is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Incorrect Noteheads © Megan Lavengood (adopted from Straus) is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Stemming Directions © Chelsey Hamm is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Correct Seconds © Megan Lavengood (adopted from Straus) is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Incorrect Seconds © Megan Lavengood (adopted from Straus) is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Four Clefs and Notes © Kris Shaffer (OMT) is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Draw Treble Clef © Chelsey Hamm is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Draw Bass Clef © Chelsey Hamm is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Draw Alto Clef © Chelsey Hamm is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Draw Tenor Clef © Chelsey Hamm is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- K Clefs © Chelsey Hamm is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Ledger Lines without Notes © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Ledger Lines with Notes © Chelsey Hamm is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Correct Incorrect Ledger Lines © Sarah Louden is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license

---

[^1]: Modeled after Joseph Straus, *Elements of Music* (New York: Oxford University Press, 2022), 2.
[^2]: For another perspective on drawing clefs, see Mark McGrain, *Music Notation* (Boston: Berklee Press, 1986), 13–15.
[^3]: Modeled after Straus, *Elements*, 3.

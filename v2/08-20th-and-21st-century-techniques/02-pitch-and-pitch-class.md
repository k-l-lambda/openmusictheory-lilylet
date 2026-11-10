---
title: "Pitch and Pitch Class"
slug: "pitch-and-pitch-class"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/pitch-and-pitch-class/"
authors: ["Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# Pitch and Pitch Class

> **Key Takeaways**
>
> - Set theory often relies on the distinction between pitch versus pitch class.
> - Pitch classes are best represented with integer notation, where C=0.

## Pitch

Pitches are discrete tones with individual frequencies.

The concept of pitch, then, does not imply octave equivalence. C<sub>4</sub> is a pitch, and it is not the same pitch as C<sub>3</sub>.

## Pitch Class

Throughout set theory, the word “class” means “group.” So a pitch class is a group of pitches—all pitches related by octave equivalence and enharmonic equivalence. You have probably encountered both of these concepts before, even if not by name.

Our system of letter names for notes implies octave equivalence: equivalence between pitches that are spelled the same but are any number of octaves apart. C<sub>4</sub> is the same as C<sub>3</sub> is the same as C<sub>9</sub>, and so on, because they are all Cs (Example 1).

When someone says “there are twelve notes,” they are implying enharmonic equivalence. Two notes are enharmonically equivalent if you would press the same key on the piano to play them—even if the spelling is different. Enharmonic equivalence is the sense in which A♭ and G♯ are “the same.” While tonal music nearly always distinguishes between enharmonic pitches—A♭ as *le* $(\downarrow\hat{6})$ leads to G, but G♯ as *si* $(\uparrow\hat{5})$ leads to A—post-tonal music is often different.[^1] Because many composers no longer felt constrained by a tonal center, the relationships among scale degrees and spellings aren’t important. 

In summary, pitch classes are groups of pitches related by octave and enharmonic equivalence. A♭<sub>4</sub>, A♭<sub>3</sub>, G♯<sub>2</sub>, etc. are all members of the same pitch class.

![pitch names on a line; an arrow connects two notes in different octaves and says "same pitch class, different pitch"](../media/2019/05/Pitch-Space.jpg)

Example 1. Pitch versus pitch class.

## Integer Notation

![Example 2. The twelve pitch classes represented as a clock face.](../media/2019/05/Pitch-class-Space.jpg)*Example 2. The twelve pitch classes represented as a clock face.*

If notes are enharmonically equivalent, then the system of seven letter names does not work well to describe the twelve pitch classes. Instead, in set theory, we use integer notation, which assigns a number between 0 and 11 to each pitch class (Example 2). All Cs, and any notes that are enharmonically equivalent to C (B♯, for example), are pitch class 0. All C♯s, and any notes that are enharmonically equivalent to C♯ (D♭, for example) are pitch class 1, and so on. To summarize with a few of the most common note names:

0. C (B♯, etc.)
1. C♯, D♭
2. D (C𝄪, etc.)
3. D♯, E♭
4. E (F♭, etc.)
5. F (E♯, etc.)
6. F♯, G♭
7. G (F𝄪, etc.)
8. G♯, A♭
9. A (G𝄪, etc.)
10. A♯, B♭
11. B (C♭, etc.)

> **Practice**
>
> Test your recall of integer names by filling in the blanks.
>
> 🧩 Interactive exercise (H5P): Note names to integers, available in the [online edition](02-pitch-and-pitch-class.md).

 

> Further reading

- Straus, Joseph N. 2016. *Introduction to Post-Tonal Theory*. 4th ed. Upper Saddle River, NJ: Prentice Hall.

> Resources

- [Blank clock faces (integer notation)](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-integers.pdf)
- [Blank clock faces (letter names)](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-letters.pdf)
- [Set Theory Quick Reference Sheet](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/INFO-set-theory-quick-reference-sheet.pdf): summarizes the definitions of pitch vs. pitch class, intervals vs. interval classes, and sets vs. set classes.

> Assignments

1. Pitch and pitch class (.[pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2021/08/WK-Pitch-and-Pitch-Class.pdf), .[mscz](../media/2021/08/WK-Pitch-and-Pitch-Class.mscz)). Asks students to translate between pitch class integers, note names, and staff notation.
   <!-- lilylet-begin: media/2021/08/WK-Pitch-and-Pitch-Class.mscz -->
   Lilylet transcription of WK-Pitch-and-Pitch-Class.mscz ([WK-Pitch-and-Pitch-Class.lyl](../lilylet/2021/08/WK-Pitch-and-Pitch-Class.lyl)):

   ```lyl.play
   [title "WK Pitch and Pitch Class"]
   [subtitle "Pitch and Pitch Class"]
   [staves "{s1-s2}"]

   \staff "1" \key c \major \clef "treble" s1 \bar "||" \\
   \staff "2" \clef "bass" ef,1^\markup "____"^\markup "PART 1: Converting Note Names to Integers\nFor each note name given below, write the correct pitch class integer (0 through 11).\n\n 1. D =    ____      2. B♭=  ____      3. E♭=  ____       4. F♯ =   ____      5. A =    ____      6. C♯ = ____\n\n 7. B =    ____      8. G =     ____   9. E♯ =   ____     10. D♭= ____     11. A♯ = ____     12. F =   ____\n\n13. D♯ = ____     14. G♭= ____     15. F♭= ____      16. B♯ =  ____     17. C =  ____      18. E =  ____\n\n19. G♯ = ____     20. C♭= ____      21. A♭= ____\n\nPART 2: Converting Notated Pitches to Integers\nFor each pitch notated below, write the correct pitch class integer (0 through 11) in the blank between\nthe staves."^\markup "1" | %1

   \staff "1" a'1^\markup "2"^\markup "____" \bar "||" \\
   \staff "2" s1 | %2

   \staff "1" s1 \bar "||" \\
   \staff "2" d,1^\markup "____"^\markup "3" | %3

   \staff "1" ff'1^\markup "4"^\markup "____" \bar "||" \\
   \staff "2" s1 | %4

   \staff "1" cs'1^\markup "5"^\markup "____" \bar "||" \\
   \staff "2" s1 | %5

   \staff "1" s1 \bar "||" \\
   \staff "2" af,1^\markup "____"^\markup "6" | %6

   \staff "1" s1 \bar "||" \\
   \staff "2" b,1^\markup "____"^\markup "7" | %7

   \staff "1" df1^\markup "8"^\markup "____" \bar "||" \\
   \staff "2" s1 | %8

   \staff "1" es'1^\markup "9"^\markup "____" \bar "||" \\
   \staff "2" s1 | %9

   \staff "1" b'1^\markup "10"^\markup "____" \bar "||" \\
   \staff "2" s1 | %10

   \staff "1" s1 \bar "||" \\
   \staff "2" cf,1^\markup "____"^\markup "11" | %11

   \staff "1" s1 \bar "||" \\
   \staff "2" gf1^\markup "____"^\markup "12" | %12

   \staff "1" s1 \bar "||" \\
   \staff "2" e,1^\markup "____"^\markup "13" | %13

   \staff "1" bf'1^\markup "14"^\markup "____" \bar "||" \\
   \staff "2" s1 | %14

   \staff "1" ff1^\markup "15"^\markup "____" \bar "||" \\
   \staff "2" s1 | %15

   \staff "1" s1 \bar "||" \\
   \staff "2" gs,1^\markup "____"^\markup "16" | %16

   \staff "1" bf'1^\markup "17"^\markup "____" \bar "||" \\
   \staff "2" s1 | %17

   \staff "1" f1^\markup "18"^\markup "____" \bar "||" \\
   \staff "2" s1 | %18

   \staff "1" s1 \bar "||" \\
   \staff "2" as,1^\markup "____"^\markup "19" | %19

   \staff "1" ds'1^\markup "20"^\markup "____" \bar "||" \\
   \staff "2" s1 | %20

   \staff "1" s1 \bar "||" \\
   \staff "2" c,1^\markup "____"^\markup "21" | %21

   \staff "1" \time 5/4 \omit Score.TimeSignature s4 s2 \stemDown ef''4 ef, \bar "||" \\
   \staff "2" \stemDown ef,4_\markup "pc 3" ds ds' s s | %22

   \staff "1" s1 s4 \bar "||" \\
   \staff "2" s1 s4 | %23

   \staff "1" s1 s4 \bar "||" \\
   \staff "2" s1 s4 | %24

   \staff "1" s1 s4 \bar "||" \\
   \staff "2" s1 s4 | %25

   \staff "1" s1 s4 \bar "||" \\
   \staff "2" s1 s4 | %26

   \staff "1" s1 s4 \bar "||" \\
   \staff "2" s1 s4 | %27
   ```
   <!-- lilylet-end -->

### Media Attributions

- Pitch Space © Bryn Hughes is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Pitch-class-Space © Bryn Hughes is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license

---

[^1]: Post-tonal music is extremely various. Composers have individual compositional styles, aesthetic goals, and unique conceptions of pitch. All this is to say that you must approach a composition with flexibility. For example: because it is quasi-tonal, Debussy’s music often benefits from a view that does not assume enharmonic equivalence. But sometimes it does. You must rely on your musical intuitions when analyzing this music, and you should also be willing to approach pitch in these compositions from multiple perspectives until you find one that seems most appropriate.

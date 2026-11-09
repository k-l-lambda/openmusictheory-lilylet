---
title: "Jazz Voicings"
slug: "jazz-voicings"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/jazz-voicings/"
authors: ["Megan Lavengood"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# Jazz Voicings

> **Key Takeaways**
>
> - Space chords to mimic the spacing of the harmonic series: use large, wide intervals in lower registers, and smaller, closer intervals in upper registers.
> - Extensions should be voiced in the higher voices.
> - If you double a note, usually double either the bass or the root of the chord.
> - Omitting the fifth of the chord is almost always perfectly acceptable.
> - Use smooth or “lazy” voice leading: move each voice as little as possible between chords to achieve a smooth, easy-to-perform sound. A common smooth voice-leading schema in jazz is to lead from the third of one chord to the seventh of the next, while another line connects the ninth of the first chord to the thirteenth of the second chord.
> - Guidelines can be ignored, but this should be a conscious and deliberate decision to achieve a desired effect.

So far in this unit, you have written chords in an unvoiced format. While unvoiced chords are useful for conceptualizing harmony, you would not want to perform these tall stacks of thirds. This chapter will discuss how to voice these harmonies in a manner that is idiomatic to jazz. We will focus on voicings that play the root in the left hand at all times so that the harmony is always clear, although in performance, the root is often omitted (because it is covered by the bassist).

## Spacing

The common spacing of chord members in musical textures has much to do with acoustics. We discuss pitches as specific frequencies—for example, A 440, the note to which most orchestras tune, refers to pitch A that has a frequency of 440 Hertz (Hz). But in fact, when an acoustic instrument plays A 440, 440 Hz is only one of the frequencies that is activated at that moment in time. The instrument will also activate the harmonics above that pitch, because the vibrating body causes other, shorter vibrations to occur simultaneously. These harmonics are part of what create an instrument’s unique timbre.

The harmonic series is approximated in Example 1. [^1]

![Example 1. The harmonic series, as approximated in notation.](../media/2019/08/harmonic-series_0001.png)*Example 1. The harmonic series, as approximated in notation.*

<!-- lilylet-begin: media/2019/08/harmonic-series_0001.png -->
Lilylet transcription of the example above ([harmonic-series_0001.lyl](../lilylet/images/2019/08/harmonic-series_0001.lyl)):

```lyl.play
[title "The harmonic series on F2, partials 1-16"]
[staves "{-}"]

\staff "1" \omit Score.TimeSignature \key c \major \time 16/4 \clef "treble" \staff "2" \clef "bass" f,,4 f' c' \staff "1" f a c ef f g a b c d ef e! f \undo \omit Score.BarLine \bar "||"
\addlyrics { 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 } | %1
```
<!-- lilylet-end -->
Note that the pitches are spaced widely apart in the lower harmonics, but become closer and closer together in the upper harmonics: the distance between partials 1 and 2 is an octave, but beginning at partial 13, the distance between subsequent partials is only a half step.

In general, spacing in music approximates the harmonic series: notes are further apart in lower registers, and closer together in higher registers. Putting notes close together in a low register tends to sound muddy and dissonant, even when the chords are consonant. When notes are spaced wide apart in the upper registers, the upper note will sound quite prominent and isolated in the texture (though this can sometimes be a good thing).

Remember that the bass line is probably played by the upright bass—and this instrument sounds an octave lower than written, so its lowest note is an E<sub>1</sub>, three Es below middle C. It’s normal for the bass to be in a register very much apart from the rest of the ensemble.

Chord [extensions](https://viva.pressbooks.pub/openmusictheory/chapter/lead-sheet-symbols#extensions) should be left in the upper registers of the texture. Recall that this is reflected in their names—a thirteenth is not the same as a sixth in jazz harmony. Voice the thirteenth somewhere above the seventh of the chord; otherwise, it will sound like the sixth.

## Doubling

In general, a safe note to double is the bass note. Most often, the bass note is a relatively stable member of the chord. Because it’s the foundation of the texture, it sounds good to double the bass.

Another good option is to double the root of the chord, even if it is not in the bass. The root note, like the bass, is typically a stable tone, and will strengthen the chord when doubled.

## Omitting Notes

Jazz harmonies often contain many notes, thanks to the common practice of extending the harmonies. It often wouldn’t be desirable for all these notes to be given equal weight in the voicing, so it’s common to omit some notes when voicing these extended harmonies.

The most common note to omit is the fifth of the chord. Because the fifth is an early pitch in the harmonic series (partial 3), it tends to strengthen the root of the chord without adding much character on its own. Listen and compare the various chords in Example 2, and notice that removing the fifth does very little to alter the overall sound of the chord, whereas omitting the seventh or root alters the sound substantially!

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/5689622)

Example 2. Omitting the fifth is common, as it does not substantially alter the sound. The seventh and root are hardly ever omitted.

Omitting the root runs the risk of destabilizing the entire chord. However, if there is a bass player in the performing ensemble, you may deliberately omit the root in the other voices. The bassist will typically provide the root of the harmony and ensure that the chord sounds stable. The last chord in Example 2, then, would sound just fine if a bassist were playing a G below that voicing.

When dealing with extended chords, it becomes possible or desirable to omit other members of the chord besides the fifth, but it is difficult to generalize here. Usually, omitting tones is done to avoid excessive dissonance with other important chord members.

## Smooth Voice Leading

We have been discussing harmonies as vertical entities so far: as a stack of notes that go bottom-to-top on the page. Vertical thinking is used a lot in music theory and by pianists and guitarists, but for almost everyone else, music is experienced horizontally: as a sequence of notes in time. It’s important for musicians to be able to think of music both vertically *and* horizontally through voice leading.

Voice leading in jazz and many other styles should generally be smooth—that is, voices should ideally move as little as possible when going to a new chord (except the bass, which often leaps). Smooth voice leading helps different chords sound more logically connected (Example 3). When writing your own chord progressions, it may be helpful to imagine your voices as lazy: they want to move as little as possible! The smallest possible move is the common tone: not moving at all, but instead remaining on a single tone that is common to both chords. The next most preferable movement is movement by whole or half step. Skips (movement by third) are also easy to perform and easy to sing, and there are many situations that will force you to skip when voice leading.

Leaps are primarily used to provide contrast and excitement in voice leading. They are to be used sparingly, and with good reason. Leaps sound most natural when they are within a single chord: because the chord underpinning the horizontal movement is staying the same, it’s easy for the voice to leap within that chord. When the chord is changing, though, adding leaps tends to make the chords sound disconnected and can make the piece difficult to perform. Leaping over a chord change is certainly possible, but it may take extra practice, and remember: your voices are lazy!

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8514797/s/3GztpI)

Example 3. Smooth voice leading helps chords sound connected to one another.

## Jazz Voice Leading Paradigms

Throughout the Jazz section of the textbook, we will assume that the bass is playing the root of the chord at all times. So when discussing jazz voice leading, we will focus instead on the upper voices only.

### Two upper voices: the 3–7 voice leading paradigm

If you are writing for only two voices above the bass, you should typically use the third and seventh of the chord (omitting the fifth). This produces smooth voice leading between any two chords whose roots are related by fifth or by second. as illustrated in Example 4. If the two chords are related by fifth (e.g., C<sup>7</sup>–F<sup>7</sup> or G<sup>7</sup>–Cma<sup>7</sup>), then one voice will alternate between the third and the seventh of the chord, and the other voice will do the same but in the opposite order. If the two chords are related by second, then the voices would move in parallel motion, and one voice would play the thirds of each chord while the other voice plays the sevenths of each chord. Notice that this yields only two kinds of intervals in the right hand: fourths and fifths.

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/11095687/s/HZz7a0)

Example 4. The 3–7 voice leading paradigm as applied to a ii–V–I progression (left) and a V–IV–I progression (right).

### Three upper voices: adding extensions

A beginner may want to add the chord fifths when incorporating a third upper voice, but a more stylistically appropriate option is often to add extensions to the chord and continue to omit the chordal fifth. In particular, we can build on the two-voice 3–7 paradigm by adding a third line on top that alternates between ninths and thirteenths. Example 5 duplicates the voice leading from Example 4, but adds this third voice.

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/11096065)

Example 5. A paradigm for jazz voicing with three upper voices. The two lower voices use the 3–7 paradigm; another smooth line is formed by adding a top voice connecting ninths and thirteenths (shown in blue).

Extensions are often altered from their default major quality. It can be difficult for a beginner to know when to alter extensions. As a starting point, try the extension that fits within the overall key, as in Example 5—note that there are no accidentals added in the top voice. If the diatonic version of the extension sounds awkward, experiment with raising or lowering the extension, and let your ear be your guide in choosing which variation of the extension sounds best. Example 6, which [you may also download as a handout](https://viva.pressbooks.pub/app/uploads/sites/12/2019/08/Common-chord-ext.pdf), demonstrates the most common extensions for chords of certain qualities, organized from simple to complex. But you shouldn’t randomly select from these options—what sounds most fitting often depends on the surrounding chords, not just the quality of that chord alone. Experimenting with these extensions will help a beginner to develop a sense of what sounds most stylistic.

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8514740)

Example 6. Common extensions to add for each chord quality.

## Guidelines versus Rules

Most of the above principles are not really rules that you must follow, but rather guidelines for writing stylistically. The guidelines here represent what is most common in jazz music.

Guidelines are not always followed, but knowing them empowers you to *choose*not to follow them with the full understanding of the resulting sound. In other words, feel free to break the rules, but make sure you know why you’re doing it!

> Further reading

- Coker, Jerry. 1984. *Jazz Keyboard for Pianists and Non-Pianists: Class or Individual Study*. Miami: Alfred Music.

> Resources

- [Common chord symbols with extensions handout](https://viva.pressbooks.pub/app/uploads/sites/12/2019/08/Common-chord-ext.pdf), by Brendan Schnabel.

> Assignments

1. Voicing worksheet ([.pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/08/WK-voicing.pdf), [.mscz](../media/2019/08/WK-voicing.mscz)). Asks students to identify common voice leading patterns in a voiced jazz texture and to write voiced chord progressions with good voice leading.
   <!-- lilylet-begin: media/2019/08/WK-voicing.mscz -->
   Lilylet transcription of WK-voicing.mscz ([WK-voicing.lyl](../lilylet/2019/08/WK-voicing.lyl)):

   ```lyl.play
   [title "Jazz Voicings"]
   [composer "Megan Lavengood and Kyle Gullings"]
   [staves "s1,{s2-s3}"]

   \key c \major \numericTimeSignature \time 4/4 \clef "treble" r8 \chords "_____" \stemUp d e4 fs d \\\
   \staff "1" \clef "treble" <c e fs a>1 \\
   \staff "2" \clef "bass" d,1 | %1

   \staff "1" \stemUp a'4 fs \stemDown b \stemUp a \\\
   \staff "1" r8 \stemUp <c e fs a>4. r2 \\
   \staff "2" r8 \stemDown d,4. r2 | %2

   \staff "1" \stemDown d'2 \stemUp a8 fs4 d8~ \\\
   \staff "1" <c e fs a>1~ \\
   \staff "2" d,1~ | %3

   \staff "1" d1 \\\
   \staff "1" \stemUp <c e fs a>2. <c e fs a>4 \\
   \staff "2" \stemDown d,2. d4 | %4

   \staff "1" \stemUp d4 \chords "_____" e f d \\\
   \staff "1" <b e f a>1 \\
   \staff "2" g,1 | %5

   \staff "1" \stemUp a'8[ a] f4 \stemDown b8 \stemUp a4 \stemDown d8~ \\\
   \staff "1" \stemUp <b e f a>2. r8 <b e f a>~ \\
   \staff "2" \stemUp g,2. r8 g~ | %6

   \staff "1" \stemDown d'2 \stemUp \grace { as8( \stemDown } b4) \stemUp a8[ g~] \\\
   \staff "1" <b e f a>1~ \\
   \staff "2" g,1~ | %7

   \staff "1" \stemUp g'2. r4 \\\
   \staff "1" \stemUp <b e f a>2. <b e f a>4 \\
   \staff "2" \stemUp g,2. g4 | %8

   \staff "1" r8 \chords "_____" \stemUp c[ d c] \grace { ds( } e4) c8[ g'] \\\
   \staff "1" <bf d e a>1 \\
   \staff "2" c,,1 | %9

   \staff "1" r8 \stemUp e4 e8 a4 g \\\
   \staff "1" \stemUp <bf d e a>2 r \\
   \staff "2" \stemUp c,,2 r | %10

   \staff "1" \stemDown c'2 \stemUp g8 e4 c8~ \\\
   \staff "1" <bf d e a>1 \\
   \staff "2" c,,1 | %11

   \staff "1" \stemUp c4. c8 d[ c d c] \\\
   \staff "1" <bf d e a>1 \\
   \staff "2" c,,1 | %12

   \staff "1" \stemUp a'4 \chords "_____" a8[ a~] a2 \\\
   \staff "1" \stemUp <a c e g>2. <a c e g>4 \\
   \staff "2" \stemUp f,,2. f4 | %13

   \staff "1" r4 \chords "_____" r8 \stemUp c d[ c d c] \\\
   \staff "1" <a c d f>1 \\
   \staff "2" f,,1 | %14

   \staff "1" \stemUp a'2. \chords "_____" \tuplet 3/2 { f8[ e d] } \\\
   \staff "1" <bf d g a>1 \\
   \staff "2" e,,1 | %15

   \staff "1" \tuplet 3/2 { cs8[ e g] } \chords "_____" \stemDown bf4 \stemUp a2 \\\
   \staff "1" \stemUp <bf cs e g>2 <cs e g bf> \\
   \staff "2" \stemUp a,2 a | %16

   \staff "1" \stemUp d8[ \chords "_____" d] e4 fs d \\\
   \staff "1" <c e fs b>1 \\
   \staff "2" d,,1 | %17

   \staff "1" \stemUp a'8 fs4 \stemDown b \stemUp a \stemDown d8~ \\\
   \staff "1" \stemUp <c e fs b>8 r r4 r2 \\
   \staff "2" \stemUp d,,8 r r4 r2 | %18

   \staff "1" \stemDown d'2 \stemUp a4 fs8[ d~] \\\
   \staff "1" <c e fs b>1~ \\
   \staff "2" d,,1~ | %19

   \staff "1" d1 \\\
   \staff "1" \stemUp <c e fs b>2. <c e fs b>4 \\
   \staff "2" \stemUp d,,2. d4 | %20

   \staff "1" \stemUp d4 \chords "_____" e f8 d4 a'8~ \\\
   \staff "1" <b e f a>1 \\
   \staff "2" g,1 | %21

   \staff "1" \stemUp a'8 f4 \stemDown b8~ b \stemUp a4. \\\
   \staff "1" \stemUp <b e f a>2. r8 <b e f a>~ \\
   \staff "2" \stemUp g,2. r8 g~ | %22

   \staff "1" \stemDown d'2 b4 \stemUp a8[ g~] \\\
   \staff "1" <b e f a>1~ \\
   \staff "2" g,1~ | %23

   \staff "1" g'1 \\\
   \staff "1" \stemUp <b e f a>2. <b e f a>4 \\
   \staff "2" \stemUp g,2. g4 | %24

   \staff "1" \stemUp gs'8[ \chords "_____" a a f] a4. a8 \\\
   \staff "1" <c e f a>1 \\
   \staff "2" d,,1 | %25

   \staff "1" \tuplet 3/2 { a'8[ g e] } \chords "_____" \stemUp bf'8[ a~] a2 \chords "_____" \\\
   \staff "1" \stemUp <bf d e a>2 <b cs e g> \\
   \staff "2" \stemUp e,,2 a | %26

   \staff "1" r8 \chords "_____" \stemUp a'4. a4 a \\\
   \staff "1" \stemUp <c e f a>2 \stemDown <c' e f a> \\
   \staff "2" d,,1 | %27

   \staff "1" \stemUp g'8 \chords "_____" e4 a8~ a2 \chords "_____" \\\
   \staff "1" \stemDown <bf' d e a>2 <b cs e g> \\
   \staff "2" \stemUp e,,2 a | %28

   \staff "1" \stemUp c4 \chords "_____" d f \chords "_____" g8[ a] \\\
   \staff "1" \stemDown <a' d ef g>2 <gs cs d fs> \\
   \staff "2" \stemUp f,,2 e | %29

   \staff "1" \stemDown c'8[ \chords "_____" b c cs] d \chords "_____" \stemUp a4. \\\
   \staff "1" \stemDown <g' c df f>2 <fs b c e> \\
   \staff "2" \stemUp ef,,2 d | %30

   \staff "1" r4 \chords "_____" \stemUp g' \stemDown c8 \chords "_____" \stemUp a4 f8~ \\\
   \staff "1" \stemUp <f a b e>2 <e a bf d> \\
   \staff "2" \stemUp g,2 c | %31

   \staff "1" f1 \chords "_____" \bar "|." \\\
   \staff "1" \stemUp <e f a c>2 r \bar "|." \\
   \staff "2" \stemDown f,2 r | %32

   \staff "1" \key d \major <g' b d fs>1^\markup "Did you remember to do both parts of the analysis? (refer to the instructions!)"^\markup "unvoiced" \\\
   \staff "1" <fs b e>1_\markup "voiced" \chords "Gma7" \\
   \staff "2" g,1 | %33

   \staff "1" s1 \\\
   \staff "1" s1 \chords "C#ø7" \\
   \staff "2" s1 | %34

   \staff "1" s1 \\\
   \staff "1" s1 \chords "F#7" \\
   \staff "2" s1 | %35

   \staff "1" s1 \bar "||" \\\
   \staff "1" s1 \chords "Bmi(ma7)" \bar "||" \\
   \staff "2" s1 | %36

   \staff "1" \key f \major <g' bf d f>1^\markup "unvoiced" \\\
   \staff "1" <bf' f' a>1 \chords "Gmi7" \\
   \staff "2" g,1^\markup "voiced" | %37

   \staff "1" s1 \\\
   \staff "1" s1 \chords "Db7" \\
   \staff "2" s1 | %38

   \staff "1" s1 \\\
   \staff "1" s1 \chords "C7" \\
   \staff "2" s1 | %39

   \staff "1" s1 \bar "||" \\\
   \staff "1" s1 \chords "F6" \bar "||" \\
   \staff "2" s1 | %40
   ```
   <!-- lilylet-end -->

### Media Attributions

- Harmonic series © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license

---

[^1]: The notes of the harmonic series do not conform to twelve-tone equal temperament, but they have been notated at the nearest pitch for the sake of convenience.

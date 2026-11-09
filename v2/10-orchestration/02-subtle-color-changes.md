---
title: "Subtle Color Changes"
slug: "subtle-color-changes"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/subtle-color-changes/"
authors: ["Mark Gotham"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# Subtle Color Changes

> **Key Takeaways**
>
> The previous chapter dealt with some important but relatively unsubtle color changes. Here, we hone in on some of the finer methods for making detailed changes of this kind, organizing the chapter around the apparent motivations for these changes, seeking to create:

## For a timbral cadence

Apart from changing the timbral distribution between sections (after a cadence), some composers make changes for the cadence itself, emphasizing the cadential moment. This is related to the more formal considerations of holding back a timbre discussed [in the previous chapter](01-core-principles-of-orchestration.md).

Classical-era orchestral composers sometimes used wind parts in this way. Here’s an example from the opening of Mozart’s Piano Concerto K453, movement 3. The strings begin, and the timbral cadences are marked by the addition of winds (Example 1).

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/24655597)

Example 1. Changing the orchestration at the cadence highlights the cadence.

[Mozart K453](https://viva.pressbooks.pub/app/uploads/sites/12/2019/07/Ai-Mozart-K453.pdf)

Shostakovich provides some extraordinary 20<sup>th</sup>-century examples of this device. Consider the end of Shostakovich 11/iii. The outer sections of this movement are effectively one long viola solo, and the timbral addition of unison violins at the end is integral to formalizing the end of the theme. The melodic contour and discontinuation of the countersubject are also contributing, but the harmony is deeply ambiguous. In the following recording, the theme plays from 0’50” and the timbral cadences fall at the ends of the sections (4’50” and 12’40”).

🎧 [Spotify: Spotify Embed: Symphony No. 11 in G Minor, Op. 103, "The Year 1905": III. In Memoriam](https://open.spotify.com/track/75N4wFxecJ1tPdy4Jvc2d1)

This device is not unique to orchestral music. For instance, Blink 182 uses the same effect to close verses in the song “I Miss You”: here the timbral cadence is achieved by the addition of the other vocalist (e.g., at 0’55”).

## To finesse a structural boundary

Timbral additions can also be used in the opposite sense: to finesse a structural boundary and actively connect the two sections. This is a favored device of Brahms. Brahms 2/iii opens with a gracious oboe theme, and it is the return of the oboe (in tandem with motivic handling and other matters) that finesses the return to the A section at m. 101/107.

[Brahms 2 iii](https://viva.pressbooks.pub/app/uploads/sites/12/2019/07/Brahms-2-iii-2-extracts.pdf)

It is the oboe again that Brahms adds to round out the first cadence of Brahms 4/i. (Note also the cello-viola dovetailing here.)

[Brahms 4 i](https://viva.pressbooks.pub/app/uploads/sites/12/2019/07/Brahms-4-i.pdf)

## For the “attack-sustain” (“resonance”) effect

One technique beloved of 20<sup>th</sup>-century composers is the “attack-sustain” or “resonance” effect. Acoustics teaches us that the very start of a note has a very different profile from the rest, and composers seem to be striving for something similar in orchestral writing that casts some instruments in an “attacking” role (shorter notes at the start) and others as “sustain” (longer notes starting together on the same pitches).

Examples abound and are not limited to the 20<sup>th</sup> century. For instance:

- Mozart: Magic Flute overture. When the brass parts enter, the horns are long, while the trumpets and trombones are short.
- Mozart: Dies Irae (from the Requiem): again, trumpets and drums are short; others long.
- Beethoven: [The opening of Symphony 1/i](https://imslp.org/wiki/Symphony_No.1,_Op.21_(Beethoven,_Ludwig_van)) is an iconic example, and not only for the extraordinary harmonies. The winds’ ***fp*** chords achieve the attack-sustain pair on their own, and are enhanced by string pizzicato (attack only).

In the 20th century, Schoenberg’s groundbreaking “Farben” (no. 3 from *Five Orchestral Pieces*) includes this effect (e.g., see the harp at reh. 2), and Britten uses it to magnificent effect in movement iii of the Four Sea Interludes. Play the following example from c. 0’45”.

🎧 [Spotify: Spotify Embed: Britten: Four Sea Interludes from Peter Grimes, Op. 33a: No. 3, Moonlight](https://open.spotify.com/track/6DEBxm5XrqUfvkqH1Pc3OR)

Britten uses penetrating instruments for the attacks (including the harp again) and sets the resonance on sustained flute lines, as shown in this small excerpt:

![“Attack-sustain” detail from Britten’s Four Sea Interludes](../media/2019/07/Ciii-Britten.png)*“Attack-sustain” detail from Britten’s *Four Sea Interludes**

<!-- lilylet-begin: media/2019/07/Ciii-Britten.png -->
Lilylet transcription of the example above ([Ciii-Britten.lyl](../lilylet/images/2019/07/Ciii-Britten.lyl)):

```lyl.play
[title "Four Sea Interludes: attack-sustain detail (flutes and harp)"]
[composer "Benjamin Britten"]
[staves "<f1-f2>,{h1-h2}"]
[instrument-f1 "Fl.1"]
[instrument-f2 "Fl.2"]
[instrument-h1-h2 "Harp"]

\key ef \major \numericTimeSignature \time 2/2 \clef "treble" \tuplet 3/2 { bf''8->\f[ bf,->] r } r4 r2 \\\\
\clef "treble" \tuplet 3/2 { bf'4\portato\pp bf8->~ } bf2.~ \\\\
\staff "1" \clef "treble" \tuplet 3/2 { bf''8->\f[ bf,] s8 } r4 r2 \\
\staff "2" \clef "treble" \tuplet 3/2 { s8 s bf^\markup "o" } r4 r2 | %1

R1 \\\\
bf'2 r \\\\
\staff "1" R1 \\
\staff "2" R1 | %2

\tuplet 3/2 { bf''8->\f[ bf,->] r } r4 r2 \\\\
\tuplet 3/2 { bf'4\portato\pp bf8->~ } bf2.~ \\\\
\staff "1" \tuplet 3/2 { bf''8->\f[ bf,] s8 } r4 r2 \\
\staff "2" \tuplet 3/2 { s8 s bf^\markup "o" } r4 r2 | %3

R1 \\\\
bf'1~ \\\\
\staff "1" R1 \\
\staff "2" R1 | %4

R1 \\\\
bf'2 r \\\\
\staff "1" R1 \\
\staff "2" R1 | %5

\tuplet 3/2 { c''8->[ c,->] r } r4 \tuplet 3/2 { af''8->[ af,->] r } r4 \\\\
\tuplet 3/2 { c'4\portato c8->~ } c4 \tuplet 3/2 { af'4\portato^\markup "[portato]" af8->~ } af4~ \\\\
\staff "1" \tuplet 3/2 { c''8->[ c,] s8 } r4 \tuplet 3/2 { af''8->[ af,] s8 } r4 \\
\staff "2" \tuplet 3/2 { s8 s c^\markup "o" } r4 \tuplet 3/2 { s8 s af'^\markup "o" } r4 | %6

r2 \tuplet 3/2 { c''8->[ c,->] r } r4 \\\\
af''2 \tuplet 3/2 { c,4\portato c8->~ } c4 \\\\
\staff "1" r2 \tuplet 3/2 { c''8->[ c,] s8 } r4 \\
\staff "2" r2 \tuplet 3/2 { s8 s c^\markup "o" } r4 | %7

\tuplet 3/2 { bf''8->[ bf,->] r } r4 r2 \\\\
\tuplet 3/2 { bf'4\portato bf8->~ } bf2. \\\\
\staff "1" \tuplet 3/2 { bf''8->[ bf,] s8 } r4 r2 \\
\staff "2" \tuplet 3/2 { s8 s bf^\markup "o" } r4 r2 | %8
```
<!-- lilylet-end -->
(Note the octave transposition of the harp harmonics.) Later in the movement (around reh. 3), the same device appears with xylophone and piccolo on attack, and trumpet sustaining.

This practice is related to the wider device of employing different articulations on doublings of the same melodic line. Clear examples include:

- Debussy: *La Mer* / iii (fig. 55). The oboe has repeated notes; the flute does not.
- Sibelius: *En Saga*: m. 189, (viola pizz. + arco); m. 290 (trumpet staccato with oboe legato), then oboe with viola.

This, in turn, is related to the practice of having string parts play melodies tremolo for loud sections as seen in the Grieg example [from the previous chapter](https://viva.pressbooks.pub/openmusictheory/chapter/introduction-and-core-principles/).

## For a seamless orchestral crescendo

That Grieg example displayed the kind of step-by-step orchestral crescendo that some composers turned into an extremely subtle process. Consider the following example of two extracts from Wagner’s *Parsifal*. The melody is in unison, and in both cases, a timbre is added at the top of the crescendo. In both cases, a higher, brighter version of an instrument already in the mix is added. In the second case, this is partly for registral reasons (the oboe replaces the bassoon in a high register); in both cases it transforms the sound, very subtly adding a timbral dimension to mark the moment in question.

[Wagner – Parsifal extracts](https://viva.pressbooks.pub/app/uploads/sites/12/2019/07/Wagner-Parsifal-2-extracts.pdf)

Once again, it falls to the 20<sup>th</sup> century to furnish us with the truly iconic example of this process. Listen to this short crescendo from niente from Berg’s *Wozzeck* (preferably on good speakers, and having warned the neighbors!). Dramatically, this is the murder scene; musically, it is one huge orchestral crescendo on the pitch B<sub>3</sub>. See if you can pick out some of the successively entering instruments, and then scroll down for the answer.

🎧 [Spotify: Spotify Embed: Wozzeck, Op. 7 / Act 3: Verwandlung - Orchester-Überleitung](https://open.spotify.com/track/32FLHdpetPyACpyuOM6tIY)

This reduction sets out the process:

![Summary of the instrument entrances in the B3 unison of Berg’s Wozzeck](../media/2019/07/Diii-Berg-Wozzeck.png)*Summary of the instrument entrances in the B3 unison of Berg’s *Wozzeck**

<!-- lilylet-begin: media/2019/07/Diii-Berg-Wozzeck.png -->
Lilylet transcription of the example above ([Diii-Berg-Wozzeck.lyl](../lilylet/images/2019/07/Diii-Berg-Wozzeck.lyl)):

```lyl.play
[title "Extract from Wozzeck, Murder Scene"]
[subtitle "All parts sustain B3 until the chord at the end of the passage. Order of instruments' entry as given."]
[composer "Alban Berg"]
[staves "[w-b-s]"]
[instrument-w "Wind"]
[instrument-b "Brass"]
[instrument-s "Strings"]

\omit Score.TimeSignature \key c \major \time 4/4 \clef "alto" R1 \\\\
\clef "alto" r2 b2\pppp\< \addlyrics { "Solo Hn" } \addlyrics { "(muted)" } \\\\
\clef "alto" r2 r4 b4 \addlyrics { Solo } \addlyrics { "1st Vln" } \addlyrics { "(muted)" } | %1

b2.~ b4 \addlyrics { BCl "4 Cl" } \\\\
R1 \\\\
r4 b2. \addlyrics { Tutti } \addlyrics { "1st Vln" } | %2

r2. b4 \addlyrics { "4 Ob" } \\\\
b1 \addlyrics { "3 Hn" } \\\\
b4~ b2.~ \addlyrics { Solo Solo } \addlyrics { Vla Vc } | %3

r2 r8 b4.~ \addlyrics { "3 Bsn" } \\\\
r2 b8[ b] b4~ \addlyrics { "4 Tpt" _ "4 Tbn" } \addlyrics { _ B.Tbn _ } \\\\
b2.~ b8[ b] \addlyrics { Tutti Tutti Tutti } \addlyrics { "2nd Vln" Vla Vc } | %4

b1\fermata^\markup "fff Chord: full register; addition of 4 picc, C Bsn, B.D. solo" \\\\
b1\fermata\!\fff \\\\
b1\fermata \addlyrics { Db } | %5
```
<!-- lilylet-end -->
In a landmark book about sound spectra, Robert Cogan described the beginning of this passage as “almost entirely fundamental”: that is, almost a pure sine wave, with strictly minimized upper partials. We begin ***pppp*** with the muted French horn: an entirely appropriate choice in that it has the least spectrally active sound available in the standard symphony orchestra and, partly by definition, also the most distant one. Not only do the players sit near the back, but their instrument projects the sound backwards, further increasing the distance and ensuring that the majority of the audience hears primarily wall-reflected sound. Between this and the use of a mute, a great deal of high-register spectral content is removed, leaving that nearly pure fundamental. The mute on the solo violin, which is next to enter, has a similar spectral-auditory effect. When the bass clarinet joins the sound, some higher spectra are introduced, though few, as the instrument is high in its range and produces only odd-numbered partials. What follows continues this crescendo not only of sound, but of instrument types and spectral content. Naturally, the heavy brass are last to enter, burnishing the end to this spectral progression with brilliance.

## For timbrally nuanced melodies

Finally, many composers since around 1900 have used timbral variation to create a kind of “kaleidoscope” melody. This is most commonly known as *Klangfarbenmelodie* (“sound-color melody”). The term *Klangfarbenmelodie* was coined by Schoenberg in his *Harmonielehre*(1911) and employed most notably in his “Farben” (no. 3 from *Five Orchestral Pieces*). It is also related to musical pointillism, in which one melody passes among many instruments to color a single line. Examples include Webern’s iconic *Konzert*, Op. 24, in which timbre helps to articulate the structural divisions of the row (about this, see [this chapter](../09-twelve-tone-music/04-twelve-tone-analysis-examples-webern-op-21-and-24.md)), but also in a great deal of Mahler. See, for instance, [this example](https://viva.pressbooks.pub/app/uploads/sites/12/2019/07/Eiv-Mahler-7-Scherzo.pdf) from the beginning of Mahler 7/iii, in which a pointillist start begins to coalesce.

We’ll end this chapter with an extraordinary example: Webern’s orchestration of Bach’s *Ricercata*from the Musical Offering. The work is at once a faithful, note-for-note transcription of the original and an analysis-by-orchestration of its motives and melodic contour. It is more of a compositional orchestration than an arrangement or transcription per se. The image below provides a reduction of the exposition. There is a staff for each presentation of the theme (corresponding to the six entrances of the fugal voices).

[A Musical Offering](https://viva.pressbooks.pub/app/uploads/sites/12/2019/07/A-Musical-Offering-Full-Score.pdf)

Webern’s instrumental distribution of the fugal subject theme follows a palindromic, possibly even double palindromic design. Dotted lines beneath each staff demonstrate the first, primary, clear and consistent palindrome; those over the top set out the second, which is not so consistently used, and which may be less effective in accounting for the last two instrumental choices than the square brackets that illuminate how these two instruments often repeat an earlier pairing. The asterisks above the staff indicate notes doubled by the harp, the first of which serves to articulate the first timbral recurrence (initiating the palindrome), while the latter two identify the end of the theme. The diagonal arrows further speculate on the possible relation between the successive instrumental timbres of the first answer and those that begin the next two subject-answer statements.

Finally, the last two systems show how Sofia Gubaidulina’s violin concerto *Offertorium*takes up this double palindromic instrumentation of Bach’s theme. That timbral design is not consistent throughout  (hence only presenting the first two instances of the theme), but instead relates to an overall formal process that truncates one note from the beginning and end of the theme at each successive presentation. This continues up to a central point, after which the process is symmetrically reversed.

🎧 [Spotify: Spotify Embed: Violin Concerto No. 1 "Offertorium"](https://open.spotify.com/track/4NgIfVEcWGKio97hyJQpp0)

Clearly these are highly specific modernist examples in which symmetry is paramount, but again, we can see pre-echoes of this kind of idea in pre-20<sup>th</sup>-century music. For instance, there are symmetrical timbral schemes in:

- Schubert 8/ii: the melody moves from the clarinet (in minor) to oboe (major) in the exposition; the process is reversed in the recapitulation (oboe-clarinet).
- Brahms 3/iii: the theme and accompaniment move from strings to winds in the first section and from winds to strings in the reprise.

Both cases reflect their larger forms just as Webern and Gubaidulina do.

> Assignments

1. Coming soon!

### Media Attributions

- Ciii Britten
- Diii Berg Wozzeck

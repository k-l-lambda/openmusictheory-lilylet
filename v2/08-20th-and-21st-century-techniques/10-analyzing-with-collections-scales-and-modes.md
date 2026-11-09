---
title: "Analyzing with Modes, Scales, and Collections"
slug: "analyzing-with-collections-scales-and-modes"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/analyzing-with-collections-scales-and-modes/"
authors: ["Mark Gotham"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# Analyzing with Modes, Scales, and Collections

> **Key Takeaways**
>
> So far, most of our discussion has focused on defining modes, collections, and their properties. As always, there is much more to analyzing with these materials than simply knowing terms. This chapter provides some guidance on how to go from theory to practice.
>
> *Please note that this book covers modes from many different angles. For more information on modes, check [Introduction to Diatonic Modes (general)](../01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale.md), [Chord-Scale Theory (jazz)](../06-jazz/07-chord-scale-theory.md), [Modal Schemas (pop)](../07-popular-music/13-modal-schemas.md), and [Diatonic Modes (20th/21st-c.)](08-diatonic-modes.md).*

[Chapter Playlist](https://open.spotify.com/playlist/5rU9CDbA7A7LlbMMDGIYXz?si=0e2de3091e1c43fb)

## In Theory

So, you’re faced with a new piece of music, and you get the sense that it might be worth considering a modal view. It sure isn’t “tonal” in the common-practice sense, but neither does it seem “atonal,” “serial,” or the like. How do you go about identifying the modes used, and making analytical observations on that basis? 20<sup>th</sup>-century music has a wider range of possible modes and may not have a key signature or any other notational shortcut for identifying the mode. As such, it’s especially important to be able to identify modes from musical cues.

Firstly, let’s review some of the different considerations that can go into the definition of a mode:

1. A collection of pitches in a particular intervallic relationship (e.g., C, D, E, F, G, A, B)
2. A tonic or final that acts as a primary or referential point (e.g., C)
3. Further hierarchical levels of importance (such as the dominant/subdominant)
4. Melodic shapes and ranges

No. 1 reminds us that modes can be transposed. While we often present the early modes in their “white-note” transposition (with dorian on D, for instance), in 20<sup>th</sup>-century music, you can just as easily have them on other pitches such as dorian on E and phrygian on D. This leads to the frankly confusing terminology “D mode on G.” Don’t forget that you can also have chromatic notes in modal music—not every pitch used needs to be in the scale. So the question is, how many exceptions are too many?

No. 2 helps to separate all the possibilities that No. 1 throws into the mix. If you only have white notes, which of those white notes is the modal final? Any and all musical parameters might contribute to the case for one of those pitches as tonic; for a useful starting point, try the widely applicable “first, last, loudest, longest” maxim (Cohn 2012, 47, after Harrison 1994, 75ff.). Pitches that dominate in those ways tend to be more salient. Do phrases tend to start and/or end on a certain pitch, or do they emphasize that pitch in other ways, perhaps with strong metrical positions or by reserving it for the top of the melodic contour?

No. 3 also speaks to this difficulty. For instance, in tonal music, you may find more instances of *sol* $(\hat5)$ than *do* $(\hat1)$, since it fits in both the tonic and dominant chords. 20<sup>th</sup>-century modes complicate this with a more diverse set of candidates for hierarchical importance, but this can also help us to unpick the different roles. “First” and “last” might be your tonic, while the dominant may be “loudest” and “longest.” We might also use a less loaded term than “dominant” here. For instance, the church modes ([discussed in a previous chapter](08-diatonic-modes.md)) had a “tenor” or “reciting tone” in an analogous role.

There are many reasons for emphasizing specific pitches in this way. One reason relevant to 20<sup>th</sup>-century music is the notion of color notes, like *fi*$(\uparrow\hat4)$ in lydian or *ra*$(\downarrow\hat2)$ in phrygian. Another reason is to establish a pitch class center. For listeners accustomed to common-practice tonality, the lydian fourth (e.g., F♯ in C major) can very easily become a leading tone in the dominant (G major). Otherwise tonal works written “in the lydian mode” can be highly ambiguous in this respect. Consider what you make of [Ludwig van Beethoven’s “Heiliger Dankgesang” from the Op. 132 quartet (1825)](https://open.spotify.com/track/4xkmXGOx4SQx34h5nePhZu?si=a7f65bab5ef94bfa) and [Anton Bruckner’s *Os Justi*(1879)](https://open.spotify.com/track/5y41AyXVAt68eHyY2Z75sP?si=58857015dd4541c5) to this effect.

Range considerations were fundamental to the definition of church modes in terms of authentic vs. plagal forms, and this has been a key consideration for defining modes in many other types of music, as have melodic shapes.

## In Practice

The above considerations have to do with identifying a prevailing mode, but how does an analyst use this information to create a compelling interpretation of the piece? Well, the challenge of coming up with a modal reading can become part of that interpretation. Here are some starting points for pivoting from identification to interpretation:

- Firstly, how easy was it to come up with a tonal reading? Is this a piece with its structure on display or deeply hidden? What might that say about the emotional valence of the work?
- Can you characterize the mode in general and its use in this piece? Is the raised lydian fourth “exciting” or even “aspirational”; is the phrygian second perhaps “lamenting”?
- How clearly and separately are these modes set out? When we move from one mode to another, are there common tones, or even a common final? Just like in tonality, “modulations” among modes can be regarded as close or remote, partly on this basis.
- How are the properties and distribution of modes related to wider considerations? Do mode changes align with moments that seem like section boundaries for other reasons?

Consider the three moments below, which come from Béla Bartók’s *From the Island of Bali*. Is the same mode in operation throughout, or does it change? What pitches are in/out of the mode(s)? Does a modal final present itself? Are there any moments where two modes are combined? Some suggestions follow the images, so decide on what you think before scrolling down to compare notes.

![Bartók’s From the Island of Bali: Extract 1](../media/2019/06/Bartok1.png)*Bartók’s From the Island of Bali: Extract 1*

<!-- lilylet-begin: media/2019/06/Bartok1.png -->
Lilylet transcription of the example above ([Bartok1.lyl](../lilylet/images/2019/06/Bartok1.lyl)):

```lyl.play
[title "From the Island of Bali (Mikrokosmos No. 109): Extract 1"]
[composer "Béla Bartók"]
[staves "{-}"]

\staff "1" \key c \major \time 6/8 \clef "treble" \tempo "Andante" 8=134 R2. \\
\staff "2" \clef "bass" ef8_1^\markup "dolce"\p([ d_2 a_4] gs[ a d] | %1

\staff "1" b!8-1([ c-2 f-4] gf[ f c] \\
\staff "2" ef2.~ | %2

\staff "1" b4.~ b8)[ f' c]( \\
\staff "2" ef8)[ d( a] gs4.~ | %3

\staff "1" b4 c b8) r \\
\staff "2" gs8)[ a( d] ef4 d8) | %4
```
<!-- lilylet-end -->
![Bartók’s From the Island of Bali: Extract 2](../media/2019/06/Bartok2.png)*Bartók’s From the Island of Bali: Extract 2*

<!-- lilylet-begin: media/2019/06/Bartok2.png -->
Lilylet transcription of the example above ([Bartok2.lyl](../lilylet/images/2019/06/Bartok2.lyl)):

```lyl.play
[title "From the Island of Bali (Mikrokosmos No. 109): Extract 2"]
[composer "Béla Bartók"]
[staves "{-}"]

\staff "1" \key c \major \numericTimeSignature \time 4/4 \clef "treble" \tempo "Risoluto" 4=96 r2 r8 \ottava #1 b''-1\f( c f \\
\staff "2" \clef "bass" r2 r8 \clef "treble" b_5( c f | %1

\staff "1" gf'''4-- gf--) gf8( f c gf') \\
\staff "2" gf'4-- gf--) gf8( f c gf') | %2

\staff "1" f''8( c gf'4--) r8 b,( c f \\
\staff "2" f8( c gf'4--) r8 b,( c f | %3

\staff "1" gf'''4--)-5 aff---5 gf8-5( f c gf') \\
\staff "2" gf'4--_1 aff--)_1 gf8_1( f c gf') | %4

\partial 2 \staff "1" f''8( c b4--) \ottava #0 \\
\staff "2" f8( c b4--) | %5
```
<!-- lilylet-end -->
![Bartók’s From the Island of Bali: Extract 3](../media/2019/06/Bartok3.png)*Bartók’s From the Island of Bali: Extract 3*

<!-- lilylet-begin: media/2019/06/Bartok3.png -->
Lilylet transcription of the example above ([Bartok3.lyl](../lilylet/images/2019/06/Bartok3.lyl)):

```lyl.play
[title "From the Island of Bali (Mikrokosmos No. 109): Extract 3"]
[composer "Béla Bartók"]
[staves "{-}"]

\partial 2 \staff "1" \omit Score.TimeSignature \key c \major \time 4/4 \clef "treble" r8 a^1\ff( bf d \\
\staff "2" \clef "bass" r8 a,_5( bf d | %1

\staff "1" ef4--) ef-- ef-- d8( bf) \\
\staff "2" ef,4--) ef-- ef-- d8( bf) | %2

\staff "1" ef8( d) bf4-- d8( ef d bf) \\
\staff "2" ef,8( d) bf4-- d8( ef d bf) | %3
```
<!-- lilylet-end -->
The first case is wonderfully ambiguous in relation to both mode and final. If you put the hands together, the pitches constitute a neat octatonic mode, but if you keep them apart, then it’s the 1:5 [distance model mode](09-collections.md#distance-model-modes) often associated with Bartók, also known as set class (0167). There’s good Bartókian symmetry in all of this, and very little sense of a single modal final emerging.

In the latter two cases, there is a strong tonic arrival on the first downbeat, suggesting G♭ and E♭ as the respective tonics for these sections. However, notice how closely the pitches relate to the opening. First we have [B, C, F, G♭], which were the exact pitches of the right hand at the start. (Do you spot the one “chromatic” note in this reading? A𝄫 could be interpreted as a chromatic upper neighbor that doesn’t really fit the mode.)

Later we have [A, B♭, D, E♭], which are a close variant on those of the left hand. This change indicates a move from that opening ambiguity to a passage quite neatly redolent of E♭ major, which is swiftly undone as the piece goes back to the technical and emotional place where it started.

So we have a balance between unity and variety, as well as trajectory for the piece overall.

## Modes, Collections and Musical Meaning

All of these modes come with extramusical interpretive associations.

For instance, we’ve been focusing on 20<sup>th</sup>-century instances of modal writing, but they do appear in common-practice tonal music, often with associations back to the pre-tonal music from which those modes came: for example, Beethoven’s use of dorian in the [“Credo” of his Missa Solemnis (1824)](https://open.spotify.com/track/1A0CdUA0lMGmTtKk6b4pby?si=bbdbe5a1fa0540dc).

In addition to looking back, composers have also looked out, deliberately invoking folk and/or foreign musics in the concert hall by the use of their mode. As always, this can be indicative of cultural appreciation or appropriation. The mania for the exotic, Hispano-Arabic topic around the turn of the 20<sup>th</sup> century (rarely more sophisticated than the use of the phrygian *ra* $(\downarrow\hat{2})$ errs on the side of the latter. Likewise, we can observe the nominally Hungarian music by composers like [Brahms](https://open.spotify.com/track/2oLjhx7w8Hyd3gry9cCXr7?si=0a65891415ff43bc) (looking at that culture from outside), [Liszt](https://open.spotify.com/track/7CIoJE0JfVFcmmUY3fFojH?si=b31ca68d7bee46e5) (keen to emphasize his own Hungarian roots as part of his brand), and [Ligeti](https://open.spotify.com/track/1A1hXivNLAWyNf6pVysqzm?si=cb493d6c35a84a68) (drawing on his own culture).

Specific modes also attract meanings from their inherent properties. We have already seen the whole-tone modes’ un-rootedness, which lends itself most naturally to certain extramusical associations, as showcased in [Claude Debussy’s “Voiles” (1909)](https://open.spotify.com/track/0FsuNMabFBpf6ZQIyXLAoh?si=2ac923d8e4b04abd). Likewise the octatonic is often invoked as some kind of exotic, timeless, magical topic, as in the celesta arpeggios of [“Dance of the Sugar Plum Fairy”](https://open.spotify.com/track/4QTFU7BukoyDtyyemGPNCX?si=bd2bac7938904365) from Pyotr Ilyich Tchaikovsky’s *The Nutcracker*(1892).

Finally, and as always with meaning, apart from the materials itself and the composers’ intentions, it ultimately comes down to your associations and inferences.

> Further Reading

- Cohn, Richard. 2012. *Audacious Euphony: Chromaticism and the Consonant Triad’s Second Nature*. New York: Oxford University Press.
- Harrison, Daniel. 1994. *Harmonic Function in Tonal Music*. Chicago: University of Chicago Press.
- Persichetti, Vincent. 1961. *Twentieth-Century Harmony*. New York: W. W. Norton.

> Assignments

1. Analyze Lili Boulanger’s resplendent *Hymne au Soleil*. Identify [modes](08-diatonic-modes.md) and collections used, along with related techniques and materials, and linking these (where you consider it appropriate) to possible “meanings” of the work. Scores can be found on [IMSLP](https://imslp.org/wiki/Hymne_au_soleil_(Boulanger%2C_Lili)) and [MuseScore](https://musescore.com/markpearse/hymn-au-soleil). Both include the original French text and an English translation in the underlay.

### Media Attributions

- Bartok1
- Bartok2
- Bartok3

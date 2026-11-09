“Somebody That I Used to Know” by Gotye: the subtonic shuttle in the intro and verses, the aeolian shuttle in the choruses.

**Intro (0:04)**

```lyl
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

```lyl
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

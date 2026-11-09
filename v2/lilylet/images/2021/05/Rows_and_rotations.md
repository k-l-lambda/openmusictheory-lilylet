**Initial row (no rotation)**

```lyl
[title "Initial row (no rotation)"]
[staves "{a-b},{c-d}"]
[instrument-a-b "Hexachord-combinatorial pair:"]
[instrument-c-d "Both rows in retrograde and rotated by 6"]

\staff "1" \omit Score.TimeSignature \key c \major \time 3/4 \clef "treble" d4^\markup "Trichord A" fs bf \\
\staff "2" \clef "bass" f,4^\markup "A(i)" cs a \\\\
\staff "1" \clef "treble" b'4^\markup "B(r)" e, g \\
\staff "2" \clef "bass" af,4^\markup "B(ri)" ef' c | %1

\staff "1" g'4^\markup "B" e b' \\
\staff "2" c,4^\markup "B(i)" ef af, \\\\
\staff "1" bf'4^\markup "A(r)" fs d \\
\staff "2" a,4^\markup "A(ri)" cs f | %2

\staff "1" a'4^\markup "C" af ef \\
\staff "2" bf,4^\markup "C(i)" b! e \\\\
\staff "1" c4^\markup "D(r)" df f \\
\staff "2" g4^\markup "D(ri)" fs d | %3

\staff "1" f4^\markup "D" df c \bar "|." \\
\staff "2" d,4^\markup "D(i)" fs g \bar "|." \\\\
\staff "1" ds4^\markup "C(r)" gs a \bar "|." \\
\staff "2" e,4^\markup "C(ri)" b as \bar "|." | %4
```

**Rotate +3** (one trichord) and adjust the transpositions for combinatoriality

```lyl
[title "Rotate +3 and adjust the transpositions"]
[staves "{a-b},{c-d}"]

\staff "1" \omit Score.TimeSignature \key c \major \time 3/4 \clef "treble" g'4^\markup "B"_\markup "Now I2" e b' \\
\staff "2" \clef "bass" d,4 f as, \\\\
\staff "1" \clef "treble" ds4^\markup "C" gs a \\
\staff "2" \clef "bass" fs,4 cs c! | %1

\staff "1" a'4^\markup "C" af ef \\
\staff "2" c,4 cs fs \\\\
\staff "1" b'4^\markup "B" e, g \\
\staff "2" as,4 f' d | %2

\staff "1" f4^\markup "D" df c \\
\staff "2" e,4 gs a \\\\
\staff "1" bf'4^\markup "A" fs d \\
\staff "2" b,4 ds g | %3

\staff "1" d4^\markup "A" fs bf \bar "|." \\
\staff "2" g4 ds b \bar "|." \\\\
\staff "1" c4^\markup "D" df f \bar "|." \\
\staff "2" a4 gs e \bar "|." | %4
```

**Rotate +/- 6**

```lyl
[title "Rotate +/- 6"]
[staves "{a-b},{c-d}"]

\staff "1" \omit Score.TimeSignature \key c \major \time 3/4 \clef "treble" a'4^\markup "C" af ef \\
\staff "2" \clef "bass" bf,4 b! e \\\\
\staff "1" \clef "treble" c4^\markup "D" df f \\
\staff "2" \clef "bass" g4 fs d | %1

\staff "1" f4^\markup "D" df c \\
\staff "2" d,4 fs g \\\\
\staff "1" ds4^\markup "C" gs a \\
\staff "2" e,4 b as | %2

\staff "1" d4^\markup "A" fs bf \\
\staff "2" f,4 df a \\\\
\staff "1" b'4^\markup "B" e, g \\
\staff "2" gs,4 ds' c | %3

\staff "1" g'4^\markup "B" e b' \bar "|." \\
\staff "2" c,4 ef af, \bar "|." \\\\
\staff "1" bf'4^\markup "A" fs d \bar "|." \\
\staff "2" a,4 cs f \bar "|." | %4
```

**Rotate +9 (-3)**

```lyl
[title "Rotate +9 (-3)"]
[staves "{a-b},{c-d}"]

\staff "1" \omit Score.TimeSignature \key c \major \time 3/4 \clef "treble" f4^\markup "D" df c \\
\staff "2" \clef "bass" e,4 gs a \\\\
\staff "1" \clef "treble" bf'4^\markup "A" fs d \\
\staff "2" \clef "bass" b,4 ds g | %1

\staff "1" d4^\markup "A" fs bf \\
\staff "2" g4 ds b \\\\
\staff "1" c4^\markup "D" df f \\
\staff "2" a4 gs e | %2

\staff "1" g'4^\markup "B" e b' \\
\staff "2" d,4 f as, \\\\
\staff "1" ds4^\markup "C" gs a \\
\staff "2" fs,4 cs c! | %3

\staff "1" a'4^\markup "C" af ef \bar "|." \\
\staff "2" c,4 cs fs \bar "|." \\\\
\staff "1" b'4^\markup "B" e, g \bar "|." \\
\staff "2" as,4 f' d \bar "|." | %4
```

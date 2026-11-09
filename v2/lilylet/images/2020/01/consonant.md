# Consonant weak-beat types (second species)

Examples of consonant weak beat types, above and below a cantus firmus. Each block shows one type: on the left the counterpoint (half notes) is above the cantus firmus (whole notes), on the right below it. The interval names printed between the staves are in a lyric lane under the half-note voice (so under the bass staff in the right-hand examples).

```lyl
[title "a. consonant passing tone"]
[staves "<->"]

\staff "1" \numericTimeSignature \time 4/4 \key c \major \clef "treble" c'2 d
\addlyrics { P5 ma6 } \\
\staff "2" \clef "bass" f,1 | %1
\staff "1" e'1
\addlyrics { ma6 } \\
\staff "2" g1 \bar "||" | %2

\staff "1" d'1 \\
\staff "2" g2 f
\addlyrics { P5 ma6 } | %3
\staff "1" c'1 \\
\staff "2" e,1 \bar "||"
\addlyrics { mi6 } | %4
```

```lyl
[title "b. substitution"]
[staves "<->"]

\staff "1" \omit Score.TimeSignature \time 4/4 \key c \major \clef "treble" c'2 f
\addlyrics { P5 P8 } \\
\staff "2" \clef "bass" f,1 | %1
\staff "1" e'1
\addlyrics { ma6 } \\
\staff "2" g1 \bar "||" | %2

\staff "1" b'1 \\
\staff "2" g2 d
\addlyrics { ma10 ma6 } | %3
\staff "1" c'1 \\
\staff "2" e,1 \bar "||"
\addlyrics { mi6 } | %4
```

```lyl
[title "c. skipped passing tone"]
[staves "<->"]

\staff "1" \omit Score.TimeSignature \time 4/4 \key c \major \clef "treble" g''2 e
\addlyrics { mi3 P8 } \\
\staff "2" \clef "bass" e,1 | %1
\staff "1" d'1
\addlyrics { ma6 } \\
\staff "2" f,1 \bar "||" | %2

\staff "1" g'1 \\
\staff "2" c,2 e
\addlyrics { P5 mi10 } | %3
\staff "1" a'1 \\
\staff "2" f,1 \bar "||"
\addlyrics { ma10 } | %4
```

```lyl
[title "d. interval subdivision"]
[staves "<->"]

\staff "1" \omit Score.TimeSignature \time 4/4 \key c \major \clef "treble" g''2 e
\addlyrics { P5 ma3 } \\
\staff "2" \clef "bass" c,1 | %1
\staff "1" b'1
\addlyrics { ma6 } \\
\staff "2" d,1 \bar "||" | %2

\staff "1" b'1 \\
\staff "2" e,2 g
\addlyrics { P5 ma10 } | %3
\staff "1" a'1 \\
\staff "2" c1 \bar "||"
\addlyrics { ma6 } | %4
```

```lyl
[title "e. change of register"]
[staves "<->"]

\staff "1" \omit Score.TimeSignature \time 4/4 \key c \major \clef "treble" f2 f'
\addlyrics { mi3 mi10 } \\
\staff "2" \clef "bass" d,1 | %1
\staff "1" e'1
\addlyrics { ma10 } \\
\staff "2" c,1 \bar "||" | %2

\staff "1" c'1 \\
\staff "2" f,2 a,
\addlyrics { P5 mi10 } | %3
\staff "1" d'1 \\
\staff "2" b,1 \bar "||"
\addlyrics { mi10 } | %4
```

```lyl
[title "f. delay of melodic progression"]
[staves "<->"]

\staff "1" \omit Score.TimeSignature \time 4/4 \key c \major \clef "treble" b'2 d
\addlyrics { ma10 P5 } \\
\staff "2" \clef "bass" g,1 | %1
\staff "1" c'1
\addlyrics { mi10 } \\
\staff "2" a,1 \bar "||" | %2

\staff "1" a'1 \\
\staff "2" f,2 d
\addlyrics { ma3 P5 } | %3
\staff "1" g'1 \\
\staff "2" e,1 \bar "||"
\addlyrics { mi3 } | %4
```

```lyl
[title "g. consonant neighbor tone"]
[staves "<->"]

\staff "1" \omit Score.TimeSignature \time 4/4 \key c \major \clef "treble" c'2 d
\addlyrics { P5 ma6 } \\
\staff "2" \clef "bass" f,1 | %1
\staff "1" c'1
\addlyrics { mi6 } \\
\staff "2" e,1 \bar "||" | %2

\staff "1" a'1 \\
\staff "2" d,2 c
\addlyrics { P5 ma6 } | %3
\staff "1" b'1 \\
\staff "2" d,1 \bar "||"
\addlyrics { ma6 } | %4
```

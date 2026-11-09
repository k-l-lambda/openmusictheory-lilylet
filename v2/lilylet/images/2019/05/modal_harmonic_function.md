Modal harmony allows many more “flavors” of the same chord without changing its function. In each pair of staves, the upper staff shows the diatonic chords of C major and the lower staff the modal alternatives.

**Tonic function**

```lyl
[title "Tonic function"]
[staves "d-m"]
[instrument-d "Diatonic harmony"]
[instrument-m "Modal harmony"]

\omit Score.TimeSignature \time 2/1 \clef "treble" <c e g>1 s1
\addlyrics { "C: I" } \\\\
\clef "treble" <c e g>1 <c ef g>
\addlyrics { "C: I" i } | %1

<e g b>1 s1
\addlyrics { iii } \\\\
<e g b>1 <ef g bf>
\addlyrics { iii ♭III } | %2

<a c e>1 s1
\addlyrics { vi } \\\\
<a c e>1 <af c ef> \bar "||"
\addlyrics { vi ♭VI } | %3
```

**Subdominant function**

```lyl
[title "Subdominant function"]
[staves "d-m"]
[instrument-d "Diatonic harmony"]
[instrument-m "Modal harmony"]

\omit Score.TimeSignature \time 2/1 \clef "treble" <f a c>1 s1
\addlyrics { "C: IV" } \\\\
\clef "treble" <f a c>1 <f af c>
\addlyrics { "C: IV" iv } | %1

\time 4/1 <d f a>1 s1 s1 s1
\addlyrics { ii } \\\\
<d f a>1 <d f af> <df f af> <d fs a>
\addlyrics { ii ii° ♭II II♯ } | %2

\time 2/1 <a' c e>1 s1
\addlyrics { vi } \\\\
<a' c e>1 <af c ef>
\addlyrics { vi ♭VI } | %3

<b d f>1 s1
\addlyrics { vii° } \\\\
<bf d f>1 <bf df f> \bar "||"
\addlyrics { ♭VII ♭vii } | %4
```

**Dominant function**

```lyl
[title "Dominant function"]
[staves "d-m"]
[instrument-d "Diatonic harmony"]
[instrument-m "Modal harmony"]

\omit Score.TimeSignature \time 2/1 \clef "treble" <g' b d>1 s1
\addlyrics { "C: V" } \\\\
\clef "treble" <g' b d>1 <g bf d>
\addlyrics { "C: V" v } | %1

\time 3/1 <b' d f>1 s1 s1
\addlyrics { vii° } \\\\
<b' d f>1 <bf d f> <bf df f>
\addlyrics { vii° ♭VII ♭vii } | %2

\time 2/1 <e g b>1 s1
\addlyrics { iii } \\\\
<e g b>1 <ef g bf>
\addlyrics { iii ♭III } | %3

<d f a>1 s1
\addlyrics { ii } \\\\
<d fs a>1 <df f af> \bar "||"
\addlyrics { II♯ ♭II } | %4
```

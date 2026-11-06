# Bartók, Mikrokosmos No. 141, "Subject and Reflection"

Each hand's figure is the exact mirror inversion of the other (in each excerpt every simultaneous RH + LH pitch pair sums to the same value). The original's pitch-class circle diagrams are not reproduced.

## Excerpt 1

Right hand: B♭, C, D, E♭, F = {10, 0, 2, 3, 5}. Left hand: E♭, F, G♭, A♭, B♭ = {3, 5, 6, 8, 10}.

```lyl
[title "Bartók, Mikrokosmos No. 141: excerpt 1"]
[composer "Béla Bartók"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \clef "treble" \stemUp bf'8[(\f_\markup "ben ritmato" c ef d] \\
\staff "1" \stemDown bf'2 \\
\staff "2" \clef "bass" \stemUp bf2( \\
\staff "2" \stemDown bf8[( af f gf)] | %1

\staff "1" \time 5/8 \partial 4 \stemUp f'4) \\
\staff "1" \stemDown bf'4 \\
\staff "2" \stemUp bf4) \\
\staff "2" \stemDown ef,4 | %2
```

## Excerpt 2 (Vivacissimo, ♩ = 164)

```lyl
[title "Bartók, Mikrokosmos No. 141: excerpt 2"]
[composer "Béla Bartók"]
[staves "{-}"]

\staff "1" \key c \major \time 2/4 \tempo "Vivacissimo" \clef "treble" \stemUp f8[( bf-> af g)] \\
\staff "1" \stemDown ef2\p \\
\staff "2" \clef "bass" \stemUp ef,2^\markup "legato" \\
\staff "2" \stemDown df,8[( af-> bf cf)] | %1
```

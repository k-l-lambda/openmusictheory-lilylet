# Debussy, La cathédrale engloutie: transposition of the opening motive (T₄)

The opening motive B, D, E = {11, 2, 4} (m. 1) returns transposed by T₄ as D♯, F♯, G♯ = {3, 6, 8} (m. 18).

## m. 1

```lyl
[title "Debussy, La cathédrale engloutie, m. 1"]
[composer "Claude Debussy"]
[staves "{-}"]

\staff "1" \key c \major \time 6/4 \clef "treble" \stemUp <d' g d'>1.^\markup "8va"^\markup "B, D, E = {11, 2, 4}" \\
\staff "1" \stemDown r4 <d g d'>4(\pp <e a e'> <b' e b'> <d g> <e a>) \\
\staff "2" \clef "bass" \stemUp d4\rest <d, g>( <e a> <b' e> <d g> <e a>) \\
\staff "2" \stemDown <g,, d' g>1. \bar "||" | %1
```

T₄ ↓

## m. 18

```lyl
[title "Debussy, La cathédrale engloutie, m. 18"]
[composer "Claude Debussy"]
[staves "{-}"]

\staff "1" \key c \major \time 6/4 \clef "treble" ^\markup "[18]" \stemUp <fs' gs ds' gs>1._\markup "p marqué"^\markup "D♯, F♯, G♯ = {3, 6, 8}" \\
\staff "1" \stemDown s4 \clef "bass" <ds, b' ds fs>4(\pp <fs cs' ds gs>4 \clef "treble" <ds' fs b ds>4) s2 \\
\staff "2" \clef "bass" \stemUp <fs, gs ds' gs>1. \\
\staff "2" \stemDown r8 b,,,8([ b' fs' b, fs' b, fs'] \stemUp <gs' b>8[ fs)] s4 | %1
```

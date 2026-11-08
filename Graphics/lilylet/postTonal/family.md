# Row family: P₁₁, R₁₁, I₀, RI₀

Webern, Piano Variations Op. 27 row. Each line can be read in both directions: the top line left to right is P₁₁ and right to left is R₁₁; the bottom line left to right is I₀ and right to left is RI₀. R- and RI-forms are labelled by their last pitch class. The two lines are separate rows, not simultaneous.

```lyl
[title "P₁₁ / R₁₁"]

\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" b'4^\markup "P₁₁ →" g fs bf a gs d' c ef cs f e^\markup "← R₁₁" | %1
```

```lyl
[title "I₀ / RI₀"]

\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" c'4^\markup "I₀ →" e f cs d ef a, b gs bf fs g^\markup "← RI₀" | %1
```

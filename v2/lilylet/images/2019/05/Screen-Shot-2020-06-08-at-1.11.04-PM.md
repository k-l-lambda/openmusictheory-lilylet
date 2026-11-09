The order of sharps (top row of the image) and flats (bottom row) in treble, bass, alto, and tenor clefs. The image shows each row on one staff with clef changes and double barlines; here each clef is on its own staff.

```lyl
[title "Order of sharps in treble, bass, alto, and tenor clefs"]
[staves ",,,"]

\omit Score.TimeSignature \omit Score.BarLine \key cs \major \clef "treble" s1 \\\\
\clef "bass" s1 \\\\
\clef "alto" s1 \\\\
\clef "tenor" s1 | %1
```

```lyl
[title "Order of flats in treble, bass, alto, and tenor clefs"]
[staves ",,,"]

\omit Score.TimeSignature \omit Score.BarLine \key cf \major \clef "treble" s1 \\\\
\clef "bass" s1 \\\\
\clef "alto" s1 \\\\
\clef "tenor" s1 | %1
```

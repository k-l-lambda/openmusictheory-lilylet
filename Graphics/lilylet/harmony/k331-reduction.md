# Mozart, Piano Sonata in A major, K. 331, I: theme and reduction

## Original

```lyl
[title "K. 331, I, mm. 1–4"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{-}"]

\staff "1" \key a \major \time 6/8 \clef "treble" \stemUp cs'8.(\p\<[ d16) cs8-.]\! e4-.--(\> e8-.)\! \\
\staff "2" \clef "bass" \stemUp e4 e8-. e4 e8 \\
\staff "2" \stemDown a8.([ b16) a8] cs4-.--( cs8-.) | %1

\staff "1" \stemUp b'8.(\<[ cs16) b8-.]\! d4-.--(\> d8-.)\! \\
\staff "2" \stemUp e4 e8-. e4 e8-. \\
\staff "2" \stemDown gs8.([ a16) gs8-.] b4-.--( b8-.) | %2

\staff "1" \stemUp a'4-.--( a8-.)\< b4-.--( b8-.--)\! \\
\staff "2" \stemUp e4-.( e8-.) e4-.( e8-.) \\
\staff "2" \stemDown fs,4 fs8 gs4 gs8 | %3

\staff "1" \stemUp cs'4 e16([ d)] cs4(\> b8-.)\! \\
\staff "1" \stemDown s4 b'8 a4( gs8) \\
\staff "2" \stemUp e4 s8 s4. \\
\staff "2" \stemDown a4 d,8 e4. \bar "|." | %4
```

## Reduction

```lyl
[title "K. 331, I, mm. 1–4: reduction"]
[staves "{-}"]

\staff "1" \key a \major \time 6/8 \clef "treble" <cs' e>2. \\
\staff "2" \clef "bass" <a cs e>2.
\addlyrics { "A: I" }
\addlyrics { T }
\addlyrics { T } | %1

\staff "1" <b' d>2.
\addlyrics { 6 }
\addlyrics { 5 } \\
\staff "2" <gs b e>2.
\addlyrics { V }
\addlyrics { D } | %2

\staff "1" a'4. b
\addlyrics { 7 6 } \\
\staff "2" <fs, e'>4. <gs e'>
\addlyrics { vi V }
\addlyrics { T D } | %3

\staff "1" cs'4 <b d>8 <a cs>4 <gs b>8 \bar "|."
\addlyrics { _ 6 6 5 }
\addlyrics { _ _ 4 3 } \\
\staff "2" <a e'>4 d,8 e4.
\addlyrics { I ii V }
\addlyrics { T S D }
\addlyrics { _ S D }
\addlyrics { _ _ HC } | %4
```

# Mozart, Piano Sonata in A major, K. 331, I: theme and reduction

The original theme (upper pair) and its harmonic reduction (lower pair), printed as one system: the two grand staves share a system line, each pair has its own brace, barlines run through each pair only.

```lyl
[title "K. 331, I, mm. 1–4: theme and reduction"]
[composer "Wolfgang Amadeus Mozart"]
[staves "{o1-o2} {r1-r2}"]
[instrument-o1-o2 "Original"]
[instrument-r1-r2 "Reduction"]

\staff "1" \key a \major \time 6/8 \clef "treble" \stemUp cs'8.(\p\<[ d16) cs8-.]\! e4-.--(\> e8-.)\! \\
\staff "2" \clef "bass" \stemUp e4 e8-. e4 e8 \\
\staff "2" \stemDown a8.([ b16) a8] cs4-.--( cs8-.) \\\\
\staff "1" \key a \major \time 6/8 \clef "treble" <cs' e>2. \\
\staff "2" \clef "bass" <a cs e>2.
\addlyrics { "A: I" }
\addlyrics { T }
\addlyrics { T } | %1

\staff "1" \stemUp b'8.(\<[ cs16) b8-.]\! d4-.--(\> d8-.)\! \\
\staff "2" \stemUp e4 e8-. e4 e8-. \\
\staff "2" \stemDown gs8.([ a16) gs8-.] b4-.--( b8-.) \\\\
\staff "1" <b' d>2. \\
\staff "2" <gs b e>2.
^\figures { <6 5>2. }
\addlyrics { V }
\addlyrics { D } | %2

\staff "1" \stemUp a'4-.--( a8-.)\< b4-.--( b8-.--)\! \\
\staff "2" \stemUp e4-.( e8-.) e4-.( e8-.) \\
\staff "2" \stemDown fs,4 fs8 gs4 gs8 \\\\
\staff "1" a'4. b \\
\staff "2" <fs, e'>4. <gs e'>
^\figures { <7>4. <6> }
\addlyrics { vi V }
\addlyrics { T D } | %3

\staff "1" \stemUp cs'4 e16([ d)] cs4(\> b8-.)\! \\
\staff "1" \stemDown s4 b'8 a4( gs8) \\
\staff "2" \stemUp e4 s8 s4. \\
\staff "2" \stemDown a4 d,8 e4. \bar "|." \\\\
\staff "1" cs'4 <b d>8 <a cs>4 <gs b>8 \\
\staff "2" <a e'>4 d,8 e4.
^\figures { s4 <6>8 <6 4>4 <5 3>8 }
\addlyrics { I ii V }
\addlyrics { T S D }
\addlyrics { _ S D }
\addlyrics { _ _ HC } | %4
```

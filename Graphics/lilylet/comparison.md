# Lilylet Score Comparison

This document provides a side-by-side comparison of original score images and their Lilylet representations. Each Lilylet transcription was generated via STARRY OMR (Optical Music Recognition), converting engraved scores into the compact Lilylet notation format.

## Mozart K.283 — Allegro

Original:
![](../form/k283.png)

Lilylet:
```lyl
\staff "1" \key g \major \time 3/4 \tempo "Allegro" \clef "treble" \ottava #0 \stemDown d'8.(\p[ b16)] \\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemDown d'4 b\rest \stemUp g( \\
\staff "2" \stemDown g8(\p[ b d b d b)] | %2

\staff "1" \stemUp fs4) b\rest \stemDown a'8.([ fs16)] \\
\staff "2" \stemDown a8([ c d c d c)] | %3

\staff "1" \stemDown a''4 b,\rest c( \\
\staff "2" \stemDown fs,8([ a d a d a)] | %4

\staff "1" \stemDown b'4) b\rest g'8.([ fs16)] \\
\staff "2" \stemDown g8([ b d b)] g4 | %5

\staff "1" \stemDown fs'8([ e)] e4 g8.([ e16)] \\
\staff "2" \clef "treble" \stemUp <c g'>2 _\fp b'4\rest | %6

\staff "1" \ottava #0 \stemDown e'8([_\fp d)] d4 g8.(\f[ d16)] \\
\staff "2" \ottava #0 \stemUp <b g'>2_\fp b'4\rest | %7

\staff "1" \stemDown d'4-! d-! d-! \\
\staff "2" \clef "bass" \stemDown <a c>4(\f <g b> <fs a>) | %8

\staff "1" \stemDown d'16[ e fs g] a[ b c d] c[ b a g] \\
\staff "2" \stemDown <g b>4 d\rest <e g> | %9

\staff "1" \stemDown fs'16[ e d c] b[ d b g] \stemUp a[ c a fs] \\
\staff "2" d,4\rest \stemUp g( c) | %10

\staff "1" g'4 b\rest b\rest \\
\staff "2" \stemUp b4 g, d'\rest \\
\staff "2" \stemDown g4 | %11
```

## Mozart K.330 — Allegretto

Original:
![](../form/k330.png)

Lilylet:
```lyl
\staff "1" \key c \major \time 2/4 \tempo "Allegretto" \clef "treble" \ottava #0 \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest \stemDown c[ e g] | %1

\staff "1" \stemDown b'8[ c] b4 \\
\staff "1" \stemUp d'8([ f16 e] d4 \\
\staff "2" \stemDown c8[ c,] \stemUp g'[ g,] | %2

\staff "1" \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" d,8\rest \stemDown c[ e g] | %3

\staff "1" \stemDown <d' f>8([ <c e>)] \stemUp <b d>4\trill \\
\staff "2" \stemDown c8[ c,] \stemUp g'[ g,] | %4

\staff "1" \stemDown f'8.([ g32 f] e8)[ e-.] \\
\staff "2" \stemDown a8([ c g c] | %5

\staff "1" \stemDown a''8.([ b32 c] g8)[ g-.] \\
\staff "2" \stemDown f,8[ c' e, c')] | %6

\staff "1" \stemDown g''16([ f) f( d)] f([ e) e( c)] \\
\staff "2" \clef "treble" b'8\rest \stemUp <b, g'> b'\rest <c, g'> | %7

\staff "1" \ottava #0 \stemDown cs'16([ d e d] \stemUp c[ b a g)] \\
\staff "2" \clef "bass" \ottava #0 \stemDown <g b>4 d\rest | %8

\staff "1" \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" \stemUp c,,16([ e g c] e,[ e' g, g'] | %9

\staff "1" \stemUp d'8([ f16 e)] d4 \\
\staff "1" \stemDown b'8[ c] b4 \\
\staff "2" \stemDown c,16[ e g c] \stemUp g,[ b d g)] | %10

\staff "1" \stemDown e'8.([ f32 g)] c,8[ <b d>-.] \\
\staff "2" \stemUp c,,16([ e g c] e,[ e' g, g'] | %11

\staff "1" \stemDown <d' f>8([ <c e>)]\trill \stemUp <b d>4 \\
\staff "2" \stemDown c,16[ e g c] \stemUp g,[ b d g)] | %12

\staff "1" \stemDown f'8.([ g32 f)] e8[ e-.] \\
\staff "2" \stemDown a16([ c a c] g[ c g c] | %13

\staff "1" \ottava #0 \stemDown a''8.([ b32 c] g8)[ g-.] \\
\staff "2" \ottava #0 \stemDown f,16[ c' f, c'] e,[ c' e, c')] | %14

\staff "1" \stemDown gs''16([ a f d] c8[ b)] \\
\staff "2" s8 \stemUp d e[ d] \\
\staff "2" d,8\rest \stemDown f g4 | %15

\staff "1" \markup "legato" \times 2/3 { c'16[ g e'] c[ g' e] c'[ b a] g[ f e] } \\
\staff "2" \stemDown <c e>4 d,\rest | %16

\staff "1" \times 2/3 { cs'16[ d f] a[ f d] g[ e c] f[ d b] } \\
\staff "2" d,8\rest \stemDown <f a> g4 \\
\staff "2" s8 \stemUp d <c e>[( <d f>)] | %17

\staff "1" \ottava #0 \times 2/3 { c'16[ g e'] c[ g' e] c'[ b a] g[ f e] } \\
\staff "2" \ottava #0 \stemDown <c e>4 d,\rest | %18

\staff "1" \times 2/3 { cs'16[ d f] a[ f d] g[ e c] f[ d b] } \\
\staff "2" s8 \stemUp d <c e>[( <d f>)] \\
\staff "2" d,8\rest \stemDown <f a> g4 | %19

\staff "1" \stemUp c'8[ g-.] c,4 \\
\staff "2" \stemDown <c e>8[ g-.] \stemUp <c,, c'>4 | %20
```

## Mozart K.330, ii — Andante cantabile

Original:
![](../form/k330-ii.png)

Lilylet:
```lyl
\staff "1" \key f \major \time 3/4 \tempo "Andante cantabile" \clef "treble" \ottava #0 \markup "dolce" \stemDown c'8(-.[ c-. c)-.] \\
\staff "2" \clef "bass" \ottava #0 d,8\rest d4\rest | %1

\staff "1" \stemDown c'8.[ f16] \stemUp c8[ a( c e,)] \\
\staff "2" \stemDown <f, a c>2\p <c g' bf>4 | %2

\staff "1" \stemUp g'4( f8)\f f([ <e g> <f a>)] \\
\staff "2" \stemDown d,4. c'4 c8 \\
\staff "2" \stemUp bf4( a8)[ <a, a'>( <g g'> <f f'>)] | %3

\staff "1" \stemUp bf'8.[ c32 d] c8[ f,( e f] \\
\staff "1" \stemDown f4. a,8\rest b4 \\
\staff "2" \stemDown <d, d'>8([ <bf bf'>)] <a a'> d\rest d4\p | %4

\staff "1" \stemUp <e g>8) g[ g g] \\
\staff "1" \stemDown c2 \\
\staff "1" \stemUp <f a>4( \stemDown <c e>\f \\
\staff "2" \stemUp c,2 | %5

\staff "1" \ottava #0 \stemUp g''8.([ d32 b] g8[ g(-. g-. g-.] \\
\staff "1" \ottava #0 \stemDown <b d f>2 <c e>4 | %6

\staff "1" \stemDown g''4()~ g16.[ a64( b c16) b-.] a-.[ g-. f-. e-.] \\
\staff "2" \stemDown <d, f b>4( <e g c>) d\rest | %7

\staff "1" \stemDown cs'16([ d f a)] c,4.( b8 \\
\staff "2" s8 \stemUp d \times 3/4 { <c e>4( <d f>) } e'16[ d)] \\
\staff "2" d,8\rest \stemDown <f a>\p g2 | %8

\staff "1" \stemDown c'4 \stemUp c bf\rest \\
\staff "2" \stemDown c4 \stemUp e c,8 d\rest | %9
```

## Mozart K.309 — Allegretto grazioso

Original:
![](../form/k309.png)

Lilylet:
```lyl
\staff "1" \key c \major \time 2/4 \tempo "Allegretto grazioso" \clef "treble" \ottava #0 \stemDown g''8 \\
\staff "2" \clef "bass" \ottava #0 d,8\rest | %1

\staff "1" \stemDown e'8)[ d16 c] c8[ c] \\
\staff "2" \clef "treble" \stemUp c16\p[ e g e] c[ e g e] | %2

\staff "1" \stemDown c'4. c'8 \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %3

\staff "1" \stemDown a''8)[ g16 f] f8[ f] \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %4

\staff "1" \stemDown f'4. a8 \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %5

\staff "1" \stemDown g''8)[ f16 e] e8([ g)] \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %6

\staff "1" \stemDown f'8)[ e16 d] d8[ f] \\
\staff "2" \stemUp b16[ d g d] b[ d g d] | %7

\staff "1" \ottava #0 \stemDown e'8)[ d16 c-.] b8[ c-.] \\
\staff "2" \ottava #0 \stemUp c8 <e g>[ <d f> <c e>] | %8

\staff "1" \stemDown e'4( d8)[ g-.] \\
\staff "2" \stemUp <g c>4~ <g b>8 b'\rest | %9

\staff "1" \stemDown e'8)[ d16 c] c8[ c] \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %10

\staff "1" \stemDown c'4. c'8 \\
\staff "2" \stemUp c16[ e g e] c[ e g e] | %11

\staff "1" \stemDown a''8)[ g16 f] f8[ f] \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %12

\staff "1" \stemDown f'4. a8 \\
\staff "2" \stemUp c16[ f a f] c[ f a f] | %13

\staff "1" \stemDown g''8)[ f16 e] e8([ g)] \\
\staff "2" \stemUp c16[ e g e] cs[ e a e] | %14

\staff "1" \ottava #0 \stemDown f'8)[ e16 d] d8[ f] \\
\staff "2" \ottava #0 \stemUp d16[ f a f] b,[ d g d] | %15

\staff "1" \stemDown e'8)[ f16 d] \times 2/3 { c8[ b4\trill } \\
\staff "2" \clef "bass" s8 \stemDown f, g4 \\
\staff "2" \stemUp <c g'>8 d e d] | %16

\staff "1" \stemDown g''8)[ f16 e] e'[ cs a g] \\
\staff "2" \clef "treble" \stemUp c16[ e g e] cs[ e a e] | %17

\staff "1" \stemDown f'8)[ e16 d] d'[ b g f] \\
\staff "2" \stemUp d16[ f a f] b,[ d g d] | %18

\staff "1" \stemDown e'8)[ a16 f] e[ g f d] \\
\staff "2" \clef "bass" s8 \stemDown f, g4 \\
\staff "2" \stemUp <c g'>8 d e[ d] | %19

\staff "1" \stemDown c'8 \\
\staff "2" \stemDown c8 | %20
```

## Mozart K.494 — Allegretto

Original:
![](../form/k494.png)

Lilylet:
```lyl
\staff "1" \key f \major \time 2/2 \tempo "Allegretto" \clef "treble" \ottava #0 \stemDown f'2\p a \\
\staff "2" \clef "treble" \ottava #0 \stemUp a'4( \stemDown c \stemUp f, \stemDown c') | %1

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4( c \stemUp a \stemDown c) | %2

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4( c \stemUp a \stemDown c) | %3

\staff "1" \stemDown c''8([ bf) bf( g)] bf([ a) a( f)] \\
\staff "2" c'1 \\
\staff "2" \stemDown g'4 e f a | %4

\staff "1" \times 2/3 { d'4. e8 f4 } \stemDown g4 \\
\staff "2" \stemDown bf'4 \stemUp bf, f'~ \\
\staff "2" s1 \times 2/3 { d4 } \stemDown b4 | %5

\staff "1" \stemDown c'2(~ c8[ cs d e)] \\
\staff "2" \stemUp f4 e8[ d] e4 bf'\rest \\
\staff "2" \stemUp f4 e8[ d] e4 bf'\rest | %6

\staff "1" \ottava #0 \stemDown f'2 a \\
\staff "2" \ottava #0 \stemUp a'4( \stemDown c \stemUp f, \stemDown c' | %7

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4 c \stemUp a \stemDown c | %8

\staff "1" \stemDown a''8([ g) g( e)] f4.( a8) \\
\staff "2" \stemDown bf'4 c \stemUp a \stemDown c) | %9

\staff "1" \stemDown c''8([ bf) bf( g)] bf([ a) a( f)] \\
\staff "2" c'1 \\
\staff "2" \stemDown g'4 e f d | %10

\staff "1" \stemDown d'4.( g8) f4-. e-. \\
\staff "2" d'4\rest \stemUp bf a g \\
\staff "2" \stemDown bf2 c | %11

\staff "1" \stemDown <bf' e>2(( <a f'>4)) bf\rest \\
\staff "2" \stemUp f4 c f, bf'\rest | %12
```

## Haydn Symphony III/66, ii

Original:
![](../form/haydn-III-66-ii.png)

Lilylet:
```lyl
\staff "1" \key g \major \time 3/4 \clef "treble" \ottava #0 \stemDown d'8(\f[ b)] \\\\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemUp fs8([ g)] d4 \stemDown b''8([ g)] \\
\staff "2" s4 \stemUp <b d>-. <b d>-. \\\\
\staff "2" d,4\rest \stemDown <g b>-.\f g-. | %2

\staff "2" s4 \stemUp <a fs'>-. <a fs'>-. \\
\staff "1" \stemDown fs'8([ a)] c,4 a8([ c)] \\\\
\staff "2" d,4\rest \stemDown d-. d-. | %3

\staff "1" \stemUp c'16([ b] b8\rest \stemDown g s \\
\staff "1" s2 \stemUp e'16([ c] b8\rest \\
\staff "1" \stemDown g'8 s \\
\staff "1" s4 \stemUp d'16([ c] b8\rest \stemDown g s \\\\
\staff "2" \stemDown g8-. d\rest e-. d\rest \stemUp c-. d\rest | %4

\staff "1" \times 2/3 { a'2 d,4\p } \\
\staff "1" \stemDown fs2 \\\\
\staff "2" \times 2/3 { d,4-. d'-. d,\rest } | %5

\staff "1" \ottava #0 \stemUp g'2( b8[ gs] \\
\staff "2" \ottava #0 s4 \stemUp <g d'>-. <d' fs>-. \\\\
\staff "2" \ottava #0 d,4\rest \stemDown b-.\p b-. | %6

\staff "1" \stemUp b'8([ a)] \stemDown c4-. c8([ b)] \\
\staff "2" \stemUp e4 e8([ s4 d8] \\\\
\staff "2" \stemDown c,4 d\rest c | %7

\staff "1" \stemUp a'4) a8([ g] a[ d,] \\
\staff "2" \stemUp <c fs>2.( \\\\
\staff "2" \stemDown d,4-. d-. d-. | %8

\staff "1" \stemUp g'4 s \\
\staff "1" b'4\rest b\rest \\
\staff "2" \stemUp <b g'>4) d,\rest \\\\
\staff "2" \stemDown g,4-. g'-. | %9
```

## Haydn Symphony No.101 — Andante

Original:
![](../form/sym101.png)

Lilylet:
```lyl
\staff "1" \key g \major \time 2/4 \tempo "Andante" s2 \\\\
\staff "2" \clef "bass" \ottava #0 \stemDown <g b>8-.\p[ <b d>-. <g b>-. <b d>-.] | %1

\staff "1" \markup "dolce" s4 \stemDown g''8~[ g] \\
\staff "1" \stemDown d'8.([ b32)] s \\\\
\staff "2" \stemDown <g b>8-.[ <b d>-. <g b>-. <b d>-.] | %2

\staff "1" \stemDown b''8)[ a32 g fs e] d8..)[ e32(] \\\\
\staff "2" \stemDown <g b>8-.[ <b d>-. <g b>-. <b d>-.] | %3

\staff "1" \stemDown c'16.[ d32 b16. c32] \stemUp <e, a>16.[ b'32 <e, g>16. a32] \\\\
\staff "2" \stemDown <fs, a d>8-.[ <g b d>-.] <c, c'>-.[ <cs cs'>-.] | %4

\staff "1" \stemUp fs8.[ g16)] b4\rest \\\\
\staff "2" \stemDown <d, d'>8-.[ d,] d'4\rest | %5
```

## Mozart Symphony No.40 — Allegro molto

Original:
![](../form/sym40.png)

Lilylet:
```lyl
\staff "1" \key bf \major \time 4/4 \tempo "Allegro molto" \clef "treble" \ottava #0 bf'2\rest bf4\rest \stemDown ef8(\p[ d] \\
\staff "2" \clef "bass" \ottava #0 \stemDown g4 g,\rest g2\rest \\
\staff "2" \ottava #0 \stemUp bf8[ d bf d] bf[ d bf d] | %1

\staff "1" \stemDown d'4)-. ef8([ d] d4)-. ef8([ d] \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp bf8[ d bf d] bf[ d bf d] | %2

\staff "1" \stemDown d'4() bf') bf,\rest bf'8([ a] \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp bf8[ d bf d] bf[ d bf d] | %3

\staff "1" \stemDown g''4)-. g8([ f] ef4)-. ef8([ d] \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp bf8[ d bf d] bf[ d bf d] | %4

\staff "1" \ottava #0 \stemDown c'4)-. c-. bf\rest d8([ c \\
\staff "2" \ottava #0 \stemDown g4 g,\rest g2\rest \\
\staff "2" \ottava #0 \stemUp a8[ ef' c ef] a,[ ef' c ef] | %5

\staff "1" \stemDown c'4)-. d8([ c)-.] c4 d8([ c \\
\staff "2" \stemDown g4 g,\rest g2\rest \\
\staff "2" \stemUp a8[ ef' c ef] a,[ ef' c ef] | %6

\staff "1" \stemDown c'4() a') bf,\rest a'8([ g] \\
\staff "2" \stemDown fs,4 g,\rest g2\rest \\
\staff "2" \stemUp a8[ d c d] a[ d c d] | %7

\staff "1" \stemDown fs'4)-. fs8([ ef] d4)-. d8([ c] \\
\staff "2" \stemDown d,4 g,\rest g2\rest \\
\staff "2" \stemUp a8[ d c d] fs,[ d' a d] | %8

\staff "1" \stemDown bf'4)-. bf-. bf\rest bf'8([ a] \\
\staff "2" \stemDown g2 \stemUp g8[ d' bf d] \\
\staff "2" \stemUp g8[ d' bf d] \stemDown g,2 | %9

\staff "1" \stemDown a''4() c fs, a \\
\staff "2" c,1 \\
\staff "2" \stemUp ef,8[ a fs a] ef[ a fs a] | %10

\staff "1" \ottava #0 \stemDown g''4 d) bf\rest bf'8([ a] \\
\staff "2" \ottava #0 bf,1 \\
\staff "2" \ottava #0 \stemUp d,8[ bf' g bf] d,[ bf' g bf] | %11

\staff "1" \stemDown a''4() c fs, a \\
\staff "2" c,1 \\
\staff "2" \stemUp ef,8[ a fs a] ef[ a fs a] | %12

\staff "1" \stemDown g''4() bf a8[ g f ef\p] \\
\staff "2" <bf, d g>1) | %13

\staff "1" \times 3/4 { ef4\rest <fs fs'>8(\< <a a'>\! <bf cs bf'>4 c'8[ bf] } s4 \\
\staff "1" s4 \times 2/3 { a''8 g4 } \\
\staff "1" d'1) \\
\staff "2" \stemDown bf2. s32 \\
\staff "2" \times 3/5 { <e, d'>1~ a4 } \times 193/240 { g2 } \times 2/3 { g4 } | %14

\staff "1" \stemUp fs'4) \stemDown <e g bf cs>2(\f s4 \\
\staff "2" \stemDown d'4 bf\rest \stemUp <g, bf>2( \\
\staff "2" \stemDown d,4 d\rest g,\rest d'8[ d] \\
\staff "2" \stemUp <a d>4 s | %15

\staff "1" \stemDown <fs' a d>4)-. bf,\rest <cs cs'>2( \\
\staff "2" \stemUp <fs, a d>4) s \\
\staff "2" s2 g,4\rest \stemDown d'8[ d] \\
\staff "2" \stemDown d,4 d\rest \stemUp <g bf>2( | %16

\staff "1" \ottava #0 \stemDown <fs' a d>4)-. bf,\rest <cs cs'>2(\> \\
\staff "2" \ottava #0 \stemDown d,4 d\rest g,\rest d'8[ d] \\
\staff "2" \ottava #0 s4 \stemUp <fs, a d>) <g bf>2( | %17

\staff "1" \stemDown <d' d'>4)-. <cs cs'>( <d d'>)-. <cs cs'>( \\
\staff "2" \stemDown d,4 d d d \\
\staff "2" \stemUp <fs, a d>4) <g bf>( <fs a d>) <g bf>( | %18

\staff "1" \stemDown <d' d'>2) \\
\staff "2" \stemDown d,2 \\
\staff "2" \stemUp <fs, a d>2) | %19
```

## Mozart Piano Concerto K.XV/27 — Presto

Original:
![](../form/xv27.png)

Lilylet:
```lyl
\staff "1" \key c \major \time 2/4 \tempo "Presto" \clef "treble" \ottava #0 \stemDown c'16(\p[ d] \\\\
\staff "2" \clef "bass" \ottava #0 d,8\rest | %1

\staff "1" \stemDown c'8)-.[ g'16( a] g8)-.[ c16( d] \\\\
\staff "2" \stemDown <c e>8-. d,\rest <b' d>-. d,\rest | %2

\staff "1" \stemDown c''8)-.[ e-.] b,\rest d'16([ c] \\\\
\staff "2" \stemDown <a c>8-.[ <e g>-.] d4\rest | %3

\staff "1" \stemDown b''16[ a g f] e[ d e c)] \\\\
\staff "2" \stemDown <f, a>8-. d\rest <fs a>-. d\rest | %4

\staff "1" \stemDown b'8-.[ d-.] b\rest c16(\p[ d] \\\\
\staff "2" \stemDown <g b>8-.[ <g b>-.] d\rest d\rest | %5

\staff "1" \ottava #0 \stemDown c'8)-.[ g'16( a] g8)-.[ c16( d] \\\\
\staff "2" \ottava #0 \stemDown <c e>8-. d,\rest <b' d>-. d,\rest | %6

\staff "1" \stemDown c''8)-.[ e-.] b,\rest d'16([ c] \\\\
\staff "2" \stemDown <a c>8-.[ <e g>-.] d4\rest | %7

\staff "1" \stemDown b''16[ a g f] e[ d c b)] \\\\
\staff "2" \stemDown <f, a>8-. d\rest <g b>-. d\rest | %8

\staff "1" \stemDown c'8-.[ c-.] b4\rest \\\\
\staff "2" \stemDown <c e>8-.[ <c e>-.] d,4\rest | %9
```

## Beethoven String Quartet Op.18 No.2 — Allegro

Original:
![](../form/beethoven_18_2.png)

Lilylet:
```lyl
\staff "1" \key g \major \time 2/4 \tempo "Allegro molto quasi Presto" s2 \\\\
\staff "2" s2 \\\\
\staff "3" \clef "alto" s2 \\\\
\staff "4" \clef "bass" \ottava #0 \stemDown d,4-.\p g-. | %1

\staff "1" s2 \\\\
\staff "2" s2 \\\\
\staff "3" s2 \\\\
\staff "4" \stemDown b4.( a16[ g)] | %2

\staff "1" s2 \\\\
\staff "2" s2 \\\\
\staff "3" s2 \\\\
\staff "4" \stemDown f,8-.[ g-. a-. b-.] | %3

\staff "1" s2 \\\\
\staff "2" s2 \\\\
\staff "3" s2 \\\\
\staff "4" \stemDown c8 d,\rest d4\rest | %4

\staff "1" \stemUp d4-.\p g-. \\\\
\staff "2" \stemUp b4\p d \\\\
\staff "3" \stemUp b4-. b-. \\\\
\staff "4" \stemDown g4-.\p g-. | %5

\staff "1" \stemDown b'4.( \stemUp a16[ g)] \\\\
\staff "2" \stemUp g'4.( fs16[ e)] \\\\
\staff "3" \stemUp g4.( a16[ b)] \\\\
\staff "4" \stemDown e,4.( f16[ g)] | %6

\staff "1" \stemUp fs8-.[ a-. g-. e-.] \\\\
\staff "2" \stemUp d8-.[ d-. cs-. cs-.] \\\\
\staff "3" \stemUp a8-.[ f-. e-. g-.] \\\\
\staff "4" \stemUp a8-.[ a,-. a-. a-.] | %7

\staff "1" \stemUp d8 b'\rest b4\rest \\\\
\staff "2" \stemUp d8 b'\rest b4\rest \\\\
\staff "3" \stemUp f,8 c'\rest c4\rest \\\\
\staff "4" \stemDown d,8 d\rest d4\rest | %8
```

## Beethoven Violin Sonata Op.30 — Allegro con brio

Original:
![](../form/beethoven_op30.png)

Lilylet:
```lyl
\staff "1" \key c \major \time 4/4 \tempo "Allegro con brio" \clef "treble" \ottava #0 \stemUp <c e>2\p <b d>16([ <c e> <b d> <c e>)] <d f>8-.[ <c e>-.] \\
\staff "2" \clef "bass" \ottava #0 <c, g'>1 | %1

\staff "1" \stemUp <b d>4-. <b g'>-. b'2\rest \\
\staff "2" \stemUp <g, g'>4-. <g g'>-. d'2\rest | %2

\staff "1" \stemUp <d f>2 <cs e>16([ <d f> <cs e> <d f>)] <e g>8-.[ <d f>] \\
\staff "2" <g, b'>1 | %3

\staff "1" \stemUp <c e>4-. <g' c>-. b2\rest \\
\staff "2" \stemDown <c, g'>4-. <c g'>-. d2\rest | %4

\staff "1" \stemDown e2\p f \\
\staff "1" \stemUp c'2 b16[ c( b c] d8)-.[ b-.] \\
\staff "2" g1~ \\
\staff "2" g,4\rest \stemDown c d g, | %5

\staff "1" a4\rest \stemDown e' f2 \\
\staff "1" \stemUp g'4 c b16[ c( b c] d8)-.[ b-.] \\
\staff "2" \stemUp g4 g2.~ \\
\staff "2" g,4\rest \stemDown c d g, | %6

\staff "1" \ottava #0 s4 \stemDown c'( \times 2/3 { d,4 <c d>2 } \\
\staff "1" \ottava #0 \stemUp g'4 s2 a4) \\
\staff "2" \ottava #0 \stemUp g2 a \\
\staff "2" \ottava #0 \stemDown e,4 c f d | %7

\staff "1" s2 \stemUp e4) b'\rest \\
\staff "1" \stemUp d4 g \stemDown c, s \\
\staff "1" \stemDown b2 s \\
\staff "2" \stemDown g4 \stemUp g, \times 2/3 { c8([ g' fs)] f-.-.[ e d-.] } | %8

\staff "1" b'4\rest \stemDown e, d d \\
\staff "1" s4 \stemUp g'2( f4) \\
\staff "2" \stemDown c,2 b16([ c b c] d8-.[ b-.] | %9

\staff "1" \stemDown c4 e\f d d \\
\staff "1" \stemUp e4 g2( f4) \\
\staff "2" \stemDown g,4 c\f b16([ c b c] d8-.[ b-.] | %10

\staff "1" \stemUp <c e>4 b'\rest <c, e a> b'\rest \\
\staff "2" \stemUp g4 a s2 \\
\staff "2" \stemDown g,4 c2\f fs,4( | %11

\staff "1" \stemUp <c e g>4 b'\rest b\rest \\
\staff "2" \stemUp g4 <d f g b> <g,, g'> \\
\staff "2" \stemDown f,,4) g2\f | %12

\staff "1" \stemUp c16[ s \\
\staff "2" \stemUp <c,, e g c>4\ff | %13
```

## Beethoven Sonata Op.2 No.3 — Allegro

Original:
![](../form/op2no3.png)

Lilylet:
```lyl
\staff "1" \key c \major \time 3/4 \tempo "Allegro" \clef "treble" \ottava #0 \stemDown c'8.\p-.[ b16-.] \\
\staff "2" \clef "bass" \ottava #0 d,4\rest | %1

\staff "1" \stemDown c'4-. \stemUp g-. a-. \\
\staff "2" d,4\rest \stemDown <c' e> <c f> | %2

\staff "1" \stemUp g'2 \stemDown c8.)-.[ b16-.] \\
\staff "2" \ottava #0 \stemDown <c e>4 \stemUp c, d\rest | %3

\staff "1" \stemDown c'4-. c-. d-. \\
\staff "2" \clef "treble" b'4\rest \stemUp <e, g>-. <b g'> | %4

\staff "1" \stemDown e'4(\sf c8) b\rest c8.)-.[ b16-.] \\
\staff "2" \stemUp g'4. s8 \\
\staff "2" \stemDown c4( e8) b'\rest b4\rest | %5

\staff "1" \ottava #0 \stemDown c'4-. \stemUp g-. a-. \\
\staff "2" \ottava #0 b'4\rest \stemUp <b, d>-. <c e>-. | %6

\staff "1" \stemUp fs4-. g-. a-. \\
\staff "2" \stemUp <a c>4-. <b d>-. <c e>-. | %7

\staff "1" \stemUp d2 fs4\trill \\
\staff "2" \clef "bass" d,4\rest \stemDown <d g b>-. <d a' c>-. | %8

\staff "1" \stemUp g'4 b\rest b\rest \\
\staff "2" \stemDown <g b>4 \stemUp g, d'\rest | %9
```

## Mozart String Quartet K.465, iv — Allegro molto

Original:
![](../K465-iv.png)

Lilylet:
```lyl
\staff "1" \key c \major \time 4/4 \clef "treble" \ottava #0 \stemDown c''4. f,8 \\\\
\staff "2" \clef "treble" \ottava #0 \stemUp f16([ d f d] f8) b\rest \\\\
\staff "3" \clef "alto" \ottava #0 \stemDown d16([ b d b] d8) c\rest \\\\
\staff "4" \clef "bass" \ottava #0 \stemDown g8[ g] g d\rest | %1

\staff "1" \stemDown e'8([ c a d)] \\\\
\staff "2" b'8\rest \stemUp g([ c, a')] \\\\
\staff "3" s1 \\\\
\staff "4" \stemDown c8[ e,( f fs)] | %2

\staff "1" \stemDown c'8([ b)] c-.[ c-.] \\\\
\staff "2" \stemUp e8([ d)] c[ c] \\\\
\staff "3" c4\rest \stemUp g8-.[ g-.] \\\\
\staff "4" \stemDown g8([ f)] e-.[ e-.] | %3

\staff "1" \stemDown d'8-.[ d-. e-. e-.] \\\\
\staff "2" \stemUp c8-.[ c c-. c-.] \\\\
\staff "3" \stemUp a8-.[ a-. bf-. bf-.] \\\\
\staff "4" \stemDown f,8-.[ f-. g-. g-.] | %4

\staff "1" \stemDown f'8-.[ f fs-. fs-.] \\\\
\staff "2" \stemDown c'8-.[ c-. c-. c-.] \\\\
\staff "3" \stemDown c8-.[ c-. d-. d-.] \\\\
\staff "4" \stemDown a8[ a-. af-. af] | %5

\staff "1" \stemDown g''8([ e] f[ e16 d] \\\\
\staff "2" \stemDown c'4 d8[ c16 b] \\\\
\staff "3" \stemDown e8([ c)] g'[ g] \\\\
\staff "4" \stemDown g8[ g g g] | %6
```

## Brahms Ballade Op.119 No.1

Original:
![](../Op119-1.png)

Lilylet:
```lyl
\staff "1" \key bf \major \time 3/4 \clef "treble" \ottava #0 \stemDown d'8.(\p[ ef16] \\\\
\staff "2" \clef "bass" \ottava #0 ef,4\rest | %1

\staff "1" \stemDown d'4-. c-. bf-. \\\\
\staff "2" \stemDown <bf ef>4 <a d> <g d'> | %2

\staff "1" \stemUp a'4 c\rest \times 4/5 { a8.[ c8 } \\\\
\staff "2" \stemDown <fs, d'>4 ef\rest ef\rest | %3

\staff "1" \stemUp bf'4 a g \\\\
\staff "2" \stemDown <g d'>4 <f ef'> <ef cs'> | %4
```

## Beethoven Sonata Op.109, iii — Andante molto cantabile ed espressivo

Original:
![](../Op109-iii.png)

Lilylet:
```lyl
\staff "1" \key e \major \time 3/4 \tempo "Andante molto cantabile ed espressivo" \clef "treble" \ottava #0 \markup "mezza voce" \stemUp gs'4( es4. f8) \\
\staff "1" \ottava #0 \stemDown b4 b cs \\\\
\staff "2" \clef "bass" \ottava #0 s4 \stemDown ds' \stemUp a,, \\
\staff "2" \ottava #0 \stemUp e,,4( gs s | %1

\staff "1" \stemUp <f, ds'>4 <a b>2 \\\\
\staff "2" \stemUp b,4 cs ds) | %2

\staff "1" \stemUp <gs b gs'>4( es'4. f8) \\
\staff "1" s4 \stemDown b cs \\\\
\staff "2" \stemDown e,4( gs as | %3

\staff "1" \stemUp f4( as b) \\
\staff "1" \stemDown ds4\< <cs es> <ds f> \\\\
\staff "2" \stemDown b4 fs \stemUp b,8[ a] | %4

\staff "1" \stemUp b'4 es,4. gs16[ f)\!] \\
\staff "1" b4\rest \stemDown b cs \\
\staff "2" \stemUp gs,4((( gs') a, \\\\
\staff "2" \stemDown gs,2 s4 \\
\staff "2" \stemUp gs,2 s4 | %5

\staff "1" \stemUp ds4( b a) \\\\
\staff "2" \stemDown <b, fs'>4 <cs e> <ds fs>) | %6

\staff "1" \markup "crescendo" \stemUp gs4( es'4. as,8) \\\\
\staff "2" s4 \stemDown <cs,, cs'> <c c'> \\
\staff "2" \stemDown e,4 \stemUp e2 | %7

\staff "1" \clef "bass" \stemUp as2( b4) \\
\staff "1" \stemDown g4(\p es ds) \\\\
\staff "2" \stemDown c,,2 gs4 \\
\staff "2" \stemUp e,,4( g b) | %8
```

## Debussy "Des pas sur la neige" (DMUDB)

Original:
![](../DMUDB.png)

Lilylet:
```lyl
\staff "1" \key bf \major \time 4/4 \clef "treble" \ottava #0 \stemDown d'4 c16 bf \\\\
\staff "2" \clef "treble" \ottava #0 bf'8\rest \stemUp <bf, g'>4 \\\\
\staff "3" \clef "bass" \ottava #0 \stemUp <g, d'>4. | %1

\staff "1" \stemDown af'16[ ef'] \stemUp af,8 g16 s \\\\
\staff "2" bf'8\rest \stemUp <af, ef' af>4 \\\\
\staff "3" \stemUp <c,, c'>4. | %2

\staff "1" \times 2/3 { fs16[ a8 d c] bf16[ a] } \\\\
\staff "2" bf'8\rest \stemUp <a, fs'>4 \\\\
\staff "3" \stemUp <d,, d'>4. | %3
```

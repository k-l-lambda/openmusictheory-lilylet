---
title: "Medial caesura after standing on the dominant: Mozart, Piano Sonata in D major, K. 284, I"
id: 06-k284-medial-caesura
category: example
topics: [06-large-forms/sonata-form, 04-phrase-structure/phrase-expansion]
tags: [sonata-form, medial-caesura, half-cadence, standing-on-the-dominant, dominant-lock, hammer-blows, caesura]
source_image: Graphics/form/medialCaesura.png
source_page: sonataStructuralPointsOfArrival.md
lilylet: Graphics/lilylet/form/medialCaesura.lyl
provenance: omr
composer: Wolfgang Amadeus Mozart
work: "Piano Sonata in D major, K. 284, I, end of the transition"
key: D major
meter: 4/4
---

# Medial caesura: Mozart, K. 284, I

OMT's example of an **HC followed by a standing on the dominant** (Hepokoski and Darcy's "dominant lock"). The **medial caesura** arrives five bars after the HC. It's marked by three "hammer blows" in the left hand and a one-beat silence.

## What to look for

- **Bar numbers** are excerpt-relative: the file's `%N`, bar 1 = `%1`. The excerpt begins mid-transition, and the original prints no bar numbers.
- **Approach to the HC, mm. 1–3.**
  - Tremolo-like sixteenths F♯5–D6 | G5–D6 | `<D5 G♯5>`–D6 over a rising, chromatic bass in octaves: A–D–C–A | B–G–D–B | B♭–F–D–B♭.
  - This is the transition's energy gain.
- **HC, m. 4 (beat 1).** `<E5 A5 C♯6>` over A3 = V of D.
  - The left hand starts the "legato" sixteenth figure.
  - The page puts this HC at the start of the second line, marked legato. That makes it a **I:HC**. The key reading is inferred from the A-major chord after D-major context.
- **Standing on the dominant, mm. 4–8.**
  - The left hand circles around A3/A4 (A3 A4 G♯4 A4 B4 A4 F♯4 A4 …), keeping the dominant.
  - The right hand descends A5 G5 F♯5 E5 D5 | C♯5 D5 E5 F♯5, and this two-bar unit is repeated in mm. 6–7.
- **MC, m. 8: the fifth bar counting from the HC bar (m. 4), matching the page's "5 measures later".**
  - `<C♯5 E5 A5>`, then `<A3 C♯4 E4>` struck three times in the left hand: the **hammer blows**.
  - The right hand ends A4 with a quarter rest: the **one-beat silence**.
- **After the MC, m. 9.** A new theme in A, E5 A5 G♯5 C♯6 …, over silence in the bass, then G♯–B and F♯–A dyads. This is the start of S in the dominant key (inferred from the notes; the page doesn't label it).

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/form/medialCaesura.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Sonata exposition in D major: medial caesura"]
[staves "{-}"]

\staff "1" \key d \major \time 4/4 \clef "treble" \stemDown fs'16([ d' fs, d'] fs,[ d' fs, d'] fs,[ d' fs, d'] fs,[ d' fs, d'] \\
\staff "2" \clef "bass" \stemDown <a, a'>4 <d d'> <c c'> <a a'> | %1

\staff "1" \stemDown g''16[ d' g, d'] g,[ d' g, d'] g,[ d' g, d'] g,[ d' g, d')] \\
\staff "2" \stemDown <b, b'>4 <g' g'> <d d'> <b b'> | %2

\staff "1" \stemDown <d' gs>16([ d' <d, gs> d'] <d, gs>[ d' <d, gs> d'] <d, gs>[ d' <d, gs> d'] <d, gs>[ d' <d, gs> d')] \\
\staff "2" \stemDown <bf, bf'>4 <f' f'> <d d'> <bf bf'> \clef "treble" | %3

\staff "1" \stemDown <e' a cs>4 b8\rest a'-. g!-.[ fs-. e-. d-.] \\
\staff "2" \stemUp a16_\markup "legato"[ a' gs a] b[ a fs a] e[ a d, a'] cs,[ a' b, a'] | %4

\staff "1" \stemDown cs'8-.[ d-. e-. fs-.] a16([ g fs e] g[ fs e d] \\
\staff "2" \stemUp a16[ a' b, a'] cs,[ a' d, a'] e[ a cs, a'] d,[ a' b, a'] | %5

\staff "1" \stemDown <cs' e a>4) b8\rest a'-. g-.[ fs-. e-. d-.] \\
\staff "2" \stemUp a16[ a' gs a] b[ a fs a] e[ a d, a'] cs,[ a' b, a'] | %6

\staff "1" \stemDown cs'8-.[ d-. e-. fs-.] a16([ g fs e] g[ fs e d] \\
\staff "2" \stemUp a16[ a' b, a'] cs,[ a' d, a'] e[ a cs, a'] d,[ a' b, a'] | %7

\staff "1" \stemDown <cs' e a>4) e16([ cs e cs] \stemUp a4) b\rest \\
\staff "2" \stemUp a4 <a cs e> <a cs e> b'\rest | %8

\staff "1" \stemDown e'4\p a8([ gs] cs[ a gs fs)] \\
\staff "2" R1 | %9

\staff "1" \stemDown fs'8(\prall[ e)] e4. e16(\prall[ ds] e8)-.[ fs-.] \\
\staff "2" \stemUp <gs' b>8[ <gs b> <gs b> <gs b>] <gs b>[ <gs b> <gs b> <gs b>] | %10

\staff "1" \stemDown e'8( d!4 fs8) d( cs4 e8) \\
\staff "2" \stemUp <fs a>8[ <fs a> <fs a> <fs a>] <e gs>[ <e gs> <e gs> <e gs>] | %11
```
<!-- score:end -->

## Notes

- The left hand's clef changes follow the original. Fingerings and a stray fingering in the OMR were removed.

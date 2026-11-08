---
title: "Meyer + modulating Passo Indietro: Haydn, Piano Sonata in G major, Hob. XVI:27, III, mm. 1–8"
id: 05-haydnxvi27
category: example
topics: [05-formal-schemas/opening-schemas, 05-formal-schemas/continuation-schemas, 05-formal-schemas/schema-combinations]
tags: [meyer, passo-indietro, galant-schema, sentence, presentation, continuation, modulation]
source_image: Graphics/HaydnXVI27.png
source_page: schemata-improv.md
lilylet: Graphics/lilylet/HaydnXVI27.lyl
provenance: omr
composer: Joseph Haydn
work: "Piano Sonata in G major, Hob. XVI:27, III, mm. 1–8 (opening theme)"
key: G major
meter: 2/4
---

# Meyer + modulating Passo Indietro: Haydn, Hob. XVI:27, III

An 8-bar sentence built from two galant schemata. The presentation is an embellished **Meyer** and the continuation is a **modulating Passo Indietro**, followed by a II6–V7–I cadence in the dominant key. OMT uses this theme to show how schemata fill the sentence's phrase functions.

## What to look for

- Bar numbers: pickup = m. 0 (`%1`), so m. N = `%N+1`.
- **Presentation, mm. 1–4 (Meyer, from the page).**
  - The two-bar basic idea (mm. 1–2) is repeated in mm. 3–4 "transposed up a step (for the most part)".
  - Meyer melody stages do–ti | fa–mi: the treble outlines G (m. 1, G4 B4 D5 G4 over G3/B3) → F♯4 (m. 2, over A3/C4). Then C5 (m. 3, A4 C5 E5) → B4 (m. 4, `<A4 C5>` → `<G4 B4>` over G3–G2).

  The do–ti and fa–mi reading is inferred from those pitches; the page only names the schema.
- **Continuation, mm. 5–6:** the page calls this an embellishment of the modulating Passo Indietro.
  - The right hand moves into eighth-note figures an octave higher: B5 G5 D♯5 E5 | A5 F♯5 C♯5 D5.
  - Over them the bass is G4 | F♯4: a descending step (do → ti of the new key D).
- **Cadence, mm. 7–8:** "II6 V7 I in the key of the dominant".
  - m. 7: bass G4 under E5 G5 (II6 of D), then A4 under C♯5 (V7).
  - m. 8: D5 over D4–D3 (I of D).
  - The page notes it goes by so fast that it can sound like a half cadence in the home key.
- **Pattern for composition:** opening schema = presentation, continuation schema + cadence = continuation. Compare the schema-combination templates in [schema-combinations](../../05-formal-schemas/schema-combinations.md).

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/HaydnXVI27.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "Haydn, Piano Sonata in G major, Hob. XVI:27, III (Finale)"]
[composer "Joseph Haydn"]
[staves "{-}"]

\staff "1" \key g \major \time 2/4 \partial 8 \tempo "Presto" \clef "treble" \stemUp d8-.\mf \\
\staff "2" \clef "bass" r8 | %1

\staff "1" \stemDown g'8(-2[ b-4 d) g,-1-.] \\
\staff "2" \stemDown <g b>4-5 r8 <b d>-. | %2

\staff "1" \stemUp g'4(-3 fs8)[ d-.] \\
\staff "2" \stemDown <a c>4 r | %3

\staff "1" \stemDown a'8(-2[ c e) <a, c>-3-.] \\
\staff "2" r4 r8 \stemDown fs,-. | %4

\staff "1" \stemDown <a' c>4(-4 \stemUp <g b>8)-. \stemDown b-1-. \\
\staff "2" \stemDown g4( \stemUp g,8) r8 \clef "treble" | %5

\staff "1" \stemDown b''8([ g)-4 ds( e)-1] \\
\staff "2" \stemUp g'4-2 r8 g-. | %6

\staff "1" \stemDown a''8([ fs)-4 cs( d!)-1] \\
\staff "2" \stemUp fs4 r8 fs-.-4 | %7

\staff "1" \stemDown e'8-3 g4( cs,8)-2 \\
\staff "2" \stemUp g'4 a \clef "bass" | %8

\staff "1" \partial 4. \stemDown d'4-3\mordent r8 \bar ":|." \\
\staff "2" \stemDown d4(-1 d,8) \bar ":|." | %9
```
<!-- score:end -->

## Notes

- The treble clef change in the bass at m. 5 and the return to bass clef at m. 8 follow the original.
- The original's fingerings are not encoded.

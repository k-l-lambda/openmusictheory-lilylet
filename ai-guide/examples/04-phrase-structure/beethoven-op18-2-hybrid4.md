---
title: "Hybrid 4 (CBI + consequent): Beethoven, String Quartet Op. 18 No. 2, IV, mm. 1–8"
id: 04-beethoven-op18-2-hybrid4
category: example
topics: [04-phrase-structure/hybrid-themes, 04-phrase-structure/theme-functions]
tags: [hybrid, hybrid-4, compound-basic-idea, CBI, consequent, string-quartet]
source_image: Graphics/form/beethoven_18_2.png
source_page: hybridThemes.md
lilylet: Graphics/lilylet/beethoven_18_2.lyl
provenance: omr
composer: "Ludwig van Beethoven"
work: "String Quartet in G major, Op. 18 No. 2, IV, mm. 1–8"
key: G major
meter: 2/4
---

# Hybrid 4: a compound basic idea followed by a consequent, so it looks like a period whose first phrase doesn't cadence.

Four-part string quartet. The first phrase is cello alone; the consequent has all four parts.

Notation: see [Reading lilylet score examples](../lilylet-primer.md).

## What to look for

- Printed bar numbers equal the lilylet `%N` (no pickup).
- mm. 1–4, cello alone: two distinct ideas, D3 G3 | B3. A3 G3 (BI) and F♯3 G3 A3 B3 | C4 (CI). The phrase ends on C4 in m. 4. That isn't a cadence, so mm. 1–4 are a **CBI**.
- m. 5: the other strings enter (Violin I D4 G4 | B4. A4 G4, the BI an octave higher, *p*). They work through the same basic and contrasting ideas, which marks consequent function.
- mm. 7–8: the CI is altered to close. Violin I has F♯4 A4 G4 E4 → D4. Violin II has D4 D4 C♯4 C♯4, and the cello A3 A2 A2 A2 → D3 (A7 → D).
- *Discrepancy:* the source page calls the close a 'I:PAC'. In the notes the final sonority is D major (V of G), approached from A7. So it's a cadence on the dominant, a V:PAC or an HC in G, not I:PAC.

## Score

<!-- score:begin -->
<!-- generated from Graphics/lilylet/beethoven_18_2.lyl by ai-guide/examples/sync.mjs; edit the source, not this block -->
```lyl
[title "String Quartet in G major, Op. 18 No. 2, IV"]
[composer "Ludwig van Beethoven"]
[staves "<v1-v2-va-vc>"]
[instrument-v1 "Violin I" "Vn. I"]
[instrument-v2 "Violin II" "Vn. II"]
[instrument-va "Viola" "Va."]
[instrument-vc "Violoncello" "Vc."]

\key g \major \time 2/4 \tempo "Allegro molto quasi Presto" R2 \\\\
R2 \\\\
\clef "alto" R2 \\\\
\clef "bass" \ottava #0 \stemDown d,4-.\p g-. | %1

R2 \\\\
R2 \\\\
R2 \\\\
\stemDown b4.( a16[ g)] | %2

R2 \\\\
R2 \\\\
R2 \\\\
\stemDown fs,8-.[ g-. a-. b-.] | %3

R2 \\\\
R2 \\\\
R2 \\\\
\stemDown c8 d,\rest d4\rest | %4

\stemUp d4-.\p g-. \\\\
\stemUp b4\p d \\\\
\stemUp b4-.\p b-. \\\\
\stemDown g4-.\p g-. | %5

\stemDown b'4.( \stemUp a16[ g)] \\\\
\stemUp g'4.( fs16[ e)] \\\\
\stemUp g4.( a16[ b)] \\\\
\stemDown e,4.( fs16[ g)] | %6

\stemUp fs8-.[ a-. g-. e-.] \\\\
\stemUp d8-.[ d-. cs-. cs-.] \\\\
\stemUp a8-.[ fs-. e-. g-.] \\\\
\stemUp a8-.[ a,-. a-. a-.] | %7

\stemUp d8 b'\rest b4\rest \\\\
\stemUp d8 b'\rest b4\rest \\\\
\stemUp fs,8 c'\rest c4\rest \\\\
\stemDown d,8 d\rest d4\rest | %8
```
<!-- score:end -->

## Notes

- Instrument names and the bracket come from `[staves]` / `[instrument-*]`.
- Whole-bar rests in mm. 1–4 (`R2`) are as printed.

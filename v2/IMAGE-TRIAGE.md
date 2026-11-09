# OMT v2 image triage

Scope: the 333 unique `image` entries in `materials.json`. I classified all of them by looking at contact sheets, and opened a few at full size. Per-image data is in `image-triage.json`: path, chapter, caption, kind, staves, bars, voices, texture, source, legibility, recommendation, effort_min, flags, reason. Nothing here has been transcribed yet.

## Summary

| kind | hand | omr | omr+hand | skip | total |
|---|---|---|---|---|---|
| notation | 64 | 18 | 3 | 15 | 100 |
| notation+annotation | 88 | 3 | 26 | 7 | 124 |
| diagram | 0 | 0 | 0 | 88 | 88 |
| photo | 0 | 0 | 0 | 7 | 7 |
| text/other | 0 | 0 | 0 | 14 | 14 |
| total | 152 | 21 | 29 | 131 | 333 |

| part | images | notation | hand | omr | omr+hand | skip | hand min | OMR min |
|---|---|---|---|---|---|---|---|---|
| 00-front-matter | 6 | 1 | 0 | 0 | 0 | 6 | 0 | 0 |
| 01-fundamentals | 131 | 101 | 81 | 1 | 1 | 48 | 259 | 25 |
| 02-counterpoint | 4 | 4 | 4 | 0 | 0 | 0 | 45 | 0 |
| 03-diatonic-harmony | 7 | 2 | 2 | 0 | 0 | 5 | 6 | 0 |
| 04-form | 48 | 28 | 2 | 3 | 22 | 21 | 16 | 573 |
| 05-chromaticism | 24 | 17 | 13 | 1 | 3 | 7 | 66 | 90 |
| 06-jazz | 17 | 12 | 11 | 0 | 0 | 6 | 64 | 0 |
| 07-popular-music | 15 | 11 | 11 | 0 | 0 | 4 | 111 | 0 |
| 08-20th/21st-century | 16 | 7 | 7 | 0 | 0 | 9 | 33 | 0 |
| 09-twelve-tone | 5 | 4 | 2 | 1 | 1 | 1 | 21 | 55 |
| 10-orchestration | 3 | 3 | 2 | 0 | 1 | 0 | 15 | 25 |
| 11-rhythm-and-meter | 2 | 1 | 1 | 0 | 0 | 1 | 3 | 0 |
| 14-ear-training | 36 | 30 | 15 | 15 | 0 | 6 | 166 | 234 |
| 15-in-development | 19 | 3 | 1 | 0 | 1 | 17 | 15 | 25 |

The `part` column comes from each image's first chapter. One image (#109) appears in two chapters.

## Effort

The minute figures are estimates. They are calibrated on V1, where hand transcriptions in `Graphics/lilylet/` average 3 bars per score (90th percentile 7 bars) and OMR transcriptions average 8.5 bars (90th percentile 21).

- hand: 152 images, about 820 min (13.7 h), about 1000 bars.
  - 37 of these (123 min) are low-value fundamentals: key-signature-only images, note-letter labels, step-by-step chord spelling, and glyphs whose lilylet support is unconfirmed (`check-support`).
- OMR: 21 images (414 min) plus 29 omr+hand images (613 min), about 17 h for about 760 bars.
  - Most of the form images (04-form) are scans of piano, quartet or orchestral scores with phrase-function brackets added. The brackets have to be added by hand as text or markup.
- The 30 ear-training sight-reading sets (14-ear-training/02–03) are clean engravings but low resolution (611 px wide). Together they are about 800 bars and 400 min.
  - The 15 rhythm sets are marked `hand`, because OMR on a one-line percussion staff is unreliable.
  - The 15 melody sets are marked `omr`, and should be upscaled 2× before recognition.
  - If you only want representative ear-training examples, transcribe one set per section. That cuts about 300 min.

## Flags worth knowing

- Duplicates:
  - #100 and #109 are byte-identical.
  - #104 and #110 show the same content (two different screenshots).
  - #105 is the 300 px version of #111.
  - The second image of each pair is marked skip.
- Same score, different annotation or crop: 150/160 (Schubert), 151/162 (Hensel), 163/166 (Beethoven), 164 ⊂ 167 (Haydn), 165/168 (same Haydn quartet). The second of each pair carries reduced effort.
- Five materials point to `-150x150` thumbnails: #154, #160, #161, #179, #181.
  - Full-size originals for the first four are already in `v2/media` (path in `flags`), and the triage uses them.
  - #181 (Elmas) needs a re-download without the size suffix.
- V1 overlap: 7 v2 images share a filename with a V1 graphic.
  - Six are byte-identical: clefs, Pitch-Space, Pitch-class-Space, duple, triple, quadruple. Only `clefs.png` is notation, and it already has `Graphics/lilylet/clefs.lyl`, so #13 is marked skip.
  - `withoutbeams.png` (#86) has the same name but different content.
- Local score files: no image duplicates a `.mscz`/`.mscx` in `v2/media`.
  - 141 of the 180 score files are `WK-*` workbook worksheets.
  - The rest are exercises and assignments: COMP-bebop, substitutions, embellishing-chords, the Ch9Ex* rhythm files, and the species exercises.
  - The two closest name matches (`substitutions.mscz`, 86 measures, and `embellishing-chords.mscz`, 62 measures) are worksheets, not the figures #235 and #232.
- Not representable in lilylet as-is, so marked skip: deliberately incorrect notation, glyph-drawing steps, neutral clef, measure-repeat signs, graphic scores (15-chapters-in-development/01), and mensural notation (Cordier).
- Some images are marked `hand` but carry `check-support` / `percussion` / `chord-symbols` flags. Those 40 depend on lilylet features I haven't checked: breve, caesura, breath mark, multi-measure rest, D.C./coda text, percussion staff, and chord symbols over slash bars.

## Top 15 for hand transcription

Chosen for the ai-guide topics: counterpoint, jazz, chromatic harmony, form, and rhythm and meter.

| # | image | topic | why |
|---|---|---|---|
| 139 | 02-counterpoint/03 `consonant.png` | counterpoint | 7 second-species weak-beat types, two 2-voice examples each (25 min) |
| 140 | 02-counterpoint/04 `Dissonance.png` | counterpoint | third-species dissonance types, 8 bars |
| 138 | 02-counterpoint/01 `Outlining-1.png` | counterpoint | melodic outlinings with brackets |
| 137 | 02-counterpoint/01 `Consonance.png` | counterpoint | consonance/dissonance dyad table |
| 229 | 06-jazz/04 `afternoon-in-paris.png` | jazz | full chord chart with ii–V–I brackets (needs chord symbols) |
| 236 | 06-jazz/08 `16-bar-blues.png` | jazz | 16-bar blues changes |
| 235 | 06-jazz/06 `parentheses-1…png` | jazz | improvised vs notated substitutions, 3 short tunes |
| 232 | 06-jazz/05 `cto72.png` | jazz | common-tone °7 with chord symbols and RN |
| 221 | 06-jazz/01 `anything-goes-1.png` | jazz/rhythm | swing rhythm, notated vs sounded |
| 204 | 05-chromaticism/12 `NROs_-_basic…png` | chromatic | P, L, R voice leading |
| 145 | 03-diatonic-harmony/15 `resolving.png` | chromatic | applied V7/V chain in SATB |
| 164 | 04-form/03 `Example_002a…png` | form | Haydn compound basic idea, 4 bars, clean |
| 317 | 15/01 `image-2.png` | rhythm | Cowell, *Fabric*, mm. 10–12, nested tuplets |
| 276 | 11-rhythm-and-meter/06 `tresillo-grouping…png` | rhythm | tresillo 3+3+2 against 4 |
| 246 | 07-popular-music/13 `I-dont-like-you.png` | pop schema | lament bass with lyrics, chords and RN |

## Top 15 for OMR (omr or omr+hand)

| # | image | topic | why |
|---|---|---|---|
| 161 | 04-form/02 `Example_012-e…png` (full-size) | form | Petzold Minuet in G, compound period, 16 bars, clean |
| 167 | 04-form/03 `Example_009a_CBIcont…png` | form | Haydn CBI + continuation (covers #164) |
| 163 | 04-form/03 `Example_001_AntCont…png` | form | Beethoven antecedent + continuation (covers #166) |
| 159 | 04-form/02 `Example_010…png` | form | Mozart Clarinet Concerto III, period |
| 158 | 04-form/02 `Example_008…png` | form | Beethoven sentence without fragmentation |
| 170 | 04-form/03 `Example_012_cbcons…png` | form | Haydn symphony, contrasting beginning + consequent |
| 169 | 04-form/03 `Example_011_cbece…png` | form | contrasting beginning + extended cadential ending |
| 165 | 04-form/03 `Example_004a_cadential…png` | form | Haydn quartet, cadential ending (covers #168) |
| 174 | 04-form/04 `Example_003a_Stretching…png` | form/chromatic | Schubert stretching via Ger+6 |
| 180 | 04-form/04 `Example_011_codetta…png` | form | Beethoven codetta (suffix) |
| 200 | 05-chromaticism/07 `Bach.png` | chromatic | Magnificat *Fecit potentiam*, augmented chord, 5 voices + reduction |
| 199 | 05-chromaticism/07 `Atlas.png` | chromatic | Schubert *Der Atlas* opening |
| 201 | 05-chromaticism/07 `Hensel-Extract.png` | chromatic | Hensel *Gondellied*, augmented chord |
| 327 | 15/02 `hypermeter_joplin_1.png` | rhythm/meter | Joplin *Harmony Club Waltz*, hypermeasure numbers |
| 270 | 09-twelve-tone/05 `Moto-perpetuo.png` | twelve-tone | string-quartet texture, 12 bars |

Alternates: #202 (Brahms Double Concerto full score, poor scan; #203 is its hand-sized reduction), #174–#178 (more expansion techniques), and the ear-training melody sets.

## MuseScore embeds

There are 464 unique score URLs (466 occurrences), all of the form `musescore.com/user/<uid>/scores/<id>`; 21 of them carry a secret token `/s/<key>`. Per part:

| part | embeds |
|---|---|
| 01-fundamentals | 84 |
| 02-counterpoint | 18 |
| 03-diatonic-harmony | 101 |
| 04-form | 8 |
| 05-chromaticism | 109 |
| 06-jazz | 36 |
| 07-popular-music | 47 |
| 08-20th/21st-century | 28 |
| 09-twelve-tone | 11 |
| 10-orchestration | 3 |
| 11-rhythm-and-meter | 12 |
| 12-anthology | 1 |
| 14-ear-training | 5 |
| 15-in-development | 1 |

What I tried (8 requests, all to score 6275123):

| request | result |
|---|---|
| `musescore.com/oembed/endpoint?url=…` | 403, Cloudflare challenge |
| `…/scores/<id>/embed` with curl | 403, challenge |
| the same in headless Chrome | still on the challenge page ("Just a moment…") |
| `api.musescore.com/services/rest/score/<id>.json` | 401 "Invalid header". This is the official API and needs an OAuth consumer key; not a Cloudflare block. |
| Wayback CDX `web.archive.org/cdx/search/cdx?url=musescore.com/user/<uid>/scores/<id>*` | 200; the score page and `/embed` were archived 2021–2024 |
| Wayback raw snapshot `web.archive.org/web/<ts>id_/<score url>` | 200. It includes `og:image` = `https://cdn.ustatik.com/musescore/scoredata/g/<hash>/score_0.png@850x1100?no-cache=<ts>`, plus `score_0.svg` under `musescore.com/static/…` |
| that `cdn.ustatik.com` PNG | 200 with no challenge: an 850×1100 render of page 1, clean, and good OMR input |

Working route: Wayback CDX → raw snapshot → `scoredata/g/<hash>` → `cdn.ustatik.com/…/score_0.png@850x1100`.

- The `<hash>` cannot be derived from the score id, so each score costs two Wayback requests and one CDN request.
- That is about 1400 requests for all 464 scores. Throttle it.
- This gives page images (OMR input), not score files.

Untested:

- whether `score_1.png` and later pages follow the same pattern;
- whether the `score_0.svg` on `musescore.com/static` is behind Cloudflare;
- how many of the 464 scores are archived, especially the 21 secret links.

Cleaner alternatives: ask the OMT editors for the source `.mscz` files (most scores are under the authors' own accounts), or get an official API key.

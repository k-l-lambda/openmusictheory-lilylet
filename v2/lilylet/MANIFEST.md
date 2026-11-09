# OMT 2nd edition score files in lilylet

One `.lyl` per MuseScore/MusicXML file uploaded to the 2nd edition (`v2/media/`), same `YYYY/MM/` path.
Built by `scripts/v2/scores/` (see its README). Every file was checked against music21's reading of the
MuseScore-exported MusicXML: same bar count, staves, and per staff the same notes (measure, onset, pitch
spelling, duration, grace) and chord symbols; it parses without warnings and renders through MEI in Verovio.

Status: **ok** = all checks pass, nothing approximated; **ok-with-notes** = checks pass but the source
has something lilylet cannot show or that is doubtful (see notes); **skipped-empty** = blank template; **skipped-percussion** = drum score, out of scope.

| status | count |
|---|---|
| failed | 1 |
| ok | 135 |
| ok-with-notes | 16 |
| skipped-empty | 15 |
| skipped-percussion | 13 |

| category | ok | ok-with-notes | skipped-empty | skipped-percussion | failed |
|---|---|---|---|---|---|
| counterpoint-fux | 9 | 0 | 0 | 0 | 0 |
| fugue-subjects | 1 | 0 | 0 | 0 | 0 |
| counterpoint-16th-century | 6 | 0 | 0 | 0 | 0 |
| counterpoint-species | 12 | 0 | 0 | 0 | 0 |
| jazz | 11 | 3 | 3 | 0 | 1 |
| chromatic-harmony | 6 | 2 | 0 | 0 | 0 |
| diatonic-harmony | 5 | 1 | 0 | 0 | 0 |
| rhythm-meter | 3 | 7 | 0 | 11 | 0 |
| popular-music | 3 | 0 | 0 | 2 | 0 |
| form | 4 | 0 | 0 | 0 | 0 |
| post-tonal | 4 | 0 | 0 | 0 | 0 |
| fundamentals | 71 | 3 | 12 | 0 | 0 |

Chord-symbol text comes from the MuseScore source (`<Harmony>`), because the MusicXML export flattens it
(diminished and half-diminished sevenths both become "7"; Roman numerals lose figures and applied targets).


## counterpoint-fux

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [I-Distinct.mscz](2022/08/I-Distinct.lyl) | 07-gradus-ad-parnassum-exercises | model/solution | 142 | ok |  |
| [I-Exercises.mscz](2022/08/I-Exercises.lyl) | 07-gradus-ad-parnassum-exercises | workbook-prompt | 527 | ok |  |
| [I-Solutions.mscz](2022/08/I-Solutions.lyl) | 07-gradus-ad-parnassum-exercises | model/solution | 527 | ok |  |
| [II-Distinct.mscz](2022/08/II-Distinct.lyl) | 07-gradus-ad-parnassum-exercises | model/solution | 213 | ok |  |
| [II-Exercises.mscz](2022/08/II-Exercises.lyl) | (unreferenced) | workbook-prompt | 492 | ok |  |
| [II-Solutions.mscz](2022/08/II-Solutions.lyl) | 07-gradus-ad-parnassum-exercises | model/solution | 492 | ok |  |
| [III-Distinct.mscz](2022/08/III-Distinct.lyl) | 07-gradus-ad-parnassum-exercises | model/solution | 284 | ok |  |
| [III-Exercises.mscz](2022/08/III-Exercises.lyl) | 07-gradus-ad-parnassum-exercises | workbook-prompt | 349 | ok |  |
| [III-Solutions.mscz](2022/08/III-Solutions.lyl) | 07-gradus-ad-parnassum-exercises | model/solution | 349 | ok |  |

## fugue-subjects

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [The_48_Fugue_Subjects_of_the_Well-Tempered_Clavier.mscz](2019/05/The_48_Fugue_Subjects_of_the_Well-Tempered_Clavier.lyl) | 09-high-baroque-fugal-exposition | model/example | 179 | ok | 8 full-bar rests in bars longer than a whole note written as R1; 24 common/cut time signatures restored (decoder drops <time symbol>); re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning); Verovio warnings: [Warning] Unsupported value '…' for data.ACCIDENTAL.GESTURAL (x1); [Warning] Expected @tie median or terminal in note '…', skipping it (x1); split into 48 files, one per subject (subdirectory 01.lyl..48.lyl), each verified against the whole; the source labels bar 85 "BWV 871" but it is BWV 872 (C# major); the whole file is kept as well |

## counterpoint-16th-century

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [Benedictus_Missa_Brevis_Exercise.mscz](2019/05/Benedictus_Missa_Brevis_Exercise.lyl) | (unreferenced) | workbook-prompt | 38 | ok | 8 breve(s) written as tied whole notes / two whole rests (lilylet has no breve); 40 full-bar rests in bars longer than a whole note written as R1 |
| [Benedictus_Missa_Venatorum_Exercise.mscz](2019/05/Benedictus_Missa_Venatorum_Exercise.lyl) | (unreferenced) | workbook-prompt | 20 | ok | 1 breve(s) written as tied whole notes / two whole rests (lilylet has no breve); 17 full-bar rests in bars longer than a whole note written as R1 |
| [Bicinum_IV_Exercise.mscz](2019/05/Bicinum_IV_Exercise.lyl) | (unreferenced) | workbook-prompt | 27 | ok | 25 breve(s) written as tied whole notes / two whole rests (lilylet has no breve) |
| [Surge_Propera_Exercise-1.mscz](2019/05/Surge_Propera_Exercise-1.lyl) | (unreferenced) | workbook-prompt | 26 | ok | 23 breve(s) written as tied whole notes / two whole rests (lilylet has no breve); 22 full-bar rests in bars longer than a whole note written as R1 |
| [Surge_Propera_Exercise.mscz](2019/05/Surge_Propera_Exercise.lyl) | (unreferenced) | workbook-prompt | 26 | ok | 29 breve(s) written as tied whole notes / two whole rests (lilylet has no breve) |
| [WK-16th-century-contraputal-style.mscz](2025/04/WK-16th-century-contraputal-style.lyl) | 08-16th-century-contrapuntal-style, 01-digital-workbook | workbook-prompt | 111 | ok | 57 breve(s) written as tied whole notes / two whole rests (lilylet has no breve); 211 full-bar rests in bars longer than a whole note written as R1 |

## counterpoint-species

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [WK-Cantus-Firmus-A.mscz](2026/07/WK-Cantus-Firmus-A.lyl) | 01-species-counterpoint | workbook-prompt | 24 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Cantus-Firmus-B.mscz](2026/07/WK-Cantus-Firmus-B.lyl) | 01-species-counterpoint | workbook-prompt | 23 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Fifth-species-Counterpoint-A.mscz](2026/07/WK-Fifth-species-Counterpoint-A.lyl) | 06-fifth-species-counterpoint | workbook-prompt | 20 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Fifth-species-Counterpoint-B.mscz](2026/07/WK-Fifth-species-Counterpoint-B.lyl) | 06-fifth-species-counterpoint | workbook-prompt | 20 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-First-species-Counterpoint-A.mscz](2026/07/WK-First-species-Counterpoint-A.lyl) | 02-first-species-counterpoint | workbook-prompt | 22 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-First-species-Counterpoint-B.mscz](2026/07/WK-First-species-Counterpoint-B.lyl) | 02-first-species-counterpoint | workbook-prompt | 22 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Fourth-species-Counterpoint-A.mscz](2026/07/WK-Fourth-species-Counterpoint-A.lyl) | 05-fourth-species-counterpoint | workbook-prompt | 19 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Fourth-species-Counterpoint-B.mscz](2026/07/WK-Fourth-species-Counterpoint-B.lyl) | 05-fourth-species-counterpoint | workbook-prompt | 19 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Second-species-Counterpoint-A.mscz](2026/07/WK-Second-species-Counterpoint-A.lyl) | 03-second-species-counterpoint | workbook-prompt | 23 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Second-species-Counterpoint-B.mscz](2026/07/WK-Second-species-Counterpoint-B.lyl) | 03-second-species-counterpoint | workbook-prompt | 23 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Third-species-Counterpoint-A.mscz](2026/07/WK-Third-species-Counterpoint-A.lyl) | 04-third-species-counterpoint | workbook-prompt | 18 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Third-species-Counterpoint-B.mscz](2026/07/WK-Third-species-Counterpoint-B.lyl) | 04-third-species-counterpoint | workbook-prompt | 16 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |

## jazz

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| COMP-bebop-part-2.mscz | 05-jazz-embellishing-chords, 06-substitutions, 01-digital-workbook | unknown |  | failed | not a MuseScore file (the upload is a PDF with an .mscz name) |
| COMP-bebop.mscz | 05-jazz-embellishing-chords, 06-substitutions, 01-digital-workbook | empty | 16 | skipped-empty | no notes and no chord symbols (blank template) |
| [WK-12-bar-blues.mscz](2019/08/WK-12-bar-blues.lyl) | 08-blues-harmony, 01-digital-workbook | workbook-prompt | 84 | ok-with-notes | source has 1 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; special noteheads (x/slash/diamond) not kept |
| [WK-Blues_Scales-1.mscz](2019/08/WK-Blues_Scales-1.lyl) | (unreferenced) | workbook-prompt | 21 | ok | same music as 2019/08/WK-Blues_Scales.lyl |
| [WK-Blues_Scales-answers.mscz](2019/08/WK-Blues_Scales-answers.lyl) | (unreferenced) | model/solution | 21 | ok | Verovio warnings: [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x1) |
| [WK-Blues_Scales.mscz](2019/08/WK-Blues_Scales.lyl) | 09-blues-melodies-and-the-blues-scale, 01-digital-workbook | workbook-prompt | 21 | ok |  |
| [WK-Lead-Sheet-Symbols-with-Extensions.mscx](2019/08/WK-Lead-Sheet-Symbols-with-Extensions.lyl) | (unreferenced) | workbook-prompt | 40 | ok | 9 chord symbols moved to the start of the note/tuplet they fall inside; 9 chord symbols sit inside a held note/rest in the source and are attached to that note's start |
| [WK-Lead-Sheet-Symbols.mscx](2019/08/WK-Lead-Sheet-Symbols.lyl) | (unreferenced) | workbook-prompt | 50 | ok | 20 chord symbols moved to the start of the note/tuplet they fall inside; 20 chord symbols sit inside a held note/rest in the source and are attached to that note's start |
| WK-composing-with-ii-v-i.mscz | 04-ii-v-i, 01-digital-workbook | empty | 8 | skipped-empty | no notes and no chord symbols (blank template) |
| [WK-improv.mscz](2019/08/WK-improv.lyl) | 09-blues-melodies-and-the-blues-scale, 01-digital-workbook | workbook-prompt | 24 | ok | 24 full-bar rests in bars longer than a whole note written as R1; 5 chord symbols moved to the start of the note/tuplet they fall inside; 5 chord symbols sit inside a held note/rest in the source and are attached to that note's start |
| [WK-voicing.mscz](2019/08/WK-voicing.lyl) | 03-jazz-voicings, 01-digital-workbook | workbook-prompt | 40 | ok | 18 duplicate chord ties merged; re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning) |
| [WK-Chord-Symbols-with-Extensions.mscz](2021/07/WK-Chord-Symbols-with-Extensions.lyl) | 02-chord-symbols, 01-digital-workbook | workbook-prompt | 40 | ok | 9 chord symbols moved to the start of the note/tuplet they fall inside; 9 chord symbols sit inside a held note/rest in the source and are attached to that note's start |
| [WK-Chord-Symbols.mscz](2021/07/WK-Chord-Symbols.lyl) | 02-chord-symbols, 01-digital-workbook | workbook-prompt | 50 | ok | 20 chord symbols moved to the start of the note/tuplet they fall inside; 20 chord symbols sit inside a held note/rest in the source and are attached to that note's start |
| [WK-swing-rhythms.mscz](2022/07/WK-swing-rhythms.lyl) | 01-swing-rhythms, 01-digital-workbook | workbook-prompt | 48 | ok | Verovio warnings: [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x5) |
| [WK-12-bar-blues-no-jazz.mscz](2023/01/WK-12-bar-blues-no-jazz.lyl) | 08-blues-harmony, 01-digital-workbook | workbook-prompt | 60 | ok-with-notes | special noteheads (x/slash/diamond) not kept |
| [embellishing-chords.mscz](2024/01/embellishing-chords.lyl) | 05-jazz-embellishing-chords, 01-digital-workbook | model/example | 59 | ok-with-notes | special noteheads (x/slash/diamond) not kept |
| [substitutions.mscz](2024/01/substitutions.lyl) | 06-substitutions, 01-digital-workbook | model/example | 43 | ok |  |
| COMP-bebop-part-2-audio-option.mscz | 05-jazz-embellishing-chords, 06-substitutions, 01-digital-workbook | empty | 16 | skipped-empty | no notes and no chord symbols (blank template) |

## chromatic-harmony

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [WK-Applied-Chords-A.mscz](2019/05/WK-Applied-Chords-A.lyl) | (unreferenced) | workbook-prompt | 35 | ok |  |
| [WK-neo-riemannian-composing.mscz](2019/07/WK-neo-riemannian-composing.lyl) | 12-neo-riemannian-triadic-progressions, 01-digital-workbook | workbook-prompt | 33 | ok | 1 common/cut time signatures restored (decoder drops <time symbol>) |
| [WK-Applied-Chords-B.mscz](2020/10/WK-Applied-Chords-B.lyl) | 15-tonicization, 01-digital-workbook | workbook-prompt | 35 | ok |  |
| [WK-Applied-Chords-B.mscz](2021/02/WK-Applied-Chords-B.lyl) | (unreferenced) | workbook-prompt | 35 | ok | same music as 2020/10/WK-Applied-Chords-B.lyl |
| [WK-neo-riemannian.mscz](2021/09/WK-neo-riemannian.lyl) | 12-neo-riemannian-triadic-progressions, 01-digital-workbook | workbook-prompt | 49 | ok |  |
| [WK-Applied-Chords-C.mscz](2023/02/WK-Applied-Chords-C.lyl) | 15-tonicization, 01-digital-workbook | workbook-prompt | 47 | ok | 2 chord symbols moved to the start of the note/tuplet they fall inside; 2 chord symbols sit inside a held note/rest in the source and are attached to that note's start |
| [1-assignment6-enharmonic-reinterpretation.mscz](2024/10/1-assignment6-enharmonic-reinterpretation.lyl) | 06-reinterpreting-augmented-sixth-chords, 01-digital-workbook | workbook-prompt | 21 | ok-with-notes | source has 112 invisible notes / 9 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; Verovio warnings: [Warning] Unsupported value '…' for data.ACCIDENTAL.GESTURAL (x1) |
| [WK-Harmonic-Elision.mscz](2026/08/WK-Harmonic-Elision.lyl) | 05-harmonic-elision | workbook-prompt | 46 | ok-with-notes | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60; source has 9 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; 49 tuplets containing chords regrouped after decoding (decoder splits chords inside tuplets); 2 zero-net <backup>/<forward> pairs around directions removed; 2 common/cut time signatures restored (decoder drops <time symbol>); re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning); Verovio warnings: [Warning] Expected @tie median or terminal in note '…', skipping it (x3); [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x4) |

## diatonic-harmony

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [bass-harmonizations.mscz](2019/05/bass-harmonizations.lyl) | (unreferenced) | model/example | 56 | ok |  |
| [WK-Classical-Cadence-Types-A.mscx](2019/09/WK-Classical-Cadence-Types-A.lyl) | (unreferenced) | workbook-prompt | 15 | ok-with-notes | source has 4 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here |
| [Emilie_Mayer__Abendglocken__No._1_from_2_Gesange_mm._13-21.mscz](2021/05/Emilie_Mayer__Abendglocken__No._1_from_2_Gesange_mm._13-21.lyl) | 05-cadential-64, 01-digital-workbook | model/example | 9 | ok |  |
| [Six_Concertante_Quartets_No._4_II_mm._54-61.mscz](2021/05/Six_Concertante_Quartets_No._4_II_mm._54-61.lyl) | 10-plagal-motion, 01-digital-workbook | model/example | 8 | ok | Verovio warnings: [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x4) |
| [WK-Introduction-to-Harmon-Cadences-and-Phrase-Endings-2.mscz](2023/08/WK-Introduction-to-Harmon-Cadences-and-Phrase-Endings-2.lyl) | 01-intro-to-harmony, 01-digital-workbook | workbook-prompt | 52 | ok | re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning) |
| [WK-embellishing-tones.mscz](2025/01/WK-embellishing-tones.lyl) | 04-embellishing-tones, 01-digital-workbook | workbook-prompt | 34 | ok | re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning) |

## rhythm-meter

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [WK-Rhythmic-Notation-Simple-A.mscx](2020/01/WK-Rhythmic-Notation-Simple-A.lyl) | (unreferenced) | workbook-prompt | 34 | ok-with-notes | source has 72 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; 2 common/cut time signatures restored (decoder drops <time symbol>); re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning) |
| [WK-Rhythmic-Notation-Compound-A.mscx](2020/05/WK-Rhythmic-Notation-Compound-A.lyl) | (unreferenced) | workbook-prompt | 26 | ok-with-notes | source has 88 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; 8 full-bar rests in bars longer than a whole note written as R1 |
| Ch9Ex11.mscx | (unreferenced) | model/example | 3 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex12.mscx | (unreferenced) | model/example | 3 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex13.mscx | (unreferenced) | model/example | 4 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex14.mscx | (unreferenced) | model/example | 4 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex15.mscx | (unreferenced) | model/example | 4 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex16.mscx | (unreferenced) | model/example | 3 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex17.mscx | (unreferenced) | model/example | 3 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex18.mscx | (unreferenced) | model/example | 3 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex19.mscx | (unreferenced) | model/example | 3 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex20.mscx | (unreferenced) | model/example | 3 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| Ch9Ex21.mscx | (unreferenced) | model/example | 2 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| [Ch9Ex23.mscx](2020/08/Ch9Ex23.lyl) | (unreferenced) | model/example | 2 | ok |  |
| [WK-Rhythmic-Notation-Simple-A-.mscz](2021/05/WK-Rhythmic-Notation-Simple-A-.lyl) | (unreferenced) | workbook-prompt | 34 | ok-with-notes | source has 54 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; 2 common/cut time signatures restored (decoder drops <time symbol>); re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning) |
| [WK-Rhythmic-Notation-Compound-A.mscz](2021/06/WK-Rhythmic-Notation-Compound-A.lyl) | (unreferenced) | workbook-prompt | 26 | ok-with-notes | source has 77 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; 8 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Rhythmic-Notation-Simple-A-.mscz](2021/06/WK-Rhythmic-Notation-Simple-A-.lyl) | (unreferenced) | workbook-prompt | 34 | ok-with-notes | source has 54 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; 2 common/cut time signatures restored (decoder drops <time symbol>); re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning); same music as 2021/05/WK-Rhythmic-Notation-Simple-A-.lyl |
| [WK-Rhythmic-Notation-Simple-A-1-1.mscz](2021/06/WK-Rhythmic-Notation-Simple-A-1-1.lyl) | (unreferenced) | workbook-prompt | 34 | ok-with-notes | source has 54 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; 2 common/cut time signatures restored (decoder drops <time symbol>); re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning); same music as 2021/05/WK-Rhythmic-Notation-Simple-A-.lyl |
| [WK-Grouping-Dissonance-Composition-Exercise.mscz](2024/06/WK-Grouping-Dissonance-Composition-Exercise.lyl) | 06-metrical-dissonance, 01-digital-workbook | workbook-prompt | 23 | ok |  |
| [WK-notating-rhythm-in-compound-meter.mscz](2024/06/WK-notating-rhythm-in-compound-meter.lyl) | 11-compound-meters-and-time-signatures, 01-digital-workbook | workbook-prompt | 13 | ok | 11 full-bar rests in bars longer than a whole note written as R1 |
| [WK-notating-rhythm-in-simple-meter.mscz](2024/06/WK-notating-rhythm-in-simple-meter.lyl) | 10-simple-meter-and-time-signatures, 01-digital-workbook | workbook-prompt | 21 | ok-with-notes | source has 3 invisible notes / 0 invisible chord symbols (hidden answers or playback notes); MuseScore's MusicXML export drops invisibility, so they are visible here; 2 common/cut time signatures restored (decoder drops <time symbol>); re-serializing the parsed file changes only the position of a \stem command inside \grace {} (same meaning) |

## popular-music

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [Modal_Reharmonization.musicxml](2019/05/Modal_Reharmonization.lyl) | (unreferenced) | model/example | 49 | ok | Verovio warnings: [Warning] Expected @tie median or terminal in note '…', skipping it (x1); [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x5) |
| [WK-fragile-absent-emergent.mscz](2023/01/WK-fragile-absent-emergent.lyl) | 15-fragile-absent-and-emergent-tonics, 01-digital-workbook | workbook-prompt | 26 | ok |  |
| WK-rhythm-and-meter-in-pop-music-transcription.mscz | 01-rhythm-and-meter-in-pop-music, 01-digital-workbook | workbook-prompt | 8 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |
| [WK-modal-schemas_Reharmonization.mscz](2023/06/WK-modal-schemas_Reharmonization.lyl) | 13-modal-schemas, 01-digital-workbook | workbook-prompt | 49 | ok | Verovio warnings: [Warning] Expected @tie median or terminal in note '…', skipping it (x1); [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x5) |
| WK-Drumbeats.mscz | 02-drumbeats, 01-digital-workbook | workbook-prompt | 12 | skipped-percussion | percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches) |

## form

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Brief-Melody-only-Sentences.mscx](2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Brief-Melody-only-Sentences.lyl) | 02-phrase-archetypes-unique-forms, 01-digital-workbook | workbook-prompt | 12 | ok |  |
| [WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Fully-realized-Sentences.mscx](2021/07/WK-The-Phrase-Archetypes-and-Unique-Forms-–-Composing-Fully-realized-Sentences.lyl) | 02-phrase-archetypes-unique-forms, 01-digital-workbook | workbook-prompt | 17 | ok | 1 common/cut time signatures restored (decoder drops <time symbol>); Verovio warnings: [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x1) |
| [binary-form-assignment-1-model-composition.mscz](2023/09/binary-form-assignment-1-model-composition.lyl) | 01-digital-workbook | model/solution | 24 | ok |  |
| [WK-Binary-Form-Guided-Composition.mscz](2026/08/WK-Binary-Form-Guided-Composition.lyl) | 06-binary-form | workbook-prompt | 24 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |

## post-tonal

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| [WK-Collections.mscz](2020/01/WK-Collections.lyl) | 09-collections, 01-digital-workbook | workbook-prompt | 8 | ok |  |
| [WK-Diatonic-Modes-Identification.mscz](2020/02/WK-Diatonic-Modes-Identification.lyl) | 08-diatonic-modes, 01-digital-workbook | workbook-prompt | 42 | ok | 15 tuplet group(s) without a <tuplet> bracket in the source wrapped in \tuplet; 5 duplicate chord ties merged; Verovio warnings: [Warning] Hairpin '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x1); [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x2) |
| [WK-Pitch-and-Pitch-Class.mscz](2021/08/WK-Pitch-and-Pitch-Class.lyl) | 02-pitch-and-pitch-class, 01-digital-workbook | workbook-prompt | 27 | ok |  |
| [WK-atonal-analysis-using-pc-sets.mscz](2023/07/WK-atonal-analysis-using-pc-sets.lyl) | 07-analyzing-with-set-theory, 01-digital-workbook | workbook-prompt | 6 | ok | 1 duplicate chord ties merged; Verovio warnings: [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x4) |

## fundamentals

| file | chapter | kind | bars | status | notes |
|---|---|---|---|---|---|
| WK-Key-Signatures-Major.mscx | (unreferenced) | empty | 34 | skipped-empty | no notes and no chord symbols (blank template) |
| [WK-Note-ID-and-Writing-A.mscx](2019/05/WK-Note-ID-and-Writing-A.lyl) | (unreferenced) | workbook-prompt | 120 | ok | same music as 2021/10/WK-Reading-Clefs-1.lyl |
| [WK-Note-ID-and-Writing-B.mscx](2019/05/WK-Note-ID-and-Writing-B.lyl) | (unreferenced) | workbook-prompt | 120 | ok | same music as 2021/10/WK-Reading-Clefs-2.lyl |
| WK-Scales-Minor.mscx | (unreferenced) | empty | 6 | skipped-empty | no notes and no chord symbols (blank template) |
| [WK-Intro-to-Roman-Numerals-A.mscx](2020/05/WK-Intro-to-Roman-Numerals-A.lyl) | (unreferenced) | workbook-prompt | 7 | ok | same music as 2021/10/WK-Roman-Numerals-1.lyl |
| [WK-Intro-to-Roman-Numerals-B.mscx](2020/05/WK-Intro-to-Roman-Numerals-B.lyl) | (unreferenced) | workbook-prompt | 13 | ok |  |
| [WK-Intro-to-Roman-Numerals-C.mscx](2020/05/WK-Intro-to-Roman-Numerals-C.lyl) | (unreferenced) | workbook-prompt | 10 | ok |  |
| WK-Key-Signatures-Minor.mscx | (unreferenced) | empty | 34 | skipped-empty | no notes and no chord symbols (blank template) |
| WK-Scales-Minor.mscx | (unreferenced) | empty | 6 | skipped-empty | no notes and no chord symbols (blank template) |
| [WK-Note-ID-and-Writing-A-.mscz](2021/05/WK-Note-ID-and-Writing-A-.lyl) | (unreferenced) | workbook-prompt | 120 | ok | same music as 2021/10/WK-Reading-Clefs-1.lyl |
| [WK-Note-ID-and-Writing-B.mscz](2021/05/WK-Note-ID-and-Writing-B.lyl) | (unreferenced) | workbook-prompt | 120 | ok | same music as 2021/10/WK-Reading-Clefs-2.lyl |
| WK-Chromatic-Scales-A.mscx | (unreferenced) | empty | 8 | skipped-empty | no notes and no chord symbols (blank template) |
| WK-Chromatic-Scales-B.mscx | (unreferenced) | empty | 8 | skipped-empty | no notes and no chord symbols (blank template) |
| WK-Diatonic-Modes-A.mscx | (unreferenced) | empty | 8 | skipped-empty | no notes and no chord symbols (blank template) |
| WK-Diatonic-Modes-B.mscx | (unreferenced) | empty | 8 | skipped-empty | no notes and no chord symbols (blank template) |
| [Seventh-Chord-Inversions.mscz](2021/07/Seventh-Chord-Inversions.lyl) | (unreferenced) | model/example | 20 | ok | same music as 2021/10/WK-Inversion-and-Figured-Bass-2.lyl |
| [WK-Intro-to-Roman-Numerals-A.mscz](2021/07/WK-Intro-to-Roman-Numerals-A.lyl) | (unreferenced) | workbook-prompt | 7 | ok | same music as 2021/10/WK-Roman-Numerals-1.lyl |
| [WK-Intro-to-Roman-Numerals-B.mscz](2021/07/WK-Intro-to-Roman-Numerals-B.lyl) | (unreferenced) | workbook-prompt | 10 | ok | same music as 2021/10/WK-Roman-Numerals-2.lyl |
| [WK-Intro-to-Roman-Numerals-C.mscz](2021/07/WK-Intro-to-Roman-Numerals-C.lyl) | (unreferenced) | workbook-prompt | 10 | ok | same music as 2021/10/WK-Roman-Numerals-3.lyl |
| [WK-Triad-Inversions.mscz](2021/07/WK-Triad-Inversions.lyl) | (unreferenced) | workbook-prompt | 20 | ok | same music as 2021/10/WK-Inversion-and-Figured-Bass-1.lyl |
| WK-Diatonic-Modes-and-the-Chromatic-Scale-1.mscx | (unreferenced) | empty | 8 | skipped-empty | no notes and no chord symbols (blank template) |
| WK-Diatonic-Modes-and-the-Chromatic-Scale-2.mscx | (unreferenced) | empty | 8 | skipped-empty | no notes and no chord symbols (blank template) |
| WK-Diatonic-Modes-and-the-Chromatic-Scale-3.mscx | (unreferenced) | empty | 8 | skipped-empty | no notes and no chord symbols (blank template) |
| WK-Diatonic-Modes-and-the-Chromatic-Scale-4.mscx | (unreferenced) | empty | 8 | skipped-empty | no notes and no chord symbols (blank template) |
| [WK-Intervals-1.mscz](2021/10/WK-Intervals-1.lyl) | (unreferenced) | workbook-prompt | 30 | ok |  |
| [WK-Intervals-2.mscz](2021/10/WK-Intervals-2.lyl) | (unreferenced) | workbook-prompt | 30 | ok |  |
| [WK-Intervals-3.mscz](2021/10/WK-Intervals-3.lyl) | (unreferenced) | workbook-prompt | 30 | ok |  |
| [WK-Inversion-and-Figured-Bass-1.mscz](2021/10/WK-Inversion-and-Figured-Bass-1.lyl) | 22-figured-bass, 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-Inversion-and-Figured-Bass-2.mscz](2021/10/WK-Inversion-and-Figured-Bass-2.lyl) | 22-figured-bass, 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-Reading-Clefs-1.mscz](2021/10/WK-Reading-Clefs-1.lyl) | 03-clefs, 01-digital-workbook | workbook-prompt | 120 | ok |  |
| [WK-Reading-Clefs-2.mscz](2021/10/WK-Reading-Clefs-2.lyl) | 03-clefs, 01-digital-workbook | workbook-prompt | 120 | ok |  |
| [WK-Roman-Numerals-1.mscz](2021/10/WK-Roman-Numerals-1.lyl) | 21-roman-numerals, 01-digital-workbook | workbook-prompt | 7 | ok |  |
| [WK-Roman-Numerals-2.mscz](2021/10/WK-Roman-Numerals-2.lyl) | 21-roman-numerals, 01-digital-workbook | workbook-prompt | 10 | ok |  |
| [WK-Roman-Numerals-3.mscz](2021/10/WK-Roman-Numerals-3.lyl) | 21-roman-numerals, 01-digital-workbook | workbook-prompt | 10 | ok |  |
| [WK-Reading-Clefs-treble-bass.mscz](2023/08/WK-Reading-Clefs-treble-bass.lyl) | 03-clefs, 01-digital-workbook | workbook-prompt | 60 | ok |  |
| [WK-Roman-numerals.mscz](2023/08/WK-Roman-numerals.lyl) | 21-roman-numerals, 01-digital-workbook | workbook-prompt | 42 | ok-with-notes | special noteheads (x/slash/diamond) not kept |
| [WK-American-Standard-Pitch-Notation-ASPN-treble-bass.mscz](2024/08/WK-American-Standard-Pitch-Notation-ASPN-treble-bass.lyl) | 06-aspn, 01-digital-workbook | workbook-prompt | 60 | ok |  |
| [WK-American-Standard-Pitch-Notation-ASPN.mscz](2024/08/WK-American-Standard-Pitch-Notation-ASPN.lyl) | 06-aspn, 01-digital-workbook | workbook-prompt | 120 | ok |  |
| [WK-Dim-and-Aug-Intervals-A.mscz](2025/07/WK-Dim-and-Aug-Intervals-A.lyl) | 17-intervals, 01-digital-workbook | workbook-prompt | 30 | ok |  |
| [WK-Dim-and-Aug-Intervals-B.mscz](2025/07/WK-Dim-and-Aug-Intervals-B.lyl) | 17-intervals, 01-digital-workbook | workbook-prompt | 30 | ok |  |
| [WK-Intervals-A.mscz](2025/07/WK-Intervals-A.lyl) | 17-intervals, 01-digital-workbook | workbook-prompt | 30 | ok |  |
| [WK-Intervals-B.mscz](2025/07/WK-Intervals-B.lyl) | 17-intervals, 01-digital-workbook | workbook-prompt | 30 | ok | 1 zero-net <backup>/<forward> pairs around directions removed |
| [WK-Intervals-C.mscz](2025/07/WK-Intervals-C.lyl) | 17-intervals, 01-digital-workbook | workbook-prompt | 30 | ok |  |
| [WK-Intervals-D.mscz](2025/07/WK-Intervals-D.lyl) | 17-intervals, 01-digital-workbook | workbook-prompt | 51 | ok-with-notes | special noteheads (x/slash/diamond) not kept; 19 zero-net <backup>/<forward> pairs around directions removed |
| [WK-Intervals-E.mscz](2025/07/WK-Intervals-E.lyl) | 17-intervals, 01-digital-workbook | workbook-prompt | 48 | ok-with-notes | special noteheads (x/slash/diamond) not kept; 25 zero-net <backup>/<forward> pairs around directions removed; Verovio warnings: [Warning] Expected @tie median or terminal in note '…', skipping it (x1); [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x1) |
| [WK-Ma-Mi-P-Intervals-A.mscz](2025/07/WK-Ma-Mi-P-Intervals-A.lyl) | 17-intervals, 01-digital-workbook | workbook-prompt | 30 | ok |  |
| [WK-Ma-Mi-P-Intervals-B.mscz](2025/07/WK-Ma-Mi-P-Intervals-B.lyl) | 17-intervals, 01-digital-workbook | workbook-prompt | 30 | ok |  |
| [WK-Major-Key-Signatures-A-TB.mscz](2025/07/WK-Major-Key-Signatures-A-TB.lyl) | 13-major-scales, 01-digital-workbook | workbook-prompt | 31 | ok | 5 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Major-Key-Signatures-A.mscz](2025/07/WK-Major-Key-Signatures-A.lyl) | 13-major-scales, 01-digital-workbook | workbook-prompt | 31 | ok | 5 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Major-Key-Signatures-B-TB.mscz](2025/07/WK-Major-Key-Signatures-B-TB.lyl) | 13-major-scales, 01-digital-workbook | workbook-prompt | 31 | ok | 5 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Major-Key-Signatures-B.mscz](2025/07/WK-Major-Key-Signatures-B.lyl) | 13-major-scales, 01-digital-workbook | workbook-prompt | 31 | ok | 5 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Major-Scales-A-TB.mscz](2025/07/WK-Major-Scales-A-TB.lyl) | 13-major-scales, 01-digital-workbook | workbook-prompt | 25 | ok | 6 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Major-Scales-A.mscz](2025/07/WK-Major-Scales-A.lyl) | 13-major-scales, 01-digital-workbook | workbook-prompt | 25 | ok | 6 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Major-Scales-B-TB.mscz](2025/07/WK-Major-Scales-B-TB.lyl) | 13-major-scales, 01-digital-workbook | workbook-prompt | 25 | ok | 6 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Minor-Scales-A-TB.mscz](2025/07/WK-Minor-Scales-A-TB.lyl) | 14-minor-scales | workbook-prompt | 25 | ok | 6 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Minor-Scales-A.mscz](2025/07/WK-Minor-Scales-A.lyl) | 14-minor-scales | workbook-prompt | 25 | ok | 6 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Minor-Scales-B-TB.mscz](2025/07/WK-Minor-Scales-B-TB.lyl) | 14-minor-scales | workbook-prompt | 25 | ok | 6 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Minor-Scales-B.mscz](2025/07/WK-Minor-Scales-B.lyl) | 14-minor-scales | workbook-prompt | 25 | ok | 6 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Seventh-Chord-Inversion.mscz](2025/07/WK-Seventh-Chord-Inversion.lyl) | 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-Triad-Inversion.mscz](2025/07/WK-Triad-Inversion.lyl) | 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-chromatic-scales-A-TB.mscz](2025/07/WK-chromatic-scales-A-TB.lyl) | 15-intro-to-diatonic-modes-and-the-chromatic-scale, 01-digital-workbook | workbook-prompt | 12 | ok | 4 breve(s) written as tied whole notes / two whole rests (lilylet has no breve); 6 full-bar rests in bars longer than a whole note written as R1; Verovio warnings: [Warning] Unsupported value '…' for data.ACCIDENTAL.GESTURAL (x1) |
| [WK-chromatic-scales-A.mscz](2025/07/WK-chromatic-scales-A.lyl) | 15-intro-to-diatonic-modes-and-the-chromatic-scale, 01-digital-workbook | workbook-prompt | 12 | ok | 4 breve(s) written as tied whole notes / two whole rests (lilylet has no breve); 6 full-bar rests in bars longer than a whole note written as R1; Verovio warnings: [Warning] Unsupported value '…' for data.ACCIDENTAL.GESTURAL (x1) |
| [WK-chromatic-scales-B-TB.mscz](2025/07/WK-chromatic-scales-B-TB.lyl) | 15-intro-to-diatonic-modes-and-the-chromatic-scale, 01-digital-workbook | workbook-prompt | 12 | ok | 4 breve(s) written as tied whole notes / two whole rests (lilylet has no breve); 6 full-bar rests in bars longer than a whole note written as R1; Verovio warnings: [Warning] Unsupported value '…' for data.ACCIDENTAL.GESTURAL (x1) |
| [WK-chromatic-scales-B.mscz](2025/07/WK-chromatic-scales-B.lyl) | 15-intro-to-diatonic-modes-and-the-chromatic-scale, 01-digital-workbook | workbook-prompt | 12 | ok | 4 breve(s) written as tied whole notes / two whole rests (lilylet has no breve); 6 full-bar rests in bars longer than a whole note written as R1; Verovio warnings: [Warning] Unsupported value '…' for data.ACCIDENTAL.GESTURAL (x1) |
| [WK-Minor-Key-Signatures-A-TB.mscz](2025/08/WK-Minor-Key-Signatures-A-TB.lyl) | 14-minor-scales, 01-digital-workbook | workbook-prompt | 30 | ok | 5 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Minor-Key-Signatures-A.mscz](2025/08/WK-Minor-Key-Signatures-A.lyl) | 14-minor-scales, 01-digital-workbook | workbook-prompt | 30 | ok | 5 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Minor-Key-Signatures-B-TB.mscz](2025/08/WK-Minor-Key-Signatures-B-TB.lyl) | 14-minor-scales, 01-digital-workbook | workbook-prompt | 30 | ok | 5 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Minor-Key-Signatures-B.mscz](2025/08/WK-Minor-Key-Signatures-B.lyl) | 14-minor-scales, 01-digital-workbook | workbook-prompt | 30 | ok | 5 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Seventh-Chords-A.mscz](2025/08/WK-Seventh-Chords-A.lyl) | 19-seventh-chords, 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-Seventh-Chords-B.mscz](2025/08/WK-Seventh-Chords-B.lyl) | 19-seventh-chords, 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-Seventh-Chords-C.mscz](2025/08/WK-Seventh-Chords-C.lyl) | 19-seventh-chords, 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-Seventh-Chords-D.mscz](2025/08/WK-Seventh-Chords-D.lyl) | 19-seventh-chords, 01-digital-workbook | workbook-prompt | 53 | ok |  |
| [WK-Triads-A.mscz](2025/08/WK-Triads-A.lyl) | 18-triads, 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-Triads-B.mscz](2025/08/WK-Triads-B.lyl) | 18-triads, 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-Triads-C.mscz](2025/08/WK-Triads-C.lyl) | 18-triads, 01-digital-workbook | workbook-prompt | 20 | ok |  |
| [WK-Triads-D.mscz](2025/08/WK-Triads-D.lyl) | 18-triads, 01-digital-workbook | workbook-prompt | 47 | ok | 5 zero-net <backup>/<forward> pairs around directions removed; Verovio warnings: [Warning] Slur '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x1); [Warning] Hairpin '…' is not encoded in the measure of its start '…'. This may cause improper rendering. (x1) |
| [WK-diatonic-modes-A.mscz](2025/08/WK-diatonic-modes-A.lyl) | 15-intro-to-diatonic-modes-and-the-chromatic-scale, 01-digital-workbook | workbook-prompt | 16 | ok |  |
| [WK-diatonic-modes-B-TB.mscz](2025/08/WK-diatonic-modes-B-TB.lyl) | 15-intro-to-diatonic-modes-and-the-chromatic-scale, 01-digital-workbook | workbook-prompt | 16 | ok |  |
| [WK-diatonic-modes-B.mscz](2025/08/WK-diatonic-modes-B.lyl) | 15-intro-to-diatonic-modes-and-the-chromatic-scale, 01-digital-workbook | workbook-prompt | 16 | ok |  |
| [WK-enharmonic-equivalence-TB.mscz](2025/08/WK-enharmonic-equivalence-TB.lyl) | 05-half-and-whole-steps, 01-digital-workbook | workbook-prompt | 45 | ok | Verovio warnings: [Warning] Unsupported value '…' for data.ACCIDENTAL.GESTURAL (x1) |
| [WK-enharmonic-equivalence.mscz](2025/08/WK-enharmonic-equivalence.lyl) | 05-half-and-whole-steps, 01-digital-workbook | workbook-prompt | 45 | ok | Verovio warnings: [Warning] Unsupported value '…' for data.ACCIDENTAL.GESTURAL (x1) |
| [WK-half-and-whole-steps-in-staff-notation-TB.mscz](2025/08/WK-half-and-whole-steps-in-staff-notation-TB.lyl) | 05-half-and-whole-steps | workbook-prompt | 71 | ok | 55 full-bar rests in bars longer than a whole note written as R1 |
| [WK-Seventh-Chord-Inversion-A.mscz](2026/06/WK-Seventh-Chord-Inversion-A.lyl) | 20-inversion | workbook-prompt | 20 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Seventh-Chord-Inversion-B.mscz](2026/06/WK-Seventh-Chord-Inversion-B.lyl) | 20-inversion | workbook-prompt | 20 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60; same music as 2026/06/WK-Seventh-Chord-Inversion-A.lyl |
| [WK-Triad-Inversion-A.mscz](2026/06/WK-Triad-Inversion-A.lyl) | 20-inversion | workbook-prompt | 20 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60 |
| [WK-Triad-Inversion-B.mscz](2026/06/WK-Triad-Inversion-B.lyl) | 20-inversion | workbook-prompt | 20 | ok | saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60; same music as 2026/06/WK-Triad-Inversion-A.lyl |

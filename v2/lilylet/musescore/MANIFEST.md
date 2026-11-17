# MuseScore page drafts

Automatic Lilylet drafts of the first pages of the MuseScore scores linked from the book (`musescore-svg/*_p0.svg`),
made by the event-graph importer in `scripts/svg/` (see `scripts/svg/README.md`). **These are drafts, not verified
transcriptions.** `consistent` only means every measure adds up and the Lilylet round-trips to the same notes, tempos
and marks; it does not mean the draft matches the source. Text other than tempo (lyrics, chord symbols, Roman numerals),
dynamics, slurs and ottava lines are not transcribed (per-file `quality.unrepresented`).

- files: 453, drafts: 453, failed: 0
- quality: consistent 373, flagged 80, broken 0
- review: pending 453
- linked from a chapter: 453

Regenerate: `node --import tsx scripts/svg/batch-to-lilylet.ts --limit 453`, then `node --import tsx scripts/svg/publish-drafts.ts`.

| draft | quality | consistent measures | flags | chapters |
|---|---|---|---|---|
| [27638568_4985985_p0.lyl](27638568_4985985_p0.lyl) | consistent | 17/17 |  | 05-chromaticism/07-augmented-options |
| [27638568_5101361_p0.lyl](27638568_5101361_p0.lyl) | consistent | 13/13 |  | 05-chromaticism/07-augmented-options |
| [27638568_5879039_p0.lyl](27638568_5879039_p0.lyl) | consistent | 18/18 |  | 05-chromaticism/13-mediants |
| [30425053_184326268247666_p0.lyl](30425053_184326268247666_p0.lyl) | consistent | 7/7 |  | 09-twelve-tone-music/06-history-and-context-of-serialism |
| [30425053_26285584_p0.lyl](30425053_26285584_p0.lyl) | consistent | 66/66 |  | 02-counterpoint/01-species-counterpoint |
| [30425053_403299860346169_p0.lyl](30425053_403299860346169_p0.lyl) | consistent | 4/4 |  | 09-twelve-tone-music/05-composing-with-twelve-tones |
| [30425053_5350117_p0.lyl](30425053_5350117_p0.lyl) | consistent | 34/34 |  | 02-counterpoint/11-galant-schemas |
| [30425053_5350121_p0.lyl](30425053_5350121_p0.lyl) | consistent | 32/32 |  | 02-counterpoint/13-rule-of-the-octave |
| [30425053_5350123_p0.lyl](30425053_5350123_p0.lyl) | consistent | 80/80 |  | 02-counterpoint/13-rule-of-the-octave |
| [30425053_5350126_p0.lyl](30425053_5350126_p0.lyl) | consistent | 48/48 |  | 02-counterpoint/13-rule-of-the-octave |
| [30425053_727981229895898_p0.lyl](30425053_727981229895898_p0.lyl) | consistent | 7/7 |  | 12-anthology/03-anthology-twelve-tone |
| [30425053_8135649_p0.lyl](30425053_8135649_p0.lyl) | consistent | 32/32 |  | 05-chromaticism/13-mediants |
| [30425053_8171934_p0.lyl](30425053_8171934_p0.lyl) | consistent | 12/12 |  | 09-twelve-tone-music/04-twelve-tone-analysis-examples-webern-op-21-and-24 |
| [30425053_8171973_p0.lyl](30425053_8171973_p0.lyl) | consistent | 12/12 |  | 09-twelve-tone-music/04-twelve-tone-analysis-examples-webern-op-21-and-24 |
| [32728834_10006141_p0.lyl](32728834_10006141_p0.lyl) | consistent | 4/4 |  | 06-jazz/05-jazz-embellishing-chords |
| [32728834_10460137_p0.lyl](32728834_10460137_p0.lyl) | consistent | 1/1 |  | 07-popular-music/02-drumbeats |
| [32728834_11018989_p0.lyl](32728834_11018989_p0.lyl) | flagged | 5/8 | voiceGap×3 | 11-rhythm-and-meter/05-hypermeter |
| [32728834_11019235_p0.lyl](32728834_11019235_p0.lyl) | flagged | 0/4 | surplusTime×3, tickOverlapped×2, columnTwist×2, shortMeasure×1 | 11-rhythm-and-meter/05-hypermeter |
| [32728834_11093566_p0.lyl](32728834_11093566_p0.lyl) | flagged | 5/6 | voiceGap×1 | 10-orchestration/01-core-principles-of-orchestration |
| [32728834_11095075_p0.lyl](32728834_11095075_p0.lyl) | consistent | 4/4 |  | 10-orchestration/01-core-principles-of-orchestration |
| [32728834_11096065_p0.lyl](32728834_11096065_p0.lyl) | consistent | 4/4 |  | 06-jazz/03-jazz-voicings |
| [32728834_11302186_p0.lyl](32728834_11302186_p0.lyl) | consistent | 1/1 |  | 07-popular-music/02-drumbeats |
| [32728834_11302192_p0.lyl](32728834_11302192_p0.lyl) | consistent | 1/1 |  | 07-popular-music/02-drumbeats |
| [32728834_11302207_p0.lyl](32728834_11302207_p0.lyl) | flagged | 0/2 | voiceGap×2 | 07-popular-music/02-drumbeats |
| [32728834_11302264_p0.lyl](32728834_11302264_p0.lyl) | consistent | 2/2 |  | 07-popular-music/02-drumbeats |
| [32728834_11302321_p0.lyl](32728834_11302321_p0.lyl) | consistent | 3/3 |  | 07-popular-music/02-drumbeats |
| [32728834_11302333_p0.lyl](32728834_11302333_p0.lyl) | consistent | 2/2 |  | 07-popular-music/02-drumbeats |
| [32728834_11346568_p0.lyl](32728834_11346568_p0.lyl) | consistent | 1/1 |  | 07-popular-music/02-drumbeats |
| [32728834_11374390_p0.lyl](32728834_11374390_p0.lyl) | consistent | 1/1 |  | 07-popular-music/02-drumbeats |
| [32728834_11513893_p0.lyl](32728834_11513893_p0.lyl) | consistent | 5/5 |  | 07-popular-music/14-pentatonic-harmony |
| [32728834_11516206_p0.lyl](32728834_11516206_p0.lyl) | consistent | 6/6 |  | 11-rhythm-and-meter/06-metrical-dissonance |
| [32728834_11517073_p0.lyl](32728834_11517073_p0.lyl) | flagged | 11/12 | voiceGap×1 | 11-rhythm-and-meter/06-metrical-dissonance |
| [32728834_11517730_p0.lyl](32728834_11517730_p0.lyl) | consistent | 2/2 |  | 11-rhythm-and-meter/06-metrical-dissonance |
| [32728834_11518048_p0.lyl](32728834_11518048_p0.lyl) | flagged | 5/6 | surplusTime×1, tickOverlapped×1, columnTwist×1 | 11-rhythm-and-meter/06-metrical-dissonance |
| [32728834_11556445_p0.lyl](32728834_11556445_p0.lyl) | consistent | 5/5 |  | 11-rhythm-and-meter/06-metrical-dissonance |
| [32728834_11556457_p0.lyl](32728834_11556457_p0.lyl) | consistent | 4/4 |  | 11-rhythm-and-meter/06-metrical-dissonance |
| [32728834_11556466_p0.lyl](32728834_11556466_p0.lyl) | consistent | 2/2 |  | 11-rhythm-and-meter/06-metrical-dissonance |
| [32728834_11765812_p0.lyl](32728834_11765812_p0.lyl) | flagged | 9/10 | shortMeasure×1 | 01-fundamentals/21-roman-numerals |
| [32728834_11967037_p0.lyl](32728834_11967037_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/06-inverted-v7s |
| [32728834_12259201_p0.lyl](32728834_12259201_p0.lyl) | consistent | 3/3 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12259252_p0.lyl](32728834_12259252_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12259285_p0.lyl](32728834_12259285_p0.lyl) | flagged | 2/3 | shortMeasure×1 | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12272548_p0.lyl](32728834_12272548_p0.lyl) | flagged | 4/5 | surplusTime×1, tickOverlapped×1, columnTwist×1 | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12273394_p0.lyl](32728834_12273394_p0.lyl) | flagged | 0/7 | voiceGap×2, shortMeasure×5 | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12280573_p0.lyl](32728834_12280573_p0.lyl) | consistent | 1/1 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12500938_p0.lyl](32728834_12500938_p0.lyl) | consistent | 14/14 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12501856_p0.lyl](32728834_12501856_p0.lyl) | consistent | 8/8 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12522556_p0.lyl](32728834_12522556_p0.lyl) | consistent | 8/8 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12523291_p0.lyl](32728834_12523291_p0.lyl) | flagged | 7/8 | shortMeasure×1 | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12523381_p0.lyl](32728834_12523381_p0.lyl) | flagged | 8/9 | shortMeasure×1 | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12523876_p0.lyl](32728834_12523876_p0.lyl) | consistent | 14/14 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12524053_p0.lyl](32728834_12524053_p0.lyl) | flagged | 5/9 | surplusTime×3, tickOverlapped×3, columnTwist×3, tooManyVoices×2, shortMeasure×1 | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12524245_p0.lyl](32728834_12524245_p0.lyl) | consistent | 2/2 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12524392_p0.lyl](32728834_12524392_p0.lyl) | flagged | 7/8 | voiceGap×1 | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_12664156_p0.lyl](32728834_12664156_p0.lyl) | flagged | 0/8 | voiceGap×3, tickOverlapped×8, columnTwist×8, surplusTime×7 | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_12667216_p0.lyl](32728834_12667216_p0.lyl) | consistent | 14/14 |  | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_12667603_p0.lyl](32728834_12667603_p0.lyl) | flagged | 21/25 | surplusTime×4, tickOverlapped×1, columnTwist×1 | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_12680431_p0.lyl](32728834_12680431_p0.lyl) | flagged | 19/22 | surplusTime×2, tickOverlapped×2, columnTwist×2, shortMeasure×1 | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_12743104_p0.lyl](32728834_12743104_p0.lyl) | consistent | 11/11 |  | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_12743365_p0.lyl](32728834_12743365_p0.lyl) | consistent | 9/9 |  | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_13130983_p0.lyl](32728834_13130983_p0.lyl) | consistent | 12/12 |  | 07-popular-music/07-texture-in-pop-music |
| [32728834_13782358_p0.lyl](32728834_13782358_p0.lyl) | consistent | 12/12 |  | 06-jazz/05-jazz-embellishing-chords |
| [32728834_14849320_p0.lyl](32728834_14849320_p0.lyl) | consistent | 8/8 |  | 07-popular-music/09-blues-based-schemas |
| [32728834_15052381_p0.lyl](32728834_15052381_p0.lyl) | consistent | 1/1 |  | 07-popular-music/02-drumbeats |
| [32728834_15249751_p0.lyl](32728834_15249751_p0.lyl) | consistent | 1/1 |  | 07-popular-music/02-drumbeats |
| [32728834_19884595_p0.lyl](32728834_19884595_p0.lyl) | flagged | 3/4 | shortMeasure×1 | 01-fundamentals/21-roman-numerals |
| [32728834_20559166_p0.lyl](32728834_20559166_p0.lyl) | flagged | 3/4 | tooManyVoices×1, surplusTime×1, tickOverlapped×1, columnTwist×1 | 05-chromaticism/09-chromatic-sequences |
| [32728834_20559307_p0.lyl](32728834_20559307_p0.lyl) | flagged | 3/4 | tooManyVoices×1, surplusTime×1, tickOverlapped×1, columnTwist×1 | 05-chromaticism/09-chromatic-sequences |
| [32728834_20559394_p0.lyl](32728834_20559394_p0.lyl) | flagged | 3/4 | tooManyVoices×1, surplusTime×1, tickOverlapped×1, columnTwist×1 | 05-chromaticism/09-chromatic-sequences |
| [32728834_20560195_p0.lyl](32728834_20560195_p0.lyl) | flagged | 0/5 | surplusTime×5 | 05-chromaticism/09-chromatic-sequences |
| [32728834_20911636_p0.lyl](32728834_20911636_p0.lyl) | consistent | 7/7 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_20911720_p0.lyl](32728834_20911720_p0.lyl) | consistent | 7/7 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_20914981_p0.lyl](32728834_20914981_p0.lyl) | flagged | 4/5 | shortMeasure×1 | 05-chromaticism/09-chromatic-sequences |
| [32728834_20917744_p0.lyl](32728834_20917744_p0.lyl) | consistent | 7/7 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_20919328_p0.lyl](32728834_20919328_p0.lyl) | consistent | 7/7 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_20999047_p0.lyl](32728834_20999047_p0.lyl) | consistent | 16/16 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_20999587_p0.lyl](32728834_20999587_p0.lyl) | consistent | 10/10 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_21000682_p0.lyl](32728834_21000682_p0.lyl) | consistent | 7/7 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_21147820_p0.lyl](32728834_21147820_p0.lyl) | consistent | 7/7 |  | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_21148363_p0.lyl](32728834_21148363_p0.lyl) | flagged | 1/7 | surplusTime×6, tickOverlapped×6, columnTwist×6 | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_21203566_p0.lyl](32728834_21203566_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/10-the-omnibus-progression |
| [32728834_21207871_p0.lyl](32728834_21207871_p0.lyl) | consistent | 2/2 |  | 05-chromaticism/10-the-omnibus-progression |
| [32728834_21226327_p0.lyl](32728834_21226327_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/10-the-omnibus-progression |
| [32728834_21361027_p0.lyl](32728834_21361027_p0.lyl) | consistent | 19/19 |  | 05-chromaticism/10-the-omnibus-progression |
| [32728834_21361219_p0.lyl](32728834_21361219_p0.lyl) | flagged | 6/10 | voiceGap×3, surplusTime×2, tickOverlapped×2, columnTwist×2 | 05-chromaticism/10-the-omnibus-progression |
| [32728834_21376111_p0.lyl](32728834_21376111_p0.lyl) | consistent | 9/9 |  | 05-chromaticism/10-the-omnibus-progression |
| [32728834_21393718_p0.lyl](32728834_21393718_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/10-the-omnibus-progression |
| [32728834_21507970_p0.lyl](32728834_21507970_p0.lyl) | consistent | 3/3 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_22734802_p0.lyl](32728834_22734802_p0.lyl) | consistent | 12/12 |  | 06-jazz/08-blues-harmony |
| [32728834_23270794_p0.lyl](32728834_23270794_p0.lyl) | flagged | 1/2 | surplusTime×1, tickOverlapped×1, columnTwist×1 | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_23335099_p0.lyl](32728834_23335099_p0.lyl) | consistent | 1/1 |  | 06-jazz/02-chord-symbols |
| [32728834_23457127_p0.lyl](32728834_23457127_p0.lyl) | consistent | 28/28 |  | 03-diatonic-harmony/15-tonicization |
| [32728834_23457517_p0.lyl](32728834_23457517_p0.lyl) | consistent | 30/30 |  | 04-form/06-binary-form |
| [32728834_23457877_p0.lyl](32728834_23457877_p0.lyl) | consistent | 12/12 |  | 04-form/06-binary-form |
| [32728834_23459728_p0.lyl](32728834_23459728_p0.lyl) | flagged | 22/26 | shortMeasure×4 | 04-form/06-binary-form |
| [32728834_23459752_p0.lyl](32728834_23459752_p0.lyl) | flagged | 8/12 | surplusTime×2, shortMeasure×2 | 04-form/06-binary-form |
| [32728834_24640900_p0.lyl](32728834_24640900_p0.lyl) | flagged | 8/9 | surplusTime×1 | 02-counterpoint/05-fourth-species-counterpoint |
| [32728834_24655597_p0.lyl](32728834_24655597_p0.lyl) | flagged | 8/9 | shortMeasure×1 | 10-orchestration/02-subtle-color-changes |
| [32728834_25132750_p0.lyl](32728834_25132750_p0.lyl) | flagged | 1/6 | voiceGap×5, tickOverlapped×1, columnTwist×1, surplusTime×1 | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_26074177_p0.lyl](32728834_26074177_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/14-diatonic-sequences |
| [32728834_26074258_p0.lyl](32728834_26074258_p0.lyl) | flagged | 14/16 | columnConflict×1, voiceGap×2, tickOverlapped×2, columnTwist×2, surplusTime×1 | 03-diatonic-harmony/14-diatonic-sequences |
| [32728834_26074285_p0.lyl](32728834_26074285_p0.lyl) | flagged | 2/3 | surplusTime×1, tickOverlapped×1, columnTwist×1 | 03-diatonic-harmony/14-diatonic-sequences |
| [32728834_26074309_p0.lyl](32728834_26074309_p0.lyl) | flagged | 10/11 | shortMeasure×1 | 03-diatonic-harmony/14-diatonic-sequences |
| [32728834_26074324_p0.lyl](32728834_26074324_p0.lyl) | flagged | 7/11 | tooManyVoices×3, surplusTime×3, tickOverlapped×3, columnTwist×3, shortMeasure×1 | 03-diatonic-harmony/14-diatonic-sequences |
| [32728834_26074351_p0.lyl](32728834_26074351_p0.lyl) | flagged | 12/13 | shortMeasure×1 | 03-diatonic-harmony/14-diatonic-sequences |
| [32728834_26265205_p0.lyl](32728834_26265205_p0.lyl) | consistent | 6/6 |  | 04-form/07-ternary-form |
| [32728834_26283736_p0.lyl](32728834_26283736_p0.lyl) | consistent | 10/10 |  | 02-counterpoint/06-fifth-species-counterpoint |
| [32728834_26284273_p0.lyl](32728834_26284273_p0.lyl) | consistent | 16/16 |  | 05-chromaticism/03-augmented-sixth-chords |
| [32728834_26285815_p0.lyl](32728834_26285815_p0.lyl) | consistent | 11/11 |  | 02-counterpoint/01-species-counterpoint |
| [32728834_26419297_p0.lyl](32728834_26419297_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26438716_p0.lyl](32728834_26438716_p0.lyl) | consistent | 7/7 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26439733_p0.lyl](32728834_26439733_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26439772_p0.lyl](32728834_26439772_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26439799_p0.lyl](32728834_26439799_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26439829_p0.lyl](32728834_26439829_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26439871_p0.lyl](32728834_26439871_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26439892_p0.lyl](32728834_26439892_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26439928_p0.lyl](32728834_26439928_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26441134_p0.lyl](32728834_26441134_p0.lyl) | consistent | 6/6 |  | 01-fundamentals/15-intro-to-diatonic-modes-and-the-chromatic-scale |
| [32728834_26579989_p0.lyl](32728834_26579989_p0.lyl) | consistent | 8/8 |  | 01-fundamentals/22-figured-bass |
| [32728834_26580793_p0.lyl](32728834_26580793_p0.lyl) | flagged | 5/8 | surplusTime×3 | 01-fundamentals/22-figured-bass |
| [32728834_27040801_p0.lyl](32728834_27040801_p0.lyl) | consistent | 9/9 |  | 15-chapters-in-development/02-hypermeter2 |
| [32728834_38246030_p0.lyl](32728834_38246030_p0.lyl) | consistent | 8/8 |  | 03-diatonic-harmony/14-diatonic-sequences |
| [32728834_5689622_p0.lyl](32728834_5689622_p0.lyl) | consistent | 7/7 |  | 06-jazz/03-jazz-voicings |
| [32728834_5706820_p0.lyl](32728834_5706820_p0.lyl) | consistent | 8/8 |  | 08-20th-and-21st-century-techniques/03-intervals-in-integer-notation |
| [32728834_5709329_p0.lyl](32728834_5709329_p0.lyl) | consistent | 4/4 |  | 06-jazz/04-ii-v-i |
| [32728834_5711118_p0.lyl](32728834_5711118_p0.lyl) | consistent | 6/6 |  | 06-jazz/04-ii-v-i |
| [32728834_5719601_p0.lyl](32728834_5719601_p0.lyl) | consistent | 6/6 |  | 06-jazz/06-substitutions |
| [32728834_5719610_p0.lyl](32728834_5719610_p0.lyl) | consistent | 5/5 |  | 06-jazz/06-substitutions |
| [32728834_5719690_p0.lyl](32728834_5719690_p0.lyl) | consistent | 4/4 |  | 06-jazz/05-jazz-embellishing-chords |
| [32728834_5719733_p0.lyl](32728834_5719733_p0.lyl) | consistent | 4/4 |  | 06-jazz/05-jazz-embellishing-chords |
| [32728834_5721622_p0.lyl](32728834_5721622_p0.lyl) | consistent | 6/6 |  | 06-jazz/06-substitutions |
| [32728834_5721771_p0.lyl](32728834_5721771_p0.lyl) | consistent | 12/12 |  | 06-jazz/06-substitutions |
| [32728834_5742815_p0.lyl](32728834_5742815_p0.lyl) | flagged | 11/12 | shortMeasure×1 | 06-jazz/09-blues-melodies-and-the-blues-scale |
| [32728834_5769529_p0.lyl](32728834_5769529_p0.lyl) | consistent | 4/4 |  | 07-popular-music/10-4-chord-schemas |
| [32728834_5769536_p0.lyl](32728834_5769536_p0.lyl) | flagged | 4/5 | voiceGap×1 | 07-popular-music/10-4-chord-schemas |
| [32728834_5769537_p0.lyl](32728834_5769537_p0.lyl) | consistent | 8/8 |  | 07-popular-music/10-4-chord-schemas |
| [32728834_5769538_p0.lyl](32728834_5769538_p0.lyl) | consistent | 8/8 |  | 07-popular-music/10-4-chord-schemas |
| [32728834_5769540_p0.lyl](32728834_5769540_p0.lyl) | consistent | 16/16 |  | 07-popular-music/10-4-chord-schemas |
| [32728834_5772897_p0.lyl](32728834_5772897_p0.lyl) | consistent | 14/14 |  | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_5772904_p0.lyl](32728834_5772904_p0.lyl) | flagged | 13/14 | tooManyVoices×1, surplusTime×1, tickOverlapped×1, columnTwist×1 | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_5772922_p0.lyl](32728834_5772922_p0.lyl) | consistent | 14/14 |  | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_5772942_p0.lyl](32728834_5772942_p0.lyl) | consistent | 14/14 |  | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_5772954_p0.lyl](32728834_5772954_p0.lyl) | consistent | 14/14 |  | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_5772955_p0.lyl](32728834_5772955_p0.lyl) | consistent | 14/14 |  | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_5804531_p0.lyl](32728834_5804531_p0.lyl) | consistent | 1/1 |  | 07-popular-music/09-blues-based-schemas |
| [32728834_5804559_p0.lyl](32728834_5804559_p0.lyl) | consistent | 4/4 |  | 07-popular-music/09-blues-based-schemas |
| [32728834_5804585_p0.lyl](32728834_5804585_p0.lyl) | consistent | 2/2 |  | 07-popular-music/09-blues-based-schemas |
| [32728834_5804779_p0.lyl](32728834_5804779_p0.lyl) | consistent | 2/2 |  | 07-popular-music/09-blues-based-schemas |
| [32728834_5804789_p0.lyl](32728834_5804789_p0.lyl) | consistent | 5/5 |  | 07-popular-music/09-blues-based-schemas |
| [32728834_5807341_p0.lyl](32728834_5807341_p0.lyl) | consistent | 4/4 |  | 07-popular-music/09-blues-based-schemas |
| [32728834_5807378_p0.lyl](32728834_5807378_p0.lyl) | consistent | 4/4 |  | 07-popular-music/09-blues-based-schemas |
| [32728834_5810723_p0.lyl](32728834_5810723_p0.lyl) | flagged | 8/9 | shortMeasure×1 | 07-popular-music/10-4-chord-schemas |
| [32728834_5825283_p0.lyl](32728834_5825283_p0.lyl) | consistent | 8/8 |  | 07-popular-music/11-classical-schemas |
| [32728834_5825400_p0.lyl](32728834_5825400_p0.lyl) | consistent | 2/2 |  | 07-popular-music/11-classical-schemas |
| [32728834_5826636_p0.lyl](32728834_5826636_p0.lyl) | consistent | 4/4 |  | 07-popular-music/11-classical-schemas |
| [32728834_5846453_p0.lyl](32728834_5846453_p0.lyl) | consistent | 4/4 |  | 07-popular-music/01-rhythm-and-meter-in-pop-music |
| [32728834_5863931_p0.lyl](32728834_5863931_p0.lyl) | consistent | 14/14 |  | 07-popular-music/14-pentatonic-harmony |
| [32728834_5863947_p0.lyl](32728834_5863947_p0.lyl) | consistent | 4/4 |  | 07-popular-music/14-pentatonic-harmony |
| [32728834_5863978_p0.lyl](32728834_5863978_p0.lyl) | consistent | 4/4 |  | 07-popular-music/14-pentatonic-harmony |
| [32728834_5873719_p0.lyl](32728834_5873719_p0.lyl) | flagged | 7/8 | surplusTime×1 | 07-popular-music/15-fragile-absent-and-emergent-tonics |
| [32728834_5937554_p0.lyl](32728834_5937554_p0.lyl) | consistent | 2/2 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_5937594_p0.lyl](32728834_5937594_p0.lyl) | flagged | 1/2 | tooManyVoices×1, surplusTime×1, tickOverlapped×1, columnTwist×1 | 05-chromaticism/09-chromatic-sequences |
| [32728834_5937629_p0.lyl](32728834_5937629_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_5937661_p0.lyl](32728834_5937661_p0.lyl) | consistent | 1/1 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_5937751_p0.lyl](32728834_5937751_p0.lyl) | consistent | 3/3 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_5937755_p0.lyl](32728834_5937755_p0.lyl) | consistent | 3/3 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_5937772_p0.lyl](32728834_5937772_p0.lyl) | consistent | 3/3 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_5937785_p0.lyl](32728834_5937785_p0.lyl) | consistent | 3/3 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_5937812_p0.lyl](32728834_5937812_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/09-chromatic-sequences |
| [32728834_5941409_p0.lyl](32728834_5941409_p0.lyl) | consistent | 2/2 |  | 05-chromaticism/10-the-omnibus-progression |
| [32728834_5973262_p0.lyl](32728834_5973262_p0.lyl) | consistent | 6/6 |  | 07-popular-music/13-modal-schemas<br>08-20th-and-21st-century-techniques/08-diatonic-modes |
| [32728834_5990266_p0.lyl](32728834_5990266_p0.lyl) | consistent | 4/4 |  | 08-20th-and-21st-century-techniques/09-collections |
| [32728834_5990278_p0.lyl](32728834_5990278_p0.lyl) | consistent | 3/3 |  | 08-20th-and-21st-century-techniques/09-collections |
| [32728834_5990299_p0.lyl](32728834_5990299_p0.lyl) | consistent | 4/4 |  | 08-20th-and-21st-century-techniques/09-collections |
| [32728834_5992271_p0.lyl](32728834_5992271_p0.lyl) | consistent | 25/25 |  | 08-20th-and-21st-century-techniques/09-collections |
| [32728834_5992286_p0.lyl](32728834_5992286_p0.lyl) | consistent | 2/2 |  | 08-20th-and-21st-century-techniques/09-collections |
| [32728834_5992316_p0.lyl](32728834_5992316_p0.lyl) | consistent | 5/5 |  | 08-20th-and-21st-century-techniques/09-collections |
| [32728834_6218556_p0.lyl](32728834_6218556_p0.lyl) | consistent | 5/5 |  | 05-chromaticism/02-bii6 |
| [32728834_6218757_p0.lyl](32728834_6218757_p0.lyl) | consistent | 18/18 |  | 05-chromaticism/02-bii6 |
| [32728834_6220107_p0.lyl](32728834_6220107_p0.lyl) | consistent | 9/9 |  | 05-chromaticism/02-bii6 |
| [32728834_6221729_p0.lyl](32728834_6221729_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/03-augmented-sixth-chords |
| [32728834_6221757_p0.lyl](32728834_6221757_p0.lyl) | consistent | 12/12 |  | 05-chromaticism/03-augmented-sixth-chords |
| [32728834_6221766_p0.lyl](32728834_6221766_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/03-augmented-sixth-chords |
| [32728834_6221772_p0.lyl](32728834_6221772_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/03-augmented-sixth-chords |
| [32728834_6221776_p0.lyl](32728834_6221776_p0.lyl) | consistent | 18/18 |  | 05-chromaticism/03-augmented-sixth-chords |
| [32728834_6221834_p0.lyl](32728834_6221834_p0.lyl) | consistent | 2/2 |  | 05-chromaticism/03-augmented-sixth-chords |
| [32728834_6223743_p0.lyl](32728834_6223743_p0.lyl) | consistent | 16/16 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6223755_p0.lyl](32728834_6223755_p0.lyl) | consistent | 16/16 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6223761_p0.lyl](32728834_6223761_p0.lyl) | consistent | 16/16 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6223765_p0.lyl](32728834_6223765_p0.lyl) | consistent | 16/16 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6223773_p0.lyl](32728834_6223773_p0.lyl) | consistent | 8/8 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6223780_p0.lyl](32728834_6223780_p0.lyl) | consistent | 6/6 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6223782_p0.lyl](32728834_6223782_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6223786_p0.lyl](32728834_6223786_p0.lyl) | consistent | 9/9 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6223788_p0.lyl](32728834_6223788_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6223789_p0.lyl](32728834_6223789_p0.lyl) | consistent | 8/8 |  | 05-chromaticism/01-modal-mixture |
| [32728834_6224659_p0.lyl](32728834_6224659_p0.lyl) | consistent | 25/25 |  | 05-chromaticism/04-common-tone-chords |
| [32728834_6224667_p0.lyl](32728834_6224667_p0.lyl) | consistent | 11/11 |  | 05-chromaticism/04-common-tone-chords |
| [32728834_6224768_p0.lyl](32728834_6224768_p0.lyl) | consistent | 7/7 |  | 05-chromaticism/04-common-tone-chords |
| [32728834_6224771_p0.lyl](32728834_6224771_p0.lyl) | consistent | 5/5 |  | 05-chromaticism/04-common-tone-chords |
| [32728834_6224775_p0.lyl](32728834_6224775_p0.lyl) | consistent | 7/7 |  | 05-chromaticism/04-common-tone-chords |
| [32728834_6224803_p0.lyl](32728834_6224803_p0.lyl) | flagged | 7/8 | tooManyVoices×1, surplusTime×1, tickOverlapped×1, columnTwist×1 | 03-diatonic-harmony/02-strengthening-endings-with-v7 |
| [32728834_6224804_p0.lyl](32728834_6224804_p0.lyl) | consistent | 4/4 |  | 03-diatonic-harmony/02-strengthening-endings-with-v7 |
| [32728834_6224806_p0.lyl](32728834_6224806_p0.lyl) | consistent | 4/4 |  | 03-diatonic-harmony/02-strengthening-endings-with-v7 |
| [32728834_6224809_p0.lyl](32728834_6224809_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/02-strengthening-endings-with-v7 |
| [32728834_6224814_p0.lyl](32728834_6224814_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/02-strengthening-endings-with-v7 |
| [32728834_6224872_p0.lyl](32728834_6224872_p0.lyl) | consistent | 8/8 |  | 03-diatonic-harmony/02-strengthening-endings-with-v7 |
| [32728834_6225476_p0.lyl](32728834_6225476_p0.lyl) | consistent | 9/9 |  | 05-chromaticism/05-harmonic-elision |
| [32728834_6225477_p0.lyl](32728834_6225477_p0.lyl) | consistent | 8/8 |  | 05-chromaticism/05-harmonic-elision |
| [32728834_6225479_p0.lyl](32728834_6225479_p0.lyl) | consistent | 9/9 |  | 05-chromaticism/05-harmonic-elision |
| [32728834_6225480_p0.lyl](32728834_6225480_p0.lyl) | consistent | 6/6 |  | 05-chromaticism/05-harmonic-elision |
| [32728834_6225481_p0.lyl](32728834_6225481_p0.lyl) | consistent | 12/12 |  | 05-chromaticism/05-harmonic-elision |
| [32728834_6225482_p0.lyl](32728834_6225482_p0.lyl) | consistent | 9/9 |  | 05-chromaticism/05-harmonic-elision |
| [32728834_6225483_p0.lyl](32728834_6225483_p0.lyl) | consistent | 9/9 |  | 05-chromaticism/05-harmonic-elision |
| [32728834_6230930_p0.lyl](32728834_6230930_p0.lyl) | flagged | 10/11 | shortMeasure×1 | 03-diatonic-harmony/03-strong-predominants |
| [32728834_6230934_p0.lyl](32728834_6230934_p0.lyl) | consistent | 4/4 |  | 03-diatonic-harmony/03-strong-predominants |
| [32728834_6230937_p0.lyl](32728834_6230937_p0.lyl) | consistent | 2/2 |  | 03-diatonic-harmony/03-strong-predominants |
| [32728834_6230943_p0.lyl](32728834_6230943_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/03-strong-predominants |
| [32728834_6230948_p0.lyl](32728834_6230948_p0.lyl) | consistent | 2/2 |  | 03-diatonic-harmony/03-strong-predominants |
| [32728834_6230949_p0.lyl](32728834_6230949_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/03-strong-predominants |
| [32728834_6230956_p0.lyl](32728834_6230956_p0.lyl) | flagged | 4/5 | surplusTime×1 | 03-diatonic-harmony/03-strong-predominants |
| [32728834_6230968_p0.lyl](32728834_6230968_p0.lyl) | consistent | 2/2 |  | 03-diatonic-harmony/03-strong-predominants |
| [32728834_6233992_p0.lyl](32728834_6233992_p0.lyl) | flagged | 10/11 | shortMeasure×1 | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6234000_p0.lyl](32728834_6234000_p0.lyl) | consistent | 3/3 |  | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6234003_p0.lyl](32728834_6234003_p0.lyl) | consistent | 3/3 |  | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6234074_p0.lyl](32728834_6234074_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6234078_p0.lyl](32728834_6234078_p0.lyl) | consistent | 4/4 |  | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6234081_p0.lyl](32728834_6234081_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6234083_p0.lyl](32728834_6234083_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6234088_p0.lyl](32728834_6234088_p0.lyl) | consistent | 3/3 |  | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6234090_p0.lyl](32728834_6234090_p0.lyl) | flagged | 2/3 | surplusTime×1, tickOverlapped×1, columnTwist×1 | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6234093_p0.lyl](32728834_6234093_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/04-embellishing-tones |
| [32728834_6239193_p0.lyl](32728834_6239193_p0.lyl) | consistent | 10/10 |  | 03-diatonic-harmony/05-cadential-64 |
| [32728834_6239528_p0.lyl](32728834_6239528_p0.lyl) | consistent | 6/6 |  | 03-diatonic-harmony/05-cadential-64 |
| [32728834_6239535_p0.lyl](32728834_6239535_p0.lyl) | consistent | 10/10 |  | 03-diatonic-harmony/05-cadential-64 |
| [32728834_6240782_p0.lyl](32728834_6240782_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/06-inverted-v7s |
| [32728834_6240788_p0.lyl](32728834_6240788_p0.lyl) | consistent | 2/2 |  | 03-diatonic-harmony/06-inverted-v7s |
| [32728834_6240806_p0.lyl](32728834_6240806_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/06-inverted-v7s |
| [32728834_6240818_p0.lyl](32728834_6240818_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/06-inverted-v7s |
| [32728834_6240825_p0.lyl](32728834_6240825_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/06-inverted-v7s |
| [32728834_6240833_p0.lyl](32728834_6240833_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/06-inverted-v7s |
| [32728834_6240837_p0.lyl](32728834_6240837_p0.lyl) | consistent | 2/2 |  | 03-diatonic-harmony/06-inverted-v7s |
| [32728834_6243345_p0.lyl](32728834_6243345_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/06-inverted-v7s |
| [32728834_6245135_p0.lyl](32728834_6245135_p0.lyl) | flagged | 5/10 | voiceGap×2, shortMeasure×2, surplusTime×1 | 03-diatonic-harmony/08-leading-tone-chord |
| [32728834_6245147_p0.lyl](32728834_6245147_p0.lyl) | consistent | 2/2 |  | 03-diatonic-harmony/08-leading-tone-chord |
| [32728834_6245159_p0.lyl](32728834_6245159_p0.lyl) | consistent | 11/11 |  | 03-diatonic-harmony/08-leading-tone-chord |
| [32728834_6245161_p0.lyl](32728834_6245161_p0.lyl) | consistent | 1/1 |  | 03-diatonic-harmony/08-leading-tone-chord |
| [32728834_6250658_p0.lyl](32728834_6250658_p0.lyl) | consistent | 8/8 |  | 03-diatonic-harmony/09-64-chords-as-prolongations |
| [32728834_6250667_p0.lyl](32728834_6250667_p0.lyl) | consistent | 14/14 |  | 03-diatonic-harmony/09-64-chords-as-prolongations |
| [32728834_6250673_p0.lyl](32728834_6250673_p0.lyl) | consistent | 8/8 |  | 03-diatonic-harmony/09-64-chords-as-prolongations |
| [32728834_6250679_p0.lyl](32728834_6250679_p0.lyl) | consistent | 12/12 |  | 03-diatonic-harmony/09-64-chords-as-prolongations |
| [32728834_6250685_p0.lyl](32728834_6250685_p0.lyl) | consistent | 2/2 |  | 03-diatonic-harmony/09-64-chords-as-prolongations |
| [32728834_6252227_p0.lyl](32728834_6252227_p0.lyl) | consistent | 8/8 |  | 03-diatonic-harmony/10-plagal-motion |
| [32728834_6252232_p0.lyl](32728834_6252232_p0.lyl) | consistent | 2/2 |  | 03-diatonic-harmony/10-plagal-motion |
| [32728834_6254923_p0.lyl](32728834_6254923_p0.lyl) | flagged | 8/9 | surplusTime×1, tickOverlapped×1, columnTwist×1 | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6254927_p0.lyl](32728834_6254927_p0.lyl) | flagged | 4/5 | shortMeasure×1 | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6254942_p0.lyl](32728834_6254942_p0.lyl) | consistent | 10/10 |  | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6254982_p0.lyl](32728834_6254982_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6254992_p0.lyl](32728834_6254992_p0.lyl) | consistent | 7/7 |  | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6254997_p0.lyl](32728834_6254997_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6255078_p0.lyl](32728834_6255078_p0.lyl) | consistent | 10/10 |  | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6255083_p0.lyl](32728834_6255083_p0.lyl) | consistent | 9/9 |  | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6255087_p0.lyl](32728834_6255087_p0.lyl) | flagged | 9/10 | shortMeasure×1 | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6255089_p0.lyl](32728834_6255089_p0.lyl) | consistent | 2/2 |  | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6255090_p0.lyl](32728834_6255090_p0.lyl) | consistent | 4/4 |  | 03-diatonic-harmony/11-la-in-the-bass |
| [32728834_6258824_p0.lyl](32728834_6258824_p0.lyl) | consistent | 4/4 |  | 03-diatonic-harmony/12-the-mediant |
| [32728834_6258834_p0.lyl](32728834_6258834_p0.lyl) | consistent | 10/10 |  | 03-diatonic-harmony/12-the-mediant |
| [32728834_6258844_p0.lyl](32728834_6258844_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/12-the-mediant |
| [32728834_6260230_p0.lyl](32728834_6260230_p0.lyl) | flagged | 4/5 | shortMeasure×1 | 03-diatonic-harmony/13-predominant-seventh-chords |
| [32728834_6260497_p0.lyl](32728834_6260497_p0.lyl) | consistent | 10/10 |  | 03-diatonic-harmony/13-predominant-seventh-chords |
| [32728834_6260500_p0.lyl](32728834_6260500_p0.lyl) | consistent | 10/10 |  | 03-diatonic-harmony/13-predominant-seventh-chords |
| [32728834_6260504_p0.lyl](32728834_6260504_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/13-predominant-seventh-chords |
| [32728834_6260506_p0.lyl](32728834_6260506_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/13-predominant-seventh-chords |
| [32728834_6260511_p0.lyl](32728834_6260511_p0.lyl) | consistent | 10/10 |  | 03-diatonic-harmony/13-predominant-seventh-chords |
| [32728834_6263572_p0.lyl](32728834_6263572_p0.lyl) | consistent | 1/1 |  | 05-chromaticism/08-equal-divisions-of-the-octave |
| [32728834_6263580_p0.lyl](32728834_6263580_p0.lyl) | consistent | 1/1 |  | 05-chromaticism/08-equal-divisions-of-the-octave |
| [32728834_6263587_p0.lyl](32728834_6263587_p0.lyl) | consistent | 1/1 |  | 05-chromaticism/08-equal-divisions-of-the-octave |
| [32728834_6263592_p0.lyl](32728834_6263592_p0.lyl) | consistent | 1/1 |  | 05-chromaticism/08-equal-divisions-of-the-octave |
| [32728834_6263596_p0.lyl](32728834_6263596_p0.lyl) | consistent | 1/1 |  | 05-chromaticism/08-equal-divisions-of-the-octave |
| [32728834_6268930_p0.lyl](32728834_6268930_p0.lyl) | consistent | 8/8 |  | 03-diatonic-harmony/15-tonicization |
| [32728834_6268934_p0.lyl](32728834_6268934_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/15-tonicization |
| [32728834_6268967_p0.lyl](32728834_6268967_p0.lyl) | flagged | 3/4 | voiceGap×1 | 03-diatonic-harmony/15-tonicization |
| [32728834_6268972_p0.lyl](32728834_6268972_p0.lyl) | consistent | 11/11 |  | 03-diatonic-harmony/15-tonicization |
| [32728834_6270521_p0.lyl](32728834_6270521_p0.lyl) | consistent | 7/7 |  | 03-diatonic-harmony/15-tonicization |
| [32728834_6270540_p0.lyl](32728834_6270540_p0.lyl) | flagged | 3/8 | tupletUncertain×5, surplusTime×5, tickOverlapped×5, columnTwist×5 | 03-diatonic-harmony/15-tonicization |
| [32728834_6270545_p0.lyl](32728834_6270545_p0.lyl) | consistent | 5/5 |  | 03-diatonic-harmony/15-tonicization |
| [32728834_6270553_p0.lyl](32728834_6270553_p0.lyl) | consistent | 9/9 |  | 03-diatonic-harmony/15-tonicization |
| [32728834_6275123_p0.lyl](32728834_6275123_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/07-other-aspects-of-notation |
| [32728834_6275124_p0.lyl](32728834_6275124_p0.lyl) | consistent | 5/5 |  | 01-fundamentals/07-other-aspects-of-notation |
| [32728834_6279080_p0.lyl](32728834_6279080_p0.lyl) | consistent | 8/8 |  | 03-diatonic-harmony/16-extended-tonicization-and-modulation-to-closely-related-keys |
| [32728834_6279089_p0.lyl](32728834_6279089_p0.lyl) | flagged | 12/13 | surplusTime×1, tickOverlapped×1, columnTwist×1 | 03-diatonic-harmony/16-extended-tonicization-and-modulation-to-closely-related-keys |
| [32728834_6279114_p0.lyl](32728834_6279114_p0.lyl) | consistent | 4/4 |  | 03-diatonic-harmony/16-extended-tonicization-and-modulation-to-closely-related-keys |
| [32728834_6279128_p0.lyl](32728834_6279128_p0.lyl) | consistent | 16/16 |  | 03-diatonic-harmony/16-extended-tonicization-and-modulation-to-closely-related-keys |
| [32728834_6293132_p0.lyl](32728834_6293132_p0.lyl) | consistent | 6/6 |  | 01-fundamentals/10-simple-meter-and-time-signatures |
| [32728834_6296048_p0.lyl](32728834_6296048_p0.lyl) | consistent | 8/8 |  | 01-fundamentals/10-simple-meter-and-time-signatures |
| [32728834_6296065_p0.lyl](32728834_6296065_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/10-simple-meter-and-time-signatures |
| [32728834_6296072_p0.lyl](32728834_6296072_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/10-simple-meter-and-time-signatures |
| [32728834_6296091_p0.lyl](32728834_6296091_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/11-compound-meters-and-time-signatures |
| [32728834_6296096_p0.lyl](32728834_6296096_p0.lyl) | consistent | 3/3 |  | 01-fundamentals/11-compound-meters-and-time-signatures |
| [32728834_6296167_p0.lyl](32728834_6296167_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/12-other-rhythmic-essentials |
| [32728834_6300392_p0.lyl](32728834_6300392_p0.lyl) | consistent | 16/16 |  | 06-jazz/07-chord-scale-theory |
| [32728834_6300394_p0.lyl](32728834_6300394_p0.lyl) | consistent | 3/3 |  | 06-jazz/07-chord-scale-theory |
| [32728834_6300396_p0.lyl](32728834_6300396_p0.lyl) | consistent | 3/3 |  | 06-jazz/07-chord-scale-theory |
| [32728834_6300399_p0.lyl](32728834_6300399_p0.lyl) | consistent | 7/7 |  | 06-jazz/07-chord-scale-theory |
| [32728834_6300401_p0.lyl](32728834_6300401_p0.lyl) | consistent | 17/17 |  | 06-jazz/07-chord-scale-theory |
| [32728834_6300405_p0.lyl](32728834_6300405_p0.lyl) | consistent | 2/2 |  | 06-jazz/07-chord-scale-theory |
| [32728834_6301594_p0.lyl](32728834_6301594_p0.lyl) | consistent | 6/6 |  | 06-jazz/07-chord-scale-theory |
| [32728834_6591448_p0.lyl](32728834_6591448_p0.lyl) | consistent | 4/4 |  | 09-twelve-tone-music/01-basics-of-twelve-tone-theory |
| [32728834_6591521_p0.lyl](32728834_6591521_p0.lyl) | consistent | 4/4 |  | 09-twelve-tone-music/01-basics-of-twelve-tone-theory |
| [32728834_6595108_p0.lyl](32728834_6595108_p0.lyl) | consistent | 12/12 |  | 06-jazz/08-blues-harmony |
| [32728834_6595125_p0.lyl](32728834_6595125_p0.lyl) | consistent | 12/12 |  | 06-jazz/08-blues-harmony |
| [32728834_6610362_p0.lyl](32728834_6610362_p0.lyl) | consistent | 12/12 |  | 06-jazz/08-blues-harmony |
| [32728834_6617197_p0.lyl](32728834_6617197_p0.lyl) | flagged | 5/7 | surplusTime×2, columnConflict×1, voiceGap×2, tickOverlapped×2, columnTwist×2 | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_6656170_p0.lyl](32728834_6656170_p0.lyl) | consistent | 12/12 |  | 06-jazz/05-jazz-embellishing-chords |
| [32728834_6815731_p0.lyl](32728834_6815731_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/13-major-scales |
| [32728834_6817049_p0.lyl](32728834_6817049_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/13-major-scales |
| [32728834_6823280_p0.lyl](32728834_6823280_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/13-major-scales |
| [32728834_6825960_p0.lyl](32728834_6825960_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/14-minor-scales |
| [32728834_6826003_p0.lyl](32728834_6826003_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/14-minor-scales |
| [32728834_6827779_p0.lyl](32728834_6827779_p0.lyl) | consistent | 9/9 |  | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_6836733_p0.lyl](32728834_6836733_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/17-intervals |
| [32728834_6836745_p0.lyl](32728834_6836745_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/17-intervals |
| [32728834_6836757_p0.lyl](32728834_6836757_p0.lyl) | consistent | 3/3 |  | 01-fundamentals/17-intervals |
| [32728834_6837912_p0.lyl](32728834_6837912_p0.lyl) | consistent | 3/3 |  | 07-popular-music/12-puff-schemas |
| [32728834_6839451_p0.lyl](32728834_6839451_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/18-triads |
| [32728834_6839452_p0.lyl](32728834_6839452_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/18-triads |
| [32728834_6839453_p0.lyl](32728834_6839453_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/18-triads |
| [32728834_6839459_p0.lyl](32728834_6839459_p0.lyl) | consistent | 3/3 |  | 01-fundamentals/20-inversion |
| [32728834_6839460_p0.lyl](32728834_6839460_p0.lyl) | consistent | 3/3 |  | 01-fundamentals/22-figured-bass |
| [32728834_6839461_p0.lyl](32728834_6839461_p0.lyl) | consistent | 3/3 |  | 01-fundamentals/22-figured-bass |
| [32728834_6839462_p0.lyl](32728834_6839462_p0.lyl) | consistent | 6/6 |  | 01-fundamentals/22-figured-bass |
| [32728834_6839467_p0.lyl](32728834_6839467_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/18-triads |
| [32728834_6839468_p0.lyl](32728834_6839468_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/20-inversion |
| [32728834_6839470_p0.lyl](32728834_6839470_p0.lyl) | consistent | 9/9 |  | 01-fundamentals/18-triads |
| [32728834_6842546_p0.lyl](32728834_6842546_p0.lyl) | consistent | 5/5 |  | 06-jazz/01-swing-rhythms |
| [32728834_6843767_p0.lyl](32728834_6843767_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/19-seventh-chords |
| [32728834_6843772_p0.lyl](32728834_6843772_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/19-seventh-chords |
| [32728834_6843779_p0.lyl](32728834_6843779_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/20-inversion |
| [32728834_6843780_p0.lyl](32728834_6843780_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/22-figured-bass |
| [32728834_6843787_p0.lyl](32728834_6843787_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/20-inversion |
| [32728834_6843788_p0.lyl](32728834_6843788_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/19-seventh-chords |
| [32728834_6850641_p0.lyl](32728834_6850641_p0.lyl) | consistent | 5/5 |  | 01-fundamentals/19-seventh-chords |
| [32728834_6869635_p0.lyl](32728834_6869635_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/22-figured-bass |
| [32728834_6876492_p0.lyl](32728834_6876492_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/18-triads |
| [32728834_6876514_p0.lyl](32728834_6876514_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/20-inversion |
| [32728834_6876617_p0.lyl](32728834_6876617_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/20-inversion |
| [32728834_6877976_p0.lyl](32728834_6877976_p0.lyl) | consistent | 6/6 |  | 01-fundamentals/22-figured-bass |
| [32728834_6878013_p0.lyl](32728834_6878013_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/22-figured-bass |
| [32728834_6878023_p0.lyl](32728834_6878023_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/22-figured-bass |
| [32728834_6925817_p0.lyl](32728834_6925817_p0.lyl) | consistent | 7/7 |  | 08-20th-and-21st-century-techniques/09-collections |
| [32728834_6925856_p0.lyl](32728834_6925856_p0.lyl) | consistent | 4/4 |  | 08-20th-and-21st-century-techniques/09-collections |
| [32728834_6925866_p0.lyl](32728834_6925866_p0.lyl) | consistent | 9/9 |  | 08-20th-and-21st-century-techniques/09-collections |
| [32728834_7243425_p0.lyl](32728834_7243425_p0.lyl) | consistent | 18/18 |  | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_7244349_p0.lyl](32728834_7244349_p0.lyl) | flagged | 7/12 | columnConflict×5, tickOverlapped×5, columnTwist×5 | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_7268387_p0.lyl](32728834_7268387_p0.lyl) | flagged | 8/10 | surplusTime×1, voiceGap×1 | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_7365281_p0.lyl](32728834_7365281_p0.lyl) | consistent | 3/3 |  | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_7370069_p0.lyl](32728834_7370069_p0.lyl) | consistent | 6/6 |  | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_7370258_p0.lyl](32728834_7370258_p0.lyl) | consistent | 6/6 |  | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_7370744_p0.lyl](32728834_7370744_p0.lyl) | consistent | 24/24 |  | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_7375673_p0.lyl](32728834_7375673_p0.lyl) | consistent | 2/2 |  | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_7397384_p0.lyl](32728834_7397384_p0.lyl) | consistent | 9/9 |  | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_7930598_p0.lyl](32728834_7930598_p0.lyl) | flagged | 6/8 | surplusTime×2, tupletUncertain×1 | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_8009242_p0.lyl](32728834_8009242_p0.lyl) | consistent | 6/6 |  | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_8208440_p0.lyl](32728834_8208440_p0.lyl) | consistent | 12/12 |  | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_8318699_p0.lyl](32728834_8318699_p0.lyl) | flagged | 1/6 | shortMeasure×5 | 08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques |
| [32728834_8383293_p0.lyl](32728834_8383293_p0.lyl) | consistent | 6/6 |  | 01-fundamentals/14-minor-scales |
| [32728834_8383329_p0.lyl](32728834_8383329_p0.lyl) | consistent | 8/8 |  | 01-fundamentals/14-minor-scales |
| [32728834_8391225_p0.lyl](32728834_8391225_p0.lyl) | flagged | 1/3 | surplusTime×2, tickOverlapped×2, columnTwist×2 | 08-20th-and-21st-century-techniques/04-pc-sets-normal-order-and-transformations |
| [32728834_8391384_p0.lyl](32728834_8391384_p0.lyl) | flagged | 5/6 | shortMeasure×1 | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_8391423_p0.lyl](32728834_8391423_p0.lyl) | flagged | 8/13 | surplusTime×4, tickOverlapped×4, columnTwist×4, shortMeasure×1 | 03-diatonic-harmony/01-intro-to-harmony |
| [32728834_8391513_p0.lyl](32728834_8391513_p0.lyl) | flagged | 3/6 | surplusTime×3, tickOverlapped×1, columnTwist×1 | 08-20th-and-21st-century-techniques/04-pc-sets-normal-order-and-transformations |
| [32728834_8394447_p0.lyl](32728834_8394447_p0.lyl) | consistent | 11/11 |  | 01-fundamentals/11-compound-meters-and-time-signatures |
| [32728834_8394456_p0.lyl](32728834_8394456_p0.lyl) | consistent | 9/9 |  | 01-fundamentals/11-compound-meters-and-time-signatures |
| [32728834_8394474_p0.lyl](32728834_8394474_p0.lyl) | flagged | 1/2 | shortMeasure×1 | 01-fundamentals/11-compound-meters-and-time-signatures |
| [32728834_8394558_p0.lyl](32728834_8394558_p0.lyl) | consistent | 6/6 |  | 01-fundamentals/11-compound-meters-and-time-signatures |
| [32728834_8395191_p0.lyl](32728834_8395191_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/06-aspn |
| [32728834_8395287_p0.lyl](32728834_8395287_p0.lyl) | consistent | 5/5 |  | 05-chromaticism/04-common-tone-chords |
| [32728834_8395353_p0.lyl](32728834_8395353_p0.lyl) | consistent | 9/9 |  | 05-chromaticism/04-common-tone-chords |
| [32728834_8395434_p0.lyl](32728834_8395434_p0.lyl) | flagged | 1/10 | tupletUncertain×2, surplusTime×9, tickOverlapped×9, columnTwist×9, voiceGap×1 | 05-chromaticism/05-harmonic-elision |
| [32728834_8403632_p0.lyl](32728834_8403632_p0.lyl) | flagged | 4/5 | voiceGap×1 | 05-chromaticism/01-modal-mixture |
| [32728834_8403782_p0.lyl](32728834_8403782_p0.lyl) | flagged | 12/14 | columnConflict×1, voiceGap×1, tickOverlapped×1, surplusTime×1, columnTwist×1, shortMeasure×1 | 05-chromaticism/01-modal-mixture |
| [32728834_8403830_p0.lyl](32728834_8403830_p0.lyl) | flagged | 8/9 | shortMeasure×1 | 05-chromaticism/02-bii6 |
| [32728834_8404601_p0.lyl](32728834_8404601_p0.lyl) | consistent | 25/25 |  | 04-form/09-rondo |
| [32728834_8412926_p0.lyl](32728834_8412926_p0.lyl) | consistent | 17/17 |  | 04-form/08-sonata-form |
| [32728834_8414264_p0.lyl](32728834_8414264_p0.lyl) | flagged | 6/11 | surplusTime×3, tickOverlapped×1, columnTwist×1, shortMeasure×1, voiceGap×1 | 04-form/07-ternary-form |
| [32728834_8418638_p0.lyl](32728834_8418638_p0.lyl) | consistent | 8/8 |  | 01-fundamentals/17-intervals |
| [32728834_8418647_p0.lyl](32728834_8418647_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/17-intervals |
| [32728834_8418665_p0.lyl](32728834_8418665_p0.lyl) | consistent | 7/7 |  | 01-fundamentals/17-intervals |
| [32728834_8418677_p0.lyl](32728834_8418677_p0.lyl) | flagged | 0/4 | surplusTime×4 | 01-fundamentals/17-intervals |
| [32728834_8418728_p0.lyl](32728834_8418728_p0.lyl) | consistent | 14/14 |  | 01-fundamentals/17-intervals |
| [32728834_8422379_p0.lyl](32728834_8422379_p0.lyl) | consistent | 12/12 |  | 01-fundamentals/10-simple-meter-and-time-signatures |
| [32728834_8422418_p0.lyl](32728834_8422418_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/10-simple-meter-and-time-signatures |
| [32728834_8422541_p0.lyl](32728834_8422541_p0.lyl) | consistent | 3/3 |  | 01-fundamentals/12-other-rhythmic-essentials |
| [32728834_8422571_p0.lyl](32728834_8422571_p0.lyl) | flagged | 1/3 | tupletUncertain×2, shortMeasure×1 | 01-fundamentals/12-other-rhythmic-essentials |
| [32728834_8422604_p0.lyl](32728834_8422604_p0.lyl) | consistent | 8/8 |  | 01-fundamentals/12-other-rhythmic-essentials<br>11-rhythm-and-meter/05-hypermeter |
| [32728834_8451335_p0.lyl](32728834_8451335_p0.lyl) | flagged | 3/17 | surplusTime×14, tickOverlapped×14, columnTwist×14 | 05-chromaticism/02-bii6 |
| [32728834_8452298_p0.lyl](32728834_8452298_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/13-major-scales |
| [32728834_8452340_p0.lyl](32728834_8452340_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/13-major-scales |
| [32728834_8455586_p0.lyl](32728834_8455586_p0.lyl) | consistent | 4/4 |  | 01-fundamentals/14-minor-scales |
| [32728834_8455655_p0.lyl](32728834_8455655_p0.lyl) | consistent | 12/12 |  | 14-ear-training/01-the-basics-of-sight-singing-and-dictation |
| [32728834_8455691_p0.lyl](32728834_8455691_p0.lyl) | consistent | 8/8 |  | 14-ear-training/01-the-basics-of-sight-singing-and-dictation |
| [32728834_8455748_p0.lyl](32728834_8455748_p0.lyl) | consistent | 4/4 |  | 14-ear-training/01-the-basics-of-sight-singing-and-dictation |
| [32728834_8455769_p0.lyl](32728834_8455769_p0.lyl) | consistent | 4/4 |  | 14-ear-training/01-the-basics-of-sight-singing-and-dictation |
| [32728834_8455859_p0.lyl](32728834_8455859_p0.lyl) | consistent | 4/4 |  | 14-ear-training/01-the-basics-of-sight-singing-and-dictation |
| [32728834_8456477_p0.lyl](32728834_8456477_p0.lyl) | consistent | 10/10 |  | 01-fundamentals/18-triads |
| [32728834_8487176_p0.lyl](32728834_8487176_p0.lyl) | consistent | 4/4 |  | 02-counterpoint/04-third-species-counterpoint |
| [32728834_8488049_p0.lyl](32728834_8488049_p0.lyl) | consistent | 54/54 |  | 02-counterpoint/02-first-species-counterpoint |
| [32728834_8488187_p0.lyl](32728834_8488187_p0.lyl) | consistent | 32/32 |  | 02-counterpoint/03-second-species-counterpoint |
| [32728834_8488217_p0.lyl](32728834_8488217_p0.lyl) | consistent | 32/32 |  | 02-counterpoint/04-third-species-counterpoint |
| [32728834_8488241_p0.lyl](32728834_8488241_p0.lyl) | consistent | 42/42 |  | 02-counterpoint/05-fourth-species-counterpoint |
| [32728834_8488244_p0.lyl](32728834_8488244_p0.lyl) | consistent | 32/32 |  | 02-counterpoint/06-fifth-species-counterpoint |
| [32728834_8513480_p0.lyl](32728834_8513480_p0.lyl) | consistent | 11/11 |  | 02-counterpoint/02-first-species-counterpoint |
| [32728834_8514077_p0.lyl](32728834_8514077_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/19-seventh-chords |
| [32728834_8514209_p0.lyl](32728834_8514209_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/19-seventh-chords |
| [32728834_8514212_p0.lyl](32728834_8514212_p0.lyl) | consistent | 1/1 |  | 01-fundamentals/18-triads |
| [32728834_8514239_p0.lyl](32728834_8514239_p0.lyl) | consistent | 2/2 |  | 01-fundamentals/21-roman-numerals |
| [32728834_8514287_p0.lyl](32728834_8514287_p0.lyl) | consistent | 18/18 |  | 01-fundamentals/21-roman-numerals |
| [32728834_8514608_p0.lyl](32728834_8514608_p0.lyl) | consistent | 1/1 |  | 06-jazz/01-swing-rhythms |
| [32728834_8514740_p0.lyl](32728834_8514740_p0.lyl) | consistent | 6/6 |  | 06-jazz/03-jazz-voicings |
| [32728834_8514797_p0.lyl](32728834_8514797_p0.lyl) | consistent | 2/2 |  | 06-jazz/03-jazz-voicings |
| [32728834_8515004_p0.lyl](32728834_8515004_p0.lyl) | consistent | 2/2 |  | 06-jazz/09-blues-melodies-and-the-blues-scale |
| [32728834_8515040_p0.lyl](32728834_8515040_p0.lyl) | consistent | 2/2 |  | 07-popular-music/01-rhythm-and-meter-in-pop-music |
| [32728834_8515049_p0.lyl](32728834_8515049_p0.lyl) | consistent | 4/4 |  | 06-jazz/09-blues-melodies-and-the-blues-scale |
| [32728834_8519939_p0.lyl](32728834_8519939_p0.lyl) | consistent | 9/9 |  | 06-jazz/04-ii-v-i |
| [32728834_8519966_p0.lyl](32728834_8519966_p0.lyl) | consistent | 6/6 |  | 06-jazz/04-ii-v-i |
| [32728834_8520380_p0.lyl](32728834_8520380_p0.lyl) | consistent | 10/10 |  | 07-popular-music/11-classical-schemas |
| [32728834_8520971_p0.lyl](32728834_8520971_p0.lyl) | consistent | 13/13 |  | 07-popular-music/13-modal-schemas |
| [32728834_8521022_p0.lyl](32728834_8521022_p0.lyl) | consistent | 6/6 |  | 07-popular-music/13-modal-schemas |
| [32728834_8521043_p0.lyl](32728834_8521043_p0.lyl) | consistent | 5/5 |  | 07-popular-music/13-modal-schemas |
| [32728834_8521067_p0.lyl](32728834_8521067_p0.lyl) | consistent | 5/5 |  | 07-popular-music/13-modal-schemas |
| [32728834_8534750_p0.lyl](32728834_8534750_p0.lyl) | flagged | 10/11 | shortMeasure×1 | 02-counterpoint/09-high-baroque-fugal-exposition |
| [32728834_8559071_p0.lyl](32728834_8559071_p0.lyl) | consistent | 20/20 |  | 02-counterpoint/10-ground-bass |
| [32728834_8631327_p0.lyl](32728834_8631327_p0.lyl) | consistent | 12/12 |  | 08-20th-and-21st-century-techniques/08-diatonic-modes |
| [32728834_8648514_p0.lyl](32728834_8648514_p0.lyl) | flagged | 2/5 | surplusTime×3 | 08-20th-and-21st-century-techniques/05-set-class-and-prime-form |
| [32728834_8674494_p0.lyl](32728834_8674494_p0.lyl) | consistent | 8/8 |  | 07-popular-music/01-rhythm-and-meter-in-pop-music |
| [32728834_8674701_p0.lyl](32728834_8674701_p0.lyl) | consistent | 4/4 |  | 07-popular-music/01-rhythm-and-meter-in-pop-music |
| [32728834_8862120_p0.lyl](32728834_8862120_p0.lyl) | consistent | 1/1 |  | 09-twelve-tone-music/03-row-properties |
| [32728834_8862222_p0.lyl](32728834_8862222_p0.lyl) | consistent | 6/6 |  | 09-twelve-tone-music/03-row-properties |
| [32728834_8862252_p0.lyl](32728834_8862252_p0.lyl) | consistent | 2/2 |  | 09-twelve-tone-music/03-row-properties |
| [32728834_8862261_p0.lyl](32728834_8862261_p0.lyl) | consistent | 1/1 |  | 09-twelve-tone-music/03-row-properties |
| [32728834_8877717_p0.lyl](32728834_8877717_p0.lyl) | flagged | 1/6 | surplusTime×5 | 02-counterpoint/08-16th-century-contrapuntal-style |
| [32728834_8891598_p0.lyl](32728834_8891598_p0.lyl) | consistent | 24/24 |  | 11-rhythm-and-meter/05-hypermeter |
| [32728834_8897547_p0.lyl](32728834_8897547_p0.lyl) | flagged | 18/19 | shortMeasure×1 | 11-rhythm-and-meter/06-metrical-dissonance |
| [32728834_8935623_p0.lyl](32728834_8935623_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_8935728_p0.lyl](32728834_8935728_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_8935767_p0.lyl](32728834_8935767_p0.lyl) | flagged | 1/3 | voiceGap×1, shortMeasure×1 | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_9010358_p0.lyl](32728834_9010358_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_9014891_p0.lyl](32728834_9014891_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/06-reinterpreting-augmented-sixth-chords |
| [32728834_9088466_p0.lyl](32728834_9088466_p0.lyl) | consistent | 3/3 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [32728834_9101633_p0.lyl](32728834_9101633_p0.lyl) | consistent | 4/4 |  | 05-chromaticism/11-altered-and-extended-dominant-chords |
| [8641586_6803044_p0.lyl](8641586_6803044_p0.lyl) | consistent | 8/8 |  | 09-twelve-tone-music/05-composing-with-twelve-tones |
| [8641586_8920656_p0.lyl](8641586_8920656_p0.lyl) | flagged | 0/5 | surplusTime×4, shortMeasure×1 | 11-rhythm-and-meter/05-hypermeter |

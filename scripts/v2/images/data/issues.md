## Open issues

### Not done
- Percussion notation (20 images: drum key, rhythm sets on one-line percussion staves, rhythmic cycles, tresillo): skipped by the user's decision.
- `failed` rows have no faithful transcription (see "Files with notes"): soprano/mezzo-soprano/baritone clefs (no such clefs in lilylet), the breve and breve-rest glyph examples (no breve), and the Farrenc sentence (#154: the only local scan is illegible in mm. 5–8; its .lyl is kept but the cello 32nd runs are a contour guess — needs a better source).
- The Elmas thumbnail (#181, triage `skip`) still needs a full-size re-download.

### Not expressible in lilylet (recorded per file in `notes`)
- Breve and breve rest; caesura (written as `//` markup); numbered multi-measure rest (`R1` + number markup); slash noteheads and x noteheads (chord symbols sit on spacers); measure-repeat signs (written out); volta brackets (markup "1."/"2."); percussion, soprano, mezzo-soprano and baritone clefs; hidden clef, stems or tuplet numbers; parenthesised cautionary accidentals; a courtesy natural cancelling an accidental from an earlier bar.
- Per-staff key signatures (transposing instruments show the concert key signature; pitches are right).
- Analysis graphics: bracket lines, boxes, circles, arrows, colour/highlighting, greyed passages, clock faces, form diagrams. Their labels are kept as markup or `\addlyrics` lanes.

### lilylet bugs
`npx tsx scripts/v2/images/repro.ts` runs a minimal repro of each one against the lilylet checkout and prints BUG or fixed. All 26 reproduce on lilylet HEAD (0.1.94). The worst ones for transcription are `\cmd_` without a space lexing as notes (`check-lyl.ts` flags it), markup on a rest being dropped, slurs/hairpins/ties/staff switches inside `\tuplet` being lost, a hairpin that crosses a barline never being cleared (later hairpins end on the wrong note and a ghost hairpin appears; the ear-training files keep at most one barline-crossing hairpin per voice), an accidental repeated within a bar or after a tie being drawn again, and the single global key signature. Verovio-side: `[staves "x"]` on a one-staff score crashes the render.

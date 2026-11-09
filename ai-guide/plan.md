# AI Harmony Guide - Planned Files

## Status Overview

| Status | Count |
|--------|-------|
| Completed | 54 |
| Planned | 0 |

## OMT 2nd edition pass (2026-11-09)

New topics from v2 (each rule cites a `v2/...md` chapter and its URL):
- [x] `09-jazz/jazz-harmony.md`, `09-jazz/jazz-voicings.md` (+ `_overview.md`)
- [x] `02-chromatic-harmony/chromatic-sequences.md`: chromatic sequences, omnibus, equal divisions
- [x] `02-chromatic-harmony/neo-riemannian-and-mediants.md`
- [x] `10-counterpoint/species-counterpoint.md` (+ `_overview.md`)
- [x] `05-formal-schemas/rule-of-the-octave.md`: RO, pre-/post-cadential schemas
- [x] `03-progressions/pop-schemas.md`: modal/pentatonic pop schemas; supersedes parts of `pop-rock-progressions.md`

Fixes: tetrachord vectors/labels and the Rahn/Forte convention (pitch-class-sets); combinatoriality and fixed/moveable zero (twelve-tone); Puff = I–iii–IV; ESC = Essential *Structural* Closure; plus convention notes where V1 and v2 differ. Each new topic lists v2 figures worth transcribing under "Score Examples (planned)".

### Future work (from v2, not yet written)

| Topic | v2 sources | Notes |
|-------|------------|-------|
| Hypermeter and metrical dissonance | `v2/11-rhythm-and-meter/05-hypermeter.md`, `06-metrical-dissonance.md`, `v2/15-chapters-in-development/02-hypermeter2.md`, `v2/08-20th-and-21st-century-techniques/01-twentieth-century-rhythmic-techniques.md` | grouping/displacement dissonance, hypermetric reinterpretation |
| Drumbeats and pop texture | `v2/07-popular-music/01-rhythm-and-meter-in-pop-music.md`, `02-drumbeats.md`, `07-texture-in-pop-music.md` | standard rock beat, textural layers |
| Orchestration principles | `v2/10-orchestration/01-core-principles-of-orchestration.md`, `02-subtle-color-changes.md`, `03-transcription-from-piano.md` | ranges, doubling, piano-to-orchestra |

## Recently Completed (2026-02-04 Session 3)

### 03-progressions/
- [x] `pop-rock-progressions.md` - Expanded with double-plagal (bVII-IV-I), extended plagal, and I-III-IV "puff" phrase opener

### 08-post-tonal/
- [x] `pitch-class-sets.md` - Added 6-step analysis procedure with JSON output schema
- [x] `twelve-tone.md` - Added intervallic structure section (P/I/R/RI interval relationships)

## Recently Completed (2026-02-04 Session 2)

### 01-harmonic-functions/
- [x] `harmonic-analysis.md` - Step-by-step analysis procedure, RN from figured bass

### 04-phrase-structure/
- [x] `theme-functions.md` - Presentation, continuation, cadential, antecedent, consequent
- [x] `compound-themes.md` - Compound period, compound sentence (16-bar forms)

### Expanded Files
- [x] `06-large-forms/rondo-form.md` - Added episode types (interior theme, second-theme complex)
- [x] `appendices/terminology.md` - Added analysis output schema (JSON format)

## Recently Completed (2026-02-04 Session 1)

### 01-harmonic-functions/
- [x] `voice-leading-rules.md` - Tendency tones, parallel motion, resolution rules
- [x] `prolongation.md` - Tonic prolongation, pedal points, neighboring chords

### 02-chromatic-harmony/
- [x] `modal-mixture.md` - Borrowing from parallel major/minor
- [x] `augmented-sixths.md` - Italian, French, German +6 chords
- [x] `neapolitan.md` - bII chord usage
- [x] `modulation.md` - Key change techniques (pivot chord, direct, chromatic)

### 03-progressions/
- [x] `blues-progressions.md` - 12-bar, 16-bar blues structures
- [x] `everett-tonal-systems.md` - Six tonal systems for pop/rock analysis
- [x] `classical-progressions.md` - Common-practice T-S-D patterns

### 04-phrase-structure/
- [x] `hybrid-themes.md` - Compound themes, mixed structures
- [x] `phrase-expansion.md` - Internal/external phrase expansion techniques

### 06-large-forms/
- [x] `pop-rock-form.md` - Verse-chorus, AABA, strophic forms

### 07-melodic-elaboration/
- [x] `_overview.md` - Embellishing tones overview
- [x] `embellishing-tones.md` - PT, NT, SUS, APP, ANT, etc.

## All Planned Files Complete

All 14 planned documentation files have been written.

## Source Files for Reference

When writing planned files, reference these original OMT files:

| Planned File | Source |
|--------------|--------|
| prolongation.md | `harmonicSyntax1.md`, `harmonicSyntax2.md` |
| voice-leading-rules.md | `tendencyTonesFunctionalDissonances.md` |
| modal-mixture.md | `modalMixture.md` |
| augmented-sixths.md | `alteredSubdominants.md` |
| neapolitan.md | `alteredSubdominants.md` |
| modulation.md | `Modulation.md` |
| blues-progressions.md | `popRockHarmony-blues.md` |
| everett-tonal-systems.md | `popRockHarmony-EverettSystem*.md` files |
| hybrid-themes.md | `hybridThemes.md` |
| phrase-expansion.md | `internalExpansions.md`, `externalExpansions.md` |
| pop-rock-form.md | `popRockForm-*.md` files |
| embellishing-tones.md | `embellishingTones.md` |

## Related Score Images

**Image Types:**
- 🎼 **Real composition** - Requires corresponding MusicXML from IMSLP
- 📝 **Teaching example** - Short examples created for illustration, can be recreated with LilyPond
- 📊 **Structural diagram** - Not a score, text/graphic illustration only

### augmented-sixths.md & neapolitan.md

From `alteredSubdominants.md`:

| Image | Description | Type |
|-------|-------------|------|
| [N-AugSixths.png](../Graphics/N-AugSixths.png) | Neapolitan and +6 chord notation | 📝 Teaching |
| [DMUDB.png](../Graphics/DMUDB.png) | Schubert "Der Müller und der Bach" Neapolitan | 🎼 Real |
| [Op119-1.png](../Graphics/Op119-1.png) | Beethoven Op. 119/1 Italian +6 | 🎼 Real |
| [K465-iv.png](../Graphics/K465-iv.png) | Mozart K. 465 French +6 | 🎼 Real |
| [Op109-iii.png](../Graphics/Op109-iii.png) | Beethoven Op. 109 German +6 | 🎼 Real |

### modulation.md

From `Modulation.md`:

| Image | Description | Type |
|-------|-------------|------|
| [pivot.png](../Graphics/harmony/pivot.png) | Pivot chord bracket notation | 📊 Diagram |

### hybrid-themes.md

From `hybridThemes.md`:

| Image | Description | Type |
|-------|-------------|------|
| [hybrid1.svg](../Graphics/ClassicalThemes/hybrid1.svg) | Hybrid 1 diagram (Ant. + Cont.) | 📊 Diagram |
| [hybrid2.svg](../Graphics/ClassicalThemes/hybrid2.svg) | Hybrid 2 diagram (Ant. + Cad.) | 📊 Diagram |
| [hybrid3.svg](../Graphics/ClassicalThemes/hybrid3.svg) | Hybrid 3 diagram (CBI + Cont.) | 📊 Diagram |
| [hybrid4.svg](../Graphics/ClassicalThemes/hybrid4.svg) | Hybrid 4 diagram (CBI + Cons.) | 📊 Diagram |
| [k330-ii.png](../Graphics/form/k330-ii.png) | Mozart K. 330 II - Hybrid 1 | 🎼 Real |
| [haydn-III-66-ii.png](../Graphics/form/haydn-III-66-ii.png) | Haydn Hob. III:66 II - Hybrid 2 | 🎼 Real |
| [beethoven_op30.png](../Graphics/form/beethoven_op30.png) | Beethoven Op. 30/2 III - Hybrid 3 | 🎼 Real |
| [beethoven_18_2.png](../Graphics/form/beethoven_18_2.png) | Beethoven Op. 18/2 IV - Hybrid 4 | 🎼 Real |

### phrase-expansion.md

From `internalExpansions.md`:

| Image | Description | Type |
|-------|-------------|------|
| [k494.png](../Graphics/form/k494.png) | Mozart K. 494 - Sub-phrase expansion | 🎼 Real |
| [op2no3.png](../Graphics/form/op2no3.png) | Beethoven Op. 2/3 - Phrase expansion | 🎼 Real |
| [k309.png](../Graphics/form/k309.png) | Mozart K. 309 III - Evaded cadence | 🎼 Real |

From `externalExpansions.md`:

| Image | Description | Type |
|-------|-------------|------|
| [sym101.png](../Graphics/form/sym101.png) | Haydn Sym. 101 "Clock" - Prefix | 🎼 Real |
| [k330.png](../Graphics/form/k330.png) | Mozart K. 330 - Closing section | 🎼 Real |
| [sym40.png](../Graphics/form/sym40.png) | Mozart Sym. 40 - Standing on dominant | 🎼 Real |

### embellishing-tones.md

From `embellishingTones.md`:

| Image | Description | Type |
|-------|-------------|------|
| [passingTone.png](../Graphics/embellishingTones/passingTone.png) | Passing tone example | 📝 Teaching |
| [neighborTone.png](../Graphics/embellishingTones/neighborTone.png) | Neighbor tone example | 📝 Teaching |
| [doubleNeighbor.png](../Graphics/embellishingTones/doubleNeighbor.png) | Double neighbor figure | 📝 Teaching |
| [INT.png](../Graphics/embellishingTones/INT.png) | Incomplete neighbor tone | 📝 Teaching |
| [appoggiatura.png](../Graphics/embellishingTones/appoggiatura.png) | Appoggiatura example | 📝 Teaching |
| [escapeTone.png](../Graphics/embellishingTones/escapeTone.png) | Escape tone example | 📝 Teaching |
| [anticipation.png](../Graphics/embellishingTones/anticipation.png) | Anticipation example | 📝 Teaching |
| [syncopatedNote.png](../Graphics/embellishingTones/syncopatedNote.png) | Syncopation example | 📝 Teaching |
| [suspension.png](../Graphics/embellishingTones/suspension.png) | Suspension example | 📝 Teaching |
| [retardation.png](../Graphics/embellishingTones/retardation.png) | Retardation example | 📝 Teaching |

### Summary

| Type | Count | Notes |
|------|-------|-------|
| 🎼 Real composition | 14 | Need MusicXML from IMSLP or other sources |
| 📝 Teaching example | 11 | No MusicXML needed, can recreate with LilyPond |
| 📊 Structural diagram | 5 | Not a score, no MusicXML needed |

### No Images Required

The following source files contain no score images (only Spotify iframes or text):

- `tendencyTonesFunctionalDissonances.md` → voice-leading-rules.md
- `modalMixture.md` → modal-mixture.md (has When-in-Rome anthology CSV links)
- `popRockHarmony-blues.md` → blues-progressions.md
- `popRockHarmony-EverettSystem*.md` → everett-tonal-systems.md
- `popRockForm-*.md` → pop-rock-form.md

## Score Examples (done 2026-11-08)

The images that used to be here as "Pending Conversion" are resolved:
- **Real compositions** (k283, xv27): now lilylet examples, linked from sentence.md and period.md.
- **Structural diagrams** (sentence/period/smallBinary/smallTernary .svg): removed where the topic file already has an equivalent ASCII tree. smallBinary and smallTernary now link to real-piece examples (K. 305, K. 284).
- **Schema box diagrams** (meyer/prinner/monte .png): kept as images, since they aren't staff notation; only the TODOs were removed. Fonte now links to the Haydn XVI:27 example.

`examples/` replaces the planned "links to When-in-Rome corpus". It holds 79 examples drawn from the ~180 lilylet transcriptions in `Graphics/lilylet/`. These were selected per principles 1 and 3: basics such as clefs, intervals, scales and key signatures are skipped, and so are exercises (alteredSExamples).

### Coverage by topic

| Topic | Examples |
|-------|----------|
| `01-harmonic-functions/cadences.md` | 11 |
| `01-harmonic-functions/harmonic-analysis.md` | 4 |
| `01-harmonic-functions/prolongation.md` | 11 |
| `01-harmonic-functions/tonic-subdominant-dominant.md` | 6 |
| `01-harmonic-functions/voice-leading-rules.md` | 12 |
| `02-chromatic-harmony/applied-chords.md` | 2 |
| `02-chromatic-harmony/augmented-sixths.md` | 4 |
| `02-chromatic-harmony/modal-mixture.md` | — |
| `02-chromatic-harmony/modulation.md` | 1 |
| `02-chromatic-harmony/neapolitan.md` | 2 |
| `03-progressions/blues-progressions.md` | — |
| `03-progressions/classical-progressions.md` | — |
| `03-progressions/everett-tonal-systems.md` | — |
| `03-progressions/pop-rock-progressions.md` | — |
| `04-phrase-structure/compound-themes.md` | 6 |
| `04-phrase-structure/hybrid-themes.md` | 5 |
| `04-phrase-structure/period.md` | 3 |
| `04-phrase-structure/phrase-expansion.md` | 9 |
| `04-phrase-structure/sentence.md` | 3 |
| `04-phrase-structure/theme-functions.md` | 9 |
| `05-formal-schemas/cadential-schemas.md` | — |
| `05-formal-schemas/continuation-schemas.md` | 3 |
| `05-formal-schemas/opening-schemas.md` | 1 |
| `05-formal-schemas/schema-combinations.md` | 14 |
| `06-large-forms/binary-ternary.md` | 3 |
| `06-large-forms/pop-rock-form.md` | — |
| `06-large-forms/rondo-form.md` | — |
| `06-large-forms/sonata-form.md` | 2 |
| `07-melodic-elaboration/embellishing-tones.md` | 10 |
| `08-post-tonal/pitch-class-sets.md` | 4 |
| `08-post-tonal/twelve-tone.md` | 5 |

### Gaps (no score example yet)

- `02-chromatic-harmony/modal-mixture.md`
- `03-progressions/blues-progressions.md`
- `03-progressions/classical-progressions.md`
- `03-progressions/everett-tonal-systems.md`
- `03-progressions/pop-rock-progressions.md`
- `05-formal-schemas/cadential-schemas.md`
- `06-large-forms/pop-rock-form.md`
- `06-large-forms/rondo-form.md`

The candidates for filling these are not yet transcribed or not yet used:
- **voice-leading rules:** taken from KBVL; already linked.
- **modal mixture:** the When-in-Rome anthology.
- **pop/rock and blues:** no OMT staff figures.
- **cadential schemas:** the schemata pages.
- **rondo:** no figures.
- **thoroughbass:** BCModel, Bach1033, figuresAbbrev/Chrom/Full and defaultFigures are transcribed but have no topic file.

### Maintenance

- Example score blocks are generated from `Graphics/lilylet/**` by `examples/sync.mjs`. After editing a source, run `npx tsx ai-guide/examples/sync.mjs`. `--check` fails when a block is out of date or doesn't parse.
- Add a new example by copying `examples/_template.md`. Then add its id to the topic's `examples:` list and to its Score Examples table.

## File Template

```markdown
---
title: [Title]
category: [category-name]
tags: [tag1, tag2]
related: [related-topic1, related-topic2]
difficulty: foundational/intermediate/advanced
---

# [Title]

## Summary
[1-2 sentence definition]

## Core Concept
[Main theory content]

## Compositional Application
[How to use in composition]

## Common Patterns
[Tables, formulas, progressions]

## Constraints & Rules
[Voice-leading rules, requirements]

## Related Topics
- `[Link to existing file](path.md)` <!-- template placeholder -->
```

---

## 五线谱图片列表 (Music Staff Images Only)

Filtered from all images above - only includes actual music notation on staff lines.

### Real Compositions (🎼)

Require MusicXML source from IMSLP for conversion.

| Image | Description | Source Composition |
|-------|-------------|-------------------|
| [DMUDB.png](../Graphics/DMUDB.png) | Neapolitan chord | Schubert "Der Müller und der Bach" |
| [Op119-1.png](../Graphics/Op119-1.png) | Italian +6 | Beethoven Op. 119/1 |
| [K465-iv.png](../Graphics/K465-iv.png) | French +6 | Mozart K. 465 |
| [Op109-iii.png](../Graphics/Op109-iii.png) | German +6 | Beethoven Op. 109 |
| [k330-ii.png](../Graphics/form/k330-ii.png) | Hybrid 1 | Mozart K. 330 II |
| [haydn-III-66-ii.png](../Graphics/form/haydn-III-66-ii.png) | Hybrid 2 | Haydn Hob. III:66 II |
| [beethoven_op30.png](../Graphics/form/beethoven_op30.png) | Hybrid 3 | Beethoven Op. 30/2 III |
| [beethoven_18_2.png](../Graphics/form/beethoven_18_2.png) | Hybrid 4 | Beethoven Op. 18/2 IV |
| [k494.png](../Graphics/form/k494.png) | Sub-phrase expansion | Mozart K. 494 |
| [op2no3.png](../Graphics/form/op2no3.png) | Phrase expansion | Beethoven Op. 2/3 |
| [k309.png](../Graphics/form/k309.png) | Evaded cadence | Mozart K. 309 III |
| [sym101.png](../Graphics/form/sym101.png) | Prefix | Haydn Sym. 101 "Clock" |
| [k330.png](../Graphics/form/k330.png) | Closing section | Mozart K. 330 |
| [sym40.png](../Graphics/form/sym40.png) | Standing on dominant | Mozart Sym. 40 |
| [k283.png](../Graphics/form/k283.png) | Sentence example | Mozart K. 283 |
| [xv27.png](../Graphics/form/xv27.png) | Period example | Haydn XV:27 |

**Total: 16 real composition excerpts**

### Teaching Examples (📝)

Short examples created for illustration - can be recreated with LilyPond.

| Image | Description | Topic |
|-------|-------------|-------|
| [N-AugSixths.png](../Graphics/N-AugSixths.png) | Neapolitan & +6 notation | Chromatic harmony |
| [passingTone.png](../Graphics/embellishingTones/passingTone.png) | Passing tone | Embellishing tones |
| [neighborTone.png](../Graphics/embellishingTones/neighborTone.png) | Neighbor tone | Embellishing tones |
| [doubleNeighbor.png](../Graphics/embellishingTones/doubleNeighbor.png) | Double neighbor | Embellishing tones |
| [INT.png](../Graphics/embellishingTones/INT.png) | Incomplete neighbor | Embellishing tones |
| [appoggiatura.png](../Graphics/embellishingTones/appoggiatura.png) | Appoggiatura | Embellishing tones |
| [escapeTone.png](../Graphics/embellishingTones/escapeTone.png) | Escape tone | Embellishing tones |
| [anticipation.png](../Graphics/embellishingTones/anticipation.png) | Anticipation | Embellishing tones |
| [syncopatedNote.png](../Graphics/embellishingTones/syncopatedNote.png) | Syncopation | Embellishing tones |
| [suspension.png](../Graphics/embellishingTones/suspension.png) | Suspension | Embellishing tones |
| [retardation.png](../Graphics/embellishingTones/retardation.png) | Retardation | Embellishing tones |

**Total: 15 teaching examples**

### Excluded (Not 五线谱)

The following are structural diagrams (text/boxes), NOT music staff notation:

| Image | Type |
|-------|------|
| [sentence.svg](../Graphics/ClassicalThemes/sentence.svg) | Form structure diagram |
| [period.svg](../Graphics/ClassicalThemes/period.svg) | Form structure diagram |
| [smallBinary.svg](../Graphics/ClassicalThemes/smallBinary.svg) | Form structure diagram |
| [smallTernary.svg](../Graphics/ClassicalThemes/smallTernary.svg) | Form structure diagram |
| [hybrid1-4.svg](../Graphics/ClassicalThemes/) | Hybrid theme diagrams |
| [pivot.png](../Graphics/harmony/pivot.png) | Pivot chord bracket notation |
| [meyer.png](../Graphics/form/meyer.png) | Meyer schema | Galant schemata |
| [prinner.png](../Graphics/form/prinner.png) | Prinner schema | Galant schemata |
| [fonte.png](../Graphics/form/fonte.png) | Fonte schema | Galant schemata |
| [monte.png](../Graphics/form/monte.png) | Monte schema | Galant schemata |

### Summary

| Type | Count | Conversion Method |
|------|-------|-------------------|
| 🎼 Real compositions | 16 | MusicXML from IMSLP → Lilylet |
| 📝 Teaching examples | 15 | Recreate in LilyPond → Lilylet |
| **Total 五线谱** | **31** | |

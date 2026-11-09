---
title: Pitch-Class Sets
category: post-tonal
tags: [pitch-class, set-theory, atonal, interval-vector]
related: [twelve-tone, neo-riemannian-and-mediants]
examples: [08-subject-and-reflection, 08-prime-form, 08-transposition-debussy, 08-inversion-debussy]
difficulty: advanced
---

# Pitch-Class Sets

## Summary

Pitch-class set theory analyzes atonal music by treating pitches as abstract integers (0-11) and examining the intervallic relationships between them. Sets are classified by their interval content rather than their pitch content.

## Basic Terminology

### Pitch Class (PC)

A pitch class represents all enharmonic spellings of a note in any octave.

| PC | Notes |
|----|-------|
| 0 | C, B#, Dbb |
| 1 | C#, Db |
| 2 | D |
| 3 | D#, Eb |
| 4 | E, Fb |
| 5 | F, E# |
| 6 | F#, Gb |
| 7 | G |
| 8 | G#, Ab |
| 9 | A |
| 10 | A#, Bb |
| 11 | B, Cb |

### Pitch-Class Set

An unordered collection of pitch classes, notated in curly braces.

**Example**: {0, 4, 7} = C major triad (C, E, G)

### Interval Class (IC)

The shortest distance between two pitch classes. There are six interval classes, 1–6 (OMT 2e, `v2/08-20th-and-21st-century-techniques/03-intervals-in-integer-notation.md`). Unison/octave (0) is not an interval class in the vector and is never tallied.

| IC | Intervals |
|----|-----------|
| 1 | m2, M7 |
| 2 | M2, m7 |
| 3 | m3, M6 |
| 4 | M3, m6 |
| 5 | P4, P5 |
| 6 | Tritone |

**Calculation**: Take the smaller of the two possible intervals (mod 12).

## Set Operations

### Transposition (Tn)

Add n to each pitch class (mod 12).

**Example**: {0, 4, 7} transposed by T5 = {5, 9, 0}

```
0 + 5 = 5
4 + 5 = 9
7 + 5 = 12 → 0 (mod 12)
```

### Inversion (TnI)

Invert around 0, then transpose by n.

**Notation**: TnI (V1, Forte/Straus style) and I<sub>n</sub> (OMT 2e, `v2/08-.../04-pc-sets-normal-order-and-transformations.md`) name the same operation: invert, then add n. Index number n = sum of any pc and its image (x + y = n mod 12).

**Inversion formula**: New PC = n - original PC (mod 12)

**Example**: {0, 4, 7} under T0I = {0, 8, 5}

```
0 - 0 = 0
0 - 4 = -4 → 8 (mod 12)
0 - 7 = -7 → 5 (mod 12)
```

## Normal Form and Prime Form

### Normal Form

The most compact arrangement of a set.

**Procedure**:
1. Arrange PCs in ascending order
2. Find rotation with smallest outer interval
3. If tied, compare the interval from the first to the next-to-last pc, then first to third-from-last, and so on; choose the smaller (packed to the left)
4. If still tied (symmetrical set), choose the rotation starting on the lowest pc number

**Conventions (normal order / prime form)**: this guide uses Rahn's tie-break (step 3, comparing from the right end inward), which is what V1 `normalOrder.md` and the OMT 2e set-class table use. Forte's original method compares from the left (first-to-second interval) and gives a different prime form for six set classes: 5-20, 6-Z29, 6-31, 7-Z18, 7-20 and 8-26. Example: 5-20 is (01568) by Rahn (OMT 2e table) but (01378) in Forte's list. Interval vectors and Forte numbers are unaffected. State the convention when reporting prime forms.

**Example**: {0, 4, 7}
- Rotations: [0, 4, 7], [4, 7, 0], [7, 0, 4]
- Intervals: 7, 8, 9
- Normal form: [0, 4, 7]

### Prime Form

The most reduced representative of a set class.

**Procedure**:
1. Find normal form
2. Find normal form of inversion
3. Choose the one starting with 0 that is most compact
4. Transpose to start on 0

**Notation**: (0 x y z) in parentheses

**Example**: Major triad = (037)

## Interval Vector

A six-digit summary of all interval classes in a set.

**Format**: <ic1 ic2 ic3 ic4 ic5 ic6>

**Example**: Major triad {0, 4, 7}
- ic between 0-4 = 4
- ic between 4-7 = 3
- ic between 0-7 = 5

Interval vector: <001110>

## Common Set Classes

### Trichords (3 notes)

| Prime Form | Name | IC Vector |
|------------|------|-----------|
| (012) | Chromatic cluster | <210000> |
| (013) | — | <111000> |
| (014) | — | <101100> |
| (015) | — | <100110> |
| (016) | — | <100011> |
| (024) | Whole-tone trichord | <020100> |
| (025) | — | <011010> |
| (026) | — | <010101> |
| (027) | — | <010020> |
| (036) | Diminished trichord | <002001> |
| (037) | Major/minor triad | <001110> |
| (048) | Augmented triad | <000300> |

### Tetrachords (4 notes)

| Prime Form | Name | IC Vector |
|------------|------|-----------|
| (0123) | Chromatic tetrachord | <321000> |
| (0127) | — | <210021> |
| (0134) | — | <212100> |
| (0135) | — | <121110> |
| (0147) | — | <102111> |
| (0148) | — | <101310> |
| (0156) | — | <200121> |
| (0158) | M7 chord | <101220> |
| (0167) | — | <200022> |
| (0235) | — | <122010> |
| (0237) | — | <111120> |
| (0257) | — | <021030> |
| (0258) | Mm7 (dominant 7th) and ø7 (half-diminished 7th) | <012111> |
| (0268) | Fr+6 / Tritone pair | <020202> |
| (0347) | C–E♭–E–G: major and minor third over one root | <102210> |
| (0358) | min7 chord | <012120> |
| (0369) | dim7 chord | <004002> |

### Larger Sets

| Cardinality | Total Set Classes |
|-------------|-------------------|
| 3 (trichord) | 12 |
| 4 (tetrachord) | 29 |
| 5 (pentachord) | 38 |
| 6 (hexachord) | 50 |

## Set Relations

### Subset/Superset

Set A is a subset of B if all PCs in A are also in B.

**Example**: (037) is a subset of (0358)

### Complement

The complement of a set contains all PCs not in the original.

**Example**: Complement of {0, 1, 2} = {3, 4, 5, 6, 7, 8, 9, 10, 11}

### Z-Relation

Two sets with the same interval vector but not related by Tn or TnI.

**Example**: (0137) and (0146) both have IC vector <111111>

## Compositional Application

### Using Set Classes

1. **Choose a source set** (trichord, tetrachord, etc.)
2. **Generate variants** through Tn and TnI
3. **Find subsets/supersets** for variety
4. **Use interval vector** to control sonority

### Set-Based Composition

| Technique | Description |
|-----------|-------------|
| Transposition | Move set to different pitch levels |
| Inversion | Create mirror relationships |
| Subset extraction | Focus on smaller units |
| Superset embedding | Add notes to expand sonority |

### Controlling Interval Content

- High ic1/ic2: More dissonant, chromatic
- High ic3/ic4: More tonal-sounding
- High ic5: Open, hollow sound
- High ic6: Tension, instability

## Analysis Procedure

### Step 1: Segment the Music

Identify discrete pitch collections based on:
- Simultaneities (chords)
- Melodic units (phrases, motives)
- Rhythmic groupings
- Registral separation

### Step 2: Convert to Pitch Classes

| Note | → PC |
|------|------|
| C, B#, Dbb | 0 |
| D | 2 |
| E | 4 |
| ... | ... |

### Step 3: Find Normal Form

1. List PCs in ascending order (circular arrangement)
2. Calculate all rotations
3. Choose rotation with smallest outer interval (span)
4. If tied, compare the interval from the first to the next-to-last pc, then to the third-from-last, etc.; choose the smaller (Rahn method, see Conventions above)

### Step 4: Find Prime Form

1. Find normal form of the set
2. Transpose normal form to start on 0
3. Find normal form of the inversion (invert around 0, then find normal form)
4. Transpose inverted normal form to start on 0
5. Compare the two transposed forms: choose the more compact (using Step 3 criteria)
6. Look up in set-class table

### Step 5: Calculate Interval Vector

1. Find all pairs of PCs
2. Calculate interval class for each pair
3. Tally into six-digit vector

### Step 6: Analyze Relationships

- Find recurring set classes
- Identify subset/superset relationships
- Note Z-relations if present
- Map transformational relationships (Tn, TnI)

### Analysis Output Example

```json
{
  "segment": {"measure": 1, "beats": "1-2"},
  "pitches": ["E", "G#", "C"],
  "pitch_classes": [4, 8, 0],
  "normal_form": "[0, 4, 8]",
  "prime_form": "(048)",
  "set_class_name": "Augmented triad",
  "interval_vector": "<000300>"
}
```

## Constraints

1. **Pitch class = mod 12**: All calculations reduce mod 12
2. **Order doesn't matter**: Sets are unordered collections
3. **Enharmonic equivalence**: C# = Db
4. **Octave equivalence**: All C's are PC 0

## Sources

Based on Open Music Theory materials:
- `setClassAndPrimeForm1.md` - Basic definitions
- `setClassAndPrimeForm2.md` - Set class lists and IC vectors

Allen Forte's set-class numbering system provides standard catalog numbers (3-1, 4-Z15, etc.).

OMT 2e (v2):

| v2 chapter | Source URL | Used for |
|------------|------------|----------|
| `v2/08-20th-and-21st-century-techniques/03-intervals-in-integer-notation.md` | https://viva.pressbooks.pub/openmusictheory/chapter/intervals-in-integer-notation/ | ic 1–6 |
| `v2/08-20th-and-21st-century-techniques/04-pc-sets-normal-order-and-transformations.md` | https://viva.pressbooks.pub/openmusictheory/chapter/pc-sets-normal-order-and-transformations/ | normal order, I_n |
| `v2/08-20th-and-21st-century-techniques/05-set-class-and-prime-form.md` | https://viva.pressbooks.pub/openmusictheory/chapter/set-class-and-prime-form/ | prime form, set-class table (Rahn) |


## Score Examples

Musical passages from the source pages, transcribed into [lilylet](../examples/lilylet-primer.md), with the set operations worked on the actual notes:

| Example | What it shows |
|---------|---------------|
| [Bartók, Mikrokosmos 141 "Subject and Reflection"](../examples/08-post-tonal/subject-and-reflection.md) | four sets of one class (02357): hands T8I / T6I, passages T5 |
| [Prime form of the "Subject and Reflection" motive](../examples/08-post-tonal/prime-form.md) | the 5-step procedure on {10,0,2,3,5} → (02357) |
| [Debussy, La cathédrale engloutie, mm. 1 / 18](../examples/08-post-tonal/transposition-debussy.md) | T4 {11,2,4} → {3,6,8}: content and arrangement preserved |
| [Debussy, La cathédrale engloutie, mm. 28–30](../examples/08-post-tonal/inversion-debussy.md) | T4I {0,2,7} → {9,2,4}: same content, mirrored arrangement |

## Related Topics

- [Twelve-Tone Technique](twelve-tone.md) - Ordered use of all 12 PCs
- [Augmented Sixths](../02-chromatic-harmony/augmented-sixths.md) - (0268) in tonal context
- [Neo-Riemannian Transformations and Mediants](../02-chromatic-harmony/neo-riemannian-and-mediants.md)

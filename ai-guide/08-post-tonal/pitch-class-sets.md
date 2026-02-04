---
title: Pitch-Class Sets
category: post-tonal
tags: [pitch-class, set-theory, atonal, interval-vector]
related: [twelve-tone]
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

The distance between two pitch classes, reduced to 0-6.

| IC | Intervals |
|----|-----------|
| 0 | Unison, octave |
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
3. If tied, compare successively inner intervals

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
| (0127) | — | <201210> |
| (0134) | — | <211110> |
| (0135) | — | <211110> |
| (0147) | Mm7 chord | <102111> |
| (0148) | M7 chord | <101310> |
| (0156) | — | <200121> |
| (0167) | — | <110121> |
| (0235) | — | <121110> |
| (0237) | — | <111120> |
| (0257) | — | <021120> |
| (0258) | Half-dim/Dom7 | <012111> |
| (0268) | Fr+6 / Tritone pair | <020202> |
| (0347) | Mm triad + M2 | <102210> |
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
4. If tied, compare successively from left: choose rotation where first interval is smallest, then second, etc.

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

## Related Topics

- [Twelve-Tone Technique](twelve-tone.md) - Ordered use of all 12 PCs
- [Augmented Sixths](../02-chromatic-harmony/augmented-sixths.md) - (0268) in tonal context

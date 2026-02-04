---
title: Twelve-Tone Technique
category: post-tonal
tags: [twelve-tone, serialism, row, matrix]
related: [pitch-class-sets]
difficulty: advanced
---

# Twelve-Tone Technique

## Summary

Twelve-tone technique (serialism) organizes music using an ordered arrangement of all 12 pitch classes called a row. The row and its transformations provide the pitch material for an entire composition.

## The Twelve-Tone Row

### Definition

A **row** (or **series**) is an ordered sequence of all 12 pitch classes, each appearing exactly once.

**Example row**: 0 1 4 2 9 5 11 3 8 10 7 6

### Properties

| Property | Description |
|----------|-------------|
| Complete | Contains all 12 PCs |
| Non-repetition | Each PC appears once |
| Ordered | Sequence matters |
| Abstract | Not tied to specific octave |

## Row Transformations

### Prime (P)

The original row, transposed to start on any PC.

**P0**: Original row starting on 0
**Pn**: Row transposed to start on n

### Retrograde (R)

The row reversed.

**Rn**: Retrograde of Pn (reads Pn backwards)

### Inversion (I)

Each interval inverted (up becomes down).

**I0**: Inversion starting on 0
**In**: Inversion transposed to start on n

**Calculation**: In = n - Pm (for each element)

### Retrograde Inversion (RI)

The inversion reversed.

**RIn**: Retrograde of In

## The Twelve-Tone Matrix

A 12×12 grid showing all 48 row forms.

### Reading the Matrix

| Direction | Form |
|-----------|------|
| Left to right | Prime (P) |
| Right to left | Retrograde (R) |
| Top to bottom | Inversion (I) |
| Bottom to top | Retrograde Inversion (RI) |

### Constructing a Matrix

1. Write P0 across top row
2. Write I0 down first column
3. Fill each cell: add row-start PC to column value (mod 12)

### Example Matrix

For row P0 = 0 1 4 2 9 5 11 3 8 10 7 6:

```
     I0  I1  I4  I2  I9  I5  I11 I3  I8  I10 I7  I6
P0   0   1   4   2   9   5   11  3   8   10  7   6
P11  11  0   3   1   8   4   10  2   7   9   6   5
P8   8   9   0   10  5   1   7   11  4   6   3   2
P10  10  11  2   0   7   3   9   1   6   8   5   4
P3   3   4   7   5   0   8   2   6   11  1   10  9
P7   7   8   11  9   4   0   6   10  3   5   2   1
P1   1   2   5   3   10  6   0   4   9   11  8   7
P9   9   10  1   11  6   2   8   0   5   7   4   3
P4   4   5   8   6   1   9   3   7   0   2   11  10
P2   2   3   6   4   11  7   1   5   10  0   9   8
P5   5   6   9   7   2   10  4   8   1   3   0   11
P6   6   7   10  8   3   11  5   9   2   4   1   0
```

## Intervallic Structure

A row is also an ordered collection of intervals. Understanding intervallic relationships helps predict how row forms will sound.

### Interval Relationships Between Forms

| Relationship | Interval Pattern |
|--------------|------------------|
| **Transpositionally-related** (P and P) | Same intervals |
| **Inversionally-related** (P and I) | Complementary (sum to 12) |
| **Retrograde-related** (P and R) | Reverse complements |
| **RI-related** (P and RI) | Reverses of each other |

### Example

For P10 with intervals `8 11 4 3 5 2 6 1 9 7 10`:

| Form | Interval Pattern |
|------|------------------|
| P10 | 8 11 4 3 5 2 6 1 9 7 10 |
| I0 | 4 1 8 9 7 10 6 11 3 5 2 |
| R10 | 2 5 3 11 6 10 7 9 8 1 4 |
| RI0 | 10 7 9 1 6 2 5 3 4 11 8 |

**P and I**: Corresponding intervals sum to 12 (e.g., 8+4=12)
**P and RI**: Reverse of each other

## Row Properties

### Combinatoriality

Two row forms are **combinatorial** if their first hexachords (6 notes) together contain all 12 PCs.

**Types**:
- **P-combinatorial**: P and I forms
- **R-combinatorial**: P and RI forms
- **All-combinatorial**: Multiple relationships

### Derived Rows

Rows constructed from transformations of a smaller cell.

**Example**: A trichord (013) transposed 4 times creates a 12-note row.

### Invariants

Subsets that remain unchanged under certain transformations.

**Example**: If P0 and I5 share a tetrachord, that's an invariant.

## Compositional Application

### Using Row Forms

| Technique | Description |
|-----------|-------------|
| Linear | Row as melody |
| Vertical | Row as simultaneity |
| Segmented | Row divided into cells |
| Partitioned | Row distributed across voices |

### Segmentation

Divide row into segments for motivic material:

```
Row: 0 1 4 | 2 9 5 | 11 3 8 | 10 7 6
     -----   -----   ------   ------
     Cell A  Cell B  Cell C   Cell D
```

### Ordering Within Segments

Within a segment, notes may be:
- Reordered freely
- Sounded simultaneously
- Repeated

### Row Selection Guide

| Desired Property | Row Design |
|------------------|------------|
| Tonal references | Include triadic subsets |
| Atonal | Avoid tonal subsets |
| Combinatorial | Design for hexachord complement |
| Symmetric | Palindromic or interval patterns |

## Historical Context

### First Viennese School vs. Second

| First (Classical) | Second (Serial) |
|-------------------|-----------------|
| Haydn, Mozart, Beethoven | Schoenberg, Berg, Webern |
| Tonal harmony | Twelve-tone technique |
| Functional progressions | Row transformations |

### Major Composers

| Composer | Approach |
|----------|----------|
| Schoenberg | Founder, varied applications |
| Berg | Tonal references within rows |
| Webern | Concentrated, symmetric rows |
| Boulez | Total serialism (rhythm, dynamics) |
| Babbitt | Combinatoriality, time-point rows |

## Constraints

1. **All 12 PCs**: Row must contain each PC exactly once
2. **Complete statement**: Generally use entire row before repeating
3. **48 forms**: P, I, R, RI × 12 transpositions
4. **Order matters**: Unlike pitch-class sets, sequence is significant

## Common Row Types

### All-Interval Row

Contains each interval class (1-11) exactly once.

### Symmetric Row

Retrograde equals a transposition of prime.

### Derived Row

Built from repetitions of a smaller cell.

## Analysis Checklist

1. Identify the row (find P0)
2. Build the matrix
3. Identify row forms in the music
4. Note segmentation and partitioning
5. Find invariants between forms
6. Examine combinatorial relationships

## Sources

Based on Open Music Theory materials:
- `twelveToneBasics.md` - Row fundamentals, P/I/R/RI forms
- `twelveToneIntervallicStructure.md` - Interval relationships between forms
- `twelveToneOperations.md` - Transformational operations

## Related Topics

- [Pitch-Class Sets](pitch-class-sets.md) - Unordered pitch relationships

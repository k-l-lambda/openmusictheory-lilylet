---
title: Twelve-Tone Technique
category: post-tonal
tags: [twelve-tone, serialism, row, matrix]
related: [pitch-class-sets]
examples: [08-op27-row, 08-op27-row-family, 08-op27-row-operations, 08-op28-derived-row, 08-op28-invariance]
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

### Naming Conventions (fixed vs. moveable zero)

OMT 2e (`v2/09-twelve-tone-music/02-naming-conventions-for-rows.md`) names two conventions. Both use the same operations; only the reference row differs.

| Convention | P0 | I0 | R0 / RI0 |
|------------|----|----|----------|
| **Fixed zero** (most common today; used in this file) | the transposition starting on C (pc 0) | starts on C | R0 = P0 backwards; RI0 = I0 backwards (they *end* on C) |
| **Moveable zero** | the form the analyst chooses (first heard, or most meaningful) | starts on P0's first pc | R0 = P0 backwards; RI0 = I0 backwards |

- A hybrid is also common: the matrix's top row is the analyst's chosen form, but forms are labelled by fixed zero (top row = P<sub>n</sub>, n = its first pc).
- Rule for this guide: Rn and RIn are named after the P or I form they reverse, so R<sub>n</sub> *ends* on n. Some published matrices (including some in OMT 2e) instead label R and RI by their first pc. Check which one a source uses before comparing labels.
- Which orientation counts as P vs. I is often arbitrary; no standard rule exists (v2 09/02).

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

### Ordered Pitch-Class Intervals (OPCIs)

For any row, calculate the interval from each PC to the next (mod 12). A 12-note row has 11 OPCIs.

**Example:** Row `0 1 4 2 9 5 11 3 8 10 7 6`
- 0→1 = 1, 1→4 = 3, 4→2 = 10, 2→9 = 7, etc.
- OPCIs: `1 3 10 7 8 6 4 5 2 9 11`

### Interval Relationships Between Forms

| Relationship | OPCI Pattern |
|--------------|--------------|
| **Transposition** (Pn to Pm) | Identical OPCIs |
| **Inversion** (P to I) | Each OPCI negated (12 - interval) |
| **Retrograde** (P to R) | OPCIs reversed AND negated (reverse complements) |
| **Retrograde-Inversion** (P to RI) | OPCIs reversed only |

### How to Use This

- **Same OPCIs**: Transposed rows sound similar melodically
- **Negated OPCIs**: Inverted rows mirror the contour
- **Reversed + negated**: R rows are reverse complements of P
- **Reversed only**: RI rows share the same intervals as P, reversed

## Row Properties

### Hexachordal Combinatoriality

Two row forms are **combinatorial** if their first hexachords together contain all 12 PCs (each one is the other's complement). Source: `v2/09-twelve-tone-music/03-row-properties.md`.

- **Trivial case**: P<sub>n</sub> and R<sub>n</sub> (and I<sub>n</sub>/RI<sub>n</sub>) are always combinatorial, because R's first hexachord is P's second. This says nothing about the row.
- The property is meaningful only when it holds between P and another P (Tn, n ≠ 0), between P and I, or between P and RI.

| Degree (Babbitt) | Definition |
|------------------|------------|
| **Semi-combinatorial** | holds for one of these transformation types: P–P (transposition), P–I (inversion), or P–RI (retrograde inversion) |
| **All-combinatorial** | holds for all of them (P–P, P–I and P–RI) |

- Combinatoriality depends only on the first hexachord's set class and how it maps onto its complement. The common inversional case is P<sub>0</sub> paired with I<sub>n</sub> whose first hexachord = P<sub>0</sub>'s second hexachord.
- Only six hexachord types give all-combinatorial rows. (OMT 2e says "six distinct rows"; it means six hexachord types, since many rows share each.) Examples: (012345) chromatic hexachord (Webern Op. 21), (014589) "magic"/hexatonic hexachord (Webern Op. 24; Schoenberg *Ode to Napoleon*), (02468T) whole-tone.
- (014589) is all-combinatorial by transposition at T2, T6 and T10 (v2 09/03). Of all hexachords, only the whole-tone hexachord gives more transpositional combinatoriality: at every odd Tn.

**Worked check (fixed-zero labels)**:
- Webern Op. 21, P9 = <9 6 7 8 4 5 | 11 10 2 1 0 3>: first hexachord complemented by P3, I10 and RI4, so it is all-combinatorial.
- Webern Op. 24, P11 = <11 10 2 3 7 6 | 8 4 5 0 1 9>: complemented by P1/P5/P9, I0/I4/I8 and RI2/RI6/RI10.

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
3. **48 forms**: P, I, R, RI × 12 transpositions (24 distinct if the row is retrograde-symmetric)
4. **Order matters**: Unlike pitch-class sets, sequence is significant

## Common Row Types

### All-Interval Row

The 11 **ordered pitch-class intervals** between adjacent pcs are all different, so each of 1–11 occurs exactly once. (These are not interval classes. There are only six ics, and an ordinary row repeats them.)
- Always true: positions 1&12, 2&11, 3&10, 4&9, 5&8 and 6&7 are each a tritone apart, and the middle interval (6→7) is 6.
- There are 1,928 all-interval rows (v2 09/03).
- The example row in this file, <0 1 4 2 9 5 11 3 8 10 7 6>, is all-interval: OPCIs <1 3 10 7 8 6 4 5 2 9 11>.

### Retrograde-Symmetric Row

R of the row equals a transposition of P. For a 12-tone row this transposition is always T6: R(P<sub>n</sub>) = P<sub>n+6</sub>. Such a row has only 24 distinct forms instead of 48.
- Example: Webern *Symphonie* Op. 21 (`v2/09-twelve-tone-music/04-twelve-tone-analysis-examples-webern-op-21-and-24.md`). Its hexachords are both (012345) and its trichords are (013)(014)(014)(013).

### Cell-Permutation Equivalence (Webern Op. 24)

All four discrete trichords of the Op. 24 row are (014), and the ordered cells are related to each other by P, R, I and RI.
- Reordering the cells (1234 → 4321 / 2143 / 3412) yields R, I and RI forms. Each row form therefore shares its four ordered trichords with three other forms, and only 12 distinct trichord-content groups remain.
- Example: P11 shares its cells with I0, R5 and RI6 (fixed zero).
- Both hexachords are (014589).

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

OMT 2e (v2):

| v2 chapter | Source URL | Used for |
|------------|------------|----------|
| `v2/09-twelve-tone-music/02-naming-conventions-for-rows.md` | https://viva.pressbooks.pub/openmusictheory/chapter/naming-conventions-for-rows/ | fixed vs. moveable zero |
| `v2/09-twelve-tone-music/03-row-properties.md` | https://viva.pressbooks.pub/openmusictheory/chapter/row-properties/ | all-interval, semi-/all-combinatorial, (014589) |
| `v2/09-twelve-tone-music/04-twelve-tone-analysis-examples-webern-op-21-and-24.md` | https://viva.pressbooks.pub/openmusictheory/chapter/twelve-tone-analysis-examples-webern-op-21-and-24/ | Op. 21 and Op. 24 rows |

**Known errors in OMT 2e (do not copy)**:
- 09/03 prints 12! as 490,001,600; the correct value is 479,001,600.
- 09/04's Op. 24 matrix gives P0 as <11 8 2 3 …>, repeating pc 8. The correct row is <11 10 2 3 7 6 8 4 5 0 1 9>.
- Some 2e matrices label R forms by first pc, which contradicts the text's rule that R0 is P0 reversed.

## Score Examples (planned)

- Webern Op. 21 row with its trichord/hexachord divisions (v2 09/04, Example 1)
- Webern Op. 24 row in four (014) cells (v2 09/04, Example 4)
- Nono *Il canto sospeso* all-interval row (v2 09/03, Example 1)

## Score Examples

Rows and row forms from the source pages, transcribed into [lilylet](../examples/lilylet-primer.md) and checked by pc arithmetic:

| Example | What it shows |
|---------|---------------|
| [Webern Op. 27 row P11](../examples/08-post-tonal/op27-row.md) | a row in prime form, pcs and OPCIs |
| [Op. 27 row family](../examples/08-post-tonal/op27-row-family.md) | P11/R11 and I0/RI0 from two written rows; I0 = T11I(P11) |
| [Op. 27 row operations](../examples/08-post-tonal/op27-row-operations.md) | T11 → P10, R → R10, T10I(P10) → I0, R → RI0, with OPCIs |
| [Webern Op. 28 derived row P7](../examples/08-post-tonal/op28-derived-row.md) | tetrachordally derived by (0123), dyads (01) |
| [Op. 28 invariance under T8](../examples/08-post-tonal/op28-invariance.md) | discrete (0123) tetrachords held invariant between P7 and P3 |

## Related Topics

- [Pitch-Class Sets](pitch-class-sets.md) - Unordered pitch relationships

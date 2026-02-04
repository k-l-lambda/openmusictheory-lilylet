---
title: Harmonic Analysis Methods
category: harmonic-functions
tags: [analysis, roman-numerals, figured-bass, functional-analysis]
related: [tonic-subdominant-dominant, cadences, prolongation]
difficulty: intermediate
---

# Harmonic Analysis Methods

## Summary

Harmonic analysis involves identifying chords, interpreting their functions, and understanding how they work within phrases. This page outlines the step-by-step procedure for analyzing harmony using Roman numerals and functional bass notation.

## Analysis Procedure Overview

```
1. Identify phrases (locate cadences)
2. Label chords (RN + figured bass)
3. Assign functions (T/S/D)
4. Identify prolongation zones
5. Map cadential progressions
```

## Step 1: Identify Phrases

### Locate Cadences First

| Cadence Type | Ending | Function |
|--------------|--------|----------|
| PAC | V(7)→I, root position, soprano on 1 | Strong close |
| IAC | V(7)→I, with inversion or soprano not on 1 | Weak close |
| HC | Phrase ends on V | Half close |
| DC | V→vi (or other) | Evaded close |

### Consider Theme Types

- **Sentence**: Presentation + continuation + cadence
- **Period**: Antecedent (weak cadence) + consequent (strong cadence)
- **Presentation phrase**: May prolong tonic without cadence

## Step 2: Label Chords with Roman Numerals

### From Figured Bass to Roman Numeral

#### Root Position (5/3 or 7)

Bass note = root. Roman numeral = scale degree of bass.

| Bass | Figure | Root | RN |
|------|--------|------|-----|
| do | 5/3 | do | I |
| re | 5/3 | re | ii |
| sol | 7 | sol | V7 |

#### First Inversion (6/3 or 6/5)

Root is a 6th above bass.

| Bass | Figure | Root | RN |
|------|--------|------|-----|
| mi | 6 | do | I6 |
| fa | 6/5 | re | ii65 |
| ti | 6 | sol | V6 |

#### Second Inversion (6/4 or 4/3)

Root is a 4th above bass.

| Bass | Figure | Root | RN |
|------|--------|------|-----|
| sol | 6/4 | do | I64 (cad.) |
| re | 4/3 | sol | V43 |

#### Third Inversion (4/2 or 2)

Root is a 2nd above bass.

| Bass | Figure | Root | RN |
|------|--------|------|-----|
| fa | 4/2 | sol | V42 |

### Quick Reference Table

| Inversion | Figure | Root Location |
|-----------|--------|---------------|
| Root position | 5/3, 7 | = bass |
| First | 6, 6/5 | 6th above bass |
| Second | 6/4, 4/3 | 4th above bass |
| Third | 4/2, 2 | 2nd above bass |

## Step 3: Assign Functions

### Basic Function Assignment

| Scale Degree (bass) | Typical Function |
|---------------------|------------------|
| 1 | T |
| 2 | S (as ii) |
| 3 | T (as I6 or iii) |
| 4 | S |
| 5 | D |
| 6 | T or S (as vi or IV6) |
| 7 | D (as viio or V6) |

### Functional Bass Notation

| Symbol | Meaning |
|--------|---------|
| T1 | Tonic, bass on 1 |
| T3 | Tonic, bass on 3 (I6 or iii) |
| S4 | Subdominant, bass on 4 |
| S2 | Subdominant, bass on 2 (ii) |
| D5 | Dominant, bass on 5 |
| D7 | Dominant, bass on 7 (viio) |

## Step 4: Identify Prolongation Zones

### Tonic Prolongation

Everything before the cadential progression is labeled **T———**

Types of tonic prolongation:
- Contrapuntal (passing/neighbor chords)
- Subsidiary progression (T→S→D→T returning to T)
- Combination

### Phrase Structure Patterns

| Phrase Type | Functional Pattern |
|-------------|-------------------|
| No cadence (presentation) | T——— |
| Half cadence | T——— (S) D |
| Authentic cadence | T——— (S) D T |

## Step 5: Map Cadential Progression

### Cadential Progression Formula

```
Last T chord → (optional S) → required D → (T for authentic)
```

### Examples

**Half Cadence:**
```
T——————— (S) D
I  V6  I6  ii6  V
T1 D7  T3  S4   D5
```

**Perfect Authentic Cadence:**
```
T——————— (S) D  T
I  V6  I6  ii6  V7  I
T1 D7  T3  S4   D5  T1
```

## Complete Analysis Example

### Phrase ending with PAC

```
Measure:    1    2    3    4    5    6    7    8
Chord:      I    V6   I6   IV   ii6  V7   I
Function:   T1   D7   T3   S4   S4   D5   T1
Zone:       T————————————————   S    D    T
                              └──cadential──┘
```

### Analysis Output

```
Tonic prolongation: mm. 1-4
Cadential progression: mm. 5-8
  - Pre-dominant: ii6 (m. 5-6)
  - Dominant: V7 (m. 7)
  - Tonic resolution: I (m. 8)
Cadence type: PAC
```

## Analysis Checklist

1. ☐ Identify phrase boundaries (cadences)
2. ☐ Reduce texture to bass + figures
3. ☐ Assign Roman numerals to each chord
4. ☐ Label T/S/D function for each chord
5. ☐ Mark tonic prolongation zone
6. ☐ Identify cadential progression
7. ☐ Label cadence type (PAC/IAC/HC/DC)

## Common Analysis Errors

| Error | Correction |
|-------|------------|
| Labeling every chord's function individually | Group into prolongation zones |
| Missing cadential 6/4 as separate entity | Cadential 6/4 is part of D, not T |
| Confusing ii6 and IV | Both are S function, check bass |
| Calling V6 a cadential chord | V6 is typically prolongational, not cadential |

## Constraints

1. **Every phrase has one functional progression**: T (prolongation) → (S) → D → (T)
2. **Cadential progressions end phrases**: No function changes after final T
3. **Prolongation is hierarchical**: Everything before cadential progression = T zone
4. **D5 required for HC/PAC**: Half and authentic cadences require root-position V

## Sources

Based on OMT source files:
- `harmonicAnalysis.md` - Analysis procedure
- `RNfromFB.md` - Roman numeral from figured bass

## Related Topics

- [T-S-D Functions](tonic-subdominant-dominant.md) - Function definitions
- [Cadences](cadences.md) - Cadence types and requirements
- [Prolongation](prolongation.md) - Prolongation techniques
- [Voice-Leading Rules](voice-leading-rules.md) - Chord connection rules

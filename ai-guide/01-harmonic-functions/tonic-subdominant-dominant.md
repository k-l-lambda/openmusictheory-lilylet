---
title: Tonic, Subdominant, and Dominant
category: harmonic-functions
tags: [tonic, subdominant, dominant, scale-degrees, triggers]
related: [prolongation, cadences]
difficulty: foundational
---

# Tonic, Subdominant, and Dominant

## Summary

The three harmonic functions (T, S, D) are determined by the scale degrees present in a chord. Each function has characteristic "trigger" scale degrees that most strongly define it.

## Scale Degree Classification

### By Function (Scale Degrees)

| Function | Triggers | Associates | Dissonances |
|----------|----------|------------|-------------|
| **Tonic (T)** | 1, 3 | 5, 6 | 5 (with 6), 7 |
| **Subdominant (S)** | 4, 6 | 1, 2 | 1 (with 2), 3 |
| **Dominant (D)** | 5, 7 | 2 | 4, 6 |

### By Function (Solfege)

| Function | Triggers | Associates | Dissonances |
|----------|----------|------------|-------------|
| **Tonic (T)** | do, mi | sol, la | sol (with la), ti |
| **Subdominant (S)** | fa, la | do, re | do (with re), mi |
| **Dominant (D)** | sol, ti | re | fa, la |

## Determining Chord Function

**Algorithm:**
1. List all scale degrees in the chord (ignore chromatic alterations)
2. Find function(s) containing all those scale degrees
3. If multiple matches, choose function with most triggers present

## Chord-to-Function Mapping

### Major Key

| Chord | Scale Degrees | Function |
|-------|---------------|----------|
| I | 1-3-5 | T (triggers: 1, 3) |
| ii | 2-4-6 | S (triggers: 4, 6) |
| iii | 3-5-7 | T (triggers: 3) |
| IV | 4-6-1 | S (triggers: 4, 6) |
| V | 5-7-2 | D (triggers: 5, 7) |
| vi | 6-1-3 | T (special: Tx) |
| vii° | 7-2-4 | D (triggers: 7) |

### Minor Key

| Chord | Scale Degrees | Function |
|-------|---------------|----------|
| i | 1-3-5 | T |
| ii° | 2-4-6 | S |
| III | 3-5-7 | T |
| iv | 4-6-1 | S |
| V | 5-7-2 | D |
| VI | 6-1-3 | T (Tx) |
| vii° | 7-2-4 | D |

## Special Cases

### Destabilized Tonic (Tx)

The vi chord (6-1-3) contains tonic triggers but lacks scale degree 5. It functions as tonic but with less stability. Label: **Tx** or simply **T**.

### Ambiguous III7

The III7 chord (3-5-7-2) contains scale degrees from both T and D. Its function depends on context:
- Moving to vi: functions as D
- Moving to IV or ii: functions as T

## Functional Bass Notation

Combine function + bass scale degree:
- **T1** = Tonic with *do* in bass (I chord, root position)
- **S4** = Subdominant with *fa* in bass (IV or ii6)
- **D5** = Dominant with *sol* in bass (V chord)
- **D7** = Dominant with *ti* in bass (vii°)

**Chromatic alterations:** Use brackets
- **[S6]** = Chromatically altered S chord with *la* in bass
- **[D+4]** = Dominant with raised *fa* in bass

## Compositional Application

### Function Sequences (Common)

| Pattern | Description | Example |
|---------|-------------|---------|
| T-D-T | Basic tension-release | I-V-I |
| T-S-D-T | Full harmonic cycle | I-IV-V-I |
| T-S-T | Plagal motion | I-IV-I |
| S-D | Pre-cadential | ii-V, IV-V |

### Function Sequences (Avoid)

| Pattern | Issue |
|---------|-------|
| D-S | Retrogression (weak) |
| D-D-D... | No resolution |

## Related Topics

- [Prolongation](prolongation.md) - Extending functions over multiple chords
- [Cadences](cadences.md) - How functions create phrase endings
- [Voice-Leading Rules](voice-leading-rules.md) - How functional dissonances resolve

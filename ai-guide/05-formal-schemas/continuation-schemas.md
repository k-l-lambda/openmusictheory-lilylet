---
title: Continuation Schemas
category: formal-schemas
tags: [schema, galant, continuation, prinner, fonte, monte, ponte]
related: [opening-schemas, cadential-schemas, sentence]
difficulty: intermediate
---

# Continuation Schemas

## Summary

Continuation schemas are melodic-harmonic patterns used after opening gambits, typically in the continuation phrase of a sentence or the contrasting middle of a ternary form. They provide forward motion through sequences or harmonic delay.

## The Prinner

The Prinner is the quintessential response to an opening schema, functioning as a closing gesture.

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| **Melody** | la | sol | fa | mi |
| **Bass** | fa | mi | re | do |
| **Figure** | 5/3 | 6/3 | 7-6/3 | 5/3 |
| **RN** | IV | I | VII | I |
| **Function** | S | T | D | T |

**Extended Prinner with cadence:**

| Stage | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| **Melody** | la | sol | fa | fa | mi |
| **Bass** | fa | mi | re | sol | do |
| **Figure** | 5/3 | 6/3 | 7-6/3 | 7 | 5/3 |
| **RN** | IV | I | VII | V | I |
| **Function** | S | T | D | D | T |

**Character**: Descending parallel 10ths in outer voices. Smooth, cadential quality.

## The Modulating Prinner

Modulates from tonic to dominant. Common in transitions and modulating sentences.

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| **Melody** | mi | re | do | ti |
| **Bass** | do | ti | la | sol |
| **Figure** | 5/3 | 6/3 | 7-#6/3 | 5/3 |
| **RN** | I | V | VII/V | V |

**Extended version:**

| Stage | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| **Melody** | mi | re | do | do | ti |
| **Bass** | do | ti | la | re | sol |
| **Figure** | 5/3 | 6/3 | 7-#6/3 | 7/# | 5/3 |
| **RN** | I | V | VII/V | V/V | V |

**Usage**: Transition modules in sonata form, modulating continuation phrases.

## The Passo Indietro

First two stages of a Prinner, often elided to make room for a cadence.

| Stage | 1 | 2 |
|-------|---|---|
| **Melody** | la | sol |
| **Bass** | fa | mi |
| **Figure** | 5/3 | 6/3 |
| **RN** | IV | I |
| **Function** | S | T |

**Modulating version:**

| Stage | 1 | 2 |
|-------|---|---|
| **Melody** | mi | re |
| **Bass** | do | ti |
| **Figure** | 5/3 | 6/3 |
| **RN** | I | V |

**Character**: Truncated Prinner, creates space for subsequent cadential gesture.

## The Fonte

A **model-sequence** schema that descends by step. Italian for "fountain" (going down).

**Structure**: 2-bar model + 2-bar sequence (one step lower)

| Unit | Model | Sequence |
|------|-------|----------|
| **Harmony** | D7/II → T1/II | D7 → T1 |
| **Key area** | ii (supertonic) | I (tonic) |
| **Function** | Applied → Resolution | Applied → Resolution |

**Harmonic Pattern** (in G major):
- Model: A7 → Dm (V7/ii → ii)
- Sequence: G7 → C... wait, that's wrong
- Model: A7 → D... no

**Correct Pattern** (in G major):
- Model: E7 → Am (V7/ii → ii)
- Sequence: D7 → G (V7 → I)

**Typical Location**: After double bar in minuet, beginning of contrasting middle section.

**Formal Context**:
```
||: EXPOSITION (V:PAC) :||: Fonte → HC → RECAPITULATION :||
```

**Character**: Efficiently returns from dominant key to tonic. Non-cadential D7-T1 progressions.

## The Monte

A **model-sequence** schema that ascends by step. Italian for "mountain" (going up).

**Structure**: 2-bar model + 2-bar (or more) sequence (one step higher)

| Unit | Model | Sequence |
|------|-------|----------|
| **Harmony** | D7/IV → T1/IV | D7/V → T1/V |
| **Key area** | IV (subdominant) | V (dominant) |

**Pattern**: Rising by step, typically targeting V for dominant arrival.

**Length**: Usually 4 bars, but can extend to 6+ bars with additional sequences.

**Character**: Builds tension through ascending sequence, prepares dominant arrival.

## The Ponte

A **standing-on-dominant** schema. Italian for "bridge."

**Structure**: Prolongs dominant harmony, creates delay rather than motion.

**Typical Usage**:
1. After PAC in dominant (end of exposition)
2. Holds T1/V, adds tension
3. Often adds seventh (becomes D5 of home key)
4. Ends with dominant arrival (not half cadence—no harmonic progression)

**Character**: Heightens tension through melodic activity over static harmony. Prepares recapitulation.

## Schema Comparison

| Schema | Direction | Type | Typical Length | Location |
|--------|-----------|------|----------------|----------|
| Prinner | Descending | Linear | 4 stages | Continuation |
| Mod. Prinner | Descending | Modulating | 4-5 stages | Transition |
| Fonte | Descending | Sequential | 4 bars | Contrasting middle |
| Monte | Ascending | Sequential | 4-6 bars | Contrasting middle |
| Ponte | Static | Prolongation | Variable | After exposition PAC |

## Compositional Application

### Choosing a Continuation Schema

| Situation | Schema |
|-----------|--------|
| After opening gambit | Prinner |
| Transition to V | Modulating Prinner |
| Contrasting middle (descend) | Fonte |
| Contrasting middle (ascend) | Monte |
| Delay before recap | Ponte |

### Typical Sentence Structure

```
Presentation: Opening Schema (Meyer, Jupiter, etc.)
Continuation: Prinner → Cadence
```

### Minuet Form

```
A (exposition): Opening → Cadence in V
B (middle): Fonte/Monte/Ponte → HC
A' (recap): Opening → Cadence in I
```

## Constraints

1. **Fonte/Monte**: Non-cadential progressions—analyze chords individually, not as prolongation
2. **Prinner**: Bass descends fa-mi-re-do; melody in parallel 10ths
3. **Ponte**: No harmonic progression—dominant arrival, not half cadence
4. **Modulating Prinner**: First chord (fa bass in new key) = tonic of old key

## Related Topics

- [Opening Schemas](opening-schemas.md) - Meyer, Jupiter, Aprile
- [Cadential Schemas](cadential-schemas.md) - PAC, IAC, HC patterns
- [Sentence](../04-phrase-structure/sentence.md) - Presentation + continuation

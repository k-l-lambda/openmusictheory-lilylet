---
title: Cadential Schemas
category: formal-schemas
tags: [schema, galant, cadence, PAC, IAC, HC]
related: [opening-schemas, continuation-schemas, cadences]
difficulty: intermediate
---

# Cadential Schemas

## Summary

Cadential schemas are closing patterns that provide harmonic and melodic closure. They range from simple two-stage patterns to compound three-stage patterns with cadential 6/4.

## Simple Cadences

### Simple PAC (Perfect Authentic Cadence)

| Stage | 1 | 2 |
|-------|---|---|
| **Melody** | re | do |
| **Bass** | sol | do |
| **Figure** | (7) | 5/3 |
| **RN** | V | I |
| **Function** | D | T |

**Character**: Strongest closure. Melody arrives on tonic scale degree.

### Simple IAC (Imperfect Authentic Cadence)

| Stage | 1 | 2 |
|-------|---|---|
| **Melody** | fa | mi |
| **Bass** | sol | do |
| **Figure** | 7 | 5/3 |
| **RN** | V | I |
| **Function** | D | T |

**Character**: Weaker than PAC. Melody ends on 3rd scale degree. 7th in dominant adds forward pull.

## Compound Cadences

Compound cadences add a cadential 6/4 before the dominant, creating a three-stage pattern.

### Compound PAC

| Stage | 1 | 2 | 3 |
|-------|---|---|---|
| **Melody** | mi | re | do |
| **Bass** | sol | sol | do |
| **Figure** | 8/6/4 | (7) | 5/3 |
| **RN** | Cad. | V | I |
| **Function** | D | D | T |

**Character**: Grandest authentic cadence. The mi-re-do descent creates strong closure.

### Compound IAC

| Stage | 1 | 2 | 3 |
|-------|---|---|---|
| **Melody** | sol | fa | mi |
| **Bass** | sol | sol | do |
| **Figure** | 8/6/4 | 7 | 5/3 |
| **RN** | Cad. | V | I |
| **Function** | D | D | T |

**Character**: Compound cadence with weaker melodic close. Sol-fa-mi maintains 3rd in final position.

### Compound HC (Half Cadence)

| Stage | 1 | 2 |
|-------|---|---|
| **Melody** | mi | re |
| **Bass** | sol | sol |
| **Figure** | 6/4 | 5/3 |
| **RN** | Cad. | V |
| **Function** | D | D |

**Character**: Opens-ended. Can be approached by any S chord or end of tonic prolongation.

## The fa–fi–sol HC

A chromatic approach to the half cadence, especially common at end of transition (TR) modules.

| Stage | 1 | 2 | 3 |
|-------|---|---|---|
| **Melody** | re | do | ti |
| **Bass** | fa | fi | sol |
| **Figure** | 6/3 | 6/5 | (7) |
| **RN** | II | V/V | V |
| **Function** | S | S | D |

**Character**: Chromatic bass line creates strong drive to dominant. Very common in sonata transitions.

**Examples**: Mozart K. 545, I, mm. 10-11; Mozart K. 333, I, mm. 17-18

## Cadence Comparison

| Cadence | Strength | Melodic Close | Bass Motion |
|---------|----------|---------------|-------------|
| Compound PAC | Strongest | do | sol-sol-do |
| Simple PAC | Strong | do | sol-do |
| Compound IAC | Moderate | mi | sol-sol-do |
| Simple IAC | Moderate-weak | mi | sol-do |
| Compound HC | Open | re | sol-sol |
| fa-fi-sol HC | Open (chromatic) | ti | fa-fi-sol |

## Cadential Strength Hierarchy

From strongest to weakest closure:

1. **Compound PAC** (mi-re-do over cad.6/4-V-I)
2. **Simple PAC** (re-do over V-I)
3. **Compound IAC** (sol-fa-mi over cad.6/4-V-I)
4. **Simple IAC** (fa-mi over V-I)
5. **HC** (stops on V, no resolution)

## Compositional Application

### Cadence Selection Guide

| Formal Position | Recommended Cadence |
|-----------------|---------------------|
| End of antecedent | HC or IAC |
| End of consequent | PAC (compound preferred) |
| End of sentence | PAC |
| End of transition | fa-fi-sol HC |
| End of exposition | Compound PAC |
| End of development | HC (dominant arrival) |

### Cadential Progressions

**Approach to Compound Cadence:**
```
S chord → Cad.6/4 → V → I
(II, IV, ii) → (6/4 on sol) → V → I
```

**Approach to Half Cadence:**
```
Any S or T chord → Cad.6/4 → V
```

### Period Structure

```
Antecedent: Opening schema → HC or IAC
Consequent: Opening schema → PAC
```

### Sentence Structure

```
Presentation: Opening schema
Continuation: Prinner or fragmentation → PAC
```

## Voice-Leading Rules

### Cadential 6/4

1. Bass (sol) is stationary through stages 1-2
2. Upper voices create 6/4 resolving to 5/3
3. The 6/4 is NOT a tonic chord—it's dominant function

### Authentic Cadences

1. **Leading tone (ti)** resolves up to tonic (do)
2. **7th of V7 (fa)** resolves down to mi
3. **Bass** leaps up P4 or down P5 (sol→do)

### Half Cadences

1. No resolution required—ends on dominant
2. Dominant should be in root position
3. Prepare with predominant for stronger arrival

## Constraints

1. **PAC requirements**: Root position V to root position I, soprano on do
2. **IAC**: Any deviation from PAC requirements
3. **Cadential 6/4**: Always dominant function, always on strong beat
4. **fa-fi-sol**: Chromatic bass requires careful voice-leading to avoid parallels

## Sources

Based on Robert Gjerdingen's galant schemata as presented in OMT:

| Source File | Content |
|-------------|---------|
| `schemataOpensAndCloses.md` | Cadential schema definitions |
| `schemataSummary.md` | Schema overview and catalog |

**Primary theoretical reference**: Gjerdingen, Robert. *Music in the Galant Style*. Oxford University Press, 2007.

## Related Topics

- [Cadences](../01-harmonic-functions/cadences.md) - Functional cadence types
- [Opening Schemas](opening-schemas.md) - Phrase beginnings
- [Continuation Schemas](continuation-schemas.md) - Prinner leads to cadence

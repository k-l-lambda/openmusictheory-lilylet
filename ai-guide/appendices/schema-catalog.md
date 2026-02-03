---
title: Schema Catalog
category: appendix
tags: [schema, galant, reference, catalog]
difficulty: intermediate
---

# Schema Catalog

## Opening Schemas

### Meyer

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| Melody | do | ti | fa | mi |
| Bass | do | re | ti | do |
| RN | I | V4/3 | V6/5 | I |
| Function | T | D | D | T |

**Character**: Classic opening, descending then ascending melody.

### Jupiter

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| Melody | do | re | fa | mi |
| Bass | do | ti | ti | do |
| RN | I | V6/5 | V6/5 | I |
| Function | T | D | D | T |

**Variant** (root position):

| Bass | do | sol | sol | do |
| RN | I | V7 | V7 | I |

**Character**: Named for Mozart's Jupiter Symphony, stepwise ascent.

### Aprile

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| Melody | do | ti | re | do |
| Bass | do | re | ti | do |
| RN | I | V4/3 | V6/5 | I |
| Function | T | D | D | T |

**Character**: Neighbor motion, circular.

### Pastorella

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| Melody | mi | re | fa | mi |
| Bass | do | sol | sol | do |
| RN | I | V7 | V7 | I |
| Function | T | D | D | T |

**Character**: Pastoral, gentle, begins on mediant.

### Do-Re-Mi

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| Melody | do | re | re | mi |
| Bass | do | ti | ti | do |
| RN | I | V6/5 | V6/5 | I |
| Function | T | D | D | T |

**Character**: Simple ascending scale, very common.

### Sol-Fa-Mi

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| Melody | sol | fa | fa | mi |
| Bass | do | re | ti | do |
| RN | I | II | V | I |
| Function | T | S | D | T |

**Character**: Includes subdominant, fuller harmonic cycle.

### Romanesca

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| Melody | sol | sol | do | sol |
| Bass | do | ti | la | mi |
| RN | I | V6 | VI | I6 |
| Function | T | D | Tx | T |

**Character**: Descending bass by thirds, slow movements.

## Continuation Schemas

### Prinner

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| Melody | la | sol | fa | mi |
| Bass | fa | mi | re | do |
| RN | IV | I6 | VII6 | I |
| Function | S | T | D | T |

**Extended with cadence**:

| Stage | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| Melody | la | sol | fa | fa | mi |
| Bass | fa | mi | re | sol | do |
| RN | IV | I6 | VII6 | V | I |

**Character**: Parallel 10ths, descending, closing gesture.

### Modulating Prinner

| Stage | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|
| Melody | mi | re | do | ti |
| Bass | do | ti | la | sol |
| RN | I | V6 | VII6/V | V |

**Character**: Modulates to dominant, common in transitions.

### Passo Indietro

| Stage | 1 | 2 |
|-------|---|---|
| Melody | la | sol |
| Bass | fa | mi |
| RN | IV | I6 |
| Function | S | T |

**Character**: First two stages of Prinner, makes room for cadence.

### Fonte

**Structure**: Model (2 bars) + Sequence (2 bars, step lower)

| Unit | Model | Sequence |
|------|-------|----------|
| Harmony | D7/ii → ii | D7 → I |
| Key area | Supertonic | Tonic |

**Character**: Descending sequence, returns from V to I.

### Monte

**Structure**: Model + Sequence (step higher)

| Unit | Model | Sequence |
|------|-------|----------|
| Harmony | D7/IV → IV | D7/V → V |
| Key area | Subdominant | Dominant |

**Character**: Ascending sequence, builds toward dominant.

### Ponte

**Structure**: Prolonged dominant harmony

**Function**: Standing on V, creates delay, prepares recapitulation.

**Character**: Tension without motion.

## Cadential Schemas

### Simple PAC

| Stage | 1 | 2 |
|-------|---|---|
| Melody | re | do |
| Bass | sol | do |
| RN | V | I |
| Function | D | T |

### Simple IAC

| Stage | 1 | 2 |
|-------|---|---|
| Melody | fa | mi |
| Bass | sol | do |
| RN | V7 | I |
| Function | D | T |

### Compound PAC

| Stage | 1 | 2 | 3 |
|-------|---|---|---|
| Melody | mi | re | do |
| Bass | sol | sol | do |
| RN | Cad6/4 | V | I |
| Function | D | D | T |

### Compound IAC

| Stage | 1 | 2 | 3 |
|-------|---|---|---|
| Melody | sol | fa | mi |
| Bass | sol | sol | do |
| RN | Cad6/4 | V7 | I |
| Function | D | D | T |

### Compound HC

| Stage | 1 | 2 |
|-------|---|---|
| Melody | mi | re |
| Bass | sol | sol |
| RN | Cad6/4 | V |
| Function | D | D |

### fa-fi-sol HC

| Stage | 1 | 2 | 3 |
|-------|---|---|---|
| Melody | re | do | ti |
| Bass | fa | fi | sol |
| RN | II6 | V6/5/V | V |
| Function | S | S | D |

**Character**: Chromatic approach to HC, common in transitions.

## Schema Usage Map

| Formal Position | Typical Schemas |
|-----------------|-----------------|
| Presentation phrase | Meyer, Jupiter, Do-Re-Mi |
| Continuation phrase | Prinner, Passo Indietro |
| Contrasting middle | Fonte, Monte, Ponte |
| Before cadence | Passo Indietro |
| Cadence | Compound PAC, Simple PAC |
| Transition ending | fa-fi-sol HC |

## Schema Combinations

### Sentence Template

```
mm. 1-4: Opening schema (presentation)
mm. 5-8: Prinner → cadence (continuation)
```

### Period Template

```
mm. 1-4: Opening schema → HC (antecedent)
mm. 5-8: Opening schema → PAC (consequent)
```

### Minuet Template

```
A:  Opening schema → V:PAC
B:  Fonte/Monte → I:HC
A': Opening schema variant → I:PAC
```

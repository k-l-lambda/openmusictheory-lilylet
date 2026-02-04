---
title: Modulation
category: chromatic-harmony
tags: [modulation, key-change, pivot-chord, tonicization]
related: [applied-chords, cadences]
difficulty: advanced
---

# Modulation

## Summary

Modulation is a change of key confirmed by a cadence in the new key. Unlike tonicization (brief emphasis without cadence), modulation establishes a new tonic through cadential confirmation (PAC, IAC, or HC).

## Core Concept

### Tonicization vs. Modulation

| Aspect | Tonicization | Modulation |
|--------|--------------|------------|
| Duration | Brief | Extended |
| Cadence in new key | No | Yes (required) |
| Perception | Emphasis | New key |
| Notation | V/x, vii°/x | New key: chord |

**Key distinction:** Only a cadence can confirm a new key.

## Modulation Types

### 1. Direct/Phrase Modulation

**Definition:** Old-key chord followed directly by new-key chord with no transitional overlap.

**Common location:** Phrase boundaries — old tonic ends one phrase, new tonic begins next.

**Example:** Exposition repeat points in sonatas and minuets.

**Notation:**
```
G: I  ii  V  I  | Am: I  IV  V  I
G: T1 S2  D5 T1 | Am: T1 S4  D5 T1
```

### 2. Step-Up/Pump-Up Modulation

**Definition:** Direct modulation by whole or half step, typically near song's end.

**Context:** Pop music technique for final-chorus energy boost.

**Direction:** Usually up (hence "pump-up")

**Example:** Ramones — "I Wanna Be Sedated" (at 1:10)

### 3. Truck-Driver Modulation

**Definition:** Direct modulation from old tonic to new dominant, then to new tonic.

**Name origin:** Walter Everett's metaphor — brief "neutral" (V) before shifting to higher gear (new I).

**Pattern:**
```
Old key: I → New key: V → New key: I
         ↓         ↓           ↓
      (gear)  (neutral)  (higher gear)
```

**Example:** Billy Ocean — "Get Outta My Dreams" (at 3:55)

### 4. Pivot-Chord Modulation

**Definition:** Uses a chord diatonic to both old and new keys as a transition point.

**Most common type** in common-practice tonal music.

**Smoothest when:** Pivot chord has same function in both keys (often S).

## Pivot-Chord Details

### Requirements

1. Chord must be **diatonic to both keys**
2. Must NOT be an applied chord in the old key
3. In minor: both la/le and ti/te are considered "native"

### What is NOT a Pivot Chord

If a chord functions as V in the new key but is an applied chord (V/x) in the old key, it's effecting a **direct modulation**, not a pivot-chord modulation.

### Notation

```
Old key:    I    IV   V    vi     I   IV   V   I
                          ↓
                     [pivot]
                          ↓
New key:              IV         I   IV   V   I
```

Bracket notation shows the pivot chord analyzed in both keys simultaneously.

### Common Pivot Relationships

| Old Key | New Key | Common Pivots |
|---------|---------|---------------|
| I (major) | V | Old: I=New: IV, Old: vi=New: ii |
| I (major) | vi | Old: I=New: III, Old: IV=New: VI |
| i (minor) | III | Old: i=New: vi, Old: iv=New: ii |
| i (minor) | v | Old: i=New: iv, Old: III=New: VI |

## Functional Analysis

### Pivot-Chord Functional Bass

```
        Old key:  T1   S4   D5   T1
                            ↓
                        [pivot]
                            ↓
        New key:            S4   D5   T1
```

Two-layer analysis overlaps on the pivot chord.

## Compositional Application

### Choosing Modulation Type

| Type | Best For | Character |
|------|----------|-----------|
| Direct/Phrase | Clear sectional breaks | Abrupt, dramatic |
| Step-up | Pop final choruses | Energizing |
| Truck-driver | Pop climaxes | Brief pause, then lift |
| Pivot-chord | Smooth transitions | Seamless, sophisticated |

### Common Destinations

| From | Common Modulation Targets |
|------|--------------------------|
| Major (I) | V (dominant), vi (relative minor), IV |
| Minor (i) | III (relative major), v (minor dominant), iv |

## Constraints

1. **Cadence required** — No cadence = tonicization, not modulation
2. **Pivot must be diatonic to both keys** — Applied chords don't count
3. **Functional coherence** — Smoothest pivots maintain function
4. **Confirm new key** — At least one clear cadence (PAC, IAC, or HC)

## Related Topics

- [Applied Chords](applied-chords.md) - Tonicization technique
- [Cadences](../01-harmonic-functions/cadences.md) - Cadence types
- [Pop-Rock Progressions](../03-progressions/pop-rock-progressions.md) - Pop modulation context

---
title: Modulation
category: chromatic-harmony
tags: [modulation, key-change, pivot-chord, tonicization]
related: [applied-chords, cadences, chromatic-sequences, neo-riemannian-and-mediants]
difficulty: advanced
examples: [02-pivot-chord-modulation]
---

# Modulation

## Summary

Modulation is a change of key confirmed by a cadence in the new key. Unlike tonicization (brief emphasis without cadence), modulation establishes a new tonic through cadential confirmation (typically PAC or IAC).

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

1. Chord should be **diatonic to both keys**
2. Typically not heard as an applied chord in the old key
3. In minor: both la/le and ti/te are considered "native"

### Pivot vs. Direct Modulation

If a chord is clearly heard as V/x (applied chord) in the old key before becoming V in the new key, it's typically analyzed as a **direct modulation**. However, the distinction can be perceptual/contextual.

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

## Chromatic Modulation to Distant Keys (OMT 2e)

Source: `v2/05-chromaticism/06-reinterpreting-augmented-sixth-chords.md` (chapter title "Chromatic Modulation"). Use these techniques when the target key is more than one accidental away.

| Technique | Mechanism | Typical distance | Rule |
|-----------|-----------|------------------|------|
| **Mixture pivot** | a mixture chord in the old key is diatonic in the new key, or the reverse | flat side (e.g. C → E♭, A♭); "diatonic-as-mixture" goes sharpwards (e.g. C → A) | A major iv (D minor) = F major vi (v2 Ex. 3); A♭ major vi (F minor) = C major iv (v2 Ex. 6) |
| **Common-tone (pivot-pitch) modulation** | one sustained or repeated pitch is reinterpreted (often respelled) as a member of the new tonic | chromatic mediants: C ↔ A♭ (common tone C), C ↔ E♭ (G), C ↔ A (E), C ↔ E (E) | the held tone carries the ear across; confirm the new key by cadence (Schumann "Widmung": A♭ = G♯, the 3rd of E) |
| **V7 → Ger+6** | respell the 7th of a V7 as an augmented 6th (e.g. F → E♯ over G) and resolve outward to the new key's sol, usually via cad. 6/4 | **down a half step** (V7 of C = Ger+6 of B) | the 7th now resolves *up* by half step; bass falls by half step |
| **Ger+6 → V7** | respell fi as the 7th (e.g. G♯ → A♭ over B♭) and resolve as V7 | **up a half step** (Ger+6 of D = V7 of E♭) | works with any dominant 7th, including applied (Ger+6 → V7/IV) |
| **dim7 respelling** | any member of a °7 can be the leading tone | 4 possible tonics, a minor 3rd apart (B–D–F–A♭ → C, E♭, F♯/G♭, A), each major or minor | spell the °7 for the key it actually resolves to (Beethoven Op. 13: F♯–A–C–E♭ → G minor, then F♯–A–C–D♯ → E minor) |

- A V7 and a Ger+6 sound the same; only the resolution distinguishes them. As V7, the 7th resolves *down* by step. As +6, the augmented 6th resolves *outward* to sol.
- An It+6 (no fifth above the bass) respells as an incomplete V7 in the same way.

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
2. **Pivot should be diatonic to both keys** — Applied chords typically indicate direct modulation
3. **Functional coherence** — Smoothest pivots maintain function
4. **Confirm new key** — At least one cadence affirming new tonic (PAC or IAC preferred)

## Sources (OMT 2e)

| v2 chapter | Source URL | Used for |
|------------|------------|----------|
| `v2/05-chromaticism/06-reinterpreting-augmented-sixth-chords.md` | https://viva.pressbooks.pub/openmusictheory/chapter/reinterpreting-augmented-sixth-chords/ | chromatic modulation table |

## Score Examples

Transcribed in lilylet (see the [primer](../examples/lilylet-primer.md)); each example says what to look for, bar by bar.

| Example | What it shows |
|---------|---------------|
| [Pivot-chord modulation F → C](../examples/02-chromatic-harmony/pivot-chord-modulation.md) | two-key analysis: Tx6 in F = S2 in C, then D5 T1 in C |

## Related Topics

- [Applied Chords](applied-chords.md) - Tonicization technique
- [Cadences](../01-harmonic-functions/cadences.md) - Cadence types
- [Pop-Rock Progressions](../03-progressions/pop-rock-progressions.md) - Pop modulation context
- [Chromatic Sequences](chromatic-sequences.md)
- [Neo-Riemannian Transformations and Mediants](neo-riemannian-and-mediants.md)

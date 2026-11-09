---
title: Binary and Ternary Forms
category: large-forms
tags: [binary, ternary, rounded-binary, minuet, form]
related: [sentence, period, sonata-form]
difficulty: intermediate
examples: [06-k305-small-binary, 06-k284-small-ternary, 05-haydn27fonte]
---

# Binary and Ternary Forms

## Summary

Binary and ternary forms are two- and three-part structures used as standalone themes (in variations, rondos, minuets) or as building blocks for larger forms. The key distinction is whether opening material returns after the middle section.

## Small Binary

Two-part form without recapitulation of first-part material.

Score example: [Mozart, K. 305, II](../examples/06-large-forms/k305-small-binary.md).

### Structure

```
||: A :||: B :||
```

| Section | Function | Ending |
|---------|----------|--------|
| First part (A) | Establish theme | I:PAC, I:HC, or V:PAC |
| Second part (B) | Contrast + close | I:PAC |

### First Part Characteristics

- Usually tight-knit: period, sentence, or hybrid
- Ends with cadential articulation
- May modulate to dominant (V:PAC) or stay in tonic (I:HC)
- Often shorter than small ternary first parts

### Second Part Characteristics

- Often begins like a contrasting middle
- Contains continuation, consequent, or cadential material
- Does NOT return to first-part material (not a recapitulation)
- Always closes with I:PAC

### Comparison to Small Ternary

| Feature | Small Binary | Small Ternary |
|---------|--------------|---------------|
| Return of A? | No | Yes |
| B section | Continuation-like | Contrasting middle |
| Motivic contrast | Low | Higher |

## Small Ternary

Three-part form with exposition, contrasting middle, and recapitulation.

Score example: [Mozart, K. 284, III, Tema](../examples/06-large-forms/k284-small-ternary.md).

### Structure

```
||: A :||: B - A' :||
```

| Section | Function | Ending |
|---------|----------|--------|
| Exposition (A) | Establish theme | I:PAC or V:PAC |
| Contrasting middle (B) | Provide contrast | I:HC or "standing on V" |
| Recapitulation (A') | Return and close | I:PAC |

### Exposition (A)

- Tight-knit theme type (sentence, period, hybrid)
- Ends with I:PAC or modulates to V:PAC (major) / III:PAC (minor)
- Establishes the main thematic material

### Contrasting Middle (B)

- "Loose" region providing melodic and harmonic contrast
- Not usually a standard theme type—unpredictability is typical
- Common techniques: fragmentation, sequence, modulation
- Emphasizes dominant harmony
- Ends with I:HC, V:PAC, or prolonged dominant ("standing on the dominant")
- Prepares return to tonic

### Recapitulation (A')

- Returns material from exposition
- May be exact copy or altered
- If exposition modulated, recapitulation must be recomposed to end in tonic
- Always closes with I:PAC

## Rounded Binary

In Caplin's terms (V1), "rounded binary" describes a small ternary with repeat signs. OMT 2e treats rounded binary as a type of binary and keeps "ternary" for forms whose A and B never repeat together; see Conventions below.

```
||: A :||: B - A' :||
```

**Why "binary"?** The repeat signs create two reprises (parts).

**Why "rounded"?** The return of A material "rounds out" the form.

This is the most common type of small ternary in classical music.

## Conventions: Caplin (V1) vs. OMT 2e

The sections above use Caplin's theme-level categories (small binary / small ternary), as in V1. OMT 2e (`v2/04-form/06-binary-form.md`, `v2/04-form/07-ternary-form.md`) classifies by **repeat structure** instead, and the two systems name the same piece differently.

| Piece shape | Caplin / V1 | OMT 2e |
|-------------|-------------|--------|
| `\|\|: A :\|\|: B A′ :\|\|` (A returns *inside* the second reprise) | small ternary (= "rounded binary") | **rounded binary**. It is *not* ternary, because B and A′ repeat together. |
| `\|\|: A :\|\|: B :\|\|`, no return | small binary | **simple binary**, second reprise = B |
| `\|\|: A :\|\|: A′ :\|\|`, second reprise continues A's ideas without a "return" | small binary | **simple binary**, second reprise = A′ (e.g. Bach, Bourrée BWV 996) |
| A, B, A, each section separately closed and repeatable | (large) ternary | **ternary** |

**OMT 2e binary rules (06):**
- Two types only: **rounded** (the *beginning* of A returns in the home key in the middle of the second reprise; not all of A need return) and **simple** (no substantial return).
- **Balanced** is an *aspect* either type may have, not a third type: the tail (x) of the first reprise returns at the tail of the second, in the home key.
  - It needs a **crux** point, from which bar-for-bar mapping begins.
  - A rounded binary that repeats the whole first reprise verbatim is not "balanced", because there is no crux at the tail.
- 18th c.: an HC before A's return in rounded binary is common. 19th c.: the boundary may be elided.
- The first reprise ends with a PAC, IAC or HC. In the 19th c. it may end with a tonic prolongation instead.
- The second reprise ends with an authentic cadence in the home key, which is essentially obligatory. If a piece starts and ends in different keys, it has **progressive tonality**, not monotonality.

**OMT 2e ternary rules (07):**
- A may repeat immediately and B may repeat immediately, but **A and B never repeat together, and neither do B and A**. This is the test that separates ternary from rounded binary.
- Repeat signs are common but not required.
- **Compound** (composite) ternary: at least one section is itself a complete form, usually binary (minuet & trio, scherzo & trio). **Simple** ternary: no section is a complete form.
- B contrasts in key, mode, texture, meter, material, etc. Its length is roughly proportional to A.
  - Minuet/trio: A and B are similarly stable.
  - Aria: B is often less stable, because it starts and ends in different keys.
- Transitions, retransitions, prefixes and suffixes may join the sections.

## Contrasting Middle Techniques

The contrasting middle (B section) typically uses:

### Harmonic Techniques

| Technique | Description |
|-----------|-------------|
| Standing on V | Prolonged dominant, builds tension |
| Fonte sequence | Descending by step, returns to tonic |
| Monte sequence | Ascending by step, builds to dominant |
| HC arrival | Half cadence prepares recapitulation |

### Melodic Techniques

| Technique | Description |
|-----------|-------------|
| Fragmentation | Break down motives from A |
| Sequence | Model-copy patterns |
| New material | Contrasting melodic ideas |
| Motivic reference | Develop A material loosely |

## Formal Templates

### Simple Binary (16 bars)

```
A (mm. 1-8):  Period → I:PAC or V:PAC
B (mm. 9-16): Continuation → I:PAC
```

### Rounded Binary / Small Ternary (16-24 bars)

```
A (mm. 1-8):   Sentence → V:PAC
B (mm. 9-12):  Contrasting middle → I:HC
A' (mm. 13-16/20): Period/Sentence variant → I:PAC
```

### Minuet Form

```
||: A (8 bars) :||: B (4-8 bars) - A' (8 bars) :||
```

Typical plan:
- A: Period or sentence, ends V:PAC
- B: Fonte or Monte, ends I:HC
- A': Recomposed to end I:PAC

## Compositional Application

### Choosing Between Forms

| Choose | When |
|--------|------|
| Small binary | Short, simple theme; variation theme |
| Small ternary | Need contrast; dance movement theme |
| Rounded binary | Classic minuet structure |

### Key Relationships

| Mode | Exposition closes in | Recap closes in |
|------|---------------------|-----------------|
| Major | V (dominant) | I (tonic) |
| Minor | III (relative major) | i (tonic) |

### Contrasting Middle Goals

1. Move away from secondary key
2. Return to dominant of home key
3. Create anticipation for recapitulation

## Constraints

1. **Binary**: No return of A material in B section
2. **Ternary**: A material must return audibly in A'
3. **Recapitulation**: Must end in tonic (I:PAC)
4. **Contrasting middle**: Must end on or prepare dominant

## Sources (OMT 2e)

| v2 chapter | Source URL | Used for |
|------------|------------|----------|
| `v2/04-form/06-binary-form.md` | https://viva.pressbooks.pub/openmusictheory/chapter/binary-form/ | rounded/simple, balanced, progressive tonality |
| `v2/04-form/07-ternary-form.md` | https://viva.pressbooks.pub/openmusictheory/chapter/ternary-form/ | repeat rule, compound ternary |

## Score Examples

| Example | What it shows |
|---------|---------------|
| [Small binary: Mozart, K. 305, II](../examples/06-large-forms/k305-small-binary.md) | modulating period (V:PAC), contrasting middle standing on V, continuation-like close (I:PAC) |
| [Small ternary: Mozart, K. 284, III, Tema](../examples/06-large-forms/k284-small-ternary.md) | period → Fonte + descending scale (I:HC) → recapitulation altered to I:PAC; rounded binary |
| [Fonte: Haydn, Hob. XVI:27, III](../examples/05-formal-schemas/haydn27fonte.md) | the Fonte that typically opens a small ternary's contrasting middle |

## Related Topics

- [Sentence](../04-phrase-structure/sentence.md) - Common A section type
- [Period](../04-phrase-structure/period.md) - Common A section type
- [Continuation Schemas](../05-formal-schemas/continuation-schemas.md) - Fonte, Monte for B section
- [Sonata Form](sonata-form.md) - Larger application of same principles

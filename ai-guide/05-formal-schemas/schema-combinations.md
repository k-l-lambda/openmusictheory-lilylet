---
title: Schema Combinations
category: formal-schemas
tags: [schema, galant, composition, phrase-building]
related: [opening-schemas, continuation-schemas, cadential-schemas, sentence, period]
difficulty: intermediate
examples: [05-haydnxvi27, 05-ve64, 05-ve63, 05-d4i, 05-paralleltenths, 05-champagne, 05-pinkchampagne, 05-deceptive, 05-deceptive7, 05-d5problem, 05-t1dropfifth, 05-d5dropfifth, 05-s4problem, 05-s4dropthird]
---

# Schema Combinations

## Summary

Schemas are building blocks that combine to create complete phrases and themes. Understanding typical combinations enables efficient phrase construction and analysis.

## Basic Combination Principle

```
OPENING SCHEMA → CONTINUATION SCHEMA → CADENTIAL SCHEMA
```

The three schema types correspond to phrase functions:
- **Opening**: Establishes key, presents material (presentation function)
- **Continuation**: Develops, sequences, moves away (continuation function)
- **Cadential**: Closes, confirms key (cadential function)

## Sentence Structure Combinations

### Standard Sentence (8 bars)

```
Bars 1-4 (Presentation): OPENING SCHEMA
Bars 5-8 (Continuation):  CONTINUATION SCHEMA → CADENCE
```

**Example combinations:**

| Presentation | Continuation | Cadence | Character |
|--------------|--------------|---------|-----------|
| Meyer | Prinner | Compound PAC | Classic, balanced |
| Jupiter | Prinner | Compound PAC | Ascending then descending |
| Do-Re-Mi | Prinner | Simple PAC | Simple, clear |
| Pastorella | Prinner | Compound IAC | Gentle, pastoral |
| Romanesca | Passo Indietro | Compound PAC | Slow movement |

### Modulating Sentence

```
Bars 1-4 (Presentation): OPENING SCHEMA (in I)
Bars 5-8 (Continuation):  MODULATING PRINNER → CADENCE (in V)
```

## Period Structure Combinations

### Standard Period (8 bars)

```
Bars 1-4 (Antecedent): OPENING SCHEMA → HC or IAC
Bars 5-8 (Consequent): OPENING SCHEMA → PAC
```

**Example:**

| Phrase | Schema | Cadence |
|--------|--------|---------|
| Antecedent | Meyer | HC |
| Consequent | Meyer | Compound PAC |

### Parallel vs. Contrasting

- **Parallel period**: Same opening schema both phrases
- **Contrasting period**: Different schemas (e.g., Meyer → Sol-Fa-Mi)

## Minuet/Ternary Combinations

### Exposition (A section)

```
OPENING SCHEMA → CADENCE (often in V for major key)
```

### Contrasting Middle (B section)

```
FONTE or MONTE → HALF CADENCE (in home key)
```

or

```
PONTE → DOMINANT ARRIVAL
```

### Recapitulation (A' section)

```
OPENING SCHEMA → PAC (in home key)
```

### Complete Minuet Template

```
||: A :||: B - A' :||

A:   Meyer → PAC (in V)
B:   Fonte → HC (in I)
A':  Meyer → PAC (in I)
```

## Schema Flow Chart

### After Opening Schema

| Opening Ends On | Good Continuations |
|-----------------|-------------------|
| do (tonic) | Prinner, Passo Indietro, any cadence prep |
| mi (mediant) | Prinner, continuation to cadence |
| sol (dominant) | Direct cadence, Prinner |

### After Fonte/Monte

| Schema | Typical Follow-up |
|--------|-------------------|
| Fonte | Half cadence, then recapitulation |
| Monte | Dominant arrival, then recapitulation |
| Ponte | Direct to recapitulation |

## Combining Multiple Schemas

### Extended Phrase (16+ bars)

```
Opening → Continuation → Opening′ → Cadence
```

**Example:**
- Bars 1-4: Meyer
- Bars 5-8: Prinner (no cadence yet)
- Bars 9-12: Meyer variant
- Bars 13-16: Extended cadence

### Sequential Development

```
Opening → Fonte → Monte → Cadence
```

Rare but possible: combine descending and ascending sequences.

## Schema Selection by Character

| Desired Character | Recommended Combination |
|-------------------|------------------------|
| Noble, ceremonial | Jupiter → Prinner → Compound PAC |
| Simple, folk-like | Do-Re-Mi → Prinner → Simple PAC |
| Pastoral, gentle | Pastorella → Prinner → IAC |
| Dramatic | Meyer → Fonte → Strong PAC |
| Extended tension | Any opening → Ponte → Delayed PAC |

## Compositional Application

### Building a Theme Step-by-Step

1. **Choose character** → Select opening schema
2. **Determine phrase type** → Sentence or period
3. **Plan modulation?** → Use modulating Prinner if yes
4. **Select cadence strength** → Match formal position

### Quick Reference: 8-Bar Templates

**Template 1: Standard Sentence**
```
mm. 1-2: Opening schema (stages 1-2)
mm. 3-4: Opening schema (stages 3-4)
mm. 5-6: Prinner (stages 1-2)
mm. 7-8: Prinner (stages 3-4) + cadence
```

**Template 2: Parallel Period**
```
mm. 1-4: Opening schema → HC
mm. 5-8: Opening schema → PAC
```

**Template 3: Modulating Sentence**
```
mm. 1-4: Opening schema (tonic)
mm. 5-8: Modulating Prinner → PAC in V
```

## Constraints

1. **Opening schemas**: Use at beginnings, not mid-phrase
2. **Prinner**: Response to opening, not opener itself
3. **Fonte/Monte**: Reserved for contrasting middle sections
4. **Cadential schemas**: End phrases, not begin them
5. **Schema rate**: Typically 1 stage per beat or per bar

## Schema Compatibility Matrix

| Opening | Best Continuations |
|---------|-------------------|
| Meyer | Prinner, Fonte |
| Jupiter | Prinner, Modulating Prinner |
| Aprile | Prinner |
| Do-Re-Mi | Prinner, Direct cadence |
| Sol-Fa-Mi | Direct cadence, Prinner |
| Romanesca | Prinner, Compound cadence |

| Continuation | Best Cadences |
|--------------|---------------|
| Prinner | Compound PAC, Simple PAC |
| Mod. Prinner | PAC in new key |
| Passo Indietro | Any cadence |
| Fonte | HC, then Compound PAC |
| Monte | Dominant arrival |

## Sources

Based on Robert Gjerdingen's galant schemata as presented in OMT:

| Source File | Content |
|-------------|---------|
| `schemataSummary.md` | Schema overview and combinations |
| `KBVLschemata.md` | Keyboard voice-leading schemata |
| `schemata-improv.md` | Schema improvisation and combination |

**Primary theoretical reference**: Gjerdingen, Robert. *Music in the Galant Style*. Oxford University Press, 2007.

## Score Examples

| Example | What it shows |
|---------|---------------|
| [Meyer + modulating Passo Indietro: Haydn, Hob. XVI:27, III](../examples/05-formal-schemas/haydnxvi27.md) | a complete sentence built from an opening schema, a continuation schema and a cadence |
| [Voice exchange with passing V6/4 (keyboard voice-leading schema)](../examples/05-formal-schemas/ve64.md) | outer voices exchange do/mi over T(1 D2p 3) |
| [Voice exchange with passing VII6 (keyboard voice-leading schema)](../examples/05-formal-schemas/ve63.md) | same exchange; the D2's fa rises, unresolved |
| [Voice exchange with D4 substitute (keyboard voice-leading schema)](../examples/05-formal-schemas/d4i.md) | V4/2 in the bass, upper voices as with V6/4 |
| [Parallel tenths (keyboard voice-leading schema)](../examples/05-formal-schemas/paralleltenths.md) | do–re–mi bass against mi–fa–sol over V4/3 |
| [Champagne progression (keyboard voice-leading schema)](../examples/05-formal-schemas/champagne.md) | T1 S6 T3 under mi–fa–sol, bass doubled in S6 |
| [Pink champagne (keyboard voice-leading schema)](../examples/05-formal-schemas/pinkchampagne.md) | champagne with III for T3 |
| [Deceptive resolution (keyboard voice-leading schema)](../examples/05-formal-schemas/deceptive.md) | V–VI with ti→do, do doubled in VI |
| [Deceptive resolution of V7 (keyboard voice-leading schema)](../examples/05-formal-schemas/deceptive7.md) | the same with the seventh resolving down |
| [V7–I with ti–do: the problem (keyboard voice-leading schema)](../examples/05-formal-schemas/d5problem.md) | complete V7 and I leave the seventh unresolved |
| [Fix 1: incomplete I (keyboard voice-leading schema)](../examples/05-formal-schemas/t1dropfifth.md) | no fifth in I, tripled root |
| [Fix 2: incomplete V7 (keyboard voice-leading schema)](../examples/05-formal-schemas/d5dropfifth.md) | no fifth in V7, doubled root (preferred) |
| [S4(7)–D5(7): the problem (keyboard voice-leading schema)](../examples/05-formal-schemas/s4problem.md) | the D5 seventh can't be prepared |
| [Fix: S4 without la (keyboard voice-leading schema)](../examples/05-formal-schemas/s4dropthird.md) | doubled bass prepares the D5 seventh |

## Related Topics

- [Opening Schemas](opening-schemas.md) - Meyer, Jupiter, Aprile
- [Continuation Schemas](continuation-schemas.md) - Prinner, Fonte, Monte
- [Cadential Schemas](cadential-schemas.md) - PAC, IAC, HC
- [Sentence](../04-phrase-structure/sentence.md) - 8-bar sentence form
- [Period](../04-phrase-structure/period.md) - Antecedent-consequent

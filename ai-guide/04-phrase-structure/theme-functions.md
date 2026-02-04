---
title: Theme Functions
category: phrase-structure
tags: [presentation, antecedent, continuation, cadential, consequent, theme-types]
related: [sentence, period, hybrid-themes]
difficulty: intermediate
---

# Theme Functions

## Summary

Theme functions describe the role that different parts of a theme play in its formal organization. Based on William Caplin's *Classical Form*, these functions categorize thematic material as initiating, medial, or closing.

## Function Categories

```
Initiating → Medial → Closing
```

| Category | Functions | Position |
|----------|-----------|----------|
| Initiating | Presentation, Antecedent | Beginning |
| Medial | Continuation | Middle |
| Closing | Cadential, Consequent | End |

## Initiating Functions

### Presentation

**Definition**: Establishes primary melodic material and tonality at the beginning of a theme.

| Aspect | Description |
|--------|-------------|
| Position | Beginning of theme/phrase |
| Melodic content | Basic idea + repetition (often varied) |
| Harmonic content | Tonic prolongation |
| Typical length | 4 bars (2+2) |

**Characteristics**:
- Statement of basic idea (BI)
- Repetition of BI (exact, varied, or sequential)
- Establishes tonic through prolongation
- Does NOT end with a cadence

**Found in**: Sentence (beginning)

### Antecedent

**Definition**: Presents basic idea followed by contrasting idea, ending with weak cadence.

| Aspect | Description |
|--------|-------------|
| Position | Beginning of theme/phrase |
| Melodic content | Basic idea + contrasting idea |
| Harmonic content | Moves toward weak cadence |
| Typical length | 4 bars (2+2) |

**Characteristics**:
- Statement of basic idea (BI)
- Contrasting idea (CI) follows
- Ends with weak cadence (HC or IAC)
- Creates expectation for consequent

**Found in**: Period (first half)

## Medial Functions

### Continuation

**Definition**: Breaks down primary melodic material while accelerating toward cadence.

| Aspect | Description |
|--------|-------------|
| Position | Middle of theme/phrase |
| Melodic content | Fragmentation, liquidation |
| Harmonic content | Harmonic acceleration |
| Typical length | 2-4 bars |

**Characteristics**:

| Technique | Description |
|-----------|-------------|
| Fragmentation | Breaking melodic units into smaller chunks (4→2→1 bars) |
| Liquidation | Replacing characteristic material with conventional patterns |
| Sequential repetition | Repeating material at different pitch levels |
| Melodic acceleration | Shorter note values (quarter→eighth→sixteenth) |
| Harmonic acceleration | More frequent chord changes |

**Not all techniques required**: At least some should be present.

**Found in**: Sentence (middle), Hybrid themes

## Closing Functions

### Cadential

**Definition**: Brings thematic unit to harmonic close through cadential progression.

| Aspect | Description |
|--------|-------------|
| Position | End of theme/phrase |
| Melodic content | Conventional descending patterns |
| Harmonic content | Cadential progression |
| Typical length | 2-4 bars |

**Cadential Progressions**:

| Cadence Type | Progression |
|--------------|-------------|
| Half cadence | T (S) → D5 |
| Authentic | T (S) → D5 T1 |

**Requirements**:
- Begins with last chord of tonic prolongation
- Ends with cadential arrival (PAC, IAC, or HC)
- D5 = V or V7 (always)
- T1 = I (for authentic cadences)

**Found in**: Sentence (end), after continuation

### Consequent

**Definition**: Responds to antecedent with basic idea return and strong cadential close.

| Aspect | Description |
|--------|-------------|
| Position | End of period structure |
| Melodic content | BI return + CI leading to strong cadence |
| Harmonic content | Moves toward PAC |
| Typical length | 4 bars (2+2) |

**Characteristics**:
- Returns basic idea (often varied)
- Contrasting idea leads to strong cadence
- Typically ends with PAC
- Provides closure to antecedent's question

**Found in**: Period (second half)

## Function Progressions by Theme Type

### Sentence

```
Presentation (4 bars) → Continuation (2 bars) → Cadential (2 bars)
     BI + BI'               fragmentation          T (S) D T
```

### Period

```
Antecedent (4 bars) → Consequent (4 bars)
  BI + CI → HC        BI + CI → PAC
```

### Hybrid Themes

| Type | First Half | Second Half |
|------|------------|-------------|
| Hybrid 1 | Antecedent | Continuation → Cadential |
| Hybrid 2 | Antecedent | Cadential |
| Hybrid 3 | Compound BI | Continuation → Cadential |
| Hybrid 4 | Compound BI | Consequent |

## Compound Basic Idea

**Definition**: A 4-bar unit that functions like a basic idea but is internally structured.

| Aspect | Description |
|--------|-------------|
| Length | 4 bars (vs. 2 bars for simple BI) |
| Internal structure | May have its own BI + CI |
| Ends with | No cadence (unlike antecedent) |
| Function | Initiating |

**Key distinction from antecedent**: Does NOT end with a cadence.

## Analysis Procedure

1. **Identify cadences**: Locate PAC, IAC, HC
2. **Map melodic material**: Find BI, CI, fragments
3. **Identify function zones**: Initiating → Medial → Closing
4. **Classify theme type**: Sentence, period, hybrid, or compound

## Constraints

1. **Every cadence requires function progression**: Initiating → (Medial) → Closing
2. **Presentation never cadences**: Only establishes tonic
3. **Antecedent requires weak cadence**: HC or IAC
4. **Consequent requires strong cadence**: Usually PAC
5. **Continuation accelerates**: Must show fragmentation, liquidation, or acceleration

## Sources

Based on William Caplin's *Classical Form: A Theory of Formal Functions for the Instrumental Music of Haydn, Mozart, and Beethoven* (OUP, 1998).

OMT source files:
- `themeFunctions.md` - Function definitions
- `classicalThemes.md` - Theme type overview

## Related Topics

- [Sentence](sentence.md) - Presentation + continuation + cadential
- [Period](period.md) - Antecedent + consequent
- [Hybrid Themes](hybrid-themes.md) - Function combinations
- [Compound Themes](compound-themes.md) - 16-bar expansions

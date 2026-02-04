---
title: Compound Themes
category: phrase-structure
tags: [compound-period, compound-sentence, 16-bar, theme-types]
related: [sentence, period, hybrid-themes, theme-functions]
difficulty: intermediate
---

# Compound Themes

## Summary

Compound themes (also called 16-bar themes) expand the basic 8-bar theme types to 16 bars by using complete themes as building blocks instead of simple phrases. The two main types are compound period and compound sentence.

## Basic Concept

| Simple Theme | Compound Theme |
|--------------|----------------|
| 8 bars | 16 bars |
| Two 4-bar phrases | Two 8-bar themes |
| Basic idea (2 bars) | Compound basic idea (4 bars) |

## Compound Period

**Definition**: A 16-bar period made of two themes (rather than two phrases), exhibiting large antecedent and large consequent function.

### Structure

```
Large Antecedent (8 bars) → Large Consequent (8 bars)
     Theme 1 → HC              Theme 2 → PAC
```

### Requirements

| Half | Function | Initiating Phrase | Concluding Phrase | Cadence |
|------|----------|-------------------|-------------------|---------|
| Large antecedent | Question | Presentation, Antecedent, or CBI | Continuation | Weak (HC) |
| Large consequent | Answer | Returns BI (varied) | Continuation → Cadential | Strong (PAC) |

### Types of Compound Period

#### Type 1: Sentence + Sentence

Both halves are sentences sharing the same basic idea.

```
Large Antecedent (Sentence):
  Presentation (4) → Continuation (4) → HC

Large Consequent (Sentence):
  Presentation (4) → Continuation (4) → PAC
```

| Feature | Large Antecedent | Large Consequent |
|---------|------------------|------------------|
| Opening | Presentation (BI + BI') | Presentation (BI varied) |
| Closing | Continuation → HC | Continuation → PAC |

**Example**: Mozart, K. 284, II, mm. 1-16

#### Type 2: Hybrid 1 + Hybrid 1

Both halves are Hybrid 1 (antecedent + continuation).

```
Large Antecedent (Hybrid 1):
  Antecedent (4) → Continuation (4) → HC

Large Consequent (Hybrid 1):
  Antecedent (4) → Continuation (4) → PAC
```

| Feature | Large Antecedent | Large Consequent |
|---------|------------------|------------------|
| Opening | Small antecedent (BI + CI) | Returns BI (varied) |
| Closing | Continuation → HC | Continuation → PAC |

**Example**: Mozart, K. 332, I, mm. 41-56

#### Type 3: Hybrid 3 + Hybrid 3

Both halves are Hybrid 3 (compound basic idea + continuation).

```
Large Antecedent (Hybrid 3):
  CBI (4) → Continuation (4) → HC

Large Consequent (Hybrid 3):
  CBI (4) → Continuation (4) → PAC
```

**Distinction from Type 2**: The initiating phrase does NOT cadence (CBI vs. antecedent).

## Compound Sentence

**Definition**: A 16-bar sentence that expands both presentation and continuation to 8 bars each.

### Structure

```
Expanded Presentation (8 bars) → Expanded Continuation (8 bars)
   CBI (4) + CBI' (4)              Continuation → Cadential → PAC
```

### Requirements

| Section | Length | Content |
|---------|--------|---------|
| Expanded presentation | 8 bars | Two compound basic ideas |
| Expanded continuation | 8 bars | Continuation + cadential functions |

### Compound Basic Idea in Presentation

Each 2-bar basic idea is replaced by a 4-bar compound basic idea:

| Simple Sentence | Compound Sentence |
|-----------------|-------------------|
| BI (2) + BI' (2) | CBI (4) + CBI' (4) |

### Continuation Variations

The 8-bar continuation has more flexibility than a simple sentence:

| Pattern | Description |
|---------|-------------|
| 4 + 4 | Standard (continuation + cadential) |
| 2 + 6 | Shortened continuation |
| 6 + 2 | Extended continuation |
| 4 + 4 (expanded) | With internal expansion/repetition |

**Example**: Mozart, K. 498, I, mm. 1-16 (with 4-bar repetition expansion)

## Comparison Table

| Feature | Compound Period | Compound Sentence |
|---------|-----------------|-------------------|
| Total length | 16 bars | 16 bars |
| Two halves | Large ant. + Large cons. | Expanded pres. + Expanded cont. |
| Opening function | Antecedent-like themes | Presentation (CBI + CBI) |
| Middle cadence | HC (required) | None |
| Final cadence | PAC | PAC |
| BI return | In large consequent | N/A (presentation function) |

## Identification Checklist

### Is it a Compound Period?

1. ✓ Total length approximately 16 bars?
2. ✓ Middle cadence (around bar 8)?
3. ✓ Basic idea returns after middle cadence?
4. ✓ Strong cadence (PAC) at end?

→ If all yes: **Compound Period**

### Is it a Compound Sentence?

1. ✓ Total length approximately 16 bars?
2. ✓ Opening 8 bars feel like expanded presentation?
3. ✓ Two 4-bar compound basic ideas?
4. ✓ NO cadence until the end?

→ If all yes: **Compound Sentence**

## Note on Bar Length

**Important**: Bar count is not definitive.

| Situation | Actual Length | Classification |
|-----------|---------------|----------------|
| Fast tempo | 16 bars | May be simple theme |
| Slow tempo | 8 bars | May be compound theme |

**Key criterion**: Does the theme begin with two basic ideas (simple) or two compound basic ideas (compound)?

## Compositional Application

### Writing a Compound Period (Sentence + Sentence)

1. Write first sentence (8 bars) ending with HC
2. Return basic idea (varied) to start second sentence
3. Write second sentence ending with PAC

### Writing a Compound Sentence

1. Write 4-bar compound basic idea
2. Repeat/vary CBI for bars 5-8
3. Write 8-bar continuation with fragmentation
4. End with strong PAC

## Constraints

1. **Compound period requires middle cadence**: HC around bar 8
2. **Compound sentence avoids middle cadence**: Presentation function throughout first half
3. **Large consequent returns BI**: Essential for period identity
4. **Both end with PAC**: Strong cadential closure required

## Sources

Based on William Caplin's *Classical Form* (OUP, 1998).

OMT source files:
- `compoundPeriod.md` - Compound period types and examples
- `compoundSentence.md` - Compound sentence structure

## Related Topics

- [Sentence](sentence.md) - Simple 8-bar form
- [Period](period.md) - Simple 8-bar form
- [Theme Functions](theme-functions.md) - Function definitions
- [Hybrid Themes](hybrid-themes.md) - Mixed function types
- [Phrase Expansion](phrase-expansion.md) - Expansion techniques

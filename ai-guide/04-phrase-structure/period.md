---
title: The Period
category: phrase-structure
tags: [period, antecedent, consequent, symmetry]
related: [sentence, hybrid-themes, cadences]
difficulty: intermediate
examples: [04-xv27-antecedent, 04-xv27-period, 04-k494-subphrase-expansion]
---

# The Period

## Summary

The period is an 8-measure thematic structure characterized by balance and symmetry: an antecedent phrase (weak cadence) answered by a consequent phrase (strong cadence), both beginning with the same basic idea.

## Structure

```
Period (8 bars)
├── Antecedent (mm. 1-4)
│   ├── Basic Idea (mm. 1-2)
│   └── Contrasting Idea (mm. 3-4) → Weak cadence
└── Consequent (mm. 5-8)
    ├── Basic Idea (mm. 5-6)
    └── Contrasting Idea (mm. 7-8) → Strong cadence
```

### Score Example: Haydn XV:27, III

[Haydn Hob. XV:27, III, mm. 1–8](../examples/04-phrase-structure/xv27-period.md): antecedent ending I:HC, consequent restating the BI exactly and ending with a PAC; the antecedent alone is [xv27-antecedent](../examples/04-phrase-structure/xv27-antecedent.md).

## Antecedent Phrase (mm. 1-4)

### Melodic Content
- **Basic Idea (BI)**: 2-bar melodic unit (same as sentence)
- **Contrasting Idea (CI)**: 2-bar NEW material
- CI leads to cadence (not repeated BI)

### Harmonic Content
- **mm. 1-2**: Tonic prolongation (under BI)
- **mm. 3-4**: Cadential progression → HC or IAC

### Weak Cadence Options

| Cadence | Progression | Strength |
|---------|-------------|----------|
| HC | T → D (ends on V) | Weakest |
| IAC | T → S → D → T (melody on 3/5) | Weak |

## Consequent Phrase (mm. 5-8)

### Melodic Content
- **Basic Idea**: Same as antecedent (exact or varied)
- **Contrasting Idea**: Similar to antecedent CI, modified for PAC

### Harmonic Content
- **mm. 5-6**: Tonic prolongation (under BI)
- **mm. 7-8**: Cadential progression → PAC

### Strong Cadence Requirement

The consequent **must** end with PAC:
- V → I in root position
- Melody arrives on scale degree 1 (do)

## Cadence Pairing

| Antecedent | Consequent | Effect |
|------------|------------|--------|
| HC | PAC | Maximum contrast |
| IAC | PAC | Moderate contrast |

## Compositional Application

### Building a Period

1. **Create Basic Idea** (2 bars)
   - Establishes main melodic material
   - Sets up expectation for return

2. **Create Contrasting Idea** (mm. 3-4)
   - New melodic content
   - Leads to weak cadence (HC or IAC)

3. **Return Basic Idea** (mm. 5-6)
   - Creates structural parallelism
   - Can be exact or slightly varied

4. **Modify Contrasting Idea** (mm. 7-8)
   - Adjust to create PAC
   - Often similar contour, different ending

### CI Modification Strategies

| Strategy | Description |
|----------|-------------|
| Same CI, different cadence | Change last few notes for PAC |
| Extended CI | Add beats/notes to reach PAC |
| New CI | Entirely new material for closure |

## Comparison with Sentence

| Feature | Period | Sentence |
|---------|--------|----------|
| Cadences | 2 (HC/IAC + PAC) | 1 (PAC/IAC/HC) |
| mm. 3-4 | Contrasting Idea | Basic Idea repeated |
| Character | Balanced, question-answer | Forward momentum |
| Parallelism | Beginning of each phrase | Within presentation |

## Constraints

1. **Antecedent must have weak cadence** (HC or IAC, never PAC)
2. **Consequent must have PAC**
3. **BI returns at m. 5** (defines period structure)
4. **Two distinct cadences** (not one extended)

## Variations

### Asymmetrical Period

- Consequent longer than antecedent
- Often 4 + 6 bars
- Extra material before PAC

### Parallel vs. Contrasting Period

The distinction depends on how the consequent **begins** (its basic idea), not on its contrasting idea:

| Type | Consequent begins with | Frequency |
|------|------------------------|-----------|
| Parallel | the antecedent's b.i. (same or similar) | the norm |
| Contrasting | a different b.i. (label b.i.¹ / b.i.²) | rare |

The consequent's c.i. almost always differs from the antecedent's anyway, because it must reach a stronger cadence. OMT 2e uses plain "period" for parallel periods and names the type only for the rare contrasting case (`v2/04-form/02-phrase-archetypes-unique-forms.md`, n. 3).

### Period vs. Repeated Phrase (OMT 2e)

| Feature | Period | Repeated phrase |
|---------|--------|-----------------|
| Second phrase | consequent | written-out (often varied) repeat of phrase 1 |
| Cadences | phrase 2's cadence is **stronger** than phrase 1's (usually HC → PAC) | **same** cadence both times (any type) |
| Repeat signs | — | a phrase between repeat signs is *not* a repeated phrase; the repeat must be written out |

Other v2 rules:
- The consequent is the same length as the antecedent or longer, rarely shorter.
- A modulating period usually changes key in the consequent.

## Sources (OMT 2e)

| v2 chapter | Source URL | Used for |
|------------|------------|----------|
| `v2/04-form/02-phrase-archetypes-unique-forms.md` | https://viva.pressbooks.pub/openmusictheory/chapter/phrase-archetypes-unique-forms/ | parallel/contrasting, repeated phrase |

## Score Examples

Scores are in lilylet; see [Reading lilylet score examples](../examples/lilylet-primer.md).

| Example | What it shows |
|---------|---------------|
| [Haydn Hob. XV:27, III, mm. 1–4](../examples/04-phrase-structure/xv27-antecedent.md) | antecedent: BI (Romanesca-like T prolongation) + CI → I:HC |
| [Haydn Hob. XV:27, III, mm. 1–8](../examples/04-phrase-structure/xv27-period.md) | period: antecedent (HC) + consequent with exact BI return (PAC) |
| [Mozart K. 494, mm. 1–12](../examples/04-phrase-structure/k494-subphrase-expansion.md) | sub-phrase expansion: BI grows to 3 bars by repeating m. 2 |

## Related Topics

- [Sentence](sentence.md) - Alternative structure
- [Hybrid Themes](hybrid-themes.md) - Mixed period/sentence *(planned)*
- [Cadences](../01-harmonic-functions/cadences.md) - Cadence types

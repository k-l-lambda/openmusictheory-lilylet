---
title: Terminology Glossary
category: appendix
tags: [glossary, terminology, definitions]
difficulty: foundational
---

# Terminology Glossary

## Harmonic Function

| Term | Definition |
|------|------------|
| **Tonic (T)** | Function of stability and rest; home key |
| **Subdominant (S)** | Function of mild tension; pre-dominant |
| **Dominant (D)** | Function of strong tension; leads to tonic |
| **Trigger** | Primary chord of a function (I, IV, V) |
| **Associate** | Secondary chord sharing function (vi, ii, viio) |
| **Prolongation** | Extending a function over multiple chords |

## Cadences

| Term | Definition |
|------|------------|
| **PAC** | Perfect Authentic Cadence: V-I, both root position, soprano on 1 |
| **IAC** | Imperfect Authentic Cadence: V-I with inversion or soprano not on 1 |
| **HC** | Half Cadence: phrase ends on V |
| **DC** | Deceptive Cadence: V-vi (or other non-tonic) |
| **PC** | Plagal Cadence: IV-I |

## Chromatic Harmony

| Term | Definition |
|------|------------|
| **Applied chord** | V or viio temporarily pointing to non-tonic chord |
| **Tonicization** | Brief emphasis of non-tonic chord (no cadence) |
| **Modulation** | Actual key change (confirmed by cadence) |
| **Modal mixture** | Borrowing chords from parallel major/minor |
| **Augmented sixth** | Chromatic chord built on b6, resolves to V |
| **Neapolitan** | bII chord, major triad on lowered 2 |

## Phrase Structure

| Term | Definition |
|------|------------|
| **Sentence** | Phrase type: presentation (2 BI) + continuation + cadence |
| **Period** | Phrase type: antecedent (weak cadence) + consequent (strong cadence) |
| **Basic idea (BI)** | Initial melodic-rhythmic unit of a phrase |
| **Contrasting idea (CI)** | New material responding to BI |
| **Presentation** | First half of sentence: BI + BI (or BI') |
| **Continuation** | Second half of sentence: fragmentation, liquidation |
| **Antecedent** | First phrase of period, ends with weak cadence |
| **Consequent** | Second phrase of period, ends with strong cadence |
| **Fragmentation** | Breaking BI into smaller units |
| **Liquidation** | Removing distinctive features, approaching cadence |

## Galant Schemata

| Term | Definition |
|------|------------|
| **Schema** | Named melodic-harmonic pattern |
| **Meyer** | Opening schema: do-ti-fa-mi over do-re-ti-do |
| **Jupiter** | Opening schema: do-re-fa-mi over do-ti-ti-do |
| **Prinner** | Continuation schema: la-sol-fa-mi over fa-mi-re-do |
| **Fonte** | Descending sequential schema in contrasting middle |
| **Monte** | Ascending sequential schema in contrasting middle |
| **Ponte** | Standing on dominant schema |

## Large Forms

| Term | Definition |
|------|------------|
| **Exposition** | First main section presenting themes |
| **Development** | Section of instability and thematic transformation |
| **Recapitulation** | Return of exposition material in tonic |
| **Contrasting middle** | B section in ternary form |
| **Refrain** | Recurring theme in rondo (always in tonic) |
| **Episode** | Contrasting section in rondo |

## Sonata Form

| Term | Definition |
|------|------------|
| **P (Primary theme)** | First thematic module in tonic |
| **TR (Transition)** | Module connecting P to S |
| **S (Subordinate theme)** | Theme in secondary key |
| **C (Closing)** | Post-cadential material after EEC |
| **MC (Medial caesura)** | Rhetorical break ending Part 1 |
| **EEC** | Essential Expositional Closure: first PAC in secondary key |
| **ESC** | Essential Sonata Closure: PAC in tonic in recap |
| **Crux** | Point in recap where alterations end |
| **Retransition** | Dominant preparation for recapitulation |

## Post-Tonal

| Term | Definition |
|------|------------|
| **Pitch class** | One of 12 chromatic notes regardless of octave |
| **Pitch-class set** | Unordered collection of pitch classes |
| **Interval class** | Distance between PCs (0-6) |
| **Prime form** | Most reduced set class representative |
| **Interval vector** | Six-digit summary of interval content |
| **Twelve-tone row** | Ordered arrangement of all 12 pitch classes |
| **Matrix** | 12×12 grid of all row forms |

## Voice-Leading

| Term | Definition |
|------|------------|
| **Parallel motion** | Voices move same direction, same interval |
| **Similar motion** | Voices move same direction, different interval |
| **Contrary motion** | Voices move opposite directions |
| **Oblique motion** | One voice moves, other stays |
| **Voice exchange** | Two voices swap pitches |
| **Tendency tone** | Scale degree requiring resolution |

## Functional Bass Symbols

| Symbol | Meaning |
|--------|---------|
| T1 | Tonic with bass on scale degree 1 |
| D5 | Dominant with bass on scale degree 5 |
| S4 | Subdominant with bass on scale degree 4 |
| Tx | Tonic-substitute function |
| [S+4] | Chromatically altered S (raised 4 in bass) |
| D7/V | Dominant 7th in the key of V |
| n | Neighbor (passing function) |
| p | Passing (prolongational motion) |

### Two-Layer Applied Chord Notation

```
[S+4]   ← Layer 1: function in home key
 D7/V   ← Layer 2: function in borrowed key
```

## Abbreviations

| Abbrev. | Meaning |
|---------|---------|
| T | Tonic function |
| S | Subdominant function |
| D | Dominant function |
| Tx | Tonic-substitute (vi function) |
| RN | Roman numeral |
| BI | Basic idea |
| CI | Contrasting idea |
| PAC | Perfect authentic cadence |
| IAC | Imperfect authentic cadence |
| HC | Half cadence |
| MC | Medial caesura |
| EEC | Essential expositional closure |
| ESC | Essential sonata closure |
| PC | Pitch class |
| IC | Interval class |
| P/I/R/RI | Prime/Inversion/Retrograde/Retrograde Inversion |

## Analysis Output Schema

Standardized fields for AI-generated harmonic analysis.

### Chord Analysis

```json
{
  "measure": 4,
  "beat": 1,
  "roman_numeral": "V7",
  "function": "D",
  "bass_scale_degree": 5,
  "inversion": "root",
  "key": "C",
  "mode": "major",
  "applied_to": null,
  "notes": ["G", "B", "D", "F"]
}
```

### Applied Chord Analysis

```json
{
  "roman_numeral": "V7/V",
  "function": "[S+4]",
  "home_key_function": "altered_subdominant",
  "target_key": "G",
  "target_function": "D7"
}
```

### Cadence Analysis

```json
{
  "type": "PAC",
  "measure": 8,
  "key": "G",
  "approach_chords": ["ii6", "V7"],
  "soprano_ending": 1,
  "bass_ending": 1,
  "strength": "strong"
}
```

### Phrase Analysis

```json
{
  "type": "sentence",
  "measures": [1, 8],
  "sections": [
    {"function": "presentation", "measures": [1, 4], "content": "BI + BI'"},
    {"function": "continuation", "measures": [5, 6]},
    {"function": "cadential", "measures": [7, 8]}
  ],
  "cadence": {"type": "PAC", "measure": 8}
}
```

### Form Analysis

```json
{
  "form": "sonata",
  "sections": [
    {
      "name": "exposition",
      "measures": [1, 60],
      "modules": [
        {"name": "P", "measures": [1, 16], "key": "I"},
        {"name": "TR", "measures": [17, 28], "type": "dissolving"},
        {"name": "MC", "measure": 28, "type": "V:HC"},
        {"name": "S", "measures": [29, 48], "key": "V"},
        {"name": "EEC", "measure": 48},
        {"name": "C", "measures": [49, 60], "key": "V"}
      ]
    }
  ]
}
```

### Key Encoding

| Field | Format | Examples |
|-------|--------|----------|
| key | Letter + accidental | "C", "F#", "Bb" |
| mode | "major" or "minor" | "major" |
| relative_key | Roman numeral | "V", "vi", "III" |

### Cadence Type Encoding

| Type | Code | Strength |
|------|------|----------|
| Perfect Authentic | PAC | strong |
| Imperfect Authentic | IAC | moderate |
| Half Cadence | HC | weak |
| Deceptive | DC | evaded |
| Plagal | PC | weak |

### Function Encoding

| Function | Code | Context |
|----------|------|---------|
| Tonic | T | home key |
| Subdominant | S | pre-dominant |
| Dominant | D | tension |
| Tonic-substitute | Tx | vi function |
| Chromatic | [X] | bracketed |
| Applied | D/x, S/x | two-layer |

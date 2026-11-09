---
title: Cadences
category: harmonic-functions
tags: [cadence, PAC, IAC, HC, phrase-ending, closure]
related: [prolongation, phrase-structure, species-counterpoint, rule-of-the-octave]
difficulty: foundational
examples: [01-cadential64, 01-cadential64-full, 01-cadential64-7th, 01-compound43, 01-compound43-full, 01-double-cadence, 05-d5dropfifth, 05-d5problem, 05-deceptive, 05-deceptive7, 05-t1dropfifth]
---

# Cadences

## Summary

A cadence is a point of harmonic arrival that punctuates phrase endings. Cadences are classified by their harmonic progression and melodic resolution.

## Primary Cadence Types

### Perfect Authentic Cadence (PAC)

| Element | Requirement |
|---------|-------------|
| Harmony | V → I (D5 → T1) |
| Bass | sol → do (5 → 1) |
| Melody | Ends on do (scale degree 1) |
| Strength | Strongest closure |

### Imperfect Authentic Cadence (IAC)

| Element | Requirement |
|---------|-------------|
| Harmony | V → I (D5 → T1) |
| Bass | sol → do (5 → 1) |
| Melody | Ends on mi or sol (3 or 5) |
| Strength | Moderate closure |

### Half Cadence (HC)

| Element | Requirement |
|---------|-------------|
| Harmony | Ends on V (D5) |
| Bass | Ends on sol (5) |
| Melody | Usually re, ti, or sol |
| Strength | Incomplete, expects continuation |
| Chord | V must be triad, root position |

## Cadence Elaborations

### Simple Cadence

Single dominant chord (triad or seventh) resolving to tonic.

```
V → I  or  V7 → I
```

### Compound Cadence (Cadential 6/4)

Dominant prolonged with suspension figure:

```
I6/4 → V → I
```

**Voice-leading requirements:**
- 6th above bass (do) resolves down to 5th (ti)
- 4th above bass (mi) resolves down to 3rd (re)
- Both act as suspensions: must resolve DOWN by step

### Double Cadence

Four-stage dominant elaboration (common in Galant style):

```
V5/3 → V6/4 → V5/4 → V5/3 → I
```

## Functional Patterns

| Cadence | Pattern | Function Sequence |
|---------|---------|-------------------|
| PAC | V-I | D-T |
| IAC | V-I | D-T |
| HC | ...V | ...D |
| Phrygian HC (minor only) | iv6–V | S-D |
| Plagal *motion* (see note) | (IV)–I | T prolongation |
| Deceptive *motion* (see note) | V(7)–vi | D-T(x) |

**Phrygian half cadence (PHC)** (`v2/03-diatonic-harmony/11-la-in-the-bass.md`):
- Minor only: iv6–V with bass le–sol (a half step, like phrygian ra–do).
- Double **do** in iv6 to avoid parallels and the augmented 2nd le–ti.
- Usually approached from i, with soprano me–fa–sol.

**Conventions:** V1 lists "plagal" and "deceptive" as cadence types. OMT 2e keeps "cadence" for phrase endings and uses:
- **plagal motion**: (IV)–I prolonging tonic, usually *after* a PAC or at a phrase beginning. It is written with IV in parentheses. True (IV)–I phrase endings exist but are rare in 18th–19th-c. music (`v2/03-diatonic-harmony/10-plagal-motion.md`).
- **deceptive motion**: V(7) moves to vi (less often IV6) instead of I, avoiding the cadence. The phrase then continues to a real cadence (v2 03/11).

Do not treat (IV)–I or V–vi as the cadence that closes a theme.

## Melodic Considerations

### Approaching Final Tonic

| Approach | Motion | Preference |
|----------|--------|------------|
| re → do | Step down | Most common |
| ti → do | Step up | Common |
| sol → do | Leap down | Less common |

### Cadential Melody Notes

| Cadence | Typical Melody |
|---------|---------------|
| PAC | Ends on do |
| IAC | Ends on mi or sol |
| HC (on V) | re, ti, or sol |

## Compositional Application

### Cadence Hierarchy in Form

| Position | Typical Cadence |
|----------|-----------------|
| End of phrase (antecedent) | HC or IAC |
| End of phrase (consequent) | PAC |
| End of section | PAC |
| End of piece | PAC (often elaborated) |

### Cadence Planning

1. **Phrase pairs**: HC → PAC or IAC → PAC
2. **Period**: Antecedent (weak cadence) → Consequent (strong cadence)
3. **Sentence**: Usually ends with single PAC

## Constraints & Rules

1. **Half cadence V must be:**
   - Root position
   - Triad (not seventh chord)

2. **Cadential 6/4:**
   - 4th and 6th must resolve DOWN
   - Prepare suspensions by step or common tone

3. **PAC requirements:**
   - Both V and I in root position
   - Melody arrives on do

## Sources (OMT 2e)

| v2 chapter | Source URL | Used for |
|------------|------------|----------|
| `v2/03-diatonic-harmony/10-plagal-motion.md` | https://viva.pressbooks.pub/openmusictheory/chapter/plagal-motion/ | plagal motion |
| `v2/03-diatonic-harmony/11-la-in-the-bass.md` | https://viva.pressbooks.pub/openmusictheory/chapter/la-in-the-bass/ | deceptive motion, phrygian HC |

## Score Examples

Transcribed in lilylet (see the [primer](../examples/lilylet-primer.md)); each example says what to look for, bar by bar.

| Example | What it shows |
|---------|---------------|
| [Cadential six-four](../examples/01-harmonic-functions/cadential64.md) | 6/4–5/3 over a repeated *sol*: the 6 and 4 resolve down as suspensions; PAC |
| [Cadential six-four, full figures](../examples/01-harmonic-functions/cadential64-full.md) | 8/6/4–8/5/3, bass *sol* doubled |
| [Cadential six-four to V7](../examples/01-harmonic-functions/cadential64-7th.md) | 8/6/4–7/5/3: the doubling voice moves to the seventh |
| [Compound cadence, 4–3](../examples/01-harmonic-functions/compound43.md) | *do*–*ti* suspension over *sol*, fifth and octave sustained |
| [Compound cadence, full figures](../examples/01-harmonic-functions/compound43-full.md) | 8/5/4–8/5/3 (figure vs. top note in the source is an open question) |
| [Double cadence](../examples/01-harmonic-functions/double-cadence.md) | 5/3–6/4–5/4–5/3 over a held *sol*; galant PAC formula |
| [Fix 2: leave out the fifth of V7 (doubled bass)](../examples/05-formal-schemas/d5dropfifth.md) | preferred fix for *ti–do* over V7–I: drop the fifth of V7, double the bass, so I can be complete |
| [V7–I with ti–do in the melody: the problem](../examples/05-formal-schemas/d5problem.md) | problem: *ti–do* in the soprano of V7–I; cannot voice both chords fully and still resolve the seventh |
| [Deceptive resolution: D5 Tx6](../examples/05-formal-schemas/deceptive.md) | A **deceptive resolution** of V to VI with the voicing the page requires: *ti* still resolves up to *do* |
| [Deceptive resolution of V7: D5 Tx6](../examples/05-formal-schemas/deceptive7.md) | The deceptive resolution with a **V7**. Same voicing rule: *ti* → *do*, and the seventh resolves down |
| [Fix 1: leave out the fifth of I (tripled bass)](../examples/05-formal-schemas/t1dropfifth.md) | fix: keep V7 complete, drop the fifth of I (tripled bass) |

## Related Topics

- [Phrase Structure](../04-phrase-structure/_overview.md) - Periods and sentences
- [Prolongation](prolongation.md) - Extending functions before cadence *(planned)*
- [Formal Schemas](../05-formal-schemas/_overview.md) - Cadential patterns in schemas
- [Species Counterpoint](../10-counterpoint/species-counterpoint.md)
- [Rule of the Octave and Cadential Schemas](../05-formal-schemas/rule-of-the-octave.md)

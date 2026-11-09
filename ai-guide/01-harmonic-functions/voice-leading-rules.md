---
title: Voice-Leading Rules
category: harmonic-functions
tags: [voice-leading, tendency-tones, dissonance, resolution]
related: [tonic-subdominant-dominant, cadences, jazz-voicings, species-counterpoint]
difficulty: intermediate
examples: [05-champagne, 05-d4i, 05-d5dropfifth, 05-d5problem, 05-deceptive, 05-deceptive7, 05-paralleltenths, 05-s4dropthird, 05-s4problem, 05-t1dropfifth, 05-ve63, 05-ve64]
---

# Voice-Leading Rules

## Summary

Voice-leading rules govern how melodic lines move between chords. Two key concepts determine pitch movement: tendency tones (scale degrees with inherent directional pull) and functional dissonances (context-dependent tensions requiring resolution).

## Tendency Tones

### Definition

A **tendency tone** is a scale degree that naturally progresses to specific pitches. These tendencies may be absolute or context-dependent.

### Primary Tendency Tones

| Scale Degree | Tendency | Resolution | Context |
|--------------|----------|------------|---------|
| ti (leading tone) | Strong upward | → do | Strongest in D function |
| le (lowered 6) | Often downward | → sol | Context-dependent |

### Ti Resolution Rules

**Standard:** ti → do (same voice, on function change)

**Exceptions:**
1. **Stepwise descent**: When ti is mid-descent (re-do-ti-la-sol), step inertia allows downward motion
2. **Frustrated leading-tone**: Inner voice ti may go to sol for better voice-leading
3. **Tonic dissonance**: When ti is functional dissonance in T chord, resolve down

## Functional Dissonances

### Concept

When pitches form a chord expressing T, S, or D function, certain scale degrees become **functional dissonances** with specific resolution requirements—even if not acoustically dissonant.

### Dissonance by Function

| Function | Dissonant Scale Degrees |
|----------|------------------------|
| **T** or **Tx** | 7, and 5 when 6 is present |
| **S** | 3, and 1 when 2 is present |
| **D** | 4, 6 |

### Common Functional Dissonances

In diatonic music (triads and seventh chords):

| Chord Element | Scale Degree | Example |
|---------------|--------------|---------|
| 7th of any seventh chord | varies | G7: fa |
| 5th of vii° or VII | fa | B°: fa |
| 5th of iii or III | ti/te | Em: ti |

## Resolution Requirements

### Core Rule

Functional dissonances **resolve down by step** when the function changes.

### Preparation (Approach)

Dissonances should be approached by:
1. **Common tone** (suspension type) - preferred
2. **Step** (passing/neighbor type)

### Transfer Rule

A dissonance may transfer to another voice before resolving:
- Multiple same-function chords allow transfer
- Prefer: inner → inner, or inner → outer
- Avoid: outer → inner (more noticeable)

**Example:** Alto dissonance → transferred to tenor → resolves in tenor on function change

## Voice-Leading Hierarchy

When rules conflict, follow this priority:

| Priority | Rule | Notes |
|----------|------|-------|
| 1 | Avoid parallel 5ths/8ves | Never violated |
| 2 | Resolve functional dissonances | Takes precedence over most rules |
| 3 | Standard doublings | May be relaxed for dissonance resolution |
| 4 | Law of shortest way | May be violated for resolution |
| 5 | Contrary motion with bass | Lower priority |

## Motion Types

| Type | Description | Example |
|------|-------------|---------|
| **Parallel** | Same direction, same interval | 3rd → 3rd |
| **Similar** | Same direction, different interval | 3rd → 5th |
| **Contrary** | Opposite directions | One up, one down |
| **Oblique** | One voice stationary | Common tone + motion |

### Forbidden Parallels

- Parallel perfect 5ths
- Parallel perfect 8ves
- Direct (hidden) 5ths/8ves to outer voices

## Compositional Application

### Checklist for Voice-Leading

1. Identify tendency tones (ti, le)
2. Identify functional dissonances based on chord function
3. Plan resolutions before writing other voices
4. Check for parallel 5ths/8ves
5. Verify all dissonances resolve down by step

### Common Patterns

```
Tendency tone resolution:
V - I: ti → do (soprano), re → do or re → mi (inner voices)

Functional dissonance:
V7 - I: fa (4th of D) → mi (resolves down by step)
ii7 - V: do (1st of S with 2) → ti (resolves down)
```

## Constraints

1. **Never** use parallel 5ths or 8ves
2. **Always** resolve functional dissonances down by step
3. **Always** prepare dissonances by common tone or step
4. **Exceptions** for established schemata patterns only

## Score Examples

Transcribed in lilylet (see the [primer](../examples/lilylet-primer.md)); each example says what to look for, bar by bar.

| Example | What it shows |
|---|---|
| [Champagne progression: T(1 S6d 3)](../examples/05-formal-schemas/champagne.md) | Gene Biringer's **champagne progression**, T1 S6 T3, harmonising *mi–fa–sol* in the melody |
| [Voice exchange with D4 substitute: T(1 D4i 3)](../examples/05-formal-schemas/d4i.md) | The voice exchange with a **D4 substitute** (V4/2) in the middle. Per the page, the upper voices are exactly those of the V6/4 version |
| [Fix 2: leave out the fifth of V7 (doubled bass)](../examples/05-formal-schemas/d5dropfifth.md) | preferred fix for *ti–do* over V7–I: drop the fifth of V7, double the bass, so I can be complete |
| [V7–I with ti–do in the melody: the problem](../examples/05-formal-schemas/d5problem.md) | problem: *ti–do* in the soprano of V7–I; cannot voice both chords fully and still resolve the seventh |
| [Deceptive resolution: D5 Tx6](../examples/05-formal-schemas/deceptive.md) | A **deceptive resolution** of V to VI with the voicing the page requires: *ti* still resolves up to *do* |
| [Deceptive resolution of V7: D5 Tx6](../examples/05-formal-schemas/deceptive7.md) | The deceptive resolution with a **V7**. Same voicing rule: *ti* → *do*, and the seventh resolves down |
| [Parallel tenths: T(1 D2p 3)](../examples/05-formal-schemas/paralleltenths.md) | *do–re–mi* in the bass against *mi–fa–sol* in the melody: outer voices in **parallel tenths** over a passing **V4/3** |
| [Fix: leave out the third of S4 (doubled bass)](../examples/05-formal-schemas/s4dropthird.md) | fix: drop *la* from S4 and double the bass, so the seventh of D5 can be prepared |
| [S4(7)–D5(7): the problem](../examples/05-formal-schemas/s4problem.md) | problem: S4(7)–D5(7) fully voiced; the two sevenths cannot both be prepared and resolved |
| [Fix 1: leave out the fifth of I (tripled bass)](../examples/05-formal-schemas/t1dropfifth.md) | fix: keep V7 complete, drop the fifth of I (tripled bass) |
| [Voice exchange with passing VII6: T(1 D2p 3)](../examples/05-formal-schemas/ve63.md) | The same voice exchange as VE64, with a passing **VII6** (figure 6, i.e. 6/3) as the D2 chord |
| [Voice exchange with passing V6/4: T(1 D2p 3)](../examples/05-formal-schemas/ve64.md) | The outer voices exchange do and mi across a passing **V6/4** |

## Related Topics

- [T-S-D Functions](tonic-subdominant-dominant.md) - Functional framework
- [Cadences](cadences.md) - Voice-leading at phrase endings
- [Applied Chords](../02-chromatic-harmony/applied-chords.md) - Chromatic tendency tones
- [Jazz Voicings and Blues](../09-jazz/jazz-voicings.md)
- [Species Counterpoint](../10-counterpoint/species-counterpoint.md)

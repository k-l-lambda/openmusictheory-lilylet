---
title: Neo-Riemannian Transformations and Mediants
category: chromatic-harmony
tags: [neo-riemannian, plr, parallel, relative, leading-tone-exchange, slide, nebenverwandt, hexatonic-pole, tonnetz, hexatonic-cycle, octatonic-cycle, weitzmann-region, cube-dance, chromatic-mediant, parsimonious-voice-leading, funktionstheorie]
related: [modal-mixture, chromatic-sequences, modulation, pitch-class-sets, applied-chords]
difficulty: advanced
---

# Neo-Riemannian Transformations and Mediants

## Summary

Neo-Riemannian transformations connect major and minor triads by common tones and small voice-leading moves rather than by key. Every transformation swaps a major triad with a minor one. Mediants (roots a third apart) fall into three grades by common-tone count and quality, and each one equals a P/L/R combination.

## Basic Transformations (two common tones)

Each is a toggle: applying it twice returns the original triad.

| Op | Name | Keeps | Moving note | Major → minor (from C) | Minor → major (from Cm) |
|---|---|---|---|---|---|
| P | Parallel | Perfect 5th | 3rd, 1 semitone | C → Cm (E→E♭) | Cm → C (E♭→E) |
| L | Leading-tone exchange | Minor 3rd | 1 semitone (major: root ↓; minor: 5th ↑) | C → Em (C→B) | Cm → A♭ (G→A♭) |
| R | Relative | Major 3rd | 1 whole tone (major: 5th ↑; minor: root ↓) | C → Am (G→A) | Cm → E♭ (C→B♭) |

Root relations: P keeps the root; L takes a major triad to the minor triad a M3 higher; R takes a major triad to the minor triad a m3 lower.

*Tonnetz*: fifths run left to right, M3s on one diagonal, m3s on the other; every triangle is a triad. P flips a triangle across its P5 edge, R across its M3 edge, L across its m3 edge. From a minor triad every flip goes the opposite way. With enharmonic equivalence the *Tonnetz* is a torus.

## Compound Transformations

| Op | Name | Common tones | Motion | From C | From Cm |
|---|---|---|---|---|---|
| S | Slide | 1 (the 3rd) | Root and 5th each 1 semitone | C → C♯m (C→C♯, G→G♯) | Cm → B (C→B, G→F♯) |
| N | *Nebenverwandt* ("neighbor-related") | 1 (the root of a major triad) | Both notes of the minor 3rd each 1 semitone | C → Fm (E→F, G→A♭) | Cm → G (C→B, E♭→D) |
| H | Hexatonic pole (= PLP) | 0 | All three notes 1 semitone | C → A♭m (C→C♭, E→E♭, G→A♭) | Cm → E (C→B, E♭→E, G→G♯) |

- S keeps the 3rd and moves the P5 (the opposite of P). From major it goes to the minor triad a semitone higher.
- N goes from major to the minor triad a P5 lower (C → Fm).
- H goes to the opposite mode a M3 lower from major (C → A♭m), a M3 higher from minor (Cm → E). These are the two poles of a hexatonic cycle.
- Any two major/minor triads are at most five P/L/R steps apart (verified: max 5 over all 24 triads). The useful combinations are parsimonious, with no voice moving more than a step.

## Cycles

A cycle alternates a fixed pattern of operations until it returns to the starting chord.

| Cycle | Triads before closing | Triads from C | Parent collection | Notes |
|---|---|---|---|---|
| PL | 6 | C, Cm, A♭, A♭m, E, Em | Hexatonic: C, E♭, E, G, A♭, B (alternating m2 + m3) | Major roots outline an augmented triad (C–A♭–E). Brahms, Double Concerto I, mm. 270–76: A♭ → G♯m → E → Em → C → Cm → A♭ |
| RP | 8 | C, Am, A, F♯m, F♯, E♭m, E♭, Cm | Octatonic: C, C♯, E♭, E, F♯, G, A, B♭ (alternating m2 + M2) | Major roots outline a dim7 (C–A–F♯–E♭) |
| RL | 24 | All 24 major and minor triads (C, Am, F, Dm, B♭, Gm, …) | Chromatic | Usually ignored or truncated |
| PLR | 6 (two passes of P-L-R) | C, Cm, A♭, Fm, F, Am | 7 pcs | Every triad shares one pitch (C here). From Cm the shared pitch is G |

Repeating a single operation only toggles between two triads (e.g. successive L in Laurie Anderson's "O Superman").

## Augmented Triads and Weitzmann Regions

- R moves its note a whole tone, so it is "twice the work" of P and L. Filling the gap with a semitone gives an augmented triad between R-related triads: C → C–E–G♯ → Am (G→G♯→A).
- An augmented triad respells with any member as root (C+ = E+ = A♭+), so it goes to three minor triads by raising one note a semitone, and comes from three major triads by lowering one note a semitone.
- There are only four augmented triads. Each one with its six single-semitone neighbors is a Weitzmann region:

| Augmented triad | Major triads (one note lowered) | Minor triads (one note raised) |
|---|---|---|
| C+ (C, E, G♯/A♭) | C, E, A♭ | Am, C♯m, Fm |
| C♯+ (C♯, F, A) | D♭, F, A | Dm, F♯m, B♭m |
| D+ (D, F♯, A♯/B♭) | D, F♯, B♭ | E♭m, Gm, Bm |
| E♭+ (E♭, G, B) | E♭, G, B | Cm, Em, A♭m |

Inside a region, any major-to-minor path is R, S or N (two semitones in total). In the C+ region: C → Am (R), C → C♯m (S), C → Fm (N).

## Cube Dance

- A PL cycle plus two augmented triads makes a cube with 8 vertices. Each edge moves one note by one semitone. Major↔minor edges are P or L. The two augmented triads sit at opposite corners.
- The C cube is C, E, A♭ (all adjacent to C+) and Cm, Em, A♭m (all adjacent to E♭+).
- Each augmented triad belongs to two cubes, so one augmented triad pivots ("modulates") from one PL cycle to the next. The four cubes linked by the four augmented triads form the Cube Dance (Douthett and Steinbach 1998), a map of all major and minor triads connected by single-semitone moves.
- From C to D takes two pivots: via C+ then C♯+ (D♭+), or via E♭+ then D+.
- Augmented triads can also link RP cycles, PLR cycles, or any transformation group that includes R.
- Distance in the Cube Dance (total semitones moved) matches intuitive closeness. It needs no tonal center.

## Mediants

"Mediant" here means any two chords whose roots are a third apart (not only iii/vi).

| Grade | English term | Common tones | Quality | Both in one key? | From C | From Cm |
|---|---|---|---|---|---|---|
| 1 | Diatonic mediant | 2 | Changes | Yes | Am (R), Em (L) | E♭ (R), A♭ (L) |
| 2 | Chromatic mediant | 1 | Same | No | E (LP), E♭ (PR), A (RP), A♭ (PL) | Em (PL), E♭m (RP), Am (PR), A♭m (LP) |
| 3 | Doubly-chromatic (disjunct) mediant | 0 | Changes | No | E♭m (PRP), A♭m (PLP = H) | A (PRP), E (PLP = H) |

Compound labels read left to right, e.g. LP(C) = P(L(C)) = P(Em) = E. The C-minor column comes from verified transformations; v2's tables give only C major.

Four possible roots a third away × two qualities = eight mediants. The C-major case:

| Root | Major | Minor |
|---|---|---|
| E | Grade 2 | Grade 1 |
| E♭ | Grade 2 | Grade 3 |
| A | Grade 2 | Grade 1 |
| A♭ | Grade 2 | Grade 3 |

- Grade numbers are more common in German-language theory; diatonic/chromatic/doubly-chromatic are the usual English terms.
- Some English sources label the four chromatic mediants "upper/lower" (mediant root above/below) and "flat/sharp" (whether the scale degree it stands on is altered).

## Terminology: "Parallel"

- English **parallel** = same root, other mode (C ↔ Cm). This is the neo-Riemannian P.
- German ***Parallel*** = English **relative** (C ↔ Am), the neo-Riemannian R. German for English "parallel" is *Variante*.
- German *Gegenklang* / *Gegenparallel* (Tg) = neo-Riemannian L (C ↔ Em).
- Check which convention a source uses before reading P, especially in historical or multilingual sources.

Funktionstheorie names relative to a C-major tonic (from v2):

| Chord | Mediant type | German term (tonic function) | Neo-Riemannian |
|---|---|---|---|
| Cm | — | *Varianttonart* (t) | P |
| Am | Diatonic | *Paralleltonart* (Tp) | R |
| Em | Diatonic | *Gegenklang* / *Gegenparallel* (Tg, sometimes Tl) | L |
| E | Chromatic | *Tonikagegenparallel-Variante* | LP |
| E♭ | Chromatic | *Tonikavariant-Parallele* (tP) | PR |
| A | Chromatic | *Tonikaparallel-Variante* | RP |
| A♭ | Chromatic | *Tonikavariant-Gegenparallele* (tG) | PL |
| E♭m | Doubly-chromatic | — | PRP |
| A♭m | Doubly-chromatic | — | PLP |

## Constraints

1. P, L, R, S, N and H take only major or minor triads and always change the mode.
2. P, L, R keep two common tones. S and N keep one. H keeps none.
3. P and L move one note a semitone. R moves one note a whole tone. S and N move two notes a semitone each. H moves all three notes a semitone.
4. A PL cycle has 6 triads (hexatonic), RP has 8 (octatonic), RL has all 24. PLR closes after two passes (6 triads) around one shared pitch.
5. Augmented triads (only four) link R-, S- and N-related pairs. Lower one note to get a major triad, raise one note to get a minor triad.
6. Grade 1 mediant: 2 common tones, quality changes. Grade 2: 1 common tone, same quality. Grade 3: 0 common tones, quality changes.
7. Read compound labels left to right (LP = L, then P).
8. Never read German *Parallel* as English parallel: German *Parallel* = relative (R), *Variante* = parallel (P).

## Sources

| v2 chapter | Source URL | Used for |
|---|---|---|
| `v2/05-chromaticism/12-neo-riemannian-triadic-progressions.md` | https://viva.pressbooks.pub/openmusictheory/chapter/neo-riemannian-triadic-progressions/ | P/L/R/S/N/H, *Tonnetz*, cycles, Weitzmann regions, Cube Dance |
| `v2/05-chromaticism/13-mediants.md` | https://viva.pressbooks.pub/openmusictheory/chapter/mediants/ | Mediant grades, eight-mediant table, Funktionstheorie terms, "parallel" note |

## Score Examples (planned)

- `05/12` Example 2: Brahms, Double Concerto I, mm. 270–76 reduction (PL cycle A♭ → A♭).
- `05/12` Example 3: P, L, R voice leading on one triad.
- `05/12` Example 13: S, N, H from C major.
- `05/12` Examples 15–16: C+ resolving to Am, C♯m, Fm, and reached from C, E, A♭.
- `05/13` Example 1: mediant summary by grade.
- `05/13` Example 2: Holmès, "L'Or", repeated mediant relations.

## Related Topics

- [Modal Mixture](modal-mixture.md) - P relation and borrowed ♭III/♭VI chromatic mediants in a key
- [Chromatic Sequences](chromatic-sequences.md) - Equal divisions by M3/m3 that the PL/RP cycles realize
- [Modulation](modulation.md) - Mediant and augmented-triad pivots to distant keys
- [Pitch-Class Sets](../08-post-tonal/pitch-class-sets.md) - Hexatonic and octatonic collections, symmetry
- [Applied Chords](applied-chords.md) - Functional alternative for chromatic chords

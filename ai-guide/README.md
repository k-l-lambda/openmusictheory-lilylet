# AI Harmony & Form Guide

A streamlined music theory knowledge base designed for AI agents, focusing on compositional logic and harmonic analysis.

## Purpose

This guide extracts actionable musical knowledge from Open Music Theory, optimized for:
- AI agent training data and prompt engineering
- Composition and arrangement guidance
- Structured reference for harmonic analysis
- RAG (Retrieval-Augmented Generation) systems

## Prerequisites

This guide assumes familiarity with:
- Basic intervals (2nd, 3rd, 4th, etc.)
- Triads and seventh chords
- Major and minor scales
- Key signatures

## Structure

| Section | Content |
|---------|---------|
| **01-harmonic-functions/** | Core T-S-D framework, prolongation, cadences |
| **02-chromatic-harmony/** | Applied chords, modal mixture, Aug6, modulation, chromatic sequences, neo-Riemannian/mediants |
| **03-progressions/** | Stock progressions (classical, pop/rock, OMT 2e pop schemas, blues) |
| **04-phrase-structure/** | Sentence, period, hybrid themes |
| **05-formal-schemas/** | Galant schemata (Meyer, Prinner, Fonte, etc.), rule of the octave |
| **06-large-forms/** | Binary, ternary, sonata, rondo |
| **07-melodic-elaboration/** | Embellishing tones (PT, NT, SUS, etc.) |
| **08-post-tonal/** | Basic pitch-class sets and twelve-tone concepts |
| **09-jazz/** | Jazz harmony (chord symbols, ii–V–I, substitutions, chord-scale) and voicings (OMT 2e) |
| **10-counterpoint/** | Species counterpoint, 16th-century style, fugal exposition (OMT 2e) |
| **appendices/** | Quick reference tables, glossary |
| **examples/** | 79 lilylet score examples transcribed from the OMT figures, linked from each topic ([index](examples/README.md)) |

## File Format

Each topic file includes:
- **YAML frontmatter** - Metadata for indexing (title, category, tags, difficulty)
- **Summary** - 1-2 sentence definition
- **Core Concept** - Main theoretical content
- **Compositional Application** - How to use in composition
- **Common Patterns** - Tables, formulas, progressions
- **Constraints & Rules** - Voice-leading requirements
- **Related Topics** - Cross-references

## Score Examples

The topic files link to **score examples** in [`examples/`](examples/README.md). Each one is a lilylet transcription of an Open Music Theory figure, checked bar by bar against the original image. lilylet is a text notation an AI can read directly, so the examples keep principle 3 ("remove notation-specific content"): there are still no images, iframes or exercises.

- Each topic's frontmatter lists its examples (`examples: [id, …]`). Each example's frontmatter lists its topics (`topics: [...]`). Both directions are there for retrieval.
- Each example has a **What to look for** section that ties the concept to specific bars and notes.
- How to read the notation: [lilylet primer](examples/lilylet-primer.md).

## Source

Derived from [Open Music Theory](https://viva.pressbooks.pub/openmusictheory/): first edition (repo-root `*.md`) and second edition (`v2/`, OMT 2e). Topics added from 2e cite `v2/<part>/<chapter>.md` plus the chapter URL in their Sources. Where V1 and 2e differ in convention, the file states both ("Conventions" / "Note (OMT 2e)"). Content also comes from:
- Mark Gotham's When-in-Rome corpus
- Fux's Gradus ad Parnassum exercises
- Classical and pop/rock harmony analysis

## License

Content is derived from open educational resources under Creative Commons licenses.

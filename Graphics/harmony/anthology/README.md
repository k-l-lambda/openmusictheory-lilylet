# Harmony Anthology Resources

This directory contains harmony analysis examples from the When-in-Rome corpus, organized by harmonic concept.

## Source

**Repository:** [MarkGotham/When-in-Rome](https://github.com/MarkGotham/When-in-Rome)

**Original corpus:** [OpenScore Lieder Corpus](https://github.com/OpenScore/Lieder)

**Curated by:** Mark Gotham and FourScoreAndMore.org

## License

- **Musical scores:** CC BY-SA 4.0 (When-in-Rome)
- **OpenScore Lieder Corpus:** CC0 (Public Domain)

## Contents

### Harmony Categories

| Category | Examples | Description |
|----------|----------|-------------|
| Applied_Chords | 1234 | Secondary dominants (V/V, V/ii, etc.) |
| Augmented_Sixths | 184 | Italian, French, German +6 chords |
| Modal_Mixture | 563 | Borrowed chords from parallel mode |
| Neapolitan_Sixths | 73 | bII and bII6 chords |

### Directory Structure

```
anthology/
├── Applied_Chords/
│   └── index.csv      # Index with measure numbers, keys, figures
├── Augmented_Sixths/
│   └── index.csv
├── Modal_Mixture/
│   └── index.csv
├── Neapolitan_Sixths/
│   └── index.csv
├── scores/            # MusicXML score files (.mxl)
└── README.md
```

## Usage

1. Open `index.csv` in any category folder to find examples
2. CSV columns: COMPOSER, COLLECTION, MOVEMENT, MEASURE, FIGURE, KEY, SCORE, DOWNLOAD, EXAMPLE
3. Score files in `scores/` folder can be opened with any notation software (MuseScore, Sibelius, Finale, etc.)

## CSV Format

Each row in the index CSV represents one occurrence of the harmonic concept:

- **MEASURE**: Bar number where the harmony appears
- **FIGURE**: Roman numeral analysis (e.g., V43/V, Ger65, bII6)
- **KEY**: Local key context
- **SCORE**: Link to MuseScore.com hosted version
- **DOWNLOAD**: Links to .mscz and .mxl files in When-in-Rome

## More Information

- Interactive online anthology: [Open Music Theory - Anthology Harmony](https://viva.pressbooks.pub/openmusictheory/chapter/anthology-harmony/)
- When-in-Rome documentation: [GitHub README](https://github.com/MarkGotham/When-in-Rome)

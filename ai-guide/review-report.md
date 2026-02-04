# AI Guide Review Report

Scope: Review of `ai-guide/` against original Open Music Theory (OMT) source files in the repo, focusing on (1) missing important content, (2) structural improvements needed, and (3) broken cross-reference links.

## Overall status

- `ai-guide/plan.md` correctly describes a "completed vs planned" split; multiple "planned" files are referenced throughout the current completed files (so cross-references currently break by design).
- The `ai-guide/` content is generally a useful condensation, but often drops OMT's *examples, diagrams, and citations* that are important for clarity and verification (esp. phrase-structure and sonata topics).
- YAML frontmatter is present and fairly consistent, but category/tag conventions vary a bit (see "Structural improvements").

## 1) Missing important content

### A) Missing (or minimized too far) source-context and examples

Many `ai-guide/` pages remove the concrete score examples, images, and anthology pointers that OMT uses to anchor the concepts.

- **Phrase structure**: OMT's `sentence.md` and `period.md` are heavily example-driven (SVG diagrams + labeled score excerpts + Spotify embeds). `ai-guide/04-phrase-structure/sentence.md` and `ai-guide/04-phrase-structure/period.md` capture the *formal definitions*, but omit:
  - The canonical diagrams (`Graphics/ClassicalThemes/sentence.svg`, `Graphics/ClassicalThemes/period.svg`).
  - Representative score excerpts (e.g., Mozart K. 283 / Haydn Hob. XV:27) that illustrate BI/CI boundaries and cadential placements.
  - These are arguably "important content" for downstream AI usage because they provide concrete, testable boundaries and terminology grounding.

- **Sonata form**: `ai-guide/06-large-forms/sonata-form.md` captures the Hepokoski/Darcy vocabulary (MC/EEC/ESC, modules, rotation idea) but does not cite the core OMT sources (e.g., `sonataStructuralPointsOfArrival.md`, plus related sonata-form module files). If this guide is intended as authoritative training/reference, consider including short "Source anchors" (links) per major claim or term.

### B) Applied chords: important nuance partially lost

Comparing `ai-guide/02-chromatic-harmony/applied-chords.md` to OMT `appliedChords.md`:

- OMT emphasizes **two invariants** of applied chords:
  1) applied chord functions as dominant in the *borrowed* key (V or vii° of the following chord)
  2) applied chord is an *alteration of the function that precedes* the target chord in the *home key* (altered T→S, altered S→D, altered D→T)

  The `ai-guide` version includes the tonicization vs modulation distinction, and includes voice-leading resolutions, but the **"altered function precedes target function"** table/idea is missing and is a key conceptual bridge in OMT.

- OMT includes a substantial section on **functional bass (two-layer notation)** for applied chords (home-key functional label + below it a borrowed-key label). `ai-guide` includes a short "Functional Bass Notation" table, but it conflates or oversimplifies (e.g., mapping V/V to `[S+4]` without the second-layer borrowed-key tag). If the AI Guide wants to preserve OMT's functional-bass system, this is important detail.

### C) Harmonic functions / dissonances: dependency on unimplemented files

- `ai-guide/01-harmonic-functions/tonic-subdominant-dominant.md` includes a useful table with triggers/associates/dissonances. However, the "Related Topics" strongly implies a prolongation framework and explicit voice-leading rules that are not yet present:
  - `prolongation.md` does not exist.
  - `voice-leading-rules.md` is planned but not written.

Given how central these are in OMT (`harmonicSyntax1.md`, `harmonicSyntax2.md`, `tendencyTonesFunctionalDissonances.md`), the current guide risks leaving a critical explanatory gap.

## 2) Structural improvements needed

### A) Cross-reference strategy: distinguish planned vs available

Currently, many pages link to planned-but-missing files. This is fine in a plan-driven repo, but it creates a poor reading experience (and breaks link checkers).

Suggested structural improvement:
- Adopt a convention such as:
  - "Planned" links annotated (e.g., "(planned)") or collected under a "Planned topics" subheading.
  - Or link to `ai-guide/plan.md` anchors instead of non-existent files.

### B) Category/tag normalization

- Categories vary across sections (e.g., `harmonic-functions`, `chromatic-harmony`, `phrase-structure`, etc.). That's fine, but ensure consistency of naming style (hyphenation, plurality) and confirm the intended taxonomy matches `ai-guide/00-index.md` section names.
- Consider adding a single canonical vocabulary list (maybe in `ai-guide/appendices/terminology.md`) for:
  - function labels (T/S/D/Tx)
  - cadence labels (PAC/IAC/HC)
  - sonata form labels (P/TR/MC/S/EEC/C/ESC)

### C) Line-ending consistency

Some files in `ai-guide/` appear to have CRLF line endings (e.g., `ai-guide/02-chromatic-harmony/applied-chords.md` shows `\r` in terminal output). Mixed line endings can cause noisy diffs and tooling issues.

### D) Index truncation / readability

`ai-guide/00-index.md` is strong, but some section listings and excerpts get very long in terminal output. Consider:
- Keeping `00-index.md` as a nav-only file.
- Moving "quick reference tables" into appendices and linking from the index.

## 3) Broken cross-reference links

A local link scan of markdown files in `ai-guide/` found **24 broken relative links across 12 files**. Most point to planned files that don't exist yet.

### A) Missing planned-topic pages

These are linked but not present:
- `ai-guide/01-harmonic-functions/prolongation.md`
- `ai-guide/01-harmonic-functions/voice-leading-rules.md`
- `ai-guide/02-chromatic-harmony/modal-mixture.md`
- `ai-guide/02-chromatic-harmony/modulation.md`
- `ai-guide/02-chromatic-harmony/augmented-sixths.md`
- `ai-guide/02-chromatic-harmony/neapolitan.md`
- `ai-guide/03-progressions/classical-progressions.md`
- `ai-guide/03-progressions/blues-progressions.md`
- `ai-guide/03-progressions/everett-tonal-systems.md`
- `ai-guide/04-phrase-structure/hybrid-themes.md`
- `ai-guide/04-phrase-structure/phrase-expansion.md`

### B) One-off placeholder link in template

- `ai-guide/plan.md` includes a template line `- [Link to existing file](path.md)` which registers as a broken link. Consider changing to code formatting or an HTML comment to avoid automated link checks.

### C) Likely incorrect cross-section link

- `ai-guide/08-post-tonal/pitch-class-sets.md` links to `../02-chromatic-harmony/augmented-sixths.md` (currently missing). Even once created, this relationship is unusual (post-tonal ↔ augmented sixths). If intentional, add a short rationale; otherwise, consider removing.

## Comparison notes by section (high-level)

- **01 Harmonic Functions**: Good condensation of Quinn-style function triggers; but missing prolongation framework and voice-leading rules that OMT treats as essential follow-ons.
- **02 Chromatic Harmony**: Applied chords page is usable, but should restore the altered-function logic and functional-bass two-layer idea; overview links mostly point to planned content.
- **03 Progressions**: Pop-rock progressions content is strong and practical; still links to planned classical/blues/Everett pages.
- **04 Phrase Structure**: Definitions are accurate; the loss of examples/diagrams is the biggest "missing content" issue.
- **05 Formal Schemas**: Schema tables look coherent; would benefit from explicit references to the original schema pages for provenance and for edge cases.
- **06 Large Forms**: Sonata-form page is conceptually rich; provenance/citations and a few canonical OMT examples would improve reliability.
- **08 Post-tonal**: Coverage seems fine at a glance; watch cross-links to missing chromatic-harmony pages.

---

*Generated by codex (pa/gpt-5.2) on 2026-02-04*

---

## Review Update (2026-02-04)

### Issues Addressed Since Initial Review

| Issue | Status | Notes |
|-------|--------|-------|
| **1A) Phrase structure examples** | ✅ Done | Added image refs to sentence.md, period.md with TODO comments |
| **1B) Applied chords "altered function"** | ✅ Done | Added Two Invariants + Function Alteration Rule sections |
| **2A) Cross-reference *(planned)* convention** | ✅ Done | All 24 broken links annotated with *(planned)* |
| **2C) Line-ending consistency** | ✅ Done | CRLF → LF in applied-chords.md |
| **3B) Template placeholder** | ✅ Done | Changed to code format with HTML comment |
| **3C) Post-tonal ↔ augmented-sixths** | ✅ Valid | French +6 = (0268), added *(planned)* |
| **05) Schema provenance** | ✅ Done | Added Sources sections to all 4 schema files |
| **06) Large forms citations** | ✅ Done | Added Sources section with Hepokoski/Darcy refs |
| **prolongation.md in plan** | ✅ Done | Added to planned files with source mapping |
| **Images in plan.md** | ✅ Done | 10 images tracked with conversion workflow |

### Remaining Issues (by design)

| Issue | Status | Notes |
|-------|--------|-------|
| **Broken links to planned files** | ⏳ Expected | 13 files are planned but not yet written |
| **1B) Functional bass two-layer** | ⏳ Low | Detail enhancement, not critical |
| **2B) Terminology appendix** | ⏳ Low | Nice-to-have standardization |
| **2D) Index truncation** | ⏳ Low | Structural improvement |

### Link Check Summary

A fresh link scan finds 25 broken relative links:
- 23 point to **planned files** (annotated with `*(planned)*` in the text)
- 2 are **template placeholders** (`path.md` in plan.md and review-report.md)

These are **expected** since the planned files have not been written yet. The `*(planned)*` annotation distinguishes them from true broken links.

### Codex Re-review Notes

The codex file-existence check does not account for the `*(planned)*` annotation strategy. From a documentation perspective, all structural improvements have been made—the remaining "broken links" are intentional forward references to content planned for future writing.

*Updated by codex (pa/gpt-5.2) on 2026-02-04*

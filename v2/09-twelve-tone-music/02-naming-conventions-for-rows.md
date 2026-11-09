---
title: "Naming Conventions for Rows"
slug: "naming-conventions-for-rows"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/naming-conventions-for-rows/"
authors: ["Mark Gotham"]
license: "CC BY-SA 4.0"
modified: "2025-07-15"
---

# Naming Conventions for Rows

> **Key Takeaways**
>
> - This chapter goes through the different ways of representing twelve-tone material:
> 	- pitches by pitch name or pitch class;
> 	- rows and transformations with P<sub>0</sub> starts on C (fixed zero) or P<sub>0</sub> starts wherever we chose (moveable zero)
> 	- matrices, setting out these different row conventions.
> - When reading other writing on twelve-tone music, be prepared for any of these conventions to be used. But in your own work, simply choose one you feel comfortable with and use it consistently.

In analyzing twelve-tone music, there are different conventions for labeling rows, transformations, and even pitches and intervals. This chapter compares the main approaches that you’re most likely to encounter in analytical writings. The focus is on rows and matrices, but before we get to that, let’s deal first with the pitches themselves.

## Pitch

As we’ve seen [earlier in the book](../08-20th-and-21st-century-techniques/02-pitch-and-pitch-class.md), it is useful in some analytical contexts to use pitch-class notation ([integers](../08-20th-and-21st-century-techniques/02-pitch-and-pitch-class.md) from 0 for C to 11 for B) as an alternative to spelling out those pitches (e.g., C♯ vs D♭). This convention is mostly associated with non-tonal music (including most twelve-tone music), where it can be handy for performing the kinds of mathematical operations we’ve seen (in both [pitch-class set analysis](../08-20th-and-21st-century-techniques/04-pc-sets-normal-order-and-transformations.md) and [twelve-tone music](01-basics-of-twelve-tone-theory.md#operations)) and for sidestepping questions of pitch spelling. There’s often still a logic to the pitch spellings used in a twelve-tone piece, but that logic is often of a different and perhaps less generalizable kind. For instance, using specific pitch spellings in a row-form representation usually doesn’t reflect a hierarchy or tonality in the same way that the pitches of a scale do in tonal music.

## Rows

For rows, the main difference in notation and labeling centers on a single choice about which pitch to organize our rows around:

1. the **same pitch** in all contexts (conventionally, that pitch is C)
2. a pitch that’s **important to the musical context** in question

For instance, in the [Basics of Twelve-Tone Theory chapter](01-basics-of-twelve-tone-theory.md), we set out the row of Elisabeth Lutyens’s *Motet* starting on C, which gave us the twelve-tone row 0–11–3–7–8–4–2–6–5–1–9–10. Alternatively, we could set out the P<sub>0</sub> starting on D, as the first voice to enter (alto) starts on D<sub>4</sub> and proceeds to sing the first hexachord of this prime-form row on that pitch level.[^1] That would give us a P<sub>0</sub> of 2–1–5–9–10–6–4–8–7–3–11–0.

### Option 1: P<sub>0</sub> starts on C (fixed zero)

In this convention, whatever you decide the prime form to be, the transposition of that form starting on C is P<sub>0</sub>. This is probably the most common convention today, and sometimes called “zero-centered” or “fixed-zero” (by analogy to tonal solfège systems).

As we have set P<sub>0</sub> to begin on C, I<sub>0</sub> also begins on C, and R<sub>0</sub> and RI<sub>0</sub> will *end* on C. This separation of P<sub>0</sub> and I<sub>0</sub> from R<sub>0</sub> and RI<sub>0</sub> makes sense because we prefer P<sub>0</sub> and R<sub>0</sub> to be exact retrogrades of one other (and likewise I<sub>0</sub> and RI<sub>0</sub>). We could theoretically have an even more consistently “zero-centered” system in which all of P<sub>0</sub>, I<sub>0</sub>, R<sub>0</sub> and RI<sub>0</sub> begin on C, but that’s not a convention that people have widely adopted.

In summary:

- P<sub>0</sub> starts with C
- I<sub>0</sub> starts with C (same pitch class as P<sub>0</sub>)
- R<sub>0</sub> starts with the last note of P<sub>0</sub> (by definition, not C)
- RI<sub>0</sub> starts with the last note of I<sub>0</sub> (by definition, not C)

### Option 2: P<sub>0</sub> starts wherever we chose (moveable zero)

In the alternative method, the P<sub>0</sub> form is assigned to either the first form of the row or the one that is most meaningful—regardless of what pitch class begins the row. Depending on the context, this may be evident from the piece, deduced from the analysis, or allocated semi-arbitrarily. Transpositions and other operations are then worked out in the same way, in relation to that P<sub>0</sub> form. This convention is sometimes called “original-centered” or “movable-zero” (to continue the solfège analogy).

In summary:

- P<sub>0</sub> takes a transposition (and thus starts with a pitch) chosen by the analyst
- I<sub>0</sub> still starts with the same note as P<sub>0</sub>
- R<sub>0</sub> still starts with the last note of P<sub>0</sub>
- RI<sub>0</sub> still starts with the last note of I<sub>0</sub>

### Same? Different? Better? Worse?

As the two summaries suggest, these naming conventions are actually not so different. It bears repeating that for all naming systems, transposition and the other operations all work in the same way, so it’s mostly just a matter of where you start: which row form you use as the referential form to relate others to.

And as is so often the case when multiple parallel naming conventions emerge, there are both benefits and downsides to each approach. If you’re analyzing music that makes you want to assign P<sub>0</sub> in a musically sensitive way, then the moveable-zero convention may suit your purposes. But if you go down that route, then you’ll probably feel compelled to come up with a “good” reason for the pitch level of P<sub>0</sub> in all your analyses, and that may not always be appropriate. The fixed-zero system has the benefit of clarity and consistency. That’s probably why it’s become more common in recent scholarship, but that doesn’t necessarily make it “better.”

Indeed, in many cases, it won’t even be clear which orientation should be P and which I (or R for that matter). Unfortunately, there isn’t yet a widely recognized system for making such determinations.

## Matrices

Before we wrap this up, there’s one final confusion to add to the pile: how to set out these conventions on the row matrix. Here are three types.

### Type 1

First, here’s a reminder of the matrix we saw for the Lutyens example [in the last chapter](01-basics-of-twelve-tone-theory.md) (**P<sub>0</sub>** starts on C and is in the top row). This is probably the most common and standard form.

|  | **I<sub>0</sub>** | **I<sub>11</sub>** | **I<sub>3</sub>** | **I<sub>7</sub>** | **I<sub>8</sub>** | **I<sub>4</sub>** | **I<sub>2</sub>** | **I<sub>6</sub>** | **I<sub>5</sub>** | **I<sub>1</sub>** | **I<sub>9</sub>** | **I<sub>10</sub>** |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **P<sub>0</sub>** | 0 | 11 | 3 | 7 | 8 | 4 | 2 | 6 | 5 | 1 | 9 | 10 | **R<sub>10</sub>** |
| **P<sub>1</sub>** | 1 | 0 | 4 | 8 | 9 | 5 | 3 | 7 | 6 | 2 | 10 | 11 | **R<sub>11</sub>** |
| **P<sub>9</sub>** | 9 | 8 | 0 | 4 | 5 | 1 | 11 | 3 | 2 | 10 | 6 | 7 | **R<sub>7</sub>** |
| **P<sub>5</sub>** | 5 | 4 | 8 | 0 | 1 | 9 | 7 | 11 | 10 | 6 | 2 | 3 | **R<sub>3</sub>** |
| **P<sub>4</sub>** | 4 | 3 | 7 | 11 | 0 | 8 | 6 | 10 | 9 | 5 | 1 | 2 | **R<sub>2</sub>** |
| **P<sub>8</sub>** | 8 | 7 | 11 | 3 | 4 | 0 | 10 | 2 | 1 | 9 | 5 | 6 | **R<sub>6</sub>** |
| **P<sub>10</sub>** | 10 | 9 | 1 | 5 | 6 | 2 | 0 | 4 | 3 | 11 | 7 | 8 | **R<sub>8</sub>** |
| **P<sub>6</sub>** | 6 | 5 | 9 | 1 | 2 | 10 | 8 | 0 | 11 | 7 | 3 | 4 | **R<sub>4</sub>** |
| **P<sub>7</sub>** | 7 | 6 | 10 | 2 | 3 | 11 | 9 | 1 | 0 | 8 | 4 | 5 | **R<sub>5</sub>** |
| **P<sub>11</sub>** | 11 | 10 | 2 | 6 | 7 | 3 | 1 | 5 | 4 | 0 | 8 | 9 | **R<sub>9</sub>** |
| **P<sub>3</sub>** | 3 | 2 | 6 | 10 | 11 | 7 | 5 | 9 | 8 | 4 | 0 | 1 | **R<sub>1</sub>** |
| **P<sub>2</sub>** | 2 | 1 | 5 | 9 | 10 | 6 | 4 | 8 | 7 | 3 | 11 | 0 | **R<sub>0</sub>** |
|  | **RI<sub>2</sub>** | **RI<sub>1</sub>** | **RI<sub>5</sub>** | **RI<sub>9</sub>** | **RI<sub>10</sub>** | **RI<sub>6</sub>** | **RI<sub>4</sub>** | **RI<sub>8</sub>** | **RI<sub>7</sub>** | **RI<sub>3</sub>** | **RI<sub>11</sub>** | **RI<sub>0</sub>** |  |

### Type 2

Now here’s the same matrix, with P<sub>0</sub> still on the top row, but with that P<sub>0</sub> starting on D. Note how the lists of row forms stay the same (**P<sub>0</sub>**, **P<sub>1</sub>**, **P<sub>9</sub>**…), but the pitches have moved around.

|  | **I<sub>0</sub>** | **I<sub>11</sub>** | **I<sub>3</sub>** | **I<sub>7</sub>** | **I<sub>8</sub>** | **I<sub>4</sub>** | **I<sub>2</sub>** | **I<sub>6</sub>** | **I<sub>5</sub>** | **I<sub>1</sub>** | **I<sub>9</sub>** | **I<sub>10</sub>** |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **P<sub>0</sub>** | 2 | 1 | 5 | 9 | 10 | 6 | 4 | 8 | 7 | 3 | 11 | 0 | **R<sub>10</sub>** |
| **P<sub>1</sub>** | 3 | 2 | 6 | 10 | 11 | 7 | 5 | 9 | 8 | 4 | 0 | 1 | **R<sub>11</sub>** |
| **P<sub>9</sub>** | 11 | 10 | 2 | 6 | 7 | 3 | 1 | 5 | 4 | 0 | 8 | 9 | **R<sub>7</sub>** |
| **P<sub>5</sub>** | 7 | 6 | 10 | 2 | 3 | 11 | 9 | 1 | 0 | 8 | 4 | 5 | **R<sub>3</sub>** |
| **P<sub>4</sub>** | 6 | 5 | 9 | 1 | 2 | 10 | 8 | 0 | 11 | 7 | 3 | 4 | **R<sub>2</sub>** |
| **P<sub>8</sub>** | 10 | 9 | 1 | 5 | 6 | 2 | 0 | 4 | 3 | 11 | 7 | 8 | **R<sub>6</sub>** |
| **P<sub>10</sub>** | 0 | 11 | 3 | 7 | 8 | 4 | 2 | 6 | 5 | 1 | 9 | 10 | **R<sub>8</sub>** |
| **P<sub>6</sub>** | 8 | 7 | 11 | 3 | 4 | 0 | 10 | 2 | 1 | 9 | 5 | 6 | **R<sub>4</sub>** |
| **P<sub>7</sub>** | 9 | 8 | 0 | 4 | 5 | 1 | 11 | 3 | 2 | 10 | 6 | 7 | **R<sub>5</sub>** |
| **P<sub>11</sub>** | 1 | 0 | 4 | 8 | 9 | 5 | 3 | 7 | 6 | 2 | 10 | 11 | **R<sub>9</sub>** |
| **P<sub>3</sub>** | 5 | 4 | 8 | 0 | 1 | 9 | 7 | 11 | 10 | 6 | 2 | 3 | **R<sub>1</sub>** |
| **P<sub>2</sub>** | 4 | 3 | 7 | 11 | 0 | 8 | 6 | 10 | 9 | 5 | 1 | 2 | **R<sub>0</sub>** |
|  | **RI<sub>2</sub>** | **RI<sub>1</sub>** | **RI<sub>5</sub>** | **RI<sub>9</sub>** | **RI<sub>10</sub>** | **RI<sub>6</sub>** | **RI<sub>4</sub>** | **RI<sub>8</sub>** | **RI<sub>7</sub>** | **RI<sub>3</sub>** | **RI<sub>11</sub>** | **RI<sub>0</sub>** |  |

### Type 3

Perhaps most confusing of all is a kind of hybrid version where we still have the D version on the top row, but now we label it **P<sub>2</sub>**. So:

- We organize the row class around a chosen pitch/transposition (here D).
- We still label the row forms around the alternative option (**P<sub>0</sub>** starts on C).

Note how this time, comparing it with the version above, the pitches have stayed the same, but the lists of row forms have changed (**P<sub>x</sub>**, **P<sub>y</sub>**…).

|  | **I<sub>2</sub>** | **I<sub>1</sub>** | **I<sub>5</sub>** | **I<sub>9</sub>** | **I<sub>10</sub>** | **I<sub>6</sub>** | **I<sub>4</sub>** | **I<sub>8</sub>** | **I<sub>7</sub>** | **I<sub>3</sub>** | **I<sub>11</sub>** | **I<sub>0</sub>** |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **P<sub>2</sub>** | 2 | 1 | 5 | 9 | 10 | 6 | 4 | 8 | 7 | 3 | 11 | 0 | **R<sub>2</sub>** |
| **P<sub>3</sub>** | 3 | 2 | 6 | 10 | 11 | 7 | 5 | 9 | 8 | 4 | 0 | 1 | **R<sub>3</sub>** |
| **P<sub>11</sub>** | 11 | 10 | 2 | 6 | 7 | 3 | 1 | 5 | 4 | 0 | 8 | 9 | **R<sub>11</sub>** |
| **P<sub>7</sub>** | 7 | 6 | 10 | 2 | 3 | 11 | 9 | 1 | 0 | 8 | 4 | 5 | **R<sub>7</sub>** |
| **P<sub>6</sub>** | 6 | 5 | 9 | 1 | 2 | 10 | 8 | 0 | 11 | 7 | 3 | 4 | **R<sub>6</sub>** |
| **P<sub>10</sub>** | 10 | 9 | 1 | 5 | 6 | 2 | 0 | 4 | 3 | 11 | 7 | 8 | **R<sub>10</sub>** |
| **P<sub>0</sub>** | 0 | 11 | 3 | 7 | 8 | 4 | 2 | 6 | 5 | 1 | 9 | 10 | **R<sub>0</sub>** |
| **P<sub>8</sub>** | 8 | 7 | 11 | 3 | 4 | 0 | 10 | 2 | 1 | 9 | 5 | 6 | **R<sub>8</sub>** |
| **P<sub>9</sub>** | 9 | 8 | 0 | 4 | 5 | 1 | 11 | 3 | 2 | 10 | 6 | 7 | **R<sub>9</sub>** |
| **P<sub>1</sub>** | 1 | 0 | 4 | 8 | 9 | 5 | 3 | 7 | 6 | 2 | 10 | 11 | **R<sub>1</sub>** |
| **P<sub>5</sub>** | 5 | 4 | 8 | 0 | 1 | 9 | 7 | 11 | 10 | 6 | 2 | 3 | **R<sub>5</sub>** |
| **P<sub>4</sub>** | 4 | 3 | 7 | 11 | 0 | 8 | 6 | 10 | 9 | 5 | 1 | 2 | **R<sub>4</sub>** |
|  | **RI<sub>2</sub>** | **RI<sub>1</sub>** | **RI<sub>5</sub>** | **RI<sub>9</sub>** | **RI<sub>10</sub>** | **RI<sub>6</sub>** | **RI<sub>4</sub>** | **RI<sub>8</sub>** | **RI<sub>7</sub>** | **RI<sub>3</sub>** | **RI<sub>11</sub>** | **RI<sub>0</sub>** |  |

### Summary

In summary, the first row can read:

- **P<sub>0</sub>**, starting on 0
- **P<sub>0</sub>**, starting on n (here 2)
- **P<sub>n</sub>**, starting on n

All of these naming and matrix-generating conventions are out there. It’s best simply to be aware of these options and check that you have the right convention in mind when you come across one (especially where the matrices neglect to explicitly label the row names).

> Further Reading

- Parsons, Laurel, 1999. “Music and Text in Elisabeth Lutyens’s Wittgenstein Motet.” *Canadian University Music Review* 20 (1): 71–100.

> Assignments

1. Chose any row from the [Twelve-Tone Anthology](../12-anthology/03-anthology-twelve-tone.md) that interests you and write out the row matrix with all 48 row forms (i.e., with numbers on the grid as shown above) in each of the three ways shown above. (Then choose your favorite method and never do this again!)

---

[^1]: The actual row distribution is a bit more complicated. See Parsons 1999 for an analysis and discussion.

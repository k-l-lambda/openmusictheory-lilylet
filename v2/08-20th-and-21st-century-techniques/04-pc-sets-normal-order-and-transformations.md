---
title: "Pitch-Class Sets, Normal Order, and Transformations"
slug: "pc-sets-normal-order-and-transformations"
source: "https://viva.pressbooks.pub/openmusictheory/chapter/pc-sets-normal-order-and-transformations/"
authors: ["Megan Lavengood", "Brian Moseley"]
license: "CC BY-SA 4.0"
modified: "2026-09-24"
---

# Pitch-Class Sets, Normal Order, and Transformations

> **Key Takeaways**
>
> - A pitch-class set (pc set) is a group of pitch classes.
> - The standard way of naming a pitch class set is by its normal order: the smallest possible arrangement of pitch classes, in ascending order.
> - To transpose a set (T<sub>n</sub>), add *n*to each integer of the set.
> - To invert a set (I<sub>n</sub>), first invert the set (take each integer’s complement mod 12), then transpose by *n.*Alternately, subtract each integer of the set from *n*(*n–x=y*).
> - The clock face may help you perform any of these tasks.

## Pitch-Class Sets

When we talk about a group of pitch classes as a unit, we call that group a pitch-class set, often abbreviated “pc set.” Any group of pitch classes can be a pitch-class set.

## Normal Order

Normal order is the most compressed way to write a given collection of pitch classes, in ascending order. Normal order has a lot in common with the concept of root position. Root position is a standard way to order the pitch classes of triads and seventh chords so that we can classify and compare them easily. Normal order does the same, but in a more generalized way so as to apply to chords containing a variety of notes and intervals.

Following are a mathematical and a visual method for determining normal order.

### Mathematical method

| Process | Example set: G♯<sub>4</sub>, A<sub>2</sub>, D♯<sub>3</sub>, A<sub>4</sub> |
| --- | --- |
| 1. Write as a collection of pitch classes (eliminating duplicates) such that they would fit within a single octave if played in ascending order. There are multiple possible options. | 8,9,3 |
| 2.Duplicate the first pitch class at the end. | 8,9,3,8 |
| 3. Find the largest ordered pitch-class interval between adjacent pitch classes. | 8 to 9: 1 9 to 3: 6 3 to 8: 5 **9 to 3 is the biggest interval.** |
| 4. Rewrite the collection beginning with the pitch class to the right of the largest interval and write your answer in square brackets. | [3,8,9] |

Occasionally you’ll have a a tie for largest interval in step 3. In these cases, the ordering that is most closely packed to one side or the other is the normal form. If there is still a tie, choose the set most closely packed to the bottom.

### Visual method (clock face method)

If you don’t like the process described above, the video in Example 1 clearly explains how to use the clock face to quickly find normal order.

[https://cdnapisec.kaltura.com/p/1601031/embedPlaykitJs/uiconf\_id/54158772?iframeembed=true&entry\_id=1\_wuclkc6h&config[provider]={"widgetId":"1\_b0hsun7h"}](https://cdnapisec.kaltura.com/p/1601031/embedPlaykitJs/uiconf_id/54158772?iframeembed=true&entry_id=1_wuclkc6h&config%5Bprovider%5D=widgetId:1_b0hsun7h)

🔗 [Embedded content: Using the Clock Face to Find Normal Form](https://coursemedia.gmu.edu/embed/secure/iframe/entryId/1_axkf6ow8/uiConfId/+44431031/st/0)

Example 1. Using the clock face to find normal form. [Open on GMU CourseMedia](https://coursemedia.gmu.edu/media/Using+the+Clock+Face+to+Find+Normal+Form/1_axkf6ow8)

## Transposition

In post-tonal music, transposition is often associated with motion: take a chord, motive, melody, and when it is transposed, the aural effect is of *moving* that chord, motive, or melody in some direction. In two disconnected passages from Claude Debussy’s *La cathédrale engloutie,* the opening motive <D, E, B> or <2, 4, 11> is transposed four semitones higher to <F♯, G♯, D♯> or <6, 8, 3> in m. 18 (both in blue in Example 2), representing the cathedral’s slow ascent above the water. When we hear the passage at m. 18, we recognize its relationship to the passage in m. 1 because the same set of ordered intervals return, but starting on a different pitch. Transposition preserves intervallic content, and not only that, it preserves the specific arrangement of the intervals.

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8391225/s/-79eyZ)

Example 2. Transposition of a motive, ordered and unordered.

The same motive is preserved in a more obscured fashion going from m. 18 into m. 19 (in red in Example 2). Here, the unordered pitch class set is transposed, but not the ordered set from before. This may not look as much like a transposition as the first two sets of motives, but if the pitches are put into normal order, the transposed intervallic relationship becomes clear.

Transposition is often abbreviated T<sub>n</sub>, where *n*, the index number of a transformation, represents the ordered pitch-class interval between the two sets. Transposition is an operation—something that is *done* to a pitch, pitch class, or collection of these things. Alternatively, transposition can also be a *measurement*—representing the distance between things.

### Transposing a set

To transpose a set by T<sub>n</sub>, add *n* to every integer in that set (mod 12, meaning numbers wrap around after reaching 12, like on a clock face).

Given the collection of pitch classes in m. 1 above and transposition by T<sub>4</sub>:

$\begin{alignat*}{2}&& [11, 2, 4]  \\ {}+ && 4\ 4\ 4\ \\ \hline && [3, 6, 8] \\ \end{alignat*}$

The result is the pitch classes in m. 18.

**T<sub>4</sub> [11, 2, 4] = [3, 6, 8]**

### Identifying transpositions and calculating the index number

To determine the transpositional relationship *between* two sets, subtract the first set from the second. If the numbers that result are all the same, the two sets are related by that T<sub>n</sub>. For example, to label the arrows in Example 1, an analyst would “subtract” the pitch class integers of m. 1 from the pitch-class integers in m. 18. Note that both sets should be in normal order.

$\begin{alignat*}{2} && [3, 6, 8] \\ {}- && [11, 2, 4] \\ \hline && 4\ 4\ 4\ \\ \end{alignat*}$

**[3, 6, 8] and [11, 2, 4] are related by T<sub>4</sub>.**

## Inversion

Inversion, like transposition, is often associated with motion that connects similar objects. The passage in Example 3 from Chen Yi’s *Duo Ye*(2000) is an example: just as in the transpositionally related passages, these two gestures have the same intervallic content, so our ears recognize them as very similar. Unlike transposition, however, the interval content of these two gestures is not *arranged* in the same way: both have the same intervals, but the [1, 4, 6] set has the interval 3 on the bottom instead of on the top (Example 4).

🎼 [MuseScore score](https://musescore.com/user/32728834/scores/8391513)

Example 3. [2, 4, 7] is inverted to become [1, 4, 6].

![Example 4. These two sets both have the same intervals (a 2, a 3, and a 5), but the intervals are arranged differently.](../media/2019/05/inversion-2-1.png)*Example 4. These two sets both have the same intervals (a 2, a 3, and a 5), but the intervals are arranged differently.*

 

### General inversion

If you are asked to invert a set and are not given an index number, assume you are inverting the set mod 12. This means taking the complement of each number mod 12. The complement of each integer *x* mod 12 is the number *y* that is the difference between *x*and 12. For example, the complement of 4 is 8: 4+8=12. The complement of 6 is 6: 6+6=12. The complement of 0 is 0: 0+0=0, which is 12 mod 12.

Inverting [2, 4, 7] in this way would yield [5, 8, 10].

### I<sub>n</sub>: Invert-then-transpose method

Sometimes, sets are inverted and then transposed, as in Example 3. The abbreviation for this is I<sub>n</sub>.

In Example 3, the first set [2, 4, 7] is inverted by I<sub>8</sub>. To invert a set by I<sub>8</sub>, follow this process, in this order:

1. **Invert:** [2, 4, 7] becomes [5, 8, 10].
2. **Transpose:**adding 8 to every number in [5, 8, 10] yields [1, 4, 6].

### I<sub>n</sub>: Subtraction method

You can calculate the new set created by I<sub>n</sub> by subtracting all the pitch classes of your first set from *n.*

**What is I<sub>8</sub> of [2, 4, 7]?**

$\begin{alignat*}{2} && 8\ 8\ 8\ \\ {}- && [2, 4, 7] \\ \hline && [6, 4, 1] \\ \end{alignat*}$

**I<sub>8</sub> [2, 4, 7] = [1, 4, 6].**

### Identifying inversions and their index numbers

Any two pitches related by inversion can be added together to form the index number. This makes sense as a logical extension of the subtraction method above: if the inverted pitch *y*is the result of *n–x,*then it is also true that *n = x + y*.

Another way to visualize this is on the clock face. If you have two sets that are 1) both in normal order and 2) related by inversion, the notes within each set will map onto one another in reverse order, as shown in Example 5 below. Write the two sets in normal form on top of one another, then add the opposing integers of each set together as illustrated in Example 6 to yield the index number of the I relation. If the sum of each number pair is 12 or more, subtract 12 so that your *n*is in mod 12.

| Example 5. Two inversionally related sets have integers that pair together in reverse order to form a mirror-like relationship. These paired intervals always sum to the same number, which is the index number of the inversion.*Example 5. Two inversionally related sets have integers that pair together in reverse order to form a mirror-like relationship. These paired intervals always sum to the same number, which is the index number of the inversion.* | Example 6. For two 3-note sets, the leftmost integer in one set is added to the rightmost of the second, the middle numbers are added together, and the rightmost element of the first set is added to the leftmost of the second. This is the cross-addition method for finding the index number of inversions.*Example 6. For two 3-note sets, the leftmost integer in one set is added to the rightmost of the second, the middle numbers are added together, and the rightmost element of the first set is added to the leftmost of the second. This is the cross-addition method for finding the index number of inversions.* |
| --- | --- |

## Using the Clock Face to Transpose and Invert

If you prefer a more visual method for transposing and inverting, watch the video lesson in Example 7.

🔗 [Embedded content: Transformations](https://coursemedia.gmu.edu/embed/secure/iframe/entryId/1_wuclkc6h/uiConfId/+44431031/st/0)

Example 7. Using the clock face for transposition and inversion of pitch class sets. [Open on GMU CourseMedia](https://coursemedia.gmu.edu/media/Transformations/1_wuclkc6h)

> Further reading

- Straus, Joseph N. 2016. *Introduction to Post-Tonal Theory*. 4th ed. Upper Saddle River, NJ: Prentice Hall.

> Resources

- [Blank clock faces (integer notation)](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-integers.pdf)
- [Blank clock faces (letter names)](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/Clock-Faces-letters.pdf)
- [Set Theory Quick Reference Sheet](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/INFO-set-theory-quick-reference-sheet.pdf): summarizes the definitions of pitch vs. pitch class, intervals vs. interval classes, and sets vs. set classes.
- [Clock Master](https://brianedwardjarvis.com/MusicTheoryWebApps/clock_master/clock_master_container.html?cm_bej=true&bej_cm_subject=Clock_Types&bej_cm_exercise_name=Integers_Chromatic): visualizer that maps sets onto a clock face. Visualizes transposition and inversion.

> Assignments

1. Normal form and transformations (.[pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-normal-form.pdf), .[docx](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/WK-normal-form.docx)). Asks students to find normal form of various sets, calculate transformations of sets, and identify T<sub>n</sub>/I<sub>n</sub> relationships in “Nacht” by Arnold Schoenberg.
2. Composition prep worksheet (.[pdf](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/COMP-Worksheet-for-prep.pdf), .[docx](https://viva.pressbooks.pub/app/uploads/sites/12/2019/05/COMP-Worksheet-for-prep.docx)). Prepares students for the [set class composition](05-set-class-and-prime-form.md#assignments) by asking them to find sets and transformations.

### Media Attributions

- inversion-2 © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license
- Inversional pairs © Megan Lavengood
- Cross-addition for inversion © Megan Lavengood is licensed under a [CC BY-SA (Attribution ShareAlike)](https://creativecommons.org/licenses/by-sa/4.0/) license

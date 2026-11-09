/**
 * Note list of a parsed LilyletDoc, in the same shape as extract_m21.py writes:
 *   staves: [{ notes: [[measureIdx, offset, pitches[], quarterLength, grace]] }]
 * Staves are flattened in score order: part 1 staff 1..n, part 2 staff 1..n, ...
 * A note counts on the staff it is drawn on (after `\staff "N"` switches), as in
 * MusicXML's <staff>. Pitches are "<STEP><alter:+d><octave>", e.g. "F+14" = F#4.
 *
 * Pitches are SOUNDING pitches, like music21's reading of the MusicXML. A .lyl pitch is
 * written pitch, and under an octave clef (treble_8, bass_8, treble^8, treble_15) lilylet
 * sounds it the clef's octave(s) away, so the clef's whole-octave shift is applied here.
 * The clef is tracked per part and staff and carries across bars, as in the score.
 */
import type { LilyletDoc } from "../../../../lilylet/source/lilylet";
import { clefSuffixSemitones } from "../../../../lilylet/source/lilylet/clefTransposition";

type Frac = [number, number];
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const norm = ([n, d]: Frac): Frac => { const g = gcd(n, d) || 1; return [n / g, d / g]; };
const add = (a: Frac, b: Frac): Frac => norm([a[0] * b[1] + b[0] * a[1], a[1] * b[1]]);
const mul = (a: Frac, b: Frac): Frac => norm([a[0] * b[0], a[1] * b[1]]);
const str = ([n, d]: Frac) => (d === 1 ? String(n) : `${n}/${d}`);

const ALTER: Record<string, number> = { sharp: 1, flat: -1, natural: 0, doubleSharp: 2, doubleFlat: -2 };
const pitchName = (p: any, octShift = 0) => `${p.phonet.toUpperCase()}${(ALTER[p.accidental] ?? 0) >= 0 ? "+" : ""}${ALTER[p.accidental] ?? 0}${p.octave + 4 + octShift}`;
/** Whole octaves a clef moves sounding pitch by (-1 for treble_8, -2 for treble_15, +1 for treble^8). */
const clefOctaves = (clef: string | undefined): number => {
	if (!clef) return 0;
	const semi = clefSuffixSemitones(String(clef));
	return semi % 12 === 0 ? semi / 12 : 0;
};

/** quarterLength of a duration (ignores any tuplet; the caller applies tuplet ratios). */
const ql = (d: any): Frac => {
	let base: Frac = norm([4, d.division]);
	let dot: Frac = base;
	for (let i = 0; i < (d.dots || 0); i++) {
		dot = mul(dot, [1, 2]);
		base = add(base, dot);
	}
	if (d.tuplet) base = mul(base, [d.tuplet.numerator, d.tuplet.denominator]);
	return base;
};

export const dumpNotes = (doc: LilyletDoc) => {
	// Staves per part over the whole piece.
	const nParts = Math.max(...doc.measures.map(m => m.parts.length));
	const partStaves: number[] = new Array(nParts).fill(1);
	const staffOf = (v: any) => {
		let s = v.staff || 1, max = s;
		const walk = (evs: any[]) => evs.forEach(e => {
			if (e.type === "context" && e.staff) { s = e.staff; max = Math.max(max, s); }
			if (e.type === "tuplet" || e.type === "times") walk(e.events);
		});
		walk(v.events);
		return max;
	};
	doc.measures.forEach(m => m.parts.forEach((p, pi) => p.voices.forEach(v => {
		partStaves[pi] = Math.max(partStaves[pi], staffOf(v));
	})));
	const base: number[] = [];
	partStaves.reduce((acc, n, i) => { base[i] = acc; return acc + n; }, 0);
	const total = partStaves.reduce((a, b) => a + b, 0);
	const staves = Array.from({ length: total }, () => ({ notes: [] as any[] }));

	let time: Frac = [4, 1];
	const clefOf = new Map<string, number>();   // "part:staff" -> octave shift of the clef in force
	doc.measures.forEach((m, mi) => {
		if (m.timeSig) time = norm([m.timeSig.numerator * 4, m.timeSig.denominator]);
		m.parts.forEach((p, pi) => p.voices.forEach(v => {
			let staff = v.staff || 1;
			let off: Frac = [0, 1];
			const shift = (st: number) => clefOf.get(`${pi}:${st}`) ?? 0;
			const walk = (evs: any[], ratio: Frac) => {
				for (const e of evs) {
					if (e.type === "context") {
						if (e.staff) staff = e.staff;
						if (e.clef) clefOf.set(`${pi}:${e.staff || staff}`, clefOctaves(e.clef));
						if (e.time) time = norm([e.time.numerator * 4, e.time.denominator]);
					} else if (e.type === "tuplet" || e.type === "times") {
						walk(e.events, mul(ratio, [e.ratio.numerator, e.ratio.denominator]));
					} else if (e.type === "note") {
						const s = base[pi] + (e.staff || staff) - 1;
						const d = mul(ql(e.duration), ratio);
						const ps = e.pitches.map((x: any) => pitchName(x, shift(e.staff || staff))).sort();
						staves[s].notes.push([mi, str(off), ps, e.grace ? "0" : str(d), !!e.grace]);
						if (!e.grace) off = add(off, d);
					} else if (e.type === "rest") {
						off = add(off, e.fullMeasure ? time : mul(ql(e.duration), ratio));
					} else if (e.type === "tremolo") {
						// \repeat tremolo n { a b }: n alternations of two notes of `division`.
						const d: Frac = norm([4 * e.count, e.division]);
						const s = base[pi] + staff - 1;
						staves[s].notes.push([mi, str(off), e.pitchA.map((x: any) => pitchName(x, shift(staff))).sort(), str(d), false]);
						staves[s].notes.push([mi, str(add(off, d)), e.pitchB.map((x: any) => pitchName(x, shift(staff))).sort(), str(d), false]);
						off = add(off, mul(d, [2, 1]));
					}
				}
			};
			walk(v.events, [1, 1]);
		}));
	});
	return staves;
};

/**
 * Chord symbols of a parsed doc: [partIdx, staff, measureIdx, onset, text], where onset
 * is that of the event the symbol is attached to (`\chords` follows its event).
 */
export const dumpHarmonies = (doc: LilyletDoc) => {
	const out: any[] = [];
	let time: Frac = [4, 1];
	doc.measures.forEach((m, mi) => {
		if (m.timeSig) time = norm([m.timeSig.numerator * 4, m.timeSig.denominator]);
		m.parts.forEach((p, pi) => p.voices.forEach(v => {
			let staff = v.staff || 1, off: Frac = [0, 1];
			let last: { on: Frac; staff: number } | null = null;
			for (const e of v.events as any[]) {
				if (e.type === "context" && e.staff) staff = e.staff;
				else if (e.type === "harmony") out.push([pi, last ? last.staff : staff, mi, str(last ? last.on : off), e.text]);
				else if (e.type === "note" || e.type === "rest" || e.type === "tuplet" || e.type === "tremolo") {
					if (e.grace) continue;
					last = { on: off, staff: e.staff || staff };
					let d: Frac;
					if (e.type === "tuplet") {
						d = [0, 1];
						for (const x of e.events) if (x.duration && !x.grace) d = add(d, ql(x.duration));
						d = mul(d, [e.ratio.numerator, e.ratio.denominator]);
					} else if (e.type === "tremolo") d = norm([8 * e.count, e.division]);
					else if (e.type === "rest" && e.fullMeasure) d = time;
					else d = ql(e.duration);
					off = add(off, d);
				}
			}
		}));
	});
	return out;
};

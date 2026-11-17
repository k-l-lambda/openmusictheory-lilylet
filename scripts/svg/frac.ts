// Exact rational arithmetic for durations and onsets (fractions of a whole note).
export type Frac = [number, number];
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
export const frac = (n: number, d = 1): Frac => {
  if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error(`Invalid fraction ${n}/${d}`);
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return [(s * n) / g, (s * d) / g];
};
export const ZERO: Frac = [0, 1];
export const add = (a: Frac, b: Frac): Frac => frac(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
export const sub = (a: Frac, b: Frac): Frac => frac(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
export const mul = (a: Frac, b: Frac): Frac => frac(a[0] * b[0], a[1] * b[1]);
export const div = (a: Frac, b: Frac): Frac => frac(a[0] * b[1], a[1] * b[0]);
export const cmp = (a: Frac, b: Frac): number => a[0] * b[1] - b[0] * a[1];
export const eq = (a: Frac, b: Frac) => cmp(a, b) === 0;
export const toNumber = (a: Frac) => a[0] / a[1];
export const str = (a: Frac) => (a[1] === 1 ? String(a[0]) : `${a[0]}/${a[1]}`);
export const isPow2 = (n: number) => n > 0 && (n & (n - 1)) === 0;

/** Written duration of `division` (−1 breve, 0 whole, 1 half, 2 quarter, …) with dots. */
export const noteValue = (division: number, dots = 0): Frac => {
  let base: Frac = division < 0 ? frac(2) : frac(1, 2 ** division);
  let total = base;
  for (let i = 0; i < dots; i++) { base = mul(base, frac(1, 2)); total = add(total, base); }
  return total;
};

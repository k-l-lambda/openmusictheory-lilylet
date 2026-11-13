// SVG path geometry in source viewBox units. No rasterization or note inference here.
export type Point = { x: number; y: number };
export type Bounds = { left: number; top: number; right: number; bottom: number };
export type Matrix = [number, number, number, number, number, number];
export type Subpath = { start: Point; end: Point; bounds: Bounds; closed: boolean; commands: string[] };
const identity: Matrix = [1, 0, 0, 1, 0, 0];
export const apply = (m: Matrix, p: Point): Point => ({ x: m[0] * p.x + m[2] * p.y + m[4], y: m[1] * p.x + m[3] * p.y + m[5] });
export const multiply = (a: Matrix, b: Matrix): Matrix => [
  a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1],
  a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3],
  a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5],
];
const number = /[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g;
export function parseTransform(value = ''): Matrix {
  let result = identity;
  const functions = /([a-zA-Z]+)\s*\(([^)]*)\)/g;
  let match: RegExpExecArray | null;
  let last = 0;
  while ((match = functions.exec(value))) {
    if (value.slice(last, match.index).trim()) throw new Error(`Unsupported SVG transform: ${value}`);
    last = functions.lastIndex;
    const v = [...match[2].matchAll(number)].map(m => Number(m[0]));
    const [x = 0, y = 0] = v;
    let t: Matrix;
    switch (match[1]) {
      case 'matrix': if (v.length !== 6) throw new Error('Invalid matrix transform'); t = v as Matrix; break;
      case 'translate': t = [1, 0, 0, 1, x, v.length === 1 ? 0 : y]; break;
      case 'scale': t = [x, 0, 0, v.length === 1 ? x : y, 0, 0]; break;
      case 'rotate': {
        const a = x * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
        const r: Matrix = [c, s, -s, c, 0, 0];
        t = v.length === 3 ? multiply(multiply([1, 0, 0, 1, y, v[2]], r), [1, 0, 0, 1, -y, -v[2]]) : r;
        break;
      }
      case 'skewX': t = [1, 0, Math.tan(x * Math.PI / 180), 1, 0, 0]; break;
      case 'skewY': t = [1, Math.tan(x * Math.PI / 180), 0, 1, 0, 0]; break;
      default: throw new Error(`Unsupported SVG transform: ${match[1]}`);
    }
    result = multiply(result, t);
  }
  if (value.slice(last).trim()) throw new Error(`Unsupported SVG transform: ${value}`);
  return result;
}
const parameters: Record<string, number> = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
const tokens = /[MmLlHhVvCcSsQqTtZzAa]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g;
const isCommand = (s: string) => /^[a-zA-Z]$/.test(s);
export function boundsOf(subpaths: Subpath[]): Bounds {
  return subpaths.reduce((r, p) => ({ left: Math.min(r.left, p.bounds.left), right: Math.max(r.right, p.bounds.right), top: Math.min(r.top, p.bounds.top), bottom: Math.max(r.bottom, p.bounds.bottom) }), { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity });
}
export function center(b: Bounds): Point { return { x: (b.left + b.right) / 2, y: (b.top + b.bottom) / 2 }; }
export function parsePath(d: string, transform: Matrix = identity): Subpath[] {
  const parts = d.match(tokens) || [];
  // Validate the entire path rather than silently dropping unsupported SVG commands.
  if (d.replace(tokens, '').replace(/[\s,]/g, '')) throw new Error('Invalid SVG path data');
  const out: Subpath[] = [];
  let i = 0, command = '', previous = '', current: Point = { x: 0, y: 0 }, start: Point = current;
  let c2: Point | undefined, q1: Point | undefined, active: Subpath | undefined;
  const mark = (p: Point) => {
    const v = apply(transform, p);
    if (!active) throw new Error('SVG path must begin with M');
    active.bounds.left = Math.min(active.bounds.left, v.x);
    active.bounds.right = Math.max(active.bounds.right, v.x);
    active.bounds.top = Math.min(active.bounds.top, v.y);
    active.bounds.bottom = Math.max(active.bounds.bottom, v.y);
    active.end = v;
  };
  const point = (v: number[], n: number, relative: boolean): Point => ({ x: v[n] + (relative ? current.x : 0), y: v[n + 1] + (relative ? current.y : 0) });
  // Exact extrema of quadratic/cubic Beziers, then apply affine transforms at those parameters.
  const bezier = (p: Point[], degree: 2 | 3) => {
    const at = (t: number): Point => degree === 2 ? {
      x: (1-t)**2*p[0].x + 2*(1-t)*t*p[1].x + t*t*p[2].x,
      y: (1-t)**2*p[0].y + 2*(1-t)*t*p[1].y + t*t*p[2].y,
    } : {
      x: (1-t)**3*p[0].x + 3*(1-t)**2*t*p[1].x + 3*(1-t)*t*t*p[2].x + t**3*p[3].x,
      y: (1-t)**3*p[0].y + 3*(1-t)**2*t*p[1].y + 3*(1-t)*t*t*p[2].y + t**3*p[3].y,
    };
    const transformed = p.map(v => apply(transform, v));
    const ts = [0, 1];
    for (const axis of ['x', 'y'] as const) {
      const a = transformed.map(p => p[axis]);
      if (degree === 2) {
        const denom = a[0] - 2*a[1] + a[2];
        if (Math.abs(denom) > 1e-12) ts.push((a[0] - a[1]) / denom);
      } else {
        const A = -a[0] + 3*a[1] - 3*a[2] + a[3], B = 2*(a[0] - 2*a[1] + a[2]), C = a[1] - a[0];
        if (Math.abs(A) < 1e-12) { if (Math.abs(B) > 1e-12) ts.push(-C/B); }
        else { const delta = B*B - 4*A*C; if (delta >= 0) { ts.push((-B + Math.sqrt(delta))/(2*A), (-B - Math.sqrt(delta))/(2*A)); } }
      }
    }
    ts.filter(t => t >= 0 && t <= 1).forEach(t => mark(at(t)));
  };
  // Convert endpoint-parameterized SVG arcs to a center and test the transformed extrema.
  const arc = (from: Point, to: Point, v: number[]) => {
    let [rx, ry, degrees, large, sweep] = v;
    rx = Math.abs(rx); ry = Math.abs(ry);
    if (!rx || !ry || (from.x === to.x && from.y === to.y)) { mark(to); return; }
    if (![0, 1].includes(large) || ![0, 1].includes(sweep)) throw new Error('Invalid SVG arc flags');
    const phi = degrees * Math.PI / 180, c = Math.cos(phi), s = Math.sin(phi);
    const dx = (from.x - to.x)/2, dy = (from.y - to.y)/2;
    const xp = c*dx + s*dy, yp = -s*dx + c*dy;
    const size = xp*xp/(rx*rx) + yp*yp/(ry*ry);
    if (size > 1) { rx *= Math.sqrt(size); ry *= Math.sqrt(size); }
    const k = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, (rx*rx*ry*ry - rx*rx*yp*yp - ry*ry*xp*xp)/(rx*rx*yp*yp + ry*ry*xp*xp)));
    const cxp = k*rx*yp/ry, cyp = -k*ry*xp/rx;
    const cx = c*cxp - s*cyp + (from.x + to.x)/2;
    const cy = s*cxp + c*cyp + (from.y + to.y)/2;
    const angle = (x: number, y: number) => Math.atan2(y, x);
    const first = angle((xp - cxp)/rx, (yp - cyp)/ry);
    let delta = angle((-xp - cxp)/rx, (-yp - cyp)/ry) - first;
    if (sweep && delta < 0) delta += 2*Math.PI;
    if (!sweep && delta > 0) delta -= 2*Math.PI;
    const ux = c*rx, vx = -s*ry, uy = s*rx, vy = c*ry;
    const A = transform[0]*ux + transform[2]*uy, B = transform[0]*vx + transform[2]*vy;
    const C = transform[1]*ux + transform[3]*uy, D = transform[1]*vx + transform[3]*vy;
    const candidates = [first, first + delta, Math.atan2(B, A), Math.atan2(B, A) + Math.PI, Math.atan2(D, C), Math.atan2(D, C) + Math.PI];
    for (const candidate of candidates) {
      let step = (candidate - first) % (2*Math.PI);
      if (step < 0) step += 2*Math.PI;
      if ((sweep && step > delta + 1e-9) || (!sweep && step < 2*Math.PI + delta - 1e-9 && step > 1e-9)) continue;
      mark({ x: cx + ux*Math.cos(candidate) + vx*Math.sin(candidate), y: cy + uy*Math.cos(candidate) + vy*Math.sin(candidate) });
    }
    mark(to);
  };
  while (i < parts.length) {
    if (isCommand(parts[i])) command = parts[i++];
    if (!command) throw new Error('SVG path command missing');
    const upper = command.toUpperCase(), count = parameters[upper];
    if (count === undefined) throw new Error(`Unsupported SVG path command: ${command}`);
    if (upper === 'Z') {
      if (!active) throw new Error('Unexpected Z');
      active.closed = true; active.commands.push('Z'); current = start; mark(start);
      command = ''; previous = 'Z'; c2 = q1 = undefined;
      continue;
    }
    if (upper === 'A') {
      // Arc flags are single digits and SVG permits them to touch each other and x.
      const flag = parts[i + 3] || '';
      if (/^[01]{2}/.test(flag)) {
        const remainder = flag.slice(2);
        parts.splice(i + 3, 1, flag[0], flag[1], ...(remainder ? [remainder] : []));
      }
    }
    if (parts.slice(i, i + count).length !== count || parts.slice(i, i + count).some(isCommand)) throw new Error(`Invalid SVG path arguments for ${command}`);
    const v = parts.slice(i, i + count).map(Number); i += count;
    const relative = command !== upper, old = current;
    let next: Point;
    switch (upper) {
      case 'M':
        next = point(v, 0, relative); start = next;
        active = { start: apply(transform, next), end: apply(transform, next), bounds: { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity }, closed: false, commands: [] };
        out.push(active); mark(next); command = relative ? 'l' : 'L'; break;
      case 'L': next = point(v, 0, relative); mark(next); break;
      case 'H': next = { x: v[0] + (relative ? old.x : 0), y: old.y }; mark(next); break;
      case 'V': next = { x: old.x, y: v[0] + (relative ? old.y : 0) }; mark(next); break;
      case 'C': {
        const a = point(v, 0, relative), b = point(v, 2, relative); next = point(v, 4, relative);
        bezier([old, a, b, next], 3); c2 = b; break;
      }
      case 'S': {
        const a = ['C','S'].includes(previous) && c2 ? { x: 2*old.x - c2.x, y: 2*old.y - c2.y } : old;
        const b = point(v, 0, relative); next = point(v, 2, relative);
        bezier([old, a, b, next], 3); c2 = b; break;
      }
      case 'Q': {
        const a = point(v, 0, relative); next = point(v, 2, relative);
        bezier([old, a, next], 2); q1 = a; break;
      }
      case 'T': {
        const a = ['Q','T'].includes(previous) && q1 ? { x: 2*old.x - q1.x, y: 2*old.y - q1.y } : old;
        next = point(v, 0, relative); bezier([old, a, next], 2); q1 = a; break;
      }
      case 'A': {
        next = point(v, 5, relative); arc(old, next, v); break;
      }
      default: throw new Error(`Unsupported SVG path command: ${upper}`);
    }
    active!.commands.push(upper); current = next!;
    if (!['C', 'S'].includes(upper)) c2 = undefined;
    if (!['Q', 'T'].includes(upper)) q1 = undefined;
    previous = upper;
  }
  return out;
}

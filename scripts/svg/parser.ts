import { DOMParser } from '@xmldom/xmldom';
import { boundsOf, multiply, parsePath, parseTransform, type Bounds, type Matrix, type Subpath } from './geometry.js';

export type SvgElement = { sourceIndex: number; cls: string; d: string; style: Record<string, string>; subpaths: Subpath[]; bounds: Bounds };
export type SvgPage = { viewBox: Bounds; width: number; height: number; elements: SvgElement[] };
const IDENTITY: Matrix = [1, 0, 0, 1, 0, 0];
const numeric = /^([-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?)(?:px|mm|cm|pt|in)?$/;
function dimension(text: string): number {
  const match = text.trim().match(numeric);
  if (!match) throw new Error(`Invalid SVG dimension: ${text}`);
  return Number(match[1]);
}
export function parseMuseScoreSvg(xml: string): SvgPage {
  if (!xml.trimStart().startsWith('<')) throw new Error('Input is not an SVG XML document');
  const errors: string[] = [];
  const doc = new DOMParser({ errorHandler: { warning: (e: string) => errors.push(e), error: (e: string) => errors.push(e), fatalError: (e: string) => errors.push(e) } }).parseFromString(xml, 'image/svg+xml');
  const root = doc.documentElement;
  if (errors.length || root?.localName !== 'svg') throw new Error(`Invalid SVG XML: ${errors[0] || root?.nodeName || 'empty document'}`);
  const width = dimension(root.getAttribute('width') || ''), height = dimension(root.getAttribute('height') || '');
  const rawViewBox = root.getAttribute('viewBox')?.trim();
  const v = rawViewBox ? rawViewBox.split(/[\s,]+/).map(Number) : [0, 0, width, height];
  if (v.length !== 4 || v.some(n => !Number.isFinite(n)) || v[2] <= 0 || v[3] <= 0) throw new Error('Invalid SVG viewBox');
  const viewBox = { left: v[0], top: v[1], right: v[0] + v[2], bottom: v[1] + v[3] };
  const elements: SvgElement[] = [];
  let sourceIndex = 0;
  const walk = (node: Element, matrix: Matrix) => {
    const local = multiply(matrix, parseTransform(node.getAttribute('transform') || ''));
    if (node.localName === 'path') {
      const cls = node.getAttribute('class') || '';
      const d = node.getAttribute('d') || '';
      const style: Record<string, string> = {};
      for (const key of ['fill', 'stroke', 'stroke-width', 'fill-rule', 'opacity']) {
        const value = node.getAttribute(key); if (value !== null) style[key] = value;
      }
      const index = sourceIndex++;
      if (d) {
        const subpaths = parsePath(d, local);
        elements.push({ sourceIndex: index, cls, d, style, subpaths, bounds: boundsOf(subpaths) });
      }
    } else if (node.localName === 'image') {
      // Embedded images cannot supply notation semantics; keep their presence visible to diagnostics.
      sourceIndex++;
    } else if (!['svg', 'g', 'a'].includes(node.localName || '')) {
      throw new Error(`Unsupported SVG element: ${node.nodeName}`);
    }
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 1) walk(child as Element, local);
    }
  };
  walk(root as unknown as Element, IDENTITY);
  if (!elements.some(e => e.cls === 'StaffLines')) throw new Error('Not a MuseScore SVG with StaffLines');
  return { viewBox, width, height, elements };
}

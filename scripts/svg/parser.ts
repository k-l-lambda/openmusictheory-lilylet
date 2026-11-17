import { DOMParser } from '@xmldom/xmldom';
import { boundsOf, multiply, parsePath, parseTransform, type Bounds, type Matrix, type Subpath } from './geometry.js';

/**
 * One drawn path. Besides geometry the IR keeps every attribute, the element id,
 * and the ancestry of enclosing groups (`ancestors`, outermost first, as
 * `tag.class#id`), so recognizers can use provenance instead of re-deriving it.
 * `style` holds the effective presentation values (inherited from groups).
 */
export type SvgElement = {
  sourceIndex: number; cls: string; id?: string; d: string; style: Record<string, string>;
  attrs: Record<string, string>; ancestors: string[]; subpaths: Subpath[]; bounds: Bounds;
};
/** Nodes other than paths (images, text) that cannot supply notation geometry but must stay auditable. */
export type SvgOtherNode = { sourceIndex: number; tag: string; cls: string; attrs: Record<string, string>; text?: string };
export type SvgPage = { viewBox: Bounds; width: number; height: number; elements: SvgElement[]; others: SvgOtherNode[] };
const PRESENTATION = ['fill', 'stroke', 'stroke-width', 'fill-rule', 'opacity', 'fill-opacity', 'stroke-opacity', 'visibility', 'display'];
function attributesOf(node: Element): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < node.attributes.length; i++) {
    const a = node.attributes.item(i)!;
    if (a.name !== 'd') out[a.name] = a.value;
  }
  return out;
}
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
  const others: SvgOtherNode[] = [];
  let sourceIndex = 0;
  const walk = (node: Element, matrix: Matrix, inherited: Record<string, string>, ancestors: string[]) => {
    const local = multiply(matrix, parseTransform(node.getAttribute('transform') || ''));
    const style = { ...inherited };
    for (const key of PRESENTATION) {
      const value = node.getAttribute(key); if (value !== null) style[key] = value;
    }
    const tag = node.localName || '';
    const cls = node.getAttribute('class') || '';
    const id = node.getAttribute('id') || undefined;
    if (tag === 'path') {
      const d = node.getAttribute('d') || '';
      const index = sourceIndex++;
      if (d) {
        const subpaths = parsePath(d, local);
        elements.push({ sourceIndex: index, cls, id, d, style, attrs: attributesOf(node), ancestors, subpaths, bounds: boundsOf(subpaths) });
      }
    } else if (tag === 'image' || tag === 'text') {
      // Images and live text cannot supply notation geometry; keep them visible to diagnostics.
      others.push({ sourceIndex: sourceIndex++, tag, cls, attrs: attributesOf(node), text: tag === 'text' ? node.textContent || '' : undefined });
      return;
    } else if (['title', 'desc'].includes(tag)) {
      // Accessible SVG metadata has no drawing geometry or notation semantics.
      return;
    } else if (!['svg', 'g', 'a'].includes(tag)) {
      throw new Error(`Unsupported SVG element: ${node.nodeName}`);
    }
    const nextAncestors = tag === 'svg' ? ancestors : [...ancestors, `${tag}${cls ? '.' + cls : ''}${id ? '#' + id : ''}`];
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 1) walk(child as Element, local, style, nextAncestors);
    }
  };
  walk(root as unknown as Element, IDENTITY, {}, []);
  if (!elements.some(e => e.cls === 'StaffLines')) throw new Error('Not a MuseScore SVG with StaffLines');
  return { viewBox, width, height, elements, others };
}

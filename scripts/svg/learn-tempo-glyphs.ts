// Build the tempo-text glyph table from hand transcriptions.
//
//   node --import tsx scripts/svg/learn-tempo-glyphs.ts [--write]
//
// Every Tempo element of the corpus is segmented (text.ts); when its marks and
// character counts match tempo-transcriptions.json, each character's features
// are labelled with the transcribed character. Prints leave-one-file-out
// recognition accuracy (an estimate for unseen files of the same fonts), and with
// --write stores the examples in scripts/svg/tempo-glyphs.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseMuseScoreSvg } from './parser.js';
import { recoverLayout } from './layout.js';
import { charFeature, readMark, textMarks, type GlyphExample } from './text.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const transcriptions: Record<string, string[] | string> = JSON.parse(fs.readFileSync(path.join(here, 'tempo-transcriptions.json'), 'utf8'));
const tokens = (s: string) => s.replace(/\s+/g, '').match(/\{\d+\}|./gu) || [];

type Item = { key: string; file: string; examples: GlyphExample[]; marks: { mark: ReturnType<typeof textMarks>[number]; want: string }[] };
const items: Item[] = [];
for (const [key, value] of Object.entries(transcriptions)) {
  if (key.startsWith('_')) continue;
  const want = value as string[];
  const [file, index] = key.split('#');
  const page = parseMuseScoreSvg(fs.readFileSync(path.join(here, '../../musescore-svg', file), 'utf8'));
  const element = page.elements.find(e => e.sourceIndex === Number(index));
  if (!element) throw new Error(`${key}: element not found`);
  const marks = textMarks(element, recoverLayout(page)[0].spacing);
  if (marks.length !== want.length || marks.some((m, i) => m.chars.length !== tokens(want[i]).length)) {
    console.log(`skip ${key}: segmentation ${marks.map(m => m.chars.length).join('/')} vs transcription ${want.map(w => tokens(w).length).join('/')}`);
    continue;
  }
  const examples: GlyphExample[] = [];
  marks.forEach((m, i) => tokens(want[i]).forEach((ch, k) => examples.push({ ...charFeature(m.chars[k], m), ch })));
  items.push({ key, file, examples, marks: marks.map((mark, i) => ({ mark, want: want[i] })) });
}

// leave-one-file-out estimate
let chars = 0, correct = 0, marksOk = 0, marksTotal = 0;
for (const it of items) {
  const table = items.filter(o => o.file !== it.file).flatMap(o => o.examples);
  for (const { mark, want } of it.marks) {
    const got = readMark(mark, table).text;
    const w = tokens(want), g = tokens(got.replace(/\?/g, '¿'));
    chars += w.length;
    w.forEach((ch, i) => { if (g[i] === ch) correct++; });
    marksTotal++;
    if (got.replace(/\s+/g, ' ') === want.replace(/\s+/g, ' ')) marksOk++;
    else if (process.argv.includes('--verbose')) console.log(`  ${it.key}: "${got}" vs "${want}"`);
  }
}
console.log(`${items.length} elements, ${items.reduce((n, i) => n + i.examples.length, 0)} labelled characters`);
console.log(`leave-one-file-out: characters ${correct}/${chars} (${((100 * correct) / chars).toFixed(1)}%), marks exact ${marksOk}/${marksTotal}`);
// self-consistency with the full table
let selfOk = 0;
const all = items.flatMap(i => i.examples);
for (const it of items) for (const { mark, want } of it.marks) {
  const got = readMark(mark, all).text;
  if (got.replace(/\s+/g, ' ') === want.replace(/\s+/g, ' ')) selfOk++; else console.log(`  self: ${it.key} "${got}" vs "${want}"`);
}
console.log(`full table: marks exact ${selfOk}/${marksTotal}`);
if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(here, 'tempo-glyphs.json'), JSON.stringify(all.map(e => ({ ...e, a: +e.a.toFixed(3), h: +e.h.toFixed(3), y: +e.y.toFixed(3) }))) + '\n');
  console.log('wrote scripts/svg/tempo-glyphs.json');
}

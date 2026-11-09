#!/usr/bin/env python3
"""Insert the lilylet transcriptions into the v2 chapters (idempotent).

    python3 scripts/v2/embed.py            # rewrite chapters + v2/lilylet/README.md
    python3 scripts/v2/embed.py --check    # exit 1 if anything would change

Sources:
  v2/lilylet/MANIFEST.json         one row per score file (scripts/v2/scores/build_manifest.py)
  v2/lilylet/images/MANIFEST.json  image transcriptions {images: [{image, lyl, chapter, status}]};
                                   optional, rows without a .lyl or with status failed/skipped ignored

Each block goes after the link to the score file (or after the `![…](…png)` line of the
image) and is fenced by marker comments, so a rerun replaces it:

    <!-- lilylet-begin: media/2022/08/I-Solutions.mscz -->
    …
    <!-- lilylet-end -->

The block is placed after the whole Markdown block holding the link: right after a list
item (indented to its content), or after the blank line that ends a table / paragraph,
so it never splits a list or table and stripping the blocks restores the text exactly.
Short scores (<= INLINE_MAX_BARS) are inlined as ```lyl.play; long ones, the 48 WTC
subjects (one link per split file) and every file linked from a table get a link line.
A file referenced twice in a chapter is inlined only after the first link.
Scores not referenced by any chapter are listed in v2/lilylet/README.md.

scripts/v2/convert.py calls run() at its end, so regenerating the chapters keeps the blocks.
"""
import argparse, json, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
V2 = os.path.join(ROOT, 'v2')
LYL_DIR = os.path.join(V2, 'lilylet')
INLINE_MAX_BARS = 40
SKIP_STATUS = re.compile(r'^(failed|skip|todo|pending|error)', re.I)
BEGIN = '<!-- lilylet-begin: {} -->'
END = '<!-- lilylet-end -->'
BLOCK_RE = re.compile(r'^[ \t]*<!-- lilylet-begin: .*? -->\n(?:.*\n)*?[ \t]*<!-- lilylet-end -->\n', re.M)

CATEGORY_TITLE = {
    'counterpoint-fux': 'Fux counterpoint', 'fugue-subjects': 'Fugue subjects',
    'counterpoint-16th-century': '16th-century counterpoint', 'counterpoint-species': 'Species counterpoint',
    'jazz': 'Jazz', 'chromatic-harmony': 'Chromatic harmony', 'diatonic-harmony': 'Diatonic harmony',
    'rhythm-meter': 'Rhythm and meter', 'popular-music': 'Popular music', 'form': 'Form',
    'post-tonal': 'Post-tonal', 'fundamentals': 'Fundamentals',
}


def load(p):
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else None


def rel_link(chapter, target):
    """Link from v2/<chapter> to the repo path `target` (both relative to the repo)."""
    return os.path.relpath(os.path.join(ROOT, target), os.path.dirname(os.path.join(V2, chapter))).replace(os.sep, '/')


def lyl_title(path):
    m = re.search(r'^\[title "((?:[^"\\]|\\.)*)"\]', open(os.path.join(ROOT, path), encoding='utf-8').read(), re.M)
    return m.group(1) if m else os.path.basename(path)


def split_files(lyl):
    d = os.path.join(ROOT, lyl[:-len('.lyl')])
    return sorted(os.path.join(lyl[:-len('.lyl')], f) for f in os.listdir(d) if f.endswith('.lyl')) if os.path.isdir(d) else []


def block_end(lines, i):
    """Index after the Markdown block that contains line i, and the indent for an
    insertion there: table -> after the last row; list item -> after its continuation
    lines (indented to the item's content); paragraph -> before the next blank line."""
    line = lines[i]
    if line.lstrip().startswith('|'):
        j = i
        while j + 1 < len(lines) and lines[j + 1].lstrip().startswith('|'):
            j += 1
        j += 1
        if j < len(lines) - 1 and not lines[j].strip():
            j += 1   # after the blank line that ends the table: never touches the table itself
        return j, '', 'table'
    m = re.match(r'^(\s*)(\d+[.)]|[-*+])(\s+)', line)
    if m:
        # content column of the item (tabs count to the next multiple of 4, as in CommonMark)
        col = len(m.group(1).expandtabs(4)) + len(m.group(2)) + len(m.group(3).expandtabs(4))
        indent = ' ' * col
        lead = lambda l: len(re.match(r'^\s*', l).group(0).expandtabs(4))
        j = i
        while j + 1 < len(lines) and lines[j + 1].strip() and lead(lines[j + 1]) >= col \
                and not lines[j + 1].lstrip().startswith('<!-- lilylet-begin'):
            j += 1
        return j + 1, indent, 'list'
    j = i
    while j + 1 < len(lines) and lines[j + 1].strip() and not re.match(r'^\s*(#|>|```|\||<!--)', lines[j + 1]):
        j += 1
    j += 1
    indent = re.match(r'^\s*', line).group(0)
    if not indent and j < len(lines) - 1 and not lines[j].strip():
        j += 1
    return j, indent, 'para'


def score_block(r, chapter, mode):
    """Lines of the block for score row r (no indent); mode 'inline' or 'link'."""
    src = r['source'][len('v2/'):]
    name = os.path.basename(src)
    out = [BEGIN.format(src)]
    link = rel_link(chapter, r['lyl'])
    splits = split_files(r['lyl'])
    if splits:
        out.append(f'Lilylet transcription of {name}: [{os.path.basename(r["lyl"])}]({link}) ({r["bars"]} bars), '
                   f'and one file per subject:')
        for p in splits:
            t = re.sub(r'^Bach, Well-Tempered Clavier ', 'WTC ', lyl_title(p))
            out.append(f'- [{t}]({rel_link(chapter, p)})')
    elif mode == 'inline':
        out.append(f'Lilylet transcription of {name} ([{os.path.basename(r["lyl"])}]({link})):')
        out.append('')
        out.append('```lyl.play')
        out += open(os.path.join(ROOT, r['lyl']), encoding='utf-8').read().rstrip('\n').split('\n')
        out.append('```')
    else:
        out.append(f'Lilylet transcription of {name}: [{os.path.basename(r["lyl"])}]({link}) ({r["bars"]} bars).')
    out.append(END)
    return out


def image_block(r, chapter):
    out = [BEGIN.format(r['image'][len('v2/'):]), f'Lilylet transcription of the example above '
           f'([{os.path.basename(r["lyl"])}]({rel_link(chapter, r["lyl"])})):', '']
    p = os.path.join(ROOT, r['lyl'])
    code = open(p, encoding='utf-8').read().rstrip('\n')
    if r['lyl'].endswith('.md'):
        # a markdown source holds its own ```lyl blocks and text: keep it as is
        out += [re.sub(r'^```[ \t]*(lyl|lilylet)[ \t]*$', '```lyl.play', l) for l in code.split('\n')]
    else:
        out += ['```lyl.play'] + code.split('\n') + ['```']
    out.append(END)
    return out


def plan(chapters_rows, image_rows):
    """{chapter: [(kind, row)]} of everything that may go into each chapter."""
    by_ch = {}
    for r in chapters_rows:
        for ch in r['chapters']:
            by_ch.setdefault(ch, []).append(('score', r))
    for r in image_rows:
        ch = r.get('chapter')
        if ch:
            by_ch.setdefault(ch, []).append(('image', r))
    return by_ch


def embed_text(text, chapter, items, inlined_elsewhere, stats):
    text = BLOCK_RE.sub('', text)
    lines = text.split('\n')
    inserts = {}   # line index -> [(order, indent, block lines)]
    seen = set()
    for kind, r in items:
        if kind == 'score':
            key = r['source'][len('v2/'):]
            pat = re.compile(r'\]\(\.\./(?:\.\./)*' + re.escape(key) + r'\)')
        else:
            key = r['image'][len('v2/'):]
            pat = re.compile(r'^\s*!\[[^\]]*\]\((?:\.\./)*' + re.escape(key) + r'\)')
        hit = next((i for i, l in enumerate(lines) if pat.search(l)), None)
        if hit is None or key in seen:
            stats['not-found' if hit is None else 'dup'] += 1
            continue
        seen.add(key)
        at, indent, ctx = block_end(lines, hit)
        if kind == 'image':
            blk = image_block(r, chapter)
            stats['images'] += 1
        else:
            short = (r.get('bars') or 0) <= INLINE_MAX_BARS and not split_files(r['lyl'])
            mode = 'inline' if short and ctx != 'table' and not (chapter.startswith('13-workbook/') and inlined_elsewhere(r)) else 'link'
            blk = score_block(r, chapter, mode)
            stats['wtc' if split_files(r['lyl']) else mode] += 1
        col = lines[hit].find(key) if kind == 'score' else 0
        inserts.setdefault(at, []).append(((hit, col), indent, blk))
    out = []
    for i in range(len(lines) + 1):
        for _, indent, blk in sorted(inserts.get(i, []), key=lambda x: x[0]):
            out += [(indent + l) if l else '' for l in blk]
        if i < len(lines):
            out.append(lines[i])
    return '\n'.join(out)


def readme(rows):
    un = [r for r in rows if r['unreferenced']]
    conv = [r for r in un if r.get('lyl')]
    md = ['# Lilylet transcriptions of OMT 2nd edition (v2)', '',
          'Score files of the 2nd edition converted to lilylet: one `.lyl` per source file, under the same '
          '`YYYY/MM/` path as in `v2/media/`. [MANIFEST.md](MANIFEST.md) gives the status and notes of every file. '
          'Files linked from a chapter are embedded in it by `scripts/v2/embed.py` (inline when short, as a link '
          'otherwise).', '',
          f'The {len(conv)} files below are on Pressbooks but not linked from any chapter.', '']
    for cat, title in CATEGORY_TITLE.items():
        rs = sorted((r for r in conv if r['category'] == cat), key=lambda r: r['source'])
        if not rs:
            continue
        md += [f'## {title}', '', '| file | kind | bars |', '|---|---|---|']
        for r in rs:
            md.append(f"| [{os.path.basename(r['lyl'])}]({r['lyl'][len('v2/lilylet/'):]}) | {r['kind']} | {r.get('bars') or ''} |")
        md.append('')
    sk = sorted((r for r in un if not r.get('lyl')), key=lambda r: r['source'])
    if sk:
        md += ['## Not converted', '', f'{len(sk)} more unreferenced uploads have no `.lyl`: ' +
               ', '.join(f"{os.path.basename(r['source'])} ({r['status']})" for r in sk) + '.', '']
    return '\n'.join(md)


def run(check=False, quiet=False, images=True):
    man = load(os.path.join(LYL_DIR, 'MANIFEST.json'))
    if not man:
        if not quiet:
            print('embed: no v2/lilylet/MANIFEST.json, nothing to do')
        return 0
    rows = man['files']
    usable = [r for r in rows if r.get('lyl') and not SKIP_STATUS.match(r['status']) and os.path.exists(os.path.join(ROOT, r['lyl']))]
    img = load(os.path.join(LYL_DIR, 'images', 'MANIFEST.json')) if images else None
    img_rows = []
    if img:
        mats = load(os.path.join(V2, 'materials.json')) or {'materials': []}
        img_ch = {}
        for m in mats['materials']:
            if m['type'] == 'image' and m.get('local') and m.get('chapter'):
                img_ch.setdefault('v2/' + m['local'], m['chapter'])
        for r in (img if isinstance(img, list) else img.get('images') or img.get('files') or []):
            if r.get('lyl') and r.get('image') and not SKIP_STATUS.match(str(r.get('status', ''))) \
                    and os.path.exists(os.path.join(ROOT, r['lyl'])):
                img_rows.append(dict(r, chapter=r.get('chapter') or img_ch.get(r['image'])))
    by_ch = plan(usable, img_rows)

    # A file inlined in a topical chapter is only linked from the workbook index.
    def inlined_elsewhere(r):
        return any(not c.startswith('13-workbook/') for c in r['chapters'])

    stats = {'inline': 0, 'link': 0, 'wtc': 0, 'images': 0, 'not-found': 0, 'dup': 0}
    changed = []
    chapters = set(by_ch)
    # chapters that still hold blocks of files no longer listed
    for dp, _, fs in os.walk(V2):
        if os.path.relpath(dp, V2).split(os.sep)[0] in ('media', 'lilylet'):
            continue
        for f in fs:
            if f.endswith('.md'):
                p = os.path.join(dp, f)
                if '<!-- lilylet-begin:' in open(p, encoding='utf-8').read():
                    chapters.add(os.path.relpath(p, V2).replace(os.sep, '/'))
    for ch in sorted(chapters):
        p = os.path.join(V2, ch)
        if not os.path.exists(p):
            continue
        old = open(p, encoding='utf-8').read()
        new = embed_text(old, ch, by_ch.get(ch, []), inlined_elsewhere, stats)
        if new != old:
            changed.append(ch)
            if not check:
                open(p, 'w', encoding='utf-8').write(new)
    rp = os.path.join(LYL_DIR, 'README.md')
    rd = readme(rows)
    if not os.path.exists(rp) or open(rp, encoding='utf-8').read() != rd:
        changed.append('lilylet/README.md')
        if not check:
            open(rp, 'w', encoding='utf-8').write(rd)
    if not quiet or changed:
        verb = 'would change' if check else 'changed'
        print(f"embed: {len(chapters)} chapters; blocks: {stats['inline']} inline, {stats['link']} link, "
              f"{stats['wtc']} WTC list, {stats['images']} image; {stats['not-found']} links not found; "
              f"{verb} {len(changed)} files")
        for c in changed:
            print('  ', c)
    return 1 if (check and changed) else 0


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--check', action='store_true', help='report what would change, exit 1 if anything would')
    ap.add_argument('--no-images', action='store_true', help='embed score files only; leave out (and remove) image transcriptions')
    a = ap.parse_args()
    sys.exit(run(check=a.check, images=not a.no_images))

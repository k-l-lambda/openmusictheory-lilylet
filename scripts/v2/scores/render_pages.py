#!/usr/bin/env python3
"""MuseScore's own rendering of every v2 score file, for the visual review (omr-review/v2.html).

    python3 scripts/v2/scores/render_pages.py [--out omr-review/v2-renders] [--only SUBSTR] [--force]

For each source in v2/lilylet/MANIFEST.json (mscz/mscx/musicxml): page PNGs and the bars on
each page (MuseScore's .mpos measure positions). Files saved by MuseScore 4.7 are rendered
from the copy re-stamped as 4.60 (to_musicxml.downgrade), as they were converted.
Writes <out>/<YYYY/MM/base>-N.png (white background, 1400 px wide) and
<out>/<YYYY/MM/base>.json = {source, pages: [{png, bars: [first, last]}]} (bars 1-based,
counted in order like the manifest). Files already rendered are skipped (--force redoes them).
"""
import argparse, json, os, re, shutil, subprocess, tempfile, zipfile
import xml.etree.ElementTree as ET
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
MSCORE = os.environ.get('MSCORE', '/home/camus/bin/squashfs-root/AppRun')
WIDTH = 1400

ap = argparse.ArgumentParser()
ap.add_argument('--out', default=os.path.join(ROOT, 'omr-review', 'v2-renders'))
ap.add_argument('--only', default=None)
ap.add_argument('--force', action='store_true')
a = ap.parse_args()


def mscx_text(src):
    if src.endswith('.mscx'):
        return open(src, encoding='utf-8').read()
    with zipfile.ZipFile(src) as z:
        return z.read(next(n for n in z.namelist() if n.endswith('.mscx') and '/' not in n)).decode('utf-8')


def restamp(src, tmp):
    """A copy MuseScore 4.6.5 opens: files saved by 4.7 re-stamped as 4.60 (same edit as
    to_musicxml.downgrade). Returns (path, was_47)."""
    if not src.endswith(('.mscz', '.mscx')):
        return src, False
    try:
        x = mscx_text(src)
    except Exception:
        return None, False
    m = re.search(r'<museScore version="(\d+\.\d+)', x)
    if not (m and m.group(1).startswith('4.7')):
        return src, False
    x = re.sub(r'<museScore version="4\.7\d*"', '<museScore version="4.60"', x, count=1)
    x = re.sub(r'<programVersion>4\.7[^<]*', '<programVersion>4.6.5', x, count=1)
    out = os.path.join(tmp, os.path.basename(src).rsplit('.', 1)[0] + '.mscx')
    open(out, 'w', encoding='utf-8').write(x)
    return out, True


rows = json.load(open(os.path.join(ROOT, 'v2', 'lilylet', 'MANIFEST.json')))['files']
tmp = tempfile.mkdtemp(prefix='omt-v2-render-')
jobs, todo = [], []
for r in rows:
    src = os.path.join(ROOT, r['source'])
    if a.only and a.only not in r['source'] or not os.path.exists(src):
        continue
    rel = r['source'][len('v2/media/'):].rsplit('.', 1)[0]
    idx = os.path.join(a.out, rel + '.json')
    if os.path.exists(idx) and not a.force:
        continue
    stamp_dir = os.path.join(tmp, 'restamped', os.path.dirname(rel))
    os.makedirs(stamp_dir, exist_ok=True)
    path, new = restamp(src, stamp_dir)
    if path is None:
        continue
    base = os.path.join(tmp, 'out', rel)
    os.makedirs(os.path.dirname(base), exist_ok=True)
    jobs.append({'in': path, 'out': [base + '.png', base + '.mpos']})
    todo.append((r, rel, base, new))
print(len(jobs), 'files to render')
if jobs:
    jf = os.path.join(tmp, 'job.json')
    json.dump(jobs, open(jf, 'w'))
    subprocess.run(['xvfb-run', '-a', MSCORE, '-j', jf], capture_output=True, text=True)

n_ok = 0
for r, rel, base, new in todo:
    pngs = []
    k = 1
    while os.path.exists(f'{base}-{k}.png'):
        pngs.append(f'{base}-{k}.png')
        k += 1
    if not pngs:
        print('no render:', rel)
        continue
    # bars per page from the measure positions (element id = measure index, page 0-based)
    bars = {}
    if os.path.exists(base + '.mpos'):
        for e in ET.parse(base + '.mpos').getroot().iter('element'):
            p, i = int(e.get('page')), int(e.get('id'))
            lo, hi = bars.get(p, (i, i))
            bars[p] = (min(lo, i), max(hi, i))
    dst = os.path.join(a.out, rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    pages = []
    for i, p in enumerate(pngs):
        im = Image.open(p).convert('RGBA')
        bg = Image.new('RGB', im.size, 'white')
        bg.paste(im, mask=im.split()[3])
        if bg.width > WIDTH:
            bg = bg.resize((WIDTH, round(bg.height * WIDTH / bg.width)), Image.LANCZOS)
        out = f'{dst}-{i + 1}.png'
        bg.save(out, optimize=True)
        b = bars.get(i)
        pages.append({'png': os.path.basename(out), 'bars': [b[0] + 1, b[1] + 1] if b else None})
    json.dump({'source': r['source'], 'restamped': new, 'pages': pages}, open(dst + '.json', 'w'))
    n_ok += 1
shutil.rmtree(tmp, ignore_errors=True)
print(n_ok, 'rendered into', os.path.relpath(a.out, ROOT))

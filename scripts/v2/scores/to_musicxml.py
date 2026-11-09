#!/usr/bin/env python3
"""Step 1: convert every inventoried mscz/mscx to MusicXML (+ PNG pages) with MuseScore 4.

    python3 scripts/v2/scores/to_musicxml.py [--work /tmp/omt-v2-scores] [--png] [--only SUBSTR]

Output: <work>/xml/YYYY/MM/<base>.musicxml, <work>/png/YYYY/MM/<base>-N.png.
Uses one MuseScore batch job (-j) so the AppImage starts once. MuseScore sources are first
patched when needed (prepare(): 4.7 files re-stamped as 4.60, header clefs made ordinary
clef changes) into <work>/patched/; <work>/downgraded.json and headerclefs.json record it.
"""
import argparse, json, os, shutil, subprocess

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
# The AppImage needs FUSE (unavailable in sandboxed shells) and the offscreen Qt platform
# aborts in 4.6.5; the extracted AppImage under xvfb-run works everywhere.
MSCORE = os.environ.get('MSCORE', '/home/camus/bin/squashfs-root/AppRun')

ap = argparse.ArgumentParser()
ap.add_argument('--work', default='/tmp/omt-v2-scores')
ap.add_argument('--png', action='store_true', help='also render PNG pages')
ap.add_argument('--only', default=None)
ap.add_argument('--force', action='store_true')
a = ap.parse_args()

import re, zipfile


def read_mscx(src):
    if src.endswith('.mscx'):
        return open(src, encoding='utf-8').read()
    with zipfile.ZipFile(src) as z:
        return z.read(next(n for n in z.namelist() if n.endswith('.mscx') and '/' not in n)).decode('utf-8')


def fix_header_clefs(x):
    """MuseScore stores a clef change that falls at a system start as a *header* clef
    (<isHeader>1</isHeader>; 4.7 writes one in every bar), and 4.6.5's MusicXML export
    drops header clefs after the first bar, so the bar is exported in the old clef.
    Turn each header clef that changes the clef in force into an ordinary clef change.
    Works per <Staff> of the score body, in document order. Returns (text, n changed)."""
    n = 0
    def staff(m):
        nonlocal n
        cur = None
        def clef(c):
            nonlocal cur, n
            body = c.group(0)
            t = re.search(r'<concertClefType>([^<]+)</concertClefType>', body)
            t = t.group(1) if t else None
            if '<isHeader>1</isHeader>' in body and cur is not None and t != cur:
                body = re.sub(r'\s*<isHeader>1</isHeader>', '', body, count=1)
                n += 1
            if t:
                cur = t
            return body
        return re.sub(r'<Clef\b[^>]*>.*?</Clef>', clef, m.group(0), flags=re.S)
    x = re.sub(r'<Staff id="\d+">(?:(?!</Staff>).)*?<Measure\b.*?</Staff>', staff, x, flags=re.S)
    return x, n


def prepare(src, rel):
    """Patched copy of a MuseScore source for the export, or None if it needs none:
    files saved by 4.7 re-stamped as 4.60 (4.6.5 refuses them; the 4.70 format adds
    nothing these scores use) and header clefs fixed. Returns (path|None, was_47, n_clefs)."""
    try:
        x = read_mscx(src)
    except Exception:
        return None, False, 0      # e.g. a PDF uploaded with an .mscz name
    new = bool(re.search(r'<museScore version="4\.7', x))
    if new:
        x = re.sub(r'<museScore version="4\.7\d*"', '<museScore version="4.60"', x, count=1)
        x = re.sub(r'<programVersion>4\.7[^<]*', '<programVersion>4.6.5', x, count=1)
    x, nclef = fix_header_clefs(x)
    if not new and not nclef:
        return None, False, 0
    out = os.path.join(a.work, 'patched', rel + '.mscx')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(x)
    return out, new, nclef


inv = json.load(open(os.path.join(a.work, 'inventory.json')))
_dg = os.path.join(a.work, 'downgraded.json')
_hc = os.path.join(a.work, 'headerclefs.json')
downgraded = set(json.load(open(_dg))) if os.path.exists(_dg) else set()
headerclefs = json.load(open(_hc)) if os.path.exists(_hc) else {}
jobs = []
for f in inv:
    if a.only and a.only not in f['local']:
        continue
    src = os.path.join(ROOT, 'v2', f['local'])
    if f['format'] in ('mscz', 'mscx'):
        _rel = f['local'][len('media/'):].rsplit('.', 1)[0]
        patched, new, nclef = prepare(src, _rel)
        if new:
            downgraded.add(f['local'])
        if nclef:
            headerclefs[_rel] = nclef
        else:
            headerclefs.pop(_rel, None)
        if patched:
            src = patched
    rel = f['local'][len('media/'):].rsplit('.', 1)[0]
    xml = os.path.join(a.work, 'xml', rel + '.musicxml')
    os.makedirs(os.path.dirname(xml), exist_ok=True)
    outs = []
    if f['format'] == 'musicxml':
        if a.force or not os.path.exists(xml):
            shutil.copy(src, xml)
    elif a.force or not os.path.exists(xml):
        outs.append(xml)
    if a.png:
        png = os.path.join(a.work, 'png', rel + '.png')
        os.makedirs(os.path.dirname(png), exist_ok=True)
        if a.force or not os.path.exists(png.replace('.png', '-1.png')):
            outs.append(png)
    if outs:
        jobs.append({'in': src, 'out': outs})
print(len(jobs), 'jobs')
if jobs:
    jf = os.path.join(a.work, 'mscore-job.json')
    json.dump(jobs, open(jf, 'w'), indent=1)
    env = dict(os.environ)
    r = subprocess.run(['xvfb-run', '-a', MSCORE, '-j', jf], env=env, capture_output=True, text=True)
    open(os.path.join(a.work, 'mscore.log'), 'w').write(r.stdout + r.stderr)
    print('exit', r.returncode)


json.dump(sorted(downgraded), open(_dg, 'w'), indent=1)
json.dump(headerclefs, open(_hc, 'w'), indent=1)
print('re-stamped 4.7 files:', len(downgraded), '; files with header clefs fixed:', len(headerclefs))

missing = [f['local'] for f in inv if not os.path.exists(
    os.path.join(a.work, 'xml', f['local'][len('media/'):].rsplit('.', 1)[0] + '.musicxml'))]
print('missing xml:', len(missing), missing[:10])

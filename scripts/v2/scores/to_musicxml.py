#!/usr/bin/env python3
"""Step 1: convert every inventoried mscz/mscx to MusicXML (+ PNG pages) with MuseScore 4.

    python3 scripts/v2/scores/to_musicxml.py [--work /tmp/omt-v2-scores] [--png] [--only SUBSTR]

Output: <work>/xml/YYYY/MM/<base>.musicxml, <work>/png/YYYY/MM/<base>-N.png.
Uses one MuseScore batch job (-j) so the AppImage starts once.
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

inv = json.load(open(os.path.join(a.work, 'inventory.json')))
_dg = os.path.join(a.work, 'downgraded.json')
known_new = set(json.load(open(_dg))) if os.path.exists(_dg) and not a.force else set()
jobs = []
for f in inv:
    if a.only and a.only not in f['local']:
        continue
    src = os.path.join(ROOT, 'v2', f['local'])
    rel = f['local'][len('media/'):].rsplit('.', 1)[0]
    xml = os.path.join(a.work, 'xml', rel + '.musicxml')
    os.makedirs(os.path.dirname(xml), exist_ok=True)
    outs = []
    if f['format'] == 'musicxml':
        if a.force or not os.path.exists(xml):
            shutil.copy(src, xml)
    elif a.force or not os.path.exists(xml):
        if f['local'] not in known_new:
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


def downgrade(src, dst_dir):
    """MuseScore 4.6.5 refuses files saved by 4.7 (format 4.70). Re-stamp the mscx as
    4.60 and let 4.6.5 read it; the 4.70 format adds nothing these scores use (checked
    visually on the resulting PNGs). Returns the patched .mscx path."""
    import re, zipfile
    os.makedirs(dst_dir, exist_ok=True)
    with zipfile.ZipFile(src) as z:
        name = next(n for n in z.namelist() if n.endswith('.mscx') and '/' not in n)
        x = z.read(name).decode('utf-8')
    x = re.sub(r'<museScore version="4\.7\d*"', '<museScore version="4.60"', x, count=1)
    x = re.sub(r'<programVersion>4\.7[^<]*', '<programVersion>4.6.5', x, count=1)
    out = os.path.join(dst_dir, os.path.basename(src).rsplit('.', 1)[0] + '.mscx')
    open(out, 'w', encoding='utf-8').write(x)
    return out


# Second pass: files that failed because they were saved by a newer MuseScore.
retry = []
downgraded = []
for f in inv:
    if a.only and a.only not in f['local']:
        continue
    rel = f['local'][len('media/'):].rsplit('.', 1)[0]
    xml = os.path.join(a.work, 'xml', rel + '.musicxml')
    if os.path.exists(xml) or f['format'] != 'mscz':
        continue
    try:
        src = downgrade(os.path.join(ROOT, 'v2', f['local']), os.path.join(a.work, 'downgraded', os.path.dirname(rel)))
    except Exception as e:  # e.g. a PDF uploaded with an .mscz name
        print('not a MuseScore file:', f['local'], type(e).__name__)
        continue
    outs = [xml]
    if a.png:
        outs.append(os.path.join(a.work, 'png', rel + '.png'))
    retry.append({'in': src, 'out': outs})
    downgraded.append(f['local'])
if retry:
    jf = os.path.join(a.work, 'mscore-job-retry.json')
    json.dump(retry, open(jf, 'w'), indent=1)
    r = subprocess.run(['xvfb-run', '-a', MSCORE, '-j', jf], capture_output=True, text=True)
    open(os.path.join(a.work, 'mscore-retry.log'), 'w').write(r.stdout + r.stderr)
    print('retry', len(retry), 'exit', r.returncode)
dg = os.path.join(a.work, 'downgraded.json')
old = json.load(open(dg)) if os.path.exists(dg) else []
json.dump(sorted(set(old) | set(downgraded)), open(dg, 'w'), indent=1)

missing = [f['local'] for f in inv if not os.path.exists(
    os.path.join(a.work, 'xml', f['local'][len('media/'):].rsplit('.', 1)[0] + '.musicxml'))]
print('missing xml:', len(missing), missing[:10])

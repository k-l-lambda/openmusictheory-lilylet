#!/usr/bin/env python3
"""Step 0: list unique score files (mscz/mscx/musicxml) from v2/materials.json.

    python3 scripts/v2/scores/inventory.py [--work /tmp/omt-v2-scores]

Writes <work>/inventory.json: [{local, format, chapters[], unreferenced, captions[]}].
"""
import argparse, json, os
from collections import OrderedDict

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))

ap = argparse.ArgumentParser()
ap.add_argument('--work', default='/tmp/omt-v2-scores')
a = ap.parse_args()
os.makedirs(a.work, exist_ok=True)

mats = json.load(open(os.path.join(ROOT, 'v2/materials.json')))['materials']
files = OrderedDict()
for m in mats:
    if m['type'] != 'score-file' or not m.get('local'):
        continue
    f = files.setdefault(m['local'], {'local': m['local'], 'url': m['url'],
                                      'format': m.get('format') or m['local'].rsplit('.', 1)[-1],
                                      'chapters': [], 'captions': [], 'unreferenced': False})
    if m.get('chapter') and m['chapter'] not in f['chapters']:
        f['chapters'].append(m['chapter'])
    if m.get('caption') and m['caption'] not in f['captions']:
        f['captions'].append(m['caption'])
    if m.get('unreferenced'):
        f['unreferenced'] = True
out = list(files.values())
for f in out:
    f['exists'] = os.path.exists(os.path.join(ROOT, 'v2', f['local']))
json.dump(out, open(os.path.join(a.work, 'inventory.json'), 'w'), indent=1)
print(len(out), 'files;', sum(not f['exists'] for f in out), 'missing;',
      sum(not f['chapters'] for f in out), 'without chapter')

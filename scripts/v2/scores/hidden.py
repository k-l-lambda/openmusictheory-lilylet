#!/usr/bin/env python3
"""Count elements MuseScore marks invisible (<visible>0</visible>) in each source.

    python3 scripts/v2/scores/hidden.py [--work /tmp/omt-v2-scores]

MuseScore 4.6's MusicXML export drops the invisibility of notes and chord symbols, so
hidden answer-key content (notes, Roman numerals) shows up in the conversion.
Writes <work>/hidden.json: {rel: {notes, rests, harmonies, texts}}.
"""
import argparse, collections, json, os, zipfile
import xml.etree.ElementTree as ET

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
ap = argparse.ArgumentParser()
ap.add_argument('--work', default='/tmp/omt-v2-scores')
a = ap.parse_args()
out = {}
for f in json.load(open(os.path.join(a.work, 'inventory.json'))):
    if f['format'] not in ('mscz', 'mscx'):
        continue
    p = os.path.join(ROOT, 'v2', f['local'])
    try:
        if p.endswith('.mscx'):
            x = open(p, encoding='utf-8').read()
        else:
            with zipfile.ZipFile(p) as z:
                x = z.read(next(n for n in z.namelist() if n.endswith('.mscx') and '/' not in n)).decode('utf-8')
        r = ET.fromstring(x)
    except Exception:
        continue
    c = collections.Counter()
    for e in r.iter():
        if e.tag in ('Note', 'Rest', 'Harmony', 'StaffText') and e.findtext('visible') == '0':
            c[{'Note': 'notes', 'Rest': 'rests', 'Harmony': 'harmonies', 'StaffText': 'texts'}[e.tag]] += 1
    rel = f['local'][len('media/'):].rsplit('.', 1)[0]
    if c['notes'] or c['harmonies']:
        out[rel] = dict(c)
json.dump(out, open(os.path.join(a.work, 'hidden.json'), 'w'), indent=1)
for k, v in out.items():
    print(f'{k:64} {v}')

#!/usr/bin/env python3
"""Split the in-scope v2 images (v2/image-triage.json) into transcription batches.

    python3 scripts/v2/images/plan.py [--out scripts/v2/images/data/batches]

Scope: recommendation hand/omr/omr+hand, minus percussion-flagged images (user decision)
and duplicates (mapped to their kept copy in DUPES). Writes <out>/<batch>.json (item list)
and <out>/plan.json (all batches plus the skipped rows).
"""
import argparse, json, os
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
ap = argparse.ArgumentParser(); ap.add_argument('--out', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'batches')); a = ap.parse_args()
imgs = {e['index']: e for e in json.load(open(os.path.join(REPO, 'v2/image-triage.json')))['images']}

PERC = {'percussion', 'percussion-clef'}
# triage index -> index of the copy that is transcribed (byte-identical / same content)
DUPES = {109: 100, 110: 104, 105: 111}
BATCHES = [  # (name, indices) in priority order
    ('J1-jazz', [221, 222, 224, 225, 226, 227, 228, 232, 'bebop']),
    ('J2-jazz', [229, 235, 236]),
    ('C1-counterpoint', [137, 138, 139, 140, 143, 145]),
    ('X1-chromatic-hand', [203, 204, 205, 209, 210, 211, 213, 214, 215, 216]),
    ('X2-chromatic', [196, 197, 198, 199, 200, 201, 202]),
    ('F1-form', [149, 150, 151, 154, 160, 162]),
    ('F2-form', [157, 158, 159, 161]),
    ('F3-form', [163, 164, 166, 167, 165, 168]),
    ('F4-form', [169, 170, 172, 173, 174]),
    ('F5-form', [175, 176, 177]),
    ('F6-form', [178, 179, 180]),
    ('R1-rhythm', [317, 327]),
    ('P1-pop', [241, 242, 243, 244, 245, 246]),
    ('P2-pop', [247, 248, 249, 250]),
    ('T1-posttonal', [256, 257, 258, 263, 265, 266, 267]),
    ('T2-twelvetone-orch', [269, 270, 271, 273, 274, 275]),
    ('U1-fund', [8, 10, 11, 20, 21, 22, 23, 27, 28, 29, 30, 31, 32, 33, 34, 35]),
    ('U2-fund', [43, 44, 45, 46, 47, 51, 54, 55, 59, 60, 61, 62, 63, 66, 67, 68]),
    ('U3-fund', [65, 72, 73, 76, 78, 85, 86, 88, 89, 90, 93]),
    ('U4-fund', [94, 95, 96, 107, 113]),
    ('U5-fund', [97, 98, 99, 100, 101, 102, 103, 104, 108, 111]),
    ('U6-fund', [115, 116, 117, 118, 119, 121, 122, 123, 124, 125, 126, 127, 128]),
    ('U7-fund', [130, 131, 132, 133, 134, 135, 136]),
    ('E1-ear', [286, 287, 288]),
    ('E2-ear', [291, 292, 293]),
    ('E3-ear', [296, 297, 298]),
    ('E4-ear', [301, 302, 303]),
    ('E5-ear', [306, 307, 308]),
    ('E6-ear', [311, 312, 313]),
]

def item(i):
    if i == 'bebop':
        return {'index': 'bebop', 'image': 'v2/media/2019/08/COMP-bebop-part-2.mscz',
                'source_png': '/tmp/omt-v2-img/bebop/COMP-bebop-part-2-1.png',
                'lyl': 'v2/lilylet/images/2019/08/COMP-bebop-part-2.lyl',
                'chapter': '06-jazz/05-jazz-embellishing-chords.md', 'recommendation': 'omr+hand',
                'caption': 'COMP-bebop-part-2 (a 1-page PDF named .mscz), rasterized at 200 dpi',
                'flags': ['pdf-as-mscz'], 'reason': 'composition worksheet'}
    e = imgs[i]
    src = e['path']
    for f in e['flags']:
        if f.startswith('full-size-local:'):
            src = 'v2/' + f.split(':', 1)[1]
    rel = e['path'][len('v2/media/'):]
    return {'index': i, 'image': e['path'], 'source_png': os.path.join(REPO, src),
            'lyl': 'v2/lilylet/images/' + os.path.splitext(rel)[0] + '.lyl',
            'chapter': e['chapter'], 'recommendation': e['recommendation'], 'caption': e['caption'],
            'flags': e['flags'], 'reason': e['reason'], 'bars': e['bars'], 'staves': e['staves'],
            'effort_min': e['effort_min']}

os.makedirs(a.out, exist_ok=True)
seen = set(); plan = {'batches': [], 'skipped': []}
for name, idx in BATCHES:
    items = [item(i) for i in idx]
    for it in items:
        assert it['index'] not in seen, it['index']; seen.add(it['index'])
        assert it['index'] == 'bebop' or not (PERC & set(imgs[it['index']]['flags'])), it['index']
    json.dump(items, open(os.path.join(a.out, name + '.json'), 'w'), indent=1, ensure_ascii=False)
    plan['batches'].append({'name': name, 'items': [it['index'] for it in items],
                            'effort_min': sum(it.get('effort_min') or 0 for it in items)})
for i, e in imgs.items():
    if e['recommendation'] == 'skip':
        if i in DUPES:
            plan['skipped'].append({'index': i, 'image': e['path'], 'chapter': e['chapter'], 'dup_of': DUPES[i]})
        continue
    if i in seen: continue
    if PERC & set(e['flags']):
        plan['skipped'].append({'index': i, 'image': e['path'], 'chapter': e['chapter'], 'why': 'percussion notation (user decision)'})
    else:
        raise SystemExit(f'unplanned in-scope image {i} {e["path"]}')
json.dump(plan, open(os.path.join(a.out, 'plan.json'), 'w'), indent=1, ensure_ascii=False)
for b in plan['batches']: print(b['name'], len(b['items']), b['effort_min'])
print('planned', len(seen), 'skipped', len(plan['skipped']))

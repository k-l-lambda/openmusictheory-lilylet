#!/usr/bin/env python3
"""Step 4: compare music21's reading of each MusicXML with the parsed lilylet output.

    python3 scripts/v2/scores/compare.py [--work /tmp/omt-v2-scores] [--only SUBSTR] [-v]

For each file with <work>/m21/<rel>.json and <work>/lyl/<rel>.check.json, compares
per staff the multiset of (measure, offset, pitches, quarterLength, grace) and the
measure count. Writes <work>/compare.json: {rel: {bars_src, bars_lyl, staves_src,
staves_lyl, notes_src, notes_lyl, missing[], extra[], diff_summary}}.
"""
import argparse, json, os
from collections import Counter
from fractions import Fraction

ap = argparse.ArgumentParser()
ap.add_argument('--work', default='/tmp/omt-v2-scores')
ap.add_argument('--only', default=None)
ap.add_argument('-v', action='store_true')
a = ap.parse_args()


def key(n):
    m, off, ps, ql, grace = n
    return (m, off, tuple(ps), ql, grace)


def split_breves(notes):
    """postprocess.ts writes notes longer than a whole note as tied whole notes."""
    out = []
    for m, off, ps, ql, grace in notes:
        q = Fraction(ql)
        if q > 4 and q % 4 == 0:
            for i in range(int(q // 4)):
                o = Fraction(off) + 4 * i
                out.append([m, str(o.numerator) if o.denominator == 1 else f'{o.numerator}/{o.denominator}', ps, '4', grace])
        else:
            out.append([m, off, ps, ql, grace])
    return out


def classify(missing, extra):
    """Group differences so the manifest can say what kind they are."""
    kinds = Counter()
    em = {(k[0], k[1], k[4]): k for k in extra}
    for k in missing:
        o = em.get((k[0], k[1], k[4]))
        if o and o[2] != k[2] and o[3] == k[3]:
            kinds['pitch'] += 1
        elif o and o[2] == k[2]:
            kinds['duration'] += 1
        elif k[4]:
            kinds['grace-missing'] += 1
        else:
            kinds['missing'] += 1
    mk = {(k[0], k[1], k[4]) for k in missing}
    for k in extra:
        if (k[0], k[1], k[4]) not in mk:
            kinds['grace-extra' if k[4] else 'extra'] += 1
    return dict(kinds)


inv = json.load(open(os.path.join(a.work, 'inventory.json')))
out = {}
for f in inv:
    if a.only and a.only not in f['local']:
        continue
    rel = f['local'][len('media/'):].rsplit('.', 1)[0]
    mp = os.path.join(a.work, 'm21', rel + '.json')
    cp = os.path.join(a.work, 'lyl', rel + '.check.json')
    if not (os.path.exists(mp) and os.path.exists(cp)):
        continue
    src, chk = json.load(open(mp)), json.load(open(cp))
    if 'error' in src or 'staves' not in chk:
        out[rel] = {'error': src.get('error') or '; '.join(chk.get('errors', []))}
        continue
    r = {'bars_src': src['bars'], 'bars_lyl': chk.get('lylMeasures'),
         'staves_src': len(src['staves']), 'staves_lyl': len(chk['staves']),
         'notes_src': sum(len(s['notes']) for s in src['staves']),
         'notes_lyl': sum(len(s['notes']) for s in chk['staves']),
         'missing': [], 'extra': [], 'kinds': {}}
    for i in range(max(len(src['staves']), len(chk['staves']))):
        a_ = Counter(key(n) for n in split_breves(src['staves'][i]['notes'])) if i < len(src['staves']) else Counter()
        b_ = Counter(key(n) for n in chk['staves'][i]['notes']) if i < len(chk['staves']) else Counter()
        miss = sorted((a_ - b_).elements())
        ext = sorted((b_ - a_).elements())
        r['missing'] += [[i] + list(k) for k in miss]
        r['extra'] += [[i] + list(k) for k in ext]
        for kk, vv in classify(miss, ext).items():
            r['kinds'][kk] = r['kinds'].get(kk, 0) + vv
    # Chord symbols: harmonies.py (positions from MusicXML) vs the parsed lilylet.
    hp = os.path.join(a.work, 'harm', rel + '.json')
    href = json.load(open(hp)) if os.path.exists(hp) else []
    hlyl = chk.get('harmonies', [])
    ref_t = Counter((h['part'], h['measure'], h['text']) for h in href)
    lyl_t = Counter((h[0], h[2], h[4]) for h in hlyl)
    r['harm_src'], r['harm_lyl'] = len(href), len(hlyl)
    r['harm_missing'] = sorted(map(list, (ref_t - lyl_t).elements()))
    r['harm_extra'] = sorted(map(list, (lyl_t - ref_t).elements()))
    def fr(x):
        return Fraction(x[0], x[1]) if isinstance(x, list) else Fraction(x)
    ref_p = Counter((h['part'], h['staff'], h['measure'], fr(h['onset']), h['text']) for h in href)
    lyl_p = Counter((h[0], h[1], h[2], fr(h[3]), h[4]) for h in hlyl)
    r['harm_moved'] = sum((ref_p - lyl_p).values()) - len(r['harm_missing'])
    r['match'] = not r['harm_missing'] and not r['harm_extra'] and not r['missing'] and not r['extra'] and r['bars_src'] == r['bars_lyl'] \
        and r['staves_src'] == r['staves_lyl']
    out[rel] = r
    if a.v or not r['match']:
        print(f"{'OK ' if r['match'] else 'DIFF'} {rel:60} bars {r['bars_src']}/{r['bars_lyl']} "
              f"staves {r['staves_src']}/{r['staves_lyl']} notes {r['notes_src']}/{r['notes_lyl']} {r['kinds']} "
              f"harm {r['harm_src']}/{r['harm_lyl']} moved {r['harm_moved']} miss {r['harm_missing'][:3]}")
json.dump(out, open(os.path.join(a.work, 'compare.json'), 'w'), indent=0)
print(len(out), 'compared;', sum(1 for v in out.values() if v.get('match')), 'exact matches')

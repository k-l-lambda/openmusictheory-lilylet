#!/usr/bin/env python3
"""Visual spot-check: MuseScore's page 1 next to Verovio's rendering of the .lyl.

    python3 scripts/v2/scores/sidebyside.py [--work /tmp/omt-v2-scores] REL [REL ...]

REL is the YYYY/MM/<base> path. Needs convert.ts --svg and to_musicxml.py --png first.
Writes <work>/cmp/<base>.png (headless Chrome screenshot), MuseScore left, lilylet right.
"""
import argparse, base64, os, subprocess

ap = argparse.ArgumentParser()
ap.add_argument('--work', default='/tmp/omt-v2-scores')
ap.add_argument('--height', type=int, default=2600)
ap.add_argument('rels', nargs='+')
a = ap.parse_args()
os.makedirs(os.path.join(a.work, 'cmp'), exist_ok=True)
for rel in a.rels:
    png = os.path.join(a.work, 'png', rel + '-1.png')
    svg = os.path.join(a.work, 'svg', rel + '.svg')
    if not (os.path.exists(png) and os.path.exists(svg)):
        print('missing', rel); continue
    b64 = base64.b64encode(open(png, 'rb').read()).decode()
    html = f'''<!doctype html><meta charset="utf-8"><style>
body{{margin:0;background:#fff;font:14px sans-serif}} .row{{display:flex;gap:8px}}
.col{{width:50%}} .col img,.col svg{{width:100%;height:auto;display:block}} h3{{margin:4px}}</style>
<h3>{rel}: MuseScore (left) | lilylet via Verovio (right)</h3>
<div class="row"><div class="col"><img src="data:image/png;base64,{b64}"></div>
<div class="col">{open(svg).read()}</div></div>'''
    hp = os.path.join(a.work, 'cmp', os.path.basename(rel) + '.html')
    open(hp, 'w').write(html)
    out = os.path.join(a.work, 'cmp', os.path.basename(rel) + '.png')
    subprocess.run(['google-chrome', '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
                    f'--window-size=1800,{a.height}', f'--screenshot={out}', 'file://' + hp],
                   capture_output=True, timeout=120)
    print(out if os.path.exists(out) else 'FAILED ' + rel)

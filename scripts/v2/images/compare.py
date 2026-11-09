#!/usr/bin/env python3
"""Render a lilylet transcription and stack it under its original image.

    python3 scripts/v2/images/compare.py IMAGE LYL OUT.png [--crop x0,y0,x1,y1] [--block N] [--width 1600]

IMAGE   original (png/jpg). --crop cuts a region of it first (for one example of a .md).
LYL     .lyl, or .md (then --block N picks the Nth ```lyl block, 1-based; default 1).
OUT     PNG: original on top, Verovio render (all pages, via scripts/v2/images/render.ts) below, same width.

Run from anywhere; it cds to the repo for the render. Temp files go next to OUT.
"""
import argparse, os, re, subprocess, sys
from PIL import Image, ImageChops, ImageDraw

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))

ap = argparse.ArgumentParser()
ap.add_argument('image'); ap.add_argument('lyl'); ap.add_argument('out')
ap.add_argument('--crop'); ap.add_argument('--block', type=int, default=1)
ap.add_argument('--width', type=int, default=1600)
a = ap.parse_args()

out = os.path.abspath(a.out)
tmp = os.path.splitext(out)[0]
lyl = os.path.abspath(a.lyl)
if lyl.endswith('.md'):
    blocks = re.findall(r'```lyl\n(.*?)```', open(lyl, encoding='utf-8').read(), re.S)
    if not (1 <= a.block <= len(blocks)):
        sys.exit(f'{lyl}: no lyl block {a.block} (has {len(blocks)})')
    lyl = tmp + '.block.lyl'
    open(lyl, 'w', encoding='utf-8').write(blocks[a.block - 1])

svg = tmp + '.svg'
r = subprocess.run(['npx', 'tsx', 'scripts/v2/images/render.ts', lyl, svg], cwd=REPO, capture_output=True, text=True)
if not os.path.exists(svg):
    sys.exit('render failed:\n' + r.stdout[-2000:] + r.stderr[-2000:])
if r.stderr.strip():
    print('render stderr:', r.stderr.strip()[:800])

m = re.search(r'width="([\d.]+)px" height="([\d.]+)px"', open(svg, encoding='utf-8').read(1000))
# the SVG is drawn 2000 px wide, so the page is h * 2000 / w tall
win_h = max(1200, min(30000, int(float(m.group(2)) * 2000 / float(m.group(1))) + 100)) if m else 3000
html = tmp + '.html'
open(html, 'w', encoding='utf-8').write(
    '<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#fff}'
    'svg{width:2000px;height:auto;display:block}</style>' + open(svg, encoding='utf-8').read())
shot = tmp + '.shot.png'
subprocess.run(['google-chrome', '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
                '--window-size=2000,%d' % win_h, f'--screenshot={shot}', 'file://' + html],
               capture_output=True, timeout=120)


def autocrop(im, pad=12):
    im = im.convert('RGB')
    bg = Image.new('RGB', im.size, (255, 255, 255))
    box = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 30 else 0).getbbox()
    if not box:
        return im
    x0, y0, x1, y1 = box
    return im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))


def fit(im, w):
    if im.width > w or im.width < w // 2:
        im = im.resize((w, max(1, round(im.height * w / im.width))), Image.LANCZOS)
    return im


orig = Image.open(a.image)
if orig.mode in ('RGBA', 'LA', 'P'):
    orig = orig.convert('RGBA')
    bg = Image.new('RGBA', orig.size, (255, 255, 255, 255))
    orig = Image.alpha_composite(bg, orig)
orig = orig.convert('RGB')
if a.crop:
    orig = orig.crop(tuple(int(v) for v in a.crop.split(',')))
orig = fit(orig, a.width)
rend = fit(autocrop(Image.open(shot)), a.width)
W = max(orig.width, rend.width)
canvas = Image.new('RGB', (W, orig.height + rend.height + 30), (255, 255, 255))
canvas.paste(orig, (0, 0))
d = ImageDraw.Draw(canvas)
d.rectangle((0, orig.height + 8, W, orig.height + 12), fill=(220, 0, 0))
canvas.paste(rend, (0, orig.height + 30))
canvas.save(out)
for f in (html, shot):
    os.remove(f)
print(out, canvas.size)

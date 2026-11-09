#!/usr/bin/env bash
# Serialized STARRY OMR for the v2 image batches: one request at a time across all agents.
#
#   scripts/v2/images/omr.sh <image.png|jpg> <out.raw.lyl> [--upscale N]
#
# - Holds /tmp/omt-v2-img/omr.lock (flock) while scripts/omr-convert.sh runs, so parallel
#   sub-agents queue instead of sharing the GPU.
# - ocr (12027) and brackets (12028) predictors are not running: no text, no braces.
# - The input is flattened onto white first (transparent PNGs read as black).
# - --upscale N: LANCZOS-upscale (and pad 40 px) first (small/low-res images).
# - The log (regulation quality, solved/issue/fatal) goes to <out>.log and stdout.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/../../.." && pwd)"
img="$(readlink -f "$1")"; out="$(readlink -f "$2")"; shift 2
up=1
while [[ $# -gt 0 ]]; do case "$1" in --upscale) up="$2"; shift 2 ;; *) echo "bad arg $1"; exit 2 ;; esac; done
mkdir -p /tmp/omt-v2-img "$(dirname "$out")"
# Always write a flattened RGB copy: transparent PNGs read as solid black otherwise.
src="${out%.lyl}.in.png"
python3 -I -c "
import sys
from PIL import Image
im = Image.open(sys.argv[1]); f = float(sys.argv[3])
if im.mode in ('RGBA', 'LA', 'P'):
    im = im.convert('RGBA'); bg = Image.new('RGBA', im.size, (255,255,255,255)); im = Image.alpha_composite(bg, im)
im = im.convert('RGB')
if f != 1:
    im = im.resize((round(im.width*f), round(im.height*f)), Image.LANCZOS)
    c = Image.new('RGB', (im.width+80, im.height+80), (255,255,255)); c.paste(im, (40,40)); im = c
im.save(sys.argv[2])
" "$img" "$src" "$up"
cd "$REPO"
(
	flock 9
	OMR_PROCESSES='["gauge","semantic","mask"]' timeout 600 ./scripts/omr-convert.sh "$src" \
		--api-base http://localhost:3080 --output "$out"
) 9>/tmp/omt-v2-img/omr.lock 2>&1 | tee "${out%.lyl}.log"

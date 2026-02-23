#!/usr/bin/env bash
#
# Convert a score image to Lilylet (.lyl) using STARRY OMR.
#
# Usage:
#   ./scripts/omr-convert.sh <image_path> [--output <output_path>]
#
# Example:
#   ./scripts/omr-convert.sh Graphics/form/k283.png --output Graphics/lilylet/k283.lyl
#
set -euo pipefail

API_BASE="${API_BASE:-http://localhost:7860}"

# Parse args
IMAGE_PATH=""
OUTPUT_PATH=""
while [[ $# -gt 0 ]]; do
	case "$1" in
		--output|-o) OUTPUT_PATH="$2"; shift 2 ;;
		--api-base) API_BASE="$2"; shift 2 ;;
		-h|--help)
			echo "Usage: $0 <image_path> [--output <path>] [--api-base URL]"
			exit 0 ;;
		*) IMAGE_PATH="$1"; shift ;;
	esac
done

if [[ -z "$IMAGE_PATH" ]]; then
	echo "Usage: $0 <image_path> [--output <path>]"
	exit 1
fi

if [[ ! -f "$IMAGE_PATH" ]]; then
	echo "Error: Image not found: $IMAGE_PATH"
	exit 1
fi

# Derive output path from image name if not specified
if [[ -z "$OUTPUT_PATH" ]]; then
	BASENAME=$(basename "$IMAGE_PATH" | sed 's/\.[^.]*$//')
	OUTPUT_PATH="Graphics/lilylet/${BASENAME}.lyl"
fi

# Deterministic UUID v5 from image path
SCORE_ID=$(python3 -c "
import uuid
ns = uuid.UUID('a1b2c3d4-e5f6-7890-abcd-ef1234567890')
print(uuid.uuid5(ns, 'omt-lilylet:$IMAGE_PATH'))
")

echo "=== STARRY OMR → Lilylet ==="
echo "  Image:    $IMAGE_PATH"
echo "  Output:   $OUTPUT_PATH"
echo "  Score ID: $SCORE_ID"
echo "  API:      $API_BASE"
echo ""

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

# ─── Step 1: Create empty score shell ─────────────────────────────────────

echo "[1/5] Creating score shell..."
curl -sf -X PUT "$API_BASE/api/scores/$SCORE_ID/data" \
	-H 'Content-Type: application/json' \
	-d '{"pages":[],"patches":[],"tags":[]}' > /dev/null
echo "  Done"

# ─── Step 2: Upload image and run OMR prediction ─────────────────────────

echo "[2/5] Uploading image and running OMR prediction..."

# Detect content type
case "$IMAGE_PATH" in
	*.png)  CT="image/png" ;;
	*.jpg|*.jpeg) CT="image/jpeg" ;;
	*.webp) CT="image/webp" ;;
	*) CT="application/octet-stream" ;;
esac

# Use predict/pages endpoint with empty sources (let STARRY auto-detect layout)
PREDICT_RES=$(curl -sf -X POST "$API_BASE/api/predict/pages/$SCORE_ID" \
	-F "sources=[]" \
	-F 'processes=["gauge","semantic","mask","brackets","text"]' \
	-F "page0=@$IMAGE_PATH;type=$CT")

TASK_ID=$(echo "$PREDICT_RES" | python3 -c "import json,sys; print(json.load(sys.stdin)['task_id'])")
echo "  Task ID: $TASK_ID"

# ─── Step 3: Poll for completion ──────────────────────────────────────────

echo -n "  Waiting for prediction..."
while true; do
	POLL_RES=$(curl -sf "$API_BASE/api/tasks/$TASK_ID/poll" 2>/dev/null || echo '{"status":"unknown"}')
	STATUS=$(echo "$POLL_RES" | python3 -c "import json,sys; print(json.load(sys.stdin).get('status','unknown'))" 2>/dev/null || echo "unknown")
	case "$STATUS" in
		completed)
			echo " done!"
			echo "$POLL_RES" | python3 -c "
import json, sys
r = json.load(sys.stdin).get('result', {})
if isinstance(r, dict):
    print(f'  Systems: {r.get(\"systems\",\"?\")}, Staves: {r.get(\"staves\",\"?\")}, StaffLayout: {r.get(\"staffLayout\",\"?\")}')
" 2>/dev/null || true
			break
			;;
		failed|error)
			echo " FAILED!"
			echo "$POLL_RES" | python3 -m json.tool 2>/dev/null || echo "$POLL_RES"
			exit 1
			;;
		*)
			echo -n "."
			sleep 3
			;;
	esac
done

# ─── Step 4: Run regulation ──────────────────────────────────────────────

echo "[3/5] Running regulation..."
set +e
REG_RES=$(curl -sf -X POST "$API_BASE/api/scores/$SCORE_ID/regulate" \
	--max-time 600 2>&1)
REG_EXIT=$?

if [[ "$REG_EXIT" -eq 0 ]]; then
	echo "$REG_RES" | python3 -c "
import json, sys
r = json.load(sys.stdin)
if r.get('code') == 0:
    s = r['data']['stat']
    qs = s.get('qualityScore', 0)
    m = s.get('measures', {})
    print(f'  Quality: {qs*100:.1f}%')
    print(f'  Measures: solved={m.get(\"solved\",0)} issue={m.get(\"issue\",0)} fatal={m.get(\"fatal\",0)}')
else:
    print(f'  Error: {r.get(\"message\",\"unknown\")}', file=sys.stderr)
" 2>&1
else
	echo "  WARNING: Regulation failed (exit $REG_EXIT)"
fi
set -e

# ─── Step 5: Download score JSON and convert to Lilylet ──────────────────

echo "[4/5] Downloading score JSON..."
curl -sf "$API_BASE/api/scores/$SCORE_ID/data" > "$TMPDIR/score.json"
echo "  Saved to $TMPDIR/score.json"

echo "[5/5] Converting to Lilylet..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Ensure output directory exists
mkdir -p "$(dirname "$OUTPUT_PATH")"

npx tsx "$SCRIPT_DIR/score-to-lilylet.ts" "$TMPDIR/score.json" > "$OUTPUT_PATH"

LINES=$(wc -l < "$OUTPUT_PATH")
echo "  Written: $OUTPUT_PATH ($LINES lines)"

echo ""
echo "=== Complete ==="
echo "  Lilylet: $OUTPUT_PATH"
echo "  Score:   $API_BASE/playground/$SCORE_ID"

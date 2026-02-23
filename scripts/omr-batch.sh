#!/usr/bin/env bash
#
# Batch-convert score images to Lilylet using omr-convert.sh.
# Reads from scripts/omr-manifest.csv.
#
# Usage:
#   ./scripts/omr-batch.sh [--skip-existing]
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MANIFEST="$SCRIPT_DIR/omr-manifest.csv"
SKIP_EXISTING=false

while [[ $# -gt 0 ]]; do
	case "$1" in
		--skip-existing) SKIP_EXISTING=true; shift ;;
		*) echo "Usage: $0 [--skip-existing]"; exit 1 ;;
	esac
done

TOTAL=0
OK=0
SKIP=0
FAIL=0

# Skip CSV header, process each row
tail -n +2 "$MANIFEST" | while IFS=, read -r IMAGE OUTPUT; do
	TOTAL=$((TOTAL + 1))

	if $SKIP_EXISTING && [[ -f "$OUTPUT" ]]; then
		echo "[$TOTAL] SKIP (exists): $OUTPUT"
		SKIP=$((SKIP + 1))
		continue
	fi

	echo ""
	echo "============================================"
	echo "[$TOTAL] Processing: $IMAGE → $OUTPUT"
	echo "============================================"

	if "$SCRIPT_DIR/omr-convert.sh" "$IMAGE" --output "$OUTPUT"; then
		OK=$((OK + 1))
		echo "[$TOTAL] SUCCESS: $OUTPUT"
	else
		FAIL=$((FAIL + 1))
		echo "[$TOTAL] FAILED: $IMAGE"
	fi
done

echo ""
echo "=== Batch Complete ==="
echo "  Total: $TOTAL  OK: $OK  Skip: $SKIP  Fail: $FAIL"

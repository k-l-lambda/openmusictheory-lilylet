#!/usr/bin/env python3
"""Merge the per-batch results into v2/lilylet/images/MANIFEST.json (+ MANIFEST.md counts).

    python3 scripts/v2/images/build_manifest.py [--work scripts/v2/images/data] [--issues issues.md]

<work> holds batches/plan.json + batches/<batch>.json (from plan.py) and <batch>/result.json (per-batch
sub-agent results; the transcription brief they followed is data/brief.md).

Rows: {image, lyl, chapter, method, status, notes} — one per in-scope image, plus
  - duplicates (triage skip, same content as a kept image): lyl of the kept copy, status/method copied,
    notes "duplicate of <image>";
  - percussion images (out of scope by user decision): lyl null, status skipped;
  - in-scope images with no batch result yet: lyl null, status skipped, notes "not done".
`image` is the path as used in v2/materials.json (v2/media/...). Paths are repo-relative.
--issues: a Markdown file whose content becomes the "Open issues" section of MANIFEST.md.
<work>/overrides.json: {index: {status?, notes_prefix?}} — coordinator verdicts after spot-checks.
"""
import argparse, collections, json, os
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
ap = argparse.ArgumentParser()
ap.add_argument('--work', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')); ap.add_argument('--issues', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'issues.md'))
a = ap.parse_args()
plan = json.load(open(os.path.join(a.work, 'batches', 'plan.json')))
triage = {e['index']: e for e in json.load(open(os.path.join(REPO, 'v2/image-triage.json')))['images']}

results, batch_of = {}, {}
ov_path = os.path.join(a.work, 'overrides.json')
overrides = {int(k) if k.isdigit() else k: v for k, v in (json.load(open(ov_path)).items() if os.path.exists(ov_path) else [])}
for b in plan['batches']:
    p = os.path.join(a.work, b['name'], 'result.json')
    rows = json.load(open(p)) if os.path.exists(p) else []
    for r in rows:
        results[r['index']] = r
    for i in b['items']:
        batch_of[i] = b['name']

rows = []
def part_of(ch): return ch.split('/')[0]
for b in plan['batches']:
    items = {it['index']: it for it in json.load(open(os.path.join(a.work, 'batches', b['name'] + '.json')))}
    for i in b['items']:
        it = items[i]
        r = results.get(i)
        if r is None:
            rows.append({'image': it['image'], 'lyl': None, 'chapter': it['chapter'],
                         'method': 'hand' if it['recommendation'] == 'hand' else it['recommendation'],
                         'status': 'skipped', 'notes': 'not done (time/budget)'})
            continue
        lyl = r.get('lyl')
        if lyl and not os.path.exists(os.path.join(REPO, lyl)):
            raise SystemExit(f'{i}: result lyl missing on disk: {lyl}')
        notes = r.get('notes') or ''
        if r.get('omr'):
            notes = (f"OMR: {r['omr']}. " + notes).strip()
        status = r['status']
        if i in overrides:
            status = overrides[i].get('status', status)
            notes = (overrides[i].get('notes_prefix', '') + ' ' + notes).strip()
        rows.append({'image': it['image'], 'lyl': lyl, 'chapter': it['chapter'], 'method': r['method'],
                     'status': status, 'notes': notes})
img2row = {r['image']: r for r in rows}
for s in plan['skipped']:
    if 'dup_of' in s:
        kept = img2row.get(triage[s['dup_of']]['path'])
        rows.append({'image': s['image'], 'lyl': kept['lyl'] if kept else None, 'chapter': s['chapter'],
                     'method': kept['method'] if kept else 'hand', 'status': kept['status'] if kept else 'skipped',
                     'notes': f"duplicate of {triage[s['dup_of']]['path']} (same content); shares its lyl"})
    else:
        rows.append({'image': s['image'], 'lyl': None, 'chapter': s['chapter'], 'method': 'hand',
                     'status': 'skipped', 'notes': s['why']})
rows.sort(key=lambda r: (r['chapter'], r['image']))
out = os.path.join(REPO, 'v2/lilylet/images')
os.makedirs(out, exist_ok=True)
json.dump({'generated_by': 'scripts/v2/images/build_manifest.py', 'source': 'v2/image-triage.json',
           'images': rows}, open(os.path.join(out, 'MANIFEST.json'), 'w'), indent=1, ensure_ascii=False)

# Markdown summary
cnt = collections.Counter((r['method'], r['status']) for r in rows)
statuses = ['ok', 'ok-with-notes', 'failed', 'skipped']
methods = ['hand', 'omr', 'omr+hand']
parts = collections.defaultdict(collections.Counter)
for r in rows:
    parts[part_of(r['chapter'])][r['status']] += 1
L = ['# v2 image transcriptions (lilylet)', '',
     'One row per notation image of OMT 2e in `MANIFEST.json` (`image`, `lyl`, `chapter`, `method`, `status`, `notes`).',
     'Transcriptions live at `v2/lilylet/images/<YYYY/MM>/<basename>.lyl` (or `.md` with one ```lyl block per example).',
     'Scope: triage recommendation hand/omr/omr+hand (`v2/image-triage.json`); percussion notation skipped (user decision);',
     'duplicates share the lyl of their kept copy. Every written file parses without warnings (`scripts/v2/images/check-lyl.ts`)',
     'and was compared with its image (`scripts/v2/images/compare.py`).', '',
     '## Counts', '', '| method | ' + ' | '.join(statuses) + ' | total |', '|---|' + '---|' * (len(statuses) + 1)]
for m in methods:
    L.append(f'| {m} | ' + ' | '.join(str(cnt[(m, s)]) for s in statuses) + f' | {sum(cnt[(m, s)] for s in statuses)} |')
L.append('| total | ' + ' | '.join(str(sum(cnt[(m, s)] for m in methods)) for s in statuses) + f' | {len(rows)} |')
L += ['', '| part | ' + ' | '.join(statuses) + ' |', '|---|' + '---|' * len(statuses)]
for p in sorted(parts):
    L.append(f'| {p} | ' + ' | '.join(str(parts[p][s]) for s in statuses) + ' |')
skipped = [r for r in rows if r['status'] == 'skipped']
why = collections.Counter(r['notes'].split(' (')[0] if r['notes'].startswith('duplicate') else r['notes'] for r in skipped)
L += ['', 'Skipped: ' + '; '.join(f'{k} ({v})' for k, v in why.most_common()) + '.' if skipped else '']
if a.issues and os.path.exists(a.issues):
    L += ['', open(a.issues).read().strip()]
L += ['', '## Files with notes', '']
for r in rows:
    if r['status'] in ('ok-with-notes', 'failed') and r['lyl'] and not r['notes'].startswith('duplicate'):
        L.append(f"- `{os.path.relpath(r['lyl'], 'v2/lilylet/images')}` ({r['status']}, {r['method']}): {r['notes']}")
    elif r['status'] == 'failed':
        L.append(f"- `{r['image']}` (failed): {r['notes']}")
open(os.path.join(out, 'MANIFEST.md'), 'w').write('\n'.join(L) + '\n')
print('rows', len(rows), dict(collections.Counter(r['status'] for r in rows)))

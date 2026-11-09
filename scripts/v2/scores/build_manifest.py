#!/usr/bin/env python3
"""Step 5: publish the verified .lyl files to v2/lilylet/ and write MANIFEST.md/.json.

    python3 scripts/v2/scores/build_manifest.py [--work /tmp/omt-v2-scores]

Status per source file:
  ok              notes/durations/bars/chord symbols identical to music21's reading of the
                  MusicXML, parse + MEI + Verovio clean, nothing approximated
  ok-with-notes   same checks pass, but something in the source cannot be represented
                  or is doubtful (see notes)
  skipped-empty   no notes and no chord symbols (blank template); no .lyl written
  skipped-percussion  drum/percussion score; out of scope, no .lyl written
  failed          could not be converted
"""
import argparse, hashlib, json, os, re, shutil
from collections import Counter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
ap = argparse.ArgumentParser()
ap.add_argument('--work', default='/tmp/omt-v2-scores')
a = ap.parse_args()
W = a.work
OUT = os.path.join(ROOT, 'v2', 'lilylet')

inv = json.load(open(os.path.join(W, 'inventory.json')))
cmp_ = json.load(open(os.path.join(W, 'compare.json')))
hidden = json.load(open(os.path.join(W, 'hidden.json'))) if os.path.exists(os.path.join(W, 'hidden.json')) else {}
hclefs = json.load(open(os.path.join(W, 'headerclefs.json'))) if os.path.exists(os.path.join(W, 'headerclefs.json')) else {}
downgraded = set(json.load(open(os.path.join(W, 'downgraded.json')))) if os.path.exists(os.path.join(W, 'downgraded.json')) else set()

# Visual review (MuseScore render of the source vs the lilylet render; omr-review/v2.html).
# {rel: {"checked": "YYYY-MM-DD", "note"?, "issue"?, "minor"?}}; an issue keeps the file at
# ok-with-notes unless it is marked minor (cosmetic: layout, a redundant symbol).
_rv = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'review.json')
REVIEW = json.load(open(_rv)) if os.path.exists(_rv) else {}

SPLITS = {'2019/05/The_48_Fugue_Subjects_of_the_Well-Tempered_Clavier':
          'split into 48 files, one per subject (subdirectory 01.lyl..48.lyl), each verified against the whole; '
          'the source labels bar 85 "BWV 871" but it is BWV 872 (C# major); the whole file is kept as well'}


def category(f, rel):
    b = os.path.basename(rel)
    ch = (f['chapters'] or [''])[0]
    if re.match(r'(I|II|III)-(Solutions|Exercises|Distinct)$', b):
        return 'counterpoint-fux'
    if 'Fugue_Subjects' in b:
        return 'fugue-subjects'
    if re.search(r'Benedictus|Bicinum|Surge_Propera|16th-century', b):
        return 'counterpoint-16th-century'
    if ch.startswith('02-counterpoint') or 'species' in b.lower() or 'Cantus' in b:
        return 'counterpoint-species'
    if ch.startswith('06-jazz') or re.search(r'blues|Lead-Sheet|Chord-Symbols|swing|voicing|improv|bebop|ii-v-i|substitutions|embellishing-chords', b, re.I):
        return 'jazz'
    if ch.startswith('07-popular') or re.search(r'Drumbeats|pop-music|fragile|modal-schemas|Desperado|Modal_Reharm', b, re.I):
        return 'popular-music'
    if ch.startswith('05-chromaticism') or re.search(r'Applied-Chords|neo-riemannian|Harmonic-Elision|enharmonic-reinterp', b, re.I):
        return 'chromatic-harmony'
    if ch.startswith('03-diatonic') or re.search(r'Cadence|embellishing-tones|Mayer|Concertante|bass-harmonizations', b, re.I):
        return 'diatonic-harmony'
    if ch.startswith('04-form') or 'Binary' in b or 'binary' in b or 'Phrase-Archetypes' in b:
        return 'form'
    if ch.startswith('08-') or re.search(r'Pitch-Class|pc-sets|Collections|Diatonic-Modes-Identification', b):
        return 'post-tonal'
    if ch.startswith('11-rhythm') or re.search(r'Rhythm|rhythm|meter|Ch9Ex|Grouping', b):
        return 'rhythm-meter'
    return 'fundamentals'


def kind(rel, notes_n, harm_n):
    b = os.path.basename(rel)
    if notes_n == 0 and harm_n == 0:
        return 'empty'
    if re.search(r'Solutions|answers|model-composition|Distinct', b):
        return 'model/solution'
    if b.startswith(('WK-', 'COMP-')) or re.search(r'Exercise|assignment', b):
        return 'workbook-prompt'
    return 'model/example'


def body_hash(code):
    return hashlib.sha1(re.sub(r'^\[.*\]\n', '', code, flags=re.M).encode()).hexdigest()


rows, seen = [], {}
if os.path.isdir(OUT):
    for d in os.listdir(OUT):
        p = os.path.join(OUT, d)
        if re.match(r'^\d{4}$', d) and os.path.isdir(p):
            shutil.rmtree(p)
for f in inv:
    rel = f['local'][len('media/'):].rsplit('.', 1)[0]
    row = {'source': 'v2/' + f['local'], 'url': f['url'], 'chapters': f['chapters'],
           'unreferenced': f['unreferenced'], 'category': category(f, rel)}
    lyl = os.path.join(W, 'lyl', rel + '.lyl')
    chkp = os.path.join(W, 'lyl', rel + '.check.json')
    c = cmp_.get(rel)
    if not os.path.exists(chkp) or c is None or 'error' in c:
        row.update(status='failed', bars=None, lyl=None,
                   notes=['not a MuseScore file (the upload is a PDF with an .mscz name)'
                          if not os.path.exists(os.path.join(W, 'xml', rel + '.musicxml')) else
                          (c or {}).get('error', 'conversion error')])
        row['kind'] = 'unknown'
        rows.append(row)
        continue
    chk = json.load(open(chkp))
    nn, hn = c['notes_src'], c['harm_src']
    row['bars'] = c['bars_src']
    row['staves'] = c['staves_src']
    row['notes_count'] = nn
    row['chord_symbols'] = hn
    row['kind'] = kind(rel, nn, hn)
    notes, doubt = [], False
    if row['kind'] == 'empty':
        row.update(status='skipped-empty', lyl=None, notes=['no notes and no chord symbols (blank template)'])
        rows.append(row)
        continue
    if not c['match'] or chk['errors'] or chk['warnings']:
        doubt = True
        notes.append('VERIFY FAILED: ' + '; '.join(chk['errors'] + chk['warnings'] + ([] if c['match'] else ['note/harmony diff vs music21'])))
    if hclefs.get(rel):
        notes.append(f"{hclefs[rel]} clef changes at system starts restored (MuseScore's export drops header clefs; source patched before export)")
    if f['local'] in downgraded:
        notes.append('saved by MuseScore 4.7; converted with 4.6.5 after re-stamping the file as 4.60')
    # Invisible notes (hidden answers / playback notes): postprocess.ts writes them as
    # spacers; the count it hid must equal the count of <visible>0</visible> notes in the mscx.
    h = hidden.get(rel) or {}
    hid_done = sum(int(m.group(1)) for x in chk['fixes'] for m in [re.match(r'(\d+) invisible notes of the source', x)] if m)
    if h.get('notes', 0) != hid_done:
        doubt = True
        notes.append(f"VERIFY: source has {h.get('notes', 0)} invisible notes, {hid_done} written as spacers")
    if h.get('harmonies'):
        notes.append(f"{h['harmonies']} invisible chord symbols / Roman numerals of the source (answers) left out")
    # percussion scores are out of scope (decision 2026-11-09): lilylet has no percussion staff
    if any(re.search(r'unpitched \(percussion\)', x) for x in chk['fixes']):
        row.update(status='skipped-percussion', lyl=None,
                   notes=['percussion score: skipped (lilylet has no percussion staff; drum notes would be written as pitches)'])
        rows.append(row)
        continue
    for x in chk['fixes']:
        if x.startswith('TUPLET REGROUP PROBLEM'):
            doubt = True
        if re.search(r'unpitched|1-line staff|noteheads', x):
            doubt = True
        if re.search(r'on a staff with no event|HIDDEN NOT MATCHED|FIGURES LOST|TEXT ON RESTS LOST', x):
            doubt = True
        if re.search(r'dropped (template title|placeholder composer)|placed from the MuseScore source \(0 with', x):
            continue
        notes.append(x)
    if c.get('harm_moved'):
        notes.append(f"{c['harm_moved']} chord symbols sit inside a held note/rest in the source and are attached to that note's start")
    if chk.get('fixedPoint') is False:
        notes.append('re-serializing the parsed file changes only the position of a \\stem command inside \\grace {} (same meaning)')
    if chk.get('verovioLog'):
        kinds = Counter(re.sub(r"'[^']*'", "'…'", l) for l in chk['verovioLog'])
        notes.append('Verovio warnings: ' + '; '.join(f'{k} (x{v})' for k, v in kinds.items()))
    if rel in SPLITS:
        notes.append(SPLITS[rel])
    code = open(lyl).read()
    # Octave clefs (treble_8 etc.): fixed in lilylet 38805c8 (decoder writes WRITTEN pitch under
    # <clef-octave-change> without <transpose>); dump-notes.ts compares sounding pitch.
    hsh = body_hash(code)
    if hsh in seen:
        notes.append(f'same music as {seen[hsh]}')
    else:
        seen[hsh] = rel + '.lyl'
    dst = os.path.join(OUT, rel + '.lyl')
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy(lyl, dst)
    split_dir = os.path.join(W, 'lyl', rel)
    if rel in SPLITS and os.path.isdir(split_dir):
        shutil.copytree(split_dir, os.path.join(OUT, rel), dirs_exist_ok=True)
    row['lyl'] = 'v2/lilylet/' + rel + '.lyl'
    rv = REVIEW.get(rel)
    if rv:
        row['review'] = rv
        if rv.get('issue'):
            # a minor (cosmetic) issue is recorded but keeps the file at ok
            doubt = doubt or not rv.get('minor')
            notes.append(('visual review (minor): ' if rv.get('minor') else 'visual review: ') + rv['issue'])
    row['status'] = 'ok-with-notes' if doubt else 'ok'
    row['notes'] = notes
    rows.append(row)

order = {'counterpoint-fux': 0, 'fugue-subjects': 1, 'counterpoint-16th-century': 2, 'counterpoint-species': 3,
         'jazz': 4, 'chromatic-harmony': 5, 'diatonic-harmony': 6, 'rhythm-meter': 7, 'popular-music': 8,
         'form': 9, 'post-tonal': 10, 'fundamentals': 11}
rows.sort(key=lambda r: (order[r['category']], r['source']))
json.dump({'generated_by': 'scripts/v2/scores (see README.md)', 'files': rows},
          open(os.path.join(OUT, 'MANIFEST.json'), 'w'), indent=1, ensure_ascii=False)

st = Counter(r['status'] for r in rows)
bycat = {}
for r in rows:
    bycat.setdefault(r['category'], Counter())[r['status']] += 1
md = ['# OMT 2nd edition score files in lilylet', '',
      'One `.lyl` per MuseScore/MusicXML file uploaded to the 2nd edition (`v2/media/`), same `YYYY/MM/` path.',
      'Built by `scripts/v2/scores/` (see its README). Every file was checked against music21\'s reading of the',
      'MuseScore-exported MusicXML: same bar count, staves, and per staff the same notes (measure, onset, pitch',
      'spelling, duration, grace) and chord symbols; it parses without warnings and renders through MEI in Verovio.',
      '', 'Status: **ok** = all checks pass, nothing approximated; **ok-with-notes** = checks pass but the source',
      'has something lilylet cannot show or that is doubtful (see notes); **skipped-empty** = blank template; **skipped-percussion** = drum score, out of scope.',
      'Invisible notes and rests of the source (hidden answers, playback-only notes) are written as spacers `s`, so the',
      'timing is kept and only what MuseScore draws is drawn. **reviewed**: checked by eye against MuseScore\'s rendering',
      '(`omr-review/v2.html`; records in `scripts/v2/scores/review.json`).', '',
      '| status | count |', '|---|---|'] + [f'| {k} | {v} |' for k, v in sorted(st.items())] + ['',
      '| category | ok | ok-with-notes | skipped-empty | skipped-percussion | failed |', '|---|---|---|---|---|---|'] + \
     [f"| {k} | {v['ok']} | {v['ok-with-notes']} | {v['skipped-empty']} | {v['skipped-percussion']} | {v['failed']} |" for k, v in sorted(bycat.items(), key=lambda x: order[x[0]])] + \
     ['', 'Chord-symbol text comes from the MuseScore source (`<Harmony>`), because the MusicXML export flattens it',
      '(diminished and half-diminished sevenths both become "7"; Roman numerals lose figures and applied targets).', '']
cur = None
for r in rows:
    if r['category'] != cur:
        cur = r['category']
        md += ['', f'## {cur}', '', '| file | chapter | kind | bars | status | reviewed | notes |', '|---|---|---|---|---|---|---|']
    name = os.path.basename(r['source'])
    link = f"[{name}]({r['lyl'][len('v2/lilylet/'):]})" if r.get('lyl') else name
    chap = ', '.join(c.split('/')[-1].replace('.md', '') for c in r['chapters']) or '(unreferenced)'
    nt = '; '.join(r['notes']).replace('|', '\\|')
    rv = r.get('review')
    rvs = (('minor issue' if rv.get('minor') else 'issue') if rv.get('issue') else 'checked') if rv else ''
    md.append(f"| {link} | {chap} | {r['kind']} | {r.get('bars') or ''} | {r['status']} | {rvs} | {nt} |")
open(os.path.join(OUT, 'MANIFEST.md'), 'w').write('\n'.join(md) + '\n')
print(dict(st))
for k, v in sorted(bycat.items(), key=lambda x: order[x[0]]):
    print(f'  {k:28} {dict(v)}')

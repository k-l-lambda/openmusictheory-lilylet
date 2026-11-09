#!/usr/bin/env python3
"""Step 2: read each MusicXML with music21; write the reference note lists and triage data.

    python3 scripts/v2/scores/extract_m21.py [--work /tmp/omt-v2-scores] [--only SUBSTR]

Per file: <work>/m21/<YYYY/MM/base>.json =
  {title, composer, bars, staves:[{name, notes:[[measureIdx, offset, pitches, ql, grace]]}],
   stats:{notes, rests, measuresWithNotes, lyrics, harmonies, texts, figures}}
Measures are counted by order (0-based), not by printed number, so pickups line up.
Staves are flattened in score order (a piano part gives two entries), which is the same
order lilylet uses (part by part, staff 1..n inside a part).

Invisible elements: MuseScore 4.6 exports an invisible note as <notehead>none</notehead>
and an invisible rest as print-object="no" (music21 reads it as notehead None /
style.hideObjectOnPrint). They are left out of `notes` and listed per staff in
`hidden: [[measureIdx, offset, pitches|null, ql, grace]]` (pitches null = a rest,
otherwise only the hidden pitches of the chord); postprocess.ts turns them into spacers.
"""
import argparse, json, os, sys, warnings
from fractions import Fraction
warnings.filterwarnings('ignore')
import music21 as m21

ap = argparse.ArgumentParser()
ap.add_argument('--work', default='/tmp/omt-v2-scores')
ap.add_argument('--only', default=None)
a = ap.parse_args()


def q(x):
    """quarterLength / offset as a string fraction, so both sides compare exactly."""
    f = Fraction(x).limit_denominator(1000)
    return f'{f.numerator}/{f.denominator}' if f.denominator != 1 else str(f.numerator)


def pname(p):
    alt = int(p.accidental.alter) if p.accidental is not None else 0
    return f'{p.step}{alt:+d}{p.octave}'


def extract(path):
    s = m21.converter.parse(path, forceSource=True)
    md = s.metadata
    out = {'title': (md.title or md.movementName or '') if md else '',
           'composer': (md.composer or '') if md else '',
           'staves': []}
    stats = dict(notes=0, rests=0, measuresWithNotes=0, lyrics=0, harmonies=0, texts=0, figures=0, hiddenNotes=0, hiddenRests=0)
    bars = 0
    withNotes = set()
    for part in s.parts:
        measures = list(part.getElementsByClass(m21.stream.Measure))
        bars = max(bars, len(measures))
        notes, hidden = [], []
        for mi, m in enumerate(measures):
            for n in m.recurse().getElementsByClass(m21.note.GeneralNote):
                if isinstance(n, m21.harmony.Harmony):
                    stats['harmonies'] += 1
                    continue
                off = n.getOffsetInHierarchy(m)
                grace = n.duration.isGrace
                if isinstance(n, m21.note.Rest):
                    stats['rests'] += 1
                    if n.style.hideObjectOnPrint:
                        stats['hiddenRests'] += 1
                        hidden.append([mi, q(off), None, '0' if grace else q(n.duration.quarterLength), bool(grace)])
                    continue
                hid = []
                if isinstance(n, m21.chord.Chord) and not isinstance(n, m21.percussion.PercussionChord):
                    ps = sorted(pname(x.pitch) for x in n.notes if x.notehead is not None)
                    hid = sorted(pname(x.pitch) for x in n.notes if x.notehead is None)
                elif isinstance(n, m21.note.Note):
                    ps, hid = ([], [pname(n.pitch)]) if n.notehead is None else ([pname(n.pitch)], [])
                elif isinstance(n, m21.note.Unpitched):
                    # Staff position, as the converter writes it (see postprocess.ts).
                    ps = [f'{n.displayStep}+0{n.displayOctave}']
                elif isinstance(n, m21.percussion.PercussionChord):
                    ps = sorted(f'{x.displayStep}+0{x.displayOctave}' if isinstance(x, m21.note.Unpitched)
                                else pname(x.pitch) for x in n.notes)
                else:
                    ps = ['X']
                rec = lambda pp: [mi, q(off), pp, '0' if grace else q(n.duration.quarterLength), bool(grace)]
                if hid:
                    stats['hiddenNotes'] += len(hid)
                    hidden.append(rec(hid))
                if not ps:
                    continue
                if n.lyrics:
                    stats['lyrics'] += 1
                stats['notes'] += 1
                withNotes.add(mi)
                notes.append(rec(ps))
            for t in m.recurse().getElementsByClass((m21.expressions.TextExpression,)):
                stats['texts'] += 1
            for t in m.recurse().getElementsByClass('FiguredBass'):
                stats['figures'] += 1
        out['staves'].append({'name': part.partName or '', 'notes': notes, 'hidden': hidden})
    stats['measuresWithNotes'] = len(withNotes)
    out['bars'] = bars
    out['stats'] = stats
    return out


inv = json.load(open(os.path.join(a.work, 'inventory.json')))
ok = fail = 0
for f in inv:
    if a.only and a.only not in f['local']:
        continue
    rel = f['local'][len('media/'):].rsplit('.', 1)[0]
    xml = os.path.join(a.work, 'xml', rel + '.musicxml')
    dst = os.path.join(a.work, 'm21', rel + '.json')
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if not os.path.exists(xml):
        json.dump({'error': 'no musicxml'}, open(dst, 'w'))
        fail += 1
        continue
    try:
        json.dump(extract(xml), open(dst, 'w'))
        ok += 1
    except Exception as e:
        json.dump({'error': f'{type(e).__name__}: {e}'}, open(dst, 'w'))
        print('FAIL', rel, e, file=sys.stderr)
        fail += 1
print('ok', ok, 'fail', fail)

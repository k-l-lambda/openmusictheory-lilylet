#!/usr/bin/env python3
"""Step 2b: chord symbols and Roman numerals of every score, with their positions.

    python3 scripts/v2/scores/harmonies.py [--work /tmp/omt-v2-scores] [--only SUBSTR]

Why: musicXmlDecoder appends all of a measure's <harmony> at the END of the first
voice (so they attach to the last note), drops every Roman numeral (<numeral>, no
<root>), and serializeLilyletDoc writes no harmony at all. And MuseScore's MusicXML
export is lossy for the text itself: diminished, half-diminished and augmented
sevenths all come out as kind text "7", and Roman numerals lose their figures and
applied targets ("viio7/ii" -> numeral-root "vii", kind minor).

So: POSITION comes from the MusicXML (measure index, staff, onset in quarters),
TEXT from the MuseScore source's <Harmony><name>/<root>/<base>, paired per
(part, measure) in document order and checked against the MusicXML root/numeral.
If the pairing does not check out, the text is rebuilt from the MusicXML.

Writes <work>/harm/<rel>.json: [{part, staff, measure, onset, text, src}] where src is
"mscx" or "xml".
"""
import argparse, json, os, re, zipfile
from fractions import Fraction
import xml.etree.ElementTree as ET

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
ap = argparse.ArgumentParser()
ap.add_argument('--work', default='/tmp/omt-v2-scores')
ap.add_argument('--only', default=None)
a = ap.parse_args()

ALTER = {-2: 'bb', -1: 'b', 0: '', 1: '#', 2: '##'}
KIND = {'major': '', 'minor': 'm', 'augmented': '+', 'diminished': 'dim', 'dominant': '7',
        'major-seventh': 'maj7', 'minor-seventh': 'm7', 'diminished-seventh': 'dim7',
        'augmented-seventh': '+7', 'half-diminished': 'm7b5', 'major-minor': 'm(maj7)',
        'major-sixth': '6', 'minor-sixth': 'm6', 'dominant-ninth': '9', 'major-ninth': 'maj9',
        'minor-ninth': 'm9', 'dominant-11th': '11', 'major-11th': 'maj11', 'minor-11th': 'm11',
        'dominant-13th': '13', 'major-13th': 'maj13', 'minor-13th': 'm13',
        'suspended-second': 'sus2', 'suspended-fourth': 'sus4', 'power': '5', 'none': ''}


def tpc_name(tpc):
    """MuseScore tonal pitch class (14 = C, +1 = a fifth up) -> 'Eb', 'F#'."""
    tpc = int(tpc)
    i = (tpc - 14) % 7
    step = 'CGDAEBF'[i]
    alter = (tpc - 14 - [0, 1, 2, 3, 4, 5, -1][i]) // 7
    # 'F' is a fifth below C, so it is reached as -1, not +6
    if step == 'F':
        alter = (tpc - 13) // 7
    return step + ALTER.get(alter, '?')


def xml_text(h):
    """Chord text rebuilt from a MusicXML <harmony> (fallback when no mscx pairing)."""
    k = h.find('kind')
    if h.find('numeral') is not None:
        nr = h.find('numeral/numeral-root')
        txt = (nr.get('text') if nr is not None else '') or ''
        inv = h.findtext('inversion')
        return txt + ({'1': '6', '2': '64'}.get(inv, '') if (k is None or '7' not in (k.text or '')) else '')
    if h.find('root') is None:
        return k.get('text', '') if k is not None else ''
    if k is not None and k.text == 'none':
        return k.get('text', '')       # free text (blanks "_____", figures "64", ...)
    s = h.findtext('root/root-step') + ALTER.get(int(h.findtext('root/root-alter') or 0), '')
    kt = k.get('text') if k is not None else None
    s += kt if kt is not None else KIND.get(k.text if k is not None else 'major', '')
    for d in h.findall('degree'):
        if d.findtext('degree-type') in ('add', 'alter') and d.get('print-object') != 'no':
            s += f"({ALTER.get(int(d.findtext('degree-alter') or 0), '')}{d.findtext('degree-value')})"
    if h.find('bass') is not None:
        s += '/' + h.findtext('bass/bass-step') + ALTER.get(int(h.findtext('bass/bass-alter') or 0), '')
    return s


def mscx_source(local):
    p = os.path.join(ROOT, 'v2', local)
    if p.endswith('.mscx'):
        return open(p, encoding='utf-8').read()
    with zipfile.ZipFile(p) as z:
        n = next(n for n in z.namelist() if n.endswith('.mscx') and '/' not in n)
        return z.read(n).decode('utf-8')


def mscx_harmonies(x):
    """{(partIdx, measureIdx): [text, ...]} in document order."""
    score = ET.fromstring(x).find('Score')
    staff_part = []
    for pi, p in enumerate(score.findall('Part')):
        staff_part += [pi] * len(p.findall('Staff'))
    out = {}
    for si, st in enumerate(score.findall('Staff')):
        pi = staff_part[si] if si < len(staff_part) else si
        for mi, m in enumerate(st.findall('Measure')):
            for h in m.iter('Harmony'):
                info = h.find('harmonyInfo')
                src = info if info is not None else h
                name = src.findtext('name') or ''
                root, base = src.findtext('root'), src.findtext('base')
                htype = h.findtext('harmonyType') or '0'
                if root is not None and htype == '0':       # standard chord symbol
                    txt = pretty(tpc_name(root) + name, False) + ('/' + tpc_name(base) if base is not None else '')
                else:                                        # Roman numeral / Nashville / free text
                    txt = pretty(name, htype == '1')
                out.setdefault((pi, mi), []).append({'text': txt, 'root': tpc_name(root)[0] if root else None})
    return out


ROMAN = re.compile(r'^([#b♭♯]*(?:VII|VI|IV|V|III|II|I|vii|vi|iv|v|iii|ii|i))([o0])')


def pretty(txt, roman):
    """MuseScore input syntax -> displayed glyphs: 'o' = diminished, '0' = half-diminished
    (B07 -> Bø7, Bo7 -> B°7, viio7 -> vii°7, ii07 -> iiø7)."""
    if roman:
        return ROMAN.sub(lambda m: m.group(1) + ('°' if m.group(2) == 'o' else 'ø'), txt)
    return re.sub(r'^([A-G](?:bb|b|##|#|♭|♯)?)([o0])(?=\d|$|/|\()', lambda m: m.group(1) + ('°' if m.group(2) == 'o' else 'ø'), txt)


def same(h, m):
    """Does the mscx harmony m plausibly correspond to the MusicXML harmony h?"""
    if h.find('numeral') is not None:
        r = (h.find('numeral/numeral-root').get('text') or '').lower()
        return m['text'].lower().lstrip('#b♭♯').startswith(r[:1])
    if h.find('root') is not None:
        k = h.find('kind')
        if k is not None and k.text == 'none':
            return m['text'] == (k.get('text') or '') or m['root'] is None
        return m['root'] == h.findtext('root/root-step')
    return False


def xml_positions(xp):
    """[(partIdx, staff, measureIdx, onset(Fraction quarters), harmonyElement)]."""
    root = ET.parse(xp).getroot()
    res = []
    for pi, p in enumerate(root.findall('part')):
        div = 1
        for mi, m in enumerate(p.findall('measure')):
            cur = 0
            pending = []
            for el in m:
                if el.tag == 'attributes' and el.findtext('divisions'):
                    div = int(el.findtext('divisions'))
                elif el.tag == 'harmony':
                    off = int(el.findtext('offset') or 0)
                    pending.append((el, cur + off))
                elif el.tag == 'note':
                    st = int(el.findtext('staff') or 1)
                    for h, t in pending:
                        res.append((pi, int(h.findtext('staff') or st), mi, Fraction(t, div), h))
                    pending = []
                    if el.find('chord') is None and el.find('grace') is None:
                        cur += int(el.findtext('duration') or 0)
                elif el.tag == 'backup':
                    cur -= int(el.findtext('duration'))
                elif el.tag == 'forward':
                    cur += int(el.findtext('duration'))
            for h, t in pending:
                res.append((pi, int(h.findtext('staff') or 1), mi, Fraction(t, div), h))
    return res


inv = json.load(open(os.path.join(a.work, 'inventory.json')))
for f in inv:
    if a.only and a.only not in f['local']:
        continue
    rel = f['local'][len('media/'):].rsplit('.', 1)[0]
    xp = os.path.join(a.work, 'xml', rel + '.musicxml')
    if not os.path.exists(xp):
        continue
    pos = xml_positions(xp)
    dst = os.path.join(a.work, 'harm', rel + '.json')
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if not pos:
        json.dump([], open(dst, 'w'))
        continue
    ms = {}
    if f['format'] in ('mscz', 'mscx'):
        try:
            ms = mscx_harmonies(mscx_source(f['local']))
        except Exception as e:
            print('mscx read failed', rel, e)
    byk = {}
    for p in pos:
        byk.setdefault((p[0], p[2]), []).append(p)
    out, nx = [], 0
    for k, lst in byk.items():
        cand = ms.get(k, [])
        # Same count and every pair plausible; a chord symbol entered with MuseScore's
        # Roman-numeral tool (exported as <numeral>) only has to match by count.
        paired = len(cand) == len(lst) and all(same(p[4], c) or (p[4].find('numeral') is not None and c['root'] is None)
                                               for p, c in zip(lst, cand))
        for i, (pi, st, mi, t, h) in enumerate(lst):
            if paired:
                txt, src = cand[i]['text'], 'mscx'
            else:
                txt, src = xml_text(h), 'xml'
                nx += 1
            out.append({'part': pi, 'staff': st, 'measure': mi, 'onset': [t.numerator, t.denominator],
                        'text': txt, 'src': src})
    json.dump(out, open(dst, 'w'), ensure_ascii=False)
    print(f'{rel:62} {len(out):4} harmonies, {nx} from MusicXML text')

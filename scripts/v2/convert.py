#!/usr/bin/env python3
"""Convert Open Music Theory, 2nd edition (Pressbooks) to Markdown under v2/.

Source: https://viva.pressbooks.pub/openmusictheory/ (CC BY-SA 4.0). There is no source
repository for the 2nd edition; this reads the Pressbooks REST API (rendered chapter HTML,
the table of contents, contributors, glossary) and the book's WXR export (attachment list).

    python3 scripts/v2/convert.py --cache /tmp/omt-pb [--proxy http://localhost:1091] [--refetch]

Output (v2/):
    README.md                       book metadata, attribution, table of contents
    NN-<part>/README.md             part title, intro, chapter list
    NN-<part>/MM-<chapter>.md       one file per chapter (YAML front matter + Markdown)
    00-front-matter/, 99-back-matter/
    glossary.md
    media/YYYY/MM/<file>            images, score files (mscz/mscx/musicxml) and audio
    materials.json, MATERIALS.md    every score material (images, MuseScore embeds, score
                                    files, audio, interactive exercises) by chapter

docx/pdf/mp4 attachments are not downloaded; links to them stay absolute.
"""
import argparse
import collections
import concurrent.futures as cf
import html as htmllib
import io
import json
import os
import re
import subprocess
import sys
import urllib.parse
from pathlib import Path

from bs4 import BeautifulSoup
from markdownify import markdownify

BOOK = 'https://viva.pressbooks.pub/openmusictheory'
API = BOOK + '/wp-json'
UPLOADS = 'https://viva.pressbooks.pub/app/uploads/sites/12/'
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
IMG = {'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'}
SCORE = {'mscz', 'mscx', 'musicxml', 'mxl', 'mid', 'midi'}
AUDIO = {'mp3', 'm4a', 'wav', 'ogg'}
LOCAL = IMG | SCORE | AUDIO

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'v2'


def ext_of(url):
    path = urllib.parse.urlparse(url).path
    return path.rsplit('.', 1)[-1].lower() if '.' in path.rsplit('/', 1)[-1] else ''


class Fetcher:
    def __init__(self, cache, proxy, refetch):
        self.cache, self.proxy, self.refetch = Path(cache), proxy, refetch
        self.cache.mkdir(parents=True, exist_ok=True)

    def curl(self, url, out, timeout=120):
        cmd = ['curl', '-sSL', '--fail', '-m', str(timeout), '-A', UA, '-o', str(out), url]
        if self.proxy:
            cmd[1:1] = ['-x', self.proxy]
        return subprocess.run(cmd, capture_output=True).returncode == 0

    def json(self, name, url):
        f = self.cache / name
        if self.refetch or not f.exists():
            if not self.curl(url, f):
                raise SystemExit(f'fetch failed: {url}')
        return json.loads(f.read_text())

    def pages(self, name, url):
        items, page = [], 1
        while True:
            f = self.cache / f'{name}-{page}.json'
            if self.refetch or not f.exists():
                if not self.curl(f'{url}{"&" if "?" in url else "?"}per_page=100&page={page}', f):
                    break
            try:
                batch = json.loads(f.read_text())
            except ValueError:
                break
            if not isinstance(batch, list) or not batch:
                break
            items += batch
            if len(batch) < 100:
                break
            page += 1
        return items


# --- HTML → Markdown ---------------------------------------------------------------------------
class Converter:
    def __init__(self, slug_paths, originals, available):
        self.slug_paths = slug_paths      # (kind, slug) -> Path of the .md file
        self.originals = originals        # set of full-size attachment URLs (WXR)
        self.available = available        # uploads URL -> local Path (downloaded)
        self.wanted = set()               # uploads URLs this book needs locally

    def original(self, url):
        url = url.split('?')[0]
        m = re.match(r'(.*)-\d+x\d+(\.\w+)$', url)
        if m and m.group(1) + m.group(2) in self.originals:
            return m.group(1) + m.group(2)
        return url

    def local(self, url, here):
        """Relative link to the downloaded copy of an uploads URL, else the URL itself."""
        url = url.split('?')[0]
        if not url.startswith(UPLOADS) or ext_of(url) not in LOCAL:
            return url
        self.wanted.add(url)
        p = self.available.get(url)
        return os.path.relpath(p, here) if p else url

    def link(self, href, here):
        if href.startswith(UPLOADS):
            return self.local(href, here)
        m = re.match(r'https?://viva\.pressbooks\.pub/openmusictheory/(chapter|front-matter|back-matter|part)/([^/#?]+)/?(#.*)?$', href)
        if m and (m.group(1), m.group(2)) in self.slug_paths:
            return os.path.relpath(self.slug_paths[(m.group(1), m.group(2))], here) + (m.group(3) or '')
        return href

    def convert(self, raw, here, page_url, materials):
        math = []

        def keep_math(m):
            math.append(htmllib.unescape(re.sub(r'<[^>]+>', '', m.group(1))).strip())
            return f'MATHPH{len(math) - 1}X'
        raw = re.sub(r'\[latex\](.*?)\[/latex\]', keep_math, raw, flags=re.S)
        raw = re.sub(r'\[pb_glossary[^\]]*\](.*?)\[/pb_glossary\]', r'\1', raw, flags=re.S)
        soup = BeautifulSoup(raw, 'html.parser')

        for sel in ['div.glossary', 'template', 'span.screen-reader-text', 'style', 'script', 'button']:
            for el in soup.select(sel):
                el.decompose()
        for a in soup.select('a.glossary-term'):
            a.unwrap()

        # footnote markers → placeholders (the notes themselves are taken out after link rewriting)
        for a in soup.select('a.footnote'):
            n = (a.get('href') or a.get('id') or '').rsplit('-', 1)[-1]
            a.replace_with(f'FNREFPH{n}X')
        for a in soup.select('a.return-footnote'):
            a.decompose()

        # text boxes (Key Takeaways, …) → blockquote
        for tb in soup.select('div.textbox'):
            title = tb.select_one('.textbox__title')
            title_text = title.get_text(' ', strip=True) if title else ''
            for h in tb.select('header.textbox__header'):
                h.decompose()
            content = tb.select_one('.textbox__content') or tb
            bq = soup.new_tag('blockquote')
            if title_text:
                p = soup.new_tag('p'); s = soup.new_tag('strong'); s.string = title_text; p.append(s); bq.append(p)
            for child in list(content.children):
                bq.append(child.extract())
            tb.replace_with(bq)

        # images (full size, local copy); figures → image + italic caption
        for fig in soup.select('figure'):
            cap = fig.find('figcaption')
            cap_html = cap.decode_contents() if cap else ''
            if cap:
                cap.decompose()
            img = fig.find('img')
            if img and cap_html:
                img['alt'] = re.sub(r'\s+', ' ', BeautifulSoup(cap_html, 'html.parser').get_text(' ')).strip()
            fig.name = 'div'
            if cap_html:
                p = soup.new_tag('p'); em = soup.new_tag('em')
                em.append(BeautifulSoup(cap_html, 'html.parser')); p.append(em); fig.append(p)
        for img in soup.find_all('img'):
            src = self.original(img.get('src') or '')
            parent = img.parent
            if parent and parent.name == 'a' and parent.get('href', '').split('?')[0] in (src, img.get('src')):
                parent.unwrap()
            for attr in ['srcset', 'sizes', 'class', 'width', 'height', 'loading', 'decoding', 'style']:
                img.attrs.pop(attr, None)
            img['src'] = self.local(src, here)
            materials.append({'type': 'image', 'url': src, 'local': img['src'] if not img['src'].startswith('http') else None,
                              'caption': img.get('alt', '')})

        # embeds → links
        for fr in soup.find_all('iframe'):
            src = htmllib.unescape(fr.get('src') or '')
            title = fr.get('title') or ''
            p = soup.new_tag('p')
            def a(label, href):
                t = soup.new_tag('a', href=href); t.string = label; return t
            if 'musescore.com' in src:
                url = re.sub(r'/embed/?$', '', src.split('?')[0])
                p.append('🎼 '); p.append(a('MuseScore score', url))
                materials.append({'type': 'musescore', 'url': url})
            elif 'youtube.com' in src or 'youtu.be' in src:
                vid = re.search(r'(?:embed/|v=|youtu\.be/)([\w-]{11})', src)
                url = f'https://www.youtube.com/watch?v={vid.group(1)}' if vid else src
                p.append('▶️ '); p.append(a('Video' + (f': {title}' if title else ''), url))
                materials.append({'type': 'video', 'url': url})
            elif 'spotify.com' in src:
                url = src.replace('/embed/', '/').split('?')[0]
                p.append('🎧 '); p.append(a('Spotify' + (f': {title}' if title else ''), url))
                materials.append({'type': 'spotify', 'url': url})
            elif 'vimeo.com' in src:
                vid = re.search(r'video/(\d+)', src)
                url = f'https://vimeo.com/{vid.group(1)}' if vid else src
                p.append('▶️ '); p.append(a('Video' + (f': {title}' if title else ''), url))
                materials.append({'type': 'video', 'url': url})
            elif 'h5p' in ' '.join(fr.get('class') or []) or src == 'about:blank':
                p.append(f'🧩 Interactive exercise (H5P){": " + title if title else ""}, available in the ')
                p.append(a('online edition', page_url)); p.append('.')
                materials.append({'type': 'h5p', 'url': page_url, 'title': title})
            elif 'brianedwardjarvis.com' in src:
                p.append('🖥 '); p.append(a('Interactive notation (Brian Jarvis)' + (f': {title}' if title else ''), src))
                materials.append({'type': 'interactive', 'url': src})
            else:
                p.append('🔗 '); p.append(a('Embedded content' + (f': {title}' if title else ''), src))
                materials.append({'type': 'embed', 'url': src})
            fr.replace_with(p)
        for au in soup.find_all('audio'):
            source = au.find('source')
            src = (source.get('src') if source else au.get('src') or '').split('?')[0]
            p = soup.new_tag('p'); p.append('🔊 ')
            t = soup.new_tag('a', href=self.local(src, here)); t.string = src.rsplit('/', 1)[-1]; p.append(t)
            au.replace_with(p)
            materials.append({'type': 'audio', 'url': src})

        # links
        for a in soup.find_all('a', href=True):
            href = htmllib.unescape(a['href']).strip()
            if href.startswith('//'):
                href = 'https:' + href
            elif href.startswith('/'):
                href = 'https://viva.pressbooks.pub' + href
            elif href in ('', 'undefined') or href.startswith('javascript:'):
                a.unwrap()
                continue
            e = ext_of(href)
            if e in SCORE:
                kind = 'score-file:when-in-rome' if 'When-in-Rome' in href else 'score-file'
                materials.append({'type': kind, 'url': href.split('?')[0], 'format': e})
            elif e in AUDIO and href.startswith(UPLOADS):
                materials.append({'type': 'audio', 'url': href.split('?')[0]})
            a['href'] = self.link(href, here)
            for attr in ['class', 'rel', 'target', 'aria-label', 'id', 'title']:
                a.attrs.pop(attr, None)

        # footnotes → [^n]
        notes = {}
        box = soup.select_one('div.footnotes')
        if box:
            for li in box.select('li[id^="footnote-"]'):
                notes[li['id'].rsplit('-', 1)[1]] = li.decode_contents()
            box.decompose()

        # headings: the chapter title is the only H1
        levels = sorted({int(h.name[1]) for h in soup.find_all(re.compile(r'^h[1-6]$'))})
        if levels and levels[0] < 2:
            shift = 2 - levels[0]
            for h in soup.find_all(re.compile(r'^h[1-6]$')):
                h.name = f'h{min(6, int(h.name[1]) + shift)}'

        md = markdownify(str(soup), heading_style='ATX', bullets='-', sub_symbol='<sub>', sup_symbol='<sup>', escape_misc=False)
        foot = []
        for n, note in notes.items():
            text = markdownify(note, sub_symbol='<sub>', sup_symbol='<sup>', escape_misc=False).strip().replace('\n', ' ')
            foot.append(f'[^{n}]: {text}')
        md = md + ('\n\n' + '\n'.join(foot) if foot else '')
        md = re.sub(r'FNREFPH(\w+?)X', r'[^\1]', md)
        md = re.sub(r'MATHPH(\d+)X', lambda m: '$' + math[int(m.group(1))] + '$', md)
        md = re.sub(r'[ \t]+\n', '\n', md)
        md = re.sub(r'(\n>\n)(>\n)+', r'\1', md)
        md = re.sub(r'\n{3,}', '\n\n', md).strip() + '\n'
        return md


def slugify_dir(i, slug):
    return f'{i:02d}-{slug}'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--cache', default='/tmp/omt-pb')
    ap.add_argument('--proxy', default=os.environ.get('https_proxy'))
    ap.add_argument('--refetch', action='store_true')
    ap.add_argument('--jobs', type=int, default=16)
    args = ap.parse_args()
    F = Fetcher(args.cache, args.proxy, args.refetch)

    toc = F.json('toc.json', API + '/pressbooks/v2/toc')
    meta = F.json('meta.json', API + '/pressbooks/v2/metadata')
    docs = {}
    for kind in ['chapters', 'front-matter', 'back-matter', 'parts']:
        for d in F.pages(kind, f'{API}/pressbooks/v2/{kind}?context=view'):
            if isinstance(d, dict) and 'content' in d:
                docs[d['id']] = d
    contributors = {c['slug']: c['name'] for c in F.pages('contrib', f'{API}/wp/v2/contributor')}
    glossary = F.pages('glossary', f'{API}/pressbooks/v2/glossary?context=view')
    wxr = F.cache / 'export.wxr'
    if args.refetch or not wxr.exists():
        F.curl(BOOK + '/open/download?type=wxr', wxr, timeout=600)
    wtext = wxr.read_text(encoding='utf-8')
    attachments = re.findall(r'<wp:attachment_url><!\[CDATA\[([^\]]+)\]\]>', wtext)
    originals = set(attachments)

    # entries in reading order, with output paths
    entries = []   # (kind, toc_item, path, part_index)
    def add(kind, item, path, part=None):
        if item['id'] not in docs:
            docs[item['id']] = F.json(f'ch-{item["id"]}.json', f'{API}/pressbooks/v2/{kind}/{item["id"]}?context=view')
        entries.append((kind, item, path, part))
    for i, item in enumerate(toc['front-matter'], 1):
        add('front-matter', item, OUT / '00-front-matter' / f'{i:02d}-{item["slug"]}.md')
    part_dirs = []
    pi = 0
    for part in toc['parts']:
        if not part['chapters']:
            continue
        pi += 1
        d = OUT / slugify_dir(pi, part['slug'])
        part_dirs.append((pi, part, d))
        for j, ch in enumerate(part['chapters'], 1):
            add('chapters', ch, d / f'{j:02d}-{ch["slug"]}.md', pi)
    for i, item in enumerate(toc['back-matter'], 1):
        add('back-matter', item, OUT / '99-back-matter' / f'{i:02d}-{item["slug"]}.md')
    kind_url = {'chapters': 'chapter', 'front-matter': 'front-matter', 'back-matter': 'back-matter'}
    slug_paths = {(kind_url[k], it['slug']): p for k, it, p, _ in entries}
    for pi, part, d in part_dirs:
        slug_paths[('part', part['slug'])] = d / 'README.md'

    def render(available):
        conv = Converter(slug_paths, originals, available)
        out, mats = {}, []
        for kind, item, path, part in entries:
            doc = docs[item['id']]
            m = []
            body = conv.convert(doc['content']['rendered'], path.parent, item['link'], m)
            authors = [contributors.get(s, s) for s in (doc.get('meta') or {}).get('pb_authors') or []]
            sub = ((doc.get('meta') or {}).get('pb_subtitle') or '').strip()
            fm = {'title': htmllib.unescape(item['title']), 'slug': item['slug'], 'source': item['link'],
                  'authors': authors, 'license': 'CC BY-SA 4.0', 'modified': (doc.get('modified') or '')[:10]}
            if sub:
                fm['subtitle'] = sub
            head = '---\n' + ''.join(f'{k}: {json.dumps(v, ensure_ascii=False)}\n' for k, v in fm.items()) + '---\n\n'
            head += f'# {fm["title"]}\n\n' + (f'*{sub}*\n\n' if sub else '')
            out[path] = head + body
            for x in m:
                x['chapter'] = str(path.relative_to(OUT))
                if x.get('local') and not x['local'].startswith('http'):
                    x['local'] = str((path.parent / x['local']).resolve().relative_to(OUT))
            mats += m
        for pi, part, d in part_dirs:
            doc = docs.get(part['id'])
            intro = conv.convert(doc['content']['rendered'], d, part['link'], []) if doc and doc['content']['rendered'].strip() else ''
            lines = [f'# {htmllib.unescape(part["title"])}', '', intro.strip(), ''] if intro.strip() else [f'# {htmllib.unescape(part["title"])}', '']
            lines += [f'{j}. [{htmllib.unescape(ch["title"])}]({j:02d}-{ch["slug"]}.md)' for j, ch in enumerate(part['chapters'], 1)]
            out[d / 'README.md'] = '\n'.join(lines).strip() + '\n'
        return out, mats, conv.wanted

    # pass 1: which uploads are needed; download them (+ all score/audio attachments)
    _, _, wanted = render({})
    wanted |= {u for u in attachments if ext_of(u) in SCORE | AUDIO}
    media = OUT / 'media'
    def target(u):
        return media / urllib.parse.unquote(u[len(UPLOADS):])
    def fetch(u):
        t = target(u)
        if t.exists() and t.stat().st_size:
            return u, t
        t.parent.mkdir(parents=True, exist_ok=True)
        if F.curl(u, t):
            return u, t
        t.unlink(missing_ok=True)
        return u, None
    with cf.ThreadPoolExecutor(args.jobs) as ex:
        got = dict(ex.map(fetch, sorted(wanted)))
    available = {u: t for u, t in got.items() if t}
    missing = sorted(u for u, t in got.items() if not t)

    # lossless PNG recompression (pixel-identical or kept as is)
    try:
        from PIL import Image, ImageChops
        for t in available.values():
            if t.suffix.lower() != '.png' or t.stat().st_size < 200_000:
                continue
            im = Image.open(t); im.load(); buf = io.BytesIO(); im.save(buf, 'PNG', optimize=True)
            back = Image.open(io.BytesIO(buf.getvalue())); back.load()
            if buf.tell() < t.stat().st_size and back.mode == im.mode and back.size == im.size and ImageChops.difference(back.convert('RGBA'), im.convert('RGBA')).getbbox() is None:
                t.write_bytes(buf.getvalue())
    except ImportError:
        pass

    # pass 2: write
    out, mats, _ = render(available)
    for path, text in out.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding='utf-8')
    referenced = {m['url'] for m in mats}
    for u in sorted(available):
        if ext_of(u) in SCORE | AUDIO and u not in referenced:
            mats.append({'type': 'score-file' if ext_of(u) in SCORE else 'audio', 'url': u, 'chapter': None,
                         'local': str(available[u].relative_to(OUT)), 'unreferenced': True,
                         **({'format': ext_of(u)} if ext_of(u) in SCORE else {})})
        elif u in referenced:
            for m in mats:
                if m['url'] == u and not m.get('local'):
                    m['local'] = str(available[u].relative_to(OUT))

    # glossary
    g = ['# Glossary', '', f'From [{BOOK}]({BOOK}/), CC BY-SA 4.0.', '']
    for term in sorted(glossary, key=lambda t: htmllib.unescape(t['title']['rendered']).lower()):
        defn = markdownify(term['content']['rendered'], sub_symbol='<sub>', sup_symbol='<sup>', escape_misc=False).strip().replace('\n\n', ' ').replace('\n', ' ')
        g.append(f'**{htmllib.unescape(term["title"]["rendered"])}**: {defn}')
        g.append('')
    (OUT / 'glossary.md').write_text('\n'.join(g), encoding='utf-8')

    # materials
    json.dump({'source': BOOK, 'missing_downloads': missing, 'materials': mats},
              open(OUT / 'materials.json', 'w'), ensure_ascii=False, indent=1)
    write_materials_md(mats, missing, entries, part_dirs)

    # README
    authors = ', '.join(a['name'] for a in meta.get('author', []))
    editors = ', '.join(a['name'] for a in meta.get('editor', []))
    lines = [f'# {meta["name"]} (2nd edition)', '',
             f'Markdown conversion of [*Open Music Theory*, Version 2]({BOOK}/), {authors}; edited by {editors}. '
             f'Licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); each chapter lists its own authors.', '',
             'Converted by `scripts/v2/convert.py` from the Pressbooks REST API and the book\'s WXR export. '
             'Images, score files and audio are in `media/`; worksheets (docx/pdf) and videos link to Pressbooks. '
             'MuseScore embeds, videos and interactive exercises are links. See [MATERIALS.md](MATERIALS.md) for an inventory of the score materials.', '',
             '- [Front matter](00-front-matter/)']
    for i, item in enumerate(toc['front-matter'], 1):
        lines.append(f'  - [{htmllib.unescape(item["title"])}](00-front-matter/{i:02d}-{item["slug"]}.md)')
    for pi, part, d in part_dirs:
        lines.append(f'- [{htmllib.unescape(part["title"])}]({d.name}/README.md)')
        for j, ch in enumerate(part['chapters'], 1):
            lines.append(f'  - [{htmllib.unescape(ch["title"])}]({d.name}/{j:02d}-{ch["slug"]}.md)')
    lines.append('- [Back matter](99-back-matter/)')
    for i, item in enumerate(toc['back-matter'], 1):
        lines.append(f'  - [{htmllib.unescape(item["title"])}](99-back-matter/{i:02d}-{item["slug"]}.md)')
    lines += ['- [Glossary](glossary.md)', '']
    (OUT / 'README.md').write_text('\n'.join(lines), encoding='utf-8')
    print(f'v2: {len(out)} markdown files, {len(available)} media files ({len(missing)} not downloadable), {len(mats)} material entries')


def write_materials_md(mats, missing, entries, part_dirs):
    TYPES = [('image', 'Images (notation examples, diagrams)'), ('musescore', 'MuseScore embedded scores'),
             ('score-file', 'Score files on Pressbooks (mscz/mscx/musicxml)'), ('score-file:when-in-rome', 'Score files in the When-in-Rome corpus (links)'),
             ('audio', 'Audio files'), ('h5p', 'H5P interactive exercises'), ('interactive', 'Interactive notation apps (Brian Jarvis)'),
             ('video', 'Videos (YouTube/Vimeo)'), ('spotify', 'Spotify tracks'), ('embed', 'Other embeds')]
    uniq = collections.defaultdict(set)
    for m in mats:
        uniq[m['type']].add(m['url'])
    lines = ['# Score materials in OMT 2nd edition', '', 'Generated by `scripts/v2/convert.py`; details in `materials.json`.', '',
             '| Kind | Occurrences | Unique | Local copies |', '|---|---:|---:|---:|']
    for t, label in TYPES:
        occ = [m for m in mats if m['type'] == t and not m.get('unreferenced')]
        loc = len({m['url'] for m in mats if m['type'] == t and m.get('local')})
        extra = sum(1 for m in mats if m['type'] == t and m.get('unreferenced'))
        lines.append(f'| {label} | {len(occ)} | {len(uniq[t])}{f" (+{extra} unreferenced)" if extra else ""} | {loc} |')
    fmt = collections.Counter(m.get('format') for m in mats if m['type'].startswith('score-file') for _ in [0])
    lines += ['', 'Score file formats (occurrences): ' + ', '.join(f'{k} {v}' for k, v in fmt.most_common()), '']
    lines += ['## By part', '', '| Part | Chapters | Images | MuseScore | Score files | Audio | Interactive |', '|---|---:|---:|---:|---:|---:|---:|']
    for pi, part, d in part_dirs:
        ms = [m for m in mats if (m.get('chapter') or '').startswith(d.name + '/')]
        c = collections.Counter(m['type'] for m in ms)
        lines.append(f'| {htmllib.unescape(part["title"])} | {len(part["chapters"])} | {c["image"]} | {c["musescore"]} | '
                     f'{c["score-file"] + c["score-file:when-in-rome"]} | {c["audio"]} | {c["h5p"] + c["interactive"]} |')
    if missing:
        lines += ['', f'## Not downloadable ({len(missing)})', ''] + [f'- {u}' for u in missing]
    (OUT / 'MATERIALS.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()

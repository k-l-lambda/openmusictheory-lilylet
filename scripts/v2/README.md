# OMT 2nd edition → Markdown

`convert.py` rebuilds `v2/` from *Open Music Theory*, Version 2
(<https://viva.pressbooks.pub/openmusictheory/>, CC BY-SA 4.0). The 2nd edition has no
source repository; it lives on Pressbooks. The script reads:

- the Pressbooks REST API: TOC, rendered chapter HTML, contributors, glossary;
- the book's WXR export (`/open/download?type=wxr`), used for the full-size originals of
  scaled images.

```sh
pip install --target /tmp/omt-pb/pylib markdownify==0.13.1   # bs4 + Pillow assumed present
PYTHONPATH=/tmp/omt-pb/pylib python3 scripts/v2/convert.py --cache /tmp/omt-pb --proxy http://localhost:1091
```

API responses are cached in `--cache`; `--refetch` refreshes them. The conversion:

- `[latex]` becomes `$…$`; footnotes become `[^n]`; text boxes become blockquotes.
- Links to other chapters become relative links.
- MuseScore, YouTube, Spotify and H5P embeds become links.
- Images (originals, PNGs recompressed losslessly), score files (mscz/mscx/musicxml) and
  audio are downloaded to `v2/media/`. docx, pdf and mp4 stay as links.

`v2/MATERIALS.md` and `v2/materials.json` list every score material by chapter.

`v2/media/` (126 MB) is **not in git**: it is listed in `.gitignore`, because GitHub does not
accept LFS objects for this public fork. Only the Markdown and JSON are committed. Their
relative links to `media/` resolve after a local run of `convert.py`, which downloads the
files again. `materials.json` keeps every file's source URL.

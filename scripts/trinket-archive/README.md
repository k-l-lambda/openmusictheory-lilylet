# Trinket archive

trinket.io shut down on 2026-08-31, which broke the 35 Trinket "music" scores embedded in
the OMT pages (`https://trinket.io/embed/music/<id>`). `fetch.py` recovers their data from
Wayback Machine snapshots of the embed pages: each page carries the score inline as
`trinketObject.code`.

- `ids.txt`: every trinket id with the page that uses it.
- `trinkets.json`: id -> {name, pages, snapshot, code}. 33 of the 35 were recovered;
  `406c96fec0` and `dcdfbf0994` have no snapshot.

The static player that replays them is in lecture-annotation, `scripts/trinket/`.

// Browser entry mirroring lilylet's own tools/browserBundle.ts (the LilyScript
// score-player bundle): exposes window.LilyletLib = { parseCode, getParseWarnings,
// serializeLilyletDoc, meiEncoder }. Imports the specific modules, not the index
// barrel, so the lilypond decoder's node/vue deps stay out of the bundle.
// "lilylet-src" is an esbuild alias set by build.mjs: the pinned npm package, or the
// sibling ../lilylet checkout when it is newer (or LILYLET_SRC points elsewhere).
import { parseCode, getParseWarnings } from "lilylet-src/parser";
import { serializeLilyletDoc } from "lilylet-src/serializer";
import * as meiEncoder from "lilylet-src/meiEncoder";

(window as any).LilyletLib = { parseCode, getParseWarnings, serializeLilyletDoc, meiEncoder };

// Score data: import .lyl files as raw strings via Vite
import k283 from '../Graphics/lilylet/k283.lyl?raw';
import k330 from '../Graphics/lilylet/k330.lyl?raw';
import haydnIII66ii from '../Graphics/lilylet/haydn-III-66-ii.lyl?raw';
import k330ii from '../Graphics/lilylet/k330-ii.lyl?raw';
import k309 from '../Graphics/lilylet/k309.lyl?raw';
import k494 from '../Graphics/lilylet/k494.lyl?raw';
import sym101 from '../Graphics/lilylet/sym101.lyl?raw';
import sym40 from '../Graphics/lilylet/sym40.lyl?raw';
import Op119_1 from '../Graphics/lilylet/Op119-1.lyl?raw';
import DMUDB from '../Graphics/lilylet/DMUDB.lyl?raw';
import K465iv from '../Graphics/lilylet/K465-iv.lyl?raw';
import xv27 from '../Graphics/lilylet/xv27.lyl?raw';
import beethoven_18_2 from '../Graphics/lilylet/beethoven_18_2.lyl?raw';
import beethoven_op30 from '../Graphics/lilylet/beethoven_op30.lyl?raw';
import op2no3 from '../Graphics/lilylet/op2no3.lyl?raw';
import Op109iii from '../Graphics/lilylet/Op109-iii.lyl?raw';

// Import images as Vite assets (resolves to correct URLs)
import img_k283 from '../Graphics/form/k283.png';
import img_k330 from '../Graphics/form/k330.png';
import img_k330ii from '../Graphics/form/k330-ii.png';
import img_k309 from '../Graphics/form/k309.png';
import img_k494 from '../Graphics/form/k494.png';
import img_K465iv from '../Graphics/K465-iv.png';
import img_haydnIII66ii from '../Graphics/form/haydn-III-66-ii.png';
import img_sym101 from '../Graphics/form/sym101.png';
import img_sym40 from '../Graphics/form/sym40.png';
import img_xv27 from '../Graphics/form/xv27.png';
import img_beethoven_18_2 from '../Graphics/form/beethoven_18_2.png';
import img_beethoven_op30 from '../Graphics/form/beethoven_op30.png';
import img_op2no3 from '../Graphics/form/op2no3.png';
import img_Op109iii from '../Graphics/Op109-iii.png';
import img_Op119_1 from '../Graphics/Op119-1.png';
import img_DMUDB from '../Graphics/DMUDB.png';

export interface ScoreEntry {
  id: string;
  title: string;
  imagePath: string;
  code: string;
}

export const scores: ScoreEntry[] = [
  { id: 'k283', title: 'Mozart K.283', imagePath: img_k283, code: k283 },
  { id: 'k330', title: 'Mozart K.330', imagePath: img_k330, code: k330 },
  { id: 'k330-ii', title: 'Mozart K.330 ii', imagePath: img_k330ii, code: k330ii },
  { id: 'k309', title: 'Mozart K.309', imagePath: img_k309, code: k309 },
  { id: 'k494', title: 'Mozart K.494', imagePath: img_k494, code: k494 },
  { id: 'K465-iv', title: 'Mozart K.465 iv', imagePath: img_K465iv, code: K465iv },
  { id: 'haydn-III-66-ii', title: 'Haydn III:66 ii', imagePath: img_haydnIII66ii, code: haydnIII66ii },
  { id: 'sym101', title: 'Haydn Sym.101', imagePath: img_sym101, code: sym101 },
  { id: 'sym40', title: 'Mozart Sym.40', imagePath: img_sym40, code: sym40 },
  { id: 'xv27', title: 'Haydn XV:27', imagePath: img_xv27, code: xv27 },
  { id: 'beethoven_18_2', title: 'Beethoven Op.18 No.2', imagePath: img_beethoven_18_2, code: beethoven_18_2 },
  { id: 'beethoven_op30', title: 'Beethoven Op.30', imagePath: img_beethoven_op30, code: beethoven_op30 },
  { id: 'op2no3', title: 'Beethoven Op.2 No.3', imagePath: img_op2no3, code: op2no3 },
  { id: 'Op109-iii', title: 'Beethoven Op.109 iii', imagePath: img_Op109iii, code: Op109iii },
  { id: 'Op119-1', title: 'Brahms Op.119 No.1', imagePath: img_Op119_1, code: Op119_1 },
  { id: 'DMUDB', title: 'DMUDB', imagePath: img_DMUDB, code: DMUDB },
];

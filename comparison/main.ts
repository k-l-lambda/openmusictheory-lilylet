import * as lilylet from '@k-l-lambda/lilylet';
import type { VerovioToolkit } from 'verovio';
import { scores, type ScoreEntry } from './scores';

// DOM elements
const loadingEl = document.getElementById('loading') as HTMLDivElement;
const selectEl = document.getElementById('score-select') as HTMLSelectElement;
const imageEl = document.getElementById('original-image') as HTMLImageElement;
const svgContainer = document.getElementById('svg-container') as HTMLDivElement;
const editorEl = document.getElementById('code-editor') as HTMLTextAreaElement;
const statusEl = document.getElementById('status') as HTMLSpanElement;

let toolkit: VerovioToolkit;

// --- Verovio initialization (same pattern as lilylet-live-editor) ---
async function initVerovio(): Promise<VerovioToolkit> {
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const VerovioModule = await createVerovioModule();
  const tk = new VerovioToolkit(VerovioModule);
  console.log('Verovio initialized:', tk.getVersion());
  return tk;
}

// --- Lilylet → MEI conversion (reused from lilylet-live-editor) ---
function lilyletToMEI(code: string) {
  const doc = lilylet.parseCode(code);
  const mei = lilylet.meiEncoder.encode(doc);

  let staffCount = 1;
  if (doc.measures && doc.measures.length > 0) {
    const firstMeasure = doc.measures[0];
    staffCount = firstMeasure.parts.reduce((total: number, part: any) => {
      const maxStaff = part.voices.reduce(
        (max: number, voice: any) => Math.max(max, voice.staff || 1), 1
      );
      return total + maxStaff;
    }, 0) || 1;
  }

  return { mei, measureCount: doc.measures?.length || 1, staffCount };
}

// --- Render SVG from lilylet code ---
function renderCode(code: string) {
  statusEl.textContent = 'Rendering...';
  statusEl.className = '';

  try {
    const { mei, measureCount, staffCount } = lilyletToMEI(code);

    // Page size calculation (from lilylet-live-editor)
    const effectiveWidth = Math.max(400, svgContainer.clientWidth - 40);
    const pageWidthUnits = Math.round(effectiveWidth * 2.5);
    const basePageHeight = 2000;
    const measuresPerPage = 20;
    const pageHeight =
      Math.max(basePageHeight, Math.ceil(measureCount / measuresPerPage) * basePageHeight) *
      2 * staffCount;

    toolkit.setOptions({
      scale: 40,
      adjustPageHeight: true,
      pageHeight,
      pageWidth: pageWidthUnits,
      breaks: 'auto' as any,
    });

    const success = toolkit.loadData(mei);
    if (!success) {
      statusEl.textContent = 'Verovio: failed to load MEI';
      statusEl.className = 'error';
      return;
    }

    // Render all pages
    const pageCount = toolkit.getPageCount();
    let svgHtml = '';
    for (let i = 1; i <= pageCount; i++) {
      svgHtml += toolkit.renderToSVG(i);
    }
    svgContainer.innerHTML = svgHtml;

    statusEl.textContent = `OK — ${measureCount} measures, ${staffCount} staves, ${pageCount} pages`;
    statusEl.className = 'ok';
  } catch (e: any) {
    statusEl.textContent = `Error: ${e.message || e}`;
    statusEl.className = 'error';
    svgContainer.innerHTML = '';
  }
}

// --- Debounce utility ---
function debounce(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}

// --- Load a score entry ---
function loadScore(entry: ScoreEntry) {
  console.log('loadScore:', entry.id, entry.imagePath);
  imageEl.src = entry.imagePath;
  imageEl.alt = entry.title;
  editorEl.value = entry.code;
  // Use setTimeout so the browser can update the image before heavy rendering blocks the thread
  setTimeout(() => renderCode(entry.code), 0);
}

// --- Populate select dropdown ---
function populateSelect() {
  scores.forEach((s, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = s.title;
    selectEl.appendChild(opt);
  });
}

// --- Event listeners ---
selectEl.addEventListener('change', () => {
  const idx = parseInt(selectEl.value, 10);
  if (scores[idx]) loadScore(scores[idx]);
});

const debouncedRender = debounce(() => {
  renderCode(editorEl.value);
}, 400);

editorEl.addEventListener('input', debouncedRender);

// Re-render on window resize (debounced)
const debouncedResize = debounce(() => {
  renderCode(editorEl.value);
}, 300);
window.addEventListener('resize', debouncedResize);

// --- Startup ---
(async () => {
  try {
    toolkit = await initVerovio();
    loadingEl.classList.add('hidden');
    populateSelect();
    if (scores.length > 0) {
      selectEl.value = '0';
      loadScore(scores[0]);
    }
  } catch (e: any) {
    loadingEl.textContent = `Failed to initialize Verovio: ${e.message || e}`;
  }
})();

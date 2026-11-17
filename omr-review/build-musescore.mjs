// Build data for the MuseScore SVG -> Lilylet review page.
// Usage: node omr-review/build-musescore.mjs [--staging DIR] [--legacy /tmp/omt-musescore-svg]
// Default staging: /tmp/omt-musescore-svg-v2 (event-graph engine) when present, else the legacy one.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const args = process.argv.slice(2);
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const staging = path.resolve(opt("--staging", fs.existsSync("/tmp/omt-musescore-svg-v2/manifest.json") ? "/tmp/omt-musescore-svg-v2" : "/tmp/omt-musescore-svg"));
// Legacy (Starry-adapter) drafts are shown read-only for comparison when available.
const legacy = path.resolve(opt("--legacy", "/tmp/omt-musescore-svg"));
if (!staging || staging === ROOT) throw new Error("Invalid staging directory");
const hash = (p) => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const fail = (message) => { throw new Error(`musescore review build: ${message}`); };
const safeName = (name) => /^\d+_\d+_p\d+\.svg$/.test(name);
const sourceRoot = path.join(ROOT, "musescore-svg");
const ledgerPath = path.join(staging, "manifest.json");
if (!fs.existsSync(ledgerPath)) fail(`missing ${ledgerPath}`);
const ledger = readJson(ledgerPath);
if (!Array.isArray(ledger) || ledger.length !== 453) fail(`expected 453 ledger rows, got ${ledger.length}`);
const csv = fs.readFileSync(path.join(sourceRoot, "manifest.csv"), "utf8").trim().split(/\r?\n/).slice(1);
const csvNames = new Set(csv.map((line) => line.split(",")[3]).filter(Boolean));
if (csvNames.size !== 453) fail(`expected 453 CSV rows, got ${csvNames.size}`);
const LEGACY_FILES = ["geometry.ts", "parser.ts", "layout.ts", "musescoreToStarry.ts", "svg-to-lilylet.ts"];
const hashCache = new Map();
const converterHashOf = (files) => {
  const key = files.join(",");
  if (!hashCache.has(key)) hashCache.set(key, crypto.createHash("sha256").update(files.map((name) => hash(path.join(ROOT, "scripts/svg", name))).join(":")).digest("hex"));
  return hashCache.get(key);
};
const seen = new Set();
const items = [];
for (const row of ledger) {
  const name = row.source;
  if (typeof name !== "string" || !safeName(name) || !csvNames.has(name)) fail(`invalid or unknown source ${name}`);
  // A draft made by older converter code is still shown, but marked stale.
  const stale = row.converterHash !== converterHashOf(row.converterFiles || LEGACY_FILES);
  if (seen.has(name)) fail(`duplicate source ${name}`);
  seen.add(name);
  const source = path.join(sourceRoot, name);
  if (!fs.existsSync(source) || hash(source) !== row.sourceHash) fail(`source hash mismatch for ${name}`);
  const draftPath = row.draft ? path.resolve(staging, row.draft) : null;
  if (draftPath && (draftPath !== path.join(staging, "lyl", `${name.slice(0, -4)}.lyl`))) fail(`unsafe draft path for ${name}`);
  let code = null;
  if (row.conversion === "draft") {
    if (!draftPath || !fs.existsSync(draftPath)) fail(`missing draft for ${name}`);
    const draftHash = hash(draftPath);
    // Newly generated automatic drafts are pending review and do not yet have
    // a reviewedDraftHash. Once a draft has been reviewed, keep enforcing its
    // recorded hash so the page cannot silently embed a changed transcription.
    if (row.reviewedDraftHash && draftHash !== row.reviewedDraftHash) {
      fail(`reviewed draft hash mismatch for ${name}`);
    }
    code = fs.readFileSync(draftPath, "utf8");
  } else if (row.draft || row.reviewedDraftHash) {
    fail(`failed conversion has draft metadata for ${name}`);
  }
  items.push({
    id: `auto-${name.replace(/[^A-Za-z0-9_-]+/g, "-")}`,
    provenance: "automatic",
    name,
    source: `musescore-svg/${name}`,
    draft: row.draft || null,
    draftLocal: row.draft ? path.join(staging, row.draft) : null,
    code,
    conversion: row.conversion,
    checker: row.checker || "not-run",
    rendered: !!row.rendered,
    review: row.review || "pending",
    reviewNotes: row.reviewNotes || "",
    error: row.error || "",
    sourceHash: row.sourceHash,
    reviewedDraftHash: row.reviewedDraftHash || "",
    stale,
    engine: row.engine || "starry-legacy",
    quality: row.quality || null,
    legacyCode: (() => {
      const p = path.join(legacy, "lyl", `${name.slice(0, -4)}.lyl`);
      return legacy !== staging && fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
    })(),
  });
}
if (seen.size !== csvNames.size) fail(`ledger/CSV mismatch: ${seen.size} vs ${csvNames.size}`);

// The manual transcription is an alternative review item, not a replacement for the automatic draft.
const manualName = "32728834_5769529_p0.lyl";
const manualPath = [staging, legacy].map((dir) => path.join(dir, "manual", manualName)).find((p) => fs.existsSync(p)) || path.join(staging, "manual", manualName);
if (fs.existsSync(manualPath)) {
  const sourceName = manualName.replace(/\.lyl$/, ".svg");
  if (!seen.has(sourceName)) fail(`manual source is not in ledger: ${sourceName}`);
  items.push({
    id: "manual-32728834-5769529-p0",
    provenance: "manual",
    name: `${sourceName} · 手工转写（独立版本）`,
    source: `musescore-svg/${sourceName}`,
    draft: null,
    draftLocal: manualPath,
    code: fs.readFileSync(manualPath, "utf8"),
    conversion: "manual",
    checker: "not-run",
    rendered: false,
    review: "manual",
    reviewNotes: "独立手工转写；不替代自动草稿。注释中说明彩色 step/skip 括号未转写。",
    error: "",
    stale: false,
    sourceHash: hash(path.join(sourceRoot, sourceName)),
    reviewedDraftHash: hash(manualPath),
  });
}
const out = {
  generated: new Date().toISOString(),
  root: ROOT,
  scope: "MuseScore SVG first pages (_p0.svg); automatic drafts are not fidelity approvals",
  staging,
  items,
};
fs.writeFileSync(path.join(HERE, "musescore-data.js"), `window.MUSESCORE_REVIEW = ${JSON.stringify(out)};\n`);
const counts = (key, value) => items.filter((x) => x[key] === value).length;
const grades = {};
for (const x of items) if (x.quality) grades[x.quality.grade] = (grades[x.quality.grade] || 0) + 1;
console.log(`musescore review: ${items.length} items from ${staging} (${counts("conversion", "draft")} drafts, ${counts("conversion", "failed")} conversion failures, ${counts("provenance", "manual")} manual, ${items.filter((x) => x.stale).length} stale; quality ${JSON.stringify(grades)}); ${path.join(HERE, "musescore.html")}`);

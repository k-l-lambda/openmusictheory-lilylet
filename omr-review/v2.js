/* OMT 2nd-edition review page: MuseScore's rendering of each source file (or the original
 * image) vs. the lilylet rendering of its transcription.
 *
 * Data: v2-data.js (window.OMR_REVIEW_V2), built by `node omr-review/build.mjs --v2`.
 * Rendering is the same as the V1 page (review.js): lyl --LilyletLib.parseCode +
 * meiEncoder.encode--> MEI --Verovio--> SVG, lazily as cards scroll into view, one at a
 * time on a shared toolkit. Scores longer than AUTO_MAX_BARS get a button instead, so
 * the page stays responsive.
 */
(function () {
	"use strict";

	const DATA = window.OMR_REVIEW_V2;
	const $ = (id) => document.getElementById(id);
	const els = {
		meta: $("meta"), renderer: $("renderer"), list: $("list"), empty: $("empty"),
		q: $("q"), type: $("type"), category: $("category"), kind: $("kind"), status: $("status"), review: $("review"),
		tpl: $("card-tpl"),
	};
	const AUTO_MAX_BARS = 120;

	if (!DATA || !window.LilyletLib) {
		els.renderer.textContent = "缺少 v2-data.js 或 lilylet bundle：请先运行 node omr-review/build.mjs --v2";
		els.renderer.classList.add("err");
		return;
	}

	const toUrl = (p) => "../" + p.split("/").map(encodeURIComponent).join("/");
	// Bar numbers: Verovio's default (at the start of each system).
	const VEROVIO_OPTIONS = { scale: 40, adjustPageHeight: true, adjustPageWidth: true, breaks: "auto", pageWidth: 2100, pageHeight: 2970, header: "none" };

	let toolkit = null;
	new Promise((resolve, reject) => {
		const start = () => {
			const v = window.verovio;
			if (!v) return reject(new Error("verovio script not loaded"));
			const make = () => {
				try {
					toolkit = new v.toolkit();
					if (v.enableLogToBuffer) v.enableLogToBuffer(true);
					if (v.enableLog && v.LOG_WARNING !== undefined) v.enableLog(v.LOG_WARNING);
					resolve(toolkit);
				} catch (e) { reject(e); }
			};
			if (v.module.calledRun) make();
			else v.module.onRuntimeInitialized = make;
		};
		if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
		else start();
	}).then((tk) => {
		els.renderer.textContent = `Verovio ${tk.getVersion ? tk.getVersion() : DATA.verovio} 已就绪 · lilylet ${DATA.lilylet}`;
		pump();
	}, (e) => {
		els.renderer.textContent = "Verovio 加载失败：" + (e && e.message ? e.message : e);
		els.renderer.classList.add("err");
	});

	const escHtml = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
	const scoreHeader = (md) => {
		if (!md) return "";
		const line = (text, css) => (text ? `<div style="${css}">${escHtml(text)}</div>` : "");
		const right = [md.composer, md.arranger].filter(Boolean).join(" · ");
		const sides = md.lyricist || right
			? `<div style="display:flex;justify-content:space-between;gap:12px;font-size:12px;color:#3d3d39">${line(md.lyricist || "", "")}${line(right, "margin-left:auto")}</div>`
			: "";
		const body = line(md.title, "font-size:16px;color:#1e1e1c") + line(md.subtitle, "font-size:13px;color:#3d3d39") + sides;
		return body ? `<div style="align-self:stretch;text-align:center;font-family:serif;line-height:1.3;overflow-wrap:anywhere">${body}</div>` : "";
	};

	const renderLyl = (code) => {
		const L = window.LilyletLib;
		const doc = L.parseCode(code);
		const parseWarnings = (L.getParseWarnings ? L.getParseWarnings() : []).map((w) => w.message);
		const mei = L.meiEncoder.encode(doc);
		toolkit.setOptions(VEROVIO_OPTIONS);
		if (!toolkit.loadData(mei)) throw new Error("Verovio 无法载入 MEI\n" + (toolkit.getLog() || ""));
		const vrvLog = (toolkit.getLog() || "").split("\n").map((s) => s.trim()).filter(Boolean);
		const pages = [];
		for (let p = 1, n = toolkit.getPageCount(); p <= n; p++) pages.push(toolkit.renderToSVG(p));
		const counts = new Map();
		for (const line of vrvLog) {
			const key = line.replace(/'[^']*'/g, "'…'");
			counts.set(key, (counts.get(key) || 0) + 1);
		}
		const vrvWarnings = [...counts].map(([k, n]) => (n > 1 ? `${k} ×${n}` : k));
		const head = scoreHeader(doc.metadata);
		if (head && pages.length) pages[0] = `<div style="display:flex;flex-direction:column;align-items:center;max-width:100%">${head}${pages[0]}</div>`;
		return { pages, measures: doc.measures.length, warnings: parseWarnings.concat(vrvWarnings), parseWarnings };
	};

	// markdown source (image transcriptions): text as paragraphs, each ```lyl block as a score
	const splitMarkdown = (md) => {
		const segs = [];
		const re = /^```[ \t]*(lyl|lilylet)[^\n]*\n([\s\S]*?)^```[ \t]*$/gm;
		let last = 0, m;
		while ((m = re.exec(md))) {
			if (m.index > last) segs.push({ type: "text", text: md.slice(last, m.index) });
			segs.push({ type: "lyl", code: m[2] });
			last = re.lastIndex;
		}
		if (last < md.length) segs.push({ type: "text", text: md.slice(last) });
		return segs;
	};

	const tag = (text, cls) => {
		const s = document.createElement("span");
		s.className = "tag tag-" + cls;
		s.textContent = text;
		return s;
	};

	// --- lazy render queue ---
	const queue = [];
	let busy = false;
	const pump = () => {
		if (busy || !toolkit || !queue.length) return;
		busy = true;
		const card = queue.shift();
		setTimeout(() => {
			try { fillRender(card); } finally { busy = false; pump(); }
		}, 0);
	};

	const fillRender = (card) => {
		const item = card._item;
		const box = card.querySelector(".render");
		const warnList = card.querySelector(".warnings");
		const tags = card.querySelector(".tags");
		box.textContent = "";
		warnList.textContent = "";
		const addWarnings = (list, prefix) => {
			for (const w of list) {
				const li = document.createElement("li");
				li.textContent = prefix + w;
				warnList.appendChild(li);
			}
		};
		try {
			if (item.format === "md") {
				let scores = 0, measures = 0;
				for (const seg of splitMarkdown(item.code)) {
					if (seg.type === "text") {
						for (const para of seg.text.split(/\n{2,}/)) {
							const t = para.trim();
							if (!t) continue;
							const p = document.createElement("p");
							p.className = /^#/.test(t) ? "md-h" : "md-p";
							p.textContent = t.replace(/^#+\s*/, "");
							box.appendChild(p);
						}
						continue;
					}
					scores++;
					const wrap = document.createElement("div");
					wrap.className = "md-score";
					box.appendChild(wrap);
					try {
						const res = renderLyl(seg.code);
						wrap.innerHTML = res.pages.join("");
						measures += res.measures;
						addWarnings(res.warnings, `#${scores}: `);
					} catch (e) {
						const p = document.createElement("p");
						p.className = "placeholder err";
						p.textContent = `#${scores} 渲染失败：` + (e && e.message ? e.message : e);
						wrap.appendChild(p);
						tags.appendChild(tag("渲染失败", "err"));
					}
				}
				card.querySelector(".pane-render .cap-text").textContent = `lilylet 渲染（markdown）· ${scores} 段 · ${measures} 小节`;
				return;
			}
			const res = renderLyl(item.code);
			box.innerHTML = res.pages.join("");
			card.querySelector(".pane-render .cap-text").textContent =
				`lilylet 渲染 · ${res.measures} 小节${res.pages.length > 1 ? ` · ${res.pages.length} 页` : ""}`;
			addWarnings(res.warnings, "");
			if (res.parseWarnings.length) tags.appendChild(tag(`${res.parseWarnings.length} 条解析警告`, "warn"));
		} catch (e) {
			const p = document.createElement("p");
			p.className = "placeholder err";
			p.textContent = "渲染失败：" + (e && e.message ? e.message : e);
			box.appendChild(p);
			tags.appendChild(tag("渲染失败", "err"));
		}
	};

	const io = new IntersectionObserver((entries) => {
		for (const ent of entries) {
			if (!ent.isIntersecting) continue;
			io.unobserve(ent.target);
			queue.push(ent.target);
		}
		pump();
	}, { rootMargin: "600px 0px" });

	// --- copy local path (as on the V1 page) ---
	const localPath = (p) => (DATA.root ? DATA.root.replace(/\/$/, "") + "/" : "") + p;
	const copyText = async (text) => {
		if (navigator.clipboard && window.isSecureContext) {
			try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fall through */ }
		}
		const ta = document.createElement("textarea");
		ta.value = text;
		ta.setAttribute("readonly", "");
		ta.style.position = "fixed";
		ta.style.opacity = "0";
		document.body.appendChild(ta);
		ta.select();
		let ok = false;
		try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
		ta.remove();
		return ok;
	};
	document.addEventListener("click", async (ev) => {
		const link = ev.target.closest(".copy-path");
		if (!link || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
		ev.preventDefault();
		const status = link.parentNode.querySelector(".copy-status");
		const ok = await copyText(link.dataset.path);
		status.textContent = ok ? "已复制" : "复制失败：" + link.dataset.path;
		status.classList.toggle("err", !ok);
		clearTimeout(status._t);
		if (ok) status._t = setTimeout(() => { status.textContent = ""; }, 1500);
	});

	const STATUS_CLASS = (s) => (s === "ok" ? "st-ok" : s === "ok-with-notes" ? "st-ok-with-notes" : /^skip/.test(s) ? "st-skipped" : /^fail/.test(s) ? "st-failed" : "kind");
	const reviewState = (it) => (!it.review ? "none" : it.review.issue ? "issue" : "checked");

	// --- cards ---
	const cards = DATA.items.map((item) => {
		const card = els.tpl.content.firstElementChild.cloneNode(true);
		card._item = item;
		card.id = item.id;
		card.querySelector(".card-name").textContent = item.name;
		card.querySelector(".path").textContent = item.source;

		const tags = card.querySelector(".tags");
		tags.appendChild(tag(item.status || "?", STATUS_CLASS(item.status)));
		tags.appendChild(tag(item.category, "cat"));
		tags.appendChild(tag(item.kind, "kind"));
		if (item.bars) tags.appendChild(tag(`${item.bars} 小节`, "kind"));
		if (item.restamped) tags.appendChild(tag("MuseScore 4.7（重标 4.60）", "warn"));
		const rs = reviewState(item);
		if (rs === "checked") tags.appendChild(tag("已核验 " + (item.review.checked || ""), "rv-checked"));
		if (rs === "issue") tags.appendChild(tag("核验：有问题", "err"));

		// left: MuseScore pages or the original image
		const orig = card.querySelector(".orig");
		card.querySelector(".orig-cap").textContent = item.type === "image" ? "原图" : `MuseScore 渲染（源文件）${item.left.length > 1 ? ` · ${item.left.length} 页` : ""}`;
		if (!item.left.length) {
			const p = document.createElement("p");
			p.className = "placeholder";
			p.textContent = "（没有 MuseScore 渲染：源文件无法打开，或尚未运行 render_pages.py）";
			orig.appendChild(p);
		}
		item.left.forEach((pg, i) => {
			if (pg.bars) {
				const c = document.createElement("span");
				c.className = "page-cap";
				c.textContent = `第 ${i + 1} 页 · 小节 ${pg.bars[0]}–${pg.bars[1]}`;
				orig.appendChild(c);
			}
			const img = document.createElement("img");
			img.loading = "lazy";
			img.decoding = "async";
			img.src = toUrl(pg.src);
			img.alt = (item.type === "image" ? "原图：" : `MuseScore 第 ${i + 1} 页：`) + item.source;
			orig.appendChild(img);
		});

		if (item.lyl) {
			const link = card.querySelector(".copy-path");
			link.hidden = false;
			link.href = toUrl(item.lyl);
			link.textContent = item.lyl;
			link.title = "点击复制本地路径：" + localPath(item.lyl);
			link.dataset.path = localPath(item.lyl);
		}
		const box = card.querySelector(".render");
		const p = document.createElement("p");
		p.className = "placeholder";
		box.appendChild(p);
		if (!item.code) p.textContent = "（无 lilylet：" + (item.notes[0] || item.status) + "）";
		else if ((item.bars || 0) > AUTO_MAX_BARS) {
			p.textContent = `${item.bars} 小节，较长，未自动渲染。`;
			const b = document.createElement("button");
			b.type = "button";
			b.className = "render-btn";
			b.textContent = "渲染";
			b.addEventListener("click", () => { b.disabled = true; b.textContent = "渲染中…"; queue.unshift(card); pump(); });
			box.appendChild(b);
		} else {
			p.textContent = "等待渲染…";
			io.observe(card);
		}

		card.querySelector(".pages").textContent =
			(item.chapters.length ? "章节：" + item.chapters.join("、") : "未被任何章节引用") +
			(item.review ? `\n核验（${item.review.checked || ""}）：${item.review.issue || "无误"}` : "");
		card.querySelector(".pages").style.whiteSpace = "pre-line";
		const nl = card.querySelector(".notes-list");
		for (const n of item.notes) {
			const li = document.createElement("li");
			li.textContent = n;
			nl.appendChild(li);
		}
		if (item.code) card.querySelector(".code").textContent = item.code;

		card._search = [item.source, item.lyl || "", item.chapters.join(" "), item.notes.join(" ")].join(" ").toLowerCase();
		els.list.appendChild(card);
		return card;
	});

	// --- filters ---
	const fill = (sel, values) => {
		for (const v of values) {
			const o = document.createElement("option");
			o.value = v;
			o.textContent = `${v} (${DATA.items.filter((i) => i[sel.id] === v).length})`;
			sel.appendChild(o);
		}
	};
	const uniq = (k) => [...new Set(DATA.items.map((i) => i[k]).filter(Boolean))].sort();
	fill(els.category, uniq("category"));
	fill(els.kind, uniq("kind"));
	fill(els.status, uniq("status"));

	const applyFilters = () => {
		const q = els.q.value.trim().toLowerCase();
		const f = { type: els.type.value, category: els.category.value, kind: els.kind.value, status: els.status.value };
		const rv = els.review.value;
		let shown = 0;
		for (const card of cards) {
			const it = card._item;
			let ok = !q || card._search.includes(q);
			for (const k in f) if (f[k] && it[k] !== f[k]) ok = false;
			if (rv && reviewState(it) !== rv) ok = false;
			card.hidden = !ok;
			if (ok) shown++;
		}
		els.empty.hidden = shown > 0;
		const n = (fn) => DATA.items.filter(fn).length;
		els.meta.textContent = `显示 ${shown} / ${DATA.items.length} · 乐谱文件 ${n((i) => i.type === "score")}，图片转写 ${n((i) => i.type === "image")}` +
			` · 已核验 ${n((i) => reviewState(i) === "checked")}，有问题 ${n((i) => reviewState(i) === "issue")}` +
			` · 数据生成于 ${new Date(DATA.generated).toLocaleString()}`;
		try {
			localStorage.setItem("omr-review-v2-filters", JSON.stringify({ q: els.q.value, ...f, review: rv }));
		} catch (e) { /* storage unavailable */ }
	};
	try {
		const s = JSON.parse(localStorage.getItem("omr-review-v2-filters") || "null");
		if (s) {
			els.q.value = s.q || "";
			for (const k of ["type", "category", "kind", "status", "review"])
				if (s[k] && [...els[k].options].some((o) => o.value === s[k])) els[k].value = s[k];
		}
	} catch (e) { /* storage unavailable */ }
	els.q.addEventListener("input", applyFilters);
	for (const k of ["type", "category", "kind", "status", "review"]) els[k].addEventListener("change", applyFilters);
	applyFilters();

	if (location.hash) {
		const target = document.getElementById(location.hash.slice(1));
		if (target) target.scrollIntoView();
	}
})();

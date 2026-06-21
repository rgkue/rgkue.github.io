/**
 * scripts.js — Renderizado de /scripts/
 * Lee desde scriptsData (data.js).
 * Filtros: lenguaje, tag, búsqueda.
 */

// ── Helpers ──────────────────────────────────────────────────────
const LANG_COLORS = {
  bash:   "#3ddc84",
  python: "#e8c84a",
  js:     "#e8c84a",
  ruby:   "#e06c6c",
  go:     "#4e9de8",
  rust:   "#e8903a",
};

function langColor(l) {
  return LANG_COLORS[(l || "").toLowerCase()] || "#4e6b55";
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" });
}

// Placeholder SVG
function placeholderThumb(lang) {
  const c = langColor(lang);
  const label = (lang || "?").slice(0, 2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" rx="8" fill="#111a13"/>
    <text x="40" y="50" font-size="24" text-anchor="middle" fill="${c}" font-family="monospace" font-weight="bold">${label}</text>
  </svg>`)}`;
}

const svgExternal = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
</svg>`;

// ── Estado ───────────────────────────────────────────────────────
let activeLang  = null;
let activeTag   = null;
let searchQuery = '';

// ── Render ───────────────────────────────────────────────────────
function render() {
  const data = scriptsData;

  // ── Sidebar: lenguajes ───────────────────────────────────────
  const langs   = [...new Set(data.map(s => s.lang))];
  const langList = document.getElementById("lang-list");
  langList.innerHTML = "";
  langs.forEach(l => {
    const count = data.filter(s => s.lang === l).length;
    const btn   = document.createElement("button");
    btn.className = "filter-btn" + (activeLang === l ? " active" : "");
    btn.innerHTML = `<span style="display:flex;align-items:center">
      <span class="lang-dot" style="background:${langColor(l)}"></span>${l}
    </span><span class="filter-num">${count}</span>`;
    btn.addEventListener("click", () => {
      activeLang  = activeLang === l ? null : l;
      activeTag   = null;
      searchQuery = '';
      document.getElementById("search-input").value = '';
      render();
    });
    langList.appendChild(btn);
  });

  // ── Sidebar: tags ────────────────────────────────────────────
  const allTags = [...new Set(data.flatMap(s => s.tags))].sort();
  const tagList = document.getElementById("tag-list");
  tagList.innerHTML = "";
  allTags.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "filter-btn filter-btn-tag" + (activeTag === t ? " active" : "");
    btn.textContent = t;
    btn.addEventListener("click", () => {
      activeTag   = activeTag === t ? null : t;
      activeLang  = null;
      searchQuery = '';
      document.getElementById("search-input").value = '';
      render();
    });
    tagList.appendChild(btn);
  });

  // ── Panel derecho: stats ─────────────────────────────────────
  document.getElementById("count-total").textContent = data.length;

  const langStats = document.getElementById("lang-stats");
  langStats.innerHTML = "";
  langs.forEach(l => {
    const count = data.filter(s => s.lang === l).length;
    const row   = document.createElement("div");
    row.className = "lstat-row";
    row.innerHTML = `
      <span class="lstat-dot" style="background:${langColor(l)}"></span>
      <span>${l}</span>
      <span class="lstat-num mono">${count}</span>
    `;
    langStats.appendChild(row);
  });

  // ── Filtrar ──────────────────────────────────────────────────
  const q = searchQuery.toLowerCase().trim();
  const filtered = data.filter(s => {
    if (activeLang && s.lang !== activeLang) return false;
    if (activeTag  && !s.tags.includes(activeTag)) return false;
    if (q && !(
      s.title.toLowerCase().includes(q) ||
      (s.description || "").toLowerCase().includes(q) ||
      s.lang.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    )) return false;
    return true;
  });

  // ── Feed ─────────────────────────────────────────────────────
  const feed = document.getElementById("scripts-feed");
  feed.innerHTML = "";

  if (filtered.length === 0) {
    feed.innerHTML = `<div class="empty-state">Sin resultados.</div>`;
    return;
  }

  const group = document.createElement("div");
  group.className = "sc-group";

  const label = document.createElement("div");
  label.className = "sc-group-label";
  label.innerHTML = `<span class="sc-group-icon">~/scripts</span> <span style="margin-left:auto;font-size:0.6rem;color:var(--text-muted)">${filtered.length}</span>`;
  group.appendChild(label);

  const itemsEl = document.createElement("div");
  itemsEl.className = "sc-group-items";

  filtered.forEach(s => {
    const imgSrc = s.image || placeholderThumb(s.lang);
    const card   = document.createElement("div");
    card.className = "sc-card";

    card.innerHTML = `
      <div class="sc-info">
        <div class="sc-top-meta">
          <span class="lang-badge" style="color:${langColor(s.lang)};border-color:${langColor(s.lang)}40;background:${langColor(s.lang)}10">${s.lang}</span>
          <span class="sc-date">${formatDate(s.date)}</span>
        </div>
        <div class="sc-title">${s.title}</div>
        <div class="sc-desc">${s.description || ""}</div>
        <div class="sc-bottom">
          <div class="sc-tags">${s.tags.slice(0, 5).map(t => `<span class="tag">${t}</span>`).join("")}</div>
          <div class="sc-actions">
            <a class="sc-link sc-link-view"
               href="viewer.html?title=${encodeURIComponent(s.title)}&lang=${encodeURIComponent(s.lang)}&file=${encodeURIComponent(s.file)}&repo=${encodeURIComponent(s.repo)}&desc=${encodeURIComponent(s.description || '')}">
              Ver script
            </a>
            ${s.repo ? `<a class="sc-link sc-link-repo" href="${s.repo}" target="_blank" rel="noopener">${svgExternal} Repositorio</a>` : ""}
          </div>
        </div>
      </div>
      <div class="sc-thumb-wrap">
        <img class="sc-thumb" src="${imgSrc}" alt="${s.title}" loading="lazy"
          onerror="this.src='${placeholderThumb(s.lang)}'" />
      </div>
    `;
    itemsEl.appendChild(card);
  });

  group.appendChild(itemsEl);
  feed.appendChild(group);
}

// ── Eventos ──────────────────────────────────────────────────────
document.getElementById("search-input").addEventListener("input", e => {
  searchQuery = e.target.value;
  activeLang  = null;
  activeTag   = null;
  render();
});

document.getElementById("reset-btn").addEventListener("click", () => {
  activeLang  = null;
  activeTag   = null;
  searchQuery = '';
  document.getElementById("search-input").value = '';
  render();
});

document.addEventListener("DOMContentLoaded", render);

// Si DOMContentLoaded ya disparó (scripts en body al final), renderizar de inmediato
if (document.readyState !== "loading") render();

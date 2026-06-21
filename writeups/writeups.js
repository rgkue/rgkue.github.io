/**
 * writeups.js — Renderizado de /writeups/
 * Lee desde writeupsData (writeups-data.js).
 * Filtros: plataforma, dificultad, búsqueda.
 * Panel derecho: stats por plataforma + timeline cronológico.
 * Cards: layout tipo projects (nombre, descripción, tags, imagen, enlace al reto).
 */

// ── Helpers ──────────────────────────────────────────────────────
function platformClass(p) {
  const m = { "HackTheBox": "htb", "TryHackMe": "thm", "DockerLabs": "dl" };
  return m[p] || "def";
}

function diffClass(d) {
  return "diff-" + (d || "").toLowerCase().replace(/\s/g, "");
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateShort(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es", { day: "2-digit", month: "short", year: "2-digit" });
}

// Icono de enlace externo
const svgExternal = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
</svg>`;

// Placeholder SVG cuando no hay imagen
function placeholderThumb(platform) {
  const cls = platformClass(platform);
  const colors = { htb: "#9fef00", thm: "#c11111", dl: "#00acd7", def: "#3ddc84" };
  const c = colors[cls] || colors.def;
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" rx="8" fill="#111a13"/>
    <text x="40" y="48" font-size="32" text-anchor="middle" fill="${c}" font-family="monospace">?</text>
  </svg>`)}`;
}

// ── Estado ───────────────────────────────────────────────────────
let activePlatform   = null;
let activeDifficulty = null;
let searchQuery      = '';

// ── Render principal ─────────────────────────────────────────────
function render() {
  const data = writeupsData;

  // ── Plataformas únicas ──────────────────────────────────────
  const platforms = [...new Set(data.map(w => w.platform))];
  const platList  = document.getElementById("platform-list");
  platList.innerHTML = "";
  platforms.forEach(p => {
    const count = data.filter(w => w.platform === p).length;
    const cls   = platformClass(p);
    const btn   = document.createElement("button");
    btn.className = "filter-btn" + (activePlatform === p ? " active" : "");
    btn.innerHTML = `<span style="display:flex;align-items:center"><span class="plat-dot ${cls}"></span>${p}</span><span class="filter-num">${count}</span>`;
    btn.addEventListener("click", () => {
      activePlatform   = activePlatform === p ? null : p;
      activeDifficulty = null;
      searchQuery      = '';
      document.getElementById("search-input").value = '';
      render();
    });
    platList.appendChild(btn);
  });

  // ── Dificultades únicas ─────────────────────────────────────
  const diffs     = [...new Set(data.map(w => w.difficulty))];
  const diffOrder = ["Very Easy","Easy","Medium","Hard","Insane"];
  diffs.sort((a, b) => diffOrder.indexOf(a) - diffOrder.indexOf(b));
  const diffList = document.getElementById("diff-list");
  diffList.innerHTML = "";
  diffs.forEach(d => {
    const count = data.filter(w => w.difficulty === d).length;
    const btn   = document.createElement("button");
    btn.className = "filter-btn" + (activeDifficulty === d ? " active" : "");
    btn.innerHTML = `<span><span class="diff-badge ${diffClass(d)}">${d}</span></span><span class="filter-num">${count}</span>`;
    btn.addEventListener("click", () => {
      activeDifficulty = activeDifficulty === d ? null : d;
      activePlatform   = null;
      searchQuery      = '';
      document.getElementById("search-input").value = '';
      render();
    });
    diffList.appendChild(btn);
  });

  // ── Panel derecho: stats ────────────────────────────────────
  document.getElementById("count-total").textContent = data.length;

  const platStats = document.getElementById("platform-stats");
  platStats.innerHTML = "";
  platforms.forEach(p => {
    const count = data.filter(w => w.platform === p).length;
    const cls   = platformClass(p);
    const row   = document.createElement("div");
    row.className = "pstat-row";
    row.innerHTML = `<span class="pstat-dot ${cls}"></span><span>${p}</span><span class="pstat-num mono">${count}</span>`;
    platStats.appendChild(row);
  });

  // ── Panel derecho: timeline ─────────────────────────────────
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";
  const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  sorted.forEach(w => {
    const cls  = platformClass(w.platform);
    const item = document.createElement("div");
    item.className = "tl-item";
    item.innerHTML = `
      <span class="tl-dot ${cls}"></span>
      <div class="tl-content">
        <span class="tl-title">${w.title}</span>
        <span class="tl-date">${formatDateShort(w.date)}</span>
      </div>
    `;
    item.addEventListener("click", () => {
      window.location.href = `viewer.html?path=${encodeURIComponent(w.path)}&title=${encodeURIComponent(w.title)}&platform=${encodeURIComponent(w.platform)}&difficulty=${encodeURIComponent(w.difficulty)}`;
    });
    timeline.appendChild(item);
  });

  // ── Filtrar ──────────────────────────────────────────────────
  const q = searchQuery.toLowerCase().trim();
  let filtered = data.filter(w => {
    if (activePlatform   && w.platform   !== activePlatform)   return false;
    if (activeDifficulty && w.difficulty !== activeDifficulty) return false;
    if (q && !(
      w.title.toLowerCase().includes(q) ||
      w.platform.toLowerCase().includes(q) ||
      w.difficulty.toLowerCase().includes(q) ||
      (w.description || "").toLowerCase().includes(q) ||
      w.tags.some(t => t.toLowerCase().includes(q))
    )) return false;
    return true;
  });

  // ── Agrupar por plataforma ──────────────────────────────────
  const groups = {};
  filtered.forEach(w => {
    if (!groups[w.platform]) groups[w.platform] = [];
    groups[w.platform].push(w);
  });

  // ── Feed ─────────────────────────────────────────────────────
  const feed = document.getElementById("writeups-feed");
  feed.innerHTML = "";

  if (filtered.length === 0) {
    feed.innerHTML = `<div class="empty-state">Sin resultados.</div>`;
    return;
  }

  Object.entries(groups).forEach(([platform, items]) => {
    const cls   = platformClass(platform);
    const group = document.createElement("div");
    group.className = "wu-group";

    const label = document.createElement("div");
    label.className = "wu-group-label";
    label.innerHTML = `<span class="pstat-dot ${cls}" style="width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0"></span>${platform} <span style="margin-left:auto;font-size:0.6rem;color:var(--text-muted)">${items.length}</span>`;
    group.appendChild(label);

    const itemsEl = document.createElement("div");
    itemsEl.className = "wu-group-items";

    items.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(w => {
      const imgSrc = w.image || placeholderThumb(platform);

      const card = document.createElement("div");
      card.className = "wu-card";

      card.innerHTML = `
        <div class="wu-info">
          <div class="wu-top-meta">
            <span class="diff-badge ${diffClass(w.difficulty)}">${w.difficulty}</span>
            <span class="wu-date">${formatDate(w.date)}</span>
          </div>
          <div class="wu-title">${w.title}</div>
          <div class="wu-desc">${w.description || ""}</div>
          <div class="wu-bottom">
            <div class="wu-tags">${w.tags.slice(0, 5).map(t => `<span class="tag">${t}</span>`).join("")}</div>
            <div class="wu-actions">
              <a class="wu-link wu-link-writeup" href="viewer.html?path=${encodeURIComponent(w.path)}&title=${encodeURIComponent(w.title)}&platform=${encodeURIComponent(w.platform)}&difficulty=${encodeURIComponent(w.difficulty)}">
                Ver writeup
              </a>
              ${w.url ? `<a class="wu-link wu-link-challenge" href="${w.url}" target="_blank" rel="noopener">${svgExternal} Reto</a>` : ""}
            </div>
          </div>
        </div>
        <div class="wu-thumb-wrap">
          <img class="wu-thumb" src="${imgSrc}" alt="${w.title}" loading="lazy"
            onerror="this.src='${placeholderThumb(platform)}'" />
        </div>
      `;

      itemsEl.appendChild(card);
    });

    group.appendChild(itemsEl);
    feed.appendChild(group);
  });
}

// ── Eventos ──────────────────────────────────────────────────────
document.getElementById("search-input").addEventListener("input", e => {
  searchQuery      = e.target.value;
  activePlatform   = null;
  activeDifficulty = null;
  render();
});

document.getElementById("reset-btn").addEventListener("click", () => {
  activePlatform   = null;
  activeDifficulty = null;
  searchQuery      = '';
  document.getElementById("search-input").value = '';
  render();
});

document.addEventListener("DOMContentLoaded", render);

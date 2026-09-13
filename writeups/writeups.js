/**
 * writeups.js — Renderizado de /writeups/
 * Lee desde writeupsData (writeups-data.js).
 * Filtros combinables (acordeón): plataforma + dificultad + búsqueda.
 * Panel derecho: total + timeline cronológico.
 * Cards: grid (imagen 16:9, descripción, tags, botón grande "Ver writeup").
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

const svgExternal = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
</svg>`;

const svgDoc = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;

// Placeholder cuando no hay imagen
function placeholderThumb(platform) {
  const cls = platformClass(platform);
  const colors = { htb: "#9fef00", thm: "#e8303a", dl: "#4e9de8", def: "#f5a524" };
  const c = colors[cls] || colors.def;
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" rx="8" fill="#161b22"/>
    <text x="40" y="48" font-size="32" text-anchor="middle" fill="${c}" font-family="monospace">?</text>
  </svg>`)}`;
}

// ── Estado ───────────────────────────────────────────────────────
let activePlatform   = null;
let activeDifficulty = null;
let searchQuery      = '';

// ── Acordeón: abrir/cerrar (delegado una sola vez) ──────────────
document.querySelectorAll('.accordion-head').forEach(head => {
  head.addEventListener('click', () => {
    head.closest('.accordion').classList.toggle('open');
  });
});

function filterBtn({ active, label, count, dotClass, onClick }) {
  const btn = document.createElement("button");
  btn.className = "filter-btn" + (active ? " active" : "");
  btn.innerHTML = `
    <span style="display:flex;align-items:center">${dotClass ? `<span class="plat-dot ${dotClass}"></span>` : ''}${label}</span>
    <span class="filter-num">${count}</span>
  `;
  btn.addEventListener("click", onClick);
  return btn;
}

// ── Render principal ─────────────────────────────────────────────
function render() {
  const data = writeupsData;

  // ── Plataformas (combinable) ────────────────────────────────
  const platforms = [...new Set(data.map(w => w.platform))];
  const platList  = document.getElementById("platform-list");
  platList.innerHTML = "";
  platforms.forEach(p => {
    const count = data.filter(w => w.platform === p).length;
    platList.appendChild(filterBtn({
      active: activePlatform === p,
      label: p,
      count,
      dotClass: platformClass(p),
      onClick: () => {
        activePlatform = activePlatform === p ? null : p;
        render();
      }
    }));
  });

  // ── Dificultad (combinable) ─────────────────────────────────
  const diffOrder = ["Very Easy", "Easy", "Medium", "Hard", "Insane"];
  const diffs = [...new Set(data.map(w => w.difficulty))]
    .sort((a, b) => diffOrder.indexOf(a) - diffOrder.indexOf(b));
  const diffList = document.getElementById("diff-list");
  diffList.innerHTML = "";
  diffs.forEach(d => {
    const count = data.filter(w => w.difficulty === d).length;
    diffList.appendChild(filterBtn({
      active: activeDifficulty === d,
      label: d,
      count,
      onClick: () => {
        activeDifficulty = activeDifficulty === d ? null : d;
        render();
      }
    }));
  });

  // ── Panel derecho: total ────────────────────────────────────
  document.getElementById("count-total").textContent = data.length;

  // ── Panel derecho: timeline (siempre muestra todo, sin filtrar) ──
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

  // ── Filtros combinables + búsqueda ──────────────────────────
  const q = searchQuery.toLowerCase().trim();
  const filtered = data.filter(w => {
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

  document.getElementById('feed-count').textContent = `${filtered.length} de ${data.length}`;

  // ── Agrupar por plataforma ───────────────────────────────────
  const groups = {};
  filtered.forEach(w => {
    if (!groups[w.platform]) groups[w.platform] = [];
    groups[w.platform].push(w);
  });

  // ── Feed / grid ───────────────────────────────────────────────
  const feed = document.getElementById("writeups-feed");
  feed.innerHTML = "";

  if (filtered.length === 0) {
    feed.innerHTML = `<div class="empty-state">Sin resultados para "<strong>${q || activeDifficulty || activePlatform}</strong>".</div>`;
    return;
  }

  Object.entries(groups).forEach(([platform, items]) => {
    const cls   = platformClass(platform);
    const group = document.createElement("div");
    group.className = "wu-group";

    const label = document.createElement("div");
    label.className = "wu-group-label";
    label.innerHTML = `<span class="plat-dot ${cls}" style="margin-right:0"></span>${platform}<span class="wu-group-count">${items.length}</span>`;
    group.appendChild(label);

    const itemsEl = document.createElement("div");
    itemsEl.className = "wu-group-items";

    items.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(w => {
      const imgSrc = w.image || placeholderThumb(platform);

      const card = document.createElement("div");
      card.className = "wu-card";
      card.innerHTML = `
        <div class="wu-thumb-wrap">
          <img class="wu-thumb" src="${imgSrc}" alt="${w.title}" loading="lazy" onerror="this.src='${placeholderThumb(platform)}'" />
          <span class="wu-badge ${diffClass(w.difficulty)}">${w.difficulty}</span>
        </div>
        <div class="wu-info">
          <div class="wu-title">${w.title}</div>
          <div class="wu-desc">${w.description || ""}</div>
          <div class="wu-tags">${w.tags.slice(0, 5).map(t => `<span class="tag">${t}</span>`).join("")}</div>
        </div>
        <div class="wu-footer">
          <span class="wu-date">${formatDate(w.date)}</span>
          <div class="wu-actions">
            ${w.url ? `<a class="wu-link-challenge" href="${w.url}" target="_blank" rel="noopener" title="Ver reto original">${svgExternal}</a>` : ""}
            <a class="wu-link-writeup" href="viewer.html?path=${encodeURIComponent(w.path)}&title=${encodeURIComponent(w.title)}&platform=${encodeURIComponent(w.platform)}&difficulty=${encodeURIComponent(w.difficulty)}">
              ${svgDoc} Ver writeup
            </a>
          </div>
        </div>
      `;
      itemsEl.appendChild(card);
    });

    group.appendChild(itemsEl);
    feed.appendChild(group);
  });
}

// ── Eventos ─────────────────────────────────────────────────────
document.getElementById("search-input").addEventListener("input", e => {
  searchQuery = e.target.value;
  render();
});

document.getElementById("reset-btn").addEventListener("click", () => {
  activePlatform   = null;
  activeDifficulty = null;
  searchQuery      = '';
  document.getElementById('search-input').value = '';
  render();
});

document.addEventListener("DOMContentLoaded", render);

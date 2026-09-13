/**
 * scripts.js — Renderizado de /scripts/
 * Lee desde scriptsData (scripts-data.js).
 * Filtros combinables (acordeón): lenguaje + tag + búsqueda, igual
 * que projects/writeups (elegir uno ya no resetea los demás).
 */

// ── Helpers ──────────────────────────────────────────────────────
const LANG_COLORS = {
  bash:   "var(--lang-bash)",
  python: "var(--lang-python)",
  js:     "var(--lang-js)",
  ruby:   "var(--lang-ruby)",
  go:     "var(--lang-go)",
  rust:   "var(--lang-rust)",
};

function langColor(l) {
  return LANG_COLORS[(l || "").toLowerCase()] || "var(--lang-def)";
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" });
}

// Placeholder cuando la imagen del script no carga
function placeholderThumb(lang) {
  const c = langColor(lang);
  const label = (lang || "?").slice(0, 2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" rx="8" fill="#161b22"/>
    <text x="40" y="50" font-size="24" text-anchor="middle" fill="#f5a524" font-family="monospace" font-weight="bold">${label}</text>
  </svg>`)}`;
}

const svgExternal = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
</svg>`;

const svgCode = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;

// ── Estado ───────────────────────────────────────────────────────
let activeLang  = null;
let activeTag   = null;
let searchQuery = '';

// ── Acordeón: abrir/cerrar (delegado una sola vez) ──────────────
document.querySelectorAll('.accordion-head').forEach(head => {
  head.addEventListener('click', () => {
    head.closest('.accordion').classList.toggle('open');
  });
});

function filterBtn({ active, label, count, dotColor, onClick }) {
  const btn = document.createElement("button");
  btn.className = "filter-btn" + (active ? " active" : "");
  btn.innerHTML = `
    <span style="display:flex;align-items:center">${dotColor ? `<span class="lang-dot" style="background:${dotColor}"></span>` : ''}${label}</span>
    <span class="filter-num">${count}</span>
  `;
  btn.addEventListener("click", onClick);
  return btn;
}

// ── Render principal ─────────────────────────────────────────────
function render() {
  const data = scriptsData;

  // ── Lenguaje (combinable) ────────────────────────────────────
  const langs = [...new Set(data.map(s => s.lang))];
  const langList = document.getElementById("lang-list");
  langList.innerHTML = "";
  langs.forEach(l => {
    const count = data.filter(s => s.lang === l).length;
    langList.appendChild(filterBtn({
      active: activeLang === l,
      label: l,
      count,
      dotColor: langColor(l),
      onClick: () => {
        activeLang = activeLang === l ? null : l;
        render();
      }
    }));
  });

  // ── Tags (combinable) ────────────────────────────────────────
  const allTags = [...new Set(data.flatMap(s => s.tags))].sort();
  const tagList = document.getElementById("tag-list");
  tagList.innerHTML = "";
  allTags.forEach(t => {
    const count = data.filter(s => s.tags.includes(t)).length;
    tagList.appendChild(filterBtn({
      active: activeTag === t,
      label: t,
      count,
      onClick: () => {
        activeTag = activeTag === t ? null : t;
        render();
      }
    }));
  });

  // ── Filtros combinables + búsqueda ───────────────────────────
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

  document.getElementById('feed-count').textContent = `${filtered.length} de ${data.length}`;

  // ── Feed ──────────────────────────────────────────────────────
  const feed = document.getElementById("scripts-feed");
  feed.innerHTML = "";

  if (filtered.length === 0) {
    feed.innerHTML = `<div class="empty-state">Sin resultados${q ? ` para "<strong>${q}</strong>"` : ''}.</div>`;
    return;
  }

  // ── Agrupar por lenguaje ──────────────────────────────────────
  const groups = {};
  filtered.forEach(s => {
    if (!groups[s.lang]) groups[s.lang] = [];
    groups[s.lang].push(s);
  });

  Object.entries(groups).forEach(([lang, items]) => {
    const group = document.createElement("div");
    group.className = "sc-group";

    const label = document.createElement("div");
    label.className = "sc-group-label";
    label.innerHTML = `<span class="lang-dot" style="background:${langColor(lang)};margin-right:0"></span>${lang}<span class="sc-group-count">${items.length}</span>`;
    group.appendChild(label);

    const itemsEl = document.createElement("div");
    itemsEl.className = "sc-group-items";

    items.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(s => {
      const card = document.createElement("div");
      card.className = "sc-card";
      card.innerHTML = `
        <div class="sc-thumb-wrap">
          <span class="lang-badge" style="color:${langColor(s.lang)}">${s.lang}</span>
        </div>
        <div class="sc-info">
          <div class="sc-title">${s.title}</div>
          <div class="sc-desc">${s.description || ""}</div>
          <div class="sc-tags">${s.tags.slice(0, 5).map(t => `<span class="tag">${t}</span>`).join("")}</div>
        </div>
        <div class="sc-footer">
          <span class="sc-date">${formatDate(s.date)}</span>
          <div class="sc-actions">
            ${s.repo ? `<a class="sc-link-repo" href="${s.repo}" target="_blank" rel="noopener" title="Ver repositorio">${svgExternal}</a>` : ""}
            <a class="sc-link-view" href="viewer.html?title=${encodeURIComponent(s.title)}&lang=${encodeURIComponent(s.lang)}&file=${encodeURIComponent(s.file)}&repo=${encodeURIComponent(s.repo)}&desc=${encodeURIComponent(s.description || '')}&demo=${encodeURIComponent(s.demo || '')}">
              ${svgCode} Ver script
            </a>
          </div>
        </div>
      `;

      // Miniatura: prioriza la captura de ejecución ("demo"). Si no
      // hay demo, o si falla al cargar (ruta rota / sin red), hace
      // rollback al ícono del lenguaje (devicon), y si ese también
      // falla, al placeholder SVG generado localmente.
      const thumbWrap = card.querySelector(".sc-thumb-wrap");
      const iconSrc = s.image || placeholderThumb(s.lang);

      function useIconThumb() {
        thumbWrap.classList.remove("has-demo");
        const icon = document.createElement("img");
        icon.className = "sc-thumb";
        icon.src = iconSrc;
        icon.alt = s.title;
        icon.loading = "lazy";
        icon.onerror = () => { icon.src = placeholderThumb(s.lang); icon.onerror = null; };
        thumbWrap.insertBefore(icon, thumbWrap.firstChild);
      }

      if (s.demo) {
        thumbWrap.classList.add("has-demo");

        const gradient = document.createElement("div");
        gradient.className = "sc-thumb-gradient";

        const demoImg = document.createElement("img");
        demoImg.className = "sc-thumb-full";
        demoImg.src = s.demo;
        demoImg.alt = s.title;
        demoImg.loading = "lazy";
        demoImg.onerror = () => {
          // Captura no disponible (ruta rota o sin red): rollback.
          demoImg.remove();
          gradient.remove();
          useIconThumb();
        };

        thumbWrap.insertBefore(gradient, thumbWrap.firstChild);
        thumbWrap.insertBefore(demoImg, thumbWrap.firstChild);
      } else {
        useIconThumb();
      }

      itemsEl.appendChild(card);
    });

    group.appendChild(itemsEl);
    feed.appendChild(group);
  });
}

// ── Eventos ──────────────────────────────────────────────────────
document.getElementById("search-input").addEventListener("input", e => {
  searchQuery = e.target.value;
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

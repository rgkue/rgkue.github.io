/**
 * certifications/certifications.js — Lógica de la página de certificaciones.
 * Estructura calcada de blog.js: búsqueda + filtro por emisor + vista grid/timeline.
 * No necesitas editar este archivo — edita certifications-data.js.
 */

const svgAward = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;

const svgExternal = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Estado de la UI
const state = { query: '', issuer: null, view: 'grid' };

function allCerts() {
  return (CERTIFICATIONS_DATA && CERTIFICATIONS_DATA.certifications) || [];
}

function issuerList() {
  const set = new Set();
  allCerts().forEach(c => { if (c.issuer) set.add(c.issuer); });
  return Array.from(set).sort();
}

// Convierte "YYYY-MM" (o "YYYY") a nombre de mes abreviado, si hay mes
function monthAbbrev(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length < 2) return '';
  const m = parseInt(parts[1], 10);
  return MONTHS[m - 1] || '';
}

function yearOf(dateStr) {
  return dateStr.split('-')[0];
}

// ── FILTRO ───────────────────────────────────────────────────────

function filteredCerts() {
  return allCerts().filter(c => {
    const q = state.query.toLowerCase();
    const matchesSearch = !q ||
      c.name.toLowerCase().includes(q) ||
      (c.issuer || '').toLowerCase().includes(q);
    const matchesIssuer = !state.issuer || c.issuer === state.issuer;
    return matchesSearch && matchesIssuer;
  });
}

// ── RENDER: TARJETA (vista grid) ─────────────────────────────────

function renderCard(cert) {
  const card = document.createElement('article');
  card.className = 'cert-card';

  const badge = cert.image
    ? `<img class="cert-badge" src="${cert.image}" alt="${cert.name}" loading="lazy" />`
    : `<div class="cert-badge-fallback">${svgAward}</div>`;

  const link = cert.url
    ? `<a class="cert-verify" href="${cert.url}" target="_blank" rel="noopener">${svgExternal} Verificar</a>`
    : `<span class="cert-noverify">Sin link de verificación</span>`;

  const dateLine = cert.date ? `<span class="cert-date">${cert.date}</span>` : '';

  card.innerHTML = `
    <div class="cert-card-inner">
      <div class="cert-card-info">
        <div class="cert-meta">
          ${cert.issuer ? `<span class="cert-issuer-badge">${cert.issuer}</span>` : ''}
          ${dateLine}
        </div>
        <div class="cert-name">${cert.name}</div>
        <div class="cert-footer">${link}</div>
      </div>
      <div class="cert-badge-wrap">${badge}</div>
    </div>
  `;
  return card;
}

function renderGrid() {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const certs = filteredCerts();

  if (certs.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <strong>Sin resultados</strong>
        <span>Intenta con otra búsqueda o emisor.</span>
      </div>
    `;
    updateStatus(0);
    return;
  }

  certs.forEach(c => grid.appendChild(renderCard(c)));
  updateStatus(certs.length);
}

// ── RENDER: TIMELINE ─────────────────────────────────────────────
// Agrupa por año. Los certs sin fecha van en un grupo "Sin fecha" al final.

function renderTimeline() {
  const tl = document.getElementById('certs-timeline');
  if (!tl) return;
  tl.innerHTML = '';

  const certs = filteredCerts();

  if (certs.length === 0) {
    tl.innerHTML = `
      <div class="empty-state">
        <strong>Sin resultados</strong>
        <span>Intenta con otra búsqueda o emisor.</span>
      </div>
    `;
    return;
  }

  const dated = certs.filter(c => c.date);
  const undated = certs.filter(c => !c.date);

  const groups = {};
  dated.forEach(c => {
    const y = yearOf(c.date);
    if (!groups[y]) groups[y] = [];
    groups[y].push(c);
  });

  const years = Object.keys(groups).sort().reverse();

  years.forEach(year => {
    tl.appendChild(buildTimelineGroup(year, groups[year]));
  });

  if (undated.length > 0) {
    tl.appendChild(buildTimelineGroup('Sin fecha', undated));
  }
}

function buildTimelineGroup(label, certs) {
  const group = document.createElement('div');
  group.className = 'tl-group';
  group.innerHTML = `<div class="tl-year-label">${label}</div>`;

  const items = document.createElement('div');
  items.className = 'tl-items';

  certs.forEach(c => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    const monthLabel = c.date ? monthAbbrev(c.date) : '—';
    item.innerHTML = `
      <div class="tl-month">${monthLabel}</div>
      <div class="tl-dot"></div>
      <div class="tl-item-content">
        <div class="tl-item-title">${c.name}</div>
        ${c.issuer ? `<div class="tl-item-issuer">${c.issuer}</div>` : ''}
      </div>
    `;
    if (c.url) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => window.open(c.url, '_blank', 'noopener'));
    }
    items.appendChild(item);
  });

  group.appendChild(items);
  return group;
}

// ── STATUS BAR ────────────────────────────────────────────────────

function updateStatus(count) {
  const el = document.getElementById('feed-count');
  if (el) {
    const total = allCerts().length;
    el.textContent = count === total
      ? `${total} certificaciones`
      : `${count} de ${total} certificaciones`;
  }
}

// ── SIDEBAR: EMISORES (categorías) ─────────────────────────────────

function renderCategories() {
  const list = document.getElementById('cat-list');
  if (!list) return;
  list.innerHTML = '';

  const counts = {};
  allCerts().forEach(c => { if (c.issuer) counts[c.issuer] = (counts[c.issuer] || 0) + 1; });

  const allBtn = document.createElement('button');
  allBtn.className = 'cat-btn active';
  allBtn.innerHTML = `Todos <span class="cat-count-badge">${allCerts().length}</span>`;
  allBtn.addEventListener('click', () => selectIssuer(null, allBtn));
  list.appendChild(allBtn);

  issuerList().forEach(issuer => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.innerHTML = `${issuer} <span class="cat-count-badge">${counts[issuer]}</span>`;
    btn.addEventListener('click', () => selectIssuer(issuer, btn));
    list.appendChild(btn);
  });
}

function selectIssuer(issuer, clickedBtn) {
  state.issuer = issuer;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  clickedBtn.classList.add('active');
  renderGrid();
  renderTimeline();
}

// ── BÚSQUEDA ──────────────────────────────────────────────────────

function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.query = input.value.trim();
      renderGrid();
      renderTimeline();
    }, 200);
  });
}

// ── TOGGLE GRID / TIMELINE ────────────────────────────────────────

function initViewToggle() {
  const tlBtn = document.getElementById('timeline-toggle');
  const grid = document.getElementById('certs-grid');
  const tl = document.getElementById('certs-timeline');
  if (!tlBtn || !grid || !tl) return;

  tlBtn.addEventListener('click', () => {
    const isTimeline = tl.classList.contains('visible');
    if (isTimeline) {
      tl.classList.remove('visible');
      grid.style.display = 'flex';
      tlBtn.classList.remove('active');
      tlBtn.textContent = 'Ver línea de tiempo';
    } else {
      grid.style.display = 'none';
      tl.classList.add('visible');
      tlBtn.classList.add('active');
      tlBtn.textContent = 'Ver grilla';
      renderTimeline();
    }
  });
}

// ── RESET ─────────────────────────────────────────────────────────

function initReset() {
  const btn = document.getElementById('reset-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    state.query = '';
    state.issuer = null;
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    document.querySelectorAll('.cat-btn').forEach((b, i) => {
      b.classList.toggle('active', i === 0);
    });
    renderGrid();
    renderTimeline();
  });
}

// ── PANEL DERECHO: stats ────────────────────────────────────────

function renderRightPanel() {
  const totalEl = document.getElementById('stat-total');
  if (totalEl) totalEl.textContent = allCerts().length;

  const catStats = document.getElementById('cat-stats');
  if (!catStats) return;
  catStats.innerHTML = '';

  const counts = {};
  allCerts().forEach(c => { if (c.issuer) counts[c.issuer] = (counts[c.issuer] || 0) + 1; });

  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([issuer, n]) => {
    const row = document.createElement('div');
    row.className = 'cstat-row';
    row.innerHTML = `<span>${issuer}</span><span class="cstat-num mono">${n}</span>`;
    catStats.appendChild(row);
  });
}

// ── INIT ──────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderRightPanel();
  renderCategories();
  renderGrid();
  initSearch();
  initViewToggle();
  initReset();
});

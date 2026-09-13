/**
 * certifications.js — Renderizado de /certifications/
 * Lee desde CERTIFICATIONS_DATA (certifications-data.js).
 * Filtro combinable (acordeón): emisor + búsqueda.
 * Panel derecho: total + timeline cronológico (sin filtrar, como en writeups).
 * Cards: grid (insignia centrada, emisor + fecha flotantes, botón "Verificar").
 */

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const svgAward = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;

const svgExternal = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

const svgExpand = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`;

// ── Visor de certificado (lightbox) ─────────────────────────────
const viewerOverlay = document.getElementById('cert-viewer-overlay');
const viewerImg     = document.getElementById('cert-viewer-img');
const viewerClose   = document.getElementById('cert-viewer-close');

function openViewer(src, alt) {
  viewerImg.src = src;
  viewerImg.alt = alt || '';
  viewerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeViewer() {
  viewerOverlay.classList.remove('open');
  document.body.style.overflow = '';
  viewerImg.src = '';
}

viewerClose.addEventListener('click', closeViewer);
viewerOverlay.addEventListener('click', e => {
  if (e.target === viewerOverlay) closeViewer();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeViewer();
});

// ── Helpers de fecha (formato de los datos: "YYYY-MM" o "YYYY") ──
function dateSortValue(dateStr) {
  if (!dateStr) return -Infinity;
  const [y, m] = dateStr.split('-');
  return parseInt(y, 10) * 12 + (m ? parseInt(m, 10) : 0);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  if (!m) return y;
  return `${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

// ── Estado ───────────────────────────────────────────────────────
let activeIssuer = null;
let searchQuery  = '';

function allCerts() {
  return (CERTIFICATIONS_DATA && CERTIFICATIONS_DATA.certifications) || [];
}

// ── Acordeón: abrir/cerrar (delegado una sola vez) ──────────────
document.querySelectorAll('.accordion-head').forEach(head => {
  head.addEventListener('click', () => {
    head.closest('.accordion').classList.toggle('open');
  });
});

function filterBtn({ active, label, count, onClick }) {
  const btn = document.createElement('button');
  btn.className = 'filter-btn' + (active ? ' active' : '');
  btn.innerHTML = `<span>${label}</span><span class="filter-num">${count}</span>`;
  btn.addEventListener('click', onClick);
  return btn;
}

// ── Thumb en modo insignia (comportamiento original) ─────────────
// Usado cuando no hay certificateImage, o como fallback si esta falla al cargar.
function renderBadgeThumb(thumbWrap, c) {
  if (c.image) {
    const img = document.createElement('img');
    img.className = 'cert-thumb';
    img.src = c.image;
    img.alt = c.name;
    img.loading = 'lazy';
    img.onerror = () => {
      const fallback = document.createElement('div');
      fallback.className = 'cert-thumb-fallback';
      fallback.innerHTML = svgAward;
      img.replaceWith(fallback);
    };
    thumbWrap.appendChild(img);
  } else {
    const fallback = document.createElement('div');
    fallback.className = 'cert-thumb-fallback';
    fallback.innerHTML = svgAward;
    thumbWrap.appendChild(fallback);
  }
}

// ── Render principal ─────────────────────────────────────────────
function render() {
  const data = allCerts();

  // ── Emisores (combinable) ───────────────────────────────────
  const issuers = [...new Set(data.map(c => c.issuer).filter(Boolean))].sort();
  const issuerList = document.getElementById('issuer-list');
  issuerList.innerHTML = '';
  issuers.forEach(issuer => {
    const count = data.filter(c => c.issuer === issuer).length;
    issuerList.appendChild(filterBtn({
      active: activeIssuer === issuer,
      label: issuer,
      count,
      onClick: () => {
        activeIssuer = activeIssuer === issuer ? null : issuer;
        render();
      }
    }));
  });

  // ── Panel derecho: total ─────────────────────────────────────
  document.getElementById('count-total').textContent = data.length;

  // ── Panel derecho: timeline (siempre muestra todo, sin filtrar) ──
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  const sorted = [...data].sort((a, b) => dateSortValue(b.date) - dateSortValue(a.date));
  sorted.forEach(c => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <span class="tl-dot"></span>
      <div class="tl-content">
        <span class="tl-title">${c.name}</span>
        <span class="tl-date">${formatDate(c.date)}</span>
      </div>
    `;
    if (c.url) {
      item.addEventListener('click', () => window.open(c.url, '_blank', 'noopener'));
    }
    timeline.appendChild(item);
  });

  // ── Filtro combinable + búsqueda ─────────────────────────────
  const q = searchQuery.toLowerCase().trim();
  const filtered = data.filter(c => {
    if (activeIssuer && c.issuer !== activeIssuer) return false;
    if (q && !(
      c.name.toLowerCase().includes(q) ||
      (c.issuer || '').toLowerCase().includes(q)
    )) return false;
    return true;
  });

  document.getElementById('feed-count').textContent = `${filtered.length} de ${data.length}`;

  // ── Agrupar por emisor ────────────────────────────────────────
  const groups = {};
  filtered.forEach(c => {
    const key = c.issuer || 'Otros';
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });

  // ── Feed / grid ───────────────────────────────────────────────
  const feed = document.getElementById('certs-feed');
  feed.innerHTML = '';

  if (filtered.length === 0) {
    feed.innerHTML = `<div class="empty-state">Sin resultados para "<strong>${q || activeIssuer}</strong>".</div>`;
    return;
  }

  Object.entries(groups).forEach(([issuer, items]) => {
    const group = document.createElement('div');
    group.className = 'cert-group';

    const label = document.createElement('div');
    label.className = 'cert-group-label';
    label.innerHTML = `${issuer}<span class="cert-group-count">${items.length}</span>`;
    group.appendChild(label);

    const itemsEl = document.createElement('div');
    itemsEl.className = 'cert-group-items';

    items
      .sort((a, b) => dateSortValue(b.date) - dateSortValue(a.date))
      .forEach(c => {
        const footerBtns = [];
        if (c.certificateImage) {
          footerBtns.push(`<button class="cert-view-btn" type="button">${svgExpand} Ver certificado</button>`);
        }
        if (c.url) {
          footerBtns.push(`<a class="cert-verify-btn" href="${c.url}" target="_blank" rel="noopener">${svgExternal} Verificar</a>`);
        }
        const footer = footerBtns.length
          ? footerBtns.join('')
          : `<span class="cert-noverify">Sin verificación</span>`;

        const card = document.createElement('div');
        card.className = 'cert-card';
        card.innerHTML = `
          <div class="cert-thumb-wrap">
            ${c.issuer ? `<span class="cert-issuer-badge">${c.issuer}</span>` : ''}
            ${c.date ? `<span class="cert-date-badge">${formatDate(c.date)}</span>` : ''}
          </div>
          <div class="cert-info">
            <div class="cert-name">${c.name}</div>
          </div>
          <div class="cert-footer">${footer}</div>
        `;

        // Insertar el thumb (certificado completo, insignia o fallback)
        // por JS para evitar problemas de escape con onerror inline.
        const thumbWrap = card.querySelector('.cert-thumb-wrap');
        if (c.certificateImage) {
          // Modo certificado completo: imagen edge-to-edge + gradiente
          // para que emisor/fecha sigan siendo legibles.
          thumbWrap.classList.add('has-cert-image');

          const img = document.createElement('img');
          img.className = 'cert-thumb-full';
          img.src = c.certificateImage;
          img.alt = c.name;
          img.loading = 'lazy';
          img.onerror = () => {
            // Si el certificado no carga, se retrocede al modo insignia.
            thumbWrap.classList.remove('has-cert-image');
            img.remove();
            gradient.remove();
            renderBadgeThumb(thumbWrap, c);
          };

          const gradient = document.createElement('div');
          gradient.className = 'cert-thumb-gradient';

          thumbWrap.appendChild(img);
          thumbWrap.appendChild(gradient);

          // Click en la miniatura también abre el visor (el cursor ya
          // avisa que es clickeable via .has-cert-image en el CSS).
          thumbWrap.addEventListener('click', () => openViewer(c.certificateImage, c.name));
        } else {
          renderBadgeThumb(thumbWrap, c);
        }

        const viewBtn = card.querySelector('.cert-view-btn');
        if (viewBtn) {
          viewBtn.addEventListener('click', () => openViewer(c.certificateImage, c.name));
        }

        itemsEl.appendChild(card);
      });

    group.appendChild(itemsEl);
    feed.appendChild(group);
  });
}

// ── Eventos ─────────────────────────────────────────────────────
document.getElementById('search-input').addEventListener('input', e => {
  searchQuery = e.target.value;
  render();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  activeIssuer = null;
  searchQuery  = '';
  document.getElementById('search-input').value = '';
  render();
});

document.addEventListener('DOMContentLoaded', render);

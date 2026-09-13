// ─── CARRUSEL DE HERRAMIENTAS (idéntico al de /education/) ───
function renderToolsCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const items = [...TRAYECTORIA_DATA.tools, ...TRAYECTORIA_DATA.tools];

  items.forEach(tool => {
    const card = tool.url ? document.createElement('a') : document.createElement('div');
    card.className = 'tool-card';
    if (tool.url) {
      card.href = tool.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }

    const ph = document.createElement('div');
    ph.className = 'tool-icon-placeholder';
    ph.textContent = tool.emoji || '🔧';

    const label = document.createElement('span');
    label.textContent = tool.name;

    card.appendChild(ph);
    card.appendChild(label);

    if (tool.iconUrl) {
      const img = new Image();
      img.onload = () => {
        img.width = 42; img.height = 42; img.alt = tool.name;
        if (tool.tint) img.classList.add('tinted');
        if (tool.scale) img.style.transform = `scale(${tool.scale})`;
        ph.replaceWith(img);
      };
      img.onerror = () => {}; // mantiene el emoji si falla la carga
      img.src = tool.iconUrl;
    }

    track.appendChild(card);
  });
}

// ─── ÍCONOS GENÉRICOS DE NODO (fallback si no hay logo) ───────
const ICON_EDU = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5v6"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;
const ICON_EXP = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;

// ─── TIMELINE ──────────────────────────────────────────────────
function buildItems(view) {
  if (view === 'educacion')  return TRAYECTORIA_DATA.education.map(i => ({ ...i, type: 'education' }));
  if (view === 'experiencia') return TRAYECTORIA_DATA.experience.map(i => ({ ...i, type: 'experience' }));
  // cronológico: mezcla ambas
  return [
    ...TRAYECTORIA_DATA.education.map(i => ({ ...i, type: 'education' })),
    ...TRAYECTORIA_DATA.experience.map(i => ({ ...i, type: 'experience' })),
  ];
}

function renderTimeline(view) {
  const container = document.getElementById('tr-timeline');
  const empty = document.getElementById('tr-empty');
  container.innerHTML = '';

  const items = buildItems(view).sort((a, b) => b.start.localeCompare(a.start));

  if (items.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'tr-item';

    // Nodo del logo — se construye con DOM real, no con un string de
    // innerHTML: el onerror necesitaba insertar el SVG (que trae sus
    // propias comillas dobles) dentro de un atributo HTML también
    // delimitado por comillas dobles, y el navegador cortaba el
    // atributo en la primera comilla del SVG, dejando el resto del
    // string suelto como texto/atributos visibles en pantalla.
    const node = document.createElement('div');
    node.className = 'tr-node';
    const fallbackIcon = item.type === 'education' ? ICON_EDU : ICON_EXP;
    if (item.logo) {
      const img = document.createElement('img');
      img.src = item.logo;
      img.alt = item.institution;
      img.loading = 'lazy';
      img.onerror = () => { node.innerHTML = fallbackIcon; };
      node.appendChild(img);
    } else {
      node.innerHTML = fallbackIcon;
    }

    const titleHtml = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>`
      : item.title;
    const institutionHtml = item.institutionUrl
      ? `<a href="${item.institutionUrl}" target="_blank" rel="noopener noreferrer">${item.institution}</a>`
      : item.institution;

    const typeBadge = view === 'cronologico'
      ? `<span class="tr-badge-type type-${item.type}">${item.type === 'education' ? 'Educación' : 'Experiencia'}</span>`
      : '';

    const content = document.createElement('div');
    content.className = 'tr-content';
    content.innerHTML = `
      <div class="tr-top">
        <span class="tr-title">${titleHtml}</span>
        ${item.current ? '<span class="tr-badge-current">Actual</span>' : ''}
        ${typeBadge}
      </div>
      <div class="tr-institution">${institutionHtml}</div>
      <div class="tr-period mono">${item.period}</div>
      ${item.description ? `<p class="tr-desc">${item.description}</p>` : ''}
    `;

    el.appendChild(node);
    el.appendChild(content);
    container.appendChild(el);
  });
}

// ─── SWITCHER ──────────────────────────────────────────────────
function initViewSwitch() {
  const switcher = document.getElementById('view-switch');
  switcher.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    switcher.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTimeline(btn.dataset.view);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderToolsCarousel();
  initViewSwitch();
  renderTimeline('educacion'); // vista inicial
});

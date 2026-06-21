/**
 * blog/blog.js — Lógica del blog.
 * No necesitas editar este archivo.
 */

// ── UTILIDADES ───────────────────────────────────────────────────

function formatDate(str) {
  const [y, m, d] = str.split('-');
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

function formatMonthYear(str) {
  const [y, m] = str.split('-');
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${months[parseInt(m) - 1]} ${y}`;
}

// Estado de la UI
const state = { query: '', category: null, view: 'grid' };

// ── FILTRO ───────────────────────────────────────────────────────

function filteredPosts() {
  return BLOG.posts.filter(p => {
    const q = state.query.toLowerCase();
    const matchesSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q);
    const matchesCat = !state.category || p.category === state.category;
    return matchesSearch && matchesCat;
  });
}

// ── RENDER: TARJETA ───────────────────────────────────────────────

function renderCard(post) {
  const card = document.createElement('article');
  card.className = 'post-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');

  const imgSrc = post.cover
    ? post.cover
    : `https://opengraph.githubassets.com/1/rgkue/${post.id}`;

  card.innerHTML = `
    <div class="post-card-inner">
      <div class="post-card-info">
        <div class="post-meta">
          <span class="post-cat-badge">${post.category}</span>
          <span class="post-date">${formatDate(post.date)}</span>
        </div>
        <div class="post-title">${post.title}</div>
        <div class="post-excerpt">${post.excerpt}</div>
        <div class="post-tags">
          ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="post-footer">
          <span>${post.tags.length} etiquetas</span>
          <span class="read-more">Leer más →</span>
        </div>
      </div>
      <div class="post-thumb-wrap">
        <img class="post-thumb" src="${imgSrc}" alt="${post.title}" loading="lazy" onerror="this.src='https://opengraph.githubassets.com/1/rgkue/rgkue.github.io'" />
      </div>
    </div>
  `;

  const go = () => {
    window.location.href = `post.html?id=${post.id}`;
  };
  card.addEventListener('click', go);
  card.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  return card;
}

// ── RENDER: GRID ──────────────────────────────────────────────────

function renderGrid() {
  const grid = document.getElementById('posts-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const posts = filteredPosts();

  if (posts.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        
        <strong>Sin resultados</strong>
        <span>Intenta con otra búsqueda o categoría.</span>
      </div>
    `;
    return;
  }

  posts.forEach(p => grid.appendChild(renderCard(p)));
  updateStatus(posts.length);
}

// ── RENDER: TIMELINE ─────────────────────────────────────────────

function renderTimeline() {
  const tl = document.getElementById('timeline-view');
  if (!tl) return;
  tl.innerHTML = '';

  const posts = filteredPosts();

  // Agrupar por mes-año
  const groups = {};
  posts.forEach(p => {
    const key = p.date.slice(0, 7); // "YYYY-MM"
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  Object.keys(groups).sort().reverse().forEach(key => {
    const group = document.createElement('div');
    group.className = 'tl-group';
    group.innerHTML = `<div class="tl-month-label">${formatMonthYear(key + '-01')}</div>`;

    const items = document.createElement('div');
    items.className = 'tl-items';

    groups[key].forEach(p => {
      const item = document.createElement('div');
      item.className = 'tl-item';
      item.innerHTML = `
        <div class="tl-day">${p.date.split('-')[2]}</div>
        <div class="tl-dot"></div>
        <div class="tl-item-content">
          <div class="tl-item-title">${p.title}</div>
          <div class="tl-item-cat">${p.category}</div>
        </div>
      `;
      item.addEventListener('click', () => {
        window.location.href = `post.html?id=${p.id}`;
      });
      items.appendChild(item);
    });

    group.appendChild(items);
    tl.appendChild(group);
  });

  if (posts.length === 0) {
    tl.innerHTML = `<div class="empty-state"><span>Sin posts que mostrar.</span></div>`;
  }
}

// ── STATUS BAR ────────────────────────────────────────────────────

function updateStatus(count) {
  const el = document.getElementById('feed-count');
  if (el) {
    const total = BLOG.posts.length;
    el.textContent = count === total
      ? `${total} posts`
      : `${count} de ${total} posts`;
  }
}

// ── SIDEBAR: ÚLTIMOS POSTS ────────────────────────────────────────

function renderRecent() {
  const list = document.getElementById('recent-list');
  if (!list) return;

  BLOG.posts.slice(0, 4).forEach(p => {
    const item = document.createElement('div');
    item.className = 'recent-item';
    item.innerHTML = `
      <div class="recent-title">${p.title}</div>
      <div class="recent-date">${formatDate(p.date)}</div>
    `;
    item.addEventListener('click', () => {
      window.location.href = `post.html?id=${p.id}`;
    });
    list.appendChild(item);
  });
}

// ── SIDEBAR: CATEGORÍAS ───────────────────────────────────────────

function renderCategories() {
  const list = document.getElementById('cat-list');
  if (!list) return;

  // Contar posts por categoría
  const counts = {};
  BLOG.posts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });

  // "Todos" primero
  const allBtn = document.createElement('button');
  allBtn.className = 'cat-btn active';
  allBtn.innerHTML = `Todos <span class="cat-count-badge">${BLOG.posts.length}</span>`;
  allBtn.addEventListener('click', () => selectCategory(null, allBtn));
  list.appendChild(allBtn);

  BLOG.categories.forEach(cat => {
    if (!counts[cat]) return; // no mostrar categorías vacías
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.innerHTML = `${cat} <span class="cat-count-badge">${counts[cat]}</span>`;
    btn.addEventListener('click', () => selectCategory(cat, btn));
    list.appendChild(btn);
  });
}

function selectCategory(cat, clickedBtn) {
  state.category = cat;
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
    }, 200); // debounce 200ms
  });
}

// ── TOGGLE GRID / TIMELINE ────────────────────────────────────────

function initViewToggle() {
  const tlBtn = document.getElementById('timeline-toggle');
  const grid = document.getElementById('posts-grid');
  const tl = document.getElementById('timeline-view');
  if (!tlBtn || !grid || !tl) return;

  tlBtn.addEventListener('click', () => {
    const isTimeline = tl.classList.contains('visible');
    if (isTimeline) {
      // volver a grid
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
    state.category = null;
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    document.querySelectorAll('.cat-btn').forEach((b, i) => {
      b.classList.toggle('active', i === 0);
    });
    renderGrid();
    renderTimeline();
  });
}

// ── INIT INDEX ────────────────────────────────────────────────────

function initIndex() {
  renderRightPanel();
  renderRecent();
  renderCategories();
  renderGrid();
  initSearch();
  initViewToggle();
  initReset();
}

// ═══════════════════════════════════════════════════════════════════
// POST.HTML — Vista de un post individual
// ═══════════════════════════════════════════════════════════════════

function initPost() {
  // Leer el ?id= de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) { window.location.href = 'index.html'; return; }

  const post = BLOG.posts.find(p => p.id === id);
  if (!post) {
    document.body.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;
        font-family:monospace;color:#3ddc84;flex-direction:column;gap:1rem;">
        <span style="font-size:3rem">404</span>
        <span>Post no encontrado.</span>
        <a href="index.html" style="color:#3ddc84">← Volver al blog</a>
      </div>
    `;
    return;
  }

  // Título de la pestaña
  document.title = `${post.title} - blog`;

  // Meta
  const metaEl = document.getElementById('post-meta');
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="post-cat-badge">${post.category}</span>
      <span class="post-date">${formatDate(post.date)}</span>
    `;
  }

  // Título
  const titleEl = document.getElementById('post-title');
  if (titleEl) titleEl.textContent = post.title;

  // Tags
  const tagsEl = document.getElementById('post-tags');
  if (tagsEl) tagsEl.innerHTML = post.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Cover
  if (post.cover) {
    const img = document.createElement('img');
    img.src = post.cover; img.alt = post.title; img.className = 'post-cover';
    const hero = document.getElementById('post-hero');
    if (hero) hero.appendChild(img);
  }

  // Contenido
  const bodyEl = document.getElementById('post-body');
  if (bodyEl) bodyEl.innerHTML = post.content;

  // Navegación anterior / siguiente
  const idx = BLOG.posts.indexOf(post);
  const prev = BLOG.posts[idx + 1]; // más antiguo
  const next = BLOG.posts[idx - 1]; // más reciente

  const navEl = document.getElementById('post-nav');
  if (navEl) {
    navEl.innerHTML = `
      <div class="post-nav-btn prev" ${prev ? `onclick="location.href='post.html?id=${prev.id}'"` : 'style="opacity:.3;cursor:default"'}>
        <span class="post-nav-label">← Anterior</span>
        <span class="post-nav-title">${prev ? prev.title : '—'}</span>
      </div>
      <div class="post-nav-btn next" ${next ? `onclick="location.href='post.html?id=${next.id}'"` : 'style="opacity:.3;cursor:default"'}>
        <span class="post-nav-label">Siguiente →</span>
        <span class="post-nav-title">${next ? next.title : '—'}</span>
      </div>
    `;
  }
}

// ── DISPATCH ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Detecta en qué página estamos por el body id
  if (document.body.id === 'page-index') initIndex();
  if (document.body.id === 'page-post') initPost();
});

// ── PANEL DERECHO: stats ──────────────────────────────────────
function renderRightPanel() {
  const totalEl = document.getElementById('stat-total');
  if (totalEl) totalEl.textContent = BLOG.posts.length;

  const catStats = document.getElementById('cat-stats');
  if (!catStats) return;
  catStats.innerHTML = '';

  const counts = {};
  BLOG.posts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });

  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([cat, n]) => {
    const row = document.createElement('div');
    row.className = 'cstat-row';
    row.innerHTML = `<span>${cat.trim()}</span><span class="cstat-num mono">${n}</span>`;
    catStats.appendChild(row);
  });
}

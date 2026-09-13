/**
 * blog/blog.js — Lógica del blog.
 * Índice: filtro combinable (acordeón) por categoría + búsqueda.
 * Panel derecho: total + timeline cronológico (sin filtrar).
 * Post individual: sin cambios de arquitectura, solo la paleta se
 * actualizó en blog.css.
 * No necesitas editar este archivo — edita data.js.
 */

// ── UTILIDADES ───────────────────────────────────────────────────

function formatDate(str) {
  const [y, m, d] = str.split('-');
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

// Estado de la UI
const state = { query: '', category: null };

function allPosts() {
  return (typeof BLOG !== 'undefined' && BLOG.posts) || [];
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

// ── FILTRO ───────────────────────────────────────────────────────

function filteredPosts() {
  const q = state.query.toLowerCase();
  return allPosts().filter(p => {
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
  const imgSrc = post.cover
    ? post.cover
    : `https://opengraph.githubassets.com/1/rgkue/${post.id}`;

  const card = document.createElement('article');
  card.className = 'post-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.innerHTML = `
    <div class="post-thumb-wrap">
      <img class="post-thumb" src="${imgSrc}" alt="${post.title}" loading="lazy" onerror="this.src='https://opengraph.githubassets.com/1/rgkue/rgkue.github.io'" />
      <span class="post-date-badge">${formatDate(post.date)}</span>
    </div>
    <div class="post-info">
      <div class="post-title">${post.title}</div>
      <div class="post-excerpt">${post.excerpt}</div>
      <div class="post-tags">${post.tags.slice(0, 5).map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
    <div class="post-footer">
      <span class="post-tag-count">${post.tags.length} etiquetas</span>
      <span class="read-more">Leer más</span>
    </div>
  `;

  const go = () => { window.location.href = `post.html?id=${post.id}`; };
  card.addEventListener('click', go);
  card.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  return card;
}

// ── RENDER PRINCIPAL ──────────────────────────────────────────────

function render() {
  const data = allPosts();

  // ── Categorías (combinable) ─────────────────────────────────
  const categories = [...new Set(data.map(p => p.category.trim()))];
  const catList = document.getElementById('cat-list');
  catList.innerHTML = '';
  categories.forEach(cat => {
    const count = data.filter(p => p.category.trim() === cat).length;
    catList.appendChild(filterBtn({
      active: state.category === cat,
      label: cat,
      count,
      onClick: () => {
        state.category = state.category === cat ? null : cat;
        render();
      }
    }));
  });

  // ── Sidebar: últimos posts ───────────────────────────────────
  const recentList = document.getElementById('recent-list');
  if (recentList) {
    recentList.innerHTML = '';
    [...data].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4).forEach(p => {
      const item = document.createElement('div');
      item.className = 'recent-item';
      item.innerHTML = `
        <div class="recent-title">${p.title}</div>
        <div class="recent-date">${formatDate(p.date)}</div>
      `;
      item.addEventListener('click', () => { window.location.href = `post.html?id=${p.id}`; });
      recentList.appendChild(item);
    });
  }

  // ── Panel derecho: total ─────────────────────────────────────
  document.getElementById('count-total').textContent = data.length;

  // ── Panel derecho: timeline (siempre muestra todo, sin filtrar) ──
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  sorted.forEach(p => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <span class="tl-dot"></span>
      <div class="tl-content">
        <span class="tl-title">${p.title}</span>
        <span class="tl-date">${formatDate(p.date)}</span>
      </div>
    `;
    item.addEventListener('click', () => { window.location.href = `post.html?id=${p.id}`; });
    timeline.appendChild(item);
  });

  // ── Filtro combinable + búsqueda ─────────────────────────────
  const filtered = filteredPosts();
  document.getElementById('feed-count').textContent = `${filtered.length} de ${data.length}`;

  // ── Agrupar por categoría ─────────────────────────────────────
  const groups = {};
  filtered.forEach(p => {
    const key = p.category.trim();
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  // ── Feed / grid ───────────────────────────────────────────────
  const feed = document.getElementById('posts-feed');
  feed.innerHTML = '';

  if (filtered.length === 0) {
    feed.innerHTML = `<div class="empty-state">Sin resultados para "<strong>${state.query || state.category}</strong>".</div>`;
    return;
  }

  Object.entries(groups).forEach(([cat, items]) => {
    const group = document.createElement('div');
    group.className = 'post-group';

    const label = document.createElement('div');
    label.className = 'post-group-label';
    label.innerHTML = `${cat}<span class="post-group-count">${items.length}</span>`;
    group.appendChild(label);

    const itemsEl = document.createElement('div');
    itemsEl.className = 'post-group-items';

    items
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach(p => itemsEl.appendChild(renderCard(p)));

    group.appendChild(itemsEl);
    feed.appendChild(group);
  });
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
      render();
    }, 200);
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
    render();
  });
}

// ── INIT INDEX ────────────────────────────────────────────────────

function initIndex() {
  render();
  initSearch();
  initReset();
}

// ═══════════════════════════════════════════════════════════════════
// POST.HTML — Vista de un post individual
// ═══════════════════════════════════════════════════════════════════

function initPost() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) { window.location.href = 'index.html'; return; }

  const post = allPosts().find(p => p.id === id);
  if (!post) {
    document.body.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;
        font-family:'JetBrains Mono',monospace;color:#f5a524;flex-direction:column;gap:1rem;background:#0d1117;">
        <span style="font-size:3rem">404</span>
        <span>Post no encontrado.</span>
        <a href="index.html" style="color:#f5a524">← Volver al blog</a>
      </div>
    `;
    return;
  }

  document.title = `${post.title} - blog`;

  const metaEl = document.getElementById('post-meta');
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="post-cat-badge">${post.category.trim()}</span>
      <span class="post-date">${formatDate(post.date)}</span>
    `;
  }

  const titleEl = document.getElementById('post-title');
  if (titleEl) titleEl.textContent = post.title;

  const tagsEl = document.getElementById('post-tags');
  if (tagsEl) tagsEl.innerHTML = post.tags.map(t => `<span class="tag">${t}</span>`).join('');

  if (post.cover) {
    const img = document.createElement('img');
    img.src = post.cover; img.alt = post.title; img.className = 'post-cover';
    const hero = document.getElementById('post-hero');
    if (hero) hero.appendChild(img);
  }

  const bodyEl = document.getElementById('post-body');
  if (bodyEl) bodyEl.innerHTML = DOMPurify.sanitize(post.content);

  const posts = allPosts();
  const idx = posts.indexOf(post);
  const prev = posts[idx + 1]; // más antiguo
  const next = posts[idx - 1]; // más reciente

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

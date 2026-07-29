/**
 * nav.js — Topbar compartido del portafolio.
 * Colócalo en la raíz: /nav.js
 * Uso en subpáginas: <script src="../nav.js"></script>
 */
(function () {
  const path   = window.location.pathname;
  const isRoot = /^\/(index\.html)?$/.test(path) || path === '/';
  const depth  = (path.replace(/\/[^/]*$/, '').match(/\//g) || []).length;
  const base   = isRoot ? '' : '../'.repeat(depth);

  // ── CSS ──────────────────────────────────────────────────────
  if (!document.getElementById('site-nav-css')) {
    const link = document.createElement('link');
    link.id   = 'site-nav-css';
    link.rel  = 'stylesheet';
    link.href = base + 'nav.css';
    document.head.appendChild(link);
  }

  // ── Ruta dinámica para el lado derecho ───────────────────────
  // ~ en index, ~/section/ en el resto
  const segments = path.replace(/\/(index\.html)?$/, '').split('/').filter(Boolean);
  const routeLabel = segments.length === 0 ? '~' : '~/' + segments.join('/') + '/';

  // ── Páginas ──────────────────────────────────────────────────
  const pages = [
    // Home comentado — el brand "$rgkue" ya actúa como home link
    // {
    //   label: 'Home',
    //   href:  base + 'index.html',
    //   match: /^\/(index\.html)?$/,
    //   icon:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    // },
    {
      label: 'Projects',
      href:  base + 'projects/',
      match: /\/projects\//,
      icon:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    },
    {
      label: 'Writeups',
      href:  base + 'writeups/',
      match: /\/writeups\//,
      icon:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    },
    {
      label: 'Scripts',
      href:  base + 'scripts/',
      match: /\/scripts\//,
      icon:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    },
    {
      label: 'Certifications',
      href:  base + 'certifications/',
      match: /\/certifications\//,
      icon:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    },
    {
      label: 'Blog',
      href:  base + 'blog/',
      match: /\/blog\//,
      icon:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    },
  ];

  // ── Construir el nav ──────────────────────────────────────────
  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.setAttribute('aria-label', 'Navegación principal');

  const brand = document.createElement('a');
  brand.className = 'nav-brand';
  brand.href = base + 'index.html';
  brand.textContent = '$rgkue';

  const ul = document.createElement('ul');
  ul.className = 'nav-links';

  pages.forEach(page => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href      = page.href;
    a.innerHTML = page.icon + page.label;
    if (page.match.test(path)) a.classList.add('active');
    li.appendChild(a);
    ul.appendChild(li);
  });

  // Ruta dinámica a la derecha
  const right = document.createElement('span');
  right.className = 'nav-right';
  right.textContent = routeLabel;

  nav.appendChild(brand);
  nav.appendChild(ul);
  nav.appendChild(right);

  // ── Insertar al inicio del body ───────────────────────────────
  function insert() {
    if (!document.getElementById('site-nav')) {
      document.body.insertBefore(nav, document.body.firstChild);
    }
  }

  if (document.body) { insert(); }
  else { document.addEventListener('DOMContentLoaded', insert); }
})();

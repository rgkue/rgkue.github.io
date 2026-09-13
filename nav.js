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

  // ── Páginas ──────────────────────────────────────────────────
  const pages = [
    {
      label: 'Proyectos',
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
      label: 'Trayectoria',
      href:  base + 'trajectory/',
      match: /\/trajectory\//,
      icon:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5v6"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    },
    {
      label: 'Scripts',
      href:  base + 'scripts/',
      match: /\/scripts\//,
      icon:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    },
    {
      label: 'Certificaciones',
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

  const brandGroup = document.createElement('div');
  brandGroup.className = 'nav-brand-group';

  const brand = document.createElement('a');
  brand.className = 'nav-brand';
  brand.href = base + 'index.html';
  brand.textContent = 'INICIO';

  // Botón hamburguesa — solo visible en mobile (ver nav.css).
  // Vive DENTRO de brandGroup (izquierda) a propósito: así nunca
  // puede quedar tapado por #nav-extras (redes+CV del home), que
  // siempre está fijo a la derecha con z-index alto.
  const navToggle = document.createElement('button');
  navToggle.className = 'nav-toggle';
  navToggle.setAttribute('aria-label', 'Abrir menú');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  brandGroup.appendChild(brand);
  brandGroup.appendChild(navToggle);

  const ul = document.createElement('ul');
  ul.className = 'nav-links';

  pages.forEach(page => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href      = page.href;
    a.innerHTML = page.icon + page.label;
    if (page.match.test(path)) a.classList.add('active');
    a.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
    li.appendChild(a);
    ul.appendChild(li);
  });

  // Redes sociales + CV — a la derecha
  const socials = [
    { label: 'GitHub',    url: 'https://github.com/rgkue',                 icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
    { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/isaacmunozp',  icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
    { label: 'Instagram', url: 'https://instagram.com/rgkue',              icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>` },
  ];
  const socialsWrap = document.createElement('div');
  socialsWrap.className = 'nav-top-socials';
  socials.forEach(s => {
    const a = document.createElement('a');
    a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.title = s.label;
    a.innerHTML = s.icon;
    socialsWrap.appendChild(a);
  });

  // CV — mismo botón que en el index, para que el topbar sea idéntico
  const cvBtn = document.createElement('a');
  cvBtn.className = 'nav-cv-btn';
  cvBtn.href = base + 'assets/IsaacMunoz_CV.pdf';
  cvBtn.target = '_blank';
  cvBtn.rel = 'noopener noreferrer';
  cvBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> CV`;

  const navRight = document.createElement('div');
  navRight.className = 'nav-right';
  navRight.appendChild(socialsWrap);
  navRight.appendChild(cvBtn);

  nav.appendChild(brandGroup);
  nav.appendChild(ul);
  nav.appendChild(navRight);

  // ── Insertar al inicio del body ───────────────────────────────
  function insert() {
    if (!document.getElementById('site-nav')) {
      document.body.insertBefore(nav, document.body.firstChild);
    }
  }

  if (document.body) { insert(); }
  else { document.addEventListener('DOMContentLoaded', insert); }
})();
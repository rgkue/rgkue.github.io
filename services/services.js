/**
 * services/services.js
 * Lee desde SERVICES_DATA (services-data.js).
 */

// ── Mapa de íconos SVG ────────────────────────────────────────────
const ICONS = {
  wrench: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>`,
  laptop: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>`,
  terminal: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
  </svg>`,
  book: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>`,
  chat: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>`,
};

// ── Canvas de estrellas ───────────────────────────────────────────
function initStars() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeStars() {
    stars = Array.from({ length: 130 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.2 + 0.3,
      o:     Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.05,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.o += s.speed * 0.012;
      const alpha = 0.06 + 0.28 * Math.abs(Math.sin(s.o));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(61,220,132,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); makeStars(); });
  resize(); makeStars(); draw();
}

// ── Grid 2x2 de cards ────────────────────────────────────────────
function renderCascade() {
  const container = document.getElementById('srv-cascade');
  if (!container) return;

  const d = SERVICES_DATA;

  const label = document.createElement('p');
  label.className = 'srv-section-label mono';
  label.textContent = '>_ servicios';
  container.appendChild(label);

  const grid = document.createElement('div');
  grid.className = 'srv-grid';
  container.appendChild(grid);

  // Solo los primeros 4 servicios (excluye "Otros")
  const visibleServices = d.services.filter(s => s.title !== 'Otros').slice(0, 4);

  visibleServices.forEach((srv, i) => {
    const card = document.createElement('div');
    card.className = 'srv-card';
    card.setAttribute('data-index', i);

    const iconSvg = ICONS[srv.icon] || '';

    card.innerHTML = `
      <div class="srv-card-header">
        <span class="srv-card-icon">${iconSvg}</span>
        <div class="srv-card-title">${srv.title}</div>
      </div>
      <div class="srv-card-desc">${srv.description}</div>
      ${srv.tags.length ? `<div class="srv-card-tags">${srv.tags.map(t => `<span class="srv-card-tag">${t}</span>`).join('')}</div>` : ''}
      ${srv.badge ? `<span class="srv-card-badge">${srv.badge}</span>` : ''}
    `;

    grid.appendChild(card);
  });
}

// ── Sección contacto ──────────────────────────────────────────────
function renderContact() {
  const d = SERVICES_DATA;

  const nameEl    = document.getElementById('srv-contact-name');
  const noteEl    = document.getElementById('srv-contact-note');
  const emailLink = document.getElementById('srv-email-link');
  const emailText = document.getElementById('srv-email-text');
  const wspLink   = document.getElementById('srv-wsp-link');
  const wspText   = document.getElementById('srv-wsp-text');

  if (nameEl) {
    nameEl.innerHTML = `${d.name} <img class="srv-flag" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f5-1f1e6.svg" alt="Panamá" />`;
  }
  if (noteEl)    noteEl.textContent    = d.contactNote;
  if (emailLink) emailLink.href        = `mailto:${d.email}`;
  if (emailText) emailText.textContent = d.email;
  if (wspLink)   wspLink.href          = d.whatsapp.url;
  if (wspText)   wspText.textContent   = d.whatsapp.label;
}

// ── Scroll observer ───────────────────────────────────────────────
function initObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.srv-card').forEach(el => obs.observe(el));
}

// ── Init ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  renderCascade();
  renderContact();
  setTimeout(initObserver, 80);
});

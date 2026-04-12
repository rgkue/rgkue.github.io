// ─── ESTRELLAS (reutilizada del portafolio) ───────────────────────
function initStars() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function makeStars() {
    stars = Array.from({ length: 130 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      o: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.05,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.o += s.speed * 0.012;
      const alpha = 0.08 + 0.35 * Math.abs(Math.sin(s.o));
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

// ─── NAV ─────────────────────────────────────────────────────────
function renderNav() {
  const alias = document.getElementById('nav-alias');
  if (alias) alias.textContent = PORTFOLIO.alias;
}

// ─── HEADER ──────────────────────────────────────────────────────
function renderHeader() {
  const page = PORTFOLIO.servicesPage || {};
  const title = document.getElementById('srv-title');
  const subtitle = document.getElementById('srv-subtitle');
  const image = document.getElementById('srv-image');
  if (title) title.textContent = page.title || 'Servicios';
  if (subtitle) subtitle.textContent = page.subtitle || '';
  if (image && page.image) {
    const src = page.image.match(/^(https?:\/\/|\/)/) ? page.image : `../${page.image}`;
    image.src = src;
    image.alt = page.imageAlt || 'Servicio destacado';
    image.style.display = 'block';
  } else if (image) {
    image.style.display = 'none';
  }
}

// ─── GRID DE SERVICIOS ───────────────────────────────────────────
function renderServiceCards() {
  const grid = document.getElementById('srv-grid');
  if (!grid) return;

  const services = PORTFOLIO.services || [];
  if (services.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; color:var(--text-dim); font-family:var(--mono); font-size:0.85rem; padding:3rem 0;">
        🚧 Próximamente
      </div>`;
    return;
  }

  services.forEach(srv => {
    const card = document.createElement('div');
    card.className = 'srv-card fade-up';

    const tagsHtml = (srv.tags || [])
      .map(t => `<span class="srv-card-tag">${t}</span>`)
      .join('');

    const badgeHtml = srv.badge
      ? `<div class="srv-card-badge"><span>●</span>${srv.badge}</div>`
      : '';

    card.innerHTML = `
      <div class="srv-card-icon">${srv.icon || '🛠️'}</div>
      <div class="srv-card-title">${srv.title}</div>
      <div class="srv-card-desc">${srv.description}</div>
      ${tagsHtml ? `<div class="srv-card-tags">${tagsHtml}</div>` : ''}
      ${badgeHtml}
    `;
    grid.appendChild(card);
  });
}

// ─── CONTACTO ────────────────────────────────────────────────────
function renderContact() {
  const page = PORTFOLIO.servicesPage || {};
  const buttonsEl = document.getElementById('srv-contact-buttons');
  const noteEl = document.getElementById('srv-note');

  if (noteEl && page.contactNote) noteEl.textContent = page.contactNote;

  if (!buttonsEl) return;
  (page.contactButtons || []).forEach((btn, i) => {
    const a = document.createElement('a');
    a.href = btn.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = `srv-btn${i === 0 ? ' primary' : ''}`;
    a.innerHTML = `${btn.emoji || ''} ${btn.label}`;
    buttonsEl.appendChild(a);
  });
}

// ─── FOOTER ──────────────────────────────────────────────────────
function renderFooter() {
  const copy = document.getElementById('srv-footer-copy');
  if (copy) copy.innerHTML = `$ <span>${PORTFOLIO.alias}</span> · ${new Date().getFullYear()}`;
}

// ─── SCROLL OBSERVER ─────────────────────────────────────────────
function initScrollObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// ─── INIT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  renderNav();
  renderHeader();
  renderServiceCards();
  renderContact();
  renderFooter();
  setTimeout(initScrollObserver, 80);
});

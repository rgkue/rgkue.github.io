/**
 * main.js — Lógica de renderizado.
 * Lee todo desde data.js. No necesitas editarlo para actualizar contenido.
 */

// ─── ICONOS SVG INLINE ───────────────────────────────────────────
function svgIcon(name) {
  const icons = {
    github:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    instagram: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
    repo:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    chevron:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    download:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  };
  return icons[name] || '';
}

function statusLabel(s) {
  return {
    "done":        { text:"Done",        cls:"status-done"     },
    "in-progress": { text:"In Progress", cls:"status-progress" },
    "planned":     { text:"Planned",     cls:"status-planned"  },
  }[s] || { text:"Planned", cls:"status-planned" };
}

// ─── ESTRELLAS ────────────────────────────────────────────────────
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

// ─── TYPEWRITER ───────────────────────────────────────────────────
function typewriter(el, text, speed = 40) {
  el.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(cursor);
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i++]), cursor);
      setTimeout(tick, speed + Math.random() * 20);
    }
  };
  setTimeout(tick, 600);
}

// ─── HERO ─────────────────────────────────────────────────────────
function renderHero() {
  const d = PORTFOLIO;

  // Foto
  const photoEl = document.getElementById('hero-photo');
  if (photoEl) {
    const img = new Image();
    img.onload = () => {
      img.className = 'hero-photo';
      img.alt = d.name;
      photoEl.replaceWith(img);
    };
    img.src = d.photo;
  }

  document.getElementById('hero-name').textContent  = d.name;
  document.getElementById('hero-alias').textContent = d.alias;

  const taglineEl = document.getElementById('hero-tagline');
  typewriter(taglineEl, d.tagline);

  const socials = document.getElementById('hero-socials');
  d.social.forEach(s => {
    const a = document.createElement('a');
    a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = 'btn-social';
    a.innerHTML = `${svgIcon(s.icon)} ${s.label} →`;
    socials.appendChild(a);
  });
}

// ─── CARRUSEL ─────────────────────────────────────────────────────
function renderCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  // Duplicamos para el loop infinito
  const items = [...PORTFOLIO.tools, ...PORTFOLIO.tools];

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
        ph.replaceWith(img);
      };
      img.onerror = () => {}; // mantiene emoji si falla
      img.src = tool.iconUrl;
    }

    track.appendChild(card);
  });
}

// ─── PROYECTOS ────────────────────────────────────────────────────
function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  PORTFOLIO.projects.forEach((cat, i) => {
    const block = document.createElement('div');
    block.className = 'category-block fade-up';

    const header = document.createElement('div');
    header.className = 'category-header' + (i === 0 ? ' open' : '');
    header.innerHTML = `
      <div class="cat-left">
        <span>${cat.icon}</span>
        <span class="mono">&gt;_ ${cat.category}</span>
        <span class="cat-count">${cat.items.length}</span>
      </div>
      <span class="cat-chevron">${svgIcon('chevron')}</span>
    `;

    const body = document.createElement('div');
    body.className = 'category-body' + (i === 0 ? ' open' : '');

    cat.items.forEach(proj => {
      const st = statusLabel(proj.status);
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="project-status ${st.cls}">
          <span class="status-dot"></span>${st.text}
        </div>
        <div class="project-title">${proj.title}</div>
        <div class="project-desc">${proj.description}</div>
        <div class="project-tags">${proj.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        ${proj.repo ? `<a class="project-repo" href="${proj.repo}" target="_blank" rel="noopener">${svgIcon('repo')} Ver repositorio</a>` : ''}
      `;
      body.appendChild(card);
    });

    header.addEventListener('click', () => {
      header.classList.toggle('open');
      body.classList.toggle('open');
    });

    block.appendChild(header);
    block.appendChild(body);
    container.appendChild(block);
  });
}

// ─── HABILIDADES ──────────────────────────────────────────────────
function renderSkills() {
  const cvLink = document.getElementById('cv-link');
  if (cvLink) { cvLink.href = PORTFOLIO.cv; cvLink.download = 'IsaacMunoz_CV.pdf'; }

  const container = document.getElementById('skills-grid');
  if (!container) return;
  PORTFOLIO.skills.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'skill-card fade-up';
    card.innerHTML = `
      <div class="skill-cat">${cat.category}</div>
      <ul class="skill-list">${cat.items.map(i=>`<li>${i}</li>`).join('')}</ul>
    `;
    container.appendChild(card);
  });
}

// ─── EDUCACIÓN ────────────────────────────────────────────────────
function renderEducation() {
  const container = document.getElementById('education-list');
  if (!container) return;
  (PORTFOLIO.education || []).forEach(edu => {
    const card = document.createElement('div');
    card.className = 'edu-card fade-up';
    const degreeHtml = edu.url ? `<a href="${edu.url}" target="_blank" rel="noopener noreferrer">${edu.degree}</a>` : edu.degree;
    const institutionHtml = edu.institutionUrl ? `<a href="${edu.institutionUrl}" target="_blank" rel="noopener noreferrer">${edu.institution}</a>` : edu.institution;
    card.innerHTML = `
      <div class="edu-bar ${edu.current ? 'current' : ''}"></div>
      <div class="edu-content">
        <div class="edu-degree">${degreeHtml}</div>
        <div class="edu-institution">${institutionHtml}</div>
        <div class="edu-period">${edu.period}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ─── EXPERIENCIA ──────────────────────────────────────────────────
function renderExperience() {
  const container = document.getElementById('experience-list');
  if (!container) return;
  PORTFOLIO.experience.forEach(exp => {
    const card = document.createElement('div');
    card.className = 'edu-card fade-up';
    const companyHtml = exp.companyUrl ? `<a href="${exp.companyUrl}" target="_blank" rel="noopener noreferrer">${exp.company}</a>` : exp.company;
    card.innerHTML = `
      <div class="edu-bar ${exp.current ? 'current' : ''}"></div>
      <div class="edu-content">
        <div class="edu-degree">${exp.role}</div>
        <div class="edu-institution">${companyHtml}</div>
        <div class="edu-period">${exp.period}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ─── BLOG PREVIEW ─────────────────────────────────────────────────

function renderBlogPreview() {
  const grid = document.getElementById('blog-preview-grid');
  if (!grid) return;

  // Si blog/data.js no cargó (BLOG no definido), salir silenciosamente
  if (typeof BLOG === 'undefined') return;

  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  function fmtDate(str) {
    const [y, m, d] = str.split('-');
    return `${parseInt(d)} ${months[parseInt(m)-1]} ${y}`;
  }

  // Mostrar los 3 posts más recientes
  const recent = BLOG.posts.slice(0, 3);

  recent.forEach(post => {
    const a = document.createElement('a');
    a.className = 'blog-preview-card fade-up';
    a.href = `blog/post.html?id=${post.id}`;
    a.innerHTML = `
      <div class="blog-preview-meta">
        <span class="blog-preview-cat">${post.category}</span>
        <span class="blog-preview-date">${fmtDate(post.date)}</span>
      </div>
      <div class="blog-preview-title">${post.title}</div>
      <div class="blog-preview-excerpt">${post.excerpt}</div>
      <div class="blog-preview-tags">
        ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    `;
    grid.appendChild(a);
  });
}

// ─── EXPLORAR (cards de nav) ──────────────────────────────────────
function renderExplore() {
  const container = document.getElementById('explore-cards');
  if (!container) return;

  const navPages = [
    {
      label: 'Projects',
      href:  'projects/',
      desc:  'Repositorios, labs y prototipos',
      icon:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    },
    {
      label: 'Writeups',
      href:  'writeups/',
      desc:  'CTFs resueltos en HTB, THM y DockerLabs',
      icon:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    },
    {
      label: 'Scripts',
      href:  'scripts/',
      desc:  'Herramientas y automatizaciones en Bash/Python',
      icon:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    },
    {
      label: 'Certifications',
      href:  'certifications/',
      desc:  'Certificaciones de Cisco, AWS y más',
      icon:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    },
    {
      label: 'Blog',
      href:  'blog/',
      desc:  'Notas técnicas, aprendizajes y posts',
      icon:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    },
  ];

  navPages.forEach(page => {
    const a = document.createElement('a');
    a.className = 'explore-card fade-up';
    a.href = page.href;
    a.innerHTML = `
      <div class="explore-card-icon">${page.icon}</div>
      <div class="explore-card-body">
        <div class="explore-card-label">${page.label}</div>
        <div class="explore-card-desc">${page.desc}</div>
      </div>
      <div class="explore-card-arrow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    `;
    container.appendChild(a);
  });
}

// ─── CHIPS "SOBRE MÍ" ─────────────────────────────────────────────
function renderAboutChips() {
  const container = document.getElementById('about-chips');
  if (!container) return;

  // Chips: mezcla de herramientas clave y skills destacados
  const chips = [
    'Bash', 'Python', 'Linux', 'Kali', 'Nmap',
    'Burp Suite', 'Docker', 'HackTheBox', 'CTFs', 'Wireshark',
  ];

  chips.forEach(chip => {
    const span = document.createElement('span');
    span.className = 'about-chip';
    span.textContent = chip;
    container.appendChild(span);
  });
}

// ─── CHIPS HABILIDADES + CERTIFICACIONES (sección trayectoria) ───
function renderBgSkillsChips() {
  const container = document.getElementById('bg-skills-chips');
  if (!container) return;

  // Columna izquierda: skillHighlights → array plano de { label }
  function buildSkillsCard() {
    const card = document.createElement('div');
    card.className = 'hl-single-card fade-up';
    const listHtml = (PORTFOLIO.skillHighlights || []).map(item =>
      `<li class="hl-item"><span class="hl-arrow">›</span>${item.label}</li>`
    ).join('');
    card.innerHTML = `
      <div class="hl-single-title">Habilidades</div>
      <ul class="hl-single-list">${listHtml}</ul>
    `;
    return card;
  }

  // Columna derecha: certHighlights → array plano de { label, url? }
  function buildCertsCard() {
    const card = document.createElement('div');
    card.className = 'hl-single-card fade-up';
    const listHtml = (PORTFOLIO.certHighlights || []).map(item => {
      const inner = item.url
        ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a>`
        : item.label;
      return `<li class="hl-item"><span class="hl-arrow">›</span>${inner}</li>`;
    }).join('');
    card.innerHTML = `
      <div class="hl-single-title">Certificaciones</div>
      <ul class="hl-single-list">${listHtml}</ul>
    `;
    return card;
  }

  const wrap = document.createElement('div');
  wrap.className = 'hl-two-col';

  const leftCol = document.createElement('div');
  leftCol.className = 'hl-col';
  leftCol.appendChild(buildSkillsCard());

  const rightCol = document.createElement('div');
  rightCol.className = 'hl-col';
  rightCol.appendChild(buildCertsCard());

  wrap.appendChild(leftCol);
  wrap.appendChild(rightCol);
  container.appendChild(wrap);
}

// ─── FOOTER ───────────────────────────────────────────────────────
function renderFooter() {
  const social = document.getElementById('footer-social');
  if (social) {
    PORTFOLIO.social.forEach(s => {
      const a = document.createElement('a');
      a.href = s.url; a.target='_blank'; a.rel='noopener noreferrer';
      a.innerHTML = `${svgIcon(s.icon)} ${s.label}`;
      social.appendChild(a);
    });
  }
  const emails = document.getElementById('footer-emails');
  if (emails) {
    PORTFOLIO.email.forEach(e => {
      const a = document.createElement('a');
      a.href = `mailto:${e}`; a.textContent = e;
      emails.appendChild(a);
    });
  }
  const copy = document.getElementById('footer-copy');
  if (copy) copy.innerHTML = `$ <span>${PORTFOLIO.alias}</span> · ${new Date().getFullYear() }`;
  }

  const cop = document.getElementById('footer-cop');
  if (cop) cop.innerHTML = `Copyright © ${new Date().getFullYear()} Isaac Muñoz. Todos los derechos reservados.`;

// ─── SCROLL OBSERVER ──────────────────────────────────────────────
function initScrollObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// ─── INIT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  renderHero();
  renderCarousel();
  renderExplore();
  renderAboutChips();
  renderEducation();
  renderExperience();
  renderBgSkillsChips();
  //renderSkills();   // aún actualiza el cv-link
  renderFooter();
  setTimeout(initScrollObserver, 80);
});
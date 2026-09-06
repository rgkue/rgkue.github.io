/**
 * projects.js — Renderizado de /projects/
 * Lee desde portfolioData (data.js).
 * Filtros: categoría (sidebar), tag (panel derecho), búsqueda (input).
 */

const TAG_IMAGES = {
  "Ubuntu":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",
  "Linux":           "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  "Bash":            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  "Python":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Docker":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "HTML":            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS":             "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "JavaScript":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "Web Development": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "Networking":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ssh/ssh-original.svg",
  "Malware":         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Pentesting":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  "CTF":             "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
};

const CAT_IMAGES = {
  "Projects":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "Cybersecurity":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
};

function thumbFor(proj, catName) {
  if (proj.image) return proj.image;
  for (const tag of proj.tags) {
    if (TAG_IMAGES[tag]) return TAG_IMAGES[tag];
  }
  return CAT_IMAGES[catName]
    || "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg";
}

const svgGithub = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;

const STATUS_MAP = {
  "done":        { cls: "s-done",     label: "Done" },
  "in-progress": { cls: "s-progress", label: "In Progress" },
  "planned":     { cls: "s-planned",  label: "Planned" },
};

let activeCategory = null;
let activeTag      = null;
let searchQuery    = '';

function allProjects() {
  return portfolioData.projects.flatMap(c => c.items);
}

function render() {
  const data = portfolioData.projects;

  // ── Sidebar: categorías ──────────────────────────────────────
  const catList = document.getElementById("cat-list");
  catList.innerHTML = "";
  data.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "cat-btn" + (activeCategory === cat.category ? " active" : "");
    btn.innerHTML = `<span>${cat.category}</span><span class="cat-num">${cat.items.length}</span>`;
    btn.addEventListener("click", () => {
      activeCategory = activeCategory === cat.category ? null : cat.category;
      activeTag      = null;
      searchQuery    = '';
      document.getElementById('search-input').value = '';
      render();
    });
    catList.appendChild(btn);
  });

  // ── Panel derecho: conteos globales ─────────────────────────
  const all = allProjects();
  document.getElementById("count-done").textContent     = all.filter(p => p.status === "done").length;
  document.getElementById("count-progress").textContent = all.filter(p => p.status === "in-progress").length;
  document.getElementById("count-planned").textContent  = all.filter(p => p.status === "planned").length;

  // Tags frecuentes
  const tagFreq = {};
  all.forEach(p => p.tags.forEach(t => { tagFreq[t] = (tagFreq[t] || 0) + 1; }));
  const topTags = Object.entries(tagFreq).sort((a, b) => b[1] - a[1]).slice(0, 14).map(e => e[0]);
  const tagsCloud = document.getElementById("tags-cloud");
  tagsCloud.innerHTML = "";
  topTags.forEach(tag => {
    const s = document.createElement("span");
    s.className = "cloud-tag" + (activeTag === tag ? " active" : "");
    s.textContent = tag;
    s.addEventListener("click", () => {
      activeTag      = activeTag === tag ? null : tag;
      activeCategory = null;
      searchQuery    = '';
      document.getElementById('search-input').value = '';
      render();
    });
    tagsCloud.appendChild(s);
  });

  // ── Filtrar ──────────────────────────────────────────────────
  const q = searchQuery.toLowerCase().trim();

  const filtered = data.map(cat => {
    let items = cat.items;

    if (activeCategory && cat.category !== activeCategory) return { ...cat, items: [] };

    if (activeTag) items = items.filter(p => p.tags.includes(activeTag));

    if (q) items = items.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );

    return { ...cat, items };
  }).filter(cat => cat.items.length > 0);

  // ── Feed ─────────────────────────────────────────────────────
  const feed = document.getElementById("projects-feed");
  feed.innerHTML = "";

  if (filtered.length === 0) {
    feed.innerHTML = `<div class="empty-state">Sin resultados para "<strong>${q || activeTag || activeCategory}</strong>".</div>`;
    return;
  }

  filtered.forEach(cat => {
    const group = document.createElement("div");
    group.className = "cat-group";

    const label = document.createElement("div");
    label.className = "cat-group-label";
    label.textContent = `> ${cat.category}`;
    group.appendChild(label);

    const items = document.createElement("div");
    items.className = "cat-group-items";

    cat.items.forEach(proj => {
      const st    = STATUS_MAP[proj.status] || STATUS_MAP["planned"];
      const thumb = thumbFor(proj, cat.category);

      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <div class="proj-info">
          <div class="proj-meta">
            <span class="status-dot ${st.cls}"></span>
            <span class="proj-status-text mono">${st.label}</span>
          </div>
          <div class="proj-title">${proj.title}</div>
          <div class="proj-desc">${proj.description}</div>
          <div class="proj-bottom">
            <div class="proj-tags">${proj.tags.slice(0, 5).map(t => `<span class="tag">${t}</span>`).join("")}</div>
            ${proj.repo ? `<a class="proj-link" href="${proj.repo}" target="_blank" rel="noopener">${svgGithub} Repositorio</a>` : ""}
          </div>
        </div>
        <img class="proj-thumb" src="${thumb}" alt="${proj.title}" loading="lazy" onerror="this.style.display='none'" />
      `;
      items.appendChild(card);
    });

    group.appendChild(items);
    feed.appendChild(group);
  });
}

// ── Eventos ─────────────────────────────────────────────────────
document.getElementById("search-input").addEventListener("input", e => {
  searchQuery    = e.target.value;
  activeCategory = null;
  activeTag      = null;
  render();
});

document.getElementById("reset-btn").addEventListener("click", () => {
  activeCategory = null;
  activeTag      = null;
  searchQuery    = '';
  document.getElementById('search-input').value = '';
  render();
});

document.addEventListener("DOMContentLoaded", render);

/**
 * viewer.js — Visor de writeups en Markdown.
 * Lee los parámetros de la URL:
 *   ?path=contents/HackTheBox/Cocodrilo
 *   &title=Cocodrilo
 *   &platform=HackTheBox
 *   &difficulty=Very Easy
 *
 * Hace fetch al README.md dentro de esa ruta,
 * lo renderiza con marked.js y construye el TOC.
 */

// ── Leer parámetros ───────────────────────────────────────────
const params     = new URLSearchParams(window.location.search);
const path       = params.get("path")       || "";
const title      = params.get("title")      || "Writeup";
const platform   = params.get("platform")   || "";
const difficulty = params.get("difficulty") || "";

// ── Helpers ───────────────────────────────────────────────────
function platformClass(p) {
  const m = { "HackTheBox": "htb", "TryHackMe": "thm", "DockerLabs": "dl" };
  return m[p] || "def";
}

function diffClass(d) {
  return "diff-" + (d || "").toLowerCase().replace(/\s/g, "");
}

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

// ── Metadatos sidebar ─────────────────────────────────────────
document.title = `${title} - Isaac Muñoz`;
document.getElementById("meta-title").textContent    = title;
document.getElementById("meta-platform").textContent = platform;
document.getElementById("meta-platform").className   = `meta-platform ${platformClass(platform)}`;
document.getElementById("meta-diff").textContent     = difficulty;
document.getElementById("meta-diff").className       = `meta-diff ${diffClass(difficulty)}`;

// Buscar el writeup en writeups-data para sacar fecha y tags
// (viewer.html no carga writeups-data.js, lo resolvemos inline si hace falta)
// Por ahora dejamos fecha y tags vacíos — se pueden agregar al URL si se desea
// o cargar el script de datos opcionalmente.

// ── Cargar y renderizar Markdown ──────────────────────────────
async function loadWriteup() {
  const mdUrl   = `${path}/README.md`;
  const loading = document.getElementById("md-loading");
  const body    = document.getElementById("md-body");

  try {
    const res = await fetch(mdUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let markdown = await res.text();

    // Reescribir rutas de imágenes: media/img.png → {path}/media/img.png
    // Marked las dejará como src relativas al HTML — ajustamos la base
    markdown = markdown.replace(
      /!\[([^\]]*)\]\(media\//g,
      `![$1](${path}/media/`
    );

    // Configurar marked
    marked.setOptions({ breaks: true, gfm: true });

    // Renderizar
    body.innerHTML = marked.parse(markdown);
    loading.style.display = "none";

    // Construir TOC desde h2 y h3
    buildTOC(body);

    // Scroll spy
    initScrollSpy();

  } catch (err) {
    loading.innerHTML = `<span class="mono" style="color:var(--diff-hard)">Error cargando el writeup: ${err.message}</span>`;
  }
}

// ── TOC ────────────────────────────────────────────────────────
function buildTOC(body) {
  const toc      = document.getElementById("toc");
  const headings = body.querySelectorAll("h2, h3");

  if (headings.length === 0) {
    document.querySelector(".toc-section").style.display = "none";
    return;
  }

  headings.forEach((h, i) => {
    // Asignar id para ancla
    const id = slugify(h.textContent) + "-" + i;
    h.id = id;

    const a = document.createElement("a");
    a.className = `toc-item ${h.tagName.toLowerCase()}`;
    a.href      = `#${id}`;
    a.textContent = h.textContent;
    a.addEventListener("click", e => {
      e.preventDefault();
      h.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    toc.appendChild(a);
  });
}

// ── Scroll spy ─────────────────────────────────────────────────
function initScrollSpy() {
  const items    = document.querySelectorAll(".toc-item");
  const headings = document.querySelectorAll(".md-body h2, .md-body h3");
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach(a => a.classList.remove("active"));
        const active = [...items].find(a => a.href.endsWith("#" + entry.target.id));
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-10% 0px -80% 0px" });

  headings.forEach(h => observer.observe(h));
}

// ── Init ───────────────────────────────────────────────────────
if (!path) {
  document.getElementById("md-loading").innerHTML =
    `<span class="mono" style="color:var(--text-muted)">No se especificó ningún writeup.</span>`;
} else {
  loadWriteup();
}

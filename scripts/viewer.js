/**
 * scripts/viewer.js — Visor de scripts.
 * Lee los parámetros de la URL:
 *   ?title=BashCheck
 *   &lang=bash
 *   &file=rgkue/bashcheck/main/bashcheck.sh   ← ruta raw (sin dominio)
 *   &repo=https://github.com/rgkue/bashcheck
 *   &desc=Descripción del script
 *
 * Carga el archivo desde raw.githubusercontent.com y lo muestra
 * con syntax highlighting via highlight.js.
 */

// ── Parámetros ────────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
const title  = params.get("title") || "Script";
const lang   = params.get("lang")  || "bash";
const file   = params.get("file")  || "";
const repo   = params.get("repo")  || "";
const desc   = params.get("desc")  || "";

const LANG_COLORS = {
  bash:   "#3ddc84",
  python: "#e8c84a",
  js:     "#e8c84a",
  ruby:   "#e06c6c",
  go:     "#4e9de8",
  rust:   "#e8903a",
};
const langColor = LANG_COLORS[lang.toLowerCase()] || "#4e6b55";

// ── Sidebar: metadatos ────────────────────────────────────────
document.title = `${title} - Isaac Muñoz`;

const metaLang = document.getElementById("meta-lang");
metaLang.textContent  = lang;
metaLang.style.color  = langColor;

document.getElementById("meta-title").textContent = title;
document.getElementById("meta-desc").textContent  = desc;

const metaRepo = document.getElementById("meta-repo");
if (repo) {
  metaRepo.href = repo;
} else {
  metaRepo.style.display = "none";
}

// ── Filename en el header del bloque ─────────────────────────
const filename = file.split("/").pop() || title;
document.getElementById("sc-filename").textContent = filename;

// ── Cargar y mostrar el script ────────────────────────────────
async function loadScript() {
  if (!file) {
    document.getElementById("sc-loading").innerHTML =
      `<span class="mono" style="color:var(--text-muted)">No se especificó ningún archivo.</span>`;
    return;
  }

  const rawUrl = `https://raw.githubusercontent.com/${file}`;

  try {
    const res = await fetch(rawUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const code = await res.text();

    const codeEl = document.getElementById("sc-code");
    codeEl.textContent = code;
    codeEl.className   = lang; // hint para highlight.js

    hljs.highlightElement(codeEl);

    document.getElementById("sc-loading").style.display = "none";
    document.getElementById("sc-block").style.display   = "block";

  } catch (err) {
    document.getElementById("sc-loading").innerHTML =
      `<span class="mono" style="color:var(--diff-hard)">Error cargando el script: ${err.message}</span>`;
  }
}

// ── Botón copiar ──────────────────────────────────────────────
document.getElementById("copy-btn").addEventListener("click", () => {
  const code = document.getElementById("sc-code").textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById("copy-btn");
    const original = btn.innerHTML;
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copiado`;
    btn.style.color = "var(--green)";
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.color = "";
    }, 2000);
  });
});

// ── Init ──────────────────────────────────────────────────────
loadScript();

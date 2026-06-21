/**
 * scripts/data.js
 * Índice de scripts/herramientas. Cada entrada apunta a un repo
 * externo en GitHub desde donde se carga el código.
 *
 * Campos:
 *   title       — nombre del script / herramienta
 *   description — descripción corta (1-2 frases)
 *   lang        — lenguaje principal ("bash" | "python" | "js" | ...)
 *   tags        — array de strings
 *   date        — ISO "YYYY-MM-DD"
 *   repo        — URL del repositorio en GitHub
 *   file        — ruta del archivo principal dentro del repo
 *                 (se carga vía raw.githubusercontent.com)
 *   image       — ruta a imagen/logo opcional (relativa a scripts/)
 */
const scriptsData = [
    {
    title:       "MySQLi",
    description: "Script para automatizar inyección SQL basada en tiempo (Time-Based Blind SQLi), inspirado en CVE-2019-9053.",
    lang:        "Python",
    tags:        ["Python", "SQLi", "Pentesting", "Automation"],
    date:        "20206-06-20",
    repo:        "https://github.com/rgkue/mysqli",
    file:        "rgkue/mysqli/refs/heads/main/mysqli.py",
    image:       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    title:       "BashCheck",
    description: "Herramienta de línea de comandos para verificación rápida de hashes en archivos y exportación masiva de activos digitales.",
    lang:        "Bash",
    tags:        ["Bash", "Hashing", "CLI", "Linux"],
    date:        "2026-06-12",
    repo:        "https://github.com/rgkue/bashcheck",
    file:        "rgkue/bashcheck/refs/heads/main/bashcheck.sh",
    image:       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  },
  {
    title:       "Shell-Colors",
    description: "Script para simular el proceso de una terminal y prácticar colores con códigos de escape ANSI.",
    lang:        "Bash",
    tags:        ["Bash", "Terminal", "Colors"],
    date:        "2026-06-02",
    repo:        "https://github.com/rgkue/shell-colors",
    file:        "rgkue/shell-colors/refs/heads/main/shell-colors.sh",
    image:       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  },
];

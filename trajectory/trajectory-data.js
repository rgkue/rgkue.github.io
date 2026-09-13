// ─── DATOS DE /trajectory/ ────────────────────────────────────
//
//   title           string  — título del grado / rol
//   institution     string
//   institutionUrl  string? — link de la institución/empresa
//   url             string? — link propio del ítem (solo educación,
//                              ej. la página de la carrera). Si no
//                              aplica, se omite.
//   period          string  — texto ya formateado para mostrar
//   start           string  — "YYYY-MM" o "YYYY", SOLO para ordenar
//                              (no se muestra). Necesario porque el
//                              orden de carga no era cronológico.
//   current         bool
//   logo            string? — ruta relativa desde /trayectoria/.
//                              Si falta o no carga, se usa un ícono
//                              genérico (birrete / maletín).
//   description     string  — puede ir vacío ("")
//
const TRAYECTORIA_DATA = {

  // ─── HERRAMIENTAS (carrusel) ──────────────────────────────
  // scale: opcional — algunos SVG externos traen mucho padding
  // interno en su viewBox y se ven chicos aunque la caja (42x42)
  // sea igual a la del resto. Ajustado a ojo en los que se notaban
  // pequeños en pantalla (Bash, SQL Server). Si otro ícono del
  // carrusel se ve chico, agregale este mismo campo (probar 1.3–1.6).
  tools: [
    { name: "Git", emoji: "🔶", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-plain.svg", url: "https://git-scm.com/" },
    { name: "Python", emoji: "🐍", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", url: "https://www.python.org/" },
    { name: "Docker", emoji: "🐳", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg", url: "https://www.docker.com/" },
    { name: "Linux", emoji: "🐧", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Icons8_flat_linux.svg/1280px-Icons8_flat_linux.svg.png?_=20170610200026", url: "https://www.linux.org/" },
    { name: "Windows", emoji: "🪟", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg", url: "https://www.microsoft.com/en-us/windows" },
    { name: "Bash", emoji: "⬛", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-plain.svg", url: "https://www.gnu.org/software/bash/", scale: 1.5 },
    { name: "SQL Server", emoji: "🔴", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", url: "https://www.microsoft.com/en-us/sql-server", scale: 1.5 },
    { name: "PostgreSQL", emoji: "🐘", iconUrl: "https://www.postgresql.org/media/img/about/press/elephant.png", url: "https://www.postgresql.org/" },
    { name: "XAMPP", emoji: "🟠", iconUrl: "https://www.apachefriends.org/images/favicon-18f9bd42.png", url: "https://www.apachefriends.org/" },
    { name: "Kali Linux", emoji: "🔵", iconUrl: "https://www.kali.org/images/favicon-dark.svg", url: "https://www.kali.org/" },
    { name: "Nmap", emoji: "📡", iconUrl: "https://nmap.org/images/sitelogo-nmap.svg", url: "https://nmap.org/" },
    { name: "Cisco", emoji: "🌐", tint: true, iconUrl: "https://staging.svgrepo.com/show/303323/cisco-2-logo.svg", url: "https://www.cisco.com/" },
    { name: "Burp Suite", emoji: "🛡️", iconUrl: "https://www.kali.org/images/tool-logo-burp.svg", url: "https://portswigger.net/burp" },
    { name: "Metasploit", emoji: "💀", iconUrl: "https://www.kali.org/images/tool-logo-metasploit.svg", url: "https://www.metasploit.com/" },
    { name: "Wireshark", emoji: "🕷️", iconUrl: "https://www.kali.org/images/tool-logo-wireshark.svg", url: "https://www.wireshark.org/" },
    { name: "FastAPI", emoji: "⚡", iconUrl: "https://fastapi.tiangolo.com/img/favicon.png", url: "https://fastapi.tiangolo.com/" },
  ],

  // ─── FORMACIÓN ACADÉMICA ─────
  education: [
    {
      title: "Licenciatura en Ciberseguridad",
      url: "https://fisc.utp.ac.pa/licenciatura-en-ciberseguridad/",
      institution: "Universidad Tecnológica de Panamá",
      institutionUrl: "https://www.utp.ac.pa/",
      period: "2025 – En curso",
      start: "2025-01",
      current: true,
      logo: "assets/utp.png",
      description: "Carrera enfocada en seguridad informática, redes y ciberdefensa: fundamentos de redes, sistemas operativos, programación, ethical hacking y operaciones de seguridad (SOC).",
    },
    {
      title: "Bachiller en Tecnología e Informática",
      institution: "Instituto José Dolores Moscote",
      institutionUrl: "https://instagram.com/moscote_507",
      period: "2022 – 2024",
      start: "2022-01",
      current: false,
      logo: "assets/moscote.png",
      description: "Bachillerato con énfasis en informática: fundamentos de programación, mantenimiento de equipos y redes básicas. Primer acercamiento formal a la tecnología.",
    },
  ],

  // ─── EXPERIENCIA PROFESIONAL ─
  // Ordenado por "start" al renderizar, no por el orden del array
  experience: [
    {
      title: "Soporte Técnico de TI",
      institution: "Innovasoft LATAM",
      institutionUrl: "https://innovasoftlatam.com/",
      period: "2025 – 2026",
      start: "2025-08",
      current: false,
      logo: "assets/innovasoft.png",
      description: "Resolución de incidencias nivel 1 y 2 en redes, sistemas y hardware en entornos empresariales. Instalación y configuración de servidores y redes LAN/WLAN. Soporte a usuarios en problemas de conectividad, impresoras y sistemas.",
    },
    {
      title: "Práctica Profesional - Asesor de Ventas",
      institution: "Rodelag S.A.",
      institutionUrl: "https://www.rodelag.com/",
      period: "2024 - 2024",
      start: "2024-01",
      current: false,
      logo: "assets/rodelag.png",
      description: "Atención al cliente en área tecnológica como prácticante. Apoyo en inventario y soporte básico en equipos.",
    },
    {
      title: "Ayudante Académico Estudiantil - Auxiliar de Soporte Técnico",
      institution: "Universidad Tecnológica de Panamá",
      institutionUrl: "https://www.utp.ac.pa/",
      period: "2026 - Actual",
      start: "2026-01",
      current: true,
      logo: "assets/utp.png",
      description: "Ayudante académico en área de soporte técnico de la Universidad Tecnológica de Panamá. Ayuda a profesores y estudiantes con consultas generales de soporte técnico.",
    },
  ],

};
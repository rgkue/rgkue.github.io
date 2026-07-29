const PORTFOLIO = {

  name: "Isaac Muñoz",
  alias: "rgkue",
  tagline: "Building to learn. Learning to build.",
  photo: "assets/photo.jpg",
  cv: "assets/IsaacMunoz_CV.pdf",
  icon: "assets/icon.png",
  publicidad: "assets/servicios.png",

  social: [
    { label: "GitHub", url: "https://github.com/rgkue", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/isaacmunozp", icon: "linkedin" },
    { label: "Instagram", url: "https://instagram.com/rgkue", icon: "instagram" },
  ],

  // ─── HERRAMIENTAS (carrusel) ──────────────────────────────
  tools: [
    { name: "Git", emoji: "🔶", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-plain.svg", url: "https://git-scm.com/" },
    { name: "Python", emoji: "🐍", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", url: "https://www.python.org/" },
    { name: "Docker", emoji: "🐳", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg", url: "https://www.docker.com/" },
    { name: "Linux", emoji: "🐧", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Icons8_flat_linux.svg/1280px-Icons8_flat_linux.svg.png?_=20170610200026", url: "https://www.linux.org/" },
    { name: "Windows", emoji: "🪟", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg", url: "https://www.microsoft.com/en-us/windows" },
    { name: "Bash", emoji: "⬛", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-plain.svg", url: "https://www.gnu.org/software/bash/" },
    { name: "SQL Server", emoji: "🔴", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", url: "https://www.microsoft.com/en-us/sql-server" },
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

  // ─── EDUCACIÓN ────────────────────────────────────────────
  education: [
    {
      degree: "Licenciatura en Ciberseguridad", url: "https://fisc.utp.ac.pa/licenciatura-en-ciberseguridad/",
      institution: "Universidad Tecnológica de Panamá", institutionUrl: "https://www.utp.ac.pa/",
      period: "2025 – En curso",
      current: true,
    },
    {
      degree: "Bachiller en Tecnología e Informática",
      institution: "Instituto José Dolores Moscote", institutionUrl: "https://instagram.com/moscote_507",
      period: "2022 – 2024",
      current: false,
    },
  ],

  // ─── EXPERIENCIA PROFESIONAL ──────────────────────────────
  experience: [
    {
      role: "Soporte Técnico de TI",
      company: "Innovasoft LATAM", companyUrl: "https://innovasoftlatam.com/",
      period: "2025 – 2026",
      description: "Resolución de incidencias nivel 1 y 2 en redes, sistemas y hardware en entornos empresariales. Instalación y configuración de servidores y redes LAN. Soporte a usuarios en problemas de conectividad, impresoras y sistemas.",
      current: true,
    },
    {
      role: "Práctica Profesional - Asesor de Ventas",
      company: "Rodelag S.A.", companyUrl: "https://www.rodelag.com/",
      period: "2024",
      description: "Atención al cliente en área tecnológica como prácticante. Apoyo en inventario y soporte básico en equipos.",
      current: false,
    },
  ],

  
  // ─── HIGHLIGHTS (sección habilidades en index) ───────────
  // skillHighlights → columna izquierda (10 items planos)
  // certHighlights  → columna derecha  (10 items, url opcional)
  skillHighlights: [
    { label: "Linux - Ubuntu, Kali, Fedora" },
    { label: "Windows 10/11 & Server, Windows Dr. Lite" },
    { label: "Instalación y configuración de software" },
    { label: "Configuración de redes LAN" },
    { label: "Troubleshooting de red" },
    { label: "Wireshark & Analisis de tráfico" },
    { label: "Nmap & herramientas de seguridad ofensiva" },
    { label: "Python & Bash Scripting" },
    { label: "SQL · XAMPP · LAMP" },
    { label: "Resolución de problemas & Resiliencia" },
  ],

  certHighlights: [
    { label: "CCNA: Introduction to Networks - Academia de Cisco de la UTP" },
    { label: "Computer Hardware Basics - Cisco Networking Academy" },
    { label: "Ethical Hacker - Cisco Networking Academy" },
    { label: "Linux Essentials: Network Development Group" },
    { label: "Networking Basics - Cisco Networking Academy" },
    { label: "Introduction to Cybersecurity - Cisco Networking Academy" },
    { label: "AWS Foundations - AWS Academy" },
    { label: "AWS Security - AWS Academy" },
    { label: "Junior Cybersecurity Analyst Career Path" },
    { label: "Cybersecurity Essentials - Cisco Networking Academy" },
  ],

  // ─── CONTACTO (footer) ────────────────────────────────────
  email: [
    "isaac.munozp2836@gmail.com",
  ],
};
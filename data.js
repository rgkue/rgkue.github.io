const PORTFOLIO = {

  name: "Isaac Muñoz",
  alias: "rgkue",
  tagline: "Building to learn. Learning to build.",
  photo: "assets/photo.jpg",
  cv: "assets/IsaacMunoz.pdf",
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

  // ─── PROYECTOS ────────────────────────────────────────────
  projects: [
    {
      category: "Projects",
      icon: "🌐",
      items: [
        {
          title: "Servidor Ubuntu como Router Domestico",
          description: "Configuración de Ubuntu Server como router/access point editando archivos del sistema, con monitoreo de tráfico en red local y resolución de DNS mediante scripts Bash.",
          tags: ["Ubuntu", "Linux", "Networking", "Bash", "Router"],
          status: "done",
          repo: "https://github.com/rgkue/ubuntuserver-router",
        },
        {
          title: "Sitio web personal - Portafolio Profesional",
          description: "Desarrollo de este portafolio personal utilizando HTML, CSS y JavaScript para mostrar proyectos, habilidades y experiencia profesional de forma clara y atractiva",
          tags: ["HTML", "CSS", "JavaScript", "Web Development"],
          status: "done",
          repo: "https://github.com/rgkue/rgkue.github.io",
        },
        {
          title: "Shell Colors",
          description: "Pequeño programa en bash scripting para simular el uso de una shell o terminal.",
          tags: ["Programming", "Linux", "Terminal", "Shell", "Scripting", "Bash"],
          status: "in-progress",
          repo: "https://github.com/rgkue/shell-colors",
        }
      ],
    },
    {
      category: "Cybersecurity",
      icon: "🔒",
      items: [
        {
          title: "Simulación de Ransomware en Windows 7 Home Basic",
          description: "Laboratorio  de ransomware en entorno controlado contra un sistema operativo Windows 7 Home Basic vulnerable a MS17-010, EternaBlue",
          tags: ["Python", "Malware", "Educativo", "EternaBlue", "MS17-010", "Ransomware"],
          status: "done",
          repo: "https://github.com/rgkue/xcrypto-lab",
        },
        {
          title: "Writeups - Documentación de CTFs en plataformas de pentesting",
          description: "Repositorio con writeups de máquinas resueltas en  plataformas como HackTheBox, TryHackMe y DockerLabs.",
          tags: ["CTF", "HTB", "TryHackMe", "DockerLabs", "Pentesting", "Writeups"],
          status: "done",
          repo: "https://github.com/rgkue/writeups-pentesting",
        },
        {
          title: "BashCheck",
          description: "Herramienta de línea de comandos para la rápida verificación de hashes en archivos y exportación masiva de activos digitales",
          tags: ["Bash", "Programming", "BashScripting", "Linux"],
          status: "done",
          repo: "https://github.com/rgkue/bashcheck",
        },
      ],
    },
  ],

  // ─── HABILIDADES ──────────────────────────────────────────
  skills: [
    {
      category: "Sistemas Operativos",
      items: ["Windows 10/11 & Windows Server", "Linux (Ubuntu Server, Kali, Debian)", "Administración básica de sistemas", "Instalación y configuración de software"],
    },
    {
      category: "Redes",
      items: ["Configuración de redes LAN", "Troubleshooting de redes", "Diagnósticos de redes", "Instalación de servidores locales"],
    },
    {
      category: "Ciberseguridad",
      items: ["Hack The Box", "TryHackMe", "CTFs", "Análisis de vulnerabilidades"],
    },
    {
      category: "Técnicas",
      items: ["Soporte técnico remoto y en sitio", "Python básico", "XAMPP", "Lenguaje SQL", "Automatización de tareas"],
    },
    {
      category: "Soft Skills",
      items: ["Resolución de problemas", "Aprendizaje autodidacta", "Trabajo bajo presión", "Comunicación técnica", "Zoho Desk"],
    },
    {
      category: "Certificaciones",
      items: ["CCNA: Introduction to Networks", "Amazon  Web Services (AWS): Foundations", "Linux Essentials: NDG", "Ethical Hacker: Cisco Networking Academy"],
    },
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

  // ─── SERVICIOS ────────────────────────────────────────────
  servicesPage: {
    title: "Soporte Técnico",
    subtitle: "Diagnóstico, limpieza y optimización de equipos Windows. Atención remota vía AnyDesk o presencial en Ciudad de Panamá.",
    image: "assets/servicios.png",
    imageAlt: "Soporte técnico y servicios de optimización de equipos",
    contactNote: "Los precios varían según la complejidad del trabajo.",
    contactButtons: [
      { label: "WhatsApp", emoji: "💬", url: "https://wa.link/62jnc7" },
    ],
  },

  services: [
    {
      icon: "🖥️",
      title: "Diagnóstico de equipo",
      description: "Revisión completa del estado del hardware y software. Identificación de problemas de rendimiento, fallos, sobrecalentamiento y errores del sistema.",
      tags: ["Windows", "Hardware", "Software"],
      badge: "Remoto · Presencial",
    },
    {
      icon: "🧹",
      title: "Limpieza y optimización",
      description: "Limpieza de archivos temporales, programas innecesarios al inicio, malware y optimización general para mejorar el rendimiento del equipo.",
      tags: ["Windows", "Malware", "Rendimiento"],
      badge: "Remoto · Presencial",
    },
    {
      icon: "📚",
      title: "Tareas académicas de tecnología",
      description: "Apoyo en tareas de sistemas, redes informáticas, cuestionarios, investigaciones y configuración en Packet Tracer. Solución con explicación incluida.",
      tags: ["Redes", "Sistemas", "Packet Tracer", "Python"],
      badge: "Remoto · Presencial",
    },
  ],
  // ─── CONTACTO (footer) ────────────────────────────────────
  email: [
    "isaac.munozp2836@gmail.com",
  ],
};

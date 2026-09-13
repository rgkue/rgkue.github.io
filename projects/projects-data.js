// projects/data.js
const portfolioData = {
  projects: [
    {
      category: "Cybersecurity",
      icon: "🔒",
      items: [
        {
          title: "Simulación de Ransomware en Windows 7 Home Basic",
          description: "Laboratorio de ransomware en entorno controlado contra un sistema operativo Windows 7 Home Basic vulnerable a MS17-010, EternaBlue",
          tags: ["Python", "Malware", "Educativo", "EternaBlue", "MS17-010", "Ransomware"],
          status: "done",
          repo: "https://github.com/rgkue/xcrypto-lab",
        },
        {
          title: "Writeups - Documentación de CTFs en plataformas de pentesting",
          description: "Repositorio con writeups de máquinas resueltas en plataformas como HackTheBox, TryHackMe y DockerLabs.",
          tags: ["CTF", "HTB", "TryHackMe", "DockerLabs", "Pentesting", "Writeups"],
          status: "done",
          repo: "https://github.com/rgkue/writeups-pentesting",
        },
      ],
    },
    {
      category: "Development",
      icon: "💻",
      items: [
        {
          title: "Proyecto CRUD en Python con Flask y SQLite usando una API REST",
          description: "Desarrollo de un servidor y un cliente dedicado con interfaz CLI/GUI para la consulta y gestión de datos en una base de datos SQLite mediante una API REST.",
          tags: ["Python", "Automation", "Development", "Flask", "SQLite", "REST API"],
          status: "done",
          repo: "https://github.com/rgkue/rest-api",
        },
        {
          title: "Sitio web personal - Portafolio Profesional",
          description: "Desarrollo de este portafolio personal utilizando HTML, CSS y JavaScript para mostrar proyectos, habilidades y experiencia profesional de forma clara y atractiva",
          tags: ["HTML", "CSS", "JavaScript", "Web Development"],
          status: "done",
          repo: "https://github.com/rgkue/rgkue.github.io",
        },
      ],
    },
    {
      category: "Networking",
      icon: "🌐",
      items: [
        {
          title: "Servidor Ubuntu como Router Domestico",
          description: "Configuración de Ubuntu Server como router/access point editando archivos del sistema, con monitoreo de tráfico en red local y resolución de DNS mediante scripts Bash.",
          tags: ["Ubuntu", "Linux", "Networking", "Bash", "Router"],
          status: "done",
          repo: "https://github.com/rgkue/ubuntuserver-router",
        },
      ],
    },
  /*  
    {
      category: "Harwdare Hacking",
      icon: "⚡",
      items: [
        {
          title: "Análisis de Vulnerabilidades en Dispositivos IoT",
          description: "Investigación y análisis de vulnerabilidades en dispositivos IoT comunes, con recomendaciones para mejorar la seguridad.",
          tags: ["IoT", "Hardware Hacking", "Vulnerabilities"],
          status: "planned",
          repo: null,
        },
      ],
    },
  */ 
  ]
};

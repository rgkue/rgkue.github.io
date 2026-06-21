// projects/data.js
const portfolioData = {
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
        {
          title: "BashCheck",
          description: "Herramienta de línea de comandos para la rápida verificación de hashes en archivos y exportación masiva de activos digitales",
          tags: ["Bash", "Programming", "BashScripting", "Linux"],
          status: "done",
          repo: "https://github.com/rgkue/bashcheck",
        },
      ],
    },
/*    {
      category: "Networking",
      icon: "🌐",
      items: [
        {
          title: "Configuración de Redes Locales con Linux",
          description: "Laboratorio para la configuración y administración de redes locales utilizando herramientas de Linux.",
          tags: ["Linux", "Networking", "Network Administration"],
          status: "in-progress",
          repo: "https://github.com/rgkue/local-networking-lab",
        }
      ],
    },
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
    {
      category: "Development",
      icon: "💻",
      items: [
        {
          title: "Automatización de Tareas con Python",
          description: "Desarrollo de scripts en Python para automatizar tareas repetitivas y mejorar la eficiencia en el trabajo diario.",
          tags: ["Python", "Automation", "Scripting"],
          status: "in-progress",
          repo: null,
        },
      ],
    },
    */
  ]
};

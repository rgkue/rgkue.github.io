/**
 * services/services-data.js
 * Toda la información de la página de servicios.
 * Edita aquí para actualizar sin tocar el HTML/JS/CSS.
 */
const SERVICES_DATA = {

  // ── Identidad ─────────────────────────────────────────────────
  name:    "Isaac Muñoz",
  alias:   "rgkue",
  tagline: "Soporte técnico & servicios tecnológicos",
  photo:   "../assets/icon.png",   // imagen de silueta (derecha)

  // ── Contacto ──────────────────────────────────────────────────
  email:     "isaac.munozp2836@gmail.com",
  whatsapp: {
    label:  "+507 · WhatsApp",
    url:    "https://wa.link/62jnc7",
  },
  contactNote: "Los precios varían según la complejidad del trabajo. Escríbeme y coordinamos.",

  // ── Servicios (cascada diagonal) ──────────────────────────────
  // El orden aquí determina el orden visual de las cards.
  services: [
    {
      icon:        "wrench",
      title:       "Soporte Técnico",
      description: "Diagnóstico físico y lógico de equipos Windows. Identificación de fallos de hardware, software, sobrecalentamiento y rendimiento.",
      tags:        ["Hardware", "Software", "Windows", "Diagnóstico"],
      badge:       "Remoto · Presencial",
    },
    {
      icon:        "laptop",
      title:       "Limpieza de Laptops",
      description: "Limpieza física interna, remoción de polvo y optimización general del equipo para alargar su vida útil.",
      tags:        ["Limpieza", "Pasta térmica", "Optimización"],
      badge:       "Presencial",
    },
    {
      icon:        "terminal",
      title:       "Instalación & Configuración",
      description: "Instalación de sistemas operativos, programas, drivers y configuración de red. También configuración de software especializado.",
      tags:        ["Windows", "Software", "Drivers", "Redes"],
      badge:       "Remoto · Presencial",
    },
    {
      icon:        "book",
      title:       "Tareas Académicas",
      description: "Apoyo en tareas de sistemas, redes, Packet Tracer, Python y cuestionarios de tecnología. Solución con explicación incluida.",
      tags:        ["Redes", "Python", "Packet Tracer", "Sistemas"],
      badge:       "Remoto",
    },
    {
      icon:        "chat",
      title:       "Otros",
      description: "¿Tienes algo en mente que no está en la lista? Escríbeme y lo evaluamos juntos.",
      tags:        ["Personalizado"],
      badge:       "Remoto · Presencial",
    },
  ],
};
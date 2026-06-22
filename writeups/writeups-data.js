/**
 * writeups-data.js
 * Índice manual de writeups. Agregar una entrada cada vez que
 * se mueva una carpeta nueva a /writeups/contents/.
 *
 * Estructura de carpetas esperada:
 *   /writeups/contents/{platform}/{title}/README.md
 *                                        /media/
 *                                        thumb.png   ← imagen del reto
 *
 * Campos:
 *   title       — nombre del reto
 *   platform    — "HackTheBox" | "TryHackMe" | "DockerLabs"
 *   difficulty  — "Very Easy" | "Easy" | "Medium" | "Hard" | "Insane"
 *   date        — ISO "YYYY-MM-DD"
 *   tags        — array de strings
 *   description — breve descripción del reto (1-2 frases)
 *   path        — ruta relativa al README (sin extensión)
 *   url         — enlace al reto en la plataforma (opcional)
 *   image       — ruta a la imagen, relativa a writeups/ (opcional, si no se da usa placeholder)
 */
const writeupsData = [
  // ── HackTheBox ───────────────────────────────────────────────
  {
    title:       "Crocodile",
    platform:    "HackTheBox",
    difficulty:  "Very Easy",
    date:        "2025-10-07",
    tags:        ["Linux", "Web", "FTP"],
    description: "Máquina introductoria con acceso a servicios web y FTP expuestos sin autenticación.",
    path:        "contents/HackTheBox/Crocodile",
    url:         "https://app.hackthebox.com/machines/Crocodile",
    image:       "contents/HackTheBox/Crocodile/thumb.png",
  },
  {
    title:       "Appointment",
    platform:    "HackTheBox",
    difficulty:  "Easy",
    date:        "2025-10-06",
    tags:        ["Linux", "Web","SQLi"],
    description: "Explotación de SQL Injection en una aplicación web.",
    path:        "contents/HackTheBox/Appointment",
    url:         "https://app.hackthebox.com/machines/Appointment",
    image:       "contents/HackTheBox/Appointment/thumb.png",
  },
  {
    title:       "Oopsie",
    platform:    "HackTheBox",
    difficulty:  "Easy",
    date:        "2026-03-29",
    tags:        ["Linux", "Web", "IDOR"],
    description: "Vulnerabilidad IDOR en un portal de carga de archivos que permite comprometer la máquina.",
    path:        "contents/HackTheBox/Oopsie",
    url:         "https://app.hackthebox.com/machines/Oopsie",
    image:       "contents/HackTheBox/Oopsie/thumb.png",
  },
  {
    title:       "Redeemer",
    platform:    "HackTheBox",
    difficulty:  "Very Easy",
    date:        "2025-10-05",
    tags:        ["Linux", "Redis"],
    description: "Instancia Redis expuesta sin contraseña que permite lectura de datos sensibles y RCE.",
    path:        "contents/HackTheBox/Redeemer",
    url:         "https://app.hackthebox.com/machines/Redeemer",
    image:       "contents/HackTheBox/Redeemer/thumb.png",
  },
  {
    title:       "Responder",
    platform:    "HackTheBox",
    difficulty:  "Very Easy",
    date:        "2025-10-10",
    tags:        ["Windows", "NTLM", "Responder"],
    description: "Captura de hashes NTLM mediante envenenamiento de respuestas de red con la herramienta Responder.",
    path:        "contents/HackTheBox/Responder",
    url:         "https://app.hackthebox.com/machines/Responder",
    image:       "contents/HackTheBox/Responder/thumb.png",
  },
  {
    title:       "Sequel",
    platform:    "HackTheBox",
    difficulty:  "Very Easy",
    date:        "2025-10-06",
    tags:        ["Linux", "MySQL", "SQLi"],
    description: "Servidor MySQL accesible sin credenciales que expone bases de datos con información crítica.",
    path:        "contents/HackTheBox/Sequel",
    url:         "https://app.hackthebox.com/machines/Sequel",
    image:       "contents/HackTheBox/Sequel/thumb.png",
  },
  {
    title:       "Three",
    platform:    "HackTheBox",
    difficulty:  "Very Easy",
    date:        "2025-10-07",
    tags:        ["Linux", "S3", "AWS"],
    description: "Bucket S3 de AWS mal configurado que permite enumerar y subir archivos arbitrarios.",
    path:        "contents/HackTheBox/Three",
    url:         "https://app.hackthebox.com/machines/Three",
    image:       "contents/HackTheBox/Three/thumb.png",
  },

  // ── TryHackMe ────────────────────────────────────────────────
  {
     title:       "Dumping Router Firmware",
     platform:    "TryHackMe",
     difficulty:  "Medium",
     date:        "2026-05-23",
     tags:        ["Forensics", "Binwalk", "Linux"],
     description: "Análisis forense de firmware de router utilizando Binwalk para extraer y examinar su contenido.",
     path:        "contents/TryHackMe/DumpingRouter",
     url:         "https://tryhackme.com/room/rfirmware",
     image:       "contents/TryHackMe/DumpingRouter/thumb.png",
   },
   {
     title:       "Publisher",
     platform:    "TryHackMe",
     difficulty:  "Easy ",
     date:        "2026-05-23",
     tags:        ["Enumeration", "Web", "Linux", "RCE"],
     description: "Enumeración de directorios y ejecución remota de comandos (RCE).",
     path:        "contents/TryHackMe/Publisher",
     url:         "https://tryhackme.com/room/publisher",
     image:       "contents/TryHackMe/Publisher/thumb.png",
   },
];

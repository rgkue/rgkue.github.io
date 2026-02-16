# 🌐 rgkue.github.io

## Portfolio técnico personal desplegado en GitHub Pages ##

🔗 Producción: https://rgkue.github.io  
👨‍💻 Autor: Isaac Muñoz  

---

## 📌 Contexto del Proyecto

Este portafolio fue desarrollado inicialmente utilizando **Base44**, una plataforma de IA que genera aplicaciones con backend integrado y estructura administrada automáticamente.

Posteriormente, el proyecto fue migrado manualmente a este repositorio (`rgkue.github.io`) para:

- Eliminar la dependencia de Base44
- Convertirlo en un sitio 100% estático
- Desplegarlo directamente en GitHub Pages
- Tener control total del código y los datos

Como resultado de esa migración:

- ❌ No existe backend activo
- ❌ No existe autenticación
- ❌ No existe conexión a APIs externas
- ✅ Los datos se almacenan localmente en un archivo JSON
- ✅ El sitio es completamente estático

---

## 🏗 Arquitectura Actual

El sitio funciona bajo una arquitectura simple:

- **Hosting:** GitHub Pages
- **Frontend:** React (bundle minificado)
- **Datos:** `projects.json` descargados directamente desde Base44
- **Sin servidor**
- **Sin API**
- **Sin base de datos externa**

Todos los proyectos se cargan desde:

    /projects.json
    
Este archivo contiene la lista completa de proyectos originalmente almacenados en Base44.

---

## 📂 Estructura del Repositorio
    
    rgkue.github.io
    ├── index.html
    ├── projects.json
    ├── favicon.png
    ├── assets/
    │ ├── index.js
    │ └── index.css
    ├── LICENSE
    └── README.md


### 🔹 `index.html`
Archivo principal del sitio.

### 🔹 `projects.json`
Contiene todos los proyectos exportados desde Base44.
Es la única "fuente de datos" del sitio.

### 🔹 `assets/`
Contiene el bundle del frontend.

⚠ Importante:
El código dentro de `assets/index.js` no está estructurado ni formateado.
Es el código comprimido extraído automáticamente mediante Manus IA a partir del proyecto original en Base44.

No es código limpio ni mantenible manualmente.
Es un bundle compilado.

---

## 📊 Estructura de los Proyectos (projects.json)

Cada proyecto sigue esta estructura:

```json
{
  "id": "string",
  "title": "string",
  "category": "network | operative_systems | cybersecurity | empresa | hardware | experience",
  "status": "completed | active",
  "description": "string",
  "tags": ["string"],
  "github_url": "string | null"
}
```

## 📧 Contacto

# Isaac Muñoz
> isaac.munozp2836@gmail.com

> ginkue@proton.me

> GitHub: https://github.com/rgkue





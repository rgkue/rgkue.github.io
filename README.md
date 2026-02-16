# Exportación Base44 - Portfolio Hub

**Código exportado de la aplicación Base44 original**

## 📦 Contenido

- `index.html` - Archivo HTML principal
- `assets/index.js` - JavaScript compilado (460 KB)
- `assets/index.css` - Estilos CSS compilados (68 KB)

## 🚀 Cómo Usar

### Opción 1: Abrir Localmente

Simplemente abre `index.html` en tu navegador:

```bash
# En Windows
start index.html

# En macOS
open index.html

# En Linux
xdg-open index.html
```

O arrastra `index.html` a tu navegador.

### Opción 2: Servir con un Servidor Local

Si necesitas un servidor HTTP (recomendado para evitar problemas CORS):

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## ⚠️ Limitaciones

- **Dependencia de API de Base44**: Esta versión requiere conexión a los servidores de Base44 para funcionar correctamente
- **No funciona en GitHub Pages**: Debido a las llamadas a `/api/apps/...` que devuelven 404
- **Requiere Internet**: Las imágenes y datos se cargan desde servidores remotos

## ✅ Alternativa Recomendada

Si necesitas una versión **100% estática sin dependencias de backend**, consulta el proyecto `portfolio-estatico` que convierte esta aplicación en un sitio completamente independiente.

## 📝 Archivos Incluidos

| Archivo | Tamaño | Descripción |
|---------|--------|-------------|
| `index.html` | 2.3 KB | HTML base con referencias a assets |
| `assets/index.js` | 460 KB | Aplicación React compilada |
| `assets/index.css` | 68 KB | Estilos Tailwind compilados |

## 🔍 Información Técnica

- **Framework**: React (compilado)
- **Estilos**: Tailwind CSS
- **Build Tool**: Vite
- **Versión Original**: Base44 Portfolio Hub

## 📌 Notas

- Los archivos están minificados y compilados para producción
- Las rutas han sido actualizadas a rutas relativas (`./assets/`) para mejor compatibilidad
- El script del "badge" de Base44 ha sido removido para una apariencia más limpia

---

**Creado**: Febrero 2026
**Fuente**: https://githubpage.base44.app/

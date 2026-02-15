# Exportación de App Base44 para GitHub Pages

Este repositorio contiene el código exportado de tu aplicación Base44, optimizado para funcionar en **GitHub Pages**.

## Instrucciones de Despliegue

1. **Crea un nuevo repositorio** en tu cuenta de GitHub (por ejemplo, `mi-portfolio`).
2. **Sube todos los archivos** de esta carpeta (`index.html`, carpeta `assets/`) a la rama principal (`main`).
3. Ve a la pestaña **Settings** de tu repositorio en GitHub.
4. En el menú lateral, selecciona **Pages**.
5. En la sección **Build and deployment**, asegúrate de que:
   - **Source** sea "Deploy from a branch".
   - **Branch** sea "main" y la carpeta sea "/ (root)".
6. Haz clic en **Save**.
7. ¡Listo! En unos minutos tu sitio estará disponible en `https://tu-usuario.github.io/mi-repo/`.

## Notas Técnicas
- Se han actualizado las rutas de los archivos JS y CSS para que sean relativas (`./assets/`), lo cual es necesario para GitHub Pages.
- Se eliminó el script del "badge" de Base44 para una apariencia más limpia.
- Las imágenes y recursos externos siguen apuntando a los servidores originales (Supabase/Base44).

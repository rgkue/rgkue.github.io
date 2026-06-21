# Hack The Box - Oopsie Writeup
![HTB](https://img.shields.io/badge/HackTheBox-Oopsie-green?style=for-the-badge&logo=hackthebox)
![Difficulty](https://img.shields.io/badge/Difficulty-Very_Easy-brightgreen?style=for-the-badge)
**Autor:** Isaac Muñoz  
**Fecha:** 2026-03-29  
**IP de la Máquina:** 10.129.68.100

---
## Introducción - Objetivo

Explotar una aplicación web mediante un IDOR y subida insegura de archivos para obtener acceso inicial, seguido de un movimiento lateral y escalada de privilegios a través de un secuestro de rutas (PATH Hijacking).

---
## Escaneo del objetivo

El escaneo con Nmap reveló dos puertos abiertos:
* **Puerto 22:** SSH (OpenSSH 7.6p1)
* **Puerto 80:** HTTP (Apache 2.4.29)

### Descubrimiento de Directorios Web
Utilizando **Gobuster** con cookies administrativas, se identificó la siguiente estructura:
- `/cdn-cgi/login/` - Portal de autenticación.
- `/uploads/` - Directorio objetivo para la subida de archivos (Estado: 301/403).

---

## Explotación

### Acceso Inicial /  (www-data)
1. **IDOR:** Se explotó una Referencia Directa Insegura a Objetos para obtener el `user_id` del administrador.
2. **Subida de Archivos:** Se subió un archivo personalizado `shell.php` (Reverse Shell) a través del panel de administración.
3. **Ejecución:** Se ejecutó la shell en `http://megacorp.com/uploads/shell.php` y se capturó la conexión mediante Netcat.

### Movimiento Lateral
Dentro de `/var/www/html/cdn-cgi/login/db.php`, se encontraron credenciales grabadas en código (hardcodeadas).
* **Usuario:** Robert
* **Acción:** `su robert`

---
## Escalada de Privilegios a root

### Vulnerabilidad: SUID Path Hijacking
El binario `/usr/bin/bugtracker` (propiedad de root, grupo `bugtracker`) ejecuta el comando `cat` sin utilizar su ruta absoluta.

### Ejecución:
```bash
# Preparar el 'cat' malicioso
echo "/bin/sh" > /tmp/cat
chmod +x /tmp/cat

# Envenenar la variable de entorno PATH
export PATH=/tmp:\$PATH

# Ejecutar el binario SUID
/usr/bin/bugtracker
```

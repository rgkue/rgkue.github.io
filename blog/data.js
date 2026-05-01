/**
 * blog/data.js — Tu CMS de blog.
 * Para publicar un nuevo post: copia uno de los ejemplos,
 * cambia los datos y ponlo al inicio del array (más reciente primero).
 *
 * CAMPOS:
 *   id        — slug único, sin espacios, solo letras/guiones  (URL del post)
 *   title     — título del post
 *   date      — fecha en formato "YYYY-MM-DD"
 *   category  — una de las categorías definidas abajo
 *   tags      — array de etiquetas libres
 *   excerpt   — resumen corto (aparece en la tarjeta)
 *   cover     — ruta a imagen de portada (null si no hay)
 *   content   — contenido completo en HTML (ver ejemplos)
 */

const BLOG = {

  // ── CATEGORÍAS ──────────────────────────────────────────────────
  // Agrega aquí si necesitas más.
  categories: [
    "Ciberseguridad",
    "Redes",
    "Sistemas Operativos",
    "Eventos",
    "Proyectos",
  ],

  // ── POSTS ────────────────────────────────────────────────────────
  // ⚠ Orden: más reciente primero.
  posts: [

    {
      id: "visita-dell-technologies",
      title: "Visita a DELL Technologies",
      date: "2026-04-20",
      category: "Eventos",
      tags: ["DELL", "DataCenter", "Infraestructura"],
      excerpt: "En mi segundo año de bachillerato, tuve la oportunidad de visitar el centro de datos de DELL Technologies en Panamá",
      cover: "assets/dell-datacenter.jpeg",
      content: `
        <p>
        Hace 2 años, cuando estaba en mi segundo año de bachillerato, tuve la oportunidad de visitar el centro de datos de DELL Technologies en Panamá, 
        y me pareció increíble ver de cerca la infraestructura que soporta operaciones empresariales a gran escala.
        </p>

        <h2>¿Qué vimos?</h2>
        <p>El recorrido incluyó:</p>
        <ul>
          <li>Charla y explicación sobre los Data Centers y la refrigeración dentro de ellos.</li>
          <li>Medidas de seguridad en los Data Centers.</li>
          <li>Servicio de soporte técnico de Dell y como funciona.</li>
          <li>Personal de Dell laborando en el centro sus oficinas.</li>
          <li>Charla sobre ciberseguridad</li>
        </ul>

        <h2>Lo que aprendí</h2>
        <p>
        Esta fue mi primera vez en un centro de datos, y mi primer roce con la infraestructura y la ciberseguridad.
        En esta visita aprendí sobre la importancia de la redundancia y la alta disponibilidad en los centros de datos.
        También aprendí sobre la importancia de la ciberseguridad física así como la capacitación del personal.
        </p>

      
      `,
    },
    {
      id: "ekogroup-2026",
      title: "EkoGroup 2026",
      date: "2026-04-18",
      category: " Ciberseguridad",
      tags: ["Ethical Hacking", "Eko Group", "IA"],
      excerpt: "Participé en mi primera Ekogroup, la cual fue presencial en la UTP, y me pareció increíble, cada presentación superaba la anterior.",
      cover: "assets/ekogroup-2026.jpg",
      content: `
        <p> El pasado 18 de abril tuve la oportunidad de participar en mi primera Ekogroup de Panamá.
        Fue muy bueno escuchar diferentes proyectos y apender de aquellos que ya tienen conocimientos en el área de ciberseguridad y la infraestructura de redes.
        </p>

        <h2>La Inteligencia Artificial en el campo de la Ciberseguridad</h2>
        <p>
        Me quedo con el aprendizaje que obtuve de la charla del Sr. Roberto Rubio. el cual explicaba como la IA puede ser utilizada para automatizar la defensa en la infraestructura
        A través de plataformas como OpenCode.
        </p>

        <h2>Diferencias entre Agentes y Modelos</h2>
        <p>
        El Sr. Rubio explicaba que los modelos son como cerebros, es decir, son los que procesan la información y dan una respuesta, 
        mientras que los agentes son los que ejecutan acciones en el mundo real, por ejemplo, un agente es nuestra interfaz "ChatBot" así como ChatGPT, Gemini AI, etc.
        </p>

        <h2>Lecciones aprendidas</h2>
        <p>
        <ul>
          <li>"La calidad de la respuesta, lo determina la calidad de la pregunta."</li>
          <li>"La calidad de la pregunta, lo determina nuestro conocimiento."</li>
        </ul>
        Con esto me quedo, la IA es una herramienta poderosa, pero depende de nosotros saber utilizarla.
        Los exhorto a utilizar esta gran herramienta que nos ha sido brindada con consciencia y responsabilidad.
        Siempre buscando el conocimiento constante y en el bien común.
        ¡Nunca paren de aprender!
        </p>
      `,
    },
    {
      id: "scripts-prueba-protocolo-tcp",
      title: "Scripts de prueba de protocolo TCP",
      date: "2026-04-15",
      category: "Redes",
      tags: ["Scripts", "Redes", "Fundamentos", "Python"],
      excerpt: "Scripts para probar el protocolo TCP con Python y librerias como Socket.",
      cover: "assets/tcp-test.png",
      content: `
        <p>Estaba leyendo el capitulo de "Capa de Transporte" dentro del módulo 1 en mi certificación CCNA y me pareció interesante
        como funcionaba el protocolo TCP en la práctica.</p>

        <h2>Charla con Gemini AI</h2>
        <p>En una conversación con Gemini, este me dió un script en Python donde se simulaba la conexión cliente-servidor, desde el lado cliente</p>
        <ul>
          <li><strong>Cliente:</strong> Se conecta al servidor, envía un mensaje, recibe una respuesta y cierra la conexión.</li>
          <li><strong>Servidor:</strong> Escucha en un puerto (8050), acepta la conexión, recibe el mensaje, envía una respuesta y cierra la conexión.</li>
        </ul>

        <pre><code># Script de Python (Cliente)
        import socket

        # 1. Crear el socket TCP (SOCK_STREAM)
        cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #

        # 2. Definir destino y CONECTAR
        servidor_ip = "127.0.0.1"
        puerto = 8050
        cliente.connect((servidor_ip, puerto)) # Paso obligatorio en TCP

        # 3. Enviar datos (se usa send, no sendto porque ya hay conexión)
        mensaje = b"Hola, servidor TCP"
        cliente.send(mensaje) #

        # 4. Recibir respuesta
        datos = cliente.recv(1024) #
        print(f"Respuesta del servidor: {datos.decode()}")

        cliente.close() #

        </code></pre>

        <pre><code># Script de Python (Servidor con Delay)
        import socket
        import time
        import sys

        def barra_de_progreso(it, prefix="", size=30):
            count = len(it)
            def show(j):
                x = int(size*j/count)
                # Esto hace que la barra se actualice en la misma línea
                sys.stdout.write(f"{prefix} [{u'█'*x}{('.'*(size-x))}] {j}/{count}\r")
                sys.stdout.flush()
            show(0)
            for i, item in enumerate(it):
                yield item
                time.sleep(0.1) # Retraso artificial por cada paso
                show(i+1)
            sys.stdout.write("\n")

        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server.bind(('127.0.0.1', 8050))
        server.listen(1)

        print("--- SERVIDOR TCP CON RETRASO ---")
        print("Esperando al cliente...")

        conexion, direccion = server.accept()
        print(f"Conexión establecida con {direccion}")

        # 1. Simular procesamiento de datos recibidos
        mensaje = conexion.recv(1024)
        print(f"Mensaje recibido. Procesando...")
        for _ in barra_de_progreso(range(20), prefix="Leyendo datos:", size=20):
            pass

        # 2. Simular preparación de la respuesta
        for _ in barra_de_progreso(range(15), prefix="Generando respuesta:", size=20):
            pass

        # 3. Enviar respuesta finalmente
        conexion.send(b"Respuesta lenta enviada con exito")
        print("Respuesta enviada. Cerrando conexión.")

        conexion.close()
        server.close()

        </code></pre>

        <p> Es interesante ver como funciona este protocolo y como se puede simular con Python y librerias como Socket, se me olvidó mencionar que se usó
        time, con el fin de darle tiempo al usuario de poder visualizar el proceso, pues una computadora hace esto de manera casi instantanéa. Fue impresionante, saber que en 
        esta pequeña práctica apenas y se usan 2 capas del modelo OSI, es TCP puro (capa 4) y algo de capa 3 para los sockets.</p>

       <h2>Problema con servidor HTTP</h2>
       <p>Inicialmente levanté un servidor con Python ejecutando el clásico comando:
       <code><pre>python -m http.server 8050 </code></pre>
       Pero est dió el error "Failed to connect", ¿por qué?, pues aquí Gemini me explicó que, en la práctica que estaba realizando era algo de muy bajo nivel, pues TCP transmite bytes,
       y en HTTP (protocolo de capa 7) se manejan encabezados, es decir, bytes ya "presentados" para que el software cliente (browser) los interprete. He aquí la diferencia entre comunicación
       básica entre cliente-servidor web y cliente-servidor TCP XDDD.

       <h2>Conclusión</h2>
       <p>En resumen, siempre es mejor complementar lo leído o aprendido en cursos y certificaciones como la CCNA con pequeños laboratorios que te ayuden a entender
       la teoría en la práctica. No te quedes solo con la teoría del módulo, llevala a la práctica!, satiface tú curiosidad.</p>
       </p>
      `,
    },
  ],
};

/*  
<blockquote>
  "La resiliencia no es opcional en infraestructura crítica, es el punto de partida."
</blockquote>

<pre><code>
sudo iptables -L -n -v 
    
# Ver conexiones activas
ss -tulnp</code></pre>
*/


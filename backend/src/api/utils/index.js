/*=======================
    INDEX.JS de /utils
=========================

Aquí va a ir la lógica para trabajar con archivos y rutas de proyecto. Se hace porque esta sintaxis moderna (ES Modules) ya no existen las variables globales __filename y __dirname. Entonces hay que hacerlas manualmente
*/

/*======================
    Esquema conceptual
========================

- fileURLToPath:  Convierte una URL de archivo (file://) a una ruta de sistema de archivos.
- dirname: Devuelve el directorio padre de una ruta.
- join: Une segmentos de ruta de forma segura.

-> import.meta.url: Proporciona la URL absoluta del modulo actual (file:///ruta/al/archivo.js)
-> con fileURLToPath: /ruta/al/archivo.js

*/


// Importación de los 2 modulos necesarios para trabajar con rutas 
import { fileURLToPath } from "url"; 
import { dirname, join } from "path"; 

// Obtener el nombre del archivo actual 
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const __dirname = join(dirname(__filename), "../../../"); // Apuntamos a la carpeta raiz del proyecto retrocediento 3 niveles -> utils a api, api a src, src a carpetaRaiz

/*
¿Que estamos haciendo acá?

    1. dirname(__filename): Obtiene el directorio del archivo actual

    2. join(..., "../../../"): Estamos retrocediendo 3 niveles en la estructura de directorios -> Apuntando a la raiz del proyecto. Salimos de utils/api/src
*/

// Exportamos el directorio base calculado y la funcion "join" para conseguir rutas relativas
export {
    __dirname,
    join
}

/*--------------------
    PARA QUE SIRVE ?
----------------------

Para trabajar con un proyecto de Node.js con Express y EJS, sirve para:

    - Referenciar archivos de plantillas .ejs
    - Servir archivos estáticos (.css, .js, img)
    - Construir tutas confiables independientes del sistema operativo

Gracias a esto, podremos:

    - Servir archivos estaticos
    app.use(express.static(join(__dirname, "src/public"))

    - Enviar archivos html/css/js
    res.sendFile(join(__dirname, "src/public", index.html))

    - Cargar rutas de forma segura en cualquier zona del proyecto
    const ruta = join(__dirname, "uploads", "perfil.png")

*/
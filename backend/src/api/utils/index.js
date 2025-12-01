/*=======================
    INDEX.JS de /utils
=========================

Aquí va a ir la lógica para trabajar con archivos y rutas de proyecto. Se hace porque esta sintaxis moderna (ES Modules) ya no existen las variables globales __filename y __dirname. Entonces hay que hacerlas manualmente
*/




// Importación de los 2 modulos necesarios para trabajar con rutas 
import { fileURLToPath } from "url"; 
import { dirname, join } from "path"; 

// Obtener el nombre del archivo actual 
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const __dirname = join(dirname(__filename), "../../../"); // Apuntamos a la carpeta raiz del proyecto retrocediento 3 niveles -> utils a api, api a src, src a carpetaRaiz


// Exportamos el directorio base calculado y la funcion "join" para conseguir rutas relativas
export {
    __dirname,
    join
}


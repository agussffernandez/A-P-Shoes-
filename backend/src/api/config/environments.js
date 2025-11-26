/*======================
    ENVIRONMENTS.JS
========================

En este archivo se van a procesar y exportar la información de nuestras variables de entorno (definidas en .env)
*/

import dotenv from "dotenv";

// El método config carga las variables de entorno desde nuestro archivo .env
dotenv.config();

// Exportamos la información sensible
export default {
    // Si existe la variable PORT en .env, usala. Sino usa 3100 como puerto por defecto
    port: process.env.PORT || 3100,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password:  process.env.DB_PASSWORD
    }
}
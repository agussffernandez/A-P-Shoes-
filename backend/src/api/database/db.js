/*==========
    DB.JS
============

Es el módulo que establece la conexion con la BBDD

*/

// Importamos el modulo mysql2 con la versión "promesa", que nos permitira usar aync/await en las funciones donde utilicemos consultas
import mysql from "mysql2/promise";

// Importamos la info que esta en environments 
import environments from "../config/environments.js";

// Environments trae 2 claves: "port" y "database", solo nos interesa database asi que hacemos destructuring { database }
// database contiene las claves: host, name, user y password 
const { database } = environments;

// Creamos la conexion a la base de datos
const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

// Exportamos la conexión para que otros modulos puedan hacer consultas sql
export default connection;
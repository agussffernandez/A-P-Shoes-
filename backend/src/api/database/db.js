//importamos el modulo mysql2 con la version "promesa", 
// que nos permitira usar async/await en las consultas.

import mysql from "mysql2/promise";

//importamos la informacion que esta en environments.js
import environments from "../config/environments.js";

// environments trae 2 claves: "port" y "database",
// solo nos interesa traer database.
//database contiene las claves: host, name, user, password (definidas en .env)

const { database } = environments;
//creamos la conexion a la base de datos

const connection = mysql.createPool({
    host: database.host,
    name: database.name,
    user: database.user,
    password: database.password
});

// exportamos la conexion para que otros modulos puedan usarla
// y hacer consultas SQL.

export default connection;
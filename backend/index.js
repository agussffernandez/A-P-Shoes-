/*====================
    Importaciones
====================*/

// express: Framework para crear el servidor web y definir rutas (endpoints).
import express from "express";
const app = express();

// environments: Carga variables de entorno (por ejemplo, PORT) desde tu .env.
import environments from "./src/api/config/environments.js";
const PORT = environments.port;

// cors: Permite que otras aplicaciones (como tu frontend) hagan solicitudes al backend sin ser bloqueadas por el navegador.
import cors from "cors";

// Importamos los middlewares propios
import { loggerUrl, requireLogin } from "./src/api/middlewares/middlewares.js";


// Importamos las rutas de producto
import { productRoutes, viewsRoutes, loginRoutes } from "./src/api/routes/index.js";

import { __dirname, join } from "./src/api/utils/index.js";

import connection from "./src/api/database/db.js";

// importamos express-session
import session from "express-session";

// importamos la clave de sesion desde environments
const SESSION_KEY = environments.sessionKey;



/*===============
    Middlewares 
================*/

// Middleware básico que permite todas las solicitudes
app.use(cors());

// Middleware logger
app.use(loggerUrl);

// middleware para parsear la info de forms/(login.ejs)
// gracias al mismo podemos leer la info que nos mandan los forms de html, que no son fetch ni json.

app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")));

// Middleware que convierte los datos "application/json" que nos proporciona la cabecera (header) de las solicitudes POST y PUT, los pasa de json a objetos JSapp.use(express.static(join(__dirname, "src", "public"))); 
// Express NO entiende JSON por defecto.
// Cuando vos mandás un POST o PUT desde el frontend, los datos llegan como texto JSON.
// Este middleware agarra ese JSON que viene como texto y lo convierte en un objeto JavaScript.
app.use(express.json());

// middleware de sesion
app.use(session({
    secret: SESSION_KEY, //Firma las cookies para evitar manipulacion
    resave: false, //Evita guardar la session si no huno cambios
    saveUninitialized: false // No guarda sesiones vacías
}));





/*===================
    configuracion
===================*/

//configuracion EJS como motor de plantillas
app.set("view engine", "ejs");

//configuramos las vistas, para decirle al servidor que serviran desde src/views.
app.set("views", join(__dirname, "src/views"));


/*===================
    Endpoints
===================*/

// Ahora las rutas las gestiona el middleware Router
app.use("/api/products", productRoutes);


// Rutas de usuario (login)
app.use("/", loginRoutes);

// Rutas de vistas EJS
app.use("/", requireLogin, viewsRoutes);


/*=========================
    Listener al servidor
==========================*/
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto ${PORT}`);

});
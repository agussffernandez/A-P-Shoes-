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
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

// Importamos las rutas de producto
import { productRoutes } from "./src/api/routes/index.js";

import { __dirname, join } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";


/*===============
    Middlewares 
================*/

// Middleware básico que permite todas las solicitudes
app.use(cors());

// Middleware logger
app.use(loggerUrl);

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")))

// Middleware que convierte los datos "application/json" que nos proporciona la cabecera (header) de las solicitudes POST y PUT, los pasa de json a objetos JS
// Express NO entiende JSON por defecto.
// Cuando vos mandás un POST o PUT desde el frontend, los datos llegan como texto JSON.
// Este middleware agarra ese JSON que viene como texto y lo convierte en un objeto JavaScript.
app.use(express.json());



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

app.get("/dashboard", async(req, res) => {
    try{

        const [ rows ] = await connection.query("SELECT * FROM productos");
        console.log(rows);
        res.render("index", {
            title: "A&P Shoes",
            productos: rows
        })

    } catch (error){
        console.error(error);
    }
}
)

/*=========================
    Listener al servidor
==========================*/
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto ${PORT}`);

});
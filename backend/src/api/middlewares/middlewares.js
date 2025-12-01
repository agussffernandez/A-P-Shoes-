/*===================
    MIDDLEWARES.JS
=====================

Los middlewares son simplemente funciones que se ejecutan entre la peticion (request -> req) y la respuesta (response -> res)

Express recibe una petición → pasa por los middlewares → finalmente llega a la ruta → responde.

----------------
    TIPOS
----------------

Middleware de aplicacion: Es una funcion que se ejecuta en todas las .

Middleware de ruta: Es una funcion que se ejecuta en alguna rutas.
*/

// Middleware logger que muestra por consola todas las solicitudes
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

// Middleware de ruta para validar el id en la ruta /api/products/:id
const validateId = (req, res, next) => {

    // Todo parámetro dinámico en la URL (lo que empieza con :) se guarda automáticamente en req.params como string
    // req.params = { id: "25" }
    const { id } = req.params;

    // Validar que el ID sea un numero (de lo contrario la consulta podria generar un error en la BBDD)
    // !id significa “si id es falso / vacío / undefined”.
    // isNaN() chequea si el valor NO  puede convertirse a un número.
    if(!id || isNaN(id)) {
        // El return corta la ejecución del middleware.
        return res.status(400).json({
            message: "El id debe ser un numero"
        });
    }

    // Convertimos el parametro id (originalmente un string porque viene de una URL) a un numero entero (integer en base 10 decimal)
    req.id = parseInt(id, 10); // convertimos el id a un entero

    console.log("Id validado!: ", req.id);

    next(); // Continuar al siguiente middleware (si lo hay) o con la respuesta
}

// middlewares para proteger las rutas
const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect("/login");
    } 
    next();
}

export {
    loggerUrl,
    validateId,
    requireLogin
}
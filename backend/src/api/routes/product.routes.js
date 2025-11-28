/*=============
    ROUTER
===============

El router (se pronuncia “ráuter”) es una mini-aplicación de Express que sirve para organizar tus rutas en archivos separados en vez de tener todo dentro del server.js o app.js.

Un router es como un sub-servidor donde definís tus endpoints.

product.routes: Este archivo define TODAS las rutas relacionadas con productos.
*/

import { Router } from "express"; // Importamos el middleware Router
const router = Router(); // router = Router() crea un "mini servidor" para las rutas.

import { validateId } from "../middlewares/middlewares.js" // Importamos el middleware validateId

// Importamos las funciones
import { getAllProducts, getProductById, createProduct, modifyProduct, removeProduct } from "../controllers/product.controllers.js"

/*==================
    Endpoints
====================

Un endpoint (en español, punto final o punto de acceso) es una URL específica en un servidor a la que los clientes (por ejemplo, un navegador o tu frontend) pueden hacer solicitudes para:

    - Obtener información (GET),

    - Enviar información (POST),

    - Actualizar información (PUT o PATCH),

    - Eliminar información (DELETE).

En pocas palabras:
Un endpoint es una dirección (ruta) del servidor que responde a una petición.
*/


// En Express, cuando usás routers, la parte principal de la ruta se define afuera, en index.js por eso usamos "/" y no "/api/products"


// GET all products -> Traer todos los productos
router.get("/", getAllProducts);


// GET product by id -> Consultar producto por id (ejemplo: localhost:3000/2)
router.get("/:id", validateId, getProductById);


// POST -> Crear nuevo producto
router.post("/", createProduct);


// PUT-> Actualizar producto 
router.put("/", modifyProduct);


// DELETE-> Eliminar producto 
router.delete("/:id", validateId, removeProduct);


// Exportamos todas las rutas
export default router;
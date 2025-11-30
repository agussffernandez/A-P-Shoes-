/*======================
    VIEW.ROUTES.JS
========================

Acá movemos los endpoints que renderizan EJS. (Misma dinámica que product.routes.js)
*/

import { Router } from "express";
import productModel from "../models/product.models.js"; 

const router = Router();

// index.ejs en /dashboard
router.get("/dashboard", async (req, res) => {
    try {
        const [rows] = await productModel.selectAllProducts();
        res.render("index", {
            title: "A&P Shoes",
            productos: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

// modificar.ejs en /modificar
router.get("/modificar", (req, res) => {
    res.render("modificar", { title: "Modificar" });
});

// eliminar.ejs en /eliminar
router.get("/eliminar", (req, res) => {
    res.render("eliminar", { title: "Eliminar" });
});

export default router;
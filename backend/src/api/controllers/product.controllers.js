/*================================
    Controladores de producto
==================================

Qué es:
Es el archivo donde van las funciones que responden a las solicitudes HTTP (GET, POST, PUT, DELETE).

Para qué sirve:
Para recibir la petición (req), usar el modelo, y devolver la respuesta (res).
*/

import productModels from "../models/product.models.js";


// GET all products
export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await productModels.selectAllProducts();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0
            ? "No se encontraron productos"
            : "Productos encontrados"
        });

    } catch (error) {
        console.error("Error obteniendo productos", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}


// GET product by ID
export const getProductById = async (req, res) => {

    try {
        let { id } = req.params;
        const [rows] = await productModels.selectProductById(id);

        if(rows.length === 0) {
            console.log(`no existe producto con id ${id}`);

            return res.status(404).json({
                message: `No se encontro un producto con id ${id}`
            });
        }
        res.status(200).json({
            payload: rows[0]
        });
    } catch (error) {
        console.log("error obteniendo producto por id: ", error);

        res.status(500).json({
            message: "error interno del servidor",
            error: error.message
        })
    }
}

// POST -> crear nuevo producto
export const createProduct = async (req, res) => {

    try {
        let { nombre, categoria, precio, img_url } = req.body;

        //valida
        if(!nombre || !categoria || !precio || !img_url) {
            return res.status(400).json({
                message: "datos invalidos. Envia nombre, categoria, precio e img_url."
            });
        }

        await productModels.insertProduct(nombre, categoria, precio, img_url);

        res.status(201).json({
            message: "producto creado con exito."
        });
    } catch (error) {
        console.log("error al crear producto: ", error);

        res.status(500).json({
            message: "error interno del servidor",
            error: error.message
        });
    }
}

// PUT  -> actualizar producto
export const modifyProduct = async (req, res) => {
    try {
        let { id, nombre, categoria, precio, img_url } = req.body;

        //validar
        if(!id || !nombre || !categoria || !precio || !img_url) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let [result] = await productModels.updateProduct (
            nombre, categoria, precio, img_url, id
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "no se actualizo el producto"
            })
        }
        res.status(200).json({
            message: `producto con id ${id} actualizado correctamente`
        });
    } catch(error) {
        console.error("error al actualizar producto: ", error);

        res.status(500).json({
            message: `Error interno del servidor`,
            error: error.message
        });
    }
}

// DELETE -> eliminar producto
export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;

        let [result] = await productModels.deleteProduct(id);

        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: `No se elimino el producto con id ${id}`
            });
        }
        res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });
    } catch (error) {
        console.error("error al eliminar producto: ", error);

        res.status(500).json({
            message: "error intern del servidor",
            error: error.message
        });
    }
}
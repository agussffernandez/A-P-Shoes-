/*================================
    Modelos de producto
==================================

Aquí iran las consultas sql 

Qué es:
Es el archivo donde van todas las funciones que hablan con la base de datos.

Para qué sirve:
Para separar la lógica de acceso a datos del resto del código.
*/

//traemos la conexion a la base de datos
import connection from "../database/db.js";

//traer todos los productos
const selectAllProducts = () => {
    const sql = `
    SELECT id, nombre, categoria, precio, img_url
    FROM productos`;
    
    return connection.query(sql);
}

//traer producto por id
const selectProductById = (id) => {

    const sql = `
    SELECT id, nombre, categoria, precio, img_url
    FROM productos
    WHERE id = ?
    LIMIT 1`;

    return connection.query(sql, [id]);
}

// crear nuevo producto
const insertProduct = (nombre, categoria, precio, img_url) => {

    const sql = `
    INSERT INTO productos (nombre, categoria, precio, img_url)
    VALUES (?, ?, ?, ?)`;

    return connection.query(sql, [nombre, categoria, precio, img_url]);
}

//modificar producto

const updateProduct = (nombre, categoria, precio, img_url, id) => {
    
    const sql = `
    UPDATE productos
    SET nombre = ?, categoria = ?, precio = ?, img_url = ?
    WHERE id = ?`;

    return connection.query(sql, [nombre, categoria, precio, img_url, id]);

}

//eliminar producto 

const deleteProduct = (id) => {

    const sql = `DELETE FROM productos WHERE id = ?`;

    return connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}
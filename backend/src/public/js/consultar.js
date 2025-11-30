const getProductsForm = document.getElementById("getProducts-form");
const listadoProductos = document.getElementById("listado-productos");

// url base del back
const URL = "http://localhost:3000/api/products";

// formulario
getProductsForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // convertimos el formulario a FormData y luego a objeto JS
    const data = Object.fromEntries(new FormData(event.target).entries());
    const id = data.id;

    if (!id) {
        mostrarError("Debes ingresar un ID");
        return;
    }

    try {
        console.log(`Haciendo GET a ${URL}/${id}`);

        const response = await fetch(`${URL}/${id}`);
        const result = await response.json();
        console.log("Respuesta del backend: ", result);

        if (response.ok) {
            const producto = result.payload;
            mostrarProducto(producto);
        } else {
            mostrarError(result.message);
        }

    } catch (error) {
        console.error("Error en fetch: ", error);
        mostrarError("Error de conexión con el servidor");
    }
});

// función para mostrar el producto encontrado
function mostrarProducto(producto) {
    listadoProductos.innerHTML = `
        <li class="li-listados">
            <img src="${producto.img_url}" alt="${producto.nombre}" class="img-listados">
            <p>Id: ${producto.id} / Nombre: ${producto.nombre} /
            <strong>Precio: $${producto.precio}</strong></p>
        </li>
    `;
}

// función para mostrar errores
function mostrarError(message) {
    listadoProductos.innerHTML = `
        <li class="mensaje-error">
            <p><strong>Error:</strong> ${message}</p>
        </li>
    `;
}
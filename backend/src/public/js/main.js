// Seleccionamos el elemento al que le vamos a inyectar el HTML
let contenedorProductos = document.getElementById("contenedor-productos");

// Guardamos en una variable la url de nuestro endpoint donde vamos a sacar los productos
const url = "http://localhost:3000/api/products";

async function obtenerProductos() {
    try {
        // Hacemos una peticion con fetch a la url y guardamos la respuesta
        let respuesta = await fetch(url);

        // Esto lee el cuerpo (body) de la respuesta (Response que devuelve el fetch) y lo convierte a un objeto JavaScript.
        let data = await respuesta.json();

        // Nuestros productos estan disponibles dentro de payload { payload: Array(19) }
        console.log(data);

        // Creamos la variable productos para guardar el array de productos que tiene "payload"
        let productos = data.payload;
        
        mostrarProductos(productos);
    } catch(err) {
        console.error(err);
    }
}

function mostrarProductos(array) {

    // Verificamos que llegen bien los productos
    console.table(array);

    let htmlProducto = "";

    array.forEach(product => {
        htmlProducto += `
        <div class="carta-producto">
            <img src="${product.img_url}" alt="${product.nombre}">
            <h5>${product.nombre}</h5>
            <p>Id: ${product.id}</p>
            <p>$${product.precio}</p>
        </div>
        `;
    });

    // Ahora sí, inyectamos TODO el HTML al contenedor
    contenedorProductos.innerHTML = htmlProducto;
}


function init() {
    obtenerProductos();
    }

init();
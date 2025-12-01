/*=======================================================================================
    1ER PASO: Obtener productos del backend en localhost:3000/api/products (con fetch)
=======================================================================================*/

async function obtenerProductos() {
    try {
        const response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) {
            return "Error al obtener productos";
        }

        // Convertimos la respuesta en un objeto JavaScript
        const data = await response.json();

        // El backend devuelve { payload: [...], message: "" }
        let productos = data.payload;
        console.log(productos);

        return productos;

    } catch (error) {
        console.error("ERROR FETCH:", error);
        return [];
    }
}

/*=======================================================================
    2DO PASO: Realizar función que muestre los productos en pantalla
========================================================================*/

let contenedorProductos = document.getElementById("contenedorProductos");

function mostrarProductos(productos) {

    let cartaProducto = "";

    // Utilizamos un forEach para recorrer todas los productos del array
    productos.forEach(producto => {
        cartaProducto += `
        <div class="carta-producto">
            <img src="${producto.img_url}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarACarrito(${producto.id})" class="boton-agregar-carrito">Agregar al carrito</button>
        </div>
        `;
    });

    // Una vez que ya tenemos en texto plano el html de todos los productos, lo pasamos al HTML
    contenedorProductos.innerHTML = cartaProducto;
}



/*============================================
    3ER PASO: Realizar función de filtro
==============================================
Implementar una función de filtro, que se dispare al escribir en un campo input, filtrando los productos que coincidan con el campo de texto. ponerlos en #contenedorBotones debajo de del titulo Listado de Productos
*/

let barraBusqueda = document.querySelector("#barraBusqueda");

let productos = [];

function filtrarProductos(event) {
    const valor = event.target.value.toLowerCase();
    if (productos.length === 0) return; // evita filtrar antes de tener datos
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(valor));
    mostrarProductos(filtrados);
}

// Solo agregar el evento si el input existe (es decir, solo en index.html, no en carrito.html)
if (barraBusqueda) {
    barraBusqueda.addEventListener("keyup", filtrarProductos);
}



/*============================================
    4TO PASO: Boton ordenar por precio
==============================================
Crea 1 boton de ordenar por precio (ordena de menor a mayor)
*/

let contenedorBoton = document.querySelector("#contenedorBoton");

function agregarBoton() {
    // Creamos el texto plano html de los botones
    // Creamos el HTML de los botones
    let htmlBoton = 
    `
        <button onclick="ordenarPorPrecio()" id="ordenPrecio">Ordenar por precio</button>
    `;

    // Insertamos los botones en el contenedor
    contenedorBoton.innerHTML = htmlBoton;
}

function ordenarPorPrecio() {
    // Creamos una copia ordenada
    const ordenados = [...productos].sort((a, b) => a.precio - b.precio);

    console.log(ordenados);
    

    // Los mostramos en pantalla
    mostrarProductos(ordenados);
}


/*================================================0
    5TO PASO: Implementar la funcionalidad carrito
===================================================
Crea 1 boton de ordenar por precio (ordena de menor a mayor)
*/
let contenedorCarrito = document.querySelector("#contenedorCarrito");
let carritoHeader = document.querySelector("#carritoHeader");

let carrito = [];


// Guardar carrito
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar carrito (si existe)
function cargarCarrito() {
    const guardado = localStorage.getItem("carrito");
    carrito = guardado ? JSON.parse(guardado) : [];
}


// ---------------------------------
//       AGREGAR AL CARRITO
// ---------------------------------

function agregarACarrito(idProducto) {

    // Buscar el producto en el array global `productos`
    const productoSeleccionado = productos.find(p => p.id === idProducto);
    if (!productoSeleccionado) return;

    // Agregar al carrito
    carrito.push(productoSeleccionado);

    // Guardar cambios en localStorage
    guardarCarrito();

    // Actualizar UI
    mostrarCarrito();
    actualizarCantidadHeader();
}


// ---------------------------------
//       MOSTRAR CARRITO
// ---------------------------------

function mostrarCarrito() {

    if (!contenedorCarrito) return;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p>Tu carrito está vacío</p>`;
        return;
    }

    let html = "<ul>";

    carrito.forEach(item => {
        html += `
        <li class="bloque-item">
            <p class="nombre-item">
                ${item.nombre} - $${item.precio}
            </p>

            <button onclick="eliminarProducto(${item.id})" class="boton-eliminar">
                Eliminar
            </button>
        </li>`;
    });

    html += "</ul>";

    html += `
        <div class="total-carrito">
            <span>Total: $${calcularTotal()}</span>
        </div>
    `;

    contenedorCarrito.innerHTML = html;
}

function calcularTotal() {
    return carrito.reduce((acc, item) => acc + item.precio, 0);
}

// ---------------------------------
//       ELIMINAR PRODUCTO
// ---------------------------------

function eliminarProducto(idProducto) {

    // Filtra y elimina el producto del array carrito
    carrito = carrito.filter(item => item.id !== idProducto);

    // Guarda el carrito actualizado en localStorage
    guardarCarrito();

    // Vuelve a mostrar el carrito en pantalla
    mostrarCarrito();

    // Actualiza la cantidad que figura en el header
    actualizarCantidadHeader();
}


// ---------------------------------
//       ACTUALIZAR CANTIDAD HEADER
// ---------------------------------

function actualizarCantidadHeader() {
    if (carritoHeader) {
        carritoHeader.textContent = `Carrito (${carrito.length})`;
    }
}


async function init() {

    cargarCarrito();
    actualizarCantidadHeader();

    productos = await obtenerProductos();

    // SOLO si estoy en index.html
    if (contenedorProductos) {
        agregarBoton();
        mostrarProductos(productos);
    }

    // SOLO si estoy en carrito.html
    if (contenedorCarrito) {
        mostrarCarrito();
    }
}

init();
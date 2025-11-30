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

barraBusqueda.addEventListener("keyup", filtrarProductos);




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


/*============================================
    5TO PASO: Implementar la funcionalidad carrito
==============================================
Crea 1 boton de ordenar por precio (ordena de menor a mayor)
*/



async function init() {
    agregarBoton();  // ← agrega el botón al cargar
    productos = await obtenerProductos(); // Esperamos la respuesta
    mostrarProductos(productos);                // Ahora sí mostramos
}

init();
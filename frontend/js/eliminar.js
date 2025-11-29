let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");

getProducts_form.addEventListener("submit", async (event) => {
    
    //Prevenimos el envío por defecto de formulario 
    event.preventDefault();

    // event.target -> trae todo el elemento HTML al que se le asigno el evento. Es decir: <form id="getProducts-form">...</form>

    // Extraer toda la info del formulario (captura todos los clave valor, ejemplo precio: 100, categoria: 1, id: 1)en un objeto FormData
    let formData = new FormData(event.target); // FormData { id → "2" }
    console.log(formData);

    //Convertimos el objeto FormData en un objeto normal JS para poder extraer la informacion comodamente
    let data = Object.fromEntries(formData.entries()); // Object { id: "2" }
    console.log(data);

    let idProducto = data.id;
    console.log(idProducto); 
    
    try {
        // Hago el fetch a la url personalizada
        let response = await fetch(`http://localhost:3000/api/products/${idProducto}`);
        console.log(response);

        // Proceso los datos que me devuelve el servidor
        let datos = await response.json();
        console.log(datos);

        // Extraigo el producto que devuelve payload
        let producto = datos.payload; // Apuntamos a la respuesta, vamos a payload que trae el array con el objeto y extraemos el único elemento

        // Le pasamos el producto a una funcion que lo renderice en la pantalla
        mostrarProducto(producto); 

    } catch (error) {
        console.error("Error: ", error);
    }
});

function mostrarProducto(producto) {
    // Verificamos que el producto se reciba correctamente
    console.log(producto);

    let htmlProducto = `
    <li class="li-listados">
        <img src="${producto.img_url}" alt="${producto.nombre}" class="img-listados">
        <p>Id: ${producto.id}/ Nombre: ${producto.nombre}/ <strong>Precio: $${producto.precio}</strong></p>
    </li>
    <li class="li-botonera">
        <input type="button" id="deleteProduct_button" value="Eliminar producto" class="boton-submit">
    </li>
    `;

    listado_productos.innerHTML = htmlProducto;

    let deleteProduct_button = document.getElementById("deleteProduct_button");

    deleteProduct_button.addEventListener("click", event => {
        event.stopImmediatePropagation(); // Evitar la propagación de eventos

        let confirmacion = confirm("Deseas eliminar este producto");

        if (!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            eliminarProducto(producto.id);
        }
    });
}

async function eliminarProducto(id) {

    let url = "http://localhost:3000/api/products";

    try {
        console.log(`Haciendo peticion DELETE a ${url}/${id}`);

        let response = await fetch(
            `${url}/${id}`, 
            {
                method: "DELETE"
            }
        );

        console.log(response);

        // Procesamos la respuesta json que devolvemos del servidor
        let result = await response.json(); 
        
        if (response.ok) {
            alert(result.message);
            console.log(result.message);

            // le sacamos la vista
            listado_productos.innerHTML = "";
        } else {
            alert("No se pudo eliminar un producto");
            console.error(result.message);
        }

    } catch(error) {
        console.error("Error en la solicitud DELETE: ", error);
        alert("Ocurrio un error al eliminar un producto");
    }
}
let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");
let contenedor_formulario= document.getElementById("contenedor-formulario");

getProducts_form.addEventListener("submit", async (event) => {

    //Prevenimos el envío por defecto de formulario 
    event.preventDefault();

    // event.target -> trae todo el elemento HTML al que se le asigno el evento. Es decir: <form id="getProducts-form">...</form>
    console.log(event.target);

    // FormData lee cada input, select, textarea dentro del form (que le pasamos con event.target) y los mete en un objeto tipo diccionario (captura todos los clave valor, ejemplo precio: 100, categoria: 1, id: 1)
    let formData = new FormData(event.target); 

    console.log(formData);

    // Convertimos el objeto FormData en un objeto normal JS para poder extraer la informacion comodamente
    let data = Object.fromEntries(formData.entries());
    console.log(data);
    
    let idProducto = data.id;
    console.log(idProducto); // Ya extrajimos el valor del campo id

    try {
        // Hago el fetch a la url personalizada
        let response = await fetch(`http://localhost:3000/api/products/${idProducto}`);
        console.log(response);

        // Si la respuesta no es ok (por ej. 404), mostramos el mensaje y cortamos
        if (!response.ok) {
            listado_productos.innerHTML = `
                <li class="li-listados">
                    <p><strong>Error:</strong> No existe un producto con el ID ${idProducto}</p>
                </li>
            `;
            contenedor_formulario.innerHTML = ""; // Limpia formulario si había uno
            return;
        }

        // Proceso los datos que me devuelve el servidor
        let datos = await response.json();
        console.log(datos);

        // Extraigo el producto que devuelve payload en la url personalizada
        let producto = datos.payload;
        console.log(producto);

        // Le pasamos el producto a una funcion que lo renderice en la pantalla
        mostrarProductos(producto); 


    } catch (error) {
        console.error("Error: ", error);
    }
});

function mostrarProductos(producto) {

    // Verificamos que llegen bien los productos
    console.log(producto);

    let htmlProducto = `
    <li class="li-listados">
        <img src="${producto.img_url}" alt="${producto.nombre}" class="img-listados">
        <p><strong>Id:</strong> ${producto.id}</p>
        <p><strong>Nombre:</strong> ${producto.nombre}</p>
        <p>
            <strong>Precio: $${producto.precio}</strong>
        </p>
    </li>
    <li class="li-botonera">
        <input type="button" id="updateProduct_button" value="Actualizar producto" class="boton-submit">
    </li>
    `;

    listado_productos.innerHTML = htmlProducto;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", (event) => {
        crearFormularioPut(event, producto);
    });
}

function crearFormularioPut(event, producto) {

    // Evitamos la propagacion de eventos
    event.stopPropagation();

    // Verificamos si recibimos el producto para llenar los valores del formulario
    console.table(producto);

    let formularioPutHtml = `
    <form id="updateProducts-form" class="products-form-amplio">

        <input type="hidden" name="id" value="${producto.id}">

        <div class="formInput">
            <label for="nameProd">Nombre: </label>
            <input type="text" name="nombre" id="nameProd" value="${producto.nombre}" required>
            <br>
        </div>

        <div class="formInput">
            <label for="imageProd">Imagen</label>
            <input type="text" name="img_url" id="imageProd" value="${producto.img_url}" required>
            <br>
        </div>

        <div class="formInput">
            <label for="categoryProd">Categoria</label>
            <select name="categoria" id="categoryProd" required>
                <option value="VANS">VANS</option>
                <option value="ADIDAS">ADIDAS</option>
            </select>
            <br>
        </div>

        <div class="formInput">
            <label for="priceProd">Precio</label>
            <input type="number" name="precio" id="priceProd" value="${producto.precio}" required>
            <br>
        </div>


        <input type="hidden" name="activo" value="${producto.activo}">

        <input type="submit" value="Actualizar producto" class="boton-submit">
        
    </form>
    `;

    contenedor_formulario.innerHTML = formularioPutHtml;

    let updateProducts_form = document.getElementById("updateProducts-form");

    updateProducts_form.addEventListener("submit", event =>{
        actualizarProducto(event);
    });
}

async function actualizarProducto(event) {
    
    event.preventDefault();

    let url = "http://localhost:3000/api/products";

    // Guardamos los datos en un objeto FormData
    let formData = new FormData(event.target);
    console.log(formData);

    // Transformamos el objeto FormData en un objeto JS
    let data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(data)
        });

        console.log(response);

        let result = await response.json();

        // Si la response que hacemos, devuelve OK, quiere decir que la peticion fue exitosa y pasaremos a hacer lo siguiente
        if(response.ok) {
            console.log(result.message);
            alert(result.message);

            // Vaciamos el formulario y el listado
            listado_productos.innerHTML = "";
            contenedor_formulario.innerHTML = "";
        } else {
            console.error("Error: ", error.message);
            alert(error.message);
        }

    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
}
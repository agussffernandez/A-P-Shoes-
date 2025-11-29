let altaProducts_form = document.getElementById("altaProducts-form");
let url = "http://localhost:3000/api/products";

altaProducts_form.addEventListener("submit", event => {

    event.preventDefault();

    let formData = new FormData(event.target);
    console.log(formData);

    let data = Object.fromEntries(formData.entries());
    console.log(data);

    enviarProducto(data);
});

async function enviarProducto(data) {
    console.table(data);

    try {
        let response = await  fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log(result);

        if(response.ok) {
            console.log(result.message);
            alert(result.message);

        } else {
            console.error(result.message);
            alert(result.message);
        }

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
    
}
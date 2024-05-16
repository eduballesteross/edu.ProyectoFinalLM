/***
 * Genera las tarjetas de productos a partir de un array
 */

const contenedorTarjetas = document.getElementById("productos-container");

function crearCartasProductos(productos) {
    const contenedorPrincipal = document.createElement("div");
    contenedorPrincipal.className = "contenedor container mt-4";

    const contenedorInterno = document.createElement("div");
    contenedorInterno.className = "text-center mt-2";
    contenedorPrincipal.appendChild(contenedorInterno);

    const contenedorTarjetasLocal = document.createElement("div");
    contenedorTarjetasLocal.className = "row";
    contenedorPrincipal.appendChild(contenedorTarjetasLocal);

    productos.forEach(producto => {
        const nuevoSuplemento = document.createElement("div");
        nuevoSuplemento.className = "col-md-6 col-lg-4 mb-4";

        const nuevaCarta = document.createElement("div");
        nuevaCarta.className = "card h-100 d-flex flex-column";

        const nuevaImagen = document.createElement("img");
        nuevaImagen.className = "card-img-top";
        nuevaImagen.src = "./resources/" + producto.id + ".jpg";
        nuevaImagen.alt = producto.nombre;

        const nuevoCuerpo = document.createElement("div");
        nuevoCuerpo.className = "card-body d-flex flex-column";

        const nuevoTitulo = document.createElement("h4");
        nuevoTitulo.className = "card-title";
        nuevoTitulo.textContent = producto.nombre;

        const nuevoParrafo = document.createElement("p");
        nuevoParrafo.className = "card-text flex-grow-1";
        nuevoParrafo.textContent = producto.descripcion.replace(/\n/g, " ");

        const nuevoBoton = document.createElement("button");
        nuevoBoton.type = "button";
        nuevoBoton.className = "btn btn-primary mt-auto";
        nuevoBoton.textContent = "Agregar al carrito";

        // Agregar evento click al botón para agregar al carrito
        nuevoBoton.addEventListener("click", function() {
            agregarCarrito(producto);
        });

        // Agregar elementos al cuerpo de la carta
        nuevoCuerpo.appendChild(nuevoTitulo);
        nuevoCuerpo.appendChild(nuevoParrafo);
        nuevoCuerpo.appendChild(nuevoBoton);

        // Agregar elementos a la carta
        nuevaCarta.appendChild(nuevaImagen);
        nuevaCarta.appendChild(nuevoCuerpo);

        // Agregar carta al div principal
        nuevoSuplemento.appendChild(nuevaCarta);

        // Agregar div principal al contenedor de tarjetas local
        contenedorTarjetasLocal.appendChild(nuevoSuplemento);
    });

    // Agregar el contenedor principal al contenedor de tarjetas
    contenedorTarjetas.appendChild(contenedorPrincipal);
}

crearCartasProductos(suplementos);

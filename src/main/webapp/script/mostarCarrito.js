/**
 *Método que hace la funcion del boton borrar carrito
 */
function borrarCarrito() {
    //Borramos de local Storage 
    localStorage.removeItem("suplementos");
    const contenedorTarjetas = document.getElementById("productos-container");
    //Deja la tarjeta vacía y actualiza el precio total del carrito en este caso a 0.
    contenedorTarjetas.innerHTML = ""; 
    actualizarPrecioTotal(); 
}

/**
 * Método que crea un boton para borrar el carrito.
 * @param {*} contenedorTarjetas 
 */
function botonBorrarCarrito(contenedorTarjetas) {
    //Crea un elemento boton
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar Carrito";
    //Le da la funcion al boton de borrar carrito y lanza una alarma
    botonBorrar.addEventListener("click", function() {
        borrarCarrito();
        alert("Se ha borrado el carrito.");
    });

    const contenedorBoton = document.createElement("div");
    contenedorBoton.className = "text-center mt-4";
    contenedorBoton.appendChild(botonBorrar);

    contenedorTarjetas.appendChild(contenedorBoton);
}
/**
 * Método que sirve para  calcular el precio total del carrito.
 * @returns 
 */
function calcularPrecioTotal() {
    const productos = JSON.parse(localStorage.getItem("suplementos"));
    let precioTotal = 0;

    productos.forEach(producto => {
        precioTotal += producto.precio * producto.cantidad;
    });

    return precioTotal;
}

/**
 * Método que sirve para para aumentar la cantidad de los productos en el carrito.
 * @param {*} idProducto 
 */
function aumentarCantidad(idProducto) {
    const productos = JSON.parse(localStorage.getItem("suplementos"));
    const productoIndex = productos.findIndex(producto => producto.id === idProducto);
    if (productoIndex !== -1) {
        productos[productoIndex].cantidad++;
        localStorage.setItem("suplementos", JSON.stringify(productos));
        actualizarCantidadVisual(idProducto, productos[productoIndex].cantidad);
        actualizarPrecioTotal();
    }
}
/**
 * Método que sirve para reducir la cantidad del los productos en el carrito.
 * @param {*} idProducto 
 */
function disminuirCantidad(idProducto) {
    const productos = JSON.parse(localStorage.getItem("suplementos"));
    const productoIndex = productos.findIndex(producto => producto.id === idProducto);
    if (productoIndex !== -1 && productos[productoIndex].cantidad > 0) {
        productos[productoIndex].cantidad--;
        localStorage.setItem("suplementos", JSON.stringify(productos));
        actualizarCantidadVisual(idProducto, productos[productoIndex].cantidad);
        actualizarPrecioTotal();
    }
}
/**
 * Método que actualiza visualmente la cantidad de los productos en el carrito
 * @param {*} idProducto 
 * @param {*} cantidad 
 */
function actualizarCantidadVisual(idProducto, cantidad) {
    const spanCantidad = document.getElementById(`cantidad-${idProducto}`);
    if (spanCantidad) {
        spanCantidad.textContent = cantidad;
    }
}
/**
 * Método que se encarga de actualizar el precio total mostrado en el carrito.
 */
function actualizarPrecioTotal() {
    const precioTotalParrafo = document.getElementById("precio-total");
    if (precioTotalParrafo) {
        //Da formato a la fecha
        precioTotalParrafo.textContent = "Precio total: " + calcularPrecioTotal().toFixed(2) + "€";
    }
}

/**
 * Método que sirve para mostrar los productos en el carrito.
 * @param {*} contenedorTarjetas 
 */
function crearCartasProductos(contenedorTarjetas) {
    // Cogemos los productos del localStorage
    const productos = JSON.parse(localStorage.getItem("suplementos"));

    const contenedorPrincipal = document.createElement("div");
    contenedorPrincipal.className = "contenedor container mt-4";

    const contenedorInterno = document.createElement("div");
    contenedorInterno.className = "text-center mt-2";
    contenedorPrincipal.appendChild(contenedorInterno);

    const contenedorTarjetasLocal = document.createElement("div");
    contenedorTarjetasLocal.className = "row";
    contenedorPrincipal.appendChild(contenedorTarjetasLocal);

    // Lee todos los productos y crea una tarjeta para cada uno

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

        const divCantidad = document.createElement("div");
        divCantidad.className = "d-flex justify-content-between align-items-center mt-3";
        
        const botonDisminuir = document.createElement("button");
        botonDisminuir.textContent = "-";
        botonDisminuir.addEventListener("click", () => disminuirCantidad(producto.id));
        
        const spanCantidad = document.createElement("span");
        spanCantidad.textContent = producto.cantidad;
        spanCantidad.id = `cantidad-${producto.id}`;
        
        const botonAumentar = document.createElement("button");
        botonAumentar.textContent = "+";
        botonAumentar.addEventListener("click", () => aumentarCantidad(producto.id));
        
        divCantidad.appendChild(botonDisminuir);
        divCantidad.appendChild(spanCantidad);
        divCantidad.appendChild(botonAumentar);
        
        nuevoCuerpo.appendChild(nuevoTitulo);
        nuevoCuerpo.appendChild(nuevoParrafo);
        nuevoCuerpo.appendChild(divCantidad);
        
        nuevaCarta.appendChild(nuevaImagen);
        nuevaCarta.appendChild(nuevoCuerpo);
        
        nuevoSuplemento.appendChild(nuevaCarta);
        
        contenedorTarjetasLocal.appendChild(nuevoSuplemento);
    });

    const precioTotalParrafo = document.createElement("p");
    precioTotalParrafo.textContent = "Precio total: " + calcularPrecioTotal().toFixed(2) + "€";
    precioTotalParrafo.id = "precio-total";
    contenedorPrincipal.appendChild(precioTotalParrafo);

    contenedorTarjetas.appendChild(contenedorPrincipal);
}

const contenedorTarjetas = document.getElementById("productos-container");
crearCartasProductos(contenedorTarjetas);
botonBorrarCarrito(contenedorTarjetas);

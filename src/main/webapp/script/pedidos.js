/*document.addEventListener("DOMContentLoaded", function() {
    borrarCarrito();
});*/
document.addEventListener("DOMContentLoaded", function() {
    const btnPagar = document.getElementById("btnPagar");

    btnPagar.addEventListener("click", function(event) {
        event.preventDefault(); // Para que el boton no recargue la página.
        
        // Cogemos los datos a traves del getElementById
        const nombre = document.getElementById("miNombre").value;
        const apellidos = document.getElementById("miApellido").value;
        const email = document.getElementById("miEmail").value;
        const direccion = document.getElementById("miDireccion").value;
        const ciudad = document.getElementById("miCiudad").value;
        const codigoPostal = document.getElementById("inputZip").value;

        // Obtenemos los datos del localStorage se parsea para no coger los elementos en cadena de texto
        const productos = JSON.parse(localStorage.getItem("suplementos"));

        // Cogemos la fecha del instante del pedido
        const fechaPedido = new Date();

        // Hacemos la lista para los pedidos
        const nuevoPedido = {
            fechaPedido: fechaPedido,
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            direccion: direccion,
            ciudad: ciudad,
            codigoPostal: codigoPostal,
            productos: productos ? productos : []
        };

        // Guardamos los pedidos ya existentes
        let listaPedidosExistente = JSON.parse(localStorage.getItem("listaPedidos"));

        //Comprobamos si existe ya un pedido y sino creamos un array vacio
        if (!Array.isArray(listaPedidosExistente)) {
            listaPedidosExistente = [];
        }

        // Con el .push añadimos el nuevo pedido a la lista de pedidos.
        listaPedidosExistente.push(nuevoPedido);

        // Guardamos la lista pedidos como cadena de texto.
        localStorage.setItem("listaPedidos", JSON.stringify(listaPedidosExistente));

        // Al pulsar el boton nos lleva a la pagina donde se muestra los pedidos
        window.location.href = "pedidos.html";
    });
});

//Esperamos a que el documento HTML este completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    const pedidoInfo = document.getElementById("pedidoInfo");
    
    // Comprobamos que existe el pedidoInfo
    if (pedidoInfo) {

        const listaPedidos = JSON.parse(localStorage.getItem("listaPedidos"));

            // Verificamos si hay pedidos en la lista

        if (listaPedidos && listaPedidos.length > 0) {
            pedidoInfo.innerHTML = ""; // Limpiar contenido actual
            
            // Crear la tabla de pedidos (Cabezera)
            pedidoInfo.innerHTML += `
                <table class="table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Fecha del Pedido</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Email</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Código Postal</th>
                            <th scope="col">Productos</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
             // Hace un foreach para recoger los datos de los pedidos
            // Para cada producto que encuentra crea una fila de la tabla para producto y cantidad y con el join se unen todas las filas de tabla HTML creadas en un solo string.
            listaPedidos.forEach((pedido, index) => {
                pedidoInfo.innerHTML += `
                    <tr>
                        <td>${pedido.fechaPedido}</td>
                        <td>${pedido.nombre}</td>
                        <td>${pedido.apellidos}</td>
                        <td>${pedido.email}</td>
                        <td>${pedido.direccion}</td>
                        <td>${pedido.ciudad}</td>
                        <td>${pedido.codigoPostal}</td>
                        <td>
                            <table class="table">
                                <thead class="table-dark">
                                    <tr>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Cantidad</th>
                                    </tr>
                                </thead>
           
                                <tbody>
                                    ${pedido.productos.map(producto => `<tr><td>${producto.nombre}</td><td>${producto.cantidad}</td></tr>`).join("")}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                `;
            });

            // Cierra la tabla.
            pedidoInfo.innerHTML += `</tbody></table>`;
        } else {
            pedidoInfo.innerHTML = "<p>No hay pedidos disponibles.</p>";
        }
    } 
});

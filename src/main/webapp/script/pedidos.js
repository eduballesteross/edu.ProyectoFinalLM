document.addEventListener("DOMContentLoaded", function() {
    const btnPedidos = document.getElementById("btnPedidos");

    btnPedidos.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el botón recargue la página
        
        // Redireccionar a la página de pedidos
        window.location.href = "pedidos.html";
    });

    const btnPedido = document.getElementById("btnPedidos");

    btnPedido.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el botón recargue la página
        
        // Obtener los datos del formulario
        const nombre = document.getElementById("miNombre").value;
        const apellidos = document.getElementById("miApellido").value;
        const email = document.getElementById("miEmail").value;
        const direccion = document.getElementById("miDireccion").value;
        const ciudad = document.getElementById("miCiudad").value;
        const codigoPostal = document.getElementById("inputZip").value;
        const productos = JSON.parse(localStorage.getItem("suplementos"));

        // Crear el nuevo pedido
        const nuevoPedido = {
            fechaPedido: new Date(),
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            direccion: direccion,
            ciudad: ciudad,
            codigoPostal: codigoPostal,
            productos: productos ? productos : []
        };

        // Obtener la lista de pedidos existente del localStorage
        let listaPedidos = JSON.parse(localStorage.getItem("listaPedidos")) || [];

        // Agregar el nuevo pedido a la lista de pedidos
        listaPedidos.push(nuevoPedido);

        // Guardar la lista de pedidos actualizada en el localStorage
        localStorage.setItem("listaPedidos", JSON.stringify(listaPedidos));

        // Redireccionar a la página de pedidos
        window.location.href = "pedidos.html";
    });
});

// Mostrar los pedidos en la página de pedidos.html
document.addEventListener("DOMContentLoaded", function() {
    const pedidoInfo = document.getElementById("pedidoInfo");
    
    // Verificar si el elemento pedidoInfo existe
    if (pedidoInfo) {
        // Obtener la lista de pedidos del localStorage
        const listaPedidos = JSON.parse(localStorage.getItem("listaPedidos"));

        // Verificar si hay pedidos en la lista
        if (Array.isArray(listaPedidos) && listaPedidos.length > 0) {
            // Limpiar contenido actual del pedidoInfo
            pedidoInfo.innerHTML = "";

            // Crear la tabla de pedidos
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

            // Iterar sobre cada pedido y agregarlo a la tabla
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

            // Cerrar la tabla
            pedidoInfo.innerHTML += `</tbody></table>`;
        } else {
            // Mostrar un mensaje si no hay pedidos disponibles
            pedidoInfo.innerHTML = "<p>No hay pedidos disponibles.</p>";
        }
    } else {
        console.error("No se encontró el elemento pedidoInfo en la página.");
    }
});

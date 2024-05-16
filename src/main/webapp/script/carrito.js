/**
 * Función para agregar al carrito un producto
 * @param {*} producto 
 */

function agregarCarrito(producto){

  //Obtenemos la memoria de suplementos desde el localstorage

const memoria = JSON.parse(localStorage.getItem("suplementos"));
console.log(memoria);


    //  Se comprueba la existencia de la memoria
if (!memoria){

    const nuevoSuplemento = nuevoProductoMemoria(producto)
    nuevoSuplemento.cantidad = 1;
    localStorage.setItem("suplementos",JSON.stringify([nuevoSuplemento]))
}else{
    //Si hay memoria existente

    const indiceProducto = memoria.findIndex(suplemento =>suplemento.id === producto.id)
    console.log(indiceProducto)
    const nuevaMemoria=memoria;

    if(indiceProducto ===-1){
        //Si el producto no está en la memoria, añadirlo como un nuevo suplemento

        const nuevaMemoria = memoria;
        nuevaMemoria.push(nuevoProductoMemoria(producto))
        
    }else{
        //Si el producto ya está en la memoria, incrementar su cantidad en 1

        nuevaMemoria[indiceProducto].cantidad++;
    }
    //Almacenar la memoria actualizada en el localstorage
    localStorage.setItem("suplementos",JSON.stringify(nuevaMemoria));
}
}
/**
 * Función que crea un nuevo suplemento.
 * @param {*} producto 
 * @returns 
 */
function nuevoProductoMemoria(producto){

    const nuevoSuplemento = producto;
    nuevoSuplemento.cantidad = 1;
    return nuevoSuplemento;
}
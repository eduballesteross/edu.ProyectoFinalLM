


//Control de mensaje de validacion del nombre

const miNombre = document.getElementById('miNombre')

//Detecta los números para mostrar un mensaje que no se puede usar números
miNombre.addEventListener('input', () => {
  const nombre = miNombre.value;
  if(/[0-9]/.test(nombre)) {
      miNombre.setCustomValidity('Por favor, introduzca solo letras.');
  } else {
      miNombre.setCustomValidity('');
  }
});
miNombre.addEventListener('invalid', () => {
    miNombre.setCustomValidity('Introduzca su nombre correctamente.');
 });


 //Control de validación del campo apellidos
const miApellido = document.getElementById('miApellido')

//Detecta los números para mostrar un mensaje que no se puede usar números

miApellido.addEventListener('input', () => {
  const apellido = miApellido.value;
  if(/[0-9]/.test(apellido)) {
      miApellido.setCustomValidity('Por favor, introduzca solo letras en el apellido.');
  } else {
      miApellido.setCustomValidity('');
  }
});

 miApellido.addEventListener('invalid',()=> {
 miApellido.setCustomValidity('Introduzca sus apellidos correctamente.')
 });

 
 //Control de validación del campo email

 const miEmail = document.getElementById('miEmail');

miEmail.addEventListener('invalid', () => {
  const emailSinEspacios = miEmail.value.replace(/\s/g, ''); // FUNCION QUE BORRA LOS ESPACIOS
  miEmail.value = emailSinEspacios;

  if (emailSinEspacios.length === 0) {
    miEmail.setCustomValidity('Introduzca un correo electrónico correctamente.');
  } else {
    miEmail.setCustomValidity('');
  }
});


//Control de validación del campo direccion
const miDireccion = document.getElementById('miDireccion');

miDireccion.addEventListener('invalid', () => {
  miDireccion.setCustomValidity('Introduzca su dirección correctamente.');
});



//Control de validación del campo Ciudad
const miCiudad = document.getElementById('miCiudad');

//Detecta los números para mostrar un mensaje que no se puede usar números

miCiudad.addEventListener('input', () => {
  const ciudad = miCiudad.value;
  if(/[0-9]/.test(ciudad)) {
      miCiudad.setCustomValidity('Por favor, introduzca solo letras en la ciudad.');
  } else {
      miCiudad.setCustomValidity('');
  }
});

miCiudad.addEventListener('invalid', () => {
  miCiudad.setCustomValidity('Introduzca el nombre de su ciudad correctamente.');
});







 //Validacion para el campo de la tarjeta de credito.

const miTarjeta = document.getElementById('miTarjeta');

miTarjeta.addEventListener('input', () => {
  const numeroTarjeta = miTarjeta.value.replace(/\s/g, ''); // Eliminar espacios en blanco
  
  if (/^\d{13,16}$/.test(numeroTarjeta)) {
    miTarjeta.setCustomValidity('');
  } else {
    miTarjeta.setCustomValidity('Introduzca un número de tarjeta válido.');
  }
});

const cvvInput = document.getElementById('miCVV')

cvvInput.addEventListener('input', function (event) {
  const inputValue = event.target.value;

  // Validar si todos los caracteres son dígitos
  if (inputValue.length === 3 && /^\d+$/.test(inputValue)) {
      // Si el CVV tiene exactamente 3 caracteres y todos son dígitos, no hay error
      cvvInput.setCustomValidity('');
  } else {
      // Si no cumple con la condición, se muestra un mensaje de error
      cvvInput.setCustomValidity('Por favor, introduzca un CVV válido de 3 dígitos.');
  }

  // Enmascarar la entrada del usuario
  const maskedValue = inputValue.replace(/./g, '*'); // Reemplazar cada carácter con un asterisco
  cvvInput.value = maskedValue;
});


// Array para almacenar los usuarios registrados
let usuariosRegistrados = [];
let mascotasRegistradas = [];

// Función para mostrar el formulario específico
function mostrarFormulario(tipo) {
    document.getElementById('formularioMascota').style.display = tipo === 'mascota' ? 'block' : 'none';
    document.getElementById('formularioDueno').style.display = tipo === 'dueno' ? 'block' : 'none';
}

// Función para registrar una mascota
async function registrarMascota() {
    const nombre = document.getElementById('nombreMascota').value;
    const raza = document.getElementById('razaMascota').value;
    const fechaNacimiento = document.getElementById('fechaNacimientoMascota').value;
    const sexo = document.getElementById('sexoMascota').value;
    const comunaResidencia = document.getElementById('comunaResidenciaMascota').value;

    if (![nombre, raza, fechaNacimiento, sexo, comunaResidencia].every(Boolean)) {
        alert('Todos los campos son obligatorios');
        return;
    }

    const mascota = { nombre, raza, fechaNacimiento, sexo, comunaResidencia };

    try {
        // Convertir el objeto a una cadena JSON
        const mascotaJSON = JSON.stringify(mascota);

        // Enviar el JSON a un controlador usando fetch con async/await
        const response = await fetch('/PostData/PostMascota', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: mascotaJSON,
        });

        if (!response.ok) {
            throw new Error(`Error al enviar el JSON. Código de estado: ${response.status}`);
        }

        // Manejar la respuesta del controlador si es necesario
        const data = await response.json();
        console.log('Respuesta del controlador:', data);

        alert('Mascota registrada correctamente');
        mascotasRegistradas.push(mascota);
        mostrarDatosEnCardMascota('Mascotas', mascotasRegistradas);
        reiniciarFormulario();
        var dataPet = { Pets: mascotasRegistradas };
        localStorage.setItem('dataPet', JSON.stringify(dataPet));
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}
// Función para registrar un dueño
function registrarDueno() {
    const nombre = document.getElementById('nombreDueno').value;
    const telefono = document.getElementById('telefonoDueno').value;
    const correo = document.getElementById('correoDueno').value;

    if (![nombre, telefono, correo].every(Boolean)) {
        alert('Todos los campos son obligatorios');
        return;
    }

    alert('Dueño registrado correctamente');
    const dueno = { nombre, telefono, correo };
    usuariosRegistrados.push(dueno);

    var datos = { Users: usuariosRegistrados };
    localStorage.setItem('dataUsers', JSON.stringify(datos));
    reiniciarFormulario();
}
// Función para mostrar los datos en una card
function mostrarDatosEnCardMascota(tipo, datos) {
    // Verificar si hay datos en la posición 0 del array
    if (!datos) {
        console.error('Datos no válidos.');
        return;
    }

    let propiedades = datos;
    let cardHtml = `<div class="card"><div class="card-body"><h5 class="card-title">${tipo}</h5>`;

    // Iterar sobre las propiedades
    Object.entries(propiedades).forEach(([clave, valor]) => {
        cardHtml += `<div class="item">`;
        cardHtml += `<p class="card-text"><strong>${clave}:</strong> ${valor}</p>`;
        cardHtml += `</div>`;
    });

    cardHtml += '</div></div>';
    document.getElementById('datosCardPet').innerHTML = cardHtml;
    document.getElementById('datosCardPet').style.display = 'block';
}
// Función para mostrar los datos en una card
function mostrarDatosEnCardUsuario(tipo, datos) {
    // Verificar si hay datos en la posición 0 del array
    if (!datos || !datos[0]) {
        console.error('Datos no válidos.');
        return;
    }

    const propiedades = datos[0];
    let cardHtml = `<div class="card"><div class="card-body"><h5 class="card-title">${tipo}</h5>`;

    // Iterar sobre las propiedades
    Object.entries(propiedades).forEach(([clave, valor]) => {
        cardHtml += `<div class="item">`;
        cardHtml += `<p class="card-text"><strong>${clave}:</strong> ${valor}</p>`;
        cardHtml += `</div>`;
    });

    cardHtml += '</div></div>';
    document.getElementById('datosCardUsers').innerHTML = cardHtml;
    document.getElementById('datosCardUsers').style.display = 'block';
}



// Ejemplo de filtro de usuarios por tipo (mascota o dueño)
function filtrarMascotasPorNombre() {
    let input = document.getElementById('buscarMascota');

    // agregar evento 'input' al input
    input.addEventListener('input', function () {
        // Obtener el valor actual del input
        let valor = input.value;
        let mascotasFiltradas = mascotasRegistradas.filter((mascota) => mascota.nombre.includes(valor));
        mostrarResultados("Mascota", mascotasFiltradas);
        
    });
}

function mostrarResultados(tipo,datos = null) {
    let cardHtml = `<div class="card"><div class="card-body"><h5 class="card-title">${tipo}</h5>`;

    // Iterar sobre los elementos del array 'datos'
    for (let i = 0; i < datos.length; i++) {
        let item = datos[i];
        cardHtml += `<div class="item">`; // Abrir un nuevo div para cada item

        // Iterar sobre las propiedades de cada item
        for (let propiedad in item) {
            if (Object.prototype.hasOwnProperty.call(item, propiedad)) {
                cardHtml += `<p class="card-text"><strong>${propiedad.replace(/([a-z])([A-Z])/g, '$1 $2')}:</strong> ${item[propiedad]}</p>`;
            }
        }

        cardHtml += `</div>`; // cerrar el div del item
    }

    cardHtml += '</div></div>';
    document.getElementById('datosMascota').innerHTML = cardHtml;
    document.getElementById('datosMascota').style.display = 'block';
}
// mapeo de mascotass para obtener solo los nombres
function obtenerNombresMascota() {
    return mascotasRegistradas.map(mascota => mascota.nombre);
}

// reducción para contar la cantidad total de usuarios
function contarUsuarios() {
    return usuariosRegistrados.reduce((total, usuario) => total + 1, 0);
}


function reiniciarFormulario() {
    document.getElementById('registroMascota').reset();
    document.getElementById('registroDueno').reset();
}


// Obtener datos de localStorage
function MostarUser() {
    let datos = localStorage.getItem('dataUsers');
    if (datos) {
        datos = JSON.parse(datos);
        let usuarios = datos.Users;

        console.log(usuarios); // Esto muestra todo el array de usuarios

        for (let usuario of usuarios) {
            console.log(usuario); // Esto muestra cada usuario individualmente
            mostrarDatosEnCardUsuario('Dueño', [usuario]); // Pasa un array con el usuario a la función
        }
    } else {
        console.log("No hay datos almacenados.");
    }
}


function ShowPet() {
    let datos = localStorage.getItem('dataPet');
    if (datos) {
        datos = JSON.parse(datos);
        console.log(datos.Pets);
        for (const mascota of datos.Pets) {
            mostrarDatosEnCardMascota('Mascota', mascota);
        }
    } else {
        console.log("No hay Mascotas almacenadas");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    MostarUser();
    ShowPet();
});

// Array para almacenar los usuarios registrados
let usuariosRegistrados = [];
let mascotasRegistradas = [];
// Función para mostrar el formulario específico
function mostrarFormulario(tipo) {
    document.getElementById('formularioMascota').style.display = tipo === 'mascota' ? 'block' : 'none';
    document.getElementById('formularioDueno').style.display = tipo === 'dueno' ? 'block' : 'none';
}

// Función para registrar una mascota
function registrarMascota() {
    let nombre = document.getElementById('nombreMascota').value;
    let raza = document.getElementById('razaMascota').value;
    let fechaNacimiento = document.getElementById('fechaNacimientoMascota').value;
    let sexo = document.getElementById('sexoMascota').value;
    let comunaResidencia = document.getElementById('comunaResidenciaMascota').value;

    if (!nombre || !raza || !fechaNacimiento || !sexo || !comunaResidencia) {
        alert('Todos los campos son obligatorios');
        return;
    }

    alert('Mascota registrada correctamente');
    let mascota = { nombre, raza, fechaNacimiento, sexo, comunaResidencia };
    mascotasRegistradas.push(mascota); // Agregar mascota al array de usuarios registrados
    mostrarDatosEnCardMascota('Mascotas', mascotasRegistradas);
    reiniciarFormulario();
}


// Función para registrar un dueño
function registrarDueno() {
    let nombre = document.getElementById('nombreDueno').value;
    let telefono = document.getElementById('telefonoDueno').value;
    let correo = document.getElementById('correoDueno').value;
    let enviarFormMascota = document.getElementById('enviarFormMascota');
    if (!nombre || !telefono || !correo) {
        alert('Todos los campos son obligatorios');
        return;
    }
    else {
        
        alert('Dueño registrado correctamente');
        let dueno = { nombre, telefono, correo };
        usuariosRegistrados.push(dueno); // Agregar dueño al array de usuarios registrados
        
        enviarFormMascota.addEventListener('click', function () {
            mostrarFormulario('mascota');
        });
        mostrarDatosEnCardUsuario('Dueño', usuariosRegistrados);
    }
    reiniciarFormulario();
    
}
// Función para mostrar los datos en una card
function mostrarDatosEnCardMascota(tipo, datos) {
    let cardHtml = `<div class="container"><div class="row row-cols-1 row-cols-md-auto rows-cols-sm-auto"><h5 class="card-title col-12">${tipo}</h5>`;

    // Iterar sobre los elementos del array 'datos'
    for (let i = 0; i < datos.length; i++) {
        let item = datos[i];
        cardHtml += `<div class="card-object col-3>`; // Abrir un nuevo div para cada item

        // Iterar sobre las propiedades de cada item
        for (let propiedad in item) {
            if (Object.prototype.hasOwnProperty.call(item, propiedad)) {
                cardHtml += `<p class="card-text"><strong>${propiedad.replace(/([a-z])([A-Z])/g, '$1 $2')}:</strong> ${item[propiedad]}</p>`;
            }
        }

        cardHtml += `</div>`; // Cerrar el div del item
    }

    cardHtml += '</div></div>';
    document.getElementById('datosCard').innerHTML = cardHtml;
    document.getElementById('datosCard').style.display = 'block';

}

// Función para mostrar los datos en una card
function mostrarDatosEnCardUsuario(tipo, datos) {
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

        cardHtml += `</div>`;
    }

    cardHtml += '</div></div>';
    document.getElementById('datosCard').innerHTML = cardHtml;
    document.getElementById('datosCard').style.display = 'block';
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
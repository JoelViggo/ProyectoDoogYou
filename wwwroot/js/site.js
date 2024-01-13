
function mostrarFormulario(tipo) {
    document.getElementById('formularioMascota').style.display = tipo === 'mascota' ? 'block' : 'none';
    document.getElementById('formularioDueno').style.display = tipo === 'dueno' ? 'block' : 'none';
}

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
    mostrarDatosEnCard('Mascota', { nombre, raza, fechaNacimiento, sexo, comunaResidencia });
    reiniciarFormulario();
}

function registrarDueno() {

    let nombre = document.getElementById('nombreDueno').value;
    let telefono = document.getElementById('telefonoDueno').value;
    let correo = document.getElementById('correoDueno').value;


    if (!nombre || !telefono || !correo) {
        alert('Todos los campos son obligatorios');
        return;
    }

  
    alert('Dueño registrado correctamente');
    mostrarDatosEnCard('Dueño', { nombre, telefono, correo });
    reiniciarFormulario();
}

function mostrarDatosEnCard(tipo, datos) {
    let cardHtml = `<div class="card"><div class="card-body"><h5 class="card-title">${tipo}</h5>`;

    for (let propiedad in datos) {
        cardHtml += `<p class="card-text"><strong>${propiedad.replace(/([a-z])([A-Z])/g, '$1 $2')}:</strong> ${datos[propiedad]}</p>`;
    }

    cardHtml += '</div></div>';
    document.getElementById('datosCard').innerHTML = cardHtml;
    document.getElementById('datosCard').style.display = 'block';
}

function reiniciarFormulario() {
    document.getElementById('registroMascota').reset();
    document.getElementById('registroDueno').reset();
    document.getElementById('formularioMascota').style.display = 'none';
    document.getElementById('formularioDueno').style.display = 'none';
}
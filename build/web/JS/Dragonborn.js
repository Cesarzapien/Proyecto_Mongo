document.addEventListener('DOMContentLoaded', function () {
    CargarTarjetas();
});

function CargarTarjetas() {
    let ruta = "http://localhost:8080/Proyecto_Mongo/api/carro/getall";
    fetch(ruta)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const contenedorTarjetas = document.getElementById("contenedor-tarjetas");

            contenedorTarjetas.innerHTML = "";

            data.forEach(function (carro) {
                const nuevaTarjeta = document.createElement("div");
                nuevaTarjeta.classList.add("card");
                nuevaTarjeta.classList.add("mb-3");
                nuevaTarjeta.classList.add("mr-3"); // Agrega un margen a la derecha
                nuevaTarjeta.style.width = "18rem"; // Define el ancho de la tarjeta si es necesario

                let cardContent = `
                    <div class="card-body">
                        <h5 class="card-title">${carro.marca} ${carro.modelo ? carro.modelo : ''}</h5>
                        <p class="card-text"><strong>Número de serie:</strong> ${carro.numSerie}</p>
                        <p class="card-text"><strong>Equipo de audio:</strong> ${carro.equipoAudio ? 'Sí' : 'No'}</p>
                `;

                // Agregar etiquetas de campos opcionales si están presentes
                if (carro.fechaCreacion) {
                    cardContent += `<p class="card-text"><strong>Fecha de creación:</strong> ${carro.fechaCreacion}</p>`;
                }
                if (carro.tanqueGasolina) {
                    cardContent += `<p class="card-text"><strong>Tanque de gasolina:</strong> ${carro.tanqueGasolina}</p>`;
                }

                cardContent += `
                        <button class="btn btn-primary" onclick="mostrarDetalle(${carro.numSerie}, '${carro.marca}', '${carro.modelo ? carro.modelo : ''}', '${carro.fechaCreacion}', ${carro.tanqueGasolina}, ${carro.equipoAudio})">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarCarro(${carro.numSerie})">Eliminar</button>
                    </div>
                `;

                nuevaTarjeta.innerHTML = cardContent;
                contenedorTarjetas.appendChild(nuevaTarjeta);
            });
        })
        .catch(function (error) {
            console.error("Error al cargar las tarjetas: " + error);
        });
}





function mostrarDetalle(numSerie, marca, modelo, fechaCreacion, tanqueGasolina, equipoAudio) {
    document.getElementById("txtNumSerie").value = numSerie || '';
    document.getElementById("txtMarca").value = marca || '';
    document.getElementById("txtModelo").value = modelo || '';
    document.getElementById("txtFechaCreacion").value = fechaCreacion ? new Date(fechaCreacion).toISOString().split('T')[0] : '';
    document.getElementById("txtTanqueGasolina").value = tanqueGasolina || '';
    document.getElementById("txtEquipoAudio").value = equipoAudio !== undefined ? equipoAudio.toString() : ''; // Convertir a string solo si está definido
}


function eliminarCarro(numSerie) {
    let ruta = `http://localhost:8080/Proyecto_Mongo/api/carro/eliminar/${numSerie}`;

    fetch(ruta, {
        method: 'DELETE'
    })
            .then(function (response) {
                if (response.ok) {
                    alert("Carro eliminado correctamente");
                    CargarTarjetas(); // Recargar las tarjetas después de eliminar el carro
                } else {
                    throw new Error('Error al eliminar el carro');
                }
            })
            .catch(function (error) {
                console.error("Error al eliminar el carro: " + error);
            });
}



function insertar() {
    let ruta = "http://localhost:8080/Proyecto_Mongo/api/carro/insertar";

    // Obtener los valores de los campos
    let v_numSerie = parseInt(document.getElementById("txtNumSerie").value.trim());
    let v_marca = document.getElementById("txtMarca").value.trim();
    let v_equipoAudio = document.getElementById("txtEquipoAudio").value.trim();

    // Validar campos obligatorios
    if (!v_numSerie || !v_marca || !v_equipoAudio) {
        alert("Por favor complete todos los campos obligatorios: Número de serie, Marca y Equipo de audio.");
        return; // Detener el proceso si algún campo obligatorio está vacío
    }

    // Crear un objeto carro con los campos obligatorios
    let carro = {
        numSerie: v_numSerie,
        marca: v_marca,
        equipoAudio: v_equipoAudio
    };

    // Obtener los valores de los campos opcionales
    let v_modelo = document.getElementById("txtModelo").value.trim();
    let v_fechaCreacion = document.getElementById("txtFechaCreacion").value.trim();
    let v_tanqueGasolina = parseFloat(document.getElementById("txtTanqueGasolina").value.trim());

    // Agregar los campos opcionales si tienen valor
    if (v_modelo !== "") {
        carro.modelo = v_modelo;
    }
    if (v_fechaCreacion !== "") {
        carro.fechaCreacion = v_fechaCreacion;
    }
    if (!isNaN(v_tanqueGasolina)) {
        carro.tanqueGasolina = v_tanqueGasolina;
    }

    // Enviar la solicitud al servidor
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(carro)
    };

    fetch(ruta, requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error en la solicitud.');
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                clean();
                alert("Registro exitoso");
                Cargartabla(); // Recargar la tabla después de insertar un nuevo registro
            })
            .catch(function (error) {
                console.error("Error al insertar: " + error);
            });
}


function actualizarCarro() {
    let ruta = "http://localhost:8080/Proyecto_Mongo/api/carro/actualizar";
    
    // Obtener los valores de los campos
    let v_numSerie = parseInt(document.getElementById("txtNumSerie").value.trim());
    let v_marca = document.getElementById("txtMarca").value.trim();
    let v_equipoAudio = document.getElementById("txtEquipoAudio").value.trim();

    // Validar campos obligatorios
    if (!v_numSerie || !v_marca || !v_equipoAudio) {
        alert("Por favor complete todos los campos obligatorios: Número de serie, Marca y Equipo de audio.");
        return; // Detener el proceso si algún campo obligatorio está vacío
    }

    // Crear un objeto carro con los campos obligatorios
    let carro = {
        numSerie: v_numSerie,
        marca: v_marca,
        equipoAudio: v_equipoAudio
    };

    // Obtener los valores de los campos opcionales
    let v_modelo = document.getElementById("txtModelo").value.trim();
    let v_fechaCreacion = document.getElementById("txtFechaCreacion").value.trim();
    let v_tanqueGasolina = parseFloat(document.getElementById("txtTanqueGasolina").value.trim());

    // Agregar los campos opcionales si tienen valor
    if (v_modelo) {
        carro.modelo = v_modelo;
    }
    if (v_fechaCreacion) {
        carro.fechaCreacion = v_fechaCreacion;
    }
    if (!isNaN(v_tanqueGasolina)) {
        carro.tanqueGasolina = v_tanqueGasolina;
    }

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(carro)
    };

    fetch(ruta, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error en la solicitud.');
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            alert("Actualización exitosa");
            CargarTarjetas(); // Recargar las tarjetas después de actualizar el registro
        })
        .catch(function (error) {
            console.error("Error al actualizar: " + error);
        });
}



function clean() {
    document.getElementById("txtNumSerie").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtModelo").value = "";
    document.getElementById("txtFechaCreacion").value = "";
    document.getElementById("txtTanqueGasolina").value = "";
    document.getElementById("txtEquipoAudio").value = ""; // Ajuste aquí
}

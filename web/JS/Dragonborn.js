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
                nuevaTarjeta.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${carro.marca} ${carro.modelo}</h5>
                        <p class="card-text"><strong>Número de serie:</strong> ${carro.numSerie}</p>
                        <p class="card-text"><strong>Fecha de creación:</strong> ${carro.fechaCreacion}</p>
                        <p class="card-text"><strong>Tanque de gasolina:</strong> ${carro.tanqueGasolina}</p>
                        <p class="card-text"><strong>Equipo de audio:</strong> ${carro.equipoAudio ? 'Sí' : 'No'}</p>
                        <button class="btn btn-primary" onclick="mostrarDetalle(${carro.numSerie}, '${carro.marca}', '${carro.modelo}', '${carro.fechaCreacion}', ${carro.tanqueGasolina}, ${carro.equipoAudio})">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarCarro(${carro.numSerie})">Eliminar</button>
                    </div>
                `;

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
    let v_numSerie = parseInt(document.getElementById("txtNumSerie").value.trim());
    let v_marca = document.getElementById("txtMarca").value.trim();
    let v_modelo = document.getElementById("txtModelo").value.trim();
    let v_fechaCreacion = document.getElementById("txtFechaCreacion").value.trim();
    let v_tanqueGasolina = parseFloat(document.getElementById("txtTanqueGasolina").value.trim());
    let v_equipoAudio = document.getElementById("txtEquipoAudio").value.trim();

    let carro = {
        numSerie: v_numSerie,
        marca: v_marca,
        modelo: v_modelo,
        fechaCreacion: v_fechaCreacion,
        tanqueGasolina: v_tanqueGasolina,
        equipoAudio: v_equipoAudio
    };

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
    let v_numSerie = parseInt(document.getElementById("txtNumSerie").value.trim());
    let v_marca = document.getElementById("txtMarca").value.trim();
    let v_modelo = document.getElementById("txtModelo").value.trim();
    let v_fechaCreacion = document.getElementById("txtFechaCreacion").value.trim();
    let v_tanqueGasolina = parseFloat(document.getElementById("txtTanqueGasolina").value.trim());
    let v_equipoAudio = document.getElementById("txtEquipoAudio").value.trim();

    let carro = {
        numSerie: v_numSerie,
        marca: v_marca,
        modelo: v_modelo,
        fechaCreacion: v_fechaCreacion,
        tanqueGasolina: v_tanqueGasolina,
        equipoAudio: v_equipoAudio
    };

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

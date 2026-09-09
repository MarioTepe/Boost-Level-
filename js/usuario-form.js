const formulario = document.querySelector("#formUsuario");

const run = document.querySelector("#run");
const nombre = document.querySelector("#nombre");
const apellidos = document.querySelector("#apellidos");
const correo = document.querySelector("#correo");
const fechaNacimiento = document.querySelector("#fechaNacimiento");
const password = document.querySelector("#password");
const repetirPassword = document.querySelector("#repetirPassword");
const region = document.querySelector("#region");
const comuna = document.querySelector("#comuna");
const direccion = document.querySelector("#direccion");


region.innerHTML =
    '<option value="">Seleccione una región</option>';


for (let i = 0; i < regiones.length; i++) {

    region.innerHTML += `
        <option value="${i}">
            ${regiones[i].nombre}
        </option>
    `;
}


region.addEventListener("change", function () {

    comuna.innerHTML =
        '<option value="">Seleccione una comuna</option>';


    if (region.value !== "") {

        const comunasRegion =
            regiones[region.value].comunas;


        for (let i = 0; i < comunasRegion.length; i++) {

            comuna.innerHTML += `
                <option value="${comunasRegion[i]}">
                    ${comunasRegion[i]}
                </option>
            `;
        }
    }
});


formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    let valido = true;


    document.querySelector("#errorRun").textContent = "";
    document.querySelector("#errorNombre").textContent = "";
    document.querySelector("#errorApellidos").textContent = "";
    document.querySelector("#errorCorreo").textContent = "";
    document.querySelector("#errorFecha").textContent = "";
    document.querySelector("#errorPassword").textContent = "";
    document.querySelector("#errorRepetir").textContent = "";
    document.querySelector("#errorRegion").textContent = "";
    document.querySelector("#errorComuna").textContent = "";
    document.querySelector("#errorDireccion").textContent = "";


    // VALIDAR RUN

    if (run.value.trim() === "") {

        document.querySelector("#errorRun").textContent =
            "Ingrese su RUN.";

        valido = false;

    } else if (
        run.value.length < 7 ||
        run.value.length > 9
    ) {

        document.querySelector("#errorRun").textContent =
            "El RUN debe tener entre 7 y 9 caracteres.";

        valido = false;
    }


    // VALIDAR NOMBRE

    if (nombre.value.trim() === "") {

        document.querySelector("#errorNombre").textContent =
            "Ingrese su nombre.";

        valido = false;
    }


    // VALIDAR APELLIDOS

    if (apellidos.value.trim() === "") {

        document.querySelector("#errorApellidos").textContent =
            "Ingrese sus apellidos.";

        valido = false;
    }


    // VALIDAR CORREO

    const correoIngresado =
        correo.value.trim().toLowerCase();


    if (correoIngresado === "") {

        document.querySelector("#errorCorreo").textContent =
            "Ingrese su correo.";

        valido = false;

    } else if (
        !correoIngresado.endsWith("@duoc.cl") &&
        !correoIngresado.endsWith("@profesor.duoc.cl") &&
        !correoIngresado.endsWith("@gmail.com")
    ) {

        document.querySelector("#errorCorreo").textContent =
            "Correo no permitido.";

        valido = false;
    }


    // VALIDAR FECHA DE NACIMIENTO

    const fechaTexto =
        fechaNacimiento.value.trim();


    if (fechaTexto === "") {

        document.querySelector("#errorFecha").textContent =
            "Ingrese su fecha de nacimiento.";

        valido = false;

    } else {

        const partes =
            fechaTexto.split("/");


        if (partes.length !== 3) {

            document.querySelector("#errorFecha").textContent =
                "Ingrese la fecha en formato DD/MM/AAAA.";

            valido = false;

        } else {

            const dia =
                Number(partes[0]);

            const mes =
                Number(partes[1]);

            const anio =
                Number(partes[2]);


            const fecha =
                new Date(anio, mes - 1, dia);

            const hoy =
                new Date();


            // COMPROBAR QUE LA FECHA EXISTA

            if (
                fecha.getDate() !== dia ||
                fecha.getMonth() !== mes - 1 ||
                fecha.getFullYear() !== anio
            ) {

                document.querySelector("#errorFecha").textContent =
                    "Ingrese una fecha válida.";

                valido = false;

            } else {

                // CALCULAR EDAD

                let edad =
                    hoy.getFullYear() -
                    fecha.getFullYear();


                const diferenciaMes =
                    hoy.getMonth() -
                    fecha.getMonth();


                if (
                    diferenciaMes < 0 ||
                    (
                        diferenciaMes === 0 &&
                        hoy.getDate() < fecha.getDate()
                    )
                ) {

                    edad--;
                }


                if (edad < 18) {

                    document.querySelector("#errorFecha").textContent =
                        "Debe ser mayor de 18 años.";

                    valido = false;
                }
            }
        }
    }


    // MODO EDITAR

    const modoEditar =
        formulario.dataset.modo === "editar";


    // VALIDAR CONTRASEÑA

    if (
        password.value === "" &&
        !modoEditar
    ) {

        document.querySelector("#errorPassword").textContent =
            "Ingrese una contraseña.";

        valido = false;

    } else if (
        password.value !== "" &&
        (
            password.value.length < 4 ||
            password.value.length > 10
        )
    ) {

        document.querySelector("#errorPassword").textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";

        valido = false;
    }


    // VALIDAR REPETIR CONTRASEÑA

    if (
        password.value !== repetirPassword.value
    ) {

        document.querySelector("#errorRepetir").textContent =
            "Las contraseñas no coinciden.";

        valido = false;
    }


    // VALIDAR REGIÓN

    if (region.value === "") {

        document.querySelector("#errorRegion").textContent =
            "Seleccione una región.";

        valido = false;
    }


    // VALIDAR COMUNA

    if (comuna.value === "") {

        document.querySelector("#errorComuna").textContent =
            "Seleccione una comuna.";

        valido = false;
    }


    // VALIDAR DIRECCIÓN

    if (direccion.value.trim() === "") {

        document.querySelector("#errorDireccion").textContent =
            "Ingrese su dirección.";

        valido = false;
    }


    // SI TODO ESTÁ CORRECTO

    if (valido === true) {

        alert("Usuario registrado correctamente");


        if (
            correoIngresado.endsWith("@duoc.cl")
        ) {

            alert(
                "Usuario Duoc: obtiene un 20% de descuento."
            );
        }


        if (formulario.dataset.destino) {

            window.location.href =
                formulario.dataset.destino;
        }
    }
});
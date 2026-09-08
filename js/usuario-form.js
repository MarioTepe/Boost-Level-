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

region.innerHTML = '<option value="">Seleccione una región</option>';

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

    if (nombre.value.trim() === "") {

        document.querySelector("#errorNombre").textContent =
            "Ingrese su nombre.";

        valido = false;
    }

    if (apellidos.value.trim() === "") {

        document.querySelector("#errorApellidos").textContent =
            "Ingrese sus apellidos.";

        valido = false;
    }

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

    if (fechaNacimiento.value !== "") {

        const fecha = new Date(fechaNacimiento.value);
        const hoy = new Date();

        let edad =
            hoy.getFullYear() -
            fecha.getFullYear();

        const mes =
            hoy.getMonth() -
            fecha.getMonth();

        if (
            mes < 0 ||
            (mes === 0 && hoy.getDate() < fecha.getDate())
        ) {
            edad--;
        }

        if (edad < 18) {

            document.querySelector("#errorFecha").textContent =
                "Debe ser mayor de 18 años.";

            valido = false;
        }
    }

    const modoEditar =
        formulario.dataset.modo === "editar";

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

    if (
        password.value !== repetirPassword.value
    ) {

        document.querySelector("#errorRepetir").textContent =
            "Las contraseñas no coinciden.";

        valido = false;
    }

    if (region.value === "") {

        document.querySelector("#errorRegion").textContent =
            "Seleccione una región.";

        valido = false;
    }

    if (comuna.value === "") {

        document.querySelector("#errorComuna").textContent =
            "Seleccione una comuna.";

        valido = false;
    }

    if (direccion.value.trim() === "") {

        document.querySelector("#errorDireccion").textContent =
            "Ingrese su dirección.";

        valido = false;
    }

    if (valido === true) {

        alert("Usuario registrado correctamente");

        if (correoIngresado.endsWith("@duoc.cl")) {

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
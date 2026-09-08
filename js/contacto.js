const formContacto = document.querySelector("#formContacto");

const nombreContacto = document.querySelector("#nombre");
const correoContacto = document.querySelector("#correo");
const comentarioContacto = document.querySelector("#comentario");

function correoPermitido(valor) {
  return valor.endsWith("@duoc.cl") ||
         valor.endsWith("@profesor.duoc.cl") ||
         valor.endsWith("@gmail.com");
}

function validarContacto() {
  let valido = true;

  document.querySelector("#errorNombre").textContent = "";
  document.querySelector("#errorCorreo").textContent = "";
  document.querySelector("#errorComentario").textContent = "";

  if (nombreContacto.value.trim() === "") {
    document.querySelector("#errorNombre").textContent = "El nombre es requerido.";
    valido = false;
  } else if (nombreContacto.value.length > 100) {
    document.querySelector("#errorNombre").textContent = "Máximo 100 caracteres.";
    valido = false;
  }

  if (correoContacto.value.trim() === "") {
    document.querySelector("#errorCorreo").textContent = "El correo es requerido.";
    valido = false;
  } else if (correoContacto.value.length > 100) {
    document.querySelector("#errorCorreo").textContent = "Máximo 100 caracteres.";
    valido = false;
  } else if (!correoPermitido(correoContacto.value.trim().toLowerCase())) {
    document.querySelector("#errorCorreo").textContent = "Use @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    valido = false;
  }

  if (comentarioContacto.value.trim() === "") {
    document.querySelector("#errorComentario").textContent = "El comentario es requerido.";
    valido = false;
  } else if (comentarioContacto.value.length > 500) {
    document.querySelector("#errorComentario").textContent = "Máximo 500 caracteres.";
    valido = false;
  }

  return valido;
}

nombreContacto.addEventListener("input", validarContacto);
correoContacto.addEventListener("input", validarContacto);
comentarioContacto.addEventListener("input", validarContacto);

formContacto.addEventListener("submit", function(evento) {
  evento.preventDefault();

  if (validarContacto()) {
    alert("Mensaje enviado correctamente.");
    formContacto.reset();
  }
});

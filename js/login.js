const formLogin = document.querySelector("#formLogin");
const correo = document.querySelector("#correo");
const password = document.querySelector("#password");


const admins = [
  {
    correo: "admin@duoc.cl",
    password: "1234"
  }
];


const usuarios = [
  {
    correo: "usuario@gmail.com",
    password: "1234"
  }
];


function correoPermitido(valor) {
  return valor.endsWith("@duoc.cl") ||
         valor.endsWith("@profesor.duoc.cl") ||
         valor.endsWith("@gmail.com");
}


function validarLogin() {
  let valido = true;

  document.querySelector("#errorCorreo").textContent = "";
  document.querySelector("#errorPassword").textContent = "";

  if (correo.value.trim() === "") {
    document.querySelector("#errorCorreo").textContent =
      "El correo es requerido.";

    valido = false;

  } else if (correo.value.length > 100) {

    document.querySelector("#errorCorreo").textContent =
      "Máximo 100 caracteres.";

    valido = false;

  } else if (!correoPermitido(correo.value.trim().toLowerCase())) {

    document.querySelector("#errorCorreo").textContent =
      "Use @duoc.cl, @profesor.duoc.cl o @gmail.com.";

    valido = false;
  }


  if (password.value === "") {

    document.querySelector("#errorPassword").textContent =
      "La contraseña es requerida.";

    valido = false;

  } else if (password.value.length < 4 || password.value.length > 10) {

    document.querySelector("#errorPassword").textContent =
      "Debe tener entre 4 y 10 caracteres.";

    valido = false;
  }


  return valido;
}


correo.addEventListener("input", validarLogin);
password.addEventListener("input", validarLogin);


formLogin.addEventListener("submit", function(evento) {

  evento.preventDefault();


  if (validarLogin()) {

    const correoIngresado =
      correo.value.trim().toLowerCase();

    const passwordIngresada =
      password.value;


    const adminEncontrado = admins.find(function(admin) {

      return admin.correo === correoIngresado &&
             admin.password === passwordIngresada;

    });


    const usuarioEncontrado = usuarios.find(function(usuario) {

      return usuario.correo === correoIngresado &&
             usuario.password === passwordIngresada;

    });


    if (adminEncontrado) {

      alert("Inicio de sesión como administrador.");

      window.location.href = "admin/index.html";


    } else if (usuarioEncontrado) {

      alert("Inicio de sesión correcto.");

      window.location.href = "index.html";


    } else {

      alert("Correo o contraseña incorrectos.");

    }

  }

});
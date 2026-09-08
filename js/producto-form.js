const formProducto = document.querySelector("#formProducto");

const codigoProducto = document.querySelector("#codigo");
const nombreProducto = document.querySelector("#nombre");
const descripcionProducto = document.querySelector("#descripcion");
const precioProducto = document.querySelector("#precio");
const stockProducto = document.querySelector("#stock");
const stockCritico = document.querySelector("#stockCritico");
const categoriaProducto = document.querySelector("#categoria");

function ponerError(id, mensaje) {
  document.querySelector(id).textContent = mensaje;
}

function validarProducto() {
  let valido = true;

  ponerError("#errorCodigo", "");
  ponerError("#errorNombre", "");
  ponerError("#errorDescripcion", "");
  ponerError("#errorPrecio", "");
  ponerError("#errorStock", "");
  ponerError("#errorStockCritico", "");
  ponerError("#errorCategoria", "");
  document.querySelector("#alertaStock").textContent = "";

  if (codigoProducto.value.trim() === "") {
    ponerError("#errorCodigo", "El código es requerido.");
    valido = false;
  } else if (codigoProducto.value.trim().length < 3) {
    ponerError("#errorCodigo", "Mínimo 3 caracteres.");
    valido = false;
  }

  if (nombreProducto.value.trim() === "") {
    ponerError("#errorNombre", "El nombre es requerido.");
    valido = false;
  } else if (nombreProducto.value.length > 100) {
    ponerError("#errorNombre", "Máximo 100 caracteres.");
    valido = false;
  }

  if (descripcionProducto.value.length > 500) {
    ponerError("#errorDescripcion", "Máximo 500 caracteres.");
    valido = false;
  }

  if (precioProducto.value === "") {
    ponerError("#errorPrecio", "El precio es requerido.");
    valido = false;
  } else if (Number(precioProducto.value) < 0) {
    ponerError("#errorPrecio", "El precio mínimo es 0.");
    valido = false;
  }

  if (stockProducto.value === "") {
    ponerError("#errorStock", "El stock es requerido.");
    valido = false;
  } else if (Number(stockProducto.value) < 0 || !Number.isInteger(Number(stockProducto.value))) {
    ponerError("#errorStock", "Use un número entero mayor o igual a 0.");
    valido = false;
  }

  if (stockCritico.value !== "") {
    if (Number(stockCritico.value) < 0 || !Number.isInteger(Number(stockCritico.value))) {
      ponerError("#errorStockCritico", "Use un número entero mayor o igual a 0.");
      valido = false;
    } else if (stockProducto.value !== "" && Number(stockProducto.value) <= Number(stockCritico.value)) {
      document.querySelector("#alertaStock").textContent = "⚠ Stock igual o inferior al stock crítico.";
    }
  }

  if (categoriaProducto.value === "") {
    ponerError("#errorCategoria", "Seleccione una categoría.");
    valido = false;
  }

  return valido;
}

formProducto.querySelectorAll("input, textarea, select").forEach(function(campo) {
  campo.addEventListener("input", validarProducto);
  campo.addEventListener("change", validarProducto);
});

formProducto.addEventListener("submit", function(evento) {
  evento.preventDefault();

  if (validarProducto()) {
    alert("Producto validado correctamente.");
    window.location.href = "productos.html";
  }
});

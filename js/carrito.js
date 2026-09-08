function obtenerCarrito() {

  const guardado =
    localStorage.getItem("boostLevelCarrito");


  if (guardado === null) {

    return [];

  }


  return JSON.parse(guardado);

}


function guardarCarrito(carrito) {

  localStorage.setItem(
    "boostLevelCarrito",
    JSON.stringify(carrito)
  );

  actualizarContadorCarrito();

}


function agregarAlCarrito(codigo) {

  const carrito =
    obtenerCarrito();


  const producto =
    productos.find(p => p.codigo === codigo);


  if (!producto) {

    return;

  }


  const item =
    carrito.find(p => p.codigo === codigo);


  if (item) {

    item.cantidad =
      item.cantidad + 1;

  } else {

    carrito.push({

      codigo: producto.codigo,

      nombre: producto.nombre,

      precio: producto.precio,

      imagen: producto.imagen,

      cantidad: 1

    });

  }


  guardarCarrito(carrito);


  alert("Producto añadido al carrito");

}


function actualizarContadorCarrito() {

  const carrito =
    obtenerCarrito();


  let cantidadTotal = 0;


  carrito.forEach(function(item) {

    cantidadTotal =
      cantidadTotal + item.cantidad;

  });


  document
    .querySelectorAll(".contador-carrito")
    .forEach(function(contador) {

      contador.textContent =
        cantidadTotal;

    });

}


function eliminarDelCarrito(codigo) {

  let carrito =
    obtenerCarrito();


  carrito =
    carrito.filter(function(item) {

      return item.codigo !== codigo;

    });


  guardarCarrito(carrito);

  mostrarCarrito();

}


function cambiarCantidad(codigo, cambio) {

  const carrito =
    obtenerCarrito();


  const item =
    carrito.find(p => p.codigo === codigo);


  if (!item) {

    return;

  }


  item.cantidad =
    item.cantidad + cambio;


  if (item.cantidad <= 0) {

    eliminarDelCarrito(codigo);

    return;

  }


  guardarCarrito(carrito);

  mostrarCarrito();

}


function mostrarCarrito() {

  const contenedor =
    document.querySelector("#listaCarrito");


  if (!contenedor) {

    return;

  }


  const carrito =
    obtenerCarrito();


  contenedor.innerHTML = "";


  if (carrito.length === 0) {

    contenedor.innerHTML =
      '<div class="panel text-center">Tu carrito está vacío.</div>';


    document.querySelector("#totalCarrito").textContent =
      "$0";


    return;

  }


  let total = 0;


  carrito.forEach(function(item) {


    total =
      total + item.precio * item.cantidad;


    contenedor.innerHTML += `

      <div class="cart-item mb-3">

        <div class="d-flex flex-column flex-md-row align-items-md-center gap-3">


          <img
            src="${item.imagen}"
            alt="${item.nombre}">


          <div class="flex-grow-1">


            <h5>
              ${item.nombre}
            </h5>


            <p class="price mb-2">
              ${formatearPrecio(item.precio)}
            </p>


            <div class="d-flex align-items-center gap-2">


              <button
                class="btn btn-sm btn-outline-light"
                onclick="cambiarCantidad('${item.codigo}', -1)">

                -

              </button>


              <span>
                ${item.cantidad}
              </span>


              <button
                class="btn btn-sm btn-outline-light"
                onclick="cambiarCantidad('${item.codigo}', 1)">

                +

              </button>


              <button
                class="btn btn-sm btn-outline-danger ms-2"
                onclick="eliminarDelCarrito('${item.codigo}')">

                Eliminar

              </button>


            </div>


          </div>


        </div>


      </div>

    `;

  });


  document.querySelector("#totalCarrito").textContent =
    formatearPrecio(total);

}


document.addEventListener(
  "DOMContentLoaded",
  function() {

    actualizarContadorCarrito();

    mostrarCarrito();

  }
);
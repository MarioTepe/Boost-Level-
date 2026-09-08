const contenedorProductos = document.querySelector("#listaProductos");
const filtroCategoria = document.querySelector("#filtroCategoria");

function mostrarProductos(lista) {
  contenedorProductos.innerHTML = "";

  lista.forEach(function(producto) {
    contenedorProductos.innerHTML += `
      <div class="col-sm-6 col-lg-4 col-xl-3">
        <article class="card card-gamer">
          <a href="detalle-producto.html?codigo=${producto.codigo}">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.onerror=null; this.src='img/banner.svg';">
          </a>
          <div class="card-body d-flex flex-column">
            <small class="text-muted-custom">${producto.categoria}</small>
            <h5 class="card-title mt-1">${producto.nombre}</h5>
            <p class="price">${formatearPrecio(producto.precio)}</p>
            <div class="mt-auto d-grid gap-2">
              <a class="btn btn-outline-light" href="detalle-producto.html?codigo=${producto.codigo}">Ver detalle</a>
              <button class="btn btn-neon" onclick="agregarAlCarrito('${producto.codigo}')">Añadir</button>
            </div>
          </div>
        </article>
      </div>
    `;
  });
}

function cargarCategorias() {
  const categorias = [];

  productos.forEach(function(producto) {
    if (!categorias.includes(producto.categoria)) {
      categorias.push(producto.categoria);
    }
  });

  categorias.forEach(function(categoria) {
    filtroCategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`;
  });
}

filtroCategoria.addEventListener("change", function() {
  const categoria = filtroCategoria.value;

  if (categoria === "Todos") {
    mostrarProductos(productos);
  } else {
    const filtrados = productos.filter(function(producto) {
      return producto.categoria === categoria;
    });

    mostrarProductos(filtrados);
  }
});

cargarCategorias();
mostrarProductos(productos);

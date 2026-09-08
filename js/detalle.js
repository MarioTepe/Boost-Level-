const parametros = new URLSearchParams(window.location.search);
const codigo = parametros.get("codigo") || "JM001";

const producto = productos.find(function(item) {
  return item.codigo === codigo;
});

const detalle = document.querySelector("#detalleProducto");

if (!producto) {
  detalle.innerHTML = "<p>Producto no encontrado.</p>";
} else {
  detalle.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-lg-6">
        <img src="${producto.imagen}" class="product-detail-image" alt="${producto.nombre}" onerror="this.onerror=null; this.src='img/banner.svg';">
      </div>
      <div class="col-lg-6">
        <small class="text-muted-custom">${producto.codigo} · ${producto.categoria}</small>
        <h1 class="mt-2">${producto.nombre}</h1>
        <p class="price fs-2">${formatearPrecio(producto.precio)}</p>
        <p class="text-muted-custom">${producto.descripcion}</p>
        <p>Stock disponible: <strong>${producto.stock}</strong></p>
        <button class="btn btn-neon btn-lg" onclick="agregarAlCarrito('${producto.codigo}')">
          Añadir al carrito
        </button>
      </div>
    </div>
  `;
}

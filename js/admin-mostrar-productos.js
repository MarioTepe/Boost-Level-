const parametros = new URLSearchParams(window.location.search);

const codigo = parametros.get("codigo");


const producto = productos.find(function(item) {

  return item.codigo === codigo;

});


const detalleAdmin = document.querySelector("#detalleAdmin");


if (!producto) {

  detalleAdmin.innerHTML =
    "<p>Producto no encontrado.</p>";

} else {

  detalleAdmin.innerHTML = `

    <div class="row g-4">

      <div class="col-md-5">

        <img
          src="../${producto.imagen}"
          class="img-fluid rounded"
          alt="${producto.nombre}"
          onerror="this.onerror=null; this.src='../img/banner.svg';">

      </div>


      <div class="col-md-7">

        <p>
          <strong>Código:</strong>
          ${producto.codigo}
        </p>

        <p>
          <strong>Nombre:</strong>
          ${producto.nombre}
        </p>

        <p>
          <strong>Categoría:</strong>
          ${producto.categoria}
        </p>

        <p>
          <strong>Precio:</strong>
          ${formatearPrecio(producto.precio)}
        </p>

        <p>
          <strong>Stock:</strong>
          ${producto.stock}
        </p>

        <p>
          <strong>Descripción:</strong>
          ${producto.descripcion}
        </p>


        <a
          href="editar-producto.html?codigo=${producto.codigo}"
          class="btn btn-outline-warning">

          Editar

        </a>

      </div>

    </div>

  `;

}
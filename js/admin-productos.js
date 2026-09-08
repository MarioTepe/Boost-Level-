const tablaProductos = document.querySelector("#tablaProductos");

productos.forEach(function(producto) {

  tablaProductos.innerHTML += `
    <tr>

      <td>${producto.codigo}</td>

      <td>${producto.nombre}</td>

      <td>${formatearPrecio(producto.precio)}</td>

      <td>${producto.stock}</td>

      <td>

        <a
          class="btn btn-sm btn-outline-light"
          href="mostrar-producto.html?codigo=${producto.codigo}">
          Ver
        </a>

        <a
          class="btn btn-sm btn-outline-warning"
          href="editar-producto.html?codigo=${producto.codigo}">
          Editar
        </a>

      </td>

    </tr>
  `;

});
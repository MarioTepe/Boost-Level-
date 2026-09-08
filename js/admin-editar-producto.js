const parametrosEditar =
  new URLSearchParams(window.location.search);


const codigoEditar =
  parametrosEditar.get("codigo");


if (codigoEditar) {


  const productoEditar =
    productos.find(function(item) {

      return item.codigo === codigoEditar;

    });


  if (productoEditar) {


    document.querySelector("#codigo").value =
      productoEditar.codigo;


    document.querySelector("#nombre").value =
      productoEditar.nombre;


    document.querySelector("#descripcion").value =
      productoEditar.descripcion;


    document.querySelector("#precio").value =
      productoEditar.precio;


    document.querySelector("#stock").value =
      productoEditar.stock;


    document.querySelector("#categoria").value =
      productoEditar.categoria;


  }

}
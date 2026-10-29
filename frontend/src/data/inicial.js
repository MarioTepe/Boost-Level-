import { productos } from './productos.js'
import { categorias } from './categorias.js'
import { usuariosDemo } from './usuarios.demo.js'

export function crearDatosIniciales() {
  return structuredClone({
    schemaVersion: 1,
    revision: 0,
    ofertasInicialesAplicadas: true,
    productos,
    categorias,
    usuarios: usuariosDemo,
    carrito: [],
    pedidos: [],
  })
}

export function aplicarOfertasIniciales(estado) {
  if (estado.ofertasInicialesAplicadas) return estado
  return {
    ...estado,
    revision: estado.revision + 1,
    ofertasInicialesAplicadas: true,
    productos: estado.productos.map((producto) => {
      const inicial = productos.find((p) => p.id === producto.id)
      if (
        inicial &&
        producto.activo &&
        producto.precioOferta === null &&
        inicial.precioOferta !== null &&
        producto.precio === inicial.precio
      )
        return { ...producto, precioOferta: inicial.precioOferta }
      return producto
    }),
  }
}

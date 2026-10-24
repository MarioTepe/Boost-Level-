import { productos } from './productos.js'
import { categorias } from './categorias.js'
import { usuariosDemo } from './usuarios.demo.js'

export function crearDatosIniciales() {
  return structuredClone({
    schemaVersion: 1,
    revision: 0,
    productos,
    categorias,
    usuarios: usuariosDemo,
    carrito: [],
    pedidos: [],
  })
}

import { exigir } from './errores.js'

const objeto = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const texto = (value) => typeof value === 'string' && value.length > 0
const natural = (value) => Number.isSafeInteger(value) && value >= 0
const cadena = (value) => typeof value === 'string'
const contactoValido = (value) =>
  objeto(value) && ['nombre', 'apellidos', 'correo'].every((k) => texto(value[k]))
const unicos = (items) => new Set(items.map((i) => i.id)).size === items.length
const coleccion = (value) =>
  Array.isArray(value) && value.every((v) => objeto(v) && texto(v.id)) && unicos(value)

export function validarEstado(e) {
  exigir(
    objeto(e) && e.schemaVersion === 1 && natural(e.revision),
    'ESQUEMA_INVALIDO',
    'Los datos guardados tienen un formato o versión no compatible.',
  )
  exigir(
    ['productos', 'categorias', 'usuarios', 'pedidos'].every((k) => coleccion(e[k])) &&
      Array.isArray(e.carrito),
    'ESQUEMA_INVALIDO',
    'La estructura de datos guardados está incompleta o tiene identificadores duplicados.',
  )
  const categorias = e.categorias.every((c) => texto(c.nombre) && typeof c.activo === 'boolean')
  const productos =
    e.productos.every(
      (p) =>
        texto(p.codigo) &&
        texto(p.nombre) &&
        cadena(p.descripcion) &&
        cadena(p.imagen) &&
        e.categorias.some((c) => c.id === p.categoriaId) &&
        natural(p.precio) &&
        natural(p.stock) &&
        (p.precioOferta === null || (natural(p.precioOferta) && p.precioOferta < p.precio)) &&
        (p.umbralCritico === null || natural(p.umbralCritico)) &&
        typeof p.activo === 'boolean',
    ) && new Set(e.productos.map((p) => p.codigo.toUpperCase())).size === e.productos.length
  const usuarios =
    e.usuarios.every(
      (u) =>
        texto(u.correo) &&
        texto(u.nombre) &&
        cadena(u.apellidos) &&
        texto(u.claveDemo) &&
        ['regionId', 'comunaId', 'direccion'].every((k) => cadena(u[k])) &&
        (u.run === null || cadena(u.run)) &&
        (u.fechaNacimiento === null || cadena(u.fechaNacimiento)) &&
        ['admin', 'cliente'].includes(u.rol) &&
        typeof u.activo === 'boolean',
    ) && new Set(e.usuarios.map((u) => u.correo)).size === e.usuarios.length
  const carrito =
    e.carrito.every(
      (l) => objeto(l) && texto(l.productoId) && Number.isSafeInteger(l.cantidad) && l.cantidad > 0,
    ) && new Set(e.carrito.map((l) => l.productoId)).size === e.carrito.length
  const pedidos = e.pedidos.every(
    (p) =>
      texto(p.intentoId) &&
      p.estado === 'CONFIRMADO' &&
      !Number.isNaN(Date.parse(p.creadoEn)) &&
      contactoValido(p.contacto) &&
      objeto(p.entrega) &&
      ['domicilio', 'retiro'].includes(p.entrega.modalidad) &&
      ['regionId', 'comunaId', 'direccion'].every((k) => cadena(p.entrega[k])) &&
      Array.isArray(p.lineas) &&
      p.lineas.length > 0 &&
      p.lineas.every(
        (l) =>
          texto(l.productoId) &&
          texto(l.codigo) &&
          texto(l.nombre) &&
          natural(l.precioLista) &&
          natural(l.precioUnitario) &&
          Number.isSafeInteger(l.cantidad) &&
          l.cantidad > 0 &&
          natural(l.subtotal) &&
          l.subtotal === l.precioUnitario * l.cantidad,
      ) &&
      [p.subtotal, p.descuento, p.costoEntrega, p.total].every(natural) &&
      p.subtotal === p.lineas.reduce((s, l) => s + l.subtotal, 0) &&
      p.descuento <= p.subtotal &&
      p.total === p.subtotal - p.descuento + p.costoEntrega,
  )
  exigir(
    categorias &&
      productos &&
      usuarios &&
      carrito &&
      pedidos &&
      new Set(e.pedidos.map((p) => p.intentoId)).size === e.pedidos.length,
    'ESQUEMA_INVALIDO',
    'Hay cantidades, referencias o importes inválidos en los datos guardados.',
  )
  return e
}

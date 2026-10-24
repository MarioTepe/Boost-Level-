import { exigir } from './errores.js'

export function carritoReducer(lineas, accion) {
  if (accion.tipo === 'VACIAR') return []
  if (accion.tipo === 'ELIMINAR') return lineas.filter((l) => l.productoId !== accion.productoId)
  const { producto } = accion
  exigir(producto?.activo, 'NO_ENCONTRADO', 'El producto ya no está disponible.')
  const actual = lineas.find((l) => l.productoId === producto.id)
  const cantidad = accion.tipo === 'AGREGAR' ? (actual?.cantidad || 0) + 1 : accion.cantidad
  exigir(['AGREGAR', 'CAMBIAR'].includes(accion.tipo), 'VALIDACION', 'Acción de carrito desconocida.')
  exigir(
    Number.isSafeInteger(cantidad) && cantidad > 0,
    'VALIDACION',
    'La cantidad debe ser un número entero mayor a cero.',
  )
  exigir(
    cantidad <= producto.stock,
    'SIN_STOCK',
    `Solo hay ${producto.stock} unidades de ${producto.nombre}.`,
  )
  return actual
    ? lineas.map((l) => (l.productoId === producto.id ? { ...l, cantidad } : l))
    : [...lineas, { productoId: producto.id, cantidad }]
}

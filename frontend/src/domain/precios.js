export const precioVigente = (producto) => producto.precioOferta ?? producto.precio
export const tieneDescuento = (usuario) =>
  Boolean(usuario?.activo && usuario.rol === 'cliente' && usuario.correo.split('@')[1] === 'duoc.cl')

export function resumirCarrito(estado, usuario = null) {
  const lineas = estado.carrito.map((linea) => {
    const producto = estado.productos.find((p) => p.id === linea.productoId)
    let error = ''
    if (!producto?.activo) error = 'Este producto ya no está disponible. Elimínalo para continuar.'
    else if (linea.cantidad > producto.stock)
      error = `Solo quedan ${producto.stock} unidades. Ajusta la cantidad.`
    return {
      ...linea,
      producto,
      precio: producto ? precioVigente(producto) : 0,
      subtotal: producto ? precioVigente(producto) * linea.cantidad : 0,
      error,
    }
  })
  const subtotal = lineas.reduce((sum, l) => sum + l.subtotal, 0)
  const descuento = tieneDescuento(usuario) ? Math.round(subtotal * 0.2) : 0
  const total = subtotal - descuento
  const firma = JSON.stringify({
    lineas: lineas.map((l) => [l.productoId, l.cantidad, l.precio]),
    descuento,
    total,
  })
  return {
    lineas,
    subtotal,
    descuento,
    costoEntrega: 0,
    total,
    firma,
    cantidad: lineas.reduce((s, l) => s + l.cantidad, 0),
    valido: lineas.length > 0 && lineas.every((l) => !l.error),
  }
}

export function indicadores(estado) {
  const pedidos = estado.pedidos.filter((p) => p.estado === 'CONFIRMADO')
  const criticos = estado.productos.filter(
    (p) => p.activo && p.umbralCritico !== null && p.stock <= p.umbralCritico,
  )
  return { pedidos, criticos, ventas: pedidos.reduce((sum, p) => sum + p.total, 0) }
}

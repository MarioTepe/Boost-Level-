import { exigir } from './errores.js'
import { resumirCarrito } from './precios.js'
import { validarEntrega } from './validaciones.js'

export function prepararCompra(estado, solicitud, usuario) {
  exigir(
    typeof solicitud.intentoId === 'string' && solicitud.intentoId.length > 0,
    'VALIDACION',
    'El intento de compra no es válido.',
  )
  validarEntrega(solicitud.contacto, solicitud.entrega)
  const resumen = resumirCarrito(estado, usuario)
  exigir(resumen.lineas.length, 'VALIDACION', 'Agrega un producto antes de comprar.')
  exigir(resumen.valido, 'SIN_STOCK', 'El carrito cambió o hay productos sin stock. Revisa las cantidades.')
  exigir(
    resumen.firma === solicitud.resumenAceptado,
    'PRECIO_CAMBIO',
    'El precio o descuento cambió. Revisa el nuevo resumen antes de confirmar.',
  )
  exigir(Number.isSafeInteger(resumen.total) && resumen.total >= 0, 'VALIDACION', 'El total no es válido.')
  return resumen
}
export function aplicarCompra(estado, solicitud, usuario, ahora, pedidoId) {
  const resumen = prepararCompra(estado, solicitud, usuario)
  const pedido = {
    id: pedidoId,
    intentoId: solicitud.intentoId,
    creadoEn: ahora,
    clienteId: usuario?.id || null,
    contacto: { ...solicitud.contacto },
    entrega:
      solicitud.entrega.modalidad === 'retiro'
        ? { modalidad: 'retiro', regionId: '', comunaId: '', direccion: '', costo: 0 }
        : { ...solicitud.entrega, costo: 0 },
    lineas: resumen.lineas.map((l) => ({
      productoId: l.productoId,
      codigo: l.producto.codigo,
      nombre: l.producto.nombre,
      precioLista: l.producto.precio,
      precioUnitario: l.precio,
      cantidad: l.cantidad,
      subtotal: l.subtotal,
    })),
    subtotal: resumen.subtotal,
    descuento: resumen.descuento,
    costoEntrega: 0,
    total: resumen.total,
    estado: 'CONFIRMADO',
  }
  return {
    ...estado,
    productos: estado.productos.map((p) => ({
      ...p,
      stock: p.stock - (estado.carrito.find((l) => l.productoId === p.id)?.cantidad || 0),
    })),
    carrito: [],
    pedidos: [...estado.pedidos, pedido],
  }
}

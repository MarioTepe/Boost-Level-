import { describe, expect, it } from 'vitest'
import { crearDatosIniciales } from '../data/inicial.js'
import { carritoReducer } from './carrito.reducer.js'
import { indicadores, resumirCarrito } from './precios.js'
import { validarUsuario } from './validaciones.js'
import { ErrorTienda } from './errores.js'
import { usuarioValido } from '../test/factories.js'

describe('Reglas principales del carrito', () => {
  it('agrega unidades sin modificar el carrito anterior', () => {
    const producto = crearDatosIniciales().productos[0]
    const original = [{ productoId: 'MO001', cantidad: 1 }]

    const primera = carritoReducer(original, { tipo: 'AGREGAR', producto })
    const segunda = carritoReducer(primera, { tipo: 'AGREGAR', producto })

    expect(original).toEqual([{ productoId: 'MO001', cantidad: 1 }])
    expect(segunda).toEqual([
      { productoId: 'MO001', cantidad: 1 },
      { productoId: 'JM001', cantidad: 2 },
    ])
  })

  it('acepta el stock máximo y rechaza una unidad adicional', () => {
    const producto = crearDatosIniciales().productos[0]

    const carrito = carritoReducer([], { tipo: 'CAMBIAR', producto, cantidad: 15 })

    expect(carrito[0].cantidad).toBe(15)
    expect(() => carritoReducer(carrito, { tipo: 'AGREGAR', producto })).toThrow(/15 unidades/)
    expect(carrito[0].cantidad).toBe(15)
  })

  it('calcula el total y aplica el descuento al cliente Duoc', () => {
    const estado = crearDatosIniciales()
    estado.carrito = [{ productoId: 'JM001', cantidad: 2 }]
    const cliente = { activo: true, rol: 'cliente', correo: 'prueba@duoc.cl' }

    const invitado = resumirCarrito(estado)
    const registrado = resumirCarrito(estado, cliente)

    expect(invitado).toMatchObject({ subtotal: 59980, descuento: 0, total: 59980 })
    expect(registrado).toMatchObject({ subtotal: 59980, descuento: 11996, total: 47984 })
  })
})

describe('Validación y reportes', () => {
  it('normaliza el RUN y correo de un usuario válido', () => {
    const datos = { ...usuarioValido, run: '12.345.678-k', correo: ' PRUEBA@DUOC.CL ' }

    const usuario = validarUsuario(datos, [], null, new Date(2026, 9, 26))

    expect(usuario).toEqual({ run: '12345678K', correo: 'prueba@duoc.cl' })
  })

  it('rechaza el registro de un menor de edad', () => {
    const datos = { ...usuarioValido, fechaNacimiento: '2008-10-27' }
    const hoy = new Date(2026, 9, 26)

    expect(() => validarUsuario(datos, [], null, hoy)).toThrow(ErrorTienda)
  })

  it('calcula ventas confirmadas y productos con stock crítico', () => {
    const estado = crearDatosIniciales()
    estado.productos[0].umbralCritico = 15
    estado.pedidos = [
      { estado: 'CONFIRMADO', total: 29990 },
      { estado: 'RECHAZADO', total: 10000 },
    ]

    const reporte = indicadores(estado)

    expect(reporte.ventas).toBe(29990)
    expect(reporte.criticos).toEqual([expect.objectContaining({ id: 'JM001' })])
  })
})

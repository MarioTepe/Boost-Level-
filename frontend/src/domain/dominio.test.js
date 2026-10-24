import { describe, expect, it } from 'vitest'
import { crearDatosIniciales } from '../data/inicial.js'
import { carritoReducer } from './carrito.reducer.js'
import { indicadores, precioVigente, resumirCarrito, tieneDescuento } from './precios.js'

import {
  validarContacto,
  validarEntrega,
  validarProducto,
  validarUsuario,
  normalizarCorreo,
  normalizarRun,
  correoValido,
} from './validaciones.js'

import { validarEstado } from './esquema.js'
import { ErrorTienda, fallo } from './errores.js'

import { usuarioValido } from '../test/factories.js'
import { fechaCorta, imagen, moneda } from '../utils/moneda.js'

describe('TU-01 a TU-06: reglas puras del carrito', () => {
  const producto = crearDatosIniciales().productos[0]
  it('agrega sin mutar, incrementa y conserva otras líneas', () => {
    const original = Object.freeze([{ productoId: 'OTRO', cantidad: 2 }])
    const primera = carritoReducer(original, { tipo: 'AGREGAR', producto })
    const segunda = carritoReducer(primera, { tipo: 'AGREGAR', producto })
    expect(original).toEqual([{ productoId: 'OTRO', cantidad: 2 }])
    expect(segunda).toEqual([
      { productoId: 'OTRO', cantidad: 2 },
      { productoId: 'JM001', cantidad: 2 },
    ])
  })
  it('acepta exactamente el stock y rechaza 16 para stock 15', () => {
    const alLimite = carritoReducer([], { tipo: 'CAMBIAR', producto, cantidad: 15 })
    expect(alLimite[0].cantidad).toBe(15)
    expect(() => carritoReducer(alLimite, { tipo: 'AGREGAR', producto })).toThrow(/15 unidades/)
    expect(alLimite[0].cantidad).toBe(15)
  })
  it.each([0, -1, 1.5, NaN, Infinity, '2'])('rechaza cantidad inválida %s', (cantidad) => {
    expect(() => carritoReducer([], { tipo: 'CAMBIAR', producto, cantidad })).toThrow(/entero/)
  })
  it.each([undefined, { ...producto, activo: false }])('rechaza desconocido/inactivo', (producto) =>
    expect(() => carritoReducer([], { tipo: 'AGREGAR', producto })).toThrow(/no está disponible/),
  )
  it('rechaza agotado y acción desconocida; quita y vacía', () => {
    expect(() => carritoReducer([], { tipo: 'AGREGAR', producto: { ...producto, stock: 0 } })).toThrow(
      /0 unidades/,
    )
    expect(() => carritoReducer([], { tipo: 'X', producto })).toThrow(/desconocida/)
    const lineas = [
      { productoId: 'JM001', cantidad: 3 },
      { productoId: 'AC001', cantidad: 1 },
    ]
    expect(carritoReducer(lineas, { tipo: 'ELIMINAR', productoId: 'JM001' })).toEqual([
      { productoId: 'AC001', cantidad: 1 },
    ])
    expect(carritoReducer(lineas, { tipo: 'VACIAR' })).toEqual([])
  })
})
describe('TU-07/TU-13/TU-20/TU-21/TU-23: precios y selectores', () => {
  it('calcula totales independientes y formato CLP', () => {
    const e = crearDatosIniciales()
    e.productos[1].precio = 10000
    e.carrito = [
      { productoId: 'JM001', cantidad: 2 },
      { productoId: 'MO001', cantidad: 1 },
    ]
    expect(resumirCarrito(e)).toMatchObject({
      subtotal: 69980,
      total: 69980,
      descuento: 0,
      cantidad: 3,
      valido: true,
    })
    const u = { ...usuarioValido, activo: true, rol: 'cliente' }
    expect(resumirCarrito(e, u)).toMatchObject({ subtotal: 69980, descuento: 13996, total: 55984 })
    expect(moneda(29990).replace(/\s/g, '')).toBe('$29.990')
    expect(moneda(0).replace(/\s/g, '')).toBe('$0')
    expect(moneda(1299990).replace(/\s/g, '')).toBe('$1.299.990')
    expect(fechaCorta('2026-10-23T15:00:00Z')).toContain('2026')
    expect(imagen('img/logo.svg')).toContain('img/logo.svg')
  })
  it.each([
    null,
    { activo: false, rol: 'cliente', correo: 'a@duoc.cl' },
    { activo: true, rol: 'admin', correo: 'a@duoc.cl' },
    { activo: true, rol: 'cliente', correo: 'a@gmail.com' },
    { activo: true, rol: 'cliente', correo: 'a@profesor.duoc.cl' },
    { activo: true, rol: 'cliente', correo: 'a@falsoduoc.cl' },
  ])('no concede descuento a quien no corresponde', (usuario) => expect(tieneDescuento(usuario)).toBe(false))
  it('usa oferta, redondea, conserva productos gratuitos y señala referencias obsoletas', () => {
    const e = crearDatosIniciales()
    const p = e.productos[0]
    p.precioOferta = 1
    e.carrito = [{ productoId: p.id, cantidad: 1 }]
    expect(precioVigente(p)).toBe(1)
    expect(resumirCarrito(e, { ...usuarioValido, activo: true, rol: 'cliente' })).toMatchObject({
      total: 1,
      descuento: 0,
    })
    p.precioOferta = 0
    expect(resumirCarrito(e).valido).toBe(true)
    p.stock = 0
    expect(resumirCarrito(e).lineas[0].error).toMatch(/Solo quedan/)
    e.carrito = [{ productoId: 'ausente', cantidad: 1 }]
    expect(resumirCarrito(e).lineas[0]).toMatchObject({
      subtotal: 0,
      precio: 0,
      error: expect.stringContaining('no está disponible'),
    })
    e.carrito = []
    expect(resumirCarrito(e)).toMatchObject({ valido: false, total: 0 })
  })
  it('críticos usa umbral inclusivo, excluye null/inactivos y suma solo confirmados', () => {
    const e = crearDatosIniciales()
    e.productos[0].umbralCritico = 15
    e.productos[1].umbralCritico = 15
    e.productos[1].activo = false
    e.pedidos = [
      { estado: 'CONFIRMADO', total: 100 },
      { estado: 'RECHAZADO', total: 200 },
    ]
    expect(indicadores(e)).toMatchObject({
      ventas: 100,
      criticos: [expect.objectContaining({ id: 'JM001' })],
    })
    expect(indicadores(crearDatosIniciales()).ventas).toBe(0)
  })
})
describe('TU-14/TU-16/TU-22/TU-25: validaciones', () => {
  const hoy = new Date(2026, 9, 23)
  it('normaliza identificadores y valida usuario/entrega/contacto correctos', () => {
    expect(normalizarRun('12.345.678-k')).toBe('12345678K')
    expect(normalizarRun(null)).toBe('')
    expect(normalizarCorreo('  PERSONA@DUOC.CL ')).toBe('persona@duoc.cl')
    expect(normalizarCorreo(null)).toBe('')
    expect(correoValido('a@duoc.cl.evil')).toBe(false)
    expect(validarUsuario(usuarioValido, [], null, hoy)).toEqual({
      run: '12345678K',
      correo: 'prueba@duoc.cl',
    })
    expect(() =>
      validarUsuario({ ...usuarioValido, fechaNacimiento: '2008-10-23' }, [], null, hoy),
    ).not.toThrow()
    expect(() =>
      validarUsuario({ ...usuarioValido, fechaNacimiento: '2008-10-22' }, [], null, hoy),
    ).not.toThrow()
    expect(() => validarEntrega(usuarioValido, { modalidad: 'retiro' })).not.toThrow()
    expect(() =>
      validarContacto({ nombre: 'Demo', correo: 'x@gmail.com', comentario: 'Consulta ficticia' }),
    ).not.toThrow()
    expect(validarProducto(crearDatosIniciales().productos[0], crearDatosIniciales(), 'JM001')).toBe('JM001')
  })
  it.each([
    ['run', 'X'],
    ['nombre', ''],
    ['nombre', 'x'.repeat(51)],
    ['apellidos', ''],
    ['correo', 'x@otros.cl'],
    ['claveDemo', '123'],
    ['claveDemo', '12345678901'],
    ['confirmacion', 'diferente'],
    ['fechaNacimiento', '2008-10-24'],
    ['fechaNacimiento', '2026-10-24'],
    ['fechaNacimiento', '2000-02-31'],
    ['fechaNacimiento', ''],
    ['regionId', ''],
    ['comunaId', 'COMUNA INEXISTENTE'],
    ['direccion', ''],
    ['direccion', 'x'.repeat(301)],
  ])('señala campo inválido %s=%s', (key, value) => {
    try {
      validarUsuario({ ...usuarioValido, [key]: value }, [], null, hoy)
      throw new Error('Debió fallar')
    } catch (error) {
      expect(error.campos).toHaveProperty(key)
    }
  })
  it('rechaza duplicados normalizados, permite edición propia y detecta campos vacíos', () => {
    const existentes = [{ ...usuarioValido, id: 'u' }]
    expect(() => validarUsuario(usuarioValido, existentes, null, hoy)).toThrow()
    expect(() => validarUsuario(usuarioValido, existentes, 'u', hoy)).not.toThrow()
    expect(() => validarUsuario({}, [], null, hoy)).toThrow(ErrorTienda)
    expect(() => validarEntrega({ nombre: '', apellidos: '', correo: '' }, { modalidad: 'X' })).toThrow(
      ErrorTienda,
    )
    expect(() => validarContacto({ nombre: '', correo: '', comentario: '' })).toThrow(ErrorTienda)
  })
  it.each([
    ['codigo', 'X'],
    ['codigo', '***'],
    ['nombre', ''],
    ['descripcion', 'x'.repeat(501)],
    ['precio', -1],
    ['stock', 1.1],
    ['precioOferta', 29990],
    ['precioOferta', -1],
    ['umbralCritico', -1],
    ['categoriaId', 'ausente'],
    ['imagen', 'https://invalido.example/a.png'],
  ])('producto inválido %s', (key, value) => {
    const e = crearDatosIniciales()
    expect(() => validarProducto({ ...e.productos[0], [key]: value }, e, 'JM001')).toThrow(ErrorTienda)
  })
  it('producto duplicado y datos incompletos se rechazan', () => {
    const e = crearDatosIniciales()
    expect(() => validarProducto(e.productos[0], e)).toThrow()
    expect(() =>
      validarProducto({ precio: 0, stock: 0, precioOferta: null, umbralCritico: null, imagen: '' }, e),
    ).toThrow()
  })
})
describe('TU-08/TU-18: esquema y errores', () => {
  it('valida estado inicial y expone errores esperados/técnicos', () => {
    const e = crearDatosIniciales()
    expect(validarEstado(e)).toBe(e)
    expect(fallo(new ErrorTienda('X', 'Mensaje', { nombre: 'error' }))).toMatchObject({
      error: { codigo: 'X', mensaje: 'Mensaje', campos: { nombre: 'error' } },
    })
    expect(fallo(new Error('socket'))).toMatchObject({ error: { codigo: 'PERSISTENCIA', campos: {} } })
  })
  it.each([null, [], {}, { schemaVersion: 2, revision: 0 }, { schemaVersion: 1, revision: -1 }])(
    'rechaza cabecera inválida',
    (value) => expect(() => validarEstado(value)).toThrow(ErrorTienda),
  )
  it.each([
    (e) => {
      e.productos = null
    },
    (e) => {
      e.productos = [null]
    },
    (e) => {
      e.productos[0].id = ''
    },
    (e) => {
      e.productos.push(e.productos[0])
    },
    (e) => {
      e.categorias[0].nombre = ''
    },
    (e) => {
      e.productos[0].categoriaId = 'no'
    },
    (e) => {
      e.productos[0].precioOferta = 999999
    },
    (e) => {
      e.productos[0].stock = -1
    },
    (e) => {
      e.usuarios[0].rol = 'vendedor'
    },
    (e) => {
      e.carrito = [{ productoId: 'JM001', cantidad: 0 }]
    },
    (e) => {
      e.carrito = [
        { productoId: 'JM001', cantidad: 1 },
        { productoId: 'JM001', cantidad: 1 },
      ]
    },
    (e) => {
      e.pedidos = [{ id: 'sin-datos' }]
    },
    (e) => {
      e.productos[0].descripcion = { texto: 'dato roto' }
    },
    (e) => {
      e.usuarios[0].apellidos = { texto: 'dato roto' }
    },
    (e) => {
      e.productos[1].codigo = e.productos[0].codigo
    },
    (e) => {
      e.usuarios[1].correo = e.usuarios[0].correo
    },
  ])('rechaza contenido corrupto sin confiar en su forma', (editar) => {
    const e = crearDatosIniciales()
    editar(e)
    expect(() => validarEstado(e)).toThrow(ErrorTienda)
  })
})

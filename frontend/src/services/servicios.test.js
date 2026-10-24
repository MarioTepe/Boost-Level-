import { describe, expect, it, vi } from 'vitest'
import { crearServicios } from './tienda.service.js'
import { cerrarSesion, iniciarSesion, leerSesion } from './sesion.service.js'

import { crearRepositorio } from '../repositories/tienda.repository.js'
import { crearStorage, CLAVE_SESION, CLAVE_TIENDA } from '../repositories/storage.adapter.js'

import { preparar, solicitud, storageMemoria, usuarioValido } from '../test/factories.js'

import { resumirCarrito } from '../domain/precios.js'
import { validarEstado } from '../domain/esquema.js'

const reloj = () => new Date('2026-10-23T15:00:00Z')
function entorno(editar = () => {}, admin = true) {
  const { repo, storage } = preparar({ editar })
  let n = 0
  const servicios = crearServicios(repo, {
    usuarioId: () => (admin ? 'admin-demo' : null),
    id: () => `test-${++n}`,
    ahora: reloj,
  })
  return { repo, storage, servicios }
}
describe('repositorio: carga, persistencia y recuperación', () => {
  it('carga inicial sin escribir, mantiene copia, notifica y permite cancelar suscripción', () => {
    const { repo, storage } = entorno()
    expect(storage.leer(CLAVE_TIENDA)).toBeNull()
    const listener = vi.fn()
    const salir = repo.suscribir(listener)
    const lectura = repo.leerEstado()
    lectura.productos[0].stock = 1000
    expect(repo.leerEstado().productos[0].stock).toBe(15)
    repo.actualizar((e) => ({ ...e, carrito: [{ productoId: 'JM001', cantidad: 1 }] }))
    expect(listener).toHaveBeenCalledTimes(1)
    expect(JSON.parse(storage.leer(CLAVE_TIENDA)).revision).toBe(1)
    const recarga = crearRepositorio(storage)
    expect(recarga.getSnapshot().estado.carrito).toEqual([{ productoId: 'JM001', cantidad: 1 }])
    salir()
    repo.restablecer()
    expect(listener).toHaveBeenCalledTimes(1)
    expect(repo.getSnapshot().estado.carrito).toEqual([])
  })
  it.each(['invalid', '{}', 'null', '{"schemaVersion":42,"revision":0}'])(
    'no sobreescribe datos inválidos %s',
    (raw) => {
      const storage = storageMemoria()
      storage.guardar(CLAVE_TIENDA, raw)
      const repo = crearRepositorio(storage)
      expect(repo.getSnapshot().error.codigo).toBe('ESQUEMA_INVALIDO')
      expect(storage.leer(CLAVE_TIENDA)).toBe(raw)
      expect(() => repo.actualizar((e) => e)).toThrow()
      repo.restablecer()
      expect(repo.getSnapshot().error).toBeNull()
    },
  )
  it('falla lectura/escritura de forma recuperable sin publicar cambios', () => {
    const storage = {
      leer: () => {
        throw new Error('bloqueado')
      },
      guardar: () => {
        throw new Error('cuota')
      },
    }
    const repo = crearRepositorio(storage)
    expect(repo.getSnapshot().error.codigo).toBe('PERSISTENCIA')
    expect(() => repo.restablecer()).toThrow('cuota')
    const inicial = repo.getSnapshot().estado
    expect(() => repo.actualizar((e) => e)).toThrow('bloqueado')
    expect(repo.getSnapshot().estado).toBe(inicial)
  })
  it('adaptador soporta lectura, escritura y eliminación', () => {
    const adapter = crearStorage(() => window.localStorage)
    adapter.guardar('x', 'dato')
    expect(adapter.leer('x')).toBe('dato')
    adapter.eliminar('x')
    expect(adapter.leer('x')).toBeNull()
  })
})
describe('sesión demo, registro y autorización', () => {
  it('registra cliente normalizado, inicia sesión y cierra sesión', () => {
    const { repo, servicios } = entorno()
    expect(servicios.registrar({ ...usuarioValido, correo: ' PRUEBA@DUOC.CL ', rol: 'admin' }).ok).toBe(true)
    expect(repo.leerEstado().usuarios.at(-1)).toMatchObject({ rol: 'cliente', correo: 'prueba@duoc.cl' })
    const session = storageMemoria()
    expect(leerSesion(session)).toEqual({ usuarioId: null, error: null })
    const result = iniciarSesion(repo, session, 'prueba@duoc.cl', '1234')
    expect(result.ok).toBe(true)
    expect(leerSesion(session).usuarioId).toBe(result.data.id)
    expect(cerrarSesion(session).ok).toBe(true)
    expect(leerSesion(session).usuarioId).toBeNull()
    expect(iniciarSesion(repo, session, 'prueba@duoc.cl', 'MALA').error.codigo).toBe('ACCESO_DENEGADO')
    expect(servicios.registrar(usuarioValido).error.codigo).toBe('VALIDACION')
  })
  it('sesión malformada o storage bloqueado no se interpreta como autenticada', () => {
    const s = storageMemoria()
    s.guardar(CLAVE_SESION, '{}')
    expect(leerSesion(s).error.codigo).toBe('ESQUEMA_INVALIDO')
    s.guardar(CLAVE_SESION, 'invalid')
    expect(leerSesion(s).usuarioId).toBeNull()
    const malo = {
      leer: () => {
        throw new Error('no')
      },
      guardar: () => {
        throw new Error('no')
      },
      eliminar: () => {
        throw new Error('no')
      },
    }
    expect(leerSesion(malo).error.codigo).toBe('PERSISTENCIA')
    expect(cerrarSesion(malo).ok).toBe(false)
    expect(iniciarSesion(entorno().repo, malo, 'admin@duoc.cl', '1234').ok).toBe(false)
  })
  it('bloquea comandos sin admin o con admin desactivado', () => {
    const { servicios } = entorno(() => {}, false)
    expect(servicios.guardarCategoria('Prueba').error.codigo).toBe('ACCESO_DENEGADO')
    const inactivo = entorno((e) => {
      e.usuarios[0].activo = false
    })
    expect(inactivo.servicios.desactivarProducto('JM001').ok).toBe(false)
  })
})
describe('CRUD administrativo compartido', () => {
  it('crea/edita/desactiva producto, conserva catálogo y no cambia el código', () => {
    const { repo, servicios } = entorno()
    const base = {
      ...repo.leerEstado().productos[0],
      codigo: 'NEW001',
      nombre: 'Nuevo',
      precio: 20000,
      precioOferta: 15000,
    }
    expect(servicios.guardarProducto(base).ok).toBe(true)
    expect(repo.leerEstado().productos.at(-1)).toMatchObject({ id: 'NEW001', precioOferta: 15000 })
    expect(servicios.guardarProducto({ ...base, nombre: 'Editado' }, 'NEW001').ok).toBe(true)
    expect(servicios.guardarProducto({ ...base, codigo: 'CAMBIO' }, 'NEW001').ok).toBe(false)
    expect(servicios.guardarProducto(base, 'AUSENTE').error.codigo).toBe('NO_ENCONTRADO')
    expect(servicios.guardarProducto(base).ok).toBe(false)
    expect(servicios.desactivarProducto('NEW001').ok).toBe(true)
    expect(repo.leerEstado().productos.at(-1).activo).toBe(false)
    expect(servicios.desactivarProducto('AUSENTE').ok).toBe(false)
  })
  it('crea/edita categoría y bloquea vacío, duplicado, ausente y asociaciones activas', () => {
    const { repo, servicios } = entorno()
    expect(servicios.guardarCategoria('Prueba').ok).toBe(true)
    const categoria = repo.leerEstado().categorias.at(-1)
    expect(servicios.guardarCategoria('Editada', categoria.id).ok).toBe(true)
    expect(servicios.guardarCategoria(' editada ').ok).toBe(false)
    expect(servicios.guardarCategoria('').ok).toBe(false)
    expect(servicios.guardarCategoria('Existe', 'ausente').ok).toBe(false)
    expect(servicios.desactivarCategoria('cat-1').ok).toBe(false)
    expect(servicios.desactivarCategoria('ausente').ok).toBe(false)
    expect(servicios.desactivarCategoria(categoria.id).ok).toBe(true)
  })
  it('crea/edita/desactiva cliente, protege admin y permite perfil con campos limitados', () => {
    const { repo, servicios } = entorno()
    expect(servicios.guardarUsuario(usuarioValido).ok).toBe(true)
    const cliente = repo.leerEstado().usuarios.at(-1)
    expect(servicios.guardarUsuario({ ...usuarioValido, nombre: 'Editado' }, cliente.id).ok).toBe(true)
    expect(servicios.guardarUsuario(usuarioValido, 'ausente').ok).toBe(false)
    expect(servicios.guardarUsuario(usuarioValido, 'admin-demo').ok).toBe(false)
    expect(servicios.desactivarUsuario('admin-demo').ok).toBe(false)
    expect(servicios.desactivarUsuario('ausente').ok).toBe(false)
    expect(servicios.desactivarUsuario(cliente.id).ok).toBe(true)
    expect(iniciarSesion(repo, storageMemoria(), usuarioValido.correo, '1234').ok).toBe(false)
    const original = repo.leerEstado().usuarios[0]
    expect(
      servicios.guardarPerfil({ ...original, nombre: 'Otro', rol: 'cliente', correo: 'malo@gmail.com' }).ok,
    ).toBe(true)
    expect(repo.leerEstado().usuarios[0]).toMatchObject({
      nombre: 'Otro',
      rol: 'admin',
      correo: 'admin@duoc.cl',
    })
    expect(servicios.guardarPerfil({}).ok).toBe(false)
  })
})
describe('TU-09 a TU-12/TU-18/TU-19 y TI-03/TI-04: confirmar compra', () => {
  const conCarrito = (e) => {
    e.carrito = [{ productoId: 'JM001', cantidad: 2 }]
  }
  it('acepta, guarda snapshot y descuenta una vez incluso con doble llamada y recarga', async () => {
    const { repo, storage, servicios } = entorno(conCarrito, false)
    const antes = repo.leerEstado()
    const s = solicitud(antes)
    const [a, b] = await Promise.all([servicios.confirmarCompra(s), servicios.confirmarCompra(s)])
    expect(a.ok && b.ok).toBe(true)
    expect(a.data.id).toBe(b.data.id)
    const despues = repo.leerEstado()
    expect(despues.pedidos).toHaveLength(1)
    expect(despues.carrito).toEqual([])
    expect(despues.productos[0].stock).toBe(13)
    expect(despues.pedidos[0]).toMatchObject({
      subtotal: 59980,
      total: 59980,
      descuento: 0,
      clienteId: null,
      creadoEn: '2026-10-23T15:00:00.000Z',
    })
    expect(validarEstado(despues)).toBe(despues)
    const recargado = crearServicios(crearRepositorio(storage))
    expect((await recargado.confirmarCompra(s)).data.id).toBe(a.data.id)
    expect(repo.leerEstado().productos[0].stock).toBe(13)
  })
  it('rechaza pago, carrito vacío, intento inválido y entrega inválida sin modificar', async () => {
    const { repo, servicios } = entorno(conCarrito, false)
    const antes = repo.leerEstado()
    expect(
      (await servicios.confirmarCompra(solicitud(antes, null, { resultadoSimulado: 'rechazado' }))).error
        .codigo,
    ).toBe('PAGO_RECHAZADO')
    expect(repo.leerEstado()).toEqual(antes)
    expect((await servicios.confirmarCompra(solicitud(antes, null, { intentoId: '' }))).ok).toBe(false)
    expect(
      (
        await servicios.confirmarCompra(
          solicitud(antes, null, { contacto: { nombre: '', apellidos: '', correo: '' } }),
        )
      ).error.codigo,
    ).toBe('VALIDACION')
    const vacio = entorno(() => {}, false)
    expect((await vacio.servicios.confirmarCompra(solicitud(vacio.repo.leerEstado()))).ok).toBe(false)
  })
  it('revalida stock/precio después del simulador asíncrono', async () => {
    for (const [campo, valor, codigo] of [
      ['stock', 1, 'SIN_STOCK'],
      ['precio', 100, 'PRECIO_CAMBIO'],
    ]) {
      const { repo } = entorno(conCarrito, false)
      const s = solicitud(repo.leerEstado())
      const servicio = crearServicios(repo, {
        pago: async () => {
          repo.actualizar((e) => ({
            ...e,
            productos: e.productos.map((p) => (p.id === 'JM001' ? { ...p, [campo]: valor } : p)),
          }))
          return true
        },
      })
      expect((await servicio.confirmarCompra(s)).error.codigo).toBe(codigo)
      expect(repo.leerEstado().pedidos).toHaveLength(0)
      expect(repo.leerEstado().carrito).toHaveLength(1)
    }
  })
  it('escritura fallida no publica una venta ni deja cambios parciales', async () => {
    const { repo, storage, servicios } = entorno(conCarrito, false)
    const antes = repo.getSnapshot()
    const escribir = storage.guardar
    storage.guardar = () => {
      throw new Error('cuota')
    }
    const result = await servicios.confirmarCompra(solicitud(repo.leerEstado()))
    expect(result.error.codigo).toBe('PERSISTENCIA')
    expect(repo.getSnapshot()).toBe(antes)
    storage.guardar = escribir
    expect(repo.leerEstado().productos[0].stock).toBe(15)
    expect(repo.leerEstado().pedidos).toEqual([])
  })
  it('cliente Duoc, entrega domicilio, oferta y orden histórica conservan importes', async () => {
    const { repo } = entorno((e) => {
      conCarrito(e)
      e.usuarios[1].correo = 'demo@duoc.cl'
      e.productos[0].precioOferta = 10000
    }, false)
    const usuario = repo.leerEstado().usuarios[1]
    const servicios = crearServicios(repo, {
      usuarioId: () => usuario.id,
      id: () => 'orden-duoc',
      ahora: reloj,
    })
    const s = solicitud(repo.leerEstado(), usuario, { entrega: { modalidad: 'domicilio', ...usuarioValido } })
    const result = await servicios.confirmarCompra(s)
    expect(result.data).toMatchObject({
      clienteId: 'cliente-demo',
      subtotal: 20000,
      descuento: 4000,
      total: 16000,
      entrega: { modalidad: 'domicilio', costo: 0 },
    })
    repo.actualizar((e) => ({
      ...e,
      productos: e.productos.map((p) => ({ ...p, precio: 999999, precioOferta: null })),
    }))
    expect(repo.leerEstado().pedidos[0].total).toBe(16000)
    const corrupto = repo.leerEstado()
    corrupto.pedidos[0].total = -1
    expect(() => validarEstado(corrupto)).toThrow()
    expect(resumirCarrito(repo.leerEstado()).valido).toBe(false)
  })
  it('servicio carrito propaga éxito/error y puede vaciar', () => {
    const { servicios, repo } = entorno()
    expect(servicios.carrito({ tipo: 'AGREGAR', productoId: 'JM001' }).ok).toBe(true)
    expect(servicios.carrito({ tipo: 'CAMBIAR', productoId: 'JM001', cantidad: 16 }).ok).toBe(false)
    expect(repo.leerEstado().carrito[0].cantidad).toBe(1)
    expect(servicios.carrito({ tipo: 'VACIAR' }).ok).toBe(true)
  })
})

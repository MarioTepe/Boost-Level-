import { describe, expect, it } from 'vitest'
import { crearServicios } from './tienda.service.js'
import { preparar, solicitud } from '../test/factories.js'

function prepararCompra() {
  const { repo, storage } = preparar({
    editar: (estado) => {
      estado.carrito = [{ productoId: 'JM001', cantidad: 2 }]
    },
  })
  const servicios = crearServicios(repo, {
    id: () => 'pedido-prueba',
    ahora: () => new Date('2026-10-26T15:00:00Z'),
  })
  return { repo, storage, servicios }
}

describe('Compra simulada', () => {
  it('confirma el pedido y no descuenta stock al repetir el mismo intento', async () => {
    const { repo, servicios } = prepararCompra()
    const datos = solicitud(repo.leerEstado())

    const primera = await servicios.confirmarCompra(datos)
    const repetida = await servicios.confirmarCompra(datos)

    expect(primera.ok).toBe(true)
    expect(repetida.data.id).toBe(primera.data.id)
    expect(repo.leerEstado().pedidos).toHaveLength(1)
    expect(repo.leerEstado().pedidos[0].total).toBe(59980)
    expect(repo.leerEstado().productos[0].stock).toBe(13)
    expect(repo.leerEstado().carrito).toEqual([])
  })

  it('conserva el estado cuando se rechaza el pago', async () => {
    const { repo, servicios } = prepararCompra()
    const antes = repo.leerEstado()
    const datos = solicitud(antes, null, { resultadoSimulado: 'rechazado' })

    const resultado = await servicios.confirmarCompra(datos)

    expect(resultado.error.codigo).toBe('PAGO_RECHAZADO')
    expect(repo.leerEstado()).toEqual(antes)
  })

  it('conserva el estado cuando falla el guardado', async () => {
    const { repo, storage, servicios } = prepararCompra()
    const antes = repo.leerEstado()
    const datos = solicitud(antes)
    storage.guardar = () => {
      throw new Error('Almacenamiento sin espacio')
    }

    const resultado = await servicios.confirmarCompra(datos)

    expect(resultado.error.codigo).toBe('PERSISTENCIA')
    expect(repo.leerEstado()).toEqual(antes)
  })

  it('impide administrar categorías sin una sesión de administrador', () => {
    const { repo } = preparar()
    const antes = repo.leerEstado()
    const servicios = crearServicios(repo, { usuarioId: () => null })

    const resultado = servicios.guardarCategoria('Categoría de prueba')

    expect(resultado.error.codigo).toBe('ACCESO_DENEGADO')
    expect(repo.leerEstado()).toEqual(antes)
  })
})

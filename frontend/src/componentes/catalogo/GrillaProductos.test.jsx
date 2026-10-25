import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { crearDatosIniciales } from '../../data/inicial.js'
import GrillaProductos from './GrillaProductos.jsx'

describe('GrillaProductos', () => {
  let productos
  let categorias

  beforeEach(() => {
    const datos = crearDatosIniciales()
    productos = datos.productos.slice(0, 2)
    categorias = datos.categorias
  })

  it('dibuja una tarjeta por producto con su enlace de detalle', () => {
    // Preparar
    const agregar = vi.fn()

    // Actuar
    render(
      <MemoryRouter>
        <GrillaProductos
          productos={productos}
          categorias={categorias}
          carrito={[]}
          onAgregarProducto={agregar}
        />
      </MemoryRouter>,
    )

    // Comprobar
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'Catan', exact: true })).toHaveAttribute(
      'href',
      '/productos/JM001',
    )
    expect(screen.getByRole('heading', { name: productos[1].nombre })).toBeInTheDocument()
  })

  it('no dibuja tarjetas cuando la lista está vacía', () => {
    // Preparar
    const agregar = vi.fn()

    // Actuar
    render(
      <MemoryRouter>
        <GrillaProductos productos={[]} categorias={categorias} carrito={[]} onAgregarProducto={agregar} />
      </MemoryRouter>,
    )

    // Comprobar
    expect(screen.queryAllByRole('article')).toHaveLength(0)
  })

  it('entrega al padre el ID del producto elegido', async () => {
    // Preparar
    const usuario = userEvent.setup()
    const agregar = vi.fn()
    render(
      <MemoryRouter>
        <GrillaProductos
          productos={productos}
          categorias={categorias}
          carrito={[]}
          onAgregarProducto={agregar}
        />
      </MemoryRouter>,
    )

    // Actuar
    await usuario.click(screen.getByRole('button', { name: 'Agregar Catan' }))

    // Comprobar
    expect(agregar).toHaveBeenCalledTimes(1)
    expect(agregar).toHaveBeenCalledWith('JM001')
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import TarjetaProducto from './TarjetaProducto.jsx'

describe('TarjetaProducto', () => {
  let producto

  beforeEach(() => {
    producto = {
      id: 'JM001',
      nombre: 'Catan',
      precio: 29990,
      precioOferta: null,
      stock: 15,
      imagen: 'img/catan.webp',
    }
  })

  it('muestra el nombre y la categoría recibidos por props', () => {
    // Preparar
    const agregar = vi.fn()

    // Actuar
    render(
      <MemoryRouter>
        <TarjetaProducto producto={producto} categoria="Juegos de mesa" onAgregarProducto={agregar} />
      </MemoryRouter>,
    )

    // Comprobar
    expect(screen.getByRole('heading', { name: 'Catan' })).toBeInTheDocument()
    expect(screen.getByText('Juegos de mesa')).toBeInTheDocument()
  })

  it('muestra el precio con formato de pesos chilenos', () => {
    // Preparar
    const agregar = vi.fn()

    // Actuar
    render(
      <MemoryRouter>
        <TarjetaProducto producto={producto} onAgregarProducto={agregar} />
      </MemoryRouter>,
    )

    // Comprobar
    expect(screen.getByText('$29.990')).toBeInTheDocument()
    expect(screen.queryByText('OFERTA')).not.toBeInTheDocument()
  })

  it('muestra las unidades disponibles', () => {
    // Preparar
    const agregar = vi.fn()

    // Actuar
    render(
      <MemoryRouter>
        <TarjetaProducto producto={producto} onAgregarProducto={agregar} />
      </MemoryRouter>,
    )

    // Comprobar
    expect(screen.getByText('15 disponibles')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Agregar Catan' })).toBeEnabled()
  })

  it('avisa una sola vez con el ID del producto al agregar', async () => {
    // Preparar
    const usuario = userEvent.setup()
    const agregar = vi.fn()
    render(
      <MemoryRouter>
        <TarjetaProducto producto={producto} onAgregarProducto={agregar} />
      </MemoryRouter>,
    )

    // Actuar
    await usuario.click(screen.getByRole('button', { name: 'Agregar Catan' }))

    // Comprobar
    expect(agregar).toHaveBeenCalledTimes(1)
    expect(agregar).toHaveBeenCalledWith('JM001')
  })

  it('no permite agregar un producto sin stock', async () => {
    // Preparar
    const usuario = userEvent.setup()
    const agregar = vi.fn()
    producto.stock = 0
    render(
      <MemoryRouter>
        <TarjetaProducto producto={producto} onAgregarProducto={agregar} />
      </MemoryRouter>,
    )

    // Actuar
    const boton = screen.getByRole('button', { name: 'Agregar Catan' })
    await usuario.click(boton)

    // Comprobar
    expect(screen.getByText('Sin stock')).toBeInTheDocument()
    expect(boton).toBeDisabled()
    expect(agregar).not.toHaveBeenCalled()
  })

  it('no permite agregar cuando el carrito alcanza el stock', async () => {
    // Preparar
    const usuario = userEvent.setup()
    const agregar = vi.fn()
    render(
      <MemoryRouter>
        <TarjetaProducto producto={producto} cantidadEnCarrito={15} onAgregarProducto={agregar} />
      </MemoryRouter>,
    )

    // Actuar
    const boton = screen.getByRole('button', { name: 'Agregar Catan' })
    await usuario.click(boton)

    // Comprobar
    expect(screen.getByText('15 en tu carrito')).toBeInTheDocument()
    expect(boton).toBeDisabled()
    expect(agregar).not.toHaveBeenCalled()
  })

  it('muestra la oferta y conserva visible el precio original', () => {
    // Preparar
    const agregar = vi.fn()
    producto.precioOferta = 10000

    // Actuar
    render(
      <MemoryRouter>
        <TarjetaProducto producto={producto} onAgregarProducto={agregar} />
      </MemoryRouter>,
    )

    // Comprobar
    expect(screen.getByText('OFERTA')).toBeInTheDocument()
    expect(screen.getByText('$10.000')).toBeInTheDocument()
    expect(screen.getByText('$29.990', { selector: 'del' })).toBeInTheDocument()
  })
})

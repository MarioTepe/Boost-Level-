import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { renderApp } from './test/renderApp.jsx'
import { preparar, usuarioValido } from './test/factories.js'

import UsuarioForm from './componentes/formularios/UsuarioForm.jsx'
import SessionProvider from './contexto/SessionProvider.jsx'
import TiendaProvider from './contexto/TiendaProvider.jsx'
import App from './App.jsx'
import { CLAVE_SESION, CLAVE_TIENDA } from './repositories/storage.adapter.js'

const escribir = (label, value) =>
  fireEvent.change(screen.getByLabelText(label, { exact: true }), { target: { value } })
const pulsar = (nombre) => fireEvent.click(screen.getByRole('button', { name: nombre, exact: true }))
const camposUsuario = () => {
  for (const [label, value] of [
    ['RUN', '12.345.678-k'],
    ['Nombre', 'Prueba'],
    ['Apellidos', 'Demo'],
    ['Correo electrónico', 'prueba@duoc.cl'],
    ['Fecha de nacimiento', '2000-01-01'],
    ['Clave de demostración', '1234'],
    ['Confirmar clave', '1234'],
    ['Región', 'Metropolitana de Santiago'],
    ['Comuna', 'Santiago'],
    ['Dirección', 'Dirección ficticia 123'],
  ])
    escribir(label, value)
}

describe('TC-01 a TC-05: catálogo, props, filtros y detalle', () => {
  it('catálogo renderiza los once activos y permite combinar, ordenar y limpiar filtros', () => {
    renderApp('/productos')
    expect(screen.getAllByRole('article')).toHaveLength(11)
    escribir('Buscar productos', 'Catan')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    escribir('Filtrar por categoría', 'cat-2')
    expect(screen.getByText('Sin coincidencias')).toBeInTheDocument()
    pulsar('Limpiar filtros')
    expect(screen.getAllByRole('article')).toHaveLength(11)
    escribir('Ordenar productos', 'menor')
    expect(screen.getAllByRole('article')[0]).toHaveTextContent('Polera')
    escribir('Ordenar productos', 'mayor')
    expect(screen.getAllByRole('article')[0]).toHaveTextContent('ASUS')
    pulsar('Agregar Catan')
    expect(screen.getByRole('link', { name: 'Carrito, 1 unidades' })).toBeInTheDocument()
  })

  it('ofertas refleja precio configurado; detalle agrega y respeta el stock', () => {
    const { repo } = renderApp('/ofertas', {
      editar: (e) => {
        e.productos[0].precioOferta = 10000
        e.productos[0].stock = 1
      },
    })
    expect(screen.getByText('OFERTA')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: 'Catan', exact: true }))
    expect(screen.getByRole('heading', { level: 1, name: 'Catan' })).toBeInTheDocument()
    pulsar('Agregar al carrito')
    expect(repo.leerEstado().carrito[0].cantidad).toBe(1)
    expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeDisabled()
  })
})
describe('TC-06/07/08: carrito conectado a datos', () => {
  it('renderiza, cambia cantidades, quita y vacía sin perder consistencia', () => {
    const { repo } = renderApp('/carrito', {
      editar: (e) => {
        e.carrito = [
          { productoId: 'JM001', cantidad: 2 },
          { productoId: 'MO001', cantidad: 1 },
        ]
      },
    })
    pulsar('Aumentar Catan')
    expect(repo.leerEstado().carrito[0].cantidad).toBe(3)
    pulsar('Disminuir Catan')
    expect(repo.leerEstado().carrito[0].cantidad).toBe(2)
    escribir('Cantidad de Catan', '4')
    expect(repo.leerEstado().carrito[0].cantidad).toBe(4)
    escribir('Cantidad de Catan', '16')
    expect(repo.leerEstado().carrito[0].cantidad).toBe(4)
    pulsar('Eliminar Monitor Lg')
    expect(repo.leerEstado().carrito).toHaveLength(1)
    pulsar('Vaciar carrito')
    expect(screen.getByText('Tu carrito está esperando')).toBeInTheDocument()
  })
})
describe('TC-09/10/11: checkout y resultados', () => {
  it('muestra validaciones y completa compra invitado con retiro', async () => {
    const { repo } = renderApp('/checkout', {
      editar: (e) => {
        e.carrito = [{ productoId: 'JM001', cantidad: 1 }]
      },
    })
    await act(async () => pulsar('Confirmar compra simulada'))
    await screen.findByRole('alert')
    expect(screen.getByLabelText('Nombre')).toHaveAttribute('aria-invalid', 'true')
    escribir('Nombre', 'Invitado')
    escribir('Apellidos', 'Demo')
    escribir('Correo electrónico', 'demo@gmail.com')
    fireEvent.click(screen.getByRole('radio', { name: /Retiro en tienda/ }))
    await act(async () => pulsar('Confirmar compra simulada'))
    await screen.findByRole('heading', { name: 'Tu siguiente nivel está confirmado.' })
    expect(repo.leerEstado().carrito).toEqual([])
    expect(repo.leerEstado().productos[0].stock).toBe(14)
    expect(screen.getByText('COMPROBANTE SIMULADO')).toBeInTheDocument()
  })
  it('precarga cliente, rechaza sin modificar, conserva formulario al reintentar y confirma domicilio', async () => {
    const { repo } = renderApp('/checkout', {
      sesion: 'cliente-demo',
      editar: (e) => {
        e.carrito = [{ productoId: 'JM001', cantidad: 2 }]
      },
    })
    expect(screen.getByLabelText('Nombre')).toHaveValue('Cliente')
    escribir('Región', 'Tarapacá')
    expect(screen.getByLabelText('Comuna')).toHaveValue('')
    escribir('Comuna', 'Iquique')
    escribir('Resultado del pago de demostración', 'rechazado')
    const antes = repo.leerEstado()
    pulsar('Confirmar compra simulada')
    await screen.findByRole('heading', { name: 'No se confirmó la compra.' })
    expect(repo.leerEstado()).toEqual(antes)
    fireEvent.click(screen.getByRole('link', { name: 'Volver a intentar' }))
    expect(screen.getByLabelText('Comuna')).toHaveValue('Iquique')
    pulsar('Confirmar compra simulada')
    await screen.findByRole('heading', { name: 'Tu siguiente nivel está confirmado.' })
    expect(repo.leerEstado().pedidos[0].entrega.comunaId).toBe('Iquique')
  })
})
describe('TC-12/15/17: cuentas, sesión y reglas de acceso', () => {
  it('registro exige datos y crea cliente utilizable en login', async () => {
    const { repo } = renderApp('/registro')
    pulsar('Crear cuenta demo')
    expect(screen.getByRole('alert')).toHaveTextContent('Revisa los campos')
    camposUsuario()
    pulsar('Crear cuenta demo')
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(repo.leerEstado().usuarios.at(-1).rol).toBe('cliente')
    escribir('Clave de demostración', 'errada')
    pulsar('Entrar')
    expect(screen.getByRole('alert')).toHaveTextContent('no coinciden')
    escribir('Clave de demostración', '1234')
    pulsar('Entrar')
    expect(screen.getByRole('link', { name: 'Prueba' })).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('link', { name: /Carrito, / })[0])
    expect(screen.getByText('Tu carrito está esperando')).toBeInTheDocument()
    pulsar('Salir')
    expect(screen.getByRole('link', { name: 'Mi cuenta' })).toBeInTheDocument()
  })
  it('no administra sin rol y el login admin sí abre dashboard', () => {
    renderApp('/admin')
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
    escribir('Correo electrónico', 'admin@duoc.cl')
    escribir('Clave de demostración', '1234')
    pulsar('Entrar')
    expect(screen.getByRole('heading', { name: 'Todo tu equipo, bajo control.' })).toBeInTheDocument()
    pulsar('Salir')
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
  })

  it('formulario de cliente permite edición con datos iniciales', () => {
    const guardar = vi.fn(() => ({ ok: true }))
    render(
      <UsuarioForm
        inicial={{ ...usuarioValido, confirmacion: '1234' }}
        onGuardar={guardar}
        textoBoton="Guardar cliente"
      />,
    )
    escribir('Nombre', 'Editado')
    pulsar('Guardar cliente')
    expect(guardar).toHaveBeenCalledWith(expect.objectContaining({ nombre: 'Editado' }))
  })
})
describe('TC-14 y TI-06/08/09: administración', () => {
  it('producto nuevo valida y guarda oferta y stock compartidos', () => {
    const { repo } = renderApp('/admin/productos/nuevo', { sesion: 'admin-demo' })
    pulsar('Guardar producto')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    for (const [label, value] of [
      ['Código', 'TEST001'],
      ['Nombre', 'Producto de prueba'],
      ['Precio base CLP', '20000'],
      ['Stock disponible', '2'],
      ['Precio de oferta (opcional)', '10000'],
      ['Umbral crítico (opcional)', '2'],
      ['Categoría', 'cat-1'],
      ['Descripción', 'Descripción ficticia'],
      ['Imagen del catálogo', 'img/catan.webp'],
    ])
      escribir(label, value)
    pulsar('Guardar producto')
    expect(screen.getByRole('heading', { name: 'Producto de prueba' })).toBeInTheDocument()
    expect(repo.leerEstado().productos.at(-1)).toMatchObject({ precioOferta: 10000, stock: 2 })
  })
  it('edita producto y desactiva con confirmación sin borrar historial', () => {
    const { repo } = renderApp('/admin/productos/JM001/editar', {
      sesion: 'admin-demo',
      editar: (estado) => {
        estado.productos[0].precioOferta = 10000
        estado.productos[0].umbralCritico = 15
      },
    })
    escribir('Nombre', 'Editado')
    escribir('Precio de oferta (opcional)', '')
    escribir('Umbral crítico (opcional)', '')
    pulsar('Guardar producto')
    expect(screen.getByRole('heading', { name: 'Editado' })).toBeInTheDocument()
    fireEvent.click(
      within(screen.getByRole('navigation', { name: 'Administración' })).getByRole('link', {
        name: 'Productos',
      }),
    )
    const fila = screen.getByText('Editado').closest('tr')
    fireEvent.click(within(fila).getByRole('button', { name: 'Desactivar' }))
    pulsar('Cancelar')
    expect(repo.leerEstado().productos[0].activo).toBe(true)
    fireEvent.click(within(fila).getByRole('button', { name: 'Desactivar' }))
    pulsar('Confirmar')
    expect(repo.leerEstado().productos[0].activo).toBe(false)
  })
  it('categorías valida, crea, edita, cancela y desactiva una categoría vacía', () => {
    const { repo } = renderApp('/admin/categorias', { sesion: 'admin-demo' })
    pulsar('Guardar categoría')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    escribir('Nombre de categoría', 'Nueva categoría')
    pulsar('Guardar categoría')
    let fila = screen.getByRole('cell', { name: 'Nueva categoría', exact: true }).closest('tr')
    fireEvent.click(within(fila).getByRole('button', { name: 'Editar' }))
    pulsar('Cancelar edición')
    fireEvent.click(within(fila).getByRole('button', { name: 'Editar' }))
    escribir('Nombre de categoría', 'Renombrada')
    pulsar('Guardar categoría')
    fila = screen.getByText('Renombrada').closest('tr')
    fireEvent.click(within(fila).getByRole('button', { name: 'Desactivar' }))
    pulsar('Confirmar')
    expect(repo.leerEstado().categorias.at(-1)).toMatchObject({ nombre: 'Renombrada', activo: false })
  })
  it('crea cliente desde admin, muestra detalle/historial y permite edición y baja', () => {
    const { repo } = renderApp('/admin/usuarios/nuevo', { sesion: 'admin-demo' })
    camposUsuario()
    pulsar('Guardar cliente')
    const cliente = repo.leerEstado().usuarios.at(-1)
    let fila = screen.getByText('prueba@duoc.cl').closest('tr')
    fireEvent.click(within(fila).getByRole('link', { name: 'Ver' }))
    expect(screen.getByRole('heading', { name: 'Prueba Demo' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: 'Editar cliente' }))
    escribir('Nombre', 'Modificado')
    pulsar('Guardar cliente')
    fila = screen.getByText('prueba@duoc.cl').closest('tr')
    fireEvent.click(within(fila).getByRole('button', { name: 'Desactivar' }))
    pulsar('Confirmar')
    expect(repo.leerEstado().usuarios.find((u) => u.id === cliente.id)).toMatchObject({
      activo: false,
      nombre: 'Modificado',
    })
  })
  it('perfil guarda campos permitidos y muestra errores reales', () => {
    const { repo } = renderApp('/admin/perfil', { sesion: 'admin-demo' })
    escribir('Nombre', '')
    pulsar('Guardar perfil')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    escribir('Nombre', 'Administrador')
    escribir('Dirección', 'Ficticia 789')
    pulsar('Guardar perfil')
    expect(repo.leerEstado().usuarios[0]).toMatchObject({
      nombre: 'Administrador',
      direccion: 'Ficticia 789',
      rol: 'admin',
    })
  })
})
describe('TC-18 y revisión de navegación/contenido', () => {
  it('contacto valida y deja explícito que no envía mensajes', () => {
    renderApp('/contacto')
    pulsar('Validar mensaje')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    escribir('Nombre', 'Demo')
    escribir('Correo electrónico', 'demo@gmail.com')
    escribir('Tu mensaje', 'Consulta ficticia')
    pulsar('Validar mensaje')
    expect(screen.getByText(/Validación completada/)).toBeInTheDocument()
  })
  it('menú, acceso al contenido, avisos y reset son operables por UI', () => {
    const { repo } = renderApp('/')
    pulsar('Abrir menú')
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(screen.getByRole('link', { name: 'Saltar al contenido' }))
    expect(screen.getByRole('main')).toHaveFocus()
    pulsar('Agregar Catan')
    pulsar('Cerrar aviso')
    pulsar('Restablecer demostración')
    fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' })
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    pulsar('Restablecer demostración')
    const cancelar = screen.getByRole('button', { name: 'Cancelar' }),
      confirmar = screen.getByRole('button', { name: 'Confirmar' })
    expect(cancelar).toHaveFocus()
    fireEvent.keyDown(cancelar, { key: 'Tab', shiftKey: true })
    expect(confirmar).toHaveFocus()
    fireEvent.keyDown(confirmar, { key: 'Tab' })
    expect(cancelar).toHaveFocus()
    pulsar('Confirmar')
    expect(repo.leerEstado().carrito).toEqual([])
  })
  it('storage corrupto ofrece recuperar sin borrado automático', () => {
    const { repo, storage } = preparar()
    storage.guardar(CLAVE_TIENDA, 'INVALID')
    // Nueva instancia fuerza lectura del dato corrupto, igual que una recarga.
    const { unmount } = render(
      <MemoryRouter>
        <TiendaProvider repository={repo}>
          <SessionProvider>
            <App />
          </SessionProvider>
        </TiendaProvider>
      </MemoryRouter>,
    )
    unmount()
    window.localStorage.setItem(CLAVE_TIENDA, 'INVALID')
    window.sessionStorage.setItem(CLAVE_SESION, '{}')
    render(
      <MemoryRouter>
        <TiendaProvider>
          <SessionProvider>
            <App />
          </SessionProvider>
        </TiendaProvider>
      </MemoryRouter>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('datos guardados')
    pulsar('Restablecer datos demo')
    pulsar('Confirmar')
    expect(JSON.parse(window.localStorage.getItem(CLAVE_TIENDA)).schemaVersion).toBe(1)
  })
})

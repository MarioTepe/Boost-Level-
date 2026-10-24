import useApp from '../hooks/useApp.js'
import { useParams, useSearchParams, useNavigate, Link } from 'react-router'

import NoEncontrado from '../componentes/ui/NoEncontrado.jsx'
import { precioVigente } from '../domain/precios.js'

import PageTitle from '../componentes/ui/PageTitle.jsx'
import Icono from '../componentes/ui/Icono.jsx'
import GrillaProductos from '../componentes/catalogo/GrillaProductos.jsx'
import Vacio from '../componentes/ui/Vacio.jsx'

export default function CatalogoPage({ ofertas = false }) {
  const { estado, servicios, notificar } = useApp()
  const { id } = useParams()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const categoria = params.get('categoria') || id || ''
  const busqueda = params.get('q') || ''
  const orden = params.get('orden') || 'destacados'
  if (id && !estado.categorias.some((c) => c.id === id && c.activo))
    return (
      <div className="container page-section">
        <NoEncontrado titulo="Categoría no encontrada" />
      </div>
    )
  function filtrar(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key === 'categoria' && id) navigate(`/productos?${next}`)
    else setParams(next)
  }
  const productos = estado.productos.filter(
    (p) =>
      p.activo &&
      (!ofertas || p.precioOferta !== null) &&
      (!categoria || p.categoriaId === categoria) &&
      `${p.nombre} ${p.codigo}`.toLowerCase().includes(busqueda.toLowerCase().trim()),
  )
  if (orden === 'menor') productos.sort((a, b) => precioVigente(a) - precioVigente(b))
  if (orden === 'mayor') productos.sort((a, b) => precioVigente(b) - precioVigente(a))
  const seleccionada = estado.categorias.find((c) => c.id === categoria)
  return (
    <div className="container page-section">
      <div className="breadcrumb-line">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <span>{ofertas ? 'Ofertas' : seleccionada?.nombre || 'Productos'}</span>
      </div>
      <PageTitle
        eyebrow="EL EQUIPO QUE HACE LA DIFERENCIA"
        titulo={
          ofertas ? 'Más potencia. Mejor precio.' : seleccionada?.nombre || 'Encuentra tu próximo nivel.'
        }
      >
        <p>Explora tecnología y gaming para armar un setup a tu medida.</p>
      </PageTitle>
      <div className="catalog-toolbar">
        <div className="search-field">
          <Icono nombre="buscar" />
          <input
            aria-label="Buscar productos"
            placeholder="Busca por nombre o código…"
            value={busqueda}
            onChange={(e) => filtrar('q', e.target.value)}
          />
        </div>
        <select
          className="form-select"
          aria-label="Filtrar por categoría"
          value={categoria}
          onChange={(e) => filtrar('categoria', e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {estado.categorias
            .filter((c) => c.activo)
            .map((c) => (
              <option value={c.id} key={c.id}>
                {c.nombre}
              </option>
            ))}
        </select>
        <select
          className="form-select"
          aria-label="Ordenar productos"
          value={orden}
          onChange={(e) => filtrar('orden', e.target.value)}
        >
          <option value="destacados">Destacados</option>
          <option value="menor">Menor precio</option>
          <option value="mayor">Mayor precio</option>
        </select>
      </div>
      <div className="catalog-results">
        <span>{productos.length} productos encontrados</span>
        {(busqueda || categoria) && (
          <button className="btn-link-small" onClick={() => navigate(ofertas ? '/ofertas' : '/productos')}>
            Limpiar filtros
          </button>
        )}
      </div>
      {productos.length ? (
        <GrillaProductos
          productos={productos}
          categorias={estado.categorias}
          carrito={estado.carrito}
          onAgregarProducto={(id) =>
            notificar(servicios.carrito({ tipo: 'AGREGAR', productoId: id }), 'Producto agregado al carrito.')
          }
        />
      ) : (
        <Vacio titulo={ofertas && !busqueda && !categoria ? 'Todavía no hay ofertas' : 'Sin coincidencias'}>
          Prueba otra búsqueda o explora el catálogo completo.
        </Vacio>
      )}
    </div>
  )
}

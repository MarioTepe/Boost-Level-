import { useParams, Link } from 'react-router'
import useApp from '../../hooks/useApp.js'
import NoEncontrado from '../../componentes/ui/NoEncontrado.jsx'
import PageTitle from '../../componentes/ui/PageTitle.jsx'

import FotoProducto from '../../componentes/ui/FotoProducto.jsx'
import Estado from '../../componentes/administracion/Estado.jsx'
import { moneda } from '../../utils/moneda.js'

export default function ProductoDetallePage() {
  const { id } = useParams()
  const { estado } = useApp()
  const p = estado.productos.find((v) => v.id === id)
  if (!p) return <NoEncontrado titulo="Producto no encontrado" />
  return (
    <>
      <PageTitle
        eyebrow={p.codigo}
        titulo={p.nombre}
        action={
          <Link className="btn btn-boost" to={`/admin/productos/${p.id}/editar`}>
            Editar producto
          </Link>
        }
      />
      <div className="panel">
        <div className="row g-4">
          <div className="col-md-5">
            <div className="detail-photo">
              <FotoProducto producto={p} />
            </div>
          </div>
          <div className="col-md-7">
            <Estado activo={p.activo} />
            <p className="mt-4">{p.descripcion}</p>
            <dl className="detail-data">
              <dt>Precio base</dt>
              <dd>{moneda(p.precio)}</dd>
              <dt>Precio de oferta</dt>
              <dd>{p.precioOferta === null ? 'Sin oferta' : moneda(p.precioOferta)}</dd>
              <dt>Stock</dt>
              <dd>{p.stock}</dd>
              <dt>Umbral crítico</dt>
              <dd>{p.umbralCritico === null ? 'Sin configurar' : p.umbralCritico}</dd>
              <dt>Categoría</dt>
              <dd>{estado.categorias.find((c) => c.id === p.categoriaId)?.nombre}</dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}

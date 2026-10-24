import useApp from '../../hooks/useApp.js'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import { Link } from 'react-router'
import Tabla from '../../componentes/administracion/Tabla.jsx'
import FotoProducto from '../../componentes/ui/FotoProducto.jsx'
import { moneda } from '../../utils/moneda.js'
import Estado from '../../componentes/administracion/Estado.jsx'
import BajaButton from '../../componentes/administracion/BajaButton.jsx'

export default function ProductosPage() {
  const { estado, servicios, notificar } = useApp()
  return (
    <>
      <PageTitle
        eyebrow="CATÁLOGO"
        titulo="Productos"
        action={
          <Link className="btn btn-boost" to="/admin/productos/nuevo">
            + Nuevo producto
          </Link>
        }
      />
      <Tabla
        cabeceras={['Producto', 'Precio CLP', 'Stock', 'Estado', 'Acciones']}
        vacia={!estado.productos.length}
      >
        {estado.productos.map((p) => (
          <tr key={p.id}>
            <td>
              <div className="table-product">
                <FotoProducto producto={p} />
                <span>
                  <strong>{p.nombre}</strong>
                  <small>{p.codigo}</small>
                </span>
              </div>
            </td>
            <td>
              {moneda(p.precioOferta ?? p.precio)}
              {p.precioOferta !== null && <small className="d-block lime">Oferta activa</small>}
            </td>
            <td>{p.stock}</td>
            <td>
              <Estado activo={p.activo} />
            </td>
            <td>
              <div className="table-actions">
                <Link className="btn btn-sm btn-outline-light" to={`/admin/productos/${p.id}`}>
                  Ver
                </Link>
                <Link className="btn btn-sm btn-outline-light" to={`/admin/productos/${p.id}/editar`}>
                  Editar
                </Link>
                <BajaButton
                  activo={p.activo}
                  nombre={p.nombre}
                  onBaja={() => notificar(servicios.desactivarProducto(p.id), 'Producto desactivado.')}
                />
              </div>
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  )
}

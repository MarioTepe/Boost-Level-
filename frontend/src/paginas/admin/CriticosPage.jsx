import useApp from '../../hooks/useApp.js'
import { indicadores } from '../../domain/precios.js'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import Tabla from '../../componentes/administracion/Tabla.jsx'
import { Link } from 'react-router'

export default function CriticosPage() {
  const { estado } = useApp()
  const { criticos } = indicadores(estado)
  return (
    <>
      <PageTitle eyebrow="INVENTARIO" titulo="Stock crítico" />
      <p className="text-secondary mb-4">
        Productos activos cuyo stock es menor o igual al umbral configurado.
      </p>
      <Tabla cabeceras={['Producto', 'Stock', 'Umbral', 'Acción']} vacia={!criticos.length}>
        {criticos.map((p) => (
          <tr key={p.id}>
            <td>{p.nombre}</td>
            <td className="text-warning">{p.stock}</td>
            <td>{p.umbralCritico}</td>
            <td>
              <Link className="btn btn-sm btn-outline-light" to={`/admin/productos/${p.id}/editar`}>
                Actualizar stock
              </Link>
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  )
}

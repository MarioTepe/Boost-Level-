import useApp from '../../hooks/useApp.js'
import { indicadores } from '../../domain/precios.js'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import { moneda } from '../../utils/moneda.js'
import Icono from '../../componentes/ui/Icono.jsx'
import { Link } from 'react-router'
import PedidosPage from './PedidosPage.jsx'

export default function DashboardPage({ reporte = false }) {
  const { estado } = useApp()
  const datos = indicadores(estado)
  return (
    <>
      <PageTitle
        eyebrow="ADMINISTRACIÓN"
        titulo={reporte ? 'Reportes de la tienda' : 'Todo tu equipo, bajo control.'}
      />
      <div className="row g-3 mb-4">
        {[
          ['Ventas simuladas', moneda(datos.ventas)],
          ['Pedidos confirmados', datos.pedidos.length],
          ['Productos críticos', datos.criticos.length],
        ].map(([label, valor]) => (
          <div className="col-md-4" key={label}>
            <div className="stat-card">
              <span>{label}</span>
              <strong>{valor}</strong>
              <Icono nombre="flecha" />
            </div>
          </div>
        ))}
      </div>
      <div className="panel mb-4">
        <h2>Información para decidir</h2>
        <p className="text-secondary">
          Los indicadores se calculan desde los pedidos confirmados y el stock guardado en esta demostración.
          Los intentos rechazados no suman ventas.
        </p>
        <div className="d-flex gap-3 flex-wrap">
          <Link to="/admin/productos" className="btn btn-boost">
            Administrar productos <Icono nombre="flecha" />
          </Link>
          <Link to="/admin/criticos" className="btn btn-outline-light">
            Revisar stock crítico
          </Link>
        </div>
      </div>
      <PedidosPage compacto />
    </>
  )
}

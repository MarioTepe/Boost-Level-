import { useParams, Link } from 'react-router'
import useApp from '../hooks/useApp.js'
import NoEncontrado from '../componentes/ui/NoEncontrado.jsx'
import Icono from '../componentes/ui/Icono.jsx'
import Comprobante from '../componentes/pedidos/Comprobante.jsx'

export default function CompraExitosaPage() {
  const { pedidoId } = useParams()
  const { estado } = useApp()
  const pedido = estado.pedidos.find((p) => p.id === pedidoId)
  if (!pedido)
    return (
      <div className="container page-section">
        <NoEncontrado titulo="Pedido no encontrado" />
      </div>
    )
  return (
    <div className="container page-section">
      <div className="result-heading">
        <span className="result-icon">
          <Icono nombre="check" size={36} />
        </span>
        <p className="eyebrow mt-4">MISIÓN COMPLETADA</p>
        <h1>Tu siguiente nivel está confirmado.</h1>
        <p className="text-secondary">Guardamos tu pedido de demostración y actualizamos el stock.</p>
      </div>
      <Comprobante pedido={pedido} />
      <div className="text-center mt-4">
        <Link className="btn btn-boost" to="/productos">
          Seguir explorando <Icono nombre="flecha" />
        </Link>
      </div>
    </div>
  )
}

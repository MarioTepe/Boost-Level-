import { useLocation, Link } from 'react-router'
import Icono from '../componentes/ui/Icono.jsx'

export default function CompraRechazadaPage() {
  const location = useLocation()
  return (
    <div className="container page-section">
      <div className="result-heading">
        <span className="result-icon rejected">
          <Icono nombre="cerrar" size={36} />
        </span>
        <p className="eyebrow mt-4">PODEMOS INTENTARLO OTRA VEZ</p>
        <h1>No se confirmó la compra.</h1>
        <p className="text-secondary">
          {location.state?.mensaje || 'El pago de demostración fue rechazado. Tu carrito sigue disponible.'}
        </p>
        <Link className="btn btn-boost mt-3" to="/checkout" state={{ datos: location.state?.datos }}>
          Volver a intentar <Icono nombre="flecha" />
        </Link>
        <Link className="btn btn-outline-light ms-2 mt-3" to="/carrito">
          Ver carrito
        </Link>
      </div>
    </div>
  )
}

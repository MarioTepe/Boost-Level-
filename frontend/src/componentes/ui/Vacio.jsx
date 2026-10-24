import Icono from './Icono.jsx'
import { Link } from 'react-router'

export default function Vacio({
  titulo = 'Todavía no hay resultados',
  children,
  enlace = '/productos',
  accion = 'Explorar productos',
  nivel = 2,
}) {
  const Heading = nivel === 1 ? 'h1' : 'h2'
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icono nombre="caja" size={36} />
      </span>
      <Heading>{titulo}</Heading>
      <p className="text-secondary">{children}</p>
      {enlace && (
        <Link className="btn btn-boost" to={enlace}>
          {accion} <Icono nombre="flecha" />
        </Link>
      )}
    </div>
  )
}

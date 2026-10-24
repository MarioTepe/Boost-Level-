import { useParams, Link } from 'react-router'
import useApp from '../../hooks/useApp.js'
import NoEncontrado from '../../componentes/ui/NoEncontrado.jsx'
import PageTitle from '../../componentes/ui/PageTitle.jsx'

import Estado from '../../componentes/administracion/Estado.jsx'
import PedidosPage from './PedidosPage.jsx'

export default function UsuarioDetallePage() {
  const { id } = useParams()
  const { estado } = useApp()
  const u = estado.usuarios.find((x) => x.id === id)
  if (!u) return <NoEncontrado titulo="Usuario no encontrado" />
  return (
    <>
      <PageTitle
        eyebrow="USUARIO"
        titulo={`${u.nombre} ${u.apellidos}`}
        action={
          u.rol !== 'admin' && (
            <Link className="btn btn-boost" to={`/admin/usuarios/${id}/editar`}>
              Editar cliente
            </Link>
          )
        }
      />
      <div className="panel mb-4">
        <Estado activo={u.activo} />
        <p className="mt-3">{u.correo}</p>
        <p className="text-secondary">
          {u.direccion}, {u.comunaId}, {u.regionId}
        </p>
        <p className="microcopy">RUN demo: {u.run || 'Sin registrar'}</p>
      </div>
      <h2 className="mb-4">Historial de compras</h2>
      <PedidosPage clienteId={id} compacto />
    </>
  )
}

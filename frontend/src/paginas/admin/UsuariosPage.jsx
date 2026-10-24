import useApp from '../../hooks/useApp.js'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import { Link } from 'react-router'
import Tabla from '../../componentes/administracion/Tabla.jsx'
import Estado from '../../componentes/administracion/Estado.jsx'
import BajaButton from '../../componentes/administracion/BajaButton.jsx'

export default function UsuariosPage() {
  const { estado, servicios, notificar } = useApp()
  return (
    <>
      <PageTitle
        eyebrow="COMUNIDAD"
        titulo="Usuarios"
        action={
          <Link to="/admin/usuarios/nuevo" className="btn btn-boost">
            + Nuevo cliente
          </Link>
        }
      />
      <Tabla cabeceras={['Usuario', 'Correo', 'Rol', 'Estado', 'Acciones']} vacia={!estado.usuarios.length}>
        {estado.usuarios.map((u) => (
          <tr key={u.id}>
            <td>
              {u.nombre} {u.apellidos}
            </td>
            <td>{u.correo}</td>
            <td>{u.rol === 'admin' ? 'Administrador' : 'Cliente'}</td>
            <td>
              <Estado activo={u.activo} />
            </td>
            <td>
              <div className="table-actions">
                <Link className="btn btn-sm btn-outline-light" to={`/admin/usuarios/${u.id}`}>
                  Ver
                </Link>
                {u.rol !== 'admin' && (
                  <>
                    <Link className="btn btn-sm btn-outline-light" to={`/admin/usuarios/${u.id}/editar`}>
                      Editar
                    </Link>
                    <BajaButton
                      activo={u.activo}
                      nombre={u.nombre}
                      onBaja={() => notificar(servicios.desactivarUsuario(u.id), 'Cliente desactivado.')}
                    />
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  )
}

import { useParams, useNavigate } from 'react-router'
import useApp from '../../hooks/useApp.js'

import NoEncontrado from '../../componentes/ui/NoEncontrado.jsx'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import UsuarioForm from '../../componentes/formularios/UsuarioForm.jsx'

export default function UsuarioFormPage() {
  const { id } = useParams()
  const { estado, servicios, notificar } = useApp()
  const navigate = useNavigate()
  const u = estado.usuarios.find((x) => x.id === id)
  if (id && (!u || u.rol === 'admin')) return <NoEncontrado titulo="Cliente no editable" />
  function guardar(datos) {
    const result = servicios.guardarUsuario(datos, id || null)
    if (result.ok) {
      notificar(result, 'Cliente guardado.')
      navigate('/admin/usuarios')
    }
    return result
  }
  return (
    <>
      <PageTitle eyebrow="USUARIOS" titulo={id ? 'Editar cliente' : 'Nuevo cliente'} />
      <section className="panel">
        <UsuarioForm key={id || 'nuevo'} inicial={u} onGuardar={guardar} textoBoton="Guardar cliente" />
      </section>
    </>
  )
}

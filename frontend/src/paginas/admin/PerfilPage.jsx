import useApp from '../../hooks/useApp.js'
import { useState } from 'react'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import ErrorMensaje from '../../componentes/ui/ErrorMensaje.jsx'
import Campo from '../../componentes/ui/Campo.jsx'
import Direccion from '../../componentes/formularios/Direccion.jsx'

export default function PerfilPage() {
  const { usuario, servicios, notificar } = useApp()
  const [datos, setDatos] = useState({
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    direccion: usuario.direccion,
    regionId: usuario.regionId,
    comunaId: usuario.comunaId,
  })
  const [error, setError] = useState(null)
  function guardar(e) {
    e.preventDefault()
    const result = servicios.guardarPerfil(datos)
    setError(result.ok ? null : result.error)
    if (result.ok) notificar(result, 'Perfil actualizado.')
  }
  return (
    <>
      <PageTitle eyebrow="ADMINISTRADOR" titulo="Mi perfil" />
      <form className="panel" onSubmit={guardar} noValidate>
        <p className="text-secondary">{usuario.correo} · Administrador de demostración</p>
        <ErrorMensaje error={error} />
        {[
          ['nombre', 'Nombre'],
          ['apellidos', 'Apellidos'],
        ].map(([key, label]) => (
          <Campo
            nombre={key}
            key={key}
            label={label}
            value={datos[key]}
            onChange={(e) => setDatos({ ...datos, [key]: e.target.value })}
            error={error?.campos[key]}
          />
        ))}
        <Direccion valores={datos} onChange={setDatos} errores={error?.campos} />
        <button className="btn btn-boost" type="submit">
          Guardar perfil
        </button>
      </form>
    </>
  )
}

import { useState } from 'react'
import ErrorMensaje from '../ui/ErrorMensaje.jsx'
import Campo from '../ui/Campo.jsx'
import Direccion from './Direccion.jsx'
import Icono from '../ui/Icono.jsx'

const vacio = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  fechaNacimiento: '',
  claveDemo: '',
  confirmacion: '',
  regionId: '',
  comunaId: '',
  direccion: '',
}
export default function UsuarioForm({ inicial = {}, onGuardar, textoBoton = 'Crear cuenta demo' }) {
  const [datos, setDatos] = useState(() => ({
    ...vacio,
    ...Object.fromEntries(Object.entries(inicial).map(([key, value]) => [key, value ?? ''])),
    confirmacion: inicial.claveDemo || '',
  }))
  const [error, setError] = useState(null)
  function enviar(e) {
    e.preventDefault()
    const result = onGuardar(datos)
    setError(result.ok ? null : result.error)
  }
  const campos = [
    ['run', 'RUN', 'text', 12],
    ['nombre', 'Nombre', 'text', 50],
    ['apellidos', 'Apellidos', 'text', 100],
    ['correo', 'Correo electrónico', 'email', 100],
    ['fechaNacimiento', 'Fecha de nacimiento', 'date'],
    ['claveDemo', 'Clave de demostración', 'password', 10],
    ['confirmacion', 'Confirmar clave', 'password', 10],
  ]
  return (
    <form onSubmit={enviar} noValidate>
      <ErrorMensaje error={error} />
      <p className="microcopy mb-4">
        Usa exclusivamente datos y claves ficticias. El RUN se valida por formato, sin comprobar identidad.
      </p>
      <div className="row">
        {campos.map(([key, label, type, maxLength]) => (
          <div key={key} className={key === 'run' ? 'col-12' : 'col-md-6'}>
            <Campo
              nombre={key}
              label={label}
              type={type}
              maxLength={maxLength}
              value={datos[key]}
              onChange={(e) => setDatos({ ...datos, [key]: e.target.value })}
              error={error?.campos[key]}
              autoComplete={type === 'password' ? 'new-password' : 'off'}
            />
          </div>
        ))}
      </div>
      <Direccion valores={datos} onChange={setDatos} errores={error?.campos} />
      <button className="btn btn-boost" type="submit">
        {textoBoton} <Icono nombre="flecha" />
      </button>
    </form>
  )
}

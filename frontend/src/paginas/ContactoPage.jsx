import { useState } from 'react'
import { validarContacto } from '../domain/validaciones.js'
import { fallo } from '../domain/errores.js'
import PageTitle from '../componentes/ui/PageTitle.jsx'
import { Link } from 'react-router'
import Icono from '../componentes/ui/Icono.jsx'
import ErrorMensaje from '../componentes/ui/ErrorMensaje.jsx'
import Campo from '../componentes/ui/Campo.jsx'

export default function ContactoPage() {
  const [datos, setDatos] = useState({ nombre: '', correo: '', comentario: '' })
  const [error, setError] = useState(null)
  const [listo, setListo] = useState(false)
  function enviar(e) {
    e.preventDefault()
    setListo(false)
    try {
      validarContacto(datos)
      setError(null)
      setListo(true)
    } catch (err) {
      setError(fallo(err).error)
    }
  }
  return (
    <div className="container page-section">
      <div className="row g-5">
        <div className="col-lg-5">
          <PageTitle eyebrow="HABLEMOS" titulo="Conecta con Boost." />
          <p className="text-secondary">
            Prueba el formulario de contacto de nuestro proyecto. Esta demostración valida tus datos sin
            enviar mensajes.
          </p>
          <Link to="/productos" className="text-link">
            Volver a explorar <Icono nombre="flecha" />
          </Link>
        </div>
        <div className="col-lg-7">
          <form className="panel" onSubmit={enviar} noValidate>
            <ErrorMensaje error={error} />
            {listo && (
              <div className="alert alert-success" role="status">
                Validación completada. Este formulario es una demostración y no envía mensajes.
              </div>
            )}
            {[
              ['nombre', 'Nombre'],
              ['correo', 'Correo electrónico'],
              ['comentario', 'Tu mensaje'],
            ].map(([key, label]) => (
              <Campo key={key} nombre={key} label={label} error={error?.campos[key]}>
                {(props) =>
                  key === 'comentario' ? (
                    <textarea
                      {...props}
                      className="form-control"
                      rows={5}
                      maxLength={500}
                      value={datos[key]}
                      onChange={(e) => setDatos({ ...datos, [key]: e.target.value })}
                    />
                  ) : (
                    <input
                      {...props}
                      className="form-control"
                      maxLength={100}
                      type={key === 'correo' ? 'email' : 'text'}
                      value={datos[key]}
                      onChange={(e) => setDatos({ ...datos, [key]: e.target.value })}
                    />
                  )
                }
              </Campo>
            ))}
            <button className="btn btn-boost" type="submit">
              Validar mensaje <Icono nombre="flecha" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

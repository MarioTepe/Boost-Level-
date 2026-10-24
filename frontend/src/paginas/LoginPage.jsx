import useApp from '../hooks/useApp.js'
import { useLocation, useNavigate, Link } from 'react-router'
import { useState } from 'react'

import ErrorMensaje from '../componentes/ui/ErrorMensaje.jsx'
import Campo from '../componentes/ui/Campo.jsx'
import Icono from '../componentes/ui/Icono.jsx'

export default function LoginPage() {
  const { login, notificar } = useApp()
  const location = useLocation()
  const [correo, setCorreo] = useState(location.state?.correo || '')
  const [clave, setClave] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  function entrar(e) {
    e.preventDefault()
    const result = login(correo, clave)
    if (result.ok) {
      notificar(result, `Bienvenido, ${result.data.nombre}.`)
      navigate(result.data.rol === 'admin' ? '/admin' : '/productos')
    } else setError(result.error)
  }
  return (
    <div className="container page-section">
      <div className="row g-5 align-items-center login-page">
        <div className="col-lg-6">
          <p className="eyebrow">VOLVAMOS AL JUEGO</p>
          <h1>
            Nos vemos en
            <br />
            el siguiente <span className="lime">nivel.</span>
          </h1>
          <p className="text-secondary mt-4">
            Inicia sesión para usar tus datos y beneficios en esta tienda de demostración.
          </p>
        </div>
        <div className="col-lg-5 offset-lg-1">
          <form className="panel" onSubmit={entrar} noValidate>
            <h2 className="mb-4">Iniciar sesión</h2>
            <ErrorMensaje error={error} />
            <Campo
              nombre="correo"
              label="Correo electrónico"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="username"
            />
            <Campo
              nombre="claveDemo"
              label="Clave de demostración"
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              autoComplete="current-password"
            />
            <button className="btn btn-boost w-100 mt-2" type="submit">
              Entrar <Icono nombre="flecha" />
            </button>
            <p className="microcopy mt-4 mb-0">
              ¿Primera vez aquí? <Link to="/registro">Crea tu cuenta demo</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

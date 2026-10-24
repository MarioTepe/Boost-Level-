import useApp from '../hooks/useApp.js'
import { useNavigate, Link } from 'react-router'
import PageTitle from '../componentes/ui/PageTitle.jsx'
import UsuarioForm from '../componentes/formularios/UsuarioForm.jsx'

export default function RegistroPage() {
  const { servicios, notificar } = useApp()
  const navigate = useNavigate()
  function guardar(datos) {
    const result = servicios.registrar(datos)
    if (result.ok) {
      notificar(result, 'Cuenta creada. Ya puedes iniciar sesión.')
      navigate('/login', { state: { correo: datos.correo } })
    }
    return result
  }
  return (
    <div className="container page-section">
      <div className="form-page">
        <PageTitle eyebrow="BIENVENIDO A LA COMUNIDAD" titulo="Tu cuenta. Tu siguiente nivel.">
          <p>Con @duoc.cl, tu compra tiene un 20% de descuento al iniciar sesión.</p>
        </PageTitle>
        <div className="panel">
          <UsuarioForm onGuardar={guardar} />
        </div>
        <p className="text-secondary mt-4">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

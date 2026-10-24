import { NavLink, Outlet } from 'react-router'
import Icono from '../ui/Icono.jsx'

export default function AdminLayout() {
  const links = [
    ['', 'Resumen'],
    ['productos', 'Productos'],
    ['categorias', 'Categorías'],
    ['usuarios', 'Usuarios'],
    ['pedidos', 'Pedidos'],
    ['criticos', 'Stock crítico'],
    ['reportes', 'Reportes'],
    ['perfil', 'Mi perfil'],
  ]
  return (
    <div className="container page-section">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <p className="eyebrow">CENTRO DE CONTROL</p>
          <h2>Administración</h2>
          <nav aria-label="Administración">
            {links.map(([url, label]) => (
              <NavLink key={url} end to={`/admin${url ? '/' + url : ''}`}>
                {label}
                <Icono nombre="flecha" size={16} />
              </NavLink>
            ))}
          </nav>
          <p className="microcopy mt-4">Datos locales de demostración.</p>
        </aside>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

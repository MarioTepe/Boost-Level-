import useApp from '../../hooks/useApp.js'
import { useState, useEffect } from 'react'
import { useLocation, Link, NavLink, Outlet } from 'react-router'
import { resumirCarrito } from '../../domain/precios.js'

import Icono from '../ui/Icono.jsx'

import Confirmacion from '../ui/Confirmacion.jsx'

export default function Layout() {
  const { estado, usuario, aviso, setAviso, error, errorSesion, notificar, logout, reset } = useApp()
  const [menu, setMenu] = useState(false)
  const [confirmar, setConfirmar] = useState(false)
  const location = useLocation()
  const cantidad = resumirCarrito(estado, usuario).cantidad
  useEffect(() => {
    setMenu(false)
    window.scrollTo?.(0, 0)
  }, [location.pathname])
  return (
    <>
      <a
        className="skip-link"
        href="#contenido"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('contenido').focus()
        }}
      >
        Saltar al contenido
      </a>
      <div className="topbar">
        <span>SUBE DE NIVEL. JUEGA A TU MANERA.</span>
        <span>Proyecto académico · Compra simulada</span>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Boost Level, inicio">
            <span className="brand-mark">
              B<span>↗</span>
            </span>
            <span>
              BOOST<span className="brand-light">LEVEL</span>
              <small>GEAR UP. LEVEL UP.</small>
            </span>
          </Link>
          <nav aria-label="Navegación principal" className={`main-nav ${menu ? 'is-open' : ''}`}>
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/productos">Productos</NavLink>
            <NavLink to="/categorias">Categorías</NavLink>
            <NavLink to="/ofertas">
              Ofertas <span className="nav-dot" />
            </NavLink>
            <NavLink to="/blogs">Blog</NavLink>
          </nav>
          <div className="header-actions">
            {usuario ? (
              <>
                <Link
                  to={usuario.rol === 'admin' ? '/admin' : '/productos'}
                  className="account-link"
                  aria-label={usuario.nombre}
                >
                  <Icono nombre="persona" />
                  <span>{usuario.nombre}</span>
                </Link>
                <button className="btn-link-small" onClick={() => notificar(logout(), 'Sesión cerrada.')}>
                  Salir
                </button>
              </>
            ) : (
              <Link to="/login" className="account-link" aria-label="Mi cuenta">
                <Icono nombre="persona" />
                <span>Mi cuenta</span>
              </Link>
            )}
            <Link to="/carrito" className="cart-link" aria-label={`Carrito, ${cantidad} unidades`}>
              <Icono nombre="carrito" />
              <span className="cart-count">{cantidad}</span>
            </Link>
            <button
              className="menu-toggle"
              aria-label="Abrir menú"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <Icono nombre={menu ? 'cerrar' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      {aviso && (
        <div className={`toast-message toast-${aviso.tipo}`} role="status">
          <span>{aviso.mensaje}</span>
          <button aria-label="Cerrar aviso" onClick={() => setAviso(null)}>
            <Icono nombre="cerrar" size={16} />
          </button>
        </div>
      )}
      {(error || errorSesion) && (
        <div className="container pt-3">
          <div className="alert alert-warning" role="alert">
            {(error || errorSesion).mensaje}{' '}
            <button className="btn btn-sm btn-outline-dark ms-2" onClick={() => setConfirmar(true)}>
              Restablecer datos demo
            </button>
          </div>
        </div>
      )}
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <section className="community-strip">
        <div className="container d-flex align-items-center justify-content-between gap-4 flex-wrap">
          <div>
            <p className="eyebrow mb-2">EL SIGUIENTE NIVEL TE ESPERA</p>
            <h2>Tu próximo setup empieza aquí.</h2>
          </div>
          <Link to="/productos" className="btn btn-boost">
            Encuentra tu equipo <Icono nombre="flecha" />
          </Link>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5">
              <Link to="/" className="brand footer-brand">
                BOOST<span className="brand-light">LEVEL ↗</span>
              </Link>
              <p className="text-secondary mt-3 footer-description">
                Tecnología, gaming y todo lo que necesitas para jugar a tu manera.
              </p>
              <span className="demo-tag">DEMO ACADÉMICA · DSY1104</span>
            </div>
            <div className="col-6 col-lg-3">
              <h3>Explora</h3>
              <Link to="/productos">Productos</Link>
              <Link to="/categorias">Categorías</Link>
              <Link to="/ofertas">Ofertas</Link>
              <Link to="/blogs">Nuestro blog</Link>
            </div>
            <div className="col-6 col-lg-4">
              <h3>Boost Level</h3>
              <Link to="/nosotros">Nosotros</Link>
              <Link to="/contacto">Contacto</Link>
              <Link to="/login">Acceso de administrador</Link>
              <button className="footer-reset" onClick={() => setConfirmar(true)}>
                Restablecer demostración
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Boost Level. Proyecto Full Stack II.</span>
            <span>Jordán Guzmán · Mario Tepe · Luis Contreras</span>
          </div>
        </div>
      </footer>
      {confirmar && (
        <Confirmacion
          titulo="¿Restablecer demostración?"
          onCancelar={() => setConfirmar(false)}
          onConfirmar={() => {
            reset()
            setConfirmar(false)
          }}
        >
          Se eliminarán los productos, usuarios, carrito y pedidos creados en esta demostración. Volverán los
          datos iniciales.
        </Confirmacion>
      )}
    </>
  )
}

import useApp from '../hooks/useApp.js'
import { imagen } from '../utils/moneda.js'
import { Link } from 'react-router'
import Icono from '../componentes/ui/Icono.jsx'
import GrillaProductos from '../componentes/catalogo/GrillaProductos.jsx'
import BlogCards from '../componentes/contenido/BlogCards.jsx'

export default function InicioPage() {
  const { estado, servicios, notificar } = useApp()
  const destacados = ['CO001', 'MS001', 'AC002', 'JM001']
    .map((id) => estado.productos.find((p) => p.id === id && p.activo))
    .filter(Boolean)
  return (
    <>
      <section className="hero">
        <img className="hero-background" src={imagen('img/fondo-setup.png')} alt="" />
        <div className="container hero-content">
          <div className="hero-kicker">
            <span className="status-dot" /> BIENVENIDO A BOOST LEVEL
          </div>
          <h1>
            Tu juego.
            <br />
            Tus reglas.
            <br />
            <span>Tu siguiente nivel.</span>
          </h1>
          <p>
            Encuentra la tecnología que va contigo.
            <br />
            Equipa tu setup. Potencia cada partida.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <Link className="btn btn-boost btn-lg" to="/productos">
              Explorar productos <Icono nombre="flecha" />
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/categorias">
              Ver categorías
            </Link>
          </div>
          <div className="hero-bottom">
            <span>01 / EQUIPADO PARA GANAR</span>
            <span>CONSOLAS · PERIFÉRICOS · GAMING</span>
          </div>
        </div>
        <div className="hero-side-label">PLAY BEYOND THE ORDINARY</div>
      </section>
      <div className="benefits-bar">
        <div className="container row mx-auto g-4">
          <div className="col-md-4">
            <Icono nombre="caja" />
            <span>
              <strong>Todo para tu setup</strong>
              <small>Tecnología y gaming en un lugar</small>
            </span>
          </div>
          <div className="col-md-4">
            <Icono nombre="escudo" />
            <span>
              <strong>Stock siempre visible</strong>
              <small>Compra según disponibilidad</small>
            </span>
          </div>
          <div className="col-md-4">
            <Icono nombre="persona" />
            <span>
              <strong>Comunidad Duoc</strong>
              <small>20% para clientes @duoc.cl</small>
            </span>
          </div>
        </div>
      </div>
      <section className="container page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECCIÓN BOOST</p>
            <h2>
              Favoritos para subir de nivel<span className="lime">.</span>
            </h2>
          </div>
          <Link to="/productos" className="text-link">
            Ver todo <Icono nombre="flecha" />
          </Link>
        </div>
        <GrillaProductos
          productos={destacados}
          categorias={estado.categorias}
          carrito={estado.carrito}
          onAgregarProducto={(id) =>
            notificar(servicios.carrito({ tipo: 'AGREGAR', productoId: id }), 'Producto agregado al carrito.')
          }
        />
      </section>
      <section className="container pb-5">
        <div className="duoc-banner">
          <div>
            <p className="eyebrow">TU CORREO TIENE BENEFICIOS</p>
            <h2>
              Estudia. Juega.
              <br />
              Ahorra un <span className="lime">20%.</span>
            </h2>
            <p>Regístrate con @duoc.cl e inicia sesión para aplicar tu descuento.</p>
            <Link to="/registro" className="text-link">
              Crear cuenta demo <Icono nombre="flecha" />
            </Link>
          </div>
          <span className="discount-art" aria-hidden="true">
            20<small>%</small>
          </span>
        </div>
      </section>
      <section className="container page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MÁS ALLÁ DEL JUEGO</p>
            <h2>Ideas para tu próximo setup.</h2>
          </div>
          <Link to="/blogs" className="text-link">
            Explorar blog <Icono nombre="flecha" />
          </Link>
        </div>
        <BlogCards />
      </section>
    </>
  )
}

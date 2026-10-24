import useApp from '../hooks/useApp.js'
import { resumirCarrito } from '../domain/precios.js'
import PageTitle from '../componentes/ui/PageTitle.jsx'
import Vacio from '../componentes/ui/Vacio.jsx'
import LineaCarrito from '../componentes/carrito/LineaCarrito.jsx'
import { Link } from 'react-router'
import Resumen from '../componentes/ui/Resumen.jsx'
import Icono from '../componentes/ui/Icono.jsx'

export default function CarritoPage() {
  const { estado, usuario, servicios, notificar } = useApp()
  const resumen = resumirCarrito(estado, usuario)
  const cambiar = (id, cantidad) =>
    notificar(servicios.carrito({ tipo: 'CAMBIAR', productoId: id, cantidad }), 'Cantidad actualizada.')
  const eliminar = (id) =>
    notificar(servicios.carrito({ tipo: 'ELIMINAR', productoId: id }), 'Producto eliminado del carrito.')
  return (
    <div className="container page-section">
      <PageTitle
        eyebrow="UN PASO MÁS CERCA"
        titulo="Tu próximo nivel, en el carrito."
        action={
          resumen.lineas.length > 0 && (
            <button
              className="btn btn-outline-light"
              onClick={() => notificar(servicios.carrito({ tipo: 'VACIAR' }), 'Carrito vaciado.')}
            >
              Vaciar carrito
            </button>
          )
        }
      />
      {!resumen.lineas.length ? (
        <Vacio titulo="Tu carrito está esperando">Explora el catálogo y agrega tu próximo equipo.</Vacio>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="panel cart-panel">
              {resumen.lineas.map((l) => (
                <LineaCarrito
                  key={l.productoId}
                  linea={l}
                  onCambiarCantidad={cambiar}
                  onEliminar={eliminar}
                />
              ))}
            </div>
            <Link className="text-link mt-4 d-inline-flex" to="/productos">
              ← Seguir explorando
            </Link>
          </div>
          <div className="col-lg-4">
            <Resumen resumen={resumen}>
              {resumen.valido ? (
                <Link className="btn btn-boost w-100" to="/checkout">
                  Continuar a entrega <Icono nombre="flecha" />
                </Link>
              ) : (
                <button className="btn btn-boost w-100" disabled>
                  Corrige el carrito para continuar
                </button>
              )}
              {!usuario && (
                <p className="microcopy mt-3">
                  ¿Tienes cuenta Duoc? <Link to="/login">Inicia sesión</Link> para aplicar tu beneficio.
                </p>
              )}
            </Resumen>
          </div>
        </div>
      )}
    </div>
  )
}

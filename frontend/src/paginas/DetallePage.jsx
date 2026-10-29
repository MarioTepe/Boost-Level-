import { useParams, Link } from 'react-router'
import useApp from '../hooks/useApp.js'
import NoEncontrado from '../componentes/ui/NoEncontrado.jsx'

import FotoProducto from '../componentes/ui/FotoProducto.jsx'
import { moneda } from '../utils/moneda.js'
import { porcentajeOferta, precioVigente } from '../domain/precios.js'
import Icono from '../componentes/ui/Icono.jsx'

export default function DetallePage() {
  const { id } = useParams()
  const { estado, servicios, notificar } = useApp()
  const producto = estado.productos.find((p) => p.id === id && p.activo)
  if (!producto)
    return (
      <div className="container page-section">
        <NoEncontrado titulo="Producto no encontrado" />
      </div>
    )
  const cantidad = estado.carrito.find((l) => l.productoId === id)?.cantidad || 0
  return (
    <div className="container page-section">
      <div className="breadcrumb-line">
        <Link to="/productos">Productos</Link>
        <span>/</span>
        <span>{producto.codigo}</span>
      </div>
      <div className="row g-5 align-items-center">
        <div className="col-lg-6">
          <div className="detail-photo">
            <FotoProducto producto={producto} />
          </div>
        </div>
        <div className="col-lg-6">
          <p className="eyebrow">{estado.categorias.find((c) => c.id === producto.categoriaId)?.nombre}</p>
          <h1 className="detail-title">{producto.nombre}</h1>
          <p className="text-secondary mt-4">{producto.descripcion}</p>
          <div className="detail-price">
            {producto.precioOferta !== null && <del>{moneda(producto.precio)}</del>}
            <strong>{moneda(precioVigente(producto))}</strong>
            {producto.precioOferta !== null && (
              <span className="discount-percentage">−{porcentajeOferta(producto)}%</span>
            )}
          </div>
          <p>{producto.stock ? `${producto.stock} unidades disponibles` : 'Sin stock'}</p>
          <button
            className="btn btn-boost btn-lg"
            disabled={cantidad >= producto.stock}
            onClick={() =>
              notificar(
                servicios.carrito({ tipo: 'AGREGAR', productoId: id }),
                'Producto agregado al carrito.',
              )
            }
          >
            <Icono nombre="bolsa" /> Agregar al carrito
          </button>
          <Link className="btn btn-outline-light btn-lg ms-2" to="/carrito">
            Ver carrito
          </Link>
          {cantidad > 0 && <p className="in-cart mt-3">{cantidad} unidades en tu carrito</p>}
          <div className="detail-note">
            <Icono nombre="escudo" />
            <span>Datos y compras de demostración. Sin cobros reales.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

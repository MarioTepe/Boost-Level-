import { Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import FotoProducto from '../ui/FotoProducto.jsx'

import Icono from '../ui/Icono.jsx'
import { moneda } from '../../utils/moneda.js'
import { porcentajeOferta, precioVigente } from '../../domain/precios.js'

export default function TarjetaProducto({
  producto,
  categoria,
  cantidadEnCarrito = 0,
  enlaceDetalle = '#',
  onAgregarProducto,
}) {
  const disponible = producto.stock > cantidadEnCarrito
  return (
    <Card as="article" className="product-card">
      <Link to={enlaceDetalle} className="product-image">
        <FotoProducto producto={producto} />
        {producto.precioOferta !== null && (
          <Badge bg="" className="product-badge">
            OFERTA
          </Badge>
        )}
        <span className="product-view">
          Ver producto <Icono nombre="flecha" size={16} />
        </span>
      </Link>
      <Card.Body className="product-body">
        <p className="product-category">{categoria || 'SELECCIÓN BOOST'}</p>
        <Card.Title as="h2">
          <Link to={enlaceDetalle}>{producto.nombre}</Link>
        </Card.Title>
        <div className="product-stock">
          <span className={producto.stock ? 'stock-dot' : 'stock-dot empty'} />
          {producto.stock ? `${producto.stock} disponibles` : 'Sin stock'}
        </div>
        <div className="product-bottom">
          <div>
            {producto.precioOferta !== null && <del>{moneda(producto.precio)}</del>}
            <strong>{moneda(precioVigente(producto))}</strong>
            {producto.precioOferta !== null && (
              <span className="discount-percentage">−{porcentajeOferta(producto)}%</span>
            )}
          </div>
          <Button
            variant=""
            className="add-button"
            aria-label={`Agregar ${producto.nombre}`}
            disabled={!disponible}
            title={disponible ? 'Agregar al carrito' : 'Alcanzaste el stock disponible'}
            onClick={() => onAgregarProducto(producto.id)}
          >
            <Icono nombre="bolsa" size={19} />
          </Button>
        </div>
        {cantidadEnCarrito > 0 && <p className="in-cart">{cantidadEnCarrito} en tu carrito</p>}
      </Card.Body>
    </Card>
  )
}

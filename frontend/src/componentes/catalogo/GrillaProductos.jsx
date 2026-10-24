import { Row, Col } from 'react-bootstrap'

import TarjetaProducto from './TarjetaProducto.jsx'

export default function GrillaProductos({ productos, categorias, carrito, onAgregarProducto }) {
  return (
    <Row className="g-4">
      {productos.map((p) => (
        <Col xs={12} sm={6} xl={4} xxl={3} key={p.id}>
          <TarjetaProducto
            producto={p}
            categoria={categorias.find((c) => c.id === p.categoriaId)?.nombre}
            cantidadEnCarrito={carrito.find((l) => l.productoId === p.id)?.cantidad || 0}
            enlaceDetalle={`/productos/${p.id}`}
            onAgregarProducto={onAgregarProducto}
          />
        </Col>
      ))}
    </Row>
  )
}

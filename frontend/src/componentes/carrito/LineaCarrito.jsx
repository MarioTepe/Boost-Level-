import FotoProducto from '../ui/FotoProducto.jsx'
import { moneda } from '../../utils/moneda.js'

export default function LineaCarrito({ linea, onCambiarCantidad, onEliminar }) {
  const nombre = linea.producto?.nombre || linea.productoId
  return (
    <article className="cart-line">
      <div className="cart-line-image">{linea.producto && <FotoProducto producto={linea.producto} />}</div>
      <div className="cart-line-info">
        <p className="product-category">{linea.productoId}</p>
        <h2>{nombre}</h2>
        <p>{moneda(linea.precio)} por unidad</p>
        {linea.error && (
          <p className="field-error" role="alert">
            {linea.error}
          </p>
        )}
        <button
          className="btn-link-small"
          aria-label={`Eliminar ${nombre}`}
          onClick={() => onEliminar(linea.productoId)}
        >
          Eliminar
        </button>
      </div>
      <div className="quantity">
        <button
          aria-label={`Disminuir ${nombre}`}
          disabled={linea.cantidad <= 1}
          onClick={() => onCambiarCantidad(linea.productoId, linea.cantidad - 1)}
        >
          −
        </button>
        <input
          type="number"
          min="1"
          step="1"
          aria-label={`Cantidad de ${nombre}`}
          value={linea.cantidad}
          onChange={(e) => onCambiarCantidad(linea.productoId, Number(e.target.value))}
        />
        <button
          aria-label={`Aumentar ${nombre}`}
          disabled={!linea.producto?.activo || linea.cantidad >= linea.producto.stock}
          onClick={() => onCambiarCantidad(linea.productoId, linea.cantidad + 1)}
        >
          +
        </button>
      </div>
      <strong className="cart-line-total">{moneda(linea.subtotal)}</strong>
    </article>
  )
}

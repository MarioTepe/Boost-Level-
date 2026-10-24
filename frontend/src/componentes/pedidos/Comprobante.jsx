import { fechaCorta, moneda } from '../../utils/moneda.js'

export default function Comprobante({ pedido }) {
  return (
    <div className="panel receipt">
      <div className="receipt-header">
        <div>
          <p className="eyebrow">COMPROBANTE SIMULADO</p>
          <h2>Pedido #{pedido.id.slice(0, 8).toUpperCase()}</h2>
          <span className="text-secondary">{fechaCorta(pedido.creadoEn)}</span>
        </div>
        <span className="status-pill">Confirmado</span>
      </div>
      <div className="row my-4">
        <div className="col-md-6">
          <h3>Cliente</h3>
          <p>
            {pedido.contacto.nombre} {pedido.contacto.apellidos}
            <br />
            {pedido.contacto.correo}
          </p>
        </div>
        <div className="col-md-6">
          <h3>Entrega</h3>
          <p>
            {pedido.entrega.modalidad === 'retiro'
              ? 'Retiro en tienda (demostración)'
              : `${pedido.entrega.direccion}, ${pedido.entrega.comunaId}, ${pedido.entrega.regionId}`}
          </p>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.lineas.map((l) => (
              <tr key={l.productoId}>
                <td>
                  {l.nombre}
                  <small className="d-block text-secondary">{l.codigo}</small>
                </td>
                <td>{l.cantidad}</td>
                <td>{moneda(l.precioUnitario)}</td>
                <td>{moneda(l.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="receipt-totals">
        <p>
          Subtotal <strong>{moneda(pedido.subtotal)}</strong>
        </p>
        <p>
          Descuento <strong>−{moneda(pedido.descuento)}</strong>
        </p>
        <p>
          Entrega <strong>Sin costo</strong>
        </p>
        <p className="summary-total">
          Total <strong>{moneda(pedido.total)}</strong>
        </p>
      </div>
      <p className="microcopy mt-4">Proyecto académico. Sin cobro real ni validez tributaria.</p>
    </div>
  )
}

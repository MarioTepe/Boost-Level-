import { moneda } from '../../utils/moneda.js'
import Icono from './Icono.jsx'

export default function Resumen({ resumen, children }) {
  return (
    <aside className="panel order-summary">
      <h2>Resumen de compra</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{moneda(resumen.subtotal)}</dd>
        </div>
        <div>
          <dt>Descuento Duoc {resumen.descuento ? '(20%)' : ''}</dt>
          <dd>{resumen.descuento ? `−${moneda(resumen.descuento)}` : moneda(0)}</dd>
        </div>
        <div>
          <dt>Entrega de demostración</dt>
          <dd>Sin costo</dd>
        </div>
        <div className="summary-total">
          <dt>Total</dt>
          <dd>{moneda(resumen.total)}</dd>
        </div>
      </dl>
      {children}
      <p className="microcopy mt-3 mb-0">
        <Icono nombre="escudo" size={15} /> Compra simulada. No se realizan cobros.
      </p>
    </aside>
  )
}

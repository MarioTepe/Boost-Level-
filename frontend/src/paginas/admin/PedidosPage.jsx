import useApp from '../../hooks/useApp.js'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import Tabla from '../../componentes/administracion/Tabla.jsx'
import { fechaCorta, moneda } from '../../utils/moneda.js'

import { Link } from 'react-router'

export default function PedidosPage({ compacto = false, clienteId = null }) {
  const { estado } = useApp()
  const pedidos = estado.pedidos
    .filter((p) => !clienteId || p.clienteId === clienteId)
    .slice()
    .reverse()
  return (
    <>
      {!compacto && <PageTitle eyebrow="COMPRAS CONFIRMADAS" titulo="Pedidos" />}
      <Tabla cabeceras={['Pedido', 'Fecha', 'Cliente', 'Total', 'Acciones']} vacia={!pedidos.length}>
        {pedidos.map((p) => (
          <tr key={p.id}>
            <td>#{p.id.slice(0, 8).toUpperCase()}</td>
            <td>{fechaCorta(p.creadoEn)}</td>
            <td>
              {p.contacto.nombre} {p.contacto.apellidos}
              <small className="d-block text-secondary">{p.clienteId ? 'Cliente' : 'Invitado'}</small>
            </td>
            <td>{moneda(p.total)}</td>
            <td>
              <Link className="btn btn-sm btn-outline-light" to={`/admin/pedidos/${p.id}`}>
                Ver comprobante
              </Link>
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  )
}

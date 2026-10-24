import { useParams } from 'react-router'
import useApp from '../../hooks/useApp.js'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import Comprobante from '../../componentes/pedidos/Comprobante.jsx'
import NoEncontrado from '../../componentes/ui/NoEncontrado.jsx'

export default function PedidoDetallePage() {
  const { id } = useParams()
  const { estado } = useApp()
  const pedido = estado.pedidos.find((p) => p.id === id)
  return pedido ? (
    <>
      <PageTitle eyebrow="PEDIDOS" titulo="Detalle del pedido" />
      <Comprobante pedido={pedido} />
    </>
  ) : (
    <NoEncontrado titulo="Pedido no encontrado" />
  )
}

import { imagen } from '../../utils/moneda.js'

export default function FotoProducto({ producto, ...props }) {
  return (
    <img
      src={imagen(producto.imagen || 'img/logo.svg')}
      alt={producto.nombre}
      loading="lazy"
      onError={(e) => {
        if (!e.currentTarget.src.endsWith('/img/logo.svg')) {
          e.currentTarget.src = imagen('img/logo.svg')
        }
      }}
      {...props}
    />
  )
}

import useApp from '../hooks/useApp.js'
import PageTitle from '../componentes/ui/PageTitle.jsx'
import { Link } from 'react-router'
import Icono from '../componentes/ui/Icono.jsx'

export default function CategoriasPage() {
  const { estado } = useApp()
  return (
    <div className="container page-section">
      <PageTitle eyebrow="EXPLORA A TU MANERA" titulo="Un mundo para cada jugador." />
      <div className="row g-4">
        {estado.categorias
          .filter((c) => c.activo)
          .map((c, i) => (
            <div className="col-md-6 col-xl-4" key={c.id}>
              <Link to={`/categorias/${c.id}`} className="category-tile">
                <span className="category-number">0{i + 1}</span>
                <Icono nombre="caja" size={32} />
                <h2>{c.nombre}</h2>
                <span>
                  {estado.productos.filter((p) => p.activo && p.categoriaId === c.id).length} productos{' '}
                  <Icono nombre="flecha" />
                </span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

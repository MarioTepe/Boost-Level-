import { blogs } from '../../data/blogs.js'
import { Link } from 'react-router'
import { imagen } from '../../utils/moneda.js'
import Icono from '../ui/Icono.jsx'

export default function BlogCards() {
  return (
    <div className="row g-4">
      {blogs.map((b) => (
        <div key={b.slug} className="col-md-6">
          <Link to={`/blogs/${b.slug}`} className="blog-card">
            <img src={imagen(b.imagen)} alt="" loading="lazy" />
            <div>
              <p className="eyebrow">{b.etiqueta}</p>
              <h2>{b.titulo}</h2>
              <p>{b.resumen}</p>
              <span className="text-link">
                Leer artículo <Icono nombre="flecha" />
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

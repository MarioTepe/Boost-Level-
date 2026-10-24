import { useParams, Link } from 'react-router'
import { blogs } from '../data/blogs.js'
import NoEncontrado from '../componentes/ui/NoEncontrado.jsx'

import { imagen } from '../utils/moneda.js'

export default function ArticuloPage() {
  const { slug } = useParams()
  const blog = blogs.find((b) => b.slug === slug)
  if (!blog)
    return (
      <div className="container page-section">
        <NoEncontrado titulo="Artículo no encontrado" />
      </div>
    )
  return (
    <article className="container article page-section">
      <Link to="/blogs" className="text-link">
        ← Volver al blog
      </Link>
      <p className="eyebrow mt-4">{blog.etiqueta}</p>
      <h1>{blog.titulo}</h1>
      <img className="article-photo" src={imagen(blog.imagen)} alt="" />
      {blog.parrafos.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </article>
  )
}

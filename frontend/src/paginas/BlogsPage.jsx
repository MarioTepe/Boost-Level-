import PageTitle from '../componentes/ui/PageTitle.jsx'
import BlogCards from '../componentes/contenido/BlogCards.jsx'

export default function BlogsPage() {
  return (
    <div className="container page-section">
      <PageTitle eyebrow="GUÍAS Y CONSEJOS" titulo="Un mejor setup empieza con una idea." />
      <BlogCards />
    </div>
  )
}

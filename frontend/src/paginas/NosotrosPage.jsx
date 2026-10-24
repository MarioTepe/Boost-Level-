import PageTitle from '../componentes/ui/PageTitle.jsx'
import { imagen } from '../utils/moneda.js'

export default function NosotrosPage() {
  return (
    <div className="container page-section">
      <PageTitle eyebrow="SOMOS BOOST LEVEL" titulo="Compartimos tu pasión por jugar." />
      <div className="row g-5 align-items-center">
        <div className="col-lg-6">
          <img
            className="about-image"
            src={imagen('img/fondo-neon.png')}
            alt="Setup con iluminación gaming"
          />
        </div>
        <div className="col-lg-6">
          <h2>Un equipo. Muchas formas de jugar.</h2>
          <p className="text-secondary">
            Boost Level es una tienda de tecnología y gaming creada para Desarrollo Fullstack II. Nuestro
            objetivo es construir una experiencia clara para encontrar productos, conocer su disponibilidad y
            completar una compra de demostración.
          </p>
          <p className="text-secondary">
            Evolucionamos nuestro primer proyecto HTML hacia React, con componentes reutilizables, datos
            compartidos y pruebas de comportamiento.
          </p>
          <div className="panel mt-4">
            <p className="eyebrow">NUESTRO EQUIPO</p>
            <p>
              Jordán Guzmán Parra
              <br />
              Mario Tepe Espinoza
              <br />
              Luis Contreras Gonzalez
            </p>
            <span className="demo-tag">PROYECTO ACADÉMICO · 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}

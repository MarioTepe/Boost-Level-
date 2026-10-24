import Vacio from './Vacio.jsx'

export default function NoEncontrado({ titulo = 'No encontramos lo que buscas' }) {
  return (
    <Vacio nivel={1} titulo={titulo}>
      El enlace ya no está disponible o el identificador no existe.
    </Vacio>
  )
}

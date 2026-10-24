import Vacio from '../ui/Vacio.jsx'

export default function Tabla({ cabeceras, children, vacia = false }) {
  return vacia ? (
    <Vacio titulo="Sin registros todavía" enlace={null}>
      Los nuevos datos aparecerán aquí.
    </Vacio>
  ) : (
    <div className="table-responsive panel admin-table">
      <table className="table align-middle">
        <thead>
          <tr>
            {cabeceras.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

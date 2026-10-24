import { useState } from 'react'
import Confirmacion from '../ui/Confirmacion.jsx'

export default function BajaButton({ activo = true, nombre, onBaja }) {
  const [confirmar, setConfirmar] = useState(false)
  return (
    <>
      <button className="btn btn-sm btn-outline-danger" disabled={!activo} onClick={() => setConfirmar(true)}>
        Desactivar
      </button>
      {confirmar && (
        <Confirmacion
          titulo={`¿Desactivar ${nombre}?`}
          onCancelar={() => setConfirmar(false)}
          onConfirmar={() => {
            onBaja()
            setConfirmar(false)
          }}
        >
          Esta acción retira el registro de uso activo y conserva su historial.
        </Confirmacion>
      )}
    </>
  )
}

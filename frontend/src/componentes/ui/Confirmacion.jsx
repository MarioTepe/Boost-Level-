import { useRef, useEffect } from 'react'

export default function Confirmacion({ titulo, children, onConfirmar, onCancelar }) {
  const dialogo = useRef(null)
  useEffect(() => {
    const previo = document.activeElement
    dialogo.current.querySelector('button').focus()
    return () => previo?.focus()
  }, [])
  function teclado(e) {
    if (e.key === 'Escape') onCancelar()
    if (e.key === 'Tab') {
      const botones = [...dialogo.current.querySelectorAll('button')]
      if (e.shiftKey && document.activeElement === botones[0]) {
        e.preventDefault()
        botones.at(-1).focus()
      } else if (!e.shiftKey && document.activeElement === botones.at(-1)) {
        e.preventDefault()
        botones[0].focus()
      }
    }
  }
  return (
    <div className="modal-shade">
      <section
        ref={dialogo}
        onKeyDown={teclado}
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <h2 id="confirm-title">{titulo}</h2>
        <p>{children}</p>
        <div className="d-flex gap-2 justify-content-end">
          <button className="btn btn-outline-light" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirmar}>
            Confirmar
          </button>
        </div>
      </section>
    </div>
  )
}

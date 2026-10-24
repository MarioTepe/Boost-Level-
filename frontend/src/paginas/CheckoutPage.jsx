import useApp from '../hooks/useApp.js'
import { useNavigate, useLocation } from 'react-router'

import { useState, useRef } from 'react'

import { resumirCarrito } from '../domain/precios.js'
import Vacio from '../componentes/ui/Vacio.jsx'
import PageTitle from '../componentes/ui/PageTitle.jsx'
import ErrorMensaje from '../componentes/ui/ErrorMensaje.jsx'
import Campo from '../componentes/ui/Campo.jsx'
import Direccion from '../componentes/formularios/Direccion.jsx'
import Resumen from '../componentes/ui/Resumen.jsx'
import { moneda } from '../utils/moneda.js'
import Icono from '../componentes/ui/Icono.jsx'

export default function CheckoutPage() {
  const { estado, usuario, servicios, notificar } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [datos, setDatos] = useState(() => ({
    nombre: usuario?.nombre || '',
    apellidos: usuario?.apellidos || '',
    correo: usuario?.correo || '',
    regionId: usuario?.regionId || '',
    comunaId: usuario?.comunaId || '',
    direccion: usuario?.direccion || '',
    modalidad: 'domicilio',
    ...location.state?.datos,
  }))
  const [resultado, setResultado] = useState('aceptado')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)
  const bloqueo = useRef(false)
  const intentoId = useRef(crypto.randomUUID())
  const resumen = resumirCarrito(estado, usuario)
  async function comprar(e) {
    e.preventDefault()
    if (bloqueo.current) return
    bloqueo.current = true
    setCargando(true)
    setError(null)
    const solicitud = {
      intentoId: intentoId.current,
      contacto: { nombre: datos.nombre, apellidos: datos.apellidos, correo: datos.correo },
      entrega: {
        modalidad: datos.modalidad,
        regionId: datos.regionId,
        comunaId: datos.comunaId,
        direccion: datos.direccion,
      },
      resultadoSimulado: resultado,
      resumenAceptado: resumen.firma,
    }
    const result = await servicios.confirmarCompra(solicitud)
    bloqueo.current = false
    setCargando(false)
    if (result.ok) {
      notificar(result, 'Compra simulada confirmada.')
      navigate(`/compra/exitosa/${result.data.id}`, { replace: true })
    } else if (result.error.codigo === 'PAGO_RECHAZADO')
      navigate('/compra/rechazada', { state: { mensaje: result.error.mensaje, datos } })
    else setError(result.error)
  }
  if (!resumen.lineas.length)
    return (
      <div className="container page-section">
        <Vacio titulo="Tu carrito está vacío">Agrega productos para comenzar la entrega.</Vacio>
      </div>
    )
  if (!resumen.valido)
    return (
      <div className="container page-section">
        <Vacio titulo="Revisa tu carrito" enlace="/carrito" accion="Corregir cantidades">
          Hay productos no disponibles o cantidades mayores al stock.
        </Vacio>
      </div>
    )
  return (
    <div className="container page-section">
      <PageTitle eyebrow="TU EQUIPO ESTÁ CASI LISTO" titulo="Completa tu entrega." />
      <div className="checkout-steps">
        <span className="done">01 Carrito</span>
        <span className="active">02 Entrega y confirmación</span>
        <span>03 Tu pedido</span>
      </div>
      <form onSubmit={comprar} noValidate>
        <div className="row g-4">
          <div className="col-lg-8">
            <section className="panel">
              <h2>Datos de contacto</h2>
              <p className="microcopy">
                Compra de demostración. Usa datos ficticios; no se solicitará información bancaria.
              </p>
              <ErrorMensaje error={error} />
              <div className="row">
                {[
                  ['nombre', 'Nombre'],
                  ['apellidos', 'Apellidos'],
                  ['correo', 'Correo electrónico'],
                ].map(([key, label]) => (
                  <div className={key === 'correo' ? 'col-12' : 'col-md-6'} key={key}>
                    <Campo
                      nombre={key}
                      label={label}
                      type={key === 'correo' ? 'email' : 'text'}
                      value={datos[key]}
                      onChange={(e) => setDatos({ ...datos, [key]: e.target.value })}
                      error={error?.campos[key]}
                    />
                  </div>
                ))}
              </div>
              <h2 className="mt-4">Modalidad de entrega</h2>
              <fieldset className="delivery-options">
                <legend className="visually-hidden">Selecciona entrega</legend>
                {[
                  ['domicilio', 'Despacho a domicilio', 'Dirección de entrega ficticia'],
                  ['retiro', 'Retiro en tienda', 'Retiro de demostración'],
                ].map(([value, label, note]) => (
                  <label key={value} className={datos.modalidad === value ? 'selected' : ''}>
                    <input
                      type="radio"
                      name="modalidad"
                      value={value}
                      checked={datos.modalidad === value}
                      onChange={() => setDatos({ ...datos, modalidad: value })}
                    />
                    <span>
                      <strong>{label}</strong>
                      <small>{note} · Sin costo</small>
                    </span>
                  </label>
                ))}
              </fieldset>
              {datos.modalidad === 'domicilio' && (
                <Direccion valores={datos} onChange={setDatos} errores={error?.campos} />
              )}
              <div className="simulation-control">
                <Campo nombre="resultadoSimulado" label="Resultado del pago de demostración">
                  {(props) => (
                    <select
                      {...props}
                      className="form-select"
                      value={resultado}
                      onChange={(e) => setResultado(e.target.value)}
                    >
                      <option value="aceptado">Aceptado — confirmar compra simulada</option>
                      <option value="rechazado">Rechazado — conservar carrito</option>
                    </select>
                  )}
                </Campo>
                <p className="microcopy mb-0">
                  Puedes probar ambos resultados. Esta selección no realiza un pago real.
                </p>
              </div>
            </section>
          </div>
          <div className="col-lg-4">
            <Resumen resumen={resumen}>
              <div className="checkout-items">
                {resumen.lineas.map((l) => (
                  <p key={l.productoId}>
                    <span>
                      {l.producto.nombre} × {l.cantidad}
                    </span>
                    <strong>{moneda(l.subtotal)}</strong>
                  </p>
                ))}
              </div>
              <button type="submit" className="btn btn-boost w-100" disabled={cargando}>
                {cargando ? 'Confirmando…' : 'Confirmar compra simulada'} <Icono nombre="flecha" />
              </button>
            </Resumen>
          </div>
        </div>
      </form>
    </div>
  )
}

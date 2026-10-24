import { useContext } from 'react'
import TiendaContext from '../contexto/TiendaContext.js'
import SesionContext from '../contexto/SesionContext.js'
import { crearServicios } from '../services/tienda.service.js'
import { fallo } from '../domain/errores.js'

export default function useApp() {
  const tienda = useContext(TiendaContext)
  const sesion = useContext(SesionContext)
  const servicios = crearServicios(tienda.repo, { usuarioId: () => sesion.usuario?.id || null })
  function notificar(result, mensaje) {
    tienda.setAviso(
      result.ok ? { tipo: 'success', mensaje } : { tipo: 'danger', mensaje: result.error.mensaje },
    )
    return result
  }
  function reset() {
    const salida = sesion.logout()
    if (!salida.ok) return notificar(salida)
    try {
      tienda.repo.restablecer()
      return notificar({ ok: true }, 'La demostración volvió a sus datos iniciales.')
    } catch (error) {
      return notificar(fallo(error))
    }
  }
  return { ...tienda, ...sesion, servicios, notificar, reset }
}

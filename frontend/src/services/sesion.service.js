import { CLAVE_SESION } from '../repositories/storage.adapter.js'
import { exigir, fallo } from '../domain/errores.js'

import { normalizarCorreo } from '../domain/validaciones.js'

export function leerSesion(storage) {
  try {
    const raw = storage.leer(CLAVE_SESION)
    if (!raw) return { usuarioId: null, error: null }
    const value = JSON.parse(raw)
    exigir(
      typeof value?.usuarioId === 'string',
      'ESQUEMA_INVALIDO',
      'La sesión guardada no es válida. Inicia sesión nuevamente.',
    )
    return { usuarioId: value.usuarioId, error: null }
  } catch (error) {
    return { usuarioId: null, error: fallo(error).error }
  }
}
export function iniciarSesion(repo, storage, correo, clave) {
  try {
    const usuario = repo
      .leerEstado()
      .usuarios.find((u) => u.activo && u.correo === normalizarCorreo(correo) && u.claveDemo === clave)
    exigir(usuario, 'ACCESO_DENEGADO', 'El correo o la clave demo no coinciden con una cuenta activa.')
    storage.guardar(CLAVE_SESION, JSON.stringify({ usuarioId: usuario.id }))
    return { ok: true, data: usuario }
  } catch (error) {
    return fallo(error)
  }
}
export function cerrarSesion(storage) {
  try {
    storage.eliminar(CLAVE_SESION)
    return { ok: true }
  } catch (error) {
    return fallo(error)
  }
}

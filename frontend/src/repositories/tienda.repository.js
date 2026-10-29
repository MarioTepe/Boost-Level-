import { aplicarOfertasIniciales, crearDatosIniciales } from '../data/inicial.js'
import { validarEstado } from '../domain/esquema.js'
import { ErrorTienda, fallo } from '../domain/errores.js'

import { CLAVE_TIENDA } from './storage.adapter.js'

export function crearRepositorio(storage, inicial = crearDatosIniciales) {
  const listeners = new Set()
  let snapshot = { estado: inicial(), error: null }
  function leer() {
    const raw = storage.leer(CLAVE_TIENDA)
    let estado
    if (raw === null) estado = inicial()
    else {
      try {
        estado = JSON.parse(raw)
      } catch {
        throw new ErrorTienda(
          'ESQUEMA_INVALIDO',
          'No pudimos leer los datos guardados. Puedes restablecer la demostración.',
        )
      }
    }
    validarEstado(estado)
    const actualizado = aplicarOfertasIniciales(estado)
    if (actualizado !== estado) {
      validarEstado(actualizado)
      storage.guardar(CLAVE_TIENDA, JSON.stringify(actualizado))
    }
    return actualizado
  }
  function publicar(estado, error = null) {
    snapshot = { estado, error }
    listeners.forEach((listener) => listener())
  }
  try {
    snapshot = { estado: leer(), error: null }
  } catch (error) {
    snapshot = { estado: inicial(), error: fallo(error).error }
  }
  return {
    getSnapshot: () => snapshot,
    suscribir: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    leerEstado: () => structuredClone(leer()),
    actualizar(transformar) {
      const anterior = leer()
      const candidato = transformar(structuredClone(anterior))
      candidato.revision = anterior.revision + 1
      validarEstado(candidato)
      storage.guardar(CLAVE_TIENDA, JSON.stringify(candidato))
      publicar(candidato)
      return structuredClone(candidato)
    },
    restablecer() {
      const estado = validarEstado(inicial())
      storage.guardar(CLAVE_TIENDA, JSON.stringify(estado))
      publicar(estado)
      return estado
    },
  }
}

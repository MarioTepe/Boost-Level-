import { useContext, useState } from 'react'
import TiendaContext from './TiendaContext.js'

import { crearStorage } from '../repositories/storage.adapter.js'
import { leerSesion, iniciarSesion, cerrarSesion } from '../services/sesion.service.js'

import SesionContext from './SesionContext.js'

export default function SessionProvider({ children, sessionStorage }) {
  const { repo, estado } = useContext(TiendaContext)
  const [storage] = useState(() => sessionStorage || crearStorage(() => window.sessionStorage))
  const [sesion, setSesion] = useState(() => leerSesion(storage))
  const usuario = estado.usuarios.find((u) => u.id === sesion.usuarioId && u.activo) || null
  function login(correo, clave) {
    const result = iniciarSesion(repo, storage, correo, clave)
    if (result.ok) setSesion({ usuarioId: result.data.id, error: null })
    return result
  }
  function logout() {
    const result = cerrarSesion(storage)
    if (result.ok) setSesion({ usuarioId: null, error: null })
    return result
  }
  return (
    <SesionContext.Provider value={{ usuario, login, logout, errorSesion: sesion.error }}>
      {children}
    </SesionContext.Provider>
  )
}

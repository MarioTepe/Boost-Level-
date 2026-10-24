import { useState, useEffect } from 'react'
import { crearRepositorio } from '../repositories/tienda.repository.js'
import { crearStorage } from '../repositories/storage.adapter.js'

import TiendaContext from './TiendaContext.js'

export default function TiendaProvider({ children, repository }) {
  const [repo] = useState(() => repository || crearRepositorio(crearStorage(() => window.localStorage)))
  const [snapshot, setSnapshot] = useState(() => repo.getSnapshot())
  // Como el carrito de clases: React muestra el estado y setState actualiza la vista.
  // El repositorio avisa solo después de guardar correctamente el cambio completo.
  useEffect(() => repo.suscribir(() => setSnapshot(repo.getSnapshot())), [repo])
  const [aviso, setAviso] = useState(null)
  return (
    <TiendaContext.Provider value={{ ...snapshot, repo, aviso, setAviso }}>{children}</TiendaContext.Provider>
  )
}

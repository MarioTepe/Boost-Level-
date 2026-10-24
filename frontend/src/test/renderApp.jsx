import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App.jsx'
import SessionProvider from '../contexto/SessionProvider.jsx'
import TiendaProvider from '../contexto/TiendaProvider.jsx'
import { CLAVE_SESION } from '../repositories/storage.adapter.js'
import { preparar, storageMemoria } from './factories.js'

export function renderApp(ruta = '/', opciones = {}) {
  const { repo, storage } = preparar(opciones)
  const sessionStorage = storageMemoria()
  if (opciones.sesion) sessionStorage.guardar(CLAVE_SESION, JSON.stringify({ usuarioId: opciones.sesion }))
  const result = render(
    <MemoryRouter initialEntries={[ruta]}>
      <TiendaProvider repository={repo}>
        <SessionProvider sessionStorage={sessionStorage}>
          <App />
        </SessionProvider>
      </TiendaProvider>
    </MemoryRouter>,
  )
  return { ...result, repo, storage, sessionStorage }
}

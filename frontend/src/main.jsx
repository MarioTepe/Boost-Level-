import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import App from './App.jsx'
import SessionProvider from './contexto/SessionProvider.jsx'
import TiendaProvider from './contexto/TiendaProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <TiendaProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </TiendaProvider>
    </BrowserRouter>
  </StrictMode>,
)

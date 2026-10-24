import useApp from '../../hooks/useApp.js'
import { Outlet, Navigate } from 'react-router'

export default function RutaAdmin() {
  const { usuario } = useApp()
  return usuario?.rol === 'admin' ? <Outlet /> : <Navigate to="/login" replace />
}

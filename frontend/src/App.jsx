import { Route, Routes, useLocation } from 'react-router'
import Layout from './componentes/layout/Layout.jsx'
import AdminLayout from './componentes/layout/AdminLayout.jsx'
import NoEncontrado from './componentes/ui/NoEncontrado.jsx'
import CatalogoPage from './paginas/CatalogoPage.jsx'
import CategoriasPage from './paginas/CategoriasPage.jsx'
import DetallePage from './paginas/DetallePage.jsx'
import InicioPage from './paginas/InicioPage.jsx'
import NosotrosPage from './paginas/NosotrosPage.jsx'
import BlogsPage from './paginas/BlogsPage.jsx'
import ArticuloPage from './paginas/ArticuloPage.jsx'
import ContactoPage from './paginas/ContactoPage.jsx'
import LoginPage from './paginas/LoginPage.jsx'
import RegistroPage from './paginas/RegistroPage.jsx'
import RutaAdmin from './componentes/navegacion/RutaAdmin.jsx'
import CarritoPage from './paginas/CarritoPage.jsx'
import CheckoutPage from './paginas/CheckoutPage.jsx'
import CompraExitosaPage from './paginas/CompraExitosaPage.jsx'
import CompraRechazadaPage from './paginas/CompraRechazadaPage.jsx'
import DashboardPage from './paginas/admin/DashboardPage.jsx'
import ProductosPage from './paginas/admin/ProductosPage.jsx'
import ProductoFormPage from './paginas/admin/ProductoFormPage.jsx'
import ProductoDetallePage from './paginas/admin/ProductoDetallePage.jsx'
import CategoriasAdminPage from './paginas/admin/CategoriasAdminPage.jsx'
import UsuariosPage from './paginas/admin/UsuariosPage.jsx'
import UsuarioFormPage from './paginas/admin/UsuarioFormPage.jsx'
import UsuarioDetallePage from './paginas/admin/UsuarioDetallePage.jsx'
import PedidosPage from './paginas/admin/PedidosPage.jsx'
import PedidoDetallePage from './paginas/admin/PedidoDetallePage.jsx'
import CriticosPage from './paginas/admin/CriticosPage.jsx'
import PerfilPage from './paginas/admin/PerfilPage.jsx'

export default function App() {
  const location = useLocation()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<InicioPage />} />
        <Route path="productos" element={<CatalogoPage />} />
        <Route path="productos/:id" element={<DetallePage />} />
        <Route path="categorias" element={<CategoriasPage />} />
        <Route path="categorias/:id" element={<CatalogoPage />} />
        <Route path="ofertas" element={<CatalogoPage ofertas />} />
        <Route path="carrito" element={<CarritoPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="compra/exitosa/:pedidoId" element={<CompraExitosaPage />} />
        <Route path="compra/rechazada" element={<CompraRechazadaPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegistroPage />} />
        <Route path="nosotros" element={<NosotrosPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="blogs/:slug" element={<ArticuloPage />} />
        <Route path="contacto" element={<ContactoPage />} />
        <Route element={<RutaAdmin />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="productos" element={<ProductosPage />} />
            <Route path="productos/nuevo" element={<ProductoFormPage key="nuevo" />} />
            <Route path="productos/:id/editar" element={<ProductoFormPage key={location.pathname} />} />
            <Route path="productos/:id" element={<ProductoDetallePage />} />
            <Route path="categorias" element={<CategoriasAdminPage />} />
            <Route path="usuarios" element={<UsuariosPage />} />
            <Route path="usuarios/nuevo" element={<UsuarioFormPage />} />
            <Route path="usuarios/:id/editar" element={<UsuarioFormPage key={location.pathname} />} />
            <Route path="usuarios/:id" element={<UsuarioDetallePage />} />
            <Route path="pedidos" element={<PedidosPage />} />
            <Route path="pedidos/:id" element={<PedidoDetallePage />} />
            <Route path="criticos" element={<CriticosPage />} />
            <Route path="reportes" element={<DashboardPage reporte />} />
            <Route path="perfil" element={<PerfilPage />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <div className="container page-section">
              <NoEncontrado />
            </div>
          }
        />
      </Route>
    </Routes>
  )
}

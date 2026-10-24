import { useParams, useNavigate, Link } from 'react-router'
import useApp from '../../hooks/useApp.js'

import { useState } from 'react'
import NoEncontrado from '../../componentes/ui/NoEncontrado.jsx'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import ErrorMensaje from '../../componentes/ui/ErrorMensaje.jsx'
import Campo from '../../componentes/ui/Campo.jsx'
import Icono from '../../componentes/ui/Icono.jsx'

export default function ProductoFormPage() {
  const { id } = useParams()
  const { estado, servicios, notificar } = useApp()
  const navigate = useNavigate()
  const producto = estado.productos.find((p) => p.id === id)
  const [datos, setDatos] = useState(() => ({
    codigo: producto?.codigo || '',
    nombre: producto?.nombre || '',
    descripcion: producto?.descripcion || '',
    categoriaId: producto?.categoriaId || '',
    precio: String(producto?.precio ?? ''),
    stock: String(producto?.stock ?? ''),
    precioOferta: String(producto?.precioOferta ?? ''),
    umbralCritico: String(producto?.umbralCritico ?? ''),
    imagen: producto?.imagen || 'img/logo.svg',
  }))
  const [error, setError] = useState(null)
  if (id && !producto) return <NoEncontrado titulo="Producto no encontrado" />
  function guardar(e) {
    e.preventDefault()
    const num = (key, opcional = false) => (datos[key] === '' ? (opcional ? null : NaN) : Number(datos[key]))
    const result = servicios.guardarProducto(
      {
        ...datos,
        precio: num('precio'),
        stock: num('stock'),
        precioOferta: num('precioOferta', true),
        umbralCritico: num('umbralCritico', true),
      },
      id || null,
    )
    if (result.ok) {
      notificar(result, 'Producto guardado.')
      navigate(`/admin/productos/${datos.codigo.trim().toUpperCase()}`)
    } else setError(result.error)
  }
  const campos = [
    ['codigo', 'Código', 'text'],
    ['nombre', 'Nombre', 'text'],
    ['precio', 'Precio base CLP', 'number'],
    ['stock', 'Stock disponible', 'number'],
    ['precioOferta', 'Precio de oferta (opcional)', 'number'],
    ['umbralCritico', 'Umbral crítico (opcional)', 'number'],
  ]
  const fotos = [...new Set(estado.productos.map((p) => p.imagen)), 'img/logo.svg'].filter(
    (x, i, a) => a.indexOf(x) === i,
  )
  return (
    <>
      <PageTitle eyebrow="PRODUCTOS" titulo={id ? 'Editar producto' : 'Nuevo producto'} />
      <form className="panel" onSubmit={guardar} noValidate>
        <ErrorMensaje error={error} />
        <div className="row">
          {campos.map(([key, label, type]) => (
            <div className="col-md-6" key={key}>
              <Campo
                nombre={key}
                label={label}
                type={type}
                min={type === 'number' ? '0' : undefined}
                step={type === 'number' ? '1' : undefined}
                readOnly={key === 'codigo' && Boolean(id)}
                value={datos[key]}
                error={error?.campos[key]}
                onChange={(e) => setDatos({ ...datos, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <Campo nombre="categoriaId" label="Categoría" error={error?.campos.categoriaId}>
          {(props) => (
            <select
              {...props}
              className="form-select"
              value={datos.categoriaId}
              onChange={(e) => setDatos({ ...datos, categoriaId: e.target.value })}
            >
              <option value="">Selecciona categoría</option>
              {estado.categorias
                .filter((c) => c.activo)
                .map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.nombre}
                  </option>
                ))}
            </select>
          )}
        </Campo>
        <Campo nombre="imagen" label="Imagen del catálogo" error={error?.campos.imagen}>
          {(props) => (
            <select
              {...props}
              className="form-select"
              value={datos.imagen}
              onChange={(e) => setDatos({ ...datos, imagen: e.target.value })}
            >
              {fotos.map((f) => (
                <option key={f} value={f}>
                  {f.replace('img/', '')}
                </option>
              ))}
            </select>
          )}
        </Campo>
        <Campo nombre="descripcion" label="Descripción" error={error?.campos.descripcion}>
          {(props) => (
            <textarea
              {...props}
              className="form-control"
              rows={4}
              maxLength={500}
              value={datos.descripcion}
              onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
            />
          )}
        </Campo>
        <button className="btn btn-boost" type="submit">
          Guardar producto <Icono nombre="check" />
        </button>
        <Link className="btn btn-outline-light ms-2" to="/admin/productos">
          Cancelar
        </Link>
      </form>
    </>
  )
}

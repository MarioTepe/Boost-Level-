import useApp from '../../hooks/useApp.js'
import { useState } from 'react'
import PageTitle from '../../componentes/ui/PageTitle.jsx'
import ErrorMensaje from '../../componentes/ui/ErrorMensaje.jsx'
import Campo from '../../componentes/ui/Campo.jsx'
import Tabla from '../../componentes/administracion/Tabla.jsx'
import Estado from '../../componentes/administracion/Estado.jsx'
import BajaButton from '../../componentes/administracion/BajaButton.jsx'

export default function CategoriasAdminPage() {
  const { estado, servicios, notificar } = useApp()
  const [edicion, setEdicion] = useState(null),
    [nombre, setNombre] = useState(''),
    [error, setError] = useState(null)
  function guardar(e) {
    e.preventDefault()
    const result = servicios.guardarCategoria(nombre, edicion)
    if (result.ok) {
      notificar(result, 'Categoría guardada.')
      setNombre('')
      setEdicion(null)
      setError(null)
    } else setError(result.error)
  }
  return (
    <>
      <PageTitle eyebrow="ORGANIZACIÓN DEL CATÁLOGO" titulo="Categorías" />
      <form className="panel mb-4" onSubmit={guardar} noValidate>
        <h2>{edicion ? 'Editar categoría' : 'Nueva categoría'}</h2>
        <ErrorMensaje error={error} />
        <Campo
          nombre="nombre"
          label="Nombre de categoría"
          value={nombre}
          error={error?.campos.nombre}
          maxLength={100}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button className="btn btn-boost" type="submit">
          Guardar categoría
        </button>
        {edicion && (
          <button
            className="btn btn-outline-light ms-2"
            type="button"
            onClick={() => {
              setEdicion(null)
              setNombre('')
              setError(null)
            }}
          >
            Cancelar edición
          </button>
        )}
      </form>
      <Tabla
        cabeceras={['Categoría', 'Productos activos', 'Estado', 'Acciones']}
        vacia={!estado.categorias.length}
      >
        {estado.categorias.map((c) => (
          <tr key={c.id}>
            <td>{c.nombre}</td>
            <td>{estado.productos.filter((p) => p.activo && p.categoriaId === c.id).length}</td>
            <td>
              <Estado activo={c.activo} />
            </td>
            <td>
              <div className="table-actions">
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    setEdicion(c.id)
                    setNombre(c.nombre)
                    setError(null)
                  }}
                >
                  Editar
                </button>
                <BajaButton
                  activo={c.activo}
                  nombre={c.nombre}
                  onBaja={() => notificar(servicios.desactivarCategoria(c.id), 'Categoría desactivada.')}
                />
              </div>
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  )
}

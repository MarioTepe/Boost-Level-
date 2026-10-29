import { carritoReducer } from '../domain/carrito.reducer.js'
import { aplicarCompra, prepararCompra } from '../domain/compra.rules.js'

import { exigir, fallo } from '../domain/errores.js'
import { crearId } from '../utils/identificador.js'

import {
  revisarCampos,
  normalizarCorreo,
  validarProducto,
  validarUsuario,
  validarEntrega,
} from '../domain/validaciones.js'

export function crearServicios(
  repo,
  {
    usuarioId = () => null,
    ahora = () => new Date(),
    id = crearId,
    pago = async (resultado) => resultado === 'aceptado',
  } = {},
) {
  const usuario = (estado) => estado.usuarios.find((u) => u.id === usuarioId() && u.activo) || null
  function admin(estado) {
    exigir(
      usuario(estado)?.rol === 'admin',
      'ACCESO_DENEGADO',
      'Necesitas una sesión de administrador para esta acción.',
    )
  }
  function ejecutar(transformar) {
    try {
      return { ok: true, data: repo.actualizar(transformar) }
    } catch (error) {
      return fallo(error)
    }
  }
  return {
    carrito(accion) {
      return ejecutar((estado) => ({
        ...estado,
        carrito: carritoReducer(estado.carrito, {
          ...accion,
          producto: estado.productos.find((p) => p.id === accion.productoId),
        }),
      }))
    },
    registrar(datos) {
      const nuevoId = id()
      return ejecutar((estado) => {
        const normalizado = validarUsuario(datos, estado.usuarios, null, ahora())
        const { confirmacion: _confirmacion, ...campos } = datos
        void _confirmacion
        return {
          ...estado,
          usuarios: [
            ...estado.usuarios,
            { ...campos, ...normalizado, id: nuevoId, rol: 'cliente', activo: true },
          ],
        }
      })
    },
    guardarProducto(datos, productoId = null) {
      return ejecutar((estado) => {
        admin(estado)
        const anterior = estado.productos.find((p) => p.id === productoId)
        if (productoId) exigir(anterior, 'NO_ENCONTRADO', 'Producto no encontrado.')
        const codigo = validarProducto(datos, estado, productoId)
        exigir(
          !anterior || codigo === anterior.codigo,
          'VALIDACION',
          'El código de producto no se puede cambiar.',
        )
        const producto = {
          ...datos,
          codigo,
          id: anterior?.id || codigo,
          nombre: datos.nombre.trim(),
          descripcion: datos.descripcion.trim(),
          activo: anterior?.activo ?? true,
        }
        return {
          ...estado,
          productos: anterior
            ? estado.productos.map((p) => (p.id === productoId ? producto : p))
            : [...estado.productos, producto],
        }
      })
    },
    desactivarProducto(productoId) {
      return ejecutar((estado) => {
        admin(estado)
        exigir(
          estado.productos.some((p) => p.id === productoId),
          'NO_ENCONTRADO',
          'Producto no encontrado.',
        )
        return {
          ...estado,
          productos: estado.productos.map((p) => (p.id === productoId ? { ...p, activo: false } : p)),
        }
      })
    },
    guardarCategoria(nombre, categoriaId = null) {
      const nuevoId = categoriaId || id()
      return ejecutar((estado) => {
        admin(estado)
        const normal = nombre.trim()
        const campos = {}
        if (!normal || normal.length > 100) campos.nombre = 'Nombre obligatorio, máximo 100 caracteres.'
        if (
          estado.categorias.some(
            (c) => c.id !== categoriaId && c.nombre.toLowerCase() === normal.toLowerCase(),
          )
        )
          campos.nombre = 'La categoría ya existe.'
        revisarCampos(campos)
        if (categoriaId)
          exigir(
            estado.categorias.some((c) => c.id === categoriaId),
            'NO_ENCONTRADO',
            'Categoría no encontrada.',
          )
        return {
          ...estado,
          categorias: categoriaId
            ? estado.categorias.map((c) => (c.id === categoriaId ? { ...c, nombre: normal } : c))
            : [...estado.categorias, { id: nuevoId, nombre: normal, activo: true }],
        }
      })
    },
    desactivarCategoria(categoriaId) {
      return ejecutar((estado) => {
        admin(estado)
        exigir(
          estado.categorias.some((c) => c.id === categoriaId),
          'NO_ENCONTRADO',
          'Categoría no encontrada.',
        )
        exigir(
          !estado.productos.some((p) => p.activo && p.categoriaId === categoriaId),
          'VALIDACION',
          'La categoría tiene productos activos. Reasígnalos antes de desactivarla.',
        )
        return {
          ...estado,
          categorias: estado.categorias.map((c) => (c.id === categoriaId ? { ...c, activo: false } : c)),
        }
      })
    },
    guardarUsuario(datos, clienteId = null) {
      const nuevoId = clienteId || id()
      return ejecutar((estado) => {
        admin(estado)
        const anterior = estado.usuarios.find((u) => u.id === clienteId)
        if (clienteId) exigir(anterior, 'NO_ENCONTRADO', 'Usuario no encontrado.')
        exigir(
          anterior?.rol !== 'admin',
          'ACCESO_DENEGADO',
          'La cuenta administradora se modifica desde Mi perfil.',
        )
        const normalizado = validarUsuario(datos, estado.usuarios, clienteId, ahora())
        const { confirmacion: _confirmacion, ...campos } = datos
        void _confirmacion
        const cliente = {
          ...campos,
          ...normalizado,
          id: nuevoId,
          rol: 'cliente',
          activo: anterior?.activo ?? true,
        }
        return {
          ...estado,
          usuarios: anterior
            ? estado.usuarios.map((u) => (u.id === clienteId ? cliente : u))
            : [...estado.usuarios, cliente],
        }
      })
    },
    desactivarUsuario(clienteId) {
      return ejecutar((estado) => {
        admin(estado)
        const cliente = estado.usuarios.find((u) => u.id === clienteId)
        exigir(cliente, 'NO_ENCONTRADO', 'Usuario no encontrado.')
        exigir(cliente.rol !== 'admin', 'ACCESO_DENEGADO', 'La cuenta administradora inicial está protegida.')
        return {
          ...estado,
          usuarios: estado.usuarios.map((u) => (u.id === clienteId ? { ...u, activo: false } : u)),
        }
      })
    },
    guardarPerfil(datos) {
      return ejecutar((estado) => {
        admin(estado)
        const actual = usuario(estado)
        const permitidos = {
          nombre: datos.nombre,
          apellidos: datos.apellidos,
          direccion: datos.direccion,
          regionId: datos.regionId,
          comunaId: datos.comunaId,
        }
        validarEntrega({ ...actual, ...permitidos }, { ...permitidos, modalidad: 'domicilio' })
        return {
          ...estado,
          usuarios: estado.usuarios.map((u) => (u.id === actual.id ? { ...u, ...permitidos } : u)),
        }
      })
    },
    async confirmarCompra(solicitud) {
      try {
        const estado = repo.leerEstado()
        const existente = estado.pedidos.find((p) => p.intentoId === solicitud.intentoId)
        if (existente) return { ok: true, data: existente }
        prepararCompra(estado, solicitud, usuario(estado))
        exigir(
          await pago(solicitud.resultadoSimulado),
          'PAGO_RECHAZADO',
          'El pago de demostración fue rechazado. Tu carrito sigue disponible.',
        )
        const pedidoId = id()
        const fecha = ahora().toISOString()
        const siguiente = repo.actualizar((vigente) =>
          vigente.pedidos.some((p) => p.intentoId === solicitud.intentoId)
            ? vigente
            : aplicarCompra(
                vigente,
                {
                  ...solicitud,
                  contacto: { ...solicitud.contacto, correo: normalizarCorreo(solicitud.contacto.correo) },
                },
                usuario(vigente),
                fecha,
                pedidoId,
              ),
        )
        return { ok: true, data: siguiente.pedidos.find((p) => p.intentoId === solicitud.intentoId) }
      } catch (error) {
        return fallo(error)
      }
    },
  }
}

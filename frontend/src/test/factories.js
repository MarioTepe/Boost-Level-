import { crearDatosIniciales } from '../data/inicial.js'
import { crearRepositorio } from '../repositories/tienda.repository.js'
import { resumirCarrito } from '../domain/precios.js'

export function storageMemoria() {
  const valores = new Map()
  return {
    leer: (clave) => valores.get(clave) ?? null,
    guardar: (clave, valor) => valores.set(clave, valor),
    eliminar: (clave) => valores.delete(clave),
  }
}
export function preparar({ editar = () => {}, sesion = null } = {}) {
  const storage = storageMemoria()
  const inicial = () => {
    const estado = crearDatosIniciales()
    editar(estado)
    return estado
  }
  const repo = crearRepositorio(storage, inicial)
  const usuario = repo.getSnapshot().estado.usuarios.find((u) => u.id === sesion) || null
  return { repo, storage, usuario }
}
export const usuarioValido = {
  run: '12345678K',
  nombre: 'Prueba',
  apellidos: 'Demostración',
  correo: 'prueba@duoc.cl',
  fechaNacimiento: '2000-01-01',
  claveDemo: '1234',
  confirmacion: '1234',
  regionId: 'Metropolitana de Santiago',
  comunaId: 'Santiago',
  direccion: 'Dirección ficticia 123',
}
export function solicitud(estado, usuario = null, extra = {}) {
  return {
    intentoId: 'intento-test',
    contacto: { nombre: 'Prueba', apellidos: 'Demo', correo: 'prueba@gmail.com' },
    entrega: { modalidad: 'retiro', regionId: '', comunaId: '', direccion: '' },
    resultadoSimulado: 'aceptado',
    resumenAceptado: resumirCarrito(estado, usuario).firma,
    ...extra,
  }
}

export const CLAVE_TIENDA = 'boostLevel:tienda:v1'
export const CLAVE_SESION = 'boostLevel:sesion:v1'

export function crearStorage(obtenerStorage) {
  return {
    leer: (clave) => obtenerStorage().getItem(clave),
    guardar: (clave, valor) => obtenerStorage().setItem(clave, valor),
    eliminar: (clave) => obtenerStorage().removeItem(clave),
  }
}

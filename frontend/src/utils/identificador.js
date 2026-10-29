// Identificadores de la demostración: parte aleatoria y fecha en milisegundos.
export function crearId() {
  return `${Math.random().toString(36).slice(2)}-${Date.now()}`
}

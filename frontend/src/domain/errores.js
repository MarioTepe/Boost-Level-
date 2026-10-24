export class ErrorTienda extends Error {
  constructor(codigo, mensaje, campos = {}) {
    super(mensaje)
    this.codigo = codigo
    this.campos = campos
  }
}
export function exigir(condicion, codigo, mensaje, campos) {
  if (!condicion) throw new ErrorTienda(codigo, mensaje, campos)
}
export function fallo(error) {
  return {
    ok: false,
    error: {
      codigo: error.codigo || 'PERSISTENCIA',
      mensaje: error.codigo
        ? error.message
        : 'No pudimos guardar los cambios. Revisa el almacenamiento de tu navegador y vuelve a intentar.',
      campos: error.campos || {},
    },
  }
}

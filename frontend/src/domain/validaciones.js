import { regiones } from '../data/regiones.js'
import { exigir } from './errores.js'

export const normalizarCorreo = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
export const normalizarRun = (value) =>
  String(value || '')
    .replace(/[.\-\s]/g, '')
    .toUpperCase()
export const correoValido = (value) =>
  /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(normalizarCorreo(value)) && value.length <= 100
const texto = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max
export function revisarCampos(campos) {
  exigir(!Object.keys(campos).length, 'VALIDACION', 'Revisa los campos indicados.', campos)
}
export function validarEntrega(contacto, entrega) {
  const campos = {}
  if (!texto(contacto.nombre, 50)) campos.nombre = 'Ingresa tu nombre (máximo 50 caracteres).'
  if (!texto(contacto.apellidos, 100)) campos.apellidos = 'Ingresa tus apellidos (máximo 100 caracteres).'
  if (!correoValido(contacto.correo))
    campos.correo = 'Usa un correo duoc.cl, profesor.duoc.cl o gmail.com válido.'
  if (!['domicilio', 'retiro'].includes(entrega.modalidad))
    campos.modalidad = 'Selecciona una modalidad de entrega.'
  if (entrega.modalidad === 'domicilio') {
    const region = regiones.find((r) => r.nombre === entrega.regionId)
    if (!region) campos.regionId = 'Selecciona una región.'
    if (!region?.comunas.includes(entrega.comunaId))
      campos.comunaId = 'Selecciona una comuna de la región elegida.'
    if (!texto(entrega.direccion, 300)) campos.direccion = 'Ingresa una dirección (máximo 300 caracteres).'
  }
  revisarCampos(campos)
}
export function validarUsuario(datos, existentes, id = null, hoy = new Date()) {
  const campos = {}
  const run = normalizarRun(datos.run)
  const correo = normalizarCorreo(datos.correo)
  if (!/^\d{7,8}[\dK]$/.test(run)) campos.run = 'Ingresa RUN con 7 u 8 dígitos y dígito final (0–9 o K).'
  if (existentes.some((u) => u.id !== id && u.run === run)) campos.run = 'Ese RUN ya está registrado.'
  if (existentes.some((u) => u.id !== id && u.correo === correo))
    campos.correo = 'Ese correo ya está registrado.'
  if (!correoValido(correo)) campos.correo = 'Correo válido: duoc.cl, profesor.duoc.cl o gmail.com.'
  if (typeof datos.claveDemo !== 'string' || datos.claveDemo.length < 4 || datos.claveDemo.length > 10)
    campos.claveDemo = 'La clave demo debe tener entre 4 y 10 caracteres.'
  if (datos.claveDemo !== datos.confirmacion) campos.confirmacion = 'Las claves no coinciden.'
  const [year, month, day] = String(datos.fechaNacimiento || '')
    .split('-')
    .map(Number)
  const fecha = new Date(year, month - 1, day)
  let edad = hoy.getFullYear() - year
  if (hoy.getMonth() + 1 < month || (hoy.getMonth() + 1 === month && hoy.getDate() < day)) edad--
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(datos.fechaNacimiento || '') ||
    fecha.getFullYear() !== year ||
    fecha.getMonth() !== month - 1 ||
    fecha.getDate() !== day ||
    edad < 18
  )
    campos.fechaNacimiento = 'Debes tener 18 años cumplidos e ingresar una fecha válida.'
  try {
    validarEntrega(datos, { ...datos, modalidad: 'domicilio' })
  } catch (e) {
    Object.assign(campos, e.campos)
  }
  revisarCampos(campos)
  return { run, correo }
}
export function validarProducto(datos, estado, id = null) {
  const campos = {}
  const codigo = String(datos.codigo || '')
    .trim()
    .toUpperCase()
  if (codigo.length < 3 || !/^[A-Z0-9_-]+$/.test(codigo))
    campos.codigo = 'Código de al menos 3 letras, números, guion o guion bajo.'
  if (estado.productos.some((p) => p.id !== id && p.codigo.toUpperCase() === codigo))
    campos.codigo = 'Ese código ya existe.'
  if (!texto(datos.nombre, 100)) campos.nombre = 'Nombre obligatorio, máximo 100 caracteres.'
  if (String(datos.descripcion || '').length > 500) campos.descripcion = 'Máximo 500 caracteres.'
  if (!Number.isSafeInteger(datos.precio) || datos.precio < 0)
    campos.precio = 'Precio CLP entero, mayor o igual a cero.'
  if (!Number.isSafeInteger(datos.stock) || datos.stock < 0)
    campos.stock = 'Stock entero, mayor o igual a cero.'
  if (
    datos.precioOferta !== null &&
    (!Number.isSafeInteger(datos.precioOferta) ||
      datos.precioOferta < 0 ||
      datos.precioOferta >= datos.precio)
  )
    campos.precioOferta = 'La oferta debe ser un entero menor al precio base.'
  if (datos.umbralCritico !== null && (!Number.isSafeInteger(datos.umbralCritico) || datos.umbralCritico < 0))
    campos.umbralCritico = 'Umbral entero mayor o igual a cero, o vacío.'
  if (!estado.categorias.some((c) => c.id === datos.categoriaId && c.activo))
    campos.categoriaId = 'Selecciona una categoría activa.'
  if (datos.imagen && !/^img\/[a-zA-Z0-9_.-]+$/.test(datos.imagen))
    campos.imagen = 'Usa una imagen local de la carpeta img/.'
  revisarCampos(campos)
  return codigo
}
export function validarContacto(datos) {
  const campos = {}
  if (!texto(datos.nombre, 100)) campos.nombre = 'Nombre obligatorio, máximo 100 caracteres.'
  if (!correoValido(datos.correo)) campos.correo = 'Ingresa un correo válido de los dominios admitidos.'
  if (!texto(datos.comentario, 500)) campos.comentario = 'Comentario obligatorio, máximo 500 caracteres.'
  revisarCampos(campos)
}

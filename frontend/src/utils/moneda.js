export const moneda = (valor) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(
    valor,
  )
export const imagen = (ruta) => `${import.meta.env.BASE_URL}${ruta}`
export const fechaCorta = (valor) =>
  new Intl.DateTimeFormat('es-CL', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(valor))

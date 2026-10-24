export default function Icono({ nombre, size = 20, ...props }) {
  const paths = {
    carrito: 'M3 3h2l3 12h10l3-8H6M9 20h.01M18 20h.01',
    flecha: 'M5 12h14m-6-6 6 6-6 6',
    buscar: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    persona: 'M20 21v-2a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v2M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    escudo: 'm12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm-4 10 3 3 5-6',
    bolsa: 'M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2',
    check: 'm5 12 4 4L19 6',
    cerrar: 'm6 6 12 12M6 18 18 6',
    menu: 'M3 6h18M3 12h18M3 18h18',
    caja: 'm12 2 9 5v10l-9 5-9-5V7l9-5ZM3 7l9 5 9-5M12 12v10',
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[nombre] || paths.caja} />
    </svg>
  )
}

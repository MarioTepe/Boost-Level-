export default function Estado({ activo }) {
  return <span className={`status-pill ${activo ? '' : 'inactive'}`}>{activo ? 'Activo' : 'Inactivo'}</span>
}

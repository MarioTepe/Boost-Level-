export default function ErrorMensaje({ error }) {
  return error ? (
    <div role="alert" className="alert alert-danger">
      {error.mensaje || error.message}
    </div>
  ) : null
}

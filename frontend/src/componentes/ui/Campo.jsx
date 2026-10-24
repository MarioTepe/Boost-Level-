export default function Campo({ nombre, label, error, children, ...props }) {
  const inputProps = {
    id: nombre,
    name: nombre,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${nombre}-error` : undefined,
    ...props,
  }
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={nombre}>
        {label}
      </label>
      {children ? (
        children(inputProps)
      ) : (
        <input className={`form-control ${error ? 'is-invalid' : ''}`} {...inputProps} />
      )}{' '}
      {error && (
        <div className="field-error" id={`${nombre}-error`}>
          {error}
        </div>
      )}
    </div>
  )
}

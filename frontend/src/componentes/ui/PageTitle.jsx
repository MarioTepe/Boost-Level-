export default function PageTitle({ eyebrow, titulo, children, action }) {
  return (
    <div className="page-title">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{titulo}</h1>
        {children && <div className="text-secondary">{children}</div>}
      </div>
      {action}
    </div>
  )
}

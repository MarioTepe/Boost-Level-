import { regiones } from '../../data/regiones.js'
import Campo from '../ui/Campo.jsx'

export default function Direccion({ valores, onChange, errores = {} }) {
  const comunas = regiones.find((r) => r.nombre === valores.regionId)?.comunas || []
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <Campo nombre="regionId" label="Región" error={errores.regionId}>
            {(props) => (
              <select
                className="form-select"
                {...props}
                value={valores.regionId}
                onChange={(e) => onChange({ ...valores, regionId: e.target.value, comunaId: '' })}
              >
                <option value="">Selecciona región</option>
                {regiones.map((r) => (
                  <option key={r.nombre}>{r.nombre}</option>
                ))}
              </select>
            )}
          </Campo>
        </div>
        <div className="col-md-6">
          <Campo nombre="comunaId" label="Comuna" error={errores.comunaId}>
            {(props) => (
              <select
                className="form-select"
                {...props}
                value={valores.comunaId}
                onChange={(e) => onChange({ ...valores, comunaId: e.target.value })}
              >
                <option value="">Selecciona comuna</option>
                {comunas.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            )}
          </Campo>
        </div>
      </div>
      <Campo
        nombre="direccion"
        label="Dirección"
        maxLength={300}
        value={valores.direccion}
        onChange={(e) => onChange({ ...valores, direccion: e.target.value })}
        error={errores.direccion}
      />
    </>
  )
}

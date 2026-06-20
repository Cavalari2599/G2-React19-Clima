import { urlIcono } from '../configuracion/constantes.js'

/**
 * Funcionalidad 2: muestra el clima actual.
 * Temperatura, descripción, humedad, velocidad del viento e icono.
 */
export function TarjetaClima({ clima }) {
  const { ciudad, pais, temperatura, descripcion, humedad, viento, icono } = clima

  return (
    <article className="tarjeta-clima">
      <header className="tarjeta-clima__cabecera">
        <h2 className="tarjeta-clima__ciudad">
          {ciudad}
          {pais && <span className="tarjeta-clima__pais">, {pais}</span>}
        </h2>
        <img
          className="tarjeta-clima__icono"
          src={urlIcono(icono)}
          alt={descripcion}
          width="100"
          height="100"
        />
      </header>

      <p className="tarjeta-clima__temperatura">{temperatura}°C</p>
      <p className="tarjeta-clima__descripcion">{descripcion}</p>

      <dl className="tarjeta-clima__detalles">
        <div className="tarjeta-clima__detalle">
          <dt>Humedad</dt>
          <dd>{humedad}%</dd>
        </div>
        <div className="tarjeta-clima__detalle">
          <dt>Viento</dt>
          <dd>{viento} m/s</dd>
        </div>
      </dl>
    </article>
  )
}

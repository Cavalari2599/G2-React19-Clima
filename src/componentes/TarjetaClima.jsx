import { iconoPorClima } from '../utilidades/tema.js'
import {
  direccionViento,
  horaLocal,
  visibilidadEnKm,
} from '../utilidades/formato.js'
import { DetalleClima } from './DetalleClima.jsx'
import { IconoClima } from './IconoClima.jsx'
import {
  IconoTermometro,
  IconoFlechaArriba,
  IconoFlechaAbajo,
  IconoGota,
  IconoViento,
  IconoRafaga,
  IconoBarometro,
  IconoNubosidad,
  IconoOjo,
  IconoLluvia,
  IconoNieve,
  IconoAmanecer,
  IconoAtardecer,
  IconoReloj,
} from './Iconos.jsx'

/**
 * Funcionalidad 2: muestra el clima actual con todos los datos disponibles
 * de la API. Los detalles opcionales (ráfagas, lluvia, nieve, visibilidad)
 * solo aparecen si la API los incluye en la respuesta.
 */
export function TarjetaClima({ clima }) {
  const claveIcono = iconoPorClima(clima.condicionId, clima.esDeDia)
  const detalles = construirDetalles(clima)

  return (
    <article className="tarjeta-clima">
      <header className="tarjeta-clima__cabecera">
        <h2 className="tarjeta-clima__ciudad">
          {clima.ciudad}
          {clima.pais && (
            <span className="tarjeta-clima__pais"> {clima.pais}</span>
          )}
        </h2>
        <p className="tarjeta-clima__hora">
          <IconoReloj className="tarjeta-clima__hora-icono" />
          Hora local {horaLocal(clima.momento, clima.desfaseHorario)}
        </p>
      </header>

      <div className="tarjeta-clima__principal">
        <IconoClima clave={claveIcono} className="tarjeta-clima__icono" />
        <p className="tarjeta-clima__temperatura">{clima.temperatura}°C</p>
      </div>
      <p className="tarjeta-clima__descripcion">{clima.descripcion}</p>

      <dl className="tarjeta-clima__detalles">
        {detalles.map((detalle) => (
          <DetalleClima key={detalle.etiqueta} {...detalle} />
        ))}
      </dl>
    </article>
  )
}

// Arma la lista de detalles a mostrar. Cada uno incluye una descripción que
// se muestra al pasar el cursor. Las entradas opcionales se incluyen solo si
// la API trae el dato; el filtro final descarta las ausentes.
function construirDetalles(clima) {
  return [
    {
      icono: <IconoTermometro />,
      etiqueta: 'Sensación',
      valor: `${clima.sensacion}°C`,
      descripcion:
        'Temperatura que percibe el cuerpo según el viento y la humedad.',
    },
    {
      icono: <IconoFlechaArriba />,
      etiqueta: 'Máxima',
      valor: `${clima.temperaturaMax}°C`,
      descripcion: 'Temperatura máxima observada en la zona en este momento.',
    },
    {
      icono: <IconoFlechaAbajo />,
      etiqueta: 'Mínima',
      valor: `${clima.temperaturaMin}°C`,
      descripcion: 'Temperatura mínima observada en la zona en este momento.',
    },
    {
      icono: <IconoGota />,
      etiqueta: 'Humedad',
      valor: `${clima.humedad}%`,
      descripcion: 'Cantidad de vapor de agua en el aire, como porcentaje.',
    },
    {
      icono: <IconoViento />,
      etiqueta: 'Viento',
      valor: `${clima.viento} m/s ${direccionViento(clima.vientoGrados)}`,
      descripcion: 'Velocidad y dirección desde la que sopla el viento.',
    },
    clima.rafaga != null && {
      icono: <IconoRafaga />,
      etiqueta: 'Ráfagas',
      valor: `${clima.rafaga} m/s`,
      descripcion: 'Picos breves de viento más fuerte que la velocidad media.',
    },
    {
      icono: <IconoBarometro />,
      etiqueta: 'Presión',
      valor: `${clima.presion} hPa`,
      descripcion: 'Presión atmosférica al nivel del mar, en hectopascales.',
    },
    {
      icono: <IconoNubosidad />,
      etiqueta: 'Nubosidad',
      valor: `${clima.nubosidad}%`,
      descripcion: 'Porcentaje del cielo cubierto por nubes.',
    },
    clima.visibilidad != null && {
      icono: <IconoOjo />,
      etiqueta: 'Visibilidad',
      valor: visibilidadEnKm(clima.visibilidad),
      descripcion:
        'Distancia a la que se ve con claridad. La API la limita a 10 km, por eso casi siempre marca el máximo salvo con niebla o lluvia.',
    },
    clima.lluvia1h != null && {
      icono: <IconoLluvia />,
      etiqueta: 'Lluvia (1h)',
      valor: `${clima.lluvia1h} mm`,
      descripcion: 'Cantidad de lluvia caída en la última hora.',
    },
    clima.nieve1h != null && {
      icono: <IconoNieve />,
      etiqueta: 'Nieve (1h)',
      valor: `${clima.nieve1h} mm`,
      descripcion: 'Cantidad de nieve caída en la última hora.',
    },
    {
      icono: <IconoAmanecer />,
      etiqueta: 'Amanecer',
      valor: horaLocal(clima.amanecer, clima.desfaseHorario),
      descripcion: 'Hora local de salida del sol en la ciudad consultada.',
    },
    {
      icono: <IconoAtardecer />,
      etiqueta: 'Atardecer',
      valor: horaLocal(clima.atardecer, clima.desfaseHorario),
      descripcion: 'Hora local de puesta del sol en la ciudad consultada.',
    },
  ].filter(Boolean)
}
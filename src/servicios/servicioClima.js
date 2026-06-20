import { URL_BASE_API, UNIDADES, IDIOMA } from '../configuracion/constantes.js'

const CLAVE_API = import.meta.env.VITE_OWM_API_KEY

// Traduce el código de estado HTTP a un mensaje claro para la persona usuaria.
// Apoya la Funcionalidad 5 (manejo de errores) desde una sola fuente.
function mensajeSegunEstado(estadoHttp) {
  switch (estadoHttp) {
    case 401:
      return 'La API Key no es válida o aún no está activada. Espera unos minutos.'
    case 404:
      return 'No se encontró la ciudad. Revisa el nombre e inténtalo de nuevo.'
    default:
      return 'No se pudo obtener el clima. Inténtalo más tarde.'
  }
}

// Convierte la respuesta cruda de la API en la forma que usa la interfaz.
// Aísla los accesos profundos (datos.main.temp...) en un único lugar (G6).
function aClimaDeLaApp(datos) {
  return {
    ciudad: datos.name,
    pais: datos.sys?.country ?? '',
    temperatura: Math.round(datos.main.temp),
    descripcion: datos.weather[0].description,
    humedad: datos.main.humidity,
    viento: Math.round(datos.wind.speed),
    icono: datos.weather[0].icon,
  }
}

/**
 * Funcionalidad 2: obtiene el clima actual de una ciudad.
 * @param {string} ciudad
 * @returns {Promise<object>} clima ya normalizado para la interfaz
 * @throws {Error} con un mensaje legible si la API responde con error
 */
export async function obtenerClimaPorCiudad(ciudad) {
  const parametros = new URLSearchParams({
    q: ciudad,
    appid: CLAVE_API,
    units: UNIDADES,
    lang: IDIOMA,
  })

  const respuesta = await fetch(`${URL_BASE_API}?${parametros}`)

  if (!respuesta.ok) {
    throw new Error(mensajeSegunEstado(respuesta.status))
  }

  return aClimaDeLaApp(await respuesta.json())
}

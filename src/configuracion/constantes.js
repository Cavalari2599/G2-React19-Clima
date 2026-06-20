// Configuración central: URL y parámetros de la API, y límites de la app.
// Tener un único lugar evita números mágicos (G25) y strings duplicados (G5).

export const URL_BASE_API = 'https://api.openweathermap.org/data/2.5/weather'

// 'metric' => temperatura en °C ; 'es' => descripciones en español.
export const UNIDADES = 'metric'
export const IDIOMA = 'es'

// Ciudad que se muestra al abrir la app (requisito de la demo).
export const CIUDAD_POR_DEFECTO = 'San José'

// Historial: cuántas ciudades se recuerdan y con qué clave en localStorage.
export const MAXIMO_HISTORIAL = 5
export const CLAVE_HISTORIAL = 'clima:historial'

// Construye la URL del icono del clima a partir de su código.
export const urlIcono = (codigo) =>
  `https://openweathermap.org/img/wn/${codigo}@2x.png`

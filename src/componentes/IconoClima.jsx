import {
  IconoSol,
  IconoLuna,
  IconoNube,
  IconoNubeNoche,
  IconoLluvia,
  IconoTormenta,
  IconoNieve,
  IconoNiebla,
} from './Iconos.jsx'

// Traduce la clave devuelta por iconoPorClima() al componente SVG real.
// Vive separado de tema.js para que ese archivo no importe JSX (sigue
// siendo un módulo .js puro, reutilizable fuera de React si hiciera falta).
const ICONOS = {
  sol: IconoSol,
  luna: IconoLuna,
  nube: IconoNube,
  'nube-noche': IconoNubeNoche,
  lluvia: IconoLluvia,
  tormenta: IconoTormenta,
  nieve: IconoNieve,
  niebla: IconoNiebla,
}

export function IconoClima({ clave, className }) {
  const Icono = ICONOS[clave] ?? IconoNube
  return <Icono className={className} aria-hidden="true" />
}
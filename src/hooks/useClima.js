import { useState, useCallback } from 'react'
import { obtenerClimaPorCiudad } from '../servicios/servicioClima.js'

// Estados posibles de la consulta. Da soporte a las Funcionalidades 4 (carga)
// y 5 (error) sin usar varios booleanos sueltos que haya que sincronizar.
export const Estado = {
  INICIAL: 'inicial',
  CARGANDO: 'cargando',
  EXITO: 'exito',
  ERROR: 'error',
}

/**
 * Encapsula la lógica de consultar el clima: datos, estado de carga y error.
 * Los componentes solo consumen el resultado; no conocen el fetch ni la API (SRP).
 */
export function useClima() {
  const [clima, setClima] = useState(null)
  const [estado, setEstado] = useState(Estado.INICIAL)
  const [error, setError] = useState(null)

  const buscar = useCallback(async (ciudad) => {
    const consulta = ciudad.trim()
    if (!consulta) return null

    setEstado(Estado.CARGANDO)
    setError(null)

    try {
      const datos = await obtenerClimaPorCiudad(consulta)
      setClima(datos)
      setEstado(Estado.EXITO)
      return datos
    } catch (fallo) {
      // Un TypeError significa fallo de red (no hubo respuesta);
      // el resto de mensajes ya vienen redactados desde el servicio.
      const mensaje =
        fallo instanceof TypeError
          ? 'Error de red. Verifica tu conexión a internet.'
          : fallo.message
      setError(mensaje)
      setEstado(Estado.ERROR)
      return null
    }
  }, [])

  return { clima, estado, error, buscar }
}

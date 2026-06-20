import { useState, useEffect, useCallback } from 'react'
import { MAXIMO_HISTORIAL, CLAVE_HISTORIAL } from '../configuracion/constantes.js'

// Lee el historial guardado al iniciar; tolera datos corruptos o ausentes.
function leerHistorialGuardado() {
  try {
    const crudo = localStorage.getItem(CLAVE_HISTORIAL)
    const valor = crudo ? JSON.parse(crudo) : []
    return Array.isArray(valor) ? valor : []
  } catch {
    return []
  }
}

/**
 * Funcionalidades 3 y 6: mantiene las últimas ciudades buscadas
 * (sin duplicados, máximo MAXIMO_HISTORIAL, la más reciente primero)
 * y las persiste en localStorage para que sobrevivan a la recarga.
 */
export function useHistorialBusquedas() {
  const [historial, setHistorial] = useState(leerHistorialGuardado)

  // Cada cambio del historial se refleja en localStorage (Funcionalidad 6).
  useEffect(() => {
    localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial))
  }, [historial])

  const agregarCiudad = useCallback((ciudad) => {
    setHistorial((anterior) => {
      const sinDuplicado = anterior.filter(
        (item) => item.toLowerCase() !== ciudad.toLowerCase(),
      )
      return [ciudad, ...sinDuplicado].slice(0, MAXIMO_HISTORIAL)
    })
  }, [])

  const limpiarHistorial = useCallback(() => setHistorial([]), [])

  return { historial, agregarCiudad, limpiarHistorial }
}

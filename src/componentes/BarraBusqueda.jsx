import { useState } from 'react'

/**
 * Funcionalidad 1: buscador de ciudad.
 * Busca al enviar el formulario, lo que cubre con un solo camino tanto el
 * clic en el botón como la tecla Enter (sin duplicar la lógica — G5).
 */
export function BarraBusqueda({ alBuscar, deshabilitado }) {
  const [texto, setTexto] = useState('')

  function alEnviar(evento) {
    evento.preventDefault()
    alBuscar(texto)
  }

  return (
    <form className="barra-busqueda" onSubmit={alEnviar}>
      <input
        type="text"
        className="barra-busqueda__campo"
        placeholder="Buscar ciudad..."
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        aria-label="Nombre de la ciudad"
      />
      <button
        type="submit"
        className="barra-busqueda__boton"
        disabled={deshabilitado}
      >
        Buscar
      </button>
    </form>
  )
}

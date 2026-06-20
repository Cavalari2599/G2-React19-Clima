import { useEffect, useCallback } from 'react'
import { useClima, Estado } from './hooks/useClima.js'
import { useHistorialBusquedas } from './hooks/useHistorialBusquedas.js'
import { BarraBusqueda } from './componentes/BarraBusqueda.jsx'
import { TarjetaClima } from './componentes/TarjetaClima.jsx'
import { HistorialBusquedas } from './componentes/HistorialBusquedas.jsx'
import { IndicadorCarga } from './componentes/IndicadorCarga.jsx'
import { MensajeError } from './componentes/MensajeError.jsx'
import { CIUDAD_POR_DEFECTO } from './configuracion/constantes.js'
import './App.css'

/**
 * Componente raíz: compone las funcionalidades y coordina el flujo.
 * No contiene lógica de negocio; esa vive en los hooks y el servicio (SRP).
 */
function App() {
  const { clima, estado, error, buscar } = useClima()
  const { historial, agregarCiudad, limpiarHistorial } = useHistorialBusquedas()

  // Busca una ciudad y, si hay éxito, la registra en el historial usando el
  // nombre canónico que devuelve la API (clima.ciudad) para evitar duplicados.
  const buscarYRegistrar = useCallback(
    async (ciudad) => {
      const datos = await buscar(ciudad)
      if (datos) agregarCiudad(datos.ciudad)
    },
    [buscar, agregarCiudad],
  )

  // Carga la ciudad por defecto al abrir la app (requisito de la demo).
  useEffect(() => {
    buscarYRegistrar(CIUDAD_POR_DEFECTO)
  }, [buscarYRegistrar])

  return (
    <main className="app">
      <h1 className="app__titulo">🌤️ App del Clima</h1>

      <BarraBusqueda
        alBuscar={buscarYRegistrar}
        deshabilitado={estado === Estado.CARGANDO}
      />

      <HistorialBusquedas
        historial={historial}
        alSeleccionar={buscarYRegistrar}
        alLimpiar={limpiarHistorial}
      />

      <section className="app__resultado">
        {estado === Estado.CARGANDO && <IndicadorCarga />}
        {estado === Estado.ERROR && <MensajeError mensaje={error} />}
        {estado === Estado.EXITO && clima && <TarjetaClima clima={clima} />}
      </section>
    </main>
  )
}

export default App

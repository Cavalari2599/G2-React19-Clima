import { useEffect, useCallback } from 'react'
import { useClima, Estado } from './hooks/useClima.js'
import { useBuscadorCiudades, EstadoBusqueda } from './hooks/useBuscadorCiudades.js'
import { useHistorialBusquedas } from './hooks/useHistorialBusquedas.js'
import { FondoClima } from './componentes/FondoClima.jsx'
import { BarraBusqueda } from './componentes/BarraBusqueda.jsx'
import { ListaCiudades } from './componentes/ListaCiudades.jsx'
import { TarjetaClima } from './componentes/TarjetaClima.jsx'
import { HistorialBusquedas } from './componentes/HistorialBusquedas.jsx'
import { IndicadorCarga } from './componentes/IndicadorCarga.jsx'
import { MensajeError } from './componentes/MensajeError.jsx'
import { IconoLogo } from './componentes/Iconos.jsx'
import { temaPorClima } from './utilidades/tema.js'
import { CIUDAD_POR_DEFECTO } from './configuracion/constantes.js'
import './App.css'

const TEMA_INICIAL = 'despejado-dia'

/**
 * Componente raíz: compone las funcionalidades y coordina el flujo
 * buscar -> elegir ciudad -> mostrar clima. No contiene lógica de negocio;
 * esa vive en los hooks y el servicio (SRP).
 */
function App() {
  const { clima, estado, error, consultar } = useClima()
  const {
    candidatos,
    estado: estadoBusqueda,
    error: errorBusqueda,
    buscar: buscarCandidatos,
    limpiar: limpiarCandidatos,
  } = useBuscadorCiudades()
  const { historial, agregarCiudad, limpiarHistorial } = useHistorialBusquedas()

  // Consulta el clima de una ciudad concreta (con coordenadas) y la registra
  // en el historial. Limpia antes la lista de candidatos para cerrarla.
  const seleccionarCiudad = useCallback(
    async (ciudad) => {
      limpiarCandidatos()
      const datos = await consultar(ciudad.lat, ciudad.lon)
      if (datos) agregarCiudad(ciudad)
    },
    [limpiarCandidatos, consultar, agregarCiudad],
  )

  // Busca coincidencias por nombre. Si solo hay una, la selecciona directo;
  // si hay varias, se muestran para que la persona elija.
  const manejarBusqueda = useCallback(
    async (texto) => {
      const resultados = await buscarCandidatos(texto)
      if (resultados.length === 1) {
        seleccionarCiudad(resultados[0])
      }
    },
    [buscarCandidatos, seleccionarCiudad],
  )

  // Carga la ciudad por defecto al abrir la app (requisito de la demo).
  useEffect(() => {
    seleccionarCiudad(CIUDAD_POR_DEFECTO)
  }, [seleccionarCiudad])

  const tema = clima ? temaPorClima(clima.condicionId, clima.esDeDia) : TEMA_INICIAL
  const ocupado = estado === Estado.CARGANDO || estadoBusqueda === EstadoBusqueda.CARGANDO

  return (
    <>
      <FondoClima tema={tema} />

      <main className="app">
        <h1 className="app__titulo">
          <IconoLogo className="app__titulo-icono" />
          App del Clima
        </h1>

        <BarraBusqueda alBuscar={manejarBusqueda} deshabilitado={ocupado} />

        {estadoBusqueda === EstadoBusqueda.SIN_RESULTADOS && (
          <MensajeError mensaje="No se encontraron ciudades con ese nombre." />
        )}
        {estadoBusqueda === EstadoBusqueda.ERROR && (
          <MensajeError mensaje={errorBusqueda} />
        )}
        {candidatos.length > 1 && (
          <ListaCiudades ciudades={candidatos} alSeleccionar={seleccionarCiudad} />
        )}

        <HistorialBusquedas
          historial={historial}
          alSeleccionar={seleccionarCiudad}
          alLimpiar={limpiarHistorial}
        />

        <section className="app__resultado">
          {estado === Estado.CARGANDO && <IndicadorCarga />}
          {estado === Estado.ERROR && <MensajeError mensaje={error} />}
          {estado === Estado.EXITO && clima && <TarjetaClima clima={clima} />}
        </section>
      </main>
    </>
  )
}

export default App
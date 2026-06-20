/**
 * Funcionalidad 4: estado de carga.
 * Spinner visible mientras se obtienen los datos del clima.
 */
export function IndicadorCarga() {
  return (
    <div className="indicador-carga" role="status" aria-live="polite">
      <span className="indicador-carga__circulo" />
      <span className="indicador-carga__texto">Cargando...</span>
    </div>
  )
}

/**
 * Funcionalidad 5: manejo de errores.
 * Muestra un mensaje claro (ciudad inexistente, fallo de red, etc.).
 */
export function MensajeError({ mensaje }) {
  return (
    <p className="mensaje-error" role="alert">
      ⚠️ {mensaje}
    </p>
  )
}

/**
 * Setup de Jest
 *
 * Este archivo se ejecuta antes de cada test suite.
 * Aquí importamos matchers adicionales y configuraciones globales.
 */

// Importa matchers personalizados de @testing-library/jest-dom
// Agrega matchers como: toBeInTheDocument(), toHaveClass(), etc.
import '@testing-library/jest-dom'

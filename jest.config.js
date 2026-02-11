const nextJest = require('next/jest')

/**
 * Configuración de Jest para Next.js
 *
 * next/jest configura automáticamente Jest para trabajar con Next.js,
 * incluyendo transformación de TypeScript, JSX, CSS, y más.
 */
const createJestConfig = nextJest({
  // Ruta al directorio de Next.js
  dir: './',
})

/**
 * Configuración personalizada de Jest
 */
const customJestConfig = {
  // Archivo de setup que se ejecuta antes de cada test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Entorno de testing (jsdom simula el navegador)
  testEnvironment: 'jest-environment-jsdom',

  // Patrones de archivos a ignorar
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],

  // Mapeo de módulos para path aliases (@ = root)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Cobertura de código
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],

  // Archivos de test
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)'],

  // Permite transformar módulos ESM en node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(remark|remark-html|unified|bail|is-plain-obj|trough|vfile|unist-.*|mdast-.*|micromark.*|decode-named-character-reference|character-entities|property-information|hast-.*|space-separated-tokens|comma-separated-tokens|web-namespaces)/)',
  ],
}

// Exporta la configuración combinada
module.exports = createJestConfig(customJestConfig)

import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Habilita el modo estricto de React para detectar problemas
  reactStrictMode: true,

  // Define explícitamente el directorio raíz del proyecto
  // Evita warnings cuando hay múltiples lockfiles en directorios padre
  outputFileTracingRoot: path.join(__dirname),
}

export default nextConfig

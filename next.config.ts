import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Habilita el modo estricto de React para detectar problemas
  reactStrictMode: true,

  // Define explícitamente el directorio raíz del proyecto
  // Evita warnings cuando hay múltiples lockfiles en directorios padre
  outputFileTracingRoot: path.join(__dirname),

  // Optimizaciones para Vercel
  output: 'standalone', // Optimiza el tamaño del build

  // Headers de seguridad y cache
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

export default nextConfig

import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

/**
 * Metadata global del sitio
 */
export const metadata: Metadata = {
  title: 'Blog Agentic Code',
  description: 'Blog simple con Next.js y localStorage',
}

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * Layout raíz de la aplicación
 *
 * Este layout envuelve TODAS las páginas de la aplicación.
 * Aquí defines la estructura HTML base, importas estilos globales
 * y agregas componentes que deben aparecer en todas las páginas.
 *
 * IMPORTANTE: Este es un Server Component. Solo se renderiza en el servidor.
 *
 * @param children - El contenido de cada página será inyectado aquí
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50">
        {/* Header compartido en todas las páginas */}
        <Header />

        {/* Contenedor principal con max-width y padding */}
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer simple */}
        <footer className="mt-16 border-t border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-4xl px-4 text-center text-sm text-gray-600 sm:px-6 lg:px-8">
            <p>
              © {new Date().getFullYear()} Blog Agentic Code. Construido con
              Next.js y ❤️
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}

import Link from 'next/link'

/**
 * Header del sitio
 *
 * Componente reutilizable que muestra el logo/título del blog
 * y permite navegar a la página principal.
 * Es un Server Component (por defecto en Next.js 13+).
 */
export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="group">
          <h1 className="text-3xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
            Blog Agentic Code
          </h1>
          <p className="mt-1 text-sm text-gray-700">
            Tu blog personal con localStorage
          </p>
        </Link>
      </div>
    </header>
  )
}

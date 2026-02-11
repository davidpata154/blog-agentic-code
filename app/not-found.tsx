import Link from 'next/link'

/**
 * Página 404 - No encontrado
 *
 * Esta página se muestra automáticamente cuando:
 * - Una ruta no existe
 * - Se llama a la función notFound() desde un componente
 *
 * Es un Server Component especial de Next.js.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900">
        Página no encontrada
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary-600 px-6 py-3 text-white transition-colors hover:bg-primary-700"
      >
        Volver al inicio
      </Link>
    </div>
  )
}

'use client'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  resultCount?: number
}

/**
 * Componente de barra de búsqueda para filtrar posts
 * Incluye input de búsqueda, icono y botón para limpiar
 */
export default function SearchBar({
  value,
  onChange,
  resultCount,
}: SearchBarProps) {
  const handleClear = () => {
    onChange('')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Icono de búsqueda */}
        <div className="text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input de búsqueda */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Buscar posts por título o contenido..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            aria-label="Buscar posts"
          />
        </div>

        {/* Botón de limpiar (solo visible cuando hay texto) */}
        {value && (
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {/* Contador de resultados */}
      {resultCount !== undefined && (
        <div className="mt-2 text-sm text-gray-600">
          {resultCount === 0 ? (
            <span>No se encontraron posts</span>
          ) : resultCount === 1 ? (
            <span>1 post encontrado</span>
          ) : (
            <span>{resultCount} posts encontrados</span>
          )}
        </div>
      )}
    </div>
  )
}

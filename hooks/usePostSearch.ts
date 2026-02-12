'use client'

import { useMemo } from 'react'
import { Post } from '@/types/post'

/**
 * Hook personalizado para filtrar posts por término de búsqueda
 * Busca coincidencias en título y contenido (case-insensitive)
 */
export function usePostSearch(posts: Post[], searchTerm: string): Post[] {
  return useMemo(() => {
    // Si no hay término de búsqueda, retornar todos los posts
    if (!searchTerm.trim()) {
      return posts
    }

    // Normalizar el término de búsqueda
    const normalizedSearchTerm = searchTerm.toLowerCase().trim()

    // Filtrar posts que coincidan en título o contenido
    return posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(normalizedSearchTerm)
      const contentMatch = post.content
        .toLowerCase()
        .includes(normalizedSearchTerm)

      return titleMatch || contentMatch
    })
  }, [posts, searchTerm])
}

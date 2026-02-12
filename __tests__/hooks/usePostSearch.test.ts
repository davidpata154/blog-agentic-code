/**
 * Tests para hooks/usePostSearch.ts
 *
 * Estos tests verifican que el hook usePostSearch filtre posts
 * correctamente por título y contenido de forma case-insensitive.
 */

import { renderHook } from '@testing-library/react'
import { usePostSearch } from '@/hooks/usePostSearch'
import type { Post } from '@/types/post'

describe('usePostSearch Hook', () => {
  // Posts de ejemplo para usar en los tests
  const mockPosts: Post[] = [
    {
      id: '1',
      title: 'Introducción a React',
      content: 'React es una biblioteca de JavaScript para construir interfaces de usuario.',
      createdAt: '2024-01-15T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'Guía de Next.js',
      content: 'Next.js es un framework de React para producción con muchas características.',
      createdAt: '2024-01-16T00:00:00.000Z',
    },
    {
      id: '3',
      title: 'Testing con Jest',
      content: 'Jest es un framework de testing delightful para JavaScript y TypeScript.',
      createdAt: '2024-01-17T00:00:00.000Z',
    },
  ]

  it('should return all posts when search term is empty', () => {
    const { result } = renderHook(() => usePostSearch(mockPosts, ''))

    expect(result.current).toEqual(mockPosts)
    expect(result.current.length).toBe(3)
  })

  it('should return all posts when search term is only whitespace', () => {
    const { result } = renderHook(() => usePostSearch(mockPosts, '   '))

    expect(result.current).toEqual(mockPosts)
    expect(result.current.length).toBe(3)
  })

  it('should filter posts by title correctly', () => {
    const { result } = renderHook(() => usePostSearch(mockPosts, 'React'))

    expect(result.current.length).toBe(2)
    expect(result.current[0]?.id).toBe('1')
    expect(result.current[1]?.id).toBe('2')
  })

  it('should filter posts by content correctly', () => {
    const { result } = renderHook(() => usePostSearch(mockPosts, 'framework'))

    expect(result.current.length).toBe(2)
    expect(result.current[0]?.id).toBe('2')
    expect(result.current[1]?.id).toBe('3')
  })

  it('should be case-insensitive', () => {
    const { result: resultLower } = renderHook(() =>
      usePostSearch(mockPosts, 'react')
    )
    const { result: resultUpper } = renderHook(() =>
      usePostSearch(mockPosts, 'REACT')
    )
    const { result: resultMixed } = renderHook(() =>
      usePostSearch(mockPosts, 'ReAcT')
    )

    expect(resultLower.current.length).toBe(2)
    expect(resultUpper.current.length).toBe(2)
    expect(resultMixed.current.length).toBe(2)
    expect(resultLower.current).toEqual(resultUpper.current)
    expect(resultLower.current).toEqual(resultMixed.current)
  })

  it('should return empty array when no posts match', () => {
    const { result } = renderHook(() =>
      usePostSearch(mockPosts, 'nonexistent')
    )

    expect(result.current).toEqual([])
    expect(result.current.length).toBe(0)
  })

  it('should handle empty posts array', () => {
    const { result } = renderHook(() => usePostSearch([], 'React'))

    expect(result.current).toEqual([])
    expect(result.current.length).toBe(0)
  })

  it('should filter posts with partial matches', () => {
    const { result } = renderHook(() => usePostSearch(mockPosts, 'ción'))

    // Debería encontrar "Introducción" en el título y "producción" en el contenido del post 2
    expect(result.current.length).toBe(2)
    expect(result.current[0]?.id).toBe('1')
    expect(result.current[1]?.id).toBe('2')
  })

  it('should match posts by title or content', () => {
    const { result } = renderHook(() => usePostSearch(mockPosts, 'JavaScript'))

    // Debería encontrar posts que contengan "JavaScript" en título o contenido
    expect(result.current.length).toBe(2)
    expect(result.current[0]?.id).toBe('1')
    expect(result.current[1]?.id).toBe('3')
  })

  it('should handle special characters in search term', () => {
    const postsWithSpecialChars: Post[] = [
      {
        id: '1',
        title: 'C++ Programming',
        content: 'Learn C++ with examples.',
        createdAt: '2024-01-15T00:00:00.000Z',
      },
      {
        id: '2',
        title: 'Node.js Basics',
        content: 'Getting started with Node.js development.',
        createdAt: '2024-01-16T00:00:00.000Z',
      },
    ]

    const { result } = renderHook(() =>
      usePostSearch(postsWithSpecialChars, 'C++')
    )

    expect(result.current.length).toBe(1)
    expect(result.current[0]?.id).toBe('1')
  })

  it('should update results when search term changes', () => {
    const { result, rerender } = renderHook(
      ({ posts, term }) => usePostSearch(posts, term),
      {
        initialProps: { posts: mockPosts, term: 'React' },
      }
    )

    expect(result.current.length).toBe(2)

    // Cambiar el término de búsqueda
    rerender({ posts: mockPosts, term: 'Jest' })

    expect(result.current.length).toBe(1)
    expect(result.current[0]?.id).toBe('3')
  })

  it('should update results when posts array changes', () => {
    const { result, rerender } = renderHook(
      ({ posts, term }) => usePostSearch(posts, term),
      {
        initialProps: { posts: mockPosts, term: 'React' },
      }
    )

    expect(result.current.length).toBe(2)

    // Agregar un nuevo post con "React" en el título
    const updatedPosts: Post[] = [
      ...mockPosts,
      {
        id: '4',
        title: 'React Hooks',
        content: 'Deep dive into React Hooks.',
        createdAt: '2024-01-18T00:00:00.000Z',
      },
    ]

    rerender({ posts: updatedPosts, term: 'React' })

    expect(result.current.length).toBe(3)
  })
})

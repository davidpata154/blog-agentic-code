'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/types/post'

const STORAGE_KEY = 'blog-posts'

/**
 * Hook personalizado para manejar posts con localStorage
 */
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar posts desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setPosts(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Guardar posts en localStorage cuando cambien
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
      } catch (error) {
        console.error('Error saving posts:', error)
      }
    }
  }, [posts, isLoading])

  // Crear un nuevo post
  const createPost = (title: string, content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    }
    setPosts((prev) => [newPost, ...prev])
  }

  // Actualizar un post existente
  const updatePost = (id: string, title: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, title, content } : post
      )
    )
  }

  // Eliminar un post
  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }

  return {
    posts,
    isLoading,
    createPost,
    updatePost,
    deletePost,
  }
}

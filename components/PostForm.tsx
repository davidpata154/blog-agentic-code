'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/types/post'

interface PostFormProps {
  onSubmit: (title: string, content: string) => void
  onCancel?: () => void
  editingPost?: Post
  buttonText?: string
}

/**
 * Formulario simple para crear/editar posts
 */
export default function PostForm({
  onSubmit,
  onCancel,
  editingPost,
  buttonText = 'Publicar',
}: PostFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Si estamos editando, llenar el formulario
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title)
      setContent(editingPost.content)
    }
  }, [editingPost])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim())
      setTitle('')
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Título
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Escribe el título..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          required
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Contenido
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe el contenido..."
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none"
          required
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          {buttonText}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-medium"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

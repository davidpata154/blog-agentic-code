'use client'

import { Post } from '@/types/post'

interface PostItemProps {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: string) => void
}

/**
 * Componente que muestra un post individual
 */
export default function PostItem({ post, onEdit, onDelete }: PostItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>

        <time className="text-sm text-gray-600">{formatDate(post.createdAt)}</time>

        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => onEdit(post)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => {
              if (confirm('¿Seguro que quieres eliminar este post?')) {
                onDelete(post.id)
              }
            }}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}

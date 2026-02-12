'use client'

import { useState } from 'react'
import { usePosts } from '@/hooks/usePosts'
import { usePostSearch } from '@/hooks/usePostSearch'
import PostForm from '@/components/PostForm'
import PostItem from '@/components/PostItem'
import SearchBar from '@/components/SearchBar'
import { Post } from '@/types/post'

/**
 * Página principal del blog
 * Muestra formulario para crear/editar y lista de posts
 */
export default function HomePage() {
  const { posts, isLoading, createPost, updatePost, deletePost } = usePosts()
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar posts según el término de búsqueda
  const filteredPosts = usePostSearch(posts, searchTerm)

  const handleCreate = (title: string, content: string) => {
    createPost(title, content)
    setShowForm(false)
  }

  const handleUpdate = (title: string, content: string) => {
    if (editingPost) {
      updatePost(editingPost.id, title, content)
      setEditingPost(null)
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setShowForm(false)
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Botón para mostrar formulario de nuevo post */}
      {!showForm && !editingPost && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            ✅ New post
          </button>
        </div>
      )}

      {/* Barra de búsqueda */}
      {!showForm && !editingPost && posts.length > 0 && (
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          resultCount={filteredPosts.length}
        />
      )}

      {/* Formulario para nuevo post */}
      {showForm && !editingPost && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuevo Post</h2>
          <PostForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            buttonText="Publicar"
          />
        </div>
      )}

      {/* Formulario para editar post */}
      {editingPost && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Editar Post
          </h2>
          <PostForm
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
            editingPost={editingPost}
            buttonText="Guardar Cambios"
          />
        </div>
      )}

      {/* Lista de posts */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No hay posts todavía. ¡Crea el primero!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Posts ({filteredPosts.length})
          </h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No se encontraron posts que coincidan con &quot;{searchTerm}
                &quot;
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={deletePost}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

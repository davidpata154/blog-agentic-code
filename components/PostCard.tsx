import Link from 'next/link'
import { PostPreview } from '@/types/post'
import { formatDate, formatReadingTime } from '@/lib/posts'

interface PostCardProps {
  post: PostPreview
}

/**
 * Componente que muestra un preview de un post
 *
 * Renderiza una tarjeta con la información básica del post:
 * título, descripción y fecha. Al hacer click, navega al post completo.
 *
 * @param post - Datos del post a mostrar (sin contenido completo)
 *
 * @example
 * ```tsx
 * <PostCard post={{
 *   slug: 'mi-post',
 *   title: 'Mi Post',
 *   description: 'Descripción del post',
 *   date: '2024-01-15'
 * }} />
 * ```
 */
export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Link que cubre toda la card para mejor UX */}
      <Link href={`/blog/${post.slug}`} className="absolute inset-0">
        <span className="sr-only">Leer {post.title}</span>
      </Link>

      <div className="space-y-3">
        {/* Título del post */}
        <h2 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
          {post.title}
        </h2>

        {/* Fecha de publicación y tiempo de lectura */}
        <div className="text-sm text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> • </span>
          <span>⏱️ {formatReadingTime(post.readingTime)}</span>
        </div>

        {/* Descripción del post */}
        <p className="text-gray-600 line-clamp-3">{post.description}</p>

        {/* Call to action */}
        <div className="pt-2">
          <span className="text-primary-600 font-medium transition-colors group-hover:text-primary-700">
            Leer más →
          </span>
        </div>
      </div>
    </article>
  )
}

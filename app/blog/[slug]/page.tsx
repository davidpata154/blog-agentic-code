import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getPostBySlug,
  getAllPostSlugs,
  formatDate,
  formatReadingTime,
} from '@/lib/posts'
import PostContent from '@/components/PostContent'
import type { Metadata } from 'next'

/**
 * Props que recibe esta página
 *
 * En Next.js App Router, las páginas dinámicas reciben los parámetros
 * de la URL como props. Los params son una Promise que debe ser awaited.
 */
interface PageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * generateStaticParams - Generación estática de rutas
 *
 * Esta función le dice a Next.js qué rutas dinámicas generar en build time.
 * Es CRÍTICA para SSG (Static Site Generation).
 *
 * Next.js llamará esta función durante el build y generará una página
 * HTML estática para cada slug retornado.
 *
 * Sin esta función, las páginas se generarían bajo demanda (SSR).
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()

  // Retorna un array de objetos con la forma de los params
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

/**
 * generateMetadata - Metadata dinámica para SEO
 *
 * Genera metadata específica para cada post. Esta metadata es usada por:
 * - Motores de búsqueda (Google, Bing)
 * - Redes sociales (Twitter, Facebook, LinkedIn)
 * - Navegadores (título de la pestaña)
 *
 * Next.js ejecuta esta función en build time para cada página estática.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  // Si el post no existe, retorna metadata básica
  if (!post) {
    return {
      title: 'Post no encontrado',
    }
  }

  // Metadata completa para el post
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Blog Agentic Code'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

/**
 * Página individual de post
 *
 * Esta es la página que se muestra cuando accedes a /blog/[slug].
 * Es un Server Component que:
 * 1. Obtiene el slug de los params
 * 2. Lee el post del filesystem
 * 3. Renderiza el contenido o muestra 404
 */
export default async function BlogPostPage({ params }: PageProps) {
  // Await los params (requerido en Next.js 15+)
  const { slug } = await params

  // Obtiene el post completo
  const post = await getPostBySlug(slug)

  // Si no existe, muestra la página 404
  if (!post) {
    notFound()
  }

  return (
    <article className="space-y-8">
      {/* Botón de volver */}
      <Link
        href="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-700"
      >
        ← Volver al inicio
      </Link>

      {/* Header del post */}
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">•</span>
          <span>⏱️ {formatReadingTime(post.readingTime)}</span>
        </div>

        <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Divisor */}
      <hr className="border-gray-200" />

      {/* Contenido del post */}
      <PostContent content={post.content} />

      {/* Divisor */}
      <hr className="border-gray-200" />

      {/* Footer del post */}
      <footer className="pt-8">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          ← Volver al inicio
        </Link>
      </footer>
    </article>
  )
}

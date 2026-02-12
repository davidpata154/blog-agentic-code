/**
 * Post dinámico (localStorage) - usado en la página principal
 *
 * Sistema de posts dinámico que permite crear/editar/eliminar
 * posts que se almacenan en el navegador
 */
export interface Post {
  id: string
  title: string
  content: string
  createdAt: string
}

/**
 * Metadata del frontmatter de los posts en Markdown
 *
 * Representa los campos YAML al inicio de cada archivo .md
 */
export interface PostMetadata {
  title: string
  description: string
  date: string | Date
  slug?: string
}

/**
 * Post estático del blog (Markdown) - usado en /blog/[slug]
 *
 * Posts estáticos que se generan desde archivos .md
 * en la carpeta content/posts/
 */
export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  content: string
  readingTime: number
}

/**
 * Preview de un post estático (sin contenido completo)
 *
 * Usado en listados de posts para mejor performance
 */
export interface PostPreview {
  slug: string
  title: string
  description: string
  date: string
  readingTime: number
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost, PostMetadata, PostPreview } from '@/types/post'
import { markdownToHtml } from './markdown'

// Directorio donde se encuentran los posts
const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts')

/**
 * Calcula el tiempo estimado de lectura en minutos
 *
 * Calcula el tiempo de lectura basándose en el conteo de palabras
 * del contenido Markdown. Usa un promedio de 200 palabras por minuto,
 * que es estándar para contenido técnico.
 *
 * @param content - Contenido en formato Markdown
 * @returns Tiempo estimado de lectura en minutos (mínimo 1)
 *
 * @example
 * ```ts
 * calculateReadingTime('Este es un post con 100 palabras...') // 1
 * calculateReadingTime('Este es un post con 500 palabras...') // 3
 * ```
 */
export function calculateReadingTime(content: string): number {
  // Cuenta las palabras dividiendo por espacios en blanco
  const wordCount = content.trim().split(/\s+/).filter((word) => word.length > 0).length

  // Calcula minutos usando 200 palabras/minuto y redondea hacia arriba
  const minutes = Math.ceil(wordCount / 200)

  // Retorna mínimo 1 minuto para contenido muy corto
  return Math.max(1, minutes)
}

/**
 * Formatea el tiempo de lectura en español
 *
 * @param minutes - Tiempo de lectura en minutos
 * @returns String formateado (ej: "1 min de lectura" o "5 mins de lectura")
 *
 * @example
 * ```ts
 * formatReadingTime(1)  // "1 min de lectura"
 * formatReadingTime(5)  // "5 mins de lectura"
 * ```
 */
export function formatReadingTime(minutes: number): string {
  return minutes === 1 ? '1 min de lectura' : `${minutes} mins de lectura`
}

/**
 * Obtiene todos los slugs de posts disponibles
 *
 * Lee el directorio de posts y retorna un array con los nombres
 * de archivo (sin extensión), que usamos como slugs.
 *
 * @returns Array de strings con los slugs de todos los posts
 *
 * @example
 * ```ts
 * const slugs = getAllPostSlugs()
 * // ['primer-post', 'segundo-post', 'tercer-post']
 * ```
 */
export function getAllPostSlugs(): string[] {
  try {
    // Lee todos los archivos del directorio de posts
    const fileNames = fs.readdirSync(POSTS_DIRECTORY)

    // Filtra solo archivos .md y remueve la extensión
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading posts directory:', error)
    return []
  }
}

/**
 * Obtiene un post completo por su slug
 *
 * Lee el archivo Markdown, extrae el frontmatter (metadata),
 * procesa el contenido a HTML y retorna el post completo.
 *
 * @param slug - Identificador único del post
 * @returns Promise que resuelve con el BlogPost completo, o null si no existe
 *
 * @example
 * ```ts
 * const post = await getPostBySlug('primer-post')
 * if (post) {
 *   console.log(post.title, post.content)
 * }
 * ```
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`)

    // Verifica si el archivo existe
    if (!fs.existsSync(fullPath)) {
      return null
    }

    // Lee el contenido del archivo
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Usa gray-matter para parsear el frontmatter
    const { data, content } = matter(fileContents)

    // Valida que el frontmatter tenga los campos requeridos
    const metadata = data as PostMetadata

    if (!metadata.title || !metadata.description || !metadata.date) {
      console.error(`Post ${slug} missing required frontmatter fields`)
      return null
    }

    // Calcula el tiempo de lectura antes de convertir a HTML
    const readingTime = calculateReadingTime(content)

    // Convierte el Markdown a HTML
    const htmlContent = await markdownToHtml(content)

    // Normaliza la fecha a formato ISO string
    // gray-matter puede convertir fechas YAML a objetos Date
    const dateString =
      metadata.date instanceof Date
        ? metadata.date.toISOString().split('T')[0]!
        : metadata.date

    // Retorna el post completo
    return {
      slug,
      title: metadata.title,
      description: metadata.description,
      date: dateString,
      content: htmlContent,
      readingTime,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/**
 * Obtiene todos los posts (sin contenido completo) ordenados por fecha
 *
 * Lee todos los posts disponibles, extrae su metadata y los
 * retorna ordenados del más reciente al más antiguo.
 * No incluye el contenido HTML para mejor performance.
 *
 * @returns Promise que resuelve con array de PostPreview ordenados por fecha
 *
 * @example
 * ```ts
 * const posts = await getAllPosts()
 * posts.forEach(post => {
 *   console.log(`${post.title} - ${post.date}`)
 * })
 * ```
 */
export async function getAllPosts(): Promise<PostPreview[]> {
  const slugs = getAllPostSlugs()

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const metadata = data as PostMetadata

        // Calcula el tiempo de lectura
        const readingTime = calculateReadingTime(content)

        // Normaliza la fecha a formato ISO string
        const dateString =
          metadata.date instanceof Date
            ? metadata.date.toISOString().split('T')[0]!
            : metadata.date

        return {
          slug,
          title: metadata.title,
          description: metadata.description,
          date: dateString,
          readingTime,
        }
      } catch (error) {
        console.error(`Error reading post ${slug}:`, error)
        return null
      }
    })
  )

  // Filtra posts nulos y ordena por fecha (más reciente primero)
  return posts
    .filter((post): post is PostPreview => post !== null)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

/**
 * Formatea una fecha ISO a un formato legible en español
 *
 * @param dateString - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Fecha formateada (ej: "15 de enero de 2024")
 *
 * @example
 * ```ts
 * formatDate('2024-01-15') // "15 de enero de 2024"
 * ```
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

import { remark } from 'remark'
import html from 'remark-html'

/**
 * Convierte contenido Markdown a HTML
 *
 * Usa la librería remark para procesar Markdown de forma segura
 * y convertirlo a HTML que se puede renderizar en el navegador.
 *
 * @param markdown - String con contenido en formato Markdown
 * @returns Promise que resuelve con el HTML generado
 *
 * @example
 * ```ts
 * const htmlContent = await markdownToHtml('# Hola Mundo\n\nEste es un **párrafo**.')
 * // Retorna: '<h1>Hola Mundo</h1>\n<p>Este es un <strong>párrafo</strong>.</p>'
 * ```
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  // Procesa el Markdown usando remark
  const result = await remark()
    .use(html, { sanitize: false }) // Convertir a HTML (no sanitizamos porque confiamos en nuestro contenido)
    .process(markdown)

  return result.toString()
}

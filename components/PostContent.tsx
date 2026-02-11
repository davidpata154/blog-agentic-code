interface PostContentProps {
  content: string
}

/**
 * Componente que renderiza el contenido HTML de un post
 *
 * Usa dangerouslySetInnerHTML para renderizar HTML que fue
 * generado desde Markdown. Es seguro porque controlamos el origen
 * del contenido (nuestros propios archivos .md).
 *
 * @param content - HTML procesado del post
 *
 * @example
 * ```tsx
 * <PostContent content="<h1>Título</h1><p>Párrafo</p>" />
 * ```
 */
export default function PostContent({ content }: PostContentProps) {
  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

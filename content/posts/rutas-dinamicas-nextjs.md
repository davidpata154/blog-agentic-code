---
title: Rutas Dinámicas en Next.js
description: Aprende a crear rutas dinámicas con parámetros usando el App Router de Next.js y generateStaticParams.
date: 2024-01-22
slug: rutas-dinamicas-nextjs
---

# Rutas Dinámicas en Next.js

Las rutas dinámicas son esenciales para cualquier aplicación web moderna. En este artículo aprenderás cómo implementarlas correctamente en Next.js con el App Router.

## ¿Qué son las rutas dinámicas?

Las rutas dinámicas permiten crear páginas con URLs que contienen parámetros variables. Por ejemplo:

- `/blog/primer-post`
- `/blog/segundo-post`
- `/productos/123`

En lugar de crear un archivo para cada URL, usamos **parámetros dinámicos**.

## Creando una ruta dinámica

Para crear una ruta dinámica, usa corchetes `[]` en el nombre de la carpeta:

```
app/
  blog/
    [slug]/
      page.tsx
```

Esta estructura captura cualquier segmento después de `/blog/` y lo pasa como parámetro `slug`.

## Accediendo a los parámetros

```tsx
// app/blog/[slug]/page.tsx
interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params

  return (
    <div>
      <h1>Post: {slug}</h1>
    </div>
  )
}
```

## generateStaticParams: Generación estática

Para generar páginas estáticas en build time, usa `generateStaticParams`:

```tsx
export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

### ¿Por qué es importante?

1. **Performance**: Las páginas se generan en build time, no en runtime
2. **SEO**: Todo el contenido está disponible para crawlers
3. **Hosting**: Puedes deployar en CDN estático (más barato y rápido)

## Metadata dinámica

También puedes generar metadata SEO dinámica:

```tsx
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return {
    title: post.title,
    description: post.description,
  }
}
```

## Manejo de errores

¿Qué pasa si el post no existe? Usa `notFound()`:

```tsx
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound() // Muestra la página 404
  }

  return <div>{post.content}</div>
}
```

## Conclusión

Las rutas dinámicas son el corazón de aplicaciones web modernas. Con `generateStaticParams` y `generateMetadata`, Next.js te permite crear sitios increíblemente rápidos con excelente SEO.

En el próximo artículo, exploraremos cómo procesar Markdown y crear un sistema de blog completo.

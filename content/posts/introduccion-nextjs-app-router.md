---
title: Introducción a Next.js App Router
description: Aprende los conceptos fundamentales del nuevo App Router de Next.js y por qué es el futuro del desarrollo con React.
date: 2024-01-15
slug: introduccion-nextjs-app-router
---

# Introducción a Next.js App Router

Next.js 13 introdujo un cambio revolucionario en la forma de construir aplicaciones: el **App Router**. En este artículo, exploraremos qué es, por qué es importante y cómo empezar a usarlo.

## ¿Qué es el App Router?

El App Router es el nuevo sistema de enrutamiento de Next.js basado en el sistema de archivos, pero con capacidades mucho más poderosas que el Pages Router tradicional.

### Características principales:

- **Server Components por defecto**: Los componentes se renderizan en el servidor, mejorando el rendimiento
- **Layouts anidados**: Comparte UI entre rutas de forma eficiente
- **Streaming**: Carga progresiva de UI para mejor experiencia de usuario
- **Colocation**: Coloca componentes, tests y estilos junto a las rutas

## Server Components vs Client Components

Una de las innovaciones más importantes es la distinción entre Server y Client Components:

### Server Components (por defecto)
- Se ejecutan en el servidor
- Pueden acceder directamente a bases de datos
- No aumentan el bundle size del JavaScript del cliente
- No pueden usar hooks como useState o useEffect

### Client Components
- Se marcan con `'use client'` al inicio del archivo
- Pueden usar interactividad y estado
- Se ejecutan en el navegador
- Necesitan cuando usas hooks de React

## Ejemplo práctico

```tsx
// app/page.tsx - Server Component (por defecto)
import { getAllPosts } from '@/lib/posts'

export default async function HomePage() {
  // Puedes hacer fetch directo aquí
  const posts = await getAllPosts()

  return (
    <div>
      <h1>Mis Posts</h1>
      {posts.map(post => (
        <article key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </article>
      ))}
    </div>
  )
}
```

## Conclusión

El App Router representa el futuro de Next.js. Aunque tiene una curva de aprendizaje, los beneficios en rendimiento y experiencia de desarrollo lo hacen una herramienta esencial para proyectos modernos de React.

En el próximo artículo, exploraremos las rutas dinámicas y cómo generar páginas estáticas.

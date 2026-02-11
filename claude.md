# Documentación Técnica - Blog Agentic Code

## 📋 Índice
1. [Introducción](#introducción)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Decisiones Técnicas](#decisiones-técnicas)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Conceptos Clave de Next.js](#conceptos-clave-de-nextjs)
6. [Flujo de Datos](#flujo-de-datos)
7. [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
8. [Cómo Ejecutar los Tests](#cómo-ejecutar-los-tests)
9. [Agregar Nuevos Posts](#agregar-nuevos-posts)
10. [Recursos para Aprender](#recursos-para-aprender)

---

## 🎯 Introducción

Este proyecto es un blog educativo construido con **Next.js 15** usando el **App Router**. Está diseñado para enseñar conceptos modernos de desarrollo web mientras se construye una aplicación real y funcional.

### Características principales:
- ✅ Next.js con App Router (no Pages Router)
- ✅ Server Components por defecto
- ✅ Generación estática (SSG) de todas las páginas
- ✅ Rutas dinámicas con `generateStaticParams`
- ✅ Posts en Markdown con frontmatter
- ✅ TypeScript en todo el proyecto
- ✅ Tailwind CSS para estilos
- ✅ Testing con Jest y Testing Library
- ✅ SEO optimizado con `generateMetadata`
- ✅ ESLint y Prettier configurados

---

## 🏗️ Arquitectura del Proyecto

### Principios de diseño:

1. **Server Components First**: Por defecto, todos los componentes son Server Components (se ejecutan en el servidor), lo que mejora el rendimiento y SEO.

2. **Generación Estática (SSG)**: Todas las páginas se generan en build time, no en runtime. Esto significa:
   - Páginas ultra-rápidas
   - Hosting barato (puedes usar CDN estático)
   - Excelente SEO

3. **Separación de Responsabilidades**:
   - `lib/` → Lógica de negocio (lectura de posts, procesamiento)
   - `components/` → Componentes UI reutilizables
   - `app/` → Páginas y rutas
   - `types/` → Definiciones TypeScript

4. **Type-Safety**: TypeScript en todos los archivos para prevenir bugs.

---

## 🤔 Decisiones Técnicas

### ¿Por qué App Router y no Pages Router?

El App Router es la nueva forma recomendada de construir aplicaciones Next.js:
- **Mejor performance**: Server Components reducen el JavaScript enviado al cliente
- **Layouts anidados**: Compartir UI entre rutas es más fácil
- **Streaming**: Carga progresiva de UI
- **Futuro de Next.js**: Todas las nuevas features se desarrollan para App Router

### ¿Por qué Markdown?

Markdown es perfecto para contenido de blog:
- Fácil de escribir y leer
- Portable (puedes mover los archivos a otro sistema)
- Control de versiones con Git
- No necesitas base de datos

### ¿Por qué generación estática?

La generación estática (SSG) es ideal para blogs:
- **Performance**: Las páginas son HTML puro pre-generado
- **SEO**: Todo el contenido está disponible para motores de búsqueda
- **Costo**: Puedes hostear en CDN gratis (Vercel, Netlify, Cloudflare Pages)
- **Seguridad**: No hay servidor para hackear

### ¿Por qué no base de datos?

Para un blog educativo, Markdown es suficiente:
- Simplicidad: No necesitas configurar base de datos
- Portabilidad: Tus posts son archivos de texto
- Versionado: Git trackea cambios en los posts
- Cero costo: No pagas por base de datos

---

## 📁 Estructura de Carpetas

```
blog-agentic-code/
├── app/                          # App Router (Next.js 13+)
│   ├── layout.tsx                # Layout global (HTML, Header, Footer)
│   ├── page.tsx                  # Página home (/) - lista posts
│   ├── globals.css               # Estilos globales + Tailwind
│   ├── not-found.tsx             # Página 404
│   └── blog/
│       └── [slug]/               # Ruta dinámica
│           └── page.tsx          # Página individual de post
│
├── components/                   # Componentes reutilizables
│   ├── Header.tsx                # Header del sitio
│   ├── PostCard.tsx              # Card de preview de post
│   └── PostContent.tsx           # Renderiza HTML del post
│
├── lib/                          # Lógica de negocio
│   ├── posts.ts                  # Funciones para leer posts
│   └── markdown.ts               # Procesa Markdown → HTML
│
├── types/                        # TypeScript types
│   └── post.ts                   # Tipo Post, PostMetadata, PostPreview
│
├── content/                      # Contenido del blog
│   └── posts/                    # Posts en Markdown
│       ├── introduccion-nextjs-app-router.md
│       ├── rutas-dinamicas-nextjs.md
│       └── testing-nextjs-jest.md
│
├── __tests__/                    # Tests
│   ├── lib/
│   │   └── posts.test.ts         # Tests de funciones lib/posts
│   └── components/
│       ├── PostCard.test.tsx
│       └── PostContent.test.tsx
│
├── public/                       # Archivos estáticos
├── package.json                  # Dependencias
├── tsconfig.json                 # Configuración TypeScript
├── tailwind.config.ts            # Configuración Tailwind
├── jest.config.js                # Configuración Jest
├── .eslintrc.json                # Configuración ESLint
├── .prettierrc                   # Configuración Prettier
├── claude.md                     # Este archivo
└── README.md                     # Guía para usuarios
```

---

## 🎓 Conceptos Clave de Next.js

### 1. App Router

El App Router usa carpetas para definir rutas:

```
app/
  page.tsx          → /
  about/
    page.tsx        → /about
  blog/
    [slug]/
      page.tsx      → /blog/cualquier-cosa
```

### 2. Server Components vs Client Components

**Server Components** (por defecto):
- Se ejecutan en el servidor
- Pueden acceder a archivos, bases de datos directamente
- No aumentan el bundle de JavaScript del cliente
- No pueden usar hooks como `useState`, `useEffect`
- Perfectos para: fetch de datos, renderizado estático

**Client Components** (con `'use client'`):
- Se ejecutan en el navegador
- Pueden usar interactividad (`useState`, event handlers)
- Aumentan el bundle de JavaScript
- Perfectos para: formularios, interactividad, animaciones

En este proyecto, **todo es Server Component** porque no necesitamos interactividad.

### 3. generateStaticParams

Esta función le dice a Next.js qué rutas dinámicas generar en build time:

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  return [
    { slug: 'post-1' },
    { slug: 'post-2' },
    { slug: 'post-3' },
  ]
}
```

Next.js generará:
- `/blog/post-1`
- `/blog/post-2`
- `/blog/post-3`

### 4. generateMetadata

Genera metadata SEO dinámica para cada página:

```tsx
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)

  return {
    title: post.title,
    description: post.description,
    // Open Graph para redes sociales
    openGraph: {
      title: post.title,
      description: post.description,
    },
  }
}
```

### 5. Layout System

Los layouts se comparten entre rutas:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}  {/* Aquí se inyecta cada página */}
        <Footer />
      </body>
    </html>
  )
}
```

---

## 🔄 Flujo de Datos

### Build time (cuando corres `npm run build`):

```
1. Next.js ejecuta generateStaticParams()
   ↓
2. Obtiene la lista de todos los slugs
   ↓
3. Para cada slug:
   - Lee el archivo .md
   - Extrae frontmatter (metadata)
   - Convierte Markdown → HTML
   - Genera metadata SEO
   - Renderiza la página
   - Guarda HTML estático
   ↓
4. Genera todas las páginas estáticas
```

### Request time (cuando un usuario visita tu sitio):

```
1. Usuario visita /blog/primer-post
   ↓
2. CDN sirve el HTML estático pre-generado
   ↓
3. Navegador muestra la página
   (No hay procesamiento en servidor!)
```

---

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos previos:
- Node.js 18+ instalado
- npm o yarn

### Pasos:

1. **Instalar dependencias**:
```bash
npm install
```

2. **Modo desarrollo** (con hot reload):
```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

3. **Build de producción** (genera páginas estáticas):
```bash
npm run build
```

Esto creará todas las páginas en la carpeta `out/`.

4. **Preview del build**:
```bash
npm run start
```

### Scripts disponibles:

- `npm run dev` → Modo desarrollo
- `npm run build` → Build de producción
- `npm run start` → Preview del build
- `npm run lint` → Ejecuta ESLint
- `npm run format` → Formatea código con Prettier
- `npm test` → Ejecuta tests
- `npm run test:watch` → Tests en modo watch

---

## 🧪 Cómo Ejecutar los Tests

Este proyecto usa **Jest** y **React Testing Library**.

### Ejecutar todos los tests:
```bash
npm test
```

### Modo watch (re-ejecuta en cada cambio):
```bash
npm run test:watch
```

### Ver cobertura de código:
```bash
npm test -- --coverage
```

### Estructura de tests:

```
__tests__/
├── lib/
│   └── posts.test.ts       # Tests de funciones helper
└── components/
    ├── PostCard.test.tsx   # Tests de componentes
    └── PostContent.test.tsx
```

### Ejemplo de test:

```tsx
import { render, screen } from '@testing-library/react'
import PostCard from '@/components/PostCard'

describe('PostCard', () => {
  it('should render post title', () => {
    const post = {
      slug: 'test',
      title: 'Test Title',
      description: 'Test description',
      date: '2024-01-15',
    }

    render(<PostCard post={post} />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

---

## ✍️ Agregar Nuevos Posts

### Paso 1: Crear archivo Markdown

Crea un nuevo archivo en `content/posts/`:

```bash
content/posts/mi-nuevo-post.md
```

### Paso 2: Agregar frontmatter

El frontmatter es metadata en YAML al inicio del archivo:

```markdown
---
title: Mi Nuevo Post
description: Una descripción breve del post
date: 2024-02-11
slug: mi-nuevo-post
---

# Contenido del post aquí

Este es el contenido en **Markdown**.

## Subtítulo

- Item 1
- Item 2
```

### Campos requeridos del frontmatter:

- `title`: Título del post
- `description`: Descripción breve (para SEO y preview)
- `date`: Fecha en formato ISO (YYYY-MM-DD)
- `slug`: URL del post (debe coincidir con el nombre del archivo)

### Paso 3: Rebuild

```bash
npm run build
```

Next.js detectará el nuevo post y generará su página estática automáticamente.

---

## 📚 Recursos para Aprender

### Next.js:
- [Documentación oficial de Next.js](https://nextjs.org/docs)
- [App Router Tutorial](https://nextjs.org/docs/app)
- [Server Components explicados](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

### React:
- [React Docs Beta](https://react.dev)
- [React Server Components](https://react.dev/reference/react/use-server)

### TypeScript:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript con React](https://react-typescript-cheatsheet.netlify.app/)

### Testing:
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Next.js](https://nextjs.org/docs/testing)

### Tailwind CSS:
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind con Next.js](https://tailwindcss.com/docs/guides/nextjs)

---

## 🎯 Próximos Pasos

Ideas para extender este proyecto:

1. **Categorías/Tags**: Agregar filtrado por categorías
2. **Búsqueda**: Implementar búsqueda de posts
3. **RSS Feed**: Generar feed RSS automáticamente
4. **Dark Mode**: Toggle entre tema claro/oscuro
5. **Comentarios**: Integrar sistema de comentarios (ej: Giscus)
6. **Analytics**: Agregar Google Analytics o Plausible
7. **Newsletter**: Integrar formulario de suscripción
8. **Imágenes**: Optimización de imágenes con `next/image`
9. **Paginación**: Si tienes muchos posts
10. **Series**: Agrupar posts en series/cursos

---

## 🐛 Troubleshooting

### Error: "Cannot find module..."
Solución: Ejecuta `npm install`

### Tests fallan con módulos ESM
Solución: Los mocks están configurados en los tests para evitar este problema.

### Build falla
Solución: Verifica que todos los posts tengan frontmatter válido.

### Next.js warning sobre lockfiles
Solución: Este warning es informativo y no afecta la funcionalidad.

---

## 📝 Notas Finales

Este proyecto fue diseñado con propósitos educativos. El código está abundantemente comentado para facilitar el aprendizaje. No dudes en:

- Modificar el código
- Agregar nuevas features
- Experimentar con diferentes patrones
- Romper cosas y aprender de los errores

**¡Happy coding!** 🚀

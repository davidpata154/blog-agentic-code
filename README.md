# 📝 Blog Agentic Code

Un blog moderno construido con Next.js 15, TypeScript y Tailwind CSS. Diseñado para ser educativo, profesional y fácil de entender.

## ✨ Características

- 🚀 **Next.js 15** con App Router
- 📄 **Posts en Markdown** - Escribe contenido en archivos .md
- ⚡ **Generación Estática (SSG)** - Performance ultra-rápida
- 🎨 **Tailwind CSS** - Diseño limpio y responsive
- 🔍 **SEO Optimizado** - Metadata dinámica por post
- ✅ **TypeScript** - Type-safety en todo el proyecto
- 🧪 **Testing** - Jest + Testing Library configurados
- 🎯 **Server Components** - Lo último en React

## 🚀 Inicio Rápido

### Requisitos

- Node.js 18 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repo-url>
cd blog-agentic-code

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Genera build de producción
npm run start        # Ejecuta el build localmente

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier

# Testing
npm test             # Ejecuta todos los tests
npm run test:watch   # Tests en modo watch
```

## 📁 Estructura del Proyecto

```
blog-agentic-code/
├── app/              # Páginas y rutas (App Router)
├── components/       # Componentes reutilizables
├── lib/              # Funciones helper
├── types/            # Tipos TypeScript
├── content/posts/    # Tus posts en Markdown
├── __tests__/        # Tests
└── public/           # Archivos estáticos
```

## ✍️ Cómo Agregar un Post

1. Crea un archivo `.md` en `content/posts/`:

```markdown
---
title: Tu Título
description: Una descripción breve
date: 2024-02-11
slug: tu-titulo
---

# Contenido del Post

Escribe aquí tu contenido en **Markdown**.
```

2. Rebuild el proyecto:

```bash
npm run build
```

¡Listo! Tu post aparecerá automáticamente en el blog.

## 🧪 Testing

Este proyecto incluye tests unitarios para componentes y funciones helper:

```bash
# Ejecutar todos los tests
npm test

# Ver cobertura
npm test -- --coverage
```

## 📚 Aprende Más

- **Documentación técnica completa**: Ver [claude.md](./claude.md)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **App Router Guide**: [nextjs.org/docs/app](https://nextjs.org/docs/app)

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Markdown**: gray-matter + remark
- **Linting**: ESLint + Prettier

## 🌟 Características Técnicas

- **Server Components**: Mejor performance y SEO
- **generateStaticParams**: Pre-generación de rutas dinámicas
- **generateMetadata**: SEO dinámico por página
- **Type-safe**: TypeScript estricto
- **Tested**: Cobertura de tests en componentes clave

## 📖 Conceptos que Aprenderás

1. Next.js App Router
2. Server Components vs Client Components
3. Rutas dinámicas con `[slug]`
4. Generación estática (SSG)
5. Metadata SEO
6. Testing en Next.js
7. TypeScript avanzado
8. Tailwind CSS

## 🤝 Contribuir

Este es un proyecto educativo. ¡Siéntete libre de experimentar, modificar y aprender!

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¿Necesitas ayuda?** Revisa la [documentación técnica completa](./claude.md) para información detallada sobre arquitectura, decisiones técnicas y guías paso a paso.

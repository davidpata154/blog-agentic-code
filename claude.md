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
11. [🤖 Sistema Agentic Code (ADW)](#-sistema-agentic-code-adw)

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

## 🤖 Sistema Agentic Code (ADW)

Este proyecto incluye el sistema **ADW (AI Developer Workflow)** que permite desarrollo automatizado mediante agentes de IA. El sistema utiliza Claude Code para ejecutar workflows completos de desarrollo desde la planificación hasta el deployment.

### ¿Qué es ADW?

ADW es un sistema de workflows automatizados que:
- **Planifica** features a partir de GitHub issues
- **Implementa** código siguiendo las especificaciones
- **Prueba** automáticamente la implementación
- **Revisa** el código con screenshots
- **Documenta** los cambios realizados
- **Crea PRs** y puede hacer merge automático

### Características Principales

#### 1. Worktrees Aislados
Cada workflow se ejecuta en su propio **git worktree** aislado:
- 15 instancias concurrentes posibles
- Puertos dedicados (backend: 9100-9114, frontend: 9200-9214)
- Filesystem completamente aislado
- Sin interferencia entre workflows

#### 2. Comandos Slash
El sistema incluye comandos slash personalizados en `.claude/commands/`:
- `/feature` - Planificar nueva funcionalidad
- `/bug` - Planificar corrección de bugs
- `/chore` - Planificar tareas de mantenimiento
- `/implement` - Implementar un plan
- `/test` - Ejecutar pruebas
- `/review` - Revisar implementación
- `/document` - Generar documentación
- `/start` - Iniciar la aplicación
- Y muchos más...

#### 3. Hooks Automatizados
Hooks en `.claude/hooks/` que se ejecutan automáticamente:
- `pre_tool_use.py` - Bloquea comandos peligrosos, protege archivos .env
- `post_tool_use.py` - Registra uso de herramientas
- `notification.py` - Envía notificaciones
- `stop.py` - Limpieza al detener
- `user_prompt_submit.py` - Logging de prompts

### Configuración Inicial

#### 1. Instalar Dependencias

```bash
# GitHub CLI (si no lo tienes)
brew install gh              # macOS
# sudo apt install gh        # Ubuntu/Debian

# Python UV (gestor de paquetes)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Autenticar GitHub
gh auth login

# Instalar Cloudflare tunnel (opcional, para webhooks)
brew install cloudflared     # macOS
```

#### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
cp .env.sample .env
```

Edita `.env` y configura:

```bash
# REQUERIDO: API Key de Anthropic para Claude Code
ANTHROPIC_API_KEY=sk-ant-xxxxx

# OPCIONAL: GitHub PAT (si quieres usar cuenta diferente a gh auth)
GITHUB_PAT=ghp_xxxxx

# OPCIONAL: Ruta a Claude Code (si 'claude' no funciona)
CLAUDE_CODE_PATH=claude

# OPCIONAL: E2B para sandbox en la nube
E2B_API_KEY=xxxxx

# OPCIONAL: Cloudflare tunnel para webhooks
CLOUDFLARED_TUNNEL_TOKEN=xxxxx

# OPCIONAL: Cloudflare R2 para screenshots
CLOUDFLARE_ACCOUNT_ID=xxxxx
CLOUDFLARE_R2_ACCESS_KEY_ID=xxxxx
CLOUDFLARE_R2_SECRET_ACCESS_KEY=xxxxx
CLOUDFLARE_R2_BUCKET_NAME=xxxxx
CLOUDFLARE_R2_PUBLIC_DOMAIN=xxxxx
```

#### 3. Configurar MCP Servers (Opcional)

Si quieres usar Playwright para testing E2E:

```bash
cp .mcp.json.sample .mcp.json
```

El archivo ya está configurado para Playwright. Asegúrate de tener Node.js instalado.

### Workflows Disponibles

#### Workflows de Entrada (Crean Worktrees)

```bash
cd adws/

# Planificar solamente
uv run adw_plan_iso.py <issue-number>

# Patch rápido
uv run adw_patch_iso.py <issue-number>

# Planificar + Implementar
uv run adw_plan_build_iso.py <issue-number>

# Planificar + Implementar + Testear
uv run adw_plan_build_test_iso.py <issue-number>

# Planificar + Implementar + Testear + Revisar
uv run adw_plan_build_test_review_iso.py <issue-number>

# SDLC Completo (Plan + Build + Test + Review + Document)
uv run adw_sdlc_iso.py <issue-number>

# Zero Touch Execution (Auto-merge a main)
uv run adw_sdlc_zte_iso.py <issue-number>
```

#### Workflows Dependientes (Requieren Worktree Existente)

```bash
# Implementar en worktree existente
uv run adw_build_iso.py <issue-number> <adw-id>

# Testear en worktree existente
uv run adw_test_iso.py <issue-number> <adw-id>

# Revisar en worktree existente
uv run adw_review_iso.py <issue-number> <adw-id>

# Documentar en worktree existente
uv run adw_document_iso.py <issue-number> <adw-id>

# Aprobar y hacer merge del PR
uv run adw_ship_iso.py <issue-number> <adw-id>
```

### Ejemplo de Uso Completo

#### Paso 1: Crear un Issue en GitHub

Crea un issue describiendo lo que quieres implementar:

```
Title: Agregar modo oscuro al blog

Body:
Implementar un toggle de modo oscuro que permita a los usuarios
cambiar entre tema claro y oscuro. El estado debe persistir en
localStorage.
```

#### Paso 2: Ejecutar el Workflow SDLC

```bash
cd adws/
uv run adw_sdlc_iso.py 123  # Reemplaza 123 con el número de tu issue
```

Esto ejecutará automáticamente:
1. **Plan**: Analiza el issue y crea un plan detallado
2. **Build**: Implementa la solución
3. **Test**: Ejecuta todas las pruebas
4. **Review**: Valida la implementación con screenshots
5. **Document**: Genera documentación técnica

#### Paso 3: Revisar el PR

El workflow creará un PR automáticamente. Puedes:
- Revisar los cambios en GitHub
- Ver los screenshots de la review
- Leer la documentación generada

#### Paso 4: Hacer Ship (Merge)

```bash
# Obtén el ADW ID del comentario en el issue
uv run adw_ship_iso.py 123 abc12345
```

### Scripts Útiles

```bash
# Verificar qué puertos están en uso
./scripts/check_ports.sh

# Limpiar comentarios de un issue
./scripts/clear_issue_comments.sh <issue-number>

# Eliminar un PR
./scripts/delete_pr.sh <pr-number>

# Exponer webhook con Cloudflare
./scripts/expose_webhook.sh

# Detener webhook
./scripts/kill_trigger_webhook.sh

# Limpiar worktree
./scripts/purge_tree.sh <adw-id>

# Iniciar aplicación
./scripts/start.sh

# Detener aplicaciones
./scripts/stop_apps.sh
```

### Triggers Automáticos

#### Trigger por Cron (Polling)

Monitorea GitHub cada 20 segundos y ejecuta workflows automáticamente:

```bash
cd adws/
uv run adw_triggers/trigger_cron.py
```

Se dispara cuando:
- Hay un nuevo issue sin comentarios
- El último comentario en un issue es exactamente "adw"

#### Trigger por Webhook (Tiempo Real)

Webhook server que responde instantáneamente a eventos de GitHub:

```bash
cd adws/
uv run adw_triggers/trigger_webhook.py
```

Configuración en GitHub:
1. Ve a Settings > Webhooks > Add webhook
2. Payload URL: `https://tu-dominio.com/gh-webhook`
3. Content type: `application/json`
4. Events: Issues, Issue comments

### Estructura de Carpetas ADW

```
blog-agentic-code/
├── .claude/                     # Configuración de Claude Code
│   ├── commands/                # Comandos slash personalizados
│   ├── hooks/                   # Hooks automatizados
│   ├── settings.json            # Configuración compartida
│   └── settings.local.json      # Configuración local (gitignored)
│
├── adws/                        # AI Developer Workflows
│   ├── adw_modules/             # Módulos compartidos
│   ├── adw_triggers/            # Triggers automáticos
│   ├── adw_tests/               # Tests del sistema ADW
│   ├── adw_*_iso.py             # Scripts de workflows
│   └── README.md                # Documentación detallada
│
├── scripts/                     # Scripts de utilidad
│   ├── expose_webhook.sh        # Exponer webhook
│   ├── start.sh                 # Iniciar app
│   └── ...
│
├── agents/                      # Output de agentes (gitignored)
│   └── {adw_id}/
│       ├── adw_state.json       # Estado del workflow
│       └── */                   # Outputs de cada fase
│
├── trees/                       # Worktrees aislados (gitignored)
│   └── {adw_id}/                # Copia completa del repo
│
├── specs/                       # Especificaciones generadas
│   └── issue-*-adw-*.md         # Planes de implementación
│
└── app_docs/                    # Documentación auto-generada
    └── features/
```

### Troubleshooting ADW

#### Error: "No worktree found"
```bash
# Verifica worktrees existentes
git worktree list

# Ejecuta un workflow de entrada primero
uv run adw_plan_iso.py <issue-number>
```

#### Error: "Port already in use"
```bash
# Verifica qué está usando el puerto
lsof -i :9107

# O usa el script de verificación
./scripts/check_ports.sh
```

#### Error: "ANTHROPIC_API_KEY not set"
```bash
# Verifica que .env existe y tiene la API key
cat .env | grep ANTHROPIC_API_KEY
```

#### Error: "gh: command not found"
```bash
# Instala GitHub CLI
brew install gh
gh auth login
```

#### Error: "uv: command not found"
```bash
# Instala UV
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Limpieza de Worktrees

Los worktrees persisten después de completar el workflow. Límpialos manualmente:

```bash
# Listar todos los worktrees
git worktree list

# Remover worktree específico
git worktree remove trees/abc12345

# O usar el script de limpieza
./scripts/purge_tree.sh abc12345

# Limpiar entradas inválidas
git worktree prune
```

### Seguridad

Los hooks incluyen protecciones de seguridad:
- Bloqueo de comandos `rm -rf` peligrosos
- Protección de archivos `.env`
- Validación de rutas
- Logging de todas las operaciones

### Recursos Adicionales

- [Documentación ADW completa](./adws/README.md)
- [Comandos Claude Code disponibles](./.claude/commands/)
- [Ejemplos de Hooks](./.claude/hooks/)

---

## 📝 Notas Finales

Este proyecto fue diseñado con propósitos educativos. El código está abundantemente comentado para facilitar el aprendizaje. No dudes en:

- Modificar el código
- Agregar nuevas features
- Experimentar con diferentes patrones
- Romper cosas y aprender de los errores

**¡Happy coding!** 🚀

# Feature: Agregar tiempo de lectura estimado en posts

## Metadata
issue_number: `3`
adw_id: `d917007e`
issue_json: `{"number":3,"title":"Agregar tiempo de lectura estimado en posts","body":"Agregar un indicador visual que muestre el tiempo estimado de lectura para cada post del blog.\n\n  **Requisitos:**\n  - Calcular tiempo de lectura basado en el conteo de palabras (promedio: 200 palabras/minuto)\n  - Mostrar en PostCard (lista de posts): \"5 min de lectura\"\n  - Mostrar en la página individual del post\n  - Formatear apropiadamente (1 min, 5 mins, etc.)\n  - Agregar ícono de reloj opcional\n\n  **Diseño:**\n  - Colocar junto a la fecha del post\n  - Usar formato: \"X min de lectura\" o \"X mins de lectura\"\n  - Estilo sutil que no distraiga del contenido\n\n  **Ejemplo visual:**\n  📅 11 Feb 2024 • ⏱️ 5 mins de lectura"}`

## Feature Description
Implementar un sistema de cálculo y visualización del tiempo estimado de lectura para los posts del blog. Esta funcionalidad calcula automáticamente el tiempo de lectura basándose en el conteo de palabras del contenido del post (asumiendo un promedio de 200 palabras por minuto) y lo muestra de forma visual junto a la fecha de publicación tanto en la lista de posts como en la página individual de cada post.

## User Story
As a blog reader
I want to see how long it will take me to read a post
So that I can decide if I have time to read it now or save it for later

## Problem Statement
Actualmente, los usuarios no tienen forma de saber cuánto tiempo les tomará leer un post antes de comenzar. Esta información es valiosa para que los lectores puedan gestionar su tiempo de lectura y tomar decisiones informadas sobre qué contenido consumir según el tiempo que tienen disponible.

## Solution Statement
Implementar un sistema que:
1. Calcule automáticamente el tiempo de lectura basado en el conteo de palabras del contenido Markdown
2. Almacene el tiempo estimado como parte de la metadata del post (readingTime)
3. Muestre el tiempo de lectura de forma visual junto a la fecha, con formato apropiado ("1 min de lectura" vs "5 mins de lectura")
4. Integre el indicador tanto en las tarjetas de preview (PostCard) como en la página individual del post
5. Use un ícono de reloj (⏱️) para hacer el indicador más visual y reconocible

## Relevant Files
Use these files to implement the feature:

- `lib/posts.ts` - Contiene las funciones de lectura y procesamiento de posts. Aquí agregaremos la función `calculateReadingTime()` que calcula el tiempo estimado basado en el conteo de palabras del contenido Markdown.

- `types/post.ts` - Define las interfaces TypeScript para posts. Aquí agregaremos el campo `readingTime` (number) a las interfaces `BlogPost` y `PostPreview` para incluir los minutos estimados de lectura.

- `components/PostCard.tsx` - Muestra el preview de un post en la lista. Aquí agregaremos la visualización del tiempo de lectura junto a la fecha de publicación con el formato "X min de lectura" o "X mins de lectura".

- `app/blog/[slug]/page.tsx` - Página individual del post. Aquí agregaremos la visualización del tiempo de lectura en el header del post, junto a la fecha.

- `lib/markdown.ts` - Procesa Markdown a HTML. Revisaremos este archivo para entender el flujo de procesamiento de contenido.

### New Files

- `__tests__/lib/reading-time.test.ts` - Tests unitarios para la función `calculateReadingTime()`. Validará:
  - Cálculo correcto con diferentes cantidades de palabras
  - Manejo de contenido vacío
  - Redondeo apropiado de minutos
  - Tiempo mínimo de 1 minuto

- `__tests__/components/PostCard-reading-time.test.tsx` - Tests para verificar que PostCard muestra correctamente el tiempo de lectura con el formato apropiado (singular/plural).

- `.claude/commands/e2e/test_reading_time.md` - Test E2E que valida visualmente que el tiempo de lectura se muestra correctamente tanto en la lista de posts como en la página individual del post.

- `.claude/commands/test_e2e.md` - Leer para entender cómo crear el test E2E.

- `.claude/commands/e2e/test_basic_query.md` - Leer como ejemplo de estructura de test E2E.

## Implementation Plan
### Phase 1: Foundation
Crear la función de cálculo de tiempo de lectura y actualizar las definiciones de tipos TypeScript para incluir el nuevo campo `readingTime`. Esta fase establece la base para todo el sistema.

### Phase 2: Core Implementation
Integrar el cálculo de tiempo de lectura en las funciones existentes de lectura de posts (`getPostBySlug` y `getAllPosts`) para que automáticamente calculen y retornen el tiempo estimado como parte de la metadata del post.

### Phase 3: Integration
Actualizar los componentes de UI (PostCard y página individual del post) para mostrar visualmente el tiempo de lectura junto a la fecha de publicación, siguiendo el diseño especificado con ícono de reloj y formato apropiado.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Update TypeScript Types
- Add `readingTime: number` field to `PostPreview` interface in `types/post.ts`
- Add `readingTime: number` field to `BlogPost` interface in `types/post.ts`
- This represents the estimated reading time in minutes

### 2. Create Reading Time Calculator Function
- Add `calculateReadingTime(content: string): number` function to `lib/posts.ts`
- Count words in the markdown content (split by whitespace)
- Calculate time using formula: `Math.ceil(wordCount / 200)` (200 words per minute average)
- Return minimum of 1 minute for very short content
- Add JSDoc documentation explaining the function

### 3. Write Unit Tests for Reading Time Calculator
- Create `__tests__/lib/reading-time.test.ts`
- Test with 0 words → should return 1 min
- Test with 100 words → should return 1 min (Math.ceil(100/200) = 1)
- Test with 200 words → should return 1 min
- Test with 201 words → should return 2 mins
- Test with 500 words → should return 3 mins (Math.ceil(500/200) = 3)
- Test with 1000 words → should return 5 mins
- Test that function handles empty strings and whitespace-only content

### 4. Integrate Reading Time into getPostBySlug
- Update `getPostBySlug()` in `lib/posts.ts` to calculate and include reading time
- Call `calculateReadingTime(content)` before converting markdown to HTML
- Add `readingTime` to the returned BlogPost object
- Reading time should be calculated from the raw markdown content, not HTML

### 5. Integrate Reading Time into getAllPosts
- Update `getAllPosts()` in `lib/posts.ts` to calculate and include reading time
- Call `calculateReadingTime(content)` for each post
- Add `readingTime` to each PostPreview object in the returned array

### 6. Create Reading Time Formatter Function
- Add `formatReadingTime(minutes: number): string` function to `lib/posts.ts`
- Return "1 min de lectura" for 1 minute (singular)
- Return "X mins de lectura" for multiple minutes (plural)
- Add JSDoc documentation

### 7. Write Unit Tests for Reading Time Formatter
- Add tests to `__tests__/lib/reading-time.test.ts`
- Test `formatReadingTime(1)` → "1 min de lectura"
- Test `formatReadingTime(2)` → "2 mins de lectura"
- Test `formatReadingTime(5)` → "5 mins de lectura"
- Test `formatReadingTime(10)` → "10 mins de lectura"

### 8. Update PostCard Component to Display Reading Time
- Update `components/PostCard.tsx` to show reading time
- Add reading time indicator next to the date: `{formatDate(post.date)} • ⏱️ {formatReadingTime(post.readingTime)}`
- Use bullet separator (•) between date and reading time
- Include clock emoji (⏱️) before the reading time text
- Ensure styling is consistent with existing date display (text-sm text-gray-500)

### 9. Write Unit Tests for PostCard with Reading Time
- Create `__tests__/components/PostCard-reading-time.test.tsx`
- Test that reading time is displayed correctly
- Test that clock emoji (⏱️) is present
- Test singular format: "1 min de lectura"
- Test plural format: "5 mins de lectura"
- Test that bullet separator (•) appears between date and reading time

### 10. Update Individual Post Page to Display Reading Time
- Update `app/blog/[slug]/page.tsx` to show reading time in the header
- Add reading time next to the date in the post header
- Use same format as PostCard: `{formatDate(post.date)} • ⏱️ {formatReadingTime(post.readingTime)}`
- Ensure consistent styling with existing header elements

### 11. Create E2E Test File
- Create `.claude/commands/e2e/test_reading_time.md`
- Read `.claude/commands/test_e2e.md` to understand E2E test structure
- Read `.claude/commands/e2e/test_basic_query.md` as an example
- Define test steps to:
  1. Navigate to home page
  2. Take screenshot of post list
  3. Verify reading time is visible on post cards with format "X min(s) de lectura"
  4. Verify clock emoji (⏱️) is present
  5. Click on a post to view individual page
  6. Take screenshot of individual post page
  7. Verify reading time is visible in post header
  8. Verify format matches PostCard format
- Include user story and success criteria

### 12. Run All Validation Commands
- Execute all commands from the "Validation Commands" section below
- Ensure zero regressions and all tests pass
- Fix any issues before considering the feature complete

## Testing Strategy
### Unit Tests
1. **Reading Time Calculator Tests**:
   - Test calculation with various word counts (0, 100, 200, 201, 500, 1000 words)
   - Verify minimum 1 minute for empty or very short content
   - Test correct rounding using Math.ceil
   - Test handling of edge cases (empty strings, whitespace-only)

2. **Reading Time Formatter Tests**:
   - Test singular format ("1 min de lectura")
   - Test plural format ("X mins de lectura" where X > 1)
   - Verify correct Spanish language formatting

3. **PostCard Component Tests**:
   - Test that reading time is displayed
   - Test clock emoji (⏱️) is present
   - Test bullet separator (•) between date and reading time
   - Test correct format based on reading time value
   - Test accessibility of time element

### Edge Cases
- Empty post content → should show "1 min de lectura"
- Very short posts (< 200 words) → should show "1 min de lectura"
- Exactly 200 words → should show "1 min de lectura"
- 201 words → should show "2 mins de lectura"
- Very long posts (5000+ words) → should calculate correctly (25+ mins)
- Posts with code blocks → words in code blocks should count toward reading time
- Posts with only whitespace → should handle gracefully (1 min)

## Acceptance Criteria
1. ✅ A `calculateReadingTime()` function exists that correctly calculates reading time based on word count (200 words/minute)
2. ✅ A `formatReadingTime()` function exists that formats the time correctly ("1 min de lectura" singular, "X mins de lectura" plural)
3. ✅ The `PostPreview` and `BlogPost` TypeScript interfaces include a `readingTime: number` field
4. ✅ The `getPostBySlug()` function calculates and returns reading time for each post
5. ✅ The `getAllPosts()` function calculates and returns reading time for all posts
6. ✅ The PostCard component displays reading time next to the date with format: "📅 11 Feb 2024 • ⏱️ 5 mins de lectura"
7. ✅ The individual post page displays reading time in the header with the same format
8. ✅ All unit tests pass (reading time calculator, formatter, and component tests)
9. ✅ The E2E test validates that reading time is visible and correctly formatted on both list and individual post pages
10. ✅ All existing tests still pass (zero regressions)
11. ✅ The clock emoji (⏱️) is visible on all reading time indicators
12. ✅ Reading time uses correct singular/plural Spanish grammar

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

1. Read `.claude/commands/test_e2e.md`
2. Read and execute the new E2E test file `.claude/commands/e2e/test_reading_time.md` to validate this functionality works
3. `npm test` - Run all tests (unit + component) to validate the feature works with zero regressions
4. `npm run build` - Build the project to ensure no TypeScript errors and static generation works
5. `npm run dev` - Start development server and manually verify reading time appears correctly on:
   - Home page post cards (http://localhost:3000)
   - Individual post pages (http://localhost:3000/blog/[any-post-slug])

## Notes
- The reading time calculation uses 200 words per minute, which is the standard average reading speed for technical content
- We use `Math.ceil()` to always round up, so readers have realistic expectations (better to overestimate than underestimate)
- The minimum reading time is 1 minute, even for very short posts, to avoid showing "0 mins de lectura"
- We calculate reading time from the raw Markdown content before HTML conversion to count actual words
- The clock emoji (⏱️) is used instead of an icon component to keep the implementation simple and avoid additional dependencies
- The bullet separator (•) provides visual separation between date and reading time
- Spanish grammar rules are followed: "min" (singular) vs "mins" (plural)
- Reading time is calculated at build time (not runtime) for better performance since posts are static
- The feature integrates seamlessly with existing post metadata without requiring changes to Markdown frontmatter

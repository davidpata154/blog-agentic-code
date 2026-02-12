# Feature: Búsqueda de Posts en Tiempo Real

## Metadata
issue_number: `1`
adw_id: `174525b3`
issue_json: `{"number":1,"title":"Agregar búsqueda de posts","body":"Implementar barra de búsqueda que filtre posts por título y contenido en tiempo real"}`

## Feature Description
Implementar una funcionalidad de búsqueda en tiempo real que permita a los usuarios filtrar posts por título y contenido. La búsqueda debe ser instantánea (sin necesidad de hacer clic en un botón), actualizando los resultados a medida que el usuario escribe. Esta feature mejorará significativamente la experiencia del usuario al permitir encontrar posts específicos de manera rápida y eficiente.

## User Story
As a **usuario del blog**
I want to **buscar posts escribiendo en una barra de búsqueda**
So that **puedo encontrar rápidamente contenido específico sin tener que desplazarme por todos los posts**

## Problem Statement
Actualmente, los usuarios del blog no tienen una forma eficiente de encontrar posts específicos. Si hay muchos posts en la lista, deben desplazarse manualmente por toda la lista para encontrar el contenido que buscan. Esto resulta en una experiencia de usuario subóptima, especialmente a medida que el blog crece y se agregan más posts.

## Solution Statement
Implementar un componente de búsqueda (SearchBar) que se coloque en la parte superior de la lista de posts. Este componente filtrará los posts en tiempo real utilizando un hook personalizado (usePostSearch) que mantendrá el estado de la búsqueda y devolverá posts filtrados. La búsqueda buscará coincidencias tanto en el título como en el contenido de cada post, siendo case-insensitive para mayor flexibilidad. La interfaz mostrará el número de posts encontrados y un mensaje amigable cuando no haya resultados.

## Relevant Files
Use these files to implement the feature:

### Existing Files
- **app/page.tsx** - Página principal que lista los posts. Aquí agregaremos el componente SearchBar y usaremos los posts filtrados del hook usePostSearch
- **hooks/usePosts.ts** - Hook actual que maneja posts con localStorage. Nos servirá de referencia para crear el nuevo hook usePostSearch
- **types/post.ts** - Define la interface Post. La usaremos para type-safety en el hook de búsqueda
- **components/PostItem.tsx** - Componente que renderiza cada post individual. No requiere cambios, pero lo usaremos para entender la estructura
- **__tests__/components/PostCard.test.tsx** - Ejemplo de tests de componentes para crear tests para SearchBar

### E2E Test Documentation
- **.claude/commands/test_e2e.md** - Documentación del runner de tests E2E usando Playwright
- **.claude/commands/e2e/test_basic_query.md** - Ejemplo de estructura de un test E2E

### New Files
- **components/SearchBar.tsx** - Nuevo componente client-side que renderizará el input de búsqueda
- **hooks/usePostSearch.ts** - Nuevo hook que manejará la lógica de filtrado de posts
- **__tests__/components/SearchBar.test.tsx** - Tests unitarios para el componente SearchBar
- **__tests__/hooks/usePostSearch.test.ts** - Tests unitarios para el hook usePostSearch
- **.claude/commands/e2e/test_post_search.md** - Test E2E para validar la funcionalidad de búsqueda completa

## Implementation Plan

### Phase 1: Foundation
Crear la infraestructura base para el sistema de búsqueda:
1. Crear el hook personalizado `usePostSearch` que encapsulará toda la lógica de búsqueda y filtrado
2. Crear el componente `SearchBar` que proporcionará la interfaz de usuario para la búsqueda
3. Escribir tests unitarios para ambos componentes antes de la integración

### Phase 2: Core Implementation
Implementar la funcionalidad principal de búsqueda:
1. Implementar la lógica de filtrado en el hook `usePostSearch` que buscará coincidencias en título y contenido
2. Agregar debouncing opcional para optimizar el rendimiento en búsquedas de texto largo
3. Implementar el estado de búsqueda en el componente `SearchBar` con feedback visual claro
4. Crear el test E2E que validará la funcionalidad completa

### Phase 3: Integration
Integrar la búsqueda con la aplicación existente:
1. Integrar `SearchBar` y `usePostSearch` en la página principal `app/page.tsx`
2. Actualizar la UI para mostrar resultados filtrados y contador de posts
3. Agregar mensajes de estado (sin resultados, búsqueda activa, etc.)
4. Validar que todos los tests pasen sin regresiones

## Step by Step Tasks

### Task 1: Crear hook usePostSearch con tests
- Crear archivo `hooks/usePostSearch.ts` que exporta el hook personalizado
- El hook debe recibir un array de posts y un término de búsqueda
- Implementar lógica de filtrado case-insensitive que busque en título y contenido
- Retornar posts filtrados y estado de búsqueda (isEmpty, resultCount)
- Crear archivo `__tests__/hooks/usePostSearch.test.ts` con los siguientes casos:
  - Test: Retorna todos los posts cuando el término de búsqueda está vacío
  - Test: Filtra posts por título correctamente
  - Test: Filtra posts por contenido correctamente
  - Test: La búsqueda es case-insensitive
  - Test: Retorna array vacío cuando no hay coincidencias
  - Test: Calcula correctamente el resultCount

### Task 2: Crear componente SearchBar con tests
- Crear archivo `components/SearchBar.tsx` como client component
- Agregar directive `'use client'` al inicio del archivo
- Crear interface `SearchBarProps` con:
  - `value: string` - valor actual de búsqueda
  - `onChange: (value: string) => void` - callback para cambios
  - `resultCount?: number` - número opcional de resultados encontrados
- Implementar input de búsqueda con:
  - Icono de búsqueda (🔍 o SVG)
  - Placeholder descriptivo: "Buscar posts por título o contenido..."
  - Botón de limpiar (X) que aparece solo cuando hay texto
  - Estilos consistentes con Tailwind (siguiendo el patrón de PostForm.tsx)
- Mostrar contador de resultados cuando `resultCount` está definido
- Crear archivo `__tests__/components/SearchBar.test.tsx` con los siguientes casos:
  - Test: Renderiza correctamente con props por defecto
  - Test: Llama onChange cuando el usuario escribe
  - Test: Muestra el contador de resultados cuando está definido
  - Test: Botón de limpiar limpia el input
  - Test: Botón de limpiar solo aparece cuando hay texto

### Task 3: Crear test E2E para búsqueda de posts
- Crear archivo `.claude/commands/e2e/test_post_search.md` siguiendo el formato de `test_basic_query.md`
- Definir User Story: "Como usuario del blog, quiero buscar posts por título y contenido en tiempo real"
- Especificar Test Steps:
  - Navegar a localhost:3000
  - Tomar screenshot del estado inicial
  - Verificar que SearchBar está presente
  - Crear 3 posts de prueba con títulos y contenidos distintos
  - Tomar screenshot de posts creados
  - Escribir término de búsqueda que coincide con un post
  - Verificar que solo aparece el post coincidente
  - Verificar que el contador muestra "1 post encontrado"
  - Tomar screenshot de resultados filtrados
  - Limpiar búsqueda con botón X
  - Verificar que aparecen todos los posts nuevamente
  - Tomar screenshot final
- Definir Success Criteria:
  - SearchBar acepta texto
  - Filtrado funciona en tiempo real
  - Contador de resultados es correcto
  - Botón de limpiar restaura todos los posts
  - 4 screenshots son tomados

### Task 4: Integrar SearchBar en página principal
- Abrir `app/page.tsx`
- Importar `SearchBar` y `usePostSearch`
- Agregar estado para el término de búsqueda: `const [searchTerm, setSearchTerm] = useState('')`
- Llamar al hook usePostSearch: `const filteredPosts = usePostSearch(posts, searchTerm)`
- Agregar componente `SearchBar` justo después del botón "Nuevo Post" y antes de los formularios
- Pasar props al SearchBar:
  - `value={searchTerm}`
  - `onChange={setSearchTerm}`
  - `resultCount={filteredPosts.length}`
- Actualizar la sección de lista de posts para usar `filteredPosts` en lugar de `posts`
- Actualizar el contador de posts: "Posts ({filteredPosts.length})"
- Agregar mensaje cuando no hay resultados de búsqueda: "No se encontraron posts que coincidan con '{searchTerm}'"

### Task 5: Validar implementación con todos los tests
- Ejecutar todos los tests unitarios con `npm test` y verificar que pasen
- Ejecutar type checking con `npm run build` para verificar TypeScript
- Leer `.claude/commands/test_e2e.md` para entender el proceso de testing E2E
- Ejecutar el test E2E creado `.claude/commands/e2e/test_post_search.md` usando Playwright
- Revisar screenshots generados para confirmar que la UI funciona correctamente
- Verificar que no hay regresiones en la funcionalidad existente
- Si algún test falla, corregir los problemas y volver a ejecutar

## Testing Strategy

### Unit Tests

**Hook usePostSearch:**
- Test con array vacío de posts
- Test con término de búsqueda vacío (debe retornar todos los posts)
- Test de búsqueda por título con coincidencias
- Test de búsqueda por contenido con coincidencias
- Test de búsqueda case-insensitive
- Test de búsqueda sin coincidencias (debe retornar array vacío)
- Test de búsqueda con múltiples coincidencias
- Test del cálculo de resultCount

**Componente SearchBar:**
- Test de renderizado inicial con props mínimas
- Test de renderizado con resultCount
- Test de interacción: escribir en el input
- Test de interacción: hacer clic en botón limpiar
- Test de visibilidad condicional del botón limpiar
- Test de accesibilidad: labels y placeholders

### Edge Cases
- **Búsqueda con caracteres especiales**: Verificar que caracteres como `[]().*+?` no rompan el filtrado
- **Posts sin contenido**: Asegurar que posts con strings vacíos no causan errores
- **Búsqueda de espacios múltiples**: Normalizar espacios antes de buscar
- **Búsqueda con acentos**: Considerar búsquedas con y sin acentos (español)
- **Performance con muchos posts**: Verificar que la búsqueda es eficiente con 100+ posts
- **Búsqueda mientras se edita un post**: Asegurar que el estado de búsqueda se mantiene correctamente
- **localStorage vacío**: Verificar comportamiento cuando no hay posts guardados

## Acceptance Criteria
1. ✅ El componente SearchBar aparece en la parte superior de la lista de posts
2. ✅ Los usuarios pueden escribir en la barra de búsqueda sin hacer clic en ningún botón
3. ✅ Los posts se filtran en tiempo real mientras el usuario escribe
4. ✅ La búsqueda encuentra coincidencias en títulos de posts
5. ✅ La búsqueda encuentra coincidencias en el contenido de posts
6. ✅ La búsqueda es case-insensitive (mayúsculas/minúsculas no afectan)
7. ✅ Se muestra un contador con el número de posts encontrados
8. ✅ Existe un botón para limpiar la búsqueda que restaura todos los posts
9. ✅ Cuando no hay coincidencias, se muestra un mensaje claro al usuario
10. ✅ La funcionalidad de crear, editar y eliminar posts sigue funcionando correctamente
11. ✅ Todos los tests unitarios pasan sin errores
12. ✅ El test E2E pasa sin errores y genera screenshots correctos
13. ✅ El build de producción se genera sin errores TypeScript

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

Read `.claude/commands/test_e2e.md`, then read and execute the new E2E test `.claude/commands/e2e/test_post_search.md` to validate this functionality works.

- `npm test` - Run all unit tests to validate no regressions
- `npm run build` - Run TypeScript type checking and production build to validate no type errors
- `npm run lint` - Run ESLint to validate code quality standards

## Notes
- **Performance considerations**: Para blogs con cientos de posts, considerar implementar debouncing en el input de búsqueda para reducir re-renders. Esto puede agregarse en una iteración futura si es necesario.
- **Future enhancements**:
  - Agregar highlighting de términos de búsqueda en los resultados
  - Implementar búsqueda por fecha o tags
  - Agregar historial de búsquedas recientes
  - Considerar búsqueda fuzzy (tolerante a errores de escritura)
- **Accessibility**: Asegurar que el SearchBar tiene labels apropiados y es navegable con teclado
- **i18n**: Si en el futuro se agrega internacionalización, los mensajes de búsqueda deberán traducirse
- **No se requieren nuevas dependencias**: Esta feature se implementa completamente con React hooks y no necesita librerías adicionales

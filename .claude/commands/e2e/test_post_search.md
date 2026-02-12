# E2E Test: Post Search Functionality

Test post search functionality in the blog application.

## User Story

As a blog user
I want to search posts by title and content in real-time
So that I can quickly find specific content without scrolling through all posts

## Test Steps

1. Navigate to `http://localhost:3000`
2. Take a screenshot of the initial state
3. **Verify** the SearchBar component is present with placeholder text "Buscar posts por título o contenido..."

4. Create test post #1:
   - Click "+ Nuevo Post" button
   - Enter title: "Introducción a React"
   - Enter content: "React es una biblioteca de JavaScript para construir interfaces de usuario"
   - Click "Publicar" button

5. Create test post #2:
   - Click "+ Nuevo Post" button
   - Enter title: "Guía de Next.js"
   - Enter content: "Next.js es un framework de React para producción con muchas características"
   - Click "Publicar" button

6. Create test post #3:
   - Click "+ Nuevo Post" button
   - Enter title: "Testing con Jest"
   - Enter content: "Jest es un framework de testing delightful para JavaScript y TypeScript"
   - Click "Publicar" button

7. Take a screenshot of all created posts

8. **Verify** all 3 posts are visible in the list
9. **Verify** the counter shows "Posts (3)"

10. Enter search term "React" in the SearchBar
11. **Verify** only 2 posts are visible (posts containing "React")
12. **Verify** the result counter shows "2 posts encontrados"
13. Take a screenshot of filtered results

14. Clear the search using the "✕" button
15. **Verify** all 3 posts are visible again
16. **Verify** the result counter shows "3 posts encontrados"

17. Enter search term "framework" in the SearchBar
18. **Verify** only 2 posts are visible (posts containing "framework")
19. **Verify** the result counter shows "2 posts encontrados"

20. Enter search term "nonexistent" in the SearchBar
21. **Verify** no posts are visible
22. **Verify** the message shows "No se encontraron posts"
23. Take a screenshot of no results state

24. Clear the search again
25. **Verify** all 3 posts are visible
26. Take a screenshot of final state

## Success Criteria
- SearchBar accepts text input
- Filtering works in real-time (no button needed)
- Search matches both title and content
- Search is case-insensitive
- Result counter displays correct count
- Clear button (✕) removes search and shows all posts
- "No results" message displays when no posts match
- All original functionality (create, edit, delete posts) still works
- 4 screenshots are taken: initial with posts, filtered results, no results, final state

## Application URL

http://localhost:3000

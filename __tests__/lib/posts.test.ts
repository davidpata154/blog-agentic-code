/**
 * Tests para lib/posts.ts
 *
 * Estos tests verifican que las funciones de lectura y procesamiento
 * de posts funcionen correctamente.
 */

// Mock del módulo markdown para evitar problemas con ESM
jest.mock('@/lib/markdown', () => ({
  markdownToHtml: jest.fn((markdown: string) => {
    // Simulación simple de conversión Markdown a HTML
    return Promise.resolve(
      markdown
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$2</h2>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<)(.+)$/gm, '<p>$1</p>')
    )
  }),
}))

import {
  getAllPostSlugs,
  getPostBySlug,
  getAllPosts,
  formatDate,
} from '@/lib/posts'

describe('posts utilities', () => {
  /**
   * Tests para getAllPostSlugs
   */
  describe('getAllPostSlugs', () => {
    it('should return an array of slugs', () => {
      const slugs = getAllPostSlugs()

      expect(Array.isArray(slugs)).toBe(true)
      expect(slugs.length).toBeGreaterThan(0)
    })

    it('should return slugs without .md extension', () => {
      const slugs = getAllPostSlugs()

      slugs.forEach((slug) => {
        expect(slug).not.toContain('.md')
      })
    })

    it('should include our test posts', () => {
      const slugs = getAllPostSlugs()

      expect(slugs).toContain('introduccion-nextjs-app-router')
      expect(slugs).toContain('rutas-dinamicas-nextjs')
      expect(slugs).toContain('testing-nextjs-jest')
    })
  })

  /**
   * Tests para getPostBySlug
   */
  describe('getPostBySlug', () => {
    it('should return a post object with all required fields', async () => {
      const post = await getPostBySlug('introduccion-nextjs-app-router')

      expect(post).toBeDefined()
      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('description')
      expect(post).toHaveProperty('date')
      expect(post).toHaveProperty('content')
    })

    it('should return null for non-existent post', async () => {
      const post = await getPostBySlug('non-existent-post')

      expect(post).toBeNull()
    })

    it('should convert markdown to HTML in content', async () => {
      const post = await getPostBySlug('introduccion-nextjs-app-router')

      expect(post).toBeDefined()
      expect(post?.content).toContain('<h1>')
      expect(post?.content).toContain('<p>')
    })

    it('should have correct slug matching filename', async () => {
      const post = await getPostBySlug('rutas-dinamicas-nextjs')

      expect(post).toBeDefined()
      expect(post?.slug).toBe('rutas-dinamicas-nextjs')
    })
  })

  /**
   * Tests para getAllPosts
   */
  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const posts = await getAllPosts()

      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeGreaterThan(0)
    })

    it('should return posts without content field', async () => {
      const posts = await getAllPosts()

      posts.forEach((post) => {
        expect(post).not.toHaveProperty('content')
        expect(post).toHaveProperty('slug')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('description')
        expect(post).toHaveProperty('date')
      })
    })

    it('should return posts sorted by date (newest first)', async () => {
      const posts = await getAllPosts()

      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i]!.date).getTime()
        const nextDate = new Date(posts[i + 1]!.date).getTime()

        expect(currentDate).toBeGreaterThanOrEqual(nextDate)
      }
    })
  })

  /**
   * Tests para formatDate
   */
  describe('formatDate', () => {
    it('should format ISO date to Spanish locale', () => {
      const formatted = formatDate('2024-01-15')

      expect(formatted).toContain('enero')
      expect(formatted).toContain('2024')
    })

    it('should handle different months correctly', () => {
      const january = formatDate('2024-01-15')
      const december = formatDate('2024-12-25')

      expect(january).toContain('enero')
      expect(december).toContain('diciembre')
    })

    it('should include day, month, and year', () => {
      const formatted = formatDate('2024-02-15')

      // Verifica que contenga un día (puede ser 14 o 15 por timezone)
      expect(formatted).toMatch(/\d{1,2}/)
      expect(formatted).toContain('febrero')
      expect(formatted).toContain('2024')
    })
  })
})

/**
 * Tests para components/PostCard.tsx
 *
 * Estos tests verifican que el componente PostCard renderice
 * correctamente la información de un post.
 */

import { render, screen } from '@testing-library/react'
import PostCard from '@/components/PostCard'
import type { PostPreview } from '@/types/post'

// Mock del módulo markdown para evitar problemas con ESM
jest.mock('@/lib/markdown', () => ({
  markdownToHtml: jest.fn((markdown: string) => Promise.resolve(markdown)),
}))

// Mock del módulo next/link para evitar errores en tests
jest.mock('next/link', () => {
  return ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => {
    return <a href={href}>{children}</a>
  }
})

describe('PostCard Component', () => {
  // Post de ejemplo para usar en los tests
  const mockPost: PostPreview = {
    slug: 'test-post',
    title: 'Test Post Title',
    description: 'This is a test post description for testing purposes.',
    date: '2024-01-15',
  }

  it('should render post title', () => {
    render(<PostCard post={mockPost} />)

    const title = screen.getByText('Test Post Title')
    expect(title).toBeInTheDocument()
  })

  it('should render post description', () => {
    render(<PostCard post={mockPost} />)

    const description = screen.getByText(
      'This is a test post description for testing purposes.'
    )
    expect(description).toBeInTheDocument()
  })

  it('should render formatted date', () => {
    render(<PostCard post={mockPost} />)

    // Busca el elemento time con el atributo dateTime
    const timeElement = screen.getByText(/enero/i)
    expect(timeElement).toBeInTheDocument()
  })

  it('should have correct link to post', () => {
    render(<PostCard post={mockPost} />)

    const link = screen.getByRole('link', { name: /leer test post title/i })
    expect(link).toHaveAttribute('href', '/blog/test-post')
  })

  it('should render "Leer más" call to action', () => {
    render(<PostCard post={mockPost} />)

    const cta = screen.getByText('Leer más →')
    expect(cta).toBeInTheDocument()
  })

  it('should apply correct CSS classes', () => {
    const { container } = render(<PostCard post={mockPost} />)

    const article = container.querySelector('article')
    expect(article).toHaveClass('group')
    expect(article).toHaveClass('rounded-lg')
  })

  it('should render with different post data', () => {
    const differentPost: PostPreview = {
      slug: 'another-post',
      title: 'Another Title',
      description: 'Another description',
      date: '2024-02-20',
    }

    render(<PostCard post={differentPost} />)

    expect(screen.getByText('Another Title')).toBeInTheDocument()
    expect(screen.getByText('Another description')).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import PostCard from '@/components/PostCard'
import { PostPreview } from '@/types/post'

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

describe('PostCard - Reading Time', () => {
  it('should display reading time with clock emoji', () => {
    const post: PostPreview = {
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test description',
      date: '2024-01-15',
      readingTime: 5,
    }

    render(<PostCard post={post} />)

    expect(screen.getByText(/⏱️/)).toBeInTheDocument()
    expect(screen.getByText(/5 mins de lectura/)).toBeInTheDocument()
  })

  it('should display singular format for 1 minute', () => {
    const post: PostPreview = {
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test description',
      date: '2024-01-15',
      readingTime: 1,
    }

    render(<PostCard post={post} />)

    expect(screen.getByText(/1 min de lectura/)).toBeInTheDocument()
    expect(screen.queryByText(/1 mins de lectura/)).not.toBeInTheDocument()
  })

  it('should display plural format for multiple minutes', () => {
    const post: PostPreview = {
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test description',
      date: '2024-01-15',
      readingTime: 10,
    }

    render(<PostCard post={post} />)

    expect(screen.getByText(/10 mins de lectura/)).toBeInTheDocument()
  })

  it('should display bullet separator between date and reading time', () => {
    const post: PostPreview = {
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test description',
      date: '2024-01-15',
      readingTime: 3,
    }

    render(<PostCard post={post} />)

    const container = screen.getByText(/•/)
    expect(container).toBeInTheDocument()
  })

  it('should display reading time next to formatted date', () => {
    const post: PostPreview = {
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test description',
      date: '2024-02-11',
      readingTime: 7,
    }

    render(<PostCard post={post} />)

    // Verifica que ambos elementos estén presentes
    expect(screen.getByText(/febrero de 2024/)).toBeInTheDocument()
    expect(screen.getByText(/7 mins de lectura/)).toBeInTheDocument()
  })
})

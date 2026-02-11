/**
 * Tests para components/PostContent.tsx
 *
 * Estos tests verifican que el componente PostContent renderice
 * correctamente el HTML del contenido del post.
 */

import { render, screen } from '@testing-library/react'
import PostContent from '@/components/PostContent'

describe('PostContent Component', () => {
  it('should render HTML content', () => {
    const htmlContent = '<h1>Test Title</h1><p>Test paragraph</p>'

    render(<PostContent content={htmlContent} />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Test Title')

    const paragraph = screen.getByText('Test paragraph')
    expect(paragraph).toBeInTheDocument()
  })

  it('should apply markdown-content class', () => {
    const htmlContent = '<p>Test content</p>'

    const { container } = render(<PostContent content={htmlContent} />)

    const contentDiv = container.querySelector('.markdown-content')
    expect(contentDiv).toBeInTheDocument()
  })

  it('should render complex HTML structure', () => {
    const htmlContent = `
      <h1>Main Title</h1>
      <h2>Subtitle</h2>
      <p>First paragraph</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <p>Second paragraph</p>
    `

    render(<PostContent content={htmlContent} />)

    expect(screen.getByText('Main Title')).toBeInTheDocument()
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
    expect(screen.getByText('First paragraph')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph')).toBeInTheDocument()
  })

  it('should handle empty content', () => {
    const { container } = render(<PostContent content="" />)

    const contentDiv = container.querySelector('.markdown-content')
    expect(contentDiv).toBeInTheDocument()
    expect(contentDiv).toBeEmptyDOMElement()
  })

  it('should render links correctly', () => {
    const htmlContent = '<a href="https://example.com">Example Link</a>'

    render(<PostContent content={htmlContent} />)

    const link = screen.getByRole('link', { name: 'Example Link' })
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('should render code blocks', () => {
    const htmlContent = '<pre><code>const x = 10;</code></pre>'

    render(<PostContent content={htmlContent} />)

    const code = screen.getByText('const x = 10;')
    expect(code).toBeInTheDocument()
  })
})

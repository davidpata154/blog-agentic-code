/**
 * Tests para components/SearchBar.tsx
 *
 * Estos tests verifican que el componente SearchBar renderice
 * correctamente y responda a las interacciones del usuario.
 */

import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '@/components/SearchBar'

describe('SearchBar Component', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('should render correctly with default props', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText(
      'Buscar posts por título o contenido...'
    )
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('should render with initial value', () => {
    render(<SearchBar value="React" onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText(
      'Buscar posts por título o contenido...'
    )
    expect(input).toHaveValue('React')
  })

  it('should call onChange when user types', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText(
      'Buscar posts por título o contenido...'
    )

    fireEvent.change(input, { target: { value: 'Next.js' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith('Next.js')
  })

  it('should show result count when provided', () => {
    render(<SearchBar value="React" onChange={mockOnChange} resultCount={5} />)

    expect(screen.getByText('5 posts encontrados')).toBeInTheDocument()
  })

  it('should show singular form for one result', () => {
    render(<SearchBar value="React" onChange={mockOnChange} resultCount={1} />)

    expect(screen.getByText('1 post encontrado')).toBeInTheDocument()
  })

  it('should show no results message when count is zero', () => {
    render(<SearchBar value="xyz" onChange={mockOnChange} resultCount={0} />)

    expect(screen.getByText('No se encontraron posts')).toBeInTheDocument()
  })

  it('should not show result count when not provided', () => {
    const { container } = render(
      <SearchBar value="React" onChange={mockOnChange} />
    )

    expect(
      container.querySelector('.text-sm.text-gray-600')
    ).not.toBeInTheDocument()
  })

  it('should show clear button when there is text', () => {
    render(<SearchBar value="React" onChange={mockOnChange} />)

    const clearButton = screen.getByLabelText('Limpiar búsqueda')
    expect(clearButton).toBeInTheDocument()
  })

  it('should not show clear button when input is empty', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const clearButton = screen.queryByLabelText('Limpiar búsqueda')
    expect(clearButton).not.toBeInTheDocument()
  })

  it('should clear input when clear button is clicked', () => {
    render(<SearchBar value="React" onChange={mockOnChange} />)

    const clearButton = screen.getByLabelText('Limpiar búsqueda')
    fireEvent.click(clearButton)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith('')
  })

  it('should have proper accessibility attributes', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByLabelText('Buscar posts')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('should render search icon', () => {
    const { container } = render(
      <SearchBar value="" onChange={mockOnChange} />
    )

    const searchIcon = container.querySelector('svg')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should handle multiple onChange calls', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText(
      'Buscar posts por título o contenido...'
    )

    fireEvent.change(input, { target: { value: 'R' } })
    fireEvent.change(input, { target: { value: 'Re' } })
    fireEvent.change(input, { target: { value: 'Rea' } })

    expect(mockOnChange).toHaveBeenCalledTimes(3)
  })

  it('should update result count display', () => {
    const { rerender } = render(
      <SearchBar value="React" onChange={mockOnChange} resultCount={10} />
    )

    expect(screen.getByText('10 posts encontrados')).toBeInTheDocument()

    rerender(<SearchBar value="React" onChange={mockOnChange} resultCount={3} />)

    expect(screen.getByText('3 posts encontrados')).toBeInTheDocument()
  })
})

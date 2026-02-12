import { render, screen, fireEvent } from '@testing-library/react'
import PostForm from '@/components/PostForm'
import { Post } from '@/types/post'

describe('PostForm', () => {
  const mockOnSubmit = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Character Limit Functionality', () => {
    it('should have maxLength attribute set to 250 on textarea', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')
      expect(textarea).toHaveAttribute('maxLength', '250')
    })

    it('should display character counter with 0/250 on initial render', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const counter = screen.getByText('0/250')
      expect(counter).toBeInTheDocument()
    })

    it('should update character counter as user types', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')
      fireEvent.change(textarea, { target: { value: 'Hello World' } })

      expect(screen.getByText('11/250')).toBeInTheDocument()
    })

    it('should show correct count for different lengths', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')

      // Test with 50 characters
      const text50 = 'A'.repeat(50)
      fireEvent.change(textarea, { target: { value: text50 } })
      expect(screen.getByText('50/250')).toBeInTheDocument()

      // Test with 150 characters
      const text150 = 'B'.repeat(150)
      fireEvent.change(textarea, { target: { value: text150 } })
      expect(screen.getByText('150/250')).toBeInTheDocument()
    })

    it('should apply default gray color when character count < 230', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')
      fireEvent.change(textarea, { target: { value: 'A'.repeat(100) } })

      const counter = screen.getByText('100/250')
      expect(counter).toHaveClass('text-gray-600')
      expect(counter).not.toHaveClass('text-yellow-600')
      expect(counter).not.toHaveClass('text-red-600')
    })

    it('should apply yellow warning color when character count >= 230 and < 250', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')
      fireEvent.change(textarea, { target: { value: 'A'.repeat(235) } })

      const counter = screen.getByText('235/250')
      expect(counter).toHaveClass('text-yellow-600')
      expect(counter).not.toHaveClass('text-gray-600')
      expect(counter).not.toHaveClass('text-red-600')
    })

    it('should apply red color when character count = 250', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')
      fireEvent.change(textarea, { target: { value: 'A'.repeat(250) } })

      const counter = screen.getByText('250/250')
      expect(counter).toHaveClass('text-red-600')
      expect(counter).not.toHaveClass('text-gray-600')
      expect(counter).not.toHaveClass('text-yellow-600')
    })

    it('should apply red color at exactly 230 characters (boundary)', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')
      fireEvent.change(textarea, { target: { value: 'A'.repeat(230) } })

      const counter = screen.getByText('230/250')
      expect(counter).toHaveClass('text-yellow-600')
    })
  })

  describe('Accessibility', () => {
    it('should have aria-describedby linking textarea to counter', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')
      expect(textarea).toHaveAttribute('aria-describedby', 'character-counter')
    })

    it('should have aria-live on counter for screen reader announcements', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const counter = screen.getByText('0/250')
      expect(counter).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Form Integration', () => {
    it('should not submit form with empty content', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const titleInput = screen.getByLabelText('Título')
      fireEvent.change(titleInput, { target: { value: 'Test Title' } })

      const submitButton = screen.getByText('Publicar')
      fireEvent.click(submitButton)

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('should submit form with valid content within character limit', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const titleInput = screen.getByLabelText('Título')
      const textarea = screen.getByLabelText('Contenido')

      fireEvent.change(titleInput, { target: { value: 'Test Title' } })
      fireEvent.change(textarea, { target: { value: 'Test content' } })

      const submitButton = screen.getByText('Publicar')
      fireEvent.click(submitButton)

      expect(mockOnSubmit).toHaveBeenCalledWith('Test Title', 'Test content')
    })

    it('should reset counter to 0/250 after successful submission', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const titleInput = screen.getByLabelText('Título')
      const textarea = screen.getByLabelText('Contenido')

      fireEvent.change(titleInput, { target: { value: 'Test Title' } })
      fireEvent.change(textarea, { target: { value: 'Test content' } })

      const submitButton = screen.getByText('Publicar')
      fireEvent.click(submitButton)

      expect(screen.getByText('0/250')).toBeInTheDocument()
    })
  })

  describe('Edit Mode', () => {
    it('should display correct character count when editing existing post', () => {
      const editingPost: Post = {
        id: 'test-post-1',
        title: 'Test Post',
        content: 'This is a test content',
        createdAt: '2024-01-15T10:00:00Z',
      }

      render(<PostForm onSubmit={mockOnSubmit} editingPost={editingPost} />)

      const counter = screen.getByText('22/250')
      expect(counter).toBeInTheDocument()
    })

    it('should update counter when editing existing content', () => {
      const editingPost: Post = {
        id: 'test-post-2',
        title: 'Test Post',
        content: 'Original content',
        createdAt: '2024-01-15T10:00:00Z',
      }

      render(<PostForm onSubmit={mockOnSubmit} editingPost={editingPost} />)

      const textarea = screen.getByLabelText('Contenido')
      fireEvent.change(textarea, {
        target: { value: 'Original content with more text' },
      })

      // "Original content with more text" has 31 characters
      expect(screen.getByText('31/250')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle exactly 250 characters', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')
      const text250 = 'A'.repeat(250)
      fireEvent.change(textarea, { target: { value: text250 } })

      expect(screen.getByText('250/250')).toBeInTheDocument()
      expect(textarea).toHaveValue(text250)
    })

    it('should count spaces correctly', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')
      fireEvent.change(textarea, { target: { value: 'Hello     World' } })

      expect(screen.getByText('15/250')).toBeInTheDocument()
    })

    it('should handle rapid typing updates', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByLabelText('Contenido')

      // Simulate rapid typing
      fireEvent.change(textarea, { target: { value: 'A' } })
      expect(screen.getByText('1/250')).toBeInTheDocument()

      fireEvent.change(textarea, { target: { value: 'AB' } })
      expect(screen.getByText('2/250')).toBeInTheDocument()

      fireEvent.change(textarea, { target: { value: 'ABC' } })
      expect(screen.getByText('3/250')).toBeInTheDocument()
    })
  })

  describe('Cancel Functionality', () => {
    it('should render cancel button when onCancel is provided', () => {
      render(<PostForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

      const cancelButton = screen.getByText('Cancelar')
      expect(cancelButton).toBeInTheDocument()
    })

    it('should call onCancel when cancel button is clicked', () => {
      render(<PostForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

      const cancelButton = screen.getByText('Cancelar')
      fireEvent.click(cancelButton)

      expect(mockOnCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('Custom Button Text', () => {
    it('should display custom button text when provided', () => {
      render(
        <PostForm onSubmit={mockOnSubmit} buttonText="Guardar Cambios" />,
      )

      const submitButton = screen.getByText('Guardar Cambios')
      expect(submitButton).toBeInTheDocument()
    })

    it('should display default button text when not provided', () => {
      render(<PostForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByText('Publicar')
      expect(submitButton).toBeInTheDocument()
    })
  })
})

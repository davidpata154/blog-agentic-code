import { calculateReadingTime, formatReadingTime } from '@/lib/posts'

// Mock del módulo markdown para evitar problemas con ESM
jest.mock('@/lib/markdown', () => ({
  markdownToHtml: jest.fn((markdown: string) => Promise.resolve(markdown)),
}))

describe('calculateReadingTime', () => {
  it('should return 1 min for empty content', () => {
    expect(calculateReadingTime('')).toBe(1)
  })

  it('should return 1 min for whitespace-only content', () => {
    expect(calculateReadingTime('   \n\n  \t  ')).toBe(1)
  })

  it('should return 1 min for 100 words', () => {
    const content = Array(100).fill('word').join(' ')
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('should return 1 min for exactly 200 words', () => {
    const content = Array(200).fill('word').join(' ')
    expect(calculateReadingTime(content)).toBe(1)
  })

  it('should return 2 mins for 201 words', () => {
    const content = Array(201).fill('word').join(' ')
    expect(calculateReadingTime(content)).toBe(2)
  })

  it('should return 3 mins for 500 words', () => {
    const content = Array(500).fill('word').join(' ')
    expect(calculateReadingTime(content)).toBe(3)
  })

  it('should return 5 mins for 1000 words', () => {
    const content = Array(1000).fill('word').join(' ')
    expect(calculateReadingTime(content)).toBe(5)
  })

  it('should handle content with mixed whitespace', () => {
    const content = 'word1   word2\n\nword3\tword4'
    expect(calculateReadingTime(content)).toBe(1)
  })
})

describe('formatReadingTime', () => {
  it('should format 1 minute as singular', () => {
    expect(formatReadingTime(1)).toBe('1 min de lectura')
  })

  it('should format 2 minutes as plural', () => {
    expect(formatReadingTime(2)).toBe('2 mins de lectura')
  })

  it('should format 5 minutes as plural', () => {
    expect(formatReadingTime(5)).toBe('5 mins de lectura')
  })

  it('should format 10 minutes as plural', () => {
    expect(formatReadingTime(10)).toBe('10 mins de lectura')
  })
})

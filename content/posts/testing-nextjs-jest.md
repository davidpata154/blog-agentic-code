---
title: Testing en Next.js con Jest y Testing Library
description: Guía completa para configurar y escribir tests efectivos en aplicaciones Next.js usando Jest y React Testing Library.
date: 2024-02-01
slug: testing-nextjs-jest
---

# Testing en Next.js con Jest y Testing Library

El testing es fundamental para mantener código de calidad. En este artículo aprenderás a configurar Jest y Testing Library en Next.js y escribir tests efectivos.

## ¿Por qué hacer testing?

El testing automatizado te ayuda a:

- **Prevenir bugs**: Detecta problemas antes de llegar a producción
- **Refactorizar con confianza**: Cambia código sabiendo que nada se rompe
- **Documentar comportamiento**: Los tests son documentación viva
- **Ahorrar tiempo**: Los tests automatizados son más rápidos que testing manual

## Tipos de tests

### 1. Tests unitarios
Prueban funciones y componentes de forma aislada.

```tsx
// __tests__/lib/formatDate.test.ts
import { formatDate } from '@/lib/posts'

describe('formatDate', () => {
  it('should format ISO date to readable Spanish format', () => {
    expect(formatDate('2024-01-15')).toBe('15 de enero de 2024')
  })
})
```

### 2. Tests de componentes
Prueban que los componentes se rendericen correctamente.

```tsx
// __tests__/components/PostCard.test.tsx
import { render, screen } from '@testing-library/react'
import PostCard from '@/components/PostCard'

describe('PostCard', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post',
    description: 'Test description',
    date: '2024-01-15',
  }

  it('should render post information', () => {
    render(<PostCard post={mockPost} />)

    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })
})
```

## Configurando Jest

Jest necesita configuración especial para trabajar con Next.js:

```js
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

## Mejores prácticas

### 1. Sigue el patrón AAA
- **Arrange**: Configura el test
- **Act**: Ejecuta la acción
- **Assert**: Verifica el resultado

### 2. Tests descriptivos
Usa nombres claros que describan qué se está probando:

```tsx
// ❌ Mal
it('works', () => { ... })

// ✅ Bien
it('should display error message when post is not found', () => { ... })
```

### 3. No pruebes detalles de implementación
Prueba el comportamiento del usuario, no cómo está implementado:

```tsx
// ❌ Mal - Prueba implementación
expect(component.state.count).toBe(1)

// ✅ Bien - Prueba comportamiento
expect(screen.getByText('1 item')).toBeInTheDocument()
```

## Testing Library queries

Testing Library provee varias formas de buscar elementos:

```tsx
// Por rol (preferido)
screen.getByRole('button', { name: /submit/i })

// Por texto
screen.getByText('Hello World')

// Por label
screen.getByLabelText('Email')

// Por test ID (último recurso)
screen.getByTestId('custom-element')
```

## Snapshot testing

Los snapshots capturan la salida de un componente:

```tsx
it('should match snapshot', () => {
  const { container } = render(<PostCard post={mockPost} />)
  expect(container).toMatchSnapshot()
})
```

**Nota**: Usa snapshots con moderación, pueden volverse difíciles de mantener.

## Conclusión

El testing es una inversión que paga dividendos. Comienza con tests simples y ve aumentando la cobertura gradualmente. No busques 100% de cobertura, enfócate en probar los caminos críticos de tu aplicación.

¡Happy testing! 🧪

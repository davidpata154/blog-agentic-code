import type { Config } from 'tailwindcss'

const config: Config = {
  // Define dónde Tailwind buscará clases para incluir en el CSS final
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Personalización de colores para el blog
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
      },
      // Typography personalizada
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#374151',
            a: {
              color: '#0ea5e9',
              '&:hover': {
                color: '#0284c7',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config

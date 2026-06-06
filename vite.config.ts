import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}']
  },
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 100,
    sortImports: {
      enabled: true
    }
  },
  lint: {
    ignorePatterns: ['node_modules', 'dist', '.astro', '.github'],
    categories: {
      correctness: 'error'
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-else-return': 'error',
      'vite-plus/prefer-vite-plus-imports': 'error'
    },
    overrides: [
      {
        files: ['src/**/*.{tsx,jsx}'],
        plugins: ['react'],
        rules: {
          'react/react-in-jsx-scope': 'off',
          'react/jsx-pascal-case': 'error'
        }
      },
      {
        files: ['src/**/*.astro'],
        rules: {
          'no-unused-vars': 'off',
          'no-unused-expressions': 'off'
        }
      }
    ],
    options: {
      typeAware: true,
      typeCheck: true
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin'
      }
    ]
  },
  staged: {
    '*.{js,ts,tsx,astro}': ['vp lint --fix', 'vp fmt --write']
  }
})

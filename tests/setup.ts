import '@testing-library/jest-dom/vitest'
import { vi } from 'vite-plus/test'

const IntersectionObserverMock = vi.fn(function () {
  return {
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn()
  }
})

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

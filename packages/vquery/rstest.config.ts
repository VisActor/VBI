import { defineConfig } from '@rstest/core'

export default defineConfig({
  globals: true,
  testEnvironment: 'node',
  includeSource: ['src/**/*.{js,ts}'],
  exclude: ['src/browser.ts'],
  setupFiles: ['./tests/setup.ts'],
  coverage: {
    enabled: true,
    provider: 'istanbul',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      // Export barrels have no runtime logic; both entrypoints are exercised by unit tests.
      'src/browser.ts',
    ],
    include: ['src/**'],
    reporters: ['html', ['text', { skipFull: true }], 'json', 'json-summary'],
    thresholds: {
      statements: 100,
      lines: 100,
      branches: 100,
      functions: 100,
    },
  },
  resolve: {
    alias: {
      '@visactor/vquery': ['./src/node'],
      'src/*': ['./src/*'],
    },
  },
})

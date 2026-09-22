import { defineConfig } from '@rstest/core'

export default defineConfig({
  globals: true,
  testEnvironment: 'node',
  setupFiles: ['./tests/rstest.setup.ts'],
  includeSource: ['src/**/*.{js,ts}'],
  coverage: {
    enabled: false,
    provider: 'istanbul',
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
    // Some visualization dependencies publish bundler-only ESM entry points.
    conditionNames: ['require', 'node', 'default'],
    alias: {
      '@visactor/vbi': ['./src'],
    },
  },
})

import { defineConfig } from '@rstest/core'

export default defineConfig({
  globals: true,
  testEnvironment: 'node',
  setupFiles: ['./tests/rstest.setup.ts'],
  includeSource: ['src/**/*.{js,ts}'],
  coverage: {
    enabled: false,
  },
  resolve: {
    // Some visualization dependencies publish bundler-only ESM entry points.
    conditionNames: ['require', 'node', 'default'],
    alias: {
      '@visactor/vbi': ['./src'],
      '@visactor/vseed': ['../vseed/src'],
      '@visactor/vquery': ['../vquery/src/node'],
    },
  },
})

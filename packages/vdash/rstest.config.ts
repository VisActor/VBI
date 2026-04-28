import { defineConfig } from '@rstest/core'

export default defineConfig({
  globals: true,
  testEnvironment: 'node',
  includeSource: ['src/**/*.{js,ts}'],
  coverage: {
    enabled: false,
  },
  resolve: {
    alias: {
      '@visactor/vdash': ['./src'],
    },
  },
})

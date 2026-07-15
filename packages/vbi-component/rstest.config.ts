import { defineConfig } from '@rstest/core'
import pkg from './package.json'

export default defineConfig({
  globals: true,
  testEnvironment: 'jsdom',
  pool: 'forks',
  include: ['tests/**/*.test.ts'],
  exclude: ['node_modules/**', 'dist/**', '**/*.d.ts'],
  includeSource: ['src/**/*.{js,ts}'],
  coverage: {
    enabled: false,
  },
  source: {
    define: {
      __VBI_COMPONENT_VERSION__: JSON.stringify(pkg.version),
    },
  },
  resolve: {
    alias: {
      '@visactor/vbi-component': ['./src/index.ts'],
    },
  },
})

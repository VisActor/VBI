import { defineConfig } from '@rstest/core'

export default defineConfig({
  globals: true,
  testEnvironment: 'node',
  pool: 'forks',
  include: ['tests/**/*.test.ts'],
  exclude: ['node_modules/**', 'dist/**', '**/*.d.ts'],
  includeSource: ['src/**/*.{js,ts}'],
  coverage: {
    enabled: false,
  },
})

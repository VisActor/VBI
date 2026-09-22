import { defineConfig } from '@rstest/core'

export default defineConfig({
  include: ['tests/**/*.test.ts'],
  resolve: {
    conditionNames: ['require', 'node', 'default'],
  },
  coverage: {
    provider: 'istanbul',
    include: ['components/demoConnector/**/*.ts'],
    reporters: ['text', 'html', 'json', 'json-summary'],
  },
})

import { defineConfig } from '@rstest/core'

export default defineConfig({
  // Visualization dependencies use extensionless ESM imports that need bundling in Node tests.
  output: { bundleDependencies: true },
  coverage: {
    provider: 'istanbul',
    include: ['src/**/*.{ts,tsx}'],
    reporters: ['text', 'html', 'json-summary'],
  },
})

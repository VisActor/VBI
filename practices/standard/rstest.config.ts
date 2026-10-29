import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rstest/core'

export default defineConfig({
  coverage: {
    provider: 'istanbul',
    include: ['src/**/*.{ts,tsx}'],
    reporters: ['text', 'html', 'json-summary'],
    thresholds: { statements: 58.25, branches: 42.19, functions: 55.97, lines: 56.5 },
  },
  testEnvironment: 'jsdom',
  setupFiles: ['./rstest.setup.ts'],
  plugins: [pluginReact()],
})

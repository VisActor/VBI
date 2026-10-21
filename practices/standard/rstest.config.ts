import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rstest/core'

export default defineConfig({
  coverage: {
    provider: 'istanbul',
    include: ['src/**/*.{ts,tsx}'],
    reporters: ['text', 'html', 'json-summary'],
    thresholds: { statements: 58.09, branches: 41.87, functions: 55.76, lines: 56.33 },
  },
  testEnvironment: 'jsdom',
  setupFiles: ['./rstest.setup.ts'],
  plugins: [pluginReact()],
})

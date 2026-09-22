import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rstest/core'

export default defineConfig({
  coverage: {
    provider: 'istanbul',
    include: ['src/**/*.{ts,tsx}'],
    reporters: ['text', 'html', 'json-summary'],
  },
  testEnvironment: 'jsdom',
  setupFiles: ['./rstest.setup.ts'],
  plugins: [pluginReact()],
})

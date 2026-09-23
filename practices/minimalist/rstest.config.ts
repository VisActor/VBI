import { withRslibConfig } from '@rstest/adapter-rslib'
import { defineConfig } from '@rstest/core'

export default defineConfig({
  coverage: {
    provider: 'istanbul',
    include: ['src/**/*.{ts,tsx}'],
    reporters: ['text', 'html', 'json-summary'],
  },
  extends: withRslibConfig(),
  setupFiles: ['./rstest.setup.ts'],
})

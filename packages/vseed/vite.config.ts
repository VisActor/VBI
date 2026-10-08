import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  cacheDir: 'node_modules/.vitest',
  test: {
    root: '.',
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**', 'docs/**', '**/*.d.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: mode === 'unit' || mode === 'integration' ? `./coverage/${mode}` : './coverage',
      // V8 branch counts vary slightly between runs; use verified floors.
      thresholds:
        mode === 'unit'
          ? { statements: 84.4, lines: 84.4, branches: 77.4, functions: 82.7 }
          : mode === 'integration'
            ? undefined
            : { statements: 91.3, lines: 91.3, branches: 82.3, functions: 84.7 },
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vite.setup.ts'],
    alias: {
      src: new URL('./src', import.meta.url).pathname,
      '@visactor/vseed': new URL('./src', import.meta.url).pathname,
    },
  },
}))

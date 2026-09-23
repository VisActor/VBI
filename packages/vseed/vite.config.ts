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
          ? { statements: 73.01, lines: 73.01, branches: 70.5, functions: 72.08 }
          : mode === 'integration'
            ? undefined
            : { statements: 89.13, lines: 89.13, branches: 78.7, functions: 80.67 },
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

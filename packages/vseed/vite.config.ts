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
          ? { statements: 78.7, lines: 78.7, branches: 71.2, functions: 76.2 }
          : mode === 'integration'
            ? undefined
            : { statements: 89.69, lines: 89.69, branches: 78.9, functions: 81.3 },
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

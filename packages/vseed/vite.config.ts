import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url' // 1. 引入 fileURLToPath

export default defineConfig({
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
      reportsDirectory: './coverage',
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vite.setup.ts'],
    alias: {
      // 2. 修改这里的路径解析方式
      src: fileURLToPath(new URL('./src', import.meta.url)),
      '@visactor/vseed': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

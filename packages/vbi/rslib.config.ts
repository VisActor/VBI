import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: { entry: { index: './src/index.ts', query: './src/query.ts' } },
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
    },
  ],
  output: {
    sourceMap: true,
  },
})

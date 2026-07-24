import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
      cli: './src/cli.ts',
    },
  },
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
      bundle: true,
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
      bundle: true,
    },
  ],
  output: {
    sourceMap: true,
  },
})

import { defineConfig } from '@rslib/core'
import pkg from './package.json'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
      bundle: false,
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
    },
  ],
  source: {
    define: {
      __VBI_COMPONENT_VERSION__: JSON.stringify(pkg.version),
    },
  },
  output: {
    sourceMap: true,
  },
})

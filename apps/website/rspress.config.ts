import { defineConfig } from '@rspress/core'
import { pluginPlayground } from '@rspress/plugin-playground'
import { pluginPreview } from '@rspress/plugin-preview'
import * as path from 'node:path'

import i18nJson from './i18n.json'
import supportedLocales from './locales.json'

const localeLabels = { 'zh-CN': '简体中文', 'en-US': 'English' }
const locales = supportedLocales.map((lang) => ({
  lang,
  label: localeLabels[lang as keyof typeof localeLabels],
  title: 'VisActor VBI',
  description: 'VisActor VBI',
}))

const vbiReactEntry = path.join(__dirname, '../../packages/vbi-react/src/index.ts')
const vbiReactComponentsEntry = path.join(__dirname, '../../packages/vbi-react/src/components/index.ts')
const vbiReactComponentsCssEntry = path.join(__dirname, '../../packages/vbi-react/src/components/entry.css')
const vbiReactStarterEntry = path.join(__dirname, '../../practices/vbi-react-starter/src/index.tsx')

export default defineConfig({
  root: './docs',
  base: '/VBI/',
  globalStyles: path.join(__dirname, 'components/styles/index.css'),
  llms: false,
  plugins: [
    pluginPreview(),
    pluginPlayground({
      include: [
        '@visactor/vchart',
        '@visactor/vtable',
        '@visactor/vseed',
        '@visactor/vquery',
        '@visactor/vbi',
        '@rspress/core/runtime',
        'yjs',
        '@components',
        'dashboard',
      ],
    }),
  ],
  lang: 'zh-CN',
  locales,
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/visactor/vbi',
      },
    ],
  },
  markdown: {
    showLineNumbers: true,
  },
  i18nSource: i18nJson as Record<string, Record<string, string>>,
  title: 'VisActor/VBI',
  icon: '/logo.svg',
  logoText: 'VisActor VBI',
  route: {
    exclude: ['components/**/*'],
  },
  builderConfig: {
    performance:{
      printFileSize: false,
    },
    tools: {
      rspack: (config, { isServer }) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          '@visactor/vbi-react$': vbiReactEntry,
          '@visactor/vbi-react/components$': vbiReactComponentsEntry,
          '@visactor/vbi-react/components.css$': vbiReactComponentsCssEntry,
          'vbi-react-starter$': vbiReactStarterEntry,
        }

        if (isServer) {
          config.resolve.alias['@duckdb/duckdb-wasm$'] = path.join(
            __dirname,
            'components/shims/duckdbWasmSsr.ts',
          )
          config.externals = [...(Array.isArray(config.externals) ? config.externals : []), 'yjs']
        }

        // The website relies on workspace packages exposing source entries.
        // Keep the repo-wide source resolution behavior and layer our narrow starter aliases on top.
        config.resolve.conditionNames = ['source', '...']
      },
    },
    server: {
      open: false,
    },
    output: {
      sourceMap: false,
      assetPrefix: 'https://visactor.github.io/VBI/',
    },
  },
})

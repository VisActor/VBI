import { defineConfig } from '@rspress/core'
import { pluginPlayground } from '@rspress/plugin-playground'
import { pluginPreview } from '@rspress/plugin-preview'
import * as path from 'node:path'

import i18nJson from './i18n.json'

const allLocales = [
  {
    lang: 'zh-CN',
    label: '简体中文',
    title: 'VisActor VBI',
    description: 'VisActor VBI',
  },
  {
    lang: 'en-US',
    label: 'English',
    title: 'VisActor VBI',
    description: 'VisActor VBI',
  },
  {
    lang: 'ja-JP',
    label: '日本語',
    title: 'VisActor VBI',
    description: 'VisActor VBI',
  },
  {
    lang: 'de-DE',
    label: 'Deutsch',
    title: 'VisActor VBI',
    description: 'VisActor VBI',
  },
  {
    lang: 'id-ID',
    label: 'Bahasa Indonesia',
    title: 'VisActor VBI',
    description: 'VisActor VBI',
  },
  {
    lang: 'fr-FR',
    label: 'Français',
    title: 'VisActor VBI',
    description: 'VisActor VBI',
  },
  {
    lang: 'ko-KR',
    label: '한국어',
    title: 'VisActor VBI',
    description: 'VisActor VBI',
  },
  {
    lang: 'vi-VN',
    label: 'Tiếng Việt',
    title: 'VisActor VBI',
    description: 'VisActor VBI',
  },
]

const isDev = process.env.NODE_ENV === 'development'
const devEnableLocales = allLocales.map((locale) => locale.lang).slice(0, 2)
const devLocales = allLocales.filter((locale) => devEnableLocales.includes(locale.lang))
const devLocaleSet = new Set(devLocales.map((locale) => locale.lang))
const devLocaleExcludes = allLocales
  .filter((locale) => !devLocaleSet.has(locale.lang))
  .map((locale) => `${locale.lang}/**`)
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
      ],
    }),
  ],
  lang: isDev? devEnableLocales[0] :'zh-CN',
  locales: isDev ? devLocales : allLocales,
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
    exclude: ['components/**/*', ...(isDev ? devLocaleExcludes : [])],
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
      },
    },
    server: {
      open: true,
    },
    output: {
      sourceMap: false,
      assetPrefix: 'https://visactor.github.io/VBI/',
    },
  },
})

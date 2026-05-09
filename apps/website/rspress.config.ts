import { defineConfig } from '@rspress/core'
import { pluginPlayground } from '@rspress/plugin-playground'
import { pluginPreview } from '@rspress/plugin-preview'
import * as path from 'node:path'

import i18nJson from './i18n.json'

export const supportedLocales = [
  'zh-CN',
  'en-US',
  'de-DE',
  'fr-FR',
  'id-ID',
  'vi-VN',
  'ko-KR',
  'ja-JP',
] as const

const localeLabels: Record<(typeof supportedLocales)[number], string> = {
  'zh-CN': '简体中文',
  'en-US': 'English',
  'de-DE': 'Deutsch',
  'fr-FR': 'Français',
  'id-ID': 'Bahasa Indonesia',
  'ja-JP': '日本語',
  'ko-KR': '한국어',
  'vi-VN': 'Tiếng Việt',
}

export default defineConfig({
  root: './docs',
  base: '/VBI/',
  globalStyles: path.join(__dirname, 'components/styles/index.css'),
  llms: true,
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
  lang: 'zh-CN',
  locales: supportedLocales.map((lang) => ({
    lang,
    label: localeLabels[lang],
    title: 'VisActor VBI',
    description: 'VisActor VBI',
  })),
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/visactor/vbi',
      },
    ],
    locales: supportedLocales.map((lang) => ({
      lang,
      label: localeLabels[lang],
    })),
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
    tools: {
      rspack: (config, { isServer }) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          '@visactor/vquery': path.join(__dirname, '../../packages/vquery/src/browser.ts'),
        }

        if (isServer) {
          config.resolve.alias['@duckdb/duckdb-wasm$'] = path.join(
            __dirname,
            'components/shims/duckdbWasmSsr.ts',
          )
          config.externals = [...(Array.isArray(config.externals) ? config.externals : []), 'yjs']
        }

        config.resolve.conditionNames = ['source', '...']
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

import * as path from 'node:path'
import { pluginLlms } from '@rspress/plugin-llms'
import { pluginPlayground } from '@rspress/plugin-playground'
import { pluginPreview } from '@rspress/plugin-preview'
import { defineConfig } from '@rspress/core'

import i18nJson from './i18n.json'

// 🟢 核心修改 1：读取环境变量，判断当前是不是在为 Electron 打包
const isElectron = process.env.IS_ELECTRON === 'true'

export default defineConfig({
  root: './docs',
  base: '/VBI/',
  globalStyles: path.join(__dirname, 'components/styles/index.css'),
  plugins: [
    pluginLlms(),
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
  locales: [
    {
      lang: 'zh-CN',
      label: '简体中文',
      title: 'VisActor VBI',
      description: 'VisActor VBI',
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/visactor/vbi',
      },
    ],
    locales: [
      {
        lang: 'zh-CN',
        label: '简体中文',
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
    tools: {
      rspack: {
        resolve: {
          conditionNames: ['source', '...'],
        },
      },
    },
    server: {
      open: true,
    },
    output: {
      sourceMap: true,
      // 🟢 核心修改 2：桌面端走本地 /VBI/，线上网页依然走 github.io
      assetPrefix: isElectron ? '/VBI/' : 'https://visactor.github.io/VBI/',
    },
  },
})

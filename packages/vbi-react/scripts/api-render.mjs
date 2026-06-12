const descriptions = {
  useVBI: '订阅 builder 的 DSL 快照变化，返回最新 `dsl` 与原始 `builder`。',
  useVSeed: '执行查询与 VSeed 生成流程，返回渲染所需状态与数据。',
  useChartType: '读取并更新当前图表类型，同时暴露可选图表类型列表。',
  useDimensions: '读取并更新维度配置，提供维度增删改能力。',
  useMeasures: '读取并更新度量配置，提供度量增删改能力。',
  useWhereFilter: '管理 Where 过滤树，并提供 mutation 入口。',
  useHavingFilter: '管理 Having 过滤树，并提供 mutation 入口。',
  useTheme: '读取并切换当前主题配置。',
  BuilderLayout: '提供标准化三栏/双栏构建器布局容器。',
  ChartRenderer: '根据 builder 输出渲染图表，并处理加载与错误状态。',
  ChartTypeSelector: '提供图表类型下拉选择器。',
  FieldPanel: '提供维度/度量字段面板与基础编辑交互。',
  FilterPanel: '提供 Where / Having 过滤条件的新增、编辑、删除与分组展示能力。',
  ThemeSelector: '读取并切换当前主题配置，适合放在顶部工具栏中。',
}

const liveDemoExports = {
  BuilderLayout: 'BuilderLayoutApiDemo',
  ChartRenderer: 'ChartRendererApiDemo',
  ChartTypeSelector: 'ChartTypeSelectorApiDemo',
  FieldPanel: 'FieldPanelApiDemo',
  FilterPanel: 'FilterPanelApiDemo',
  ThemeSelector: 'ThemeSelectorApiDemo',
}

const exampleOverrides = {
  useVSeed: `import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}`,
  BuilderLayout: `import { BuilderLayout } from '@visactor/vbi-react/components'

export function Demo() {
  return <BuilderLayout main={<div>Main Content</div>} />
}`,
}

function buildImportCode(item) {
  return `import { ${item.name} } from '${item.importPath}'`
}

function buildRelatedLinks(item) {
  if (item.group === 'hooks') {
    return ['- [基础 Hooks](../examples/basicHooks)', '- [过滤条件编辑](../examples/filterMutations)'].join('\n')
  }

  const links = ['- [vbi-react Starter](../examples/vbi-react-starter)']
  if (
    item.name === 'BuilderLayout' ||
    item.name === 'ChartRenderer' ||
    item.name === 'ChartTypeSelector' ||
    item.name === 'FieldPanel'
  ) {
    links.unshift('- [组件化布局](../examples/layoutWithComponents)')
  }
  return links.join('\n')
}

function buildExampleCode(item) {
  const override = exampleOverrides[item.name]
  if (override) return override
  if (item.group === 'hooks') {
    return `import type { VBIChartBuilder } from '@visactor/vbi'
${buildImportCode(item)}

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = ${item.name}(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}`
  }
  return `import type { VBIChartBuilder } from '@visactor/vbi'
${buildImportCode(item)}

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <${item.name} builder={builder} />
}`
}

export function buildApiPage(item) {
  const description = descriptions[item.name] ?? '该能力由脚本根据公开导出自动生成，请结合源码使用。'
  const liveDemoExport = liveDemoExports[item.name]
  const importSection = liveDemoExport ? `import { ${liveDemoExport} } from 'vbi-react-starter'\n\n` : ''
  const liveDemoSection = liveDemoExport
    ? `## Live Demo

<${liveDemoExport} />

`
    : ''

  return `${importSection}# ${item.name}

## 导入

\`\`\`ts
${buildImportCode(item)}
\`\`\`

## 签名

\`\`\`ts
${item.signature}
\`\`\`

## 说明

${description}

## 推荐先看

${buildRelatedLinks(item)}

${liveDemoSection}## 最小示例

\`\`\`tsx
${buildExampleCode(item)}
\`\`\`
`
}

export function buildApiOverview(hooks, components) {
  const hookNames = hooks.map((item) => `\`${item.name}\``).join('、')
  const componentNames = components.map((item) => `\`${item.name}\``).join('、')
  return `# API 总览

\`@visactor/vbi-react\` 当前导出分为三部分：

| 模块 | 导入路径 | 内容 |
| --- | --- | --- |
| Hooks | \`@visactor/vbi-react\` | ${hookNames} |
| Components | \`@visactor/vbi-react/components\` | ${componentNames} |
| Styles | \`@visactor/vbi-react/components.css\` | 默认组件样式、稳定 class names、可覆盖 CSS variables |

所有 hooks/components 都围绕 \`VBIChartBuilder\` 工作，不额外维护业务状态源。
业务页面可以通过 wrapper 覆盖 CSS variables；完整页面结构建议放在应用或 starter 层，而不是塞进 package 组件内部。

## 建议阅读顺序

1. 先看 [示例总览](../examples/index)，确定你是从 hooks 还是从组件进入。
2. 单个组件页已经内嵌 live demo，可以直接在对应 API 页面里操作。
3. 想看完整拼装方式时，再看 [vbi-react Starter](../examples/vbi-react-starter)。
`
}

export function buildApiMeta(hooks, components) {
  return [
    { type: 'file', name: 'index', label: '总览' },
    ...hooks.map((item) => ({ type: 'file', name: item.slug, label: item.name })),
    ...components.map((item) => ({ type: 'file', name: item.slug, label: item.name })),
  ]
}

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const EXAMPLES_DIR = path.resolve(__dirname, '../tests/examples')
export const MOCK_SYSTEM_TIME = '2026-03-23T00:00:00.000Z'
export const DEFAULT_LOCALE = 'zh-CN'
export const BUILDER_ORDER = ['chart', 'insight', 'dashboard']

const DEFAULT_DSL = {
  chart: {
    connectorId: 'demoSupermarket',
    chartType: 'line',
    dimensions: [],
    measures: [],
    whereFilter: { id: 'root', op: 'and', conditions: [] },
    havingFilter: { id: 'root', op: 'and', conditions: [] },
    theme: 'light',
    locale: DEFAULT_LOCALE,
    version: 1,
  },
  insight: {
    content: '',
    version: 0,
  },
  dashboard: {
    widgets: [],
    breakpoints: {
      xxl: 1600,
      xl: 1200,
      lg: 996,
      md: 768,
      sm: 480,
      xs: 0,
    },
    layout: {
      xxl: [],
      xl: [],
      lg: [],
      md: [],
      sm: [],
      xs: [],
    },
    meta: {
      title: '',
      theme: 'light',
    },
    version: 0,
  },
}

const BUILDER_TYPES = {
  chart: 'VBIChartBuilder',
  insight: 'VBIInsightBuilder',
  dashboard: 'VBIDashboardBuilder',
}

export function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

export function findSubDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
}

export function findJsonFilesInDir(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((item) => item.isFile() && item.name.endsWith('.json'))
    .map((item) => path.join(dir, item.name))
    .sort((a, b) => {
      const jsonA = readJsonFile(a)
      const jsonB = readJsonFile(b)
      const [pa, pb] = [jsonA.priority ?? 5, jsonB.priority ?? 5]
      return pa !== pb ? pa - pb : (jsonA.name || a).localeCompare(jsonB.name || b)
    })
}

export function parseDescription(json, locale = DEFAULT_LOCALE) {
  const desc = json.description || json.name || ''
  const match = desc.match(new RegExp(`\\{${locale}\\}([^]*?)\\{/${locale}\\}`, 'i'))
  return match ? match[1].trim() : desc.replace(/\{[^}]+\}/g, '').trim() || desc
}

export function parseTags(json) {
  return json.tags || []
}

export function formatDirLabel(dirName) {
  return dirName.charAt(0).toUpperCase() + dirName.slice(1).replace(/-/g, ' ')
}

export function getBuilderKind(json) {
  return json.builder || 'chart'
}

export function getDirBuilderKind(dirName) {
  const files = findJsonFilesInDir(path.join(EXAMPLES_DIR, dirName))
  if (!files.length) {
    return 'chart'
  }
  return getBuilderKind(readJsonFile(files[0]))
}

export function formatBuilderLabel(kind) {
  return kind
}

function normalizeExampleCode(code = '', kind = 'chart') {
  return code
    .replace(/\bVBIBuilder\b/g, BUILDER_TYPES[kind] || BUILDER_TYPES.chart)
    .replace(/\bVBI\.createChart\(/g, 'VBI.chart.create(')
    .replace(/\bVBI\.createInsight\(/g, 'VBI.insight.create(')
    .replace(/\bLocalVBI\.createChart\(/g, 'LocalVBI.chart.create(')
    .replace(/\bLocalVBI\.createInsight\(/g, 'LocalVBI.insight.create(')
}

function buildDSL(kind, dsl = {}) {
  const base = DEFAULT_DSL[kind] || DEFAULT_DSL.chart
  return { ...base, ...dsl }
}

function toCode(value, indent = 0) {
  const prefix = ' '.repeat(indent)
  return JSON.stringify(value, null, 2)
    .split('\n')
    .map((line, index) => (index === 0 ? line : `${prefix}${line}`))
    .join('\n')
}

function indentCode(code, indent) {
  return code
    .split('\n')
    .map((line) => (line ? `${' '.repeat(indent)}${line}` : ''))
    .join('\n')
}

function renderDashboardSetup(json, indent = 4) {
  return indentCode(json.setup || '', indent)
}

function renderTestBody(json) {
  const kind = getBuilderKind(json)
  const dslCode = toCode(buildDSL(kind, json.dsl || {}), 6)
  const hasCode = !!json.code
  const applyBuilderCode = hasCode ? normalizeExampleCode(json.code, kind) : 'const applyBuilder = () => {}'

  if (kind === 'insight') {
    return `    const builder = VBI.insight.create(${dslCode})

    ${applyBuilderCode}
    await applyBuilder(builder)

    const insightDSL = builder.build()
    expect(insightDSL).toMatchInlineSnapshot()`
  }
  if (kind === 'dashboard') {
    return `    const LocalVBI = createVBI()
${renderDashboardSetup(json)}

    ${indentCode(applyBuilderCode, 4).trimStart()}
    await applyBuilder(builder)

    const dashboardDSL = builder.build()
    expect(dashboardDSL).toMatchInlineSnapshot()`
  }

  return `    const builder = VBI.chart.create(${dslCode})

    ${applyBuilderCode}
    await applyBuilder(builder)

    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot()

    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot()

    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot()`
}

export function getTestImports(kind) {
  if (kind === 'insight') {
    return "import { VBI, type VBIInsightBuilder } from '@visactor/vbi'"
  }
  if (kind === 'dashboard') {
    return "import { createVBI, type VBIDashboardBuilder } from '@visactor/vbi'"
  }
  return "import { VBI, type VBIChartBuilder } from '@visactor/vbi'"
}

export function renderTestCase(json, jsonPath) {
  const name = json.name || path.basename(jsonPath, '.json')
  return `
  it('${name}', async () => {
${renderTestBody(json)}
  })`
}

export function renderPreview(json) {
  const kind = getBuilderKind(json)
  const dsl = buildDSL(kind, json.dsl || {})
  const code = normalizeExampleCode(json.code || 'const applyBuilder = () => {}', kind)

  if (kind === 'insight') {
    return `
import { VBI, VBIInsightBuilder } from '@visactor/vbi'
import { JsonRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const builder = VBI.insight.create(${toCode(dsl, 8)})
        ${code}
        await applyBuilder(builder)
        setResult(builder.build())
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      }
    }
    run()
  }, [])

  if (error) return <JsonRender value={{ error }} />
  if (!result) return <div>Loading...</div>

  return <JsonRender value={result} />
}`.trim()
  }
  if (kind === 'dashboard') {
    return `
import { createVBI, type VBIDashboardBuilder } from '@visactor/vbi'
import { DashboardRenderer, type DashboardRendererProps } from 'dashboard'
import { useDark, useLang } from '@rspress/core/runtime'
import { useEffect, useState } from 'react'

export default () => {
  const [dashboard, setDashboard] = useState<VBIDashboardBuilder | null>(null)
  const [error, setError] = useState<string | null>(null)
  const locale = useLang() as DashboardRendererProps['locale']
  const theme = useDark() ? 'dark' : 'light'

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const LocalVBI = createVBI()
${renderDashboardSetup(json, 8)}
        ${indentCode(code, 8).trimStart()}
        await applyBuilder(builder)
        if (!cancelled) setDashboard(builder)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err))
      }
    }
    void run()
    return () => { cancelled = true }
  }, [])

  if (error) return <div role='alert'>{error}</div>
  if (!dashboard) return <div role='status'>Loading...</div>

  return <DashboardRenderer builder={dashboard} mode='edit' locale={locale} theme={theme} />
}`.trim()
  }

  return `
import { VBI, VBIChartBuilder } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        ...${toCode(dsl, 8)},
        connectorId: DEMO_CONNECTOR_ID,
      })
      ${code}
      await applyBuilder(builder)
      setResult(await builder.buildVSeed())
    }
    run()
  }, [])

  if (!result) return <div>Loading...</div>

  return <VSeedRender vseed={result} />
}`.trim()
}

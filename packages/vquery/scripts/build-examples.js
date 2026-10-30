import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const examplesDir = path.resolve(__dirname, '../tests/examples')
const outputDir = path.resolve(__dirname, '../../../apps/website/docs/zh-CN/vquery/examples')

// Map<category, Array<{name, description, content}>>
const examplesMap = new Map()

const exampleOrder = {
  'select/expression': [
    'basic',
    'parentheses',
    'parameters',
    'functions',
    'null-and-zero',
    'precedence',
    'unary-scientific',
    'quoted-fields',
    'parameter-order',
    'alias-order',
    'shadowed-field',
    'aggregate-ratio',
    'filter-result',
    'aggregate-result',
    'period-comparison',
  ],
  'select/when': ['basic', 'aggregation', 'multiple-conditions', 'subquery'],
  'analysis/periodComparison': ['month-over-month', 'month-year-over-year', 'year-to-date-yoy'],
  'analysis/comparison': ['target-attainment', 'conversion-comparison'],
}

const introductions = {
  'select/expression':
    '在 `select` 中使用 `{ expr, alias }` 添加数值计算列。从简单算式开始，再使用括号、参数、函数和子查询。',
  'select/when':
    '`when` 使用与 `where` 相同的条件格式，只影响当前选择列：满足条件时保留字段值，否则为 NULL。先看条件投影，再组合聚合、多条件和子查询。',
  'analysis/periodComparison':
    '先按明确的本期与基期汇总，再计算差额和增长率。下面依次展示环比、同月同比和累计同比；基期为 0 或缺失时，增长率返回 NULL。',
  'analysis/percentage':
    '以同一范围的总额作分母，先计算品类占比，再比较份额变化。0.25 表示 25%，以 Pp 结尾的字段表示百分点。',
  'analysis/comparison':
    '先比较实际与目标，再比较两组转化率。目标达成率 1.2 表示 120%；转化率从 50% 到 75% 相差 25 个百分点。',
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`)
    return
  }

  const files = fs.readdirSync(dir, { withFileTypes: true })

  // Sort files to ensure consistent order
  files.sort((a, b) => a.name.localeCompare(b.name))

  for (const file of files) {
    const res = path.resolve(dir, file.name)
    if (file.isDirectory()) {
      scanDir(res)
    } else if (file.name.endsWith('.json')) {
      processJson(res)
    }
  }
}

function processJson(jsonPath) {
  try {
    const content = fs.readFileSync(jsonPath, 'utf-8')
    const json = JSON.parse(content)

    // Determine category from relative path
    const parentDir = path.dirname(jsonPath)
    const category = path.relative(examplesDir, parentDir)

    // Skip if directly in examples root
    if (!category) {
      return
    }

    if (!examplesMap.has(category)) {
      examplesMap.set(category, [])
    }

    examplesMap.get(category).push({
      fileName: path.basename(jsonPath),
      json,
    })
  } catch (error) {
    console.error(`Error processing ${jsonPath}:`, error)
  }
}

function generateDocs() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const sortedCategories = Array.from(examplesMap.keys()).sort()

  for (const category of sortedCategories) {
    const categoryName = path.basename(category)
    const categoryTitle =
      category === 'subquery' ? 'From' : categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    const outputFile = path.join(outputDir, `${category}.mdx`)

    const outputParentDir = path.dirname(outputFile)
    if (!fs.existsSync(outputParentDir)) {
      fs.mkdirSync(outputParentDir, { recursive: true })
    }

    let md = `# ${categoryTitle}\n\n`

    const examples = examplesMap.get(category)
    if (introductions[category]) md += `${introductions[category]}\n\n`
    const order = new Map((exampleOrder[category] ?? ['basic']).map((name, index) => [`${name}.json`, index]))
    examples.sort((a, b) => (order.get(a.fileName) ?? Infinity) - (order.get(b.fileName) ?? Infinity))
    if (category === 'subquery') {
      md +=
        '`from` 接收一份 Query DSL，将内层查询结果作为外层输入，对应 SQL 的 `FROM (SELECT ...)`。省略 `from` 时，直接查询当前连接的数据集。\n\n'
      md +=
        '外层使用内层输出的列名或别名；每一层的筛选、聚合、排序和 limit 各自生效。数据集或物理表名由连接与编译选项指定。\n\n'
    }
    for (const example of examples) {
      const { json, fileName } = example
      const title = fileName.replace('.json', '')

      md += `## ${title}\n\n`

      if (json.description) {
        md += `${json.description}\n\n`
      }

      md += '```tsx preview\n'
      md += "import { VQueryResultRender } from '@components'\n\n"
      md += `export default () => {\n`
      const jsonString = JSON.stringify(json, null, 2)
      const indentedJson = jsonString
      md += `  const vqueryConfig = ${indentedJson}\n\n`
      md += `  return <VQueryResultRender vqueryConfig={vqueryConfig} />\n`
      md += `}\n`
      md += '```\n\n'
    }

    if (category === 'select/expression') {
      md += '## 表达式校验与边界\n\n'
      md +=
        '`VQuery.validateExpression(expr, { parameters, columns })` 可独立校验表达式，合法时正常返回，非法时抛错；无需实例或数据集。省略 `columns` 时仅校验语法和参数绑定，传入完整 schema 时也校验字段存在且为数值类型。\n\n'
      md +=
        '`expr` 是当前输入列上的数值 SQL 表达式，必须提供输出 `alias`。支持括号、一元正负号、四则运算以及 ABS、COALESCE、NULLIF；COALESCE 和 NULLIF 接收两个参数。常量可用 `?` 和 `parameters` 绑定。字段可用标准双引号引用。\n\n'
      md +=
        '表达式按 AST 校验和编译，数值操作数按 DOUBLE 处理，数值溢出报错；NULL 传播、除零返回 NULL，输出比例 0.1 表示 10%。表达式层不混合聚合、GROUP BY 或 HAVING；通过 `from` 明确先聚合再计算、先计算再聚合，以及计算后的筛选。表达式不能引用同层新定义的别名，也不接受任意 SQL、子查询或数据库专用函数。\n\n'
    }

    fs.writeFileSync(outputFile, md.trimEnd() + '\n', 'utf-8')
    console.log(`Generated documentation for ${category} at ${outputFile}`)
  }
}

function generateMeta() {
  const metadata = {
    '': [
      { type: 'dir', name: 'select', label: 'Select' },
      { type: 'file', name: 'subquery', label: 'From' },
      { type: 'file', name: 'where', label: 'Where' },
      { type: 'file', name: 'having', label: 'Having' },
      { type: 'file', name: 'groupBy', label: 'GroupBy' },
      { type: 'file', name: 'orderBy', label: 'OrderBy' },
      { type: 'file', name: 'limit', label: 'Limit' },
      { type: 'dir', name: 'analysis', label: 'Analysis' },
    ],
    select: [
      { type: 'file', name: 'aggregation', label: 'Aggregation' },
      { type: 'file', name: 'date', label: 'Date' },
      { type: 'file', name: 'expression', label: 'Expression' },
      { type: 'file', name: 'when', label: 'When' },
    ],
    analysis: [
      { type: 'file', name: 'periodComparison', label: 'PeriodComparison' },
      { type: 'file', name: 'percentage', label: 'Percentage' },
      { type: 'file', name: 'comparison', label: 'Comparison' },
    ],
  }
  for (const [category, meta] of Object.entries(metadata)) {
    const metaPath = path.join(outputDir, category, '_meta.json')
    fs.mkdirSync(path.dirname(metaPath), { recursive: true })
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8')
    console.log(`Generated _meta.json at ${metaPath}`)
  }
}

console.log('Building documentation...')
scanDir(examplesDir)
generateDocs()
generateMeta()
console.log('Done.')

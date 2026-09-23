/**
 * @description Build API docs from TypeScript declarations.
 *
 * Generates MD documentation for website using ts-morph
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Project, SyntaxKind } from 'ts-morph'

// ============================================================================
// 常量
// ============================================================================

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SOURCE_ROOTS = {
  chart: path.resolve(__dirname, '../src/chart-builder'),
  insight: path.resolve(__dirname, '../src/insight-builder'),
  dashboard: path.resolve(__dirname, '../src/dashboard-builder'),
  vbi: path.resolve(__dirname, '../src/vbi'),
}
const outputArg = process.argv.find((arg) => arg.startsWith('--output-dir='))?.slice('--output-dir='.length)
const OUTPUT_DIR = outputArg
  ? path.resolve(outputArg)
  : path.resolve(__dirname, '../../../apps/website/docs/zh-CN/vbi/api')
const API_OVERVIEW_PAGE = `---
overview: true
title: API
overviewHeaders: [3]
---
`

// ============================================================================
// 配置
// ============================================================================

const API_SECTIONS = [
  {
    name: 'vbiInstance',
    label: 'VBI',
    root: 'vbi',
    index: [
      {
        kind: 'function',
        file: 'create-vbi.ts',
        displayName: 'createVBI',
      },
      {
        kind: 'const',
        file: '../vbi.ts',
        displayName: 'VBI',
      },
      {
        kind: 'interface',
        file: 'types/vbi.ts',
        displayName: 'VBIInstance',
      },
    ],
    items: [
      {
        type: 'file',
        name: 'chart',
        label: 'VBI.chart',
        kind: 'interface',
        file: 'types/chart.ts',
        symbolName: 'VBIChartNamespace',
        displayName: 'VBI.chart',
      },
      {
        type: 'file',
        name: 'dashboard',
        label: 'VBI.dashboard',
        kind: 'interface',
        file: 'types/dashboard.ts',
        symbolName: 'VBIDashboardNamespace',
        displayName: 'VBI.dashboard',
      },
      {
        type: 'file',
        name: 'insight',
        label: 'VBI.insight',
        kind: 'interface',
        file: 'types/insight.ts',
        symbolName: 'VBIInsightNamespace',
        displayName: 'VBI.insight',
      },
      {
        type: 'dir',
        name: 'resources',
        label: 'VBI.resources',
        kind: 'interface',
        file: 'types/resources.ts',
        symbolName: 'VBIResourceNamespace',
        displayName: 'VBI.resources',
        children: [
          {
            name: 'chart',
            label: 'VBI.resources.chart',
            kind: 'interface',
            file: 'types/resources.ts',
            symbolName: 'VBIChartResourceNamespace',
            displayName: 'VBI.resources.chart',
          },
          {
            name: 'insight',
            label: 'VBI.resources.insight',
            kind: 'interface',
            file: 'types/resources.ts',
            symbolName: 'VBIInsightResourceNamespace',
            displayName: 'VBI.resources.insight',
          },
        ],
      },
      {
        type: 'file',
        name: 'connectors',
        label: 'VBI.connectors',
        docs: [
          {
            kind: 'interface',
            file: 'types/connectors.ts',
            symbolName: 'VBIConnectorNamespace',
            displayName: 'VBI.connectors',
          },
          {
            kind: 'type',
            file: 'types/connectors.ts',
            displayName: 'VBIConnectorFactory',
          },
          {
            kind: 'type',
            file: 'types/connectors.ts',
            displayName: 'VBIConnectorLike',
          },
        ],
      },
    ],
  },
  {
    name: 'chartBuilder',
    label: 'chartBuilder',
    root: 'chart',
    index: {
      file: 'builder.ts',
      displayName: 'VBIChartBuilder',
    },
    items: [
      {
        type: 'file',
        name: 'chartType',
        label: 'chartBuilder.chartType',
        file: 'features/chart-type/chart-type-builder.ts',
        displayName: 'ChartTypeBuilder',
      },
      {
        type: 'dir',
        name: 'measures',
        label: 'chartBuilder.measures',
        file: 'features/measures/mea-builder.ts',
        displayName: 'MeasuresBuilder',
        children: [
          {
            name: 'measureNode',
            label: 'measureNode',
            file: 'features/measures/mea-node-builder.ts',
            displayName: 'MeasureNodeBuilder',
          },
        ],
      },
      {
        type: 'dir',
        name: 'dimensions',
        label: 'chartBuilder.dimensions',
        file: 'features/dimensions/dim-builder.ts',
        displayName: 'DimensionsBuilder',
        children: [
          {
            name: 'dimensionNode',
            label: 'dimensionNode',
            file: 'features/dimensions/dim-node-builder.ts',
            displayName: 'DimensionNodeBuilder',
          },
        ],
      },
      {
        type: 'dir',
        name: 'whereFilter',
        label: 'chartBuilder.whereFilter',
        file: 'features/whereFilter/where-builder.ts',
        displayName: 'WhereFilterBuilder',
        children: [
          {
            name: 'whereNode',
            label: 'whereNode',
            file: 'features/whereFilter/where-node-builder.ts',
            displayName: 'WhereFilterNodeBuilder',
          },
          {
            name: 'whereGroup',
            label: 'whereGroup',
            file: 'features/whereFilter/where-group-builder.ts',
            displayName: 'WhereGroupBuilder',
          },
        ],
      },
      {
        type: 'dir',
        name: 'havingFilter',
        label: 'chartBuilder.havingFilter',
        file: 'features/havingFilter/having-builder.ts',
        displayName: 'HavingFilterBuilder',
        children: [
          {
            name: 'havingNode',
            label: 'havingNode',
            file: 'features/havingFilter/having-node-builder.ts',
            displayName: 'HavingFilterNodeBuilder',
          },
          {
            name: 'havingGroup',
            label: 'havingGroup',
            file: 'features/havingFilter/having-group-builder.ts',
            displayName: 'HavingGroupBuilder',
          },
        ],
      },
      {
        type: 'file',
        name: 'theme',
        label: 'chartBuilder.theme',
        file: 'features/theme/theme-builder.ts',
        displayName: 'ThemeBuilder',
      },
      {
        type: 'file',
        name: 'locale',
        label: 'chartBuilder.locale',
        file: 'features/locale/locale-builder.ts',
        displayName: 'LocaleBuilder',
      },
      {
        type: 'file',
        name: 'limit',
        label: 'chartBuilder.limit',
        file: 'features/limit/limit-builder.ts',
        displayName: 'LimitBuilder',
      },
      {
        type: 'file',
        name: 'undoManager',
        label: 'chartBuilder.undoManager',
        file: 'features/undo-manager/undo-manager.ts',
        displayName: 'UndoManager',
      },
    ],
  },
  {
    name: 'dashboardBuilder',
    label: 'dashboardBuilder',
    root: 'dashboard',
    index: [
      { file: 'builder.ts', displayName: 'VBIDashboardBuilder' },
      { kind: 'interface', file: 'builder.ts', displayName: 'VBIDashboardBuilderDependencies' },
      { kind: 'interface', file: '../types/builder/dashboard.ts', displayName: 'VBIDashboardBuilderOptions' },
    ],
    items: [
      {
        type: 'file',
        name: 'undoManager',
        label: 'dashboardBuilder.undoManager',
        docs: [
          { file: '../chart-builder/features/undo-manager/undo-manager.ts', displayName: 'UndoManager' },
          {
            kind: 'interface',
            file: '../chart-builder/features/undo-manager/undo-manager.ts',
            displayName: 'UndoManagerOptions',
          },
        ],
      },
      {
        type: 'file',
        name: 'theme',
        label: 'dashboardBuilder.theme',
        file: 'features/theme/theme-builder.ts',
        displayName: 'DashboardThemeBuilder',
      },
      {
        type: 'dir',
        name: 'chart',
        label: 'dashboardBuilder.chart',
        file: 'features/chart/chart-collection-builder.ts',
        displayName: 'DashboardChartCollectionBuilder',
        children: [
          {
            name: 'dashboardChart',
            label: 'dashboardChart',
            file: 'features/chart/chart-builder.ts',
            displayName: 'DashboardChartBuilder',
          },
        ],
      },
      {
        type: 'dir',
        name: 'insight',
        label: 'dashboardBuilder.insight',
        file: 'features/insight/insight-collection-builder.ts',
        displayName: 'DashboardInsightCollectionBuilder',
        children: [
          {
            name: 'dashboardInsight',
            label: 'dashboardInsight',
            file: 'features/insight/insight-builder.ts',
            displayName: 'DashboardInsightBuilder',
          },
        ],
      },
    ],
  },
  {
    name: 'insightBuilder',
    label: 'insightBuilder',
    root: 'insight',
    index: {
      file: 'builder.ts',
      displayName: 'VBIInsightBuilder',
    },
    items: [],
  },
]

// ============================================================================
// 工具函数
// ============================================================================

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
}

const resetDir = (dirPath) => {
  fs.rmSync(dirPath, { recursive: true, force: true })
  fs.mkdirSync(dirPath, { recursive: true })
}

const writeFile = (filePath, content) => fs.writeFileSync(filePath, content, 'utf-8')

const writeJson = (filePath, data) => writeFile(filePath, JSON.stringify(data, null, 2))

/** @description 转义 markdown table 中的 | 字符。 */
const escapeTableCell = (str) => String(str || '').replace(/\|/g, '\\|')

const resolveSourcePath = (config) => {
  const root = SOURCE_ROOTS[config.root]
  if (!root) {
    throw new Error(`Unknown source root "${config.root}"`)
  }
  return path.join(root, config.file)
}

const isPrivate = (node) =>
  node.hasModifier?.(SyntaxKind.PrivateKeyword) ||
  node.hasModifier?.(SyntaxKind.ProtectedKeyword) ||
  node.getJsDocs?.().some((doc) => doc.getTags().some((tag) => tag.getTagName() === 'internal'))

const hasBody = (node) => Boolean(node.getBody?.())

const findByName = (items, displayName) => items.find((item) => item.getName?.() === displayName)

const getDisplayName = (config) => config.displayName || config.label || config.name

const createStructuredDoc = () => ({ description: '', properties: [], methods: [] })

const createTypeDoc = () => ({ description: '', type: '' })

// ============================================================================
// 类型解析
// ============================================================================

/** @description 简化 import 类型路径为短名称。 */
const simplifyType = (typeText) => {
  if (!typeText) return ''
  if (typeText.includes('this.')) return 'any'

  // 全局替换所有 import("...").TypeName -> TypeName
  const simplified = typeText.replace(/import\([^)]+\)\.\s*([\w$]+)/g, '$1')
  if (simplified !== typeText) return simplified

  return typeText
}

/** @description 获取节点的类型文本，自动简化 import 路径。 */
const getTypeText = (node) => {
  const explicit = node.getTypeNode?.()?.getText() || ''
  if (explicit && !explicit.includes('import(')) return explicit
  return simplifyType(node.getType?.().getText() || '')
}

// ============================================================================
// JSDoc 解析
// ============================================================================

/** @description 从 JSDoc 提取 @description 或首行描述文本。 */
const getDescription = (node) => {
  const docs = node.getJsDocs()
  if (!docs.length) return ''

  const doc = docs[0]
  for (const tag of doc.getTags()) {
    if (tag.getTagName() === 'description') {
      return tag.getComment()?.trim() || ''
    }
  }

  const comment = doc.getComment()
  if (typeof comment === 'string' && comment.trim()) return comment.trim()

  // 回退：取第一行非 @ 开头的文本
  for (const line of doc.getFullText().split('\n')) {
    const trimmed = line.replace(/^\s*\*?\s*/, '').trim()
    if (trimmed && !trimmed.startsWith('@') && !trimmed.startsWith('/')) return trimmed
  }
  return ''
}

/** @description 从 JSDoc 提取所有 @param 描述。 */
const getParamDocs = (node) => {
  const params = {}
  const docs = node.getJsDocs()
  if (!docs.length) return params

  for (const tag of docs[0].getTags()) {
    if (tag.getTagName() === 'param') {
      params[tag.getName()] = tag.getComment()
    }
  }
  return params
}

const getDeprecated = (node) => {
  const docs = node.getJsDocs?.() || []
  for (const doc of docs) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === 'deprecated') {
        return tag.getComment()?.trim() || 'Deprecated'
      }
    }
  }
  return ''
}

// ============================================================================
// 声明解析（单次 Project 实例）
// ============================================================================

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
  skipAddingFilesFromTsConfig: true,
})

/** @description 解析参数列表。 */
const parseParams = (node) =>
  node.getParameters().map((param) => ({
    name: param.getName(),
    optional: param.hasQuestionToken?.() || param.isOptional?.() || false,
    type: getTypeText(param),
    defaultValue: param.getInitializer()?.getText() || '',
  }))

const parseTypeParams = (node) =>
  node
    .getTypeParameters?.()
    .map((param) => param.getText())
    .join(', ') || ''

const toPropertyDoc = (property) => ({
  name: property.getName(),
  optional: property.hasQuestionToken?.() || false,
  type: getTypeText(property),
  description: getDescription(property),
  deprecated: getDeprecated(property),
})

const toMethodDoc = (method, options = {}) => ({
  name: method.getName(),
  typeParams: parseTypeParams(method),
  params: parseParams(method),
  returnType: simplifyType(method.getReturnTypeNode?.()?.getText() || method.getReturnType().getText(method)),
  description: getDescription(method),
  deprecated: getDeprecated(method),
  paramsDoc: getParamDocs(method),
  isStatic: options.isStatic ?? method.isStatic?.() ?? false,
})

const parseClassDeclaration = (classDecl) => {
  const properties = classDecl
    .getProperties()
    .filter((property) => !isPrivate(property))
    .filter((property) => {
      const init = property.getInitializer()
      return !init || init.getKind() !== SyntaxKind.ArrowFunction
    })
    .map(toPropertyDoc)

  const methods = []

  const ctors = classDecl.getConstructors()
  if (ctors.length) {
    methods.push({
      name: 'constructor',
      params: parseParams(ctors[0]),
      returnType: '',
      description: getDescription(ctors[0]),
      deprecated: getDeprecated(ctors[0]),
      paramsDoc: getParamDocs(ctors[0]),
      isStatic: false,
    })
  }

  for (const method of classDecl.getMethods()) {
    if (isPrivate(method)) continue
    methods.push(toMethodDoc(method))
  }

  for (const prop of classDecl.getProperties()) {
    const init = prop.getInitializer()
    if (!init || init.getKind() !== SyntaxKind.ArrowFunction) continue
    if (isPrivate(prop)) continue

    const returnTypeNode = init.getReturnTypeNode()
    const returnType = returnTypeNode
      ? simplifyType(returnTypeNode.getText())
      : simplifyType(init.getReturnType().getText())
    methods.push({
      name: prop.getName(),
      params: parseParams(init),
      returnType,
      description: getDescription(prop),
      deprecated: getDeprecated(prop),
      paramsDoc: getParamDocs(prop),
      isStatic: prop.isStatic?.() || false,
    })
  }

  return {
    description: getDescription(classDecl),
    properties,
    methods,
  }
}

const parseInterfaceDeclaration = (interfaceDecl) => ({
  description: getDescription(interfaceDecl),
  properties: interfaceDecl.getProperties().map(toPropertyDoc),
  methods: interfaceDecl.getMethods().map((method) => toMethodDoc(method)),
})

const parseFunctionDeclarations = (sourceFile, displayName) => {
  const declarations = sourceFile.getFunctions().filter((fn) => fn.getName() === displayName)
  const overloads = declarations.flatMap((fn) => fn.getOverloads?.() || [])
  const docs = overloads.length ? overloads : declarations.filter((fn) => !hasBody(fn) || declarations.length === 1)
  const description = [...overloads, ...declarations].map(getDescription).find(Boolean) || ''

  return {
    description,
    signatures: docs.map((fn) => ({
      name: fn.getName(),
      typeParams: parseTypeParams(fn),
      params: parseParams(fn),
      returnType: fn.getReturnTypeNode?.() ? simplifyType(fn.getReturnTypeNode().getText()) : '',
      description: getDescription(fn),
      deprecated: getDeprecated(fn),
      paramsDoc: getParamDocs(fn),
    })),
  }
}

const parseConstDeclaration = (sourceFile, displayName) => {
  const variable = sourceFile.getVariableDeclarations().find((declaration) => declaration.getName() === displayName)

  if (!variable) return { description: '', type: '', initializer: '' }

  const statement = variable.getVariableStatementOrThrow()
  return {
    description: getDescription(statement),
    deprecated: getDeprecated(statement),
    type: getTypeText(variable),
    initializer: variable.getInitializer()?.getText() || '',
  }
}

const parseTypeAliasDeclaration = (typeAlias) => ({
  description: getDescription(typeAlias),
  deprecated: getDeprecated(typeAlias),
  type: typeAlias.getTypeNode()?.getText() || simplifyType(typeAlias.getType().getText()),
})

const parseByKind = {
  interface: (sourceFile, symbolName) => {
    const interfaceDecl = findByName(sourceFile.getInterfaces(), symbolName)
    return interfaceDecl ? parseInterfaceDeclaration(interfaceDecl) : createStructuredDoc()
  },
  function: (sourceFile, symbolName) => parseFunctionDeclarations(sourceFile, symbolName),
  const: (sourceFile, symbolName) => parseConstDeclaration(sourceFile, symbolName),
  type: (sourceFile, symbolName) => {
    const typeAlias = findByName(sourceFile.getTypeAliases(), symbolName)
    return typeAlias ? parseTypeAliasDeclaration(typeAlias) : createTypeDoc()
  },
  class: (sourceFile, symbolName) => {
    const classDecl = sourceFile.getClassOrThrow(symbolName)
    return parseClassDeclaration(classDecl)
  },
}

const parseApiSource = (config) => {
  const filePath = resolveSourcePath(config)
  const sourceFile = project.addSourceFileAtPath(filePath)
  const kind = config.kind || 'class'
  const symbolName = config.symbolName || getDisplayName(config)

  try {
    const parser = parseByKind[kind]
    if (!parser) throw new Error(`Unknown API declaration kind "${kind}"`)
    return parser(sourceFile, symbolName)
  } finally {
    project.removeSourceFile(sourceFile)
  }
}

// ============================================================================
// Markdown 生成
// ============================================================================

const renderPropertyTable = (properties) => {
  if (!properties.length) return ''
  const rows = properties
    .map((p) => {
      const name = p.optional ? `${p.name}?` : p.name
      return `| **${name}** | \`${escapeTableCell(p.type)}\` | ${p.description || p.deprecated || '-'} |`
    })
    .join('\n')
  return `| 属性 | 类型 | 说明 |\n| --- | --- | --- |\n${rows}\n`
}

const renderTypeParams = (typeParams) => (typeParams ? `<${typeParams}>` : '')

const renderParamName = (param) => `${param.name}${param.optional ? '?' : ''}`

const renderParamSignature = (param) => `${renderParamName(param)}: ${param.type || 'any'}`

const renderParamsSignature = (params) => params.map(renderParamSignature).join(', ')

const renderCallableSignature = (doc, { keyword = '', prefix = '' } = {}) => {
  const keywordText = keyword ? `${keyword} ` : ''
  const typeParams = renderTypeParams(doc.typeParams)
  const returnType = doc.returnType ? `: ${doc.returnType}` : ''
  return `${keywordText}${prefix}${doc.name}${typeParams}(${renderParamsSignature(doc.params)})${returnType}`
}

const renderParamTable = (params, paramsDoc = {}) => {
  if (!params.length) return ''
  const rows = params
    .map((param) => {
      const defaultValue = param.defaultValue ? ` = ${param.defaultValue}` : ''
      const description = paramsDoc[param.name] || '-'
      return `| \`${renderParamName(param)}\`${defaultValue} | ${escapeTableCell(param.type || '-')} | ${description} |`
    })
    .join('\n')
  return `| 参数 | 类型 | 说明 |\n| --- | --- | --- |\n${rows}`
}

const renderMethodDoc = (method) => {
  const prefix = method.isStatic ? 'static ' : ''
  const signature = renderCallableSignature(method, { prefix })

  const parts = [`### ${prefix}${method.name}`]

  if (method.description) parts.push(method.description)
  if (method.deprecated) parts.push(`:::warning Deprecated\n${method.deprecated}\n:::`)

  parts.push(`**定义**:\n\n\`\`\`typescript\n${signature}\n\`\`\``)

  if (method.returnType) {
    parts.push(`**返回**: \`${escapeTableCell(method.returnType)}\``)
  }

  if (method.params.length) {
    parts.push(`**参数**:\n\n${renderParamTable(method.params, method.paramsDoc)}`)
  }

  return parts.join('\n\n')
}

const renderStructuredDoc = (config, parsed) => {
  const displayName = getDisplayName(config)
  const properties = parsed.properties || []
  const regularProperties = properties.filter((property) => !property.deprecated)
  const deprecatedProperties = properties.filter((property) => property.deprecated)
  const methods = parsed.methods || []

  const parts = [
    `# ${displayName}`,
    parsed.description || '',
    regularProperties.length ? '## 属性' : '',
    renderPropertyTable(regularProperties),
    deprecatedProperties.length ? '## 废弃属性' : '',
    renderPropertyTable(deprecatedProperties),
    methods.length ? '## 方法' : '',
    methods.map(renderMethodDoc).join('\n\n'),
  ]

  return parts.filter(Boolean).join('\n\n')
}

const renderFunctionDoc = (config, parsed) => {
  const displayName = getDisplayName(config)
  const signatures = parsed.signatures || []
  const signatureText = signatures
    .map((signature) => renderCallableSignature(signature, { keyword: 'function' }))
    .join('\n')

  const parts = [`# ${displayName}`, parsed.description || '']

  if (signatureText) {
    parts.push(`## 函数签名\n\n\`\`\`typescript\n${signatureText}\n\`\`\``)
  }

  const signatureWithParams = signatures.find((signature) => signature.params.length)
  if (signatureWithParams) {
    parts.push(`## 参数\n\n${renderParamTable(signatureWithParams.params, signatureWithParams.paramsDoc)}`)
  }

  return parts.filter(Boolean).join('\n\n')
}

const renderConstDoc = (config, parsed) => {
  const displayName = getDisplayName(config)
  const parts = [`# ${displayName}`, parsed.description || '']

  if (parsed.deprecated) parts.push(`:::warning Deprecated\n${parsed.deprecated}\n:::`)
  parts.push(`**类型**: \`${escapeTableCell(parsed.type || 'unknown')}\``)
  if (parsed.initializer) {
    const definition = `const ${displayName}: ${parsed.type || 'unknown'} = ${parsed.initializer}`
    parts.push(`**定义**:\n\n\`\`\`typescript\n${definition}\n\`\`\``)
  }

  return parts.filter(Boolean).join('\n\n')
}

const renderTypeDoc = (config, parsed) => {
  const displayName = getDisplayName(config)
  const parts = [`# ${displayName}`, parsed.description || '']

  if (parsed.deprecated) parts.push(`:::warning Deprecated\n${parsed.deprecated}\n:::`)
  parts.push(`**定义**:\n\n\`\`\`typescript\ntype ${displayName} = ${parsed.type || 'unknown'}\n\`\`\``)

  return parts.filter(Boolean).join('\n\n')
}

const renderSingleApiDoc = (config) => {
  const parsed = parseApiSource(config)
  const kind = config.kind || 'class'

  if (kind === 'function') return renderFunctionDoc(config, parsed)
  if (kind === 'const') return renderConstDoc(config, parsed)
  if (kind === 'type') return renderTypeDoc(config, parsed)
  return renderStructuredDoc(config, parsed)
}

const withRoot = (root, config) => {
  if (Array.isArray(config)) return config.map((item) => withRoot(root, item))
  if (config.docs) {
    return {
      ...config,
      docs: config.docs.map((item) => withRoot(root, item)),
    }
  }
  return { ...config, root }
}

const renderApiDoc = (config) => {
  const docs = Array.isArray(config) ? config : config.docs || [config]
  return docs.map(renderSingleApiDoc).join('\n\n---\n\n')
}

const toDocConfig = (root, config) => withRoot(root, config)

const createMetaFileEntry = (name, label) => ({ type: 'file', name, label })

const createMetaDirEntry = (name, label, collapsed = true) => ({
  type: 'dir',
  name,
  label,
  collapsible: true,
  collapsed,
})

const isSinglePageSection = (section) => section.items.length === 0

const logGenerated = (relativePath) => console.log(`Generated: ${relativePath}`)

const writeApiDoc = (filePath, root, config, logPath) => {
  writeFile(filePath, renderApiDoc(toDocConfig(root, config)))
  logGenerated(logPath)
}

const generateItem = (root, outputDir, item, logPrefix) => {
  if (item.type === 'file') {
    writeApiDoc(path.join(outputDir, `${item.name}.md`), root, item, `${logPrefix}/${item.name}.md`)
    return createMetaFileEntry(item.name, item.label)
  }

  const itemDir = path.join(outputDir, item.name)
  const itemLogPrefix = `${logPrefix}/${item.name}`
  ensureDir(itemDir)
  writeApiDoc(path.join(itemDir, 'index.md'), root, item, `${itemLogPrefix}/index.md`)

  const childMeta = (item.children || []).map((child) => {
    writeApiDoc(path.join(itemDir, `${child.name}.md`), root, child, `${itemLogPrefix}/${child.name}.md`)
    return createMetaFileEntry(child.name, child.label)
  })

  writeJson(path.join(itemDir, '_meta.json'), childMeta)
  logGenerated(`${itemLogPrefix}/_meta.json`)
  return createMetaDirEntry(item.name, item.label)
}

const generateSection = (section) => {
  if (isSinglePageSection(section)) {
    writeApiDoc(path.join(OUTPUT_DIR, `${section.name}.md`), section.root, section.index, `${section.name}.md`)
    return
  }

  const sectionDir = path.join(OUTPUT_DIR, section.name)
  ensureDir(sectionDir)

  writeApiDoc(path.join(sectionDir, 'index.md'), section.root, section.index, `${section.name}/index.md`)

  const sectionMeta = section.items.map((item) => generateItem(section.root, sectionDir, item, section.name))
  writeJson(path.join(sectionDir, '_meta.json'), sectionMeta)
  logGenerated(`${section.name}/_meta.json`)
}

// ============================================================================
// 主函数
// ============================================================================

function generateDocs() {
  console.log('Building API docs from TypeScript declarations...\n')

  // Every public Dashboard sub-builder must have its own navigable API page.
  const dashboard = API_SECTIONS.find((section) => section.name === 'dashboardBuilder')
  const source = project.addSourceFileAtPath(path.join(SOURCE_ROOTS.dashboard, 'builder.ts'))
  for (const property of source.getClassOrThrow('VBIDashboardBuilder').getProperties()) {
    if (isPrivate(property) || ['doc', 'dsl'].includes(property.getName())) continue
    if (property.getInitializer()?.getKind() === SyntaxKind.ArrowFunction) continue
    if (!dashboard.items.some((item) => item.name === property.getName())) {
      throw new Error(`Missing Dashboard API section: ${property.getName()}`)
    }
  }
  resetDir(OUTPUT_DIR)

  for (const section of API_SECTIONS) {
    generateSection(section)
  }

  writeJson(
    path.join(OUTPUT_DIR, '_meta.json'),
    API_SECTIONS.map((section) =>
      isSinglePageSection(section)
        ? createMetaFileEntry(section.name, section.label)
        : createMetaDirEntry(section.name, section.label, false),
    ),
  )
  console.log('Generated: api/_meta.json')

  writeFile(path.join(OUTPUT_DIR, 'index.md'), API_OVERVIEW_PAGE)
  console.log('Generated: index.md')

  if (outputArg) return

  // 4. 确保父级 _meta.json 包含 api 条目
  const parentMetaPath = path.resolve(__dirname, '../../../apps/website/docs/zh-CN/vbi/_meta.json')
  const parentMeta = JSON.parse(fs.readFileSync(parentMetaPath, 'utf-8'))
  if (!parentMeta.some((item) => item.name === 'api')) {
    parentMeta.splice(2, 0, { type: 'dir', name: 'api', label: 'API' })
    writeJson(parentMetaPath, parentMeta)
    console.log('Updated: _meta.json')
  }

  console.log(`\n✅ Generated API docs for ${API_SECTIONS.length} sections`)
}

generateDocs()

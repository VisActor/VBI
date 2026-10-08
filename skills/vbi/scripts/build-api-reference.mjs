/** Generate VBI and VSeed skill API references from public TypeScript declarations. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { format } from 'oxfmt'
import { Project, Node, SyntaxKind, TypeFormatFlags, ModuleResolutionKind } from 'ts-morph'

const toPosix = (value) => value.split(path.sep).join('/')
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(scriptDir, '../../..')
const scriptPath = toPosix(path.relative(repositoryRoot, fileURLToPath(import.meta.url)))
const profiles = {
  vbi: {
    title: 'VBI',
    outputDir: path.resolve(scriptDir, '../references/api/vbi'),
    description:
      '从 `packages/vbi/src/index.ts` 的公开导出生成，并递归收录签名引用的本地类型及子 Builder。私有、受保护和 `@internal` 成员不属于公开 API。声明保留 JSDoc、重载、泛型、可选参数和推导返回值；Zod DSL 类型展开为字段定义。',
    sections: [
      { file: 'vbi.md', title: 'VBI', roots: ['VBI', 'createVBI', 'VBIInstance'] },
      { file: 'chart-builder.md', title: 'chartBuilder', roots: ['VBIChartBuilder'] },
      { file: 'dashboard-builder.md', title: 'dashboardBuilder', roots: ['VBIDashboardBuilder'] },
      { file: 'insight-builder.md', title: 'insightBuilder', roots: ['VBIInsightBuilder'] },
      { file: 'types.md', title: 'DSL 与公共类型', roots: [] },
    ],
    sectionFor(record) {
      const file = record.node.getSourceFile().getFilePath()
      if (file.includes('/chart-builder/')) return 'chart-builder.md'
      if (file.includes('/dashboard-builder/')) return 'dashboard-builder.md'
      if (file.includes('/insight-builder/')) return 'insight-builder.md'
      if (file.startsWith('/src/types/')) return 'types.md'
      return 'vbi.md'
    },
  },
  vseed: {
    title: 'VSeed',
    outputDir: path.resolve(scriptDir, '../references/api/vseed'),
    preserveZodSchemas: true,
    description:
      '这是 VBI skill 的 VSeed API 补充，用于查阅 VSeed DSL 到 VChart、VTable Spec 的构建能力。先调用 `registerAll()` 注册内置图表与主题，再通过 `Builder.from(vseed).build()` 构建 Spec；配置包含动态过滤器代码时，先 `await builder.prepare()` 再构建。\n\n从 `packages/vseed/src/index.ts` 的公开导出生成，并递归收录签名引用的本地类型。私有、受保护和 `@internal` 成员不属于公开 API。声明保留 JSDoc、重载、泛型、可选参数和推导返回值。Zod Schema 保留源码中的组合表达式与默认值；基于 Schema 的类型保留 z.infer 等引用，可沿关联 API 链接查看字段定义。',
    sections: [
      { file: 'builder.md', title: 'Builder', roots: ['Builder', 'VSeedBuilder'] },
      { file: 'register.md', title: '注册与扩展', roots: ['registerAll', 'updateAdvanced', 'updateSpec'] },
      { file: 'types.md', title: 'DSL 与公共类型', roots: ['VSeed', 'VSeedDSL', 'AdvancedVSeed', 'Spec'] },
      { file: 'chart-types.md', title: '图表与表格 DSL', roots: [] },
      { file: 'pipeline.md', title: '构建管线类型', roots: [] },
      { file: 'schemas.md', title: 'Zod 校验 Schema', roots: ['zVSeed'] },
      { file: 'theme.md', title: '主题', roots: ['lightTheme', 'darkTheme'] },
      {
        file: 'data.md',
        title: '数据重塑与选择器',
        roots: ['dataReshapeByEncoding', 'selector', 'executeDynamicFilter'],
      },
      { file: 'i18n.md', title: '国际化', roots: ['intl'] },
    ],
    sectionFor(record) {
      const file = record.node.getSourceFile().getFilePath()
      if (Node.isVariableDeclaration(record.node) && /^z[A-Z]/.test(record.name)) return 'schemas.md'
      if (file.startsWith('/src/builder/register/')) return 'register.md'
      if (file.startsWith('/src/builder/') || file.startsWith('/src/types/builder/')) return 'builder.md'
      if (file.startsWith('/src/types/chartType/')) return 'chart-types.md'
      if (file.startsWith('/src/types/pipeline/') || file.startsWith('/src/pipeline/')) return 'pipeline.md'
      if (file.startsWith('/src/theme/')) return 'theme.md'
      if (file.startsWith('/src/dataReshape/') || file.startsWith('/src/dataSelector/')) return 'data.md'
      if (file.startsWith('/src/i18n/') || file.startsWith('/src/types/i18n')) return 'i18n.md'
      return 'types.md'
    },
  },
}

const virtualPath = (relative) => `/src/${toPosix(relative).replace(/\.ts$/, '.d.ts')}`
const jsDocs = (node) => (Node.isVariableDeclaration(node) ? node.getVariableStatement() : node)?.getJsDocs?.() || []
const isInternal = (node) => jsDocs(node).some((doc) => doc.getTags().some((tag) => tag.getTagName() === 'internal'))
const isHidden = (node) =>
  isInternal(node) ||
  node.hasModifier?.(SyntaxKind.PrivateKeyword) ||
  node.hasModifier?.(SyntaxKind.ProtectedKeyword) ||
  Node.isPrivateIdentifier(node.getNameNode?.())
const declarations = (file) => [
  ...file.getClasses(),
  ...file.getInterfaces(),
  ...file.getTypeAliases(),
  ...file.getFunctions(),
  ...file.getVariableDeclarations(),
  ...file.getEnums(),
]
const importBindings = (declaration) => [
  declaration.getDefaultImport()?.getText(),
  declaration.getNamespaceImport()?.getText(),
  ...declaration.getNamedImports().map((binding) => binding.getAliasNode()?.getText() || binding.getName()),
]

/** Keep module references portable without discarding their type identity. */
function portableTypes(text, sourceRoot) {
  return text.replace(/import\(["']([^"']+)["']\)/g, (match, module) => {
    if (!path.isAbsolute(module)) return match
    const relative = path.relative(sourceRoot, module)
    if (!relative.startsWith('..') && !path.isAbsolute(relative)) return `import("src/${toPosix(relative)}")`
    const dependency = toPosix(module).split('/node_modules/').at(-1)
    if (dependency !== toPosix(module)) {
      const parts = dependency.split('/')
      const name = parts.slice(0, parts[0].startsWith('@') ? 2 : 1).join('/')
      return `import("${name}")`
    }
    throw new Error(`Cannot make type reference portable: ${module}`)
  })
}

/**
 * Emit in memory so TypeScript owns overloads, generics, inferred return types,
 * accessors, optional/rest parameters and declaration merging. Only public
 * signatures are traversed, with optional source expressions for Zod schemas.
 */
function declarationProject(project, sourceRoot, preserveZodSchemas) {
  const emitted = project.emitToMemory({ emitOnlyDtsFiles: true })
  if (emitted.getEmitSkipped() || !emitted.getFiles().some((file) => file.filePath.endsWith('.d.ts'))) {
    throw new Error('TypeScript declaration emit was skipped')
  }
  const docs = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      baseUrl: '/',
      paths: { 'src/*': ['/src/*'] },
      moduleResolution: ModuleResolutionKind.NodeJs,
    },
  })
  const emitRoot = project.getCompilerOptions().declarationDir || project.getCompilerOptions().outDir || sourceRoot
  for (const file of emitted.getFiles()) {
    if (!file.filePath.endsWith('.d.ts')) continue
    const relative = path.relative(emitRoot, file.filePath)
    if (relative.startsWith('..')) continue
    docs.createSourceFile(`/src/${toPosix(relative)}`, portableTypes(file.text, sourceRoot))
  }

  for (const source of project.getSourceFiles()) {
    const relative = path.relative(sourceRoot, source.getFilePath())
    if (relative.startsWith('..')) continue
    const file = docs.getSourceFile(virtualPath(relative))
    if (!file) continue
    if (preserveZodSchemas) {
      // Schema expressions retain named composition and defaults without expanding
      // every nested Zod generic. Keep the schema's own imports for symbol links.
      for (const variable of source.getVariableDeclarations()) {
        const emitted = file.getVariableDeclaration(variable.getName())
        if (!emitted || !/^z\./.test(emitted.getTypeNode()?.getText() || '') || !variable.getInitializer()) continue
        emitted.replaceWithText(variable.getText())
        const names = new Set(variable.getDescendantsOfKind(SyntaxKind.Identifier).map((node) => node.getText()))
        for (const declaration of source.getImportDeclarations()) {
          if (!importBindings(declaration).some((name) => names.has(name))) continue
          const existing = new Set(file.getImportDeclarations().flatMap(importBindings))
          const structure = declaration.getStructure()
          structure.namedImports = structure.namedImports?.filter(
            (binding) => !existing.has(binding.alias || binding.name),
          )
          if (existing.has(structure.defaultImport)) structure.defaultImport = undefined
          if (existing.has(structure.namespaceImport)) structure.namespaceImport = undefined
          if (structure.defaultImport || structure.namespaceImport || structure.namedImports?.length)
            file.addImportDeclaration(structure)
        }
      }
      continue
    }
    // z.input/output/infer hides the actual DSL fields behind runtime schemas.
    // Expand those aliases with the checker while retaining named recursive types.
    for (const alias of source.getTypeAliases()) {
      if (!/^z\.(?:input|output|infer)</.test(alias.getTypeNodeOrThrow().getText())) continue
      const type = alias.getType().getText(alias, TypeFormatFlags.NoTruncation | TypeFormatFlags.InTypeAlias)
      file.getTypeAliasOrThrow(alias.getName()).setType(portableTypes(type, sourceRoot))
    }
  }

  for (const file of docs.getSourceFiles()) {
    for (const declaration of declarations(file)) {
      if (isHidden(declaration)) {
        declaration.remove()
        continue
      }
      if (Node.isClassDeclaration(declaration) || Node.isInterfaceDeclaration(declaration)) {
        for (const member of declaration.getMembers()) {
          if (isHidden(member)) member.remove()
        }
      }
    }
    file.formatText({ indentSize: 2 })
  }
  return docs
}

const link = (record) => `[${record.name}](${record.page}#${record.anchor})`
const declarationText = (node) => {
  if (!Node.isVariableDeclaration(node)) return node.getText()
  return `${node.getVariableStatementOrThrow().getDeclarationKind()} ${node.getText()};`
}
const docText = (node) =>
  jsDocs(node)
    .map((doc) => doc.getText())
    .join('\n')

function parameterDefaults(node) {
  const callables = Node.isClassDeclaration(node) ? node.getMembers().filter((member) => !isHidden(member)) : [node]
  const defaults = []
  for (const member of callables) {
    const callable = member.getInitializer?.() || member
    for (const parameter of callable.getParameters?.() || []) {
      const value = parameter.getInitializer()?.getText()
      if (value)
        defaults.push(
          `// ${Node.isConstructorDeclaration(member) ? 'constructor' : member.getName()}\n${parameter.getName()} = ${value}`,
        )
    }
  }
  return defaults
}

/** Return Markdown files without touching disk. */
export async function buildApiReference(project, sourceRoot, config) {
  const { sections, sectionFor, packageName, title, scriptPath, description } = config
  const generatedNotice = `<!-- Generated by ${scriptPath}. DO NOT EDIT. -->`
  const docs = declarationProject(project, sourceRoot, config.preserveZodSchemas)
  const publicExports = project.getSourceFileOrThrow(path.join(sourceRoot, 'index.ts')).getExportedDeclarations()
  const external = docs.createSourceFile('/external/api.d.ts', '')
  for (const [name, nodes] of publicExports) {
    const node = nodes[0]
    if (!path.relative(sourceRoot, node.getSourceFile().getFilePath()).startsWith('..')) continue
    const type = portableTypes(node.getType().getText(undefined, TypeFormatFlags.NoTruncation), sourceRoot)
    external.addStatements(`${docText(node)}\nexport declare const ${name}: ${type};`)
  }
  const records = new Map()
  for (const file of docs.getSourceFiles()) {
    for (const node of declarations(file)) {
      const key = `${file.getFilePath()}:${node.getName()}`
      const record = records.get(key) || { name: node.getName(), node, nodes: [], exports: [], references: new Set() }
      record.nodes.push(node)
      records.set(key, record)
    }
  }
  const recordFor = (node) => records.get(`${node.getSourceFile().getFilePath()}:${node.getName?.()}`)
  const queue = []
  const included = new Set()
  const include = (record) => {
    if (!record || included.has(record)) return
    included.add(record)
    queue.push(record)
  }
  for (const [name, nodes] of publicExports) {
    for (const node of nodes) {
      if (isHidden(node)) continue
      const relative = path.relative(sourceRoot, node.getSourceFile().getFilePath())
      const key = relative.startsWith('..')
        ? `/external/api.d.ts:${name}`
        : `${virtualPath(relative)}:${node.getName()}`
      const record = records.get(key)
      if (!record) throw new Error(`Missing public declaration: ${name}`)
      if (!record.exports.includes(name)) record.exports.push(name)
      include(record)
    }
  }
  if (!queue.length) throw new Error('No public API declarations found in src/index.ts')

  // Follow symbols instead of names: two modules can define e.g. ResourceReference.
  for (let index = 0; index < queue.length; index++) {
    const record = queue[index]
    for (const node of record.nodes) {
      for (const identifier of node.getDescendantsOfKind(SyntaxKind.Identifier)) {
        let symbol = identifier.getSymbol()
        if (symbol?.isAlias()) symbol = symbol.getAliasedSymbol()
        for (const declaration of symbol?.getDeclarations() || []) {
          const target = recordFor(declaration)
          if (!target || target === record) continue
          record.references.add(target)
          include(target)
        }
      }
    }
  }

  const roots = sections.flatMap((section) => section.roots)
  const rank = (record) => (roots.includes(record.name) ? roots.indexOf(record.name) : roots.length)
  const sorted = [...included].sort((a, b) => {
    return (
      rank(a) - rank(b) ||
      a.name.localeCompare(b.name, 'en') ||
      a.node.getSourceFile().getFilePath().localeCompare(b.node.getSourceFile().getFilePath(), 'en')
    )
  })
  const anchors = new Map()
  for (const record of sorted) {
    record.page = sectionFor(record)
    const base = record.name.toLowerCase()
    const key = `${record.page}:${base}`
    const count = anchors.get(key) || 0
    record.anchor = count ? `${base}-${count}` : base
    anchors.set(key, count + 1)
  }

  const pages = new Map()
  for (const section of sections) {
    const contents = sorted.filter((record) => record.page === section.file)
    const parts = [
      generatedNotice,
      `# ${section.title}`,
      '[API 索引](./index.md)',
      contents
        .map(link)
        .map((item) => `- ${item}`)
        .join('\n'),
    ]
    const externalImports = new Set()
    for (const record of contents) {
      for (const declaration of record.node.getSourceFile().getImportDeclarations()) {
        const module = declaration.getModuleSpecifierValue()
        if (!module.startsWith('.') && !module.startsWith('src/')) externalImports.add(declaration.getText())
      }
    }
    if (externalImports.size)
      parts.push(
        `外部依赖类型使用源码中的导入名称：\n\n\`\`\`typescript\n${[...externalImports].sort().join('\n')}\n\`\`\``,
      )
    for (const record of contents) {
      const isExternal = record.node.getSourceFile() === external
      const relative = isExternal
        ? 'index.ts'
        : record.node
            .getSourceFile()
            .getFilePath()
            .replace('/src/', '')
            .replace(/\.d\.ts$/, '.ts')
      const sourcePath = `packages/${packageName}/src/${relative}`
      const sourceLink = `https://github.com/VisActor/VBI/blob/main/${sourcePath}`
      parts.push(`## ${record.name}`, `源码：[${sourcePath}](${sourceLink})`)
      parts.push(
        record.exports.length
          ? `包导出：${record.exports.map((name) => `\`${name}\``).join('、')}`
          : '关联类型：通过公开 API 的签名引用，不是包入口的独立导出。',
      )
      if (isExternal) parts.push('此 API 由包入口从依赖包重新导出。')
      const code = record.nodes
        .map((node) => [docText(node), declarationText(node)].filter(Boolean).join('\n'))
        .join('\n\n')
      parts.push(`\`\`\`typescript\n${code}\n\`\`\``)
      const original = project.getSourceFile(path.join(sourceRoot, relative))
      const defaults = original
        ? declarations(original)
            .filter((node) => node.getName() === record.name)
            .flatMap(parameterDefaults)
        : []
      if (defaults.length) parts.push(`参数默认值：\n\n\`\`\`typescript\n${defaults.join('\n\n')}\n\`\`\``)
      if (record.references.size)
        parts.push(
          `关联 API：${[...record.references]
            .sort((a, b) => a.name.localeCompare(b.name, 'en'))
            .map(link)
            .join('、')}`,
        )
    }
    pages.set(section.file, `${parts.filter(Boolean).join('\n\n')}\n`)
  }
  const exports = sorted
    .flatMap((record) => record.exports.map((name) => ({ name, record })))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
  pages.set(
    'index.md',
    [
      generatedNotice,
      `# ${title} API`,
      description,
      `重新生成：在仓库根目录运行 \`node ${scriptPath} ${packageName}\`；省略包名可生成全部 API。脚本通过相对位置定位源码，与当前工作目录无关。请修改 TypeScript 源码或生成器，不要手工修改这些文件。`,
      '## 分类',
      sections.map((section) => `- [${section.title}](./${section.file})`).join('\n'),
      `## 公开导出（${exports.length}）`,
      exports.map(({ name, record }) => `- [${name}](${record.page}#${record.anchor})`).join('\n'),
      '',
    ].join('\n\n'),
  )
  for (const [file, contents] of pages) {
    const result = await format(file, contents, { printWidth: 120, semi: false, singleQuote: true })
    if (result.errors.length) throw new Error(`Cannot format ${file}: ${JSON.stringify(result.errors)}`)
    pages.set(file, result.code)
  }
  return pages
}

async function runApiReference(packageName, outputDir) {
  const profile = profiles[packageName]
  const packageDir = path.join(repositoryRoot, 'packages', packageName)
  const destination = outputDir ?? profile.outputDir
  const config = { ...profile, packageName, scriptPath, outputDir: destination }
  const project = new Project({ tsConfigFilePath: path.join(packageDir, 'tsconfig.json') })
  const pages = await buildApiReference(project, path.join(packageDir, 'src'), config)
  fs.mkdirSync(destination, { recursive: true })
  // Only overwrite this generator's known files; preserve other reference material.
  for (const [file, contents] of pages) fs.writeFileSync(path.join(destination, file), contents)
  console.log(`Generated ${pages.size} API documents in ${path.relative(process.cwd(), destination) || '.'}`)
}

async function main() {
  const args = process.argv.slice(2)
  const packageName = args[0]?.startsWith('--') ? undefined : args.shift()
  const usage = `Usage: node ${scriptPath} [vbi|vseed] [--output-dir=<directory>]`
  if (
    (packageName !== undefined && !Object.hasOwn(profiles, packageName)) ||
    args.length > 1 ||
    args.some((arg) => !arg.startsWith('--output-dir=') || !arg.slice('--output-dir='.length))
  )
    throw new Error(usage)
  if (!packageName && args.length) throw new Error(`${usage}\n--output-dir requires vbi or vseed.`)
  const outputDir = args.length ? path.resolve(args[0].slice('--output-dir='.length)) : undefined
  for (const name of packageName ? [packageName] : Object.keys(profiles)) await runApiReference(name, outputDir)
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await main()

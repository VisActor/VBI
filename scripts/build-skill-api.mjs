import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Node, Project, SyntaxKind, ts } from 'ts-morph'
import { format } from 'oxfmt'

const repoDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageNames = ['vbi', 'vquery', 'vseed']
// Validate, generate and format each package, then write the complete API.
export const skillApiStageCount = 2 + packageNames.length * 2
const {
  $schema: _schema,
  ignorePatterns: _ignore,
  ...formatOptions
} = ts.parseConfigFileTextToJson(
  '.oxfmtrc.json',
  fs.readFileSync(path.join(repoDirectory, '.oxfmtrc.json'), 'utf8'),
).config
const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
const slash = (value) => value.split(path.sep).join('/')
const anchor = (value) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_ -]/gu, '')
    .replaceAll(' ', '-')

function entrypoints(exports, conditions = []) {
  if (typeof exports?.source === 'string') return [{ name: conditions.join('/') || 'default', source: exports.source }]
  return Object.entries(exports ?? {}).flatMap(([name, value]) =>
    typeof value === 'object' ? entrypoints(value, [...conditions, name]) : [],
  )
}

function groupFor(packageName, source, name) {
  if (packageName === 'vbi') {
    return (
      ['chart-builder', 'dashboard-builder', 'insight-builder'].find((group) => source.startsWith(`${group}/`)) ??
      (source.startsWith('vbi') ? 'vbi' : 'types')
    )
  }
  if (packageName === 'vquery') {
    if (source.startsWith('types/')) return 'types'
    if (source.startsWith('sql-builder/')) return 'sql-compiler'
    if (source.startsWith('adapters/')) return 'adapters'
    if (source.startsWith('utils/')) return 'utils'
    return source.startsWith('vquery-') || source === 'VQuery.ts' ? 'runtime' : 'dataset'
  }
  if (name.startsWith('z')) return 'schemas'
  if (source.startsWith('types/chartType/')) return 'chart-types'
  if (source.startsWith('builder/register/')) return 'register'
  if (source.startsWith('builder/')) return 'builder'
  if (source.startsWith('dataReshape/') || source.startsWith('dataSelector/')) return 'data'
  return ['pipeline', 'theme', 'i18n'].find((group) => source.startsWith(`${group}/`)) ?? 'types'
}

function isPublicMember(member) {
  return (
    !member.hasModifier?.(SyntaxKind.PrivateKeyword) &&
    !member.hasModifier?.(SyntaxKind.ProtectedKeyword) &&
    !member.getName?.().startsWith('#')
  )
}

function defaultParameters(declaration) {
  const members = Node.isClassDeclaration(declaration) ? declaration.getMembers().filter(isPublicMember) : [declaration]
  return members
    .flatMap((member) => {
      const callable =
        Node.isVariableDeclaration(member) || Node.isPropertyDeclaration(member) ? member.getInitializer() : member
      return (callable?.getParameters?.() ?? [])
        .filter((parameter) => parameter.hasInitializer())
        .map(
          (parameter) =>
            `// ${member.getName?.() ?? 'constructor'}\n${parameter.getName()} = ${parameter.getInitializerOrThrow().getText()}`,
        )
    })
    .join('\n\n')
}

function declarationsIn(file) {
  return file
    .getStatements()
    .flatMap((statement) =>
      Node.isVariableStatement(statement)
        ? statement.getDeclarations()
        : Node.isClassDeclaration(statement) ||
            Node.isInterfaceDeclaration(statement) ||
            Node.isTypeAliasDeclaration(statement) ||
            Node.isFunctionDeclaration(statement) ||
            Node.isEnumDeclaration(statement)
          ? [statement]
          : [],
    )
}

function renderDeclaration(declaration) {
  if (Node.isVariableDeclaration(declaration)) {
    const statement = declaration.getVariableStatementOrThrow()
    const docs = statement
      .getJsDocs()
      .map((doc) => doc.getText())
      .join('\n')
    return [docs, `export declare ${statement.getDeclarationKind()} ${declaration.getText()};`]
      .filter(Boolean)
      .join('\n')
  }
  return declaration.getFullText().trim()
}

function sourceProject(repoRoot, packageName, projects) {
  if (projects.has(packageName)) return projects.get(packageName)
  const packageRoot = path.join(repoRoot, 'packages', packageName)
  const project = new Project({
    tsConfigFilePath: path.join(packageRoot, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
    compilerOptions: {
      noEmit: false,
      declaration: true,
      emitDeclarationOnly: true,
      removeComments: false,
      paths: {
        'src/*': [path.join(packageRoot, 'src/*')],
        '@visactor/vbi': [path.join(repoRoot, 'packages/vbi/src/index.ts')],
        '@visactor/vquery': [path.join(repoRoot, 'packages/vquery/src/node.ts')],
        '@visactor/vseed': [path.join(repoRoot, 'packages/vseed/src/index.ts')],
      },
    },
  })
  projects.set(packageName, project)
  return project
}

function generatePackage(repoRoot, packageName, projects) {
  const packageRoot = path.join(repoRoot, 'packages', packageName)
  const sourceRoot = path.join(packageRoot, 'src')
  const metadata = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'))
  const entries = entrypoints(metadata.exports['.'])
  if (!entries.length) throw new Error(`${metadata.name}: no source entrypoint in package.json exports`)
  const project = sourceProject(repoRoot, packageName, projects)
  const parsed = new Project({ useInMemoryFileSystem: true })
  const records = new Map()
  const sources = new Map()

  function readSource(sourceFile) {
    const sourcePath = sourceFile.getFilePath()
    if (sources.has(sourcePath)) return sources.get(sourcePath)
    const emitted = sourceFile
      .getEmitOutput({ emitOnlyDtsFiles: true })
      .getOutputFiles()
      .find((file) => file.getFilePath().endsWith('.d.ts'))
    if (!emitted) throw new Error(`No declaration output for ${sourcePath}`)
    const file = parsed.createSourceFile(
      slash(path.relative(repoRoot, sourcePath)).replace(/\.ts$/, '.d.ts'),
      emitted.getText(),
    )
    for (const declaration of file.getClasses()) {
      for (const member of declaration.getMembers()) if (!isPublicMember(member)) member.remove()
    }
    const source = { file, declarations: declarationsIn(file) }
    sources.set(sourcePath, source)
    return source
  }

  function recordFor(declaration) {
    let sourceFile = declaration.getSourceFile()
    const sourcePath = sourceFile.getFilePath()
    const owner = packageNames.find((name) =>
      sourcePath.startsWith(path.join(repoRoot, 'packages', name, 'src') + path.sep),
    )
    if (!owner) throw new Error(`Export outside workspace package sources: ${sourcePath}`)
    const name = declaration.getName()
    if (owner !== packageName) {
      sourceFile = sourceProject(repoRoot, owner, projects).addSourceFileAtPath(sourcePath)
      declaration = declarationsIn(sourceFile).find((item) => item.getName() === name)
      if (!declaration) throw new Error(`No source declaration for re-export ${name} in ${sourcePath}`)
    }
    const source = slash(path.relative(sourceRoot, sourcePath))
    const key = `${source}:${name}`
    if (records.has(key)) return records.get(key)
    const emitted = readSource(sourceFile).declarations.filter((item) => item.getName() === name)
    if (!emitted.length) throw new Error(`No emitted declaration for ${name} in ${source}`)
    const record = { name, source, sourceFile, declaration, emitted, exports: new Set(), entries: new Set(), bases: [] }
    records.set(key, record)
    return record
  }

  for (const entry of entries) {
    const file = project.addSourceFileAtPath(path.resolve(packageRoot, entry.source))
    const exports = file.getExportedDeclarations()
    if (!exports.size) throw new Error(`No public exports in ${entry.source}`)
    for (const [name, declarations] of exports) {
      for (const declaration of declarations) {
        const record = recordFor(declaration)
        record.exports.add(name)
        record.entries.add(entry.name)
      }
    }
  }

  // Include local base classes and helper types used by emitted declarations.
  for (const record of records.values()) {
    if (Node.isClassDeclaration(record.declaration)) {
      const base = record.declaration.getBaseClass()
      if (base) record.bases.push(recordFor(base))
    }
    const referencedNames = new Set(
      record.emitted.flatMap((declaration) =>
        declaration.getDescendantsOfKind(SyntaxKind.Identifier).map((identifier) => identifier.getText()),
      ),
    )
    for (const helper of readSource(record.sourceFile).declarations) {
      if (
        !Node.isTypeAliasDeclaration(helper) &&
        !Node.isInterfaceDeclaration(helper) &&
        !Node.isEnumDeclaration(helper)
      )
        continue
      if (!referencedNames.has(helper.getName())) continue
      const original = record.sourceFile.getStatements().find((item) => item.getName?.() === helper.getName())
      if (original) recordFor(original)
    }
  }

  const groups = new Map()
  for (const record of records.values()) {
    record.group = groupFor(packageName, record.source, record.name)
    const group = groups.get(record.group) ?? []
    group.push(record)
    groups.set(record.group, group)
  }
  for (const group of groups.values()) {
    for (const record of group) {
      const duplicate = group.filter((item) => item.name === record.name).length > 1
      record.title = duplicate
        ? `${record.name} (${record.exports.size ? [...record.entries].sort(compare).join(', ') : path.basename(record.source)})`
        : record.name
      record.href = `${record.group}.md#${anchor(record.title)}`
    }
    group.sort((a, b) => compare(a.title, b.title))
  }

  const publicRecords = [...records.values()].filter((record) => record.exports.size)
  const publicNames = [...new Set(publicRecords.flatMap((record) => [...record.exports]))].sort(compare)
  const files = new Map()
  const index = [
    `# ${metadata.name} API\n`,
    `适用版本：\`${metadata.version}\`。`,
    '包含 TypeScript 公开导出、接口声明与使用说明；实现代码、private / protected 成员不属于此 API。\n',
    '## 分类\n',
    ...[...groups.keys()].sort(compare).map((name) => `- [${name}](${name}.md)`),
    `\n## 公开导出（${publicNames.length}）\n`,
    '| 导出 | 入口条件 | 声明 |',
    '| --- | --- | --- |',
    ...publicNames.map((name) => {
      const variants = publicRecords.filter((record) => record.exports.has(name))
      return `| \`${name}\` | ${[...new Set(variants.flatMap((record) => [...record.entries]))].sort(compare).join(', ')} | ${variants.map((record) => `[${record.title}](${record.href})`).join(' · ')} |`
    }),
  ]
  files.set('index.md', index.join('\n') + '\n')
  for (const [name, group] of [...groups].sort(([a], [b]) => compare(a, b))) {
    const imports = [
      ...new Set(
        group.flatMap((record) =>
          readSource(record.sourceFile)
            .file.getImportDeclarations()
            .map((item) => item.getText()),
        ),
      ),
    ].sort(compare)
    const content = [
      `# ${name}\n`,
      '[API 索引](index.md)\n',
      ...group.map((record) => `- [${record.title}](${record.href})`),
      ...(imports.length
        ? ['\n类型引用沿用源码模块名，包的公开导出以索引为准：\n', '```typescript', ...imports, '```']
        : []),
    ]
    for (const record of group) {
      const sourcePath = slash(path.relative(repoRoot, record.sourceFile.getFilePath()))
      const url = `https://github.com/VisActor/VBI/blob/main/${sourcePath}#L${record.declaration.getStartLineNumber()}`
      const defaults = defaultParameters(record.declaration)
      content.push(
        `\n## ${record.title}\n`,
        `源码：[${sourcePath}](${url})\n`,
        record.exports.size
          ? `包导出：${[...record.exports]
              .sort(compare)
              .map((value) => `\`${value}\``)
              .join('、')}\n`
          : '关联声明，未从包入口独立导出。\n',
        ...(record.bases.length
          ? [`继承的公开成员见：${record.bases.map((base) => `[${base.title}](${base.href})`).join('、')}。\n`]
          : []),
        '```typescript',
        record.emitted.map(renderDeclaration).join('\n\n'),
        '```',
        ...(defaults ? ['\n参数默认值（来自源码）：\n', '```typescript', defaults, '```'] : []),
      )
    }
    files.set(`${name}.md`, content.join('\n') + '\n')
  }
  return { name: packageName, exports: publicNames.length, files }
}

export async function buildSkillApi({ repoRoot = repoDirectory, onProgress = () => {} } = {}) {
  const skillRoot = path.join(repoRoot, 'skills/visactor-dashboard')
  onProgress('检查技能目录')
  fs.accessSync(path.join(skillRoot, 'SKILL.md'))

  // Generate all packages before writing; failures leave existing documentation intact.
  const projects = new Map()
  const packages = packageNames.map((name) => {
    onProgress(`生成 ${name} API`)
    return generatePackage(repoRoot, name, projects)
  })
  for (const { name, files } of packages) {
    onProgress(`格式化 ${name} API`)
    files.set('SKILL.md', fs.readFileSync(path.join(repoRoot, 'scripts/skill-api', `${name}.md`), 'utf8'))
    for (const [filename, content] of files) {
      const result = await format(filename, content, formatOptions)
      if (result.errors.length)
        throw new Error(`Cannot format ${filename}: ${result.errors.map((error) => error.message).join('; ')}`)
      files.set(filename, result.code)
    }
  }
  onProgress('写入 API 文档')
  for (const { name, files } of packages) {
    // API pages live only in the all-in-one skill; build:skills packages consumers.
    const directory = path.join(skillRoot, 'api', name)
    fs.rmSync(directory, { recursive: true, force: true })
    fs.mkdirSync(directory, { recursive: true })
    for (const [filename, content] of files) fs.writeFileSync(path.join(directory, filename), content)
  }
  return packages.map(({ name, exports, files }) => ({ name, exports, pages: files.size }))
}

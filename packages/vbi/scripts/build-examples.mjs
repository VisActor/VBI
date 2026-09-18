import fs from 'fs'
import path from 'path'
import {
  BUILDER_ORDER,
  DEFAULT_LOCALE,
  EXAMPLES_DIR,
  findJsonFilesInDir,
  findSubDirs,
  formatBuilderLabel,
  formatDirLabel,
  getDirBuilderKind,
  parseDescription,
  parseTags,
  readJsonFile,
  renderPreview,
} from './example-utils.mjs'

const OUTPUT_DIR = path.resolve(EXAMPLES_DIR, '../../../../apps/website/docs/zh-CN/vbi/examples')

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

const removeDir = (dirPath) => {
  fs.rmSync(dirPath, { recursive: true, force: true })
}

const toMetaFile = (name, label) => ({ type: 'file', name, label })

const toMetaDir = (name, label) => ({
  type: 'dir',
  name,
  label,
  collapsible: true,
  collapsed: false,
})

const getActiveDirs = () =>
  findSubDirs(EXAMPLES_DIR).filter((dir) => findJsonFilesInDir(path.join(EXAMPLES_DIR, dir)).length > 0)

const groupDirsByBuilder = (dirs) =>
  BUILDER_ORDER.map((kind) => ({
    kind,
    dirs: dirs.filter((dir) => getDirBuilderKind(dir) === kind),
  })).filter((group) => group.dirs.length > 0)

const shouldRenderBuilderIndexOnly = (group) =>
  group.kind === 'dashboard' || (group.dirs.length === 1 && group.dirs[0] === group.kind)

function generateTagsHtml(tags) {
  if (!tags.length) {
    return ''
  }
  const badges = tags.map((tag) => `\`${tag}\``).join(' ')
  return `\n\n> 标签: ${badges}\n`
}

function generateDirDocs(dirName, locale = DEFAULT_LOCALE, title = dirName, includeHeader = true) {
  const dirPath = path.join(EXAMPLES_DIR, dirName)
  const jsonFiles = findJsonFilesInDir(dirPath)

  if (!jsonFiles.length) {
    return ''
  }

  let md = includeHeader
    ? `# ${title}\n\nimport { registerDemoConnector } from '@components/demoConnector'\n\n{registerDemoConnector()}\n\n`
    : ''

  for (const file of jsonFiles) {
    const json = readJsonFile(file)
    md += `## ${json.name || path.basename(file, '.json')}\n\n`
    md += `${parseDescription(json, locale)}\n`
    md += `${generateTagsHtml(parseTags(json))}\n\n`
    md += '```tsx preview\n'
    md += `${renderPreview(json)}\n`
    md += '```\n\n'
  }

  return md
}

function resolveExampleLink(group, dirName, exampleName, fromBuilderRoot = false) {
  const base = shouldRenderBuilderIndexOnly(group)
    ? fromBuilderRoot
      ? './'
      : `./${group.kind}`
    : fromBuilderRoot
      ? `./${dirName}`
      : `./${group.kind}/${dirName}`
  return `${base}#${exampleName}`
}

function generateBuilderIndexPage(group, locale = DEFAULT_LOCALE) {
  let md = `# ${formatBuilderLabel(group.kind)}\n\n`
  md += `本页面展示 ${group.kind} builder 的示例。\n\n`

  for (const dir of group.dirs) {
    const examples = findJsonFilesInDir(path.join(EXAMPLES_DIR, dir)).map((file) => {
      const json = readJsonFile(file)
      return {
        name: json.name || path.basename(file, '.json'),
        description: parseDescription(json, locale),
        tags: parseTags(json),
      }
    })

    if (!examples.length) {
      continue
    }

    md += `## ${formatDirLabel(dir)}\n\n| 示例 | 描述 | 标签 |\n| --- | --- | --- |\n`
    md += examples
      .map((example) => {
        const href = resolveExampleLink(group, dir, example.name, true)
        return `| [${example.name}](${href}) | ${example.description} | ${example.tags.join(', ') || '-'} |`
      })
      .join('\n')
    md += '\n\n'
  }

  return md
}

function writeBuilderDocs(group) {
  if (shouldRenderBuilderIndexOnly(group)) {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${group.kind}.mdx`),
      group.dirs
        .map((dir, index) => generateDirDocs(dir, DEFAULT_LOCALE, formatBuilderLabel(group.kind), index === 0))
        .join('\n'),
    )
    console.log(`Generated: ${group.kind}.mdx`)
    return
  }

  const builderDir = path.join(OUTPUT_DIR, group.kind)
  ensureDir(builderDir)

  fs.writeFileSync(path.join(builderDir, 'index.mdx'), generateBuilderIndexPage(group))
  fs.writeFileSync(
    path.join(builderDir, '_meta.json'),
    JSON.stringify(
      group.dirs.map((dir) => toMetaFile(dir, formatDirLabel(dir))),
      null,
      2,
    ),
  )
  console.log(`Generated: ${group.kind}/index.mdx`)

  for (const dir of group.dirs) {
    fs.writeFileSync(path.join(builderDir, `${dir}.mdx`), generateDirDocs(dir))
    console.log(`Generated: ${group.kind}/${dir}.mdx`)
  }
}

function generateDocs() {
  console.log('Building docs from JSON files...')

  const requestedBuilder = process.argv.find((arg) => arg.startsWith('--builder='))?.split('=')[1]
  if (requestedBuilder && !BUILDER_ORDER.includes(requestedBuilder)) {
    throw new Error(`Unknown builder: ${requestedBuilder}`)
  }
  if (requestedBuilder) {
    removeDir(path.join(OUTPUT_DIR, requestedBuilder))
    fs.rmSync(path.join(OUTPUT_DIR, `${requestedBuilder}.mdx`), { force: true })
  } else {
    removeDir(OUTPUT_DIR)
  }
  ensureDir(OUTPUT_DIR)

  const groups = groupDirsByBuilder(getActiveDirs()).filter(
    (group) => !requestedBuilder || group.kind === requestedBuilder,
  )
  const metaPath = path.join(OUTPUT_DIR, '_meta.json')
  const nextMeta = groups.map((group) =>
    shouldRenderBuilderIndexOnly(group)
      ? toMetaFile(group.kind, formatBuilderLabel(group.kind))
      : toMetaDir(group.kind, formatBuilderLabel(group.kind)),
  )
  const previousMeta = requestedBuilder && fs.existsSync(metaPath) ? readJsonFile(metaPath) : []
  const mergedMeta = previousMeta.map((entry) => nextMeta.find((next) => next.name === entry.name) ?? entry)
  mergedMeta.push(...nextMeta.filter((next) => !previousMeta.some((entry) => entry.name === next.name)))

  fs.writeFileSync(metaPath, JSON.stringify(mergedMeta, null, 2))
  let totalExamples = 0
  for (const group of groups) {
    writeBuilderDocs(group)
    totalExamples += group.dirs.reduce((sum, dir) => sum + findJsonFilesInDir(path.join(EXAMPLES_DIR, dir)).length, 0)
  }

  console.log(`\n✅ Successfully generated docs for ${totalExamples} examples in ${groups.length} builder groups`)
}

generateDocs()

import fs from 'node:fs'
import path from 'node:path'
import { repoDir, readText, ensureCleanDir, writeText, writeJson } from './shared.mjs'

const sourceDir = path.resolve(repoDir, 'docs/adr/packages/vbi-react/examples-source')
const manifestPath = path.join(sourceDir, 'manifest.json')
const outputDir = path.resolve(repoDir, 'apps/website/docs/zh-CN/vbi-react/examples')

function resolveSourceFile(slug) {
  const mdxFile = path.join(sourceDir, `${slug}.mdx`)
  const mdFile = path.join(sourceDir, `${slug}.md`)
  if (fs.existsSync(mdxFile)) {
    return { sourceFile: mdxFile, extension: '.mdx' }
  }
  if (fs.existsSync(mdFile)) {
    return { sourceFile: mdFile, extension: '.md' }
  }
  throw new Error(`[build-examples] missing source file for ${slug}`)
}

function buildIndexPage(items) {
  const grouped = new Map()
  items.forEach((item) => {
    const group = item.group ?? '其他'
    if (!grouped.has(group)) {
      grouped.set(group, [])
    }
    grouped.get(group).push(item)
  })

  const sections = Array.from(grouped.entries())
    .map(([group, groupItems]) => {
      const links = groupItems.map((item) => `- [${item.label}](./${item.slug})`).join('\n')
      return `## ${group}\n\n${links}`
    })
    .join('\n\n')

  return `# 示例总览

这里的示例分成三类：先理解 hooks、再理解单个组件、最后看完整页面。\`vbi-react\` 的组件保持轻量可组合，完整工作台布局和页面级样式请看 Starter Demo。

${sections}

Starter Demo 展示字段面板、图表工作区、筛选面板、summary 和 DSL snapshot 如何围绕同一个 builder 协作；它不是 \`BuilderLayout\` 的最小示例，而是一个产品级组合页。
`
}

function main() {
  const manifest = JSON.parse(readText(manifestPath))
  ensureCleanDir(outputDir)

  manifest.forEach((item) => {
    const { sourceFile, extension } = resolveSourceFile(item.slug)
    writeText(path.join(outputDir, `${item.slug}${extension}`), readText(sourceFile))
  })

  writeText(path.join(outputDir, 'index.md'), buildIndexPage(manifest))
  writeJson(path.join(outputDir, '_meta.json'), [
    { type: 'file', name: 'index', label: '总览' },
    ...manifest.map((item) => ({ type: 'file', name: item.slug, label: item.label })),
  ])

  console.log(`[build-examples] generated ${manifest.length} example pages in ${outputDir}`)
}

main()

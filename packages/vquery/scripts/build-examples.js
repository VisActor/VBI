import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const examplesDir = path.resolve(__dirname, '../tests/examples')
const outputDir = path.resolve(__dirname, '../../../apps/website/docs/zh-CN/vquery/examples')

// Map<category, Array<{name, description, content}>>
const examplesMap = new Map()

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
    const categoryTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    const outputFile = path.join(outputDir, `${category}.mdx`)

    const outputParentDir = path.dirname(outputFile)
    if (!fs.existsSync(outputParentDir)) {
      fs.mkdirSync(outputParentDir, { recursive: true })
    }

    let md = `# ${categoryTitle}\n\n`

    const examples = examplesMap.get(category)
    for (const example of examples) {
      const { json, fileName } = example
      const title = fileName.replace('.json', '')

      md += `## ${title}\n\n`

      if (json.description) {
        md += `${json.description}\n\n`
      }

      md += '```tsx preview \n'
      md += "import { VQueryResultRender } from '@components'\n\n"
      md += `export default () => {\n`
      const jsonString = JSON.stringify(json, null, 2)
      const indentedJson = jsonString
      md += `  const vqueryConfig = ${indentedJson}\n\n`
      md += `  return <VQueryResultRender vqueryConfig={vqueryConfig} />\n`
      md += `}\n`
      md += '```\n\n'
    }

    fs.writeFileSync(outputFile, md, 'utf-8')
    console.log(`Generated documentation for ${category} at ${outputFile}`)
  }
}

function generateMeta() {
  const meta = [
    { type: 'dir', name: 'select', label: 'Select' },
    { type: 'file', name: 'where', label: 'Where' },
    { type: 'file', name: 'having', label: 'Having' },
    { type: 'file', name: 'groupBy', label: 'GroupBy' },
    { type: 'file', name: 'orderBy', label: 'OrderBy' },
    { type: 'file', name: 'limit', label: 'Limit' },
  ]
  const metaPath = path.join(outputDir, '_meta.json')
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8')
  console.log(`Generated _meta.json at ${metaPath}`)
}

console.log('Building documentation...')
scanDir(examplesDir)
generateDocs()
generateMeta()
console.log('Done.')

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const examplesDir = path.resolve(__dirname, '../tests/examples')
const outputDir = path.resolve(__dirname, '../../../apps/website/docs/zh-CN/vseed/examples')

// We will process 'chartType' and 'features' separately as top-level sections
const sections = ['chartType', 'features']

// Map<section, Map<category, Array<{fileName, json}>>>
const examplesMap = new Map()

function scanDir(dir, section, relativePath = '') {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`)
    return
  }

  const files = fs.readdirSync(dir, { withFileTypes: true })

  // Sort files/dirs to ensure consistent order
  files.sort((a, b) => a.name.localeCompare(b.name))

  for (const file of files) {
    const fullPath = path.join(dir, file.name)

    if (file.isDirectory()) {
      // For chartType, immediate subdirs are categories (area, bar, etc.)
      // For features, it might be nested (analysis/sort, etc.)
      // We recurse, but we need to track the category logic.
      // Current logic assumes leaf JSONs belong to the directory they are in.
      scanDir(fullPath, section, path.join(relativePath, file.name))
    } else if (file.name.endsWith('.json')) {
      processJson(fullPath, section, relativePath)
    }
  }
}

function processJson(jsonPath, section, relativePath) {
  try {
    const content = fs.readFileSync(jsonPath, 'utf-8')
    const json = JSON.parse(content)

    if (!json.name || !json.description || !json.vseed) {
      console.warn(`Skipping ${jsonPath}: Missing name, description, or vseed`)
      return
    }

    // relativePath corresponds to the category path (e.g. "area" or "analysis/sort")
    const category = relativePath
    if (!category) return

    if (!examplesMap.has(section)) {
      examplesMap.set(section, new Map())
    }
    const sectionMap = examplesMap.get(section)

    if (!sectionMap.has(category)) {
      sectionMap.set(category, [])
    }

    sectionMap.get(category).push({
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

  for (const section of sections) {
    const sectionMap = examplesMap.get(section)
    if (!sectionMap) continue

    const sectionOutputDir = path.join(outputDir, section)
    if (!fs.existsSync(sectionOutputDir)) {
      fs.mkdirSync(sectionOutputDir, { recursive: true })
    }

    const categories = Array.from(sectionMap.keys()).sort()

    for (const category of categories) {
      // category could be "area" or "analysis/sort"
      // If "analysis/sort", we need to ensure "analysis" dir exists and create "sort.mdx" inside it
      const categoryParts = category.split(path.sep)
      const categoryName = categoryParts[categoryParts.length - 1]

      // Title logic
      const categoryTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)

      const outputFile = path.join(sectionOutputDir, `${category}.mdx`)
      const outputParentDir = path.dirname(outputFile)

      if (!fs.existsSync(outputParentDir)) {
        fs.mkdirSync(outputParentDir, { recursive: true })
      }

      let md = `# ${categoryTitle}\n\n`

      const examples = sectionMap.get(category)
      for (const example of examples) {
        const { json, fileName } = example
        const title = json.name || fileName.replace('.json', '')

        md += `## ${title}\n\n`

        if (json.description) {
          md += `${json.description}\n\n`
        }

        md += '```tsx preview\n'
        md += "import { VSeedRender } from '@components'\n\n"
        md += `export default () => {\n`
        const vseedString = JSON.stringify(json.vseed, null, 2)
        md += `  const vseedConfig = ${vseedString}\n\n`
        md += `  return <VSeedRender vseed={vseedConfig} />\n`
        md += `}\n`
        md += '```\n\n'
      }

      fs.writeFileSync(outputFile, md, 'utf-8')
      console.log(`Generated documentation for ${section}/${category} at ${outputFile}`)
    }
  }
}

function generateMeta() {
  // Helper to recursively build meta structure
  function buildMeta(dir) {
    if (!fs.existsSync(dir)) return []

    const items = fs.readdirSync(dir, { withFileTypes: true })
    const meta = []

    // Filter out _meta.json itself
    const validItems = items.filter((item) => item.name !== '_meta.json' && !item.name.startsWith('.'))

    // Sort: directories first, then files
    validItems.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1
      if (!a.isDirectory() && b.isDirectory()) return 1
      return a.name.localeCompare(b.name)
    })

    for (const item of validItems) {
      if (item.isDirectory()) {
        // Check if this directory contains sub-items that need recursion
        // Recurse first to generate inner _meta.json
        const subDir = path.join(dir, item.name)
        buildMeta(subDir)

        meta.push({
          type: 'dir',
          name: item.name,
          label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          collapsed: true,
          // We might want collapsed: true by default
        })
      } else if (item.isFile() && item.name.endsWith('.mdx')) {
        const name = item.name.replace('.mdx', '')
        if (name === 'index') continue

        meta.push({
          type: 'file',
          name: name,
          label: name.charAt(0).toUpperCase() + name.slice(1),
        })
      }
    }

    // Specific sorting logic for chartTypes if needed (like the previous implementation)
    if (dir.endsWith('chartType')) {
      const chartTypeOrder = [
        'table',
        'pivotTable',
        'line',
        'column',
        'columnPercent',
        'columnParallel',
        'bar',
        'barPercent',
        'barParallel',
        'area',
        'areaPercent',
        'scatter',
        'dualAxis',
        'rose',
        'roseParallel',
        'pie',
        'donut',
        'radar',
        'raceScatter',
        'raceLine',
        'raceBar',
        'raceColumn',
        'racePie',
        'raceDonut',
        'treeMap',
        'sunburst',
        'circlePacking',
        'hierarchySankey',
        'sankey',
        'heatmap',
        'funnel',
        'boxPlot',
        'histogram',
      ]

      meta.sort((a, b) => {
        const normalize = (name) => (name.toLowerCase() === 'boxplot' ? 'boxPlot' : name)
        const indexA = chartTypeOrder.indexOf(normalize(a.name))
        const indexB = chartTypeOrder.indexOf(normalize(b.name))

        if (indexA !== -1 && indexB !== -1) return indexA - indexB
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        return 0
      })
    }

    if (meta.length > 0) {
      fs.writeFileSync(path.join(dir, '_meta.json'), JSON.stringify(meta, null, 2), 'utf-8')
      console.log(`Generated _meta.json at ${path.join(dir, '_meta.json')}`)
    }

    return meta
  }

  // Generate for root examples dir (which contains chartType and features dirs)
  buildMeta(outputDir)
}

console.log('Building examples documentation...')

// Clean output directory first? Maybe safer not to wipe everything if mixed content exists,
// but for generated docs it is usually safe.
// Let's rely on overwriting.

for (const section of sections) {
  scanDir(path.join(examplesDir, section), section)
}

generateDocs()
generateMeta()
console.log('Done.')

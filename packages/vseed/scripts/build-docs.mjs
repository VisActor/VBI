import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Project, SyntaxKind } from 'ts-morph'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ==================================================================================
// Configuration
// ==================================================================================
const CONFIG = {
  outputDir: path.resolve(__dirname, '../../../apps/website/docs/zh-CN/vseed/option'),
  chartTypesDir: path.resolve(__dirname, '../src/types/chartType'),
  tsConfigPath: path.resolve(__dirname, '../tsconfig.json'),
}

/**
 * Documentation Generator Class
 * Handles the generation of markdown documentation from TypeScript interfaces.
 */
export class DocsGenerator {
  constructor(config) {
    this.config = config
    this.project = new Project({
      tsConfigFilePath: config.tsConfigPath,
    })
  }

  /**
   * Main execution method
   */
  async run() {
    console.log('Starting documentation generation...')

    this.cleanOutputDir()
    this.ensureOutputDir()

    const chartTypes = this.getChartTypes()
    console.log(`Found ${chartTypes.length} chart types: ${chartTypes.join(', ')}`)

    for (const chartName of chartTypes) {
      this.processChartType(chartName)
    }

    console.log('Generating meta configuration...')
    this.generateMetaJson(this.config.outputDir)

    console.log('Documentation generation complete.')
    console.log('Output directory:', this.config.outputDir)
  }

  /**
   * Clean up existing output directory
   */
  cleanOutputDir() {
    if (fs.existsSync(this.config.outputDir)) {
      fs.rmSync(this.config.outputDir, { recursive: true, force: true })
    }
  }

  /**
   * Ensure output directory exists
   */
  ensureOutputDir() {
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true })
    }
  }

  /**
   * Get list of chart types from the source directory
   */
  getChartTypes() {
    if (!fs.existsSync(this.config.chartTypesDir)) {
      console.warn(`Chart types directory not found: ${this.config.chartTypesDir}`)
      return []
    }
    return fs
      .readdirSync(this.config.chartTypesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
  }

  /**
   * Process a single chart type
   */
  processChartType(chartName) {
    const inputFile = path.join(this.config.chartTypesDir, chartName, `${chartName}.ts`)
    if (!fs.existsSync(inputFile)) {
      console.warn(`Skipping ${chartName}: ${inputFile} does not exist.`)
      return
    }

    this.project.addSourceFileAtPath(inputFile)
    const sourceFile = this.project.getSourceFileOrThrow(inputFile)

    // Find the main interface for the chart
    // Convention: Chart name "bar" -> Interface "Bar"
    const interfaceName = chartName.charAt(0).toUpperCase() + chartName.slice(1)
    let chartInterface = sourceFile.getInterface(interfaceName)

    // Fallback: Use first exported interface if exact match not found
    if (!chartInterface) {
      const exportedInterfaces = sourceFile.getInterfaces().filter((i) => i.isExported())
      if (exportedInterfaces.length > 0) {
        chartInterface = exportedInterfaces[0]
        console.warn(
          `Interface "${interfaceName}" not found. Using "${chartInterface.getName()}" for chart type "${chartName}".`,
        )
      }
    }

    if (!chartInterface) {
      console.error(`No exported interface found in ${inputFile}`)
      return
    }

    // Generate markdown content
    let content = this.generateMarkdown(chartInterface)

    // Process properties of the interface
    const props = chartInterface.getProperties()
    for (const prop of props) {
      const propName = prop.getName()
      // Skip symbol properties
      if (propName.startsWith('[Symbol')) continue

      const propMarkdown = this.generateMarkdown(prop, 2)
      if (propMarkdown) {
        content += '\n' + propMarkdown
      }
    }

    const mdPath = path.join(this.config.outputDir, `${chartName}.md`)
    fs.writeFileSync(mdPath, content, 'utf-8')
    console.log(`Generated: ${mdPath}`)
  }

  /**
   * Generate markdown for a node (Interface or Property)
   */
  generateMarkdown(node, level = 1, visited = new Set(), optionalInSomeBranch = false) {
    const isInterface = node.getKind() === SyntaxKind.InterfaceDeclaration
    const isProperty =
      node.getKind() === SyntaxKind.PropertySignature || node.getKind() === SyntaxKind.PropertyDeclaration

    if (!isInterface && !isProperty) return ''

    const name = node.getName()
    if (name.startsWith('[Symbol')) return ''

    const visitKey = `${node.getSourceFile().getFilePath()}:${node.getStart()}`
    const visitedNames = new Set([...visited].filter((item) => !item.includes(':')))

    // Prevent recursion loops and excessive nesting
    if (level > 10 || visited.has(visitKey)) return ''
    // Specific logic to stop recursion for children of measures
    if (visitedNames.has('measures') && visitedNames.has('children')) return ''

    const nextVisited = new Set(visited)
    nextVisited.add(visitKey)
    nextVisited.add(name)

    const jsDocs = node.getJsDocs()
    const tags = this.parseJsDocTags(jsDocs)

    // If it's a property, try to merge tags from its type definition
    if (isProperty) {
      this.mergeTypeTags(node, tags)
    }

    let markdown = `${'#'.repeat(level)} ${name}\n\n`

    if (isProperty) {
      const type = this.formatType(node)
      markdown += `**Type:** \`${optionalInSomeBranch && !/\bundefined\b/.test(type) ? `${type} | undefined` : type}\`\n\n`
    }

    // Add documentation tags (description, example, etc.)
    markdown += this.formatTags(tags)

    // Recursive generation for object properties
    if (isProperty) {
      const subMarkdown = this.generateSubProperties(node, level, nextVisited)
      if (subMarkdown) {
        markdown += '\n' + subMarkdown
      }
    }

    return markdown
  }

  /**
   * Merge JSDoc tags from the type definition of a property
   */
  mergeTypeTags(node, tags) {
    const propType = node.getType().getNonNullableType()
    const symbolsToCheck = [propType.getSymbol(), propType.getAliasSymbol()].filter(Boolean)

    symbolsToCheck.forEach((sym) => {
      sym.getDeclarations().forEach((decl) => {
        if (decl.getJsDocs) {
          const typeTags = this.parseJsDocTags(decl.getJsDocs())
          Object.keys(typeTags).forEach((tagName) => {
            if (!tags[tagName]) tags[tagName] = []
            typeTags[tagName].forEach((val) => {
              // Avoid duplicates
              if (!tags[tagName].includes(val)) tags[tagName].push(val)
            })
          })
        }
      })
    })
  }

  /**
   * Format the type string for display
   */
  formatType(node) {
    const propType = node.getType()

    // Special handling for array of imported types (e.g. FunnelDimension[] which is alias for PieDimension[])
    if (propType.isArray()) {
      const elementType = propType.getArrayElementType()
      const elementText = this.formatTypeFromType(elementType, node)
      return `${elementText}[]`
    }

    return this.formatTypeFromType(propType, node)
  }

  formatTypeFromType(type, node) {
    // 1. Handle union types with all literals
    if (type.isUnion() && type.getUnionTypes().every((t) => t.isLiteral())) {
      return type
        .getUnionTypes()
        .map((t) => t.getText())
        .join(' | ')
    }

    // 2. Handle type aliases (e.g. FunnelDimension -> PieDimension)
    const aliasSymbol = type.getAliasSymbol()
    if (aliasSymbol) {
      return aliasSymbol.getName()
    }

    // 3. Handle direct symbol references (e.g. Interface types)
    const symbol = type.getSymbol()
    if (symbol) {
      return symbol.getName()
    }

    // 4. Fallback to default text representation, cleaning up import paths if they leak
    let text = type.getText(node)

    // Clean up import("...") patterns if they still appear
    text = text.replace(/import\(".*?"\)\./g, '')

    return text.replace(/\n/g, ' ').replace(/\s+/g, ' ')
  }

  /**
   * Format JSDoc tags into Markdown
   */
  formatTags(tags) {
    let markdown = ''
    const tagMappings = [
      { key: 'recommend', title: '推荐', type: 'info' },
      { key: 'encoding', title: '编码映射', type: 'info' },
      { key: 'description', title: '描述', type: 'note' },
      { key: 'info', title: 'Info', type: 'info' },
      { key: 'tip', title: 'Tip', type: 'tip' },
      { key: 'note', title: 'Note', type: 'note' },
      { key: 'warning', title: 'Warning', type: 'warning' },
      { key: 'danger', title: 'Danger', type: 'danger' },
    ]

    tagMappings.forEach(({ key, title, type }) => {
      const content = (tags[key] || []).join('\n\n').replace(/\n/g, '\n\n').replace(/-/g, '\\-')
      if (content) {
        markdown += `:::${type}{title=${title}}\n${content}\n\n:::\n\n`
      }
    })

    const example = (tags.example || []).join('\n\n').replace(/\n/g, '\n').replace(/-/g, '\\-')
    if (example) {
      markdown += `**示例**\n${example}\n\n\n\n`
    }

    return markdown
  }

  /**
   * Generate markdown for sub-properties of an object type
   */
  generateSubProperties(node, level, visited) {
    const propType = node.getType()
    const typesToProcess = this.extractObjectTypes(propType)

    if (typesToProcess.length === 0) return ''

    const allProperties = typesToProcess.flatMap((t) => t.getApparentProperties())

    const propertyDeclarations = allProperties
      .flatMap((p) => p.getDeclarations() || [])
      .filter(
        (d) => d && (d.getKind() === SyntaxKind.PropertySignature || d.getKind() === SyntaxKind.PropertyDeclaration),
      )
      // An optional never marks a mutually exclusive branch, not a documented value.
      .filter((d) => !d.getType().getNonNullableType().isNever())

    // Deduplicate properties by name
    const uniqueDeclarations = [...new Map(propertyDeclarations.map((item) => [item.getName(), item])).values()]

    if (uniqueDeclarations.length === 0) return ''

    return uniqueDeclarations
      .map((subProp) => {
        const name = subProp.getName()
        // Shared fields can be optional in one union branch even if the chosen declaration is required.
        const branchProperties = typesToProcess.map((type) => type.getProperty(name))
        const optionalInSomeBranch =
          branchProperties.every(Boolean) && branchProperties.some((property) => property.isOptional())
        return this.generateMarkdown(subProp, level + 1, new Set(visited), optionalInSomeBranch)
      })
      .join('')
  }

  /**
   * Helper to extract object types from unions/arrays
   */
  extractObjectTypes(type) {
    if (!type) return []
    if (type.isIntersection()) return [type]
    if (type.isObject() && !type.isArray() && !type.isUnion()) return [type]
    if (type.isUnion()) return type.getUnionTypes().flatMap((t) => this.extractObjectTypes(t))
    if (type.isArray()) return this.extractObjectTypes(type.getArrayElementType())
    return []
  }

  /**
   * Parse JSDoc tags into a structured object
   */
  parseJsDocTags(jsDocs) {
    const tags = {}
    jsDocs.forEach((jsDoc) => {
      const description = jsDoc.getDescription()
      if (description) tags.description = [description.trim()]

      jsDoc.getTags().forEach((tag) => {
        const tagName = tag.getTagName()
        const tagText = tag.getCommentText() || ''
        if (!tags[tagName]) tags[tagName] = []
        tags[tagName].push(tagText.trim())
      })
    })
    return tags
  }

  /**
   * Recursive function to generate _meta.json for documentation sidebar
   */
  generateMetaJson(directory) {
    if (!fs.existsSync(directory)) return

    // 1. Recurse into subdirectories first (bottom-up)
    const entries = fs.readdirSync(directory, { withFileTypes: true })
    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        this.generateMetaJson(path.join(directory, entry.name))
      }
    })

    // 2. Process the current directory
    const subdirectories = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name))
    const dirsForMeta = []
    const filesForMeta = []

    entries.forEach((entry) => {
      if (['_meta.json', 'index.md', 'index.mdx'].includes(entry.name)) return

      if (entry.isDirectory()) {
        dirsForMeta.push({ type: 'dir', name: entry.name, label: `${entry.name} `, collapsed: true })
      } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
        const name = entry.name.replace(/\.mdx?$/, '')
        // Only add file if no directory with same name exists (directory takes precedence)
        if (!subdirectories.has(name)) {
          filesForMeta.push({ type: 'file', name, label: `${name} ` })
        }
      }
    })

    // 3. Sort alphabetically
    const sorter = (a, b) => a.name.localeCompare(b.name)
    dirsForMeta.sort(sorter)
    filesForMeta.sort(sorter)

    const meta = [...filesForMeta, ...dirsForMeta]

    // 4. Write _meta.json
    if (meta.length > 0) {
      fs.writeFileSync(path.join(directory, '_meta.json'), JSON.stringify(meta, null, 2))
    }
  }
}

// ==================================================================================
// Entry Point
// ==================================================================================

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const generator = new DocsGenerator(CONFIG)
  generator.run().catch((err) => {
    console.error('Failed to generate documentation:', err)
    process.exit(1)
  })
}

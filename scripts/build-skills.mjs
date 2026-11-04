import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { buildSkillApi, skillApiStageCount } from './build-skill-api.mjs'

const repoDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const scenes = ['light-dashboard', 'map2d-dashboard', 'chart-editor', 'map3d-dashboard']
const sharedResources = new Map([
  ['data-analysis', 'references/data-analysis-'],
  ['deep-analysis', 'references/deep-analysis-'],
  ['visual-query', 'references/visual-query-'],
  ['server-runtime', 'server-runtime/'],
  ['assets', 'assets/'],
])
const excludedDirectories = new Set(['node_modules', '.git', '.turbo', 'coverage', 'dist', '__pycache__'])
const archiveTime = new Date('1980-01-01T00:00:00Z')
const slash = (value) => value.split(path.sep).join('/')

function mapMarkdown(content, transform) {
  let fence = ''
  return content
    .split('\n')
    .map((line) => {
      const marker = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/)
      if (marker) {
        if (!fence) fence = marker[1]
        else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = ''
        return line
      }
      return fence ? line : transform(line)
    })
    .join('\n')
}

function validateAnchors(resources) {
  const anchors = new Map()
  for (const [file, content] of resources) {
    if (!file.endsWith('.md')) continue
    const ids = new Set()
    mapMarkdown(content.toString(), (line) => {
      const heading = line.match(/^#{1,6} +(.+?)(?: +#+)?$/)
      if (heading) {
        const slug = heading[1]
          .toLowerCase()
          .replace(/[^\p{L}\p{N}_ -]/gu, '')
          .replaceAll(' ', '-')
        let id = slug
        let suffix = 0
        while (ids.has(id)) id = `${slug}-${++suffix}`
        ids.add(id)
      }
      return line
    })
    anchors.set(file, ids)
  }
  for (const [file, content] of resources) {
    if (!file.endsWith('.md')) continue
    mapMarkdown(content.toString(), (line) => {
      for (const [, href] of line.matchAll(/\]\(([^)\s]+)\)/g)) {
        if (/^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//')) continue
        const [resource, fragment] = href.split('#')
        const target = resource ? path.normalize(path.join(path.dirname(file), resource)) : file
        if (fragment && target.endsWith('.md') && !anchors.get(target).has(decodeURIComponent(fragment)))
          throw new Error(`Missing Markdown anchor in ${file}: ${href}`)
      }
      return line
    })
  }
}

function collectFiles(source, destination, files) {
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const name = entry.name
    if (
      excludedDirectories.has(name) ||
      name === '.DS_Store' ||
      (name.startsWith('.env') && name !== '.env.example') ||
      name.endsWith('.zip') ||
      name.endsWith('.local') ||
      /\.log(?:\.|$)/.test(name)
    )
      continue
    const file = path.join(source, name)
    const target = path.join(destination, name)
    if (entry.isDirectory()) collectFiles(file, target, files)
    else if (entry.isFile()) files.set(file, target)
    else throw new Error(`Unsupported skill resource: ${file}`)
  }
}

function rewriteLinks(content, source, destination, files, sourceRoot) {
  return mapMarkdown(content, (line) =>
    line.replace(/\]\(([^)\s]+)\)/g, (link, href) => {
      if (href.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//')) return link
      const separator = href.indexOf('#')
      const resource = separator === -1 ? href : href.slice(0, separator)
      const fragment = separator === -1 ? '' : href.slice(separator)
      const resolved = path.resolve(path.dirname(source), resource)
      const owner = resourceOwner(sourceRoot, source)
      const dependency = resourceOwner(sourceRoot, resolved)
      if (scenes.includes(dependency) && owner !== dependency) {
        throw new Error(`Forbidden skill dependency: ${owner} → ${dependency} in ${source}: ${href}`)
      }
      const target = resolved === path.join(sourceRoot, 'SKILL.md') ? 'SKILL.md' : files.get(resolved)
      if (!target) throw new Error(`Unbundled skill reference in ${source}: ${href}`)
      return `](${slash(path.relative(path.dirname(destination), target))}${fragment})`
    }),
  )
}

function resourceOwner(sourceRoot, file) {
  const relative = slash(path.relative(sourceRoot, file))
  const [group, name] = relative.split('/')
  if (group === 'scenarios' && scenes.includes(name)) return name
  for (const [owner, prefix] of sharedResources) {
    if (relative.startsWith(prefix)) return owner
  }
  return 'shared'
}

function validateEntry(content, name) {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (
    !frontmatter ||
    !new RegExp(`^name: *(['"]?)${name}\\1 *$`, 'm').test(frontmatter[1]) ||
    !/^description: *\S.*$/m.test(frontmatter[1])
  )
    throw new Error(`Invalid SKILL.md for ${name}: expected matching name and nonempty description`)
}

function prepareSkill(sourceRoot, name, staging, modules) {
  const files = new Map()
  collectFiles(path.join(sourceRoot, 'scenarios', name), '.', files)
  collectFiles(path.join(sourceRoot, 'api'), 'api', files)
  collectFiles(path.join(sourceRoot, 'assets'), 'assets', files)
  collectFiles(path.join(sourceRoot, 'server-runtime'), 'server-runtime', files)
  collectFiles(path.join(sourceRoot, 'references'), 'references', files)
  const destinations = new Set()
  for (const [source, destination] of files) {
    if (
      destination.split(path.sep).length > 2 ||
      (path.basename(destination) === 'SKILL.md' && destination !== 'SKILL.md')
    )
      throw new Error(`Skill resources must be flat with one SKILL.md: ${source}`)
    if (destinations.has(destination)) throw new Error(`Conflicting skill resource: ${name}/${slash(destination)}`)
    destinations.add(destination)
  }
  for (const required of [
    'SKILL.md',
    'api/vbi-guide.md',
    'api/vquery-guide.md',
    'api/vseed-guide.md',
    'references/data-analysis-guide.md',
    'references/deep-analysis-interaction.md',
    'references/visual-query-guide.md',
  ]) {
    if (!destinations.has(required)) {
      throw new Error(`Missing ${required} for ${name}`)
    }
  }
  const resources = new Map()
  for (const [source, destination] of files) {
    let content = fs.readFileSync(source)
    if (source.endsWith('.md')) content = rewriteLinks(content.toString(), source, destination, files, sourceRoot)
    if (destination === 'SKILL.md') {
      validateEntry(content, name)
      if (/^## 通用模块\r?$/m.test(content)) throw new Error(`Duplicate shared modules in ${source}`)
      content = `${content.trimEnd()}\n\n${rewriteLinks(modules, path.join(sourceRoot, 'SKILL.md'), destination, files, sourceRoot)}`
    }
    resources.set(destination, content)
  }
  validateAnchors(resources)
  const entries = []
  for (const [destination, content] of resources) {
    const relative = path.join(name, destination)
    const target = path.join(staging, relative)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, content, { mode: 0o644 })
    fs.utimesSync(target, archiveTime, archiveTime)
    entries.push(slash(relative))
  }
  const archive = path.join(staging, `${name}.zip`)
  // Sorted paths, normalized timestamps and no extra attributes keep rebuilds reproducible.
  execFileSync('zip', ['-X', '-q', archive, '-@'], {
    cwd: staging,
    input: entries.sort().join('\n') + '\n',
    env: { ...process.env, TZ: 'UTC' },
  })
  return { name, archive, files: entries.length }
}

export async function buildSkills({ repoRoot = repoDirectory, check = false, onProgress = () => {} } = {}) {
  let step = 0
  const total = skillApiStageCount + scenes.length + 1
  const progress = (message) => onProgress({ step: ++step, total, message })
  const sourceRoot = path.resolve(repoRoot, 'skills/visactor-dashboard')
  const entry = fs.readFileSync(path.join(sourceRoot, 'SKILL.md'), 'utf8')
  validateEntry(entry, 'visactor-dashboard')
  const modules = entry.match(/^## 通用模块\r?\n[\s\S]+$/m)
  if (!modules) throw new Error('Missing shared modules in visactor-dashboard/SKILL.md')
  await buildSkillApi({ repoRoot, onProgress: progress })
  const staging = fs.mkdtempSync(path.join(os.tmpdir(), 'vbi-skills-'))
  try {
    // Prepare all archives before publishing, so invalid inputs preserve previous builds.
    const archives = scenes.map((name) => {
      progress(`检查资源并打包 ${name}.zip`)
      return prepareSkill(sourceRoot, name, staging, modules[0])
    })
    progress(`${check ? '校验' : '写入'}分发产物 dist/skills`)
    const output = path.resolve(repoRoot, 'dist/skills')
    const expected = new Set(archives.map(({ name }) => `${name}.zip`))
    const obsolete = fs.existsSync(output)
      ? fs
          .readdirSync(output, { withFileTypes: true })
          .filter((entry) => entry.isFile() && entry.name.endsWith('.zip') && !expected.has(entry.name))
          .map((entry) => entry.name)
      : []
    if (check) {
      const stale = archives
        .filter(({ name, archive }) => {
          const target = path.join(output, `${name}.zip`)
          return !fs.existsSync(target) || !fs.readFileSync(target).equals(fs.readFileSync(archive))
        })
        .map(({ name }) => `${name}.zip`)
      if (stale.length || obsolete.length)
        throw new Error(
          `Skill artifacts are stale or missing: ${[...stale, ...obsolete].join(', ')}. Run pnpm build:skills.`,
        )
      return archives.map(({ name, files }) => ({ name, archive: path.join(output, `${name}.zip`), files }))
    }
    fs.mkdirSync(output, { recursive: true })
    const results = archives.map(({ name, archive, files }) => {
      const target = path.join(output, `${name}.zip`)
      fs.copyFileSync(archive, target)
      return { name, archive: target, files }
    })
    for (const name of obsolete) fs.unlinkSync(path.join(output, name))
    return results
  } finally {
    fs.rmSync(staging, { recursive: true, force: true })
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const packages = await buildSkills({
    repoRoot: process.cwd(),
    check: process.argv.includes('--check'),
    onProgress: ({ step, total, message }) => console.log(`[build:skills] [${step}/${total}] ${message}`),
  })
  for (const { name, archive, files } of packages)
    console.log(`[build:skills] 完成 ${name}: ${files} files → ${archive}`)
}

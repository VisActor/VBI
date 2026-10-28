import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { buildSkillApi, skillApiStageCount } from './build-skill-api.mjs'

const repoDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const scenes = ['light-dashboard', 'map2d-dashboard', 'chart-editor', 'map3d-dashboard']
const sharedReferences = ['data-analysis', 'deep-analysis', 'visual-query', 'server-runtime']
const excludedDirectories = new Set(['node_modules', '.git', '.turbo', 'coverage', 'dist', '__pycache__'])
const archiveTime = new Date('1980-01-01T00:00:00Z')
const slash = (value) => value.split(path.sep).join('/')

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
  return content.replace(/\]\(([^)\s]+)\)/g, (link, href) => {
    if (href.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//')) return link
    const separator = href.indexOf('#')
    const resource = separator === -1 ? href : href.slice(0, separator)
    const fragment = separator === -1 ? '' : href.slice(separator)
    const resolved = path.resolve(path.dirname(source), resource)
    const owner = resourceOwner(sourceRoot, source)
    const dependency = resourceOwner(sourceRoot, resolved)
    if (
      scenes.includes(dependency) &&
      owner !== dependency &&
      (scenes.includes(owner) || sharedReferences.includes(owner))
    ) {
      throw new Error(`Forbidden skill dependency: ${owner} → ${dependency} in ${source}: ${href}`)
    }
    const target = resolved === path.join(sourceRoot, 'SKILL.md') ? 'SKILL.md' : files.get(resolved)
    if (!target) throw new Error(`Unbundled skill reference in ${source}: ${href}`)
    return `](${slash(path.relative(path.dirname(destination), target))}${fragment})`
  })
}

function resourceOwner(sourceRoot, file) {
  const [group, name] = path.relative(sourceRoot, file).split(path.sep)
  if (group === 'scenarios' && scenes.includes(name)) return name
  if (group === 'references' && sharedReferences.includes(name)) return name
  return null
}

function prepareSkill(sourceRoot, name, staging) {
  const files = new Map()
  collectFiles(path.join(sourceRoot, 'scenarios', name), '.', files)
  collectFiles(path.join(sourceRoot, 'references', 'api'), path.join('references', 'api'), files)
  for (const reference of sharedReferences) {
    collectFiles(path.join(sourceRoot, 'references', reference), path.join('references', reference), files)
  }
  for (const required of [
    'SKILL.md',
    'references/api/vbi/guide.md',
    'references/api/vquery/guide.md',
    'references/api/vseed/guide.md',
  ]) {
    if (![...files.values()].some((file) => slash(file) === required)) {
      throw new Error(`Missing ${required} for ${name}`)
    }
  }
  const entries = []
  for (const [source, destination] of files) {
    let content = fs.readFileSync(source)
    if (source.endsWith('.md')) content = rewriteLinks(content.toString(), source, destination, files, sourceRoot)
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
  await buildSkillApi({ repoRoot, onProgress: progress })
  const staging = fs.mkdtempSync(path.join(os.tmpdir(), 'vbi-skills-'))
  try {
    // Prepare all archives before publishing, so invalid inputs preserve previous builds.
    const archives = scenes.map((name) => {
      progress(`检查资源并打包 ${name}.zip`)
      return prepareSkill(sourceRoot, name, staging)
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

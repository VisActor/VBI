// Repository maintenance: keep standalone templates in sync with the shared table adapter.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const scenes = path.join(skillRoot, 'references')
const reference = path.join(scenes, 'visual-query')
const repoRoot = path.resolve(skillRoot, '../..')
const templates = [
  ...fs
    .readdirSync(path.join(scenes, 'visactor-light-dashboard/templates'))
    .filter((name) => /^template-.*\.html$/.test(name))
    .map((name) => path.join(scenes, 'visactor-light-dashboard/templates', name)),
  path.join(scenes, 'visactor-map2d-dashboard/templates/template.html'),
  path.join(scenes, 'visactor-map3d-dashboard/templates/template.html'),
]
const check = process.argv.includes('--check')
let stale = 0
for (const file of templates) {
  let next = fs.readFileSync(file, 'utf8')
  for (const [tag, id, asset] of [
    ['style', 'dashboard-table-tokens', 'dashboard-table.css'],
    ['script', 'dashboard-table-runtime', 'dashboard-table.js'],
  ]) {
    const content = fs.readFileSync(path.join(reference, 'assets', asset), 'utf8').trimEnd()
    const embedded = `    <${tag} id="${id}">\n${content
      .split('\n')
      .map((line) => (line ? `      ${line}` : ''))
      .join('\n')}\n    </${tag}>`
    const pattern = new RegExp(`    <${tag} id="${id}">[\\s\\S]*?</${tag}>`)
    if (pattern.test(next)) next = next.replace(pattern, () => embedded)
    else next = next.replace('  </head>', `${embedded}\n  </head>`)
  }
  // Embedded JS has a different available line width; use the repository formatter.
  next = execFileSync(path.join(repoRoot, 'node_modules/.bin/oxfmt'), ['--stdin-filepath', file], {
    cwd: repoRoot,
    input: next,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
  if (next !== fs.readFileSync(file, 'utf8')) {
    stale++
    if (check) console.error(`Stale table adapter: ${path.relative(repoRoot, file)}`)
    if (!check) fs.writeFileSync(file, next)
  }
}
if (check && stale) throw new Error(`${stale} templates need table token synchronization`)
console.log(`${templates.length} templates: ${check ? 'verified' : 'synchronized'} shared table tokens and adapter`)

import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { buildSkillApi } from './build-skill-api.mjs'

const skillNames = ['visactor-dashboard']
const packageNames = ['vbi', 'vquery', 'vseed']

function write(root, name, content) {
  const file = path.join(root, name)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vbi-skill-api-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  for (const name of ['vbi', 'vquery', 'vseed']) {
    write(
      root,
      `packages/${name}/package.json`,
      JSON.stringify({
        name: `@visactor/${name}`,
        version: '1.0.0',
        exports: {
          '.':
            name === 'vquery'
              ? {
                  node: { source: './src/node.ts' },
                  browser: { source: './src/browser.ts' },
                  default: { source: './src/browser.ts' },
                }
              : { source: './src/index.ts' },
        },
      }),
    )
    write(
      root,
      `packages/${name}/tsconfig.json`,
      JSON.stringify({
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          strict: true,
          outDir: 'dist',
          rootDir: 'src',
        },
        include: ['src'],
      }),
    )
    write(root, `scripts/skill-api/${name}.md`, `# ${name} workflow\n\nMaintained once, distributed to every skill.\n`)
  }
  for (const name of skillNames) {
    write(root, `skills/${name}/SKILL.md`, 'Manual root skill.\n')
    write(root, `skills/${name}/references/activation-map.yaml`, 'manual: true\n')
    write(root, `skills/${name}/templates/example.html`, '<p>Manual template</p>\n')
  }
  write(
    root,
    'packages/vbi/src/index.ts',
    `export { Client, make } from './chart-builder/client'
    export type { Model, Model as PublicModel } from './types/model'
    export { Status } from './types/model'
    export { utility as sharedUtility } from '@visactor/vseed'
    export { dashboard } from './dashboard-builder/value'
    export { insight } from './insight-builder/value'
    export const VBI = { name: 'demo' }`,
  )
  write(
    root,
    'packages/vbi/src/types/model.ts',
    `type Detail = { count: number }
    /** Describes the input model. */
    export interface Model { detail: Detail }
    export enum Status { Ready = 'ready' }`,
  )
  write(
    root,
    'packages/vbi/src/chart-builder/client.ts',
    `import type { Model } from '../types/model'
    /** Public client documentation. */
    export class Client {
      private secret = 'hidden implementation'
      protected cache = 0
      #internal = 0
      constructor(public readonly model: Model) {}
      execute = (limit = 10) => limit
      get size() { return this.cache }
      static from(model: Model) { return new Client(model) }
    }
    export function make(input: string): string
    export function make(input: number): number
    export function make(input: string | number) { return input }
    throw new Error('Source modules must never execute during documentation generation')`,
  )
  write(root, 'packages/vbi/src/dashboard-builder/value.ts', 'export const dashboard = true')
  write(root, 'packages/vbi/src/insight-builder/value.ts', 'export const insight = true')
  write(
    root,
    'packages/vquery/src/VQuery.ts',
    `export class VQuery {
    private secret = 0
    protected cache = 0
    query(value: string) { return value }
  }`,
  )
  for (const entry of ['node', 'browser']) {
    write(
      root,
      `packages/vquery/src/${entry}.ts`,
      `export { VQuery } from './default-vquery'
      export { ${entry === 'node' ? 'InMemoryAdapter' : 'IndexedDBAdapter'} } from './adapters/storage'
      export * from './types/query'
      export * from './sql/compiler/compile'
      export * from './dataset/dataset'
      export * from './dataset/source/url'`,
    )
  }
  write(
    root,
    'packages/vquery/src/default-vquery.ts',
    `import { VQuery as Core } from './VQuery'
      export class VQuery extends Core { constructor() { super() } }`,
  )
  write(
    root,
    'packages/vquery/src/adapters/storage.ts',
    'export class InMemoryAdapter {}\nexport class IndexedDBAdapter {}',
  )
  write(
    root,
    'packages/vquery/src/types/query.ts',
    'export interface QueryDSL { select: string[] }; export const zQuery = true',
  )
  write(
    root,
    'packages/vquery/src/sql/compiler/compile.ts',
    `export const compileQuery = (value: string) => ({ sql: value, parameters: [] as string[] })`,
  )
  write(root, 'packages/vquery/src/dataset/dataset.ts', 'export class Dataset {}')
  write(root, 'packages/vquery/src/dataset/source/url.ts', 'export const isUrl = (value: string) => value.length > 0')
  const vseedFiles = {
    'builder/builder.ts': 'export class Builder { build() { return { chart: true } } }',
    'builder/register/all.ts': 'export const registerAll = () => true',
    'types/chartType/line.ts': "export interface Line { chartType: 'line' }",
    'types/schema.ts': 'export const zLine = { parse: (value: string) => value }; export type SchemaInput = string',
    'dataReshape/data.ts': 'export const reshape = (values: number[]) => values',
    'pipeline/pipe.ts': 'export const utility = (value: string) => value',
    'theme/theme.ts': "export const theme = { name: 'light' }",
    'i18n/locale.ts': "export type Locale = 'zh-CN' | 'en-US'",
    'types/seed.ts': 'export type VSeed = { dataset: string[] }',
  }
  for (const [name, content] of Object.entries(vseedFiles)) write(root, `packages/vseed/src/${name}`, content)
  write(
    root,
    'packages/vseed/src/index.ts',
    Object.keys(vseedFiles)
      .map((name) => `export * from './${name.slice(0, -3)}'`)
      .join('\n'),
  )
  fs.appendFileSync(
    path.join(root, 'packages/vseed/src/index.ts'),
    "\nexport { zLine as LineSchema } from './types/schema'\n",
  )
  return root
}

function snapshot(root) {
  const result = new Map()
  for (const name of fs.readdirSync(root, { recursive: true })) {
    const file = path.join(root, name)
    if (fs.statSync(file).isFile()) result.set(name, fs.readFileSync(file, 'utf8'))
  }
  return result
}

test('documents public declarations, aliases, overloads, defaults and workspace re-exports from source', async (t) => {
  const root = fixture(t)
  await buildSkillApi({ repoRoot: root })
  const api = path.join(root, 'skills/visactor-dashboard/references/api')
  const client = fs.readFileSync(path.join(api, 'vbi/chart-builder.md'), 'utf8')
  assert.match(client, /Public client documentation/)
  assert.match(client, /readonly model: Model/)
  assert.match(client, /limit = 10/)
  assert.match(client, /make\(input: string\): string/)
  assert.match(client, /make\(input: number\): number/)
  assert.doesNotMatch(client, /secret|cache|#internal|return input|hidden implementation|modules must never execute/)
  const types = fs.readFileSync(path.join(api, 'vbi/types.md'), 'utf8')
  assert.match(types, /PublicModel/)
  assert.match(types, /type Detail/)
  assert.match(types, /enum Status/)
  assert.match(types, /packages\/vseed\/src\/pipeline\/pipe.ts/)
  assert.match(fs.readFileSync(path.join(api, 'vbi/index.md'), 'utf8'), /sharedUtility/)
  for (const group of ['builder', 'register', 'chart-types', 'data', 'pipeline', 'theme', 'i18n', 'types']) {
    assert.ok(fs.existsSync(path.join(api, 'vseed', `${group}.md`)), `${group} is documented`)
  }
  assert.equal(fs.existsSync(path.join(api, 'vseed/schemas.md')), false)
  for (const content of snapshot(path.join(api, 'vseed')).values()) {
    assert.doesNotMatch(content, /schemas\.md|zLine|LineSchema/)
  }
  assert.match(fs.readFileSync(path.join(api, 'vseed/types.md'), 'utf8'), /SchemaInput/)
  assert.match(fs.readFileSync(path.join(api, 'vquery/index.md'), 'utf8'), /zQuery/)
})

test('keeps conditional exports distinct and documents inherited public members', async (t) => {
  const root = fixture(t)
  await buildSkillApi({ repoRoot: root })
  const api = path.join(root, 'skills/visactor-dashboard/references/api/vquery')
  const index = fs.readFileSync(path.join(api, 'index.md'), 'utf8')
  const exportConditions = (name) =>
    index
      .split('\n')
      .map((line) => line.split('|').map((cell) => cell.trim()))
      .find((cells) => cells[1] === `\`${name}\``)?.[2]
  assert.equal(exportConditions('InMemoryAdapter'), 'node')
  assert.equal(exportConditions('IndexedDBAdapter'), 'browser, default')
  assert.equal(exportConditions('VQuery'), 'browser, default, node')
  const runtime = fs.readFileSync(path.join(api, 'runtime.md'), 'utf8')
  assert.match(runtime, /query\(value: string\): string/)
  assert.doesNotMatch(runtime, /private secret|protected cache/)
  assert.match(runtime, /runtime.md#vquery-vqueryts/)
})

test('updates the canonical API, removes stale content and preserves manual skills', async (t) => {
  const root = fixture(t)
  const skillsRoot = path.join(root, 'skills')
  const manual = snapshot(skillsRoot)
  await buildSkillApi({ repoRoot: root })
  for (const [name, content] of manual) assert.equal(fs.readFileSync(path.join(skillsRoot, name), 'utf8'), content)
  const first = snapshot(skillsRoot)
  await buildSkillApi({ repoRoot: root })
  assert.deepEqual(snapshot(skillsRoot), first)

  for (const skill of skillNames) {
    write(root, `skills/${skill}/references/api/vbi/obsolete.md`, 'Stale page without a marker.\n')
    write(root, `skills/${skill}/references/api/vbi/old/data.json`, '{"stale":true}\n')
    write(root, `skills/${skill}/references/api/vquery/guide.md`, 'Diverged workflow copy.\n')
    write(root, `skills/${skill}/references/api/vseed/schemas.md`, 'Obsolete schema declarations.\n')
  }
  write(root, 'packages/vbi/src/index.ts', 'export const nextApi = true')
  write(root, 'scripts/skill-api/vquery.md', '# Updated query workflow\n')
  await buildSkillApi({ repoRoot: root })
  const canonical = snapshot(path.join(skillsRoot, 'visactor-dashboard/references/api'))
  for (const skill of skillNames) {
    const api = path.join(skillsRoot, skill, 'references', 'api')
    assert.deepEqual(snapshot(api), canonical)
    assert.equal(fs.existsSync(path.join(api, 'vbi/chart-builder.md')), false)
    assert.equal(fs.existsSync(path.join(api, 'vbi/obsolete.md')), false)
    assert.equal(fs.existsSync(path.join(api, 'vbi/old')), false)
    assert.equal(fs.existsSync(path.join(api, 'vseed/schemas.md')), false)
    assert.match(fs.readFileSync(path.join(api, 'vbi/index.md'), 'utf8'), /nextApi/)
    assert.match(fs.readFileSync(path.join(api, 'vquery/guide.md'), 'utf8'), /Updated query workflow/)
    for (const name of packageNames) {
      assert.ok(fs.existsSync(path.join(api, name, 'guide.md')))
      assert.ok(fs.existsSync(path.join(api, name, 'index.md')))
      assert.equal(fs.existsSync(path.join(api, name, 'api')), false)
      assert.equal(fs.existsSync(path.join(skillsRoot, skill, 'references', name)), false)
    }
  }
  for (const [name, content] of manual) assert.equal(fs.readFileSync(path.join(skillsRoot, name), 'utf8'), content)
})

test('does not partially replace the canonical skill when a package entrypoint cannot be read', async (t) => {
  const root = fixture(t)
  await buildSkillApi({ repoRoot: root })
  const skillsRoot = path.join(root, 'skills')
  const previous = snapshot(skillsRoot)
  write(root, 'packages/vbi/src/index.ts', 'export const changedApi = true')
  fs.unlinkSync(path.join(root, 'packages/vquery/src/node.ts'))
  await assert.rejects(buildSkillApi({ repoRoot: root }), /File not found/)
  assert.deepEqual(snapshot(skillsRoot), previous)
})

test('does not partially replace the canonical skill when shared workflow source is missing', async (t) => {
  const root = fixture(t)
  await buildSkillApi({ repoRoot: root })
  const skillsRoot = path.join(root, 'skills')
  const previous = snapshot(skillsRoot)
  write(root, 'scripts/skill-api/vbi.md', '# Changed workflow\n')
  fs.unlinkSync(path.join(root, 'scripts/skill-api/vseed.md'))
  await assert.rejects(buildSkillApi({ repoRoot: root }), /ENOENT/)
  assert.deepEqual(snapshot(skillsRoot), previous)
})

test('requires the canonical skill before replacing API files', async (t) => {
  const root = fixture(t)
  await buildSkillApi({ repoRoot: root })
  const skillsRoot = path.join(root, 'skills')
  fs.unlinkSync(path.join(skillsRoot, 'visactor-dashboard/SKILL.md'))
  const previous = snapshot(skillsRoot)
  await assert.rejects(buildSkillApi({ repoRoot: root }), /ENOENT/)
  assert.deepEqual(snapshot(skillsRoot), previous)
})

test('rejects packages without source entrypoints or public exports before writing', async (t) => {
  const root = fixture(t)
  const skillsRoot = path.join(root, 'skills')
  const previous = snapshot(skillsRoot)
  const metadataPath = path.join(root, 'packages/vbi/package.json')
  const metadata = fs.readFileSync(metadataPath, 'utf8')
  write(root, 'packages/vbi/package.json', JSON.stringify({ name: '@visactor/vbi', exports: { '.': {} } }))
  await assert.rejects(buildSkillApi({ repoRoot: root }), /no source entrypoint/)
  fs.writeFileSync(metadataPath, metadata)
  write(root, 'packages/vbi/src/index.ts', 'export {}')
  await assert.rejects(buildSkillApi({ repoRoot: root }), /No public exports/)
  assert.deepEqual(snapshot(skillsRoot), previous)
})

test('published API guides work in standalone downloads without repository maintenance instructions', async (t) => {
  const root = fixture(t)
  for (const name of packageNames) {
    write(
      root,
      `scripts/skill-api/${name}.md`,
      fs.readFileSync(new URL(`./skill-api/${name}.md`, import.meta.url), 'utf8'),
    )
  }
  // Exercise the real guide links against representative public API groups.
  write(root, 'packages/vbi/src/vbi.ts', 'export const createVBI = () => ({})')
  fs.appendFileSync(path.join(root, 'packages/vbi/src/index.ts'), "\nexport * from './vbi'\n")
  for (const skill of skillNames) {
    for (const reference of ['visual-query', 'server-runtime']) {
      write(root, `skills/${skill}/references/${reference}/guide.md`, `# ${reference}\n`)
    }
  }
  await buildSkillApi({ repoRoot: root })
  const downloads = fs.mkdtempSync(path.join(os.tmpdir(), 'standalone-skill-api-'))
  t.after(() => fs.rmSync(downloads, { recursive: true, force: true }))
  for (const skill of skillNames) {
    const standalone = path.join(downloads, skill)
    fs.cpSync(path.join(root, 'skills', skill), standalone, { recursive: true })
    for (const [name, content] of snapshot(path.join(standalone, 'references', 'api'))) {
      assert.doesNotMatch(content, /pnpm build:skill-api|scripts\/skill-api|cd skills\//, name)
      for (const [, href] of content.matchAll(/\]\(([^)\s]+)\)/g)) {
        if (href.startsWith('#') || href.includes(':')) continue
        const target = path.resolve(standalone, 'references', 'api', path.dirname(name), href.split('#')[0])
        assert.ok(target.startsWith(standalone + path.sep), `${name}: ${href} escapes the download`)
        assert.ok(fs.existsSync(target), `${name}: ${href} is missing from the download`)
      }
    }
  }
})

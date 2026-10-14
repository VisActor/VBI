import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { buildSkillApi } from './build-skill-api.mjs'

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
    write(root, `skills/vbi/references/${name}/SKILL.md`, `Manually maintained ${name} guidance.\n`)
  }
  write(root, 'skills/vbi/SKILL.md', 'Manual root skill.\n')
  write(root, 'skills/vbi/references/activation-map.yaml', 'manual: true\n')
  write(root, 'skills/vbi/references/light-dashboard/template.html', '<p>Manual template</p>\n')
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
      `export { VQuery } from './vquery-${entry}'
      export { ${entry === 'node' ? 'InMemoryAdapter' : 'IndexedDBAdapter'} } from './adapters/storage'
      export * from './types/query'
      export * from './sql-builder/compile'
      export * from './dataset/dataset'
      export * from './utils/url'`,
    )
    write(
      root,
      `packages/vquery/src/vquery-${entry}.ts`,
      `import { VQuery as Core } from './VQuery'
      export class VQuery extends Core { constructor() { super() } }`,
    )
  }
  write(
    root,
    'packages/vquery/src/adapters/storage.ts',
    'export class InMemoryAdapter {}\nexport class IndexedDBAdapter {}',
  )
  write(root, 'packages/vquery/src/types/query.ts', 'export interface QueryDSL { select: string[] }')
  write(
    root,
    'packages/vquery/src/sql-builder/compile.ts',
    `export const compileQuery = (value: string) => ({ sql: value, parameters: [] as string[] })`,
  )
  write(root, 'packages/vquery/src/dataset/dataset.ts', 'export class Dataset {}')
  write(root, 'packages/vquery/src/utils/url.ts', 'export const isUrl = (value: string) => value.length > 0')
  const vseedFiles = {
    'builder/builder.ts': 'export class Builder { build() { return { chart: true } } }',
    'builder/register/all.ts': 'export const registerAll = () => true',
    'types/chartType/line.ts': "export interface Line { chartType: 'line' }",
    'types/schema.ts': 'export const zLine = { parse: (value: string) => value }',
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
  const api = path.join(root, 'skills/vbi/references')
  const client = fs.readFileSync(path.join(api, 'vbi/api/chart-builder.md'), 'utf8')
  assert.match(client, /Public client documentation/)
  assert.match(client, /readonly model: Model/)
  assert.match(client, /limit = 10/)
  assert.match(client, /make\(input: string\): string/)
  assert.match(client, /make\(input: number\): number/)
  assert.doesNotMatch(client, /secret|cache|#internal|return input|hidden implementation|modules must never execute/)
  const types = fs.readFileSync(path.join(api, 'vbi/api/types.md'), 'utf8')
  assert.match(types, /PublicModel/)
  assert.match(types, /type Detail/)
  assert.match(types, /enum Status/)
  assert.match(types, /packages\/vseed\/src\/pipeline\/pipe.ts/)
  assert.match(fs.readFileSync(path.join(api, 'vbi/api/index.md'), 'utf8'), /sharedUtility/)
  for (const group of ['builder', 'register', 'chart-types', 'schemas', 'data', 'pipeline', 'theme', 'i18n', 'types']) {
    assert.ok(fs.existsSync(path.join(api, 'vseed/api', `${group}.md`)), `${group} is documented`)
  }
})

test('keeps conditional exports distinct and documents inherited public members', async (t) => {
  const root = fixture(t)
  await buildSkillApi({ repoRoot: root })
  const api = path.join(root, 'skills/vbi/references/vquery/api')
  const index = fs.readFileSync(path.join(api, 'index.md'), 'utf8')
  const exportConditions = (name) =>
    index
      .split('\n')
      .map((line) => line.split('|').map((cell) => cell.trim()))
      .find((cells) => cells[1] === `\`${name}\``)?.[2]
  assert.equal(exportConditions('InMemoryAdapter'), 'node')
  assert.equal(exportConditions('IndexedDBAdapter'), 'browser, default')
  assert.match(index, /VQuery \(browser, default\)/)
  assert.match(index, /VQuery \(node\)/)
  const runtime = fs.readFileSync(path.join(api, 'runtime.md'), 'utf8')
  assert.match(runtime, /query\(value: string\): string/)
  assert.doesNotMatch(runtime, /private secret|protected cache/)
  assert.match(runtime, /runtime.md#vquery-vqueryts/)
})

test('updates only API files, stays deterministic and prunes obsolete generated pages', async (t) => {
  const root = fixture(t)
  const skillRoot = path.join(root, 'skills/vbi')
  write(root, 'skills/vbi/references/vbi/api/notes.md', 'Manual API notes.\n')
  write(root, 'skills/vbi/references/vbi/api/data.json', '{"manual":true}\n')
  const manual = snapshot(skillRoot)
  await buildSkillApi({ repoRoot: root })
  for (const [name, content] of manual) assert.equal(fs.readFileSync(path.join(skillRoot, name), 'utf8'), content)
  const first = snapshot(skillRoot)
  await buildSkillApi({ repoRoot: root })
  assert.deepEqual(snapshot(skillRoot), first)
  write(root, 'packages/vbi/src/index.ts', 'export const nextApi = true')
  await buildSkillApi({ repoRoot: root })
  assert.equal(fs.existsSync(path.join(skillRoot, 'references/vbi/api/chart-builder.md')), false)
  assert.match(fs.readFileSync(path.join(skillRoot, 'references/vbi/api/index.md'), 'utf8'), /nextApi/)
  for (const [name, content] of manual) assert.equal(fs.readFileSync(path.join(skillRoot, name), 'utf8'), content)
})

test('does not partially replace API documents when a package entrypoint cannot be read', async (t) => {
  const root = fixture(t)
  await buildSkillApi({ repoRoot: root })
  const skillRoot = path.join(root, 'skills/vbi')
  const previous = snapshot(skillRoot)
  write(root, 'packages/vbi/src/index.ts', 'export const changedApi = true')
  fs.unlinkSync(path.join(root, 'packages/vquery/src/node.ts'))
  await assert.rejects(buildSkillApi({ repoRoot: root }), /File not found/)
  assert.deepEqual(snapshot(skillRoot), previous)
})

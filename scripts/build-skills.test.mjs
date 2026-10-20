import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { buildSkills } from './build-skills.mjs'

const scenes = ['visactor-light-dashboard', 'visactor-map2d-dashboard']
const archiveNames = [...scenes, 'light-dashboard']

test('CLI builds archives from the calling repository', (t) => {
  const { repoRoot, source } = fixture(t)
  assert.equal(fs.existsSync(path.join(source, 'api')), false)
  const output = execFileSync(process.execPath, [fileURLToPath(new URL('./build-skills.mjs', import.meta.url))], {
    cwd: repoRoot,
    encoding: 'utf8',
  })
  const stages = [...output.matchAll(/\[build:skills\] \[(\d+)\/(\d+)\] (.+)/g)]
  assert.deepEqual(
    stages.map(([, step]) => Number(step)),
    Array.from({ length: 12 }, (_, i) => i + 1),
  )
  assert.ok(stages.every(([, , total]) => Number(total) === stages.length))
  assert.deepEqual(
    stages.map(([, , , message]) => message),
    [
      '检查技能目录',
      '生成 vbi API',
      '生成 vquery API',
      '生成 vseed API',
      '格式化 vbi API',
      '格式化 vquery API',
      '格式化 vseed API',
      '写入 API 文档',
      '检查资源并打包 visactor-light-dashboard.zip',
      '检查资源并打包 visactor-map2d-dashboard.zip',
      '检查资源并打包 light-dashboard.zip',
      '写入分发产物 dist/skills',
    ],
  )
  assert.ok(output.indexOf('[12/12]') < output.indexOf('[build:skills] 完成'))
  for (const name of archiveNames) {
    assert.ok(output.includes(`${name}.zip`))
    const archive = path.join(repoRoot, 'dist/skills', `${name}.zip`)
    const downloaded = extract(t, archive)
    for (const pkg of ['vbi', 'vquery', 'vseed']) {
      assert.match(fs.readFileSync(path.join(downloaded, name, 'api', pkg, 'index.md'), 'utf8'), /initialApi/)
    }
  }
})

function write(root, relative, content) {
  const file = path.join(root, relative)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

function temporary(t, prefix) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), prefix))
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }))
  return directory
}

function fixture(t) {
  const repoRoot = temporary(t, 'skill-package-test-')
  const source = path.join(repoRoot, 'skills/visactor-dashboard')
  write(source, 'SKILL.md', '# All-in-one\n')
  for (const name of ['vbi', 'vquery', 'vseed']) {
    write(
      repoRoot,
      `packages/${name}/package.json`,
      JSON.stringify({
        name: `@visactor/${name}`,
        version: '1.0.0',
        exports: { '.': { source: './src/index.ts' } },
      }),
    )
    write(
      repoRoot,
      `packages/${name}/tsconfig.json`,
      JSON.stringify({ compilerOptions: { target: 'ES2022' }, include: ['src'] }),
    )
    write(repoRoot, `packages/${name}/src/index.ts`, 'export const initialApi = true')
    write(repoRoot, `scripts/skill-api/${name}.md`, '[Index](index.md) · [Root](../../SKILL.md)\n')
  }
  fs.appendFileSync(
    path.join(repoRoot, 'packages/vseed/src/index.ts'),
    '\nexport const zChart = { parse: (value: string) => value }\n',
  )
  for (const name of ['visual-query', 'server-runtime']) {
    write(source, `references/${name}/SKILL.md`, `[Root](../../SKILL.md) · [API](../../api/vbi/SKILL.md)\n`)
  }
  write(source, 'references/server-runtime/scripts/runtime/.env.example', 'VBI_PORT=4317\n')
  write(source, 'references/server-runtime/scripts/runtime/server.mjs', 'export const port = 4317\n')
  write(source, 'references/metric-analysis/SKILL.md', '[Query](../visual-query/SKILL.md)\n')
  for (const name of scenes) {
    const scene = `references/${name}`
    write(
      source,
      `${scene}/SKILL.md`,
      `---\nname: ${name}\ndescription: Example dashboard\n---\n\n[Layout](references/layout.md) · [Query](../visual-query/SKILL.md) · [Analysis](../metric-analysis/SKILL.md) · [Server](../server-runtime/SKILL.md) · [API](../../api/vquery/SKILL.md)\n`,
    )
    write(source, `${scene}/agents/openai.yaml`, `interface:\n  display_name: '${name}'\n`)
    write(
      source,
      `${scene}/references/layout.md`,
      '[Scene](../SKILL.md) · [Template](../templates/example.html) · ![Preview](../templates/preview.png)\n' +
        '[Anchor](#layout) · [Web](https://example.com/) · [CDN](//example.com/example.js)\n',
    )
    write(source, `${scene}/references/filter.md`, '# Options\n')
    write(source, `${scene}/templates/example.html`, '<img src="preview.png">\n')
    write(source, `${scene}/templates/preview.png`, Buffer.from([0, 1, 127, 255]))
    for (const excluded of [
      '.env',
      '.env.production',
      '.DS_Store',
      'node_modules/local.js',
      '.git/config',
      'coverage/report.txt',
      'dist/old.txt',
      '.turbo/cache',
      '__pycache__/cache',
      'templates.zip',
      'debug.log',
      'debug.log.1',
      'settings.local',
    ])
      write(source, `${scene}/${excluded}`, 'Do not distribute')
  }
  return { repoRoot, source }
}

function contents(directory) {
  return new Map(
    fs
      .readdirSync(directory, { recursive: true })
      .filter((name) => fs.statSync(path.join(directory, name)).isFile())
      .map((name) => [name, fs.readFileSync(path.join(directory, name))]),
  )
}

function extract(t, archive) {
  const directory = temporary(t, 'downloaded-skill-')
  execFileSync('unzip', ['-q', archive, '-d', directory])
  return directory
}

test('builds self-contained scene archives with rewritten references and unchanged assets', async (t) => {
  const { repoRoot, source } = fixture(t)
  const before = contents(source)
  const packages = await buildSkills({ repoRoot })
  assert.deepEqual(
    packages.map(({ name }) => name),
    archiveNames,
  )
  assert.deepEqual(new Map([...contents(source)].filter(([file]) => !file.startsWith('api/'))), before)
  assert.deepEqual(fs.readdirSync(path.join(repoRoot, 'skills')), ['visactor-dashboard'])
  for (const { name, archive, files } of packages) {
    assert.equal(archive, path.join(repoRoot, 'dist/skills', `${name}.zip`))
    const downloaded = extract(t, archive)
    assert.deepEqual(fs.readdirSync(downloaded), [name])
    const root = path.join(downloaded, name)
    const resources = contents(root)
    assert.equal(resources.size, files)
    assert.ok(resources.has('SKILL.md'))
    assert.match(resources.get('SKILL.md').toString(), new RegExp(`^---\\nname: ${name}\\n`))
    if (name === 'light-dashboard') {
      const canonical = contents(path.join(extract(t, packages[0].archive), 'visactor-light-dashboard'))
      canonical.set(
        'SKILL.md',
        Buffer.from(
          canonical
            .get('SKILL.md')
            .toString()
            .replace(/^name:.*$/m, `name: ${name}`),
        ),
      )
      assert.deepEqual(resources, canonical)
    }
    assert.ok(resources.has('agents/openai.yaml'))
    assert.ok(resources.has('references/server-runtime/scripts/runtime/.env.example'))
    assert.ok(resources.has('references/server-runtime/scripts/runtime/server.mjs'))
    assert.ok(resources.has('references/metric-analysis/SKILL.md'))
    assert.equal(resources.has('api/vseed/schemas.md'), false)
    assert.doesNotMatch(resources.get('api/vseed/index.md').toString(), /schemas\.md|zChart/)
    assert.equal(fs.existsSync(path.join(root, 'references/visactor-light-dashboard')), false)
    assert.equal(fs.existsSync(path.join(root, 'references/visactor-map2d-dashboard')), false)
    assert.deepEqual(resources.get('templates/preview.png'), Buffer.from([0, 1, 127, 255]))
    for (const [file, data] of resources) {
      assert.ok(!data.includes('Do not distribute'), file)
      if (!file.endsWith('.md')) continue
      const text = data.toString()
      assert.doesNotMatch(text, /pnpm|scripts\/build/)
      for (const [, href] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
        if (href.startsWith('#') || href.startsWith('//') || href.includes(':')) continue
        const target = path.resolve(root, path.dirname(file), href.split('#')[0])
        assert.ok(target.startsWith(root + path.sep), `${file}: ${href}`)
        assert.ok(fs.existsSync(target), `${file}: ${href}`)
      }
    }
  }
})

test('rebuilds deterministically and replaces obsolete archive contents', async (t) => {
  const { repoRoot, source } = fixture(t)
  const first = (await buildSkills({ repoRoot })).map(({ archive }) => fs.readFileSync(archive))
  fs.utimesSync(path.join(source, 'references/visactor-light-dashboard/SKILL.md'), new Date(), new Date())
  assert.deepEqual(
    (await buildSkills({ repoRoot })).map(({ archive }) => fs.readFileSync(archive)),
    first,
  )
  write(source, 'references/visactor-light-dashboard/templates/obsolete.txt', 'old')
  await buildSkills({ repoRoot })
  fs.unlinkSync(path.join(source, 'references/visactor-light-dashboard/templates/obsolete.txt'))
  write(source, 'references/visactor-light-dashboard/templates/example.html', '<p>Updated template</p>')
  write(repoRoot, 'dist/skills/unrelated.txt', 'Preserve unrelated outputs')
  const packages = await buildSkills({ repoRoot })
  const downloaded = extract(t, packages[0].archive)
  assert.equal(fs.existsSync(path.join(downloaded, 'visactor-light-dashboard/templates/obsolete.txt')), false)
  assert.equal(
    fs.readFileSync(path.join(downloaded, 'visactor-light-dashboard/templates/example.html'), 'utf8'),
    '<p>Updated template</p>',
  )
  assert.deepEqual(fs.readFileSync(packages[1].archive), first[1])
  assert.equal(fs.readFileSync(path.join(repoRoot, 'dist/skills/unrelated.txt'), 'utf8'), 'Preserve unrelated outputs')
})

test('preserves both previous archives when the second scene has an unbundled reference', async (t) => {
  const { repoRoot, source } = fixture(t)
  await buildSkills({ repoRoot })
  const output = path.join(repoRoot, 'dist/skills')
  const previous = contents(output)
  write(source, 'references/visactor-light-dashboard/templates/example.html', 'New template')
  write(source, 'references/visactor-map2d-dashboard/references/layout.md', '[Missing resource](missing.md)')
  await assert.rejects(() => buildSkills({ repoRoot }), /Unbundled skill reference/)
  assert.deepEqual(contents(output), previous)
})

test('rejects reverse and cross-scene dependencies while preserving previous archives', async (t) => {
  for (const owner of [...scenes, 'metric-analysis', 'server-runtime', 'visual-query']) {
    for (const dependency of scenes.filter((name) => name !== owner)) {
      const { repoRoot, source } = fixture(t)
      const previous = (await buildSkills({ repoRoot })).map(({ archive }) => fs.readFileSync(archive))
      // A nested document and normalized path ensure the check covers entire skill directories.
      write(
        source,
        `references/${owner}/references/dependency.md`,
        `[Forbidden](../../${dependency}/references/../SKILL.md#entry)`,
      )
      await assert.rejects(
        () => buildSkills({ repoRoot }),
        new RegExp(`Forbidden skill dependency: ${owner} → ${dependency}`),
      )
      assert.deepEqual(
        archiveNames.map((name) => fs.readFileSync(path.join(repoRoot, 'dist/skills', `${name}.zip`))),
        previous,
      )
    }
  }
})

test('regenerates changed and missing APIs before every archive build', async (t) => {
  const { repoRoot, source } = fixture(t)
  await buildSkills({ repoRoot })
  write(source, 'api/vbi/obsolete.md', 'Stale API')
  fs.rmSync(path.join(source, 'api/vseed'), { recursive: true })
  for (const pkg of ['vbi', 'vquery', 'vseed']) {
    write(repoRoot, `packages/${pkg}/src/index.ts`, 'export const updatedApi = true')
    write(repoRoot, `scripts/skill-api/${pkg}.md`, '# Updated workflow\n')
  }
  const output = path.join(repoRoot, 'dist/skills')
  const previous = contents(output)
  const progress = []
  const packages = await buildSkills({
    repoRoot,
    onProgress: (event) => {
      progress.push(event)
      // Notifications must arrive before work, not be replayed after the build.
      assert.deepEqual(contents(output), previous)
      const index = fs.readFileSync(path.join(source, 'api/vbi/index.md'), 'utf8')
      assert.match(index, event.step <= 8 ? /initialApi/ : /updatedApi/)
    },
  })
  assert.equal(progress.length, progress[0].total)
  for (const { name, archive } of packages) {
    const root = path.join(extract(t, archive), name)
    assert.equal(fs.existsSync(path.join(root, 'api/vbi/obsolete.md')), false)
    for (const pkg of ['vbi', 'vquery', 'vseed']) {
      const index = fs.readFileSync(path.join(root, 'api', pkg, 'index.md'), 'utf8')
      assert.match(index, /updatedApi/)
      assert.doesNotMatch(index, /initialApi/)
      assert.match(fs.readFileSync(path.join(root, 'api', pkg, 'SKILL.md'), 'utf8'), /Updated workflow/)
    }
  }
})

test('preserves previous archives and API docs when API generation fails', async (t) => {
  const { repoRoot, source } = fixture(t)
  await buildSkills({ repoRoot })
  const output = path.join(repoRoot, 'dist/skills')
  const previous = contents(output)
  const api = contents(path.join(source, 'api'))
  write(repoRoot, 'packages/vbi/src/index.ts', 'export const updatedApi = true')
  fs.unlinkSync(path.join(repoRoot, 'packages/vquery/src/index.ts'))
  const progress = []
  await assert.rejects(() => buildSkills({ repoRoot, onProgress: (event) => progress.push(event) }), /File not found/)
  assert.equal(progress.at(-1).message, '生成 vquery API')
  assert.ok(progress.at(-1).step < progress.at(-1).total)
  assert.deepEqual(contents(output), previous)
  assert.deepEqual(contents(path.join(source, 'api')), api)
})

test('rejects missing required resources and symlinks without publishing incomplete archives', async (t) => {
  for (const missing of ['SKILL.md', 'references/visactor-light-dashboard/SKILL.md', 'references/server-runtime']) {
    const { repoRoot, source } = fixture(t)
    fs.rmSync(path.join(source, missing), { recursive: true })
    await assert.rejects(() => buildSkills({ repoRoot }), /ENOENT|Missing/)
    assert.equal(fs.existsSync(path.join(repoRoot, 'dist/skills')), false)
  }
  const { repoRoot, source } = fixture(t)
  fs.symlinkSync(path.join(source, 'SKILL.md'), path.join(source, 'references/visactor-light-dashboard/linked.md'))
  await assert.rejects(() => buildSkills({ repoRoot }), /Unsupported skill resource/)
  assert.equal(fs.existsSync(path.join(repoRoot, 'dist/skills')), false)
})

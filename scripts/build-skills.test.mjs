import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { buildSkills } from './build-skills.mjs'

const scenes = [
  'visactor-light-dashboard',
  'visactor-map2d-dashboard',
  'visactor-chart-editor',
  'visactor-map3d-dashboard',
]
const archiveNames = scenes.flatMap((scene) => [scene, scene.replace(/^visactor-/, '')])

test('CLI builds archives from the calling repository', (t) => {
  const { repoRoot, source } = fixture(t)
  assert.equal(fs.existsSync(path.join(source, 'references/api')), false)
  const output = execFileSync(process.execPath, [fileURLToPath(new URL('./build-skills.mjs', import.meta.url))], {
    cwd: repoRoot,
    encoding: 'utf8',
  })
  const stages = [...output.matchAll(/\[build:skills\] \[(\d+)\/(\d+)\] (.+)/g)]
  assert.deepEqual(
    stages.map(([, step]) => Number(step)),
    Array.from({ length: 17 }, (_, i) => i + 1),
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
      '检查资源并打包 light-dashboard.zip',
      '检查资源并打包 visactor-map2d-dashboard.zip',
      '检查资源并打包 map2d-dashboard.zip',
      '检查资源并打包 visactor-chart-editor.zip',
      '检查资源并打包 chart-editor.zip',
      '检查资源并打包 visactor-map3d-dashboard.zip',
      '检查资源并打包 map3d-dashboard.zip',
      '写入分发产物 dist/skills',
    ],
  )
  assert.ok(output.indexOf('[17/17]') < output.indexOf('[build:skills] 完成'))
  for (const name of archiveNames) {
    assert.ok(output.includes(`${name}.zip`))
    const archive = path.join(repoRoot, 'dist/skills', `${name}.zip`)
    const downloaded = extract(t, archive)
    for (const pkg of ['vbi', 'vquery', 'vseed']) {
      assert.match(
        fs.readFileSync(path.join(downloaded, name, 'references', 'api', pkg, 'index.md'), 'utf8'),
        /initialApi/,
      )
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
    write(repoRoot, `scripts/skill-api/${name}.md`, '[Index](index.md) · [Root](../../../SKILL.md)\n')
  }
  fs.appendFileSync(
    path.join(repoRoot, 'packages/vseed/src/index.ts'),
    '\nexport const zChart = { parse: (value: string) => value }\n',
  )
  for (const name of ['visual-query', 'server-runtime']) {
    write(source, `references/${name}/guide.md`, `[Root](../../SKILL.md) · [API](../api/vbi/guide.md)\n`)
  }
  write(source, 'references/server-runtime/scripts/runtime/.env.example', 'VBI_PORT=4317\n')
  write(source, 'references/server-runtime/scripts/runtime/server.mjs', 'export const port = 4317\n')
  write(source, 'references/metric-analysis/guide.md', '[Query](../visual-query/guide.md)\n')
  for (const name of scenes) {
    const scene = `scenarios/${name}`
    write(
      source,
      `${scene}/SKILL.md`,
      `---\nname: ${name}\ndescription: Example dashboard\n---\n\n[Layout](references/layout.md) · [Query](../../references/visual-query/guide.md) · [Analysis](../../references/metric-analysis/guide.md) · [Server](../../references/server-runtime/guide.md) · [API](../../references/api/vquery/guide.md)\n`,
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
  assert.deepEqual(new Map([...contents(source)].filter(([file]) => !file.startsWith('references/api/'))), before)
  assert.deepEqual(fs.readdirSync(path.join(repoRoot, 'skills')), ['visactor-dashboard'])
  for (const { name, archive, files } of packages) {
    assert.equal(archive, path.join(repoRoot, 'dist/skills', `${name}.zip`))
    const downloaded = extract(t, archive)
    assert.deepEqual(fs.readdirSync(downloaded), [name])
    const root = path.join(downloaded, name)
    const resources = contents(root)
    assert.equal(resources.size, files)
    assert.ok(resources.has('SKILL.md'))
    assert.deepEqual(
      [...resources.keys()].filter((file) => file.endsWith('SKILL.md')),
      ['SKILL.md'],
    )
    assert.match(resources.get('SKILL.md').toString(), new RegExp(`^---\\nname: ${name}\\n`))
    if (!name.startsWith('visactor-')) {
      const prefixed = `visactor-${name}`
      const canonicalArchive = packages.find((item) => item.name === prefixed).archive
      const canonical = contents(path.join(extract(t, canonicalArchive), prefixed))
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
    assert.ok(resources.has('references/metric-analysis/guide.md'))
    assert.equal(resources.has('references/api/vseed/schemas.md'), false)
    assert.doesNotMatch(resources.get('references/api/vseed/index.md').toString(), /schemas\.md|zChart/)
    for (const scene of scenes) assert.equal(fs.existsSync(path.join(root, 'scenarios', scene)), false)
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
  fs.utimesSync(path.join(source, 'scenarios/visactor-light-dashboard/SKILL.md'), new Date(), new Date())
  assert.deepEqual(
    (await buildSkills({ repoRoot })).map(({ archive }) => fs.readFileSync(archive)),
    first,
  )
  write(source, 'scenarios/visactor-light-dashboard/templates/obsolete.txt', 'old')
  await buildSkills({ repoRoot })
  fs.unlinkSync(path.join(source, 'scenarios/visactor-light-dashboard/templates/obsolete.txt'))
  write(source, 'scenarios/visactor-light-dashboard/templates/example.html', '<p>Updated template</p>')
  write(repoRoot, 'dist/skills/unrelated.txt', 'Preserve unrelated outputs')
  write(repoRoot, 'dist/skills/obsolete-dashboard.zip', 'Old distribution')
  const packages = await buildSkills({ repoRoot })
  const downloaded = extract(t, packages[0].archive)
  assert.equal(fs.existsSync(path.join(downloaded, 'visactor-light-dashboard/templates/obsolete.txt')), false)
  assert.equal(
    fs.readFileSync(path.join(downloaded, 'visactor-light-dashboard/templates/example.html'), 'utf8'),
    '<p>Updated template</p>',
  )
  assert.deepEqual(fs.readFileSync(packages[2].archive), first[2])
  assert.equal(fs.existsSync(path.join(repoRoot, 'dist/skills/obsolete-dashboard.zip')), false)
  assert.equal(fs.readFileSync(path.join(repoRoot, 'dist/skills/unrelated.txt'), 'utf8'), 'Preserve unrelated outputs')
})

test('detects missing, stale and obsolete ZIPs without overwriting distribution outputs', async (t) => {
  const { repoRoot, source } = fixture(t)
  await assert.rejects(() => buildSkills({ repoRoot, check: true }), /stale or missing/)
  const output = path.join(repoRoot, 'dist/skills')
  assert.equal(fs.existsSync(output), false)
  await buildSkills({ repoRoot })
  const previous = contents(output)
  await buildSkills({ repoRoot, check: true })
  assert.deepEqual(contents(output), previous)

  write(source, 'scenarios/visactor-map2d-dashboard/templates/example.html', '<p>Latest map</p>')
  await assert.rejects(() => buildSkills({ repoRoot, check: true }), /map2d-dashboard\.zip/)
  assert.deepEqual(contents(output), previous)
  await buildSkills({ repoRoot })
  await buildSkills({ repoRoot, check: true })

  write(repoRoot, 'dist/skills/obsolete-dashboard.zip', 'Old distribution')
  const withObsolete = contents(output)
  await assert.rejects(() => buildSkills({ repoRoot, check: true }), /obsolete-dashboard\.zip/)
  assert.deepEqual(contents(output), withObsolete)
})

test('preserves previous archives when a scene has an unbundled reference', async (t) => {
  const { repoRoot, source } = fixture(t)
  await buildSkills({ repoRoot })
  const output = path.join(repoRoot, 'dist/skills')
  const previous = contents(output)
  write(source, 'scenarios/visactor-light-dashboard/templates/example.html', 'New template')
  write(source, 'scenarios/visactor-map2d-dashboard/references/layout.md', '[Missing resource](missing.md)')
  await assert.rejects(() => buildSkills({ repoRoot }), /Unbundled skill reference/)
  assert.deepEqual(contents(output), previous)
})

test('rejects reverse and cross-scene dependencies while preserving previous archives', async (t) => {
  for (const owner of [...scenes, 'metric-analysis', 'server-runtime', 'visual-query']) {
    for (const dependency of scenes.filter((name) => name !== owner)) {
      const { repoRoot, source } = fixture(t)
      const previous = (await buildSkills({ repoRoot })).map(({ archive }) => fs.readFileSync(archive))
      // A nested document and normalized path ensure the check covers entire skill directories.
      const sceneOwner = scenes.includes(owner)
      const file = sceneOwner
        ? `scenarios/${owner}/references/dependency.md`
        : `references/${owner}/references/dependency.md`
      const href = sceneOwner
        ? `../../${dependency}/references/../SKILL.md#entry`
        : `../../../scenarios/${dependency}/references/../SKILL.md#entry`
      write(source, file, `[Forbidden](${href})`)
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
  write(source, 'references/api/vbi/obsolete.md', 'Stale API')
  fs.rmSync(path.join(source, 'references/api/vseed'), { recursive: true })
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
      const index = fs.readFileSync(path.join(source, 'references/api/vbi/index.md'), 'utf8')
      assert.match(index, event.step <= 8 ? /initialApi/ : /updatedApi/)
    },
  })
  assert.equal(progress.length, progress[0].total)
  for (const { name, archive } of packages) {
    const root = path.join(extract(t, archive), name)
    assert.equal(fs.existsSync(path.join(root, 'references/api/vbi/obsolete.md')), false)
    for (const pkg of ['vbi', 'vquery', 'vseed']) {
      const index = fs.readFileSync(path.join(root, 'references', 'api', pkg, 'index.md'), 'utf8')
      assert.match(index, /updatedApi/)
      assert.doesNotMatch(index, /initialApi/)
      assert.match(fs.readFileSync(path.join(root, 'references', 'api', pkg, 'guide.md'), 'utf8'), /Updated workflow/)
    }
  }
})

test('preserves previous archives and API docs when API generation fails', async (t) => {
  const { repoRoot, source } = fixture(t)
  await buildSkills({ repoRoot })
  const output = path.join(repoRoot, 'dist/skills')
  const previous = contents(output)
  const api = contents(path.join(source, 'references/api'))
  write(repoRoot, 'packages/vbi/src/index.ts', 'export const updatedApi = true')
  fs.unlinkSync(path.join(repoRoot, 'packages/vquery/src/index.ts'))
  const progress = []
  await assert.rejects(() => buildSkills({ repoRoot, onProgress: (event) => progress.push(event) }), /File not found/)
  assert.equal(progress.at(-1).message, '生成 vquery API')
  assert.ok(progress.at(-1).step < progress.at(-1).total)
  assert.deepEqual(contents(output), previous)
  assert.deepEqual(contents(path.join(source, 'references/api')), api)
})

test('rejects missing required resources and symlinks without publishing incomplete archives', async (t) => {
  for (const missing of ['SKILL.md', 'scenarios/visactor-light-dashboard/SKILL.md', 'references/server-runtime']) {
    const { repoRoot, source } = fixture(t)
    fs.rmSync(path.join(source, missing), { recursive: true })
    await assert.rejects(() => buildSkills({ repoRoot }), /ENOENT|Missing/)
    assert.equal(fs.existsSync(path.join(repoRoot, 'dist/skills')), false)
  }
  const { repoRoot, source } = fixture(t)
  fs.symlinkSync(path.join(source, 'SKILL.md'), path.join(source, 'scenarios/visactor-light-dashboard/linked.md'))
  await assert.rejects(() => buildSkills({ repoRoot }), /Unsupported skill resource/)
  assert.equal(fs.existsSync(path.join(repoRoot, 'dist/skills')), false)
})

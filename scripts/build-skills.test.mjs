import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { buildSkills } from './build-skills.mjs'

const scenes = ['light-dashboard', 'map2d-dashboard', 'chart-editor', 'map3d-dashboard']

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
    Array.from({ length: 13 }, (_, i) => i + 1),
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
      '检查资源并打包 light-dashboard.zip',
      '检查资源并打包 map2d-dashboard.zip',
      '检查资源并打包 chart-editor.zip',
      '检查资源并打包 map3d-dashboard.zip',
      '写入分发产物 dist/skills',
    ],
  )
  assert.ok(output.indexOf('[13/13]') < output.indexOf('[build:skills] 完成'))
  for (const name of scenes) {
    assert.ok(output.includes(`${name}.zip`))
    const archive = path.join(repoRoot, 'dist/skills', `${name}.zip`)
    const downloaded = extract(t, archive)
    for (const pkg of ['vbi', 'vquery', 'vseed']) {
      assert.match(fs.readFileSync(path.join(downloaded, name, 'api', `${pkg}-index.md`), 'utf8'), /initialApi/)
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
  write(
    source,
    'SKILL.md',
    '---\nname: visactor-dashboard\ndescription: All dashboards\n---\n\n# All-in-one\n\n[Scenes](scenarios/light-dashboard/SKILL.md)\n\n## 通用模块\n\n[Query](references/visual-query-guide.md) · [Runtime](server-runtime/doc-guide.md) · [API](api/vquery-guide.md) · [Data](assets/visual-query-dashboard-data.js)\n',
  )
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
    write(repoRoot, `scripts/skill-api/${name}.md`, `[Index](${name}-index.md) · [Root](../SKILL.md)\n`)
  }
  fs.appendFileSync(
    path.join(repoRoot, 'packages/vseed/src/index.ts'),
    '\nexport const zChart = { parse: (value: string) => value }\n',
  )
  write(
    source,
    'references/visual-query-guide.md',
    '[Root](../SKILL.md#通用模块) · [API](../api/vbi-guide.md) · [Data](../assets/visual-query-dashboard-data.js) · [Table](../assets/visual-query-dashboard-table.js) · [Style](../assets/visual-query-dashboard-table.css)\n',
  )
  write(source, 'assets/visual-query-dashboard-data.js', 'export const data = []\n')
  write(source, 'assets/visual-query-dashboard-table.js', 'export const table = {}\n')
  write(source, 'assets/visual-query-dashboard-table.css', '.table { color: inherit; }\n')
  write(source, 'server-runtime/doc-guide.md', '[Root](../SKILL.md) · [API](../api/vbi-guide.md)\n')
  write(source, 'server-runtime/.env.example', 'VBI_PORT=4317\n')
  write(source, 'server-runtime/server.mjs', 'export const port = 4317\n')
  write(
    source,
    'references/data-analysis-guide.md',
    '[Contribution](data-analysis-contribution-analysis.md) · [Interaction](deep-analysis-interaction.md)\n',
  )
  write(source, 'references/data-analysis-contribution-analysis.md', '[Query](visual-query-guide.md)\n')
  write(
    source,
    'references/deep-analysis-interaction.md',
    '[Methods](data-analysis-guide.md) · [Query](visual-query-guide.md)\n',
  )
  for (const name of scenes) {
    const scene = `scenarios/${name}`
    write(
      source,
      `${scene}/SKILL.md`,
      `---\nname: ${name}\ndescription: Example dashboard\n---\n\n[Layout](references/layout.md) · [Query](../../references/visual-query-guide.md) · [Analysis](../../references/data-analysis-guide.md) · [Interaction](../../references/deep-analysis-interaction.md) · [Server](../../server-runtime/doc-guide.md) · [API](../../api/vquery-guide.md)\n`,
    )
    write(source, `${scene}/agents/openai.yaml`, `interface:\n  display_name: '${name}'\n`)
    write(
      source,
      `${scene}/references/layout.md`,
      '# Layout\n\n[Scene](../SKILL.md) · [Template](../templates/example.html) · ![Preview](../templates/preview.png)\n' +
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
  const { repoRoot } = fixture(t)
  const skills = path.join(repoRoot, 'skills')
  const before = contents(skills)
  const packages = await buildSkills({ repoRoot })
  assert.deepEqual(
    packages.map(({ name }) => name),
    scenes,
  )
  assert.deepEqual(
    fs.readdirSync(path.join(repoRoot, 'dist/skills')).sort(),
    scenes.map((name) => `${name}.zip`).sort(),
  )
  assert.deepEqual(
    new Map([...contents(skills)].filter(([file]) => !file.startsWith('visactor-dashboard/api/'))),
    before,
  )
  assert.deepEqual(fs.readdirSync(skills).sort(), ['visactor-dashboard'])
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
    const entry = resources.get('SKILL.md').toString()
    assert.equal([...entry.matchAll(/^## 通用模块$/gm)].length, 1)
    assert.ok(entry.includes('[Query](references/visual-query-guide.md)'))
    assert.ok(entry.includes('[Data](assets/visual-query-dashboard-data.js)'))
    assert.doesNotMatch(entry, /All-in-one|\[Scenes\]|scenarios\//)
    assert.ok(resources.has('agents/openai.yaml'))
    assert.ok(resources.has('server-runtime/doc-guide.md'))
    assert.ok(resources.has('server-runtime/.env.example'))
    assert.ok(resources.has('server-runtime/server.mjs'))
    assert.equal(fs.existsSync(path.join(root, 'references/server-runtime')), false)
    assert.ok(
      fs.readdirSync(path.join(root, 'server-runtime'), { withFileTypes: true }).every((entry) => entry.isFile()),
    )
    assert.ok(resources.has('references/data-analysis-guide.md'))
    assert.ok(resources.has('references/data-analysis-contribution-analysis.md'))
    assert.ok(resources.has('references/deep-analysis-interaction.md'))
    assert.equal(resources.get('assets/visual-query-dashboard-data.js').toString(), 'export const data = []\n')
    assert.equal(resources.get('assets/visual-query-dashboard-table.js').toString(), 'export const table = {}\n')
    assert.equal(resources.get('assets/visual-query-dashboard-table.css').toString(), '.table { color: inherit; }\n')
    assert.ok(fs.readdirSync(path.join(root, 'references'), { withFileTypes: true }).every((entry) => entry.isFile()))
    assert.equal(fs.existsSync(path.join(root, 'references/api')), false)
    for (const entry of fs.readdirSync(path.join(root, 'api'), { withFileTypes: true })) {
      assert.ok(entry.isFile(), entry.name)
      assert.match(entry.name, /^(vbi|vseed|vquery)-[^/]+\.md$/)
    }
    assert.equal(resources.has('api/vseed-schemas.md'), false)
    assert.doesNotMatch(resources.get('api/vseed-index.md').toString(), /schemas\.md|zChart/)
    for (const scene of scenes) assert.equal(fs.existsSync(path.join(root, 'scenarios', scene)), false)
    assert.deepEqual(resources.get('templates/preview.png'), Buffer.from([0, 1, 127, 255]))
    for (const [file, data] of resources) {
      assert.ok(file.split(path.sep).length <= 2, file)
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
  fs.utimesSync(path.join(source, 'scenarios/light-dashboard/SKILL.md'), new Date(), new Date())
  assert.deepEqual(
    (await buildSkills({ repoRoot })).map(({ archive }) => fs.readFileSync(archive)),
    first,
  )
  write(source, 'scenarios/light-dashboard/templates/obsolete.txt', 'old')
  await buildSkills({ repoRoot })
  fs.unlinkSync(path.join(source, 'scenarios/light-dashboard/templates/obsolete.txt'))
  write(source, 'scenarios/light-dashboard/templates/example.html', '<p>Updated template</p>')
  write(repoRoot, 'dist/skills/unrelated.txt', 'Preserve unrelated outputs')
  write(repoRoot, 'dist/skills/obsolete-dashboard.zip', 'Old distribution')
  for (const name of scenes) write(repoRoot, `dist/skills/visactor-${name}.zip`, 'Old distribution')
  const packages = await buildSkills({ repoRoot })
  const downloaded = extract(t, packages[0].archive)
  assert.equal(fs.existsSync(path.join(downloaded, 'light-dashboard/templates/obsolete.txt')), false)
  assert.equal(
    fs.readFileSync(path.join(downloaded, 'light-dashboard/templates/example.html'), 'utf8'),
    '<p>Updated template</p>',
  )
  assert.deepEqual(fs.readFileSync(packages[1].archive), first[1])
  assert.equal(fs.existsSync(path.join(repoRoot, 'dist/skills/obsolete-dashboard.zip')), false)
  assert.equal(fs.readFileSync(path.join(repoRoot, 'dist/skills/unrelated.txt'), 'utf8'), 'Preserve unrelated outputs')
  assert.deepEqual(
    fs.readdirSync(path.join(repoRoot, 'dist/skills')).sort(),
    [...scenes.map((name) => `${name}.zip`), 'unrelated.txt'].sort(),
  )
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

  write(source, 'scenarios/map2d-dashboard/templates/example.html', '<p>Latest map</p>')
  await assert.rejects(() => buildSkills({ repoRoot, check: true }), /map2d-dashboard\.zip/)
  assert.deepEqual(contents(output), previous)
  await buildSkills({ repoRoot })
  await buildSkills({ repoRoot, check: true })

  write(repoRoot, 'dist/skills/obsolete-dashboard.zip', 'Old distribution')
  const withObsolete = contents(output)
  await assert.rejects(() => buildSkills({ repoRoot, check: true }), /obsolete-dashboard\.zip/)
  assert.deepEqual(contents(output), withObsolete)
  await buildSkills({ repoRoot })
  for (const name of scenes) write(repoRoot, `dist/skills/visactor-${name}.zip`, 'Old distribution')
  const withPrefixed = contents(output)
  await assert.rejects(() => buildSkills({ repoRoot, check: true }), /visactor-light-dashboard\.zip/)
  assert.deepEqual(contents(output), withPrefixed)
})

test('preserves previous archives when a scene has an unbundled reference', async (t) => {
  const { repoRoot, source } = fixture(t)
  await buildSkills({ repoRoot })
  const output = path.join(repoRoot, 'dist/skills')
  const previous = contents(output)
  write(source, 'scenarios/light-dashboard/templates/example.html', 'New template')
  write(source, 'scenarios/map2d-dashboard/references/layout.md', '[Missing resource](missing.md)')
  await assert.rejects(() => buildSkills({ repoRoot }), /Unbundled skill reference/)
  assert.deepEqual(contents(output), previous)
})

test('rejects reverse and cross-scene dependencies while preserving previous archives', async (t) => {
  for (const owner of [...scenes, 'data-analysis', 'deep-analysis', 'server-runtime', 'visual-query', 'assets']) {
    for (const dependency of scenes.filter((name) => name !== owner)) {
      const { repoRoot, source } = fixture(t)
      const previous = (await buildSkills({ repoRoot })).map(({ archive }) => fs.readFileSync(archive))
      // Use each capability's directory and a normalized path to cover dependency ownership.
      const sceneOwner = scenes.includes(owner)
      const file = sceneOwner
        ? `scenarios/${owner}/references/dependency.md`
        : owner === 'server-runtime'
          ? 'server-runtime/doc-dependency.md'
          : owner === 'assets'
            ? 'assets/dependency.md'
            : `references/${owner}-dependency.md`
      const directory = path.dirname(path.join(source, file))
      const href = `${path.relative(directory, path.join(source, 'scenarios', dependency))}/references/../SKILL.md#entry`
      write(source, file, `[Forbidden](${href})`)
      await assert.rejects(
        () => buildSkills({ repoRoot }),
        new RegExp(`Forbidden skill dependency: ${owner} → ${dependency}`),
      )
      assert.deepEqual(
        scenes.map((name) => fs.readFileSync(path.join(repoRoot, 'dist/skills', `${name}.zip`))),
        previous,
      )
    }
  }
})

test('regenerates changed and missing APIs before every archive build', async (t) => {
  const { repoRoot, source } = fixture(t)
  await buildSkills({ repoRoot })
  write(source, 'api/vbi-obsolete.md', 'Stale API')
  fs.unlinkSync(path.join(source, 'api/vseed-index.md'))
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
      const index = fs.readFileSync(path.join(source, 'api/vbi-index.md'), 'utf8')
      assert.match(index, event.step <= 8 ? /initialApi/ : /updatedApi/)
    },
  })
  assert.equal(progress.length, progress[0].total)
  for (const { name, archive } of packages) {
    const root = path.join(extract(t, archive), name)
    assert.equal(fs.existsSync(path.join(root, 'api/vbi-obsolete.md')), false)
    for (const pkg of ['vbi', 'vquery', 'vseed']) {
      const index = fs.readFileSync(path.join(root, 'api', `${pkg}-index.md`), 'utf8')
      assert.match(index, /updatedApi/)
      assert.doesNotMatch(index, /initialApi/)
      assert.match(fs.readFileSync(path.join(root, 'api', `${pkg}-guide.md`), 'utf8'), /Updated workflow/)
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
  for (const missing of [
    'SKILL.md',
    'scenarios/light-dashboard/SKILL.md',
    'server-runtime',
    'assets',
    'references/data-analysis-guide.md',
  ]) {
    const { repoRoot, source } = fixture(t)
    fs.rmSync(path.join(source, missing), { recursive: true })
    await assert.rejects(() => buildSkills({ repoRoot }), /ENOENT|Missing/)
    assert.equal(fs.existsSync(path.join(repoRoot, 'dist/skills')), false)
  }
  const { repoRoot, source } = fixture(t)
  fs.symlinkSync(path.join(source, 'SKILL.md'), path.join(source, 'scenarios/light-dashboard/linked.md'))
  await assert.rejects(() => buildSkills({ repoRoot }), /Unsupported skill resource/)
  assert.equal(fs.existsSync(path.join(repoRoot, 'dist/skills')), false)
})

test('shared module changes update all standalone entries without copying scene routing', async (t) => {
  const { repoRoot, source } = fixture(t)
  const first = (await buildSkills({ repoRoot })).map(({ archive }) => fs.readFileSync(archive))
  const entry = path.join(source, 'SKILL.md')
  fs.appendFileSync(entry, '\n### Added module\n\n[Analysis](references/data-analysis-guide.md)\n')
  const updated = fs.readFileSync(entry, 'utf8')
  const packages = await buildSkills({ repoRoot })
  for (const [i, { name, archive }] of packages.entries()) {
    assert.notDeepEqual(fs.readFileSync(archive), first[i])
    const content = fs.readFileSync(path.join(extract(t, archive), name, 'SKILL.md'), 'utf8')
    assert.ok(content.includes('### Added module\n\n[Analysis](references/data-analysis-guide.md)'))
    assert.doesNotMatch(content, /All-in-one|\[Scenes\]|scenarios\//)
  }
  assert.equal(fs.readFileSync(entry, 'utf8'), updated)
})

test('validates entry identity, flat layout, collisions and anchors before publishing', async (t) => {
  const { repoRoot, source } = fixture(t)
  await buildSkills({ repoRoot })
  const output = path.join(repoRoot, 'dist/skills')
  const previous = contents(output)
  const rootEntry = fs.readFileSync(path.join(source, 'SKILL.md'), 'utf8')
  const scene = 'scenarios/map3d-dashboard'
  const sceneEntry = fs.readFileSync(path.join(source, scene, 'SKILL.md'), 'utf8')
  for (const [file, content, error] of [
    ['SKILL.md', '# No frontmatter', /Invalid SKILL.md/],
    ['SKILL.md', rootEntry.replace('## 通用模块', '## Other'), /Missing shared modules/],
    [`${scene}/SKILL.md`, sceneEntry.replace('name: map3d-dashboard', 'name: wrong-name'), /Invalid SKILL.md/],
    [`${scene}/SKILL.md`, sceneEntry.replace('description: Example dashboard\n', ''), /Invalid SKILL.md/],
    [`${scene}/SKILL.md`, sceneEntry + '\n## 通用模块\nDuplicate\n', /Duplicate shared modules/],
    [`${scene}/templates/nested/page.html`, 'Nested resource', /must be flat/],
    ['references/SKILL.md', '# Nested skill', /must be flat/],
    [`${scene}/references/visual-query-guide.md`, '# Colliding resource', /Conflicting skill resource/],
    ['references/visual-query-guide.md', '[Missing section](../SKILL.md#missing)', /Missing Markdown anchor/],
    ['SKILL.md', rootEntry + '\n[Scene](scenarios/light-dashboard/SKILL.md)\n', /Forbidden skill dependency: shared/],
  ]) {
    const target = path.join(source, file)
    const original = fs.existsSync(target) ? fs.readFileSync(target) : null
    write(source, file, content)
    await assert.rejects(() => buildSkills({ repoRoot }), error)
    assert.deepEqual(contents(output), previous)
    if (original) fs.writeFileSync(target, original)
    else fs.unlinkSync(target)
  }
  write(repoRoot, 'scripts/skill-api/vbi.md', '[Scene](../scenarios/light-dashboard/SKILL.md)\n')
  await assert.rejects(() => buildSkills({ repoRoot }), /Forbidden skill dependency: shared → light-dashboard/)
  assert.deepEqual(contents(output), previous)
})

test('checks real heading anchors while preserving fenced examples and fragments', async (t) => {
  const { repoRoot, source } = fixture(t)
  const layout = [
    '# Layout',
    '[Layout](#layout) · [Duplicate](#中文-1) · [Encoded](#%E4%B8%AD%E6%96%87)',
    '[HTML](../templates/example.html#demo) · [Root](../SKILL.md#通用模块)',
    '[Remote](https://example.com/#remote)',
    '````markdown',
    '[Example](missing.md#not-a-dependency)',
    '## Example only',
    '```',
    '~~~',
    '````not-a-closing-fence',
    '````',
    '## 中文',
    '## 中文',
    '### Trailing ###',
    '[Trailing](#trailing)',
  ].join('\n')
  for (const name of scenes) write(source, `scenarios/${name}/references/layout.md`, layout)
  const packages = await buildSkills({ repoRoot })
  for (const { name, archive } of packages) {
    assert.equal(fs.readFileSync(path.join(extract(t, archive), name, 'references/layout.md'), 'utf8'), layout)
  }
  write(source, 'scenarios/light-dashboard/references/layout.md', layout + '\n[Invalid](#example-only)\n')
  await assert.rejects(() => buildSkills({ repoRoot }), /Missing Markdown anchor/)
})

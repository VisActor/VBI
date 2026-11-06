import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseOptions } from './visual-test.mjs'
import { loadCases, selectCases, validateResults, acquireLock } from './visual/runner.mjs'
import { saveReport } from '../__tests__/visual/report.mjs'
import Reporter from '../__tests__/visual/reporter.mjs'
import { build } from './visual/build.mjs'
import { execFileSync } from 'node:child_process'

const suite = fileURLToPath(new URL('../__tests__/visual', import.meta.url))
test('首批清单恰好四项，非法参数和结果漏项/重复项拒绝', async () => {
  const cases = await loadCases(suite)
  assert.equal(cases.length, 4)
  assert.equal(selectCases(cases, { case: 'table-select' })[0].id, 'table-select')
  for (const args of [
    ['--offline'],
    ['--baseline', 'abc'],
    ['--case', '../x'],
    ['--update-snapshots'],
    ['--case', 'x', '--dir', 'y'],
  ])
    assert.throws(() => parseOptions(args))
  assert.throws(() => selectCases(cases, { case: 'unknown' }))
  for (const tests of [[], [{ id: 'a' }, { id: 'a' }], [{ id: 'b' }]])
    assert.throws(() => validateResults({ tests }, ['a']))
  validateResults({ tests: [{ id: 'a' }] }, ['a'])
})

test('运行锁互斥，缺少截图和未完成阶段不能判绿', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'vseed-report-'))
  try {
    const release = await acquireLock(dir, { runId: 'test' })
    await assert.rejects(acquireLock(dir, { runId: 'other' }))
    await release()
    const summary = {
      runId: 'test',
      finalized: true,
      status: 'passed',
      cases: [{ id: 'a', purpose: '测试' }],
      issues: [],
      request: {},
      timings: {},
      environment: {},
      selection: { mode: 'all', value: null, totalCount: 1, selectedCount: 1, selectedIds: ['a'] },
    }
    await saveReport(dir, summary)
    const result = JSON.parse(await fs.readFile(path.join(dir, 'summary.json')))
    assert.notEqual(result.status, 'passed')
    assert.equal(result.complete, false)
  } finally {
    await fs.rm(dir, { recursive: true, force: true })
  }
})

test('普通执行异常与显式业务断言分开，阶段超时保留错误', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'vseed-reporter-'))
  const previous = [process.env.VISUAL_RUN_DIR, process.env.VISUAL_PHASE]
  process.env.VISUAL_RUN_DIR = dir
  process.env.VISUAL_PHASE = 'current'
  try {
    for (const [name, business] of [
      ['Error', false],
      ['VisualAssertionError', true],
    ]) {
      const reporter = new Reporter()
      reporter.onTestEnd(
        { title: 'a', annotations: [{ type: 'stage', description: 'verify' }] },
        { status: 'failed', attachments: [], errors: [{ name, message: 'broken' }], duration: 1 },
      )
      reporter.onEnd({ status: 'timedout' })
      const result = JSON.parse(await fs.readFile(path.join(dir, 'current-result.json')))
      assert.equal(result.status, 'error')
      assert.equal(result.tests[0].businessAssertion, business)
      assert.equal(result.tests[0].code, business ? 'CASE_ASSERTION_FAILED' : 'EXECUTION_FAILED')
    }
  } finally {
    for (const [i, key] of ['VISUAL_RUN_DIR', 'VISUAL_PHASE'].entries())
      if (previous[i] === undefined) delete process.env[key]
      else process.env[key] = previous[i]
    await fs.rm(dir, { recursive: true, force: true })
  }
})

// 构建使用继承配置，保留原源码/类型规则；head/base各自传入其冻结工程路径。
test('类型生成仅限制并发，不覆写冻结 tsconfig 或关闭声明', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'vseed-build-'))
  const stopped = new Error('stop after checking build invocation')
  try {
    execFileSync('git', ['init', '--quiet', root])
    await fs.writeFile(path.join(root, '.gitignore'), 'dist/\n')
    await fs.mkdir(path.join(root, 'packages/vseed'), { recursive: true })
    const original = '{"compilerOptions":{"declaration":true,"strict":true}}'
    await fs.writeFile(path.join(root, 'packages/vseed/tsconfig.json'), original)
    await assert.rejects(
      build(
        root,
        path.join(root, 'bundle.js'),
        {
          offline: true,
          async run(command, args) {
            // 在实际运行器接口核对覆盖配置，其余构建参数保持。
            assert.deepEqual(args.slice(1, 3), ['build', '--tsconfig'])
            assert.deepEqual(JSON.parse(await fs.readFile(args[3], 'utf8')), {
              extends: path.join(root, 'packages/vseed/tsconfig.json'),
              compilerOptions: { singleThreaded: true },
            })
            throw stopped
          },
        },
        path.join(root, 'build.log'),
      ),
      (error) => error === stopped,
    )
    assert.equal(await fs.readFile(path.join(root, 'packages/vseed/tsconfig.json'), 'utf8'), original)
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

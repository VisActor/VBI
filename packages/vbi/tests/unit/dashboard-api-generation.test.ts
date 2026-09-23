import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

test('generates the complete dashboard API, navigation, options and resolved Yjs signatures', () => {
  const output = mkdtempSync(path.join(tmpdir(), 'vbi-dashboard-api-'))
  try {
    execFileSync(process.execPath, ['scripts/build-api.mjs', `--output-dir=${output}`], { timeout: 45000 })
    const read = (name: string) => readFileSync(path.join(output, 'dashboardBuilder', name), 'utf8')
    const index = read('index.md')
    for (const method of [
      'applyUpdate',
      'encodeStateAsUpdate',
      'transact',
      'getUUID',
      'getChartBuilder',
      'getInsightBuilder',
      'build',
      'isEmpty',
    ]) {
      expect(index).toContain(`### ${method}`)
    }
    expect(index).toContain('VBIDashboardBuilderOptions')
    expect(index).toContain('VBIDashboardBuilderDependencies')
    expect(index).toContain('encodeStateAsUpdate(targetStateVector?: Uint8Array): Uint8Array')
    expect(index).toContain('applyUpdate(update: Uint8Array, transactionOrigin?: unknown): void')
    const meta = JSON.parse(read('_meta.json'))
    expect(meta.map((entry: { name: string }) => entry.name).sort()).toEqual([
      'chart',
      'insight',
      'theme',
      'undoManager',
    ])
    const history = read('undoManager.md')
    for (const method of [
      'undo',
      'redo',
      'canUndo',
      'canRedo',
      'clear',
      'stopCapturing',
      'addTrackedOrigin',
      'removeTrackedOrigin',
      'observe',
      'destroy',
    ]) {
      expect(history).toContain(`### ${method}`)
    }
    expect(history).toContain('UndoManagerOptions')
    expect(history).toContain('captureTimeout')
    expect(history).toContain('trackedOrigins')
    for (const [kind, node] of [
      ['chart', 'dashboardChart'],
      ['insight', 'dashboardInsight'],
    ]) {
      const collection = read(`${kind}/index.md`)
      for (const method of ['add', 'update', 'remove', 'get', 'find', 'findAll', 'toJSON']) {
        expect(collection).toContain(`### ${method}`)
      }
      const widget = read(`${kind}/${node}.md`)
      for (const method of ['getId', 'getBuilder', 'setTitle', 'setDescription', 'setLayouts', 'toJSON']) {
        expect(widget).toContain(`### ${method}`)
      }
      expect(widget).not.toContain('### getLayouts')
    }
    expect(read('theme.md')).toContain('### observe')
    expect(readFileSync(path.join(output, '_meta.json'), 'utf8')).toContain('dashboardBuilder')
  } finally {
    rmSync(output, { recursive: true, force: true })
  }
}, 60000)

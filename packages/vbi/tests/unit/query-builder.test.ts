import { rs } from '@rstest/core'
import * as Y from 'yjs'
import {
  createVBI,
  VBIQueryBuilder,
  VBIChartBuilder,
  QueryBuilderBase,
  type VBIQueryProps,
  createQuery,
  createEmptyQuery,
  zVBIQueryDSL,
} from '@visactor/vbi'
import { VQuery, type DatasetColumn } from '@visactor/vquery'

const docs: Y.Doc[] = []
const schema: DatasetColumn[] = [
  { name: 'region', type: 'string' },
  { name: 'sales', type: 'number' },
]
const records = [
  { region: 'East', sales: 10 },
  { region: 'East', sales: 10 },
  { region: 'East', sales: 20 },
  { region: 'West', sales: 5 },
]
const connectorId = 'unit-query-builder'
const make = () => {
  const query = createQuery(createEmptyQuery(connectorId))
  docs.push(query.doc)
  return query
}
const syncPeer = (query: VBIQueryBuilder) => {
  const doc = new Y.Doc()
  Y.applyUpdate(doc, query.encodeStateAsUpdate())
  const peer = createVBI().query.create(doc)
  docs.push(doc)
  return peer
}

afterEach(() => {
  docs.splice(0).forEach((doc) => doc.destroy())
  createVBI().connectors.unregister(connectorId)
  rs.restoreAllMocks()
})

describe('query state and Yjs', () => {
  it('derives Chart state operations from the query-owned builder base', () => {
    const query = make()
    const vbi = createVBI()
    const chart = vbi.chart.create(vbi.chart.createEmpty(connectorId))
    docs.push(chart.doc)
    expect(query).toBeInstanceOf(QueryBuilderBase)
    expect(chart).toBeInstanceOf(QueryBuilderBase)
    expect(chart.whereFilter.constructor).toBe(query.whereFilter.constructor)
    expect(chart.havingFilter.constructor).toBe(query.havingFilter.constructor)
    expect(chart.queryMode.constructor).toBe(query.queryMode.constructor)
    chart.measures.add('sales', (node) => node.setEncoding('column'))
    query.measures.add('sales', (node) => node.setAlias('Sales'))
    expect(chart.measures.findAll()[0].getEncoding()).toBe('column')
    expect(query.measures.toJSON()[0]).not.toHaveProperty('encoding')
  })

  it('keeps a derived Chart scoped to its nested Y.Map within a shared document', () => {
    const vbi = createVBI()
    const doc = new Y.Doc()
    docs.push(doc)
    const dsl = new Y.Map<any>(Object.entries(vbi.chart.createEmpty(connectorId)))
    doc.getMap('charts').set('target', dsl)
    const chart = new VBIChartBuilder(doc, undefined, dsl)
    const initial = chart.build()
    const changed = rs.fn()
    chart.observeDeep(changed)
    doc.getMap('unrelated').set('draft', 1)
    expect(changed).not.toHaveBeenCalled()
    expect(chart.undoManager.canUndo()).toBe(false)
    chart.limit.setLimit(4)
    expect(chart.dsl).toBe(dsl)
    expect(chart.build().limit).toBe(4)
    expect(chart.undoManager.undo()).toBe(true)
    expect(chart.build()).toEqual(initial)
    expect(doc.getMap('unrelated').get('draft')).toBe(1)
    expect(chart.undoManager.canUndo()).toBe(false)
    expect(chart.undoManager.redo()).toBe(true)
    expect(chart.build().limit).toBe(4)
  })

  it('creates a pure query DSL and restores JSON with the same IDs and no undo history', () => {
    const vbi = createVBI()
    const query = vbi.query.create(vbi.query.createEmpty(connectorId, 'saved-query'))
    docs.push(query.doc)
    expect(query.getUUID()).toBe('saved-query')
    expect(query.isEmpty()).toBe(true)
    expect(query.undoManager.canUndo()).toBe(false)
    query.dimensions.add('region', (node) => node.setAlias('地区'))
    query.measures.add('sales', (node) => node.setAggregate({ func: 'avg' }).setSort({ order: 'desc' }))
    query.whereFilter.add('sales', (node) => node.setOperator('>').setValue(5))
    query.limit.setLimit(3)
    query.queryMode.setMode('detail')
    const saved = query.build()
    expect(zVBIQueryDSL.parse(saved)).toEqual(saved)
    expect(saved.dimensions[0]).not.toHaveProperty('encoding')
    expect(saved.measures[0]).not.toHaveProperty('encoding')
    const independentSnapshot = query.build()
    independentSnapshot.measures[0].aggregate = { func: 'max' }
    expect(query.build().measures[0].aggregate.func).toBe('avg')
    expect(saved).not.toHaveProperty('chartType')
    expect(saved).not.toHaveProperty('theme')
    const restored = createQuery(JSON.parse(JSON.stringify(saved)))
    docs.push(restored.doc)
    expect(restored.build()).toEqual(saved)
    expect(restored.buildVQuery()).toEqual(query.buildVQuery())
    expect(restored.undoManager.canUndo()).toBe(false)
    expect(() => createQuery({ ...saved, limit: 0 })).toThrow()
    const emptyDoc = new Y.Doc()
    expect(() => createQuery(emptyDoc)).toThrow()
    emptyDoc.destroy()
    const { uuid: _uuid, whereFilter: _where, havingFilter: _having, ...minimal } = createEmptyQuery(connectorId)
    const defaults = createQuery({ ...minimal, limit: undefined })
    docs.push(defaults.doc)
    expect(defaults.getUUID()).toBeTruthy()
    expect(defaults.build().whereFilter.conditions).toEqual([])
  })

  it('rejects JSON containers in an existing Y.Doc without modifying its query data', () => {
    const query = make()
    query.dimensions.add('region', (node) => node.setAlias('Region'))
    query.whereFilter.addGroup('and', (group) => group.add('region', (node) => node.setOperator('eq').setValue('East')))
    const valid = syncPeer(query)
    expect(valid.build()).toEqual(query.build())
    const invalid = (edit: (dsl: Y.Map<any>) => void) => {
      const doc = new Y.Doc()
      Y.applyUpdate(doc, query.encodeStateAsUpdate())
      docs.push(doc)
      const dsl = doc.getMap('dsl')
      edit(dsl)
      const before = dsl.toJSON()
      expect(() => createQuery(doc)).toThrow('containers')
      expect(() => new VBIQueryBuilder(doc)).toThrow('containers')
      expect(dsl.toJSON()).toEqual(before)
    }
    invalid((dsl) => dsl.set('dimensions', query.build().dimensions))
    invalid((dsl) => {
      const fields = new Y.Array()
      fields.push(query.build().dimensions)
      dsl.set('dimensions', fields)
    })
    invalid((dsl) => dsl.set('whereFilter', query.build().whereFilter))
    invalid((dsl) => dsl.get('whereFilter').set('conditions', query.build().whereFilter.conditions))
    invalid((dsl) => {
      const conditions = new Y.Array()
      conditions.push(query.build().whereFilter.conditions)
      dsl.get('whereFilter').set('conditions', conditions)
    })
  })

  it('groups local edits, observes state only and converges independent edits without undoing remote changes', () => {
    const query = make()
    const initial = query.build()
    const deep = rs.fn()
    const top = rs.fn()
    query.observeDeep(deep)
    query.observe(top)
    query.doc.transact(() => {
      query.dimensions.add('region', (node) => node.setAlias('地区'))
      query.measures.add('sales', (node) => node.setAggregate({ func: 'sum' }))
      query.limit.setLimit(10)
    })
    expect(deep).toHaveBeenCalledTimes(1)
    expect(top).toHaveBeenCalledTimes(1)
    const configured = query.build()
    expect(query.undoManager.undo()).toBe(true)
    expect(query.build()).toEqual(initial)
    expect(query.undoManager.redo()).toBe(true)
    expect(query.build()).toEqual(configured)
    query.unobserveDeep(deep)
    query.unobserve(top)
    const peer = syncPeer(query)
    const dim = query.dimensions.findAll()[0].getId()
    query.undoManager.clear()
    peer.undoManager.clear()
    query.dimensions.update(dim, (node) => node.setAlias('Local'))
    peer.limit.setLimit(4)
    const a = query.encodeStateAsUpdate(Y.encodeStateVector(peer.doc))
    const b = peer.encodeStateAsUpdate(Y.encodeStateVector(query.doc))
    query.applyUpdate(b, 'remote')
    peer.applyUpdate(a, 'remote')
    expect(query.build()).toEqual(peer.build())
    expect(query.undoManager.undo()).toBe(true)
    expect(query.build().dimensions[0].alias).toBe('地区')
    expect(query.limit.getLimit()).toBe(4)
    peer.applyUpdate(query.encodeStateAsUpdate(), 'remote')
    expect(query.build()).toEqual(peer.build())
    expect(peer.undoManager.undo()).toBe(true)
    expect(peer.limit.getLimit()).toBe(10)
    expect(peer.build().dimensions[0].alias).toBe('地区')
  })

  it('undoes a complete filter edit rather than exposing partially configured conditions', () => {
    const query = make()
    query.whereFilter.addGroup('or', (group) => {
      group.add('region', (node) => node.setOperator('eq').setValue('East'))
      group.addGroup('and', (nested) => nested.add('sales', (node) => node.setOperator('>').setValue(5)))
    })
    const saved = query.build()
    expect(query.undoManager.undo()).toBe(true)
    expect(query.build().whereFilter.conditions).toEqual([])
    expect(query.undoManager.canUndo()).toBe(false)
    query.undoManager.redo()
    expect(query.build()).toEqual(saved)
    query.havingFilter.addGroup('and', (group) =>
      group.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('>').setValue(10)),
    )
    expect(query.undoManager.undo()).toBe(true)
    expect(query.build().havingFilter.conditions).toEqual([])
  })

  it('reuses query-only field operations and supports removal, missing IDs and subscriptions', () => {
    const query = make()
    const dimensionChanges = rs.fn()
    const measureChanges = rs.fn()
    const stopDimension = query.dimensions.observe(dimensionChanges)
    const stopMeasure = query.measures.observe(measureChanges)
    query.dimensions.add('region', (node) =>
      node.setAlias('Region').setAggregate({ func: 'toMonth' }).clearAggregate().setSort({ order: 'asc' }).clearSort(),
    )
    query.measures.add('sales', (node) =>
      node.setAlias('Sales').setAggregate({ func: 'sum' }).setSort({ order: 'desc' }).clearSort(),
    )
    const dimension = query.dimensions.find((node) => node.getField() === 'region')!
    const measure = query.measures.find((node) => node.getField() === 'sales')!
    expect(dimension.getSort()).toBeUndefined()
    expect(measure.getSort()).toBeUndefined()
    expect(dimension.toJSON()).toEqual(query.dimensions.toJSON()[0])
    expect(measure.toJSON()).toEqual(query.measures.toJSON()[0])
    expect(query.dimensions.find(() => false)).toBeUndefined()
    expect(query.measures.find(() => false)).toBeUndefined()
    query.measures.update(measure.getId(), (node) => node.setAlias('Updated'))
    expect(() => query.dimensions.update('missing', () => {})).toThrow('not found')
    expect(() => query.measures.update('missing', () => {})).toThrow('not found')
    stopDimension()
    stopMeasure()
    const counts = [dimensionChanges.mock.calls.length, measureChanges.mock.calls.length]
    query.dimensions.remove(dimension.getId()).remove('missing')
    query.measures.remove(measure.getId()).remove('missing')
    expect(query.isEmpty()).toBe(true)
    expect([dimensionChanges.mock.calls.length, measureChanges.mock.calls.length]).toEqual(counts)
  })
})

describe('query execution and profile', () => {
  it('shares Chart query semantics, retains raw duplicates and profiles through VBI without changing Yjs', async () => {
    const engine = new VQuery()
    await engine.createDataset(connectorId, schema, { type: 'json', rawDataset: records })
    const dataset = await engine.connectDataset(connectorId)
    const vbi = createVBI()
    const execute = rs.fn(async ({ queryDSL }) => ({ dataset: (await dataset.query(queryDSL)).dataset }))
    vbi.connectors.register(connectorId, { discoverSchema: async () => schema, query: execute })
    const query = make()
    query.dimensions.add('region', (node) => node.setAlias('Region'))
    query.measures.add('sales', (node) => node.setAggregate({ func: 'sum' }))
    const dim = query.dimensions.findAll()[0].getId()
    const sales = query.measures.findAll()[0].getId()
    const chart = vbi.chart.create({
      ...query.build(),
      chartType: 'table',
      theme: 'light',
      locale: 'zh-CN',
      measures: query.build().measures.map((measure) => ({ ...measure, encoding: 'column' })),
    })
    docs.push(chart.doc)
    try {
      expect(query.buildVQuery()).toEqual(chart.buildVQuery())
      expect((await query.query()).dataset).toEqual((await chart.query()).dataset)
      expect(await query.queryProfile()).toEqual(await chart.queryProfile())
      query.queryMode.setMode('detail')
      query.whereFilter.add('sales', (node) => node.setOperator('>').setValue(5))
      query.limit.setLimit(3)
      query.undoManager.clear()
      const before = query.encodeStateAsUpdate()
      const changed = rs.fn()
      query.observeDeep(changed)
      const rows = await query.query()
      expect(rows.dataset.map((row) => row[sales])).toEqual([10, 10, 20])
      const stats = await query.queryProfile({
        columns: [sales],
        bins: { maxBins: 2 },
        signal: new AbortController().signal,
      })
      expect(stats).toMatchObject({ rowCount: 3, columns: { [sales]: { validCount: 3, min: 10, max: 20 } } })
      expect(stats.columns).not.toHaveProperty(dim)
      expect(query.encodeStateAsUpdate()).toEqual(before)
      expect(changed).not.toHaveBeenCalled()
      expect(query.undoManager.canUndo()).toBe(false)
      query.havingFilter.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('>').setValue(0))
      expect(() => query.buildVQuery()).toThrow('HAVING')
    } finally {
      await dataset.disconnect()
      await engine.close()
    }
  })

  it('uses the fixed snapshot for in-flight operations and injected connector resolution', async () => {
    const query = make()
    query.dimensions.add('region', (node) => node.setAlias('Region'))
    let resume!: () => void
    const wait = new Promise<void>((resolve) => {
      resume = resolve
    })
    const id = query.dimensions.findAll()[0].getId()
    const execute = rs.fn(async (_request: VBIQueryProps) => ({ dataset: [{ [id]: 'East' }] }))
    const resolveConnector = rs.fn(async () => {
      await wait
      return { discoverSchema: async () => schema, query: execute }
    })
    const injected = createQuery(query.build(), { resolveConnector })
    docs.push(injected.doc)
    const pending = injected.query({ signal: new AbortController().signal })
    injected.limit.setLimit(1)
    resume()
    await pending
    expect(execute.mock.calls[0][0].queryDSL.limit).toBe(1000)
    expect(injected.buildVQuery().limit).toBe(1)
    expect(resolveConnector).toHaveBeenCalledWith(connectorId)
    expect(await injected.getSchema()).toEqual(schema)
  })

  it('supports custom compile/query adapters without VSeed contexts', async () => {
    const result = { dataset: [{ custom: 7 }] }
    const execute = rs.fn(async (context) => {
      expect(context).not.toHaveProperty('seedDSL')
      return result
    })
    const query = createQuery<{ source: string }>(createEmptyQuery(connectorId), {
      adapters: { buildVQuery: ({ vbiDSL }) => ({ source: vbiDSL.connectorId }), query: execute },
    })
    docs.push(query.doc)
    expect(query.buildVQuery()).toEqual({ source: connectorId })
    expect(await query.query()).toBe(result)
    await expect(query.queryProfile()).rejects.toThrow('Unsupported query property')
    expect(execute).toHaveBeenCalledTimes(1)
    expect(execute.mock.calls[0][0].builder).toBe(query)
    expect(execute.mock.calls[0][0].dsl).toBe(query.dsl)
  })

  it('honors cancellation before and after execution and propagates errors without retry', async () => {
    const query = make()
    await expect(query.query()).rejects.toThrow('not registered')
    const controller = new AbortController()
    const error = new Error('cancelled')
    controller.abort(error)
    await expect(query.query({ signal: controller.signal })).rejects.toBe(error)
    await expect(query.queryProfile({ signal: controller.signal })).rejects.toBe(error)
    const delayed = new AbortController()
    query.adapters.query = async () => {
      delayed.abort(error)
      return { dataset: [] }
    }
    await expect(query.query({ signal: delayed.signal })).rejects.toBe(error)
    const failure = new Error('query failure')
    query.adapters.query = rs.fn(async () => {
      throw failure
    })
    await expect(query.query()).rejects.toBe(failure)
    expect(query.adapters.query).toHaveBeenCalledTimes(1)
  })

  it('stops ordinary queries when cancelled during connector resolution, schema discovery or execution', async () => {
    for (const phase of ['resolve', 'schema', 'query']) {
      const controller = new AbortController()
      const error = new Error(`cancelled during ${phase}`)
      const execute = rs.fn(async () => {
        if (phase === 'query') controller.abort(error)
        return { dataset: [] }
      })
      const discoverSchema = rs.fn(async () => {
        if (phase === 'schema') controller.abort(error)
        return schema
      })
      const query = createQuery(createEmptyQuery(connectorId), {
        resolveConnector: async () => {
          if (phase === 'resolve') controller.abort(error)
          return { query: execute, discoverSchema }
        },
      })
      docs.push(query.doc)
      await expect(query.query({ signal: controller.signal })).rejects.toBe(error)
      expect(discoverSchema).toHaveBeenCalledTimes(phase === 'resolve' ? 0 : 1)
      expect(execute).toHaveBeenCalledTimes(phase === 'query' ? 1 : 0)
    }
  })

  it('preserves Chart compilation of presentation groups without persisting them in query state', () => {
    const vbi = createVBI()
    const chart = vbi.chart.create({
      ...vbi.chart.createEmpty(connectorId),
      dimensions: [{ alias: 'Group', children: [{ id: 'group-dim', field: 'region', alias: 'Region' }] }],
      measures: [
        {
          alias: 'Group',
          children: [
            { id: 'group-measure', field: 'sales', alias: 'Sales', encoding: 'column', aggregate: { func: 'sum' } },
          ],
        },
      ],
    })
    docs.push(chart.doc)
    expect(chart.buildVQuery().select).toEqual([])
    expect(chart.build().dimensions[0]).toHaveProperty('children')
  })
})

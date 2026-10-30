import { compileQuery, getQuerySchema, validateQuery, VQuery } from '@visactor/vquery'
import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'

const columns: DatasetColumn[] = [
  { name: 'category', type: 'string' },
  { name: 'value', type: 'number' },
]

it('validates nested filters against subquery aliases and aggregate result types', () => {
  const from: VQueryDSL = {
    select: [
      { field: 'category', alias: 'label' },
      { field: 'value', alias: 'total', aggr: { func: 'sum' } },
    ],
    groupBy: ['category'],
  }
  const nested = (node: unknown) => ({ op: 'and', conditions: [{ op: 'or', conditions: [node] }] })
  for (const dialect of ['mysql', 'duckdb'] as const) {
    for (const slot of ['where', 'when', 'having']) {
      const query = (node: unknown) => ({
        from,
        select: slot === 'when' ? [{ field: 'total', when: nested(node) }] : ['total'],
        ...(slot === 'when' ? {} : { [slot]: nested(node) }),
      })
      const compile = (node: unknown) => compileQuery(query(node) as VQueryDSL, { table: 'data', columns, dialect })
      const aggr = slot === 'having' ? { func: 'count' } : undefined
      expect(compile({ field: 'total', aggr, op: 'in', value: [1, null] }).parameters).toEqual([1, null])
      expect(() => compile({ field: 'total', aggr, op: 'in', value: [1, '2'] })).toThrow(
        'Filter value does not match number column: total',
      )
      expect(() => compile(null)).toThrow('Invalid filter')
      expect(() => compile({ op: 'and', conditions: null })).toThrow('Invalid filter group')
      const text = { field: 'label', op: '=', value: 'A' }
      if (slot === 'having') {
        expect(compile({ ...text, aggr: { func: 'min' } }).parameters).toEqual(['A'])
        expect(() => compile({ ...text, aggr: { func: 'count' } })).toThrow('does not match number column: label')
        expect(() => compile({ ...text, aggr: { func: 'sum' }, value: 1 })).toThrow(
          'sum requires a number column: label',
        )
        expect(() => compile(text)).toThrow('aggr.func is required')
      } else expect(compile(text).parameters).toEqual(['A'])
    }
  }
})

it('uses the declared source types consistently with ordinary, conditional and nested queries', async () => {
  const engine = new VQuery()
  await engine.createDataset('typed-source', columns, {
    type: 'json',
    rawDataset: [
      { category: '1', value: 1 },
      { category: '2', value: 2 },
    ],
  })
  const dataset = await engine.connectDataset('typed-source')
  try {
    const conditions: Array<VQueryDSL['where']> = [undefined, { op: 'and', conditions: [] }]
    for (const when of conditions) {
      await expect(dataset.query({ select: [{ field: 'category', aggr: { func: 'sum' }, when }] })).rejects.toThrow(
        'requires a number column',
      )
      await expect(
        dataset.query({
          select: [{ field: 'value', when }],
          where: { op: 'and', conditions: [{ field: 'value', op: '=', value: '2' }] },
        }),
      ).rejects.toThrow('does not match number column')
      expect((await dataset.query({ select: [{ field: 'value', aggr: { func: 'sum' }, when }] })).dataset).toEqual([
        { value: 3 },
      ])
    }
    await expect(
      dataset.query({
        from: { select: [{ field: 'category', alias: 'label' }] },
        select: [{ field: 'label', aggr: { func: 'sum' } }],
      }),
    ).rejects.toThrow('requires a number column')
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})

it('compiles conditional aggregates within a single query DSL', async () => {
  const query: VQueryDSL = {
    select: [
      { field: '*', alias: 'rows', aggr: { func: 'count' } },
      {
        field: 'value',
        alias: 'positive',
        aggr: { func: 'sum' },
        when: { op: 'and', conditions: [{ field: 'value', op: '>=', value: 5 }] },
      },
      {
        field: 'value',
        alias: 'missing',
        aggr: { func: 'count' },
        when: { op: 'and', conditions: [{ field: 'value', op: '<', value: 0 }] },
      },
    ],
  }
  for (const dialect of ['mysql', 'duckdb'] as const) {
    const compiled = compileQuery(query, { table: 'data', columns, dialect })
    expect(compiled.sql).toContain('case when')
    expect(compiled.sql).toContain('count(*)')
  }
  const engine = new VQuery()
  await engine.createDataset('conditional', columns, {
    type: 'json',
    rawDataset: [
      { category: 'a', value: 3 },
      { category: 'a', value: 7 },
    ],
  })
  const dataset = await engine.connectDataset('conditional')
  try {
    expect((await dataset.query(query)).dataset).toEqual([{ rows: 2, positive: 7, missing: 0 }])
    expect(
      (await dataset.query({ select: [{ field: 'value', when: { op: 'and', conditions: [] } }] })).dataset,
    ).toEqual([{ value: 3 }, { value: 7 }])
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})

it('shares equivalent conditional fields across ordinary and statistical aggregates', async () => {
  const when: VQueryDSL['where'] = { op: 'and', conditions: [{ field: 'value', op: 'between', value: [0, 5] }] }
  const query: VQueryDSL = {
    select: [
      ...(['count', 'min', 'max', 'count_distinct', 'median'] as const).map((func) => ({
        field: 'value',
        alias: func,
        aggr: { func },
        when: structuredClone(when),
      })),
      {
        field: 'value',
        alias: 'q75',
        aggr: { func: 'quantile', quantile: 0.75 },
        when: { conditions: [{ value: [0, 5], op: 'between', field: 'value' }], op: 'and' },
      },
    ],
  }
  for (const dialect of ['mysql', 'duckdb'] as const) {
    const compiled = compileQuery(query, { table: 'data', columns, dialect })
    expect(compiled.sql.match(/end as ["`]__vquery_when_/g)).toHaveLength(1)
    expect(compiled.parameters).toEqual([0.75, 0, 5])
  }
  const engine = new VQuery()
  await engine.createDataset('shared-conditions', columns, {
    type: 'json',
    rawDataset: [0, 1, 2, null, 6].map((value) => ({ category: 'a', value })),
  })
  const dataset = await engine.connectDataset('shared-conditions')
  try {
    expect((await dataset.query(query)).dataset).toEqual([
      { count: 3, min: 0, max: 2, count_distinct: 3, median: 1, q75: 2 },
    ])
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})

it('keeps different conditional fields, predicates and parameter types separate', () => {
  for (const dialect of ['mysql', 'duckdb'] as const) {
    const date = new Date('2026-01-01T00:00:00.000Z')
    const query: VQueryDSL = {
      select: [
        { field: 'value', alias: 'positive', when: { op: 'and', conditions: [{ field: 'value', op: '>', value: 0 }] } },
        { field: 'value', alias: 'large', when: { op: 'and', conditions: [{ field: 'value', op: '>', value: 1 }] } },
        { field: 'other', alias: 'other', when: { op: 'and', conditions: [{ field: 'value', op: '>', value: 0 }] } },
        { field: 'date', alias: 'instant', when: { op: 'and', conditions: [{ field: 'date', op: '=', value: date }] } },
        {
          field: 'date',
          alias: 'text',
          when: { op: 'and', conditions: [{ field: 'date', op: '=', value: date.toISOString() }] },
        },
      ],
    }
    const compiled = compileQuery(query, {
      table: 'data',
      columns: [...columns, { name: 'other', type: 'number' }, { name: 'date', type: 'datetime' }],
      dialect,
    })
    expect(compiled.sql.match(/end as ["`]__vquery_when_/g)).toHaveLength(5)
    expect(compiled.parameters).toEqual([0, 1, 0, '2026-01-01 00:00:00.000', date.toISOString()])
  }
})

it('retains both output aliases when shared conditional projections are grouped', async () => {
  const engine = new VQuery()
  await engine.createDataset('shared-groups', columns, {
    type: 'json',
    rawDataset: [1, 2, 3].map((value) => ({ category: 'a', value })),
  })
  const dataset = await engine.connectDataset('shared-groups')
  const when: VQueryDSL['where'] = { op: 'and', conditions: [{ field: 'value', op: '>', value: 2 }] }
  try {
    expect(
      (
        await dataset.query({
          select: [
            { field: 'value', alias: 'bucket', when },
            { field: 'value', alias: 'copy', when: structuredClone(when) },
            { field: '*', alias: 'count', aggr: { func: 'count' } },
          ],
          groupBy: ['bucket', 'copy'],
          orderBy: [{ field: 'bucket' }],
        })
      ).dataset,
    ).toEqual([
      { bucket: 3, copy: 3, count: 1 },
      { bucket: null, copy: null, count: 2 },
    ])
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})

it('infers projected names and validates conditional fields', () => {
  expect(getQuerySchema({ select: [] }, columns)).toEqual(columns)
  expect(
    getQuerySchema(
      {
        select: [
          '*',
          'unknown',
          'category',
          { field: 'value' },
          { field: 'value', aggr: { func: 'to_year' } },
          { field: 'value', alias: 'minimum', aggr: { func: 'min' } },
          { field: 'value', alias: 'maximum', aggr: { func: 'max' } },
        ],
      },
      columns,
    ),
  ).toEqual([
    ...columns,
    { name: 'category', type: 'string' },
    { name: 'value', type: 'number' },
    { name: 'value', type: 'string' },
    { name: 'minimum', type: 'number' },
    { name: 'maximum', type: 'number' },
  ])
  expect(() => validateQuery({ select: [{ field: '*', when: { op: 'and', conditions: [] } }] })).toThrow(
    'require a field',
  )
  expect(() =>
    validateQuery(
      { select: [{ field: 'value', when: { op: 'and', conditions: [{ field: 'value', op: '>', value: 'x' }] } }] },
      columns,
    ),
  ).toThrow('does not match')
})

it('avoids collisions and keeps conditional wildcard helpers private', async () => {
  const schema: DatasetColumn[] = [...columns, { name: '__vquery_when_0', type: 'number' }]
  const query: VQueryDSL<{ value: number; category: string }> = {
    select: [
      '*',
      { field: 'value', alias: '__vquery_when_1' },
      { field: 'value', alias: 'positive', when: { op: 'and', conditions: [{ field: 'value', op: '>', value: 0 }] } },
    ],
  }
  for (const dialect of ['mysql', 'duckdb'] as const) {
    expect(compileQuery(query, { table: 'data', dialect, columns: schema }).sql).toContain('__vquery_when_2')
    expect(() => compileQuery(query, { table: 'data', dialect })).toThrow('require source schema')
    expect(compileQuery({ select: ['*'] }, { table: 'data', dialect }).sql).toMatch(/^select \* from/)
    expect(
      compileQuery(
        { select: [{ field: 'value', aggr: { func: 'median' }, when: { op: 'and', conditions: [] } }] },
        { table: 'data', columns: schema, dialect },
      ).sql,
    ).toContain('__vquery_when_1')
  }
  const engine = new VQuery()
  await engine.createDataset('wildcard', schema, {
    type: 'json',
    rawDataset: [{ category: 'a', value: 1, __vquery_when_0: null }],
  })
  const dataset = await engine.connectDataset('wildcard')
  try {
    expect((await dataset.query(query)).dataset).toEqual([
      { value: 1, category: 'a', __vquery_when_0: null, __vquery_when_1: 1, positive: 1 },
    ])
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})

it('groups conditional projections by their declared output alias', async () => {
  const engine = new VQuery()
  await engine.createDataset('group-source', columns, {
    type: 'json',
    rawDataset: [1, 2, 3].map((value) => ({ category: 'a', value })),
  })
  const dataset = await engine.connectDataset('group-source')
  try {
    expect(
      (
        await dataset.query({
          select: [
            { field: 'value', when: { op: 'and', conditions: [{ field: 'value', op: '>', value: 2 }] } },
            { field: '*', alias: 'count', aggr: { func: 'count' } },
          ],
          groupBy: ['value', 'category'],
          orderBy: [{ field: 'value' }],
        })
      ).dataset,
    ).toEqual([
      { value: 3, count: 1 },
      { value: null, count: 2 },
    ])
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})

it('supports typed count(*) with statistical aggregates and a stable default result name', () => {
  const query: VQueryDSL<{ value: number }> = {
    select: [
      { field: '*', aggr: { func: 'count' } },
      { field: 'value', aggr: { func: 'median' } },
    ],
  }
  const compiled = compileQuery(query, { table: 'data', columns })
  expect(compiled.sql).not.toContain('`*`')
  expect(compiled.sql).toContain('as `count`')
  expect(getQuerySchema(query, columns)).toEqual([
    { name: 'count', type: 'number' },
    { name: 'value', type: 'number' },
  ])
  expect(() => validateQuery({ select: [{ field: '*', aggr: { func: 'sum' } }] })).toThrow('requires count')
})

it('expresses SQL subqueries explicitly in FROM and preserves every inner query clause', async () => {
  const subquery: VQueryDSL = {
    select: ['category', { field: 'value', alias: 'total', aggr: { func: 'sum' } }],
    where: { op: 'and', conditions: [{ field: 'value', op: '>', value: 0 }] },
    groupBy: ['category'],
    having: { op: 'and', conditions: [{ field: 'value', aggr: { func: 'sum' }, op: '>', value: 3 }] },
    orderBy: [{ field: 'total', order: 'desc' }],
    limit: 1,
  }
  const query: VQueryDSL = {
    from: { from: subquery, select: [] },
    select: [{ field: 'total', alias: 'maximum', aggr: { func: 'max' } }],
  }
  for (const dialect of ['mysql', 'duckdb'] as const) {
    const compiled = compileQuery(query, { table: 'data', columns, dialect })
    expect(compiled.sql).toContain('__vquery_subquery')
    expect(compiled.sql).toContain('having')
  }
  expect(getQuerySchema(query, columns)).toEqual([{ name: 'maximum', type: 'number' }])
  for (const from of [null, 'table', {}, { select: null }]) expect(() => validateQuery({ select: [], from })).toThrow()
  const engine = new VQuery()
  await engine.createDataset('subquery', columns, {
    type: 'json',
    rawDataset: [
      { category: 'a', value: 3 },
      { category: 'a', value: 4 },
      { category: 'b', value: 5 },
      { category: 'c', value: -1 },
    ],
  })
  const dataset = await engine.connectDataset('subquery')
  try {
    expect((await dataset.query(query)).dataset).toEqual([{ maximum: 7 }])
    expect(
      (
        await dataset.query({
          from: {
            select: [
              {
                field: 'value',
                alias: 'positive',
                when: { op: 'and', conditions: [{ field: 'value', op: '>', value: 0 }] },
              },
            ],
          },
          select: [{ field: 'positive', aggr: { func: 'sum' } }],
        })
      ).dataset,
    ).toEqual([{ positive: 12 }])
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})

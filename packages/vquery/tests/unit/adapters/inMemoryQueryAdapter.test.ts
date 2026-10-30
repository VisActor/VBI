import { InMemoryQueryAdapter } from '@visactor/vquery'

describe('InMemoryQueryAdapter', () => {
  let adapter: InMemoryQueryAdapter

  beforeEach(() => {
    adapter = new InMemoryQueryAdapter()
  })

  afterEach(async () => {
    await adapter.close()
  })

  it('requires an open adapter', async () => {
    const source = { type: 'json' as const, blob: new Blob(['[]']) }
    await expect(adapter.loadDataset('test', [], source)).rejects.toThrow('query adapter is not open')
    await expect(adapter.query('select 1')).rejects.toThrow('query adapter is not open')
    await expect(adapter.getSchema('test')).rejects.toThrow('query adapter is not open')
    await expect(adapter.dropDataset('test')).rejects.toThrow('query adapter is not open')
  })

  it('loads, queries, describes, and drops a dataset', async () => {
    await adapter.open()
    await adapter.loadDataset(
      'test',
      [
        { name: 'category', type: 'string' },
        { name: 'value', type: 'number' },
      ],
      {
        type: 'json',
        blob: new Blob([
          JSON.stringify([
            { category: 'a', value: 1 },
            { category: 'a', value: 2 },
            { category: 'b', value: 4 },
          ]),
        ]),
      },
    )

    const result = await adapter.query(
      'select "category", sum("value") as "total" from "test" group by "category" order by "total" desc limit 1',
    )
    expect(result.dataset).toEqual([{ category: 'b', total: 4 }])
    expect(result.table.numRows).toBe(1)
    expect(result.table.toArray()).toEqual(result.dataset)
    expect(await adapter.getSchema('test')).toEqual([
      { cid: 0, name: 'category', type: 'string', notnull: false, dflt_value: null, pk: false },
      { cid: 1, name: 'value', type: 'number', notnull: false, dflt_value: null, pk: false },
    ])

    expect(
      (
        await adapter.query(
          `select cast((1) as integer) as "number", 'it''s' as "text", true as "yes", false as "no", null as "empty", -1 as "negative";`,
        )
      ).dataset,
    ).toEqual([{ number: 1, text: "it's", yes: true, no: false, empty: null, negative: -1 }])
    expect((await adapter.query('select * from "test" where true')).dataset).toHaveLength(3)
    expect((await adapter.query('select * from "test" where null')).dataset).toEqual([])
    expect((await adapter.query('select 1 as "x" where 1 in ()')).dataset).toEqual([])
    expect((await adapter.query(`select "category" from "test" where "category" ilike 'A%'`)).dataset).toEqual([
      { category: 'a' },
      { category: 'a' },
    ])
    expect((await adapter.query(`select "category" from "test" where "category" not like 'a'`)).dataset).toEqual([
      { category: 'b' },
    ])
    expect((await adapter.query('select "category" from "test" where "value" <> 1')).dataset).toEqual([
      { category: 'a' },
      { category: 'b' },
    ])
    expect(
      (await adapter.query('select var_samp("value") as "variance" from "test" where "value" = 1')).dataset,
    ).toEqual([{ variance: null }])
    expect(
      (await adapter.query(`select strftime('Thu, 02 Jan 2020 00:00:00 GMT', '%Y-%m-%d') as "date"`)).dataset,
    ).toEqual([{ date: '2020-01-02' }])
    expect(
      (await adapter.query('select count(*) as "count" from "test" group by round("value") order by "count"')).dataset,
    ).toEqual([{ count: 1 }, { count: 1 }, { count: 1 }])
    expect(
      (await adapter.query('select count(*) as "count" from "test" group by "value" order by "count"')).dataset,
    ).toEqual([{ count: 1 }, { count: 1 }, { count: 1 }])

    await adapter.loadDataset('quoted', [], {
      type: 'csv',
      blob: new Blob(['\uFEFFname,note\r\n"A","said ""hi"""\r\n\r\nB,last']),
    })
    expect((await adapter.query('select "name", "note" from "quoted"')).dataset).toEqual([
      { name: 'A', note: 'said "hi"' },
      { name: 'B', note: 'last' },
    ])

    await adapter.loadDataset('lines', [{ name: 'value', type: 'number' }], {
      type: 'json',
      blob: new Blob(['{"value":1}\n{"value":"invalid"}']),
    })
    expect((await adapter.query('select "value" from "lines" order by "value"')).dataset).toEqual([
      { value: 1 },
      { value: null },
    ])
    await adapter.loadDataset('object', [{ name: 'flag', type: 'string' }], {
      type: 'json',
      blob: new Blob(['{"flag":true}']),
    })
    expect((await adapter.query('select "flag" from "object"')).dataset).toEqual([{ flag: 'true' }])
    await adapter.loadDataset('empty', [], { type: 'json', blob: new Blob([]) })
    expect((await adapter.query('select * from "empty"')).dataset).toEqual([])

    await expect(adapter.loadDataset('primitive', [], { type: 'json', blob: new Blob(['1']) })).rejects.toThrow(
      'JSON dataset must contain an object or an array of objects',
    )
    await expect(adapter.query('select @')).rejects.toThrow('Unsupported SQL character')
    await expect(adapter.query('select -')).rejects.toThrow('Unexpected end of SQL expression')
    await expect(adapter.query('select')).rejects.toThrow('Unexpected end of SQL expression')
    await expect(adapter.query('select (1')).rejects.toThrow('Expected ), received end of SQL')
    await expect(adapter.query('select 1::decimal(')).rejects.toThrow('Unterminated SQL cast type')
    await expect(adapter.query('select 1 as 2')).rejects.toThrow('Expected SQL identifier')
    await expect(adapter.query('select 1 as "x" limit nope')).rejects.toThrow('LIMIT requires a number')
    await expect(adapter.query('select 1 as "x" offset 1')).rejects.toThrow('Unsupported SQL clause')
    await expect(adapter.query('select 1 as "x" where 1 not = 2')).rejects.toThrow(
      'Expected IN, BETWEEN, LIKE, or ILIKE after NOT',
    )
    await expect(adapter.query('select unknown("value") as "x" from "test"')).rejects.toThrow(
      'Unsupported SQL function',
    )
    await expect(adapter.query('select 1')).rejects.toThrow('Computed SELECT expressions require an alias')

    await adapter.dropDataset('test')
    await expect(adapter.query('select * from "test"')).rejects.toThrow('Dataset test is not loaded')
    await expect(adapter.getSchema('test')).rejects.toThrow('Dataset test is not loaded')
  })

  it('orders nulls last regardless of their input position', async () => {
    await adapter.open()
    await adapter.loadDataset('nullable', [{ name: 'value', type: 'number' }], {
      type: 'json',
      blob: new Blob([JSON.stringify([{ value: null }, { value: 2 }, { value: 1 }])]),
    })

    expect((await adapter.query('select "value" from "nullable" order by "value"')).dataset).toEqual([
      { value: 1 },
      { value: 2 },
      { value: null },
    ])
  })

  it('orders strings by Unicode code point instead of the host locale', async () => {
    await adapter.open()
    await adapter.loadDataset('cities', [{ name: 'city', type: 'string' }], {
      type: 'json',
      blob: new Blob([JSON.stringify([{ city: '丽水' }, { city: '临海' }, { city: '丰县' }, { city: '临' }])]),
    })

    expect((await adapter.query('select "city" from "cities" order by "city"')).dataset).toEqual([
      { city: '丰县' },
      { city: '临' },
      { city: '临海' },
      { city: '丽水' },
    ])
  })

  it('can be opened and closed repeatedly', async () => {
    await expect(adapter.close()).resolves.not.toThrow()
    await adapter.open()
    await adapter.close()
    await adapter.open()
    await expect(adapter.close()).resolves.not.toThrow()
  })
})

import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'

describe('WhereFiltersBuilder', () => {
  test('add', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('sales', (node) => {
      node.setOp('gt').setValue(1000)
    })

    const json = builder.build().whereFilters as any
    expect(json.conditions.length).toBe(1)
    expect(json.conditions[0].field).toBe('sales')
    expect(json.conditions[0].op).toBe('gt')
    expect(json.conditions[0].value).toBe(1000)
  })

  test('add with all fields', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('region', (node) => {
      node.setOp('eq').setValue('Beijing')
    })

    const result = builder.build()
    const whereFilters = result.whereFilters as any
    expect(whereFilters.conditions[0].field).toBe('region')
    expect(whereFilters.conditions[0].op).toBe('eq')
    expect(whereFilters.conditions[0].value).toBe('Beijing')
  })

  test('update', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('sales', (node) => {
      node.setOp('gt').setValue(1000)
    })
    builder.whereFilters.add('region', (node) => {
      node.setOp('eq').setValue('Beijing')
    })

    const json = builder.whereFilters.toJson() as any
    const salesId = json.conditions[0].id

    // Update the first filter by id
    builder.whereFilters.update(salesId, (node: any) => {
      node.setOp('lt').setValue(500)
    })

    const result = builder.build().whereFilters as any
    expect(result.conditions[0].op).toBe('lt')
    expect(result.conditions[0].value).toBe(500)
  })

  test('remove', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('sales', (node) => {
      node.setOp('gt').setValue(1000)
    })
    builder.whereFilters.add('region', (node) => {
      node.setOp('eq').setValue('Beijing')
    })
    builder.whereFilters.add('category', (node) => {
      node.setOp('eq').setValue('Electronics')
    })

    const json = builder.whereFilters.toJson() as any
    const regionId = json.conditions[1].id

    // Remove the second filter by id
    builder.whereFilters.remove(regionId)

    const result = builder.build().whereFilters as any
    expect(result.conditions.length).toBe(2)
    expect(result.conditions[0].field).toBe('sales')
    expect(result.conditions[1].field).toBe('category')
  })

  test('clear', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('sales', (node) => {
      node.setOp('gt').setValue(1000)
    })
    builder.whereFilters.add('region', (node) => {
      node.setOp('eq').setValue('Beijing')
    })

    // Clear all filters
    builder.whereFilters.clear()

    const result = builder.build().whereFilters as any
    expect(result.conditions).toEqual([])
  })

  test('all', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('sales', (node) => {
      node.setOp('gt').setValue(1000)
    })
    builder.whereFilters.add('region', (node) => {
      node.setOp('eq').setValue('Beijing')
    })

    const whereFilters = builder.whereFilters.findAll()
    expect(whereFilters).toHaveLength(2)
    expect(whereFilters[0].toJson().field).toBe('sales')
    expect(whereFilters[1].toJson().field).toBe('region')
  })

  test('multiple filters with chaining', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters
      .add('sales', (node) => node.setOp('gt').setValue(1000))
      .add('region', (node) => node.setOp('eq').setValue('Beijing'))
      .add('category', (node) => node.setOp('in').setValue(['Electronics', 'Furniture']))

    const result = builder.build().whereFilters as any
    expect(result.conditions.length).toBe(3)
    expect(result.conditions[0].field).toBe('sales')
    expect(result.conditions[0].op).toBe('gt')
    expect(result.conditions[0].value).toBe(1000)
    expect(result.conditions[1].field).toBe('region')
    expect(result.conditions[1].op).toBe('eq')
    expect(result.conditions[1].value).toBe('Beijing')
    expect(result.conditions[2].field).toBe('category')
    expect(result.conditions[2].op).toBe('in')
    expect(result.conditions[2].value).toEqual(['Electronics', 'Furniture'])
  })

  test('filter with optional operator', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('sales', (node) => {
      // op is optional
      node.setValue(1000)
    })

    const result = builder.build().whereFilters as any
    expect(result.conditions.length).toBe(1)
    expect(result.conditions[0].field).toBe('sales')
    expect(result.conditions[0].value).toBe(1000)
  })

  test('find', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('sales', (node) => {
      node.setOp('gt').setValue(1000)
    })
    builder.whereFilters.add('region', (node) => {
      node.setOp('eq').setValue('Beijing')
    })

    const json = builder.whereFilters.toJson() as any
    const regionId = json.conditions[1].id

    const found = builder.whereFilters.find(regionId)
    expect(found?.toJson().field).toBe('region')
    expect(found?.toJson().op).toBe('eq')
    expect(found?.toJson().value).toBe('Beijing')

    const notFound = builder.whereFilters.find('nonexistent')
    expect(notFound).toBeUndefined()
  })
})

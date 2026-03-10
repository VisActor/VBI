import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'
import { MeasuresBuilder } from 'src/builder/sub-builders/measures/mea-builder'

describe('MeasuresBuilder', () => {
  test('addMeasure', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.measures.add('sales', (node) => {
      node.setAlias('Max(sales)').setAggregate({ func: 'max' })
    })

    expect(builder.build()).toEqual({
      dimensions: [],
      whereFilters: {
        id: expect.any(String),
        op: 'AND',
        conditions: [],
      },
      havingFilters: [],
      measures: [
        {
          aggregate: {
            func: 'max',
          },
          alias: 'Max(sales)',
          encoding: 'yAxis',
          field: 'sales',
        },
      ],
    })
  })

  test('addMeasure callback', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.measures
      .add('sales', (node) => {
        node.setAlias('sum(sales)')
      })
      .add('orders', (node) => {
        node.setAlias('Min(orders)').setAggregate({ func: 'min' })
      })

    expect(builder.build()).toEqual({
      dimensions: [],
      whereFilters: {
        id: expect.any(String),
        op: 'AND',
        conditions: [],
      },
      havingFilters: [],
      measures: [
        {
          aggregate: {
            func: 'sum',
          },
          alias: 'sum(sales)',
          encoding: 'yAxis',
          field: 'sales',
        },
        {
          aggregate: {
            func: 'min',
          },
          alias: 'Min(orders)',
          encoding: 'yAxis',
          field: 'orders',
        },
      ],
    })
  })

  test('removeMeasure', () => {
    const dsl = {
      measures: [
        { field: 'sales', alias: '销售额', aggregate: { func: 'sum' } },
        { field: 'orders', alias: '订单数', aggregate: { func: 'count' } },
      ],
    } as VBIDSL
    const builder = VBI.from(dsl)

    builder.measures.remove('sales')

    expect(builder.build().measures).toEqual([{ field: 'orders', alias: '订单数', aggregate: { func: 'count' } }])
  })

  test('removeMeasure not found', () => {
    const dsl = { measures: [{ field: 'sales', alias: '销售额' }] } as VBIDSL
    const builder = VBI.from(dsl)

    builder.measures.remove('notExist')

    expect(builder.build().measures).toEqual([{ field: 'sales', alias: '销售额' }])
  })

  test('updateMeasure', () => {
    const dsl = { measures: [{ field: 'sales', alias: '销售额', aggregate: { func: 'sum' } }] } as VBIDSL
    const builder = VBI.from(dsl)

    builder.measures.update('sales', (node) => {
      node.setAlias('新销售额').setAggregate({ func: 'avg' })
    })

    expect(builder.build().measures).toEqual([{ field: 'sales', alias: '新销售额', aggregate: { func: 'avg' } }])
  })

  test('updateMeasure throws error if not found', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    expect(() => {
      builder.measures.update('notExist', (node) => {
        node.setAlias('新销售额')
      })
    }).toThrow('Measure with field "notExist" not found')
  })

  test('findMeasure', () => {
    const dsl = {
      measures: [
        { field: 'sales', alias: '销售额' },
        { field: 'orders', alias: '订单数' },
      ],
    } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.measures.find('sales')

    expect(node?.getField()).toBe('sales')
    expect(node?.toJson()).toEqual({ field: 'sales', alias: '销售额' })
  })

  test('findMeasure returns undefined if not found', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.measures.find('notExist')

    expect(node).toBeUndefined()
  })

  test('findAllMeasures', () => {
    const dsl = {
      measures: [
        { field: 'sales', alias: '销售额' },
        { field: 'orders', alias: '订单数' },
      ],
    } as VBIDSL
    const builder = VBI.from(dsl)

    const nodes = builder.measures.findAll()

    expect(nodes.length).toBe(2)
    expect(nodes[0].getField()).toBe('sales')
    expect(nodes[1].getField()).toBe('orders')
  })

  test('findAllMeasures returns empty array when no measures', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const nodes = builder.measures.findAll()

    expect(nodes).toEqual([])
  })

  test('toJson', () => {
    const dsl = {
      measures: [
        { field: 'sales', alias: '销售额' },
        { field: 'orders', alias: '订单数' },
      ],
    } as VBIDSL
    const builder = VBI.from(dsl)

    const json = builder.measures.toJson()

    expect(json).toEqual([
      { field: 'sales', alias: '销售额' },
      { field: 'orders', alias: '订单数' },
    ])
  })

  test('toJson returns empty array when no measures', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const json = builder.measures.toJson()

    expect(json).toEqual([])
  })

  test('observe and unobserve', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    let callCount = 0
    const callback = () => {
      callCount++
    }
    const unobserve = builder.measures.observe(callback)

    builder.measures.add('sales', (node) => {
      node.setAlias('销售额')
    })

    expect(callCount).toBe(1)

    unobserve()

    builder.measures.add('orders', (node) => {
      node.setAlias('订单数')
    })

    expect(callCount).toBe(1)
  })

  test('isMeasureNode', () => {
    const node = { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }
    const group = { field: 'group1', children: [], alias: 'group' }

    expect(MeasuresBuilder.isMeasureNode(node as unknown as any)).toBe(true)
    expect(MeasuresBuilder.isMeasureNode(group)).toBe(false)
  })

  test('isMeasureGroup', () => {
    const node = { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }
    const group = { field: 'group1', children: [], alias: 'group' }

    expect(MeasuresBuilder.isMeasureGroup(node as unknown as any)).toBe(false)
    expect(MeasuresBuilder.isMeasureGroup(group)).toBe(true)
  })

  test('MeasureNodeBuilder getField', () => {
    const dsl = { measures: [{ field: 'sales', alias: '销售额' }] } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.measures.find('sales')

    expect(node?.getField()).toBe('sales')
  })

  test('MeasureNodeBuilder setAlias', () => {
    const dsl = { measures: [{ field: 'sales', alias: '销售额' }] } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.measures.find('sales')
    node?.setAlias('新销售额')

    expect(builder.measures.toJson()[0].alias).toBe('新销售额')
  })

  test('MeasureNodeBuilder setEncoding', () => {
    const dsl = { measures: [{ field: 'sales', alias: '销售额' }] } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.measures.find('sales')
    node?.setEncoding('xAxis')

    expect(builder.measures.toJson()[0].encoding).toBe('xAxis')
  })

  test('MeasureNodeBuilder setAggregate', () => {
    const dsl = { measures: [{ field: 'sales', alias: '销售额' }] } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.measures.find('sales')
    node?.setAggregate({ func: 'avg' })

    expect(builder.measures.toJson()[0].aggregate).toEqual({ func: 'avg' })
  })

  test('MeasureNodeBuilder toJson', () => {
    const dsl = { measures: [{ field: 'sales', alias: '销售额' }] } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.measures.find('sales')
    const json = node?.toJson()

    expect(json).toEqual({ field: 'sales', alias: '销售额' })
  })

  test('chained add operations', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    builder.measures
      .add('sales', (node) => node.setAlias('销售额'))
      .add('orders', (node) => node.setAlias('订单数'))
      .add('profit', (node) => node.setAlias('利润'))

    const json = builder.measures.toJson()

    expect(json.length).toBe(3)
    expect(json[0].field).toBe('sales')
    expect(json[1].field).toBe('orders')
    expect(json[2].field).toBe('profit')
  })
})

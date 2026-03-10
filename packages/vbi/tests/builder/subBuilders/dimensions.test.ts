import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'
import { DimensionsBuilder } from 'src/builder/sub-builders/dimensions/dim-builder'

describe('DimensionsBuilder', () => {
  test('addDimension', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.dimensions.add('category', (node) => {
      node.setAlias('类别')
    })

    expect(builder.build()).toEqual({
      dimensions: [
        {
          alias: '类别',
          field: 'category',
        },
      ],
      whereFilters: {
        id: expect.any(String),
        op: 'AND',
        conditions: [],
      },
      havingFilters: [],
      measures: [],
    })
  })

  test('addDimension callback', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.dimensions
      .add('region', (node) => {
        node.setAlias('地区')
      })
      .add('city', (node) => {
        node.setAlias('城市')
      })

    expect(builder.build()).toEqual({
      dimensions: [
        {
          alias: '地区',
          field: 'region',
        },
        {
          alias: '城市',
          field: 'city',
        },
      ],
      whereFilters: {
        id: expect.any(String),
        op: 'AND',
        conditions: [],
      },
      havingFilters: [],
      measures: [],
    })
  })

  test('removeDimension', () => {
    const dsl = {
      dimensions: [
        { field: 'category', alias: '类别' },
        { field: 'region', alias: '地区' },
      ],
    } as VBIDSL
    const builder = VBI.from(dsl)

    builder.dimensions.remove('category')

    expect(builder.build().dimensions).toEqual([{ field: 'region', alias: '地区' }])
  })

  test('removeDimension not found', () => {
    const dsl = { dimensions: [{ field: 'category', alias: '类别' }] } as VBIDSL
    const builder = VBI.from(dsl)

    builder.dimensions.remove('notExist')

    expect(builder.build().dimensions).toEqual([{ field: 'category', alias: '类别' }])
  })

  test('updateDimension', () => {
    const dsl = { dimensions: [{ field: 'category', alias: '类别' }] } as VBIDSL
    const builder = VBI.from(dsl)

    builder.dimensions.update('category', (node) => {
      node.setAlias('新类别')
    })

    expect(builder.build().dimensions).toEqual([{ field: 'category', alias: '新类别' }])
  })

  test('updateDimension throws error if not found', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    expect(() => {
      builder.dimensions.update('notExist', (node) => {
        node.setAlias('新类别')
      })
    }).toThrow('Dimension with field "notExist" not found')
  })

  test('findDimension', () => {
    const dsl = {
      dimensions: [
        { field: 'category', alias: '类别' },
        { field: 'region', alias: '地区' },
      ],
    } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.dimensions.find('category')

    expect(node?.getField()).toBe('category')
    expect(node?.toJson()).toEqual({ field: 'category', alias: '类别' })
  })

  test('findDimension returns undefined if not found', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.dimensions.find('notExist')

    expect(node).toBeUndefined()
  })

  test('findAllDimensions', () => {
    const dsl = {
      dimensions: [
        { field: 'category', alias: '类别' },
        { field: 'region', alias: '地区' },
      ],
    } as VBIDSL
    const builder = VBI.from(dsl)

    const nodes = builder.dimensions.findAll()

    expect(nodes.length).toBe(2)
    expect(nodes[0].getField()).toBe('category')
    expect(nodes[1].getField()).toBe('region')
  })

  test('findAllDimensions returns empty array when no dimensions', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const nodes = builder.dimensions.findAll()

    expect(nodes).toEqual([])
  })

  test('toJson', () => {
    const dsl = {
      dimensions: [
        { field: 'category', alias: '类别' },
        { field: 'region', alias: '地区' },
      ],
    } as VBIDSL
    const builder = VBI.from(dsl)

    const json = builder.dimensions.toJson()

    expect(json).toEqual([
      { field: 'category', alias: '类别' },
      { field: 'region', alias: '地区' },
    ])
  })

  test('toJson returns empty array when no dimensions', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const json = builder.dimensions.toJson()

    expect(json).toEqual([])
  })

  test('observe and unobserve', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    let callCount = 0
    const callback = () => {
      callCount++
    }
    const unobserve = builder.dimensions.observe(callback)

    builder.dimensions.add('category', (node) => {
      node.setAlias('类别')
    })

    expect(callCount).toBe(1)

    unobserve()

    builder.dimensions.add('region', (node) => {
      node.setAlias('地区')
    })

    expect(callCount).toBe(1)
  })

  test('isDimensionNode', () => {
    const node = { field: 'category', alias: '类别' }
    const group = { field: 'group1', children: [] }

    expect(DimensionsBuilder.isDimensionNode(node)).toBe(true)
    expect(DimensionsBuilder.isDimensionNode(group as unknown as any)).toBe(false)
  })

  test('isDimensionGroup', () => {
    const node = { field: 'category', alias: '类别' }
    const group = { field: 'group1', children: [] }

    expect(DimensionsBuilder.isDimensionGroup(node)).toBe(false)
    expect(DimensionsBuilder.isDimensionGroup(group as unknown as any)).toBe(true)
  })

  test('DimensionNodeBuilder getField', () => {
    const dsl = { dimensions: [{ field: 'category', alias: '类别' }] } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.dimensions.find('category')

    expect(node?.getField()).toBe('category')
  })

  test('DimensionNodeBuilder setAlias', () => {
    const dsl = { dimensions: [{ field: 'category', alias: '类别' }] } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.dimensions.find('category')
    node?.setAlias('新类别')

    expect(builder.dimensions.toJson()[0].alias).toBe('新类别')
  })

  test('DimensionNodeBuilder toJson', () => {
    const dsl = { dimensions: [{ field: 'category', alias: '类别' }] } as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.dimensions.find('category')
    const json = node?.toJson()

    expect(json).toEqual({ field: 'category', alias: '类别' })
  })

  test('chained add operations', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    builder.dimensions
      .add('category', (node) => node.setAlias('类别'))
      .add('region', (node) => node.setAlias('地区'))
      .add('city', (node) => node.setAlias('城市'))

    const json = builder.dimensions.toJson()

    expect(json.length).toBe(3)
    expect(json[0].field).toBe('category')
    expect(json[1].field).toBe('region')
    expect(json[2].field).toBe('city')
  })
})

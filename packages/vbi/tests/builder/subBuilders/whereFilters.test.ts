import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'

describe('WhereFiltersBuilder', () => {
  test('add generates uuid', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => {
      node.setOp('eq').setValue('Electronics')
    })

    const json = builder.build().whereFilters as any
    expect(json.conditions.length).toBe(1)
    expect(json.conditions[0].id).toBeDefined()
    expect(json.conditions[0].field).toBe('category')
    expect(json.conditions[0].op).toBe('eq')
    expect(json.conditions[0].value).toBe('Electronics')
  })

  test('chained add operations', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    builder.whereFilters
      .add('category', (node) => node.setOp('eq').setValue('Electronics'))
      .add('region', (node) => node.setOp('eq').setValue('Beijing'))
      .add('sales', (node) => node.setOp('gt').setValue(1000))

    const json = builder.whereFilters.toJson() as any
    expect(json.conditions.length).toBe(3)
    expect(json.conditions[0].field).toBe('category')
    expect(json.conditions[1].field).toBe('region')
    expect(json.conditions[2].field).toBe('sales')
  })

  test('remove by id', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))
    builder.whereFilters.add('region', (node) => node.setOp('eq').setValue('B'))

    const json = builder.whereFilters.toJson() as any
    const categoryId = json.conditions[0].id

    builder.whereFilters.remove(categoryId)

    const result = builder.whereFilters.toJson() as any
    expect(result.conditions.length).toBe(1)
    expect(result.conditions[0].field).toBe('region')
  })

  test('remove non-existent id returns this', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))

    const result = builder.whereFilters.remove('non-existent-id')

    expect(result).toBe(builder.whereFilters)
  })

  test('update by id', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))

    const json = builder.whereFilters.toJson() as any
    const categoryId = json.conditions[0].id

    builder.whereFilters.update(categoryId, (node: any) => {
      node.setOp('in').setValue(['A', 'B'])
    })

    const result = builder.whereFilters.toJson() as any
    expect(result.conditions[0].op).toBe('in')
    expect(result.conditions[0].value).toEqual(['A', 'B'])
  })

  test('update throws error if not found', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    expect(() => {
      builder.whereFilters.update('non-existent-id', (node: any) => {
        node.setOp('eq').setValue('test')
      })
    }).toThrow('Where filter with id non-existent-id not found')
  })

  test('find by id', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))

    const json = builder.whereFilters.toJson() as any
    const categoryId = json.conditions[0].id

    const node = builder.whereFilters.find(categoryId)
    expect(node?.getField()).toBe('category')
  })

  test('find returns undefined if not found', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const node = builder.whereFilters.find('non-existent-id')
    expect(node).toBeUndefined()
  })

  test('findAll', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))
    builder.whereFilters.add('region', (node) => node.setOp('eq').setValue('B'))

    const nodes = builder.whereFilters.findAll()
    expect(nodes.length).toBe(2)
    expect(nodes[0].getField()).toBe('category')
    expect(nodes[1].getField()).toBe('region')
  })

  test('findAll returns empty array when no filters', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const nodes = builder.whereFilters.findAll()
    expect(nodes).toEqual([])
  })

  test('clear', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))
    builder.whereFilters.add('region', (node) => node.setOp('eq').setValue('B'))

    builder.whereFilters.clear()

    const json = builder.whereFilters.toJson() as any
    expect(json.conditions).toEqual([])
  })

  test('toJson', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('Electronics'))
    builder.whereFilters.add('region', (node) => node.setOp('eq').setValue('Beijing'))

    const json = builder.whereFilters.toJson() as any

    expect(json.id).toBeDefined()
    expect(json.op).toBe('AND')
    expect(json.conditions.length).toBe(2)
    expect(json.conditions[0].field).toBe('category')
    expect(json.conditions[1].field).toBe('region')
  })

  test('toJson returns root structure when no filters', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const json = builder.whereFilters.toJson() as any

    expect(json.id).toBeDefined()
    expect(json.op).toBe('AND')
    expect(json.conditions).toEqual([])
  })

  test('observe and unobserve', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    let callCount = 0
    const callback = () => {
      callCount++
    }
    const unobserve = builder.whereFilters.observe(callback)

    builder.whereFilters.add('category', (node) => {
      node.setOp('eq').setValue('Electronics')
    })

    expect(callCount).toBe(1)

    unobserve()

    builder.whereFilters.add('region', (node) => {
      node.setOp('eq').setValue('Beijing')
    })

    expect(callCount).toBe(1)
  })

  test('WhereFilterNodeBuilder getId', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))

    const json = builder.whereFilters.toJson() as any
    const node = builder.whereFilters.find(json.conditions[0].id)

    expect(node?.getId()).toBe(json.conditions[0].id)
  })

  test('WhereFilterNodeBuilder getField', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))

    const json = builder.whereFilters.toJson() as any
    const node = builder.whereFilters.find(json.conditions[0].id)

    expect(node?.getField()).toBe('category')
  })

  test('WhereFilterNodeBuilder setField', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))

    const json = builder.whereFilters.toJson() as any
    const node = builder.whereFilters.find(json.conditions[0].id)
    node?.setField('new_category')

    expect((builder.whereFilters.toJson() as any).conditions[0].field).toBe('new_category')
  })

  test('WhereFilterNodeBuilder setOp', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))

    const json = builder.whereFilters.toJson() as any
    const node = builder.whereFilters.find(json.conditions[0].id)
    node?.setOp('in')

    expect((builder.whereFilters.toJson() as any).conditions[0].op).toBe('in')
  })

  test('WhereFilterNodeBuilder setValue', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))

    const json = builder.whereFilters.toJson() as any
    const node = builder.whereFilters.find(json.conditions[0].id)
    node?.setValue(['A', 'B'])

    expect((builder.whereFilters.toJson() as any).conditions[0].value).toEqual(['A', 'B'])
  })

  test('WhereFilterNodeBuilder toJson', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.add('category', (node) => node.setOp('eq').setValue('A'))

    const json = builder.whereFilters.toJson() as any
    const node = builder.whereFilters.find(json.conditions[0].id)
    const nodeJson = node?.toJson()

    expect(nodeJson).toEqual(json.conditions[0])
  })

  test('various operators', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    builder.whereFilters
      .add('field1', (node) => node.setOp('eq').setValue('test'))
      .add('field2', (node) => node.setOp('ne').setValue('test'))
      .add('field3', (node) => node.setOp('gt').setValue(100))
      .add('field4', (node) => node.setOp('gte').setValue(100))
      .add('field5', (node) => node.setOp('lt').setValue(100))
      .add('field6', (node) => node.setOp('lte').setValue(100))
      .add('field7', (node) => node.setOp('in').setValue([1, 2, 3]))
      .add('field8', (node) => node.setOp('like').setValue('%test%'))

    const json = builder.whereFilters.toJson() as any

    expect(json.conditions.length).toBe(8)
    expect(json.conditions[0].op).toBe('eq')
    expect(json.conditions[1].op).toBe('ne')
    expect(json.conditions[2].op).toBe('gt')
    expect(json.conditions[3].op).toBe('gte')
    expect(json.conditions[4].op).toBe('lt')
    expect(json.conditions[5].op).toBe('lte')
    expect(json.conditions[6].op).toBe('in')
    expect(json.conditions[7].op).toBe('like')
  })

  test('addGroup creates nested group', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.addGroup('OR', (group) => {
      group.add('status', (node) => node.setOp('eq').setValue('active'))
      group.add('stock', (node) => node.setOp('gt').setValue(0))
    })

    const json = builder.whereFilters.toJson() as any
    expect(json.conditions.length).toBe(1)
    expect(json.conditions[0].op).toBe('OR')
    expect(json.conditions[0].conditions.length).toBe(2)
  })

  test('nested groups', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters
      .add('category', (node) => node.setOp('eq').setValue('A'))
      .addGroup('OR', (group) => {
        group.add('status', (node) => node.setOp('eq').setValue('active'))
        group.addGroup('AND', (nested) => {
          nested.add('stock', (node) => node.setOp('gt').setValue(0))
          nested.add('price', (node) => node.setOp('lt').setValue(100))
        })
      })

    const json = builder.whereFilters.toJson() as any
    expect(json.conditions.length).toBe(2)
    expect(json.conditions[1].op).toBe('OR')
    expect(json.conditions[1].conditions[1].op).toBe('AND')
  })

  test('setOp on root', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.whereFilters.setOp('OR')

    const json = builder.whereFilters.toJson() as any
    expect(json.op).toBe('OR')
  })

  test('getId returns root id', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)

    const id = builder.whereFilters.getId()
    expect(id).toBeDefined()
  })
})

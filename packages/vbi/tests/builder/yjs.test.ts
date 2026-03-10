import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'

describe('VBI YJS Integration', () => {
  test('sync between two builders', () => {
    const b1 = VBI.from({} as VBIDSL)
    const b2 = VBI.from({} as VBIDSL)

    b2.applyUpdate(b1.encodeStateAsUpdate())
    b1.applyUpdate(b2.encodeStateAsUpdate())

    b1.measures.add('sales', (node) => {
      node.setAlias('Sales')
    })

    const update = b1.encodeStateAsUpdate()
    b2.applyUpdate(update)

    expect(b2.build()).toEqual({
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
          alias: 'Sales',
          encoding: 'yAxis',
          field: 'sales',
        },
      ],
    })
  })
})

test('encodeStateAsUpdate', () => {
  const b1 = VBI.from({} as VBIDSL)
  const b2 = VBI.from({} as VBIDSL)

  b1.applyUpdate(b2.encodeStateAsUpdate())
  b2.applyUpdate(b1.encodeStateAsUpdate())

  b1.measures.add('sales', (node) => {
    node.setAlias('Max Sales').setAggregate({ func: 'max' }).setEncoding('yAxis')
  })

  const update = b1.encodeStateAsUpdate()
  b2.applyUpdate(update)

  expect(update).toBeInstanceOf(Uint8Array)
  expect(update.length).toBeGreaterThan(0)

  expect(b2.build()).toEqual({
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
        alias: 'Max Sales',
        encoding: 'yAxis',
        field: 'sales',
      },
    ],
  })
})

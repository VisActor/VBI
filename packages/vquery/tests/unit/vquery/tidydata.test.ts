import type { DatasetColumn, RawDatasetSource, QueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'

describe('VQuery with tidy datum array', () => {
  it('load local tidy datum array', async () => {
    const vquery = new VQuery()
    const datasetId = 'demoDataset'

    const rawDataset = [
      { area: 'BEI JING', date: '2025-01-01', sales: 100 },
      { area: 'BEI JING', date: '2025-01-02', sales: 200 },
      { area: 'BEI JING', date: '2025-01-03', sales: 300 },

      { area: 'HANG ZHOU', date: '2025-01-01', sales: 100 },
      { area: 'HANG ZHOU', date: '2025-01-02', sales: 200 },
      { area: 'HANG ZHOU', date: '2025-01-03', sales: 500 },

      { area: 'SHANG HAI', date: '2025-11-01', sales: 600 },
      { area: 'SHANG HAI', date: '2025-11-02', sales: 400 },
      { area: 'SHANG HAI', date: '2025-11-03', sales: 300 },
    ]

    if (await vquery.hasDataset(datasetId)) {
      await vquery.dropDataset(datasetId)
    }

    if (!(await vquery.hasDataset(datasetId))) {
      const schema: DatasetColumn[] = [
        { name: 'area', type: 'string' },
        { name: 'date', type: 'string' },
        { name: 'sales', type: 'number' },
      ]
      const datasetSource: RawDatasetSource = { type: 'json', rawDataset }
      await vquery.createDataset(datasetId, schema, datasetSource)
    }

    const dataset = await vquery.connectDataset(datasetId)

    const queryDSL: QueryDSL<{
      area: string
      date: string
      sales: number
    }> = {
      select: [
        'area',
        {
          field: 'sales',
          alias: 'Sum(sales)',
          aggr: { func: 'sum' },
        },
      ],
      groupBy: ['area'],
      orderBy: [
        {
          field: 'Sum(sales)',
          order: 'desc',
        },
      ],
      where: {
        op: 'and',
        conditions: [
          {
            op: 'or',
            conditions: [
              {
                field: 'area',
                op: 'in',
                value: ['BEI JING'],
              },
              {
                field: 'sales',
                op: '>=',
                value: 400,
              },
            ],
          },
        ],
      },
      limit: 100,
    }

    const queryResult = await dataset.query(queryDSL)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "Sum(sales)": 1000,
          "area": "SHANG HAI",
        },
        {
          "Sum(sales)": 600,
          "area": "BEI JING",
        },
        {
          "Sum(sales)": 500,
          "area": "HANG ZHOU",
        },
      ]
    `)
  })
})

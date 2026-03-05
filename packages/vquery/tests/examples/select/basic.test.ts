import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './basic.json'

describe('Basic Select Example', () => {
  it('Basic Select Example', async () => {
    const vquery = new VQuery()
    const { datasetId, schema, dataset: rawDataset, vquery: vqueryDSL } = vqueryConfig

    if (await vquery.hasDataset(datasetId)) {
      await vquery.dropDataset(datasetId)
    }

    if (!(await vquery.hasDataset(datasetId))) {
      await vquery.createDataset(datasetId, schema as DatasetColumn[], { type: 'json', rawDataset })
    }

    const dataset = await vquery.connectDataset(datasetId)

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "department": "HR",
          "name": "Alice",
          "salary": 5000,
        },
        {
          "department": "Engineering",
          "name": "Bob",
          "salary": 8000,
        },
        {
          "department": "Engineering",
          "name": "Charlie",
          "salary": 9000,
        },
        {
          "department": "HR",
          "name": "David",
          "salary": 6000,
        },
        {
          "department": "Marketing",
          "name": "Eve",
          "salary": 4000,
        },
      ]
    `)
  })
})

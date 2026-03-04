import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './period-qoq.json'

describe('Select with Period QoQ (Quarter-over-Quarter)', () => {
  it('Select with Period QoQ (Quarter-over-Quarter)', async () => {
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
          "current": 4000,
          "last_quarter": null,
          "quarter": "2023-Q1",
        },
        {
          "current": 6000,
          "last_quarter": null,
          "quarter": "2023-Q2",
        },
        {
          "current": 5000,
          "last_quarter": null,
          "quarter": "2024-Q1",
        },
        {
          "current": 8000,
          "last_quarter": 4000,
          "quarter": "2024-Q2",
        },
      ]
    `)
  })
})

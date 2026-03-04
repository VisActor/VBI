import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './period-mom.json'

describe('Select with Period MoM (Month-over-Month)', () => {
  it('Select with Period MoM (Month-over-Month)', async () => {
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
          "current": 6000,
          "last_month": null,
          "month": "2023-12",
        },
        {
          "current": 5000,
          "last_month": 6000,
          "month": "2024-01",
        },
        {
          "current": 4000,
          "last_month": 5000,
          "month": "2024-01",
        },
        {
          "current": 8000,
          "last_month": 4000,
          "month": "2024-02",
        },
      ]
    `)
  })
})

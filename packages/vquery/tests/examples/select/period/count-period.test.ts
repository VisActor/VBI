import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './count-period.json'

describe('Select with period using count aggregation - calculate transaction count MoM', () => {
  it('Select with period using count aggregation - calculate transaction count MoM', async () => {
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
          "department": "Engineering",
          "month": "2024-01",
          "transaction_count": 1,
          "transaction_count_period_1_month": null,
        },
        {
          "department": "Engineering",
          "month": "2024-02",
          "transaction_count": 1,
          "transaction_count_period_1_month": null,
        },
        {
          "department": "HR",
          "month": "2024-01",
          "transaction_count": 1,
          "transaction_count_period_1_month": null,
        },
        {
          "department": "HR",
          "month": "2024-02",
          "transaction_count": 1,
          "transaction_count_period_1_month": null,
        },
      ]
    `)
  })
})

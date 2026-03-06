import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './avg-period.json'

describe('Select with period using avg aggregation - calculate average sales MoM', () => {
  it('Select with period using avg aggregation - calculate average sales MoM', async () => {
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
          "avg_sales": 8000,
          "avg_sales_period_1_month": null,
          "department": "Engineering",
          "month": "2024-01",
        },
        {
          "avg_sales": 9000,
          "avg_sales_period_1_month": null,
          "department": "Engineering",
          "month": "2024-02",
        },
        {
          "avg_sales": 5000,
          "avg_sales_period_1_month": null,
          "department": "HR",
          "month": "2024-01",
        },
        {
          "avg_sales": 6000,
          "avg_sales_period_1_month": null,
          "department": "HR",
          "month": "2024-02",
        },
      ]
    `)
  })
})

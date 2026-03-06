import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './max-period.json'

describe('Select with period using max aggregation - calculate max sales MoM', () => {
  it('Select with period using max aggregation - calculate max sales MoM', async () => {
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
          "max_sales": 8000,
          "max_sales_period_1_month": null,
          "month": "2024-01",
        },
        {
          "department": "Engineering",
          "max_sales": 9000,
          "max_sales_period_1_month": null,
          "month": "2024-02",
        },
        {
          "department": "HR",
          "max_sales": 5000,
          "max_sales_period_1_month": null,
          "month": "2024-01",
        },
        {
          "department": "HR",
          "max_sales": 6000,
          "max_sales_period_1_month": null,
          "month": "2024-02",
        },
      ]
    `)
  })
})

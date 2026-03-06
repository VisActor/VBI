import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './month-over-month.json'

describe('Select with Month-over-Month (MoM) period - calculate sales growth compared to previous month', () => {
  it('Select with Month-over-Month (MoM) period - calculate sales growth compared to previous month', async () => {
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
          "total_sales": 8000,
          "total_sales_period_1_month": null,
        },
        {
          "department": "Engineering",
          "month": "2024-02",
          "total_sales": 9000,
          "total_sales_period_1_month": null,
        },
        {
          "department": "Engineering",
          "month": "2024-03",
          "total_sales": 8500,
          "total_sales_period_1_month": null,
        },
        {
          "department": "HR",
          "month": "2024-01",
          "total_sales": 5000,
          "total_sales_period_1_month": null,
        },
        {
          "department": "HR",
          "month": "2024-02",
          "total_sales": 6000,
          "total_sales_period_1_month": null,
        },
        {
          "department": "HR",
          "month": "2024-03",
          "total_sales": 5500,
          "total_sales_period_1_month": null,
        },
      ]
    `)
  })
})

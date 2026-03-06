import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './multiple-fields.json'

describe('Select with multiple period fields - calculate MoM for both sales and quantity independently', () => {
  it('Select with multiple period fields - calculate MoM for both sales and quantity independently', async () => {
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
          "total_quantity": 80,
          "total_quantity_period_1_month": null,
          "total_sales": 8000,
          "total_sales_period_1_month": null,
        },
        {
          "department": "Engineering",
          "month": "2024-02",
          "total_quantity": 90,
          "total_quantity_period_1_month": null,
          "total_sales": 9000,
          "total_sales_period_1_month": null,
        },
        {
          "department": "HR",
          "month": "2024-01",
          "total_quantity": 50,
          "total_quantity_period_1_month": null,
          "total_sales": 5000,
          "total_sales_period_1_month": null,
        },
        {
          "department": "HR",
          "month": "2024-02",
          "total_quantity": 60,
          "total_quantity_period_1_month": null,
          "total_sales": 6000,
          "total_sales_period_1_month": null,
        },
      ]
    `)
  })
})

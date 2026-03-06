import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './year-over-year.json'

describe('Select with Year-over-Year (YoY) period - calculate sales growth compared to same month last year', () => {
  it('Select with Year-over-Year (YoY) period - calculate sales growth compared to same month last year', async () => {
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
          "total_sales": 5000,
          "total_sales_period_1_year": null,
          "year": "2023",
        },
        {
          "total_sales": 8000,
          "total_sales_period_1_year": null,
          "year": "2023",
        },
        {
          "total_sales": 6000,
          "total_sales_period_1_year": null,
          "year": "2024",
        },
        {
          "total_sales": 9000,
          "total_sales_period_1_year": null,
          "year": "2024",
        },
      ]
    `)
  })
})

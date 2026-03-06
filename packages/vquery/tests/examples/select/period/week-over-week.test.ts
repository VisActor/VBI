import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './week-over-week.json'

describe('Select with Week-over-Week (WoW) period - calculate sales growth compared to previous week', () => {
  it('Select with Week-over-Week (WoW) period - calculate sales growth compared to previous week', async () => {
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
          "total_sales": 8000,
          "total_sales_period_1_week": null,
          "week": "2024-W02",
        },
        {
          "department": "Engineering",
          "total_sales": 9000,
          "total_sales_period_1_week": null,
          "week": "2024-W03",
        },
        {
          "department": "Engineering",
          "total_sales": 8500,
          "total_sales_period_1_week": null,
          "week": "2024-W04",
        },
        {
          "department": "HR",
          "total_sales": 5000,
          "total_sales_period_1_week": null,
          "week": "2024-W02",
        },
        {
          "department": "HR",
          "total_sales": 6000,
          "total_sales_period_1_week": null,
          "week": "2024-W03",
        },
        {
          "department": "HR",
          "total_sales": 5500,
          "total_sales_period_1_week": null,
          "week": "2024-W04",
        },
      ]
    `)
  })
})

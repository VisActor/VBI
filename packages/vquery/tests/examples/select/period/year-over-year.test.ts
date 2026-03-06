import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './year-over-year.json'

describe('Select with Year-over-Year (YoY) period - calculate sales by department comparing 2024 vs 2023', () => {
  it('Select with Year-over-Year (YoY) period - calculate sales by department comparing 2024 vs 2023', async () => {
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
          "2023年销售额": 89600,
          "2024年销售额": 101100,
          "部门": "HR",
        },
        {
          "2023年销售额": 166500,
          "2024年销售额": 184400,
          "部门": "Engineering",
        },
        {
          "2023年销售额": 134100,
          "2024年销售额": 149700,
          "部门": "Sales",
        },
        {
          "2023年销售额": 102200,
          "2024年销售额": 113900,
          "部门": "Marketing",
        },
      ]
    `)
  })
})

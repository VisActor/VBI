import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './month-over-month.json'

describe('Select with Month-over-Month (MoM) period - calculate sales by department comparing current month vs last month', () => {
  it('Select with Month-over-Month (MoM) period - calculate sales by department comparing current month vs last month', async () => {
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
          "上月销售额": 14000,
          "当月销售额": 12700,
          "部门": "HR",
        },
        {
          "上月销售额": 25500,
          "当月销售额": 28000,
          "部门": "Engineering",
        },
        {
          "上月销售额": 19700,
          "当月销售额": 21900,
          "部门": "Sales",
        },
      ]
    `)
  })
})

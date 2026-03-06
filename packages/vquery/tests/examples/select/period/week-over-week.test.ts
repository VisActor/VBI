import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './week-over-week.json'

describe('Select with Week-over-Week (WoW) period - calculate sales by department comparing current week vs last week', () => {
  it('Select with Week-over-Week (WoW) period - calculate sales by department comparing current week vs last week', async () => {
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
          "上周销售额": 12000,
          "本周销售额": 14000,
          "部门": "HR",
        },
        {
          "上周销售额": 12000,
          "本周销售额": 13500,
          "部门": "Engineering",
        },
        {
          "上周销售额": 9000,
          "本周销售额": 10500,
          "部门": "Sales",
        },
      ]
    `)
  })
})

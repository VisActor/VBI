import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './period-aggregation.json'

describe('Select with period + different aggregation functions (avg, count, min, max, count_distinct)', () => {
  it('Select with period + different aggregation functions (avg, count, min, max, count_distinct)', async () => {
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
          "平均销售额": 6000,
          "最低销售额": 5000,
          "最高销售额": 7000,
          "部门": "HR",
          "销售人员数": 3,
          "销售记录数": 3,
        },
        {
          "平均销售额": 12166.666666666666,
          "最低销售额": 11000,
          "最高销售额": 13500,
          "部门": "Engineering",
          "销售人员数": 3,
          "销售记录数": 3,
        },
        {
          "平均销售额": 9333.333333333334,
          "最低销售额": 8500,
          "最高销售额": 10500,
          "部门": "Sales",
          "销售人员数": 3,
          "销售记录数": 3,
        },
      ]
    `)
  })
})

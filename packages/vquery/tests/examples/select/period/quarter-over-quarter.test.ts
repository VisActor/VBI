import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './quarter-over-quarter.json'

describe('Select with Quarter-over-Quarter (QoQ) period - calculate sales by department comparing current quarter vs last quarter', () => {
  it('Select with Quarter-over-Quarter (QoQ) period - calculate sales by department comparing current quarter vs last quarter', async () => {
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
          "上季度销售额": 0,
          "本季度销售额": 18000,
          "部门": "HR",
        },
        {
          "上季度销售额": 0,
          "本季度销售额": 36500,
          "部门": "Engineering",
        },
      ]
    `)
  })
})

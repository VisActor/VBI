import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './aggregation.json'

describe('先按类别求和，再对分组结果计算行数和最大值；外层统计的是分组结果。', () => {
  it('先按类别求和，再对分组结果计算行数和最大值；外层统计的是分组结果。', async () => {
    const vquery = new VQuery()
    const { datasetId, schema, dataset: rawDataset, vquery: vqueryDSL } = vqueryConfig

    if (await vquery.hasDataset(datasetId)) {
      await vquery.dropDataset(datasetId)
    }

    if (!(await vquery.hasDataset(datasetId))) {
      await vquery.createDataset(datasetId, schema as DatasetColumn[], { type: 'json', rawDataset })
    }

    const dataset = await vquery.connectDataset(datasetId)

    const sql = convertDSLToDuckDB(vqueryDSL as VQueryDSL<Record<string, string | number>>, datasetId, {
      columns: schema as DatasetColumn[],
    })

    expect(sql).toMatchInlineSnapshot(
      `"select count(*) as "groups", max("total") as "maximum" from (select "category", sum("value") as "total" from (select "category" collate "binary" as "category", "value" as "value" from "subquery-aggregation") as "__vquery_source" group by "category") as "__vquery_subquery""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "groups": 2,
          "maximum": 7,
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './aggregation.json'

describe('在同一查询中计算全部销售额与华东销售额；when 先筛选当前列的值，再执行 sum。', () => {
  it('在同一查询中计算全部销售额与华东销售额；when 先筛选当前列的值，再执行 sum。', async () => {
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
      `"select sum("sales") as "totalSales", sum("__vquery_when_0") as "eastSales" from (select *, case when ("region" = 'East') then "sales" end as "__vquery_when_0" from (select "region" collate "binary" as "region", "sales" as "sales" from "when-aggregation") as "__vquery_source") as "__vquery_conditions""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "eastSales": 150,
          "totalSales": 230,
        },
      ]
    `)
  })
})

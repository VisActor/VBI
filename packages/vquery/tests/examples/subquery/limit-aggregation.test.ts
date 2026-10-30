import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './limit-aggregation.json'

describe('先取销售总额最高的两家门店，再统计这两行的数量、总额和平均值；内层 limit 限定统计范围。', () => {
  it('先取销售总额最高的两家门店，再统计这两行的数量、总额和平均值；内层 limit 限定统计范围。', async () => {
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
      `"select count(*) as "stores", sum("storeTotal") as "total", avg("storeTotal") as "average" from (select "region", "store", sum("sales") as "storeTotal" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-limit-aggregation") as "__vquery_source" group by "region", "store" order by "storeTotal" desc nulls last limit 2) as "__vquery_subquery""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "average": 50,
          "stores": 2,
          "total": 100,
        },
      ]
    `)
  })
})

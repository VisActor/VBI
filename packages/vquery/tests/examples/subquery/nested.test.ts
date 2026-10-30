import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './nested.json'

describe('三层查询依次完成门店汇总、区域平均值计算和跨区域概况；每一层只引用上一层的输出列。', () => {
  it('三层查询依次完成门店汇总、区域平均值计算和跨区域概况；每一层只引用上一层的输出列。', async () => {
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
      `"select count(*) as "regions", min("averageStoreTotal") as "minimum", max("averageStoreTotal") as "maximum" from (select "region", avg("storeTotal") as "averageStoreTotal" from (select "region", "store", sum("sales") as "storeTotal" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-nested") as "__vquery_source" where ("sales" >= 10) group by "region", "store") as "__vquery_subquery" where ("storeTotal" >= 30) group by "region") as "__vquery_subquery""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "maximum": 60,
          "minimum": 35,
          "regions": 2,
        },
      ]
    `)
  })
})

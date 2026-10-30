import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './subquery.json'

describe('对子查询结果按门店总额不少于 40 做条件计数与求和；不满足 when 条件的值作为 NULL 参与聚合。', () => {
  it('对子查询结果按门店总额不少于 40 做条件计数与求和；不满足 when 条件的值作为 NULL 参与聚合。', async () => {
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
      `"select count(*) as "stores", count("__vquery_when_0") as "qualifiedStores", sum("__vquery_when_0") as "qualifiedTotal" from (select *, case when ("storeTotal" >= 40) then "storeTotal" end as "__vquery_when_0" from (select "region", "store", sum("sales") as "storeTotal" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-conditional-aggregation") as "__vquery_source" group by "region", "store") as "__vquery_subquery") as "__vquery_conditions""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "qualifiedStores": 2,
          "qualifiedTotal": 100,
          "stores": 4,
        },
      ]
    `)
  })
})

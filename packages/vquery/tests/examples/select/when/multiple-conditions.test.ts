import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './multiple-conditions.json'

describe('按地区分组，同时统计全部销售额和线上单笔不少于 50 的销售额；多个条件以 and 组合。', () => {
  it('按地区分组，同时统计全部销售额和线上单笔不少于 50 的销售额；多个条件以 and 组合。', async () => {
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
      `"select "region", sum("sales") as "totalSales", sum("__vquery_when_0") as "qualifiedSales" from (select *, case when ("channel" = 'online' and "sales" >= 50) then "sales" end as "__vquery_when_0" from (select "region" collate "binary" as "region", "channel" collate "binary" as "channel", "sales" as "sales" from "when-multiple-conditions") as "__vquery_source") as "__vquery_conditions" group by "region" order by "region" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "qualifiedSales": 100,
          "region": "East",
          "totalSales": 120,
        },
        {
          "qualifiedSales": 80,
          "region": "West",
          "totalSales": 140,
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './having.json'

describe('内层 HAVING 保留销售总额不少于 30 的门店，外层再次聚合并筛选总额大于 65 的区域。', () => {
  it('内层 HAVING 保留销售总额不少于 30 的门店，外层再次聚合并筛选总额大于 65 的区域。', async () => {
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
      `"select "region", count(*) as "stores", sum("storeTotal") as "regionTotal" from (select "region", "store", sum("sales") as "storeTotal" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-having") as "__vquery_source" group by "region", "store" having (sum("sales") >= 30)) as "__vquery_subquery" group by "region" having (sum("storeTotal") > 65) order by "region" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "region": "East",
          "regionTotal": 70,
          "stores": 2,
        },
      ]
    `)
  })
})

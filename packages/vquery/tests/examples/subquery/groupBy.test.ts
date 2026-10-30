import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './groupBy.json'

describe('内层按区域和门店汇总，外层按区域计算门店数与门店销售总额的平均值。', () => {
  it('内层按区域和门店汇总，外层按区域计算门店数与门店销售总额的平均值。', async () => {
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
      `"select "region", count(*) as "stores", avg("storeTotal") as "averageStoreTotal" from (select "region", "store", sum("sales") as "storeTotal" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-groupBy") as "__vquery_source" group by "region", "store") as "__vquery_subquery" group by "region" order by "region" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "averageStoreTotal": 35,
          "region": "East",
          "stores": 2,
        },
        {
          "averageStoreTotal": 40,
          "region": "West",
          "stores": 2,
        },
      ]
    `)
  })
})

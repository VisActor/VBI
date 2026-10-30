import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './statistics.json'

describe('内层按门店汇总销售额，外层计算门店数、中位数和 75% 分位数；统计对象是四家门店的总额，而非六条原始明细。', () => {
  it('内层按门店汇总销售额，外层计算门店数、中位数和 75% 分位数；统计对象是四家门店的总额，而非六条原始明细。', async () => {
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
      `"select count(*) as "stores", median("storeTotal") as "median", quantile("storeTotal", CAST(0.75 AS DOUBLE)) as "q75" from (select "region", "store", sum("sales") as "storeTotal" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-statistics") as "__vquery_source" group by "region", "store") as "__vquery_subquery""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "median": 35,
          "q75": 40,
          "stores": 4,
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './aggregate-result.json'

describe('计算列仍是普通数值列，可以在下一层查询中统计中位数、分位数和行数。', () => {
  it('计算列仍是普通数值列，可以在下一层查询中统计中位数、分位数和行数。', async () => {
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
      `"select median("margin") as "median", quantile("margin", CAST(0.75 AS DOUBLE)) as "q75", count(*) as "regions" from (select "region", "sales", "profit", (cast("profit" as double) / nullif(nullif(cast("sales" as double), cast(0 as double)), 0)) as "margin" from (select "region", sum("sales") as "sales", sum("profit") as "profit" from (select "region" collate "binary" as "region", "sales" as "sales", "profit" as "profit" from "expression-aggregate-result") as "__vquery_source" group by "region") as "__vquery_subquery") as "__vquery_subquery""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "median": 0.30000000000000004,
          "q75": 0.4,
          "regions": 3,
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './aggregate-ratio.json'

describe('先按地区汇总，再计算整体利润率；最终按利润率排序并取前两名，避免先截断后计算。', () => {
  it('先按地区汇总，再计算整体利润率；最终按利润率排序并取前两名，避免先截断后计算。', async () => {
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
      `"select "region", "sales", "profit", (cast("profit" as double) / nullif(nullif(cast("sales" as double), cast(0 as double)), 0)) as "margin" from (select "region", sum("sales") as "sales", sum("profit") as "profit" from (select "region" collate "binary" as "region", "sales" as "sales", "profit" as "profit" from "expression-aggregate-ratio") as "__vquery_source" group by "region") as "__vquery_subquery" order by "margin" desc nulls last limit 2"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "margin": 0.4,
          "profit": 20,
          "region": "B",
          "sales": 50,
        },
        {
          "margin": 0.2,
          "profit": 40,
          "region": "A",
          "sales": 200,
        },
      ]
    `)
  })
})

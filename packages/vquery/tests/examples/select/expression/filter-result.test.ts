import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './filter-result.json'

describe('将计算结果作为下一层 FROM 输入，使用普通 WHERE 筛选利润率，不扩展筛选语法。', () => {
  it('将计算结果作为下一层 FROM 输入，使用普通 WHERE 筛选利润率，不扩展筛选语法。', async () => {
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
      `"select "region", "margin" from (select "region", "sales", "profit", (cast("profit" as double) / nullif(nullif(cast("sales" as double), cast(0 as double)), 0)) as "margin" from (select "region", sum("sales") as "sales", sum("profit") as "profit" from (select "region" collate "binary" as "region", "sales" as "sales", "profit" as "profit" from "expression-filter-result") as "__vquery_source" group by "region") as "__vquery_subquery") as "__vquery_subquery" where ("margin" > 0.3)"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "margin": 0.4,
          "region": "B",
        },
      ]
    `)
  })
})

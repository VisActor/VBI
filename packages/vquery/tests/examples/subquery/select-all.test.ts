import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './select-all.json'

describe('内层筛选并取销售额最小的三条明细，外层用通配符保留内层输出的 store、amount 两列，再按 amount 降序排列。', () => {
  it('内层筛选并取销售额最小的三条明细，外层用通配符保留内层输出的 store、amount 两列，再按 amount 降序排列。', async () => {
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
      `"select * from (select "store", "sales" as "amount" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-select-all") as "__vquery_source" where ("sales" >= 15) order by "amount" asc nulls last limit 3) as "__vquery_subquery" order by "amount" desc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "amount": 40,
          "store": "B",
        },
        {
          "amount": 20,
          "store": "A",
        },
        {
          "amount": 15,
          "store": "C",
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './where.json'

describe('内层先筛选销售额不少于 15 的明细，外层再按 amount 别名筛选 20 至 50 的记录。', () => {
  it('内层先筛选销售额不少于 15 的明细，外层再按 amount 别名筛选 20 至 50 的记录。', async () => {
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
      `"select "store", "amount" from (select "store", "sales" as "amount" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-where") as "__vquery_source" where ("sales" >= 15)) as "__vquery_subquery" where ("amount" between 20 and 50) order by "amount" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "amount": 20,
          "store": "A",
        },
        {
          "amount": 40,
          "store": "B",
        },
      ]
    `)
  })
})

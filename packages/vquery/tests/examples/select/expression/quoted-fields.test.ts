import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './quoted-fields.json'

describe('标准双引号支持含点、引号、问号和关键字的字段名；这些字段保持完整标识符。', () => {
  it('标准双引号支持含点、引号、问号和关键字的字段名；这些字段保持完整标识符。', async () => {
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
      `"select "id", "城市", ((cast("sales.amount" as double) + cast("a""b" as double)) + cast("?" as double)) as "total", (cast("sales.amount" as double) / nullif(nullif(cast("select" as double), cast(0 as double)), 0)) as "safe.rate" from (select "id" as "id", "城市" collate "binary" as "城市", "sales.amount" as "sales.amount", "select" as "select", "a""b" as "a""b", "?" as "?" from "expression-quoted-fields") as "__vquery_source" order by "safe.rate" desc nulls last, "id" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "safe.rate": 5,
          "total": 17,
          "城市": "杭州",
        },
        {
          "id": 2,
          "safe.rate": null,
          "total": 31,
          "城市": "上海",
        },
      ]
    `)
  })
})

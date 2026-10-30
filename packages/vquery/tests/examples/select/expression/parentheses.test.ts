import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './parentheses.json'

describe('乘法先于加法；添加括号后，先计算括号内的金额。', () => {
  it('乘法先于加法；添加括号后，先计算括号内的金额。', async () => {
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
      `"select "price", "fee", (cast("price" as double) + (cast("fee" as double) * cast(2 as double))) as "withoutParentheses", ((cast("price" as double) + cast("fee" as double)) * cast(2 as double)) as "withParentheses" from "expression-parentheses""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "fee": 2,
          "price": 10,
          "withParentheses": 24,
          "withoutParentheses": 14,
        },
        {
          "fee": 3,
          "price": 20,
          "withParentheses": 46,
          "withoutParentheses": 26,
        },
      ]
    `)
  })
})

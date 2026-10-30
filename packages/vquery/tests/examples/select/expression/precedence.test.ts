import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './precedence.json'

describe('验证乘除优先、同级运算左结合以及括号改变运算顺序；同一输入展示不同表达式的结果。', () => {
  it('验证乘除优先、同级运算左结合以及括号改变运算顺序；同一输入展示不同表达式的结果。', async () => {
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
      `"select "id", ((cast("x" as double) - cast("y" as double)) - cast(2 as double)) as "leftSubtract", (cast("x" as double) - (cast("y" as double) - cast(2 as double))) as "groupedSubtract", ((cast("x" as double) / nullif(cast("y" as double), 0)) / nullif(cast(2 as double), 0)) as "leftDivide", (cast("x" as double) / nullif((cast("y" as double) / nullif(cast(2 as double), 0)), 0)) as "groupedDivide", ((cast("x" as double) + cast("y" as double)) * cast(2 as double)) as "groupedProduct" from "expression-precedence" order by "id" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "groupedDivide": 8,
          "groupedProduct": 20,
          "groupedSubtract": 8,
          "id": 1,
          "leftDivide": 2,
          "leftSubtract": 4,
        },
        {
          "groupedDivide": null,
          "groupedProduct": 6,
          "groupedSubtract": 5,
          "id": 2,
          "leftDivide": null,
          "leftSubtract": 1,
        },
        {
          "groupedDivide": null,
          "groupedProduct": null,
          "groupedSubtract": null,
          "id": 3,
          "leftDivide": null,
          "leftSubtract": null,
        },
      ]
    `)
  })
})

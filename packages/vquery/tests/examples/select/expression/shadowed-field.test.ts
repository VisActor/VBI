import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './shadowed-field.json'

describe('计算列与输入字段同名时，NULL 排序依据计算后的值，空值统一排在末尾。', () => {
  it('计算列与输入字段同名时，NULL 排序依据计算后的值，空值统一排在末尾。', async () => {
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
      `"select "id", (cast("x" as double) / nullif(nullif(cast("y" as double), cast(0 as double)), 0)) as "x" from "expression-shadowed-field" order by "x" asc nulls last, "id" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "id": 4,
          "x": 0.5,
        },
        {
          "id": 1,
          "x": 4,
        },
        {
          "id": 2,
          "x": null,
        },
        {
          "id": 3,
          "x": null,
        },
      ]
    `)
  })
})

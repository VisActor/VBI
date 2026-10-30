import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './null-and-zero.json'

describe('NULL 参与运算时传播；COALESCE 显式补零，NULLIF 显式排除零分母。', () => {
  it('NULL 参与运算时传播；COALESCE 显式补零，NULLIF 显式排除零分母。', async () => {
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
      `"select "id", coalesce(cast("x" as double), cast(0 as double)) as "filled", (cast("x" as double) / nullif(cast("y" as double), 0)) as "ratio", nullif(cast("x" as double), cast("x" as double)) as "alwaysNull", abs(cast("y" as double)) as "absolute" from "expression-null-and-zero" order by "id" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "absolute": 2,
          "alwaysNull": null,
          "filled": 8,
          "id": 1,
          "ratio": 4,
        },
        {
          "absolute": 0,
          "alwaysNull": null,
          "filled": 3,
          "id": 2,
          "ratio": null,
        },
        {
          "absolute": 2,
          "alwaysNull": null,
          "filled": 0,
          "id": 3,
          "ratio": null,
        },
      ]
    `)
  })
})

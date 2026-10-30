import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './unary-scientific.json'

describe('一元正负号、连续减号和科学记数法均由 AST 明确解析。', () => {
  it('一元正负号、连续减号和科学记数法均由 AST 明确解析。', async () => {
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
      `"select "id", ((-(-cast("x" as double))) + (+cast("y" as double))) as "signs", (cast("x" as double) - (-cast(2 as double))) as "minusNegative", ((cast(0.5 as double) + cast(0.01 as double)) + cast(20 as double)) as "scientific" from "expression-unary-scientific" order by "id" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "minusNegative": 10,
          "scientific": 20.51,
          "signs": 10,
        },
        {
          "id": 2,
          "minusNegative": 5,
          "scientific": 20.51,
          "signs": 3,
        },
        {
          "id": 3,
          "minusNegative": null,
          "scientific": 20.51,
          "signs": null,
        },
      ]
    `)
  })
})

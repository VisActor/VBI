import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './functions.json'

describe('使用 ABS 取绝对值、COALESCE 补缺失值、NULLIF 避免零分母。', () => {
  it('使用 ABS 取绝对值、COALESCE 补缺失值、NULLIF 避免零分母。', async () => {
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
      `"select "x", "y", (cast("x" as double) / nullif(nullif(cast("y" as double), cast(0 as double)), 0)) as "ratio", abs((coalesce(cast("x" as double), cast(0 as double)) - cast("y" as double))) as "difference" from "expression-functions""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "difference": 6,
          "ratio": 4,
          "x": 8,
          "y": 2,
        },
        {
          "difference": 3,
          "ratio": null,
          "x": 3,
          "y": 0,
        },
        {
          "difference": 2,
          "ratio": null,
          "x": null,
          "y": -2,
        },
      ]
    `)
  })
})

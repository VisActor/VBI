import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './parameter-order.json'

describe('多处问号按从左到右顺序绑定；NULL 参数可参与 COALESCE，字段名中的问号不会占用参数。', () => {
  it('多处问号按从左到右顺序绑定；NULL 参数可参与 COALESCE，字段名中的问号不会占用参数。', async () => {
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
      `"select "id", (((cast("x" as double) - cast(2 as double)) / nullif(nullif(cast(4 as double), cast(0 as double)), 0)) + coalesce(null, cast(1 as double))) as "boundResult" from "expression-parameter-order" order by "id" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "boundResult": 2.5,
          "id": 1,
        },
        {
          "boundResult": 1.25,
          "id": 2,
        },
        {
          "boundResult": null,
          "id": 3,
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './timestamp_window.json'

describe('Where with TIMESTAMP comparison window', () => {
  it('Where with TIMESTAMP comparison window', async () => {
    const vquery = new VQuery()
    const { datasetId, schema, dataset: rawDataset, vquery: vqueryDSL } = vqueryConfig

    if (await vquery.hasDataset(datasetId)) {
      await vquery.dropDataset(datasetId)
    }

    if (!(await vquery.hasDataset(datasetId))) {
      await vquery.createDataset(datasetId, schema as DatasetColumn[], { type: 'json', rawDataset })
    }

    const dataset = await vquery.connectDataset(datasetId)

    const sql = convertDSLToDuckDB(vqueryDSL as VQueryDSL<Record<string, string | number>>, datasetId)

    expect(sql).toMatchInlineSnapshot(
      `"select "id", "event", "amount", strftime(CAST("created_at" AS TIMESTAMP), '%Y-%m-%d %H:%M') as "created_minute" from "where-timestamp-window" where ("created_at" >= '2024-01-15 12:00:00' and "created_at" < '2024-02-01 00:00:00') order by "created_minute" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "amount": 199,
          "created_minute": "2024-01-15 12:00",
          "event": "payment",
          "id": 2,
        },
        {
          "amount": -40,
          "created_minute": "2024-01-20 18:30",
          "event": "refund",
          "id": 3,
        },
      ]
    `)
  })
})

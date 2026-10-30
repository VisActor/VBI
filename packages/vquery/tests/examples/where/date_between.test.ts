import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './date_between.json'

describe('Where with DATE field BETWEEN filter', () => {
  it('Where with DATE field BETWEEN filter', async () => {
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
      `"select "id", "area", "sales", strftime(CAST("order_date" AS TIMESTAMP), '%Y-%m-%d') as "order_day" from (select "id" as "id", "area" collate "binary" as "area", "order_date" as "order_date", "sales" as "sales" from "where-date-between") as "__vquery_source" where ("order_date" between '2024-01-01' and '2024-01-31') order by "order_day" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "area": "SHANG HAI",
          "id": 2,
          "order_day": "2024-01-05",
          "sales": 120,
        },
        {
          "area": "HANG ZHOU",
          "id": 3,
          "order_day": "2024-01-20",
          "sales": 260,
        },
        {
          "area": "SHEN ZHEN",
          "id": 4,
          "order_day": "2024-01-31",
          "sales": 310,
        },
      ]
    `)
  })
})

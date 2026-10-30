import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './toMonth.json'

describe('toMonth', () => {
  it('toMonth', async () => {
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
      `"select "area", sum("sales") as "Sum(sales)", strftime(CAST("date" AS TIMESTAMP), '%Y-%m') as "month" from (select "area" collate "binary" as "area", "date" as "date", "sales" as "sales" from "vquery-demo") as "__vquery_source" where (("area" in ('BEI JING') or "sales" >= 400)) group by "month", "area" order by "Sum(sales)" desc nulls last limit 100"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "Sum(sales)": 1000,
          "area": "SHANG HAI",
          "month": "2025-11",
        },
        {
          "Sum(sales)": 600,
          "area": "BEI JING",
          "month": "2025-01",
        },
        {
          "Sum(sales)": 500,
          "area": "HANG ZHOU",
          "month": "2025-01",
        },
      ]
    `)
  })
})

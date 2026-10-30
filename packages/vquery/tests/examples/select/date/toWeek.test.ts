import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './toWeek.json'

describe('toWeek', () => {
  it('toWeek', async () => {
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
      `"select "area", sum("sales") as "Sum(sales)", strftime(CAST("date" AS TIMESTAMP), '%Y-W%W') as "week" from (select "area" collate "binary" as "area", "date" as "date", "sales" as "sales" from "vquery-demo") as "__vquery_source" group by "week", "area" order by "Sum(sales)" desc nulls last limit 100"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "Sum(sales)": 600,
          "area": "SHANG HAI",
          "week": "2025-W43",
        },
        {
          "Sum(sales)": 500,
          "area": "HANG ZHOU",
          "week": "2025-W02",
        },
        {
          "Sum(sales)": 400,
          "area": "SHANG HAI",
          "week": "2025-W44",
        },
        {
          "Sum(sales)": 300,
          "area": "BEI JING",
          "week": "2025-W02",
        },
        {
          "Sum(sales)": 300,
          "area": "SHANG HAI",
          "week": "2025-W45",
        },
        {
          "Sum(sales)": 200,
          "area": "HANG ZHOU",
          "week": "2025-W01",
        },
        {
          "Sum(sales)": 200,
          "area": "BEI JING",
          "week": "2025-W01",
        },
        {
          "Sum(sales)": 100,
          "area": "BEI JING",
          "week": "2025-W00",
        },
        {
          "Sum(sales)": 100,
          "area": "HANG ZHOU",
          "week": "2025-W00",
        },
      ]
    `)
  })
})

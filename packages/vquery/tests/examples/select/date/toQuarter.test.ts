import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './toQuarter.json'

describe('toQuarter', () => {
  it('toQuarter', async () => {
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
      `"select "area", sum("sales") as "Sum(sales)", strftime(CAST("date" AS TIMESTAMP), '%Y') || '-Q' || date_part('quarter', CAST("date" AS TIMESTAMP)) as "quarter" from (select "area" collate "binary" as "area", "date" as "date", "sales" as "sales" from "vquery-demo") as "__vquery_source" group by "quarter", "area" order by "Sum(sales)" desc nulls last limit 100"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "Sum(sales)": 1300,
          "area": "SHANG HAI",
          "quarter": "2025-Q4",
        },
        {
          "Sum(sales)": 500,
          "area": "HANG ZHOU",
          "quarter": "2025-Q3",
        },
        {
          "Sum(sales)": 300,
          "area": "BEI JING",
          "quarter": "2025-Q3",
        },
        {
          "Sum(sales)": 200,
          "area": "HANG ZHOU",
          "quarter": "2025-Q2",
        },
        {
          "Sum(sales)": 200,
          "area": "BEI JING",
          "quarter": "2025-Q2",
        },
        {
          "Sum(sales)": 100,
          "area": "BEI JING",
          "quarter": "2025-Q1",
        },
        {
          "Sum(sales)": 100,
          "area": "HANG ZHOU",
          "quarter": "2025-Q1",
        },
      ]
    `)
  })
})

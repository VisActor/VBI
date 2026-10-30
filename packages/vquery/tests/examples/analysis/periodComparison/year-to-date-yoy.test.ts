import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './year-to-date-yoy.json'

describe('累计同比：比较 2026 与 2025 各自 1 月 1 日至 4 月 1 日之前的销售额，采用左闭右开的相同进度口径。先累加再求增长率，不平均单月增长率；基期为 0 时增长率为 NULL，缺失期间不补零。', () => {
  it('累计同比：比较 2026 与 2025 各自 1 月 1 日至 4 月 1 日之前的销售额，采用左闭右开的相同进度口径。先累加再求增长率，不平均单月增长率；基期为 0 时增长率为 NULL，缺失期间不补零。', async () => {
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
      `"select "region", "currentSales", "baselineSales", (cast("currentSales" as double) - cast("baselineSales" as double)) as "delta", ((cast("currentSales" as double) - cast("baselineSales" as double)) / nullif(nullif(cast("baselineSales" as double), cast(0 as double)), 0)) as "growthRate" from (select "region", sum("__vquery_when_0") as "currentSales", sum("__vquery_when_1") as "baselineSales" from (select *, case when ("orderDate" >= '2026-01-01 00:00:00' and "orderDate" < '2026-04-01 00:00:00') then "sales" end as "__vquery_when_0", case when ("orderDate" >= '2025-01-01 00:00:00' and "orderDate" < '2025-04-01 00:00:00') then "sales" end as "__vquery_when_1" from (select "region" collate "binary" as "region", "orderDate" as "orderDate", "sales" as "sales" from "analysis-year-to-date-yoy") as "__vquery_source" where (("orderDate" >= '2026-01-01 00:00:00' and "orderDate" < '2026-04-01 00:00:00') or ("orderDate" >= '2025-01-01 00:00:00' and "orderDate" < '2025-04-01 00:00:00'))) as "__vquery_conditions" group by "region") as "__vquery_subquery" order by "region" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "baselineSales": 120,
          "currentSales": 150,
          "delta": 30,
          "growthRate": 0.25,
          "region": "A",
        },
        {
          "baselineSales": 120,
          "currentSales": 90,
          "delta": -30,
          "growthRate": -0.25,
          "region": "B",
        },
        {
          "baselineSales": 0,
          "currentSales": 10,
          "delta": 10,
          "growthRate": null,
          "region": "C",
        },
        {
          "baselineSales": null,
          "currentSales": 40,
          "delta": null,
          "growthRate": null,
          "region": "D",
        },
        {
          "baselineSales": 80,
          "currentSales": 0,
          "delta": -80,
          "growthRate": -1,
          "region": "E",
        },
        {
          "baselineSales": 20,
          "currentSales": null,
          "delta": null,
          "growthRate": null,
          "region": "F",
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './month-over-month.json'

describe('比较 2026-03 与 2026-02 的地区销售额：先按月分桶并汇总，再计算差额和环比。4 月数据排除；基期为 0 时环比为 NULL，缺失期间不补零，实际销售额为 0 则保留，0.2 表示增长 20%。', () => {
  it('比较 2026-03 与 2026-02 的地区销售额：先按月分桶并汇总，再计算差额和环比。4 月数据排除；基期为 0 时环比为 NULL，缺失期间不补零，实际销售额为 0 则保留，0.2 表示增长 20%。', async () => {
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
      `"select "region", "currentSales", "baselineSales", (cast("currentSales" as double) - cast("baselineSales" as double)) as "delta", ((cast("currentSales" as double) - cast("baselineSales" as double)) / nullif(nullif(cast("baselineSales" as double), cast(0 as double)), 0)) as "growthRate" from (select "region", sum("__vquery_when_0") as "currentSales", sum("__vquery_when_1") as "baselineSales" from (select *, case when ("month" = '2026-03') then "sales" end as "__vquery_when_0", case when ("month" = '2026-02') then "sales" end as "__vquery_when_1" from (select "region", strftime(CAST("orderDate" AS TIMESTAMP), '%Y-%m') as "month", "sales" from (select "region" collate "binary" as "region", "orderDate" as "orderDate", "sales" as "sales" from "analysis-month-over-month") as "__vquery_source") as "__vquery_subquery" where ("month" in ('2026-02', '2026-03'))) as "__vquery_conditions" group by "region") as "__vquery_subquery" order by "region" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "baselineSales": 100,
          "currentSales": 120,
          "delta": 20,
          "growthRate": 0.2,
          "region": "A",
        },
        {
          "baselineSales": 100,
          "currentSales": 80,
          "delta": -20,
          "growthRate": -0.2,
          "region": "B",
        },
        {
          "baselineSales": 0,
          "currentSales": 20,
          "delta": 20,
          "growthRate": null,
          "region": "C",
        },
        {
          "baselineSales": null,
          "currentSales": 50,
          "delta": null,
          "growthRate": null,
          "region": "D",
        },
        {
          "baselineSales": 60,
          "currentSales": 0,
          "delta": -60,
          "growthRate": -1,
          "region": "E",
        },
        {
          "baselineSales": 80,
          "currentSales": null,
          "delta": null,
          "growthRate": null,
          "region": "F",
        },
      ]
    `)
  })
})

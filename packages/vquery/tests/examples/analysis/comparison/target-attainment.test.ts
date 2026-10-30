import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './target-attainment.json'

describe('按同一地区和月份汇总实际销售额与目标，计算差额和目标达成率。1.2 表示达成 120%，0 表示实际销售额为 0；目标为 0 或缺失时达成率返回 NULL，缺失实际记录不自动补零。', () => {
  it('按同一地区和月份汇总实际销售额与目标，计算差额和目标达成率。1.2 表示达成 120%，0 表示实际销售额为 0；目标为 0 或缺失时达成率返回 NULL，缺失实际记录不自动补零。', async () => {
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
      `"select "region", "actual", "target", (cast("actual" as double) - cast("target" as double)) as "variance", (cast("actual" as double) / nullif(nullif(cast("target" as double), cast(0 as double)), 0)) as "attainmentRate" from (select "region", sum("__vquery_when_0") as "actual", sum("__vquery_when_1") as "target" from (select *, case when ("kind" = 'actual') then "amount" end as "__vquery_when_0", case when ("kind" = 'target') then "amount" end as "__vquery_when_1" from (select "region" collate "binary" as "region", "period" collate "binary" as "period", "kind" collate "binary" as "kind", "amount" as "amount" from "analysis-target-attainment") as "__vquery_source" where ("period" = '2026-03' and "kind" in ('actual', 'target'))) as "__vquery_conditions" group by "region") as "__vquery_subquery" order by "region" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "actual": 120,
          "attainmentRate": 1.2,
          "region": "A",
          "target": 100,
          "variance": 20,
        },
        {
          "actual": 80,
          "attainmentRate": 0.8,
          "region": "B",
          "target": 100,
          "variance": -20,
        },
        {
          "actual": 20,
          "attainmentRate": null,
          "region": "C",
          "target": 0,
          "variance": 20,
        },
        {
          "actual": null,
          "attainmentRate": null,
          "region": "D",
          "target": 100,
          "variance": null,
        },
        {
          "actual": 0,
          "attainmentRate": 0,
          "region": "E",
          "target": 80,
          "variance": -80,
        },
        {
          "actual": 50,
          "attainmentRate": null,
          "region": "F",
          "target": null,
          "variance": null,
        },
      ]
    `)
  })
})

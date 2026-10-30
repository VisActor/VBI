import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './period-comparison.json'

describe('先通过 when 获取本期、基期，再计算差额和增长率；日期期间及对齐口径由调用方明确指定。', () => {
  it('先通过 when 获取本期、基期，再计算差额和增长率；日期期间及对齐口径由调用方明确指定。', async () => {
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
      `"select "region", "current", "baseline", (cast("current" as double) - cast("baseline" as double)) as "delta", ((cast("current" as double) - cast("baseline" as double)) / nullif(nullif(cast("baseline" as double), cast(0 as double)), 0)) as "growthRate" from (select "region", sum("__vquery_when_0") as "current", sum("__vquery_when_1") as "baseline" from (select *, case when ("period" = 'current') then "sales" end as "__vquery_when_0", case when ("period" = 'baseline') then "sales" end as "__vquery_when_1" from (select "region" collate "binary" as "region", "period" collate "binary" as "period", "sales" as "sales" from "expression-period-comparison") as "__vquery_source") as "__vquery_conditions" group by "region") as "__vquery_subquery" order by "region" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "baseline": 100,
          "current": 120,
          "delta": 20,
          "growthRate": 0.2,
          "region": "A",
        },
        {
          "baseline": 100,
          "current": 80,
          "delta": -20,
          "growthRate": -0.2,
          "region": "B",
        },
        {
          "baseline": 0,
          "current": 20,
          "delta": 20,
          "growthRate": null,
          "region": "C",
        },
      ]
    `)
  })
})

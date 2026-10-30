import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './share-change.json'

describe('比较 2026-03 与 2026-02 的线上销售份额，各期分母均包含全部渠道。份额从 25% 到 50% 时，changePp 为 25 个百分点，relativeChange 为 1 即相对增长 100%；基期份额为 0 时相对变化返回 NULL。', () => {
  it('比较 2026-03 与 2026-02 的线上销售份额，各期分母均包含全部渠道。份额从 25% 到 50% 时，changePp 为 25 个百分点，relativeChange 为 1 即相对增长 100%；基期份额为 0 时相对变化返回 NULL。', async () => {
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
      `"select "region", "currentShare", "baselineShare", ((cast("currentShare" as double) - cast("baselineShare" as double)) * cast(100 as double)) as "changePp", ((cast("currentShare" as double) - cast("baselineShare" as double)) / nullif(nullif(cast("baselineShare" as double), cast(0 as double)), 0)) as "relativeChange" from (select "region", (coalesce(cast("currentOnline" as double), cast(0 as double)) / nullif(nullif(cast("currentTotal" as double), cast(0 as double)), 0)) as "currentShare", (coalesce(cast("baselineOnline" as double), cast(0 as double)) / nullif(nullif(cast("baselineTotal" as double), cast(0 as double)), 0)) as "baselineShare" from (select "region", sum("__vquery_when_0") as "currentTotal", sum("__vquery_when_1") as "currentOnline", sum("__vquery_when_2") as "baselineTotal", sum("__vquery_when_3") as "baselineOnline" from (select *, case when ("period" = '2026-03') then "sales" end as "__vquery_when_0", case when ("period" = '2026-03' and "channel" = 'online') then "sales" end as "__vquery_when_1", case when ("period" = '2026-02') then "sales" end as "__vquery_when_2", case when ("period" = '2026-02' and "channel" = 'online') then "sales" end as "__vquery_when_3" from (select "region" collate "binary" as "region", "period" collate "binary" as "period", "channel" collate "binary" as "channel", "sales" as "sales" from "analysis-share-change") as "__vquery_source" where ("period" in ('2026-02', '2026-03'))) as "__vquery_conditions" group by "region") as "__vquery_subquery") as "__vquery_subquery" order by "region" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "baselineShare": 0.25,
          "changePp": 25,
          "currentShare": 0.5,
          "region": "A",
          "relativeChange": 1,
        },
        {
          "baselineShare": 0,
          "changePp": 50,
          "currentShare": 0.5,
          "region": "B",
          "relativeChange": null,
        },
        {
          "baselineShare": 0.5,
          "changePp": null,
          "currentShare": null,
          "region": "C",
          "relativeChange": null,
        },
        {
          "baselineShare": null,
          "changePp": null,
          "currentShare": 0.5,
          "region": "D",
          "relativeChange": null,
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './conversion-comparison.json'

describe('比较两组用户转化率：样本数按各组全部 userId 去重，转化人数按 convert 事件的 userId 去重，重复事件不重复计数。50% 到 75% 相差 25 个百分点、相对提升 50%；无样本或基期转化率为 0 的相对提升返回 NULL。', () => {
  it('比较两组用户转化率：样本数按各组全部 userId 去重，转化人数按 convert 事件的 userId 去重，重复事件不重复计数。50% 到 75% 相差 25 个百分点、相对提升 50%；无样本或基期转化率为 0 的相对提升返回 NULL。', async () => {
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
      `"select "market", "controlRate", "variantRate", ((cast("variantRate" as double) - cast("controlRate" as double)) * cast(100 as double)) as "differencePp", ((cast("variantRate" as double) - cast("controlRate" as double)) / nullif(nullif(cast("controlRate" as double), cast(0 as double)), 0)) as "relativeLift" from (select "market", (cast("controlConversions" as double) / nullif(nullif(cast("controlUsers" as double), cast(0 as double)), 0)) as "controlRate", (cast("variantConversions" as double) / nullif(nullif(cast("variantUsers" as double), cast(0 as double)), 0)) as "variantRate" from (select "market", count(distinct "__vquery_when_0") as "controlUsers", count(distinct "__vquery_when_1") as "controlConversions", count(distinct "__vquery_when_2") as "variantUsers", count(distinct "__vquery_when_3") as "variantConversions" from (select *, case when ("variant" = 'control') then "userId" end as "__vquery_when_0", case when ("variant" = 'control' and "event" = 'convert') then "userId" end as "__vquery_when_1", case when ("variant" = 'variant') then "userId" end as "__vquery_when_2", case when ("variant" = 'variant' and "event" = 'convert') then "userId" end as "__vquery_when_3" from (select "market" collate "binary" as "market", "variant" collate "binary" as "variant", "userId" collate "binary" as "userId", "event" collate "binary" as "event" from "analysis-conversion-comparison") as "__vquery_source") as "__vquery_conditions" group by "market") as "__vquery_subquery") as "__vquery_subquery" order by "market" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "controlRate": 0.5,
          "differencePp": 25,
          "market": "A",
          "relativeLift": 0.5,
          "variantRate": 0.75,
        },
        {
          "controlRate": 0,
          "differencePp": 50,
          "market": "B",
          "relativeLift": null,
          "variantRate": 0.5,
        },
        {
          "controlRate": 0.5,
          "differencePp": null,
          "market": "C",
          "relativeLift": null,
          "variantRate": null,
        },
        {
          "controlRate": null,
          "differencePp": null,
          "market": "D",
          "relativeLift": null,
          "variantRate": 0.5,
        },
      ]
    `)
  })
})

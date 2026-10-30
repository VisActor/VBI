import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './category-share.json'

describe('按地区计算固定品类的销售占比：分母包含该地区全部品类，其他品类金额为总额减去已列品类。分类金额缺省按 0 计算，总额为 0 或 NULL 时占比返回 NULL；0.25 表示 25%。', () => {
  it('按地区计算固定品类的销售占比：分母包含该地区全部品类，其他品类金额为总额减去已列品类。分类金额缺省按 0 计算，总额为 0 或 NULL 时占比返回 NULL；0.25 表示 25%。', async () => {
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
      `"select "region", "totalSales", (coalesce(cast("electronicsSales" as double), cast(0 as double)) / nullif(nullif(cast("totalSales" as double), cast(0 as double)), 0)) as "electronicsShare", (coalesce(cast("foodSales" as double), cast(0 as double)) / nullif(nullif(cast("totalSales" as double), cast(0 as double)), 0)) as "foodShare", (((cast("totalSales" as double) - coalesce(cast("electronicsSales" as double), cast(0 as double))) - coalesce(cast("foodSales" as double), cast(0 as double))) / nullif(nullif(cast("totalSales" as double), cast(0 as double)), 0)) as "otherShare" from (select "region", sum("sales") as "totalSales", sum("__vquery_when_0") as "electronicsSales", sum("__vquery_when_1") as "foodSales" from (select *, case when ("category" = 'electronics') then "sales" end as "__vquery_when_0", case when ("category" = 'food') then "sales" end as "__vquery_when_1" from (select "region" collate "binary" as "region", "category" collate "binary" as "category", "sales" as "sales" from "analysis-category-share") as "__vquery_source") as "__vquery_conditions" group by "region") as "__vquery_subquery" order by "region" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "electronicsShare": 0.25,
          "foodShare": 0.25,
          "otherShare": 0.5,
          "region": "A",
          "totalSales": 400,
        },
        {
          "electronicsShare": 0,
          "foodShare": 0.5,
          "otherShare": 0.5,
          "region": "B",
          "totalSales": 160,
        },
        {
          "electronicsShare": null,
          "foodShare": null,
          "otherShare": null,
          "region": "C",
          "totalSales": 0,
        },
        {
          "electronicsShare": null,
          "foodShare": null,
          "otherShare": null,
          "region": "D",
          "totalSales": null,
        },
      ]
    `)
  })
})

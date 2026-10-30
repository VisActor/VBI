import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './basic.json'

describe('when 只影响当前列：保留华东销售额，其他地区在该列返回 NULL；原始列和记录仍然保留。', () => {
  it('when 只影响当前列：保留华东销售额，其他地区在该列返回 NULL；原始列和记录仍然保留。', async () => {
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
      `"select "region", "sales", "__vquery_when_0" as "eastSales" from (select *, case when ("region" = 'East') then "sales" end as "__vquery_when_0" from (select "region" collate "binary" as "region", "sales" as "sales" from "when-basic") as "__vquery_source") as "__vquery_conditions""`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "eastSales": 100,
          "region": "East",
          "sales": 100,
        },
        {
          "eastSales": null,
          "region": "West",
          "sales": 80,
        },
        {
          "eastSales": 50,
          "region": "East",
          "sales": 50,
        },
      ]
    `)
  })
})

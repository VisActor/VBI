import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './orderBy-limit.json'

describe('内层先取销售总额前三名门店，外层再按门店名升序排列并取前两行；两层排序和 limit 各自生效。', () => {
  it('内层先取销售总额前三名门店，外层再按门店名升序排列并取前两行；两层排序和 limit 各自生效。', async () => {
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
      `"select "region", "store", "storeTotal" from (select "region", "store", sum("sales") as "storeTotal" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-orderBy-limit") as "__vquery_source" group by "region", "store" order by "storeTotal" desc nulls last limit 3) as "__vquery_subquery" order by "store" asc nulls last limit 2"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "region": "East",
          "store": "A",
          "storeTotal": 30,
        },
        {
          "region": "East",
          "store": "B",
          "storeTotal": 40,
        },
      ]
    `)
  })
})

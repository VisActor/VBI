import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './basic.json'

describe('内层重命名销售额，外层通过该别名选列并再次重命名，保留每一条明细记录。', () => {
  it('内层重命名销售额，外层通过该别名选列并再次重命名，保留每一条明细记录。', async () => {
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
      `"select "region", "amount" as "revenue" from (select "region", "sales" as "amount" from (select "region" collate "binary" as "region", "store" collate "binary" as "store", "sales" as "sales" from "subquery-basic") as "__vquery_source") as "__vquery_subquery" order by "revenue" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "region": "West",
          "revenue": 5,
        },
        {
          "region": "East",
          "revenue": 10,
        },
        {
          "region": "West",
          "revenue": 15,
        },
        {
          "region": "East",
          "revenue": 20,
        },
        {
          "region": "East",
          "revenue": 40,
        },
        {
          "region": "West",
          "revenue": 60,
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './alias-order.json'

describe('聚合输出与源字段同名时，按聚合结果排序并将 NULL 放在最后；兼容 MySQL ONLY_FULL_GROUP_BY。', () => {
  it('聚合输出与源字段同名时，按聚合结果排序并将 NULL 放在最后；兼容 MySQL ONLY_FULL_GROUP_BY。', async () => {
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
      `"select "region", sum("sales") as "sales" from (select "region" collate "binary" as "region", "sales" as "sales" from "expression-alias-order") as "__vquery_source" group by "region" order by "sales" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "region": "B",
          "sales": 25,
        },
        {
          "region": "A",
          "sales": 30,
        },
        {
          "region": "C",
          "sales": null,
        },
      ]
    `)
  })
})

import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './date-alias.json'

describe('按月份别名分组并排序；同月数据合并，NULL 月份排在最后，可在 MySQL 严格分组模式下执行。', () => {
  it('按月份别名分组并排序；同月数据合并，NULL 月份排在最后，可在 MySQL 严格分组模式下执行。', async () => {
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
      `"select strftime(CAST("date" AS TIMESTAMP), '%Y-%m') as "month", count(*) as "rows" from "group-by-date-alias" group by "month" order by "month" asc nulls last"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "month": "2026-01",
          "rows": 2,
        },
        {
          "month": "2026-02",
          "rows": 1,
        },
        {
          "month": null,
          "rows": 1,
        },
      ]
    `)
  })
})

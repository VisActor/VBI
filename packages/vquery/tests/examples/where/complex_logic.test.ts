import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './complex_logic.json'

describe('Where with Complex AND/OR Logic', () => {
  it('Where with Complex AND/OR Logic', async () => {
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
      `"select "id", "name", "age", "gender" from (select "id" as "id", "name" collate "binary" as "name", "age" as "age", "department" collate "binary" as "department", "gender" collate "binary" as "gender", "active" as "active" from "where-complex-logic") as "__vquery_source" where (("age" >= 18 and "gender" = 'male') or ("age" < 18 and "gender" = 'female'))"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "age": 30,
          "gender": "male",
          "id": 2,
          "name": "Bob",
        },
      ]
    `)
  })
})
